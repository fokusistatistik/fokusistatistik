# 🚀 FOKUS İstatistik - Deployment Guide

Bu döküman, FOKUS İstatistik web sitesinin **test.fokusistatistik.com** adresine deploy edilmesi için gerekli adımları içerir.

## ⚡ Önemli Not: OAuth Webhook ile Yönetiliyor

Bu projede **Google OAuth sürecini n8n webhook üzerinden yönetiyorsunuz**, bu nedenle GOOGLE_CLIENT_SECRET backend'de gerekli değildir.

## 📋 Gereksinimler

- Node.js 20+
- npm veya yarn
- PM2 (process manager)
- Nginx/Apache (reverse proxy)
- SSL Certificate (HTTPS zorunlu)
- n8n instance (webhook'lar için)

## 🔧 Environment Variables

Sunucunuzda `.env.local` dosyası oluşturun:

```bash
cp .env.local.template .env.local
nano .env.local
```

### Minimum Gerekli Değişkenler:

```bash
# NextAuth (Temel)
NEXTAUTH_URL=https://test.fokusistatistik.com
NEXTAUTH_SECRET=YOUR_SECRET_HERE  # openssl rand -base64 32

# n8n Webhook (Backend)
N8N_WEBHOOK_URL=https://n8n.fokusistatistik.com

# Sentry Error Tracking
NEXT_PUBLIC_SENTRY_DSN=https://196e6d84f952f2459e7c02e17e563b46@o4510357778333696.ingest.de.sentry.io/4510357789343824

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-WNKZVMGKBF

# Environment
NODE_ENV=production
```

**NEXTAUTH_SECRET oluşturmak için:**
```bash
openssl rand -base64 32
```

> **Önemli:** Google OAuth webhook üzerinden yönetildiği için GOOGLE_CLIENT_ID/SECRET burada gerekli değil!

## 🚀 Sunucu Kurulumu

### 1. Dependencies Yükle

```bash
cd /path/to/fokusistatistik
npm install
```

### 2. Build

```bash
npm run build
```

### 3. PM2 ile Başlat

```bash
# PM2 kur (ilk kez)
npm install -g pm2

# Start
pm2 start npm --name "fokusistatistik" -- start

# Auto-restart on reboot
pm2 save
pm2 startup

# Status kontrol
pm2 status
pm2 logs fokusistatistik
```

### 4. Nginx Reverse Proxy

```nginx
server {
    listen 443 ssl http2;
    server_name test.fokusistatistik.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Config test ve reload
nginx -t
systemctl reload nginx
```

## 🎯 Deploy Sonrası Kontrol Listesi

- [ ] Site açılıyor: https://test.fokusistatistik.com
- [ ] Google OAuth login çalışıyor
- [ ] 9 sanal asistan sayfası yükleniyor
- [ ] Chat widget görünüyor ve yanıt veriyor
- [ ] Responsive tasarım mobilde çalışıyor
- [ ] PWA manifest yükleniyor
- [ ] SSL sertifikası aktif

## 🔗 n8n Webhook Entegrasyonu

### Kullanıcı Yönetimi Webhook'u

**Endpoint:** `https://n8n.fokusistatistik.com/webhook/fokuswebsitekullanicibilgileri`

#### 1. Kullanıcı Kontrolü (Check)
```javascript
POST /webhook/fokuswebsitekullanicibilgileri
{
  "action": "check",
  "email": "user@example.com",
  "googleId": "123456789"
}

// Response (varsa):
{ "exists": true, "user": {...} }

// Response (yoksa):
{ "exists": false }
```

#### 2. Kullanıcı Kaydı (Register)
```javascript
POST /webhook/fokuswebsitekullanicibilgileri
{
  "action": "register",
  "email": "user@example.com",
  "googleId": "123456789",
  "name": "John Doe",
  "picture": "https://...",
  "emailSubscription": true,
  "acceptedTerms": true,
  "registeredAt": "2025-11-13T..."
}

// Response:
{ "success": true, "message": "User registered" }
```

#### 3. Profil Getir (Get)
```javascript
POST /webhook/fokuswebsitekullanicibilgileri
{
  "action": "get",
  "email": "user@example.com",
  "googleId": "123456789"
}

// Response:
{
  "firstName": "John",
  "lastName": "Doe",
  "company": "ACME",
  "birthYear": 1990,
  "phone": "5551234567",
  "kvkkConsent": true,
  "emailSubscription": true,
  "smsSubscription": false,
  "profileCompleted": true
}
```

#### 4. Profil Güncelle (Update)
```javascript
POST /webhook/fokuswebsitekullanicibilgileri
{
  "action": "update",
  "email": "user@example.com",
  "googleId": "123456789",
  "firstName": "John",
  "lastName": "Doe",
  ...
}

// Response:
{ "success": true, "message": "Profile updated" }
```

### Diğer Webhook'lar

1. **Asistan Sayfaları**: `https://n8n.fokusistatistik.com/fokuswebsiteasistanlar`
2. **Chat Widget**: iframe üzerinden (`https://asistan.fokusistatistik.com/chatbot216.html`)
3. **Voice Widget**: iframe üzerinden (`https://asistan.fokusistatistik.com/sesliasistan520.html`)

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

## 🎉 Yenilikler (v2.0 - 2025-11-13)

- ✅ Mobil widget optimizasyonları (50px → 40-38px mobil)
- ✅ Google OAuth onboarding (WelcomeModal)
- ✅ Profil yönetim sistemi (tam fonksiyonel)
- ✅ Touch-friendly form elemanları (44px min)
- ✅ Dashboard demo data uyarısı
- ✅ n8n webhook entegrasyonu (kullanıcı yönetimi)
- ✅ Sentry error tracking
- ✅ Production-ready optimizasyonlar

**Son güncelleme:** 2025-11-13
**Versiyon:** 2.0 (commit: 273df12)
**Deploy hedef:** test.fokusistatistik.com
