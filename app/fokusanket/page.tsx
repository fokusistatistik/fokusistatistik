'use client';

import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import './styles.css';

export default function FokusAnketPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);
  const [leadCaptureChoice, setLeadCaptureChoice] = useState('');

  // Form data state
  const [formData, setFormData] = useState({
    sektor: '',
    calisan: '',
    zaman_kaybi: [] as string[],
    personel_gider: '',
    yz_kullanim: '',
    veri_entegre: '',
    yz_entegre: '',
    sanal_guven: '',
    asistan_ilgi: '',
    otomasyon_alan: [] as string[],
    lead_capture: '',
    email: '',
    notes: '',
  });

  const totalQuestions = 11;

  // Check if survey was already submitted
  useEffect(() => {
    const alreadySubmitted = localStorage.getItem('fokusAnketDolduruldu');
    if (alreadySubmitted === 'true') {
      setIsAlreadySubmitted(true);
      showToast('Bu anketi daha önce doldurdunuz. Teşekkür ederiz!', 'error');
    }
  }, []);

  // Toast notification system
  const showToast = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach((toast) => toast.remove());

    // Create toast container if not exists
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
      `;
      document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';

    const bgColor =
      type === 'error' ? '#ff4757' : type === 'success' ? '#2ed573' : '#5352ed';

    toast.innerHTML = `
      <div style="
        background: ${bgColor};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        margin-bottom: 10px;
        font-family: 'IBM Plex Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 14px;
        max-width: 300px;
        word-wrap: break-word;
        animation: slideIn 0.3s ease;
      ">
        ${message}
      </div>
    `;

    toastContainer.appendChild(toast);

    // Auto close
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };

  // Handle radio input change
  const handleRadioChange = (name: string, value: string) => {
    if (isAlreadySubmitted) {
      showToast('Bu anketi daha önce doldurdunuz. Teşekkür ederiz!', 'error');
      return;
    }
    setFormData({ ...formData, [name]: value });
    if (name === 'lead_capture') {
      setLeadCaptureChoice(value);
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    if (isAlreadySubmitted) {
      showToast('Bu anketi daha önce doldurdunuz. Teşekkür ederiz!', 'error');
      return;
    }
    const currentValues = formData[name as keyof typeof formData] as string[];
    if (checked) {
      setFormData({ ...formData, [name]: [...currentValues, value] });
    } else {
      setFormData({ ...formData, [name]: currentValues.filter((v) => v !== value) });
    }
  };

  // Handle text input change
  const handleInputChange = (name: string, value: string) => {
    if (isAlreadySubmitted) {
      showToast('Bu anketi daha önce doldurdunuz. Teşekkür ederiz!', 'error');
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  // Check if current question is answered
  const isQuestionAnswered = () => {
    switch (currentQuestion) {
      case 1:
        return formData.sektor !== '';
      case 2:
        return formData.calisan !== '';
      case 3:
        return formData.zaman_kaybi.length > 0;
      case 4:
        return formData.personel_gider !== '';
      case 5:
        return formData.yz_kullanim !== '';
      case 6:
        return formData.veri_entegre !== '';
      case 7:
        return formData.yz_entegre !== '';
      case 8:
        return formData.sanal_guven !== '';
      case 9:
        return formData.asistan_ilgi !== '';
      case 10:
        return formData.otomasyon_alan.length > 0;
      case 11:
        return true; // Email will be validated on submit
      default:
        return false;
    }
  };

  // Navigate to next question
  const nextQuestion = () => {
    if (isAlreadySubmitted) {
      showToast('Bu anketi daha önce doldurdunuz. Teşekkür ederiz!', 'error');
      return;
    }

    if (!isQuestionAnswered()) {
      showToast('Lütfen bu soruyu yanıtlayın.', 'error');
      return;
    }

    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Navigate to previous question
  const previousQuestion = () => {
    if (isAlreadySubmitted) {
      showToast('Bu anketi daha önce doldurdunuz. Teşekkür ederiz!', 'error');
      return;
    }

    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isAlreadySubmitted) {
      showToast('Bu anketi daha önce doldurdunuz. Teşekkür ederiz!', 'error');
      return;
    }

    // Validate email
    if (!formData.email.trim()) {
      showToast('Lütfen e-posta adresinizi girin.', 'error');
      return;
    }

    try {
      // Send data to webhook
      const response = await fetch(
        'https://n8n.fokusistatistik.com/webhook/fokusveribilimianketformu',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log('Survey data sent successfully');
        showToast('Anket başarıyla gönderildi!', 'success');

        // Mark as submitted
        localStorage.setItem('fokusAnketDolduruldu', 'true');
        setIsAlreadySubmitted(true);
        setIsSubmitted(true);
        setShowThankYou(true);
      } else {
        throw new Error('Failed to submit survey');
      }
    } catch (error) {
      console.error('Error sending survey data:', error);
      showToast('Veri gönderilirken bir hata oluştu.', 'error');
    }
  };

  // Progress calculation
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="survey-wrapper">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <div className="logo">
              <Image
                src="https://static.fokusistatistik.com/logolar/fokuslogo1.png"
                alt="FOKUS Logo"
                width={150}
                height={65}
                priority
              />
            </div>
            <p className="subtitle">
              <strong>✨ İşletmenizi Yapay Zeka Çağına Taşıyalım ✨</strong>
              <br />
              İşletmenizin dijital dönüşümle verimlilik artışı için pazar araştırması
              <br />
              <strong>1-2 dakika sürecek bu anket ile geleceğinizi şekillendirin</strong>
            </p>
          </div>
        </div>

        {/* Survey Form */}
        {!showThankYou && (
          <div className="form-container" id="survey-form">
            {/* Progress Bar */}
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="questions-area">
              <form id="surveyForm" onSubmit={handleSubmit}>
                {/* Soru 1: Sektör */}
                {currentQuestion === 1 && (
                  <div className="question-group active" data-question="1">
                    <div className="question-title">
                      <span className="question-number">1</span>
                      Sektörünüz?
                    </div>
                    <div className="options sector-options">
                      {[
                        { id: 'sektor1', value: 'Finans & Bankacılık', label: '💰 Finans & Bankacılık' },
                        { id: 'sektor2', value: 'Sağlık & Tıbbi Hizmetler', label: '🏥 Sağlık & Tıbbi Hizmetler' },
                        { id: 'sektor3', value: 'E-ticaret & Perakende', label: '🛒 E-ticaret & Perakende' },
                        { id: 'sektor4', value: 'Eğitim & Danışmanlık', label: '📚 Eğitim & Danışmanlık' },
                        { id: 'sektor5', value: 'Güzellik ve Estetik', label: '🧴 Güzellik ve Estetik' },
                        { id: 'sektor6', value: 'Muhasebe & Hukuk, İdari İşler', label: '⚖️ Muhasebe & Hukuk, İdari İşler' },
                        { id: 'sektor7', value: 'Emlak & İnşaat', label: '🏢 Emlak & İnşaat' },
                        { id: 'sektor8', value: 'Teknoloji & Yazılım', label: '💻 Teknoloji & Yazılım' },
                        { id: 'sektor9', value: 'İmalat & Üretim', label: '🏭 İmalat & Üretim' },
                        { id: 'sektor10', value: 'Diğer', label: '🔧 Diğer' },
                      ].map((option) => (
                        <div className="option" key={option.id}>
                          <input
                            type="radio"
                            id={option.id}
                            name="sektor"
                            value={option.value}
                            checked={formData.sektor === option.value}
                            onChange={(e) => handleRadioChange('sektor', e.target.value)}
                            disabled={isAlreadySubmitted}
                          />
                          <label htmlFor={option.id}>{option.label}</label>
                        </div>
                      ))}
                    </div>

                    <div className="navigation">
                      <div></div>
                      <button
                        type="button"
                        className={`btn btn-primary ${isAlreadySubmitted ? 'disabled' : ''}`}
                        onClick={nextQuestion}
                        disabled={isAlreadySubmitted}
                      >
                        Sonraki →
                      </button>
                    </div>
                  </div>
                )}

                {/* Soru 2: Çalışan Sayısı */}
                {currentQuestion === 2 && (
                  <div className="question-group active" data-question="2">
                    <div className="question-title">
                      <span className="question-number">2</span>
                      Çalışan sayınız?
                    </div>
                    <div className="options">
                      {[
                        { id: 'calisan1', value: '1-9', label: '👤 1-9 kişi' },
                        { id: 'calisan2', value: '10-49', label: '👥 10-49 kişi' },
                        { id: 'calisan3', value: '50-249', label: '🏢 50-249 kişi' },
                        { id: 'calisan4', value: '250+', label: '🏭 250+ kişi' },
                      ].map((option) => (
                        <div className="option" key={option.id}>
                          <input
                            type="radio"
                            id={option.id}
                            name="calisan"
                            value={option.value}
                            checked={formData.calisan === option.value}
                            onChange={(e) => handleRadioChange('calisan', e.target.value)}
                            disabled={isAlreadySubmitted}
                          />
                          <label htmlFor={option.id}>{option.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Soru 3: Zaman Kaybettiren İşler */}
                {currentQuestion === 3 && (
                  <div className="question-group multi-select active" data-question="3">
                    <div className="question-title">
                      <span className="question-number">3</span>
                      En çok zaman kaybettiren işleriniz hangileri? (Birden fazla seçebilirsiniz)
                    </div>
                    <div className="options">
                      {[
                        { id: 'zaman1', value: 'Randevu ve rezervasyon', label: '📅 Randevu ve rezervasyon' },
                        { id: 'zaman2', value: 'Müşteri sorularını yanıtlama', label: '💬 Müşteri sorularını yanıtlama' },
                        { id: 'zaman3', value: 'Veri girişi ve raporlama', label: '📊 Veri girişi ve raporlama' },
                        { id: 'zaman4', value: 'Form ve döküman işlemleri', label: '📋 Form ve döküman işlemleri' },
                        { id: 'zaman5', value: 'Fatura ve muhasebe işleri', label: '💸 Fatura ve muhasebe işleri' },
                        { id: 'zaman6', value: 'E-posta ve mesaj yönetimi', label: '📧 E-posta ve mesaj yönetimi' },
                        { id: 'zaman7', value: 'İçerik üretimi ve sosyal medya', label: '📱 İçerik üretimi ve sosyal medya' },
                        { id: 'zaman8', value: 'Stok ve envanter takibi', label: '📦 Stok ve envanter takibi' },
                        { id: 'zaman9', value: 'Personel Yönetimi', label: '👥 Personel Yönetimi' },
                      ].map((option) => (
                        <div className="option" key={option.id}>
                          <input
                            type="checkbox"
                            id={option.id}
                            name="zaman_kaybi"
                            value={option.value}
                            checked={formData.zaman_kaybi.includes(option.value)}
                            onChange={(e) =>
                              handleCheckboxChange('zaman_kaybi', e.target.value, e.target.checked)
                            }
                            disabled={isAlreadySubmitted}
                          />
                          <label htmlFor={option.id}>{option.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Soru 4: Personel Giderleri */}
                {currentQuestion === 4 && (
                  <div className="question-group active" data-question="4">
                    <div className="question-title">
                      <span className="question-number">4</span>
                      Personel giderlerinizi azaltmak ister misiniz?
                    </div>
                    <div className="options">
                      {[
                        { id: 'gider1', value: 'Evet, acil olarak', label: '🚨 Evet, acil olarak' },
                        { id: 'gider2', value: 'Evet, kademeli olarak', label: '📈 Evet, kademeli olarak' },
                        { id: 'gider3', value: 'Kararsızım', label: '🤔 Kararsızım' },
                        { id: 'gider4', value: 'Hayır, mevcut durumumdan memnunum', label: '✅ Hayır, mevcut durumumdan memnunum' },
                      ].map((option) => (
                        <div className="option" key={option.id}>
                          <input
                            type="radio"
                            id={option.id}
                            name="personel_gider"
                            value={option.value}
                            checked={formData.personel_gider === option.value}
                            onChange={(e) => handleRadioChange('personel_gider', e.target.value)}
                            disabled={isAlreadySubmitted}
                          />
                          <label htmlFor={option.id}>{option.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Soru 5: YZ Kullanımı */}
                {currentQuestion === 5 && (
                  <div className="question-group active" data-question="5">
                    <div className="question-title">
                      <span className="question-number">5</span>
                      ChatGPT, Gemini, Claude gibi YZ modellerini ÜCRETLİ kullanıyor musunuz?
                    </div>
                    <div className="options">
                      {[
                        { id: 'yz1', value: 'Evet, düzenli kullanıyorum', label: '🤖 Evet, düzenli kullanıyorum' },
                        { id: 'yz2', value: 'Bazen kullanıyorum', label: '⚡ Bazen kullanıyorum' },
                        { id: 'yz3', value: 'Sadece ücretsiz versiyonları kullanıyorum', label: '🆓 Sadece ücretsiz versiyonları kullanıyorum' },
                        { id: 'yz4', value: 'Hiç kullanmıyorum', label: '❌ Hiç kullanmıyorum' },
                      ].map((option) => (
                        <div className="option" key={option.id}>
                          <input
                            type="radio"
                            id={option.id}
                            name="yz_kullanim"
                            value={option.value}
                            checked={formData.yz_kullanim === option.value}
                            onChange={(e) => handleRadioChange('yz_kullanim', e.target.value)}
                            disabled={isAlreadySubmitted}
                          />
                          <label htmlFor={option.id}>{option.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Soru 6: Veri Entegrasyonu */}
                {currentQuestion === 6 && (
                  <div className="question-group active" data-question="6">
                    <div className="question-title">
                      <span className="question-number">6</span>
                      Kullandığınız tüm yazılımların verileriniz (CRM, İK, Sosyal Medya, Raporlama, Finans-Muhasebe) birbirine entegre ve karşılaştırılabilir durumda mı?
                    </div>
                    <div className="options">
                      {[
                        { id: 'entegre1', value: 'Evet', label: '✅ Evet' },
                        { id: 'entegre2', value: 'Hayır', label: '❌ Hayır' },
                      ].map((option) => (
                        <div className="option" key={option.id}>
                          <input
                            type="radio"
                            id={option.id}
                            name="veri_entegre"
                            value={option.value}
                            checked={formData.veri_entegre === option.value}
                            onChange={(e) => handleRadioChange('veri_entegre', e.target.value)}
                            disabled={isAlreadySubmitted}
                          />
                          <label htmlFor={option.id}>{option.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Soru 7: YZ Entegrasyonu */}
                {currentQuestion === 7 && (
                  <div className="question-group active" data-question="7">
                    <div className="question-title">
                      <span className="question-number">7</span>
                      YZ çözümlerini işinize entegre etmek istiyor musunuz?
                    </div>
                    <div className="options">
                      {[
                        { id: 'yz_entegre1', value: 'Evet, hemen başlamak istiyorum', label: '🚀 Evet, hemen başlamak istiyorum' },
                        { id: 'yz_entegre2', value: 'Evet, ama önce bilgi almak istiyorum', label: '💡 Evet, ama önce bilgi almak istiyorum' },
                        { id: 'yz_entegre3', value: 'Kararsızım', label: '🤷 Kararsızım' },
                        { id: 'yz_entegre4', value: 'Hayır, şimdilik düşünmüyorum', label: '⏸️ Hayır, şimdilik düşünmüyorum' },
                      ].map((option) => (
                        <div className="option" key={option.id}>
                          <input
                            type="radio"
                            id={option.id}
                            name="yz_entegre"
                            value={option.value}
                            checked={formData.yz_entegre === option.value}
                            onChange={(e) => handleRadioChange('yz_entegre', e.target.value)}
                            disabled={isAlreadySubmitted}
                          />
                          <label htmlFor={option.id}>{option.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Soru 8: Sanal Asistan Güveni */}
                {currentQuestion === 8 && (
                  <div className="question-group active" data-question="8">
                    <div className="question-title">
                      <span className="question-number">8</span>
                      Yapay Zeka destekli Sanal asistanlara güvenir misiniz?
                    </div>
                    <div className="options">
                      {[
                        { id: 'guven1', value: 'Tamamen güveniyorum', label: '💯 Tamamen güveniyorum' },
                        { id: 'guven2', value: 'Kısmi olarak güveniyorum', label: '🔐 Kısmi olarak güveniyorum' },
                        { id: 'guven3', value: 'Kararsızım', label: '🤔 Kararsızım' },
                        { id: 'guven4', value: 'Güvenmiyorum', label: '⚠️ Güvenmiyorum' },
                      ].map((option) => (
                        <div className="option" key={option.id}>
                          <input
                            type="radio"
                            id={option.id}
                            name="sanal_guven"
                            value={option.value}
                            checked={formData.sanal_guven === option.value}
                            onChange={(e) => handleRadioChange('sanal_guven', e.target.value)}
                            disabled={isAlreadySubmitted}
                          />
                          <label htmlFor={option.id}>{option.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Soru 9: 7/24 Asistan İlgisi */}
                {currentQuestion === 9 && (
                  <div className="question-group active" data-question="9">
                    <div className="question-title">
                      <span className="question-number">9</span>
                      7/24 çalışan, SSK gideri olmayan asistanlar ilginizi çeker mi?
                    </div>
                    <div className="options">
                      {[
                        { id: 'ilgi1', value: 'Çok ilgimi çekiyor', label: '⭐ Çok ilgimi çekiyor' },
                        { id: 'ilgi2', value: 'İlgimi çekiyor', label: '👍 İlgimi çekiyor' },
                        { id: 'ilgi3', value: 'Kararsızım', label: '🤷 Kararsızım' },
                        { id: 'ilgi4', value: 'İlgimi çekmiyor', label: '👎 İlgimi çekmiyor' },
                      ].map((option) => (
                        <div className="option" key={option.id}>
                          <input
                            type="radio"
                            id={option.id}
                            name="asistan_ilgi"
                            value={option.value}
                            checked={formData.asistan_ilgi === option.value}
                            onChange={(e) => handleRadioChange('asistan_ilgi', e.target.value)}
                            disabled={isAlreadySubmitted}
                          />
                          <label htmlFor={option.id}>{option.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Soru 10: Otomasyon Alanları */}
                {currentQuestion === 10 && (
                  <div className="question-group multi-select active" data-question="10">
                    <div className="question-title">
                      <span className="question-number">10</span>
                      Hangi alanda öncelikle otomasyon isterdiniz? (Birden fazla seçebilirsiniz)
                    </div>
                    <div className="options">
                      {[
                        { id: 'oto1', value: 'Müşteri Hizmetleri Asistanı', label: '💬 Müşteri Hizmetleri Asistanı' },
                        { id: 'oto2', value: 'Sosyal Medya Asistanı', label: '💰 Sosyal Medya Asistanı' },
                        { id: 'oto3', value: 'Muhasebe Asistanı', label: '📊 Muhasebe-Finans Asistanı' },
                        { id: 'oto4', value: 'Pazarlama ve CRM Asistanı', label: '📈 Pazarlama ve CRM Asistanı' },
                        { id: 'oto5', value: 'İK Asistanı', label: '👥 İK Asistanı' },
                        { id: 'oto6', value: 'Veri Analiz Asistanı', label: '📋 Veri Analiz Asistanı' },
                        { id: 'oto7', value: 'Randevu Yönetim Asistanı', label: '📅 Randevu Yönetim Asistanı' },
                        { id: 'oto8', value: 'Döküman İşleme Asistanı', label: '📄 Döküman İşleme Asistanı' },
                        { id: 'oto9', value: 'Görsel İçerik Üretim Asistanı', label: '📱 Görsel İçerik Üretim Asistanı' },
                        { id: 'oto10', value: 'Stok Takip Asistanı', label: '📦 Stok Takip Asistanı' },
                        { id: 'oto11', value: 'Diğer', label: '🛒 Diğer' },
                        { id: 'oto12', value: 'Şu an için gerek duymuyorum', label: '❌ Şu an için gerek duymuyorum' },
                      ].map((option) => (
                        <div className="option" key={option.id}>
                          <input
                            type="checkbox"
                            id={option.id}
                            name="otomasyon_alan"
                            value={option.value}
                            checked={formData.otomasyon_alan.includes(option.value)}
                            onChange={(e) =>
                              handleCheckboxChange('otomasyon_alan', e.target.value, e.target.checked)
                            }
                            disabled={isAlreadySubmitted}
                          />
                          <label htmlFor={option.id}>{option.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Soru 11: Lead Capture */}
                {currentQuestion === 11 && (
                  <div className="question-group active" data-question="11">
                    <div className="question-title">
                      <span className="question-number">11</span>
                      Hizmetlerimiz hakkında detaylı bilgilendirme yapmak için geri dönüş yapmamızı ister misiniz?
                    </div>

                    <div className="options">
                      {[
                        { id: 'lead1', value: 'Evet', label: '✅ Evet, Bilgilendirme yapmak için geri dönüş yapabilirsiniz.' },
                        { id: 'lead2', value: 'Hayır', label: '❌ Hayır, sadece anketi tamamlamak istiyorum' },
                      ].map((option) => (
                        <div className="option" key={option.id}>
                          <input
                            type="radio"
                            id={option.id}
                            name="lead_capture"
                            value={option.value}
                            checked={formData.lead_capture === option.value}
                            onChange={(e) => handleRadioChange('lead_capture', e.target.value)}
                            disabled={isAlreadySubmitted}
                          />
                          <label htmlFor={option.id}>{option.label}</label>
                        </div>
                      ))}
                    </div>

                    <div className="email-form">
                      <div className="form-group">
                        <label htmlFor="email">E-posta Adresiniz *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="ornek@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={isAlreadySubmitted}
                        />
                      </div>
                    </div>
                    <br />

                    <div className="notes-form">
                      <div className="form-group">
                        <label htmlFor="notes">
                          Bize iletmek istediğiniz bir mesaj var mı? (Notlar, Sorular, Ek Bilgiler)
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          rows={4}
                          placeholder="Mesajınızı buraya yazabilirsiniz..."
                          value={formData.notes}
                          onChange={(e) => handleInputChange('notes', e.target.value)}
                          disabled={isAlreadySubmitted}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                {currentQuestion > 1 && (
                  <div className="navigation" id="mainNavigation">
                    <button
                      type="button"
                      className={`btn btn-secondary ${isAlreadySubmitted ? 'disabled' : ''}`}
                      onClick={previousQuestion}
                      disabled={isAlreadySubmitted}
                    >
                      ← Önceki
                    </button>

                    {currentQuestion < totalQuestions ? (
                      <button
                        type="button"
                        className={`btn btn-primary ${isAlreadySubmitted ? 'disabled' : ''}`}
                        onClick={nextQuestion}
                        disabled={isAlreadySubmitted}
                      >
                        Sonraki →
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className={`btn btn-primary ${isAlreadySubmitted ? 'disabled' : ''}`}
                        disabled={isAlreadySubmitted}
                      >
                        🚀 Anketi Tamamla
                      </button>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {/* Thank You Message */}
        {showThankYou && (
          <div className="thank-you show">
            <div className="thank-you-icon">🎉</div>
            <h2>Teşekkür Ederiz!</h2>
            <p>
              Anketimizi tamamladığınız için çok teşekkürler.
              <br />
              Verdiğiniz değerli bilgiler, işletmenizi daha verimli hale getirmek için önemli ipuçları
              sunuyor.
            </p>

            <div className="promo-box">
              <h3>🎁 Özel Fırsat!</h3>
              <p>
                <strong>7 GÜN ÜCRETSİZ DENEME</strong> hakkınızı kazandınız!
              </p>
              <p>
                FOKUS Sanal Asistanlarımızı hiçbir ücret ödemeden deneyebilir, işletmenizde nasıl bir fark
                yarattığını görebilirsiniz.
              </p>
              <a href="https://asistan.fokusistatistik.com/" className="website-link" target="_blank" rel="noopener noreferrer">
                🚀 Hemen Başlayın
              </a>
              <a
                href="https://www.fokusistatistik.com/analiz.html"
                className="analysis-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                📊 Ücretsiz Analiz
              </a>
            </div>

            <div className="final-message">
              {leadCaptureChoice === 'Hayır' ? (
                <p>
                  📊 Kişiselleştirilmiş analiz için yukarıdaki butona tıklayın.
                  <br />
                  💬 Sorularınız için bizimle iletişime geçmekten çekinmeyin!
                </p>
              ) : (
                <p>
                  📩 Cevaplarınıza özel hazırlanan detaylı anket raporunuz, e-posta adresinize 1 dakika
                  içerisinde gönderilecektir.
                  <br />
                  📥 Lütfen spam klasörünüzü kontrol etmeyi unutmayın.
                  <br />
                  💡 Görüş ve geri bildirimlerinizi bizimle paylaşmanızdan memnuniyet duyarız.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Link */}
      <div
        style={{
          position: 'fixed',
          bottom: '5px',
          width: '100%',
          textAlign: 'center',
          zIndex: 1000,
        }}
      >
        <a
          href="https://www.fokusistatistik.com"
          style={{ color: '#860000', fontWeight: 'bold', fontSize: '0.7rem', textDecoration: 'none' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          www.fokusistatistik.com
        </a>
      </div>
    </div>
  );
}
