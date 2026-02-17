import { motion } from "framer-motion";

export interface experienceEducationCardProps {
  title: string;
  company: string;
  date: string;
  description: string[];
}

export function ExperienceEducationCard({
  title,
  company,
  date,
  description,
}: experienceEducationCardProps) {
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
      <ul className="text-[#8B6F47] leading-relaxed list-disc pl-5 space-y-1">
        {description.map((item, index) => (
          <li key={index}>
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
