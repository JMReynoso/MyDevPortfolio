import { ReactNode } from 'react';

export interface SectionHeaderProps {
  title: string;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({ 
  title, 
  subtitle,
  align = 'left',
  className = ''
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  const dividerAlign = align === 'center' ? 'mx-auto' : '';
  
  return (
    <div className={`flex flex-col ${alignClass} mb-12 ${className}`}>
      <h2 className="text-4xl font-bold text-[#2C2416] mb-4">{title}</h2>
      <div className={`w-20 h-1 bg-gradient-to-r from-[#7BA05B] to-[#FFD166] rounded-full ${dividerAlign} ${subtitle ? 'mb-4' : ''}`} />
      {subtitle && (
        <div className="text-xl text-[#8B6F47] leading-relaxed max-w-2xl">
          {subtitle}
        </div>
      )}
    </div>
  );
}
