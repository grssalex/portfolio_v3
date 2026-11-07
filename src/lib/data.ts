import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle2,
  Cloud,
  Cpu,
  Database,
  Globe,
  MapPin,
  MessageSquare,
  Plug,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import type { TechKey } from "@/components/ui/TechIcon";

export type Tag = { name: string; icon?: TechKey };
export type Mission = { title: string; desc: string; icon: LucideIcon; tags: Tag[] };
export type Experience = {
  id: string;
  nav: string;
  current?: boolean;
  date: string;
  role: string;
  org: string;
  logo: "carrefour" | "agws";
  desc: string;
  missions: Mission[];
};

export const experiences: Experience[] = [
  {
    id: "carrefour",
    nav: "Carrefour — Ingénieur IA",
    current: true,
    date: "Juil. 2026 — aujourd’hui",
    role: "Ingénieur en Intelligence Artificielle",
    org: "Carrefour · Direction des Achats Non Marchands · Massy",
    logo: "carrefour",
    desc: "Conception de la plateforme data et IA des achats non marchands : centralisation des données, agent IA pour les acheteurs, contrôle des prix et des pénalités, acculturation des équipes à l'IA.",
    missions: [
      {
        icon: Sparkles,
        title: "NTP AI — plateforme data & IA des achats",
        desc: "Plateforme d'analyse des achats non marchands dopée à l'IA : analyses de données générées par IA sur le spend, les contrats, les fournisseurs et la performance, et agent IA intégré qui répond aux acheteurs en langage naturel.",
        tags: [
          { name: "GCP", icon: "googlecloud" },
          { name: "Python", icon: "python" },
          { name: "React", icon: "react" },
          { name: "FastAPI", icon: "fastapi" },
        ],
      },
      {
        icon: Database,
        title: "Datalake finance du groupe Carrefour",
        desc: "Pipelines d'extraction et de chargement depuis SAP Ariba et ServiceNow vers BigQuery, avec supervision des jobs de nuit et fiabilisation des données.",
        tags: [
          { name: "BigQuery", icon: "bigquery" },
          { name: "dbt" },
          { name: "Python", icon: "python" },
          { name: "Cloud Run Jobs", icon: "googlecloud" },
        ],
      },
      {
        icon: ShieldCheck,
        title: "Contrôle & performance achats",
        desc: "Comparaison automatique des prix facturés aux prix négociés, calcul des pénalités contractuelles à partir des tickets ServiceNow, et générateur de commandes récurrentes intégré à la chaîne P2P.",
        tags: [
          { name: "BigQuery", icon: "bigquery" },
          { name: "Python", icon: "python" },
          { name: "ServiceNow" },
          { name: "Ariba", icon: "sap" },
        ],
      },
      {
        icon: Users,
        title: "Acculturation IA des acheteurs",
        desc: "Ateliers pour familiariser les acheteurs à l'IA au quotidien : appels d'offres, suivi fournisseurs et analyse de données.",
        tags: [
          { name: "Gemini", icon: "gemini" },
          { name: "NotebookLM", icon: "notebooklm" },
        ],
      },
    ],
  },
  {
    id: "digital-factory",
    nav: "Carrefour — Lead IA & GenAI",
    date: "Sept. 2025 — juil. 2026",
    role: "Développeur Lead IA & GenAI",
    org: "Carrefour · Digital Factory Marchandise · Massy",
    logo: "carrefour",
    desc: "Solutions d'IA générative pour automatiser l'analyse de données et produire des insights pour les équipes Marchandise et Négociation.",
    missions: [
      {
        icon: BarChart3,
        title: "Growth Analyst — Carrefour Links",
        desc: "« Talk to my data » sur la donnée fournisseurs, pour la monétisation de la data : couche sémantique, base vectorielle et analyse par IA.",
        tags: [
          { name: "Couche sémantique" },
          { name: "Base vectorielle" },
          { name: "BigQuery", icon: "bigquery" },
          { name: "Gemini", icon: "gemini" },
        ],
      },
      {
        icon: MessageSquare,
        title: "Datashopper — Carrefour World Trade, Genève",
        desc: "Interface conversationnelle pour interroger la donnée simplement, sans dashboards complexes.",
        tags: [
          { name: "Looker", icon: "looker" },
          { name: "Gemini Data API", icon: "gemini" },
          { name: "Anthropic API", icon: "claude" },
          { name: "LiteLLM" },
        ],
      },
      {
        icon: Cpu,
        title: "Catman — Intégration IA, Massy",
        desc: "Analyse par IA des performances produits et catégories pour les équipes métier.",
        tags: [
          { name: "BigQuery", icon: "bigquery" },
          { name: "Gemini", icon: "gemini" },
          { name: "n8n", icon: "n8n" },
        ],
      },
    ],
  },
  {
    id: "agws",
    nav: "AGWS — Fondateur",
    date: "Août 2023 — aujourd’hui",
    role: "Fondateur & lead développement",
    org: "AGWS — agence web & digitale · Hybride",
    logo: "agws",
    desc: "Agence spécialisée en IA, développement web & e-commerce et cloud, avec des projets en France, au Royaume-Uni, en Espagne et en Nouvelle-Calédonie.",
    missions: [
      {
        icon: Users,
        title: "TalentFindr — Ingénieur IA",
        desc: "Depuis mars 2026 : évolution des systèmes d'IA existants et nouvelles briques pour la plateforme de sourcing.",
        tags: [{ name: "Multi-agents" }, { name: "Python", icon: "python" }],
      },
    ],
  },
];

