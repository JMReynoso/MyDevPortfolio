import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface SkillCardProps {
  name: string;
  icon: LucideIcon;
  color: "green" | "maple" | "yellow" | "brown";
}

export function SkillCard({ name, icon: Icon, color }: SkillCardProps) {
  const colorStyles = {
    green: "bg-[#7BA05B]",
    maple: "bg-[#C77B58]",
    yellow: "bg-[#F5C563]",
    brown: "bg-[#8B6F47]",
  };

  const gradientStyles = {
    green: "from-[#E8F3E0] to-white",
    maple: "from-[#F5E6D3] to-white",
    yellow: "from-[#FFF8E7] to-white",
    brown: "from-[#F0EAE0] to-white",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`bg-gradient-to-br ${gradientStyles[color]} rounded-2xl p-8 shadow-sm border border-[#8B6F47]/10 hover:shadow-md transition-all duration-300`}
    >
      <div
        className={`w-12 h-12 ${colorStyles[color]} rounded-xl flex items-center justify-center mb-4`}
      >
        <Icon className="w-6 h-6 text-white" aria-hidden="true" />
      </div>
      <h3 className="font-semibold text-[#2C2416] text-lg">{name}</h3>
    </motion.div>
  );
}
