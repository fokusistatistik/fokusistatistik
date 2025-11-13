import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { LogoUploadResponse } from '@/types/settings';
import { hasMinimumRole } from '@/types/user';

/**
 * POST /api/settings/logo
 * Logo yükleme endpoint'i
 * Sadece 'Müşteri' ve 'Admin' rolündeki kullanıcılar erişebilir
 */
export async function POST(request: NextRequest) {
  try {
    // Auth kontrolü
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim. Lütfen giriş yapınız.' } as LogoUploadResponse,
        { status: 401 }
      );
    }

    // Role kontrolü - Sadece Müşteri veya Admin
    if (!hasMinimumRole(session.user as any, 'Müşteri')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bu alan sadece müşterilerimize özeldir.'
        } as LogoUploadResponse,
        { status: 403 }
      );
    }

    // FormData al
    const formData = await request.formData();
    const file = formData.get('logo') as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: 'Logo dosyası bulunamadı.'
        } as LogoUploadResponse,
        { status: 400 }
      );
    }

    // Dosya tipi kontrolü
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Sadece PNG, JPG ve JPEG formatları desteklenmektedir.'
        } as LogoUploadResponse,
        { status: 400 }
      );
    }

    // Dosya boyutu kontrolü (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dosya boyutu 5MB\'dan küçük olmalıdır.'
        } as LogoUploadResponse,
        { status: 400 }
      );
    }

    // TODO: Dosyayı backend'e veya storage'a yükle
    // Şimdilik simüle ediyoruz

    // Dosyayı buffer'a çevir
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log('Logo upload:', {
      name: file.name,
      type: file.type,
      size: file.size,
      bufferSize: buffer.length,
    });

    // Simulated upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock URL döndür
    const mockLogoUrl = `https://static.fokusistatistik.com/logos/${session.user.email}-${Date.now()}.${file.type.split('/')[1]}`;

    return NextResponse.json({
      success: true,
      logoUrl: mockLogoUrl,
      message: 'Logo başarıyla yüklendi!',
    } as LogoUploadResponse);

  } catch (error) {
    console.error('Logo upload error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Logo yüklenirken bir hata oluştu. Lütfen tekrar deneyiniz.'
      } as LogoUploadResponse,
      { status: 500 }
    );
  }
}
