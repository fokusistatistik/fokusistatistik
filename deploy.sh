#!/bin/bash

# ==========================================
# 🚀 FOKUS İSTATİSTİK DEPLOYMENT SCRIPT
# ==========================================
# Version: 1.0.0
# Project: fokusistatistik.com
# Framework: Next.js 15.5.9 + React 19.2.3
# ==========================================

set -e  # Hata durumunda scripti durdur

# ==========================================
# 📋 YAPILANDIRMA
# ==========================================

# Proje bilgileri
PROJECT_NAME="fokusistatistik"
PROJECT_USER="fokusistatistik"  # Sunucudaki kullanıcı adı
PROJECT_PATH="/var/www/fokusistatistik.com/html"
BACKUP_PATH="/var/www/fokusistatistik.com/backups"
PM2_PROCESS_NAME="fokusistatistik"
BRANCH_NAME="FOKUSVersiyon001"  # veya "main"

# Renkli output için
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ==========================================
# 🔧 YARDIMCI FONKSİYONLAR
# ==========================================

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# ==========================================
# 1️⃣ ÖN KONTROLLER
# ==========================================

log_info "Deployment başlatılıyor..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 Proje: $PROJECT_NAME"
echo "📁 Dizin: $PROJECT_PATH"
echo "🌿 Branch: $BRANCH_NAME"
echo "👤 Kullanıcı: $PROJECT_USER"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Proje dizininin varlığını kontrol et
if [ ! -d "$PROJECT_PATH" ]; then
    log_error "Proje dizini bulunamadı: $PROJECT_PATH"
    exit 1
fi

# ==========================================
# 2️⃣ İZİN YÖNETİMİ
# ==========================================

log_info "İzinler ayarlanıyor..."
sudo chown -R $PROJECT_USER:$PROJECT_USER $PROJECT_PATH
log_success "İzinler ayarlandı"

# ==========================================
# 3️⃣ YEDEKLEME
# ==========================================

log_info "Yedekleme yapılıyor..."

# Backup dizinini oluştur
sudo -u $PROJECT_USER mkdir -p $BACKUP_PATH

# Timestamp oluştur
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="$BACKUP_PATH/backup_$TIMESTAMP"

# Mevcut .next ve node_modules hariç yedekle
sudo -u $PROJECT_USER mkdir -p $BACKUP_DIR
cd $PROJECT_PATH

# Git commit hash'i kaydet
CURRENT_COMMIT=$(sudo -u $PROJECT_USER git rev-parse HEAD)
echo $CURRENT_COMMIT > $BACKUP_DIR/commit_hash.txt

# package.json ve package-lock.json'u yedekle
sudo -u $PROJECT_USER cp package.json $BACKUP_DIR/
sudo -u $PROJECT_USER cp package-lock.json $BACKUP_DIR/ 2>/dev/null || true

# .env dosyasını yedekle (varsa)
if [ -f .env.local ]; then
    sudo -u $PROJECT_USER cp .env.local $BACKUP_DIR/
fi
if [ -f .env.production ]; then
    sudo -u $PROJECT_USER cp .env.production $BACKUP_DIR/
fi

log_success "Yedek oluşturuldu: $BACKUP_DIR"

# Eski yedekleri temizle (30 günden eski)
log_info "Eski yedekler temizleniyor..."
find $BACKUP_PATH -type d -name "backup_*" -mtime +30 -exec rm -rf {} + 2>/dev/null || true
log_success "Eski yedekler temizlendi"

# ==========================================
# 4️⃣ GIT GÜNCELLEMESİ
# ==========================================

log_info "Git güncellemesi yapılıyor..."
cd $PROJECT_PATH

# Mevcut değişiklikleri stash'le
sudo -u $PROJECT_USER git stash save "Auto-stash before deployment $TIMESTAMP" || true

# Remote'dan güncelleme çek
sudo -u $PROJECT_USER git fetch origin $BRANCH_NAME

# Branch'e geç ve güncelle
sudo -u $PROJECT_USER git checkout $BRANCH_NAME
sudo -u $PROJECT_USER git reset --hard origin/$BRANCH_NAME

NEW_COMMIT=$(sudo -u $PROJECT_USER git rev-parse HEAD)
log_success "Git güncellendi: $CURRENT_COMMIT -> $NEW_COMMIT"

# Değişiklik var mı kontrol et
if [ "$CURRENT_COMMIT" = "$NEW_COMMIT" ]; then
    log_warning "Yeni commit yok, deployment devam ediyor..."
else
    log_info "Yeni commit tespit edildi, deployment devam ediyor..."
fi

# ==========================================
# 5️⃣ BAĞIMLILIK YÖNETİMİ
# ==========================================

log_info "Bağımlılıklar kontrol ediliyor..."

# package.json değişmiş mi?
PACKAGE_CHANGED=false
if ! diff -q package.json $BACKUP_DIR/package.json > /dev/null 2>&1; then
    PACKAGE_CHANGED=true
    log_warning "package.json değişmiş, npm install çalıştırılacak..."
fi

# npm install (sadece gerekirse veya her zaman)
if [ "$PACKAGE_CHANGED" = true ]; then
    log_info "Paketler yükleniyor..."
    sudo -u $PROJECT_USER npm ci --production=false
    log_success "Paketler yüklendi"
