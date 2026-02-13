import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

const EMAIL_VERIFICATION_WEBHOOK = 'https://n8n.fokusistatistik.com/webhook/fokusistatistikepostadogrula';

// Retry logic for webhook requests
async function fetchWithRetry(url: string, options: RequestInit, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Max retries reached');
}

/**
 * POST /api/profile/verify-email
 * Send verification email to user
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Oturum bulunamadı' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action = 'send', verification_code } = body;

    console.log('📧 Email verification request:', {
      email: session.user.email,
      action,
      hasCode: !!verification_code,
    });

    const verificationData = {
      action, // 'send' or 'verify'
      email: session.user.email,
      name: session.user.name,
      verification_code,
      timestamp: new Date().toISOString(),
    };

    console.log('🚀 Sending EMAIL VERIFICATION webhook to:', EMAIL_VERIFICATION_WEBHOOK);
    console.log('📦 Verification data payload:', JSON.stringify(verificationData, null, 2));

    try {
      const response = await fetchWithRetry(
        EMAIL_VERIFICATION_WEBHOOK,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(verificationData),
        },
        3
      );

      console.log('📨 Webhook response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Email verification webhook error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });

        return NextResponse.json(
          {
            success: false,
            error: action === 'send'
              ? 'Doğrulama e-postası gönderilemedi'
              : 'Doğrulama kodu geçersiz',
            details: process.env.NODE_ENV === 'development' ? errorText : undefined,
          },
          { status: response.status }
        );
      }

      const responseData = await response.json();
      console.log('✅ Email verification webhook success:', responseData);

      if (action === 'send') {
        return NextResponse.json({
          success: true,
          message: 'Doğrulama kodu e-posta adresinize gönderildi',
          data: responseData,
        });
      } else {
        return NextResponse.json({
          success: true,
          verified: true,
          message: 'E-posta adresiniz başarıyla doğrulandı',
          data: responseData,
        });
      }
    } catch (webhookError) {
      console.error('❌ Email verification webhook request failed:', webhookError);
      return NextResponse.json(
        {
          success: false,
          error: 'E-posta doğrulama servisi şu anda kullanılamıyor',
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('❌ Email verification error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Beklenmeyen bir hata oluştu',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/profile/verify-email
 * Check email verification status
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Oturum bulunamadı' },
        { status: 401 }
      );
    }

    console.log('🔍 Checking email verification status for:', session.user.email);

    const checkData = {
      action: 'check',
      email: session.user.email,
    };

    console.log('🚀 Sending EMAIL CHECK webhook to:', EMAIL_VERIFICATION_WEBHOOK);

    try {
      const response = await fetchWithRetry(
        EMAIL_VERIFICATION_WEBHOOK,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(checkData),
        },
        3
      );

      if (!response.ok) {
        return NextResponse.json({
          success: true,
          verified: false,
          message: 'E-posta doğrulanmamış',
        });
      }

      const data = await response.json();
      console.log('✅ Email verification status:', data);

      return NextResponse.json({
        success: true,
        verified: data.verified || false,
        data,
      });
    } catch (webhookError) {
      console.error('❌ Email check webhook failed:', webhookError);
      return NextResponse.json({
        success: true,
        verified: false,
        message: 'E-posta doğrulama durumu kontrol edilemedi',
      });
    }
  } catch (error) {
    console.error('❌ Email verification check error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Beklenmeyen bir hata oluştu',
      },
      { status: 500 }
    );
  }
}
