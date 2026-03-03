import { motion } from "motion/react";
import { ReactNode } from "react";
import { WarmBadge } from "../common/WarmBadge";
import { WarmButton } from "../common/WarmButton";

export interface HeroProps {
  greeting?: ReactNode;
  title: string;
  subtitle: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  image?: string;
  imageAlt?: string;
  imageComponent?: ReactNode;
}

export function Hero({
  greeting = "👋 Hello, I'm a developer",
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  image,
  imageAlt = "Hero image",
  imageComponent,
}: HeroProps) {
  return (
    <section
      id="home"
      className="pt-32 pb-20 px-6 bg-gradient-to-b from-white from-0% via-[#F5E6D3] via-25% via-75% to-white to-100%"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <WarmBadge variant="accent" size="md" className="mb-6">
            {greeting}
          </WarmBadge>

          <h1 className="text-5xl md:text-6xl font-bold text-[#2C2416] mb-6 leading-tight">
            {title}
          </h1>

          <p className="text-xl text-[#8B6F47] mb-8 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="flex gap-4 justify-center mb-12">
            {primaryButton && (
              <WarmButton variant="primary" href={primaryButton.href}>
                {primaryButton.text}
              </WarmButton>
            )}
            {secondaryButton && (
              <WarmButton variant="secondary" href={secondaryButton.href}>
                {secondaryButton.text}
              </WarmButton>
            )}
          </div>
        </motion.div>

        {(image || imageComponent) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-[#7BA05B]/20 to-[#FFD166]/20 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {imageComponent || (
                <img
                  src={image}
                  alt={imageAlt}
                  className="w-full h-[400px] object-cover"
                />
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
