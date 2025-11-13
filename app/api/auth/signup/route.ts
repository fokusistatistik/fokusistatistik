import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';

// Sign Up Webhook URL - TEST mode
const SIGNUP_WEBHOOK_URL = 'https://n8n.fokusistatistik.com/webhook-test/fokuswebsitesignup';

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

// GET /api/auth/signup - Check if user can sign up (not already registered)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Oturum bulunamadı' },
        { status: 401 }
      );
    }

    console.log('🔍 Checking if user can sign up:', session.user.email);

    // Check if user already exists
    try {
      const response = await fetchWithRetry(
        SIGNUP_WEBHOOK_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'check',
            email: session.user.email,
            googleId: (session.user as any).id || session.user.email,
          }),
        },
        3
      );

      if (response.ok) {
        // User already exists
        const userData = await response.json();
        console.log('⚠️ User already exists:', session.user.email);
        return NextResponse.json({
          success: false,
          error: 'Bu e-posta adresi zaten kayıtlı. Lütfen giriş yapın.',
          alreadyExists: true,
          data: userData,
        });
      }

      // User doesn't exist - can sign up
      console.log('✅ User can sign up:', session.user.email);
      return NextResponse.json({
        success: true,
        canSignUp: true,
        message: 'Kayıt işlemine devam edebilirsiniz',
      });
    } catch (error) {
      // If webhook fails, allow sign up (graceful degradation)
      console.warn('⚠️ Could not check user existence, allowing sign up:', error);
      return NextResponse.json({
        success: true,
        canSignUp: true,
        message: 'Kayıt işlemine devam edebilirsiniz',
      });
    }
  } catch (error) {
    console.error('❌ Sign up check error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Kullanıcı kontrolü başarısız',
      },
      { status: 500 }
    );
  }
}

// POST /api/auth/signup - Register new user
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
    const { acceptedTerms, emailSubscription = true } = body;

    // Validate required fields
    if (!acceptedTerms) {
      return NextResponse.json(
        { success: false, error: 'Kullanım koşullarını kabul etmelisiniz' },
        { status: 400 }
      );
    }

    console.log('📝 Signing up new user:', {
      email: session.user.email,
      name: session.user.name,
      emailSubscription,
    });

    // Prepare user data for webhook (comprehensive format)
    const signupData = {
      action: 'register',
      email: session.user.email,
      googleId: (session.user as any).id || session.user.email,
      name: session.user.name,
      displayName: session.user.name,
      picture: session.user.image,
      avatarUrl: session.user.image,
      emailSubscription,
      acceptedTerms,
      registeredAt: new Date().toISOString(),
      authMethod: 'google',
      environment: process.env.NODE_ENV || 'production',
    };

    // Send to n8n signup webhook
    try {
      const response = await fetchWithRetry(
        SIGNUP_WEBHOOK_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signupData),
        },
        3
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Sign up webhook error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });

        // User already exists
        if (response.status === 409) {
          return NextResponse.json(
            {
              success: false,
              error: 'Bu e-posta adresi zaten kayıtlı',
              alreadyExists: true,
            },
            { status: 409 }
          );
        }

        return NextResponse.json(
          {
            success: false,
            error: 'Kayıt işlemi sırasında bir hata oluştu',
            details: process.env.NODE_ENV === 'development' ? errorText : undefined,
          },
          { status: 500 }
        );
      }

      const webhookData = await response.json();
      console.log('✅ User signed up successfully:', {
        email: session.user.email,
        name: session.user.name,
        webhookResponse: webhookData,
      });

      return NextResponse.json({
        success: true,
        message: 'Kayıt başarılı',
        data: {
          user: {
            email: session.user.email,
            name: session.user.name,
            picture: session.user.image,
            isRegistered: true,
          },
          webhookData,
        },
      });
    } catch (webhookError) {
      console.error('❌ Sign up webhook request failed:', webhookError);
      return NextResponse.json(
        {
          success: false,
          error: 'Backend servisine ulaşılamadı',
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('❌ Sign up error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Beklenmeyen bir hata oluştu',
      },
      { status: 500 }
    );
  }
}
