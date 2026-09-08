import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP } from '@/lib/rateLimiter';

/**
 * İletişim formu API endpoint
 * - Rate limiting (3 istek/dakika)
 * - Honeypot + doldurma süresi kontrolü (sunucu tarafı, bypass edilemez)
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
    const { honeypot, formStartTime, ...formData } = body;

    // 3️⃣ Honeypot Kontrolü - Bot görünmez alanı doldurmuşsa engelle
    if (honeypot) {
      console.warn('Spam detected: honeypot filled', { ip: clientIP });
      return NextResponse.json(
        { success: false, error: 'Form gönderimi başarısız oldu' },
        { status: 400 }
      );
    }

    // 4️⃣ Doldurma Süresi Kontrolü - 2 saniyeden kısa sürede gönderilmişse bot
    const timeTaken = Date.now() - Number(formStartTime || 0);
    if (!formStartTime || timeTaken < 2000) {
      console.warn('Spam detected: form submitted too quickly', { ip: clientIP, timeTaken });
      return NextResponse.json(
        { success: false, error: 'Lütfen formu doldurduktan sonra gönderin' },
        { status: 400 }
      );
    }

    // 5️⃣ n8n Webhook'a Forward Et
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
          timestamp: new Date().toISOString(),
        },
      }),
    });

    if (!webhookResponse.ok) {
      throw new Error('n8n webhook başarısız');
    }

    // 6️⃣ Başarılı Yanıt
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
