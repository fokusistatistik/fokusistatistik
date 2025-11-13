/**
 * Kullanıcı Profil Tipleri
 * Google auth sonrası tamamlanacak bilgiler
 */

export interface UserProfile {
  // Google'dan otomatik gelen bilgiler
  googleId: string;
  email: string;
  name: string;
  picture?: string;

  // Kullanıcının dolduracağı bilgiler
  firstName?: string;
  lastName?: string;
  company?: string; // Opsiyonel
  birthYear?: number;
  phone?: string;

  // Onaylar ve tercihler
  kvkkConsent: boolean;
  emailSubscription: boolean; // Varsayılan: true
  smsSubscription: boolean; // Varsayılan: false

  // Metadata
  profileCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  company?: string;
  birthYear?: number;
  phone?: string;
  kvkkConsent: boolean;
  emailSubscription: boolean;
  smsSubscription: boolean;
}

export interface ProfileResponse {
  success: boolean;
  data?: UserProfile;
  message?: string;
  error?: string;
}
