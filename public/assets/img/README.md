# Assets Directory

Bu klasör görsellerin bulunduğu yerdir.

## Gerekli Görseller

Deployment öncesi aşağıdaki görselleri bu klasöre eklemelisiniz:

### Header
- `logobeyaz.png` - Ana logo (beyaz versiyon)
- `favicon.png` - Favicon

### Sanal Asistanlar (9 adet)
- `fokus001.png` - FOKUS001 Yönetici
- `fokus216.png` - FOKUS216 Müşteri Hizmetleri
- `fokus314.png` - FOKUS314 Veri Analisti
- `fokus520.png` - FOKUS520 Pazarlama & Lead
- `fokus618.png` - FOKUS618 Finans & Fatura
- `fokus707.png` - FOKUS707 İnsan Kaynakları
- `fokus717.png` - FOKUS717 İçerik Tasarımı
- `fokus808.png` - FOKUS808 Sosyal Medya
- `fokus999.png` - FOKUS999 Joker

### Footer Sosyal Medya (10 adet)
- `instagram.png`
- `facebook.png`
- `twitter.png`
- `ln.png` (LinkedIn)
- `whatsapp.png`
- `youtube.png`
- `telegram.png`
- `github.png`
- `eposta.png`
- `asistanfokus.png`

### Kampanya ve Özel Görseller
- `fokus216kare.png` - Toast notification görseli
- `FOKUS520profil.png` - Demo sayfası sesli asistan butonu

### Sayfa Bannerları
- `bannerasistanlar.png` - Sanal Asistanlar sayfası banner

### Logolar
- `fokuslogoyatay.png` - Yatay logo (rapor sayfası için)

### Form Görselleri
- `talepet.png` - Talep formu görseli

### SEO ve Open Graph
- `fokus-ekosistem-og.jpg` - Open Graph/Social media preview görseli

### Auth Görselleri
- `google.png` - Google giriş ikonu
- `search.png` - Arama ikonu

## ⚠️ ÖNEMLİ: SVG Placeholder'lar

Şu anda **tüm görseller SVG placeholder** olarak eklenmiştir. Bu, geliştirme ve test aşamasında kullanılmak içindir.

**Production'a geçmeden önce:**
1. Tüm `.svg` dosyalarını gerçek `.png`/`.jpg` dosyalarıyla değiştirin
2. SVG dosyaları aynı isimle, sadece uzantı farklı olmalı (örn: `fokus001.svg` → `fokus001.png`)
3. Orijinal görseller https://www.fokusistatistik.com/assets/img/ adresinde mevcuttur

## Görselleri Nasıl Eklerim?

Görselleri https://www.fokusistatistik.com/assets/img/ adresinden indirip bu klasöre kopyalayın.

**Manuel İndirme:**
1. https://www.fokusistatistik.com/assets/img/ adresini ziyaret edin
2. Her görseli sağ tık > "Resmi Farklı Kaydet"
3. `public/assets/img/` klasörüne kaydedin
4. SVG dosyalarını silin veya yedekleyin

**PowerShell ile toplu indirme:**
```powershell
cd public\assets\img

$images = @(
    "logobeyaz.png", "favicon.png",
    "fokus001.png", "fokus216.png", "fokus314.png", "fokus520.png",
    "fokus618.png", "fokus707.png", "fokus717.png", "fokus808.png", "fokus999.png",
    "instagram.png", "facebook.png", "twitter.png", "ln.png",
    "whatsapp.png", "youtube.png", "telegram.png", "github.png",
    "eposta.png", "asistanfokus.png",
    "fokus216kare.png", "bannerasistanlar.png",
    "talepet.png", "google.png", "search.png"
)

foreach ($img in $images) {
    try {
        Write-Host "İndiriliyor: $img"
        Invoke-WebRequest -Uri "https://www.fokusistatistik.com/assets/img/$img" -OutFile $img
    } catch {
        Write-Host "HATA: $img indirilemedi" -ForegroundColor Red
    }
}

# static.fokusistatistik.com'dan özel görseller
Invoke-WebRequest -Uri "https://static.fokusistatistik.com/resimler/FOKUS520profil.png" -OutFile "FOKUS520profil.png"
Invoke-WebRequest -Uri "https://static.fokusistatistik.com/resimler/fokuslogoyatay.png" -OutFile "fokuslogoyatay.png"

# Open Graph görseli (JPG)
Invoke-WebRequest -Uri "https://www.fokusistatistik.com/assets/img/fokus-ekosistem-og.jpg" -OutFile "fokus-ekosistem-og.jpg"

Write-Host "`nTüm görseller indirildi! SVG dosyalarını silmeyi unutmayın." -ForegroundColor Green
```

**FTP/SFTP ile:**
Mevcut sitenizden (www.fokusistatistik.com) ilgili klasörü kopyalayın.
