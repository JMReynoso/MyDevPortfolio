import { motion } from "framer-motion";
import { Briefcase, Home, Mail, User } from "lucide-react";
import { ComponentType, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useIsMobile } from "../ui/use-mobile";

export interface NavigationProps {
  logo?: {
    initials: string;
    name: string;
  };
  links: Array<{
    label: string;
    href: string;
  }>;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  onNavigationClick?: (href: string, sectionId: string) => void;
}

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Home: Home,
  About: User,
  Projects: Briefcase,
  Contact: Mail,
};

export function Navigation({
  logo = { initials: "YN", name: "Your Name" },
  links,
  activeSection,
  onSectionChange,
  onNavigationClick,
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    // Cache the footer reference once per effect run — avoids querying the DOM on every scroll
    const footer = document.querySelector("footer");

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Calculate bottom offset to prevent overlapping footer
      if (isMobile) {
        if (footer) {
          const footerRect = footer.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // If footer is entering viewport from bottom, push nav up
          if (footerRect.top < windowHeight) {
            const overlap = windowHeight - footerRect.top;
            setBottomOffset(overlap + 16); // 16px padding
          } else {
            setBottomOffset(0);
          }
        }
      } else {
        setBottomOffset(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Shared nav pill content
  const navPillContent = (
    <motion.div
      className="bg-[#FFF8F0]/95 backdrop-blur-sm border border-[#8B6F47]/20 shadow-lg"
      style={{
        maxWidth: isMobile ? "fit-content" : undefined,
      }}
      animate={{
        borderRadius: "16px",
        maxWidth: isMobile ? undefined : isScrolled ? "600px" : "1152px",
      }}
      transition={{
        duration: 0.4,
        ease: "easeIn",
      }}
    >
      <div className={isMobile ? "px-3 py-2.5" : "px-6 py-3"}>
        <motion.div
          className="flex items-center"
          animate={{
            gap: isMobile ? "24px" : isScrolled ? "24px" : "32px",
            justifyContent: isMobile ? "flex-start" : "space-between",
          }}
          transition={{
            duration: 0.4,
            ease: "easeIn",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className={`rounded-full overflow-hidden flex-shrink-0 ${isMobile ? "w-8 h-8" : "w-10 h-10"}`}
            >
              <ImageWithFallback
                src="/images/about/pfp.jpeg"
                alt="Profile Picture"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.span
              className="font-semibold text-lg text-[#2C2416] whitespace-nowrap"
              animate={{
                width: isScrolled || isMobile ? 0 : "auto",
                opacity: isScrolled || isMobile ? 0 : 1,
              }}
              transition={{
                duration: 0.4,
                ease: "easeIn",
              }}
              style={{ overflow: "hidden" }}
            >
              {logo.name}
            </motion.span>
          </div>

          <div className={`flex ${isMobile ? "gap-6" : "gap-8"}`}>
            {links.map((link, index) => {
              const isRoute =
                link.href.startsWith("/") && !link.href.includes("#");
              const sectionId =
                link.href.replace("/", "").replace("#", "") || "home";
              const isActive =
                activeSection === sectionId ||
                (activeSection === "about" && link.label === "About");
              const Icon = iconMap[link.label];

              const linkContent = (
                <>
                  {Icon && (
                    <Icon
                      className={isMobile ? "size-4" : "size-5"}
                      aria-hidden="true"
                    />
                  )}
                  <motion.span
                    animate={{
                      width: isScrolled || isMobile ? 0 : "auto",
                      opacity: isScrolled || isMobile ? 0 : 1,
                      marginLeft: isScrolled || isMobile ? 0 : 8,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeIn",
                    }}
                  >
                    {link.label}
                  </motion.span>
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#7BA05B] transition-all ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    aria-hidden="true"
                  />
                </>
              );

              if (isRoute) {
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <Link
                      to={link.href}
                      className="text-[#2C2416] hover:text-[#7BA05B] transition-colors relative group flex items-center gap-2"
                      onClick={() => {
                        onSectionChange?.(sectionId);
                        onNavigationClick?.(link.href, sectionId);
                      }}
                    >
                      {linkContent}
                    </Link>
                  </motion.div>
                );
              }

              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-[#2C2416] hover:text-[#7BA05B] transition-colors relative group flex items-center gap-2"
                  onClick={() => {
                    onSectionChange?.(sectionId);
                    onNavigationClick?.(link.href, sectionId);
                  }}
                >
                  {linkContent}
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Top nav - fades out on mobile when scrolled */}
      <motion.nav
        aria-label="Main Navigation"
        className="fixed left-0 right-0 top-0 z-50 flex justify-center py-4"
        style={{
          paddingLeft: isMobile ? "12px" : "24px",
          paddingRight: isMobile ? "12px" : "24px",
        }}
        animate={{
          opacity: isMobile && isScrolled ? 0 : 1,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        {navPillContent}
      </motion.nav>

      {/* Bottom nav - fades in on mobile when scrolled */}
      {isMobile && (
        <motion.nav
          aria-label="Mobile Navigation"
          className="fixed left-0 right-0 z-50 flex justify-center py-4"
          style={{
            bottom: `${bottomOffset}px`,
            paddingLeft: "12px",
            paddingRight: "12px",
          }}
          animate={{
            opacity: isScrolled ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          initial={{ opacity: 0 }}
        >
          {navPillContent}
        </motion.nav>
      )}
    </>
  );
}
