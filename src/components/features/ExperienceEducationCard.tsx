import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useId, useState } from "react";
import { WarmBadge } from "../common/WarmBadge";
import { WarmButton } from "../common/WarmButton";

const COLLAPSED_HIGHLIGHT_COUNT = 6;

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
}: ExperienceEducationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const hiddenCount = description.length - COLLAPSED_HIGHLIGHT_COUNT;
  const visibleDescription = expanded
    ? description
    : description.slice(0, COLLAPSED_HIGHLIGHT_COUNT);

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
      <ul
        id={listId}
        className="text-[#8B6F47] leading-relaxed list-disc pl-5 space-y-1 mb-4"
      >
        {visibleDescription.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {hiddenCount > 0 && (
        <div className="flex justify-end mb-4">
          <WarmButton
            variant="primary"
            size="sm"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
            aria-controls={listId}
          >
            {expanded ? "Show fewer" : `Show ${hiddenCount} more`}
            {expanded ? (
              <ChevronUp className="ml-1 h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
            )}
          </WarmButton>
        </div>
      )}
      <p className="text-[#8B6F47] leading-relaxed font-semibold mb-2">
        Skills:
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <WarmBadge key={tag} variant="default">
            {tag}
          </WarmBadge>
        ))}
      </div>
    </motion.div>
  );
}
