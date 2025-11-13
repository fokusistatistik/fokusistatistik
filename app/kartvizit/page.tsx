'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import './styles.css';

export default function KartvizitPage() {
  const [currentLanguage, setCurrentLanguage] = useState<'tr' | 'en'>('tr');
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [microphonePermission, setMicrophonePermission] = useState<'granted' | 'denied' | 'unknown'>('unknown');

  // Check microphone permission on mount
  useEffect(() => {
    checkMicrophonePermission();
  }, []);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (showVoiceModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showVoiceModal]);

  const checkMicrophonePermission = async () => {
    try {
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        setMicrophonePermission(permission.state as 'granted' | 'denied');
      }
    } catch (error) {
      console.error('Mikrofon izni kontrol hatası:', error);
    }
  };

  const requestMicrophonePermission = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setMicrophonePermission('granted');
      return true;
    } catch (error) {
      setMicrophonePermission('denied');
      const message =
        currentLanguage === 'en'
          ? 'Microphone permission is required for voice assistant.'
          : 'Sesli asistan için mikrofon izni gerekli.';
      alert(message);
      return false;
    }
  };

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'tr' ? 'en' : 'tr');
  };

  const getText = (tr: string, en: string) => {
    return currentLanguage === 'tr' ? tr : en;
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
      const message =
        currentLanguage === 'en'
          ? 'Microphone permission is required. Grant permission?'
          : 'Mikrofon izni gerekli. İzin vermek ister misiniz?';

      const userConfirm = confirm(message);
      if (!userConfirm) return;

      const permissionGranted = await requestMicrophonePermission();
      if (!permissionGranted) return;
    }

    setShowVoiceModal(true);
  };

  const closeVoiceModal = () => {
    setShowVoiceModal(false);
  };

  const assistants = [
    { code: '001', name: getText('Yönetici Asistanı', 'Manager Assistant'), img: 'fokus001.png', url: 'https://asistan.fokusistatistik.com/fokus001/' },
    { code: '216', name: getText('Müşteri Hizmetleri', 'Customer Service'), img: 'fokus216.png', url: 'https://asistan.fokusistatistik.com/fokus216/' },
    { code: '314', name: getText('Veri Analisti', 'Data Analyst'), img: 'fokus314.png', url: 'https://asistan.fokusistatistik.com/fokus314/' },
    { code: '520', name: getText('Pazarlama & Lead', 'Marketing & Lead'), img: 'fokus520.png', url: 'https://asistan.fokusistatistik.com/fokus520/' },
    { code: '618', name: getText('Finans & Fatura', 'Finance & Invoice'), img: 'fokus618.png', url: 'https://asistan.fokusistatistik.com/fokus618/' },
    { code: '707', name: getText('İnsan Kaynakları', 'Human Resources'), img: 'fokus707.png', url: 'https://asistan.fokusistatistik.com/fokus707/' },
    { code: '717', name: getText('İçerik Tasarımı', 'Content Design'), img: 'fokus717.png', url: 'https://asistan.fokusistatistik.com/fokus717/' },
    { code: '808', name: getText('Sosyal Medya', 'Social Media'), img: 'fokus808.png', url: 'https://asistan.fokusistatistik.com/fokus808/' },
    { code: '999', name: getText('Joker Asistan', 'Joker Assistant'), img: 'fokus999.png', url: 'https://asistan.fokusistatistik.com/fokus999/' },
  ];

  return (
    <>
      <div className="language-toggle">
        <span className="lang-label">{currentLanguage === 'tr' ? 'TR' : 'EN'}</span>
        <div className={`toggle-switch ${currentLanguage === 'en' ? 'english' : ''}`} onClick={toggleLanguage}>
          <div className="toggle-slider">{currentLanguage === 'tr' ? '🇹🇷' : '🇺🇸'}</div>
        </div>
      </div>

      <div className="container">
        <div className="header">
          <Image
            src="https://static.fokusistatistik.com/logolar/fokuslogo1.png"
            alt="FOKUS Logo"
            className="logo"
            width={175}
            height={60}
            priority
          />
          <div className="company-name">{getText('FOKUS İstatistik', 'FOKUS Statistics')}</div>
          <div className="tagline">{getText('Veri Bilimi & Yapay Zeka Danışmanlığı', 'Data Science & AI Consulting')}</div>
        </div>

        <div className="content">
          <div className="section">
            <div className="contact-header">
              <div className="contact-title">
                <span className="icon">📞</span>
                <span>{getText('İletişim', 'Contact')}</span>
              </div>
              <button className="add-contact-btn-inline" onClick={addToContacts}>
                <span>👤</span>
                <span>{getText('Kişilerime Ekle', 'Add to Contacts')}</span>
              </button>
            </div>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">🌐</div>
                <a href="https://www.fokusistatistik.com" className="contact-text" target="_blank" rel="noopener noreferrer">
                  www.fokusistatistik.com
                </a>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <a href="mailto:bilgi@fokusistatistik.com" className="contact-text">
                  bilgi@fokusistatistik.com
                </a>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📱</div>
                <a href="tel:+905354040712" className="contact-text">
                  +90 535 404 07 12
                </a>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="section-title">
              <span className="icon">🎯</span>
              <span>{getText('Hakkımızda', 'About Us')}</span>
            </div>
            <div className="description">
              {getText(
                '22 yıllık deneyimimizle verilerinizi stratejik bilgiye dönüştürüyor, yapay zeka destekli çözümlerle işletmenizin dijital dönüşümünü hızlandırıyoruz. Her sektöre ve ölçeğe adapte olabilen metal yakalı işçilerimizle personel maliyetlerini düşürür, verimliliği artırır, 9 sanal asistanımızla 7/24 hizmet sunarız.',
                'With 22 years of experience, we transform your data into strategic information and accelerate your business\'s digital transformation with AI-powered solutions. With our metal-collar workers who can adapt to every sector and scale, we reduce personnel costs, increase efficiency, and provide 24/7 service with our 9 virtual assistants.'
              )}
            </div>
          </div>

          <a
            href="https://asistan.fokusistatistik.com/"
            className="ecosystem-btn-simple"
            target="_blank"
            rel="noopener noreferrer"
          >
            {getText('FOKUS Ekosistemini Keşfedin', 'Explore FOKUS Ecosystem')}
          </a>

          <div className="section">
            <div className="assistants-grid">
              {assistants.map((assistant) => (
                <a
                  key={assistant.code}
                  href={assistant.url}
                  className="assistant-item"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={`https://www.fokusistatistik.com/assets/img/${assistant.img}`}
                    alt={`FOKUS${assistant.code}`}
                    width={28}
                    height={28}
                  />
                  <div className="assistant-name">{assistant.name}</div>
                  <div className="assistant-code">FOKUS{assistant.code}</div>
                </a>
              ))}
            </div>
            <div className="section-divider"></div>
          </div>

          <div className="section">
            <div className="stats">
              <div className="stat-item">
                <div className="stat-number">22+</div>
                <div className="stat-label">{getText('Yıl Deneyim', 'Years Experience')}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">9</div>
                <div className="stat-label">{getText('Sanal Asistan', 'Virtual Assistants')}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">7/24</div>
                <div className="stat-label">{getText('Destek', 'Support')}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="footer-content">
            <div className="social-icons">
              <a href="https://www.instagram.com/fokusistatistik/" title="Instagram" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/img/instagram.png" alt="Instagram" width={26} height={26} />
              </a>
              <a href="mailto:bilgi@fokusistatistik.com" title="E-posta Gönder">
                <Image src="/assets/img/eposta.png" alt="E-posta Gönder" width={26} height={26} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61577855105088" title="Facebook" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/img/facebook.png" alt="Facebook" width={26} height={26} />
              </a>
              <a href="https://www.linkedin.com/company/fokusistatistik" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/img/ln.png" alt="LinkedIn" width={26} height={26} />
              </a>
              <a href="https://twitter.com/fokusistatistik" title="Twitter" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/img/twitter.png" alt="Twitter" width={26} height={26} />
              </a>
              <a href="https://t.me/fokusistatistikbot" title="Telegram" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/img/telegram.png" alt="Telegram" width={26} height={26} />
              </a>
              <a href="https://asistan.fokusistatistik.com/" title="Asistanlar" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/img/asistanfokus.png" alt="Asistanlar" width={26} height={26} />
              </a>
              <a href="https://wa.me/905354040712?text=merhaba%20fokusistatistik" title="WhatsApp" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/img/whatsapp.png" alt="WhatsApp" width={26} height={26} />
              </a>
              <a href="https://www.youtube.com/@fokusistatistik" title="YouTube" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/img/youtube.png" alt="YouTube" width={26} height={26} />
              </a>
              <a href="https://github.com/fokusistatistik" title="Github" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/img/github.png" alt="Github" width={26} height={26} />
              </a>
            </div>
          </div>

          <div className="copyright">
            <span>
              {getText(
                '© 2025 FOKUS İstatistik Veri Bilimi ve YZ Danışmanlığı',
                '© 2025 FOKUS Statistics Data Science & AI Consulting'
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Voice Assistant Button */}
      <div className="voice-assistant">
        <div className="voice-btn" onClick={openVoiceModal}>
          <Image
            src="https://static.fokusistatistik.com/resimler/FOKUS520profil.png"
            alt="FOKUS Sesli Asistan"
            width={40}
            height={40}
          />
        </div>
        <div className="voice-text" dangerouslySetInnerHTML={{ __html: getText('Sesli<br>Asistan', 'Voice<br>Assistant') }} />
      </div>

      {/* Voice Modal */}
      {showVoiceModal && (
        <div className="voice-modal" onClick={(e) => e.target === e.currentTarget && closeVoiceModal()}>
          <div className="voice-modal-content">
            <div className="voice-modal-header">
              <h3>{getText('Benimle konuşmak için lütfen düğmeye basın', 'Please press the button to talk to me')}</h3>
              <button className="close-btn" onClick={closeVoiceModal}>
                &times;
              </button>
            </div>
            <div className="voice-modal-body">
              <iframe
                src="https://vapi.ai?demo=true&shareKey=803df5c1-1a3a-4c20-a663-aaec4b67293f&assistantId=0f0f02b2-7d79-42fe-b1e7-e5dd12be1262"
                frameBorder="0"
                allowFullScreen
                allow="microphone; autoplay; camera"
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
