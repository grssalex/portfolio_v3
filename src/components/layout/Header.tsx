"use client";

import { Code2, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/lib/useMounted";

const navLink =
  "inline-flex items-center gap-2 min-h-[38px] px-3 rounded-lg text-sm text-muted hover:bg-active hover:text-fg transition-colors";

export default function Header() {
  const mounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <header className="border-b border-line bg-bg">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 min-h-[62px] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-[30px] h-[30px] rounded-lg bg-fg text-bg inline-flex items-center justify-center font-bold text-xs">
            AG
          </span>
          <a href="#intro" className="font-semibold">
            Alexandre Grosse
          </a>
          <span className="text-line-strong">/</span>
          <span className="text-sm text-muted">Portfolio</span>
          <span className="hidden sm:inline font-mono text-[11px] px-2 py-0.5 border border-line rounded-full text-muted">
            v2026.11
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <a className={navLink} href="https://github.com/grssalex" target="_blank" rel="noopener noreferrer">
            <Code2 className="w-[15px] h-[15px]" /> GitHub
          </a>
          <a className={navLink} href="https://linkedin.com/in/grssalex" target="_blank" rel="noopener noreferrer">
            <User className="w-[15px] h-[15px]" /> LinkedIn
          </a>
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Changer de thème"
            className="ml-1 w-10 h-10 inline-flex items-center justify-center border border-line rounded-[9px] hover:bg-active transition-colors"
          >
            {isDark ? <Sun className="w-[15px] h-[15px]" /> : <Moon className="w-[15px] h-[15px]" />}
          </button>
        </div>
      </div>
    </header>
  );
}
