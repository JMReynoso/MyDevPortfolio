import { ReactNode } from 'react';

export interface GridProps {
  children: ReactNode;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Grid({ 
  children, 
  cols = { md: 2, lg: 3 },
  gap = 'lg',
  className = ''
}: GridProps) {
  const gapStyles = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  };
  
  const getColsClass = () => {
    const classes: string[] = ['grid'];
    
    if (cols.default) classes.push(`grid-cols-${cols.default}`);
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
    
    return classes.join(' ');
  };
  
  return (
    <div className={`${getColsClass()} ${gapStyles[gap]} ${className}`}>
      {children}
    </div>
  );
}
