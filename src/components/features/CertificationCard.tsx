import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { WarmBadge } from "../common/WarmBadge";

export interface CertificationCardProps {
  title: string;
  text: string;
  status: string;
  delay: number;
  icon: LucideIcon;
  link: string;
}

export function CertificationCard({
  title,
  text,
  status,
  delay,
  icon: Icon,
  link,
}: CertificationCardProps) {
  const badgeColor = status === "Certified" ? "success" : "accent";
  const statusBg = status === "Certified" ? "bg-[#7BA05B]" : "bg-[#FFD166]";
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
    >
      <div
        className={`h-full bg-gradient-to-br to-white rounded-2xl p-8 shadow-sm border border-[#8B6F47]/10 hover:shadow-md transition-shadow duration-300`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`${statusBg} text-white rounded-xl p-3`}>
            <Icon className="w-8 h-8" aria-hidden="true" />
          </div>
          <WarmBadge variant={badgeColor}>{status}</WarmBadge>
        </div>
        <h3 className="text-2xl font-bold text-[#2C2416] mb-2">{title}</h3>
        <p className="text-[#8B6F47] leading-relaxed">{text}</p>
      </div>
    </motion.a>
  );
}
