/**
 * Memory-based Rate Limiter
 * Aynı IP'den gelen istekleri sınırlar
 * Sunucuya Redis kurulumuna gerek yok
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// IP bazlı request sayaçları (memory)
const rateLimitMap = new Map<string, RateLimitEntry>();

// Cleanup: Her 10 dakikada bir eski kayıtları temizle
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 10 * 60 * 1000);

export interface RateLimitConfig {
  maxRequests: number; // Maksimum istek sayısı
  windowMs: number;    // Zaman penceresi (ms)
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

/**
 * Rate limit kontrolü yapar
 * @param identifier - Genellikle IP adresi
 * @param config - Rate limit yapılandırması
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  // İlk istek veya süre dolmuşsa yenile
  if (!entry || now > entry.resetTime) {
    const resetTime = now + config.windowMs;
    rateLimitMap.set(identifier, { count: 1, resetTime });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime,
    };
  }

  // Limit aşıldı mı?
  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  // Sayacı artır
  entry.count++;
  rateLimitMap.set(identifier, entry);

  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Request'ten IP adresini alır
 * Not: X-Real-IP önceliklidir çünkü nginx bunu $remote_addr ile üzerine yazar
 * (client tarafından sahtelenemez). X-Forwarded-For zincire eklenir, client
 * kendi sahte IP'sini başa ekleyebileceği için tek başına güvenilmez.
 */
export function getClientIP(request: Request): string {
  const real = request.headers.get('x-real-ip');
  if (real) {
    return real.trim();
  }

  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  // Fallback
  return 'unknown';
}
