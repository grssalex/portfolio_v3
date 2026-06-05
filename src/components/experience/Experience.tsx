"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface SubMission {
  title: string;
  desc: string;
  tech: string;
}

interface Mission {
  title: string;
  date?: string;
  desc: string;
  tech?: string;
  link?: { label: string; url: string };
  subMissions?: SubMission[];
}

interface Experience {
  id: string;
  company: string;
  role: string;
  date: string;
  location: string;
  description: string;
  skills: string[];
  missions: Mission[];
}

const experiences: Experience[] = [
  {
    id: "carrefour-dev",
    company: "Carrefour",
    role: "Lead Développeur Spécialisé en Intelligence Artificielle | Digital Factory Merchandise",
    date: "Sept. 2025 — Aujourd'hui",
    location: "Massy, Île-de-France, France",
    description: "Développement de solutions sur la base d'intelligence artificielle pour automatiser l'analyse de données et générer des insights pour les équipes Marchandise et Négociation.",
    skills: ["Développement d'IA", "Google Cloud Platform (GCP)"],
    missions: [
      {
        title: "Responsable de développement de Growth AI pour l'application Datashopper – (Carrefour World Trade) | Genève, Suisse",
        desc: "Création d'une interface conversationnelle permettant d'interroger la donnée simplement (type \"talk to my data\"), afin de rendre l'analyse accessible sans passer par des dashboards complexes.",
        tech: "Looker, Gemini Data Analytics API, Gemini API, Anthropic API & Lite-llm",
      },
      {
        title: "Catman - Intégration IA | Massy, France",
        desc: "Développement d'un outil d'analyse data par IA dédié aux performances produits et catégories, visant à faciliter l'accès aux insights métiers et améliorer la prise de décision grâce à l'intelligence artificielle.",
        tech: "BigQuery, Gemini & N8N",
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
        desc: "Contribution à l'accélération de la croissance de TalentFindr (startup de sourcing RH) à temps partiel. Travail sur l'amélioration et l'évolution des systèmes d'IA existants et développement de nouvelles solutions renforçant les capacités globales de la plateforme.",
        link: { label: "talentfindr.ai", url: "https://www.talentfindr.ai/" },
        subMissions: [
          {
            title: "Pipeline de sourcing multi-agents",
            desc: "Conception et développement d'une pipeline de sourcing automatisée orchestrant plusieurs agents IA en séquence : rédaction du brief, reformulation, interrogation de bases de données de contacts (ContactOut), stratégie de ciblage (Claude Opus), calibration et scoring des profils. Chaque agent s'appuie sur le précédent pour affiner progressivement la sélection de candidats.",
            tech: "Claude SDK (Opus & Haiku), ContactOut API, Python"
          },
          {
            title: "Système d'outreach automatisé",
            desc: "Développement d'un système de prise de contact automatisée adapté aux profils sourcés. Génération de messages personnalisés par IA selon le profil du candidat, gestion des séquences d'envoi et suivi des réponses pour optimiser le taux de conversion.",
            tech: "Claude SDK, intégrations CRM"
          }
        ]
      },
      {
        title: "Gestion et maintenance web",
        date: "Janv. 2026 — Aujourd'hui",
        desc: "Gestion et maintenance de plusieurs sites clients en production. Mises à jour techniques, résolution de problèmes, optimisation des performances et garantie de la stabilité des plateformes.",
      },
      {
        title: "Réalisations de sites e-commerce & vitrines",
        desc: "Conception et développement de plusieurs sites e-commerce et vitrines pour des clients en France, au Royaume-Uni, en Espagne et en Nouvelle-Calédonie.",
        link: { label: "agws.fr", url: "https://agws.fr" }
      }
    ]
  },
  {
    id: "carrefour-manager",
    company: "Carrefour",
    role: "Manager Magasin",
    date: "Juin 2020 — Aujourd'hui",
    location: "Maulette, Île-de-France, France",
    description: "Management opérationnel d'un magasin franchisé du groupe Carrefour à Maulette, aux côtés de mon père, gérant de franchise et partenaire du groupe depuis près de 20 ans. Formation aux exigences du travail en magasin : gestion des équipes, organisation des flux, relation client et performance commerciale.",
    skills: ["Management", "Opérationnel", "Commerce de détail"],
    missions: []
  }
];

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

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

              {exp.missions.length > 0 && (
                <button
                  onClick={() => toggleExpand(exp.id)}
                  className="flex items-center gap-2 text-sm font-medium text-[#111111] dark:text-[#EDEDED] border border-[#EAEAEA] dark:border-[#222222] px-4 py-2 rounded-lg hover:bg-[#F5F5F5] dark:hover:bg-[#111111] transition-colors"
                >
                  Voir les missions
                  <motion.div
                    animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>
              )}

              <AnimatePresence>
                {expandedId === exp.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 space-y-6 border-l border-[#EAEAEA] dark:border-[#222222] ml-2 pl-6 mt-4">
                      {exp.missions.map((mission, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[29px] top-2 w-2 h-2 rounded-full bg-[#111111] dark:bg-[#EDEDED]" />
                          <h4 className="text-base font-medium text-[#111111] dark:text-[#EDEDED] mb-1">
                            {mission.title}
                          </h4>
                          {mission.date && (
                            <p className="text-xs text-[#666666] dark:text-[#888888] font-mono mb-2">
                              {mission.date}
                            </p>
                          )}
                          <p className="text-sm text-[#666666] dark:text-[#888888] font-light leading-relaxed mb-2">
                            {mission.desc}
                          </p>
                          {mission.tech && (
                            <p className="text-xs font-mono text-[#111111] dark:text-[#EDEDED]">
                              <span className="text-[#666666] dark:text-[#888888]">Tech :</span> {mission.tech}
                            </p>
                          )}
                          {mission.link && (
                            <a
                              href={mission.link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium text-[#111111] dark:text-[#EDEDED] border-b border-[#111111] dark:border-[#EDEDED] hover:text-[#666666] dark:hover:text-[#888888] hover:border-[#666666] transition-colors mt-1"
                            >
                              {mission.link.label} ↗
                            </a>
                          )}
                          {mission.subMissions && (
                            <div className="mt-4 space-y-4 border-l border-[#EAEAEA] dark:border-[#222222] pl-4 ml-1">
                              {mission.subMissions.map((sub, sIdx) => (
                                <div key={sIdx} className="relative">
                                  <div className="absolute -left-[21px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#666666] dark:bg-[#888888]" />
                                  <h5 className="text-sm font-medium text-[#111111] dark:text-[#EDEDED] mb-1">{sub.title}</h5>
                                  <p className="text-xs text-[#666666] dark:text-[#888888] font-light leading-relaxed mb-1">{sub.desc}</p>
                                  <p className="text-xs font-mono text-[#111111] dark:text-[#EDEDED]">
                                    <span className="text-[#666666] dark:text-[#888888]">Tech :</span> {sub.tech}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
