import { motion } from "motion/react";
import { ReactNode } from "react";
import { Link } from "react-router";

export interface WarmButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function WarmButton({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
}: WarmButtonProps) {
  const baseStyles =
    "rounded-2xl transition-colors font-semibold inline-flex items-center justify-center";

  const variantStyles = {
    primary: "bg-[#7BA05B] text-white hover:bg-[#4A6741] shadow-lg",
    secondary:
      "bg-white text-[#2C2416] hover:bg-[#F5E6D3] border-2 border-[#8B6F47]/20",
    outline:
      "bg-transparent text-[#7BA05B] hover:bg-[#7BA05B]/10 border-2 border-[#7BA05B]",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    // Check if it's an internal route (starts with /) or an anchor link (starts with #)
    const isInternalRoute = href.startsWith("/") && !href.includes("#");
    const isAnchorLink = href.startsWith("#");

    if (isInternalRoute) {
      // Use React Router Link for internal routes
      return (
        <Link to={href} className={combinedClassName}>
          {children}
        </Link>
      );
    } else {
      // Use regular anchor tag for anchor links and external URLs
      return (
        <motion.a
          href={href}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={combinedClassName}
        >
          {children}
        </motion.a>
      );
    }
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={combinedClassName}
    >
      {children}
    </motion.button>
  );
}
