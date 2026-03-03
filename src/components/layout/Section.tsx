import { motion } from "motion/react";
import { ReactNode } from "react";

export interface SectionProps {
  id?: string;
  children: ReactNode;
  background?: "cream" | "white" | "dark";
  padding?: "sm" | "md" | "lg";
  className?: string;
  animate?: boolean;
}

export function Section({
  id,
  children,
  background = "cream",
  padding = "lg",
  className = "",
  animate = true,
}: SectionProps) {
  const backgroundStyles = {
    cream:
      "bg-gradient-to-b from-white from-0% via-[#F5E6D3] via-10% via-90% to-white to-100%",
    white: "bg-white",
    dark: "bg-[#2C2416]",
  };

  const paddingStyles = {
    sm: "py-12 px-6",
    md: "py-16 px-6",
    lg: "py-20 px-6",
  };

  const content = <div className="max-w-6xl mx-auto">{children}</div>;

  const combinedClassName = `${backgroundStyles[background]} ${paddingStyles[padding]} ${className}`;

  if (animate) {
    return (
      <motion.section
        id={id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={combinedClassName}
      >
        {content}
      </motion.section>
    );
  }

  return (
    <section id={id} className={combinedClassName}>
      {content}
    </section>
  );
}
