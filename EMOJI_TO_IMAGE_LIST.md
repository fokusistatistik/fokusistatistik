# Emoji Yerine Profesyonel Görsel Kullanılacak Yerler

Bu liste, sitede emoji kullanılan ve profesyonel ikon/görsel ile değiştirilmesi gereken alanları içerir.

## 🎯 1. Sanal Asistan İkonları

### Dosya: `app/page.tsx` (Ana Sayfa)
**Satırlar: 50, 56, 62, 68, 74, 80, 86, 92, 98**

```typescript
const assistants = [
  { code: 'fokus001', name: 'FOKUS001', title: 'Yönetici Asistanı', icon: '👔' },
  { code: 'fokus216', name: 'FOKUS216', title: 'Müşteri Hizmetleri', icon: '💬' },
  { code: 'fokus314', name: 'FOKUS314', title: 'Veri Analisti', icon: '📊' },
  { code: 'fokus520', name: 'FOKUS520', title: 'Pazarlama & Lead', icon: '🎯' },
  { code: 'fokus618', name: 'FOKUS618', title: 'Finans & Fatura', icon: '💰' },
  { code: 'fokus707', name: 'FOKUS707', title: 'İnsan Kaynakları', icon: '👥' },
  { code: 'fokus717', name: 'FOKUS717', title: 'İçerik Tasarımı', icon: '🎨' },
  { code: 'fokus808', name: 'FOKUS808', title: 'Sosyal Medya', icon: '📱' },
  { code: 'fokus999', name: 'FOKUS999', title: 'Joker Asistan', icon: '🃏' },
];
```

**Önerilen Değişiklik:**
```typescript
icon: '/assets/img/icons/fokus001-icon.svg'
// veya
icon: 'https://www.fokusistatistik.com/assets/img/icons/fokus001-icon.svg'
```

**Gerekli İkonlar:**
- `fokus001-icon.svg` - Yönetici (kravat/takım elbise ikonu)
- `fokus216-icon.svg` - Müşteri Hizmetleri (kulaklık/destek ikonu)
- `fokus314-icon.svg` - Veri Analisti (grafik/analiz ikonu)
- `fokus520-icon.svg` - Pazarlama (hedef/megafon ikonu)
- `fokus618-icon.svg` - Finans (para/hesap ikonu)
- `fokus707-icon.svg` - İnsan Kaynakları (insanlar/ekip ikonu)
- `fokus717-icon.svg` - İçerik (palet/dizayn ikonu)
- `fokus808-icon.svg` - Sosyal Medya (telefon/paylaşım ikonu)
- `fokus999-icon.svg` - Joker (yıldız/sihirli değnek ikonu)

### Dosya: `app/sanalasistanlar/page.tsx` (Asistanlar Listesi)
**Satırlar: 33, 39, 45, 51, 57, 63, 69, 75, 81**
- Aynı emoji seti kullanılıyor
- Aynı çözüm uygulanabilir

### Dosya: `app/sanalasistanlar/[id]/page.tsx` (Asistan Detay)
**İçerik bölümünde asistan ikonları**
- Detay sayfalarında da asistan ikonları kullanılıyor
- Büyük boyutlu görseller kullanılabilir

---

## 🎁 2. Kampanya/Promosyon İkonları

### Dosya: `app/components/PromotionCTA.tsx`
**Satır: 60, 122**

```typescript
<span className="bg-white/20 px-3 py-1 rounded-full">
  🎁 Özel Fırsat
</span>

<span className="text-[17px] animate-bounce">🎁</span>
```

**Önerilen Değişiklik:**
```jsx
<Gift className="w-4 h-4 inline-block mr-1" />
// veya
<Image src="/assets/img/icons/gift-icon.svg" width={20} height={20} alt="Gift" />
```

**Gerekli İkon:**
- `gift-icon.svg` - Hediye kutusu ikonu

---

## ✓ 3. Özellik/Fayda İşaretleri

### Dosya: `app/giris/page.tsx`
**Satırlar: 186-188**

```typescript
<p>✓ 1 ay ücretsiz deneme</p>
<p>✓ Kredi kartı gerekmez</p>
<p>✓ İstediğiniz zaman iptal</p>
```

**Önerilen Değişiklik:**
```jsx
<CheckCircle className="w-4 h-4 inline-block mr-2 text-green-600" />
// veya CSS ile:
<span className="inline-flex items-center">
  <svg className="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
  1 ay ücretsiz deneme
</span>
```

