# Google OAuth Webhook Entegrasyonu

Bu belge, FOKUS İstatistik platformunun Google OAuth entegrasyonu için gereken webhook yapılandırmasını açıklar.

## 🔐 Google Cloud Console Ayarları

### Authorized Redirect URIs

Google Cloud Console'da (https://console.cloud.google.com/apis/credentials) aşağıdaki redirect URI'leri ekleyin:

**Development:**
```
http://localhost:3000/api/auth/callback
```

**Production:**
```
https://test.fokusistatistik.com/api/auth/callback
```

### Gerekli Credentials

- **GOOGLE_CLIENT_ID**: Google Cloud Console'dan alınan Client ID
- **GOOGLE_CLIENT_SECRET**: Google Cloud Console'dan alınan Client Secret

## 🔗 Webhook URL

**Tek webhook kullanılıyor** (hem login hem signup için):

```
https://n8n.fokusistatistik.com/webhook-test/fokuswebuserauth
```

Backend (n8n) kullanıcının yeni mi yoksa mevcut mi olduğunu kontrol eder ve `isNewUser` flag'i ile response döner.

## 📤 Frontend'den Webhook'a Gönderilen Data

```json
{
  "code": "4/0AY0e-g5...",
  "client_id": "YOUR_GOOGLE_CLIENT_ID",
  "redirect_uri": "https://test.fokusistatistik.com/api/auth/callback",
  "scope": "openid email profile",
  "timestamp": 1699876543210,
  "environment": "production"
}
```

### Alan Açıklamaları

- **code**: Google'dan dönen authorization code
- **client_id**: Google OAuth Client ID
- **redirect_uri**: OAuth callback URL'i (Google'a gönderilen ile aynı olmalı)
- **scope**: İstenen OAuth scope'lar
- **timestamp**: İstek zamanı (ms)
- **environment**: Ortam bilgisi (`development` veya `production`)

## 📥 Webhook'tan Beklenen Response

### Başarılı Response (Yeni Kullanıcı)

```json
{
  "success": true,
  "isNewUser": true,
  "userId": "user_12345",
  "userInfo": {
    "name": "Ahmet Yılmaz",
    "email": "ahmet@example.com",
    "picture": "https://lh3.googleusercontent.com/a/...",
    "kategoriler": [],
    "stokUrunleri": [],
    "cihazlar": [],
    "islemYapanPersonelListesi": [],
    "calismaSeatleri": []
  }
}
```

### Başarılı Response (Mevcut Kullanıcı)

```json
{
  "success": true,
  "isNewUser": false,
  "userId": "user_12345",
  "userInfo": {
    "name": "Ahmet Yılmaz",
    "email": "ahmet@example.com",
    "picture": "https://lh3.googleusercontent.com/a/...",
    "kategoriler": ["Kategori 1", "Kategori 2"],
    "stokUrunleri": ["Ürün 1", "Ürün 2"],
    "cihazlar": ["Cihaz 1"],
    "islemYapanPersonelListesi": ["Personel 1", "Personel 2"],
    "calismaSeatleri": ["Seat 1", "Seat 2", "Seat 3"]
  }
}
```

### Hata Response

```json
{
  "success": false,
  "error": "invalid_code",
  "message": "Authorization code is invalid or expired"
}
```

## 🔄 OAuth Flow

```
1. Kullanıcı "Google ile Giriş Yap" butonuna tıklar
   └─> Frontend: /api/auth/google

2. Google OAuth URL'i oluşturulur ve yönlendirme yapılır
   └─> Google: https://accounts.google.com/o/oauth2/v2/auth?...

3. Kullanıcı Google'da giriş yapar ve izin verir
   └─> Google callback: /api/auth/callback?code=...

4. Authorization code webhook'a gönderilir
   └─> POST: https://n8n.fokusistatistik.com/webhook-test/fokuswebuserauth

5. Webhook işlemleri yapar:
   ├─> Google'dan token alır (code exchange)
   ├─> User bilgilerini Google'dan çeker
   ├─> Database'de kullanıcıyı kontrol eder (yeni/mevcut)
   ├─> Gerekirse yeni kullanıcı oluşturur
   └─> Response döner: {success, isNewUser, userId, userInfo}

6. Frontend response'ı işler:
   ├─> Session'ı localStorage'a kaydeder
   └─> Kullanıcıyı yönlendirir:
       ├─> isNewUser: true  → /dashboard
       └─> isNewUser: false → / (anasayfa)
```

## 🎯 Yönlendirme Mantığı

- **Yeni Kullanıcılar** (`isNewUser: true`): `/dashboard` sayfasına yönlendirilir
- **Mevcut Kullanıcılar** (`isNewUser: false`): `/` anasayfaya yönlendirilir

## 💾 localStorage Session Yapısı

```json
{
  "user": "Ahmet Yılmaz",
  "email": "ahmet@example.com",
  "userId": "user_12345",
  "picture": "https://lh3.googleusercontent.com/a/...",
  "isNewUser": false,
  "token": "e7f8a9b0c1d2e3f4...",
  "timestamp": 1699876543210,
  "isLoggedIn": true,
  "authMethod": "google",
  "kategoriler": ["Kategori 1"],
  "stokUrunleri": ["Ürün 1"],
  "cihazlar": ["Cihaz 1"],
  "islemYapanPersonelListesi": ["Personel 1"],
  "calismaSeatleri": ["Seat 1", "Seat 2"]
}
```

## 🐛 Debug & Logging

Tüm OAuth flow boyunca console'da detaylı loglar görünür:

- `🚀 Google Auth başlatılıyor...`
- `🔐 Google OAuth URL: https://accounts.google.com/...`
- `📥 OAuth Callback alındı`
- `🔍 Callback params: {code: true, error: null, state: 'web_login'}`
- `🔄 Webhook'a gönderiliyor...`
- `📤 Sending to webhook: {...}`
- `📥 Webhook response status: 200`
- `📦 Webhook response: {...}`
- `✅ Authentication başarılı!`
- `💾 Session saved to localStorage`
- `🆕 Is new user: true/false`

## ⚠️ Önemli Notlar

1. **Tek Webhook**: Hem login hem signup için aynı webhook kullanılır. Backend (n8n) kullanıcının yeni/mevcut olduğunu belirler.

2. **Token Exchange**: Token exchange işlemi backend'de (n8n webhook'ta) yapılır, frontend'e sadece user bilgileri döner.

3. **CORS**: Webhook CORS ayarlarını kontrol edin, `https://test.fokusistatistik.com` origin'ine izin verilmeli.

4. **Timeout**: Webhook response timeout'u en az 10 saniye olmalı (Google API çağrıları için).

5. **Error Handling**: Webhook'ta her hata durumu için açıklayıcı error mesajları dönmelisiniz.

## 🔒 Güvenlik

- `GOOGLE_CLIENT_SECRET` sadece server-side'da kullanılır (webhook'ta)
- Frontend'e sadece public bilgiler döner
- Authorization code tek kullanımlıktır ve hemen webhook'a gönderilir
- Token'lar backend'de saklanır, frontend'e gönderilmez

## 📝 Environment Variables

`.env.local` dosyanızda şunları tanımlayın:

```bash
# Site URL
NEXT_PUBLIC_URL=https://test.fokusistatistik.com

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Webhook Configuration
NEXT_PUBLIC_AUTH_WEBHOOK_URL=https://n8n.fokusistatistik.com/webhook-test/fokuswebuserauth
```

---

**Son Güncelleme**: 14 Kasım 2025
