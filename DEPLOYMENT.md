# 🚀 FOKUS İstatistik - Deployment Guide

Bu döküman, FOKUS İstatistik web sitesinin **test.fokusistatistik.com** adresine deploy edilmesi için gerekli adımları içerir.

## 📋 Gereksinimler

- Node.js 18+
- npm veya yarn
- Vercel / Netlify hesabı (önerilen) veya kendi sunucu
- Google OAuth credentials
- İyzico API credentials (opsiyonel - ödeme için)

## 🔧 Environment Variables

Deployment platformunuzda (Vercel, Netlify, vb.) aşağıdaki environment variable'ları ayarlayın:

### 1. NextAuth Ayarları

```bash
NEXTAUTH_URL=https://test.fokusistatistik.com
NEXTAUTH_SECRET=<güçlü-random-string>
```

**NEXTAUTH_SECRET oluşturmak için:**
```bash
openssl rand -base64 32
```

### 2. Google OAuth

Google Cloud Console'da (https://console.cloud.google.com):
1. Yeni OAuth 2.0 Client ID oluşturun
2. **Authorized redirect URIs** ekleyin:
   - `https://test.fokusistatistik.com/api/auth/callback/google`
3. Client ID ve Secret'i kaydedin

```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3. n8n Webhook (Opsiyonel)

```bash
N8N_WEBHOOK_URL=https://n8n.fokusistatistik.com/webhook/user-events
```

> **Not:** Webhook URL'leri kodda hard-coded olduğu için bu değişken şu anda kullanılmıyor.

### 4. İyzico Payment (Opsiyonel)

```bash
IYZICO_API_KEY=your-production-api-key
IYZICO_SECRET_KEY=your-production-secret-key
IYZICO_BASE_URL=https://api.iyzipay.com
```

> **Önemli:** Sandbox yerine production URL kullanın!

## 🌐 Vercel ile Deploy

### 1. Vercel CLI ile Deploy

```bash
# Vercel CLI kurulumu (ilk kez)
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

### 2. GitHub Entegrasyonu

1. Vercel dashboard'da "Add New Project" tıklayın
2. GitHub reposunu seçin
3. Environment Variables ekleyin (yukarıdaki listeden)
4. Domain ayarları:
   - Custom domain: `test.fokusistatistik.com`
   - DNS ayarlarınızı Vercel'in verdiği CNAME ile güncelleyin
5. Deploy'a tıklayın

## 🎯 Deploy Sonrası Kontrol Listesi

- [ ] Site açılıyor: https://test.fokusistatistik.com
- [ ] Google OAuth login çalışıyor
- [ ] 9 sanal asistan sayfası yükleniyor
- [ ] Chat widget görünüyor ve yanıt veriyor
- [ ] Responsive tasarım mobilde çalışıyor
- [ ] PWA manifest yükleniyor
- [ ] SSL sertifikası aktif

## 🔍 Webhook URL'leri

Proje içinde kullanılan webhook URL'leri:

1. **Asistan Sayfaları**: `https://n8n.fokusistatistik.com/fokuswebsiteasistanlar`
   - Lokasyon: `/app/sanalasistanlar/[id]/page.tsx:1534`
   - Kullanım: Asistan detay verilerini çeker

2. **Chat Widget**: `https://n8n.fokusistatistik.com/webhook/fokus216clasic250001`
   - Lokasyon: `/app/components/ChatWidget.tsx:36`
   - Kullanım: FOKUS216 chatbot yanıtları

## 🛠️ Lokal Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# .env.local oluştur
cp .env.example .env.local

# Environment variable'ları düzenle
nano .env.local

# Dev server başlat
npm run dev
```

## 📝 DNS Ayarları

test.fokusistatistik.com için DNS ayarları:

**Vercel için:**
```
Type: CNAME
Name: test
Value: cname.vercel-dns.com
```

**A Record için (kendi sunucu):**
```
Type: A
Name: test
Value: <sunucu-ip-adresi>
```

## 🔐 Güvenlik Notları

1. **NEXTAUTH_SECRET**: Production'da mutlaka güçlü bir secret kullanın
2. **Google OAuth**: Redirect URI'leri doğru domain ile eşleşmeli
3. **Environment Variables**: Asla git'e commit etmeyin
4. **HTTPS**: Mutlaka SSL sertifikası kullanın
5. **CORS**: n8n webhook'larında gerekirse CORS ayarlarını yapın

## 📞 Destek

Sorun yaşarsanız:
- GitHub Issues: [fokusistatistik/fokusistatistik/issues]
- Webhook sorunları için n8n.fokusistatistik.com kontrol edin
- NextAuth sorunları için callback URL'leri kontrol edin

---

**Son güncelleme:** 2025-11-11
**Deploy hedef:** test.fokusistatistik.com
