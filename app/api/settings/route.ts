import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { CustomerSettings, SettingsResponse } from '@/types/settings';
import { hasMinimumRole } from '@/types/user';

/**
 * GET /api/settings
 * Müşteri ayarlarını getirir
 * Sadece 'Müşteri' ve 'Admin' rolündeki kullanıcılar erişebilir
 */
export async function GET(request: NextRequest) {
  try {
    // Auth kontrolü
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim. Lütfen giriş yapınız.' } as SettingsResponse,
        { status: 401 }
      );
    }

    // Role kontrolü - Sadece Müşteri veya Admin
    if (!hasMinimumRole(session.user as any, 'Müşteri')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bu alan sadece müşterilerimize özeldir. Lütfen bizimle iletişime geçiniz.'
        } as SettingsResponse,
        { status: 403 }
      );
    }

    // TODO: Backend API'den gerçek veri çek
    // Şimdilik mock data dönüyoruz
    const mockSettings: CustomerSettings = {
      // Kurum Bilgileri
      customerId: 'MUS-2024-001',
      companyName: 'Örnek Şirket A.Ş.',
      companyOfficialName: 'Örnek Şirket Anonim Şirketi',
      taxNumber: '1234567890',
      phone: '+90 212 123 45 67',
      email: session.user.email || 'info@ornek.com',
      website: 'https://www.ornek.com',
      address: 'Örnek Mahallesi, Örnek Caddesi No: 123, İstanbul',

      // İşletme Ayarları
      authorizedPersonName: session.user.name || 'Yetkili Kişi',
      sector: '',
      employeeCount: '',
      defaultProcessTime: '',
      companySlogan: '',
      companyInfo: '',
      companyHeader: '',
      companyColor: '#860000',
      logoUrl: '',
      staticResourceUrl: 'https://static.fokusistatistik.com/resources/sample.pdf',
      crmUrl: 'https://crm.fokusistatistik.com/data/export.csv',

      // Konum Ayarları
      latitude: '',
      longitude: '',

      // API Entegrasyonları
      integrations: {
        googleDrive: { id: '', clientId: '', clientSecret: '' },
        googleCalendar: { id: '', clientId: '', clientSecret: '' },
        email: { sender: '', platform: '', apiCode: '', apiLink: '', extraInfo: '' },
        instagram: { username: '', businessUserId: '' },
        whatsapp: { phoneNumber: '', phoneId: '', apiToken: '' },
        meta: { appId: '', appSecret: '', businessManagerId: '', accessToken: '' },
        sms: { provider: '', username: '', apiToken: '', header: '' },
        telegram: { chatId: '', botToken: '' },
      },

      // Bildirim Tercihleri
      notifications: {
        email: { general: true, urgent: true },
        sms: { general: false, special: false },
        whatsapp: { general: false, special: false },
        telegram: { general: false, special: false },
      },

      // Çalışma Saatleri
      workingHours: {
        monday: { start: '09:00', end: '18:00', closed: false },
        tuesday: { start: '09:00', end: '18:00', closed: false },
        wednesday: { start: '09:00', end: '18:00', closed: false },
        thursday: { start: '09:00', end: '18:00', closed: false },
        friday: { start: '09:00', end: '18:00', closed: false },
        saturday: { start: '09:00', end: '18:00', closed: true },
        sunday: { start: '09:00', end: '18:00', closed: true },
      },
      holidayStatus: 'Kapalı',

      // Güvenlik ve Yedekleme
      backupFrequency: 'Haftalık',

      // Sözleşme Bilgileri
      contract: {
        contractStart: '01.01.2024',
        processStart: '15.01.2024',
        remainingDays: 45,
        autoRenewal: 'Evet',
        period: '12 Ay',
        contractNumber: 'SZL-2024-001',
        contractUrl: 'https://static.fokusistatistik.com/contracts/sample.pdf',
        extraServices: 'Premium destek paketi',
      },

      // FOKUS Asistanları
      packages: [
        {
          id: '1',
          code: 'fokus001',
          name: 'FOKUS001',
          title: 'Yönetici Asistanı',
          icon: 'https://static.fokusistatistik.com/icons/fokus001.png',
          status: 'active',
          type: 'Standart',
        },
        {
          id: '2',
          code: 'fokus216',
          name: 'FOKUS216',
          title: 'Müşteri Hizmetleri',
          icon: 'https://static.fokusistatistik.com/icons/fokus216.png',
          status: 'active',
          type: 'Pro',
        },
        {
          id: '3',
          code: 'fokus314',
          name: 'FOKUS314',
          title: 'Veri Analisti',
          icon: 'https://static.fokusistatistik.com/icons/fokus314.png',
          status: 'active',
          type: 'Enterprise',
        },
        {
          id: '4',
          code: 'fokus520',
          name: 'FOKUS520',
          title: 'Pazarlama & Lead',
          icon: 'https://static.fokusistatistik.com/icons/fokus520.png',
          status: 'inactive',
          type: 'Pro',
        },
        {
          id: '5',
          code: 'fokus618',
          name: 'FOKUS618',
          title: 'Finans & Fatura',
          icon: 'https://static.fokusistatistik.com/icons/fokus618.png',
          status: 'inactive',
          type: 'Enterprise',
        },
        {
          id: '6',
          code: 'fokus707',
          name: 'FOKUS707',
          title: 'İnsan Kaynakları',
          icon: 'https://static.fokusistatistik.com/icons/fokus707.png',
          status: 'inactive',
          type: 'Pro',
        },
        {
          id: '7',
          code: 'fokus717',
          name: 'FOKUS717',
          title: 'İçerik Tasarımı',
          icon: 'https://static.fokusistatistik.com/icons/fokus717.png',
          status: 'inactive',
          type: 'Standart',
        },
        {
          id: '8',
          code: 'fokus808',
          name: 'FOKUS808',
          title: 'Sosyal Medya',
          icon: 'https://static.fokusistatistik.com/icons/fokus808.png',
          status: 'inactive',
          type: 'Pro',
        },
      ],

      // Acil Destek
      emergencySupport: false,
      emergencyText: '',

      // Düzenleme Talepleri
      editRequestNotes: '',
    };

    return NextResponse.json({
      success: true,
      data: mockSettings,
      message: 'Ayarlar başarıyla getirildi',
    } as SettingsResponse);

  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Ayarlar yüklenirken bir hata oluştu. Lütfen tekrar deneyiniz.'
      } as SettingsResponse,
      { status: 500 }
    );
  }
}

/**
 * POST /api/settings
 * Müşteri ayarlarını kaydeder
 * Sadece 'Müşteri' ve 'Admin' rolündeki kullanıcılar erişebilir
 */
export async function POST(request: NextRequest) {
  try {
    // Auth kontrolü
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim. Lütfen giriş yapınız.' } as SettingsResponse,
        { status: 401 }
      );
    }

    // Role kontrolü - Sadece Müşteri veya Admin
    if (!hasMinimumRole(session.user as any, 'Müşteri')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bu alan sadece müşterilerimize özeldir. Lütfen bizimle iletişime geçiniz.'
        } as SettingsResponse,
        { status: 403 }
      );
    }

    // Request body'yi al
    const body = await request.json();

    // TODO: Validasyon yap
    // TODO: Backend API'ye gönder

    console.log('Settings to save:', body);

    // Simulated delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: 'Ayarlarınız başarıyla kaydedildi!',
      data: body,
    } as SettingsResponse);

  } catch (error) {
    console.error('Settings POST error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Ayarlar kaydedilirken bir hata oluştu. Lütfen tekrar deneyiniz.'
      } as SettingsResponse,
      { status: 500 }
    );
  }
}
