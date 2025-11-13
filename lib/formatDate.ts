/**
 * Date Formatting Utilities
 * User-friendly date/time formatters in Turkish
 */

/**
 * Format relative time (e.g., "2 dakika önce")
 */
export function formatDistanceToNow(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 10) {
    return 'az önce';
  }

  if (diffInSeconds < 60) {
    return `${diffInSeconds} saniye önce`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} dakika önce`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} saat önce`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} gün önce`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} hafta önce`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ay önce`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} yıl önce`;
}

/**
 * Format full date and time
 */
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Format date only
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Format time only
 */
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
