'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { CustomerSettings } from '@/types/settings';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import './styles.css';

// Leaflet'i dinamik olarak yükle (SSR sorunlarını önlemek için)
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div style={{
      height: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(45deg, #f0f0f0, #e0e0f0)',
      borderRadius: '8px'
    }}>
      <div>Harita yükleniyor...</div>
    </div>
  ),
});

// Session configuration
const SESSION_CONFIG = {
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 saat
  REFRESH_THRESHOLD: 2 * 60 * 60 * 1000, // 2 saat
  STORAGE_KEY: 'asistansessionsettings',
  PERSISTENT_KEY: 'asistansessionpersistent'
};

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<CustomerSettings | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string>('');
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [currentUserData, setCurrentUserData] = useState<any>(null);
  const [mapCoordinates, setMapCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isChatbotLoaded, setIsChatbotLoaded] = useState(false);

  // Refs
  const hasLoadedSettings = useRef(false);

  // ==========================================
  // SESSION YÖNETİMİ
  // ==========================================

  const saveSessionData = (userData: any) => {
    const sessionData = {
      ...userData,
      authMethod: 'google',
      isLoggedIn: true,
      loginTimestamp: Date.now(),
      expiresAt: Date.now() + SESSION_CONFIG.SESSION_DURATION
    };

    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_CONFIG.STORAGE_KEY, JSON.stringify(sessionData));
      localStorage.setItem(SESSION_CONFIG.PERSISTENT_KEY, JSON.stringify(sessionData));
    }

    return sessionData;
  };

  const loadSessionData = () => {
    if (typeof window === 'undefined') return null;

    let sessionData = sessionStorage.getItem(SESSION_CONFIG.STORAGE_KEY);

    if (sessionData) {
      try {
        return JSON.parse(sessionData);
      } catch (e) {
        console.warn('SessionStorage parse error:', e);
      }
    }

    const persistentData = localStorage.getItem(SESSION_CONFIG.PERSISTENT_KEY);

    if (persistentData) {
      try {
        const data = JSON.parse(persistentData);

        if (data.expiresAt && Date.now() < data.expiresAt) {
          sessionStorage.setItem(SESSION_CONFIG.STORAGE_KEY, persistentData);
          return data;
        } else {
          localStorage.removeItem(SESSION_CONFIG.PERSISTENT_KEY);
          return null;
        }
      } catch (e) {
        console.warn('LocalStorage parse error:', e);
      }
    }

    return null;
  };

  const clearSessionData = () => {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(SESSION_CONFIG.STORAGE_KEY);
    localStorage.removeItem(SESSION_CONFIG.PERSISTENT_KEY);
  };

  // ==========================================
  // AYARLARI BACKEND'DEN YÜKLE
  // ==========================================

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/settings');
      const data = await response.json();

      if (data.success && data.data) {
        setSettings(data.data);
        setCurrentUserData(data.data);

        // Session'a kaydet
        saveSessionData(data.data);

        if (data.data.logoUrl) {
          setLogoPreviewUrl(data.data.logoUrl);
        }

        // Koordinatları ayarla
        if (data.data.latitude && data.data.longitude) {
          const lat = parseFloat(data.data.latitude);
          const lng = parseFloat(data.data.longitude);
          if (!isNaN(lat) && !isNaN(lng)) {
            setMapCoordinates({ lat, lng });
          }
        }

        // Sözleşme kalan gün kontrolü
        if (data.data.contract.remainingDays < 10) {
          showToast('Sözleşme süreniz yakında dolacak!', 'warning');
        }
      } else {
        showToast(data.error || 'Ayarlar yüklenemedi', 'error');
      }
    } catch (error) {
      console.error('Settings load error:', error);
      showToast('Ayarlar yüklenirken bir hata oluştu', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // AUTH VE YETKİ KONTROLÜ
  // ==========================================

  useEffect(() => {
    if (status === 'unauthenticated') {
      return;
    }

    if (status === 'authenticated') {
      const userRole = (session.user as any)?.role;

      if (userRole !== 'Müşteri' && userRole !== 'Admin') {
        showToast(
          'Bu alan sadece müşterilerimize özeldir. Lütfen bizimle iletişime geçiniz.',
          'error'
        );
        setTimeout(() => router.push('/dashboard'), 2000);
        return;
      }

      if (!hasLoadedSettings.current) {
        hasLoadedSettings.current = true;
        loadSettings();
      }
    }
  }, [status, session, router]);

  // ==========================================
  // CHATBOT WIDGET
  // ==========================================

  useEffect(() => {
    if (status === 'authenticated' && currentUserData && !isChatbotLoaded) {
      addChatbotWidget();
      setIsChatbotLoaded(true);
    }
  }, [status, currentUserData, isChatbotLoaded]);

  const addChatbotWidget = () => {
    if (typeof window === 'undefined') return;
    if (document.getElementById('fokus999-chatbot-widget')) return;

    const chatbotHTML = `
      <div id="fokus999-chatbot-widget" style="
        position: fixed;
        bottom: 22px;
        right: 22px;
        font-family: Arial, sans-serif;
        z-index: 9999;
        user-select: none;
      ">
        <style>
          #chatbot-icon {
            border-radius: 12px;
            padding: 4px;
            width: 85px;
            height: 85px;
            text-align: center;
            background: rgb(214,214,214);
            cursor: pointer;
            box-shadow: 0 6px 12px rgba(0,0,0,0.15);
            transition: transform 0.3s ease;
          }
          #chatbot-icon:hover { transform: scale(1.15); }
          #chatbot-icon img {
            width: 60px;
            height: 60px;
            display: block;
            margin: 0 auto;
          }
          #chatbot-icon .description {
            font-size: 10px;
            font-weight: bold;
            color: #666;
            margin-top: 3px;
            text-transform: capitalize;
          }
          #iframe-container {
            position: relative;
            display: none;
            margin-top: 6px;
            width: 350px;
            height: 550px;
            border-radius: 12px;
            overflow: hidden;
          }
          #chatbot-close-btn {
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(0,0,0,0.5);
            border: none;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
            z-index: 10000;
            transition: background 0.3s ease;
          }
          #chatbot-close-btn:hover { background: rgba(0,0,0,0.8); }
          #chatbot-iframe {
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 12px;
            display: block;
          }
        </style>

        <div id="chatbot-icon" title="Chatbot'u aç">
          <img src="https://static.fokusistatistik.com/resimler/fokus999iconkare.png" alt="FOKUS999" />
          <div class="description">Teknik Destek</div>
        </div>

        <div id="iframe-container">
          <button id="chatbot-close-btn" title="Kapat">×</button>
          <iframe id="chatbot-iframe" src="https://asistan.fokusistatistik.com/teknikdestek.html"></iframe>
        </div>
      </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = chatbotHTML;
    document.body.appendChild(div);

    const icon = document.getElementById('chatbot-icon');
    const iframeContainer = document.getElementById('iframe-container');
    const closeBtn = document.getElementById('chatbot-close-btn');

    icon?.addEventListener('click', () => {
      if (iframeContainer) iframeContainer.style.display = 'block';
      if (icon) icon.style.display = 'none';
    });

    closeBtn?.addEventListener('click', () => {
      if (iframeContainer) iframeContainer.style.display = 'none';
      if (icon) icon.style.display = 'block';
    });

    // Session data message listener
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'GET_SESSION_DATA') {
        const sessionData = loadSessionData();
        const formData = {
          musteriID: currentUserData?.customerProcessId || currentUserData?.customerId || '',
          authorizedPersonName: currentUserData?.authorizedPersonName || ''
        };

        event.source?.postMessage({
          type: 'SESSION_DATA_RESPONSE',
          sessionData,
          formData
        }, '*' as any);
      }
    });
  };

  // ==========================================
  // LOGO YÜKLEME
  // ==========================================

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      showToast('Sadece PNG, JPG ve JPEG formatları desteklenmektedir.', 'error');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      showToast('Dosya boyutu 5MB\'dan küçük olmalıdır.', 'error');
      return;
    }

    setLogoFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const resizeImage = (file: File, maxSize = 2000, quality = 0.8): Promise<Blob> => {
    return new Promise((resolve) => {
      if (file.type === 'image/png') {
        resolve(file);
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        const { width, height } = img;
        let newWidth = width;
        let newHeight = height;

        if (width > height) {
          if (width > maxSize) {
            newWidth = maxSize;
            newHeight = (height * maxSize) / width;
          }
        } else {
          if (height > maxSize) {
            newHeight = maxSize;
            newWidth = (width * maxSize) / height;
          }
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        if (ctx) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, newWidth, newHeight);
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
        }

        canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', quality);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleLogoUpload = async () => {
    if (!logoFile || !currentUserData) return;

    const customerProcessId = currentUserData.customerProcessId || currentUserData.customerId;
    if (!customerProcessId) {
      showToast('Müşteri bilgisi bulunamadı. Lütfen giriş yapın.', 'error');
      return;
    }

    try {
      setIsUploadingLogo(true);

      const resizedLogo = await resizeImage(logoFile);

      const formData = new FormData();
      formData.append('photo', resizedLogo, 'company-logo.jpg');
      formData.append('photoType', 'kurumsallogo');
      formData.append('musteriID', customerProcessId);
      formData.append('adSoyad', currentUserData.companyName || '');
      formData.append('telNo', currentUserData.phone || '');
      formData.append('email', currentUserData.email || '');
      formData.append('leadKaynak', 'FOKUS_SETTINGS');
      formData.append('guncellemeTarihi', new Date().toLocaleString('tr-TR'));

      const response = await fetch('https://n8n.fokusistatistik.com/webhook/fokusfotografkaydet', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();

        if (result && result.logoUrl) {
          setSettings(prev => prev ? { ...prev, logoUrl: result.logoUrl } : null);
          setCurrentUserData((prev: any) => ({ ...prev, logoUrl: result.logoUrl }));
          saveSessionData({ ...currentUserData, logoUrl: result.logoUrl });
        }

        setLogoFile(null);
        showToast('Logo başarıyla yüklendi!', 'success');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error: any) {
      console.error('Logo upload error:', error);
      showToast(error.message || 'Logo yüklenirken hata oluştu', 'error');
    } finally {
      setIsUploadingLogo(false);
    }
  };

  // ==========================================
  // FORM KAYDETME
  // ==========================================

  const collectWorkingHours = () => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const workingHours: any = {};

    days.forEach(day => {
      const startEl = document.getElementById(`${day}Start`) as HTMLSelectElement;
      const endEl = document.getElementById(`${day}End`) as HTMLSelectElement;
      const offEl = document.getElementById(`${day}Off`) as HTMLInputElement;

      workingHours[day] = {
        start: startEl?.value || '09:00',
        end: endEl?.value || '18:00',
        off: offEl?.checked || false
      };
    });

    return workingHours;
  };

  const formatWorkingHours = (workingHour: any) => {
    if (!workingHour || workingHour.off) {
      return 'Kapalı';
    }
    return `${workingHour.start}-${workingHour.end}`;
  };

  const saveSettings = async () => {
    if (!currentUserData) return;

    const sector = (document.getElementById('sector') as HTMLSelectElement)?.value;
    if (!sector) {
      showToast('Sektör seçimi zorunludur!', 'error');
      document.getElementById('sector')?.focus();
      return;
    }

    if (!confirm('Ayarları kaydetmek istediğinizden emin misiniz?')) return;

    try {
      setIsSaving(true);

      const getValue = (id: string) => (document.getElementById(id) as HTMLInputElement)?.value || '';
      const getChecked = (id: string) => (document.getElementById(id) as HTMLInputElement)?.checked || false;
      const getRadioValue = (name: string) => {
        const el = document.querySelector(`input[name="${name}"]:checked`) as HTMLInputElement;
        return el ? el.value : '';
      };

      const workingHours = collectWorkingHours();

      const webhookData = {
        'savetype': 'global',
        'MÜŞTERİ İŞLEM ID': currentUserData.customerProcessId || currentUserData.customerId,
        'MÜŞTERİ ID': currentUserData.customerId,
        'KURUM ADI': currentUserData.companyName,
        'Kurum Resmi - Fatura Adı': currentUserData.companyOfficialName,
        'YETKİLİ KİŞİ ADI': currentUserData.authorizedPersonName,
        'VERGİ NO': currentUserData.taxNumber,
        'TELEFON': currentUserData.phone,
        'E-POSTA': currentUserData.email,
        'WEB SİTESİ': getValue('website'),
        'ADRES': getValue('address'),
        'SEKTÖR': getValue('sector'),
        'ŞİRKET ÇALIŞAN SAYISI': getValue('employeeCount'),
        'KURUMSAL TEMEL BİLGİLER PARAGRAFI': getValue('companyInfo'),
        'ŞİRKET LOGO URL': getValue('logoUrl'),
        'STATİK KAYNAK': getValue('staticResourceUrl'),
        'Varsayılan İşlem Süresi (DK)': getValue('defaultProcessTime'),
        'Kurumsal Slogan': getValue('companySlogan'),
        'Kurumsal Renk': getValue('companyColor'),
        'kurum antet bilgileri': getValue('companyHeader'),
        'ENLEM': getValue('latitude'),
        'BOYLAM': getValue('longitude'),

        'GOOGLE DRİVE ID': getValue('googleDriveId'),
        'Google Drive Client ID': getValue('googleDriveClientId'),
        'Google Drive Client Secret': getValue('googleDriveClientSecret'),
        'GOOGLE TAKVİM ID': getValue('googleCalendarId'),
        'Google Takvim Client ID': getValue('googleCalendarClientId'),
        'Google Takvim Client Secret': getValue('googleCalendarClientSecret'),

        'epostagonderim_adresi': getValue('emailSender'),
        'eposta_platform': getValue('emailPlatform'),
        'e_posta_api_kod': getValue('emailApiCode'),
        'e_posta_api_link': getValue('emailApiLink'),
        'e_posta_ekbilgi': getValue('emailExtraInfo'),

        'Instagram Adresi / Username': getValue('instagramUsername'),
        'Instagram Business User ID': getValue('instagramBusinessUserId'),
        'WhatsApp Business Phone Number': getValue('whatsappPhoneNumber'),
        'WhatsApp Business Phone ID': getValue('whatsappPhoneId'),
        'WhatsApp Business API Token': getValue('whatsappApiToken'),
        'Meta App ID': getValue('metaAppId'),
        'Meta App Secret': getValue('metaAppSecret'),
        'Meta Business Manager ID': getValue('metaBusinessManagerId'),
        'Meta Access Token': getValue('metaAccessToken'),
        'SMS API SAĞLAYICISI': getValue('smsProvider'),
        'SMS API Kullanıcı Adı': getValue('smsApiUsername'),
        'SMS API Token': getValue('smsApiToken'),
        'SMS Başlık (Header)': getValue('smsHeader'),
        'Telegram Chat ID': getValue('telegramChatId'),
        'Telegram Bot Token': getValue('telegramBotToken'),

        'E-posta Bildirimleri - GENEL': getChecked('emailNotifGeneral'),
        'E-posta Bildirimleri - ACİL': getChecked('emailNotifUrgent'),
        'SMS Bildirimleri - GENEL': getChecked('smsNotifGeneral'),
        'SMS Bildirimleri - ÖZEL': getChecked('smsNotifSpecial'),
        'WhatsApp Bildirimleri - GENEL': getChecked('whatsappNotifGeneral'),
        'WhatsApp Bildirimleri - ÖZEL': getChecked('whatsappNotifSpecial'),
        'Telegram Bildirimleri - GENEL': getChecked('telegramNotifGeneral'),
        'Telegram Bildirimleri - ÖZEL': getChecked('telegramNotifSpecial'),

        'RESMİ TATİL MÜSAİTLİK': getRadioValue('holidayStatus'),
        'ÇALIŞMA SAATLERİ - PAZARTESİ': formatWorkingHours(workingHours.monday),
        'ÇALIŞMA SAATLERİ - SALI': formatWorkingHours(workingHours.tuesday),
        'ÇALIŞMA SAATLERİ - ÇARŞAMBA': formatWorkingHours(workingHours.wednesday),
        'ÇALIŞMA SAATLERİ - PERŞEMBE': formatWorkingHours(workingHours.thursday),
        'ÇALIŞMA SAATLERİ - CUMA': formatWorkingHours(workingHours.friday),
        'ÇALIŞMA SAATLERİ - CUMARTESİ': formatWorkingHours(workingHours.saturday),
        'ÇALIŞMA SAATLERİ - PAZAR': formatWorkingHours(workingHours.sunday),

        'YEDEKLEME': getRadioValue('backupFrequency'),

        'DÜZELTİLME NOTLARI': getValue('editRequestNotes'),
        'ACİL DESTEK': getChecked('emergencySupport'),
        'ACİL DESTEK DETAYI': getValue('emergencyText'),
        'CRM URL': getValue('crmUrl'),

        'timestamp': new Date().toISOString()
      };

      const response = await fetch('https://n8n.fokusistatistik.com/webhook/settingsglobalsave', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookData)
      });

      const result = await response.json();

      if (result.success) {
        showToast('Ayarlar başarıyla kaydedildi!', 'success');
      } else {
        showToast(result.message || 'Kaydetme sırasında hata oluştu!', 'error');
      }

    } catch (error) {
      console.error('Save error:', error);
      showToast('Bağlantı hatası! Ayarlar kaydedilemedi.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // ==========================================
  // PAKET FONKSİYONLARI
  // ==========================================

  const openAssistantSettings = async (focusCode: string) => {
    const customerProcessId = currentUserData?.customerProcessId || currentUserData?.customerId;
    if (!customerProcessId) {
      showToast('Müşteri bilgisi bulunamadı. Lütfen tekrar giriş yapın.', 'error');
      return;
    }

    const data = {
      'KAYIT DETAYI': 'ASSISTANT_SETTINGS_REQUEST',
      'MÜŞTERİ İŞLEM ID': customerProcessId,
      'FOKUS KODU': focusCode,
      'BUTON ID': `fokus${focusCode}settings`,
      'İŞLEM TİPİ': 'AYARLAR_AC',
      'timestamp': new Date().toISOString()
    };

    try {
      const response = await fetch('https://n8n.fokusistatistik.com/webhook/settingsasistants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Webhook çağrısı başarısız');

      const result = await response.json();
      const sessionData = Array.isArray(result) && result.length === 1 ? result[0] : result;

      const storageKey = `assistantSettings_${customerProcessId}_${focusCode}`;
      sessionStorage.setItem(storageKey, JSON.stringify(sessionData));

      const basePath = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
      const newUrl = new URL('settingsasistants.html', basePath);
      newUrl.searchParams.set('dataKey', storageKey);

      window.open(newUrl.toString(), '_blank');

    } catch (error) {
      console.error('Asistan ayarları açma hatası:', error);
      showToast('Asistan ayarları açılırken hata oluştu.', 'error');
    }
  };

  const openKurumsalSettings = async () => {
    const customerProcessId = currentUserData?.customerProcessId || currentUserData?.customerId;
    if (!customerProcessId) {
      showToast('Müşteri bilgisi bulunamadı. Lütfen tekrar giriş yapın.', 'error');
      return;
    }

    const data = {
      'KAYIT DETAYI': 'ASSISTANT_SETTINGS_REQUEST',
      'MÜŞTERİ İŞLEM ID': customerProcessId,
      'FOKUS KODU': 'kurumsal',
      'BUTON ID': 'kurumsal-settings',
      'İŞLEM TİPİ': 'AYARLAR_AC',
      'timestamp': new Date().toISOString()
    };

    try {
      const response = await fetch('https://n8n.fokusistatistik.com/webhook/settingsasistants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Webhook çağrısı başarısız');

      const result = await response.json();
      const sessionData = Array.isArray(result) && result.length === 1 ? result[0] : result;

      const storageKey = `assistantSettings_${customerProcessId}_kurumsal`;
      sessionStorage.setItem(storageKey, JSON.stringify(sessionData));

      const basePath = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
      const newUrl = new URL('Kurumsal.html', basePath);
      newUrl.searchParams.set('dataKey', storageKey);

      window.open(newUrl.toString(), '_blank');

    } catch (error) {
      console.error('Kurumsal ayarları açma hatası:', error);
      showToast('Kurumsal ayarları açılırken hata oluştu.', 'error');
    }
  };

  const requestPackage = async (focusCode: string) => {
    try {
      const webhookData = {
        'KAYIT DETAYI': 'ASSISTANT_PACKAGE_REQUEST',
        'MÜŞTERİ İŞLEM ID': currentUserData?.customerProcessId || currentUserData?.customerId,
        'FOKUS KODU': focusCode,
        'BUTON ID': `fokus${focusCode}talepet`,
        'İŞLEM TİPİ': 'TALEP_ET',
        'timestamp': new Date().toISOString()
      };

      const response = await fetch('https://n8n.fokusistatistik.com/webhook/settingsasistants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookData)
      });

      const result = await response.json();

      if (result.success) {
        showToast(`FOKUS${focusCode} paketi talep edildi. Size kısa süre içinde ulaşılacak.`, 'success');
      } else {
        showToast('Talep kaydedilemedi. Lütfen tekrar deneyiniz.', 'error');
      }
    } catch (error) {
      console.error('Request package error:', error);
      showToast('Bağlantı hatası oluştu!', 'error');
    }
  };

  const upgradePackage = async (focusCode: string) => {
    try {
      const webhookData = {
        'KAYIT DETAYI': 'ASSISTANT_PACKAGE_UPGRADE',
        'MÜŞTERİ İŞLEM ID': currentUserData?.customerProcessId || currentUserData?.customerId,
        'FOKUS KODU': focusCode,
        'BUTON ID': `fokus${focusCode}yukselt`,
        'İŞLEM TİPİ': 'PLAN_YUKSELT',
        'timestamp': new Date().toISOString()
      };

      const response = await fetch('https://n8n.fokusistatistik.com/webhook/settingsasistants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookData)
      });

      const result = await response.json();

      if (result.success) {
        showToast(`FOKUS${focusCode} planı yükseltme talebi kaydedildi. Size ulaşılacak.`, 'success');
      } else {
        showToast('Yükseltme talebi kaydedilemedi. Lütfen tekrar deneyiniz.', 'error');
      }
    } catch (error) {
      console.error('Upgrade package error:', error);
      showToast('Bağlantı hatası oluştu!', 'error');
    }
  };

  // ==========================================
  // YARDIMCI FONKSİYONLAR
  // ==========================================

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

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/ayarlar' });
  };

  const handleLogout = () => {
    clearSessionData();
    setCurrentUserData(null);
    signOut({ callbackUrl: '/' });
  };

  const updateColorDemo = () => {
    const colorInput = document.getElementById('companyColor') as HTMLInputElement;
    const colorDemo = document.getElementById('colorDemo');
    if (colorInput && colorDemo) {
      colorDemo.style.backgroundColor = colorInput.value;
    }
  };

  const toggleDayInputs = (day: string, isClosed: boolean) => {
    const startSelect = document.getElementById(`${day}Start`) as HTMLSelectElement;
    const endSelect = document.getElementById(`${day}End`) as HTMLSelectElement;
    if (startSelect) startSelect.disabled = isClosed;
    if (endSelect) endSelect.disabled = isClosed;
  };

  const toggleEmergencyInput = () => {
    const checkbox = document.getElementById('emergencySupport') as HTMLInputElement;
    const detailsDiv = document.getElementById('emergencyDetails');
    if (detailsDiv) {
      if (checkbox?.checked) {
        detailsDiv.classList.remove('hidden');
      } else {
        detailsDiv.classList.add('hidden');
      }
    }
  };

  const showSectorWarning = () => {
    const sector = (document.getElementById('sector') as HTMLSelectElement)?.value;
    if (sector === 'Diğer') {
      showToast('Sektörünüz için özel ayar gerekebilir. Destek ekibimizle iletişime geçebilirsiniz.', 'info');
    }
  };

  const getCurrentLocation = () => {
    if (typeof window === 'undefined') return;
    if (!('geolocation' in navigator)) {
      showToast('Tarayıcınız konum özelliğini desteklemiyor.', 'error');
      return;
    }

    showToast('Konum alınıyor...', 'info');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const latInput = document.getElementById('latitude') as HTMLInputElement;
        const lonInput = document.getElementById('longitude') as HTMLInputElement;
        if (latInput) latInput.value = lat.toFixed(6);
        if (lonInput) lonInput.value = lng.toFixed(6);

        setMapCoordinates({ lat, lng });
        showToast('Konum başarıyla alındı!', 'success');
      },
      (error) => {
        showToast('Konum alınamadı. Lütfen tarayıcı izinlerini kontrol ediniz.', 'error');
      }
    );
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = h.toString().padStart(2, '0');
        const minute = m.toString().padStart(2, '0');
        options.push(`${hour}:${minute}`);
      }
    }
    return options;
  };

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (status === 'loading' || isLoading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  // ==========================================
  // NOT AUTHENTICATED - LOGIN
  // ==========================================

  if (status === 'unauthenticated') {
    return (
      <>
        <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/toastify-js" strategy="afterInteractive" />

        <div className="login-container" id="loginPage">
          <div className="login-form">
            <img
              src="https://static.fokusistatistik.com/resimler/bannerkck.jpg"
              alt="FOKUS Banner"
              className="login-logo"
            />

            <div className="login-title">Kurumsal ve FOKUS Asistan Ayarları Girişi</div>

            <div className="login-security-notice">
              <p className="login-security-notice-text">
                Kurumsal güvenlik için sistemimize sadece <strong>Google onayı</strong> ile
                girilmektedir. Kullanıcı girişinde yaşanacak problemler için web sitemizden destek
                alabilirsiniz.
              </p>
            </div>

            <button
              id="manual-google-btn"
              className="custom-login-google-btn"
              onClick={handleGoogleSignIn}
            >
              <img
                src="https://static.fokusistatistik.com/logolar/google.png"
                alt="Google"
                width="30"
                height="30"
              />
              Google ile Giriş Yap
            </button>

            <div id="login-status" className="login-status" style={{ display: 'none' }}></div>

            <div className="footer-links">
              <a href="https://www.fokusistatistik.com" target="_blank" rel="noopener noreferrer">
                www.fokusistatistik.com
              </a>
              <a href="https://asistan.fokusistatistik.com/" target="_blank" rel="noopener noreferrer">
                asistan.fokusistatistik.com
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ==========================================
  // AUTHENTICATED - SETTINGS
  // ==========================================

  if (!settings) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  const timeOptions = generateTimeOptions();

  // Devam edecek... (Part 2'de settings render)
  return null;
}
