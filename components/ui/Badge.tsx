import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  icon,
  className = ''
}: BadgeProps) {
  // Base styles
  const baseStyles = 'inline-flex items-center gap-1.5 font-bold rounded-full whitespace-nowrap';
  
  // Variant styles (background + text color)
  const variantStyles = {
    success: 'bg-success-100 text-success-700',
    warning: 'bg-warning-100 text-warning-700',
    error: 'bg-error-100 text-error-700',
    info: 'bg-info-100 text-info-700',
    neutral: 'bg-gray-100 text-gray-700',
    primary: 'bg-primary-100 text-primary-700',
    secondary: 'bg-secondary-100 text-secondary-700'
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm'
  };
  
  // Dot color based on variant
  const dotColors = {
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
    info: 'bg-info-500',
    neutral: 'bg-gray-500',
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500'
  };
  
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  return (
    <span className={combinedStyles}>
      {dot && (
        <span className={`w-2 h-2 rounded-full ${dotColors[variant]}`} />
      )}
      {icon && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      {children}
    </span>
  );
}
