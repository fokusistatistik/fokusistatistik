'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Download,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Volume2,
  X
} from 'lucide-react';

export default function Kartvizit() {
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const [isVapiModalOpen, setIsVapiModalOpen] = useState(false);

  const content = {
    tr: {
      title: 'Dijital Kartvizit',
      subtitle: 'FOKUS İstatistik - Veri Bilimi ve Yapay Zeka Çözümleri',
      tagline: '9 Modüler Sanal Asistan ile Dijitalleşin',
      contact: 'İletişim Bilgileri',
      assistants: 'Sanal Asistanlarımız',
      downloadVcard: 'vCard İndir',
      callAssistant: 'Sesli Asistanı Ara',
      exploreMore: 'Daha Fazla Keşfet',
    },
    en: {
      title: 'Digital Business Card',
      subtitle: 'FOKUS Statistics - Data Science and AI Solutions',
      tagline: 'Digitalize with 9 Modular Virtual Assistants',
      contact: 'Contact Information',
      assistants: 'Our Virtual Assistants',
      downloadVcard: 'Download vCard',
      callAssistant: 'Call Voice Assistant',
      exploreMore: 'Explore More',
    },
  };

  const t = content[language];

  const assistants = [
    {
      code: 'fokus001',
      name: 'FOKUS001',
      title: language === 'tr' ? 'Yönetici Asistanı' : 'Executive Assistant',
      image: 'https://static.fokusistatistik.com/asistanlar/fokus001.png',
    },
    {
      code: 'fokus216',
      name: 'FOKUS216',
      title: language === 'tr' ? 'Müşteri Hizmetleri' : 'Customer Service',
      image: 'https://static.fokusistatistik.com/asistanlar/fokus216.png',
    },
    {
      code: 'fokus314',
      name: 'FOKUS314',
      title: language === 'tr' ? 'Veri Analisti' : 'Data Analyst',
      image: 'https://static.fokusistatistik.com/asistanlar/fokus314.png',
    },
    {
      code: 'fokus520',
      name: 'FOKUS520',
      title: language === 'tr' ? 'Pazarlama & Lead' : 'Marketing & Lead',
      image: 'https://static.fokusistatistik.com/asistanlar/fokus520.png',
    },
    {
      code: 'fokus618',
      name: 'FOKUS618',
      title: language === 'tr' ? 'Finans & Fatura' : 'Finance & Invoice',
      image: 'https://static.fokusistatistik.com/asistanlar/fokus618.png',
    },
    {
      code: 'fokus707',
      name: 'FOKUS707',
      title: language === 'tr' ? 'İnsan Kaynakları' : 'Human Resources',
      image: 'https://static.fokusistatistik.com/asistanlar/fokus707.png',
    },
    {
      code: 'fokus717',
      name: 'FOKUS717',
      title: language === 'tr' ? 'İçerik Tasarımı' : 'Content Design',
      image: 'https://static.fokusistatistik.com/asistanlar/fokus717.png',
    },
    {
      code: 'fokus808',
      name: 'FOKUS808',
      title: language === 'tr' ? 'Sosyal Medya & İletişim' : 'Social Media & Communication',
      image: 'https://static.fokusistatistik.com/asistanlar/fokus808.png',
    },
    {
      code: 'fokus999',
      name: 'FOKUS999',
      title: language === 'tr' ? 'Joker Asistan' : 'Joker Assistant',
      image: 'https://static.fokusistatistik.com/asistanlar/fokus999.png',
    },
  ];

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:FOKUS İstatistik
ORG:FOKUS İstatistik
TITLE:Veri Bilimi ve Yapay Zeka Çözümleri
TEL;TYPE=WORK,VOICE:+90 (212) 123 45 67
EMAIL:info@fokusistatistik.com
URL:https://www.fokusistatistik.com
ADR;TYPE=WORK:;;İstanbul;;34000;Türkiye
NOTE:9 Modüler Sanal Asistan ile Dijitalleşin
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fokus-istatistik.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const openVapiModal = () => {
    setIsVapiModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeVapiModal = () => {
    setIsVapiModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div className="kvz-container">
        {/* Language Toggle */}
        <div className="kvz-lang-toggle">
          <button
            onClick={() => setLanguage('tr')}
            className={`kvz-lang-btn ${language === 'tr' ? 'kvz-lang-active' : ''}`}
          >
            TR
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`kvz-lang-btn ${language === 'en' ? 'kvz-lang-active' : ''}`}
          >
            EN
          </button>
        </div>

        {/* Header Section */}
        <div className="kvz-header">
          <div className="kvz-logo-wrapper">
            <Image
              src="https://static.fokusistatistik.com/resimler/logobeyaz.png"
              alt="FOKUS Logo"
              width={120}
              height={120}
              className="kvz-logo"
            />
          </div>
          <h1 className="kvz-title">{t.subtitle}</h1>
          <p className="kvz-tagline">{t.tagline}</p>
        </div>

        {/* Contact Information */}
        <div className="kvz-section">
          <h2 className="kvz-section-title">{t.contact}</h2>
          <div className="kvz-contact-grid">
            <a href="tel:+902121234567" className="kvz-contact-item">
              <Phone className="kvz-icon" />
              <span>+90 (212) 123 45 67</span>
            </a>
            <a href="mailto:info@fokusistatistik.com" className="kvz-contact-item">
              <Mail className="kvz-icon" />
              <span>info@fokusistatistik.com</span>
            </a>
            <div className="kvz-contact-item">
              <MapPin className="kvz-icon" />
              <span>{language === 'tr' ? 'İstanbul, Türkiye' : 'Istanbul, Turkey'}</span>
            </div>
            <a href="https://www.fokusistatistik.com" target="_blank" rel="noopener noreferrer" className="kvz-contact-item">
              <Globe className="kvz-icon" />
              <span>fokusistatistik.com</span>
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="kvz-actions">
          <button onClick={downloadVCard} className="kvz-btn kvz-btn-primary">
            <Download className="kvz-btn-icon" />
            {t.downloadVcard}
          </button>
          <button onClick={openVapiModal} className="kvz-btn kvz-btn-secondary">
            <Volume2 className="kvz-btn-icon" />
            {t.callAssistant}
          </button>
        </div>

        {/* Social Media */}
        <div className="kvz-social">
          <a href="https://linkedin.com/company/fokusistatistik" target="_blank" rel="noopener noreferrer" className="kvz-social-link">
            <Linkedin className="kvz-social-icon" />
          </a>
          <a href="https://twitter.com/fokusistatistik" target="_blank" rel="noopener noreferrer" className="kvz-social-link">
            <Twitter className="kvz-social-icon" />
          </a>
          <a href="https://facebook.com/fokusistatistik" target="_blank" rel="noopener noreferrer" className="kvz-social-link">
            <Facebook className="kvz-social-icon" />
          </a>
          <a href="https://instagram.com/fokusistatistik" target="_blank" rel="noopener noreferrer" className="kvz-social-link">
            <Instagram className="kvz-social-icon" />
          </a>
          <a href="https://youtube.com/@fokusistatistik" target="_blank" rel="noopener noreferrer" className="kvz-social-link">
            <Youtube className="kvz-social-icon" />
          </a>
        </div>

        {/* Assistants Grid */}
        <div className="kvz-section">
          <h2 className="kvz-section-title">{t.assistants}</h2>
          <div className="kvz-assistants-grid">
            {assistants.map((assistant) => (
              <Link
                key={assistant.code}
                href={`/sanalasistanlar/${assistant.code}`}
                className="kvz-assistant-card"
              >
                <div className="kvz-assistant-image-wrapper">
                  <Image
                    src={assistant.image}
                    alt={assistant.title}
                    width={80}
                    height={80}
                    className="kvz-assistant-image"
                  />
                </div>
                <h3 className="kvz-assistant-name">{assistant.name}</h3>
                <p className="kvz-assistant-title">{assistant.title}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="kvz-cta">
          <Link href="/" className="kvz-cta-btn">
            {t.exploreMore}
          </Link>
        </div>
      </div>

      {/* VAPI Modal */}
      {isVapiModalOpen && (
        <div className="kvz-modal-overlay" onClick={closeVapiModal}>
          <div className="kvz-modal" onClick={(e) => e.stopPropagation()}>
            <div className="kvz-modal-header">
              <div className="flex items-center gap-3">
                <Image
                  src="https://static.fokusistatistik.com/asistanlar/fokus520.png"
                  alt="FOKUS520"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
                <div>
                  <h3 className="font-bold text-lg">FOKUS520 {language === 'tr' ? 'Sesli Asistan' : 'Voice Assistant'}</h3>
                  <p className="text-xs text-white/90">{language === 'tr' ? 'Pazarlama & Lead Takip' : 'Marketing & Lead Tracking'}</p>
                </div>
              </div>
              <button onClick={closeVapiModal} className="kvz-modal-close">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="kvz-modal-body">
              <iframe
                src="https://vapi.ai?demo=true&shareKey=803df5c1-1a3a-4c20-a663-aaec4b67293f&assistantId=0f0f02b2-7d79-42fe-b1e7-e5dd12be1262"
                className="w-full h-full border-0"
                allow="microphone; autoplay; camera"
                allowFullScreen
                title="FOKUS520 Voice Assistant"
              />
            </div>
            <div className="kvz-modal-footer">
              <p className="text-sm text-gray-600">
                🎯 {language === 'tr' ? 'Mikrofon izni verdiğinizden emin olun. ESC tuşu ile kapatabilirsiniz.' : 'Please ensure microphone permission is granted. Press ESC to close.'}
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');

        .kvz-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #860000 0%, #a30000 50%, #6b0000 100%);
          padding: 2rem 1rem;
          font-family: 'IBM Plex Sans', sans-serif;
        }

        .kvz-lang-toggle {
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 50;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 9999px;
          padding: 0.25rem;
          display: flex;
          gap: 0.25rem;
        }

        .kvz-lang-btn {
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-weight: 600;
          color: white;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
          background: transparent;
        }

        .kvz-lang-active {
          background: white;
          color: #860000;
        }

        .kvz-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .kvz-logo-wrapper {
          display: inline-block;
          background: white;
          border-radius: 50%;
          padding: 1rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .kvz-logo {
          display: block;
        }

        .kvz-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .kvz-tagline {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 300;
        }

        .kvz-section {
          max-width: 56rem;
          margin: 0 auto 3rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 1.5rem;
          padding: 2rem;
        }

        .kvz-section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .kvz-contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .kvz-contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 0.75rem;
          color: white;
          text-decoration: none;
          transition: all 0.3s;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .kvz-contact-item:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .kvz-icon {
          width: 1.25rem;
          height: 1.25rem;
          flex-shrink: 0;
        }

        .kvz-actions {
          max-width: 36rem;
          margin: 0 auto 3rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .kvz-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .kvz-btn-primary {
          background: white;
          color: #860000;
        }

        .kvz-btn-primary:hover {
          background: #f0f0f0;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .kvz-btn-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid white;
        }

        .kvz-btn-secondary:hover {
          background: white;
          color: #860000;
          transform: translateY(-2px);
        }

        .kvz-btn-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .kvz-social {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .kvz-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: white;
          transition: all 0.3s;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .kvz-social-link:hover {
          background: white;
          color: #860000;
          transform: translateY(-3px);
        }

        .kvz-social-icon {
          width: 1.5rem;
          height: 1.5rem;
        }

        .kvz-assistants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1.5rem;
          max-width: 56rem;
          margin: 0 auto;
        }

        .kvz-assistant-card {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 1rem;
          padding: 1.5rem 1rem;
          text-align: center;
          transition: all 0.3s;
          text-decoration: none;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .kvz-assistant-card:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .kvz-assistant-image-wrapper {
          margin: 0 auto 1rem;
          width: 80px;
          height: 80px;
        }

        .kvz-assistant-image {
          border-radius: 50%;
          border: 3px solid white;
        }

        .kvz-assistant-name {
          font-size: 0.875rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.25rem;
        }

        .kvz-assistant-title {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .kvz-cta {
          text-align: center;
          margin-top: 3rem;
        }

        .kvz-cta-btn {
          display: inline-block;
          padding: 1rem 3rem;
          background: white;
          color: #860000;
          font-weight: 700;
          font-size: 1.125rem;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.3s;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .kvz-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 30px rgba(0, 0, 0, 0.4);
        }

        .kvz-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .kvz-modal {
          background: white;
          border-radius: 1.5rem;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          width: 100%;
          max-width: 56rem;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .kvz-modal-header {
          background: linear-gradient(to right, #860000, #a30000);
          color: white;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .kvz-modal-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          border-radius: 50%;
          padding: 0.5rem;
          cursor: pointer;
          transition: background 0.3s;
        }

        .kvz-modal-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .kvz-modal-body {
          flex: 1;
          min-height: 600px;
        }

        .kvz-modal-footer {
          background: #f9fafb;
          padding: 1rem;
          border-top: 1px solid #e5e7eb;
          text-align: center;
        }

        @media (max-width: 640px) {
          .kvz-title {
            font-size: 1.5rem;
          }

          .kvz-tagline {
            font-size: 1rem;
          }

          .kvz-section {
            padding: 1.5rem;
          }

          .kvz-assistants-grid {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 1rem;
          }

          .kvz-modal-body {
            min-height: 400px;
          }
        }
      `}</style>
    </>
  );
}
