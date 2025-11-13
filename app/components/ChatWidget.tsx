'use client';

import { useState, useEffect } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  // Pulse animasyonunu başlat
  useEffect(() => {
    // İlk pulse 3 saniye sonra
    const initialTimer = setTimeout(() => {
      setPulseKey((prev) => prev + 1);
    }, 3000);

    // Sonra her 10 saniyede bir
    const interval = setInterval(() => {
      if (!isOpen) {
        setPulseKey((prev) => prev + 1);
      }
    }, 10000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <style jsx global>{`
        #fokus216-chatbot-widget {
          position: fixed;
          bottom: 80px;
          right: 20px;
          font-family: Arial, sans-serif;
          z-index: 9999;
          user-select: none;
        }

        #chatbot-icon {
          border-radius: 12px;
          padding: 4px;
          width: 50px;
          text-align: center;
          background: rgb(214, 214, 214);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        #chatbot-icon:hover {
          transform: scale(1.15);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
        }

        #chatbot-icon img {
          width: 100%;
          height: auto;
          display: block;
          margin: 0 auto;
        }

        #chatbot-icon .description {
          display: none;
        }

        #iframe-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          display: none;
          width: 350px;
          height: 500px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          background: white;
        }

        #iframe-container.open {
          display: block;
        }

        #chatbot-close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(134, 0, 0, 0.9);
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          color: white;
          font-weight: bold;
          font-size: 20px;
          cursor: pointer;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        #chatbot-close-btn:hover {
          background: rgba(179, 0, 0, 0.9);
          transform: scale(1.1);
        }

        #chatbot-iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        @keyframes pulseAnimation {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }

        .pulse-animate {
          animation: pulseAnimation 2s ease-in-out;
        }

        /* Mobile adaptations */
        @media (max-width: 768px) {
          #fokus216-chatbot-widget {
            bottom: 70px;
            right: 15px;
          }

          #chatbot-icon {
            width: 40px;
            padding: 3px;
          }

          #iframe-container {
            bottom: 10px;
            right: 10px;
            left: 10px;
            width: calc(100% - 20px);
            height: calc(100vh - 100px);
            max-height: 600px;
          }

          #chatbot-close-btn {
            width: 36px;
            height: 36px;
            font-size: 24px;
          }
        }

        @media (max-width: 480px) {
          #chatbot-icon {
            width: 38px;
          }

          #iframe-container {
            height: calc(100vh - 80px);
          }
        }
      `}</style>

      <div id="fokus216-chatbot-widget">
        <div
          id="chatbot-icon"
          title="Chatbot'u aç"
          onClick={toggleChat}
          className={pulseKey > 0 && !isOpen ? 'pulse-animate' : ''}
          key={pulseKey}
          style={{ display: isOpen ? 'none' : 'block' }}
        >
          <img src="/assets/img/fokus216kare.svg" alt="FOKUS216" />
          <div className="description">Size nasıl yardımcı olabilirim?</div>
        </div>

        <div id="iframe-container" className={isOpen ? 'open' : ''}>
          <button
            id="chatbot-close-btn"
            title="Kapat"
            onClick={toggleChat}
          >
            ×
          </button>
          <iframe
            id="chatbot-iframe"
            src="https://asistan.fokusistatistik.com/chatbot216.html"
            title="FOKUS216 Chatbot"
          />
        </div>
      </div>
    </>
  );
}
