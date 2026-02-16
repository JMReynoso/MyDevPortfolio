import { ReactNode } from "react";

export interface WarmBadgeProps {
  children: ReactNode;
  variant?: "default" | "accent" | "muted" | "success" | "maple";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function WarmBadge({
  children,
  variant = "default",
  size = "md",
  className = "",
}: WarmBadgeProps) {
  const variantStyles = {
    default: "bg-[#F5E6D3] text-[#2C2416]",
    accent: "bg-[#FFD166]/30 text-[#2C2416]",
    muted: "bg-[#8B6F47]/20 text-[#8B6F47]",
    success: "bg-[#7BA05B]/20 text-[#4A6741]",
    maple: "bg-[#C77B58]/20 text-[#C77B58]",
  };

  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      className={`rounded-full inline-block ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}
