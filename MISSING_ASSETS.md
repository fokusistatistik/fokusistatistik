# Görsel Varlıkları — Güncel Durum

> Bu dosya birden fazla kez güncellendi: önce statik siteden geçiş öncesi
> `public/assets/img/`'e PNG eklenmesi gerektiğini belirtiyordu, sonra harici
> CDN mimarisini anlatıyordu. Artık her ikisi de geçmişte kaldı.

## Güncel Mimari: Yerel Görseller

Tüm görseller (logo, favicon, 9 asistan görseli, sosyal medya ikonları, OG image,
"neden biz" fotoğrafları) `https://static.fokusistatistik.com` CDN'inden indirilip
**`public/assets/cdn/`** altına yerleştirildi ve kod bunlara yerel path
(`/assets/cdn/...`) üzerinden erişiyor. `next.config.ts`'deki harici `remotePatterns`
kaldırıldı, artık gerekmiyor.

Bu taşıma sırasında iki görsel URL'sinin canlıda zaten **404 verdiği** ortaya çıktı:
- `resimler/fokus-ekosistem-og.jpg` — sitenin OG/Twitter card görseliydi, tüm
  sayfalarda kırıktı.
- `resimler/fokuslogo1.png` — `StructuredData.tsx`'teki fallback logo.

İkisi de çalışan `logolar/fokuslogo1.png`'e yönlendirilerek düzeltildi.

Eski placeholder SVG'ler (`public/assets/img/`, gerçek logo değil sadece "FOKUS"
yazan kırmızı kutu) ve yanıltıcı README'si tamamen silindi.

## PWA İkonları

Artık gerçek dosyalar mevcut:
- `public/icon-192x192.png`
- `public/icon-512x512.png`

İkisi de `public/assets/cdn/resimler/favicon.png`'deki marka logomark'ından
(sharp ile) üretildi, maskable safe-zone için %30 padding bırakılarak. `manifest.json`
gerçek dosyalara ve doğru boyutlara güncellendi.

## Kalan Bilinen Eksik

`next-pwa` bağımlılığı `package.json`'da var ama `next.config.ts`'de entegre
edilmemiş — PWA fiilen aktif değil, `public/manifest.json` elle yazılmış statik bir
dosya. Bu, `next-pwa`'yı gerçekten entegre etmek isteniyorsa ayrı bir görev.
