'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Kartvizit() {
  const [currentLanguage, setCurrentLanguage] = useState<'tr' | 'en'>('tr');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [microphonePermission, setMicrophonePermission] = useState<'unknown' | 'granted' | 'denied'>('unknown');

  useEffect(() => {
    const container = document.querySelector('.kvz-container') as HTMLElement;
    if (container) {
      container.style.opacity = '0';
      container.style.transform = 'translateY(30px)';

      setTimeout(() => {
        container.style.transition = 'all 0.8s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 100);
    }

    checkMicrophonePermission();

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeVoiceModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  const checkMicrophonePermission = async () => {
    try {
      if ('permissions' in navigator) {
        const permission = await (navigator.permissions as any).query({ name: 'microphone' });
        setMicrophonePermission(permission.state);
      }
    } catch (error) {
      console.error('Mikrofon izni kontrol hatası:', error);
    }
  };

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setMicrophonePermission('granted');
      return true;
    } catch (error) {
      setMicrophonePermission('denied');
      const message = currentLanguage === 'en'
        ? 'Microphone permission is required for voice assistant.'
        : 'Sesli asistan için mikrofon izni gerekli.';
      alert(message);
      return false;
    }
  };

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'tr' ? 'en' : 'tr');
  };

  const addToContacts = () => {
    const isEnglish = currentLanguage === 'en';

    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:FOKUS ${isEnglish ? 'Statistics' : 'İstatistik'}
ORG:FOKUS ${isEnglish ? 'Statistics - Data Science & AI Consulting' : 'İstatistik - Veri Bilimi ve Yapay Zeka Danışmanlığı'}
TITLE:${isEnglish ? 'Data Science and AI Consulting' : 'Veri Bilimi ve Yapay Zeka Danışmanlığı'}
TEL;TYPE=WORK,VOICE:+905354040712
EMAIL;TYPE=WORK:bilgi@fokusistatistik.com
URL:https://www.fokusistatistik.com
URL:https://asistan.fokusistatistik.com/
NOTE:${isEnglish ? 'With 22 years of experience, we transform your data into strategic information and accelerate your business digital transformation with AI-powered solutions. With our metal-collar workers who can adapt to every sector and scale, we reduce personnel costs, increase efficiency, and provide 24/7 service with our 9 virtual assistants.' : '22 yıllık deneyimimizle verilerinizi stratejik bilgiye dönüştürüyor, yapay zeka destekli çözümlerle işletmenizin dijital dönüşümünü hızlandırıyoruz. Her sektöre ve ölçeğe adapte olabilen metal yakalı işçilerimizle personel maliyetlerini düşürür, verimliliği artırır, 9 sanal asistanımızla 7/24 hizmet sunuyoruz.'}
CATEGORIES:${isEnglish ? 'Data Science,Artificial Intelligence,Statistics,Consulting,Automation,Virtual Assistants' : 'Veri Bilimi,Yapay Zeka,İstatistik,Danışmanlık,Otomasyon,Sanal Asistanlar'}
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `FOKUS_${isEnglish ? 'Statistics' : 'Istatistik'}.vcf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);

    const message = isEnglish
      ? 'Contact information downloaded! You can add it to your phone contacts.'
      : 'Kişi bilgileri indirildi! Telefon rehberinize ekleyebilirsiniz.';
    alert(message);
  };

  const openVoiceModal = async () => {
    if (microphonePermission !== 'granted') {
      const message = currentLanguage === 'en'
        ? 'Microphone permission is required. Grant permission?'
        : 'Mikrofon izni gerekli. İzin vermek ister misiniz?';

      const userConfirm = confirm(message);
      if (!userConfirm) return;

      const permissionGranted = await requestMicrophonePermission();
      if (!permissionGranted) return;
    }

    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeVoiceModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const t = (tr: string, en: string) => currentLanguage === 'tr' ? tr : en;

  const assistants = [
    { code: 'fokus001', name: t('Yönetici Asistanı', 'Manager Assistant'), image: 'https://static.fokusistatistik.com/asistanlar/fokus001.png' },
    { code: 'fokus216', name: t('Müşteri Hizmetleri', 'Customer Service'), image: 'https://static.fokusistatistik.com/asistanlar/fokus216.png' },
    { code: 'fokus314', name: t('Veri Analisti', 'Data Analyst'), image: 'https://static.fokusistatistik.com/asistanlar/fokus314.png' },
    { code: 'fokus520', name: t('Pazarlama & Lead', 'Marketing & Lead'), image: 'https://static.fokusistatistik.com/asistanlar/fokus520.png' },
    { code: 'fokus618', name: t('Finans & Fatura', 'Finance & Invoice'), image: 'https://static.fokusistatistik.com/asistanlar/fokus618.png' },
    { code: 'fokus707', name: t('İnsan Kaynakları', 'Human Resources'), image: 'https://static.fokusistatistik.com/asistanlar/fokus707.png' },
    { code: 'fokus717', name: t('İçerik Tasarımı', 'Content Design'), image: 'https://static.fokusistatistik.com/asistanlar/fokus717.png' },
    { code: 'fokus808', name: t('Sosyal Medya', 'Social Media'), image: 'https://static.fokusistatistik.com/asistanlar/fokus808.png' },
    { code: 'fokus999', name: t('Joker Asistan', 'Joker Assistant'), image: 'https://static.fokusistatistik.com/asistanlar/fokus999.png' },
  ];

  return (
    <>
      <div className="kvz-language-toggle">
        <span className="kvz-lang-label">{currentLanguage === 'tr' ? 'TR' : 'EN'}</span>
        <div className={`kvz-toggle-switch ${currentLanguage === 'en' ? 'english' : ''}`} onClick={toggleLanguage}>
          <div className="kvz-toggle-slider">{currentLanguage === 'tr' ? '🇹🇷' : '🇺🇸'}</div>
        </div>
      </div>

      <div className="kvz-container">
        <div className="kvz-header">
          <img src="https://static.fokusistatistik.com/logolar/fokuslogo1.png" alt="FOKUS Logo" className="kvz-logo" />
          <div className="kvz-company-name">{t('FOKUS İstatistik', 'FOKUS Statistics')}</div>
          <div className="kvz-tagline">{t('Veri Bilimi & Yapay Zeka Danışmanlığı', 'Data Science & AI Consulting')}</div>
        </div>

        <div className="kvz-content">
          <div className="kvz-section">
            <div className="kvz-contact-header">
              <div className="kvz-contact-title">
                <span className="kvz-icon">📞</span>
                <span>{t('İletişim', 'Contact')}</span>
              </div>
              <button className="kvz-add-contact-btn-inline" onClick={addToContacts}>
                <span>👤</span>
                <span>{t('Kişilerime Ekle', 'Add to Contacts')}</span>
              </button>
            </div>
            <div className="kvz-contact-info">
              <div className="kvz-contact-item">
                <div className="kvz-contact-icon">🌐</div>
                <a href="https://www.fokusistatistik.com" className="kvz-contact-text" target="_blank" rel="noopener noreferrer">
                  www.fokusistatistik.com
                </a>
              </div>
              <div className="kvz-contact-item">
                <div className="kvz-contact-icon">📧</div>
                <a href="mailto:bilgi@fokusistatistik.com" className="kvz-contact-text">
                  bilgi@fokusistatistik.com
                </a>
              </div>
              <div className="kvz-contact-item">
                <div className="kvz-contact-icon">📱</div>
                <a href="tel:+905354040712" className="kvz-contact-text">
                  +90 535 404 07 12
                </a>
              </div>
            </div>
          </div>

          <div className="kvz-section">
            <div className="kvz-section-title">
              <span className="kvz-icon">🎯</span>
              <span>{t('Hakkımızda', 'About Us')}</span>
            </div>
            <div className="kvz-description">
              {t(
                '22 yıllık deneyimimizle verilerinizi stratejik bilgiye dönüştürüyor, yapay zeka destekli çözümlerle işletmenizin dijital dönüşümünü hızlandırıyoruz. Her sektöre ve ölçeğe adapte olabilen metal yakalı işçilerimizle personel maliyetlerini düşürür, verimliliği artırır, 9 sanal asistanımızla 7/24 hizmet sunarız.',
                'With 22 years of experience, we transform your data into strategic information and accelerate your business\'s digital transformation with AI-powered solutions. With our metal-collar workers who can adapt to every sector and scale, we reduce personnel costs, increase efficiency, and provide 24/7 service with our 9 virtual assistants.'
              )}
            </div>
          </div>

          <a href="https://asistan.fokusistatistik.com/" className="kvz-ecosystem-btn-simple" target="_blank" rel="noopener noreferrer">
            {t('FOKUS Ekosistemini Keşfedin', 'Explore FOKUS Ecosystem')}
          </a>

          <div className="kvz-section">
            <div className="kvz-assistants-grid">
              {assistants.map((assistant) => (
                <a
                  key={assistant.code}
                  href={`https://asistan.fokusistatistik.com/${assistant.code}/`}
                  className="kvz-assistant-item"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={assistant.image} alt={assistant.code.toUpperCase()} />
                  <div className="kvz-assistant-name">{assistant.name}</div>
                  <div className="kvz-assistant-code">{assistant.code.toUpperCase()}</div>
                </a>
              ))}
            </div>
          </div>

          <div className="kvz-section">
            <div className="kvz-stats">
              <div className="kvz-stat-item">
                <div className="kvz-stat-number">22+</div>
                <div className="kvz-stat-label">{t('Yıl Deneyim', 'Years Experience')}</div>
              </div>
              <div className="kvz-stat-item">
                <div className="kvz-stat-number">9</div>
                <div className="kvz-stat-label">{t('Sanal Asistan', 'Virtual Assistants')}</div>
              </div>
              <div className="kvz-stat-item">
                <div className="kvz-stat-number">7/24</div>
                <div className="kvz-stat-label">{t('Destek', 'Support')}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="kvz-footer">
          <div className="kvz-social-icons">
            <a href="https://www.instagram.com/fokusistatistik/" title="Instagram" target="_blank" rel="noopener noreferrer">
              <img src="https://static.fokusistatistik.com/resimler/instagram.png" alt="Instagram" />
            </a>
            <a href="mailto:bilgi@fokusistatistik.com" title="E-posta Gönder">
              <img src="https://static.fokusistatistik.com/resimler/eposta.png" alt="E-posta" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61577855105088" title="Facebook" target="_blank" rel="noopener noreferrer">
              <img src="https://static.fokusistatistik.com/resimler/facebook.png" alt="Facebook" />
            </a>
            <a href="https://www.linkedin.com/company/fokusistatistik" title="LinkedIn" target="_blank" rel="noopener noreferrer">
              <img src="https://static.fokusistatistik.com/resimler/ln.png" alt="LinkedIn" />
            </a>
            <a href="https://twitter.com/fokusistatistik" title="Twitter" target="_blank" rel="noopener noreferrer">
              <img src="https://static.fokusistatistik.com/resimler/twitter.png" alt="Twitter" />
            </a>
            <a href="https://t.me/fokusistatistikbot" title="Telegram" target="_blank" rel="noopener noreferrer">
              <img src="https://static.fokusistatistik.com/resimler/telegram.png" alt="Telegram" />
            </a>
            <a href="https://asistan.fokusistatistik.com/" title="Asistanlar" target="_blank" rel="noopener noreferrer">
              <img src="https://static.fokusistatistik.com/resimler/asistanfokus.png" alt="Asistanlar" />
            </a>
            <a href="https://wa.me/905354040712?text=merhaba%20fokusistatistik" title="WhatsApp" target="_blank" rel="noopener noreferrer">
              <img src="https://static.fokusistatistik.com/resimler/whatsapp.png" alt="WhatsApp" />
            </a>
            <a href="https://www.youtube.com/@fokusistatistik" title="YouTube" target="_blank" rel="noopener noreferrer">
              <img src="https://static.fokusistatistik.com/resimler/youtube.png" alt="YouTube" />
            </a>
            <a href="https://github.com/fokusistatistik" title="Github" target="_blank" rel="noopener noreferrer">
              <img src="https://static.fokusistatistik.com/resimler/github.png" alt="Github" />
            </a>
          </div>
          <div className="kvz-copyright">
            {t('© 2025 FOKUS İstatistik ve Veri Bilimi Danışmanlığı', '© 2025 FOKUS Statistics Data Science & AI Consulting')}
          </div>
        </div>
      </div>

      <div className="kvz-voice-assistant">
        <div className="kvz-voice-btn" onClick={openVoiceModal}>
          <img src="https://static.fokusistatistik.com/resimler/FOKUS520profil.png" alt="FOKUS Sesli Asistan" />
        </div>
        <div className="kvz-voice-text" dangerouslySetInnerHTML={{ __html: t('Sesli<br>Asistan', 'Voice<br>Assistant') }} />
      </div>

      {isModalOpen && (
        <div className="kvz-voice-modal" onClick={closeVoiceModal}>
          <div className="kvz-voice-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="kvz-voice-modal-header">
              <h3>{t('Benimle konuşmak için lütfen düğmeye basın', 'Please press the button to talk to me')}</h3>
              <button className="kvz-close-btn" onClick={closeVoiceModal}>&times;</button>
            </div>
            <div className="kvz-voice-modal-body">
              <iframe
                src="https://vapi.ai?demo=true&shareKey=803df5c1-1a3a-4c20-a663-aaec4b67293f&assistantId=0f0f02b2-7d79-42fe-b1e7-e5dd12be1262"
                frameBorder="0"
                allow="microphone; autoplay; camera"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :global(body) {
          font-family: 'IBM Plex Sans', sans-serif;
          background: linear-gradient(135deg, #860000 0%, #0a4d4f 100%);
          min-height: 100vh;
          color: #232323;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 5px;
        }

        .kvz-container {
          max-width: 400px;
          width: calc(100% - 10px);
          background: #f2f2f2;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          position: relative;
        }

        .kvz-language-toggle {
          position: fixed;
          top: 15px;
          right: 15px;
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.9);
          padding: 6px 10px;
          border-radius: 25px;
        }

        .kvz-lang-label {
          font-size: 10px;
          font-weight: 600;
          color: #232323;
        }

        .kvz-toggle-switch {
          position: relative;
          width: 40px;
          height: 20px;
          background: #860000;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .kvz-toggle-switch.english {
          background: #0a4d4f;
        }

        .kvz-toggle-slider {
          position: absolute;
          top: 1px;
          left: 1px;
          width: 17px;
          height: 17px;
          background: white;
          border-radius: 50%;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
        }

        .kvz-toggle-switch.english .kvz-toggle-slider {
          transform: translateX(23px);
        }

        .kvz-header {
          background: #f2f2f2;
          color: #232323;
          padding: 25px 15px 20px 12px;
          text-align: center;
          border-bottom: 3px solid #860000;
        }

        .kvz-logo {
          width: 175px;
          height: auto;
        }

        .kvz-company-name {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 4px;
          margin-top: -10px;
        }

        .kvz-tagline {
          font-size: 10px;
          opacity: 0.8;
          margin-bottom: 6px;
        }

        .kvz-content {
          padding: 10px;
        }

        .kvz-section {
          margin-bottom: 8px;
        }

        .kvz-section-title {
          font-size: 14px;
          margin-top: 10px;
          font-weight: 600;
          color: #232323;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 2px solid #860000;
          padding-bottom: 3px;
        }

        .kvz-icon {
          font-size: 16px;
        }

        .kvz-contact-info {
          display: flex;
          flex-direction: column;
          gap: 9px;
          margin-bottom: 8px;
        }

        .kvz-contact-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 6px;
        }

        .kvz-contact-title {
          font-size: 15px;
          font-weight: 600;
          color: #232323;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 2px solid #860000;
          padding-bottom: 2px;
          flex: 1;
        }

        .kvz-add-contact-btn-inline {
          background: linear-gradient(135deg, #860000 0%, #0a4d4f 100%);
          color: white;
          border: none;
          padding: 5px 18px;
          border-radius: 15px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        .kvz-add-contact-btn-inline:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(134, 0, 0, 0.3);
        }

        .kvz-contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 15px;
          background: white;
          border-radius: 10px;
          border-left: 5px solid #860000;
          transition: all 0.3s ease;
        }

        .kvz-contact-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(134, 0, 0, 0.15);
        }

        .kvz-contact-icon {
          font-size: 14px;
          color: #860000;
          min-width: 14px;
        }

        .kvz-contact-text {
          font-size: 13px;
          color: #232323;
          text-decoration: none;
          font-weight: 500;
        }

        .kvz-contact-text:hover {
          color: #860000;
        }

        .kvz-description {
          font-size: 11.5px;
          line-height: 1.35;
          color: #232323;
          background: white;
          padding: 7px 10px;
          border-radius: 10px;
          border-left: 5px solid #0a4d4f;
          text-align: justify;
        }

        .kvz-ecosystem-btn-simple {
          width: 100%;
          background: linear-gradient(135deg, #0a4d4f 0%, #860000 100%);
          color: white;
          border: none;
          padding: 8px 20px;
          border-radius: 15px;
          text-decoration: none;
          font-weight: 600;
          font-size: 13px;
          transition: all 0.3s ease;
          text-align: center;
          display: block;
          margin: 12px 0;
        }

        .kvz-ecosystem-btn-simple:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(134, 0, 0, 0.3);
          color: white;
        }

        .kvz-assistants-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          width: 100%;
          justify-items: center;
        }

        .kvz-assistant-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1px 4px;
          background: white;
          border-radius: 10px;
          text-decoration: none;
          color: #232323;
          border: 2px solid #860000;
          transition: all 0.3s ease;
          text-align: center;
          width: 100%;
          height: 65px;
          min-width: 85px;
        }

        .kvz-assistant-item:hover {
          background: #860000;
          color: white;
          transform: translateY(-2px);
        }

        .kvz-assistant-item img {
          width: auto;
          height: 28px;
          border-radius: 50px;
          margin-bottom: 3px;
          object-fit: cover;
        }

        .kvz-assistant-name {
          font-size: 10px;
          font-weight: 600;
          margin-bottom: 2px;
          line-height: 1.1;
          max-height: 16px;
          overflow: hidden;
          word-break: break-word;
        }

        .kvz-assistant-code {
          font-size: 8px;
          opacity: 0.8;
        }

        .kvz-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 15px;
          margin-bottom: -5px;
        }

        .kvz-stat-item {
          background: white;
          padding: 3px 10px;
          border-radius: 10px;
          text-align: center;
          border: 1px solid #860000;
          transition: all 0.3s ease;
        }

        .kvz-stat-item:hover {
          transform: translateY(-2px);
        }

        .kvz-stat-number {
          font-size: 17px;
          font-weight: 600;
          color: #860000;
        }

        .kvz-stat-label {
          font-size: 11px;
          color: #232323;
          font-weight: 500;
        }

        .kvz-voice-assistant {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          text-align: center;
        }

        .kvz-voice-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #860000, #0a4d4f);
          border: 3px solid white;
          box-shadow: 0 6px 20px rgba(134, 0, 0, 0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          animation: pulse 3s infinite;
        }

        .kvz-voice-btn:hover {
          transform: scale(1.1);
        }

        .kvz-voice-btn img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .kvz-voice-text {
          margin-top: 6px;
          font-size: 9px;
          color: white;
          font-weight: 600;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }

        @keyframes pulse {
          0%, 70%, 100% { transform: scale(1); }
          35% { transform: scale(1.05); }
        }

        .kvz-voice-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .kvz-voice-modal-content {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          width: 90%;
          max-width: 500px;
          max-height: 80vh;
        }

        .kvz-voice-modal-header {
          background: linear-gradient(135deg, #860000, #0a4d4f);
          color: white;
          padding: 18px;
          text-align: center;
          position: relative;
        }

        .kvz-voice-modal-header h3 {
          margin: 0;
          font-size: 16px;
        }

        .kvz-close-btn {
          position: absolute;
          top: 12px;
          right: 15px;
          background: none;
          border: none;
          color: white;
          font-size: 22px;
          cursor: pointer;
        }

        .kvz-voice-modal-body {
          height: 450px;
        }

        .kvz-voice-modal-body iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .kvz-footer {
          background: #232323;
          color: #f2f2f2;
          padding: 12px;
          text-align: center;
        }

        .kvz-social-icons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 9px;
          margin-bottom: 6px;
          flex-wrap: wrap;
        }

        .kvz-social-icons a {
          transition: all 0.3s ease;
        }

        .kvz-social-icons a:hover {
          transform: scale(1.33);
        }

        .kvz-social-icons img {
          height: 26px;
          width: auto;
        }

        .kvz-copyright {
          font-size: 9px;
          opacity: 0.8;
          border-top: 1px solid #444;
          padding-top: 6px;
        }

        @media (max-width: 480px) {
          :global(body) {
            padding: 3px;
          }

          .kvz-container {
            width: calc(100% - 6px);
          }

          .kvz-header {
            padding: 4px 12px 0px 12px;
          }

          .kvz-logo {
            width: 130px;
            margin-bottom: -3px;
            margin-top: -2px;
          }

          .kvz-company-name {
            font-size: 13px;
          }

          .kvz-tagline {
            font-size: 9px;
            margin-bottom: 4px;
            margin-top: -2px;
          }

          .kvz-content {
            padding: 9px;
          }

          .kvz-section {
            margin-bottom: 8px;
          }

          .kvz-assistants-grid {
            gap: 8px;
          }

          .kvz-assistant-item {
            height: 62px;
            max-width: 100px;
          }

          .kvz-assistant-item img {
            width: auto;
            height: 27px;
          }

          .kvz-assistant-name {
            font-size: 9px;
          }

          .kvz-assistant-code {
            font-size: 7px;
          }

          .kvz-stats {
            gap: 10px 20px;
            padding: 2px 10px;
          }

          .kvz-stat-item {
            padding: 2px 8px;
            margin: -3px;
          }

          .kvz-voice-assistant {
            bottom: 15px;
            right: 15px;
          }

          .kvz-voice-btn {
            width: 50px;
            height: 50px;
          }

          .kvz-voice-btn img {
            width: 32px;
            height: 32px;
          }

          .kvz-social-icons {
            gap: 4px;
            margin-bottom: 4px;
          }

          .kvz-copyright {
            font-size: 7px;
            padding-top: 5px;
          }

          .kvz-social-icons img {
            height: 23px;
          }
        }

        @media (max-width: 360px) {
          .kvz-assistants-grid {
            gap: 3px;
          }

          .kvz-assistant-item {
            height: 55px;
            max-width: 55px;
          }

          .kvz-assistant-item img {
            width: 16px;
            height: 16px;
          }

          .kvz-assistant-name {
            font-size: 6px;
          }

          .kvz-assistant-code {
            font-size: 5px;
          }
        }
      `}</style>
    </>
  );
}
