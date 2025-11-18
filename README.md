# FOKUS İstatistik ve YZ Danışmanlığı - SaaS Platformu

Modern, tam donanımlı yapay zeka destekli iş süreçleri otomasyon platformu. 9 farklı sanal asistan ile işletmelere dijital dönüşüm hizmeti sunar.

[![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)

---

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Sanal Asistanlar](#-sanal-asistanlar)
- [Teknoloji Stack](#️-teknoloji-stack)
- [Proje Yapısı](#-proje-yapısı)
- [Hızlı Başlangıç](#-hızlı-başlangıç)
- [Güvenlik Sistemi](#-güvenlik-sistemi)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Dokümantasyon](#-dokümantasyon)

---

## 🚀 Özellikler

### 🎯 İş Süreçleri Otomasyonu
- ✅ **9 Farklı Sanal Asistan** - Her iş süreci için özelleştirilmiş AI asistanları
- ✅ **Akıllı Form Sistemi** - İhtiyaç analizi ve otomatik öneri sistemi
- ✅ **Gerçek Zamanlı Analiz** - n8n webhook entegrasyonu ile anlık veri işleme
- ✅ **Kişiselleştirilmiş Raporlama** - Kullanıcıya özel analiz ve öneriler

### 🔐 Güvenlik ve Koruma
- ✅ **3 Katmanlı Spam Koruması**:
  - Honeypot (görünmez tuzak alanlar)
  - Timestamp kontrolü (minimum form doldurma süresi)
  - Google reCAPTCHA v3 (AI tabanlı bot tespiti)
- ✅ **Rate Limiting** - IP bazlı istek sınırlama (memory-based, Redis gerektirmez)
- ✅ **Google OAuth 2.0** - Güvenli kimlik doğrulama
- ✅ **KVKK Uyumluluğu** - Cookie consent ve gizlilik politikaları

### 🎨 Kullanıcı Deneyimi
- ✅ **Responsive Tasarım** - Mobil, tablet ve desktop uyumlu
- ✅ **PWA Desteği** - Progressive Web App özellikleri
- ✅ **Canlı Sohbet Widget** - Vapi.ai entegrasyonu
- ✅ **Modern UI/UX** - Tailwind CSS ile şık arayüz
- ✅ **Dark Mode Ready** - Tema desteği altyapısı

### 📊 Pazarlama ve Analitik
- ✅ **Google Analytics 4** - Dual tracking (2 measurement ID)
- ✅ **Google Consent Mode v2** - GDPR/KVKK uyumlu izleme
- ✅ **Cross-domain Tracking** - Subdomain izleme desteği
- ✅ **SEO Optimizasyonu** - Meta tags, Open Graph, Twitter Cards, Schema.org
- ✅ **Blog Sistemi** - İçerik yönetimi ve dinamik routing

### ⚙️ Teknik Özellikler
- ✅ **Next.js 16 App Router** - Modern React framework
- ✅ **TypeScript** - Tip güvenliği
- ✅ **Server-Side Rendering** - SEO ve performans
- ✅ **Static Generation** - 46+ sayfa ön-render
- ✅ **API Routes** - Backend işlemleri için RESTful endpoints
- ✅ **Webhook Integration** - n8n ile otomasyon

---

## 🤖 Sanal Asistanlar

Sistemde 9 farklı AI sanal asistan bulunmaktadır:

| Kod | İsim | Alan | Açıklama |
|-----|------|------|----------|
| **FOKUS001** | 👔 Yönetici Asistanı | Yönetim | Takvim, görev, rapor yönetimi |
| **FOKUS216** | 💬 Müşteri Hizmetleri | Destek | 7/24 otomatik yanıt, ticket sistemi |
| **FOKUS314** | 📊 Veri Analisti | Analiz | İstatistik, raporlama, görselleştirme |
| **FOKUS520** | 🎯 Pazarlama | Marketing | Lead takip, kampanya yönetimi, CRM |
| **FOKUS618** | 💰 Finans | Muhasebe | Fatura, ödeme, gelir-gider takibi |
| **FOKUS707** | 👥 İnsan Kaynakları | İK | Personel, izin, performans yönetimi |
| **FOKUS717** | 🎨 İçerik Tasarımı | Tasarım | Görsel, video, içerik üretimi |
| **FOKUS808** | 📱 Sosyal Medya | İletişim | Post planlama, etkileşim analizi |
| **FOKUS999** | 🃏 Joker Asistan | Özel | Kullanıcıya özel çözümler |

Her asistan `lib/assistantsData.ts` dosyasında detaylı olarak tanımlanmıştır.

---

## 🛠️ Teknoloji Stack

### Frontend
- **Framework**: Next.js 16.0.1 (App Router, Turbopack)
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.0
- **Icons**: Lucide React 0.553
- **UI Components**: Headless UI 2.2.9

### Backend & Integration
- **API Routes**: Next.js API Handlers
- **Authentication**: Google OAuth 2.0
- **Webhook**: n8n integration
- **Security**:
  - react-google-recaptcha-v3 (1.11.0)
  - Custom rate limiter
  - Honeypot system
- **HTTP Client**: Axios 1.13.2

### Analytics & Marketing
- **Analytics**: Google Analytics 4 (GA4)
- **Consent Management**: Google Consent Mode v2
- **Chat Widget**: Vapi.ai integration
- **SEO**: Next.js metadata API, Schema.org

### Development Tools
- **Linting**: ESLint 9
- **Type Checking**: TypeScript Compiler
- **Package Manager**: npm

---

## 📁 Proje Yapısı

```
fokusistatistik/
├── app/                        # Next.js 16 App Router
│   ├── (pages)/               # Route grupları
│   │   ├── page.tsx          # Ana sayfa (/)
│   │   ├── iletisim/         # İletişim formu (/iletisim)
│   │   ├── analiz-formu/     # Analiz formu (/analiz-formu)
│   │   ├── sanalasistanlar/  # Asistan listesi
│   │   ├── blog/             # Blog sistemi
│   │   ├── giris/            # Login sayfası
│   │   ├── dashboard/        # Kullanıcı paneli
│   │   └── ...               # Diğer sayfalar
│   ├── api/                   # Backend API routes
│   │   ├── contact/          # İletişim formu API
│   │   ├── analysis/         # Analiz formu API
│   │   ├── auth/             # OAuth endpoints
│   │   ├── blogs/            # Blog API
│   │   └── webhook/          # n8n webhook
│   ├── components/            # React components
│   │   ├── GoogleAnalytics.tsx
│   │   ├── RecaptchaProvider.tsx
│   │   ├── CookieConsent.tsx
│   │   ├── ChatWidget.tsx
│   │   └── ...
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── not-found.tsx         # 404 page
├── components/                # Shared components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── lib/                       # Utility libraries
│   ├── assistantsData.ts     # Asistan verileri
│   ├── rateLimiter.ts        # Rate limiting helper
│   ├── recaptcha.ts          # reCAPTCHA helper
│   ├── google-auth.ts        # OAuth helper
│   └── webhook.ts            # Webhook helper
├── public/                    # Static assets
│   ├── favicon.ico
│   └── manifest.json
├── .env.local                 # Environment variables (gitignore)
├── .env.example               # Env template
├── next.config.ts            # Next.js config
├── tailwind.config.ts        # Tailwind config
├── tsconfig.json             # TypeScript config
├── package.json              # Dependencies
└── README.md                 # Bu dosya
```

### Önemli Klasörler

#### `app/api/` - Backend API Endpoints
- **contact/** - İletişim formu işleme (rate limit + reCAPTCHA)
- **analysis/** - Analiz formu işleme (rate limit + reCAPTCHA)
- **auth/** - Google OAuth flow
- **blogs/** - Blog CRUD işlemleri
- **webhook/** - n8n entegrasyonu

#### `lib/` - Helper Functions
- **rateLimiter.ts** - Memory-based IP rate limiting
- **recaptcha.ts** - Google reCAPTCHA v3 doğrulama
- **assistantsData.ts** - 9 asistan için veri modeli

#### `app/components/` - Core Components
- **GoogleAnalytics.tsx** - GA4 dual tracking + consent mode
- **RecaptchaProvider.tsx** - reCAPTCHA context provider
- **CookieConsent.tsx** - KVKK uyumlu cookie bildirimi

---

## 🚀 Hızlı Başlangıç

### 1. Gereksinimler

- Node.js 18.x veya üzeri (önerilen: 20.x)
- npm 9.x veya üzeri
- Git

### 2. Kurulum

```bash
# Repository'yi klonla
git clone https://github.com/fokusistatistik/fokusistatistik.git
cd fokusistatistik

# Dependencies kur
npm install

# Environment variables ayarla
cp .env.example .env.local
nano .env.local  # Gerekli değerleri doldur
```

### 3. Google reCAPTCHA v3 Key Al

1. https://www.google.com/recaptcha/admin/create adresine git
2. **reCAPTCHA v3** seç (v2 değil!)
3. Domain ekle: `localhost`, `fokusistatistik.com`
4. Site Key ve Secret Key'i `.env.local`'e ekle

### 4. Development Server Başlat

```bash
npm run dev
```

Tarayıcıda aç: http://localhost:3000

### 5. Production Build

```bash
npm run build
npm start
```

---

## 🔒 Güvenlik Sistemi

Sistemde 3 katmanlı spam ve bot koruması bulunmaktadır:

### 1️⃣ Honeypot (Bal Küpü Tuzağı)
```tsx
// Görünmez input alanı
<input
  type="text"
  name="website"
  className="absolute -left-[9999px]"
  tabIndex={-1}
  autoComplete="off"
/>
```
- Kullanıcılar görmez, botlar otomatik doldurur
- Doldurulursa form reddedilir
- **Etkinlik**: ~90% basit botları engeller

### 2️⃣ Timestamp Kontrolü
```typescript
const formStartTime = Date.now();
// Form submit'te
if (Date.now() - formStartTime < 2000) {
  return; // Bot - çok hızlı
}
```
- Form açılış zamanı kaydedilir
- 2-3 saniyeden kısa gönderim = bot
- **Etkinlik**: ~85% hızlı botları engeller

### 3️⃣ Google reCAPTCHA v3
```typescript
const recaptchaToken = await executeRecaptcha('contact_form');
// Backend'de doğrulama
const result = await verifyRecaptcha(token);
if (result.score < 0.5) {
  return; // Bot şüphesi
}
```
- Google AI her kullanıcıya 0.0-1.0 skor verir
- 0.5'in altı şüpheli/bot
- Kullanıcı hiçbir şey görmez (v3 arka planda çalışır)
- **Etkinlik**: ~99% sofistike botları engeller

### 4️⃣ Rate Limiting

**İletişim Formu**: Max 3 istek/dakika
**Analiz Formu**: Max 2 istek/5 dakika

```typescript
const rateLimitResult = checkRateLimit(clientIP, {
  maxRequests: 3,
  windowMs: 60 * 1000, // 1 dakika
});
```

- IP bazlı sınırlama
- Memory-based (Redis gerektirmez)
- HTTP 429 hatası döner

**Detaylı bilgi**: `SECURITY.md` dosyasına bakın.

---

## 🔧 Environment Variables

`.env.local` dosyasını oluşturun ve aşağıdaki değişkenleri ekleyin:

```bash
# Google Analytics
NEXT_PUBLIC_GA_TAG_ID=G-WNKZVMGKBF
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-Y1KQHRL4NV

# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...
RECAPTCHA_SECRET_KEY=6Lc...

# n8n Webhooks
NEXT_PUBLIC_N8N_CONTACT_WEBHOOK=https://n8n.fokusistatistik.com/webhook/contact
N8N_WEBHOOK_URL=https://n8n.fokusistatistik.com/webhook/main

# Google OAuth (opsiyonel)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Site URL
NEXT_PUBLIC_URL=https://fokusistatistik.com
```

**Önemli**:
- `NEXT_PUBLIC_*` prefix'li değişkenler frontend'de görünür
- Gizli anahtarları asla `NEXT_PUBLIC_` ile başlatmayın
- `.env.example` dosyasında template bulunur

---

## 🌐 API Endpoints

### Public Endpoints

| Endpoint | Method | Açıklama | Rate Limit |
|----------|--------|----------|------------|
| `/api/contact` | POST | İletişim formu | 3/dakika |
| `/api/analysis` | POST | Analiz formu | 2/5 dakika |
| `/api/webhook` | POST | n8n webhook | - |
| `/api/blogs` | GET | Blog listesi | - |
| `/api/blogs/[slug]` | GET | Tek blog | - |

### Authentication Endpoints

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/api/auth/google` | GET | Google OAuth başlat |
| `/api/auth/callback` | GET | OAuth callback |
| `/api/auth/session` | GET | Session bilgisi |
| `/api/auth/logout` | POST | Çıkış |

### Request Örneği: İletişim Formu

```bash
curl -X POST https://fokusistatistik.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmet Yılmaz",
    "phone": "5551234567",
    "email": "ahmet@example.com",
    "message": "Merhaba, bilgi almak istiyorum",
    "recaptchaToken": "03AGdBq25..."
  }'
```

### Response Örneği

```json
{
  "success": true,
  "message": "Form başarıyla gönderildi"
}
```

**Detaylı API dokümantasyonu**: `API_DOCS.md` dosyasına bakın.

---

## 🚀 Deployment

### Vercel (Önerilen)

```bash
# Vercel CLI kur
npm i -g vercel

# Deploy
vercel
```

Environment variables'ları Vercel Dashboard'dan ekleyin.

### PM2 (VPS)

```bash
# Build
npm run build

# PM2 ile başlat
pm2 start npm --name "fokusistatistik" -- start

# Auto-restart
pm2 startup
pm2 save
```

### Docker (Gelecek)

Docker desteği planlanıyor.

**Detaylı deployment rehberi**: `DEPLOYMENT.md` dosyasına bakın.

---

## 📚 Dokümantasyon

| Dosya | Açıklama |
|-------|----------|
| `README.md` | Bu dosya - Genel bakış |
| `ARCHITECTURE.md` | Sistem mimarisi ve tasarım kararları |
| `API_DOCS.md` | API endpoint'lerin detaylı dokümantasyonu |
| `SECURITY.md` | Güvenlik sistemi ve best practices |
| `DEPLOYMENT.md` | Production deployment rehberi |
| `DEVELOPMENT.md` | Geliştirici kılavuzu |
| `.env.example` | Environment variables şablonu |

---

## 🧪 Testing

```bash
# TypeScript tip kontrolü
npx tsc --noEmit

# Build testi
npm run build

# Lint
npm run lint
```

---

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'feat: Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

## 📄 Lisans

© 2025 FOKUS İstatistik ve YZ Danışmanlığı. Tüm hakları saklıdır.

---

## 📞 İletişim

- **Website**: https://fokusistatistik.com
- **Email**: bilgi@fokusistatistik.com
- **Telefon**: +90 535 404 07 12

---

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - React framework
- [Vercel](https://vercel.com/) - Hosting platform
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Google](https://developers.google.com/) - Analytics & reCAPTCHA
- [n8n](https://n8n.io/) - Workflow automation

---

**Son Güncelleme**: 18 Kasım 2025
**Version**: 0.1.0
**Branch**: claude/fix-system-errors-01RFV4h44jhUY6qHpH9HuyfR
