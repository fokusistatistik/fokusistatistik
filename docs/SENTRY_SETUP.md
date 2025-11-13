# Sentry.io Error Tracking - Kurulum Rehberi

## Neden Sentry?

Sentry, production ortamında oluşan hataları gerçek zamanlı olarak takip etmenizi sağlar:

- **Gerçek Zamanlı Hata Bildirimleri**: Hatalar oluştuğunda anında e-posta/Slack bildirimi
- **Stack Trace**: Hatanın tam olarak nerede oluştuğunu gösterir
- **Kullanıcı Bağlamı**: Hangi kullanıcıda, hangi tarayıcıda hata oluştu
- **Session Replay**: Hatadan önce kullanıcının ne yaptığını video olarak izleme
- **Performance Monitoring**: Yavaş API çağrıları ve sayfa yüklemeleri
- **Release Tracking**: Hangi versiyonda kaç hata oluştu

## Kurulum Adımları

### 1. Sentry Hesabı Oluşturun

1. [https://sentry.io](https://sentry.io) adresine gidin
2. "Get Started" ile ücretsiz hesap oluşturun (10,000 error/ay ücretsiz)
3. E-posta doğrulaması yapın

### 2. Yeni Proje Oluşturun

1. Sentry dashboard'a giriş yapın
2. "Projects" → "Create Project" tıklayın
3. **Platform**: Next.js seçin
4. **Project Name**: `fokusistatistik-production` yazın
5. **Team**: Default Team seçin
6. "Create Project" tıklayın

### 3. DSN'i Kopyalayın

1. Proje oluşturulduktan sonra **DSN** (Data Source Name) gösterilecek
2. Bu URL'i kopyalayın (örnek: `https://abc123@o456.ingest.sentry.io/789`)
3. `.env.local` dosyanıza ekleyin:

```bash
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn-here@o123.ingest.sentry.io/456
```

### 4. Auth Token Oluşturun (Opsiyonel - Source Maps için)

Source maps sayesinde minified kod yerine gerçek kod satırlarını görürsünüz.

1. Sentry → **Settings** → **Auth Tokens**
2. "Create New Token" tıklayın
3. **Scopes** seçin:
   - `project:read`
   - `project:releases`
   - `org:read`
4. Token'i kopyalayın
5. `.env.local` dosyanıza ekleyin:

```bash
SENTRY_AUTH_TOKEN=your-auth-token-here
```

### 5. Environment Ayarları

`.env.local` dosyanızda aşağıdaki değişkenler olmalı:

```bash
# Sentry Error Tracking
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@o123.ingest.sentry.io/456
SENTRY_AUTH_TOKEN=your-auth-token
NODE_ENV=production
```

## Kullanım

### Otomatik Hata Yakalama

Sentry, tüm JavaScript hatalarını otomatik olarak yakalar:

```typescript
// Bu hata otomatik olarak Sentry'ye gönderilir
throw new Error('Bir şeyler yanlış gitti!');
```

### Manuel Hata Gönderme

Özel durumlarda manuel olarak hata gönderebilirsiniz:

```typescript
import * as Sentry from '@sentry/nextjs';

try {
  // Riskli kod
  await fetchData();
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      section: 'data-fetch',
      critical: 'true',
    },
    extra: {
      userId: user.id,
      attemptCount: 3,
    },
  });

  // Kullanıcıya hata göster
  toast.error('Veri yüklenemedi');
}
```

### Kullanıcı Bağlamı Ekleme

Hatayı hangi kullanıcı aldıysa bilgisini ekleyin:

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.name,
});
```

### Custom Tags

Hataları kategorilere ayırın:

```typescript
Sentry.setTag('payment-method', 'credit-card');
Sentry.setTag('subscription-plan', 'pro');
```

### Breadcrumbs (İz Bırakma)

Kullanıcı hatadan önce ne yaptı?

```typescript
Sentry.addBreadcrumb({
  category: 'user-action',
  message: 'Kullanıcı ayarları kaydetti',
  level: 'info',
  data: {
    settingsType: 'kurumsal',
    fieldCount: 15,
  },
});
```

### ErrorBoundary Kullanımı

React hatalarını yakalamak için:

```typescript
import ErrorBoundary from '@/components/ErrorBoundary';

export default function MyApp() {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  );
}
```

## Dashboard İncelemesi

Sentry dashboard'da göreceğiniz bilgiler:

### Issues (Hatalar)

- **Frequency**: Hata kaç kez oluştu?
- **Users Affected**: Kaç kullanıcı bu hatayı aldı?
- **First Seen / Last Seen**: İlk ve son görülme
- **Environment**: Production/Development
- **Release**: Hangi versiyonda oluştu?

### Performance

- **Transaction Duration**: API çağrıları ne kadar sürdü?
- **Slow Queries**: Hangi veritabanı sorguları yavaş?
- **Page Load Times**: Sayfalar ne kadar sürede yüklendi?

### Alerts

Belirli durumlarda bildirim alın:

1. **Settings** → **Alerts** → "Create Alert Rule"
2. Koşul seçin:
   - Yeni bir hata türü oluştuğunda
   - Hata sayısı X'i geçtiğinde
   - Hata oranı %Y'yi geçtiğinde
3. Bildirim kanalı: E-posta, Slack, PagerDuty

## Best Practices

### 1. Hassas Bilgileri Filtreleme

Sentry config dosyaları zaten hassas verileri filtreler:

```typescript
beforeSend(event, hint) {
  // Cookies ve Authorization header'larını kaldır
  if (event.request?.cookies) {
    delete event.request.cookies;
  }
  return event;
}
```

### 2. Ortam Ayırımı

Development'ta test hatalarıyla production'ı kirletmeyin:

```typescript
enabled: process.env.NODE_ENV === 'production',
```

### 3. Sample Rate Ayarı

Tüm traceleri göndermek maliyetli olabilir:

```typescript
// Production'da %10 sample
tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
```

### 4. Release Tracking

Her deploy'da version güncelleyin:

```bash
# package.json'da version bump
npm version patch
```

## Fiyatlandırma

Sentry fiyatlandırması (2024):

- **Developer Plan**: Ücretsiz - 10,000 error/ay
- **Team Plan**: $26/ay - 50,000 error/ay
- **Business Plan**: $80/ay - 250,000 error/ay

> FOKUS İstatistik için Developer plan yeterli olmalıdır.

## Sorun Giderme

### Hata 1: Sentry'ye hata gönderilmiyor

**Çözüm:**
1. DSN doğru mu kontrol edin
2. `NODE_ENV=production` olduğundan emin olun
3. Browser console'da hata var mı?

### Hata 2: Too many events

**Çözüm:**
```typescript
// Sentry config'de ignoreErrors ekleyin
ignoreErrors: [
  'ResizeObserver loop limit exceeded',
  'Non-Error promise rejection captured',
],
```

### Hata 3: Breadcrumbs görünmüyor

**Çözüm:**
```typescript
// Breadcrumb integration'ı ekleyin
integrations: [
  new Sentry.BrowserTracing(),
  new Sentry.Replay(), // Session replay için
],
```

## İletişim

Sentry kurulumu ile ilgili sorunlar için:
- FOKUS Teknik Destek: bilgi@fokusistatistik.com
- Sentry Dokümantasyon: https://docs.sentry.io/platforms/javascript/guides/nextjs/
