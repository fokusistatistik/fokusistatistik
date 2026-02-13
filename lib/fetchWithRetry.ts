/**
 * Webhook istekleri için retry mekanizması
 * Rate limiting veya network hatalarında otomatik yeniden deneme
 * Kullanıcı deneyimini bozmayacak şekilde exponential backoff kullanır
 */

interface FetchWithRetryOptions extends RequestInit {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  onRetry?: (attempt: number, delay: number, error: Error) => void;
}

interface RetryableError {
  isRetryable: boolean;
  shouldRetry: boolean;
}

/**
 * HTTP status koduna göre retry yapılabilir mi kontrol eder
 */
function isRetryableStatus(status: number): boolean {
  return (
    status === 408 || // Request Timeout
    status === 429 || // Too Many Requests (Rate Limit)
    status === 500 || // Internal Server Error
    status === 502 || // Bad Gateway
    status === 503 || // Service Unavailable
    status === 504    // Gateway Timeout
  );
}

/**
 * Hatanın retry yapılabilir olup olmadığını kontrol eder
 */
function isRetryableError(error: any): RetryableError {
  // Network hataları (internet kesilmesi, DNS hatası, vb.)
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return { isRetryable: true, shouldRetry: true };
  }

  // Timeout hataları
  if (error.name === 'AbortError' || error.message.includes('timeout')) {
    return { isRetryable: true, shouldRetry: true };
  }

  // HTTP hataları
  if (error.status && isRetryableStatus(error.status)) {
    return { isRetryable: true, shouldRetry: true };
  }

  // 4xx hataları (Client errors) - retry yapma
  if (error.status && error.status >= 400 && error.status < 500 && error.status !== 408 && error.status !== 429) {
    return { isRetryable: false, shouldRetry: false };
  }

  return { isRetryable: false, shouldRetry: false };
}

/**
 * Exponential backoff hesaplar (2^attempt * baseDelay + jitter)
 */
function calculateDelay(attempt: number, baseDelay: number, maxDelay: number): number {
  // Exponential backoff: 2^attempt * baseDelay
  const exponentialDelay = Math.pow(2, attempt) * baseDelay;

  // Jitter ekle (rastgelelik) - aynı anda retry yapan requestler için
  const jitter = Math.random() * 1000;

  // Max delay'i aşmasın
  return Math.min(exponentialDelay + jitter, maxDelay);
}

/**
 * Bekle (sleep) fonksiyonu
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetch with retry - Webhook istekleri için kullanıcı dostu retry mekanizması
 *
 * @param url - İstek URL'i
 * @param options - Fetch options + retry ayarları
 * @returns Promise<Response>
 *
 * @example
 * ```typescript
 * const response = await fetchWithRetry('https://api.example.com/data', {
 *   method: 'POST',
 *   body: JSON.stringify(data),
 *   maxRetries: 3,
 *   onRetry: (attempt, delay) => {
 *     console.log(`Yeniden deneniyor... (${attempt}/3)`);
 *   }
 * });
 * ```
 */
export async function fetchWithRetry(
  url: string,
  options: FetchWithRetryOptions = {}
): Promise<Response> {
  const {
    maxRetries = 3,        // Maksimum 3 deneme
    baseDelay = 1000,      // İlk deneme: 1 saniye sonra
    maxDelay = 10000,      // Maksimum 10 saniye bekle
    onRetry,
    ...fetchOptions
  } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // İlk deneme değilse, bekle
      if (attempt > 0) {
        const delay = calculateDelay(attempt - 1, baseDelay, maxDelay);

        // Kullanıcıya feedback ver
        if (onRetry) {
          onRetry(attempt, delay, lastError!);
        }

        await sleep(delay);
      }

      // Fetch isteği yap
      const response = await fetch(url, {
        ...fetchOptions,
        signal: AbortSignal.timeout(30000), // 30 saniye timeout
      });

      // Başarılı response
      if (response.ok) {
        return response;
      }

      // HTTP hata kodu
      const error: any = new Error(`HTTP ${response.status}: ${response.statusText}`);
      error.status = response.status;
      error.response = response;

      // Retry yapılabilir mi?
      const { shouldRetry } = isRetryableError(error);

      if (!shouldRetry || attempt === maxRetries) {
        throw error;
      }

      lastError = error;

    } catch (error: any) {
      // Son deneme ise veya retry yapılamıyorsa, hata fırlat
      const { shouldRetry } = isRetryableError(error);

      if (!shouldRetry || attempt === maxRetries) {
        throw error;
      }

      lastError = error;
    }
  }

  // Bu noktaya asla gelmemeli ama TypeScript için
  throw lastError || new Error('Unknown error');
}

/**
 * JSON response için wrapper
 */
export async function fetchJSON<T = any>(
  url: string,
  options: FetchWithRetryOptions = {}
): Promise<T> {
  const response = await fetchWithRetry(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Webhook POST için helper
 */
export async function postToWebhook<T = any>(
  url: string,
  data: any,
  options: FetchWithRetryOptions = {}
): Promise<T> {
  return fetchJSON<T>(url, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });
}
