# 🚀 Production Sunucuda Yapılacaklar

Console'daki hatalar **eski build cache**'inden geliyor. Kod tamamen doğru!

## Sunucunuzda Sırasıyla Şunları Yapın:

### 1. Git Pull (En Son Değişiklikleri Çek)
```bash
cd /var/www/fokusistatistik  # veya projenizin olduğu klasör
git pull origin claude/teleport-session-continue-019k1JtnuNSwb1djiAvbmC6J
```

### 2. Build Cache'i Temizle
```bash
rm -rf .next
```

### 3. Yeniden Build
```bash
npm run build
```

### 4. Production Restart
```bash
# PM2 kullanıyorsanız:
pm2 restart fokusistatistik

# veya systemd kullanıyorsanız:
sudo systemctl restart fokusistatistik

# veya manuel çalıştırıyorsanız:
npm run start
```

### 5. Browser Cache Temizle
- Tarayıcınızda **Ctrl + Shift + Delete** (veya Cmd + Shift + Delete)
- "Cached images and files" seçin
- **Hard Refresh**: Ctrl + Shift + R (veya Cmd + Shift + R)

---

## ✅ Yapılan Değişiklikler (Commit: 5f17003)

1. **ChatWidget**: Next.js Image → Basit `<img>` tag
   - ❌ Eski: `<Image src="..." width={48} />`
   - ✅ Yeni: `<img src="https://static.fokusistatistik.com/resimler/fokus216kare.png" />`

2. **Favicon**: CDN → Local `/favicon.ico`
   - ✅ `public/favicon.ico` (CDN'den indirildi)
   - ✅ `layout.tsx`: icon: "/favicon.ico"

3. **Sitemap**: Eski XML silindi
   - ❌ `public/sitemap.xml` (test.fokusistatistik.com)
   - ✅ `app/sitemap.ts` (fokusistatistik.com)

---

## 🔍 Doğrulama

Build sonrası tarayıcı console'unda **ARTIK BU HATALARI GÖRMEYECEKSİNİZ**:
```
❌ GET .../_next/image?url=...asistanlar/fokus216kare.png (404)
❌ GET .../_next/image?url=...faviconfokus.png (404)
```

Çünkü artık Next.js Image optimization kullanmıyor, direkt CDN'den basit img tag ile yüklüyor!
