/**
 * useAutoSave Hook
 * Automatically saves form data after user stops typing
 *
 * Features:
 * - Debounced auto-save (configurable delay)
 * - Save on keyboard shortcut (Ctrl+S / Cmd+S)
 * - Unsaved changes warning
 * - Loading and error states
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { toast } from '@/lib/toast';

interface UseAutoSaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<void>;
  delay?: number; // milliseconds
  enabled?: boolean;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface UseAutoSaveReturn {
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  lastSaved: Date | null;
  forceSave: () => Promise<void>;
}

export function useAutoSave<T>({
  data,
  onSave,
  delay = 3000, // 3 seconds default
  enabled = true,
  onSuccess,
  onError,
}: UseAutoSaveOptions<T>): UseAutoSaveReturn {
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastDataRef = useRef<T>(data);
  const isMountedRef = useRef(true);

  // Save function
  const save = useCallback(async () => {
    if (!enabled || isSaving) return;

    try {
      setIsSaving(true);
      await onSave(data);

      if (isMountedRef.current) {
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
        lastDataRef.current = data;

        if (onSuccess) {
          onSuccess();
        } else {
          toast.success('Değişiklikler kaydedildi', { duration: 2000 });
        }
      }
    } catch (error) {
      if (isMountedRef.current) {
        const err = error as Error;
        if (onError) {
          onError(err);
        } else {
          toast.error(`Kayıt hatası: ${err.message}`);
        }
      }
    } finally {
      if (isMountedRef.current) {
        setIsSaving(false);
      }
    }
  }, [data, enabled, isSaving, onSave, onSuccess, onError]);

  // Auto-save on data change
  useEffect(() => {
    if (!enabled) return;

    // Check if data actually changed
    const hasChanged = JSON.stringify(data) !== JSON.stringify(lastDataRef.current);

    if (hasChanged) {
      setHasUnsavedChanges(true);

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        save();
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay, enabled, save]);

  // Keyboard shortcut (Ctrl+S / Cmd+S)
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (hasUnsavedChanges) {
          save();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, hasUnsavedChanges, save]);

  // Unsaved changes warning
  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'Kaydedilmemiş değişiklikleriniz var. Sayfadan ayrılmak istediğinizden emin misiniz?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [enabled, hasUnsavedChanges]);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Custom save-form event listener (triggered from toast.unsavedChanges)
  useEffect(() => {
    if (!enabled) return;

    const handleCustomSave = () => {
      if (hasUnsavedChanges) {
        save();
      }
    };

    window.addEventListener('save-form', handleCustomSave);
    return () => window.removeEventListener('save-form', handleCustomSave);
  }, [enabled, hasUnsavedChanges, save]);

  return {
    isSaving,
    hasUnsavedChanges,
    lastSaved,
    forceSave: save,
  };
}
