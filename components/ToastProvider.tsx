'use client';

import { Toaster } from 'sonner';

/**
 * Global Toast Provider
 * Tüm uygulama için modern, kullanıcı dostu toast notification sistemi
 *
 * Sonner kullanımı:
 * - Modern, minimal design
 * - Promise-based loading states
 * - Accessibility built-in
 * - Keyboard navigation support
 */
export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#fff',
          color: '#1f2937',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          padding: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        className: 'fokus-toast',
      }}
      closeButton
      richColors
      expand={false}
      visibleToasts={3}
    />
  );
}
