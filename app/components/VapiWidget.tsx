'use client';

import { useState } from 'react';

export default function VapiWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <style jsx global>{`
        .voice-assistant-container {
          position: fixed;
          bottom: 80px;
          left: 20px;
          z-index: 9998;
          text-align: center;
          user-select: none;
        }

        .voice-assistant-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(134, 0, 0, 0.3);
          overflow: hidden;
        }

        .voice-assistant-btn:hover {
          transform: scale(1.15);
          box-shadow: 0 6px 16px rgba(134, 0, 0, 0.4);
        }

        .voice-assistant-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .voice-assistant-text {
          display: none;
        }

        .voice-modal {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          animation: fadeIn 0.3s ease;
        }

        .voice-modal.open {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .voice-modal-content {
          background: white;
          border-radius: 16px;
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
        }

        .voice-modal-header {
          background: linear-gradient(135deg, #860000 0%, #b30000 100%);
          color: white;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .voice-modal-header h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
        }

        .close-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          color: white;
          font-size: 24px;
          cursor: pointer;
          transition: background 0.2s ease;
          display: flex;
          align-items: center;
          justify-center;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .voice-modal-body {
          padding: 0;
          min-height: 500px;
          max-height: calc(90vh - 80px);
        }

        .voice-modal-body iframe {
          width: 100%;
          height: 500px;
          border: none;
          display: block;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 768px) {
          .voice-assistant-container {
            bottom: 70px;
            left: 15px;
          }

          .voice-assistant-btn {
            width: 40px;
            height: 40px;
          }

          .voice-modal-content {
            width: 95%;
            max-height: 95vh;
          }

          .voice-modal-header h3 {
            font-size: 16px;
          }

          .voice-modal-body iframe {
            height: 400px;
          }
        }

        @media (max-width: 480px) {
          .voice-assistant-btn {
            width: 38px;
            height: 38px;
          }

          .voice-modal-body iframe {
            height: 350px;
          }
        }
      `}</style>

      {/* Sesli Asistan Butonu */}
      <div className="voice-assistant-container">
        <div className="voice-assistant-btn" onClick={openModal}>
          <img
            src="https://static.fokusistatistik.com/resimler/FOKUS520profil.png"
            alt="FOKUS Sesli Asistan"
          />
        </div>
        <div className="voice-assistant-text">
          Sanal Asistanla<br />Sesli Görüş
        </div>
      </div>

      {/* Sesli Asistan Modal */}
      <div
        id="voiceModal"
        className={`voice-modal ${isOpen ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            closeModal();
          }
        }}
      >
        <div className="voice-modal-content">
          <div className="voice-modal-header">
            <h3>Benimle konuşmak için lütfen düğmeye basın</h3>
            <button className="close-btn" onClick={closeModal}>
              ×
            </button>
          </div>
          <div className="voice-modal-body">
            <iframe
              id="voiceFrame"
              src={isOpen ? "https://asistan.fokusistatistik.com/sesliasistan520.html" : ""}
              allowFullScreen
              title="FOKUS520 Sesli Asistan"
            />
          </div>
        </div>
      </div>
    </>
  );
}
