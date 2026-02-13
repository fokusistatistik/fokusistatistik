'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQSchema } from '@/app/components/StructuredData';

interface FAQ {
  question: string;
  answer: string;
}

export default function SSS() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs: FAQ[] = [
    {
      question: 'Gizlilik Politikanız var mı?',
      answer: 'Fokus Veri Bilimi ve Yapay Zeka Danışmanlığı olarak, kullanıcılarımızın gizliliğine önem veriyoruz. Topladığımız kişisel veriler sadece hizmet kalitemizi artırmak için kullanılmaktadır ve kesinlikle verileriniz üçüncü taraflarla paylaşılmamaktadır.',
    },
    {
      question: 'FOKUS hangi sektörlere hizmet veriyor?',
      answer: 'Her ölçekteki kamu ve özel sektöre veri temelli çözümler sunuyoruz. Sağlık, eğitim, yerel yönetim, üretim, lojistik, hizmet, teknoloji gibi farklı alanlarda kurumlarla çalışıyoruz.',
    },
    {
      question: 'Veri bilimi danışmanlığına neden ihtiyaç duyarım?',
      answer: 'İş kararlarını sezgilere değil veriye dayandırmak; maliyetleri düşürmek, operasyonları iyileştirmek ve geleceği daha sağlıklı planlamak için kritik öneme sahiptir. Veri bilimi bu dönüşümün temelidir.',
    },
    {
      question: 'Sanal Asistanla değil de Gerçek İnsanla görüşmek isterlerse?',
      answer: 'Sizin stratejileriniz doğrultusunda bu planı değerlendiriyor ve gerekli yerlerde gerçek kişiye aktarma opsiyonları kullanabiliyoruz. Tüm mesajlarda "Canlı destek ile görüşmek istiyorum" gibi ifadeler algılanırsa, asistan ilgili kişiye yönlendirebilir.',
    },
    {
      question: 'Verilerimiz gizli kalır mı?',
      answer: 'Elbette. Tüm süreçlerde KVKK (Kişisel Verilerin Korunması Kanunu) ve istatistik meslek etik kurallarına %100 bağlıyız. Veri güvenliği, bizim için sadece bir sorumluluk değil, temel ilkedir.',
    },
    {
      question: 'Küçük bir işletmeyiz, yine de çalışabilir miyiz?',
      answer: 'Kesinlikle evet. Ölçeğiniz ne olursa olsun ihtiyaçlarınıza özel veri çözümleri üretiyoruz. Tek kişilik işletmelerden on binlerce kişilik kurumlara kadar hizmet sunuyoruz.',
    },
    {
      question: 'Sadece analiz mi yapıyorsunuz, yoksa uygulamaya da destek veriyor musunuz?',
      answer: 'Sadece analiz değil, veriyi toplama, işleme, otomasyon, Yapay Zeka Entegrasyonları, görselleştirme, karar destek sistemlerine entegre etme ve yönetime sunma gibi tüm aşamalarda aktif olarak çalışıyoruz. Dilerseniz eğitim ve iç kaynak güçlendirme hizmetleri de sunuyoruz.',
    },
    {
      question: 'Kurulum ve entegrasyon süresi ne kadar sürüyor?',
      answer: 'Kurulum ve entegrasyon süresi; seçtiğiniz hizmet türüne, mevcut altyapınıza ve özel taleplerinize bağlı olarak değişiklik gösterebilir. Standart paketlerde hizmetler genellikle 1 ila 5 iş günü içerisinde devreye alınmaktadır. Daha karmaşık veya kurumunuza özel projelerde ise, ön analiz süreci sonrasında ekiplerimiz sizinle birlikte proje takvimi belirler ve bu takvime sadık kalarak tüm süreci şeffaf bir şekilde yürütürüz.',
    },
    {
      question: 'Müşteri Memnuniyeti Politikanız nedir?',
      answer: 'Müşteri memnuniyeti, FOKUS\'un tüm hizmet politikalarının merkezinde yer alır. Amacımız yalnızca hizmet sunmak değil, sunduğumuz çözümlerle işletmenizin verimliliğini, kârlılığını ve rekabet gücünü artırmaktır. Tüm süreçlerimiz veri temelli çalışır: Etkinliği ölçülür, sonuçları raporlanır ve müşterilerimizle düzenli olarak paylaşılır. Kısacası, yalnızca vaat etmeyiz – performansımızı ölçerek şeffaf şekilde ortaya koyarız.',
    },
    {
      question: 'Kendi özel yazılımlarımız var, entegrasyon mümkün mü?',
      answer: 'Büyük ihtimalle evet. FOKUS olarak; API, webhook, veri tabanı bağlantıları ve özel adaptörler aracılığıyla birçok sistemle entegre çalışabilecek esnek çözümler sunmaktayız. Ön analiz sürecimizde mevcut yazılım altyapınızı inceliyor, gerekli entegrasyon yöntemlerini teknik ekiplerimizle birlikte değerlendiriyoruz.',
    },
    {
      question: 'Sosyal medya yönetimi hizmetiniz var mı?',
      answer: 'Doğrudan sosyal medya yönetimi hizmeti sunmuyoruz. Ancak markanızın dijital dünyadaki görünürlüğünü ve etkileşimini artırmak için otomatikleştirilmiş, veri destekli kampanya sistemleri kuruyoruz. Trend analizlerine dayalı, insana bağımlı olmayan sistemlerle hedef kitlenizle doğru zamanda doğru şekilde buluşmanızı sağlıyoruz. Siz yalnızca hedefinizi belirleyin; teknik altyapıyı biz üstleniyoruz.',
    },
    {
      question: 'Reklam kampanyası yapmak istiyorum, nasıl ve kime yapmalıyım?',
      answer: 'Reklam kampanyalarının başarısı, hedef kitlenin doğru belirlenmesine ve uygun kanalın seçilmesine bağlıdır. Özellikle küçük ve orta ölçekli işletmeler için düşük bütçeyle yüksek etki yaratmak önceliklidir. FOKUS olarak, mevcut müşteri verilerinizi analiz ediyor; potansiyel müşteri profillerinizi çıkarıyor ve sizin için en uygun hedefleme stratejisini oluşturuyoruz. Bu sayede reklam harcamalarınızdan maksimum verim elde edersiniz.',
    },
    {
      question: 'Chatbot istemediğim cevaplar verirse ve kurumsal imajım zarar görürse ne olur?',
      answer: 'Bu konuda son derece hassasız. Geliştirdiğimiz yapay zeka tabanlı chatbotlar, işletmenizin iletişim dili, değerleri ve kurumsal çizgisi temel alınarak eğitilir. Chatbot davranışı, sizin belirlediğiniz sınırlar içerisinde yanıt verecek şekilde özelleştirilir. Ayrıca riskli veya istenmeyen konularda otomatik filtreleme sistemleriyle hata payı en aza indirilir. Tüm cevap şablonları ve senaryolar sizinle birlikte test edilerek canlıya alınır.',
    },
    {
      question: 'Bir problem olursa nasıl destek veriyorsunuz?',
      answer: 'FOKUS, hizmet verdiği tüm müşterilerine sorunsuz bir deneyim sunmayı taahhüt eder. Özelleştirilmiş destek botlarımız 7/24 hizmetinizdedir ve olası sorunlarda sizi ilgili teknik veya danışmanlık ekiplerine yönlendirir. Ayrıca, hizmet paketiniz kapsamında sınırlı veya sınırsız canlı destek, öncelikli yanıt ve acil müdahale hizmetleri sunulmaktadır. Kritik düzeydeki teknik aksaklıklarda ise, operasyonel riskleri minimize etmek için 7/24 aktif izleme ve müdahale ekibimiz devrededir.',
    },
    {
      question: 'FOKUS hizmetleri için hangi ödeme yöntemleri kullanılabilir?',
      answer: 'FOKUS hizmetleri için çeşitli ve güvenli ödeme seçenekleri sunuyoruz:\n• Kredi/Banka Kartı (Visa, MasterCard vb.)\n• Havale / EFT\n• İyzico altyapısıyla güvenli online ödeme\n• Aylık veya yıllık abonelik planları\n• Kurumsal faturalandırma imkânı\nTüm işlemlerinizin sonunda dijital fatura ve ödeme dekontu otomatik olarak e-posta adresinize gönderilir.',
    },
    {
      question: 'İade ve İptal Koşulları nelerdir?',
      answer: 'FOKUS olarak, şeffaf ve kullanıcı dostu bir hizmet anlayışını benimsiyoruz. Bu doğrultuda iade ve iptal koşullarımız şu şekildedir:\n• Hizmet kullanımına başlanmamışsa, satın alım tarihinden itibaren 1 ay içinde koşulsuz iptal ve iade talebinde bulunabilirsiniz.\n• Kurulum, entegrasyon ya da danışmanlık gibi hizmetlerde, işlem başlamışsa sadece tamamlanmamış kısımlar üzerinden orantılı bir iade yapılır.\n• Abonelik bazlı hizmetlerde, bir sonraki fatura dönemine kadar iptal başvurusu yapılması yeterlidir. Bu durumda mevcut dönem sonunda hizmet durdurulur, tekrar ücret yansıtılmaz.\n• Dijital varlık üretimi (özel yapay zekâ modeli, veri analizi, içerik üretimi gibi) başlamış ve teslim edilmiş hizmetlerde iade mümkün değildir. Ancak memnuniyet garantisi kapsamında revize veya telafi seçenekleri sunulur.',
    },
    {
      question: 'Çoklu dil desteği var mı?',
      answer: 'Evet, FOKUS sistemleri çok dilli kullanım imkânı sunmaktadır. Arayüzler ve kullanıcı panelleri, Türkçe ve İngilizce başta olmak üzere farklı dillerde sunulabilir. Talebe bağlı olarak, özel kullanım alanları için diğer dillerde destek de entegre edilebilir. Bu sayede ekipleriniz farklı diller konuşsa bile sistemi rahatça kullanabilir.',
    },
    {
      question: 'FOKUS ekosistemi nedir?',
      answer: 'FOKUS ekosistemi, farklı yapay zeka asistanlarının birbirleriyle etkileşimli çalıştığı bir otomasyon sistemidir. Her bir yapay zeka, özel bir görevi üstlenirken aynı zamanda diğer asistanlarla veri alışverişi yapabilir. Bu yapı sayesinde:\n• Süreçleriniz otomatikleşir\n• Zaman kaybı azalır\n• Hatalar minimuma iner\n• Karar destek sistemleri gelişir\nVerimli, ölçeklenebilir ve güvenilir bir yapı sunar. Kısacası: FOKUS, işinizi sizin yerinize düşünen bir yapay zeka ekosistemidir.',
    },
    {
      question: 'Rapor alabiliyor muyuz?',
      answer: 'Evet. Tüm hizmet paketlerinde, işletmenize özel olarak hazırlanmış düzenli aylık performans raporları sunulmaktadır. Bu raporlar; sistem kullanım istatistikleri, performans metrikleri, otomasyon etkileri, müşteri etkileşimleri ve önerilen geliştirmeleri içerir. Talepleriniz doğrultusunda haftalık, anlık veya proje bazlı özel raporlamalar da yapılabilir.',
    },
    {
      question: 'OpenAI, ChatGPT gibi yapay zeka servisleri için üyelikleri bizim mi almamız gerekiyor?',
      answer: 'Hayır, standart hizmet paketlerimizde bu tür lisans ve API üyeliklerini biz kendi sistemlerimiz üzerinden sizin adınıza yönetiyoruz. Bu sayede herhangi bir ek üyelik işlemiyle uğraşmanıza gerek kalmaz; tüm yapay zeka entegrasyonları sorunsuz şekilde tarafımızdan yürütülür. Ancak kurumsal yapınız, veri kontrol politikalarınız veya özel ihtiyaçlarınız gereği kendi üyeliklerinizi kullanmak isterseniz, bu konuda da destek sunuyoruz. Gerekli yönlendirmeleri sağlıyor, kurulum sürecinde tüm teknik ayarları sizin adınıza yapılandırıyoruz.',
    },
    {
      question: 'Sistemleri kullanırken ek maliyetler gerekiyor mu?',
      answer: 'Standart hizmet paketlerimiz, işletmenizin temel ihtiyaçlarını karşılayacak yeterli kullanım limitleriyle birlikte sunulmaktadır. Sistem kullanımınız düzenli olarak izlenir ve herhangi bir artış veya olağan dışı durum oluşmadan önce sizi bilgilendiririz. Bu sayede sürpriz veya önceden onaylanmamış ek ödemelerle karşılaşmazsınız. Küçük ölçekli aşım ve talepleri memnuniyetle, herhangi bir ek ücret talep etmeden karşılamaktayız. Ancak kullanım hacminizde belirgin bir artış olur veya yeni talepler gündeme gelirse, bunu sizinle istişare ederek şeffaf biçimde planlıyoruz.',
    },
    {
      question: 'Power BI, n8n ya da Python gibi araçları kullanmayı bilmiyoruz. Bu bir engel mi?',
      answer: 'Hayır, hiçbir teknik bilgi zorunlu değildir. Araçları sizin adınıza biz kullanıyor, çıktılarını anlaşılır sunumlarla size iletiyoruz. Dilerseniz kurum içi temel-orta düzey eğitimler de veriyoruz.',
    },
    {
      question: 'Mevcut verilerimiz dağınık ve karmaşık, yine de faydalanabilir miyiz?',
      answer: 'Tam da bu nedenle buradayız. Dağınık verileri bir araya getirip anlamlı hale getirmek veri biliminin temel işlevlerinden biridir. Ham veriden net içgörüye giden süreci sizinle birlikte yönetiyoruz.',
    },
    {
      question: 'Makine öğrenmesi, danışmanlık sürecinizin neresinde kullanılıyor?',
      answer: 'Makine öğrenmesi, özellikle tahminleme, sınıflandırma, segmentasyon ve öneri sistemlerinde devreye girer. İşe özgü modeller geliştirerek veriyle öğrenen yapılar kurar, sürekli iyileşen sistemler tasarlarız. Uygulama alanı tamamen ihtiyaçlara özel belirlenir.',
    },
    {
      question: 'Verilerimizi bulutta mı saklıyorsunuz, yerel mi çalışıyorsunuz?',
      answer: 'Verilerinizi hiçbir şekilde izinsiz saklamıyoruz. Tercihinize göre yerel sunucularınızda, kurumsal bulut ortamınızda ya da dilerseniz geçici, şifreli FOKUS bulut ortamında çalışabiliriz. Tüm tercihlerde veri güvenliği önceliğimizdir.',
    },
    {
      question: 'Power BI raporları mobilde de çalışır mı?',
      answer: 'Evet. Geliştirdiğimiz Power BI panoları, tablet ve telefonlar dahil olmak üzere tüm cihazlarla uyumludur. Mobil kullanım için özel sadeleştirilmiş ekranlar da hazırlayabiliyoruz.',
    },
    {
      question: 'Projeler tamamlandıktan sonra teknik destek alabilir miyiz?',
      answer: 'Evet. Her projeye özel bir sonrası destek süresi belirlenir. Ayrıca bakım, güncelleme, eğitim tekrarı ve yeni ihtiyaçlara uyarlama gibi hizmetlerle destek olmaya devam ediyoruz.',
    },
    {
      question: 'Birlikte çalışmaya başlamadan önce ücretsiz bir analiz sunuyor musunuz?',
      answer: 'Evet. İlk görüşmede kurumun ihtiyacına özel kısa bir analiz yaparak çözüm önerimizi sunuyoruz. Bu analiz, ihtiyaçları netleştirmek ve stratejik planlamayı daha doğru yapmak açısından büyük fayda sağlıyor.',
    },
    {
      question: 'Eğitim ve danışmanlığı ayrı ayrı mı alabiliyoruz?',
      answer: 'Kesinlikle. Sadece danışmanlık, sadece eğitim ya da ikisini birlikte alabileceğiniz modüler yapılar sunuyoruz. İhtiyacınıza göre esnek bir yapı kuruyoruz.',
    },
    {
      question: 'Kendi personelimizi eğitip projeleri biz yürütebilir miyiz?',
      answer: 'Bu yaklaşımı özellikle destekliyoruz. FOKUS olarak, kurum içi kapasiteyi güçlendirmeyi ve projelerin içselleştirilmesini önemsiyoruz. Gerekirse mentorluk süreci de ekleyerek size rehberlik ediyoruz.',
    },
    {
      question: 'Hâlihazırda Excel kullanıyoruz, bu yeterli değil mi?',
      answer: 'Excel güçlü bir başlangıç aracıdır, ancak büyük veri setlerinde yetersiz kalabilir. İş zekâsı, görselleştirme, tahminleme gibi ileri analizler için kısıtlıdır. Excel ile ya da Excel\'in ötesine geçerek ölçeklenebilir ve sürdürülebilir çözümler sunuyoruz.',
    },
    {
      question: 'Kurulum ve destek süreci nasıl ilerliyor?',
      answer: 'FOKUS sisteminin kurulumu oldukça hızlı ve kolaydır. İlk aşamada ihtiyaçlarınıza özel kısa bir keşif toplantısı yapılır. Ardından size özel çözümler hazırlanır ve kurulum tamamlanır. Kurulum sonrası tüm süreç boyunca size özel bir destek uzmanı atanır. Eğitim, kullanım kılavuzları ve sürekli teknik destek ile hiçbir detayı kaçırmazsınız.',
    },
    {
      question: 'Verilerim nerede saklanıyor? Güvende mi?',
      answer: 'Verileriniz, uluslararası güvenlik standartlarına sahip Google altyapısında saklanır. Bu sistemler GDPR ile tam uyumludur, ISO 27001 ve SOC 2 gibi güvenlik sertifikalarına sahiptir. Gelişmiş şifreleme ve erişim kontrolü ile korunur. Veriler yalnızca sizin onayınızla işlenir ve asla izinsiz paylaşılmaz.',
    },
    {
      question: 'Veri bilimciler içeriği teknik anlatırsa çalışanlarımız anlayabilir mi?',
      answer: 'Tüm çıktılarımızı teknik olmayan kullanıcılara da uygun şekilde sadeleştiriyor, anlatımı anlaşılır hale getiriyoruz. Eğitimlerde ve raporlarda teknik kavramları yalınlaştırarak sunuyor, içgörüyü yaygınlaştırmayı hedefliyoruz. Amacımız kafa karıştırmak değil, herkesin anlayabileceği bir şekilde değer üretmek.',
    },
    {
      question: 'Hangi teknolojik arayüzleri, programları ve yazılım dillerini kullanıyorsunuz?',
      answer: 'FOKUS Veri Bilimi Danışmanlığı olarak projeye özel araçlar seçiyoruz. Başlıca kullandığımız teknolojiler: Python, SPSS, KNIME, Jupyter, VS Code, Power BI, SQL, Google Cloud (BigQuery, Data Studio), Kotlin, n8n ve OpenAI gibi API hizmetleridir. Bu araçlarla veri analizi, iş zekâsı ve otomasyon çözümleri sunuyoruz.',
    },
    {
      question: 'Kendi yazılım ve istatistik ekibimiz var. Ortak çalışıyor musunuz?',
      answer: 'Evet. Mevcut ekiplerinizle tam uyum içinde çalışıyor, bilgi paylaşımını ve proje verimliliğini artırıyoruz. Gerekirse mentorluk ve teknik destek sağlıyor, ortak hedeflere birlikte ulaşıyoruz. Bu sayede kurum içi kapasiteniz de güçleniyor.',
    },
    {
      question: 'Yapay zeka destekli sanal personel nedir?',
      answer: 'GPT tabanlı yapay zeka danışmanları; müşteri temsilciliği, içerik önerisi, raporlama veya bilgi yanıtlaması gibi görevleri üstlenen dijital ekip üyeleridir. Sizin sağladığınız veri ve dokümanlarla çalışarak hem yazılı hem sesli iletişim kurabilirler.',
    },
    {
      question: 'Kurumuma özel yapay zeka asistanı yaptırabilir miyim?',
      answer: 'Evet. Mikro ölçekli, kurumunuza özel geliştirilen GPT destekli sistemler oluşturuyoruz. Bu sistemleri iletişim araçlarınıza entegre ederek müşteri iletişimini ve iç süreçleri 7/24 aktif tutabilirsiniz.',
    },
    {
      question: 'Chatbot sistemleri hangi platformlara entegre edilebilir?',
      answer: 'WhatsApp, Telegram, web siteleri ve mobil uygulamalara entegre edilebilen chatbot çözümleri sunuyoruz. Böylece kullanıcılarınızla her kanaldan etkili iletişim kurabilirsiniz.',
    },
    {
      question: 'Otomasyon sistemleri hangi alanlarda çalışır?',
      answer: 'Randevu yönetimi, hatırlatma sistemleri, performans takibi, müşteri etkileşimi, veri analizi gibi birçok alanda otomasyon çözümleri geliştiriyoruz. Süreçlerinizi hızlandıracak ve verimi artıracak özgün sistemler tasarlıyoruz.',
    },
    {
      question: 'Web sitenizde örnek çalışmalar veya referanslar göremedik. İnceleyebilir miyiz?',
      answer: 'Çalışmalarımız genellikle kurumlara özel olduğu için kamuya açık paylaşılmamaktadır. Ancak tanışma toplantısında benzer projeleri canlı sistemler üzerinden gösteriyor ve detaylarını aktarıyoruz.',
    },
    {
      question: 'Henüz yeni bir firma olduğunuz için çekincelerimiz var. Referans verebilir misiniz?',
      answer: 'FOKUS, yeni bir yapı olsa da kurucumuzun ve ekibimizin uzun yıllara dayanan sektörel deneyimi vardır. Önceki bireysel projelerimizi artık kurumsal yapımız altında sürdürüyoruz. Görüşmelerde örnek sistem ekranlarını sizinle paylaşıyoruz.',
    },
    {
      question: 'Hizmetlerin gerçek etkisini nasıl ölçebiliriz?',
      answer: 'Projelerimizde öncesi-sonrası analizleri, kullanıcı geri bildirimleri, verimlilik ölçümleri ve KPI göstergeleriyle somut sonuçlar sunuyoruz. Toplantılarda bu analizlerden örnekler de gösteriyoruz.',
    },
    {
      question: 'Sizinle çalışırken güvenebileceğimizi nasıl anlayabiliriz?',
      answer: 'Açık iletişim, ölçülebilir ilerleme ve belgelenmiş süreçlerle çalışıyoruz. Karar alma süreçlerine sizi aktif olarak dahil ediyor ve şeffaflık ilkesine bağlı kalıyoruz. Tüm aşamalar size açık şekilde yürütülür.',
    },
    {
      question: 'Periyodik bakımlar dışında veri analizi ve sistem yenileme hizmeti sunuyor musunuz?',
      answer: 'Evet, periyodik bakımın ötesinde ihtiyaç duyulan veri analizi, sistem güncellemesi ve iyileştirme hizmetlerini de sağlıyoruz. Bu kapsamda verilen servis hizmetleri, 31.12.2025 tarihine kadar geçerli olmak üzere 1.000 TL + çıkabilecek ek masraflar + KDV şeklinde ücretlendirilir. Tüm hizmetler şeffaf bir şekilde belgelendirilir ve onayınıza sunularak gerçekleştirilir.',
    },
    {
      question: 'Kendi sistemimizi kullanıyoruz. Siz uyum sağlayabilir misiniz?',
      answer: 'Evet. Mevcut sistemlerinize müdahale etmeden entegre çözümler üretiyoruz. Hazır kalıplar dayatmıyoruz, sisteminize uyum sağlıyoruz. Böylece adaptasyon süreci daha kolay olur ve kullanıcı memnuniyeti artar.',
    },
    {
      question: 'Sizinle çalışmak bize ne kazandırır?',
      answer: 'FOKUS ile çalışmak, yalnızca teknolojiyi kullanmak değil, onu anlamak ve faydaya dönüştürmek anlamına gelir. Anlaşılır ve sürdürülebilir çözümlerle dijital dönüşümünüzü hızlandırır, organizasyonel yetkinliklerinizi artırırız.',
    },
    {
      question: 'Nasıl başlayabiliriz?',
      answer: 'İletişim formu üzerinden bize ulaşabilir veya doğrudan e-posta gönderebilirsiniz. İlk olarak ihtiyaç analizi için ücretsiz bir görüşme planlıyoruz. Ardından sizin için özel çözüm yol haritasını sunuyoruz.',
    },
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#860000] via-[#a50000] to-[#6b0000] text-white py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="content-container text-center">
              <HelpCircle className="w-16 h-16 mx-auto mb-6 text-[#ffc107]" />
              <h1 className="text-3xl lg:text-5xl font-bold mb-6">
                Sıkça Sorulan Sorular (SSS)
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                FOKUS İstatistik SSS sayfası ile sıkça sorulan gizlilik, sektörler, veri bilimi danışmanlığı, sanal asistanlar ve güvenlik konularına yanıtlar. Veri odaklı dijital dönüşümde tüm sorularınızın cevabı burada.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="content-container">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 pr-4">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`w-6 h-6 text-[#860000] flex-shrink-0 transition-transform duration-300 ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openIndex === index ? 'max-h-[1000px]' : 'max-h-0'
                      }`}
                    >
                      <div className="p-6 pt-0 text-gray-700 leading-relaxed whitespace-pre-line border-t border-gray-100">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#860000] to-[#6b0000] text-white rounded-3xl p-12 shadow-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Başka Sorularınız mı Var?
              </h2>
              <p className="text-lg text-gray-200 mb-8">
                Burası size yardımcı olmak için burada. Herhangi bir sorunuz varsa, bizimle iletişime geçmekten çekinmeyin.
              </p>
              <a
                href="mailto:bilgi@fokusistatistik.com"
                className="inline-block bg-white text-[#860000] px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-xl"
              >
                Bize Ulaşın
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}
