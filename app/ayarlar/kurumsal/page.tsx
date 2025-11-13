'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import './styles.css';

// ========================================
// TYPES
// ========================================
interface StaffMember {
  'Personel Sıra': number;
  'Personel İsim': string;
  'Personel Görev': string;
  'Takvim ID': string;
  'OP-Foto-URL': string;
  'OP-Etkinlik Yeri': string;
  'Personel Detaylar': string;
  'Personel Notu': string;
  'Hizmetler': Record<string, 'EVET' | 'HAYIR'>;
}

interface Service {
  'İşlem Sıra': number;
  'İşlem Adı': string;
  'Seans Sayısı': number;
  'Süre': number;
  'Ücret': number;
  'İşlem Notu': string;
}

interface AvailableService {
  id: number;
  name: string;
}

// FOKUS Assistants Data
const fokusAssistants: Record<string, { title: string; descriptions: string[] }> = {
  'FOKUS001': {
    title: 'Yönetici Sanal Asistanı',
    descriptions: [
      'Şirket süreçlerinizi optimize eder, toplantı notları tutabilir, görev dağılımı yapabilir ve tüm operasyonlarınızı koordine edebilir.',
      'İş planlarınızı düzenler, maliyet analizi yapar, verimlilik raporları hazırlar ve stratejik kararlarınızda destek sağlar.',
      'Personel performansını takip eder, iş yükü dağılımını analiz eder ve şirket içi iletişimi güçlendirir.',
    ]
  },
  'FOKUS216': {
    title: 'Müşteri Hizmetleri Sanal Asistanı',
    descriptions: [
      'Müşteri sorularını 7/24 yanıtlar, şikayetleri çözer, rezervasyon alır ve müşteri memnuniyetini maksimize eder.',
      'Canlı sohbet üzerinden müşterilerinizle iletişim kurar, ürün/hizmet bilgisi verir ve satış desteği sağlar.',
    ]
  },
  'FOKUS314': {
    title: 'Veri Analisti Sanal Asistanı',
    descriptions: [
      'Satış verilerinizi analiz eder, trend raporları hazırlar ve işletmeniz için öngörüde bulunur.',
      'Müşteri davranış analizleri yapar, segmentasyon çalışmaları yürütür ve hedef kitle belirlemenize yardımcı olur.',
    ]
  }
};

