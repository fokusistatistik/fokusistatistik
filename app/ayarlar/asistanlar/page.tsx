'use client';

import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import './styles.css';
import TeknikDestekChatbot from '@/components/TeknikDestekChatbot';

// Session configuration
const SESSION_CONFIG = {
  STORAGE_KEY: 'fokus_assistant_session',
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 saat
};

interface AssistantData {
  focusCode: string;
  customerId: string;
  companyName?: string;

  // FOKUS001 - Yönetici
  email?: string;
  fullName?: string;
  displayName?: string;
  title?: string;
  departman?: string;
  ozelAdi?: string;
  etiketler001?: string[];
  musteriTalepleri001?: string;
  yoneticiPhotoURL?: string;
  sesliYanitData?: string;
  sesliYanitLimiti?: string;
  sesliYanitKalan?: string;
  gorselAnalizData?: string;
  gorselAnalizLimiti?: string;
  gorselAnalizKalan?: string;
  dosyaAnalizData?: string;
  dosyaAnalizLimiti?: string;
  dosyaAnalizKalan?: string;
  smartToolsData?: string;
  smartToolsLimiti?: string;
  smartToolsKalan?: string;

  // FOKUS216 - Müşteri Hizmetleri
  kurumsalIsim?: string;
  dil?: string;
  channels?: {
    whatsapp?: boolean;
    instagram?: boolean;
    telegram?: boolean;
    web?: boolean;
  };
  uslupTon?: {
    uyumlu?: boolean;
    satisOncelikli?: boolean;
    yardimsever?: boolean;
    kati?: boolean;
    dogal?: boolean;
    enerjik?: boolean;
    profesyonel?: boolean;
    samimi?: boolean;
    sempatik?: boolean;
    empatik?: boolean;
    gercekci?: boolean;
    iyimser?: boolean;
    cozumOdakli?: boolean;
    motivasyonel?: boolean;
    rahatlatici?: boolean;
  };
  emojiKullanimi?: boolean;
  cta?: boolean;
  oneriTavsiye?: boolean;
  yanitOnceligi?: string;
  bilgiPaylasim?: {
    hizmetler?: boolean;
    fiyatlar?: boolean;
    konum?: boolean;
    calismaGunu?: boolean;
    iletisim?: boolean;
    randevuAl?: boolean;
    personel?: boolean;
  };
  musteriTalepleri216?: string;
  musteriSorgusuData?: string;
  musteriSorgusuLimiti?: string;
  musteriSorgusuKalan?: string;

  // FOKUS314 - Veri Analisti
  musteriTalepleri314?: string;

  // FOKUS520 - Pazarlama & Lead
  crmPersonnel?: Array<{
    id: string;
    ad: string;
    soyad: string;
    email: string;
    unvanRol: string;
    gozukecekIsim: string;
    departman: string;
    fotoURL: string;
  }>;
  totalCrmPersonnel?: number;
  musteriTalepleri520?: string;
  musteriAnaliziData?: string;
  musteriAnaliziLimiti?: string;
  musteriAnaliziKalan?: string;
  destek520Data?: string;
  destek520Limiti?: string;
  destek520Kalan?: string;

  // FOKUS618 - Finans & Fatura
  musteriTalepleri618?: string;

  // FOKUS707 - İnsan Kaynakları
  musteriTalepleri707?: string;

  // FOKUS717 - İçerik Tasarım
  musteriTalepleri717?: string;

  // FOKUS808 - Sosyal Medya
  musteriTalepleri808?: string;

  // FOKUS999 - Joker Asistan
  musteriTalepleri999?: string;
}