export const profile: { icon: LucideIcon; key: string; value: string }[] = [
  { icon: Briefcase, key: "role", value: "Ingénieur en Intelligence Artificielle" },
  { icon: Building2, key: "entreprise", value: "Carrefour — Direction des Achats Non Marchands" },
  { icon: Globe, key: "agence", value: "AGWS — web & IA pour PME, depuis 2023" },
  { icon: Sparkles, key: "domaines", value: "Agents IA, plateformes data, GCP, web" },
  { icon: MapPin, key: "localisation", value: "Île-de-France" },
];

export const stats = [
  { value: "2", label: "entreprises en parallèle" },
  { value: "4", label: "pays clients AGWS" },
  { value: "2023", label: "création d’AGWS" },
  { value: "1", label: "Raspberry Pi sert ce site" },
];

export const stack: { category: string; icon: LucideIcon; items: Tag[] }[] = [
  {
    category: "IA générative",
    icon: Sparkles,
    items: [
      { name: "Gemini (Vertex AI)", icon: "gemini" },
      { name: "Claude (Anthropic API)", icon: "claude" },
      { name: "LangGraph", icon: "langgraph" },
      { name: "Google ADK", icon: "google" },
      { name: "MCP", icon: "mcp" },
      { name: "LiteLLM" },
    ],
  },
  {
    category: "IA en entreprise",
    icon: Users,
    items: [
      { name: "Gemini Enterprise", icon: "gemini" },
      { name: "NotebookLM", icon: "notebooklm" },
      { name: "Formation des métiers" },
    ],
  },
  {
    category: "Data",
    icon: Database,
    items: [
      { name: "BigQuery", icon: "bigquery" },
      { name: "dbt" },
      { name: "Looker", icon: "looker" },
      { name: "Couche sémantique" },
      { name: "Base vectorielle" },
      { name: "SQL" },
    ],
  },
  {
    category: "Qualité & CI",
    icon: CheckCircle2,
    items: [
      { name: "Évaluation LLM" },
      { name: "GitLab CI/CD", icon: "gitlab" },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "Cloud Build", icon: "googlecloud" },
    ],
  },
  {
    category: "Intégrations",
    icon: Plug,
    items: [
      { name: "SAP Ariba", icon: "sap" },
      { name: "ServiceNow" },
      { name: "n8n", icon: "n8n" },
      { name: "Google Workspace API", icon: "google" },
      { name: "Python", icon: "python" },
    ],
  },
  {
    category: "Web",
    icon: Globe,
    items: [
      { name: "Next.js", icon: "nextjs" },
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Tailwind", icon: "tailwind" },
      { name: "PostgreSQL", icon: "postgresql" },
    ],
  },
  {
    category: "Cloud & sécurité",
    icon: Cloud,
    items: [
      { name: "Google Cloud", icon: "googlecloud" },
      { name: "Cloud Run", icon: "googlecloud" },
      { name: "Docker", icon: "docker" },
      { name: "IAM" },
      { name: "Secret Manager" },
    ],
  },
  {
    category: "Self-hosting",
    icon: Server,
    items: [
      { name: "Raspberry Pi", icon: "raspberrypi" },
      { name: "Linux", icon: "linux" },
      { name: "nginx", icon: "nginx" },
      { name: "WireGuard", icon: "wireguard" },
      { name: "Portainer", icon: "portainer" },
      { name: "Uptime Kuma", icon: "uptimekuma" },
    ],
  },
];

export const EMAIL = "contact@grssalex.dev";
export const GITHUB_USER = "grssalex";
