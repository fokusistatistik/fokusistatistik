# Sistem Mimarisi

FOKUS İstatistik platformunun teknik mimarisi, tasarım kararları ve sistem akışları.

---

## 📋 İçindekiler

- [Genel Mimari](#genel-mimari)
- [Teknoloji Seçimleri](#teknoloji-seçimleri)
- [Dizin Yapısı](#dizin-yapısı)
- [Data Flow](#data-flow)
- [Component Architecture](#component-architecture)
- [API Design](#api-design)
- [State Management](#state-management)
- [Security Architecture](#security-architecture)

---

## Genel Mimari

### High-Level Overview

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                  │
├──────────────────────┬──────────────────────────────┤
│   React Components   │   Next.js App Router         │
│   - Forms            │   - SSR/SSG                  │
│   - Widgets          │   - API Routes               │
│   - Analytics        │   - Middleware               │
└──────────────────────┴──────────────────────────────┘
                        │
                        ↓
┌──────────────────────────────────────────────────────┐
│              NEXT.JS SERVER (Edge/Node)              │
├──────────────────────┬───────────────────────────────┤
│   API Routes         │   Server Components           │
│   - /api/contact     │   - Layout                    │
│   - /api/analysis    │   - Pages                     │
│   - /api/auth        │   - Error Boundary            │
│   - /api/webhook     │                               │
└──────────────────────┴───────────────────────────────┘
                        │
          ┌─────────────┴─────────────┐
          ↓                           ↓
┌──────────────────┐        ┌──────────────────┐
│  External APIs   │        │   n8n Webhooks   │
│  - Google OAuth  │        │  - Auth webhook  │
│  - reCAPTCHA v3  │        │  - Form webhook  │
│  - Google Analytics       │  - Analysis      │
└──────────────────┘        └──────────────────┘
```

### Architecture Pattern

**Server-First Architecture** kullanılır:
- Server Components (default)
- Client Components (sadece interaktif bileşenler)
- API Routes (backend logic)

---

## Teknoloji Seçimleri

### Next.js 16 (App Router)

**Neden Next.js?**
- ✅ SEO için SSR/SSG desteği
- ✅ API Routes ile full-stack development
- ✅ TypeScript first-class support
- ✅ Automatic code splitting
- ✅ Built-in optimization (images, fonts)
- ✅ Vercel'de kolay deployment

**Neden App Router?**
- ✅ React Server Components
- ✅ Nested layouts
- ✅ Loading states
- ✅ Streaming
- ✅ Modern React features

### TypeScript

**Avantajları:**
- Type safety
- Better IDE support
- Compile-time error detection
- Self-documenting code

### Tailwind CSS 4.0

**Neden Tailwind?**
- Utility-first approach
- Responsive design kolaylığı
- Purge CSS (küçük bundle)
- Consistent design system

---

## Dizin Yapısı

### App Router Struktuı

```
app/
├── (public)/              # Public routes group
│   ├── page.tsx          # Homepage
│   ├── iletisim/         # Contact page
│   ├── analiz-formu/     # Analysis form
│   └── ...
├── (auth)/               # Auth routes group
│   ├── giris/            # Login
│   └── dashboard/        # Dashboard
├── api/                  # API routes
│   ├── contact/
│   │   └── route.ts      # POST /api/contact
│   ├── analysis/
│   │   └── route.ts      # POST /api/analysis
│   └── auth/
│       ├── google/route.ts
│       └── callback/route.ts
├── components/           # App-specific components
│   ├── GoogleAnalytics.tsx
│   ├── RecaptchaProvider.tsx
│   └── ...
├── layout.tsx           # Root layout
└── globals.css          # Global styles
```

### Shared Resources

```
components/              # Shared UI components
├── Header.tsx
├── Footer.tsx
└── ...

lib/                    # Utility libraries
├── assistantsData.ts   # Business logic
├── rateLimiter.ts      # Security
├── recaptcha.ts        # Security
└── ...

public/                 # Static assets
├── favicon.ico
└── manifest.json
```

---

## Data Flow

### Form Submission Flow

```
┌─────────────┐
│   User      │
│   Fills     │
│   Form      │
└──────┬──────┘
       │
       ↓
┌─────────────────────────────────┐
│   Frontend Validation           │
│   1. Honeypot check            │
│   2. Timestamp check           │
│   3. Client-side validation    │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────────────────────────┐
│   Get reCAPTCHA Token          │
│   await executeRecaptcha()     │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────────────────────────┐
│   POST /api/contact             │
│   { ...formData, recaptchaToken}│
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────────────────────────┐
│   API Route Handler             │
│   1. Rate limiting check        │
│   2. Extract data               │
│   3. Verify reCAPTCHA           │
│   4. Validate input             │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────────────────────────┐
│   Forward to n8n Webhook        │
│   POST n8n.fokusistatistik.com │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────────────────────────┐
│   Return Response               │
│   { success, message }          │
└──────┬──────────────────────────┘
       │
       ↓
┌─────────────┐
│   User      │
│   Sees      │
│   Toast     │
└─────────────┘
```

### Authentication Flow

```
┌─────────────┐
│   User      │
│   Clicks    │
│  "Google    │
│   Login"    │
└──────┬──────┘
       │
       ↓
GET /api/auth/google
       │
       ↓
Redirect to Google OAuth
       │
       ↓
User authorizes on Google
       │
       ↓
GET /api/auth/callback?code=...
       │
       ↓
Exchange code for tokens
       │
       ↓
Get user profile from Google
       │
       ↓
POST to n8n webhook
  { email, name, picture }
       │
       ↓
n8n checks if user exists
       │
       ├─→ New User → Create in DB
       └─→ Existing → Get data
       │
       ↓
Return { isNewUser, session }
       │
       ↓
Save to localStorage
       │
       ↓
Redirect:
  - New user → /dashboard
  - Existing → /
```

---

## Component Architecture

### Component Hierarchy

```
RootLayout
├── RecaptchaProvider (client)
│   ├── GoogleAnalytics (client)
│   ├── Header (server)
│   ├── Page Content (server/client mix)
│   ├── Footer (server)
│   ├── ChatWidget (client)
│   ├── VapiWidget (client)
│   └── CookieConsent (client)
```

### Server vs Client Components

**Server Components (default):**
- Layout
- Pages
- Header
- Footer
- Blog content

**Client Components (`'use client'`):**
- Forms (interactivity)
- GoogleAnalytics
- CookieConsent
- ChatWidget
- VapiWidget
- RecaptchaProvider

**Kural:** Interaksiyon gerektirmeyen her şey Server Component.

---

## API Design

### RESTful Principles

```
GET    /api/blogs          # List
GET    /api/blogs/[slug]   # Get single
POST   /api/contact        # Create
POST   /api/analysis       # Create & Process
```

### Response Format

**Başarılı:**
```json
{
  "success": true,
  "message": "...",
  "data": { ... }
}
```

**Hata:**
```json
{
  "success": false,
  "error": "...",
  "code": "ERROR_CODE"
}
```

### Error Handling

```typescript
try {
  // Operation
} catch (error) {
  console.error('Error:', error);
  return NextResponse.json(
    { success: false, error: 'Generic message' },
    { status: 500 }
  );
}
```

---

## State Management

### Client-Side State

**Local State (useState):**
- Form data
- UI state (loading, modals)
- Temporary data

**Context (React Context):**
- reCAPTCHA provider
- Theme (gelecekte)

**LocalStorage:**
- User session
- Cookie consent
- Form drafts (gelecekte)

**Server State:**
- URL parameters
- Cookies
- Headers

### No Global State Management

**Neden Redux/Zustand yok?**
- ✅ Server Components çoğu veriyi server'da tutar
- ✅ Forms isolated state kullanır
- ✅ Session localStorage'da
- ✅ Complexity gerektirmiyor

---

## Security Architecture

### Defense Layers

```
Layer 1: Client
├── Honeypot
├── Timestamp
└── reCAPTCHA token

Layer 2: Network
├── Rate limiting
└── IP tracking

Layer 3: Server
├── reCAPTCHA verify
├── Input validation
└── Sanitization
```

### Rate Limiter Architecture

```typescript
// In-memory store
Map<IP, { count, resetTime }>

// Cleanup worker
setInterval(cleanup, 10min)

// Check logic
1. Get current entry
2. Check if expired
3. Check if limit reached
4. Increment count
5. Return result
```

---

## Performance Optimization

### Static Generation

46 sayfa build-time'da oluşturulur:
- Homepage
- Blog posts
- Static pages (Hakkımızda, SSS, vb.)

### Dynamic Rendering

Sadece gerektiğinde:
- Dashboard (auth required)
- Admin pages
- API routes

### Code Splitting

Automatic:
- Route-based splitting
- Dynamic imports (lazy loading)

---

## Deployment Architecture

### Vercel (Recommended)

```
Vercel Edge Network
├── Static assets (CDN)
├── Edge Functions (API routes)
└── Server Functions (SSR)
```

### Environment Tiers

```
Development → localhost:3000
Staging     → test.fokusistatistik.com
Production  → fokusistatistik.com
```

---

## Design Decisions Log

### Why Next.js 16 over 14?
- Turbopack (faster builds)
- Better React 19 support
- Improved caching

### Why Memory-based Rate Limiting over Redis?
- Simplicity
- No external dependencies
- Sufficient for current scale
- Easy to migrate later

### Why reCAPTCHA v3 over v2?
- Invisible (better UX)
- AI-powered (better detection)
- No user interaction needed

### Why No Database Yet?
- n8n handles data storage
- Simplifies architecture
- Easy to add later (Supabase, PostgreSQL)

---

## Future Architecture Plans

### Short-term (Q1 2025)
- [ ] Add database (Supabase)
- [ ] Implement caching (Redis)
- [ ] Add monitoring (Sentry)

### Mid-term (Q2 2025)
- [ ] Microservices (separate auth service)
- [ ] WebSocket support (real-time features)
- [ ] CDN optimization

### Long-term (Q3-Q4 2025)
- [ ] Multi-region deployment
- [ ] Load balancing
- [ ] Advanced analytics

---

**Son Güncelleme**: 18 Kasım 2025
**Version**: 1.0.0
**Architect**: Claude AI & FOKUS Team
