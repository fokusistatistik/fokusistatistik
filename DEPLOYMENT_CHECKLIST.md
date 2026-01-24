# 🚀 Deployment Checklist - FOKUSVersiyon001

**Branch:** FOKUSVersiyon001  
**Tarih:** 24 Ocak 2026  
**Son Commit:** fa39d21

---

## ✅ Tamamlanan Düzeltmeler

### 1. **React Hydration Error #418** ✅
- [x] İletişim formunda fragment yerine span kullanımı
- [x] Production build testi başarılı
- [x] Hydration hatası giderildi

### 2. **Dark Mode Devre Dışı** ✅
- [x] `color-scheme: light only` eklendi
- [x] Dark mode media query kaldırıldı
- [x] Tarayıcı/OS dark mode etkisiz
- [x] Kontrast sorunları giderildi

### 3. **Favicon Çakışması** ✅
- [x] `app/favicon.ico` silindi
- [x] Sadece `public/favicon.ico` kullanılıyor
- [x] 500 favicon hataları giderildi

### 4. **Metadata Uyarıları** ✅
- [x] `themeColor` ve `viewport` generateViewport()'a taşındı
- [x] Next.js 15 standartlarına uygun
- [x] Metadata uyarıları giderildi

### 5. **Dev Indicator (Turbopack Balloon)** ✅
- [x] CSS ile gizlendi
- [x] Development ortamında görünmüyor
- [x] Temiz UI sağlandı

### 6. **Paket Güncellemeleri** ✅
- [x] Next.js 15.5.9 (güvenli sürüm)
- [x] React 19.2.3
- [x] Tüm bağımlılıklar güncel
- [x] 0 güvenlik açığı

### 7. **Build Testi** ✅
- [x] `npm run build` başarılı
- [x] Tüm sayfalar derlendi
- [x] Hata yok

---

## 📋 Staging Deployment Checklist

### Pre-Deployment
- [ ] **Environment Variables Kontrolü**
  - [ ] `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` tanımlı mı?
  - [ ] `RECAPTCHA_SECRET_KEY` tanımlı mı?
  - [ ] `NEXT_PUBLIC_N8N_CONTACT_WEBHOOK` tanımlı mı?
  - [ ] Database connection strings doğru mu?

- [ ] **Build Test**
  ```bash
  npm run build
  npm run start
  ```
  - [ ] Build başarılı
  - [ ] Start başarılı
  - [ ] Port 3000'de çalışıyor

- [ ] **Functional Tests**
  - [ ] Ana sayfa yükleniyor
  - [ ] İletişim formu çalışıyor
  - [ ] Webhook'a istek gidiyor
  - [ ] Dark mode devre dışı
  - [ ] Favicon görünüyor

### Deployment
- [ ] **Git Push**
  ```bash
  git push origin FOKUSVersiyon001
  ```

- [ ] **Staging Server Deploy**
  - [ ] SSH ile sunucuya bağlan
  - [ ] Repository pull
  - [ ] `npm install`
  - [ ] `npm run build`
  - [ ] PM2/Systemd restart

- [ ] **Post-Deployment Verification**
  - [ ] Staging URL'de site açılıyor
  - [ ] SSL sertifikası çalışıyor
  - [ ] Tüm sayfalar yükleniyor
  - [ ] Form gönderimi test edildi
  - [ ] Console'da hata yok

---

## 🚀 Production Deployment Checklist

### Pre-Production
- [ ] **Staging Test Sonuçları**
  - [ ] Staging'de en az 24 saat sorunsuz çalıştı
  - [ ] Tüm functional testler geçti
  - [ ] Performance testleri yapıldı
  - [ ] Security scan temiz

- [ ] **Backup**
  - [ ] Mevcut production kodu yedeklendi
  - [ ] Database backup alındı
  - [ ] Environment variables yedeklendi

- [ ] **Rollback Plan**
  - [ ] Önceki commit ID not edildi
  - [ ] Rollback scripti hazır
  - [ ] Downtime süresi belirlendi

### Deployment
- [ ] **Maintenance Mode** (Opsiyonel)
  - [ ] Bakım sayfası aktif edildi
  - [ ] Kullanıcılara bildirim gönderildi

- [ ] **Production Deploy**
  ```bash
  # Production sunucuda
  git fetch origin
  git checkout FOKUSVersiyon001
  npm install
  npm run build
  pm2 restart fokusistatistik
  # veya
  systemctl restart fokusistatistik
  ```

- [ ] **Health Checks**
  - [ ] Site erişilebilir
  - [ ] SSL çalışıyor
  - [ ] API endpoints yanıt veriyor
  - [ ] Database bağlantısı OK

### Post-Production
- [ ] **Verification**
  - [ ] Ana sayfa yükleniyor
  - [ ] İletişim formu çalışıyor
  - [ ] Dark mode devre dışı
  - [ ] Favicon görünüyor
  - [ ] Hydration hatası yok
  - [ ] Console temiz

