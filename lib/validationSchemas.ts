/**
 * Zod Validation Schemas
 * Form validasyonu için kullanıcı dostu şemalar
 */

import { z } from 'zod';

// =======================
// COMMON SCHEMAS
// =======================

/**
 * E-posta validasyonu
 * Türkçe hata mesajları ile
 */
export const emailSchema = z
  .string()
  .min(1, 'E-posta adresi zorunludur')
  .email('Geçerli bir e-posta adresi giriniz')
  .max(100, 'E-posta adresi çok uzun (max 100 karakter)')
  .refine((email) => email.includes('@') && email.includes('.'), {
    message: 'E-posta formatı hatalı',
  });

/**
 * Telefon numarası validasyonu
 * Türk telefon formatları
 */
export const phoneSchema = z
  .string()
  .min(1, 'Telefon numarası zorunludur')
  .regex(
    /^(\+90|0)?[5][0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}$/,
    'Geçerli bir telefon numarası giriniz (örn: 05XX XXX XX XX)'
  );

/**
 * İsim validasyonu
 */
export const nameSchema = z
  .string()
  .min(2, 'Ad en az 2 karakter olmalıdır')
  .max(50, 'Ad en fazla 50 karakter olabilir')
  .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Ad sadece harf içerebilir');

/**
 * Şirket adı validasyonu
 */
export const companyNameSchema = z
  .string()
  .min(2, 'Şirket adı en az 2 karakter olmalıdır')
  .max(100, 'Şirket adı en fazla 100 karakter olabilir');

/**
 * Mesaj validasyonu
 */
export const messageSchema = z
  .string()
  .min(10, 'Mesaj en az 10 karakter olmalıdır')
  .max(1000, 'Mesaj en fazla 1000 karakter olabilir');

/**
 * URL validasyonu
 */
export const urlSchema = z
  .string()
  .url('Geçerli bir URL giriniz')
  .max(200, 'URL çok uzun');

// =======================
// AUTH SCHEMAS
// =======================

/**
 * Google OAuth Login Schema
 * NextAuth kullanıldığı için sadece callback validation
 */
export const authCallbackSchema = z.object({
  code: z.string().min(1, 'Authorization code gerekli'),
  state: z.string().optional(),
});

// =======================
// İLETİŞİM FORMU SCHEMAS
// =======================

/**
 * İletişim formu validasyonu
 */
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  subject: z.string().min(3, 'Konu en az 3 karakter olmalıdır').max(100, 'Konu çok uzun'),
  message: messageSchema,
  // Honeypot field (bot protection)
  website: z.string().max(0, 'Bu alan boş olmalıdır').optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// =======================
// ANKET FORMU SCHEMAS
// =======================

/**
 * FOKUS Anket formu
 */
export const fokusAnketSchema = z.object({
  email: emailSchema,
  name: nameSchema.optional(),
  companyName: companyNameSchema.optional(),
  responses: z.array(z.object({
    questionId: z.string(),
    answer: z.union([z.string(), z.number(), z.array(z.string())]),
  })),
});

export type FokusAnketData = z.infer<typeof fokusAnketSchema>;

/**
 * Basit anket formu
 */
export const basitAnketSchema = z.object({
  email: emailSchema.optional(),
  rating: z.number().min(1, 'Puan 1-5 arasında olmalıdır').max(5, 'Puan 1-5 arasında olmalıdır'),
  feedback: z.string().max(500, 'Geri bildirim en fazla 500 karakter olabilir').optional(),
});

export type BasitAnketData = z.infer<typeof basitAnketSchema>;

// =======================
// ASISTAN AYARLARI SCHEMAS
// =======================

/**
 * FOKUS001 - Yönetici Asistan
 */
export const fokus001Schema = z.object({
  email: emailSchema,
  fullName: nameSchema,
  displayName: z.string().min(2, 'Görünecek isim en az 2 karakter olmalıdır').max(50),
  title: z.string().max(100).optional(),
  departman: z.string().max(100).optional(),
  ozelAdi: z.string().max(50).optional(),
  etiketler001: z.array(z.string().max(50)).max(15, 'En fazla 15 etiket ekleyebilirsiniz'),
  musteriTalepleri001: z.string().max(2000).optional(),
});

export type Fokus001Data = z.infer<typeof fokus001Schema>;

/**
 * FOKUS216 - Müşteri Hizmetleri Asistan
 */
