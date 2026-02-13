/**
 * Kullanıcı Profil Tipleri
 * Google auth sonrası tamamlanacak bilgiler
 */

export interface UserProfile {
  // Google'dan otomatik gelen bilgiler (readonly)
  googleId: string;
  email: string;
  name: string;
  picture?: string;

  // Temel Bilgiler
  full_name?: string; // Google'dan gelen ad soyad
  firstName?: string;
  lastName?: string;
  phone?: string;
  birth_date?: string; // ISO format: YYYY-MM-DD
  photo_url?: string; // Database'den gelen kullanıcı fotoğrafı URL

  // Unvan ve Şirket Bilgileri
  unvan?: string; // Pozisyon/Ünvan
  company_name?: string;
  company_size?: 'micro' | 'small' | 'medium' | 'large' | 'enterprise'; // 1-10, 11-50, 51-250, 251-1000, 1000+
  sektor?: string; // Sektör
  tax_number?: string; // Vergi numarası
  city?: string; // Şehir

  // Kullanıcı Metadata (readonly)
  user_type?: 'standart' | 'premium' | 'enterprise'; // Varsayılan: standart
  registration_date?: string; // ISO timestamp
  how_did_you_find_us?: string; // Nereden buldunuz

  // Doğrulama ve Onaylar
  email_verified: boolean; // E-posta doğrulandı mı
  phone_verified: boolean; // Telefon doğrulandı mı (şimdilik pasif)
  kvkkConsent: boolean;
  emailSubscription: boolean; // Varsayılan: true
  smsSubscription: boolean; // Varsayılan: false

  // Legacy fields (backward compatibility)
  company?: string;
  birthYear?: number;

  // Metadata
  profileCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileFormData {
  // Temel Bilgiler
  firstName: string;
  lastName: string;
  phone?: string;
  birth_date?: string;

  // Unvan ve Şirket
  unvan?: string;
  company_name?: string;
  company_size?: 'micro' | 'small' | 'medium' | 'large' | 'enterprise';
  sektor?: string;
  tax_number?: string;
  city?: string;
  how_did_you_find_us?: string;

  // Onaylar
  kvkkConsent: boolean;
  emailSubscription: boolean;
  smsSubscription: boolean;

  // Legacy fields (backward compatibility)
  company?: string;
  birthYear?: number;
}

export interface ProfileResponse {
  success: boolean;
  data?: UserProfile;
  message?: string;
  error?: string;
}

export interface EmailVerificationRequest {
  email: string;
  verification_code?: string;
}

export interface EmailVerificationResponse {
  success: boolean;
  message?: string;
  verified?: boolean;
  error?: string;
}

