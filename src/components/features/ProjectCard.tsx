import { motion } from "framer-motion";
import { WarmBadge } from "../common/WarmBadge";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  imageFit?: "cover" | "contain";
  delay?: number;
}

const BASE_CARD_CLASSES =
  "bg-white rounded-3xl overflow-hidden shadow-lg transition-all group flex-col flex";
const LINK_CARD_CLASSES = `${BASE_CARD_CLASSES} hover:shadow-2xl`;

// "cover" crops a screenshot from the top; "contain" shows a diagram whole, centred on Warm Cream.
const IMAGE_AREA_CLASSES = {
  cover: "relative overflow-hidden h-48",
  contain: "relative overflow-hidden h-48 bg-[#FFF8F0]",
};
const IMAGE_CLASSES = {
  cover: "w-full object-cover",
  contain: "w-full h-full object-contain",
};

export function ProjectCard({
  title,
  description,
  image,
  tags,
  link,
  imageFit = "cover",
  delay = 0,
}: ProjectCardProps) {
  const reveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay },
  };

  const content = (
    <>
      <div className={IMAGE_AREA_CLASSES[imageFit]}>
        <ImageWithFallback
          src={image}
          alt={title}
          className={`${IMAGE_CLASSES[imageFit]} group-hover:scale-110 transition-transform duration-300`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-6 flex flex-col justify-between">
        <h3 className="text-xl font-semibold text-[#2C2416] mb-3">{title}</h3>
        <p className="text-[#8B6F47] mb-4 leading-relaxed">{description}</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-4 px-6">
        {tags.map((tag) => (
          <WarmBadge key={tag} variant="default">
            {tag}
          </WarmBadge>
        ))}
      </div>
    </>
  );

  if (!link) {
    return (
      <motion.div {...reveal} className={BASE_CARD_CLASSES}>
        {content}
      </motion.div>
    );
  }

  return (
    <motion.a
      {...reveal}
      whileHover={{ y: -10 }}
      className={LINK_CARD_CLASSES}
      target="_blank"
      rel="noopener noreferrer"
      href={link}
    >
      {content}
    </motion.a>
  );
}
