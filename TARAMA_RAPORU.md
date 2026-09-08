# FOKUS İstatistik – Kapsamlı Kod/Proje Tarama Raporu

**Tarih:** 2026-09-08 | **Dal:** FOKUSVersiyon001 | **Kapsam:** Salt-okunur statik analiz

---

## 1. Broken Linkler / Eksik Sayfalar

Header/Footer'daki tüm iç linkler karşılığını buluyor, broken link yok.

- **Orta – Linklenmeyen (yetim) route'lar:** `app/abonelik-yonetimi/page.tsx` hiçbir bileşenden linklenmiyor. `app/fiyat-teklifi-ozel-x7932kd-2025/page.tsx` kasıtlı gizli sayfa gibi duruyor (robots'ta disallow), ama YAPILACAKLAR'da belgelenmemiş.
- **Düşük:** `public/robots.txt:11`'de `/sozlesme-olustur` disallow ediliyor ama böyle bir route hiç yok — ölü referans.
- **Düşük – Çakışan robots kaynağı:** Hem `public/robots.txt` hem `app/robots.ts` var, içerikleri tutarsız (biri `/memnuniyet-anketi` ve `/sozlesme-olustur`'u, diğeri `/fiyat-teklifi-ozel-x7932kd-2025` ve `/*.json$`'ı disallow ediyor). Next.js'te `app/robots.ts` build'de önceliklidir; statik dosya kafa karıştırıyor.

## 2. Görsel/Asset Eksikleri

