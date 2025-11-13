'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CustomerSettings } from '@/types/settings';
import Script from 'next/script';
import './styles.css';

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<CustomerSettings | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string>('');
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  // Auth ve yetki kontrolü
  useEffect(() => {
    if (status === 'unauthenticated') {
      // Not logged in
      return;
    }

    if (status === 'authenticated') {
      const userRole = (session.user as any)?.role;

      // Role kontrolü - sadece Müşteri veya Admin
      if (userRole !== 'Müşteri' && userRole !== 'Admin') {
        showToast(
          'Bu alan sadece müşterilerimize özeldir. Lütfen bizimle iletişime geçiniz.',
          'error'
        );
        setTimeout(() => router.push('/dashboard'), 2000);
        return;
      }

      // Ayarları yükle
      loadSettings();
    }
  }, [status, session, router]);

  // Ayarları backend'den yükle
  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/settings');
      const data = await response.json();

      if (data.success && data.data) {
        setSettings(data.data);
        if (data.data.logoUrl) {
          setLogoPreviewUrl(data.data.logoUrl);
        }

        // Sözleşme kalan gün kontrolü
        if (data.data.contract.remainingDays < 10) {
          const banner = document.getElementById('warningBanner');
          if (banner) banner.classList.remove('hidden');
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

  // Logo dosya seçimi
  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Dosya tipi kontrolü
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      showToast('Sadece PNG, JPG ve JPEG formatları desteklenmektedir.', 'error');
      return;
    }

    // Dosya boyutu kontrolü (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      showToast('Dosya boyutu 5MB\'dan küçük olmalıdır.', 'error');
      return;
    }

    setLogoFile(file);

    // Preview oluştur
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload butonunu göster
    const uploadBtn = document.getElementById('logoUploadButton');
    if (uploadBtn) {
      uploadBtn.style.display = 'block';
      (uploadBtn as HTMLButtonElement).disabled = false;
    }
  };

  // Logo yükleme
  const handleLogoUpload = async () => {
    if (!logoFile) return;

    try {
      setIsUploadingLogo(true);
      const statusEl = document.getElementById('logoStatus');
      if (statusEl) {
        statusEl.textContent = 'Logo yükleniyor...';
        statusEl.className = 'logo-status loading';
        statusEl.style.display = 'block';
      }

      const formData = new FormData();
      formData.append('logo', logoFile);

      const response = await fetch('/api/settings/logo', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.logoUrl) {
        setSettings(prev => prev ? { ...prev, logoUrl: data.logoUrl } : null);
        setLogoFile(null);

        if (statusEl) {
          statusEl.textContent = 'Logo başarıyla yüklendi!';
          statusEl.className = 'logo-status success';
        }
        showToast('Logo başarıyla yüklendi!', 'success');

        // Upload butonunu gizle
        const uploadBtn = document.getElementById('logoUploadButton');
        if (uploadBtn) uploadBtn.style.display = 'none';
      } else {
        throw new Error(data.error || 'Logo yüklenemedi');
      }
    } catch (error: any) {
      console.error('Logo upload error:', error);
      const statusEl = document.getElementById('logoStatus');
      if (statusEl) {
        statusEl.textContent = error.message || 'Logo yüklenirken hata oluştu';
        statusEl.className = 'logo-status error';
      }
      showToast(error.message || 'Logo yüklenirken hata oluştu', 'error');
    } finally {
      setIsUploadingLogo(false);
    }
  };

  // Ayarları kaydet
  const saveSettings = async () => {
    if (!settings) return;

    try {
      setIsSaving(true);

      // Form verilerini topla
      const formData = { ...settings };

      // Update from form inputs
      const getValue = (id: string) => (document.getElementById(id) as HTMLInputElement)?.value || '';
      const getChecked = (id: string) => (document.getElementById(id) as HTMLInputElement)?.checked || false;

      formData.website = getValue('website');
      formData.address = getValue('address');
      formData.sector = getValue('sector');
      formData.employeeCount = getValue('employeeCount');
      formData.defaultProcessTime = getValue('defaultProcessTime');
      formData.companySlogan = getValue('companySlogan');
      formData.companyInfo = getValue('companyInfo');
      formData.companyHeader = getValue('companyHeader');
      formData.companyColor = getValue('companyColor');
      formData.latitude = getValue('latitude');
      formData.longitude = getValue('longitude');

      // API Integrations
      formData.integrations.googleDrive.id = getValue('googleDriveId');
      formData.integrations.googleDrive.clientId = getValue('googleDriveClientId');
      formData.integrations.googleDrive.clientSecret = getValue('googleDriveClientSecret');
      formData.integrations.googleCalendar.id = getValue('googleCalendarId');
      formData.integrations.googleCalendar.clientId = getValue('googleCalendarClientId');
      formData.integrations.googleCalendar.clientSecret = getValue('googleCalendarClientSecret');
      formData.integrations.email.sender = getValue('emailSender');
      formData.integrations.email.platform = getValue('emailPlatform');
      formData.integrations.email.apiCode = getValue('emailApiCode');
      formData.integrations.email.apiLink = getValue('emailApiLink');
      formData.integrations.email.extraInfo = getValue('emailExtraInfo');
      formData.integrations.instagram.username = getValue('instagramUsername');
      formData.integrations.instagram.businessUserId = getValue('instagramBusinessUserId');
      formData.integrations.whatsapp.phoneNumber = getValue('whatsappPhoneNumber');
      formData.integrations.whatsapp.phoneId = getValue('whatsappPhoneId');
      formData.integrations.whatsapp.apiToken = getValue('whatsappApiToken');
      formData.integrations.meta.appId = getValue('metaAppId');
      formData.integrations.meta.appSecret = getValue('metaAppSecret');
      formData.integrations.meta.businessManagerId = getValue('metaBusinessManagerId');
      formData.integrations.meta.accessToken = getValue('metaAccessToken');
      formData.integrations.sms.provider = getValue('smsProvider');
      formData.integrations.sms.username = getValue('smsApiUsername');
      formData.integrations.sms.apiToken = getValue('smsApiToken');
      formData.integrations.sms.header = getValue('smsHeader');
      formData.integrations.telegram.chatId = getValue('telegramChatId');
      formData.integrations.telegram.botToken = getValue('telegramBotToken');

      // Notifications
      formData.notifications.email.general = getChecked('emailNotifGeneral');
      formData.notifications.email.urgent = getChecked('emailNotifUrgent');
      formData.notifications.sms.general = getChecked('smsNotifGeneral');
      formData.notifications.sms.special = getChecked('smsNotifSpecial');
      formData.notifications.whatsapp.general = getChecked('whatsappNotifGeneral');
      formData.notifications.whatsapp.special = getChecked('whatsappNotifSpecial');
      formData.notifications.telegram.general = getChecked('telegramNotifGeneral');
      formData.notifications.telegram.special = getChecked('telegramNotifSpecial');

      // Working hours
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      days.forEach(day => {
        const dayKey = day as keyof typeof formData.workingHours;
        formData.workingHours[dayKey] = {
          start: getValue(`${day}Start`),
          end: getValue(`${day}End`),
          closed: getChecked(`${day}Off`),
        };
      });

      // Holiday status
      const holidayStatus = document.querySelector('input[name="holidayStatus"]:checked') as HTMLInputElement;
      formData.holidayStatus = (holidayStatus?.value || 'Kapalı') as 'Kapalı' | 'Açık';

      // Backup frequency
      const backupFreq = document.querySelector('input[name="backupFrequency"]:checked') as HTMLInputElement;
      formData.backupFrequency = (backupFreq?.value || 'Haftalık') as 'Haftalık' | 'Günlük';

      // Emergency support
      formData.emergencySupport = getChecked('emergencySupport');
      formData.emergencyText = getValue('emergencyText');

      // Edit request notes
      formData.editRequestNotes = getValue('editRequestNotes');

      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        showToast('Ayarlarınız başarıyla kaydedildi!', 'success');
        setSettings(formData);
      } else {
        throw new Error(data.error || 'Ayarlar kaydedilemedi');
      }
    } catch (error: any) {
      console.error('Save error:', error);
      showToast(error.message || 'Kaydetme sırasında hata oluştu', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Toast bildirimi
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    if (typeof window !== 'undefined' && (window as any).Toastify) {
      (window as any).Toastify({
        text: message,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
          background:
            type === 'success'
              ? 'linear-gradient(to right, #00b09b, #96c93d)'
              : type === 'error'
              ? 'linear-gradient(to right, #ff5f6d, #ffc371)'
              : 'linear-gradient(to right, #667eea, #764ba2)',
        },
      }).showToast();
    }
  };

  // Google login handler
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/ayarlar' });
  };

  // Logout handler
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  // Helper functions
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
    if ('geolocation' in navigator) {
      showToast('Konum alınıyor...', 'info');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latInput = document.getElementById('latitude') as HTMLInputElement;
          const lonInput = document.getElementById('longitude') as HTMLInputElement;
          if (latInput) latInput.value = position.coords.latitude.toFixed(6);
          if (lonInput) lonInput.value = position.coords.longitude.toFixed(6);
          showToast('Konum başarıyla alındı!', 'success');
        },
        (error) => {
          showToast('Konum alınamadı. Lütfen tarayıcı izinlerini kontrol ediniz.', 'error');
        }
      );
    } else {
      showToast('Tarayıcınız konum özelliğini desteklemiyor.', 'error');
    }
  };

  // Time options generator
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

  // Loading state
  if (status === 'loading' || isLoading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  // Not authenticated - show login
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

  // Authenticated - show settings
  if (!settings) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  const timeOptions = generateTimeOptions();

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/toastify-js" strategy="afterInteractive" />

      <div className="container" id="settingsPage">
        {/* Header */}
        <div className="header">
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Çıkış
          </button>
          <div className="header-logo"></div>
          <h1 className="welcome-title">Hoş Geldiniz, {session.user?.name}!</h1>
          <p className="welcome-subtitle">
            Kurumsal ayarlarınızı yönetebilir ve asistanlarınızı yapılandırabilirsiniz.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="warning-banner hidden" id="warningBanner">
          <i className="fas fa-exclamation-triangle"></i>
          <span>
            Sözleşme kalan gün sayınız 10&apos;dan az! Hizmetlerinizin aksamaması için lütfen yeni
            sözleşme için bizimle iletişime geçiniz.
          </span>
        </div>

        {/* Company Information - Compact */}
        <div className="settings-card compact">
          <h2 className="section-title compact">
            <i className="fas fa-building"></i>
            Kurum Bilgileri
          </h2>
          <div className="form-grid compact">
            <div className="form-group compact">
              <label>Müşteri İşlem ID</label>
              <input
                type="text"
                id="customerIdDisplay"
                className="form-control readonly"
                readOnly
                value={settings.customerId}
                autoComplete="off"
              />
            </div>
            <div className="form-group compact">
              <label>Kurum Adı (Görünen İsim)</label>
              <input
                type="text"
                id="companyName"
                className="form-control readonly"
                readOnly
                value={settings.companyName}
                autoComplete="off"
              />
            </div>
            <div className="form-group compact">
              <label>Kurum Resmi Adı (Fatura Adı)</label>
              <input
                type="text"
                id="companyOfficialName"
                className="form-control readonly"
                readOnly
                value={settings.companyOfficialName}
                autoComplete="off"
              />
            </div>
            <div className="form-group compact">
              <label>Vergi No</label>
              <input
                type="text"
                id="taxNumber"
                className="form-control readonly"
                readOnly
                value={settings.taxNumber}
                autoComplete="off"
              />
            </div>
            <div className="form-group compact">
              <label>Telefon</label>
              <input
                type="tel"
                id="phone"
                className="form-control readonly"
                readOnly
                value={settings.phone}
                autoComplete="off"
              />
            </div>
            <div className="form-group compact">
              <label>E-Posta</label>
              <input
                type="email"
                id="email"
                className="form-control readonly"
                readOnly
                value={settings.email}
                autoComplete="off"
              />
            </div>
            <div className="form-group compact">
              <label>Web Sitesi</label>
              <input
                type="url"
                id="website"
                className="form-control"
                placeholder="https://sirket.com"
                defaultValue={settings.website}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
            <div className="form-group full-width compact">
              <label>Adres</label>
              <textarea
                id="address"
                className="form-control"
                placeholder="Kurum adresi..."
                defaultValue={settings.address}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
          </div>
        </div>

        {/* Business Settings */}
        <div className="settings-card">
          <h2 className="section-title">
            <i className="fas fa-cogs"></i>
            İşletme Ayarları
          </h2>

          <div className="form-grid">
            <div className="form-group">
              <label>
                Yetkili Kişi Adı <span className="required">*</span>
              </label>
              <input
                type="text"
                id="authorizedPersonName"
                className="form-control readonly"
                readOnly
                value={settings.authorizedPersonName}
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label>
                Sektör <span className="required">*</span>
              </label>
              <select
                id="sector"
                className="form-control"
                onChange={showSectorWarning}
                defaultValue={settings.sector}
                autoComplete="off"
                data-form-type="other"
              >
                <option value="">Sektör Seçiniz</option>
                <option value="Finans & Bankacılık">Finans & Bankacılık</option>
                <option value="Sağlık & Tıbbi Hizmetler">Sağlık & Tıbbi Hizmetler</option>
                <option value="E-ticaret & Perakende">E-ticaret & Perakende</option>
                <option value="Eğitim & Danışmanlık">Eğitim & Danışmanlık</option>
                <option value="Güzellik ve Estetik">Güzellik ve Estetik</option>
                <option value="Muhasebe & Hukuk">Muhasebe & Hukuk</option>
                <option value="İdari İşler">İdari İşler</option>
                <option value="Emlak & İnşaat">Emlak & İnşaat</option>
                <option value="Teknoloji & Yazılım">Teknoloji & Yazılım</option>
                <option value="İmalat & Üretim">İmalat & Üretim</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
            <div className="form-group">
              <label>Şirket Çalışan Sayısı</label>
              <select
                id="employeeCount"
                className="form-control"
                defaultValue={settings.employeeCount}
                autoComplete="off"
                data-form-type="other"
              >
                <option value="">Seçiniz</option>
                <option value="1-9">1-9</option>
                <option value="10-49">10-49</option>
                <option value="50-249">50-249</option>
                <option value="250+">250+</option>
              </select>
            </div>
            <div className="form-group">
              <label>Varsayılan İşlem Süresi (DK)</label>
              <select
                id="defaultProcessTime"
                className="form-control"
                defaultValue={settings.defaultProcessTime}
                autoComplete="off"
                data-form-type="other"
              >
                <option value="">Seçiniz</option>
                <option value="15">15 Dakika</option>
                <option value="30">30 Dakika</option>
                <option value="60">60 Dakika</option>
                <option value="90">90 Dakika</option>
                <option value="120">120 Dakika</option>
              </select>
            </div>
            <div className="form-group">
              <label>Kurum Sloganı</label>
              <input
                type="text"
                id="companySlogan"
                className="form-control"
                placeholder="Kurumunuzun sloganı"
                maxLength={100}
                defaultValue={settings.companySlogan}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
          </div>

          <div className="business-settings-layout">
            <div className="business-left-section">
              <div className="form-grid">
                <div className="form-group">
                  <label>Statik Kaynak</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="text"
                      id="staticResourceUrl"
                      className="form-control readonly"
                      readOnly
                      placeholder="Statik Kaynak URL"
                      value={settings.staticResourceUrl}
                      autoComplete="off"
                    />
                    <a
                      href={settings.staticResourceUrl}
                      id="staticResourceDownload"
                      className="contract-download"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-edit"></i> Düzenle
                    </a>
                  </div>
                </div>

                <div className="form-group">
                  <label>CRM Verileri</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="text"
                      id="crmUrl"
                      className="form-control readonly"
                      readOnly
                      placeholder="CRM URL"
                      value={settings.crmUrl}
                      autoComplete="off"
                    />
                    <a
                      href={settings.crmUrl}
                      id="crmDownload"
                      className="contract-download"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-download"></i> İndir
                    </a>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Kurum Antet Bilgileri</label>
                <textarea
                  id="companyHeader"
                  className="form-control"
                  placeholder="Belgelerde çıkacak antet bilgileri..."
                  maxLength={250}
                  defaultValue={settings.companyHeader}
                  autoComplete="off"
                  data-form-type="other"
                />
              </div>

              <div className="form-group full-width" style={{ marginTop: '20px' }}>
                <label>Kurumsal Temel Bilgiler</label>
                <textarea
                  id="companyInfo"
                  className="form-control"
                  placeholder="Kurumunuz hakkında temel bilgiler..."
                  maxLength={500}
                  defaultValue={settings.companyInfo}
                  autoComplete="off"
                  data-form-type="other"
                />
              </div>
            </div>

            <div className="business-right-section">
              <div className="logo-upload-section">
                <label>Kurumsal Logo</label>
                <div className="logo-preview" id="logoPreview">
                  {logoPreviewUrl ? (
                    <img src={logoPreviewUrl} alt="Logo Preview" />
                  ) : (
                    <div className="logo-preview-placeholder">
                      <div>🏢</div>
                      <div>Logo yok</div>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  id="logoInput"
                  className="logo-input"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleLogoSelect}
                />
                <button
                  type="button"
                  className="logo-button"
                  onClick={() => document.getElementById('logoInput')?.click()}
                >
                  Logo Yükle
                </button>

                <button
                  type="button"
                  className="logo-upload-button"
                  id="logoUploadButton"
                  style={{ display: 'none', backgroundColor: '#107a13', fontWeight: 'bold' }}
                  disabled={isUploadingLogo}
                  onClick={handleLogoUpload}
                >
                  {isUploadingLogo ? 'Yükleniyor...' : 'Logoyu Kaydet'}
                </button>

                <div id="logoStatus" className="logo-status" style={{ display: 'none' }}></div>
              </div>

              <div className="form-group">
                <label>Kurumsal Renk (Koyu tonlar seçilmelidir)</label>
                <div className="color-picker-container">
                  <input
                    type="color"
                    id="companyColor"
                    className="color-input"
                    defaultValue={settings.companyColor}
                    onChange={updateColorDemo}
                    autoComplete="off"
                    data-form-type="other"
                  />
                  <div
                    className="color-demo"
                    id="colorDemo"
                    style={{ backgroundColor: settings.companyColor }}
                  >
                    <i className="fas fa-palette"></i>
                    Örnek Kurumsal Renk
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Settings */}
        <div className="settings-card">
          <h2 className="section-title">
            <i className="fas fa-map-marker-alt"></i>
            Konum Ayarları
          </h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Enlem</label>
              <input
                type="text"
                id="latitude"
                className="form-control"
                placeholder="40.222222"
                pattern="[0-9]+\.[0-9]+"
                defaultValue={settings.latitude}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
            <div className="form-group">
              <label>Boylam</label>
              <input
                type="text"
                id="longitude"
                className="form-control"
                placeholder="29.222222"
                pattern="[0-9]+\.[0-9]+"
                defaultValue={settings.longitude}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
            <div className="form-group full-width">
              <div className="coordinate-buttons">
                <button type="button" className="coord-btn" onClick={getCurrentLocation}>
                  <i className="fas fa-location-arrow"></i> Mevcut Konum
                </button>
              </div>
              <div className="map-container">
                <div id="map"></div>
              </div>
            </div>
          </div>
        </div>

        {/* API Integration Settings - Devam edecek... */}
        <div className="settings-card">
          <h2 className="section-title">
            <i className="fas fa-plug"></i>
            API Entegrasyonları ve İletişim
          </h2>
          <div className="form-grid">
            {/* Google Drive & Calendar */}
            <div className="form-group">
              <label>Google Drive ID</label>
              <input
                type="text"
                id="googleDriveId"
                className="form-control"
                placeholder="Google Drive ID"
                defaultValue={settings.integrations.googleDrive.id}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
            <div className="form-group">
              <label>Google Drive Client ID</label>
              <input
                type="text"
                id="googleDriveClientId"
                className="form-control"
                placeholder="Google Drive Client ID"
                defaultValue={settings.integrations.googleDrive.clientId}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
            <div className="form-group">
              <label>Google Drive Client Secret</label>
              <input
                type="text"
                id="googleDriveClientSecret"
                className="form-control"
                placeholder="Google Drive Client Secret"
                defaultValue={settings.integrations.googleDrive.clientSecret}
                autoComplete="off"
                data-form-type="other"
              />
            </div>

            <div className="form-group">
              <label>Google Takvim ID</label>
              <input
                type="text"
                id="googleCalendarId"
                className="form-control"
                placeholder="Google Takvim ID"
                defaultValue={settings.integrations.googleCalendar.id}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
            <div className="form-group">
              <label>Google Takvim Client ID</label>
              <input
                type="text"
                id="googleCalendarClientId"
                className="form-control"
                placeholder="Google Takvim Client ID"
                defaultValue={settings.integrations.googleCalendar.clientId}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
            <div className="form-group">
              <label>Google Takvim Client Secret</label>
              <input
                type="text"
                id="googleCalendarClientSecret"
                className="form-control"
                placeholder="Google Takvim Client Secret"
                defaultValue={settings.integrations.googleCalendar.clientSecret}
                autoComplete="off"
                data-form-type="other"
              />
            </div>

            {/* E-posta */}
            <div className="form-group">
              <label>E-posta Gönderim Adresi (Müşterilerle İletişim)</label>
              <input
                type="email"
                id="emailSender"
                className="form-control"
                placeholder="info@sirket.com"
                defaultValue={settings.integrations.email.sender}
                autoComplete="off"
                data-form-type="other"
              />
              <small style={{ color: '#666', fontSize: '12px' }}>
                Müşterilerle iletişim kurulacak ana e-posta adresi
              </small>
            </div>
            <div className="form-group">
              <label>E-posta Platformu</label>
              <select
                id="emailPlatform"
                className="form-control"
                defaultValue={settings.integrations.email.platform}
                autoComplete="off"
                data-form-type="other"
              >
                <option value="">Seçiniz</option>
                <option value="Gmail">Gmail (Önerilen)</option>
                <option value="Outlook">Outlook</option>
                <option value="Yahoo">Yahoo</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
            <div className="form-group">
              <label>E-posta API Kodu</label>
              <input
                type="text"
                id="emailApiCode"
                className="form-control"
                placeholder="E-posta API Kodu"
                defaultValue={settings.integrations.email.apiCode}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
            <div className="form-group">
              <label>E-posta API Link</label>
              <input
                type="url"
                id="emailApiLink"
                className="form-control"
                placeholder="https://api.emailprovider.com"
                defaultValue={settings.integrations.email.apiLink}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
            <div className="form-group full-width">
              <label>E-posta Ek Bilgileri</label>
              <textarea
                id="emailExtraInfo"
                className="form-control"
                placeholder="E-posta sistemi ile ilgili ek bilgiler..."
                defaultValue={settings.integrations.email.extraInfo}
                autoComplete="off"
                data-form-type="other"
              />
            </div>

            {/* Instagram */}
            <div className="form-group">
              <label>Instagram Adresi / Username</label>
              <input
                type="text"
                id="instagramUsername"
                className="form-control"
                placeholder="@sirketadi"
                defaultValue={settings.integrations.instagram.username}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
            <div className="form-group">
              <label>Instagram Business User ID</label>
              <input
                type="text"
                id="instagramBusinessUserId"
                className="form-control"
                placeholder="Instagram Business User ID"
                defaultValue={settings.integrations.instagram.businessUserId}
                autoComplete="off"
                data-form-type="other"
              />
            </div>

            {/* WhatsApp */}
            <div className="form-group">
              <label>WhatsApp Business Phone Number</label>
              <input
                type="text"
                id="whatsappPhoneNumber"
                className="form-control"
                placeholder="90 XXX XXX XX XX"
                defaultValue={settings.integrations.whatsapp.phoneNumber}
                autoComplete="off"
                data-form-type="other"
              />
              <small style={{ color: '#666', fontSize: '12px' }}>
                Uluslararası format (ülke kodu dahil)
              </small>
            </div>
            <div className="form-group">
              <label>WhatsApp Business Phone ID</label>
              <input
                type="text"
                id="whatsappPhoneId"
                className="form-control"
                placeholder="WhatsApp Business Phone ID"
                defaultValue={settings.integrations.whatsapp.phoneId}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
            <div className="form-group">
              <label>WhatsApp Business API Token</label>
              <input
                type="text"
                id="whatsappApiToken"
                className="form-control"
                placeholder="WhatsApp Business API Token"
                defaultValue={settings.integrations.whatsapp.apiToken}
                autoComplete="off"
                data-form-type="other"
              />
            </div>

            {/* Meta/Facebook */}
            <div className="form-group">
              <label>Meta App ID</label>
              <input
                type="text"
                id="metaAppId"
                className="form-control"
                placeholder="Meta Application ID"
                defaultValue={settings.integrations.meta.appId}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
            <div className="form-group">
              <label>Meta App Secret</label>
              <input
                type="text"
                id="metaAppSecret"
                className="form-control"
                placeholder="Meta Application Secret"
                defaultValue={settings.integrations.meta.appSecret}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
            <div className="form-group">
              <label>Meta Business Manager ID</label>
              <input
                type="text"
                id="metaBusinessManagerId"
                className="form-control"
                placeholder="Meta Business Manager ID"
                defaultValue={settings.integrations.meta.businessManagerId}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
            <div className="form-group">
              <label>Meta Access Token</label>
              <input
                type="text"
                id="metaAccessToken"
                className="form-control"
                placeholder="Meta Business Access Token"
                defaultValue={settings.integrations.meta.accessToken}
                autoComplete="off"
                data-form-type="other"
              />
            </div>

            {/* SMS */}
            <div className="form-group">
              <label>SMS API Sağlayıcısı</label>
              <select
                id="smsProvider"
                className="form-control"
                defaultValue={settings.integrations.sms.provider}
                autoComplete="off"
                data-form-type="other"
              >
                <option value="">Seçiniz</option>
                <option value="Turkcell">Turkcell</option>
                <option value="Vodafone">Vodafone</option>
                <option value="Türk Telekom">Türk Telekom</option>
                <option value="NetGSM">NetGSM</option>
                <option value="İletimerkezi">İletimerkezi</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
            <div className="form-group">
              <label>SMS API Kullanıcı Adı</label>
              <input
                type="text"
                id="smsApiUsername"
                className="form-control"
                placeholder="SMS API Kullanıcı Adı"
                defaultValue={settings.integrations.sms.username}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
            <div className="form-group">
              <label>SMS API Token</label>
              <input
                type="text"
                id="smsApiToken"
                className="form-control"
                placeholder="SMS API Token"
                defaultValue={settings.integrations.sms.apiToken}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
            <div className="form-group">
              <label>SMS Başlık (Header)</label>
              <input
                type="text"
                id="smsHeader"
                className="form-control"
                placeholder="SMS gönderen başlığı"
                maxLength={11}
                defaultValue={settings.integrations.sms.header}
                autoComplete="off"
                data-form-type="other"
              />
            </div>

            {/* Telegram */}
            <div className="form-group">
              <label>Telegram Chat ID</label>
              <input
                type="text"
                id="telegramChatId"
                className="form-control"
                placeholder="Telegram Chat ID"
                defaultValue={settings.integrations.telegram.chatId}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
            <div className="form-group">
              <label>Telegram Bot Token</label>
              <input
                type="text"
                id="telegramBotToken"
                className="form-control"
                placeholder="Telegram Bot Token"
                defaultValue={settings.integrations.telegram.botToken}
                autoComplete="off"
                data-form-type="other"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="settings-card">
          <h2 className="section-title">
            <i className="fas fa-bell"></i>
            Bildirim Tercihleri
          </h2>
          <div className="notification-note">
            <i className="fas fa-info-circle"></i>
            <strong>Bu bölüm müşterilerinize yapmak istediğiniz bildirim tercihlerinizi belirler.</strong>
            Hangi kanallardan müşterilerinize bildirim göndermek istediğinizi seçebilirsiniz.
          </div>
          <div className="notification-grid">
            <div className="notification-section">
              <h4>
                <i className="fas fa-envelope"></i> E-posta Bildirimleri
              </h4>
              <div className="checkbox-group-vertical">
                <div className="checkbox-item-small">
                  <input
                    type="checkbox"
                    id="emailNotifGeneral"
                    defaultChecked={settings.notifications.email.general}
                  />
                  <label htmlFor="emailNotifGeneral">Genel Bildirimler</label>
                </div>
                <div className="checkbox-item-small">
                  <input
                    type="checkbox"
                    id="emailNotifUrgent"
                    defaultChecked={settings.notifications.email.urgent}
                  />
                  <label htmlFor="emailNotifUrgent">Acil Bildirimler</label>
                </div>
              </div>
            </div>

            <div className="notification-section">
              <h4>
                <i className="fas fa-sms"></i> SMS Bildirimleri
              </h4>
              <div className="checkbox-group-vertical">
                <div className="checkbox-item-small">
                  <input
                    type="checkbox"
                    id="smsNotifGeneral"
                    defaultChecked={settings.notifications.sms.general}
                  />
                  <label htmlFor="smsNotifGeneral">Genel Bildirimler</label>
                </div>
                <div className="checkbox-item-small">
                  <input
                    type="checkbox"
                    id="smsNotifSpecial"
                    defaultChecked={settings.notifications.sms.special}
                  />
                  <label htmlFor="smsNotifSpecial">Özel Bildirimler</label>
                </div>
              </div>
              <small className="text-warning">
                <i className="fas fa-info-circle"></i> SMS paketi gereklidir
              </small>
            </div>

            <div className="notification-section">
              <h4>
                <i className="fab fa-whatsapp"></i> WhatsApp Bildirimleri
              </h4>
              <div className="checkbox-group-vertical">
                <div className="checkbox-item-small">
                  <input
                    type="checkbox"
                    id="whatsappNotifGeneral"
                    defaultChecked={settings.notifications.whatsapp.general}
                  />
                  <label htmlFor="whatsappNotifGeneral">Genel Bildirimler</label>
                </div>
                <div className="checkbox-item-small">
                  <input
                    type="checkbox"
                    id="whatsappNotifSpecial"
                    defaultChecked={settings.notifications.whatsapp.special}
                  />
                  <label htmlFor="whatsappNotifSpecial">Özel Bildirimler</label>
                </div>
              </div>
              <small className="text-warning">
                <i className="fas fa-info-circle"></i> WhatsApp Business API ücretlendirmesi olabilir
              </small>
            </div>

            <div className="notification-section">
              <h4>
                <i className="fab fa-telegram"></i> Telegram Bildirimleri
              </h4>
              <div className="checkbox-group-vertical">
                <div className="checkbox-item-small">
                  <input
                    type="checkbox"
                    id="telegramNotifGeneral"
                    defaultChecked={settings.notifications.telegram.general}
                  />
                  <label htmlFor="telegramNotifGeneral">Genel Bildirimler</label>
                </div>
                <div className="checkbox-item-small">
                  <input
                    type="checkbox"
                    id="telegramNotifSpecial"
                    defaultChecked={settings.notifications.telegram.special}
                  />
                  <label htmlFor="telegramNotifSpecial">Özel Bildirimler</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="settings-card">
          <h2 className="section-title">
            <i className="fas fa-clock"></i>
            Kurum Çalışma Saatleri
          </h2>

          <div className="holiday-settings">
            <h4>
              <i className="fas fa-calendar-alt"></i>
              Resmi Tatil Ayarları
            </h4>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  name="holidayStatus"
                  value="Kapalı"
                  id="holidayClosed"
                  defaultChecked={settings.holidayStatus === 'Kapalı'}
                />
                <label htmlFor="holidayClosed">
                  <i className="fas fa-times-circle"></i>
                  Resmi Tatillerde Kapalı
                </label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  name="holidayStatus"
                  value="Açık"
                  id="holidayOpen"
                  defaultChecked={settings.holidayStatus === 'Açık'}
                />
                <label htmlFor="holidayOpen">
                  <i className="fas fa-check-circle"></i>
                  Resmi Tatillerde Açık
                </label>
              </div>
            </div>
          </div>

          <div className="working-hours-grid">
            {Object.entries(settings.workingHours).map(([day, hours]) => {
              const dayLabels: Record<string, string> = {
                monday: 'Pazartesi',
                tuesday: 'Salı',
                wednesday: 'Çarşamba',
                thursday: 'Perşembe',
                friday: 'Cuma',
                saturday: 'Cumartesi',
                sunday: 'Pazar',
              };

              return (
                <div key={day} className="day-schedule">
                  <label className="day-label">{dayLabels[day]}</label>
                  <div className="time-inputs">
                    <select
                      id={`${day}Start`}
                      className="form-control time-input"
                      defaultValue={hours.start}
                      disabled={hours.closed}
                    >
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <span>-</span>
                    <select
                      id={`${day}End`}
                      className="form-control time-input"
                      defaultValue={hours.end}
                      disabled={hours.closed}
                    >
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <div className="checkbox-item-small">
                      <input
                        type="checkbox"
                        id={`${day}Off`}
                        defaultChecked={hours.closed}
                        onChange={(e) => toggleDayInputs(day, e.target.checked)}
                      />
                      <label htmlFor={`${day}Off`}>Kapalı</label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security & Backup Settings */}
        <div className="settings-card">
          <h2 className="section-title">
            <i className="fas fa-shield-alt"></i>
            Güvenlik ve Yedekleme Ayarları
          </h2>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Veri Yedekleme Sıklığı</label>
              <div className="radio-group">
                <div className="radio-item">
                  <input
                    type="radio"
                    name="backupFrequency"
                    value="Haftalık"
                    id="backupWeekly"
                    defaultChecked={settings.backupFrequency === 'Haftalık'}
                  />
                  <label htmlFor="backupWeekly">
                    <i className="fas fa-calendar-week"></i>
                    Haftalık (Standart)
                  </label>
                </div>
                <div className="radio-item">
                  <input
                    type="radio"
                    name="backupFrequency"
                    value="Günlük"
                    id="backupDaily"
                    defaultChecked={settings.backupFrequency === 'Günlük'}
                  />
                  <label htmlFor="backupDaily">
                    <i className="fas fa-calendar-day"></i>
                    Günlük (Pro)
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contract Information */}
        <div className="settings-card">
          <h2 className="section-title">
            <i className="fas fa-file-contract"></i>
            Sözleşme Bilgileri
          </h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Sözleşme Başlangıcı</label>
              <input
                type="text"
                id="contractStart"
                className="form-control readonly"
                readOnly
                value={settings.contract.contractStart}
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label>İşlem Başlangıcı</label>
              <input
                type="text"
                id="processStart"
                className="form-control readonly"
                readOnly
                value={settings.contract.processStart}
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label>Sözleşme Kalan Gün</label>
              <input
                type="text"
                id="remainingDays"
                className="form-control readonly"
                readOnly
                value={settings.contract.remainingDays}
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label>Otomatik Yenileme</label>
              <input
                type="text"
                id="autoRenewal"
                className="form-control readonly"
                readOnly
                value={settings.contract.autoRenewal}
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label>Sözleşme Periyodu</label>
              <input
                type="text"
                id="period"
                className="form-control readonly"
                readOnly
                value={settings.contract.period}
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label>Sözleşme No</label>
              <input
                type="text"
                id="contractNumber"
                className="form-control readonly"
                readOnly
                value={settings.contract.contractNumber}
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label>Sözleşme Dosyası</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="text"
                  id="contractUrl"
                  className="form-control readonly"
                  readOnly
                  placeholder="Sözleşme URL"
                  value={settings.contract.contractUrl}
                  autoComplete="off"
                />
                {settings.contract.contractUrl && (
                  <a
                    href={settings.contract.contractUrl}
                    id="contractDownload"
                    className="contract-download"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-download"></i> İndir
                  </a>
                )}
              </div>
            </div>
            <div className="form-group full-width">
              <label>Ek Hizmetler</label>
              <textarea
                id="extraServices"
                className="form-control readonly"
                readOnly
                placeholder="Ek hizmetler..."
                value={settings.contract.extraServices}
                autoComplete="off"
              />
            </div>
          </div>
        </div>

        {/* Company Info Edit Request */}
        <div className="edit-request">
          <h3>
            <i className="fas fa-edit"></i>
            Temel Kurumsal Bilgilerinizin Değiştirilmesi
          </h3>
          <div className="form-group">
            <label>Düzeltme Notları</label>
            <textarea
              id="editRequestNotes"
              className="form-control"
              placeholder="Temel kurumsal bilgilerinizin (isim, telefon, e-posta vb.) değiştirilmesi için buraya not yazınız..."
              defaultValue={settings.editRequestNotes}
            />
          </div>
        </div>

        {/* Emergency Support */}
        <div className="emergency-support">
          <h3>
            <i className="fas fa-exclamation-circle"></i>
            Acil Teknik Destek
          </h3>
          <div className="emergency-checkbox">
            <input
              type="checkbox"
              id="emergencySupport"
              onChange={toggleEmergencyInput}
              defaultChecked={settings.emergencySupport}
            />
            <label htmlFor="emergencySupport">Acil teknik destek talep et</label>
          </div>
          <div className={`form-group ${settings.emergencySupport ? '' : 'hidden'}`} id="emergencyDetails">
            <label>Destek Detayları</label>
            <input
              type="text"
              id="emergencyText"
              className="form-control"
              placeholder="Sorunun detayını açıklayınız..."
              minLength={10}
              maxLength={100}
              defaultValue={settings.emergencyText}
            />
          </div>
          <div className="emergency-note">
            * FOKUS kaynaklı olmayan problemler için ücret talep edilebilir.
          </div>
        </div>

        {/* FOKUS Assistants Information */}
        <div className="settings-card" id="assistantsCard">
          <h2 className="section-title">
            <i className="fas fa-robot"></i>
            FOKUS Asistanları
          </h2>
          <div className="package-grid" id="packageGrid">
            {settings.packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`package-card ${pkg.status === 'active' ? 'active' : 'inactive'}`}
              >
                <div
                  className="package-icon"
                  style={{ backgroundImage: `url(${pkg.icon})` }}
                ></div>
                <div className="package-title">{pkg.title}</div>
                <div className="package-type">{pkg.type}</div>
                <div className="package-buttons">
                  {pkg.status === 'inactive' && (
                    <button className="upgrade-btn">Yükselt</button>
                  )}
                  {pkg.status === 'active' && (
                    <button className="settings-btn">Ayarlar</button>
                  )}
                  {pkg.status === 'inactive' && (
                    <button className="request-btn">Talep Et</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
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
