# Geliştirici Kılavuzu

FOKUS İstatistik projesinde geliştirme yapmak için kapsamlı rehber.

---

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js 18+ (önerilen: 20.x)
- npm 9+
- Git
- Code editor (VS Code önerilir)

### İlk Kurulum

```bash
# 1. Clone repository
git clone https://github.com/fokusistatistik/fokusistatistik.git
cd fokusistatistik

# 2. Install dependencies
npm install

# 3. Environment setup
cp .env.example .env.local
# .env.local'i düzenle

# 4. Development server başlat
npm run dev
```

Tarayıcıda aç: http://localhost:3000

---

## 📁 Proje Yapısı Detayları

### `app/` - Next.js App Router

```
app/
├── (public)/          # Route group - public pages
├── (auth)/            # Route group - auth required
├── api/               # Backend API routes
├── components/        # App-specific components
├── layout.tsx         # Root layout
├── page.tsx           # Homepage
└── globals.css        # Global styles
```

### `components/` - Shared Components

Tüm sayfalarda kullanılabilir shared components.

### `lib/` - Utility Libraries

```
lib/
├── assistantsData.ts  # 9 asistan verisi
├── rateLimiter.ts     # Rate limiting logic
├── recaptcha.ts       # reCAPTCHA helpers
├── google-auth.ts     # OAuth helpers
└── webhook.ts         # n8n webhook helpers
```

---

## 🛠️ Development Workflow

### Branch Strategy

```
main                    # Production branch
├── development         # Dev branch (opsiyonel)
└── feature/xyz         # Feature branches
```

### Feature Development

```bash
# 1. Yeni branch oluştur
git checkout -b feature/amazing-feature

# 2. Geliştir
# ...kod yaz

# 3. Test et
npm run build
npm run lint

# 4. Commit
git add .
git commit -m "feat: Add amazing feature"

# 5. Push
git push origin feature/amazing-feature

# 6. Pull Request aç
```

### Commit Messages

[Conventional Commits](https://www.conventionalcommits.org/) formatı kullanılır:

```
feat: Yeni özellik
fix: Bug fix
docs: Dokümantasyon
style: Format (kod davranışı değişmez)
refactor: Refactoring
test: Test ekleme
chore: Build, dependency updates
```

**Örnekler:**
```bash
git commit -m "feat: Add email validation to contact form"
git commit -m "fix: Resolve honeypot detection issue"
git commit -m "docs: Update API documentation"
```

---

## 🧩 Yeni Sayfa Ekleme

### 1. Route Oluştur

```bash
# app/ altında yeni klasör
mkdir app/yeni-sayfa
```

### 2. page.tsx Oluştur

```tsx
// app/yeni-sayfa/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yeni Sayfa',
  description: 'Açıklama',
};

export default function YeniSayfa() {
  return (
    <div>
      <h1>Yeni Sayfa</h1>
    </div>
  );
}
```

### 3. Test Et

```bash
npm run dev
# http://localhost:3000/yeni-sayfa
```

---

## 🎨 Component Ekleme

### Shared Component

```tsx
// components/MyComponent.tsx
export default function MyComponent() {
  return <div>My Component</div>;
}
```

### Client Component

```tsx
// app/components/MyClientComponent.tsx
'use client';

import { useState } from 'react';

export default function MyClientComponent() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

---

## 🌐 API Endpoint Ekleme

### 1. Route Handler Oluştur

```typescript
// app/api/my-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello' });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Process data

  return NextResponse.json({ success: true });
}
```

### 2. Test Et

```bash
curl http://localhost:3000/api/my-endpoint
```

---

## 🔒 Rate Limiting Ekleme

```typescript
// app/api/my-endpoint/route.ts
import { checkRateLimit, getClientIP } from '@/lib/rateLimiter';

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);

  const rateLimitResult = checkRateLimit(clientIP, {
    maxRequests: 5,
    windowMs: 60 * 1000, // 1 dakika
  });

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }

  // Continue...
}
```

---

## 🧪 Testing

### TypeScript Type Check

```bash
npx tsc --noEmit
```

### Build Test

```bash
npm run build
```

### Linting

```bash
npm run lint
```

### Manual Testing Checklist

- [ ] Form validation çalışıyor
- [ ] reCAPTCHA loading
- [ ] Rate limiting aktif
- [ ] Error handling doğru
- [ ] Responsive design check
- [ ] Browser console temiz

---

## 🐛 Debugging

### Development Logs

```typescript
// Server-side (görünür terminal'de)
console.log('Server:', data);

