# 🤖 FOKUS İstatistik ve YZ Danışmanlığı

> Türkiye'nin lider yapay zeka danışmanlık platformu - 9 Farklı AI Asistan Ekosistemi

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](LICENSE)

Modern, kullanıcı dostu 9 sanal asistanlı SaaS platformu. Next.js 16, TypeScript, Tailwind CSS ve NextAuth.js ile geliştirilmiştir.

## 🚀 Özellikler

- ✅ **9 Farklı Sanal Asistan** - Her iş süreci için özel asistanlar
- ✅ **Google OAuth Girişi** - Kolay ve güvenli kimlik doğrulama
- ✅ **Modern Dashboard** - Kullanıcı dostu yönetim paneli
- ✅ **PWA Desteği** - Progressive Web App uyumlu
- ✅ **Responsive Tasarım** - Tüm cihazlarda mükemmel görünüm
- ✅ **n8n Webhook Entegrasyonu** - Otomasyon ve workflow desteği
- ✅ **İyzico Ödeme Hazırlığı** - Güvenli ödeme altyapısı
- ✅ **SEO Optimizasyonu** - Arama motorlarına optimize edilmiş

## 🎨 Sanal Asistanlar

1. **FOKUS001** - Yönetici Sanal Asistanı 👔
2. **FOKUS216** - Müşteri Hizmetleri Sanal Asistanı 💬
3. **FOKUS314** - Veri Analisti Sanal Asistanı 📊
4. **FOKUS520** - Pazarlama & Lead Takip Sanal Asistanı 🎯
5. **FOKUS618** - Finans & Fatura Sanal Asistanı 💰
6. **FOKUS707** - İnsan Kaynakları Sanal Asistanı 👥
7. **FOKUS717** - İçerik Tasarımı Sanal Asistanı 🎨
8. **FOKUS808** - Sosyal Medya & İletişim Sanal Asistanı 📱
9. **FOKUS999** - Joker Sanal Asistan 🃏

## 🛠️ Teknolojiler

- **Framework**: Next.js 14 (App Router)
- **Dil**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: NextAuth.js
- **Icons**: Lucide React

## 📦 Kurulum

### Gereksinimler

- Node.js 20.x veya üzeri
- npm veya yarn
- Git

### Adım 1: Repoyu Klonlayın

```bash
git clone https://github.com/your-org/fokusistatistik.git
cd fokusistatistik
```

### Adım 2: Bağımlılıkları Yükleyin

```bash
npm install
# veya
yarn install
```

### Adım 3: Environment Variables

`.env.example` dosyasını kopyalayıp `.env.local` olarak kaydedin:

```bash
cp .env.example .env.local
```

Gerekli değişkenleri doldurun:

```env
# Google OAuth (Google Cloud Console'dan alın)
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key  # openssl rand -base64 32

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-WNKZVMGKBF
```

### Adım 4: Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Tarayıcınızda açın: [http://localhost:3000](http://localhost:3000)

## 🔧 Komutlar

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Production sunucusu
npm run start

# Linting
npm run lint
```

## 📂 Proje Yapısı

```
fokusistatistik/
├── app/
│   ├── ayarlar/              # Ayarlar sayfaları
│   │   ├── asistanlar/      # AI asistan ayarları
│   │   └── kurumsal/        # Kurumsal ayarlar
│   ├── dashboard/           # Dashboard
│   ├── api/                 # API routes
│   │   ├── auth/            # NextAuth
│   │   └── webhook/         # Webhook handlers
│   └── components/          # Page-level components
├── components/              # Global components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── TeknikDestekChatbot.tsx
│   └── GoogleAnalytics.tsx
├── public/                  # Static assets
└── .env.local              # Environment variables (local)
```

## 🔌 API Entegrasyonları

### N8N Webhook Endpoints

```typescript
// Asistan ayarları kaydetme
POST https://n8n.fokusistatistik.com/webhook/settingsasistantssavedata

// Kurumsal ayarlar kaydetme
POST https://n8n.fokusistatistik.com/webhook/settingsasistants

// Personel fotoğrafı yükleme
POST https://n8n.fokusistatistik.com/webhook/uploadstaffphoto

// Fotoğraf kaydetme (FOKUS asistanları)
POST https://n8n.fokusistatistik.com/webhook/fokusfotografkaydet
```

## 🚀 Deployment

### Vercel (Önerilen)

1. GitHub'a push yapın
2. [Vercel](https://vercel.com) hesabınıza giriş yapın
3. "Import Project" → GitHub repo'nuzu seçin
4. Environment variables ekleyin
5. Deploy!

### Environment Variables (Production)

Vercel Dashboard → Settings → Environment Variables:

```
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
NEXTAUTH_URL=https://fokusistatistik.com
NEXTAUTH_SECRET
NEXT_PUBLIC_GA_MEASUREMENT_ID
```

## 🔒 Güvenlik

### Mevcut Güvenlik Önlemleri

✅ Google OAuth 2.0 kimlik doğrulama
✅ NextAuth.js session yönetimi (24 saat)
✅ IP anonymization (Google Analytics)
✅ Cookie consent yönetimi
✅ Rate limiting (sunucu tarafı)
✅ HTTPS enforced

### Planlanan İyileştirmeler

⏳ CSRF token koruması
⏳ Input validation (Zod)
⏳ Honeypot fields
⏳ reCAPTCHA v3 (invisible)
⏳ Sentry.io error tracking

## 📝 Yapılacaklar

- [ ] CSRF token koruması ekle
- [ ] Zod validation tüm formlara ekle
- [ ] Sentry.io entegrasyonu
- [ ] Redis caching layer
- [ ] Unit test coverage (%70+)
- [ ] E2E testler (Playwright)
- [ ] API documentation (Swagger)

## 🐛 Hata Ayıklama

### Yaygın Sorunlar

**Problem**: Google OAuth çalışmıyor
**Çözüm**: Google Cloud Console'da Authorized redirect URIs kontrol edin:
```
http://localhost:3000/api/auth/callback/google
https://fokusistatistik.com/api/auth/callback/google
```

**Problem**: Webhook 404 hatası veriyor
**Çözüm**: N8N workflow'unun aktif olduğundan emin olun

## 🤝 Katkıda Bulunma

### Commit Kuralları

```
feat: Yeni özellik
fix: Bug düzeltme
docs: Dokümantasyon
style: Kod formatı
refactor: Kod iyileştirme
test: Test ekleme
chore: Genel işler
```

## 👤 İletişim

**FOKUS İstatistik ve YZ Danışmanlığı**
- Website: https://www.fokusistatistik.com
- Email: info@fokusistatistik.com
- Destek: destek@fokusistatistik.com

---

## 📄 Lisans

Proprietary License - © 2024 FOKUS İstatistik ve YZ Danışmanlığı

---

**Made with ❤️ by FOKUS İstatistik Team**

🚀 **Version**: 0.1.0 | 📅 **Last Updated**: 2024-11-13
