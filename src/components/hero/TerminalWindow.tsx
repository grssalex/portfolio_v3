"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const codeLines = [
  "#!/usr/bin/env python3",
  "",
  "<span class='text-blue-400'>import</span> <span class='text-green-300'>brain</span>",
  "<span class='text-blue-400'>from</span> <span class='text-green-300'>carrefour</span> <span class='text-blue-400'>import</span> AI_Models",
  "<span class='text-blue-400'>from</span> <span class='text-green-300'>freelance</span> <span class='text-blue-400'>import</span> Web_Experiences",
  "",
  "<span class='text-blue-400'>class</span> <span class='text-yellow-200'>Alex</span>(Developer):",
  "    <span class='text-blue-400'>def</span> <span class='text-yellow-200'>__init__</span>(<span class='text-orange-300'>self</span>):",
  "        <span class='text-orange-300'>self</span>.role = <span class='text-orange-400'>'AI Engineer & Fullstack Dev'</span>",
  "        <span class='text-orange-300'>self</span>.stack = [<span class='text-orange-400'>'Python'</span>, <span class='text-orange-400'>'Next.js'</span>, <span class='text-orange-400'>'TensorFlow'</span>]",
  "        <span class='text-orange-300'>self</span>.coffee_level = <span class='text-purple-400'>float</span>(<span class='text-orange-400'>'inf'</span>)",
  "",
  "    <span class='text-blue-400'>def</span> <span class='text-yellow-200'>execute</span>(<span class='text-orange-300'>self</span>):",
  "        <span class='text-blue-400'>while</span> <span class='text-orange-300'>self</span>.coffee_level > <span class='text-purple-400'>0</span>:",
  "            <span class='text-yellow-200'>build_mind_blowing_stuff</span>()",
  "",
  "alex = Alex()",
  "alex.<span class='text-yellow-200'>execute</span>()",
  "",
  "<span class='text-gray-500'># Output:</span>",
  "<span class='text-green-400'>> Initializing genius mode...</span>",
  "<span class='text-green-400'>> Portfolio loaded successfully 🚀</span>"
];

export default function TerminalWindow() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= codeLines.length) return;

    const timeout = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, codeLines[currentLineIndex]]);
      setCurrentLineIndex((prev) => prev + 1);
    }, Math.random() * 150 + 50); // Vitesse d'apparition des lignes

    return () => clearTimeout(timeout);
  }, [currentLineIndex]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50, rotateY: -15 }}
      animate={{ opacity: 1, x: 0, rotateY: -5 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full max-w-[600px] h-[450px] bg-[#0d1117]/90 backdrop-blur-xl rounded-xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col font-mono text-sm sm:text-base relative group"
      style={{ transformPerspective: 1000 }}
    >
      {/* Effet de glow derrière le terminal */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 -z-10"></div>

      {/* Header du terminal (façon macOS) */}
      <div className="h-12 bg-[#161b22] border-b border-gray-800 flex items-center px-4 gap-2 relative z-10">
        <div className="flex gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-red-500 transition-colors"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] hover:bg-yellow-500 transition-colors"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:bg-green-500 transition-colors"></div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-gray-400 text-xs font-medium flex items-center gap-2">
          <span>alex@macbook-pro</span>
          <span className="text-gray-600">~</span>
          <span>portfolio.py</span>
        </div>
      </div>
      
      {/* Contenu du terminal */}
      <div className="p-6 text-gray-300 flex-1 overflow-y-auto relative z-10">
        {displayedLines.map((line, i) => (
          <div 
            key={i} 
            className="whitespace-pre-wrap leading-relaxed"
            dangerouslySetInnerHTML={{ __html: line || " " }}
          />
        ))}
        {currentLineIndex < codeLines.length && (
          <div className="whitespace-pre-wrap flex items-center h-6">
            <span className="w-2 h-4 bg-gray-400 animate-pulse inline-block ml-1"></span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
