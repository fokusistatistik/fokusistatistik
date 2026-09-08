# Yapılacaklar

> Tarama bulguları için bkz. [TARAMA_RAPORU.md](TARAMA_RAPORU.md)

## Genel / Ürün

- [ ] Nöbetçim, Çizelgecim, Sigma alanları ile ilgili tanıtım alanları eklenecek

## Deploy

- [ ] Güncel deploy yapılacak (.env.local sunucuya bu deploy sırasında atılacak — bkz. yerel `.env.local`, sunucuda henüz yok)

## Atlananlar (riskli/otonom kod değişikliğiyle yapılamaz — insan kararı gerekiyor)

- **`app/api/analysis`'in `/analiz-formu`'na bağlanması** — form `FormData`/multipart kullanıyor, route JSON bekliyor; response yapıları da farklı (route n8n cevabını client'a geri dönüyor). Bağlamak formun davranışını bozabilir. Not: `/analiz-formu` artık UI'dan gizli olduğu için önceliği düştü.
