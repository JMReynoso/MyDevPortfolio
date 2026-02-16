import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { WarmBadge } from "../common/WarmBadge";

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  delay?: number;
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  link,
  delay = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
    >
      <div className="relative overflow-hidden h-48">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#2C2416] mb-3">{title}</h3>
        <p className="text-[#8B6F47] mb-4 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <WarmBadge key={tag} variant="default">
              {tag}
            </WarmBadge>
          ))}
        </div>

        <a
          href={link}
          className="inline-flex items-center gap-2 text-[#7BA05B] hover:text-[#4A6741] transition-colors font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}
