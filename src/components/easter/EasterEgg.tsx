"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";

// ─── BSOD ─────────────────────────────────────────────────────────────────────
const triggerBSOD = () => {
  const overlay = document.createElement("div");
  overlay.id = "bsod-overlay";
  overlay.style.cssText = `
    position:fixed;top:0;left:0;width:100vw;height:100vh;
    background:#0078D4;color:white;font-family:monospace;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    z-index:999999;padding:40px;box-sizing:border-box;
  `;
  overlay.innerHTML = `
    <div style="max-width:600px;text-align:left;">
      <div style="font-size:6rem;margin-bottom:20px;">:(</div>
      <p style="font-size:1.4rem;font-weight:bold;margin-bottom:24px;">
        Your portfolio ran into a problem and needs to restart.<br/>
        We're just collecting some error info, and then we'll restart for you.
      </p>
      <p id="bsod-pct" style="font-size:1rem;color:#cce4ff;margin-bottom:32px;">0% complete</p>
      <p style="font-size:0.85rem;color:#cce4ff;margin-bottom:8px;">
        For more information about this issue and possible fixes, visit<br/>
        <span style="text-decoration:underline">https://grssalex.dev/errors/rm-rf</span>
      </p>
      <p style="font-size:0.85rem;color:#cce4ff;margin-top:24px;">
        Stop code: <strong>FILESYSTEM_ANNIHILATED</strong><br/>
        What failed: <strong>user.ego</strong>
      </p>
      <button onclick="document.getElementById('bsod-overlay').remove();window.location.reload();"
        style="margin-top:40px;padding:10px 24px;border:2px solid white;background:transparent;
               color:white;cursor:pointer;font-family:monospace;font-size:0.9rem;letter-spacing:1px;">
        [ REBOOT SYSTEM ]
      </button>
    </div>
  `;
  document.body.appendChild(overlay);
  let pct = 0;
  const pctEl = document.getElementById("bsod-pct");
  const iv = setInterval(() => {
    pct += Math.floor(Math.random() * 4) + 1;
    if (pct >= 100) { pct = 100; clearInterval(iv); }
    if (pctEl) pctEl.textContent = `${pct}% complete`;
  }, 120);
};

// ─── Commands ─────────────────────────────────────────────────────────────────
type CmdResult = { output: string; action?: "matrix" | "clear" };

const HELP_TEXT = `Commandes disponibles :
  whoami          — identité complète
  experience      — parcours professionnel
  stack           — stack technique
  contact         — toutes mes coordonnées
  github          — lien GitHub
  talentfindr     — lien TalentFindr
  agws            — lien agence
  matrix          — ???
  clear           — vide le terminal`;

function runCommand(raw: string, isMatrix: boolean): CmdResult {
  const lower = raw.trim().toLowerCase();
  const cmd = lower.split(" ")[0];

  if (lower.startsWith("rm "))     return { output: "__BSOD__" };
  if (lower === "clear")           return { output: "__CLEAR__", action: "clear" };

  switch (cmd) {
    case "help":        return { output: HELP_TEXT };
    case "whoami":      return { output: "Alexandre Grosseau — Lead Dev IA @ Carrefour · Fondateur AGWS · Contrib TalentFindr" };
    case "experience":  return { output: `Carrefour     — Lead Dev IA (sept. 2025 → auj.)\nAGWS          — Fondateur & Lead Dev (août 2023 → auj.)\nTalentFindr   — Dev IA (mars 2026 → auj.)\nCarrefour     — Manager Magasin (juin 2020 → auj.)` };
    case "stack":       return { output: "gcp · docker · raspberry-pi · python · typescript · javascript · bash · linux · c · anthropic-sdk" };
    case "contact":     return { output: "📧  contact@grssalex.dev\n🔗  linkedin.com/in/grssalex\n🐙  github.com/grssalex" };
    case "github":      return { output: "→  https://github.com/grssalex" };
    case "talentfindr": return { output: "→  https://www.talentfindr.ai/" };
    case "agws":        return { output: "→  https://agws.fr" };
    case "sudo":        return { output: "Nice try. This incident will be reported." };
    case "matrix":      return { output: isMatrix ? "Exiting the Matrix..." : "Wake up, Neo...", action: "matrix" };
    default:            return { output: `command not found: ${raw.trim()}` };
  }
}

