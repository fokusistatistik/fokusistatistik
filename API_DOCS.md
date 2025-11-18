# API Dokümantasyonu

FOKUS İstatistik platformunun tüm API endpoint'lerinin detaylı dokümantasyonu.

---

## 📋 İçindekiler

- [Genel Bilgiler](#genel-bilgiler)
- [Authentication](#authentication)
- [Public Endpoints](#public-endpoints)
- [Form Endpoints](#form-endpoints)
- [Blog Endpoints](#blog-endpoints)
- [Webhook Endpoints](#webhook-endpoints)
- [Hata Kodları](#hata-kodları)

---

## Genel Bilgiler

### Base URL
```
Production: https://fokusistatistik.com
Development: http://localhost:3000
```

### Request Headers
```json
{
  "Content-Type": "application/json"
}
```

### Response Format
Tüm API'ler JSON formatında yanıt döner:

```json
{
  "success": boolean,
  "message": string,
  "data": object | null,
  "error": string | null
}
```

---

## Authentication

### Google OAuth Flow

#### 1. OAuth Başlatma
```http
GET /api/auth/google
```

**Yanıt:** Google'ın OAuth sayfasına yönlendirme

**Açıklama:** Kullanıcıyı Google OAuth akışına yönlendirir.

---

#### 2. OAuth Callback
```http
GET /api/auth/callback?code={auth_code}
```

**Query Parameters:**
- `code` (string, required): Google'dan dönen authorization code

**Yanıt:**
```json
{
  "success": true,
  "isNewUser": false,
  "session": {
    "email": "user@example.com",
    "name": "User Name",
    "picture": "https://..."
  }
}
```

**Yönlendirme:**
- Yeni kullanıcı → `/dashboard`
- Mevcut kullanıcı → `/`

---

#### 3. Session Kontrolü
```http
GET /api/auth/session
```

**Yanıt:**
```json
{
  "authenticated": true,
  "user": {
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

---

#### 4. Çıkış
```http
POST /api/auth/logout
```

**Yanıt:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Form Endpoints

### İletişim Formu

```http
POST /api/contact
```

**Rate Limit:** 3 istek / dakika (IP bazlı)

**Request Body:**
```json
{
  "name": "Ahmet Yılmaz",
  "phone": "5551234567",
  "email": "ahmet@example.com",
  "message": "Merhaba, bilgi almak istiyorum",
  "recaptchaToken": "03AGdBq25..."
}
```

**Validasyonlar:**
- `name`: Minimum 2 karakter
- `phone`: 10 haneli, 5 ile başlamalı
- `email`: Geçerli email formatı
- `message`: Minimum 10 karakter
- `recaptchaToken`: Gerekli

**Başarılı Yanıt (200):**
```json
{
  "success": true,
  "message": "Form başarıyla gönderildi"
}
```

**Hata Yanıtları:**

**400 - reCAPTCHA Eksik:**
```json
{
  "success": false,
  "error": "reCAPTCHA token eksik"
}
```

**403 - Bot Tespit Edildi:**
```json
{
  "success": false,
  "error": "Spam tespit edildi"
}
```

**429 - Rate Limit Aşımı:**
```json
{
  "success": false,
  "error": "Çok fazla istek gönderdiniz. Lütfen bir dakika sonra tekrar deneyin."
}
```

**Response Headers:**
```
X-RateLimit-Limit: 3
X-RateLimit-Remaining: 2
X-RateLimit-Reset: 2025-11-18T15:30:00.000Z
```

**Güvenlik Kontrolleri:**
1. Honeypot kontrolü (frontend)
2. Timestamp kontrolü (frontend - minimum 2 saniye)
3. reCAPTCHA v3 doğrulaması (backend - skor >= 0.5)
4. Rate limiting (backend)

---

### Analiz Formu

```http
POST /api/analysis
```

**Rate Limit:** 2 istek / 5 dakika (IP bazlı)

**Request Body:**
```json
{
  "secilenler": ["216-1", "314-2", "520-3"],
  "secilenlerDetay": "216-1, 314-2, 520-3",
  "adsoyad": "Ahmet Yılmaz",
  "email": "ahmet@example.com",
  "telefon": "5551234567",
  "kurum": "Örnek Şirket A.Ş.",
  "adres": "İstanbul",
  "recaptchaToken": "03AGdBq25..."
}
```

**Validasyonlar:**
- `secilenler`: En az 1 öğe gerekli
- `adsoyad`: Minimum 4 karakter
- `telefon`: 10 haneli
- `email`: Geçerli email formatı
- `recaptchaToken`: Gerekli

**Başarılı Yanıt (200):**
```json
{
  "success": true,
  "message": "Form başarıyla gönderildi",
  "recommendations": [
    "FOKUS216 - Müşteri Hizmetleri Asistanı",
    "FOKUS314 - Veri Analisti Asistanı"
  ]
}
```

**Hata Yanıtları:** İletişim formu ile aynı

**Güvenlik Kontrolleri:**
1. Honeypot kontrolü (frontend)
2. Timestamp kontrolü (frontend - minimum 3 saniye)
3. reCAPTCHA v3 doğrulaması (backend)
4. Rate limiting (backend)

---

## Blog Endpoints

### Blog Listesi

```http
GET /api/blogs
```

**Query Parameters:**
- `page` (number, optional): Sayfa numarası (varsayılan: 1)
- `limit` (number, optional): Sayfa başına kayıt (varsayılan: 10)

**Yanıt:**
```json
{
  "success": true,
  "data": {
    "blogs": [
      {
        "slug": "yapay-zeka-ile-kazanc",
        "title": "Yapay Zeka ile Kazanç",
        "excerpt": "Yapay zeka ile nasıl gelir elde edebilirsiniz...",
        "date": "2025-01-15",
        "author": "FOKUS Ekibi",
        "image": "https://...",
        "category": "Yapay Zeka"
      }
    ],
    "pagination": {
      "total": 45,
      "page": 1,
      "pages": 5
    }
  }
}
```

---

### Tek Blog

```http
GET /api/blogs/[slug]
```

**URL Parameters:**
- `slug` (string, required): Blog slug

**Örnek:**
```http
GET /api/blogs/yapay-zeka-ile-kazanc
```

**Yanıt:**
```json
{
  "success": true,
  "data": {
    "slug": "yapay-zeka-ile-kazanc",
    "title": "Yapay Zeka ile Kazanç",
    "content": "...",
    "date": "2025-01-15",
    "author": "FOKUS Ekibi",
    "image": "https://...",
    "category": "Yapay Zeka",
    "tags": ["AI", "Gelir", "Otomasyon"]
  }
}
```

**Hata (404):**
```json
{
  "success": false,
  "error": "Blog bulunamadı"
}
```

---

## Webhook Endpoints

### n8n Webhook

```http
POST /api/webhook
```

**Açıklama:** Genel amaçlı webhook endpoint. n8n'den gelen istekleri işler.

**Request Body:** Esnek JSON

**Yanıt:**
```json
{
  "success": true,
  "message": "Webhook processed"
}
```

**Internal Flow:**
1. Request body alınır
2. `N8N_WEBHOOK_URL` environment variable'ına forward edilir
3. n8n'den gelen yanıt işlenir

---

## Hata Kodları

### HTTP Status Codes

| Kod | Açıklama | Örnek |
|-----|----------|-------|
| 200 | Başarılı | Form gönderildi |
| 400 | Geçersiz istek | Eksik alan |
| 401 | Yetkisiz | Giriş gerekli |
| 403 | Yasak | Bot tespit edildi |
| 404 | Bulunamadı | Blog yok |
| 429 | Çok fazla istek | Rate limit aşıldı |
| 500 | Sunucu hatası | Beklenmeyen hata |

### Error Response Format

```json
{
  "success": false,
  "error": "Hata mesajı",
  "code": "ERROR_CODE"
}
```

### Common Error Codes

| Kod | Açıklama |
|-----|----------|
| `RATE_LIMIT_EXCEEDED` | Rate limit aşıldı |
| `RECAPTCHA_FAILED` | reCAPTCHA doğrulama başarısız |
| `BOT_DETECTED` | Bot tespit edildi |
| `VALIDATION_ERROR` | Veri doğrulama hatası |
| `WEBHOOK_FAILED` | Webhook iletimi başarısız |
| `UNAUTHORIZED` | Giriş gerekli |

---

## Rate Limiting

### Limitler

| Endpoint | Limit | Süre | Method |
|----------|-------|------|--------|
| `/api/contact` | 3 istek | 1 dakika | IP |
| `/api/analysis` | 2 istek | 5 dakika | IP |

### Rate Limit Headers

Her rate-limited endpoint şu headerları döner:

```
X-RateLimit-Limit: 3
X-RateLimit-Remaining: 2
X-RateLimit-Reset: 2025-11-18T15:30:00.000Z
```

### Rate Limit Aşımı

```json
{
  "success": false,
  "error": "Çok fazla istek gönderdiniz. Lütfen birkaç dakika sonra tekrar deneyin."
}
```

---

## Security Best Practices

### Client-Side
1. **Honeypot** kullanın (görünmez alanlar)
2. **Timestamp** kontrolü yapın (minimum form doldufrma süresi)
3. **reCAPTCHA token** alın ve gönderin

### Server-Side
1. **Rate limiting** uygulayın
2. **reCAPTCHA** token'ı doğrulayın
3. **Input validation** yapın
4. **Sanitize** user input
5. **CORS** policy uygulayın

---

## Test Examples

### cURL ile İletişim Formu

```bash
curl -X POST https://fokusistatistik.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "5551234567",
    "email": "test@example.com",
    "message": "Bu bir test mesajıdır",
    "recaptchaToken": "test_token"
  }'
```

### JavaScript ile Analiz Formu

```javascript
const response = await fetch('/api/analysis', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    secilenler: ['216-1', '314-2'],
    secilenlerDetay: '216-1, 314-2',
    adsoyad: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    telefon: '5551234567',
    kurum: 'Test A.Ş.',
    adres: 'İstanbul',
    recaptchaToken: await executeRecaptcha('analysis_form'),
  }),
});

const data = await response.json();
console.log(data);
```

---

**Son Güncelleme**: 18 Kasım 2025
**Version**: 1.0.0