- [ ] **Monitoring**
  - [ ] Error logs kontrol edildi
  - [ ] Performance metrics normal
  - [ ] User feedback pozitif

- [ ] **Maintenance Mode Kapat**
  - [ ] Bakım sayfası devre dışı
  - [ ] Normal trafik akışı

---

## 🔧 Environment Variables

### Required Variables

```bash
# .env.local veya .env.production

# Google Analytics & reCAPTCHA
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code
RECAPTCHA_SECRET_KEY=your_recaptcha_secret
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key

# n8n Webhook
NEXT_PUBLIC_N8N_CONTACT_WEBHOOK=https://n8n.fokusistatistik.com/webhook/form1

# Database (if applicable)
DATABASE_URL=your_database_url

# API Keys (if applicable)
VAPI_API_KEY=your_vapi_key
```

### Verification
```bash
# Check environment variables
printenv | grep NEXT_PUBLIC
printenv | grep RECAPTCHA
```

---

## 📊 Performance Checklist

### Lighthouse Scores (Target)
- [ ] Performance: > 90
- [ ] Accessibility: > 95
- [ ] Best Practices: > 95
- [ ] SEO: > 95

### Core Web Vitals
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID (First Input Delay): < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1

### Load Testing
- [ ] Homepage load time: < 2s
- [ ] İletişim page load time: < 2s
- [ ] Form submission time: < 3s

---

## 🔒 Security Checklist

### Headers
- [ ] CSP (Content Security Policy) aktif
- [ ] HSTS (HTTP Strict Transport Security) aktif
- [ ] X-Frame-Options: SAMEORIGIN
- [ ] X-Content-Type-Options: nosniff

### SSL/TLS
- [ ] SSL sertifikası geçerli
- [ ] HTTPS redirect çalışıyor
- [ ] Mixed content yok

### Dependencies
- [ ] `npm audit` temiz (0 vulnerabilities)
- [ ] Tüm paketler güncel
- [ ] Deprecated paketler yok

---

## 🐛 Rollback Procedure

Eğer production'da sorun çıkarsa:

### Quick Rollback
```bash
# Production sunucuda
git checkout <previous_commit_id>
npm install
npm run build
pm2 restart fokusistatistik
```

### Full Rollback
```bash
# Önceki branch'e dön
git checkout main  # veya önceki stable branch
npm install
npm run build
pm2 restart fokusistatistik
```

### Database Rollback (if needed)
```bash
# Backup'tan restore
# (Database-specific commands)
```

---

## 📝 Deployment Commands

### Staging
```bash
# Local
git push origin FOKUSVersiyon001

# Staging Server
ssh user@staging.fokusistatistik.com
cd /var/www/fokusistatistik
git pull origin FOKUSVersiyon001
npm install
npm run build
pm2 restart fokusistatistik-staging
```

### Production
```bash
# Production Server
ssh user@fokusistatistik.com
cd /var/www/fokusistatistik
git fetch origin
git checkout FOKUSVersiyon001
npm install
npm run build
pm2 restart fokusistatistik
# veya
systemctl restart fokusistatistik
```

---

## 🎯 Success Criteria

### Staging Success
- ✅ Build başarılı
- ✅ Tüm sayfalar yükleniyor
- ✅ Form çalışıyor
- ✅ Console temiz
- ✅ 24 saat sorunsuz çalıştı

### Production Success
- ✅ Zero downtime deployment
- ✅ Tüm functionality çalışıyor
- ✅ Performance metrics normal
- ✅ Error rate < 0.1%
- ✅ User feedback pozitif

---

## 📞 Emergency Contacts

### Technical Team
- **Developer:** [Your Name]
- **DevOps:** [DevOps Contact]
- **Database Admin:** [DBA Contact]

### Escalation
1. Developer (0-15 min)
2. Tech Lead (15-30 min)
3. CTO (30+ min)

---

## 📅 Deployment Timeline

### Recommended Schedule
- **Staging:** Pazartesi 10:00
- **Production:** Çarşamba 14:00 (düşük trafik saati)

### Avoid
- ❌ Cuma öğleden sonra
- ❌ Hafta sonu
- ❌ Tatil günleri
- ❌ Yoğun trafik saatleri

---

## ✅ Final Checklist

### Before Deploy
- [ ] Tüm testler geçti
- [ ] Code review yapıldı
- [ ] Dokümantasyon güncellendi
- [ ] Backup alındı
- [ ] Rollback planı hazır

### During Deploy
- [ ] Monitoring aktif
- [ ] Team bilgilendirildi
- [ ] Logs izleniyor

### After Deploy
- [ ] Verification tamamlandı
- [ ] Monitoring normal
- [ ] Team bilgilendirildi
- [ ] Dokümantasyon güncellendi

---

**Deployment Durumu:** 🟡 Staging'e Hazır  
**Production Durumu:** 🟡 Staging test sonrası  
**Risk Seviyesi:** 🟢 Düşük (Minor fixes)
