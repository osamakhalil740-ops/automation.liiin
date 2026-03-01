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
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Icon */}
      <div className={`${sizes[size]} flex-shrink-0`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nexora-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
          </defs>
          
          {/* Outer ring - subtle */}
          <circle 
            cx="16" 
            cy="16" 
            r="14" 
            stroke="url(#nexora-gradient)" 
            strokeWidth="1.5" 
            opacity="0.3"
            fill="none"
          />
          
          {/* Middle ring */}
          <circle 
            cx="16" 
            cy="16" 
            r="10" 
            stroke="url(#nexora-gradient)" 
            strokeWidth="2" 
            opacity="0.6"
            fill="none"
          />
          
          {/* Inner core with gradient fill */}
          <circle 
            cx="16" 
            cy="16" 
            r="6" 
            fill="url(#nexora-gradient)"
          />
          
          {/* Connection nodes - 4 points */}
          <circle cx="16" cy="3" r="2" fill="#a855f7" />
          <circle cx="29" cy="16" r="2" fill="#a855f7" />
          <circle cx="16" cy="29" r="2" fill="#a855f7" />
          <circle cx="3" cy="16" r="2" fill="#a855f7" />
          
          {/* Subtle glow effect */}
          <circle 
            cx="16" 
            cy="16" 
            r="6" 
            fill="url(#nexora-gradient)"
            opacity="0.5"
            filter="blur(2px)"
          />
        </svg>
      </div>

      {/* Text */}
      {showText && (
        <span className={`${textSizes[size]} font-bold tracking-tight text-white`}>
          Nexora
        </span>
      )}
    </div>
  );
}
