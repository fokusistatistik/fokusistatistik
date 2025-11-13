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
          bottom: 60px;
          right: 30px;
          font-family: Arial, sans-serif;
          z-index: 9999;
          user-select: none;
        }

        #chatbot-icon {
          border-radius: 12px;
          padding: 5px;
          width: 70px;
          text-align: center;
          background: rgb(214, 214, 214);
          cursor: pointer;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;
        }

        #chatbot-icon:hover {
          transform: scale(1.25);
        }

        #chatbot-icon img {
          width: 45px;
          height: 45px;
          display: block;
          margin: 0 auto;
        }

        #chatbot-icon .description {
          font-size: 10px;
          color: #666;
          margin-top: 3px;
          text-transform: capitalize;
        }

        #iframe-container {
          position: relative;
          display: none;
          margin-top: 6px;
          width: 350px;
          height: 500px;
          border-radius: 12px;
          overflow: hidden;
        }

        #iframe-container.open {
          display: block;
        }

        #chatbot-close-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(0, 0, 0, 0.5);
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          z-index: 10000;
          transition: background 0.3s ease;
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

        @keyframes pulseAnimation {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.5);
          }
          100% {
            transform: scale(1);
          }
        }

        .pulse-animate {
          animation: pulseAnimation 2s ease-in-out;
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
          <img src="/assets/img/fokus216kare.png" alt="FOKUS216" />
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
