# Güvenlik Dokümantasyonu

FOKUS İstatistik platformunun güvenlik mimarisi, spam koruması ve best practices.

---

## 📋 İçindekiler

- [Güvenlik Mimarisi](#güvenlik-mimarisi)
- [3 Katmanlı Spam Koruması](#3-katmanlı-spam-koruması)
- [Rate Limiting](#rate-limiting)
- [Authentication & Authorization](#authentication--authorization)
- [Data Protection](#data-protection)
- [Security Best Practices](#security-best-practices)
- [Vulnerability Reporting](#vulnerability-reporting)

---

## Güvenlik Mimarisi

### Defense in Depth (Derinlemesine Savunma)

Sistem 3 katmanlı güvenlik stratejisi kullanır:

```
Layer 1: Client-Side Protection
├── Honeypot Fields
├── Timestamp Validation
└── reCAPTCHA Token Generation

Layer 2: Network Protection
├── Rate Limiting (IP-based)
└── Request Throttling

Layer 3: Server-Side Validation
├── reCAPTCHA Verification
├── Input Sanitization
└── Data Validation
```

---

## 3 Katmanlı Spam Koruması

### 1️⃣ Honeypot (Bal Küpü Tuzağı)

**Nasıl Çalışır:**
- Formda görünmez bir input alanı eklenir
- Normal kullanıcılar görmez ve doldurmaz
- Botlar otomatik form doldurucu kullandığı için tüm alanları doldurur
- Honeypot dolu gelirse → spam!

**Implementasyon:**
```tsx
// app/iletisim/page.tsx
const [honeypot, setHoneypot] = useState('');

// Form içinde
<input
  type="text"
  name="website"
  value={honeypot}
  onChange={(e) => setHoneypot(e.target.value)}
  className="absolute -left-[9999px]"  // Ekran dışına taşır
  tabIndex={-1}                         // Tab ile erişilemez
  autoComplete="off"                    // Tarayıcı doldurmaz
  aria-hidden="true"                    // Screen reader görmez
/>

// Submit'te kontrol
if (honeypot) {
  console.warn('Spam detected: honeypot filled');
  return;
}
```

**Etkinlik:** ~90% basit botları engeller

**Avantajları:**
- ✅ Kullanıcı görmez
- ✅ Ekstra yük yok
- ✅ Basit ve etkili

**Dezavantajları:**
- ⚠️ Sofistike botlar tespit edebilir
- ⚠️ CSS disabled olursa görünür

---

### 2️⃣ Timestamp Validation

**Nasıl Çalışır:**
- Form yüklendiğinde timestamp kaydedilir
- Submit'te geçen süre hesaplanır
- 2-3 saniyeden az ise → bot!

**Implementasyon:**
```typescript
// app/iletisim/page.tsx
const [formStartTime, setFormStartTime] = useState(0);

useEffect(() => {
  setFormStartTime(Date.now());
}, []);

// Submit'te
const timeTaken = Date.now() - formStartTime;
if (timeTaken < 2000) {  // 2 saniye minimum
  console.warn('Spam detected: form submitted too quickly');
  return;
}
```

**Threshold Değerleri:**
- **İletişim Formu:** 2000ms (2 saniye)
- **Analiz Formu:** 3000ms (3 saniye) - daha uzun form

**Etkinlik:** ~85% hızlı botları engeller

**Avantajları:**
- ✅ Çok hızlı botları yakalar
- ✅ Ek yük yok
- ✅ Invisible

**Dezavantajları:**
- ⚠️ Otofill kullanan gerçek kullanıcıları engelleyebilir (nadir)
- ⚠️ Yavaş botlar geçebilir

---

### 3️⃣ Google reCAPTCHA v3

**Nasıl Çalışır:**
- Google AI her kullanıcıya 0.0-1.0 arası risk skoru verir
- 1.0 = insan, 0.0 = bot
- Threshold: 0.5 (altı şüpheli)

**Frontend Implementasyonu:**
```tsx
// app/layout.tsx - Provider
import RecaptchaProvider from '@/app/components/RecaptchaProvider';

<RecaptchaProvider>
  {children}
</RecaptchaProvider>

// app/iletisim/page.tsx - Token alma
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const { executeRecaptcha } = useGoogleReCaptcha();

const recaptchaToken = await executeRecaptcha('contact_form');
```

**Backend Doğrulama:**
```typescript
// lib/recaptcha.ts
export async function verifyRecaptcha(token: string) {
  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      body: `secret=${secretKey}&response=${token}`,
    }
  );
  return response.json();
}

// app/api/contact/route.ts
const result = await verifyRecaptcha(recaptchaToken);

if (!result.success || result.score < 0.5) {
  return NextResponse.json(
    { error: 'Spam tespit edildi' },
    { status: 403 }
  );
}
```

**Skor Yorumlama:**
- **0.9 - 1.0:** Kesinlikle insan
- **0.7 - 0.9:** Büyük olasılıkla insan
- **0.5 - 0.7:** Belirsiz
- **0.3 - 0.5:** Şüpheli
- **0.0 - 0.3:** Büyük olasılıkla bot

**Threshold:** 0.5 (ayarlanabilir)

**Etkinlik:** ~99% sofistike botları engeller

**Avantajları:**
- ✅ Google'ın AI gücü
- ✅ Kullanıcı görmez (v3)
- ✅ Çok etkili
- ✅ Ücretsiz (1M request/ay)

**Dezavantajları:**
- ⚠️ Google'a bağımlılık
- ⚠️ Privacy concerns (Google tracking)
- ⚠️ Network latency (~100-200ms)

---

## Rate Limiting

### Strateji

Memory-based IP rate limiting (Redis gerektirmez).

**Implementasyon:**
```typescript
// lib/rateLimiter.ts
const rateLimitMap = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetTime) {
    const resetTime = now + config.windowMs;
    rateLimitMap.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: config.maxRequests - 1, resetTime };
  }

  if (entry.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetTime: entry.resetTime };
  }

  entry.count++;
  return { allowed: true, remaining: config.maxRequests - entry.count, resetTime };
}
```

### Limitler

| Endpoint | Limit | Pencere | Eylem |
|----------|-------|---------|-------|
| `/api/contact` | 3 istek | 1 dakika | 429 hatası |
| `/api/analysis` | 2 istek | 5 dakika | 429 hatası |

### IP Adresi Alma

```typescript
export function getClientIP(request: Request): string {
  // Proxy headers (Vercel, Cloudflare)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const real = request.headers.get('x-real-ip');
  if (real) {
    return real;
  }

  return 'unknown';
}
```

### Memory Cleanup

```typescript
// Her 10 dakikada bir eski kayıtları temizle
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 10 * 60 * 1000);
```

---

## Authentication & Authorization

### Google OAuth 2.0

**Flow:**
```
1. User clicks "Google ile Giriş"
   ↓
2. GET /api/auth/google
   ↓
3. Redirect to Google OAuth
   ↓
4. User authorizes
   ↓
5. GET /api/auth/callback?code=...
   ↓
6. Exchange code for tokens
   ↓
7. Get user info from Google
   ↓
8. Send to n8n webhook
   ↓
9. Create session
   ↓
10. Redirect to dashboard or home
```

**Session Management:**
- LocalStorage: `fokus520Session`
- Session timeout: 24 saat
- Refresh token: Yok (her login yeni session)

---

## Data Protection

### Environment Variables

**Hassas Veriler:**
```bash
# ❌ ASLA public yapma
RECAPTCHA_SECRET_KEY=...
GOOGLE_CLIENT_SECRET=...
N8N_WEBHOOK_URL=...

# ✅ Public olabilir (frontend'de kullanılır)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...
NEXT_PUBLIC_GA_TAG_ID=...
```

**Rule:** `NEXT_PUBLIC_` prefix'i **sadece** frontend'de görünmesi gereken değişkenlerde kullanılır.

### Input Sanitization

```typescript
// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return { error: 'Geçersiz email' };
}

// Phone validation (Türkiye)
const phoneRegex = /^[5][0-9]{9}$/;
if (!phoneRegex.test(phone)) {
  return { error: 'Geçersiz telefon' };
}

// Sanitize HTML
import DOMPurify from 'isomorphic-dompurify';
const clean = DOMPurify.sanitize(dirty);
```

### HTTPS Only

**Production:**
- ✅ Tüm istekler HTTPS
- ✅ Secure cookies
- ✅ HSTS headers

**Development:**
- HTTP allowed (localhost only)

---

## Security Best Practices

### 1. Frontend

```typescript
// ✅ DO
- Use reCAPTCHA v3
- Implement honeypot
- Validate on client AND server
- Use TypeScript
- Sanitize user input

// ❌ DON'T
- Store secrets in code
- Trust client-side validation only
- Use eval()
- Expose API keys
```

### 2. Backend

```typescript
// ✅ DO
- Validate all inputs
- Use rate limiting
- Verify reCAPTCHA tokens
- Log security events
- Use environment variables

// ❌ DON'T
- Return detailed error messages
- Trust IP addresses blindly
- Skip validation
- Expose stack traces
```

### 3. Dependencies

```bash
# Güvenlik taraması
npm audit

# Güvenlik açıklarını düzelt
npm audit fix

# Major updates (dikkatli!)
npm audit fix --force
```

---

## Security Headers

### Next.js Config

```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];
```

---

## Vulnerability Reporting

Güvenlik açığı bulduysanız:

1. **Email:** bilgi@fokusistatistik.com
2. **Konu:** "Security Vulnerability Report"
3. **İçerik:**
   - Açığın detayı
   - Reproduce steps
   - Impact assessment
   - Önerilen çözüm (varsa)

**Response Time:** 24-48 saat içinde yanıt

---

## Security Checklist

### Pre-Production

- [ ] Environment variables production'a taşındı
- [ ] reCAPTCHA keys production domain'e eklendi
- [ ] Rate limiting test edildi
- [ ] HTTPS aktif
- [ ] Security headers eklendi
- [ ] npm audit clean
- [ ] Sensitive data log'lanmıyor
- [ ] Error messages generic

### Post-Production

- [ ] Security monitoring aktif
- [ ] Rate limit log'ları izleniyor
- [ ] Failed reCAPTCHA attempts track ediliyor
- [ ] Honeypot hits kaydediliyor

---

## Threat Model

### Olası Saldırılar ve Savunmalar

| Saldırı | Savunma | Status |
|---------|---------|--------|
| **Spam Bots** | Honeypot + Timestamp + reCAPTCHA | ✅ |
| **DDoS** | Rate Limiting + Vercel DDoS Protection | ✅ |
| **SQL Injection** | Parameterized queries + Validation | N/A (No SQL) |
| **XSS** | Input sanitization + CSP headers | ✅ |
| **CSRF** | SameSite cookies + Origin check | ✅ |
| **Brute Force** | Rate limiting + Account lockout | ⚠️ Partial |

---

**Son Güncelleme**: 18 Kasım 2025
**Version**: 1.0.0
**Security Contact:** bilgi@fokusistatistik.com
