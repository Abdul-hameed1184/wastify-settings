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
  text = 'Wasteefy',
  color = 'primary',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  };

  const containerClasses = {
    fullscreen: 'fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/60 backdrop-blur-md',
    contained: 'relative w-full h-full min-h-[200px] flex flex-col items-center justify-center bg-transparent',
    inline: 'inline-flex items-center justify-center',
  };

  const spinner = (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Outer ring */}
      <div className={`absolute inset-0 rounded-full border-4 border-${color}/20`}></div>
      {/* Animated segment */}
      <div
        className={`absolute inset-0 rounded-full border-4 border-t-transparent border-l-transparent border-r-transparent border-b-${color} animate-spin`}
        style={{ borderBottomColor: 'var(--color-primary, #95c53c)' }}
      ></div>
      {/* Inner pulsing dot */}
      <div className={`absolute inset-[30%] bg-${color} rounded-full animate-pulse opacity-60`}></div>
    </div>
  );

  if (variant === 'inline') {
    return (
      <span className={`${containerClasses.inline} ${className}`}>
        {spinner}
        {text && typeof text === 'string' && (
          <span className={`ml-2 text-sm font-medium text-secondary`}>{text}</span>
        )}
      </span>
    );
  }

  return (
    <div className={containerClasses[variant]}>
      <div className="flex flex-col items-center space-y-4">
        {spinner}
        {text && typeof text === 'string' && (
          <h3 className="text-xl font-semibold text-secondary tracking-tight animate-pulse">
            {text}
          </h3>
        )}
      </div>
    </div>
  );
};

export default Loader;
