import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // n8n webhook'a istek gönder
    const webhookUrl = 'https://n8n.fokusistatistik.com/webhook/fokusistatistikblog';

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    // 200 response kontrolü - başka status kodlarında giriş başarısız
    if (response.status !== 200) {
      return NextResponse.json(
        { success: false, message: 'Giriş başarısız' },
        { status: 401 }
      );
    }

    // Başarılı yanıt gelirse session token oluştur
    const sessionToken = Buffer.from(`${username}:${Date.now()}`).toString('base64');

    // Response oluştur ve cookie set et
    const res = NextResponse.json({
      success: true,
      message: 'Giriş başarılı',
      user: { username },
    });

    // HttpOnly cookie ile session token'ı sakla
    res.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 gün
      path: '/',
    });

    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
