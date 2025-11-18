import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP } from '@/lib/rateLimiter';

// Webhook endpoint for n8n integration
export async function POST(request: NextRequest) {
  try {
    // Güvenlik: Rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP, {
      maxRequests: 10,
      windowMs: 60 * 1000, // 10 istek / dakika
    });

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, error: 'Çok fazla istek gönderildi. Lütfen bekleyin.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          },
        }
      );
    }

    const body = await request.json();

    // Güvenlik: Payload boyutu kontrolü (max 100KB)
    const bodySize = JSON.stringify(body).length;
    if (bodySize > 100 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Payload çok büyük' },
        { status: 413 }
      );
    }

    // Güvenlik: Body validasyonu
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Geçersiz payload' },
        { status: 400 }
      );
    }

    // Forward to n8n
    if (process.env.N8N_WEBHOOK_URL) {
      const response = await fetch(process.env.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to forward to n8n');
      }
    }

    return NextResponse.json({ success: true, message: 'Webhook processed' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { success: false, error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Webhook endpoint is active',
    timestamp: new Date().toISOString(),
  });
}
