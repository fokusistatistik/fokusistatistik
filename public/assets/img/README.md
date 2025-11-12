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

### Kampanya
- `fokus216kare.png` - Toast notification görseli

## Görselleri Nasıl Eklerim?

Görselleri https://www.fokusistatistik.com/assets/img/ adresinden indirip bu klasöre kopyalayın.

**PowerShell ile toplu indirme:**
```powershell
cd public/assets/img
$images = @("logobeyaz.png", "fokus001.png", "fokus216.png", "fokus314.png", ...)
foreach ($img in $images) {
    Invoke-WebRequest -Uri "https://www.fokusistatistik.com/assets/img/$img" -OutFile $img
}
```

Veya mevcut sitenizden FTP/SFTP ile kopyalayın.
