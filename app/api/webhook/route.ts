import { NextRequest, NextResponse } from 'next/server';

// Webhook endpoint for n8n integration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log webhook data (you can process this data as needed)

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
