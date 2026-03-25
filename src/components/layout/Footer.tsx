"use client";

import { useState, useRef, useEffect } from "react";

export default function Footer() {
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleHover = () => {
    if (!buttonRef.current || isClicked) return;
    
    // Calculer une nouvelle position aléatoire (max 100px autour)
    const newX = (Math.random() - 0.5) * 200;
    const newY = (Math.random() - 0.5) * 100;
    
    setButtonPos({ x: newX, y: newY });
  };

  return (
    <footer className="py-8 mt-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#666666] dark:text-[#888888] w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 relative">
      <p>© {new Date().getFullYear()} Alexandre. Tous droits réservés.</p>
      
      {isClicked ? (
        <span className="absolute left-1/2 -translate-x-1/2 text-red-500 font-mono text-xs animate-pulse hidden md:block">
          Je t'avais dit de ne pas cliquer...
        </span>
      ) : (
        <button
          ref={buttonRef}
          onMouseEnter={handleHover}
          onClick={() => setIsClicked(true)}
          style={{ 
            transform: `translate(${buttonPos.x}px, ${buttonPos.y}px)`,
            transition: "transform 0.2s ease-out"
          }}
          className="absolute left-1/2 -translate-x-1/2 px-3 py-1 text-xs border border-red-500/30 text-red-500 rounded-full hover:bg-red-500/10 hidden md:block"
        >
          Ne pas cliquer
        </button>
      )}

      <div className="flex items-center gap-6">
        <a href="https://github.com/grssalex" target="_blank" rel="noopener noreferrer" className="hover:text-[#111111] dark:hover:text-[#EDEDED] transition-colors">
          GitHub
        </a>
        <a href="https://linkedin.com/in/grssalex" target="_blank" rel="noopener noreferrer" className="hover:text-[#111111] dark:hover:text-[#EDEDED] transition-colors">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
