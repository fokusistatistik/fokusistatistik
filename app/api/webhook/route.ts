import { NextRequest, NextResponse } from 'next/server';
import { validateOrigin, validateWebhookSignature, checkRateLimit, getClientIp } from '@/lib/csrf';

// Webhook endpoint for n8n integration
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(clientIp, 30, 60000); // 30 requests per minute
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'Retry-After': '60',
          }
        }
      );
    }

    // Origin validation - ensure request comes from allowed domains
    if (!validateOrigin(request)) {
      console.warn('Webhook rejected: Invalid origin', {
        origin: request.headers.get('origin'),
        referer: request.headers.get('referer'),
        ip: clientIp,
      });
      return NextResponse.json(
        { success: false, error: 'Invalid origin' },
        { status: 403 }
      );
    }

    const bodyText = await request.text();
    const body = JSON.parse(bodyText);

    // Optional: Webhook signature validation
    // Enable by setting WEBHOOK_SECRET in environment
    if (process.env.WEBHOOK_SECRET) {
      const signature = request.headers.get('x-webhook-signature');
      const isValid = await validateWebhookSignature(bodyText, signature);

      if (!isValid) {
        console.warn('Webhook rejected: Invalid signature', { ip: clientIp });
        return NextResponse.json(
          { success: false, error: 'Invalid signature' },
          { status: 401 }
        );
      }
    }

    // Log webhook data (you can process this data as needed)
    console.log('Webhook received:', body);

    // Forward to n8n
    if (process.env.N8N_WEBHOOK_URL) {
      const response = await fetch(process.env.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: bodyText,
      });

      if (!response.ok) {
        throw new Error('Failed to forward to n8n');
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook processed',
    }, {
      headers: {
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
      }
    });
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
