import React from 'react';

export interface SourceBadgeProps {
  source: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({ source, size = 'sm', className = '' }) => {
  const sizeClasses = size === 'lg' 
    ? 'px-3 py-1.5 text-xs' 
    : size === 'md'
    ? 'px-2.5 py-1 text-[11px]'
    : 'px-2 py-0.5 text-[10px]';

  return (
    <span 
      className={`inline-flex items-center gap-1.5 rounded-lg border shadow-md font-extrabold tracking-wide backdrop-blur-md select-none pointer-events-none ${sizeClasses} ${className}`}
      style={{
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        borderColor: 'rgba(255, 255, 255, 0.28)',
        color: '#ffffff',
      }}
    >
      <span 
        className="w-1.5 h-1.5 rounded-full shrink-0" 
        style={{ backgroundColor: '#ffffff', opacity: 0.95 }}
      />
      <span 
        style={{ color: '#ffffff', fontWeight: 800 }} 
        className="leading-none !text-white"
      >
        {source}
      </span>
    </span>
  );
};
