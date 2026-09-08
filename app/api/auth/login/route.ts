import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP } from '@/lib/rateLimiter';
import { getJwtSecret } from '@/lib/jwt';
import { SignJWT } from 'jose';
import { timingSafeEqual } from 'crypto';

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Sabit zamanlı karşılaştırma için uzunluk kaçsa bile bir compare çalıştır
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export async function POST(request: NextRequest) {
  try {
    const { username: email, password } = await request.json();

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

    // Güvenlik: Email bazlı rate limiting (10 deneme / saat)
    if (email) {
      const userRateLimit = checkRateLimit(`login:user:${email}`, {
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
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Geçersiz giriş bilgileri' },
        { status: 400 }
      );
    }

    // Güvenlik: 1 saniye gecikme (brute force zorlaştırma)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Env tabanlı admin doğrulaması (n8n bypass)
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error('ADMIN_EMAIL / ADMIN_PASSWORD tanımlı değil');
    }

    const emailMatches = safeCompare(email, adminEmail);
    const passwordMatches = safeCompare(password, adminPassword);

    if (!emailMatches || !passwordMatches) {
      return NextResponse.json(
        { success: false, message: 'Giriş başarısız' },
        { status: 401 }
      );
    }

    // Güvenlik: Güçlü JWT token oluştur
    const secret = getJwtSecret();

    const sessionToken = await new SignJWT({ username: email, role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .setJti(crypto.randomUUID())
      .sign(secret);

    // Response oluştur ve cookie set et
    const res = NextResponse.json({
      success: true,
      message: 'Giriş başarılı',
      user: { username: email },
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
