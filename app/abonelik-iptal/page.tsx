'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import './styles.css';

export default function AbonelikIptalPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reasons = [
    { id: 'reason1', value: 'Çok fazla e-posta alıyorum' },
    { id: 'reason2', value: 'İçerikler ilgimi çekmiyor' },
    { id: 'reason3', value: 'Hizmetinizi kullanmayı bıraktım' },
    { id: 'reason4', value: 'Bu e-posta adresini artık kullanmıyorum' },
    { id: 'reason5', value: 'Diğer' },
  ];

  // Get email from URL parameters
  useEffect(() => {
    const emailParam = searchParams.get('email') || searchParams.get('e');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  // Handle checkbox change
  const handleReasonChange = (reasonValue: string, checked: boolean) => {
    if (checked) {
      setSelectedReasons([...selectedReasons, reasonValue]);
    } else {
      setSelectedReasons(selectedReasons.filter((r) => r !== reasonValue));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert('E-posta adresi bulunamadı. Lütfen geçerli bir link kullanın.');
      return;
    }

    setIsSubmitting(true);

    const unsubscribeData = {
      email: email,
      reasons: selectedReasons,
      feedback: feedback,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        'https://n8n.fokusistatistik.com/webhook/epostaaboneligiiptal',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(unsubscribeData),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);

        // Redirect to homepage after 3 seconds
        setTimeout(() => {
          window.location.href = 'https://www.fokusistatistik.com';
        }, 3000);
      } else {
        alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    } catch (error) {
      console.error('Hata:', error);
      alert('Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <div className="unsubscribe-container">
        <div className="unsubscribe-header">
          <Image
            src="https://www.fokusistatistik.com/assets/img/logo.png"
            alt="FOKUS İstatistik Logo"
            width={200}
            height={60}
            priority
          />
          <h1>E-posta Tercihlerinizi Yönetin</h1>
          <p>
            E-posta listemizden ayrılmak istediğinizi görüyoruz. Geri bildiriminiz bizim için önemli.
          </p>
        </div>

        <div className="unsubscribe-content">
          <div className="email-display">
            <strong>E-posta Adresiniz:</strong>
            <div
              className="email-text"
              style={{ color: email ? '#860000' : '#dc2626' }}
            >
              {email || 'E-posta bulunamadı'}
            </div>
          </div>

          {isSubmitted && (
            <div className="success-message show">
              <h3>✓ İşlem Başarılı</h3>
              <p>
                E-posta aboneliğiniz başarıyla iptal edildi. Geri bildiriminiz için teşekkür
                ederiz.
              </p>
            </div>
          )}

          {!isSubmitted && (
            <form id="unsubscribeForm" onSubmit={handleSubmit}>
              <div className="reason-section">
                <p>Ayrılma nedeniniz nedir? (Opsiyonel)</p>

                {reasons.map((reason) => (
                  <div className="checkbox-item" key={reason.id}>
                    <input
                      type="checkbox"
                      id={reason.id}
                      name="reason"
                      value={reason.value}
                      onChange={(e) => handleReasonChange(reason.value, e.target.checked)}
                    />
                    <label htmlFor={reason.id}>{reason.value}</label>
                  </div>
                ))}
              </div>

              <div className="form-group">
                <label htmlFor="feedback">Eklemek istediğiniz bir şey var mı?</label>
                <textarea
                  id="feedback"
                  name="feedback"
                  placeholder="Geri bildiriminiz bize yol gösterir..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>

              <div className="info-box">
                <p>
                  <strong>Not:</strong> E-posta aboneliğinizi iptal etseniz bile önemli hesap
                  bildirimleri ve işlem onayları gibi zorunlu e-postaları almaya devam
                  edeceksiniz.
                </p>
              </div>

              <div className="button-group">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => (window.location.href = 'https://www.fokusistatistik.com')}
                >
                  Vazgeç
                </button>
                <button type="submit" className="btn-unsubscribe" disabled={isSubmitting}>
                  {isSubmitting ? 'İşleniyor...' : 'Abonelikten Çık'}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="unsubscribe-footer">
          <p>
            Fikrinizi değiştirirseniz, her zaman{' '}
            <a href="https://www.fokusistatistik.com">fokusistatistik.com</a> üzerinden tekrar
            abone olabilirsiniz.
          </p>
        </div>
      </div>
    </main>
  );
}