// Client-side (görünür browser console'da)
console.log('Client:', data);
```

### Network Debugging

Browser DevTools → Network tab:
- Request headers
- Response status
- Payload
- Timing

### Common Issues

**Build hatası:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**TypeScript hatası:**
```bash
npx tsc --noEmit
# Hataları oku ve düzelt
```

**Rate limit test:**
```bash
# 3+ kez hızlıca çağır
for i in {1..5}; do curl -X POST http://localhost:3000/api/contact; done
```

---

## 📦 Dependencies Ekleme

```bash
# Production dependency
npm install package-name

# Development dependency
npm install -D package-name

# Specific version
npm install package-name@1.2.3
```

**Önemli:** package.json'da version ranges kullanın:
- `^1.2.3` - Minor updates (önerilen)
- `~1.2.3` - Patch updates only
- `1.2.3` - Exact version

---

## 🎯 Code Style

### TypeScript

```typescript
// ✅ Good
interface FormData {
  name: string;
  email: string;
}

function handleSubmit(data: FormData) {
  // ...
}

// ❌ Bad
function handleSubmit(data: any) {
  // ...
}
```

### React Components

```tsx
// ✅ Good - Descriptive names
export default function ContactForm() {
  // ...
}

// ❌ Bad - Generic names
export default function Form() {
  // ...
}
```

### Naming Conventions

- **Components**: PascalCase (`ContactForm`)
- **Functions**: camelCase (`handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (`API_URL`)
- **Files**: kebab-case (`contact-form.tsx`)

---

## 🔧 Environment Variables

### Ekleme

1. `.env.local` dosyasına ekle:
```bash
MY_NEW_VAR=value
```

2. `.env.example` dosyasını güncelle:
```bash
MY_NEW_VAR=example_value
```

3. TypeScript type (opsiyonel):
```typescript
// env.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MY_NEW_VAR: string;
    }
  }
}
```

### Kullanım

```typescript
// Server-side
const value = process.env.MY_NEW_VAR;

// Client-side (sadece NEXT_PUBLIC_ prefix'li)
const value = process.env.NEXT_PUBLIC_MY_VAR;
```

---

## 🚀 Deployment

### Pre-deployment Checklist

- [ ] `npm run build` başarılı
- [ ] TypeScript errors yok
- [ ] Environment variables production'a eklendi
- [ ] reCAPTCHA keys production domain için alındı
- [ ] Google OAuth redirect URIs güncellendi
- [ ] n8n webhooks production URL'e point ediyor

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Manual Deployment (VPS)

```bash
# Build
npm run build

# Start with PM2
pm2 start npm --name "fokusistatistik" -- start

# Monitor
pm2 logs fokusistatistik
```

---

## 📚 Useful Commands

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Production build
npm start                  # Start production server
npm run lint               # Run ESLint

# Git
git status                 # Check status
git log --oneline          # View commits
git diff                   # See changes

# Package management
npm outdated               # Check outdated packages
npm update                 # Update packages
npm audit                  # Security audit
npm audit fix              # Fix vulnerabilities

# Debugging
npx tsc --noEmit          # Type check
node --version            # Node version
npm --version             # npm version
```

---

## 🆘 Getting Help

### Documentation

- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **Tailwind**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

### Project Docs

- `README.md` - Genel bakış
- `ARCHITECTURE.md` - Sistem mimarisi
- `API_DOCS.md` - API dokümantasyonu
- `SECURITY.md` - Güvenlik
- `DEPLOYMENT.md` - Deployment rehberi

### Contact

- **Email**: bilgi@fokusistatistik.com
- **GitHub Issues**: github.com/fokusistatistik/fokusistatistik/issues

---

**Son Güncelleme**: 18 Kasım 2025
**Version**: 1.0.0
