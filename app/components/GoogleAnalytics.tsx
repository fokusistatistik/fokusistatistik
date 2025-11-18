'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-WNKZVMGKBF';

  useEffect(() => {
    // Check if user has accepted cookies
    const cookieConsent = localStorage.getItem('fokusCookieConsent');
    setHasConsent(cookieConsent === 'accepted');

    // Listen for consent changes
    const handleConsentChange = () => {
      const consent = localStorage.getItem('fokusCookieConsent');
      setHasConsent(consent === 'accepted');
    };

    window.addEventListener('cookieConsentAccepted', handleConsentChange);
    return () => window.removeEventListener('cookieConsentAccepted', handleConsentChange);
  }, []);

  if (!hasConsent) {
    return null;
  }

  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true
            });
          `,
        }}
      />
    </>
  );
}
