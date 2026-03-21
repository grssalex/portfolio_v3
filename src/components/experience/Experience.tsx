"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    id: "carrefour",
    company: "Carrefour",
    role: "Développeur Lead IA & GenAI | Digital Factory Merchandise",
    date: "Sept. 2025 — Aujourd'hui",
    location: "Massy, Île-de-France, France",
    description: "Développement de solutions d'IA et d'IA générative pour automatiser l'analyse de données et générer des insights pour les équipes Marchandise et Négociation.",
    skills: ["Développement d'IA", "Google Cloud Platform (GCP)"],
    missions: [
      {
        title: "Datashopper – (Carrefour World Trade) Genève, Suisse",
        desc: "Création d'une interface conversationnelle permettant d'interroger la donnée simplement (type \"chat avec la data\"), afin de rendre l'analyse accessible sans passer par des dashboards complexes.",
        tech: "Looker, Gemini Data API, Gemini API, Anthropic API, Lite-llm"
      },
      {
        title: "Catman - Intégration IA",
        desc: "Développement d'un outil d'analyse data par IA dédié aux performances produits et catégories, visant à faciliter l'accès aux insights métiers et améliorer la prise de décision grâce à l'intelligence artificielle.",
        tech: "BigQuery, Gemini & N8N"
      }
    ]
  },
  {
    id: "agws",
    company: "AGWS - Agence de développement web & digital",
    role: "Fondateur & Lead Développement Digital",
    date: "Août 2023 — Aujourd'hui",
    location: "Paris et périphérie · Hybride",
    description: "Depuis 2023, je développe une agence digitale pour les entreprises, spécialisée dans l'intelligence artificielle, le développement web & e-commerce, et les solutions cloud, avec des projets en France, au Royaume-Uni, en Espagne et en Nouvelle-Calédonie.",
    skills: ["Web Development", "AI Solutions", "Cloud Architecture"],
    missions: [
      {
        title: "TalentFindr - Développeur en Intelligence Artificielle",
        date: "Mars 2026 — Aujourd'hui",
        desc: "J'ai rejoint TalentFindr et les équipes dirigées par Georges Garnier à temps partiel pour contribuer à l'accélération de la croissance de l'entreprise. Mon travail se concentre sur l'amélioration et l'évolution des systèmes d'IA existants tout en contribuant au développement de nouvelles solutions qui renforcent les capacités et les performances globales de la plateforme."
      },
      {
        title: "Setup NC - Spécialiste en Maintenance Web",
        date: "Janv. 2026 — Aujourd'hui",
        desc: "Je collabore avec Setup NC, une entreprise basée en Nouvelle-Calédonie, pour la maintenance et la gestion de plusieurs sites web. Mon rôle inclut la gestion des mises à jour techniques, la résolution des problèmes, l'optimisation des performances et la garantie de la stabilité et de la disponibilité des plateformes."
      }
    ]
  },
];

export default function Experience() {
  return (
    <section id="experiences" className="py-24 border-t border-[#EAEAEA] dark:border-[#222222]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-medium text-[#111111] dark:text-[#EDEDED] mb-2">
          Expérience
        </h2>
      </motion.div>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 group"
          >
            <div className="md:col-span-1 pt-1">
              <span className="text-sm text-[#666666] dark:text-[#888888] font-mono">
                {exp.date}
              </span>
            </div>
            
            <div className="md:col-span-3">
              <h3 className="text-lg font-medium text-[#111111] dark:text-[#EDEDED] mb-1">
                {exp.role} <br />
                <span className="text-[#666666] dark:text-[#888888]">Chez {exp.company}</span>
              </h3>
              <p className="text-[#666666] dark:text-[#888888] leading-relaxed text-sm sm:text-base font-light mb-4 mt-2">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
