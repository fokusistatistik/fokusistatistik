#!/bin/bash

# ==========================================
# 🚀 GÜVENLİ GÜNCELLEME SCRİPTİ (SIMPLE v2)
# ==========================================

# 1. DEĞİŞKENLER
PROJE_YOLU="/home/emrebostanoglu/react-projects/fokus-website/fokusistatistik-claude-virtual-assistants-statistics-011CV23jAzbd7JbWtX5PNpMs"
BRANCH_ADI="FOKUSVersiyon001"
PM2_NAME="fokus-website-prod" # PM2 process adı

# Hata durumunda scripti durdur
set -e

echo "🔧 İzinler ayarlanıyor..."
# Klasör varsa izin düzelt
if [ -d "$PROJE_YOLU" ]; then
    sudo chown -R emrebostanoglu:emrebostanoglu "$PROJE_YOLU"
else
    echo "❌ HATA: Proje yolu bulunamadı: $PROJE_YOLU"
    exit 1
fi

# 2. PROJE KLASÖRÜNE GİT
echo "📂 Proje dizinine gidiliyor..."
cd "$PROJE_YOLU"

# 3. GITHUB'DAN GÜNCELLEMEYİ ÇEK
echo "⬇️  $BRANCH_ADI dalından güncel kodlar çekiliyor..."
sudo -u emrebostanoglu git fetch origin "$BRANCH_ADI"
# Sunucudaki yerel değişiklikleri ez ve Git ile eşitle
sudo -u emrebostanoglu git reset --hard "origin/$BRANCH_ADI"

# 4. PAKETLERİ GÜNCELLE
echo "📦 Bağımlılıklar güncelleniyor..."
sudo -u emrebostanoglu npm install

# 5. BUILD AL
echo "🏗️  Build alınıyor (Production)..."
# Temiz build için
sudo -u emrebostanoglu rm -rf .next

if sudo -u emrebostanoglu NODE_ENV=production npm run build; then
    echo "🚀 Build Başarılı! Servis yenileniyor..."
    
    # PM2 Restart (Varsa restart et, yoksa başlat)
    if sudo -u emrebostanoglu pm2 list | grep -q "$PM2_NAME"; then
        sudo -u emrebostanoglu pm2 restart "$PM2_NAME"
    else
        echo "⚠️  PM2 servisi yok, başlatılıyor..."
        sudo -u emrebostanoglu pm2 start npm --name "$PM2_NAME" -- start
    fi
    
    sudo -u emrebostanoglu pm2 save
    
    echo "------------------------------------------------"
    echo "✅ GÜNCELLEME BAŞARIYLA TAMAMLANDI!"
    echo "� Branch: $BRANCH_ADI"
    echo "� Commit: $(git log -1 --format='%h - %s')"
    echo "------------------------------------------------"
else
    echo "❌ BUILD HATASI! İşlem iptal edildi."
    exit 1
fi
