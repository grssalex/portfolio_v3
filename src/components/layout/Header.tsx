"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/lib/useMounted";

const links = [
  { href: "#experience", label: "Expérience" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const mounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 py-6">
      <a href="#top" className="font-mono text-[13px]">
        grssalex.dev
      </a>
      <nav aria-label="Navigation principale" className="flex flex-wrap items-center gap-6 text-sm">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-[#5F5F5F] dark:text-[#8F8F8F] hover:text-[#111111] dark:hover:text-[#EDEDED] transition-colors"
          >
            {l.label}
          </a>
        ))}
        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Changer de thème"
          className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-[#E6E6E6] dark:border-[#222222] hover:bg-[#F0F0F0] dark:hover:bg-[#151515] transition-colors"
        >
          {mounted && isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </nav>
    </header>
  );
}