// ─── Blinking cursor ──────────────────────────────────────────────────────────
const Cursor = () => (
  <span className="inline-block w-[7px] h-[14px] bg-emerald-500 align-middle animate-pulse ml-0.5" />
);

// ─── Boot lines ───────────────────────────────────────────────────────────────
const BOOT_LINES = [
  { delay: 0,   text: "alex@portfolio ~ % zsh 5.9" },
  { delay: 150, text: "Loading profile..." },
  { delay: 350, text: 'Type "help" to see available commands.' },
];

// ─── Terminal ─────────────────────────────────────────────────────────────────
function InteractiveTerminal({ onMatrixToggle }: { onMatrixToggle: (v: boolean) => void }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [booted, setBooted] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([]);
  const [input, setInput] = useState("");
  const [isMatrix, setIsMatrix] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Boot sequence — no autoFocus, triggered only on user click
  useEffect(() => {
    BOOT_LINES.forEach(({ delay, text }) => {
      setTimeout(() => {
        setBootLines(prev => [...prev, text]);
        if (delay === BOOT_LINES[BOOT_LINES.length - 1].delay) setBooted(true);
      }, delay);
    });
  }, []);

  const termBodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Scroll only inside the terminal body, never the whole page
    if (termBodyRef.current) {
      termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
    }
  }, [history, input]);

  const focusTerminal = useCallback(() => {
    inputRef.current?.focus();
    setFocused(true);
  }, []);

  const handleKey = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !input.trim()) return;
    const raw = input.trim();
    setInput("");

    const result = runCommand(raw, isMatrix);

    if (result.output === "__BSOD__") {
      setHistory(h => [...h, { cmd: raw, output: "Initializing filesystem wipe..." }]);
      setTimeout(triggerBSOD, 600);
      return;
    }
    if (result.action === "clear") {
      setHistory([]);
      return;
    }
    if (result.action === "matrix") {
      const next = !isMatrix;
      setIsMatrix(next);
      onMatrixToggle(next);
      // Force dark mode when entering matrix
      if (next && typeof (window as any).__setTheme === "function") {
        (window as any).__setTheme("dark");
      }
    }
    setHistory(h => [...h, { cmd: raw, output: result.output }]);
  }, [input, isMatrix, onMatrixToggle]);

  // Theme-aware colors
  const bg        = isDark ? "#0A0A0A" : "#F9F9F9";
  const titleBg   = isDark ? "#1a1a1a" : "#EEEEEE";
  const titleBorder = isDark ? "#222222" : "#DDDDDD";
  const promptColor = isDark ? "#aaaaaa" : "#555555";
  const textColor   = isDark ? "#EDEDED" : "#111111";
  const bootColor1  = isDark ? "#34d399" : "#059669";  // emerald
  const bootColor3  = isDark ? "#888888" : "#999999";
  const bootColor2  = isDark ? "#444444" : "#AAAAAA";

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col border"
      style={{
        height: "420px",
        borderColor: isDark ? "#222222" : "#DDDDDD",
        cursor: "text",
      }}
      onClick={focusTerminal}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 shrink-0 border-b"
        style={{ background: titleBg, borderColor: titleBorder }}
      >
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs font-mono" style={{ color: isDark ? "#888888" : "#666666" }}>
          alex@portfolio — zsh
        </span>
      </div>

      {/* Body */}
      <div
        ref={termBodyRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed"
        style={{ background: bg }}
      >
        {/* Boot lines */}
        {bootLines.map((line, i) => (
          <div key={i} className="mb-1" style={{ color: i === 0 ? bootColor1 : i === 2 ? bootColor3 : bootColor2 }}>
            {line}
          </div>
        ))}

        {booted && <div className="mb-3" />}

        {/* History */}
        {history.map((item, i) => (
          <div key={i} className="mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500">➜</span>
              <span className="text-blue-400">~</span>
              <span style={{ color: textColor }}>{item.cmd}</span>
            </div>
            {item.output && (
              <div className="ml-5 mt-0.5 whitespace-pre-wrap" style={{ color: promptColor }}>{item.output}</div>
            )}
          </div>
        ))}

        {/* Input line */}
        {booted && (
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-500">➜</span>
            <span className="text-blue-400">~</span>
            <div className="flex items-center flex-1 relative">
              <span style={{ color: textColor }}>{input}</span>
              <Cursor />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="absolute inset-0 opacity-0 w-full"
                style={{ cursor: "text" }}
                autoComplete="off"
                spellCheck={false}
                // NO autoFocus — user must click first
              />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}

// ─── EasterEgg section ────────────────────────────────────────────────────────
export default function EasterEgg() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const handleMatrixToggle = useCallback((v: boolean) => {
    if (typeof (window as any).__setMatrixMode === "function") {
      (window as any).__setMatrixMode(v);
    }
  }, []);

  return (
    <section className="py-24 border-t border-[#EAEAEA] dark:border-[#222222]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
      >
        {/* Terminal */}
        <InteractiveTerminal onMatrixToggle={handleMatrixToggle} />

        {/* Contact */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-medium text-[#111111] dark:text-[#EDEDED] mb-2">
              Contact & GitHub
            </h2>
            <p className="text-[#666666] dark:text-[#888888] font-light text-sm leading-relaxed">
              Une question, un projet, ou juste envie de voir ce que je build en dehors du bureau ?
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <a
              href="mailto:contact@grssalex.dev"
              className="group flex items-center justify-between p-4 rounded-xl border border-[#EAEAEA] dark:border-[#222222] hover:border-[#111111] dark:hover:border-[#EDEDED] transition-colors bg-white dark:bg-[#0A0A0A]"
              style={{ color: isDark ? "#EDEDED" : "#111111", textDecoration: "none" }}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" style={{ color: isDark ? "#888888" : "#666666" }} />
                <span className="text-sm font-medium text-[#111111] dark:text-[#EDEDED]">contact@grssalex.dev</span>
              </div>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: isDark ? "#888888" : "#666666" }} />
            </a>

            <a
              href="https://github.com/grssalex"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 rounded-xl border border-[#EAEAEA] dark:border-[#222222] hover:border-[#111111] dark:hover:border-[#EDEDED] transition-colors bg-white dark:bg-[#0A0A0A]"
              style={{ color: isDark ? "#EDEDED" : "#111111", textDecoration: "none" }}
            >
              <div className="flex items-center gap-3">
                <Github className="w-4 h-4" style={{ color: isDark ? "#888888" : "#666666" }} />
                <span className="text-sm font-medium text-[#111111] dark:text-[#EDEDED]">github.com/grssalex</span>
              </div>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: isDark ? "#888888" : "#666666" }} />
            </a>

            <a
              href="https://linkedin.com/in/grssalex"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 rounded-xl border border-[#EAEAEA] dark:border-[#222222] hover:border-[#111111] dark:hover:border-[#EDEDED] transition-colors bg-white dark:bg-[#0A0A0A]"
              style={{ color: isDark ? "#EDEDED" : "#111111", textDecoration: "none" }}
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4" style={{ color: isDark ? "#888888" : "#666666" }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-sm font-medium text-[#111111] dark:text-[#EDEDED]">linkedin.com/in/grssalex</span>
              </div>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: isDark ? "#888888" : "#666666" }} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
