# Fiyatlandırma Sayfası ve Bağlantılarını Geri Getirme Rehberi

Bu doküman, `27-01-2026` tarihinde geçici olarak devre dışı bırakılan fiyatlandırma sayfası bağlantılarını ve referanslarını geri getirmek için yapılması gerekenleri açıklar.

## 1. Navbar Menüsü (components/Header.tsx)

**Desktop Navigasyonunu Geri Getir:**
`Desktop Navigation` bölümünde `YZ Danışmanlığı` linkinden sonra aşağıdaki bloku ekleyin:

```tsx
<Link href="/fiyatlandirma" className={`py-1 border-b-2 transition ${isActive('/fiyatlandirma') ? 'border-white font-semibold' : 'border-transparent hover:border-white hover:text-gray-100'}`}>
  Fiyatlandırma
</Link>
```

**Mobil Navigasyonunu Geri Getir:**
`Mobile Menu` içerisindeki listede `YZ Danışmanlığı` linkinden sonra aşağıdaki bloku ekleyin:

```tsx
<Link href="/fiyatlandirma" onClick={() => setIsMenuOpen(false)} className={`transition py-1.5 ${isActive('/fiyatlandirma') ? 'font-bold text-yellow-300' : 'hover:text-gray-200'}`}>
  Fiyatlandırma
</Link>
```

## 2. Footer Bağlantıları (components/Footer.tsx)

`Hizmetler` listesi altına, `Sanal Asistanlar` linkinden sonra aşağıdaki list item'ı geri ekleyin:

```tsx
<li>
  <Link href="/fiyatlandirma" className="hover:text-[#ffc107] transition">
    Fiyatlandırma
  </Link>
</li>
```

## 3. 404 Sayfası (app/not-found.tsx)

`Popüler Sayfalar` bölümündeki linklerin arasına aşağıdaki kodu ekleyin (YZ Danışmanlığı ve Demo arasına veya uygun bir yere):

```tsx
<span className="text-gray-300">•</span>
<Link
  href="/fiyatlandirma"
  className="text-sm text-gray-600 hover:text-[#860000] transition-colors"
>
  Fiyatlandırma
</Link>
```

## 4. Site Haritası (app/sitemap.ts)

`staticPages` dizisi içine, `yapay-zeka-danismanligi` objesinden sonra (veya uygun bir sıraya) aşağıdaki objeyi geri ekleyin:

```typescript
{
  url: `${baseUrl}/fiyatlandirma`,
  lastModified: currentDate,
  changeFrequency: 'weekly' as const,
  priority: 0.85,
},
```

## 5. Sayfa Dosyası Durumu

## 5. Sayfa Dosyası Durumu

Fiyatlandırma sayfası dosyası **SİLİNMEMİŞTİR** ancak güvenlik ve gizlilik nedeniyle klasör adı değiştirilmiştir.

**Mevcut (Gizli) Klasör Yolu:**
`app/fiyat-teklifi-ozel-x7932kd-2025/page.tsx`

**Erişim Adresi:**
`https://fokusistatistik.com/fiyat-teklifi-ozel-x7932kd-2025`

**Geri Getirme (Restore) İşlemi:**
Fiyatlandırma sayfasını tekrar `/fiyatlandirma` adresinde yayınlamak için:
1. `app/fiyat-teklifi-ozel-x7932kd-2025` klasörünün adını `app/fiyatlandirma` olarak değiştirin.
2. Yukarıdaki (1, 2, 3, 4. maddeler) bağlantı ekleme işlemlerini uygulayın.

Eğer sayfanın tamamen erişilemez olmasını istiyorsanız, klasör adını daha da karmaşıklaştırabilir veya `middleware.ts` üzerinden yönlendirme ekleyebilirsiniz. Şimdilik "gizli link" (unlisted) olarak çalışmaktadır.

## 6. Sanal Asistan Paket Fiyatları ve Dipnotlar (app/sanalasistanlar/[id]/page.tsx)

Sanal asistan detay sayfalarındaki (`fokus001` - `fokus999`) fiyatlandırma tablolarında Aylık/Yıllık plan satırları ve altındaki ücret dipnotu kaldırılmıştır. 

**Fiyat Tablosu Satırlarını Geri Getir:**
`Pricing Table` bölümünde, tablonun `tbody` etiketi kapanmadan hemen önce (`</tbody>`'dan önce), özellikler döngüsünden (`featureKeys.map`) sonra aşağıdaki kod blokunu geri ekleyin:

```tsx
{/* Monthly Price Row */}
<tr className="bg-[#ffc107]">
  <td className="p-2 text-xs font-bold text-gray-800">Aylık Plan*</td>
  {displayAssistant.packages.map((pkg) => (
    <td key={pkg.name} className="p-2 text-xs text-center font-bold text-gray-800">
      {pkg.monthlyPrice}
    </td>
  ))}
</tr>

{/* Yearly Price Row */}
<tr className="bg-[#ffc107]">
  <td className="p-2 text-xs font-bold text-gray-800">Yıllık Plan*</td>
  {displayAssistant.packages.map((pkg) => (
    <td key={pkg.name} className="p-2 text-xs text-center font-bold text-gray-800">
      {pkg.yearlyPrice}
    </td>
  ))}
</tr>
```

**Ücret Dipnotunu Geri Getir:**
Tablonun bulunduğu `div` (`overflow-x-auto` class'lı div) kapandıktan hemen sonra, aşağıdaki dipnot alanını geri ekleyin:

```tsx
<div className="mt-4 bg-white rounded-xl p-4 text-xs border border-gray-200">
  <p className="text-gray-700 leading-relaxed">{displayAssistant.priceNote}</p>
</div>
```

## 7. SSS Sayfası Fiyat Bilgisi (app/sss/page.tsx)

Sıkça Sorulan Sorular sayfasında, bakım ve servis hizmetleri ile ilgili sorunun cevabındaki spesifik fiyat bilgisi ("1.000 TL + KDV") kaldırılarak genel bir ifadeye çevrilmiştir.

**Orijinal Fiyat Bilgisini Geri Getir:**
`SSS` dosyasında (`app/sss/page.tsx`), "Periyodik bakımlar dışında veri analizi..." sorusunun cevabını aşağıdaki ile değiştirin:

```tsx
answer: 'Evet, periyodik bakımın ötesinde ihtiyaç duyulan veri analizi, sistem güncellemesi ve iyileştirme hizmetlerini de sağlıyoruz. Bu kapsamda verilen servis hizmetleri, 31.12.2025 tarihine kadar geçerli olmak üzere 1.000 TL + çıkabilecek ek masraflar + KDV şeklinde ücretlendirilir. Tüm hizmetler şeffaf bir şekilde belgelendirilir ve onayınıza sunularak gerçekleştirilir.',
```
