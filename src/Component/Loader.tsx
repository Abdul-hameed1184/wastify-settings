import React from 'react';

interface LoaderProps {
  variant?: 'fullscreen' | 'contained' | 'inline';
  size?: 'sm' | 'md' | 'lg';
  text?: string | boolean;
  color?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  variant = 'contained',
  size = 'md',
  text = 'Loading...',
  color = 'primary',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const borderClasses = {
    sm: 'border-[4px]',
    md: 'border-[6px]',
    lg: 'border-[8px]',
  };

  const containerClasses = {
    fullscreen: 'fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90 backdrop-blur-lg',
    contained: 'relative w-full h-full min-h-[250px] flex flex-col items-center justify-center bg-transparent',
    inline: 'inline-flex items-center justify-center',
  };

  const spinner = (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Outer ring */}
      <div className={`absolute inset-0 rounded-full ${borderClasses[size]} border-${color}/30 shadow-sm`}></div>
      {/* Animated segment */}
      <div
        className={`absolute inset-0 rounded-full ${borderClasses[size]} border-t-transparent border-l-transparent border-r-transparent border-b-${color} animate-spin drop-shadow-md`}
        style={{ borderBottomColor: 'var(--color-primary, #95c53c)' }}
      ></div>
      {/* Inner pulsing dot */}
      <div className={`absolute inset-[25%] bg-${color} rounded-full animate-pulse shadow-md opacity-90`}></div>
    </div>
  );

  if (variant === 'inline') {
    return (
      <span className={`${containerClasses.inline} ${className}`}>
        {spinner}
        {text && typeof text === 'string' && (
          <span className={`ml-3 text-base font-bold text-gray-800 tracking-wide uppercase`}>{text}</span>
        )}
      </span>
    );
  }

  return (
    <div className={containerClasses[variant]}>
      <div className="flex flex-col items-center space-y-6">
        {spinner}
        {text && typeof text === 'string' && (
          <h3 className="text-2xl font-extrabold text-gray-800 tracking-widest uppercase animate-pulse drop-shadow-sm">
            {text}
          </h3>
        )}
      </div>
    </div>
  );
};

export default Loader;
