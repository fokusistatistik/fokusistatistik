/**
 * FOKUS Toast Utilities
 * Standardize edilmiş toast notification sistemi
 *
 * Kullanım:
 * ```typescript
 * import { toast } from '@/lib/toast';
 *
 * toast.success('İşlem başarılı!');
 * toast.error('Bir hata oluştu');
 * toast.promise(saveData(), {
 *   loading: 'Kaydediliyor...',
 *   success: 'Kaydedildi!',
 *   error: 'Kayıt başarısız'
 * });
 * ```
 */

import { toast as sonnerToast } from 'sonner';

// Toast types
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

// Custom toast options
interface ToastOptions {
  duration?: number;
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Başarı mesajı
 */
const success = (message: string, options?: ToastOptions) => {
  return sonnerToast.success(message, {
    duration: options?.duration || 4000,
    dismissible: options?.dismissible !== false,
    action: options?.action,
  });
};

/**
 * Hata mesajı
 */
const error = (message: string, options?: ToastOptions) => {
  return sonnerToast.error(message, {
    duration: options?.duration || 5000,
    dismissible: options?.dismissible !== false,
    action: options?.action,
  });
};

/**
 * Uyarı mesajı
 */
const warning = (message: string, options?: ToastOptions) => {
  return sonnerToast.warning(message, {
    duration: options?.duration || 4000,
    dismissible: options?.dismissible !== false,
    action: options?.action,
  });
};

/**
 * Bilgi mesajı
 */
const info = (message: string, options?: ToastOptions) => {
  return sonnerToast.info(message, {
    duration: options?.duration || 3000,
    dismissible: options?.dismissible !== false,
    action: options?.action,
  });
};

/**
 * Yükleniyor mesajı
 */
const loading = (message: string) => {
  return sonnerToast.loading(message);
};

/**
 * Promise-based toast
 * Loading → Success/Error otomatiği
 */
const promise = <T,>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: any) => string);
  }
) => {
  return sonnerToast.promise(promise, messages);
};

/**
 * Toast'u kapat
 */
const dismiss = (toastId?: string | number) => {
  if (toastId) {
    sonnerToast.dismiss(toastId);
  } else {
    sonnerToast.dismiss();
  }
};

/**
 * Özel toast (custom)
 */
const custom = (jsx: React.ReactNode | ((id: string | number) => React.ReactElement), options?: ToastOptions) => {
  return sonnerToast.custom(jsx as any, {
    duration: options?.duration || 4000,
    dismissible: options?.dismissible !== false,
  });
};

// =======================
// FOKUS ÖZEL MESAJLARI
// =======================

/**
 * Kaydetme işlemi için özel toast
 */
const saving = (entityName: string = 'Veriler') => {
  return loading(`${entityName} kaydediliyor...`);
};

/**
 * Yükleme işlemi için özel toast
 */
const uploading = (fileName?: string) => {
  return loading(fileName ? `${fileName} yükleniyor...` : 'Dosya yükleniyor...');
};

/**
 * Silme işlemi için özel toast
 */
const deleting = (entityName: string = 'Kayıt') => {
  return loading(`${entityName} siliniyor...`);
};

/**
 * Webhook retry toast'u
 */
const retry = (attempt: number, maxAttempts: number) => {
  return info(`Yeniden deneniyor... (${attempt}/${maxAttempts})`);
};

/**
 * Oturum süresi doldu uyarısı
 */
const sessionExpired = () => {
  return warning('Oturum süreniz doldu. Lütfen tekrar giriş yapın.', {
    duration: 6000,
    action: {
      label: 'Giriş Yap',
      onClick: () => {
        window.location.href = '/google-auth-landing';
      },
    },
  });
};

/**
 * Değişiklikler kaydedilmedi uyarısı
 */
const unsavedChanges = () => {
  return warning('Kaydedilmemiş değişiklikleriniz var!', {
    duration: 5000,
    action: {
      label: 'Kaydet',
      onClick: () => {
        // Trigger save from context or event
        window.dispatchEvent(new CustomEvent('save-form'));
      },
    },
  });
};

/**
 * Hoş geldiniz mesajı
 */
const welcome = (name: string) => {
  return success(`Hoş geldiniz, ${name}! 🎉`, {
    duration: 3000,
  });
};

/**
 * İşlem tamamlandı (celebration)
 */
const celebration = (message: string) => {
  return success(`${message} 🎉`, {
    duration: 4000,
  });
};

// Export all methods
export const toast = {
  success,
  error,
  warning,
  info,
  loading,
  promise,
  dismiss,
  custom,

  // FOKUS özel metodları
  saving,
  uploading,
  deleting,
  retry,
  sessionExpired,
  unsavedChanges,
  welcome,
  celebration,
};
