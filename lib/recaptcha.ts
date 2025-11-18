/**
 * Google reCAPTCHA v3 Doğrulama
 * Backend'de token'ı doğrular
 */

export interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
}

/**
 * reCAPTCHA token'ını Google API'de doğrular
 * @param token - Frontend'den gelen reCAPTCHA token
 * @returns Doğrulama sonucu
 */
export async function verifyRecaptcha(token: string): Promise<RecaptchaResponse> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    throw new Error('RECAPTCHA_SECRET_KEY environment variable tanımlanmamış');
  }

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${secretKey}&response=${token}`,
  });

  if (!response.ok) {
    throw new Error('reCAPTCHA doğrulama başarısız');
  }

  return response.json();
}

/**
 * reCAPTCHA skorunu değerlendirir
 * @param score - Google'dan dönen skor (0.0 - 1.0)
 * @param threshold - Minimum kabul edilen skor (varsayılan: 0.5)
 * @returns Bot olup olmadığı
 */
export function isBot(score: number, threshold: number = 0.5): boolean {
  return score < threshold;
}
