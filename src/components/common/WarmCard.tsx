import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface WarmCardProps {
  children: ReactNode;
  variant?: 'default' | 'muted' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  hover?: boolean;
  className?: string;
}

export function WarmCard({ 
  children, 
  variant = 'default',
  padding = 'md',
  rounded = '3xl',
  hover = false,
  className = ''
}: WarmCardProps) {
  const variantStyles = {
    default: 'bg-white',
    muted: 'bg-[#F5E6D3]',
    elevated: 'bg-white shadow-lg hover:shadow-2xl'
  };
  
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const roundedStyles = {
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-2xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl'
  };
  
  const combinedClassName = `${variantStyles[variant]} ${paddingStyles[padding]} ${roundedStyles[rounded]} transition-all ${className}`;
  
  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -10 }}
        className={combinedClassName}
      >
        {children}
      </motion.div>
    );
  }
  
  return <div className={combinedClassName}>{children}</div>;
}