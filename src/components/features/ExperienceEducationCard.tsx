import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useId, useState } from "react";
import { WarmBadge } from "../common/WarmBadge";
import { WarmButton } from "../common/WarmButton";

const COLLAPSED_HIGHLIGHT_COUNT = 6;

// Padding stands in for the list's `space-y-1` so each extra Highlight carries
// its own gap and the gap grows with the item instead of popping in.
const collapsedHighlight = { height: 0, opacity: 0, paddingBottom: 0 };
const expandedHighlight = { height: "auto", opacity: 1, paddingBottom: 4 };

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
  const reduceMotion = useReducedMotion();
  const firstHighlights = description.slice(0, COLLAPSED_HIGHLIGHT_COUNT);
  const extraHighlights = description.slice(COLLAPSED_HIGHLIGHT_COUNT);
  const extraHighlightCount = extraHighlights.length;

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
        className="text-[#8B6F47] leading-relaxed list-disc pl-5 mb-3"
      >
        {firstHighlights.map((item) => (
          <li key={item} className="pb-1">
            {item}
          </li>
        ))}
        <AnimatePresence initial={false}>
          {(expanded ? extraHighlights : []).map((item) => (
            // clip-path, not overflow-hidden: overflow would clip the outside
            // list bullet, and the negative inset keeps it visible.
            <motion.li
              key={item}
              className="[clip-path:inset(0_-2rem)]"
              initial={collapsedHighlight}
              animate={expandedHighlight}
              exit={collapsedHighlight}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeInOut" }}
            >
              {item}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {extraHighlightCount > 0 && (
        <div className="flex justify-end mb-4">
          <WarmButton
            variant="primary"
            size="sm"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
            aria-controls={listId}
          >
            {expanded ? "Show fewer" : `Show ${extraHighlightCount} more`}
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
