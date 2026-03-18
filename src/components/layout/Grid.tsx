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
  
  const defaultColsMap: Record<number, string> = {
    1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3',
    4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6',
  };
  const smColsMap: Record<number, string> = {
    1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4', 5: 'sm:grid-cols-5', 6: 'sm:grid-cols-6',
  };
  const mdColsMap: Record<number, string> = {
    1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3',
    4: 'md:grid-cols-4', 5: 'md:grid-cols-5', 6: 'md:grid-cols-6',
  };
  const lgColsMap: Record<number, string> = {
    1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6',
  };

  const colClasses = [
    'grid',
    cols.default ? defaultColsMap[cols.default] : '',
    cols.sm ? smColsMap[cols.sm] : '',
    cols.md ? mdColsMap[cols.md] : '',
    cols.lg ? lgColsMap[cols.lg] : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={`${colClasses} ${gapStyles[gap]} ${className}`}>
      {children}
    </div>
  );
}