else
    log_info "package.json değişmemiş, npm install atlanıyor..."
    # Yine de güvenlik için install yapalım
    sudo -u $PROJECT_USER npm ci --production=false
    log_success "Paketler yüklendi"
fi

# ==========================================
# 6️⃣ ENVIRONMENT VARIABLES KONTROLÜ
# ==========================================

log_info "Environment variables kontrol ediliyor..."

# .env.production dosyası var mı?
if [ ! -f .env.production ] && [ ! -f .env.local ]; then
    log_warning ".env dosyası bulunamadı!"
    log_warning "Lütfen .env.production veya .env.local dosyasını oluşturun"
fi

# Kritik env değişkenlerini kontrol et
REQUIRED_VARS=(
    "NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION"
    "NEXT_PUBLIC_N8N_CONTACT_WEBHOOK"
)

for var in "${REQUIRED_VARS[@]}"; do
    if ! grep -q "^$var=" .env.production 2>/dev/null && ! grep -q "^$var=" .env.local 2>/dev/null; then
        log_warning "Eksik environment variable: $var"
    fi
done

log_success "Environment variables kontrol edildi"

# ==========================================
# 7️⃣ BUILD İŞLEMİ
# ==========================================

log_info "Production build başlatılıyor..."

# Eski build'i temizle
sudo -u $PROJECT_USER rm -rf .next

# Build yap
if sudo -u $PROJECT_USER NODE_ENV=production npm run build; then
    log_success "Build başarılı!"
else
    log_error "BUILD HATASI! Rollback yapılıyor..."
    
    # Rollback: Önceki commit'e dön
    sudo -u $PROJECT_USER git reset --hard $CURRENT_COMMIT
    sudo -u $PROJECT_USER npm ci --production=false
    sudo -u $PROJECT_USER NODE_ENV=production npm run build
    
    log_error "Rollback tamamlandı. Eski sürüm çalışıyor."
    exit 1
fi

# ==========================================
# 8️⃣ PM2 YÖNETİMİ
# ==========================================

log_info "PM2 süreci yenileniyor..."

# PM2 kurulu mu kontrol et
if ! command -v pm2 &> /dev/null; then
    log_error "PM2 bulunamadı! Lütfen PM2'yi yükleyin: npm install -g pm2"
    exit 1
fi

# PM2 process var mı kontrol et
if sudo -u $PROJECT_USER pm2 list | grep -q $PM2_PROCESS_NAME; then
    # Mevcut process'i restart et
    sudo -u $PROJECT_USER pm2 restart $PM2_PROCESS_NAME
    log_success "PM2 process restart edildi"
else
    # Yeni process başlat
    log_warning "PM2 process bulunamadı, yeni process başlatılıyor..."
    sudo -u $PROJECT_USER pm2 start npm --name $PM2_PROCESS_NAME -- start
    log_success "PM2 process başlatıldı"
fi

# PM2 konfigürasyonunu kaydet
sudo -u $PROJECT_USER pm2 save
log_success "PM2 konfigürasyonu kaydedildi"

# ==========================================
# 9️⃣ HEALTH CHECK
# ==========================================

log_info "Health check yapılıyor..."

# 5 saniye bekle
sleep 5

# PM2 process durumunu kontrol et
if sudo -u $PROJECT_USER pm2 list | grep -q "$PM2_PROCESS_NAME.*online"; then
    log_success "Uygulama çalışıyor!"
else
    log_error "Uygulama başlatılamadı!"
    sudo -u $PROJECT_USER pm2 logs $PM2_PROCESS_NAME --lines 50
    exit 1
fi

# HTTP health check (opsiyonel)
if command -v curl &> /dev/null; then
    log_info "HTTP health check yapılıyor..."
    sleep 3
    
    if curl -f -s -o /dev/null http://localhost:3000; then
        log_success "HTTP health check başarılı!"
    else
        log_warning "HTTP health check başarısız, ancak PM2 process çalışıyor"
    fi
fi

# ==========================================
# 🔟 TEMİZLİK VE RAPORLAMA
# ==========================================

log_info "Temizlik yapılıyor..."

# npm cache temizle
sudo -u $PROJECT_USER npm cache clean --force 2>/dev/null || true

# Disk kullanımını göster
log_info "Disk kullanımı:"
du -sh $PROJECT_PATH
du -sh $BACKUP_PATH

# ==========================================
# ✅ DEPLOYMENT TAMAMLANDI
# ==========================================

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log_success "DEPLOYMENT BAŞARIYLA TAMAMLANDI!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Deployment Özeti:"
echo "  🕐 Tarih: $(date '+%Y-%m-%d %H:%M:%S')"
echo "  📁 Proje: $PROJECT_NAME"
echo "  🌿 Branch: $BRANCH_NAME"
echo "  🔄 Commit: $CURRENT_COMMIT -> $NEW_COMMIT"
echo "  💾 Yedek: $BACKUP_DIR"
echo "  🚀 PM2 Process: $PM2_PROCESS_NAME (online)"
echo ""
echo "🔗 Yararlı Komutlar:"
echo "  pm2 logs $PM2_PROCESS_NAME        # Logları görüntüle"
echo "  pm2 monit                         # PM2 monitoring"
echo "  pm2 restart $PM2_PROCESS_NAME     # Restart"
echo "  pm2 stop $PM2_PROCESS_NAME        # Durdur"
echo ""
log_success "Deployment tamamlandı! 🎉"
