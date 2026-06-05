"use client";

import { motion, useDragControls } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── Matrix Background ────────────────────────────────────────────────────────
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const alphabet = katakana + latin + nums;
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) rainDrops[x] = 1;
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) rainDrops[i] = 0;
        rainDrops[i]++;
      }
    };
    const interval = setInterval(draw, 30);
    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { clearInterval(interval); window.removeEventListener("resize", handleResize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] opacity-30 pointer-events-none" />;
};

// ─── Floating Skill Icon ──────────────────────────────────────────────────────
interface FloatingIcon {
  id: number;
  skill: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const FloatingSkillIcon = ({ icon, onDone }: { icon: FloatingIcon; onDone: (id: number) => void }) => (
  <motion.div
    className="fixed pointer-events-none z-50"
    initial={{ x: icon.x, y: icon.y, opacity: 1, scale: 1 }}
    animate={{
      x: [icon.x, icon.x + icon.vx * 60, icon.x + icon.vx * 120],
      y: [icon.y, icon.y + icon.vy * 60, icon.y + icon.vy * 120 + 80],
      opacity: [1, 1, 0],
      scale: [1, 1.2, 0.8],
      rotate: [0, icon.vx * 15, icon.vx * 30],
    }}
    transition={{ duration: 2.5, ease: "easeIn" }}
    onAnimationComplete={() => onDone(icon.id)}
  >
    <img src={`https://skillicons.dev/icons?i=${icon.skill}&theme=dark`} alt={icon.skill} className="w-10 h-10 drop-shadow-lg" draggable={false} />
  </motion.div>
);

// ─── Skills ───────────────────────────────────────────────────────────────────
const skills = ["gcp", "docker", "raspberrypi", "github", "python", "ts", "js", "c", "bash", "linux", "apple"];

export default function Hero() {
  const [terminalState, setTerminalState] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);
  const [iconCounter, setIconCounter] = useState(0);
  const fullCommand = "./launch-grssalex-portfolio-v3.sh";

  // Expose setMatrixMode globally so EasterEgg terminal can trigger it
  useEffect(() => {
    (window as any).__setMatrixMode = setIsMatrixMode;
    return () => { delete (window as any).__setMatrixMode; };
  }, []);

  const handleSkillClick = useCallback((skill: string, e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 3;
    const newIcon: FloatingIcon = {
      id: iconCounter,
      skill,
      x: rect.left + rect.width / 2 - 20,
      y: rect.top + rect.height / 2 - 20,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
    };
    setFloatingIcons(prev => [...prev, newIcon]);
    setIconCounter(c => c + 1);
  }, [iconCounter]);

  const removeFloatingIcon = useCallback((id: number) => {
    setFloatingIcons(prev => prev.filter(i => i.id !== id));
  }, []);

  useEffect(() => {
    if (terminalState === 0) {
      if (typedText.length < fullCommand.length) {
        const t = setTimeout(() => setTypedText(fullCommand.slice(0, typedText.length + 1)), 30 + Math.random() * 30);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTerminalState(1), 350);
        return () => clearTimeout(t);
      }
    } else if (terminalState === 1) {
      const t = setTimeout(() => setTerminalState(2), 700);
      return () => clearTimeout(t);
    }
  }, [terminalState, typedText]);

  return (
    <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 w-full">
      {isMatrixMode && <MatrixRain />}
      {floatingIcons.map(icon => (
        <FloatingSkillIcon key={icon.id} icon={icon} onDone={removeFloatingIcon} />
      ))}

      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </div>
          <span className="text-sm font-medium text-[#666666] dark:text-[#888888] uppercase tracking-wider">
            Disponible
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#111111] dark:text-[#EDEDED] mb-8 leading-[1.1]"
        >
          Alexandre. <br />
          <span className="text-[#666666] dark:text-[#888888]">
            Développeur spécialisé en intelligence artificielle.
          </span>
        </motion.h1>

        {/* Typing animation → static text, no interactive terminal here */}
        <div className="h-24 mb-12">
          {terminalState < 2 ? (
            <div className="font-mono text-sm sm:text-base text-[#666666] dark:text-[#888888] inline-block pt-2">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">➜</span>
                <span className="text-blue-500">~</span>
                <span>{typedText}</span>
                {terminalState === 0 && (
                  <span className="w-2 h-4 bg-[#111111] dark:bg-[#EDEDED] animate-pulse inline-block" />
                )}
              </div>
              {terminalState === 1 && (
                <div className="mt-2 text-[#111111] dark:text-[#EDEDED] flex items-center gap-2">
                  <span className="animate-spin">⠋</span> Chargement...
                </div>
              )}
            </div>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-lg sm:text-xl text-[#666666] dark:text-[#888888] leading-relaxed max-w-2xl font-light"
            >
              Je conçois des agents & intégrations d&apos;intelligence artificielle pour Carrefour et je développe des applications web sur-mesure pour mes clients sous ma société AGWS.
            </motion.p>
          )}
        </div>

        {terminalState === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 flex flex-wrap gap-2"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: [20, -10, 0], opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.05, ease: "easeOut" }}
                className="cursor-pointer select-none"
                onClick={e => handleSkillClick(skill, e)}
              >
                <img src={`https://skillicons.dev/icons?i=${skill}&theme=light`} alt={skill} className="w-12 h-12 dark:hidden hover:scale-110 transition-transform active:scale-95" draggable={false} />
                <img src={`https://skillicons.dev/icons?i=${skill}&theme=dark`} alt={skill} className="w-12 h-12 hidden dark:block hover:scale-110 transition-transform active:scale-95" draggable={false} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {terminalState === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-6"
          >
            <a href="#projets" className="group flex items-center gap-2 text-sm font-medium text-[#111111] dark:text-[#EDEDED] border-b border-[#111111] dark:border-[#EDEDED] pb-1 hover:text-[#666666] dark:hover:text-[#888888] hover:border-[#666666] dark:hover:border-[#888888] transition-colors">
              Voir les projets
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#contact" className="group flex items-center gap-2 text-sm font-medium text-[#666666] dark:text-[#888888] hover:text-[#111111] dark:hover:text-[#EDEDED] transition-colors">
              Me contacter
            </a>
          </motion.div>
        )}

        {terminalState === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-20 flex items-center gap-6"
          >
            <a href="https://github.com/grssalex" target="_blank" rel="noopener noreferrer" className="text-[#666666] dark:text-[#888888] hover:text-[#111111] dark:hover:text-[#EDEDED] transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/grssalex" target="_blank" rel="noopener noreferrer" className="text-[#666666] dark:text-[#888888] hover:text-[#111111] dark:hover:text-[#EDEDED] transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:contact@grssalex.dev" className="text-[#666666] dark:text-[#888888] hover:text-[#111111] dark:hover:text-[#EDEDED] transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
