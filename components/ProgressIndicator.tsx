'use client';

import { Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

/**
 * ProgressBar Component
 * Linear progress indicator with percentage
 */
export function ProgressBar({
  current,
  total,
  label,
  showPercentage = true,
  className = '',
}: ProgressIndicatorProps) {
  const percentage = Math.min(Math.round((current / total) * 100), 100);

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && <span className="text-sm text-gray-700">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-medium text-gray-900">{percentage}%</span>
          )}
        </div>
      )}

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#860000] to-[#a50000] transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

/**
 * CircularProgress Component
 * Circular progress indicator (spinner style)
 */
export function CircularProgress({
  current,
  total,
  label,
  className = '',
}: Omit<ProgressIndicatorProps, 'showPercentage'>) {
  const percentage = Math.min(Math.round((current / total) * 100), 100);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative w-24 h-24">
        {/* Background circle */}
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
            className="text-[#860000] transition-all duration-500 ease-out"
            strokeLinecap="round"
          />
        </svg>

        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
        </div>
      </div>

      {label && <p className="mt-4 text-sm text-gray-700">{label}</p>}
    </div>
  );
}

interface StepIndicatorStep {
  label: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
}

interface StepIndicatorProps {
  steps: StepIndicatorStep[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

/**
 * StepIndicator Component
 * Multi-step progress indicator
 * Perfect for wizards, onboarding, and multi-stage processes
 */
export function StepIndicator({
  steps,
  orientation = 'horizontal',
  className = '',
}: StepIndicatorProps) {
  const isVertical = orientation === 'vertical';

  return (
    <div
      className={`
        ${isVertical ? 'flex flex-col space-y-4' : 'flex items-center justify-between'}
        ${className}
      `}
    >
      {steps.map((step, index) => (
        <div
          key={index}
          className={`
            flex items-center
            ${isVertical ? 'w-full' : 'flex-1'}
          `}
        >
          {/* Step */}
          <div className={`flex ${isVertical ? 'flex-row w-full' : 'flex-col'} items-center`}>
            {/* Icon/Number */}
            <div className="relative flex items-center justify-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                  transition-all duration-300
                  ${
                    step.status === 'completed'
                      ? 'bg-green-500 text-white'
                      : step.status === 'error'
                      ? 'bg-red-500 text-white'
                      : step.status === 'in_progress'
                      ? 'bg-[#860000] text-white ring-4 ring-[#860000]/20'
                      : 'bg-gray-200 text-gray-600'
                  }
                `}
              >
                {step.status === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : step.status === 'error' ? (
                  <XCircle className="w-5 h-5" />
                ) : step.status === 'in_progress' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Clock className="w-5 h-5" />
                )}
              </div>
            </div>

            {/* Label */}
            <div className={`${isVertical ? 'ml-4 flex-1' : 'mt-2 text-center'}`}>
              <p
                className={`
                  text-sm font-medium
                  ${
                    step.status === 'in_progress' || step.status === 'completed'
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  }
                `}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="text-xs text-gray-500 mt-1">{step.description}</p>
              )}
            </div>
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={`
                ${
                  isVertical
                    ? 'w-0.5 h-full ml-5 my-2'
                    : 'flex-1 h-0.5 mx-2'
                }
                ${
                  steps[index + 1].status === 'completed' ||
                  steps[index + 1].status === 'in_progress'
                    ? 'bg-[#860000]'
                    : 'bg-gray-200'
                }
                transition-colors duration-300
              `}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * LoadingDots Component
 * Simple animated loading dots
 * For inline loading states
 */
export function LoadingDots({ text = 'Yükleniyor' }: { text?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">{text}</span>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-[#860000] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-1.5 h-1.5 bg-[#860000] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-1.5 h-1.5 bg-[#860000] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}

/**
 * SkeletonLoader Component
 * Skeleton screen for content loading
 */
export function SkeletonLoader({
  lines = 3,
  avatar = false,
  className = '',
}: {
  lines?: number;
  avatar?: boolean;
  className?: string;
}) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="flex items-start gap-4">
        {avatar && <div className="w-12 h-12 bg-gray-200 rounded-full" />}
        <div className="flex-1 space-y-3">
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-gray-200 rounded"
              style={{ width: i === lines - 1 ? '70%' : '100%' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