export const fokus216Schema = z.object({
  kurumsalIsim: companyNameSchema,
  dil: z.enum(['Türkçe', 'İngilizce', 'Almanca', 'Fransızca', 'İspanyolca']),
  channels: z.object({
    whatsapp: z.boolean(),
    instagram: z.boolean(),
    telegram: z.boolean(),
    web: z.boolean(),
  }),
  yanitOnceligi: z.enum(['Hız', 'Detay', 'Dengeli']),
  musteriTalepleri216: z.string().max(2000).optional(),
});

export type Fokus216Data = z.infer<typeof fokus216Schema>;

/**
 * FOKUS520 - CRM Personel
 */
export const crmPersonelSchema = z.object({
  id: z.string(),
  ad: nameSchema,
  soyad: nameSchema,
  email: emailSchema,
  unvanRol: z.string().max(100).optional(),
  gozukecekIsim: z.string().min(2, 'Görünecek isim zorunludur').max(100),
  departman: z.string().max(100).optional(),
  fotoURL: urlSchema.optional(),
});

export const fokus520Schema = z.object({
  crmPersonnel: z.array(crmPersonelSchema).max(5, 'En fazla 5 personel ekleyebilirsiniz'),
  musteriTalepleri520: z.string().max(2000).optional(),
});

export type Fokus520Data = z.infer<typeof fokus520Schema>;
export type CrmPersonelData = z.infer<typeof crmPersonelSchema>;

// =======================
// KURUMSAL AYARLAR SCHEMAS
// =======================

/**
 * Personel validasyonu
 */
export const staffSchema = z.object({
  id: z.number().int().min(1).max(30),
  name: z.string().min(2, 'Personel ismi en az 2 karakter olmalıdır').max(100),
  position: z.string().min(2, 'Görev en az 2 karakter olmalıdır').max(100),
  calendarId: emailSchema.optional(),
  photoUrl: urlSchema.optional(),
  location: z.string().max(200).optional(),
  details: z.string().max(1000).optional(),
  note: z.string().max(500).optional(),
  services: z.record(z.string(), z.boolean()),
});

export type StaffData = z.infer<typeof staffSchema>;

/**
 * Hizmet validasyonu
 */
export const serviceSchema = z.object({
  id: z.number().int().min(1).max(75),
  name: z.string().min(2, 'Hizmet adı en az 2 karakter olmalıdır').max(200),
  sessions: z.number().int().min(1, 'Seans sayısı en az 1 olmalıdır').max(100),
  duration: z.number().int().min(1, 'Süre en az 1 dakika olmalıdır').max(1440),
  price: z.number().min(0, 'Ücret negatif olamaz'),
  note: z.string().max(500).optional(),
});

export type ServiceData = z.infer<typeof serviceSchema>;

/**
 * Cihaz validasyonu
 */
export const deviceSchema = z.object({
  name: z.string().min(1, 'Cihaz adı zorunludur').max(100),
});

export type DeviceData = z.infer<typeof deviceSchema>;

/**
 * Stok ürün validasyonu
 */
export const stockSchema = z.object({
  name: z.string().min(1, 'Ürün adı zorunludur').max(200),
  isExisting: z.boolean().optional(),
});

export type StockData = z.infer<typeof stockSchema>;

/**
 * Kurumsal ayarlar formu
 */
export const kurumsalSettingsSchema = z.object({
  personeller: z.array(staffSchema).max(30, 'En fazla 30 personel ekleyebilirsiniz'),
  islemler: z.array(serviceSchema).max(75, 'En fazla 75 hizmet ekleyebilirsiniz'),
  cihazlar: z.array(deviceSchema).max(10, 'En fazla 10 cihaz ekleyebilirsiniz'),
  stokUrunleri: z.array(stockSchema).max(100, 'En fazla 100 stok ürünü ekleyebilirsiniz'),
});

export type KurumsalSettingsData = z.infer<typeof kurumsalSettingsSchema>;

// =======================
// HELPER FUNCTIONS
// =======================

/**
 * Zod hatalarını kullanıcı dostu formata çevirir
 */
export function formatZodError(error: z.ZodError): string[] {
  return error.issues.map((err: any) => err.message);
}

/**
 * Form validasyonu yapar ve hatalar döner
 */
export function validateForm<T>(
  schema: z.Schema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: formatZodError(error) };
    }
    return { success: false, errors: ['Beklenmeyen bir hata oluştu'] };
  }
}
