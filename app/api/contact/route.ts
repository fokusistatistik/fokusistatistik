import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP } from '@/lib/rateLimiter';
import { verifyRecaptcha, isBot } from '@/lib/recaptcha';

/**
 * İletişim formu API endpoint
 * - Rate limiting (3 istek/dakika)
 * - reCAPTCHA v3 doğrulaması
 * - n8n webhook'a forward
 */
export async function POST(request: NextRequest) {
  try {
    // 1️⃣ Rate Limiting Kontrolü
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP, {
      maxRequests: 3,  // Dakikada maksimum 3 form
      windowMs: 60 * 1000, // 1 dakika
    });

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Çok fazla istek gönderdiniz. Lütfen bir dakika sonra tekrar deneyin.',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '3',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          },
        }
      );
    }

    // 2️⃣ Request Body'yi Al
    const body = await request.json();
    const { recaptchaToken, ...formData } = body;

    // 3️⃣ reCAPTCHA Doğrulaması
    if (!recaptchaToken) {
      return NextResponse.json(
        { success: false, error: 'reCAPTCHA token eksik' },
        { status: 400 }
      );
    }

    const recaptchaResult = await verifyRecaptcha(recaptchaToken);

    if (!recaptchaResult.success) {
      return NextResponse.json(
        { success: false, error: 'reCAPTCHA doğrulaması başarısız' },
        { status: 400 }
      );
    }

    // Bot kontrolü - Güvenlik: Threshold 0.6'ya yükseltildi (0.5'ten daha güvenli)
    if (isBot(recaptchaResult.score, 0.6)) {
      console.warn('Bot detected:', {
        ip: clientIP,
        score: recaptchaResult.score,
        action: recaptchaResult.action,
      });
      return NextResponse.json(
        { success: false, error: 'Spam tespit edildi' },
        { status: 403 }
      );
    }

    // 4️⃣ n8n Webhook'a Forward Et
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_CONTACT_WEBHOOK;
    if (!webhookUrl) {
      throw new Error('N8N webhook URL tanımlanmamış');
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        metadata: {
          ip: clientIP,
          recaptchaScore: recaptchaResult.score,
          timestamp: new Date().toISOString(),
        },
      }),
    });

    if (!webhookResponse.ok) {
      throw new Error('n8n webhook başarısız');
    }

    // 5️⃣ Başarılı Yanıt
    return NextResponse.json(
      { success: true, message: 'Form başarıyla gönderildi' },
      {
        headers: {
          'X-RateLimit-Limit': '3',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        },
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}
