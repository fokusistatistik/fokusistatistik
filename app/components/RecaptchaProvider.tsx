'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ReactNode } from 'react';

export default function RecaptchaProvider({ children }: { children: ReactNode }) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

  // Graceful degradation: reCAPTCHA anahtarı yoksa provider olmadan çalış
  if (!recaptchaSiteKey) {
    console.warn('⚠️ reCAPTCHA anahtarı tanımlanmamış - Formlar güvenliksiz modda çalışıyor');
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
