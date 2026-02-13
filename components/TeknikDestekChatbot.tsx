'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface TeknikDestekChatbotProps {
  pageType: 'ayarlar' | 'kurumsal' | 'asistanlar';
  pageTitle?: string;
}

export default function TeknikDestekChatbot({ pageType, pageTitle }: TeknikDestekChatbotProps) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [showWidget, setShowWidget] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      setShowWidget(true);
      // Pulse animation after 3 seconds
      setTimeout(() => {
        pulseIcon();
      }, 3000);
      // Repeat pulse every 10 seconds
      const pulseInterval = setInterval(() => {
        pulseIcon();
      }, 10000);
      return () => clearInterval(pulseInterval);
    }
  }, [status]);

  // Pulse animation
  const pulseIcon = () => {
    const icon = document.getElementById('chatbot-icon');
    if (icon && !isOpen) {
      icon.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(1.2)' },
          { transform: 'scale(1)' },
        ],
        { duration: 2000, easing: 'ease-in-out' }
      );
    }
  };

  // Get session data
  const getSessionData = () => {
    if (typeof window === 'undefined') return null;

    const sessionKey = 'fokus_assistant_session'; // Your session key
    const storedData = sessionStorage.getItem(sessionKey);

    if (storedData) {
      try {
        return JSON.parse(storedData);
      } catch (e) {
        console.warn('Session parse hatası:', e);
        return null;
      }
    }
    return null;
  };

  // Get form data
  const getFormData = () => {
    const sd = getSessionData() || {};
    return {
      musteriID: sd.customerProcessId || sd.customerId || '',
      authorizedPersonName: sd.authorizedPersonName || session?.user?.name || '',
      email: sd.email || session?.user?.email || '',
      companyName: sd.companyName || '',
    };
  };

  // Handle postMessage from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'GET_SESSION_DATA') {
        const sessionData = getSessionData();
        const formData = getFormData();

        // Add page context
        const pageContext = {
          pageType: pageType,
          pageTitle: pageTitle || getPageTitle(),
          url: typeof window !== 'undefined' ? window.location.href : '',
          timestamp: new Date().toISOString(),
        };

        // Send response back to iframe
        if (event.source) {
          (event.source as Window).postMessage(
            {
              type: 'SESSION_DATA_RESPONSE',
              sessionData,
              formData,
              pageContext,
            },
            '*'
          );

          console.log('SESSION_DATA_RESPONSE gönderildi:', {
            sessionData,
            formData,
            pageContext,
          });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [pageType, pageTitle, session]);

  // Get page title based on type
  const getPageTitle = () => {
    switch (pageType) {
      case 'ayarlar':
        return 'Ana Ayarlar';
      case 'kurumsal':
        return 'Kurumsal Ayarlar';
      case 'asistanlar':
        return 'Asistan Ayarları';
      default:
        return 'Ayarlar';
    }
  };

  // Open chatbot
  const handleOpen = () => {
    setIsOpen(true);
  };

  // Close chatbot
  const handleClose = () => {
    setIsOpen(false);
  };

  if (!showWidget || status !== 'authenticated') {
    return null;
  }

  return (
    <div
      id="fokus999-chatbot-widget"
      style={{
        position: 'fixed',
        bottom: '22px',
        right: '22px',
        fontFamily: 'Arial, sans-serif',
        zIndex: 9999,
        userSelect: 'none',
      }}
    >
      <style jsx>{`
        #chatbot-icon {
          border-radius: 12px;
          padding: 4px;
          width: 85px;
          height: 85px;
          text-align: center;
          background: rgb(214, 214, 214);
          cursor: pointer;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;
          display: ${isOpen ? 'none' : 'block'};
        }
        #chatbot-icon:hover {
          transform: scale(1.15);
        }
        #chatbot-icon img {
          width: 60px;
          height: 60px;
          display: block;
          margin: 0 auto;
        }
        .description {
          font-size: 10px;
          font-weight: bold;
          color: #666;
          margin-top: 3px;
          text-transform: capitalize;
        }
        #iframe-container {
          position: relative;
          display: ${isOpen ? 'block' : 'none'};
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
          background: rgba(0, 0, 0, 0.5);
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          z-index: 10000;
          transition: background 0.3s ease;
          font-size: 16px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #chatbot-close-btn:hover {
          background: rgba(0, 0, 0, 0.8);
        }
        #chatbot-iframe {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 12px;
          display: block;
        }
      `}</style>

      {/* Chatbot Icon */}
      <div id="chatbot-icon" title="Teknik Destek - Chatbot'u aç" onClick={handleOpen}>
        <Image
          src="https://static.fokusistatistik.com/resimler/fokus999iconkare.png"
          alt="FOKUS999 Teknik Destek"
          width={60}
          height={60}
        />
        <div className="description">Teknik Destek</div>
      </div>

      {/* Iframe Container */}
      <div id="iframe-container">
        <button id="chatbot-close-btn" title="Kapat" onClick={handleClose}>
          ×
        </button>
        <iframe
          id="chatbot-iframe"
          src="https://asistan.fokusistatistik.com/teknikdestek.html"
          title="FOKUS999 Teknik Destek"
        />
      </div>
    </div>
  );
}
