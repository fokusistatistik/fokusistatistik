#!/bin/bash

# ==========================================
# 🚀 FOKUS CLEAN DEPLOYMENT SCRIPT (FINAL)
# ==========================================

# 1. TANIMLAR
USER="emrebostanoglu"
PROJE="/home/emrebostanoglu/react-projects/fokus-website/fokusistatistik-claude-virtual-assistants-statistics-011CV23jAzbd7JbWtX5PNpMs"
# DİKKAT: Doğru repo adresi buraya girildi
REPO_URL="https://github.com/fokusistatistik/fokusistatistik.git"
BRANCH="FOKUSVersiyon001"

# Hata durumunda durdur
set -e

echo "⚡ TEMİZLİK VE GÜNCELLEME BAŞLATILIYOR..."

# 2. PROFİLİ YÜKLE VE DİZİNE GİT
echo "🔧 Ortam hazırlanıyor..."
# Root yetkisi gerekebilir, script sudo ile çalıştırılmalı
if [ -d "$PROJE" ]; then
    chown -R $USER:$USER "$PROJE"
else
    echo "❌ HATA: Proje yolu bulunamadı: $PROJE"
    exit 1
fi

cd "$PROJE"

# 3. GITHUB BAĞLANTISINI DÜZELT (Eskisini sil, yenisini yaz)
echo "� Repo adresi düzeltiliyor: $REPO_URL"
sudo -u $USER git remote set-url origin $REPO_URL

# 4. ESKİYİ SİL VE YENİYİ ÇEK (Reset --hard)
echo "⬇️  Kodlar çekiliyor ($BRANCH)..."
# Önce fetch yapıyoruz
sudo -u $USER git fetch origin $BRANCH
# SONRA ESKİ KODLARI EZİP GEÇİYORUZ (Hard Reset)
sudo -u $USER git reset --hard "origin/$BRANCH"

# 5. TEMİZ KURULUM VE BUILD
echo "📦 Paketler yükleniyor..."
sudo -u $USER npm install

echo "🧹 Eski build dosyaları siliniyor (.next)..."
sudo -u $USER rm -rf .next

echo "🏗️  Sıfırdan Build alınıyor..."
if sudo -u $USER NODE_ENV=production npm run build; then
    echo "✅ Build Başarılı! PM2 güncelleniyor..."
    
    # PM2 sürecini bul ve yeniden başlat
    # sudo -i -u ile kullanıcının full environment'ını yüklüyoruz
    if sudo -i -u $USER pm2 list | grep -q "fokus-website-prod"; then
        sudo -i -u $USER pm2 restart fokus-website-prod
    else
        echo "⚠️ Süreç yok, sıfırdan başlatılıyor..."
        # Start komutunu proje dizininde çalıştırmak önemli
        sudo -i -u $USER pm2 start npm --name "fokus-website-prod" --cwd "$PROJE" -- start
    fi
    
    sudo -i -u $USER pm2 save
    echo "------------------------------------------------"
    echo "🎉 SİTE SIFIRDAN DERLENDİ VE YAYINA ALINDI!"
    echo "📍 Branch: $BRANCH"
    echo "📍 Commit: $(git log -1 --format='%h - %s')"
    echo "------------------------------------------------"
else
    echo "❌ HATA: Build sırasında bir sorun oluştu!"
    exit 1
fi
