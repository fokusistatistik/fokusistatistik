'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

// Google Analytics Configuration
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-WNKZVMGKBF';

export default function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user has accepted cookies
    const cookieConsent = localStorage.getItem('fokusCookieConsent');
    setHasConsent(cookieConsent === 'accepted');

    // Listen for consent changes
    const handleConsentChange = () => {
      const consent = localStorage.getItem('fokusCookieConsent');
      setHasConsent(consent === 'accepted');

      // Reload GA if consent is given after page load
      if (consent === 'accepted' && !isLoaded) {
        loadGA();
      }
    };

    window.addEventListener('cookieConsentAccepted', handleConsentChange);
    return () => window.removeEventListener('cookieConsentAccepted', handleConsentChange);
  }, [isLoaded]);

  useEffect(() => {
    if (hasConsent) {
      loadGA();
    }
  }, [hasConsent]);

  const loadGA = () => {
    if (typeof window !== 'undefined' && !(window as any).gtagLoaded) {
      (window as any).gtagLoaded = true;
      setIsLoaded(true);
    }
  };

  if (!hasConsent) {
    return null;
  }

  return (
    <>
      {/* Google Analytics - with IP anonymization for GDPR/KVKK compliance */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
