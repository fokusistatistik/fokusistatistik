import * as Sentry from '@sentry/nextjs';

/**
 * Sentry Server Configuration
 * Error tracking for server-side errors
 */

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment
  environment: process.env.NODE_ENV,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Only enable in production
  enabled: process.env.NODE_ENV === 'production',

  // Integrations
  integrations: [],

  // Filter out certain errors
  ignoreErrors: [
    'ECONNREFUSED',
    'ETIMEDOUT',
    'ENOTFOUND',
    'aborted',
  ],

  // Before send hook - filter sensitive data
  beforeSend(event, hint) {
    // Don't send events if DSN is not configured
    if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
      return null;
    }

    // Filter out sensitive data
    if (event.request) {
      if (event.request.cookies) {
        delete event.request.cookies;
      }
      if (event.request.headers) {
        delete event.request.headers['authorization'];
        delete event.request.headers['cookie'];
      }
    }

    // Remove sensitive environment variables
    if (event.contexts?.runtime?.env) {
      const env = event.contexts.runtime.env as any;
      delete env.GOOGLE_CLIENT_SECRET;
      delete env.NEXTAUTH_SECRET;
      delete env.WEBHOOK_SECRET;
      delete env.N8N_WEBHOOK_URL;
    }

    return event;
  },
});
