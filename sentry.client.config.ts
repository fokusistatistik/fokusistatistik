import * as Sentry from '@sentry/nextjs';
import { browserTracingIntegration, replayIntegration } from '@sentry/nextjs';

/**
 * Sentry Client Configuration
 * Error tracking for client-side errors
 */

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || 'https://196e6d84f952f2459e7c02e17e563b46@o4510357778333696.ingest.de.sentry.io/4510357789343824',

  // Environment
  environment: process.env.NODE_ENV,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Session Replay
  replaysSessionSampleRate: 0.1, // 10% of sessions
  replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

  // Only enable in production
  enabled: process.env.NODE_ENV === 'production',

  // Integrations
  integrations: [
    browserTracingIntegration(),
    replayIntegration({
      // Mask all text content, images, etc.
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Filter out certain errors
  ignoreErrors: [
    // Browser extensions
    'top.GLOBALS',
    'chrome-extension://',
    'moz-extension://',
    // Network errors
    'NetworkError',
    'Network request failed',
    'Failed to fetch',
    // Random plugins/extensions
    'Can\'t find variable: ZiteReader',
    'jigsaw is not defined',
    'ComboSearch is not defined',
  ],

  // Before send hook - filter sensitive data
  beforeSend(event, hint) {
    // Don't send events if DSN is not configured
    if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
      return null;
    }

    // Filter out sensitive data from requests
    if (event.request) {
      if (event.request.cookies) {
        delete event.request.cookies;
      }
      if (event.request.headers) {
        delete event.request.headers['Authorization'];
        delete event.request.headers['Cookie'];
      }
    }

    return event;
  },
});
