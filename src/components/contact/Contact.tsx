"use client";

import { ArrowUpRight, Check, Code2, Copy, Globe, Mail, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { EMAIL, GITHUB_USER } from "@/lib/data";
import { IconTile, SectionTitle } from "@/components/ui/SectionTitle";
import { useMounted } from "@/lib/useMounted";

const CACHE_KEY = "gh_profile_v5";

type GhStats = { avatar: string; repos: number; topLang: string };

function useGithubStats() {
  const [stats, setStats] = useState<GhStats | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
        if (cached && Date.now() - cached.t < 3_600_000) return setStats(cached.v);
      } catch {}
      try {
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}`).then((x) => x.json()),
          fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`).then((x) => x.json()),
        ]);
        const counts: Record<string, number> = {};
        if (Array.isArray(r)) for (const repo of r) if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
        const v = {
          avatar: u.avatar_url,
          repos: u.public_repos ?? 0,
          topLang: Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—",
        };
        setStats(v);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), v }));
        } catch {}
      } catch {}
    })();
  }, []);
  return stats;
}

const links = [
  { href: "https://agws.fr", icon: Globe, title: "Projet pour votre entreprise", desc: "Web ou IA sur-mesure, via mon agence AGWS." },
  { href: `mailto:${EMAIL}`, icon: Mail, title: "M’écrire directement", desc: "Une opportunité, un échange tech." },
  { href: "https://linkedin.com/in/grssalex", icon: User, title: "LinkedIn", desc: "Parcours complet et actualités." },
  { href: `https://github.com/${GITHUB_USER}`, icon: Code2, title: "GitHub", desc: "Projets publics et code source de ce site." },
];

export default function Contact() {
  const stats = useGithubStats();
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section id="contact" className="mb-14 scroll-mt-6">
      <SectionTitle icon={Mail}>Contact</SectionTitle>
      <p className="text-muted -mt-2 mb-[18px]">Basé en Île-de-France, réponse sous 48 h.</p>

      <div className="border border-line rounded-xl overflow-hidden mb-4">
        <div className="flex items-center justify-between pl-4 pr-2 py-2 border-b border-line bg-subtle text-[12.5px] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Mail className="w-[13px] h-[13px]" /> email
          </span>
          <button
            type="button"
            onClick={copy}
            className="min-h-[34px] inline-flex items-center gap-1.5 px-3 border border-line rounded-[7px] bg-bg text-fg text-[12.5px] font-medium hover:border-accent transition-colors"
          >
            {copied ? <Check className="w-[13px] h-[13px]" /> : <Copy className="w-[13px] h-[13px]" />}
            {copied ? "Copié" : "Copier"}
          </button>
        </div>
        <a href={`mailto:${EMAIL}`} className="block px-[18px] py-[22px] font-mono text-[clamp(18px,2.4vw,24px)] font-medium break-all">
          <span className="text-accent">contact</span>@grssalex.dev
        </a>
      </div>

      <div className="border border-line rounded-xl p-[18px] mb-4 flex flex-wrap gap-x-7 gap-y-[18px] items-center">
        <div className="flex items-center gap-3">
          {stats?.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={stats.avatar} alt="" className="w-11 h-11 rounded-full border border-line" />
          ) : (
            <span className="w-11 h-11 rounded-full bg-code border border-line inline-flex items-center justify-center font-bold text-[13px]">
              AG
            </span>
          )}
          <div className="flex flex-col">
            <span className="font-semibold">@{GITHUB_USER}</span>
            <span className="text-[12.5px] text-muted">Activité GitHub</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-2 border border-line rounded-[9px] bg-subtle">
            <div className="font-bold text-lg leading-tight">{stats ? stats.repos : "–"}</div>
            <div className="text-[11.5px] text-muted">Dépôts</div>
          </div>
          <div className="px-3 py-2 border border-line rounded-[9px] bg-subtle">
            <div className="font-bold text-lg leading-tight">{stats ? stats.topLang : "–"}</div>
            <div className="text-[11.5px] text-muted">Top langage</div>
          </div>
        </div>
        <div className="flex-[1_1_300px] min-w-0 overflow-x-auto">
          {mounted && (
            <GitHubCalendar
              username={GITHUB_USER}
              colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
              theme={{
                light: ["#EEEEEE", "#C5D6FA", "#8FB0F5", "#5584EE", "#2563EB"],
                dark: ["#1A1A1A", "#26324A", "#3B5584", "#5A7FC4", "#7FA7FF"],
              }}
              showColorLegend={false}
              showTotalCount={false}
              fontSize={10}
              blockSize={9}
              blockMargin={3}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((l) => (
          <a
            key={l.title}
            href={l.href}
            {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="lift relative p-[18px] border border-line rounded-xl flex gap-3.5 items-start"
          >
            <IconTile icon={l.icon} />
            <span className="flex flex-col gap-0.5 pr-[18px]">
              <span className="font-semibold">{l.title}</span>
              <span className="text-[13.5px] text-muted leading-normal">{l.desc}</span>
            </span>
            <ArrowUpRight className="absolute top-[18px] right-[18px] w-[15px] h-[15px] text-muted" />
          </a>
        ))}
      </div>
    </section>
  );
}
