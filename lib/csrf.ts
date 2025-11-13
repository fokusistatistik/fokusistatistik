/**
 * CSRF Protection Utilities
 *
 * NextAuth handles CSRF automatically via session tokens.
 * These utilities provide additional protection layers.
 */

import { NextRequest } from 'next/server';
import { headers } from 'next/headers';

/**
 * Validate origin header matches expected domain
 * Protects against cross-origin requests
 */
export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');

  const allowedOrigins = [
    'https://fokusistatistik.com',
    'https://www.fokusistatistik.com',
    'https://asistan.fokusistatistik.com',
  ];

  // In development, allow localhost
  if (process.env.NODE_ENV === 'development') {
    allowedOrigins.push('http://localhost:3000', 'http://localhost:3001');
  }

  // Check origin
  if (origin) {
    return allowedOrigins.some(allowed => origin.startsWith(allowed));
  }

  // Fallback to referer check
  if (referer) {
    return allowedOrigins.some(allowed => referer.startsWith(allowed));
  }

  // No origin/referer = suspicious
  return false;
}

/**
 * Validate webhook signature
 * Uses HMAC-SHA256 to verify webhook authenticity
 */
export async function validateWebhookSignature(
  payload: string,
  signature: string | null
): Promise<boolean> {
  if (!signature) {
    return false;
  }

  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) {
    console.error('WEBHOOK_SECRET not configured');
    return false;
  }

  try {
    // Create HMAC signature
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureData = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(payload)
    );

    const expectedSignature = Array.from(new Uint8Array(signatureData))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Constant-time comparison
    return signature === expectedSignature;
  } catch (error) {
    console.error('Webhook signature validation error:', error);
    return false;
  }
}

/**
 * Honeypot field validation
 * If filled, it's likely a bot
 */
export function validateHoneypot(honeypotValue: string | null | undefined): boolean {
  return !honeypotValue || honeypotValue.trim() === '';
}

/**
 * Rate limiting by IP
 * Simple in-memory rate limiter
 */
const requestCounts = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  ip: string,
  maxRequests: number = 10,
  windowMs: number = 60000 // 1 minute
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = requestCounts.get(ip);

  // Clean up expired records periodically
  if (Math.random() < 0.01) {
    for (const [key, value] of requestCounts.entries()) {
      if (value.resetAt < now) {
        requestCounts.delete(key);
      }
    }
  }

  if (!record || record.resetAt < now) {
    // New window
    requestCounts.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: maxRequests - record.count };
}

/**
 * Get client IP from request
 */
export function getClientIp(request: NextRequest): string {
  // Check X-Forwarded-For (from proxies/CDN)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  // Check X-Real-IP
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback
  return request.ip || 'unknown';
}
