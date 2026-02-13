'use client';

import { CheckCircle2, Loader2, AlertCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/formatDate';

interface SaveIndicatorProps {
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  lastSaved: Date | null;
  className?: string;
}

/**
 * SaveIndicator Component
 * Shows auto-save status to users
 *
 * States:
 * - Saving... (spinner)
 * - Saved (check mark + time)
 * - Unsaved changes (warning)
 * - Never saved (empty)
 */
export default function SaveIndicator({
  isSaving,
  hasUnsavedChanges,
  lastSaved,
  className = '',
}: SaveIndicatorProps) {
  if (isSaving) {
    return (
      <div className={`flex items-center gap-2 text-sm text-blue-600 ${className}`}>
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Kaydediliyor...</span>
      </div>
    );
  }

  if (hasUnsavedChanges) {
    return (
      <div className={`flex items-center gap-2 text-sm text-amber-600 ${className}`}>
        <Clock className="w-4 h-4" />
        <span>Kaydedilmemiş değişiklikler</span>
      </div>
    );
  }

  if (lastSaved) {
    return (
      <div className={`flex items-center gap-2 text-sm text-green-600 ${className}`}>
        <CheckCircle2 className="w-4 h-4" />
        <span>Kaydedildi • {formatDistanceToNow(lastSaved)}</span>
      </div>
    );
  }

  return null;
}

/**
 * FloatingSaveIndicator
 * Fixed position indicator (bottom-right corner)
 */
export function FloatingSaveIndicator({
  isSaving,
  hasUnsavedChanges,
  lastSaved,
}: Omit<SaveIndicatorProps, 'className'>) {
  // Don't show if nothing to display
  if (!isSaving && !hasUnsavedChanges && !lastSaved) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200">
      <SaveIndicator
        isSaving={isSaving}
        hasUnsavedChanges={hasUnsavedChanges}
        lastSaved={lastSaved}
      />
    </div>
  );
}
