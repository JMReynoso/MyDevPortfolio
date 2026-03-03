import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface IconButtonProps {
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
  variant?: "green" | "maple" | "yellow" | "brown";
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

export function IconButton({
  icon: Icon,
  href,
  onClick,
  variant = "green",
  size = "md",
  label,
  className = "",
}: IconButtonProps) {
  const variantStyles = {
    green: "bg-[#7BA05B] text-white hover:bg-[#4A6741]",
    maple: "bg-[#C77B58] text-white hover:bg-[#A66344]",
    yellow: "bg-[#FFD166] text-[#2C2416] hover:bg-[#F5C74D]",
    brown: "bg-[#8B6F47] text-white hover:bg-[#6B5537]",
  };

  const sizeStyles = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-16 h-16",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const combinedClassName = `${variantStyles[variant]} ${sizeStyles[size]} rounded-2xl flex items-center justify-center transition-colors shadow-lg ${className}`;

  const content = <Icon className={iconSizes[size]} />;

  if (href) {
    return (
      // Open external links in a new tab with proper security attributes, but use motion visuals
      <motion.a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={combinedClassName}
        aria-label={label}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={combinedClassName}
      aria-label={label}
    >
      {content}
    </motion.button>
  );
}
