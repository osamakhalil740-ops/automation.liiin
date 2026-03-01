import React from 'react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'gray' | 'current';
  className?: string;
}

function Spinner({
  size = 'md',
  color = 'primary',
  className = ''
}: SpinnerProps) {
  // Size styles
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4'
  };
  
  // Color styles
  const colorStyles = {
    primary: 'border-gray-200 border-t-primary-500',
    white: 'border-white/20 border-t-white',
    gray: 'border-gray-200 border-t-gray-600',
    current: 'border-current/20 border-t-current'
  };
  
  return (
    <div
      className={`inline-block rounded-full animate-spin ${sizeStyles[size]} ${colorStyles[color]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Dots variant - 3 bouncing dots
export interface DotsSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

export function DotsSpinner({
  size = 'md',
  color = 'primary',
  className = ''
}: DotsSpinnerProps) {
  // Dot size
  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };
  
  // Dot colors
  const dotColors = {
    primary: 'bg-primary-500',
    white: 'bg-white',
    gray: 'bg-gray-600'
  };
  
  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div
        className={`${dotSizes[size]} ${dotColors[color]} rounded-full animate-bounce`}
        style={{ animationDelay: '0ms' }}
      />
      <div
        className={`${dotSizes[size]} ${dotColors[color]} rounded-full animate-bounce`}
        style={{ animationDelay: '150ms' }}
      />
      <div
        className={`${dotSizes[size]} ${dotColors[color]} rounded-full animate-bounce`}
        style={{ animationDelay: '300ms' }}
      />
    </div>
  );
}

// Pulse variant - pulsing circle
export interface PulseSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

export function PulseSpinner({
  size = 'md',
  color = 'primary',
  className = ''
}: PulseSpinnerProps) {
  // Size styles
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };
  
  // Color styles
  const colorStyles = {
    primary: 'bg-primary-500',
    white: 'bg-white',
    gray: 'bg-gray-600'
  };
  
  return (
    <div className={`relative ${className}`}>
      <div
        className={`${sizeStyles[size]} ${colorStyles[color]} rounded-full opacity-75 animate-ping absolute`}
      />
      <div
        className={`${sizeStyles[size]} ${colorStyles[color]} rounded-full`}
      />
    </div>
  );
}

// Export both as named and default
export { Spinner };
export default Spinner;
