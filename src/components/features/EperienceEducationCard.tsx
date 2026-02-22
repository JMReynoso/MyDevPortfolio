import { motion } from "framer-motion";
import { WarmBadge } from "../common/WarmBadge";

export interface ExperienceEducationCardProps {
  title: string;
  company: string;
  date: string;
  description: string[];
  tags: string[];
}

export function ExperienceEducationCard({
  title,
  company,
  date,
  description,
  tags,
}: EperienceEducationCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-sm border border-[#8B6F47]/10"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-2xl font-bold text-[#2C2416] mb-2">{title}</h3>
      <p className="text-[#7BA05B] font-semibold mb-4">
        {company} · {date}
      </p>
      <ul className="text-[#8B6F47] leading-relaxed list-disc pl-5 space-y-1 mb-4">
        {description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p className="text-[#8B6F47] leading-relaxed font-semibold mb-2">
        Skills:
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <WarmBadge key={index} variant="default">
            {tag}
          </WarmBadge>
        ))}
      </div>
    </motion.div>
  );
}
