# 🚀 FOKUS İstatistik - Automated Deployment System

Bu belge, `deploy.sh` scriptinin kullanımını ve sunucu yapılandırmasını açıklar. Bu script, **Next.js** projesini üretim ortamına güvenli ve otomatik bir şekilde dağıtmak için tasarlanmıştır.

## 📋 Özellikler

- **🔒 Güvenli İzin Yönetimi:** Dosya sahipliklerini otomatik ayarlar.
- **💾 Otomatik Yedekleme:** Her deploy öncesi proje dosyalarını yedekler.
- **🔄 Git Entegrasyonu:** `FOKUSVersiyon001` (veya belirtilen branch) üzerinden günceller.
- **📦 Akıllı Paket Yönetimi:** `package.json` değişikliğini algılar ve sadece gerektiğinde `npm install` yapar.
- **🏗️ Production Build:** Next.js optimizasyonlarıyla build alır.
- **🔙 Rollback Mekanizması:** Build başarısız olursa sistemi otomatik olarak eski çalışan haline döndürür.
- **🚀 PM2 Process Yönetimi:** Uygulamayı kesintisiz (zero-downtime) yeniden başlatır.
- **🧹 Otomatik Temizlik:** 30 günden eski yedekleri ve npm cache'i temizler.

---

## 🛠️ Kurulum ve Kullanım

### 1. Scripti Sunucuya Yükleme

Projeyi sunucuya ilk kez çekiyorsanız:
```bash
cd /var/www/fokusistatistik.com/html
chmod +x deploy.sh
```

### 2. Yapılandırma
Scriptin başındaki değişkenleri sunucunuza göre düzenleyin:

```bash
# deploy.sh dosyasının içi
PROJECT_NAME="fokusistatistik"
PROJECT_USER="fokusistatistik"      # Sunucu kullanıcısı
PROJECT_PATH="/var/www/fokusistatistik.com/html"
PM2_PROCESS_NAME="fokusistatistik"
BRANCH_NAME="FOKUSVersiyon001"      # Takip edilecek branch
```

### 3. Çalıştırma
Deploy işlemini başlatmak için:

```bash
./deploy.sh
```

---

## 🔍 Script İşleyiş Adımları

Script sırasıyla aşağıdaki adımları uygular:

1.  **Ön Kontroller:** Proje dizini ve kullanıcı varlığı kontrol edilir.
2.  **İzinler:** Dosya yazma izinleri `chown` ile düzeltilir.
3.  **Yedekleme:**
    *   `/backups` klasörüne zaman damgalı yedek alınır.
    *   `package.json`, `package-lock.json` ve `.env` dosyaları kopyalanır.
    *   Mevcut commit hash'i kaydedilir.
4.  **Git Pull:** Github'dan en güncel kodlar çekilir (`git reset --hard`).
5.  **Dependency Check:** `package.json` değişmişse `npm ci` çalışır.
6.  **Build:** `npm run build` ile production build alınır.
    *   🛑 **HATA DURUMUNDA:** Script otomatik olarak `git reset` ile eski sürüme döner ve eski paketleri yükler. Site bozulmaz.
7.  **PM2 Restart:** PM2 process'i yenilenir veya yoksa başlatılır.
8.  **Health Check:** Uygulamanın ayağa kalktığı doğrulanır.

---

## ⚠️ Önemli Notlar

- **Environment Variables:** `.env.production` dosyasının sunucuda oluşturulduğundan emin olun. Bu dosya git'te tutulmaz.
- **PM2:** Sunucuda PM2'nin global olarak yüklü olması gerekir (`npm install -g pm2`).
- **Loglar:** Deployment loglarını anlık olarak terminalde renkli şekilde görebilirsiniz.

## 🆘 Sorun Giderme

Eğer deploy başarısız olursa:

1.  Script otomatik olarak rollback yapmaya çalışır.
2.  Manuel dönüş gerekirse `/var/www/fokusistatistik.com/backups` altındaki son yedeği kullanabilirsiniz.
3.  Logları kontrol etmek için: `pm2 logs fokusistatistik`
