export type Mission = { title: string; desc: string; tech?: string };

export type Experience = {
  id: string;
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
    date: "Juil. 2026 — Aujourd’hui",
    role: "Ingénieur en Intelligence Artificielle",
    org: "Carrefour · Direction des Achats Non Marchands · Massy",
    logo: "carrefour",
    desc: "Conception d'agents et d'outils IA pour les acheteurs : coaching de négociation, automatisation du suivi des pénalités fournisseurs, analyse des dépenses et pipelines data sur GCP.",
    missions: [
      {
        title: "Suivi automatisé des pénalités fournisseurs",
        desc: "Détection et calcul des pénalités à partir des incidents remontés dans ServiceNow, en remplacement d'un suivi manuel sur fichiers.",
        tech: "ServiceNow · BigQuery · Google Cloud",
      },
      {
        title: "Analyse des dépenses & pipelines data",
        desc: "Consolidation des données achats dans BigQuery pour l'analyse des dépenses et le pilotage de la performance achats.",
        tech: "BigQuery · SQL",
      },
      {
        title: "Acculturation IA des acheteurs",
        desc: "Conception d'un parcours d'ateliers pour ancrer l'IA générative dans le quotidien des équipes achats.",
        tech: "Gemini · Gems · NotebookLM",
      },
    ],
  },
  {
    id: "df",
    date: "Sept. 2025 — Juil. 2026",
    role: "Développeur Lead IA & GenAI",
    org: "Carrefour · Digital Factory Marchandise · Massy",
    logo: "carrefour",
    desc: "Solutions d'IA générative pour automatiser l'analyse de données et produire des insights pour les équipes Marchandise et Négociation.",
    missions: [
      {
        title: "Growth Analyst — Carrefour Links",
        desc: "Création d'un « talk to my data » sur la donnée fournisseurs, dans un objectif de monétisation de la data : couche sémantique, base vectorielle et analyse par IA.",
        tech: "Couche sémantique · Base vectorielle · BigQuery · Gemini",
      },
      {
        title: "Datashopper — Carrefour World Trade, Genève",
        desc: "Interface conversationnelle pour interroger la donnée simplement, sans passer par des dashboards complexes.",
        tech: "Looker · Gemini Data API · Anthropic API · LiteLLM",
      },
      {
        title: "Catman — Intégration IA, Massy",
        desc: "Outil d'analyse par IA des performances produits et catégories, pour faciliter l'accès aux insights métier.",
        tech: "BigQuery · Gemini · n8n",
      },
    ],
  },
  {
    id: "agws",
    date: "Août 2023 — Aujourd’hui",
    role: "Fondateur & lead développement",
    org: "AGWS — agence web & digitale · Hybride",
    logo: "agws",
    desc: "Agence spécialisée en IA, développement web & e-commerce et cloud, avec des projets en France, au Royaume-Uni, en Espagne et en Nouvelle-Calédonie.",
    missions: [
      {
        title: "TalentFindr — Ingénieur IA (depuis mars 2026)",
        desc: "Évolution des systèmes d'IA existants et développement de nouvelles briques pour la plateforme.",
        tech: "Multi-agents · Python",
      },
    ],
  },
];
