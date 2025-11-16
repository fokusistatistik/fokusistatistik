'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([
    { text: 'Merhaba! Size nasıl yardımcı olabilirim?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    'İşletmeme Yapay Zekayı nasıl entegre ederim?',
    'Ücretsiz Danışmanlık almak istiyorum',
    'FOKUS Ekosistemi nedir?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = async (message?: string) => {
    const userMessage = message || inputValue.trim();
    if (!userMessage) return;

    // Kullanıcı mesajını ekle
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInputValue('');
    setIsLoading(true);
    setShowQuickReplies(false);

    try {
      const response = await fetch('https://n8n.fokusistatistik.com/webhook/fokus216clasic250001', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();
      const botReply = data.output || 'Üzgünüm, bir hata oluştu.';

      setMessages(prev => [...prev, { text: botReply, sender: 'bot' }]);
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
      setMessages(prev => [...prev, {
        text: 'Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin.',
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      sendMessage();
    }
  };

  return (
    <>
      <style jsx global>{`
        .chat-widget {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .chat-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #860000 0%, #b30000 100%);
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(134, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          color: white;
          font-size: 28px;
        }

        .chat-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(134, 0, 0, 0.4);
        }

        .chat-tooltip {
          position: absolute;
          bottom: 70px;
          right: 0;
          background: white;
          color: #333;
          padding: 8px 16px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 500;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
          white-space: nowrap;
          animation: fadeIn 0.3s ease;
          pointer-events: none;
        }

        .chat-tooltip::after {
          content: '';
          position: absolute;
          bottom: -6px;
          right: 20px;
          width: 12px;
          height: 12px;
          background: white;
          transform: rotate(45deg);
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .chat-widget .chat-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 380px !important;
          min-width: 380px;
          max-width: 380px;
          height: 550px !important;
          min-height: 550px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          display: flex !important;
          flex-direction: column !important;
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chat-widget .chat-header {
          background: linear-gradient(135deg, #860000 0%, #b30000 100%);
          color: white;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .chat-header-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .chat-header-info h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }

        .chat-header-info p {
          margin: 4px 0 0 0;
          font-size: 13px;
          opacity: 0.9;
        }

        .chat-widget .chat-messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background: #f8f9fa;
          width: 100%;
        }

        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }

        .chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .chat-messages::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 3px;
        }

        .message {
          margin-bottom: 16px;
          display: flex;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message.user {
          justify-content: flex-end;
        }

        .message-content {
          max-width: 75%;
          padding: 12px 16px;
          border-radius: 16px;
          line-height: 1.5;
          font-size: 14px;
        }

        .message.bot .message-content {
          background: white;
          color: #333;
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .message.user .message-content {
          background: #860000;
          color: white;
          border-bottom-right-radius: 4px;
        }

        .chat-widget .chat-input-area {
          padding: 16px;
          background: white;
          border-top: 1px solid #e9ecef;
          display: flex;
          gap: 12px;
          flex-shrink: 0;
          width: 100%;
        }

        .chat-input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #dee2e6;
          border-radius: 24px;
          outline: none;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .chat-input:focus {
          border-color: #860000;
          box-shadow: 0 0 0 3px rgba(134, 0, 0, 0.1);
        }

        .send-button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #860000;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          color: white;
          font-size: 18px;
        }

        .send-button:hover:not(:disabled) {
          background: #b30000;
          transform: scale(1.05);
        }

        .send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 12px 16px;
        }

        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #999;
          animation: typing 1.4s infinite;
        }

        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }

        .quick-replies {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 0 16px 16px 16px;
        }

        .quick-reply-button {
          background: white;
          border: 1px solid #860000;
          color: #860000;
          padding: 10px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 13px;
          text-align: left;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .quick-reply-button:hover {
          background: #860000;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(134, 0, 0, 0.2);
        }

        @media (max-width: 480px) {
          .chat-widget .chat-window {
            width: calc(100vw - 32px) !important;
            min-width: calc(100vw - 32px);
            max-width: calc(100vw - 32px);
            height: calc(100vh - 120px) !important;
            max-height: 600px;
          }
        }
      `}</style>

      <div className="chat-widget">
        <button
          className="chat-button"
          onClick={toggleChat}
          aria-label="Chat"
        >
          {isChatOpen ? (
            '✕'
          ) : (
            <div className="relative">
              <Image
                src="https://static.fokusistatistik.com/resimler/fokus216kare.png"
                alt="FOKUS216"
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
          )}
        </button>

        {isChatOpen && (
          <div className="chat-window">
            <div className="chat-header">
              <div className="chat-header-avatar">
                <Image
                  src="https://static.fokusistatistik.com/resimler/fokus216kare.png"
                  alt="FOKUS216"
                  fill
                  className="object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="chat-header-info">
                <h3>FOKUS216</h3>
                <p>Müşteri Hizmetleri Asistanı</p>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  <div className="message-content">{msg.text}</div>
                </div>
              ))}

              {isLoading && (
                <div className="message bot">
                  <div className="message-content">
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {showQuickReplies && messages.length === 1 && (
              <div className="quick-replies">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    className="quick-reply-button"
                    onClick={() => sendMessage(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            <div className="chat-input-area">
              <input
                type="text"
                className="chat-input"
                placeholder="Mesajınızı yazın..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <button
                className="send-button"
                onClick={() => sendMessage()}
                disabled={isLoading || !inputValue.trim()}
                aria-label="Gönder"
              >
                ➤
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
