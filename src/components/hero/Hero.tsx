"use client";

import { motion } from "framer-motion";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export default function Hero() {
  return (
    <section id="top" className="pt-24 sm:pt-36 lg:pt-44 pb-28 max-w-[900px]">
      <motion.div {...fade(0)} className="flex items-center gap-2.5 mb-8">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#5F5F5F] dark:text-[#8F8F8F]">
          Disponible
        </span>
      </motion.div>

      <motion.h1
        {...fade(0.05)}
        className="text-5xl sm:text-6xl lg:text-[80px] font-bold leading-[1.05] tracking-[-0.035em] mb-8"
      >
        Alexandre.
        <br />
        <span className="text-[#5F5F5F] dark:text-[#8F8F8F]">Ingénieur IA.</span>
      </motion.h1>

      <motion.div {...fade(0.1)} className="font-mono text-sm text-[#5F5F5F] dark:text-[#8F8F8F] mb-5">
        <span className="text-emerald-500">➜</span> <span className="text-blue-500">~</span> cat about.txt
      </motion.div>

      <motion.p
        {...fade(0.15)}
        className="text-lg sm:text-[21px] leading-relaxed font-light text-[#5F5F5F] dark:text-[#8F8F8F] max-w-[680px] mb-10"
      >
        Ingénieur en intelligence artificielle à la Direction des Achats Non Marchands de Carrefour, je conçois des
        agents et des outils IA pour les acheteurs. Avec mon agence AGWS, je développe des applications web sur-mesure
        pour des PME.
      </motion.p>

      <motion.div {...fade(0.2)} className="flex flex-wrap items-center gap-7">
        <a
          href="#experience"
          className="text-[15px] font-medium border-b border-current pb-1 hover:opacity-70 transition-opacity"
        >
          Voir mon parcours ↓
        </a>
        <a
          href="#contact"
          className="text-[15px] font-medium text-[#5F5F5F] dark:text-[#8F8F8F] hover:text-[#111111] dark:hover:text-[#EDEDED] transition-colors"
        >
          Me contacter
        </a>
        <span className="flex-1" />
        <a
          href="https://github.com/grssalex"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#5F5F5F] dark:text-[#8F8F8F] hover:text-[#111111] dark:hover:text-[#EDEDED]"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/grssalex"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#5F5F5F] dark:text-[#8F8F8F] hover:text-[#111111] dark:hover:text-[#EDEDED]"
        >
          LinkedIn
        </a>
      </motion.div>
    </section>
  );
}