- **[ÇÖZÜLDÜ] Kritik:** Tüm görseller (logo, favicon, 9 asistan görseli, OG image, sosyal ikonlar) `https://static.fokusistatistik.com` harici CDN'inden çekiliyordu (tek nokta hata riski). **2026-09-08'de düzeltildi:** 47 görsel CDN'den indirilip `public/assets/cdn/` altına yerleştirildi, 21 dosyadaki (`Header.tsx`, `Footer.tsx`, `lib/assistantsData.ts`, `app/layout.tsx` dahil) tüm `src` referansları yerel path'lere çevrildi, `next.config.ts`'deki artık gereksiz `remotePatterns` kaldırıldı. Ek bulgu: taşıma sırasında **2 görsel URL'sinin canlıda zaten 404 verdiği** ortaya çıktı — `resimler/fokus-ekosistem-og.jpg` (sitenin OG/Twitter card görseli, tüm sayfalarda kırıktı) ve `resimler/fokuslogo1.png` (StructuredData fallback logosu); ikisi de çalışan `logolar/fokuslogo1.png`'e yönlendirilerek düzeltildi. `public/assets/img/` altındaki eski placeholder SVG'ler (gerçek logo değil, sadece "FOKUS" yazan kırmızı kutu) ve yanıltıcı README'si kullanıcı onayıyla tamamen silindi.
- **[ÇÖZÜLDÜ] Orta:** `MISSING_ASSETS.md` güncel mimariyi yansıtmıyordu. Dosya, yerel görsel mimarisini ve gerçek durumu anlatacak şekilde yeniden yazıldı.
- **[ÇÖZÜLDÜ] Orta:** PWA ikonları (`icon-192x192.png`, `icon-512x512.png`) gerçek değildi, `manifest.json` tek bir favicon.png'yi 3 boyutta tekrar kullanıyordu. **2026-09-08'de düzeltildi:** `sharp` ile `public/assets/cdn/resimler/favicon.png` (marka logomark'ı) kaynak alınarak gerçek 192x192 ve 512x512 PNG ikonlar üretildi (maskable safe-zone için %30 padding ile), `manifest.json` bu dosyalara ve doğru boyutlara güncellendi.
- **Düşük:** `next-pwa` bağımlılığı `package.json`'da var ama `next.config.ts`'de hiç entegre edilmemiş — PWA fiilen aktif değil.

## 3. SEO / Meta Kontrolü

- **Orta:** Sitemap'te eksik: `/abonelik-yonetimi` ve 4 eski statik blog sayfası (`sanal-asistan-vs-gercek-personel`, `whatsapp-musteri-hizmetleri-botu`, `yapay-zeka-ile-kazanc`, `yapay-zeka-maliyet-dusurme`). `app/sitemap.ts` sadece `content/blogs-metadata.json`'daki dinamik blogları okuyor.
- **Düşük:** `app/profil`, `app/siparisler`, `app/admin/login`, `app/admin/dashboard` sayfalarında `metadata` tanımlı değil (SEO açısından kritik değil, disallow'lu sayfalar, ama tarayıcı sekmesi/paylaşım başlığı varsayılana düşüyor).
- **Düşük:** `app/layout.tsx` sadece `.ico` favicon tanımlıyor, ayrı `apple-touch-icon` yok — iOS ana ekran ekleme düşük çözünürlüklü olabilir.
- **Bilgi:** StructuredData, OG/Twitter card genel olarak sağlıklı yapılandırılmış.

## 4. Env Değişkenleri

`.env.example` kod ile isim bazında tam örtüşüyor.

- **Kritik – Güvensiz JWT_SECRET fallback'i:** `app/api/auth/login/route.ts`, `app/api/blogs/route.ts`, `app/api/blogs/backup/route.ts`, `app/api/blogs/[slug]/route.ts` içinde `process.env.JWT_SECRET || 'default-secret-change-in-production-...'` kullanılıyor. Env eksikse (deploy hatası) admin token'ları herkesin bildiği sabit secret ile imzalanır → yetkisiz admin erişimi riski. Fail-fast yok, sessizce güvensiz modda çalışır.
- **Orta:** `RECAPTCHA_SECRET_KEY` tanımlı değilse `app/api/contact/route.ts` ve `app/api/analysis/route.ts`'de doğrulama tamamen atlanıyor, sadece `console.warn` ile loglanıyor (ama madde 8'de görüldüğü gibi bu route'lar zaten kullanılmıyor).

## 5. Console.log / TODO / Placeholder

Proje bu açıdan **temiz**: `console.log`, `TODO/FIXME`, "Lorem ipsum" veya sahte test verisi bulunamadı. `console.warn/error` kullanımları bilinçli hata loglaması.

## 6. TypeScript / Lint Durumu

- **İyi:** `npx tsc --noEmit` sıfır hata.
- **Kritik:** `npm run lint` tamamen kırık — `eslint.config.mjs`'de `eslint-config-next/core-web-vitals` import'u kurulu sürümle (15.5.9) uyuşmuyor (`.js` uzantısı gerekiyor). Şu an hiçbir lint kuralı çalışmıyor, hatalar sessizce birikebiliyor.

## 7. Ölü Kod / Kullanılmayan Bileşenler

- **Orta:** `app/components/PromotionCTA.tsx` hiç import edilmiyor.
- `app/components/VapiWidget.tsx` — `app/layout.tsx`'te import ve render yorum satırında, bilinçli devre dışı ama kod duruyor.
- `app/components/RandevuToast.tsx` — `app/page.tsx`'te import yorumda, aktif kullanılmıyor.
- `lib/webhook.ts` — `sendWebhook()`/`WebhookEvents` hiçbir yerden çağrılmıyor; gerçek formlar doğrudan `fetch` ile n8n'e gidiyor.
- **Düşük:** `@headlessui/react`, `axios` hiç import edilmiyor.

## 8. Form / API Tutarlılığı

- **Kritik mimari tutarsızlık:** `app/api/contact/route.ts` ve `app/api/analysis/route.ts` rate limiting + server-side reCAPTCHA doğrulaması ile özenle yazılmış, ama gerçek form sayfaları (`iletisim`, `analiz-formu`, `memnuniyet-anketi`) bunları **hiç çağırmıyor**, doğrudan `https://n8n.fokusistatistik.com/webhook/...` adreslerine `fetch` atıyor.
  - `app/iletisim/page.tsx`'te `executeRecaptcha('contact_form')` ile token üretiliyor ama bu token request body'sine hiç eklenmiyor — reCAPTCHA tamamen kozmetik, koruma sağlamıyor.
  - Client tarafında sadece honeypot + 2 saniyelik zaman kontrolü var, ikisi de trivially bypass edilebilir.
  - n8n webhook URL'leri CORS/auth koruması olmadan doğrudan client'tan çağrılıyor, network sekmesinde açıkça görülüyor.
- **Orta:** `/iletisim`'de gerçek bir "no-reply e-posta akışı" yok — form n8n'e gidiyor, e-posta gönderimi (varsa) n8n workflow'unun sorumluluğunda, bu repodan doğrulanamıyor. (Zaten YAPILACAKLAR'da ayrı madde olarak var.)
- **[ÇÖZÜLDÜ] Kritik – Auth güvenliği:** `app/api/auth/login/route.ts` kullanıcı adı/şifreyi düz JSON olarak n8n webhook'una gönderip sadece HTTP 200 dönüşüne bakarak girişi başarılı sayıyordu. **2026-09-08'de düzeltildi:** n8n bağımlılığı kaldırıldı, `ADMIN_EMAIL`/`ADMIN_PASSWORD` env değişkenleriyle `timingSafeEqual` kullanan sabit-zamanlı karşılaştırmaya geçirildi.
- **[ÇÖZÜLDÜ] Kritik – Sahte kullanıcı kimlik doğrulama:** `app/dashboard`, `app/profil`, `app/siparisler` üçü de sunucu doğrulaması yapmadan sadece `localStorage.getItem('fokus520Session')` kontrolü yapıyordu. **2026-09-08'de düzeltildi:** üçü de artık `/api/auth/session` üzerinden sunucu taraflı JWT doğrulaması yapıyor. Ayrıca şu ek bulgular tespit edilip giderildi:
  - `app/giris/page.tsx`'te **"Admin Girişi (Geçici)" butonu** hiçbir kimlik doğrulaması yapmadan (şifre bile sormadan) `dashboard`'a admin-seviye sahte session veriyordu — silindi.
  - `app/api/auth/session/route.ts` JWT doğrulamıyordu, `Buffer.from(session.value, 'base64')` ile eski/farklı bir `username:timestamp` formatı çözmeye çalışıyordu — bu, `admin_session` cookie'sinin login route'unda (`SignJWT` ile) üretilen gerçek JWT formatıyla **uyuşmuyordu**, session-check muhtemelen hep başarısız oluyordu. `jwtVerify` ile gerçek JWT doğrulamasına geçirildi.
  - `lib/rateLimiter.ts`'teki `getClientIP()` önce `X-Forwarded-For` header'ına bakıyordu; bu header client tarafından sahtelenebildiği (Nginx sadece zincire ekliyor, üzerine yazmıyor) için saldırgan sahte bir IP başa ekleyerek login rate-limit'i by-pass edebilirdi. Öncelik `X-Real-IP`'e (Nginx `$remote_addr` ile ayarlıyor, sahtelenemez) çevrildi.
  - Google OAuth akışı (`/api/auth/google`, `/api/auth/callback`, `lib/google-auth.ts`) kullanıcı tarafından bilinçli olarak devre dışı bırakıldı (env'siz zaten çalışmıyordu), yetim kod olarak silindi.
- **Yeni bulgu – Kullanılmayan NextAuth kurulumu:** `lib/auth.ts`, `app/api/auth/[...nextauth]/route.ts`, `components/SessionProvider.tsx` projede duruyor ama hiçbir sayfa/layout tarafından çağrılmıyor (`SessionProvider` hiçbir yerden import edilmiyor, `useSession`/`getServerSession` hiç kullanılmıyor). Tamamen ayrı, kablosuz bir üçüncü auth sistemi — kullanıcı sistemi (dashboard/profil/siparisler, artık `admin_session` JWT tabanlı) ve admin sistemiyle (`/admin/*`, aynı JWT) hiç bağlantısı yok. Kaldırılması ya da gerçekten bağlanması gerekiyor.

## 9. Responsive / i18n / Metin Tutarlılığı

Mojibake/bozuk karakter kodlaması taraması temiz. CTA metinleri tutarlı. "Ücretsiz Danışmanlık" bölümünün gizlenmesi (YAPILACAKLAR'da zaten var) henüz uygulanmamış görünüyor. Derinlemesine responsive test bu kapsamda çalıştırılmadı.

## 10. Package.json Bağımlılık Taraması

- **Düşük – Kullanılmayan bağımlılıklar:** `axios`, `@headlessui/react`, `next-pwa` (entegre değil), `@vapi-ai/web` (sadece devre dışı widget'ta referans var).
- **Kritik/Öncelikli sürüm farkı:** `isomorphic-dompurify` 2.35.0 → mevcut en güncel 4.1.0 (3 major sürüm geride). Blog içeriğini XSS'e karşı sanitize eden güvenlik kütüphanesi olduğu için öncelikli güncellenmeli.
- **Düşük:** `next` 15.5.9 → wanted 15.5.25 (patch kaçırılmış), `lucide-react` 0.563 → 1.42 (major fark), `eslint` 9.39.2 → 10.10 (major).

---

## Öncelik Sırasına Göre Özet

**Kritik:**
1. `JWT_SECRET` fallback kaldırılmalı / env eksikse fail-fast yapılmalı (4 dosya)
2. `/dashboard`, `/profil`, `/siparisler`'e gerçek sunucu taraflı oturum doğrulaması eklenmeli
3. `iletisim` formunda reCAPTCHA token'ı gerçekten gönderilmeli ya da kaldırılıp mevcut `app/api/contact` route'u kullanılmalı
4. `npm run lint` çalışır hale getirilmeli (`eslint.config.mjs` import path düzeltmesi)
5. `isomorphic-dompurify` güncellenmeli (güvenlik)

**Orta:**
6. Görsellerin tek CDN'e tam bağımlılığı gözden geçirilmeli (en azından logo/favicon için fallback)
7. Sitemap'e eksik `/abonelik-yonetimi` ve 4 statik blog sayfası eklenmeli
8. Çelişen `public/robots.txt` / `app/robots.ts` birleştirilmeli
9. Kullanılmayan `app/api/contact`, `app/api/analysis` route'ları bağlanmalı ya da kaldırılmalı
10. `MISSING_ASSETS.md` güncel mimariyle uyumlu hale getirilmeli veya kaldırılmalı

**Düşük:**
11. Ölü kod temizliği: `PromotionCTA.tsx`, `VapiWidget.tsx`, `RandevuToast.tsx`, `lib/webhook.ts`
12. Kullanılmayan bağımlılıklar kaldırılmalı: `axios`, `@headlessui/react`, `next-pwa`, `@vapi-ai/web`
13. `profil`, `siparisler`, `admin/login`, `admin/dashboard` sayfalarına temel metadata eklenmeli
14. `public/robots.txt`'ten `sozlesme-olustur` referansı temizlenmeli
15. PWA ikonları gerçek yerel dosyalar olarak (192x192, 512x512) eklenmeli
