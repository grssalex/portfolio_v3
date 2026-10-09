import {
  siClaude,
  siCoolify,
  siDocker,
  siFastapi,
  siGithubactions,
  siGitlab,
  siGoogle,
  siGooglebigquery,
  siGooglecloud,
  siGooglegemini,
  siLinux,
  siLooker,
  siModelcontextprotocol,
  siN8n,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siNotebooklm,
  siPortainer,
  siPostgresql,
  siPython,
  siRaspberrypi,
  siReact,
  siSap,
  siTailwindcss,
  siTypescript,
  siUptimekuma,
  siWireguard,
  type SimpleIcon,
} from "simple-icons";
import { CircleCheck, Layers, ShieldCheck, Sparkles, Users, Waypoints, type LucideIcon } from "lucide-react";

type Item = { name: string; icon: SimpleIcon | LucideIcon };

const stack: { cat: string; items: Item[] }[] = [
  {
    cat: "IA générative",
    items: [
      { name: "Gemini (Vertex AI)", icon: siGooglegemini },
      { name: "Claude (Anthropic API)", icon: siClaude },
      { name: "Google ADK", icon: siGoogle },
      { name: "LiteLLM", icon: Sparkles },
      { name: "MCP", icon: siModelcontextprotocol },
      { name: "Agents multi-étapes", icon: Sparkles },
    ],
  },
  {
    cat: "IA en entreprise",
    items: [
      { name: "Gemini Enterprise", icon: siGooglegemini },
      { name: "NotebookLM", icon: siNotebooklm },
      { name: "Formation des métiers", icon: Users },
    ],
  },
  {
    cat: "Data & RAG",
    items: [
      { name: "BigQuery", icon: siGooglebigquery },
      { name: "Looker", icon: siLooker },
      { name: "Couche sémantique", icon: Layers },
      { name: "Base vectorielle", icon: Layers },
      { name: "Gemini Data API", icon: siGooglegemini },
      { name: "SQL", icon: Layers },
    ],
  },
  {
    cat: "Qualité & MLOps",
    items: [
      { name: "Évaluation LLM", icon: CircleCheck },
      { name: "GitLab CI/CD", icon: siGitlab },
      { name: "GitHub Actions", icon: siGithubactions },
      { name: "Cloud Build", icon: siGooglecloud },
    ],
  },
  {
    cat: "Automatisation",
    items: [
      { name: "n8n", icon: siN8n },
      { name: "ServiceNow API", icon: Waypoints },
      { name: "SAP Ariba API", icon: siSap },
      { name: "Google Workspace API", icon: siGoogle },
      { name: "Python", icon: siPython },
    ],
  },
  {
    cat: "Web & produit",
    items: [
      { name: "Next.js", icon: siNextdotjs },
      { name: "React", icon: siReact },
      { name: "TypeScript", icon: siTypescript },
      { name: "Tailwind", icon: siTailwindcss },
      { name: "Node.js", icon: siNodedotjs },
      { name: "FastAPI", icon: siFastapi },
      { name: "PostgreSQL", icon: siPostgresql },
    ],
  },
  {
    cat: "Cloud & sécurité",
    items: [
      { name: "Google Cloud", icon: siGooglecloud },
      { name: "Cloud Run", icon: siGooglecloud },
      { name: "Docker", icon: siDocker },
      { name: "IAM", icon: ShieldCheck },
      { name: "Secret Manager", icon: ShieldCheck },
    ],
  },
  {
    cat: "Self-hosting",
    items: [
      { name: "Raspberry Pi", icon: siRaspberrypi },
      { name: "Linux", icon: siLinux },
      { name: "nginx", icon: siNginx },
      { name: "WireGuard", icon: siWireguard },
      { name: "Portainer", icon: siPortainer },
      { name: "Uptime Kuma", icon: siUptimekuma },
      { name: "Coolify", icon: siCoolify },
    ],
  },
];

function Icon({ icon }: { icon: Item["icon"] }) {
  if ("path" in icon) {
    return (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="currentColor" aria-hidden="true">
        <path d={icon.path} />
      </svg>
    );
  }
  const L = icon;
  return <L className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />;
}

export default function Stack() {
  return (
    <section id="stack" className="py-24 border-t border-[#E6E6E6] dark:border-[#222222] scroll-mt-20">
      <h2 className="text-[28px] font-medium mb-2">Stack</h2>
      <p className="text-[15px] font-light text-[#5F5F5F] dark:text-[#8F8F8F] mb-12">
        Ce que j&apos;utilise au quotidien, en production.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E6E6E6] dark:bg-[#222222] border border-[#E6E6E6] dark:border-[#222222] rounded-2xl overflow-hidden">
        {stack.map((s) => (
          <div key={s.cat} className="bg-white dark:bg-[#0A0A0A] p-6 flex flex-col gap-3.5">
            <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#5F5F5F] dark:text-[#8F8F8F]">
              {s.cat}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {s.items.map((i) => (
                <span
                  key={i.name}
                  className="inline-flex items-center gap-[7px] text-[13px] px-2.5 py-[5px] border border-[#E6E6E6] dark:border-[#222222] rounded-md"
                >
                  <Icon icon={i.icon} />
                  {i.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
