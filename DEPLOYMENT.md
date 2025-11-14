# Deployment Rehberi - FOKUS İstatistik

Bu döküman, FOKUS İstatistik Next.js projesinin sunucuya yüklenmesi için gereken tüm adımları içerir.

## 🔧 Ön Gereksinimler

### Sunucu Gereksinimleri
- **Node.js**: v18.x veya üzeri (önerilen: v20.x)
- **npm**: v9.x veya üzeri
- **RAM**: Minimum 2GB (önerilen: 4GB+)
- **Disk**: Minimum 2GB boş alan
- **Port**: 3000 (veya özel port)

### Gerekli Bilgiler
1. Google OAuth Credentials (Client ID & Secret)
2. Webhook URL'leri
3. Domain ve SSL sertifikaları (production için)

---

## 📦 1. Projeyi Sunucuya Aktarma

### GitHub'dan ZIP İndirme
\`\`\`bash
# ZIP'i indirin (GitHub linki)
wget https://github.com/fokusistatistik/fokusistatistik/archive/refs/heads/claude/fix-ui-and-errors-01XUNAH9sYcea3qZwjwKifvj.zip

# ZIP'i açın
unzip claude-fix-ui-and-errors-01XUNAH9sYcea3qZwjwKifvj.zip

# Klasöre girin
cd fokusistatistik-claude-fix-ui-and-errors-01XUNAH9sYcea3qZwjwKifvj
\`\`\`

---

## 🔐 2. Environment Variables Yapılandırması

### .env.local Dosyası Oluşturun
\`\`\`bash
cp .env.example .env.local
nano .env.local
\`\`\`

### Gerekli Environment Variables

\`\`\`bash
# Site URL (PRODUCTION)
NEXT_PUBLIC_URL=https://test.fokusistatistik.com

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-actual-google-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret-here

# Webhook Configuration  
NEXT_PUBLIC_AUTH_WEBHOOK_URL=https://n8n.fokusistatistik.com/webhook-test/fokuswebuserauth
\`\`\`

### ⚠️ ÖNEMLİ:
- **NEXT_PUBLIC_URL**: Sunucunuzun tam URL'i (trailing slash YOK)
- **Google credentials**: Google Cloud Console'dan alın
- **Webhook URL**: Path'e dikkat edin (`/webhook-test/fokuswebuserauth`)

---

## 🎯 3. Google Cloud Console Yapılandırması

### OAuth 2.0 Redirect URI
Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client ID

**Eklenecek URI:**
\`\`\`
https://test.fokusistatistik.com/api/auth/callback
\`\`\`

---

## 📥 4. Bağımlılıkları Yükleme

\`\`\`bash
npm ci
\`\`\`

Sorun çıkarsa:
\`\`\`bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
\`\`\`

---

## 🏗️ 5. Build İşlemi

\`\`\`bash
npm run build
\`\`\`

### Build Kontrolleri:
✅ 0 TypeScript errors
✅ .next klasörü oluşmalı
✅ Exit code 0

Build hatası için:
\`\`\`bash
npx tsc --noEmit
rm -rf .next
npm run build
\`\`\`

---

## 🚀 6. Çalıştırma

### Production Mode
\`\`\`bash
npm start
\`\`\`

Custom port:
\`\`\`bash
PORT=8080 npm start
\`\`\`

### PM2 ile (Önerilen - Auto Restart)
\`\`\`bash
# PM2 kurulumu
npm install -g pm2

# Başlat
pm2 start npm --name "fokusistatistik" -- start

# Otomatik başlatma
pm2 startup
pm2 save

# Loglar
pm2 logs fokusistatistik

# Restart
pm2 restart fokusistatistik
\`\`\`

---

## 🧪 7. Test ve Doğrulama

### OAuth Flow Testi
1. Giriş sayfasına gidin: https://test.fokusistatistik.com/giris
2. "Google ile Giriş Yap" butonuna tıklayın
3. Console'da log'ları kontrol edin:
   - 🚀 Google Auth başlatılıyor...
   - 📥 OAuth Callback alındı
   - 🔄 Webhook'a gönderiliyor...
   - ✅ Authentication başarılı!
   - 🆕 Is new user: true/false
4. Yeni kullanıcı → /dashboard
5. Eski kullanıcı → / (anasayfa)

### Browser Testleri
- ✅ Anasayfa: https://test.fokusistatistik.com
- ✅ Login: https://test.fokusistatistik.com/giris
- ✅ Analiz: https://test.fokusistatistik.com/analiz
- ✅ Dashboard: Login sonrası erişilebilir olmalı

---

## 🐛 8. Troubleshooting

### OAuth Hataları

**"redirect_uri_mismatch"**
→ Google Console'da redirect URI'yi kontrol edin

**"webhook_failed"**  
→ n8n webhook URL'ini ve response formatını kontrol edin

**Session kaybolması**
→ Browser localStorage'da `fokus520Session` olmalı

### Build Hataları
\`\`\`bash
npx tsc --noEmit  # TypeScript hatalarını gösterir
rm -rf node_modules .next
npm install && npm run build
\`\`\`

---

## 📋 9. Deployment Checklist

### Pre-Deployment
- [ ] .env.local dosyası oluşturuldu
- [ ] Google OAuth credentials ayarlandı
- [ ] Redirect URIs Google Console'a eklendi
- [ ] n8n webhook hazır

### Deployment
- [ ] Dependencies yüklendi (npm ci)
- [ ] Build başarılı (npm run build)
- [ ] TypeScript hataları yok
- [ ] PM2 yapılandırıldı

### Post-Deployment
- [ ] Site erişilebilir
- [ ] Google OAuth çalışıyor
- [ ] Yeni/eski kullanıcı yönlendirmesi doğru
- [ ] Console log'ları görünüyor
- [ ] PM2 auto-restart aktif

---

## 🚨 Acil Durum

Siteyi durdurma:
\`\`\`bash
pm2 stop fokusistatistik
\`\`\`

Logları görme:
\`\`\`bash
pm2 logs fokusistatistik --err
\`\`\`

---

## 📞 Destek

- **Webhook Dokümantasyonu**: WEBHOOK_INTEGRATION.md
- **GitHub Issues**: https://github.com/fokusistatistik/fokusistatistik/issues

---

**Son Güncelleme**: 14 Kasım 2025  
**Branch**: claude/fix-ui-and-errors-01XUNAH9sYcea3qZwjwKifvj
