"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export function MouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  // En mode sombre, on met un halo bleu clair. En mode clair, on met un halo gris très léger.
  const glowColor = resolvedTheme === "dark" 
    ? "rgba(14, 165, 233, 0.15)" 
    : "rgba(0, 0, 0, 0.05)";

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      animate={{
        background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 60%)`,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
    />
  );
}
