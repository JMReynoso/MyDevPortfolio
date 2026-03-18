import { ReactNode } from "react";

export interface FooterProps {
  text?: ReactNode;
  className?: string;
}

export function Footer({ text, className }: FooterProps) {
  return (
    <footer className={`py-8 px-6 bg-[#2C2416] text-center ${className ?? ''}`}>
      <p className="text-[#F5E6D3]">{text}</p>
    </footer>
  );
}