**Gerekli İkon:**
- `check-circle.svg` - Onay işareti ikonu

### Benzer Kullanımlar:
- `app/page.tsx:345` - "✓ 1 ay ücretsiz deneme • ✓ Kredi kartı gerekmez"
- `app/fiyatlandirma/page.tsx` - Plan özellikleri

---

## 🤖 4. Genel Amaçlı İkonlar

### Dosya: `app/components/ChatWidget.tsx`
**ChatBot ikonu için emoji yerine lucide-react veya custom SVG kullanılabilir**

### Dosya: `app/footer/Footer.tsx`
**Satır: 216-218**

```typescript
<span>🎯 22+ Yıllık Deneyim</span>
<span>🤖 9 Sanal Asistan</span>
<span>⏰ 7/24 Destek</span>
```

**Önerilen Değişiklik:**
```jsx
<Target className="w-4 h-4 inline-block mr-1" /> 22+ Yıllık Deneyim
<Bot className="w-4 h-4 inline-block mr-1" /> 9 Sanal Asistan
<Clock className="w-4 h-4 inline-block mr-1" /> 7/24 Destek
```

**Gerekli İkonlar:**
- Lucide-react'ten import edilebilir: `Target`, `Bot`, `Clock`

### Dosya: `app/ekibimiz/page.tsx`
**Ekip üyesi rolleri için ikonlar**

---

## 📋 Öncelik Sırası

### Yüksek Öncelik (Görünürlük Yüksek):
1. ✅ **Ana sayfa asistan ikonları** (`app/page.tsx`) - 9 emoji
2. ✅ **Asistanlar listesi** (`app/sanalasistanlar/page.tsx`) - 9 emoji
3. ✅ **Promosyon CTA** (`app/components/PromotionCTA.tsx`) - 2 emoji
4. ✅ **Footer istatistikler** (`components/Footer.tsx`) - 3 emoji

### Orta Öncelik:
5. ⚠️ **Giriş sayfası check işaretleri** (`app/giris/page.tsx`) - 3 emoji
6. ⚠️ **Ana sayfa özellikler** (`app/page.tsx`) - Check işaretleri

### Düşük Öncelik (İçerik bazlı):
7. 📝 **Detay sayfalarındaki içerik emoji'leri**
8. 📝 **Dashboard ikonları**

---

## 🎨 Tasarım Önerileri

### İkon Seti Özellikleri:
- **Format:** SVG (ölçeklendirilebilir)
- **Boyut:** 24x24px, 32x32px, 48x48px (farklı kullanımlar için)
- **Renk:** Tek renk (CSS ile renklendirebilir) veya brand renkli
- **Stil:** Minimalist, profesyonel, kurumsal kimliğe uygun
- **Tutarlılık:** Tüm ikonlar aynı stil ailesi

### Önerilen İkon Kaynakları:
1. **Heroicons** (https://heroicons.com/) - Tailwind CSS ikonları
2. **Lucide Icons** (https://lucide.dev/) - Zaten projede kullanılıyor
3. **Font Awesome Pro** - Ücretli, geniş koleksiyon
4. **Custom SVG** - Marka kimliğine özel tasarım

### Implementation Örneği:

```tsx
// Lucide-react kullanarak
import { Briefcase, MessageCircle, BarChart, Target, DollarSign, Users, Palette, Smartphone, Sparkles } from 'lucide-react';

const assistants = [
  { code: 'fokus001', name: 'FOKUS001', title: 'Yönetici Asistanı', Icon: Briefcase },
  { code: 'fokus216', name: 'FOKUS216', title: 'Müşteri Hizmetleri', Icon: MessageCircle },
  { code: 'fokus314', name: 'FOKUS314', title: 'Veri Analisti', Icon: BarChart },
  // ...
];

// Kullanım:
{assistants.map((assistant) => (
  <div key={assistant.code}>
    <assistant.Icon className="w-8 h-8 text-[#860000]" />
    <h3>{assistant.name}</h3>
  </div>
))}
```

---

## ✅ Aksiyonlar

- [ ] 9 asistan ikonu için SVG/ikon seç veya tasarla
- [ ] Promosyon hediye ikonu ekle
- [ ] Check işaretleri için SVG/ikon ekle
- [ ] Footer ikonları için Lucide-react kullan
- [ ] Ana sayfa ve asistan listesi sayfalarını güncelle
- [ ] Test ve build kontrolü yap

---

**Son Güncelleme:** 12 Kasım 2025
**Hazırlayan:** Claude Code Assistant
