import { motion } from "framer-motion";
import { type Service } from "../../data/services";
import { WarmCard } from "../common/WarmCard";

export interface ServiceCardProps {
  service: Service;
  index?: number;
}

const colorIcon: Record<Service["color"], string> = {
  green: "bg-[#7BA05B]",
  maple: "bg-[#C77B58]",
  yellow: "bg-[#F5C563]",
  brown: "bg-[#8B6F47]",
};

const colorGradient: Record<Service["color"], string> = {
  green: "from-[#E8F3E0]",
  maple: "from-[#F5E6D3]",
  yellow: "from-[#FFF8E7]",
  brown: "from-[#F0EAE0]",
};

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <WarmCard
        hover
        padding="lg"
        className={`h-full bg-gradient-to-br ${colorGradient[service.color]} to-white border border-[#8B6F47]/10 shadow-sm hover:shadow-md`}
      >
        <div
          className={`w-12 h-12 ${colorIcon[service.color]} rounded-xl flex items-center justify-center mb-4`}
        >
          <Icon className="w-6 h-6 text-white" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-[#2C2416] mb-2 flex flex-wrap items-center gap-2">
          {service.title}
          {service.status === "unavailable" && (
            <span className="text-red-500 text-md font-medium">
              (Currently Unavailable)
            </span>
          )}
          {service.status === "coming_soon" && (
            <span className="text-[#8B6F47] text-md font-medium">
              (Coming Soon)
            </span>
          )}
        </h3>
        <p className="text-[#8B6F47] text-sm leading-relaxed mb-4">
          {service.description}
        </p>
        {service.price && (
          <div className="text-lg font-medium text-[#7BA05B] mb-4">
            {service.price}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-lg bg-[#8B6F47]/10 text-[#8B6F47] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </WarmCard>
    </motion.div>
  );
}
