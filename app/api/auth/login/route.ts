import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';

// Login Webhook URL - TEST mode
const LOGIN_WEBHOOK_URL = 'https://n8n.fokusistatistik.com/webhook-test/fokuswebsitelogin';

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

// POST /api/auth/login - Existing user login
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Oturum bulunamadı' },
        { status: 401 }
      );
    }

    console.log('🔐 Login attempt:', {
      email: session.user.email,
      name: session.user.name,
    });

    // Prepare login data for webhook
    const loginData = {
      action: 'login',
      email: session.user.email,
      googleId: (session.user as any).id || session.user.email,
      name: session.user.name,
      picture: session.user.image,
      loginAt: new Date().toISOString(),
      authMethod: 'google',
    };

    // Send to n8n login webhook
    try {
      const response = await fetchWithRetry(
        LOGIN_WEBHOOK_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        },
        3
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Login webhook error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });

        // User not found in system
        if (response.status === 404) {
          return NextResponse.json(
            {
              success: false,
              error: 'Kullanıcı bulunamadı. Lütfen önce kayıt olun.',
              userNotFound: true,
            },
            { status: 404 }
          );
        }

        return NextResponse.json(
          {
            success: false,
            error: 'Giriş işlemi sırasında bir hata oluştu',
            details: process.env.NODE_ENV === 'development' ? errorText : undefined,
          },
          { status: 500 }
        );
      }

      const userData = await response.json();
      console.log('✅ User logged in successfully:', {
        email: session.user.email,
        name: session.user.name,
        userData: userData,
      });

      return NextResponse.json({
        success: true,
        message: 'Giriş başarılı',
        data: {
          user: {
            email: session.user.email,
            name: session.user.name,
            picture: session.user.image,
            ...userData,
          },
        },
      });
    } catch (webhookError) {
      console.error('❌ Login webhook request failed:', webhookError);
      return NextResponse.json(
        {
          success: false,
          error: 'Backend servisine ulaşılamadı',
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('❌ Login error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Beklenmeyen bir hata oluştu',
      },
      { status: 500 }
    );
  }
}
