"use client";

import { ArrowUpRight, Github } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useMounted } from "@/lib/useMounted";

const EMAIL = "contact@grssalex.dev";
const GH_USER = "grssalex";
const CACHE_KEY = "gh_profile_v4";

type GhStats = { avatar: string; repos: number; topLang: string };

function useGithubStats() {
  const [stats, setStats] = useState<GhStats | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
        if (cached && Date.now() - cached.t < 3_600_000) {
          setStats(cached.v);
          return;
        }
      } catch {}
      try {
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${GH_USER}`).then((x) => x.json()),
          fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100`).then((x) => x.json()),
        ]);
        const counts: Record<string, number> = {};
        if (Array.isArray(r)) for (const repo of r) if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
        const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
        const v = { avatar: u.avatar_url, repos: u.public_repos ?? 0, topLang: top };
        setStats(v);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), v }));
        } catch {}
      } catch {}
    })();
  }, []);

  return stats;
}

const card = "border border-[#E6E6E6] dark:border-[#222222] rounded-2xl bg-white dark:bg-[#0A0A0A]";
const muted = "text-[#5F5F5F] dark:text-[#8F8F8F]";

export default function Contact() {
  const stats = useGithubStats();
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section id="contact" className="py-24 border-t border-[#E6E6E6] dark:border-[#222222] scroll-mt-20">
      <h2 className="text-[28px] font-medium mb-2">Contact</h2>
      <p className={`text-base font-light ${muted} mb-12`}>Basé en Île-de-France · réponse sous 48 h.</p>

      <div className="flex flex-wrap gap-4">
        {/* GitHub */}
        <div className="flex-[1_1_300px] p-6 rounded-2xl border border-[#E6E6E6] dark:border-[#222222] bg-[#F5F5F5] dark:bg-[#111111] flex flex-col gap-5 min-w-0">
          <div className="flex items-center gap-3.5">
            {stats?.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={stats.avatar} alt="" className="w-12 h-12 rounded-full border border-[#E6E6E6] dark:border-[#333333]" />
            ) : (
              <span className="w-12 h-12 rounded-full bg-[#E6E6E6] dark:bg-[#222222] animate-pulse" />
            )}
            <div className="flex flex-col">
              <span className="font-medium">@{GH_USER}</span>
              <span className={`flex items-center gap-1 text-xs ${muted}`}>
                <Github className="w-3 h-3" /> GitHub
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className={`${card} rounded-xl p-3`}>
              <div className="font-display text-lg font-bold leading-[30px]">{stats ? stats.repos : "–"}</div>
              <div className={`text-xs ${muted}`}>Dépôts</div>
            </div>
            <div className={`${card} rounded-xl p-3`}>
              <div className="font-display text-lg font-bold leading-[30px] truncate">{stats ? stats.topLang : "–"}</div>
              <div className={`text-xs ${muted}`}>Top langage</div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 pt-4 border-t border-[#E6E6E6] dark:border-[#222222]">
            <span className="text-xs font-medium">Activité</span>
            <div className="overflow-x-auto">
              {mounted && (
                <GitHubCalendar
                  username={GH_USER}
                  colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
                  theme={{
                    light: ["#EBEBEB", "#CFCFCF", "#9E9E9E", "#5C5C5C", "#111111"],
                    dark: ["#1A1A1A", "#3A3A3A", "#6A6A6A", "#A8A8A8", "#EDEDED"],
                  }}
                  fontSize={10}
                  blockSize={8}
                  blockMargin={3}
                />
              )}
            </div>
          </div>

          <a
            href={`https://github.com/${GH_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto pt-4 border-t border-[#E6E6E6] dark:border-[#222222] min-h-11 flex items-center justify-between text-sm font-medium"
          >
            Voir le profil GitHub <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Contact */}
        <div className="flex-[999_1_520px] min-w-0 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="https://agws.fr" target="_blank" rel="noopener noreferrer" className={`${card} p-6 flex flex-col gap-2 hover:border-[#BDBDBD] dark:hover:border-[#444444] transition-colors`}>
              <span className={`font-mono text-xs ${muted}`}>Entreprise</span>
              <span className="text-[17px] font-medium">Un projet web ou IA pour votre entreprise</span>
              <span className={`text-sm ${muted}`}>Passez par AGWS ↗</span>
            </a>
            <a href={`mailto:${EMAIL}`} className={`${card} p-6 flex flex-col gap-2 hover:border-[#BDBDBD] dark:hover:border-[#444444] transition-colors`}>
              <span className={`font-mono text-xs ${muted}`}>Perso</span>
              <span className="text-[17px] font-medium">Une opportunité, un échange tech</span>
              <span className={`text-sm ${muted}`}>Écrivez-moi directement ↗</span>
            </a>
          </div>

          <div className={`${card} flex-1 p-8 flex flex-col justify-between gap-8`}>
            <div>
              <div className={`font-mono text-xs ${muted} mb-3`}>Email</div>
              <a href={`mailto:${EMAIL}`} className="font-display text-[26px] sm:text-[36px] lg:text-[44px] font-medium tracking-[-0.03em] break-all">
                {EMAIL}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 pt-5 border-t border-[#E6E6E6] dark:border-[#222222]">
              <a
                href={`mailto:${EMAIL}`}
                className="min-h-11 inline-flex items-center px-4 rounded-lg bg-[#111111] text-[#FAFAFA] dark:bg-[#EDEDED] dark:text-[#0A0A0A] text-sm font-medium hover:opacity-85 transition-opacity"
              >
                Écrire un message
              </a>
              <button
                type="button"
                onClick={copy}
                className="min-h-11 px-4 rounded-lg border border-[#E6E6E6] dark:border-[#222222] text-sm font-medium hover:bg-[#F0F0F0] dark:hover:bg-[#151515] transition-colors"
              >
                {copied ? "Copié ✓" : "Copier l’email"}
              </button>
              <a
                href="https://linkedin.com/in/grssalex"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 inline-flex items-center px-4 rounded-lg border border-[#E6E6E6] dark:border-[#222222] text-sm font-medium hover:bg-[#F0F0F0] dark:hover:bg-[#151515] transition-colors"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
