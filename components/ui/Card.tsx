import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'glass' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className = ''
}: CardProps) {
  // Base styles
  const baseStyles = 'rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300';
  
  // Variant styles
  const variantStyles = {
    default: 'bg-white border border-gray-100 shadow-sm shadow-gray-200/50',
    elevated: 'bg-white border border-gray-100 shadow-xl shadow-gray-200/60',
    glass: 'bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl shadow-gray-900/10',
    gradient: 'bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-lg shadow-gray-200/50'
  };
  
  // Padding styles
  const paddingStyles = {
    none: '',
    sm: 'p-4 md:p-6',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-12'
  };
  
  // Hover effect
  const hoverStyle = hover ? 'hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1' : '';
  
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyle} ${className}`;
  
  return (
    <div className={combinedStyles}>
      {children}
    </div>
  );
}

// Card sub-components for better composition
export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`mb-6 ${className}`}>
      {children}
    </div>
  );
}

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={`text-xl md:text-2xl font-bold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
}

export interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p className={`text-sm text-gray-500 mt-1 ${className}`}>
      {children}
    </p>
  );
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`mt-6 pt-6 border-t border-gray-100 ${className}`}>
      {children}
    </div>
  );
}
