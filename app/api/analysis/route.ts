import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP } from '@/lib/rateLimiter';
import { verifyRecaptcha, isBot } from '@/lib/recaptcha';

/**
 * Analiz formu API endpoint
 * - Rate limiting (2 istek/5 dakika)
 * - reCAPTCHA v3 doğrulaması
 * - n8n webhook'a forward
 */
export async function POST(request: NextRequest) {
  try {
    // 1️⃣ Rate Limiting Kontrolü (Analiz formu daha az sıklıkta)
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP, {
      maxRequests: 2,  // 5 dakikada maksimum 2 form
      windowMs: 5 * 60 * 1000, // 5 dakika
    });

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Çok fazla istek gönderdiniz. Lütfen birkaç dakika sonra tekrar deneyin.',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '2',
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

    // Bot kontrolü - Güvenlik: Threshold 0.7'ye yükseltildi (kritik form için daha yüksek güvenlik)
    if (isBot(recaptchaResult.score, 0.7)) {
      console.warn('Bot detected on analysis form:', {
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
    const webhookUrl = 'https://n8n.fokusistatistik.com/webhook/analizformu';

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

    const webhookData = await webhookResponse.json();

    // 5️⃣ Başarılı Yanıt (n8n'den gelen analiz sonuçlarını döndür)
    return NextResponse.json(
      {
        success: true,
        message: 'Form başarıyla gönderildi',
        ...webhookData,
      },
      {
        headers: {
          'X-RateLimit-Limit': '2',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        },
      }
    );
  } catch (error) {
    console.error('Analysis form error:', error);
    return NextResponse.json(
      { success: false, error: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}
