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
      {/* Premium Logo Icon - High-end, Modern, Scalable */}
      <div className={`${sizes[size]} flex-shrink-0 relative`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            {/* Premium Amber Gradient */}
            <linearGradient id="nexora-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            
            {/* Glow Filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Outer Ring - Premium Frame */}
          <circle 
            cx="20" 
            cy="20" 
            r="18" 
            stroke="url(#nexora-logo-gradient)" 
            strokeWidth="2" 
            fill="none"
            opacity="0.6"
          />
          
          {/* Inner Ring */}
          <circle 
            cx="20" 
            cy="20" 
            r="13" 
            stroke="url(#nexora-logo-gradient)" 
            strokeWidth="1.5" 
            fill="none"
            opacity="0.8"
          />
          
          {/* Stylized "N" - Modern & Bold */}
          <path 
            d="M 14 26 L 14 14 L 16.5 14 L 23.5 22 L 23.5 14 L 26 14 L 26 26 L 23.5 26 L 16.5 18 L 16.5 26 Z" 
            fill="url(#nexora-logo-gradient)"
            filter="url(#glow)"
          />
          
          {/* Accent Dots - Premium Detail */}
          <circle cx="20" cy="7" r="1.5" fill="#fbbf24" opacity="0.9" />
          <circle cx="33" cy="20" r="1.5" fill="#f59e0b" opacity="0.9" />
          <circle cx="20" cy="33" r="1.5" fill="#d97706" opacity="0.9" />
          <circle cx="7" cy="20" r="1.5" fill="#fbbf24" opacity="0.9" />
          
          {/* Subtle Background Glow */}
          <circle 
            cx="20" 
            cy="20" 
            r="18" 
            fill="url(#nexora-logo-gradient)"
            opacity="0.1"
            filter="url(#glow)"
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