export default function KurumsalSettingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ========================================
  // STATE MANAGEMENT
  // ========================================
  const [currentUserData, setCurrentUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingFromWebhook, setIsLoadingFromWebhook] = useState(false);

  // Counts
  const [staffCount, setStaffCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [deviceCount, setDeviceCount] = useState(0);
  const [stockCount, setStockCount] = useState(0);

  // Collections
  const [usedStaffIds, setUsedStaffIds] = useState<Set<number>>(new Set());
  const [availableServices, setAvailableServices] = useState<AvailableService[]>([]);
  const [selectedStaffPhotos, setSelectedStaffPhotos] = useState<Record<number, File>>({});
  const [staffPhotoUploadStates, setStaffPhotoUploadStates] = useState<Record<number, boolean>>({});

  // Ad system
  const adIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ========================================
  // SESSION CHECK
  // ========================================
  useEffect(() => {
    const dataKey = searchParams?.get('dataKey');

    if (!dataKey) {
      window.close();
      return;
    }

    const sessionData = sessionStorage.getItem(dataKey);
    if (!sessionData) {
      window.close();
      return;
    }

    try {
      const parsedData = JSON.parse(sessionData);
      let userData;

      if (Array.isArray(parsedData) && parsedData.length > 0 && parsedData[0].success && parsedData[0].data) {
        userData = parsedData[0].data;
      } else if (parsedData.success && parsedData.data) {
        userData = parsedData.data;
      } else {
        userData = parsedData;
      }

      setCurrentUserData(userData);
      setIsLoading(false);
    } catch (error) {
      console.error('Session data parse error:', error);
      window.close();
    }
  }, [searchParams]);

  // ========================================
  // DATA LOADING
  // ========================================
  useEffect(() => {
    if (currentUserData && !isLoadingFromWebhook) {
      loadUserData();
    }
  }, [currentUserData]);

  const loadUserData = () => {
    if (!currentUserData) return;

    setIsLoadingFromWebhook(true);

    // Load services first
    loadAllServices();

    // Then load other data
    setTimeout(() => {
      loadAllDevices();
      loadAllStock();

      setTimeout(() => {
        loadAllStaff();

        setTimeout(() => {
          setIsLoadingFromWebhook(false);
          showToast('Verileriniz yüklendi! İşlemleriniz sonrasında kaydetmeyi unutmayın.', 'info');
        }, 800);
      }, 300);
    }, 100);
  };

  // ========================================
  // LOADING FUNCTIONS
  // ========================================
  const loadAllServices = () => {
    if (currentUserData['İşlemler'] && Array.isArray(currentUserData['İşlemler'])) {
      const services: AvailableService[] = [];

      currentUserData['İşlemler'].forEach((islem: Service, index: number) => {
        if (islem['İşlem Adı']) {
          const newCount = serviceCount + index + 1;
          setServiceCount(newCount);
          services.push({ id: newCount, name: islem['İşlem Adı'] });

          // DOM'a element ekle
          addServiceElement(newCount, islem);
        }
      });

      setAvailableServices(services);
    }
  };

  const addServiceElement = (id: number, data?: Service) => {
    // This will be handled by React state and rendering
    // We'll store service data in a separate state if needed
  };

  const loadAllDevices = () => {
    if (currentUserData['Cihazlar'] && Array.isArray(currentUserData['Cihazlar'])) {
      currentUserData['Cihazlar'].forEach((cihazAdi: string, index: number) => {
        if (cihazAdi && cihazAdi.trim()) {
          setDeviceCount(prev => prev + 1);
        }
      });
    }
  };

  const loadAllStock = () => {
    if (currentUserData['Stok Ürünleri'] && Array.isArray(currentUserData['Stok Ürünleri'])) {
      currentUserData['Stok Ürünleri'].forEach((urunAdi: string, index: number) => {
        if (urunAdi && urunAdi.trim()) {
          setStockCount(prev => prev + 1);
        }
      });
    }
  };

  const loadAllStaff = () => {
    if (currentUserData['Personeller'] && Array.isArray(currentUserData['Personeller'])) {
      const newUsedIds = new Set<number>();

      currentUserData['Personeller'].forEach((personel: StaffMember) => {
        if (personel['Personel İsim']) {
          const personelSira = personel['Personel Sıra'] || 1;
          newUsedIds.add(personelSira);
          setStaffCount(prev => Math.max(prev, personelSira));
        }
      });

      setUsedStaffIds(newUsedIds);
    }
  };

  // ========================================
  // TOAST NOTIFICATIONS
  // ========================================
  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    if (typeof window !== 'undefined' && (window as any).Toastify) {
      const bgColors = {
        success: 'linear-gradient(to right, #00b09b, #96c93d)',
        error: 'linear-gradient(to right, #ff5f6d, #ffc371)',
        warning: 'linear-gradient(to right, #f093fb, #f5576c)',
        info: 'linear-gradient(to right, #4facfe, #00f2fe)'
      };

      (window as any).Toastify({
        text: message,
        duration: 4000,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: bgColors[type],
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: '500'
        }
      }).showToast();
    }
  };

  // ========================================
  // ASSISTANT ADS
  // ========================================
  const showAssistantAd = () => {
    try {
      const assistantIds = Object.keys(fokusAssistants);
      const randomId = assistantIds[Math.floor(Math.random() * assistantIds.length)];
      const assistant = fokusAssistants[randomId];

      if (!assistant || !assistant.descriptions || assistant.descriptions.length === 0) return;

      const randomDesc = assistant.descriptions[Math.floor(Math.random() * assistant.descriptions.length)];

      const loadingOverlay = document.getElementById('loadingOverlay');
      if (!loadingOverlay || loadingOverlay.classList.contains('hidden')) return;

      const existingAd = loadingOverlay.querySelector('.ad-container');
      if (existingAd) existingAd.remove();

      const adContainer = document.createElement('div');
      adContainer.className = 'ad-container';
      adContainer.style.order = '2';

      adContainer.innerHTML = `
        <div class="ad-header">
          <img src="https://static.fokusistatistik.com/logolar/fokuslogo1.png"
               style="height: 35px;"
               onerror="this.style.display='none'"
               alt="FOKUS Logo">
          FOKUS Sanal Asistanlarımız
        </div>
        <div class="ad-content">
          <img src="https://www.fokusistatistik.com/assets/img/${randomId.toLowerCase()}.png"
               class="ad-image"
               onerror="this.style.display='none'"
               alt="${randomId}">
          <div class="ad-info">
            <div class="ad-code">${randomId}</div>
            <div class="ad-title">${assistant.title}</div>
          </div>
        </div>
        <div class="ad-description">${randomDesc}</div>
      `;

      loadingOverlay.appendChild(adContainer);
    } catch (error) {
      console.error('Error displaying assistant ad:', error);
    }
  };

  const startAssistantAds = () => {
    if (adIntervalRef.current) {
      clearInterval(adIntervalRef.current);
    }

    setTimeout(() => showAssistantAd(), 1500);
    adIntervalRef.current = setInterval(() => showAssistantAd(), 7000);
  };

  const stopAssistantAds = () => {
    if (adIntervalRef.current) {
      clearInterval(adIntervalRef.current);
      adIntervalRef.current = null;
    }

    const adContainer = document.querySelector('.ad-container');
    if (adContainer) adContainer.remove();
  };

  // ========================================
  // CLOSE PANEL
  // ========================================
  const closePanel = () => {
    if (confirm('Pencereyi kapatmak istediğinizden emin misiniz? Kaydetmediğiniz değişiklikler kaybolabilir.')) {
      window.close();
    }
  };

  // ========================================
  // SAVE SETTINGS
  // ========================================
  const saveSettings = async () => {
    // Confirm dialog
    const estimatedTime = calculateEstimatedTime();
    const confirmMessage = `⚠️ KAYDETME ONAYI ⚠️\n\nBu işlem ${estimatedTime} dakika sürebilir ve aktif sistemlerinizi etkileyebilir.\n\n• Değişikliklerinizi kontrol ettiniz mi?\n• Aktif randevularınız var mı?\n• İdeal zaman: Akşam 21:00 sonrası\n\nKaydetme işlemini onaylıyor musunuz?`;

    if (!confirm(confirmMessage)) return;

    setIsSaving(true);

    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
      loadingOverlay.classList.remove('hidden');

      const messageDiv = document.createElement('div');
      messageDiv.className = 'loading-message';
      messageDiv.textContent = 'Güvenli kayıt işlemi devam ediyor. Verileriniz kontrollü olarak işleniyor, lütfen bekleyin...';
      loadingOverlay.appendChild(messageDiv);
    }

    startAssistantAds();

    try {
      const formData = collectFormData();
      const webhookData = prepareWebhookData(formData);

      const response = await fetch('https://n8n.fokusistatistik.com/webhook/settingsasistantssavedata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        showToast('✅ Kurumsal ayarlar güvenli şekilde kaydedildi!', 'success');
      } else {
        throw new Error(result.message || 'Kaydetme sırasında hata oluştu!');
      }
    } catch (error: any) {
      console.error('Kayıt hatası:', error);
      showToast(`❌ Kayıt hatası: ${error.message}. Destek ekibi ile iletişime geçin.`, 'error');
    } finally {
      stopAssistantAds();
      setIsSaving(false);

      if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
      }
    }
  };

  const collectFormData = () => {
    // Bu fonksiyon DOM'dan veri toplayacak
    // Şimdilik boş dönüyoruz, component render'ında doldurulacak
    return {
      personeller: [],
      islemler: [],
      cihazlar: [],
      stokUrunleri: []
    };
  };

  const prepareWebhookData = (formData: any) => {
    return {
      'KAYIT DETAYI': 'KURUMSAL_SETTINGS_SAVE',
      'MÜŞTERİ İŞLEM ID': currentUserData['MÜŞTERİ İŞLEM ID'],
      'KURUM ADI': currentUserData['KURUM ADI'],
      'FOKUS KODU': 'kurumsal',
      'İŞLEM TİPİ': 'AYARLAR_KAYDET',
      'PERSONELLER': formData.personeller,
      'İŞLEMLER': formData.islemler,
      'CİHAZLAR': formData.cihazlar,
      'STOK ÜRÜNLERİ': formData.stokUrunleri,
      'timestamp': new Date().toISOString()
    };
  };

  const calculateEstimatedTime = () => {
    const BASE_SECONDS = 10;
    const PERSONEL_SECONDS = 1;
    const MATCH_SECONDS = 2;

    let totalSeconds = BASE_SECONDS;
    totalSeconds += staffCount * PERSONEL_SECONDS;
    totalSeconds += serviceCount * staffCount * MATCH_SECONDS;

    return Math.ceil(totalSeconds / 60);
  };

  // ========================================
  // RENDER
  // ========================================
  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
        <div className="loading-message">Verileriniz yükleniyor...</div>
      </div>
    );
  }

  const companyName = currentUserData['KURUM ADI'] ||
                      currentUserData['Kurum Resmi - Fatura Adı'] ||
                      'Kurumsal';

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/toastify-js" strategy="afterInteractive" />
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />

      {/* Loading Overlay */}
      <div className="loading-overlay hidden" id="loadingOverlay">
        <div className="spinner"></div>
      </div>

      {/* Main Container */}
      <div className="container" id="settingsPage">
        {/* Header */}
        <div className="header">
          <button className="close-btn" onClick={closePanel}>
            <i className="fas fa-times"></i> Kapat
          </button>
          <div className="header-logo"></div>
          <h1 className="welcome-title">{companyName} Ayarları</h1>
          <p className="welcome-subtitle">Kurumsal hizmet ve personel ayarlarınızı buradan yapılandırabilirsiniz.</p>
        </div>

        {/* Warning Card */}
        <div className="warning-card">
          <div className="warning-header">
            <i className="fas fa-exclamation-triangle"></i>
            <h3>Önemli Bilgilendirme</h3>
          </div>
          <div className="warning-content">
            <div className="warning-item">
              <strong>Değişiklik Yaparken Dikkat Edin:</strong>
              <p>Hizmet, personel, cihaz ve ürün bilgilerinizi değiştirirken veya silerken dikkatli olun. Eğer bu veriler mevcut sistemlerinizde aktif olarak kullanılıyorsa, silme işlemi sistemlerinizin çalışmasını etkileyebilir.</p>
            </div>
            <div className="warning-item">
              <strong>Hata Durumunda:</strong>
              <p>Yanlış bir işlem yaptığınızı düşünüyorsanız değişiklikleri kaydetmeden sayfayı kapatın ve FOKUS İstatistik destek ekibi ile iletişime geçin.</p>
            </div>
            <div className="warning-item">
              <strong>Kayıt Zamanlaması:</strong>
              <p>Kaydetme işlemleri güvenlik nedeniyle kontrollü yapıldığından birkaç dakika sürebilir. Aktif işlemlerinizi etkilememesi için değişiklikleri 21:00'dan sonra yapmanızı öneriyoruz.</p>
            </div>
            <div className="contact-info">
              <i className="fas fa-globe"></i>
              <span>Destek: <a href="https://www.fokusistatistik.com" target="_blank" rel="noopener">www.fokusistatistik.com</a></span>
            </div>
          </div>
        </div>

        {/* Personeller Section */}
        <div className="settings-card">
          <h2 className="section-title">
            <i className="fas fa-users"></i>
            Personeller (1-30)
          </h2>
          <div id="staffContainer">
            <p className="no-services-message">Personeller yükleniyor...</p>
          </div>
          <button type="button" className="add-btn">
            <i className="fas fa-plus"></i> Yeni Personel Ekle
          </button>
        </div>

        {/* Hizmetler Section */}
        <div className="settings-card">
          <h2 className="section-title">
            <i className="fas fa-cogs"></i>
            Hizmetler (1-75)
          </h2>
          <div id="servicesContainer">
            <p className="no-services-message">Hizmetler yükleniyor...</p>
          </div>
          <button type="button" className="add-btn">
            <i className="fas fa-plus"></i> Yeni Hizmet Ekle
          </button>
        </div>

        {/* Cihazlar Section */}
        <div className="settings-card">
          <h2 className="section-title">
            <i className="fas fa-desktop"></i>
            Cihazlar (1-10)
          </h2>
          <div id="devicesContainer">
            <p className="no-services-message">Cihazlar yükleniyor...</p>
          </div>
          <button type="button" className="add-btn">
            <i className="fas fa-plus"></i> Yeni Cihaz Ekle
          </button>
        </div>

        {/* Stok Ürünleri Section */}
        <div className="settings-card">
          <h2 className="section-title">
            <i className="fas fa-boxes"></i>
            Stok Ürünleri (1-100)
          </h2>
          <div className="warning-item" style={{ marginBottom: '20px', background: 'rgba(52, 152, 219, 0.1)', borderLeftColor: '#3498db' }}>
            <strong>Stok Güvenlik Uyarısı:</strong>
            <p>Ürün isimleri stok kontrolünün güvenliği açısından değiştirilemez. Doğru isimlendirdiğinizi kontrol ediniz. Mevcut ürünler ancak silinip tekrar eklenebilir. Aynı ürünü iki kez girmediğinize dikkat ediniz.</p>
          </div>
          <div id="stockContainer">
            <p className="no-services-message">Stok ürünleri yükleniyor...</p>
          </div>
          <button type="button" className="add-btn">
            <i className="fas fa-plus"></i> Yeni Stok Ürünü Ekle
          </button>
        </div>

        {/* Save Section */}
        <div className="save-section">
          <button
            type="button"
            className="save-btn"
            id="saveBtn"
            onClick={saveSettings}
            disabled={isSaving}
          >
            <i className="fas fa-save"></i>
            {isSaving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
          </button>
        </div>
      </div>
    </>
  );
}
