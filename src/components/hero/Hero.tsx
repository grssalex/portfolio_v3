"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";

const skills = [
  "gcp",
  "docker",
  "raspberrypi",
  "github",
  "python",
  "ts",
  "js",
  "c",
  "bash",
  "linux",
  "apple",
];

export default function Hero() {
  const skillUrlLight = `https://skillicons.dev/icons?i=${skills.join(",")}&theme=light&perline=11`;
  const skillUrlDark = `https://skillicons.dev/icons?i=${skills.join(",")}&theme=dark&perline=11`;

  const [terminalState, setTerminalState] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullCommand = "./launch-grssalex-portfolio-v3";

  useEffect(() => {
    // Étape 1 : Taper la commande
    if (terminalState === 0) {
      if (typedText.length < fullCommand.length) {
        const timeout = setTimeout(() => {
          setTypedText(fullCommand.slice(0, typedText.length + 1));
        }, 50 + Math.random() * 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setTerminalState(1), 400);
        return () => clearTimeout(timeout);
      }
    }
    // Étape 2 : Afficher "Chargement..."
    else if (terminalState === 1) {
      const timeout = setTimeout(() => setTerminalState(2), 800);
      return () => clearTimeout(timeout);
    }
  }, [terminalState, typedText]);

  return (
    <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 w-full">
      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
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
            Développeur Fullstack & IA.
          </span>
        </motion.h1>

        <div className="h-24 mb-12">
          {terminalState < 2 ? (
            <div className="font-mono text-sm sm:text-base text-[#666666] dark:text-[#888888] bg-[#F5F5F5] dark:bg-[#111111] p-4 rounded-lg border border-[#EAEAEA] dark:border-[#222222] inline-block">
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

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mb-8"
        >
          <img
            src={skillUrlLight}
            alt="Stack technique"
            className="max-w-full h-auto dark:hidden"
            loading="lazy"
          />
          <img
            src={skillUrlDark}
            alt="Stack technique"
            className="max-w-full h-auto hidden dark:block"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-6"
        >
          <a
            href="#projets"
            className="group flex items-center gap-2 text-sm font-medium text-[#111111] dark:text-[#EDEDED] border-b border-[#111111] dark:border-[#EDEDED] pb-1 hover:text-[#666666] dark:hover:text-[#888888] hover:border-[#666666] dark:hover:border-[#888888] transition-colors"
          >
            Voir les projets
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="group flex items-center gap-2 text-sm font-medium text-[#666666] dark:text-[#888888] hover:text-[#111111] dark:hover:text-[#EDEDED] transition-colors"
          >
            Me contacter
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 flex items-center gap-6"
        >
          <a href="https://github.com/grssalex" target="_blank" rel="noopener noreferrer" className="text-[#666666] dark:text-[#888888] hover:text-[#111111] dark:hover:text-[#EDEDED] transition-colors">
            <span className="sr-only">GitHub</span>
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/grssalex" target="_blank" rel="noopener noreferrer" className="text-[#666666] dark:text-[#888888] hover:text-[#111111] dark:hover:text-[#EDEDED] transition-colors">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:contact@grssalex.dev" className="text-[#666666] dark:text-[#888888] hover:text-[#111111] dark:hover:text-[#EDEDED] transition-colors">
            <span className="sr-only">Email</span>
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
