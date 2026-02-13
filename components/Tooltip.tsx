'use client';

import { useState, useRef, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
  children?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  icon?: boolean;
}

/**
 * Tooltip Component
 * User-friendly tooltip with hover and click support
 *
 * Features:
 * - Hover to show (desktop)
 * - Click to show (mobile)
 * - Auto-positioning
 * - Accessible (ARIA labels)
 */
export default function Tooltip({
  content,
  children,
  position = 'top',
  icon = true,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close on outside click (mobile)
  useEffect(() => {
    if (!isMobile || !isVisible) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isVisible]);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsVisible(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.stopPropagation();
      setIsVisible(!isVisible);
    }
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-800',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-800',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-800',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-800',
  };

  return (
    <div className="relative inline-flex items-center">
      <div
        ref={triggerRef}
        className="inline-flex items-center cursor-help"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        role="button"
        aria-label="Yardım"
        tabIndex={0}
      >
        {children || (icon && <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 transition" />)}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            absolute z-50 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg
            max-w-xs whitespace-normal
            ${positionClasses[position]}
            animate-fadeIn
          `}
          role="tooltip"
        >
          {content}

          {/* Arrow */}
          <div
            className={`
              absolute w-0 h-0
              border-4 border-transparent
              ${arrowClasses[position]}
            `}
          />
        </div>
      )}
    </div>
  );
}

/**
 * FormTooltip - Specifically for form fields
 * Shows next to labels
 */
export function FormTooltip({ label, tooltip }: { label?: string; tooltip: string }) {
  if (!label) {
    return <Tooltip content={tooltip} position="right" />;
  }

  return (
    <div className="flex items-center gap-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Tooltip content={tooltip} position="right" />
    </div>
  );
}
