import React from 'react';

interface NexoraLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function NexoraLogo({ size = 'md', showText = true, className = '' }: NexoraLogoProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Premium Icon with Gradient */}
      <div className={`${sizes[size]} flex-shrink-0`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nexora-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          
          {/* Modern "N" Shape */}
          <path 
            d="M 8 24 L 8 8 L 11 8 L 21 20 L 21 8 L 24 8 L 24 24 L 21 24 L 11 12 L 11 24 Z" 
            fill="url(#nexora-gradient)"
          />
          
          {/* Subtle glow effect */}
          <path 
            d="M 8 24 L 8 8 L 11 8 L 21 20 L 21 8 L 24 8 L 24 24 L 21 24 L 11 12 L 11 24 Z" 
            fill="url(#nexora-gradient)"
            opacity="0.3"
            filter="blur(3px)"
          />
        </svg>
      </div>

      {/* Premium Text - Following AUTOMATIO style */}
      {showText && (
        <span className={`${textSizes[size]} nexora-brand-text`}>
          NEXORA
        </span>
      )}
    </div>
  );
}
