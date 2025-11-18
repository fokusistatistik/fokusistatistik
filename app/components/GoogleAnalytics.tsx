'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);
  // Google Tag (Ana etiket - birden fazla hedefe veri gönderir)
  const GA_TAG_ID = process.env.NEXT_PUBLIC_GA_TAG_ID || 'G-WNKZVMGKBF';
  // Measurement ID (Spesifik GA4 akışı)
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-Y1KQHRL4NV';

  useEffect(() => {
    // Check if user has accepted cookies
    const cookieConsent = localStorage.getItem('fokusCookieConsent');
    const consentAccepted = cookieConsent === 'accepted';
    setHasConsent(consentAccepted);

    // Set default consent mode (GDPR/KVKK compliance)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'default', {
        'analytics_storage': consentAccepted ? 'granted' : 'denied',
        'ad_storage': consentAccepted ? 'granted' : 'denied',
        'ad_user_data': consentAccepted ? 'granted' : 'denied',
        'ad_personalization': consentAccepted ? 'granted' : 'denied',
        'wait_for_update': 500
      });
    }

    // Listen for consent changes
    const handleConsentChange = () => {
      const consent = localStorage.getItem('fokusCookieConsent');
      const accepted = consent === 'accepted';
      setHasConsent(accepted);

      // Update consent mode
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          'analytics_storage': accepted ? 'granted' : 'denied',
          'ad_storage': accepted ? 'granted' : 'denied',
          'ad_user_data': accepted ? 'granted' : 'denied',
          'ad_personalization': accepted ? 'granted' : 'denied'
        });
      }
    };

    window.addEventListener('cookieConsentAccepted', handleConsentChange);
    return () => window.removeEventListener('cookieConsentAccepted', handleConsentChange);
  }, []);

  if (!hasConsent) {
    return null;
  }

  return (
    <>
      {/* Google Analytics - Google Tag */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TAG_ID}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Google Tag (Ana etiket)
            gtag('config', '${GA_TAG_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
              linker: {
                domains: ['fokusistatistik.com', 'www.fokusistatistik.com', 'asistan.fokusistatistik.com']
              }
            });

            // GA4 Measurement ID (Spesifik akış)
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}