export default function AssistantSettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [assistantData, setAssistantData] = useState<AssistantData | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Photo states for FOKUS001
  const [fokus001Photo, setFokus001Photo] = useState<File | null>(null);
  const [fokus001PhotoPreview, setFokus001PhotoPreview] = useState<string>('');
  const fokus001PhotoInputRef = useRef<HTMLInputElement>(null);

  // Photo states for FOKUS520 CRM Personnel
  const [personnelPhotos, setPersonnelPhotos] = useState<{ [key: string]: File }>({});
  const [personnelPhotoPreviews, setPersonnelPhotoPreviews] = useState<{ [key: string]: string }>({});

  // CRM personnel state
  const [crmPersonnel, setCrmPersonnel] = useState<AssistantData['crmPersonnel']>([]);

  // Authentication check
  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.push('/google-auth-landing');
      return;
    }

    // Load assistant data from session
    const dataKey = searchParams.get('dataKey');
    if (dataKey) {
      const storedData = sessionStorage.getItem(dataKey);
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setAssistantData(parsedData);
          setActiveSection(parsedData.focusCode || '');

          // Initialize CRM personnel for FOKUS520
          if (parsedData.focusCode === '520' && parsedData.crmPersonnel) {
            setCrmPersonnel(parsedData.crmPersonnel);
          }

          setIsLoading(false);
        } catch (error) {
          console.error('Error parsing session data:', error);
          toast.error('Oturum verisi yüklenirken hata oluştu');
          setIsLoading(false);
        }
      } else {
        toast.error('Oturum verisi bulunamadı');
        setIsLoading(false);
      }
    } else {
      toast.error('Geçersiz oturum anahtarı');
      setIsLoading(false);
    }
  }, [status, router, searchParams]);

  // FOKUS001 Photo handlers
  const handleFokus001PhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Fotoğraf boyutu 5MB\'dan küçük olmalıdır');
        return;
      }
      setFokus001Photo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFokus001PhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeFokus001Image = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas context not available'));
            return;
          }

          const MAX_SIZE = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to create blob'));
              }
            },
            'image/jpeg',
            0.85
          );
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const uploadFokus001Photo = async (): Promise<string | null> => {
    if (!fokus001Photo || !assistantData) return null;

    try {
      const resizedPhoto = await resizeFokus001Image(fokus001Photo);
      const formData = new FormData();
      formData.append('photo', resizedPhoto, 'fokus001-photo.jpg');
      formData.append('photoType', 'yonetici');
      formData.append('customerId', assistantData.customerId);
      formData.append('focusCode', '001');

      const response = await fetch('https://n8n.fokusistatistik.com/webhook/fokusfotografkaydet', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Photo upload failed');
      }

      const result = await response.json();
      return result.photoURL || null;
    } catch (error) {
      console.error('Error uploading FOKUS001 photo:', error);
      toast.error('Fotoğraf yüklenirken hata oluştu');
      return null;
    }
  };

  // FOKUS520 CRM Personnel handlers
  const handlePersonnelPhotoSelect = (personnelId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Fotoğraf boyutu 5MB\'dan küçük olmalıdır');
        return;
      }
      setPersonnelPhotos({ ...personnelPhotos, [personnelId]: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonnelPhotoPreviews({ ...personnelPhotoPreviews, [personnelId]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const resizePersonnelImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas context not available'));
            return;
          }

          const MAX_SIZE = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to create blob'));
              }
            },
            'image/jpeg',
            0.85
          );
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const uploadPersonnelPhoto = async (personnelId: string): Promise<string | null> => {
    const file = personnelPhotos[personnelId];
    if (!file || !assistantData) return null;

    try {
      const resizedPhoto = await resizePersonnelImage(file);
      const formData = new FormData();
      formData.append('photo', resizedPhoto, `personnel-${personnelId}-photo.jpg`);
      formData.append('photoType', 'crmpersoneli');
      formData.append('customerId', assistantData.customerId);
      formData.append('focusCode', '520');
      formData.append('personnelId', personnelId);

      const response = await fetch('https://n8n.fokusistatistik.com/webhook/fokusfotografkaydet', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Personnel photo upload failed');
      }

      const result = await response.json();
      return result.photoURL || null;
    } catch (error) {
      console.error(`Error uploading personnel ${personnelId} photo:`, error);
      toast.error(`Personel fotoğrafı yüklenirken hata oluştu`);
      return null;
    }
  };

  // Add CRM Personnel (FOKUS520)
  const addCrmPersonnel = () => {
    if (crmPersonnel && crmPersonnel.length >= 5) {
      toast.warning('Maksimum 5 personel ekleyebilirsiniz');
      return;
    }

    const newPersonnel = {
      id: `crm${Date.now()}`,
      ad: '',
      soyad: '',
      email: '',
      unvanRol: '',
      gozukecekIsim: '',
      departman: '',
      fotoURL: '',
    };

    setCrmPersonnel([...(crmPersonnel || []), newPersonnel]);
  };

  const removeCrmPersonnel = (id: string) => {
    setCrmPersonnel((crmPersonnel || []).filter((p) => p.id !== id));
    // Remove photo if exists
    const newPhotos = { ...personnelPhotos };
    delete newPhotos[id];
    setPersonnelPhotos(newPhotos);
    const newPreviews = { ...personnelPhotoPreviews };
    delete newPreviews[id];
    setPersonnelPhotoPreviews(newPreviews);
  };

  const updateCrmPersonnel = (id: string, field: string, value: string) => {
    setCrmPersonnel(
      (crmPersonnel || []).map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  // Data collection functions
  const collect001FormData = async () => {
    const form = document.getElementById('fokus001Form') as HTMLFormElement;
    if (!form) return null;

    const formData = new FormData(form);

    // Upload photo if selected
    let photoURL = assistantData?.yoneticiPhotoURL || '';
    if (fokus001Photo) {
      const uploadedPhotoURL = await uploadFokus001Photo();
      if (uploadedPhotoURL) {
        photoURL = uploadedPhotoURL;
      }
    }

    // Collect etiketler
    const etiketler: string[] = [];
    for (let i = 1; i <= 15; i++) {
      const etiket = formData.get(`etiket${i}`) as string;
      if (etiket && etiket.trim()) {
        etiketler.push(etiket.trim());
      }
    }

    return {
      focusCode: '001',
      customerId: assistantData?.customerId || '',
      email: formData.get('email001') as string,
      fullName: formData.get('fullName001') as string,
      displayName: formData.get('displayName001') as string,
      title: formData.get('title001') as string,
      departman: formData.get('departman001') as string,
      ozelAdi: formData.get('ozelAdi001') as string,
      etiketler001: etiketler,
      musteriTalepleri001: formData.get('musteriTalepleri001') as string,
      yoneticiPhotoURL: photoURL,
      sesliYanitData: assistantData?.sesliYanitData || '0',
      sesliYanitLimiti: assistantData?.sesliYanitLimiti || '0',
      sesliYanitKalan: assistantData?.sesliYanitKalan || '0',
      gorselAnalizData: assistantData?.gorselAnalizData || '0',
      gorselAnalizLimiti: assistantData?.gorselAnalizLimiti || '0',
      gorselAnalizKalan: assistantData?.gorselAnalizKalan || '0',
      dosyaAnalizData: assistantData?.dosyaAnalizData || '0',
      dosyaAnalizLimiti: assistantData?.dosyaAnalizLimiti || '0',
      dosyaAnalizKalan: assistantData?.dosyaAnalizKalan || '0',
      smartToolsData: assistantData?.smartToolsData || '0',
      smartToolsLimiti: assistantData?.smartToolsLimiti || '0',
      smartToolsKalan: assistantData?.smartToolsKalan || '0',
    };
  };

  const collect216FormData = () => {
    const form = document.getElementById('fokus216Form') as HTMLFormElement;
    if (!form) return null;

    const formData = new FormData(form);

    // Collect channels
    const channels = {
      whatsapp: (document.getElementById('channel216_whatsapp') as HTMLInputElement)?.checked || false,
      instagram: (document.getElementById('channel216_instagram') as HTMLInputElement)?.checked || false,
      telegram: (document.getElementById('channel216_telegram') as HTMLInputElement)?.checked || false,
      web: (document.getElementById('channel216_web') as HTMLInputElement)?.checked || false,
    };

    // Collect üslup/ton
    const uslupTon = {
      uyumlu: (document.getElementById('ton216_uyumlu') as HTMLInputElement)?.checked || false,
      satisOncelikli: (document.getElementById('ton216_satisOncelikli') as HTMLInputElement)?.checked || false,
      yardimsever: (document.getElementById('ton216_yardimsever') as HTMLInputElement)?.checked || false,
      kati: (document.getElementById('ton216_kati') as HTMLInputElement)?.checked || false,
      dogal: (document.getElementById('ton216_dogal') as HTMLInputElement)?.checked || false,
      enerjik: (document.getElementById('ton216_enerjik') as HTMLInputElement)?.checked || false,
      profesyonel: (document.getElementById('ton216_profesyonel') as HTMLInputElement)?.checked || false,
      samimi: (document.getElementById('ton216_samimi') as HTMLInputElement)?.checked || false,
      sempatik: (document.getElementById('ton216_sempatik') as HTMLInputElement)?.checked || false,
      empatik: (document.getElementById('ton216_empatik') as HTMLInputElement)?.checked || false,
      gercekci: (document.getElementById('ton216_gercekci') as HTMLInputElement)?.checked || false,
      iyimser: (document.getElementById('ton216_iyimser') as HTMLInputElement)?.checked || false,
      cozumOdakli: (document.getElementById('ton216_cozumOdakli') as HTMLInputElement)?.checked || false,
      motivasyonel: (document.getElementById('ton216_motivasyonel') as HTMLInputElement)?.checked || false,
      rahatlatici: (document.getElementById('ton216_rahatlatici') as HTMLInputElement)?.checked || false,
    };

    // Collect bilgi paylaşım
    const bilgiPaylasim = {
      hizmetler: (document.getElementById('bilgiPaylasim216_hizmetler') as HTMLInputElement)?.checked || false,
      fiyatlar: (document.getElementById('bilgiPaylasim216_fiyatlar') as HTMLInputElement)?.checked || false,
      konum: (document.getElementById('bilgiPaylasim216_konum') as HTMLInputElement)?.checked || false,
      calismaGunu: (document.getElementById('bilgiPaylasim216_calismaGunu') as HTMLInputElement)?.checked || false,
      iletisim: (document.getElementById('bilgiPaylasim216_iletisim') as HTMLInputElement)?.checked || false,
      randevuAl: (document.getElementById('bilgiPaylasim216_randevuAl') as HTMLInputElement)?.checked || false,
      personel: (document.getElementById('bilgiPaylasim216_personel') as HTMLInputElement)?.checked || false,
    };

    return {
      focusCode: '216',
      customerId: assistantData?.customerId || '',
      kurumsalIsim: formData.get('kurumsalIsim216') as string,
      dil: formData.get('dil216') as string,
      channels,
      uslupTon,
      emojiKullanimi: (document.getElementById('emojiKullanimi216') as HTMLInputElement)?.checked || false,
      cta: (document.getElementById('cta216') as HTMLInputElement)?.checked || false,
      oneriTavsiye: (document.getElementById('oneriTavsiye216') as HTMLInputElement)?.checked || false,
      yanitOnceligi: formData.get('yanitOnceligi216') as string,
      bilgiPaylasim,
      musteriTalepleri216: formData.get('musteriTalepleri216') as string,
      musteriSorgusuData: assistantData?.musteriSorgusuData || '0',
      musteriSorgusuLimiti: assistantData?.musteriSorgusuLimiti || '0',
      musteriSorgusuKalan: assistantData?.musteriSorgusuKalan || '0',
    };
  };

  const collect314FormData = () => {
    const form = document.getElementById('fokus314Form') as HTMLFormElement;
    if (!form) return null;

    const formData = new FormData(form);

    return {
      focusCode: '314',
      customerId: assistantData?.customerId || '',
      musteriTalepleri314: formData.get('musteriTalepleri314') as string,
    };
  };

  const collect520FormData = async () => {
    const form = document.getElementById('fokus520Form') as HTMLFormElement;
    if (!form) return null;

    const formData = new FormData(form);

    // Upload photos for CRM personnel
    const updatedPersonnel = await Promise.all(
      (crmPersonnel || []).map(async (personnel) => {
        let photoURL = personnel.fotoURL;
        if (personnelPhotos[personnel.id]) {
          const uploadedPhotoURL = await uploadPersonnelPhoto(personnel.id);
          if (uploadedPhotoURL) {
            photoURL = uploadedPhotoURL;
          }
        }
        return { ...personnel, fotoURL: photoURL };
      })
    );

    return {
      focusCode: '520',
      customerId: assistantData?.customerId || '',
      crmPersonnel: updatedPersonnel,
      totalCrmPersonnel: updatedPersonnel.length,
      musteriTalepleri520: formData.get('musteriTalepleri520') as string,
      musteriAnaliziData: assistantData?.musteriAnaliziData || '0',
      musteriAnaliziLimiti: assistantData?.musteriAnaliziLimiti || '0',
      musteriAnaliziKalan: assistantData?.musteriAnaliziKalan || '0',
      destek520Data: assistantData?.destek520Data || '0',
      destek520Limiti: assistantData?.destek520Limiti || '0',
      destek520Kalan: assistantData?.destek520Kalan || '0',
    };
  };

  const collect618FormData = () => {
    const form = document.getElementById('fokus618Form') as HTMLFormElement;
    if (!form) return null;

    const formData = new FormData(form);

    return {
      focusCode: '618',
      customerId: assistantData?.customerId || '',
      musteriTalepleri618: formData.get('musteriTalepleri618') as string,
    };
  };

  const collect707FormData = () => {
    const form = document.getElementById('fokus707Form') as HTMLFormElement;
    if (!form) return null;

    const formData = new FormData(form);

    return {
      focusCode: '707',
      customerId: assistantData?.customerId || '',
      musteriTalepleri707: formData.get('musteriTalepleri707') as string,
    };
  };

  const collect717FormData = () => {
    const form = document.getElementById('fokus717Form') as HTMLFormElement;
    if (!form) return null;

    const formData = new FormData(form);

    return {
      focusCode: '717',
      customerId: assistantData?.customerId || '',
      musteriTalepleri717: formData.get('musteriTalepleri717') as string,
    };
  };

  const collect808FormData = () => {
    const form = document.getElementById('fokus808Form') as HTMLFormElement;
    if (!form) return null;

    const formData = new FormData(form);

    return {
      focusCode: '808',
      customerId: assistantData?.customerId || '',
      musteriTalepleri808: formData.get('musteriTalepleri808') as string,
    };
  };

  const collect999FormData = () => {
    const form = document.getElementById('fokus999Form') as HTMLFormElement;
    if (!form) return null;

    const formData = new FormData(form);

    return {
      focusCode: '999',
      customerId: assistantData?.customerId || '',
      musteriTalepleri999: formData.get('musteriTalepleri999') as string,
    };
  };

  // Save assistant settings
  const handleSaveSettings = async () => {
    if (!assistantData) {
      toast.error('Asistan verisi bulunamadı');
      return;
    }

    setIsSaving(true);

    try {
      let collectedData = null;

      // Collect data based on active section
      switch (activeSection) {
        case '001':
          collectedData = await collect001FormData();
          break;
        case '216':
          collectedData = collect216FormData();
          break;
        case '314':
          collectedData = collect314FormData();
          break;
        case '520':
          collectedData = await collect520FormData();
          break;
        case '618':
          collectedData = collect618FormData();
          break;
        case '707':
          collectedData = collect707FormData();
          break;
        case '717':
          collectedData = collect717FormData();
          break;
        case '808':
          collectedData = collect808FormData();
          break;
        case '999':
          collectedData = collect999FormData();
          break;
        default:
          toast.error('Geçersiz asistan tipi');
          setIsSaving(false);
          return;
      }

      if (!collectedData) {
        toast.error('Form verileri toplanamadı');
        setIsSaving(false);
        return;
      }

      // Send to webhook
      const response = await fetch('https://n8n.fokusistatistik.com/webhook/settingsasistantssavedata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(collectedData),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      const result = await response.json();

      if (result.success) {
        toast.success('Asistan ayarları başarıyla kaydedildi!');

        // Update session storage
        const dataKey = searchParams.get('dataKey');
        if (dataKey) {
          sessionStorage.setItem(dataKey, JSON.stringify(collectedData));
        }

        // Redirect back to main settings after 2 seconds
        setTimeout(() => {
          router.push('/ayarlar');
        }, 2000);
      } else {
        toast.error(result.message || 'Kayıt sırasında hata oluştu');
      }
    } catch (error) {
      console.error('Error saving assistant settings:', error);
      toast.error('Ayarlar kaydedilirken hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Asistan ayarları yükleniyor...</p>
      </div>
    );
  }

  if (!assistantData) {
    return (
      <div className="error-container">
        <p>Asistan verisi bulunamadı</p>
        <button onClick={() => router.push('/ayarlar')} className="btn-back">
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  return (
    <div className="assistant-settings-container">
      {/* Header */}
      <div className="assistant-header">
        <button onClick={() => router.push('/ayarlar')} className="btn-back">
          ← Geri
        </button>
        <h1>FOKUS {activeSection} Asistan Ayarları</h1>
        <div className="company-info">
          <p>{assistantData.companyName}</p>
        </div>
      </div>

      {/* FOKUS001 - Yönetici */}
      {activeSection === '001' && (
        <div className="assistant-section active" id="section001">
          <form id="fokus001Form" className="assistant-form">
            <h2>FOKUS001 - Yönetici Asistanı</h2>

            {/* Photo Upload */}
            <div className="form-group photo-upload-group">
              <label>Yönetici Fotoğrafı</label>
              <div className="photo-upload-wrapper">
                <div className="photo-preview">
                  {fokus001PhotoPreview || assistantData.yoneticiPhotoURL ? (
                    <img src={fokus001PhotoPreview || assistantData.yoneticiPhotoURL} alt="Manager" />
                  ) : (
                    <div className="photo-placeholder">Fotoğraf Yükle</div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fokus001PhotoInputRef}
                  accept="image/*"
                  onChange={handleFokus001PhotoSelect}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fokus001PhotoInputRef.current?.click()}
                  className="btn-upload-photo"
                >
                  Fotoğraf Seç
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email001">E-posta</label>
              <input
                type="email"
                id="email001"
                name="email001"
                defaultValue={assistantData.email || ''}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="fullName001">Ad Soyad</label>
              <input
                type="text"
                id="fullName001"
                name="fullName001"
                defaultValue={assistantData.fullName || ''}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="displayName001">Görünecek İsim</label>
              <input
                type="text"
                id="displayName001"
                name="displayName001"
                defaultValue={assistantData.displayName || ''}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="title001">Ünvan</label>
              <input
                type="text"
                id="title001"
                name="title001"
                defaultValue={assistantData.title || ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="departman001">Departman</label>
              <input
                type="text"
                id="departman001"
                name="departman001"
                defaultValue={assistantData.departman || ''}
              />
            </div>

            <div className="form-group">
              <label htmlFor="ozelAdi001">Özel Adı</label>
              <input
                type="text"
                id="ozelAdi001"
                name="ozelAdi001"
                defaultValue={assistantData.ozelAdi || ''}
                placeholder="Asistana vereceğiniz özel isim"
              />
            </div>

            {/* Etiketler */}
            <div className="form-section">
              <h3>Etiketler (15 Adet)</h3>
              <div className="etiketler-grid">
                {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                  <div key={num} className="form-group">
                    <label htmlFor={`etiket${num}`}>Etiket {num}</label>
                    <input
                      type="text"
                      id={`etiket${num}`}
                      name={`etiket${num}`}
                      defaultValue={assistantData.etiketler001?.[num - 1] || ''}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Müşteri Talepleri */}
            <div className="form-group">
              <label htmlFor="musteriTalepleri001">Müşteri Talepleri / Özel Notlar</label>
              <textarea
                id="musteriTalepleri001"
                name="musteriTalepleri001"
                rows={6}
                defaultValue={assistantData.musteriTalepleri001 || ''}
                placeholder="Özel talepler, notlar veya talimatlar..."
              />
            </div>

            {/* Quota Display */}
            <div className="quota-section">
              <h3>Kullanım Kotaları</h3>
              <div className="quota-grid">
                <div className="quota-item">
                  <h4>Sesli Yanıt</h4>
                  <div className="quota-values">
                    <span>Kullanılan: {assistantData.sesliYanitData || '0'}</span>
                    <span>Limit: {assistantData.sesliYanitLimiti || '0'}</span>
                    <span>Kalan: {assistantData.sesliYanitKalan || '0'}</span>
                  </div>
                </div>
                <div className="quota-item">
                  <h4>Görsel Analiz</h4>
                  <div className="quota-values">
                    <span>Kullanılan: {assistantData.gorselAnalizData || '0'}</span>
                    <span>Limit: {assistantData.gorselAnalizLimiti || '0'}</span>
                    <span>Kalan: {assistantData.gorselAnalizKalan || '0'}</span>
                  </div>
                </div>
                <div className="quota-item">
                  <h4>Dosya Analiz</h4>
                  <div className="quota-values">
                    <span>Kullanılan: {assistantData.dosyaAnalizData || '0'}</span>
                    <span>Limit: {assistantData.dosyaAnalizLimiti || '0'}</span>
                    <span>Kalan: {assistantData.dosyaAnalizKalan || '0'}</span>
                  </div>
                </div>
                <div className="quota-item">
                  <h4>Smart Tools</h4>
                  <div className="quota-values">
                    <span>Kullanılan: {assistantData.smartToolsData || '0'}</span>
                    <span>Limit: {assistantData.smartToolsLimiti || '0'}</span>
                    <span>Kalan: {assistantData.smartToolsKalan || '0'}</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* FOKUS216 - Müşteri Hizmetleri */}
      {activeSection === '216' && (
        <div className="assistant-section active" id="section216">
          <form id="fokus216Form" className="assistant-form">
            <h2>FOKUS216 - Müşteri Hizmetleri Asistanı</h2>

            <div className="form-group">
              <label htmlFor="kurumsalIsim216">Kurumsal İsim</label>
              <input
                type="text"
                id="kurumsalIsim216"
                name="kurumsalIsim216"
                defaultValue={assistantData.kurumsalIsim || ''}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dil216">Dil</label>
              <select id="dil216" name="dil216" defaultValue={assistantData.dil || 'Türkçe'}>
                <option value="Türkçe">Türkçe</option>
                <option value="İngilizce">İngilizce</option>
                <option value="Almanca">Almanca</option>
                <option value="Fransızca">Fransızca</option>
                <option value="İspanyolca">İspanyolca</option>
              </select>
            </div>

            {/* Kanallar */}
            <div className="form-section">
              <h3>İletişim Kanalları</h3>
              <div className="checkbox-grid">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id="channel216_whatsapp"
                    defaultChecked={assistantData.channels?.whatsapp || false}
                  />
                  <span>WhatsApp</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id="channel216_instagram"
                    defaultChecked={assistantData.channels?.instagram || false}
                  />
                  <span>Instagram</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id="channel216_telegram"
                    defaultChecked={assistantData.channels?.telegram || false}
                  />
                  <span>Telegram</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id="channel216_web"
                    defaultChecked={assistantData.channels?.web || false}
                  />
                  <span>Web</span>
                </label>
              </div>
            </div>

            {/* Üslup ve Ton */}
            <div className="form-section">
              <h3>Üslup ve Ton</h3>
              <div className="checkbox-grid">
                <label className="checkbox-label">
                  <input type="checkbox" id="ton216_uyumlu" defaultChecked={assistantData.uslupTon?.uyumlu || false} />
                  <span>Uyumlu</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="ton216_satisOncelikli" defaultChecked={assistantData.uslupTon?.satisOncelikli || false} />
                  <span>Satış Öncelikli</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="ton216_yardimsever" defaultChecked={assistantData.uslupTon?.yardimsever || false} />
                  <span>Yardımsever</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="ton216_kati" defaultChecked={assistantData.uslupTon?.kati || false} />
                  <span>Katı</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="ton216_dogal" defaultChecked={assistantData.uslupTon?.dogal || false} />
                  <span>Doğal</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="ton216_enerjik" defaultChecked={assistantData.uslupTon?.enerjik || false} />
                  <span>Enerjik</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="ton216_profesyonel" defaultChecked={assistantData.uslupTon?.profesyonel || false} />
                  <span>Profesyonel</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="ton216_samimi" defaultChecked={assistantData.uslupTon?.samimi || false} />
                  <span>Samimi</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="ton216_sempatik" defaultChecked={assistantData.uslupTon?.sempatik || false} />
                  <span>Sempatik</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="ton216_empatik" defaultChecked={assistantData.uslupTon?.empatik || false} />
                  <span>Empatik</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="ton216_gercekci" defaultChecked={assistantData.uslupTon?.gercekci || false} />
                  <span>Gerçekçi</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="ton216_iyimser" defaultChecked={assistantData.uslupTon?.iyimser || false} />
                  <span>İyimser</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="ton216_cozumOdakli" defaultChecked={assistantData.uslupTon?.cozumOdakli || false} />
                  <span>Çözüm Odaklı</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="ton216_motivasyonel" defaultChecked={assistantData.uslupTon?.motivasyonel || false} />
                  <span>Motivasyonel</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="ton216_rahatlatici" defaultChecked={assistantData.uslupTon?.rahatlatici || false} />
                  <span>Rahatlatıcı</span>
                </label>
              </div>
            </div>

            {/* Feature Settings */}
            <div className="form-section">
              <h3>Özellikler</h3>
              <div className="checkbox-grid">
                <label className="checkbox-label">
                  <input type="checkbox" id="emojiKullanimi216" defaultChecked={assistantData.emojiKullanimi || false} />
                  <span>Emoji Kullanımı</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="cta216" defaultChecked={assistantData.cta || false} />
                  <span>CTA (Harekete Geçirici)</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="oneriTavsiye216" defaultChecked={assistantData.oneriTavsiye || false} />
                  <span>Öneri ve Tavsiye</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="yanitOnceligi216">Yanıt Önceliği</label>
              <select id="yanitOnceligi216" name="yanitOnceligi216" defaultValue={assistantData.yanitOnceligi || 'Hız'}>
                <option value="Hız">Hız</option>
                <option value="Detay">Detay</option>
                <option value="Dengeli">Dengeli</option>
              </select>
            </div>

            {/* Bilgi Paylaşım İzinleri */}
            <div className="form-section">
              <h3>Bilgi Paylaşım İzinleri</h3>
              <div className="checkbox-grid">
                <label className="checkbox-label">
                  <input type="checkbox" id="bilgiPaylasim216_hizmetler" defaultChecked={assistantData.bilgiPaylasim?.hizmetler || false} />
                  <span>Hizmetler</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="bilgiPaylasim216_fiyatlar" defaultChecked={assistantData.bilgiPaylasim?.fiyatlar || false} />
                  <span>Fiyatlar</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="bilgiPaylasim216_konum" defaultChecked={assistantData.bilgiPaylasim?.konum || false} />
                  <span>Konum</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="bilgiPaylasim216_calismaGunu" defaultChecked={assistantData.bilgiPaylasim?.calismaGunu || false} />
                  <span>Çalışma Günü/Saati</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="bilgiPaylasim216_iletisim" defaultChecked={assistantData.bilgiPaylasim?.iletisim || false} />
                  <span>İletişim Bilgileri</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="bilgiPaylasim216_randevuAl" defaultChecked={assistantData.bilgiPaylasim?.randevuAl || false} />
                  <span>Randevu Al</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" id="bilgiPaylasim216_personel" defaultChecked={assistantData.bilgiPaylasim?.personel || false} />
                  <span>Personel Bilgileri</span>
                </label>
              </div>
            </div>

            {/* Müşteri Talepleri */}
            <div className="form-group">
              <label htmlFor="musteriTalepleri216">Müşteri Talepleri / Özel Notlar</label>
              <textarea
                id="musteriTalepleri216"
                name="musteriTalepleri216"
                rows={6}
                defaultValue={assistantData.musteriTalepleri216 || ''}
                placeholder="Özel talepler, notlar veya talimatlar..."
              />
            </div>

            {/* Quota Display */}
            <div className="quota-section">
              <h3>Kullanım Kotaları</h3>
              <div className="quota-grid">
                <div className="quota-item">
                  <h4>Müşteri Sorgusu</h4>
                  <div className="quota-values">
                    <span>Kullanılan: {assistantData.musteriSorgusuData || '0'}</span>
                    <span>Limit: {assistantData.musteriSorgusuLimiti || '0'}</span>
                    <span>Kalan: {assistantData.musteriSorgusuKalan || '0'}</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* FOKUS314 - Veri Analisti */}
      {activeSection === '314' && (
        <div className="assistant-section active" id="section314">
          <form id="fokus314Form" className="assistant-form">
            <h2>FOKUS314 - Veri Analisti Asistanı</h2>

            <div className="form-group">
              <label htmlFor="musteriTalepleri314">Müşteri Talepleri / Özel Notlar</label>
              <textarea
                id="musteriTalepleri314"
                name="musteriTalepleri314"
                rows={8}
                defaultValue={assistantData.musteriTalepleri314 || ''}
                placeholder="Veri analizi ve raporlama için özel talepler, notlar veya talimatlar..."
              />
            </div>
          </form>
        </div>
      )}

      {/* FOKUS520 - Pazarlama & Lead */}
      {activeSection === '520' && (
        <div className="assistant-section active" id="section520">
          <form id="fokus520Form" className="assistant-form">
            <h2>FOKUS520 - Pazarlama & Lead Asistanı</h2>

            {/* CRM Personnel */}
            <div className="form-section">
              <div className="section-header">
                <h3>CRM Personeli (Maksimum 5)</h3>
                <button
                  type="button"
                  onClick={addCrmPersonnel}
                  className="btn-add-personnel"
                  disabled={(crmPersonnel || []).length >= 5}
                >
                  + Personel Ekle
                </button>
              </div>

              <div className="personnel-list">
                {(crmPersonnel || []).map((personnel, index) => (
                  <div key={personnel.id} className="personnel-item">
                    <div className="personnel-header">
                      <h4>Personel {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeCrmPersonnel(personnel.id)}
                        className="btn-remove-personnel"
                      >
                        × Kaldır
                      </button>
                    </div>

                    {/* Photo Upload */}
                    <div className="form-group photo-upload-group">
                      <label>Personel Fotoğrafı</label>
                      <div className="photo-upload-wrapper">
                        <div className="photo-preview">
                          {personnelPhotoPreviews[personnel.id] || personnel.fotoURL ? (
                            <img src={personnelPhotoPreviews[personnel.id] || personnel.fotoURL} alt={`Personnel ${index + 1}`} />
                          ) : (
                            <div className="photo-placeholder">Fotoğraf Yükle</div>
                          )}
                        </div>
                        <input
                          type="file"
                          id={`personnelPhoto${personnel.id}`}
                          accept="image/*"
                          onChange={(e) => handlePersonnelPhotoSelect(personnel.id, e)}
                          style={{ display: 'none' }}
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById(`personnelPhoto${personnel.id}`)?.click()}
                          className="btn-upload-photo"
                        >
                          Fotoğraf Seç
                        </button>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Ad</label>
                        <input
                          type="text"
                          value={personnel.ad}
                          onChange={(e) => updateCrmPersonnel(personnel.id, 'ad', e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Soyad</label>
                        <input
                          type="text"
                          value={personnel.soyad}
                          onChange={(e) => updateCrmPersonnel(personnel.id, 'soyad', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>E-posta</label>
                      <input
                        type="email"
                        value={personnel.email}
                        onChange={(e) => updateCrmPersonnel(personnel.id, 'email', e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Ünvan/Rol</label>
                      <input
                        type="text"
                        value={personnel.unvanRol}
                        onChange={(e) => updateCrmPersonnel(personnel.id, 'unvanRol', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Görünecek İsim</label>
                      <input
                        type="text"
                        value={personnel.gozukecekIsim}
                        onChange={(e) => updateCrmPersonnel(personnel.id, 'gozukecekIsim', e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Departman</label>
                      <input
                        type="text"
                        value={personnel.departman}
                        onChange={(e) => updateCrmPersonnel(personnel.id, 'departman', e.target.value)}
                      />
                    </div>
                  </div>
                ))}

                {(crmPersonnel || []).length === 0 && (
                  <div className="empty-state">
                    <p>Henüz personel eklenmedi. Yukarıdaki butona tıklayarak personel ekleyebilirsiniz.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Müşteri Talepleri */}
            <div className="form-group">
              <label htmlFor="musteriTalepleri520">Müşteri Talepleri / Özel Notlar</label>
              <textarea
                id="musteriTalepleri520"
                name="musteriTalepleri520"
                rows={6}
                defaultValue={assistantData.musteriTalepleri520 || ''}
                placeholder="Özel talepler, notlar veya talimatlar..."
              />
            </div>

            {/* Quota Display */}
            <div className="quota-section">
              <h3>Kullanım Kotaları</h3>
              <div className="quota-grid">
                <div className="quota-item">
                  <h4>Müşteri Analizi</h4>
                  <div className="quota-values">
                    <span>Kullanılan: {assistantData.musteriAnaliziData || '0'}</span>
                    <span>Limit: {assistantData.musteriAnaliziLimiti || '0'}</span>
                    <span>Kalan: {assistantData.musteriAnaliziKalan || '0'}</span>
                  </div>
                </div>
                <div className="quota-item">
                  <h4>Destek 520</h4>
                  <div className="quota-values">
                    <span>Kullanılan: {assistantData.destek520Data || '0'}</span>
                    <span>Limit: {assistantData.destek520Limiti || '0'}</span>
                    <span>Kalan: {assistantData.destek520Kalan || '0'}</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* FOKUS618 - Finans & Fatura */}
      {activeSection === '618' && (
        <div className="assistant-section active" id="section618">
          <form id="fokus618Form" className="assistant-form">
            <h2>FOKUS618 - Finans & Fatura Asistanı</h2>

            <div className="form-group">
              <label htmlFor="musteriTalepleri618">Müşteri Talepleri / Özel Notlar</label>
              <textarea
                id="musteriTalepleri618"
                name="musteriTalepleri618"
                rows={8}
                defaultValue={assistantData.musteriTalepleri618 || ''}
                placeholder="Finans ve fatura yönetimi için özel talepler, notlar veya talimatlar..."
              />
            </div>
          </form>
        </div>
      )}

      {/* FOKUS707 - İnsan Kaynakları */}
      {activeSection === '707' && (
        <div className="assistant-section active" id="section707">
          <form id="fokus707Form" className="assistant-form">
            <h2>FOKUS707 - İnsan Kaynakları Asistanı</h2>

            <div className="form-group">
              <label htmlFor="musteriTalepleri707">Müşteri Talepleri / Özel Notlar</label>
              <textarea
                id="musteriTalepleri707"
                name="musteriTalepleri707"
                rows={8}
                defaultValue={assistantData.musteriTalepleri707 || ''}
                placeholder="İnsan kaynakları yönetimi için özel talepler, notlar veya talimatlar..."
              />
            </div>
          </form>
        </div>
      )}

      {/* FOKUS717 - İçerik Tasarım */}
      {activeSection === '717' && (
        <div className="assistant-section active" id="section717">
          <form id="fokus717Form" className="assistant-form">
            <h2>FOKUS717 - İçerik Tasarım Asistanı</h2>

            <div className="form-group">
              <label htmlFor="musteriTalepleri717">Müşteri Talepleri / Özel Notlar</label>
              <textarea
                id="musteriTalepleri717"
                name="musteriTalepleri717"
                rows={8}
                defaultValue={assistantData.musteriTalepleri717 || ''}
                placeholder="İçerik tasarımı için özel talepler, notlar veya talimatlar..."
              />
            </div>
          </form>
        </div>
      )}

      {/* FOKUS808 - Sosyal Medya */}
      {activeSection === '808' && (
        <div className="assistant-section active" id="section808">
          <form id="fokus808Form" className="assistant-form">
            <h2>FOKUS808 - Sosyal Medya Asistanı</h2>

            <div className="form-group">
              <label htmlFor="musteriTalepleri808">Müşteri Talepleri / Özel Notlar</label>
              <textarea
                id="musteriTalepleri808"
                name="musteriTalepleri808"
                rows={8}
                defaultValue={assistantData.musteriTalepleri808 || ''}
                placeholder="Sosyal medya yönetimi için özel talepler, notlar veya talimatlar..."
              />
            </div>
          </form>
        </div>
      )}

      {/* FOKUS999 - Joker Asistan */}
      {activeSection === '999' && (
        <div className="assistant-section active" id="section999">
          <form id="fokus999Form" className="assistant-form">
            <h2>FOKUS999 - Joker Asistan</h2>

            <div className="form-group">
              <label htmlFor="musteriTalepleri999">Müşteri Talepleri / Özel Notlar</label>
              <textarea
                id="musteriTalepleri999"
                name="musteriTalepleri999"
                rows={8}
                defaultValue={assistantData.musteriTalepleri999 || ''}
                placeholder="Joker asistan için özel talepler, notlar veya talimatlar..."
              />
            </div>
          </form>
        </div>
      )}

      {/* Save Button */}
      <div className="form-actions">
        <button
          type="button"
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="btn-save"
        >
          {isSaving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
        </button>
      </div>

      {/* Teknik Destek Chatbot */}
      <TeknikDestekChatbot pageType="asistanlar" pageTitle="Asistan Ayarları" />
    </div>
  );
}
