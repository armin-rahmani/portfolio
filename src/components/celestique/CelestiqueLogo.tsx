import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'footer';
  variant?: 'dark' | 'light';
}

export const CelestiqueLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
}) => {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-white' : 'text-[#1C1917]';
  const starFill = isLight ? '#FFFFFF' : '#1C1917';

  // Sizing variants
  const sizeClasses = {
    sm: 'text-2xl sm:text-3xl tracking-tight',
    md: 'text-4xl sm:text-5xl tracking-tight',
    lg: 'text-6xl sm:text-7xl lg:text-8xl tracking-tight',
    hero: 'text-[12vw] sm:text-[13vw] leading-[0.88] tracking-[-0.03em]',
    footer: 'text-[13vw] sm:text-[14vw] leading-[0.85] tracking-[-0.03em]',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center font-editorial select-none uppercase font-normal ${textColor} ${sizeClasses[size]} ${className}`}
      style={{
        fontFamily: "'Cormorant Garamond', 'Italiana', 'Cinzel Decorative', Georgia, serif",
      }}
    >
      <span className="flex items-center">
        {/* C with inner star */}
        <span className="relative inline-block">
          C
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-1/2 w-[0.25em] h-[0.25em] pointer-events-none opacity-90 animate-pulse"
            viewBox="0 0 24 24"
            fill={starFill}
          >
            <path d="M12 0L14 9.5L24 12L14 14.5L12 24L10 14.5L0 12L10 9.5L12 0Z" />
          </svg>
        </span>
        <span>E</span>
        <span>L</span>
        <span>E</span>
        {/* S with inner star */}
        <span className="relative inline-block">
          S
          <svg
            className="absolute top-[42%] left-[48%] -translate-x-1/2 -translate-y-1/2 w-[0.22em] h-[0.22em] pointer-events-none opacity-85"
            viewBox="0 0 24 24"
            fill={starFill}
          >
            <path d="M12 0L14 9.5L24 12L14 14.5L12 24L10 14.5L0 12L10 9.5L12 0Z" />
          </svg>
        </span>
        <span>T</span>
        <span>I</span>
        {/* Q with celestial tail & star */}
        <span className="relative inline-block">
          Q
          <svg
            className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[0.24em] h-[0.24em] pointer-events-none opacity-90 animate-pulse"
            viewBox="0 0 24 24"
            fill={starFill}
          >
            <path d="M12 0L14 9.5L24 12L14 14.5L12 24L10 14.5L0 12L10 9.5L12 0Z" />
          </svg>
        </span>
        <span>U</span>
        <span>E</span>
      </span>
    </div>
  );
};
