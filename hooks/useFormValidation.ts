/**
 * Form Validation Hook
 * Zod schema'ları ile client-side validation
 */

import { useState } from 'react';
import { z } from 'zod';
import { validateForm } from '@/lib/validationSchemas';

interface ValidationResult<T> {
  isValid: boolean;
  errors: string[];
  data?: T;
}

export function useFormValidation<T>(schema: z.Schema<T>) {
  const [errors, setErrors] = useState<string[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  /**
   * Form data'yı validate eder
   */
  const validate = (data: unknown): ValidationResult<T> => {
    setIsValidating(true);
    const result = validateForm(schema, data);
    setIsValidating(false);

    if (result.success) {
      setErrors([]);
      return {
        isValid: true,
        errors: [],
        data: result.data,
      };
    } else {
      setErrors(result.errors);
      return {
        isValid: false,
        errors: result.errors,
      };
    }
  };

  /**
   * Hataları temizler
   */
  const clearErrors = () => {
    setErrors([]);
  };

  /**
   * Tek bir field'i validate eder
   */
  const validateField = <K extends keyof T>(
    fieldName: K,
    value: T[K]
  ): boolean => {
    try {
      // @ts-ignore - Dynamic field validation
      if (schema.shape && schema.shape[fieldName]) {
        // @ts-ignore
        schema.shape[fieldName].parse(value);
        return true;
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.map(err => err.message);
        setErrors(prev => [...prev, ...fieldErrors]);
        return false;
      }
      return false;
    }
  };

  return {
    validate,
    validateField,
    clearErrors,
    errors,
    isValidating,
    hasErrors: errors.length > 0,
  };
}

/**
 * Real-time validation hook (onChange)
 */
export function useRealtimeValidation<T>(schema: z.Schema<T>) {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  /**
   * Tek bir field'i validate eder ve hata gösterir
   */
  const validateField = (fieldName: string, value: any) => {
    try {
      // @ts-ignore
      if (schema.shape && schema.shape[fieldName]) {
        // @ts-ignore
        schema.shape[fieldName].parse(value);
        setFieldErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[fieldName];
          return newErrors;
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0]?.message || 'Geçersiz değer';
        setFieldErrors(prev => ({
          ...prev,
          [fieldName]: errorMessage,
        }));
      }
    }
  };

  /**
   * Tüm field'leri temizle
   */
  const clearErrors = () => {
    setFieldErrors({});
  };

  /**
   * Belirli bir field'i temizle
   */
  const clearFieldError = (fieldName: string) => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  return {
    validateField,
    clearErrors,
    clearFieldError,
    fieldErrors,
    hasError: (fieldName: string) => !!fieldErrors[fieldName],
    getError: (fieldName: string) => fieldErrors[fieldName],
  };
}
