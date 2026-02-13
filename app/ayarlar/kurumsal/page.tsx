'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import './styles.css';
import TeknikDestekChatbot from '@/components/TeknikDestekChatbot';
import { fetchWithRetry, postToWebhook } from '@/lib/fetchWithRetry';
import { toast } from '@/lib/toast';

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

interface Device {
  name: string;
}

interface StockItem {
  name: string;
  isExisting: boolean;
}

interface AvailableService {
  id: number;
  name: string;
}

interface StaffData {
  id: number;
  name: string;
  position: string;
  calendarId: string;
  photoUrl: string;
  location: string;
  details: string;
  note: string;
  services: Record<string, boolean>;
}

interface ServiceData {
  id: number;
  name: string;
  sessions: number;
  duration: number;
  price: number;
  note: string;
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

function KurumsalSettingsPageContent() {
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
  const [staffData, setStaffData] = useState<Record<number, StaffData>>({});
  const [serviceData, setServiceData] = useState<Record<number, ServiceData>>({});
  const [deviceData, setDeviceData] = useState<Record<number, Device>>({});
  const [stockData, setStockData] = useState<Record<number, StockItem>>({});

  // Photo management
  const [selectedStaffPhotos, setSelectedStaffPhotos] = useState<Record<number, File>>({});
  const [staffPhotoUploadStates, setStaffPhotoUploadStates] = useState<Record<number, boolean>>({});
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<Record<number, string>>({});

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
          toast.info('Verileriniz yüklendi! İşlemleriniz sonrasında kaydetmeyi unutmayın.');
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
      const newServiceData: Record<number, ServiceData> = {};

      currentUserData['İşlemler'].forEach((islem: Service, index: number) => {
        if (islem['İşlem Adı']) {
          const newId = index + 1;
          services.push({ id: newId, name: islem['İşlem Adı'] });

          newServiceData[newId] = {
            id: newId,
            name: islem['İşlem Adı'] || '',
            sessions: islem['Seans Sayısı'] || 1,
            duration: islem['Süre'] || 30,
            price: islem['Ücret'] || 0,
            note: islem['İşlem Notu'] || ''
          };
        }
      });

      setAvailableServices(services);
      setServiceData(newServiceData);
      setServiceCount(services.length);
    }
  };

  const loadAllDevices = () => {
    if (currentUserData['Cihazlar'] && Array.isArray(currentUserData['Cihazlar'])) {
      const newDeviceData: Record<number, Device> = {};
      let count = 0;

      currentUserData['Cihazlar'].forEach((cihazAdi: string, index: number) => {
        if (cihazAdi && cihazAdi.trim()) {
          count++;
          newDeviceData[count] = { name: cihazAdi.trim() };
        }
      });

      setDeviceData(newDeviceData);
      setDeviceCount(count);
    }
  };

  const loadAllStock = () => {
    if (currentUserData['Stok Ürünleri'] && Array.isArray(currentUserData['Stok Ürünleri'])) {
      const newStockData: Record<number, StockItem> = {};
      let count = 0;

      currentUserData['Stok Ürünleri'].forEach((urunAdi: string, index: number) => {
        if (urunAdi && urunAdi.trim()) {
          count++;
          newStockData[count] = { name: urunAdi.trim(), isExisting: true };
        }
      });

      setStockData(newStockData);
      setStockCount(count);
    }
  };

  const loadAllStaff = () => {
    if (currentUserData['Personeller'] && Array.isArray(currentUserData['Personeller'])) {
      const newUsedIds = new Set<number>();
      const newStaffData: Record<number, StaffData> = {};
      let maxId = 0;

      currentUserData['Personeller'].forEach((personel: StaffMember) => {
        if (personel['Personel İsim']) {
          const personelSira = personel['Personel Sıra'] || 1;
          newUsedIds.add(personelSira);
          maxId = Math.max(maxId, personelSira);

          // Convert services to boolean record
          const services: Record<string, boolean> = {};
          if (personel['Hizmetler']) {
            Object.keys(personel['Hizmetler']).forEach(key => {
              services[key] = personel['Hizmetler'][key] === 'EVET';
            });
          }

          newStaffData[personelSira] = {
            id: personelSira,
            name: personel['Personel İsim'] || '',
            position: personel['Personel Görev'] || '',
            calendarId: personel['Takvim ID'] || '',
            photoUrl: personel['OP-Foto-URL'] || '',
            location: personel['OP-Etkinlik Yeri'] || '',
            details: personel['Personel Detaylar'] || '',
            note: personel['Personel Notu'] || '',
            services: services
          };

          // Set photo preview if exists
          if (personel['OP-Foto-URL']) {
            setPhotoPreviewUrls(prev => ({
              ...prev,
              [personelSira]: personel['OP-Foto-URL']
            }));
          }
        }
      });

      setUsedStaffIds(newUsedIds);
      setStaffData(newStaffData);
      setStaffCount(maxId);
    }
  };

  // ========================================
  // STAFF MANAGEMENT
  // ========================================
  const addStaff = () => {
    if (staffCount >= 30) {
      toast.warning('En fazla 30 personel ekleyebilirsiniz.');
      return;
    }

    const newId = getNextAvailableStaffId();
    setUsedStaffIds(prev => new Set([...prev, newId]));
    setStaffCount(prev => Math.max(prev, newId));

    setStaffData(prev => ({
      ...prev,
      [newId]: {
        id: newId,
        name: '',
        position: '',
        calendarId: '',
        photoUrl: '',
        location: '',
        details: '',
        note: '',
        services: {}
      }
    }));

    setTimeout(() => {
      const element = document.getElementById(`staff-${newId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const getNextAvailableStaffId = (): number => {
    for (let i = 1; i <= 30; i++) {
      if (!usedStaffIds.has(i)) {
        return i;
      }
    }
    return staffCount + 1;
  };

  const removeStaff = (id: number) => {
    if (!confirm(`Personel ${id} silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?`)) {
      return;
    }

    setUsedStaffIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });

    setStaffData(prev => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });

    setSelectedStaffPhotos(prev => {
      const newPhotos = { ...prev };
      delete newPhotos[id];
      return newPhotos;
    });

    setPhotoPreviewUrls(prev => {
      const newUrls = { ...prev };
      delete newUrls[id];
      return newUrls;
    });

    toast.success(`Personel ${id} silindi.`);
  };

  const handleStaffChange = (id: number, field: keyof StaffData, value: any) => {
    setStaffData(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleStaffServiceToggle = (staffId: number, serviceName: string) => {
    setStaffData(prev => ({
      ...prev,
      [staffId]: {
        ...prev[staffId],
        services: {
          ...prev[staffId].services,
          [serviceName]: !prev[staffId].services[serviceName]
        }
      }
    }));
  };

  const handlePhotoSelect = async (staffId: number, file: File) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      toast.error('Sadece JPG, JPEG veya PNG formatlarında fotoğraf yükleyebilirsiniz.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Fotoğraf boyutu en fazla 5MB olabilir.');
      return;
    }

    setSelectedStaffPhotos(prev => ({
      ...prev,
      [staffId]: file
    }));

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPhotoPreviewUrls(prev => ({
          ...prev,
          [staffId]: e.target!.result as string
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const uploadStaffPhoto = async (staffId: number) => {
    const file = selectedStaffPhotos[staffId];
    if (!file) {
      toast.warning('Lütfen önce bir fotoğraf seçin.');
      return;
    }

    if (!currentUserData) return;

    setStaffPhotoUploadStates(prev => ({ ...prev, [staffId]: true }));

    try {
      // Resize image if needed
      const resizedBlob = await resizeStaffImage(file);

      // Create FormData
      const formData = new FormData();
      formData.append('photo', resizedBlob, `personel-${staffId}.${file.type === 'image/png' ? 'png' : 'jpg'}`);
      formData.append('MÜŞTERİ İŞLEM ID', currentUserData['MÜŞTERİ İŞLEM ID'] || '');
      formData.append('PERSONEL SIRA', staffId.toString());

      // Upload to webhook with retry
      const response = await fetchWithRetry('https://n8n.fokusistatistik.com/webhook/uploadstaffphoto', {
        method: 'POST',
        body: formData,
        maxRetries: 3,
        onRetry: (attempt, delay) => {
          toast.retry(attempt, 3);
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.photoUrl) {
        handleStaffChange(staffId, 'photoUrl', result.photoUrl);
        toast.success('Fotoğraf başarıyla yüklendi!');
      } else {
        throw new Error(result.message || 'Fotoğraf yüklenirken hata oluştu');
      }
    } catch (error: any) {
      console.error('Fotoğraf yükleme hatası:', error);
      toast.error(`Fotoğraf yükleme hatası: ${error.message}`);
    } finally {
      setStaffPhotoUploadStates(prev => ({ ...prev, [staffId]: false }));
    }
  };

  const resizeStaffImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      // PNG dosyalarını olduğu gibi kullan
      if (file.type === 'image/png') {
        resolve(file);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = height * (MAX_WIDTH / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = width * (MAX_HEIGHT / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas context error'));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Canvas to blob conversion failed'));
            }
          }, 'image/jpeg', 0.85);
        };
        img.onerror = () => reject(new Error('Image load error'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('File read error'));
      reader.readAsDataURL(file);
    });
  };

  // ========================================
  // SERVICE MANAGEMENT
  // ========================================
  const addService = () => {
    if (serviceCount >= 75) {
      toast.warning('En fazla 75 hizmet ekleyebilirsiniz.');
      return;
    }

    const newId = serviceCount + 1;
    setServiceCount(newId);

    setServiceData(prev => ({
      ...prev,
      [newId]: {
        id: newId,
        name: '',
        sessions: 1,
        duration: 30,
        price: 0,
        note: ''
      }
    }));

    setTimeout(() => {
      const element = document.getElementById(`service-${newId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const removeService = (id: number) => {
    if (!confirm(`Hizmet ${id} silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?`)) {
      return;
    }

    setServiceData(prev => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });

    // Remove from available services
    setAvailableServices(prev => prev.filter(s => s.id !== id));

    // Remove from all staff services
    setStaffData(prev => {
      const serviceName = serviceData[id]?.name;
      if (!serviceName) return prev;

      const newData = { ...prev };
      Object.keys(newData).forEach(staffId => {
        if (newData[+staffId].services[serviceName]) {
          delete newData[+staffId].services[serviceName];
        }
      });
      return newData;
    });

    toast.success(`Hizmet ${id} silindi.`);
  };

  const handleServiceChange = (id: number, field: keyof ServiceData, value: any) => {
    setServiceData(prev => {
      const newData = {
        ...prev,
        [id]: {
          ...prev[id],
          [field]: value
        }
      };

      // Update available services when name changes
      if (field === 'name') {
        const oldName = prev[id]?.name;
        const newName = value;

        setAvailableServices(prevServices => {
          const exists = prevServices.find(s => s.id === id);
          if (exists) {
            return prevServices.map(s => s.id === id ? { ...s, name: newName } : s);
          } else if (newName) {
            return [...prevServices, { id, name: newName }];
          }
          return prevServices;
        });

        // Update staff services with new name
        if (oldName && oldName !== newName) {
          setStaffData(prevStaff => {
            const updatedStaff = { ...prevStaff };
            Object.keys(updatedStaff).forEach(staffId => {
              if (updatedStaff[+staffId].services[oldName]) {
                const wasSelected = updatedStaff[+staffId].services[oldName];
                delete updatedStaff[+staffId].services[oldName];
                if (newName) {
                  updatedStaff[+staffId].services[newName] = wasSelected;
                }
              }
            });
            return updatedStaff;
          });
        }
      }

      return newData;
    });
  };

  const formatServicePrice = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    if (!numericValue) return '';
    return new Intl.NumberFormat('tr-TR').format(parseInt(numericValue));
  };

  const parseFormattedPrice = (value: string): number => {
    return parseInt(value.replace(/\./g, '')) || 0;
  };

  // ========================================
  // DEVICE MANAGEMENT
  // ========================================
  const addDevice = () => {
    if (deviceCount >= 10) {
      toast.warning('En fazla 10 cihaz ekleyebilirsiniz.');
      return;
    }

    const newId = deviceCount + 1;
    setDeviceCount(newId);

    setDeviceData(prev => ({
      ...prev,
      [newId]: { name: '' }
    }));
  };

  const removeDevice = (id: number) => {
    if (!confirm(`Cihaz ${id} silinecek. Devam etmek istiyor musunuz?`)) {
      return;
    }

    setDeviceData(prev => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });

    toast.success(`Cihaz ${id} silindi.`);
  };

  const handleDeviceChange = (id: number, value: string) => {
    setDeviceData(prev => ({
      ...prev,
      [id]: { name: value }
    }));
  };

  // ========================================
  // STOCK MANAGEMENT
  // ========================================
  const addStock = () => {
    if (stockCount >= 100) {
      toast.warning('En fazla 100 stok ürünü ekleyebilirsiniz.');
      return;
    }

    const newId = stockCount + 1;
    setStockCount(newId);

    setStockData(prev => ({
      ...prev,
      [newId]: { name: '', isExisting: false }
    }));
  };

  const removeStock = (id: number) => {
    if (!confirm(`Stok ürünü ${id} silinecek. Devam etmek istiyor musunuz?`)) {
      return;
    }

    setStockData(prev => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });

    toast.success(`Stok ürünü ${id} silindi.`);
  };

  const handleStockChange = (id: number, value: string) => {
    setStockData(prev => ({
      ...prev,
      [id]: { ...prev[id], name: value }
    }));
  };

  // ========================================
  // VALIDATION
  // ========================================
  const validateStaffForm = (staff: StaffData): boolean => {
    if (!staff.name || !staff.name.trim()) {
      toast.error(`Personel ${staff.id}: İsim alanı boş bırakılamaz.`);
      return false;
    }
    if (!staff.position || !staff.position.trim()) {
      toast.error(`Personel ${staff.id}: Görev alanı boş bırakılamaz.`);
      return false;
    }
    return true;
  };

  const validateServiceForm = (service: ServiceData): boolean => {
    if (!service.name || !service.name.trim()) {
      toast.error(`Hizmet ${service.id}: İşlem adı boş bırakılamaz.`);
      return false;
    }
    if (service.sessions < 1) {
      toast.error(`Hizmet ${service.id}: Seans sayısı en az 1 olmalıdır.`);
      return false;
    }
    if (service.duration < 1) {
      toast.error(`Hizmet ${service.id}: Süre en az 1 dakika olmalıdır.`);
      return false;
    }
    return true;
  };

  const validateDeviceForm = (device: Device): boolean => {
    if (!device.name || !device.name.trim()) {
      return false; // Silently skip empty devices
    }
    return true;
  };

  const validateStockForm = (stock: StockItem): boolean => {
    if (!stock.name || !stock.name.trim()) {
      return false; // Silently skip empty stock items
    }
    return true;
  };

  // TOAST NOTIFICATIONS - Using standardized Sonner toast

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
    // Validate all data
    let hasErrors = false;

    // Validate staff
    for (const id of Array.from(usedStaffIds)) {
      if (staffData[id] && !validateStaffForm(staffData[id])) {
        hasErrors = true;
        break;
      }
    }

    if (hasErrors) return;

    // Validate services
    for (const id of Object.keys(serviceData).map(Number)) {
      if (serviceData[id] && !validateServiceForm(serviceData[id])) {
        hasErrors = true;
        break;
      }
    }

    if (hasErrors) return;

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

      // Retry mekanizması ile kaydetme
      const result = await postToWebhook('https://n8n.fokusistatistik.com/webhook/settingsasistantssavedata', webhookData, {
        maxRetries: 4,
        baseDelay: 2000,
        maxDelay: 16000,
        onRetry: (attempt, delay) => {
          const messageDiv = document.querySelector('.loading-message');
          if (messageDiv) {
            messageDiv.textContent = `Bağlantı sorunu tespit edildi. Yeniden deneniyor... (${attempt}/4)`;
          }
        }
      });

      if (result.success) {
        toast.success('✅ Kurumsal ayarlar güvenli şekilde kaydedildi!');
      } else {
        throw new Error(result.message || 'Kaydetme sırasında hata oluştu!');
      }
    } catch (error: any) {
      console.error('Kayıt hatası:', error);
      toast.error(`Kayıt hatası: ${error.message}. Destek ekibi ile iletişime geçin.`);
    } finally {
      stopAssistantAds();
      setIsSaving(false);

      if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
        const messageDiv = loadingOverlay.querySelector('.loading-message');
        if (messageDiv) messageDiv.remove();
      }
    }
  };

  const collectFormData = () => {
    // Collect staff data
    const personeller: any[] = [];
    for (const id of Array.from(usedStaffIds).sort((a, b) => a - b)) {
      if (staffData[id]) {
        const staff = staffData[id];

        // Convert services back to EVET/HAYIR format
        const hizmetler: Record<string, 'EVET' | 'HAYIR'> = {};
        Object.keys(staff.services).forEach(serviceName => {
          hizmetler[serviceName] = staff.services[serviceName] ? 'EVET' : 'HAYIR';
        });

        personeller.push({
          'Personel Sıra': id,
          'Personel İsim': staff.name,
          'Personel Görev': staff.position,
          'Takvim ID': staff.calendarId,
          'OP-Foto-URL': staff.photoUrl,
          'OP-Etkinlik Yeri': staff.location,
          'Personel Detaylar': staff.details,
          'Personel Notu': staff.note,
          'Hizmetler': hizmetler
        });
      }
    }

    // Collect service data
    const islemler: any[] = [];
    Object.keys(serviceData)
      .map(Number)
      .sort((a, b) => a - b)
      .forEach(id => {
        if (serviceData[id]) {
          const service = serviceData[id];
          islemler.push({
            'İşlem Sıra': id,
            'İşlem Adı': service.name,
            'Seans Sayısı': service.sessions,
            'Süre': service.duration,
            'Ücret': service.price,
            'İşlem Notu': service.note
          });
        }
      });

    // Collect device data
    const cihazlar: string[] = [];
    Object.keys(deviceData)
      .map(Number)
      .sort((a, b) => a - b)
      .forEach(id => {
        if (deviceData[id] && deviceData[id].name.trim()) {
          cihazlar.push(deviceData[id].name.trim());
        }
      });

    // Collect stock data
    const stokUrunleri: string[] = [];
    Object.keys(stockData)
      .map(Number)
      .sort((a, b) => a - b)
      .forEach(id => {
        if (stockData[id] && stockData[id].name.trim()) {
          stokUrunleri.push(stockData[id].name.trim());
        }
      });

    return {
      personeller,
      islemler,
      cihazlar,
      stokUrunleri
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
    totalSeconds += usedStaffIds.size * PERSONEL_SECONDS;
    totalSeconds += Object.keys(serviceData).length * usedStaffIds.size * MATCH_SECONDS;

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

  // Get sorted staff IDs
  const sortedStaffIds = Array.from(usedStaffIds).sort((a, b) => a - b);
  const sortedServiceIds = Object.keys(serviceData).map(Number).sort((a, b) => a - b);
  const sortedDeviceIds = Object.keys(deviceData).map(Number).sort((a, b) => a - b);
  const sortedStockIds = Object.keys(stockData).map(Number).sort((a, b) => a - b);

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
            {sortedStaffIds.length === 0 && !isLoadingFromWebhook && (
              <p className="no-services-message">Henüz personel eklenmemiş. "Yeni Personel Ekle" butonuna tıklayarak başlayın.</p>
            )}
            {isLoadingFromWebhook && sortedStaffIds.length === 0 && (
              <p className="no-services-message">Personeller yükleniyor...</p>
            )}
            {sortedStaffIds.map(id => {
              const staff = staffData[id];
              if (!staff) return null;

              return (
                <div key={id} id={`staff-${id}`} className="dynamic-section staff-section" style={{ borderLeftColor: '#860000' }}>
                  <div className="section-header">
                    <h3>Personel {id}</h3>
                    <button type="button" className="remove-btn" onClick={() => removeStaff(id)}>
                      <i className="fas fa-trash"></i> Sil
                    </button>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Personel İsim *</label>
                      <input
                        type="text"
                        value={staff.name}
                        onChange={(e) => handleStaffChange(id, 'name', e.target.value)}
                        placeholder="Personel adı"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Personel Görev *</label>
                      <input
                        type="text"
                        value={staff.position}
                        onChange={(e) => handleStaffChange(id, 'position', e.target.value)}
                        placeholder="Ör: Estetisyen, Doktor"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Takvim ID (Google Calendar)</label>
                      <input
                        type="text"
                        value={staff.calendarId}
                        onChange={(e) => handleStaffChange(id, 'calendarId', e.target.value)}
                        placeholder="Ör: example@group.calendar.google.com"
                      />
                    </div>
                    <div className="form-group">
                      <label>Etkinlik Yeri (Lokasyon)</label>
                      <input
                        type="text"
                        value={staff.location}
                        onChange={(e) => handleStaffChange(id, 'location', e.target.value)}
                        placeholder="Ör: Şube 1, Oda 3"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Personel Detaylar</label>
                      <textarea
                        value={staff.details}
                        onChange={(e) => handleStaffChange(id, 'details', e.target.value)}
                        placeholder="Personel hakkında detaylı bilgi"
                        rows={3}
                      />
                    </div>
                    <div className="form-group">
                      <label>Personel Notu</label>
                      <textarea
                        value={staff.note}
                        onChange={(e) => handleStaffChange(id, 'note', e.target.value)}
                        placeholder="Dahili notlar"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div className="form-group">
                    <label>Personel Fotoğrafı</label>
                    <div className="staff-photo-container">
                      <div className="staff-photo-preview">
                        {photoPreviewUrls[id] ? (
                          <img src={photoPreviewUrls[id]} alt={`Personel ${id}`} />
                        ) : (
                          <div className="no-photo">
                            <i className="fas fa-user"></i>
                            <p>Fotoğraf yok</p>
                          </div>
                        )}
                      </div>
                      <div className="staff-photo-actions">
                        <input
                          type="file"
                          id={`photo-${id}`}
                          accept="image/jpeg,image/jpg,image/png"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handlePhotoSelect(id, e.target.files[0]);
                            }
                          }}
                          style={{ display: 'none' }}
                        />
                        <button
                          type="button"
                          className="photo-select-btn"
                          onClick={() => document.getElementById(`photo-${id}`)?.click()}
                        >
                          <i className="fas fa-image"></i> Fotoğraf Seç
                        </button>
                        <button
                          type="button"
                          className="photo-upload-btn"
                          onClick={() => uploadStaffPhoto(id)}
                          disabled={!selectedStaffPhotos[id] || staffPhotoUploadStates[id]}
                        >
                          <i className="fas fa-upload"></i>
                          {staffPhotoUploadStates[id] ? 'Yükleniyor...' : 'Yükle'}
                        </button>
                        <p className="photo-hint">JPG, JPEG veya PNG (Max 5MB)</p>
                      </div>
                    </div>
                  </div>

                  {/* Service Tags */}
                  {availableServices.length > 0 && (
                    <div className="form-group">
                      <label>Personel Hizmetleri</label>
                      <div className="service-tags">
                        {availableServices.map(service => (
                          <span
                            key={service.id}
                            className={`service-tag ${staff.services[service.name] ? 'selected' : ''}`}
                            onClick={() => handleStaffServiceToggle(id, service.name)}
                          >
                            {service.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <button type="button" className="add-btn" onClick={addStaff}>
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
            {sortedServiceIds.length === 0 && !isLoadingFromWebhook && (
              <p className="no-services-message">Henüz hizmet eklenmemiş. "Yeni Hizmet Ekle" butonuna tıklayarak başlayın.</p>
            )}
            {isLoadingFromWebhook && sortedServiceIds.length === 0 && (
              <p className="no-services-message">Hizmetler yükleniyor...</p>
            )}
            {sortedServiceIds.map(id => {
              const service = serviceData[id];
              if (!service) return null;

              return (
                <div key={id} id={`service-${id}`} className="dynamic-section service-section" style={{ borderLeftColor: '#27ae60' }}>
                  <div className="section-header">
                    <h3>Hizmet {id}</h3>
                    <button type="button" className="remove-btn" onClick={() => removeService(id)}>
                      <i className="fas fa-trash"></i> Sil
                    </button>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>İşlem Adı *</label>
                      <input
                        type="text"
                        value={service.name}
                        onChange={(e) => handleServiceChange(id, 'name', e.target.value)}
                        placeholder="Hizmet adı"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Seans Sayısı *</label>
                      <input
                        type="number"
                        value={service.sessions}
                        onChange={(e) => handleServiceChange(id, 'sessions', parseInt(e.target.value) || 1)}
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Süre (Dakika) *</label>
                      <input
                        type="number"
                        value={service.duration}
                        onChange={(e) => handleServiceChange(id, 'duration', parseInt(e.target.value) || 30)}
                        min="1"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Ücret (TL)</label>
                      <input
                        type="text"
                        value={formatServicePrice(service.price.toString())}
                        onChange={(e) => {
                          const parsed = parseFormattedPrice(e.target.value);
                          handleServiceChange(id, 'price', parsed);
                        }}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>İşlem Notu</label>
                    <textarea
                      value={service.note}
                      onChange={(e) => handleServiceChange(id, 'note', e.target.value)}
                      placeholder="Hizmet hakkında notlar"
                      rows={2}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <button type="button" className="add-btn" onClick={addService}>
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
            {sortedDeviceIds.length === 0 && !isLoadingFromWebhook && (
              <p className="no-services-message">Henüz cihaz eklenmemiş. "Yeni Cihaz Ekle" butonuna tıklayarak başlayın.</p>
            )}
            {isLoadingFromWebhook && sortedDeviceIds.length === 0 && (
              <p className="no-services-message">Cihazlar yükleniyor...</p>
            )}
            <div className="device-grid">
              {sortedDeviceIds.map(id => {
                const device = deviceData[id];
                if (!device) return null;

                return (
                  <div key={id} className="device-row" style={{ borderLeftColor: '#3498db' }}>
                    <div className="device-header">
                      <span className="device-number">Cihaz {id}</span>
                      <button type="button" className="device-remove-btn" onClick={() => removeDevice(id)}>
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={device.name}
                      onChange={(e) => handleDeviceChange(id, e.target.value)}
                      placeholder="Cihaz adı"
                      className="device-input"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <button type="button" className="add-btn" onClick={addDevice}>
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
            {sortedStockIds.length === 0 && !isLoadingFromWebhook && (
              <p className="no-services-message">Henüz stok ürünü eklenmemiş. "Yeni Stok Ürünü Ekle" butonuna tıklayarak başlayın.</p>
            )}
            {isLoadingFromWebhook && sortedStockIds.length === 0 && (
              <p className="no-services-message">Stok ürünleri yükleniyor...</p>
            )}
            <div className="stock-grid">
              {sortedStockIds.map(id => {
                const stock = stockData[id];
                if (!stock) return null;

                return (
                  <div key={id} className="stock-row" style={{ borderLeftColor: '#f39c12' }}>
                    <div className="stock-header">
                      <span className="stock-number">Ürün {id}</span>
                      <button type="button" className="stock-remove-btn" onClick={() => removeStock(id)}>
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={stock.name}
                      onChange={(e) => handleStockChange(id, e.target.value)}
                      placeholder="Ürün adı"
                      className="stock-input"
                      readOnly={stock.isExisting}
                      style={stock.isExisting ? { backgroundColor: '#f8f9fa', cursor: 'not-allowed' } : {}}
                    />
                    {stock.isExisting && (
                      <small style={{ color: '#6c757d', fontSize: '11px' }}>Mevcut ürün (değiştirilemez)</small>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <button type="button" className="add-btn" onClick={addStock}>
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

      {/* Teknik Destek Chatbot */}
      <TeknikDestekChatbot pageType="kurumsal" pageTitle="Kurumsal Ayarlar" />
    </>
  );
}

export default function KurumsalSettingsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#860000] mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    }>
      <KurumsalSettingsPageContent />
    </Suspense>
  );
}
