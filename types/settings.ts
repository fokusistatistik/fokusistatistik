/**
 * Settings Types for FOKUS İstatistik - Asistan Ayarları
 */

// Paket durumu
export type PackageStatus = 'active' | 'inactive';

// FOKUS Paket Tipi
export interface FokusPackage {
  id: string;
  code: string;
  name: string;
  title: string;
  icon: string;
  status: PackageStatus;
  type?: string; // "Standart", "Pro", "Enterprise", vb.
}

// Çalışma saatleri için gün tipi
export interface WorkingHours {
  monday: { start: string; end: string; closed: boolean };
  tuesday: { start: string; end: string; closed: boolean };
  wednesday: { start: string; end: string; closed: boolean };
  thursday: { start: string; end: string; closed: boolean };
  friday: { start: string; end: string; closed: boolean };
  saturday: { start: string; end: string; closed: boolean };
  sunday: { start: string; end: string; closed: boolean };
}

// Bildirim tercihleri
export interface NotificationPreferences {
  email: {
    general: boolean;
    urgent: boolean;
  };
  sms: {
    general: boolean;
    special: boolean;
  };
  whatsapp: {
    general: boolean;
    special: boolean;
  };
  telegram: {
    general: boolean;
    special: boolean;
  };
}

// API Entegrasyonları
export interface ApiIntegrations {
  googleDrive: {
    id: string;
    clientId: string;
    clientSecret: string;
  };
  googleCalendar: {
    id: string;
    clientId: string;
    clientSecret: string;
  };
  email: {
    sender: string;
    platform: string;
    apiCode: string;
    apiLink: string;
    extraInfo: string;
  };
  instagram: {
    username: string;
    businessUserId: string;
  };
  whatsapp: {
    phoneNumber: string;
    phoneId: string;
    apiToken: string;
  };
  meta: {
    appId: string;
    appSecret: string;
    businessManagerId: string;
    accessToken: string;
  };
  sms: {
    provider: string;
    username: string;
    apiToken: string;
    header: string;
  };
  telegram: {
    chatId: string;
    botToken: string;
  };
}

// Sözleşme bilgileri
export interface ContractInfo {
  contractStart: string;
  processStart: string;
  remainingDays: number;
  autoRenewal: string;
  period: string;
  contractNumber: string;
  contractUrl: string;
  extraServices: string;
}

// Ana ayarlar interface'i
export interface CustomerSettings {
  // Kurum Bilgileri
  customerId: string;
  companyName: string;
  companyOfficialName: string;
  taxNumber: string;
  phone: string;
  email: string;
  website: string;
  address: string;

  // İşletme Ayarları
  authorizedPersonName: string;
  sector: string;
  employeeCount: string;
  defaultProcessTime: string;
  companySlogan: string;
  companyInfo: string;
  companyHeader: string;
  companyColor: string;
  logoUrl: string;
  staticResourceUrl: string;
  crmUrl: string;

  // Konum Ayarları
  latitude: string;
  longitude: string;

  // API Entegrasyonları
  integrations: ApiIntegrations;

  // Bildirim Tercihleri
  notifications: NotificationPreferences;

  // Çalışma Saatleri
  workingHours: WorkingHours;
  holidayStatus: 'Kapalı' | 'Açık';

  // Güvenlik ve Yedekleme
  backupFrequency: 'Haftalık' | 'Günlük';

  // Sözleşme Bilgileri
  contract: ContractInfo;

  // FOKUS Asistanları
  packages: FokusPackage[];

  // Acil Destek
  emergencySupport: boolean;
  emergencyText: string;

  // Düzenleme Talepleri
  editRequestNotes: string;
}

// API Response tipi
export interface SettingsResponse {
  success: boolean;
  data?: CustomerSettings;
  message?: string;
  error?: string;
}

// Logo upload response
export interface LogoUploadResponse {
  success: boolean;
  logoUrl?: string;
  message?: string;
  error?: string;
}
