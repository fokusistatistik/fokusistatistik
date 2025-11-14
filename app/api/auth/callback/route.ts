import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForToken } from '@/lib/google-auth';

export async function GET(request: NextRequest) {
  console.log('📥 OAuth Callback alındı');

  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const state = searchParams.get('state');

    console.log('🔍 Callback params:', { code: !!code, error, state });

    // Hata kontrolü
    if (error) {
      console.error('❌ OAuth error:', error);
      return NextResponse.redirect(
        new URL(`/giris?error=${encodeURIComponent(error)}`, request.url)
      );
    }

    // Code kontrolü
    if (!code) {
      console.error('❌ No authorization code received');
      return NextResponse.redirect(
        new URL('/giris?error=no_code', request.url)
      );
    }

    // Code'u webhook'a gönder ve token al
    console.log('🔄 Webhook'a gönderiliyor...');
    const webhookResponse = await exchangeCodeForToken(code);

    console.log('📦 Webhook response:', webhookResponse);

    // Response kontrolü
    if (!webhookResponse || webhookResponse.success !== true) {
      console.error('❌ Webhook başarısız:', webhookResponse);
      return NextResponse.redirect(
        new URL('/giris?error=webhook_failed', request.url)
      );
    }

    // User bilgilerini kontrol et
    if (!webhookResponse.userInfo || !webhookResponse.userId) {
      console.error('❌ User bilgileri eksik');
      return NextResponse.redirect(
        new URL('/giris?error=user_info_missing', request.url)
      );
    }

    console.log('✅ Authentication başarılı!');
    console.log('👤 User:', {
      email: webhookResponse.userInfo.email,
      name: webhookResponse.userInfo.name,
      userId: webhookResponse.userId
    });

    // Session data'yı URL'e encode et
    const sessionData = {
      user: webhookResponse.userInfo.name,
      email: webhookResponse.userInfo.email,
      userId: webhookResponse.userId,
      picture: webhookResponse.userInfo.picture,
      userInfo: webhookResponse.userInfo
    };

    const encodedSession = encodeURIComponent(JSON.stringify(sessionData));

    // Dashboard'a yönlendir ve session data'yı query param olarak gönder
    return NextResponse.redirect(
      new URL(`/giris?auth=success&session=${encodedSession}`, request.url)
    );

  } catch (error) {
    console.error('❌ Callback error:', error);
    const errorMessage = error instanceof Error ? error.message : 'unknown_error';
    return NextResponse.redirect(
      new URL(`/giris?error=${encodeURIComponent(errorMessage)}`, request.url)
    );
  }
}
