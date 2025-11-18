import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP } from '@/lib/rateLimiter';
import { SignJWT } from 'jose';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Güvenlik: IP bazlı rate limiting (5 deneme / 15 dakika)
    const clientIP = getClientIP(request);
    const ipRateLimit = checkRateLimit(`login:ip:${clientIP}`, {
      maxRequests: 5,
      windowMs: 15 * 60 * 1000,
    });

    if (!ipRateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: 'Çok fazla başarısız deneme. 15 dakika bekleyin.' },
        { status: 429 }
      );
    }

    // Güvenlik: Username bazlı rate limiting (10 deneme / saat)
    if (username) {
      const userRateLimit = checkRateLimit(`login:user:${username}`, {
        maxRequests: 10,
        windowMs: 60 * 60 * 1000,
      });

      if (!userRateLimit.allowed) {
        return NextResponse.json(
          { success: false, message: 'Bu hesap geçici olarak kilitlendi.' },
          { status: 429 }
        );
      }
    }

    // Güvenlik: Input validation
    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Geçersiz giriş bilgileri' },
        { status: 400 }
      );
    }

    // Güvenlik: 1 saniye gecikme (brute force zorlaştırma)
    await new Promise(resolve => setTimeout(resolve, 1000));

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

    // Güvenlik: Güçlü JWT token oluştur
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'default-secret-change-in-production-12345678901234567890'
    );

    const sessionToken = await new SignJWT({ username, role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .setJti(crypto.randomUUID())
      .sign(secret);

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
