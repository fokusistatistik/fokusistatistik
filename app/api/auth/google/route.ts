import { NextRequest, NextResponse } from 'next/server';
import { getGoogleAuthUrl } from '@/lib/google-auth';

export async function GET(request: NextRequest) {

  try {
    // State parametresi (isteğe bağlı)
    const searchParams = request.nextUrl.searchParams;
    const state = searchParams.get('state') || 'web_login';

    // Google OAuth URL'i oluştur
    const authUrl = getGoogleAuthUrl(state);


    // Google'a yönlendir
    return NextResponse.redirect(authUrl);

  } catch (error) {
    console.error('❌ Google Auth hatası:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
