import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { UserProfile, ProfileResponse } from '@/types/profile';
import { fetchWithRetry } from '@/lib/fetchWithRetry';

const WEBHOOK_URL = 'https://n8n.fokusistatistik.com/webhook/fokuswebsitekullanicibilgileri';

/**
 * GET /api/profile
 * Kullanıcı profil bilgilerini getirir
 */
export async function GET(request: NextRequest) {
  try {
    // Auth kontrolü
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim. Lütfen giriş yapınız.' } as ProfileResponse,
        { status: 401 }
      );
    }

    // Webhook'tan kullanıcı bilgilerini çek
    try {
      const response = await fetchWithRetry(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'get',
          email: session.user.email,
          googleId: (session.user as any).id,
        }),
        maxRetries: 2,
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({
          success: true,
          data: data,
        } as ProfileResponse);
      }
    } catch (webhookError) {
      console.error('Webhook error:', webhookError);
    }

    // Webhook başarısız ise, session'dan temel bilgileri dön
    const basicProfile: UserProfile = {
      googleId: (session.user as any).id || '',
      email: session.user.email || '',
      name: session.user.name || '',
      picture: session.user.image || undefined,
      kvkkConsent: false,
      emailSubscription: true, // Varsayılan aktif
      smsSubscription: false,
      email_verified: false,
      phone_verified: false,
      profileCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: basicProfile,
    } as ProfileResponse);

  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Profil bilgileri yüklenirken bir hata oluştu.'
      } as ProfileResponse,
      { status: 500 }
    );
  }
}

/**
 * POST /api/profile
 * Kullanıcı profil bilgilerini kaydeder/günceller
 */
export async function POST(request: NextRequest) {
  try {
    // Auth kontrolü
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim. Lütfen giriş yapınız.' } as ProfileResponse,
        { status: 401 }
      );
    }

    // Request body
    const body = await request.json();

    // KVKK onayı zorunlu
    if (!body.kvkkConsent) {
      return NextResponse.json(
        { success: false, error: 'KVKK onayı gereklidir.' } as ProfileResponse,
        { status: 400 }
      );
    }

    // Webhook'a gönderilecek veri
    const profileData = {
      action: 'update',
      // Google bilgileri
      googleId: (session.user as any).id,
      email: session.user.email,
      googleName: session.user.name,
      googlePicture: session.user.image,

      // Kullanıcı bilgileri
      firstName: body.firstName,
      lastName: body.lastName,
      company: body.company || null,
      birthYear: body.birthYear || null,
      phone: body.phone || null,

      // Onaylar
      kvkkConsent: body.kvkkConsent,
      emailSubscription: body.emailSubscription !== false, // Varsayılan true
      smsSubscription: body.smsSubscription || false,

      // Metadata
      profileCompleted: true,
      updatedAt: new Date().toISOString(),
    };

    // Webhook'a gönder
    const response = await fetchWithRetry(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
      maxRetries: 3,
      baseDelay: 2000,
    });

    if (!response.ok) {
      throw new Error('Webhook isteği başarısız oldu');
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Profil bilgileriniz başarıyla kaydedildi!',
    } as ProfileResponse);

  } catch (error) {
    console.error('Profile POST error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Profil kaydedilirken bir hata oluştu. Lütfen tekrar deneyiniz.'
      } as ProfileResponse,
      { status: 500 }
    );
  }
}
