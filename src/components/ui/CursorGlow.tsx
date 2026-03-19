import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsMobile } from "./use-mobile";

export function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Evaluate hover target immediately (no layout cost)
      const target = e.target as HTMLElement;
      const isButton =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null;

      // Batch position + hover state updates to one frame — avoids a setState on every pixel
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsHovering(isButton);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999]"
      animate={{
        x: mousePosition.x - 24,
        y: mousePosition.y - 24,
        opacity: isHovering ? 1 : 0,
        scale: isHovering ? 1 : 0.8,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        opacity: { duration: 0.2 },
      }}
    >
      <div className="w-12 h-12 rounded-full bg-[#F4C753]/20 blur-xl" />
      <div className="absolute inset-0 w-12 h-12 rounded-full bg-[#7BA05B]/15 blur-md" />
    </motion.div>
  );
}
