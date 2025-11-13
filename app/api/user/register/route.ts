import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

const WEBHOOK_URL = 'https://n8n.fokusistatistik.com/webhook/fokuswebsitekullanicibilgileri';

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

// POST /api/user/register - Yeni kullanıcı kaydı
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

    // Prepare user data for webhook
    const userData = {
      action: 'register',
      email: session.user.email,
      googleId: (session.user as any).id || session.user.email,
      name: session.user.name,
      picture: session.user.image,
      emailSubscription,
      acceptedTerms,
      registeredAt: new Date().toISOString(),
    };

    // Send to n8n webhook
    try {
      const response = await fetchWithRetry(
        WEBHOOK_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        },
        3
      );

      if (!response.ok) {
        console.error('n8n webhook error:', response.status);
        return NextResponse.json(
          {
            success: false,
            error: 'Kayıt işlemi sırasında bir hata oluştu',
          },
          { status: 500 }
        );
      }

      const webhookData = await response.json();

      return NextResponse.json({
        success: true,
        message: 'Kayıt başarılı',
        data: {
          user: {
            email: session.user.email,
            name: session.user.name,
            isRegistered: true,
          },
        },
      });
    } catch (webhookError) {
      console.error('Webhook request failed:', webhookError);
      return NextResponse.json(
        {
          success: false,
          error: 'Backend servisine ulaşılamadı',
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Beklenmeyen bir hata oluştu',
      },
      { status: 500 }
    );
  }
}

// GET /api/user/register - Kullanıcı kayıtlı mı kontrol et
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Oturum bulunamadı' },
        { status: 401 }
      );
    }

    // Check if user exists in n8n
    try {
      const response = await fetchWithRetry(
        WEBHOOK_URL,
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

      if (!response.ok) {
        // User doesn't exist - this is a new user
        return NextResponse.json({
          success: true,
          isRegistered: false,
          isNewUser: true,
        });
      }

      const userData = await response.json();

      return NextResponse.json({
        success: true,
        isRegistered: true,
        isNewUser: false,
        data: userData,
      });
    } catch (error) {
      // If webhook fails, assume new user (graceful degradation)
      console.warn('Could not check user registration:', error);
      return NextResponse.json({
        success: true,
        isRegistered: false,
        isNewUser: true,
      });
    }
  } catch (error) {
    console.error('User check error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Kullanıcı kontrolü başarısız',
      },
      { status: 500 }
    );
  }
}
