"use client";

import { motion } from "framer-motion";
import { Bot, Code2, Cloud } from "lucide-react";

const services = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "Intégration IA & GenAI",
    description: "Conception d'agents intelligents, RAG, et automatisation de processus métiers avec les derniers LLMs (GPT-4, Claude, Gemini).",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Développement Web",
    description: "Création d'applications web modernes, rapides et responsives avec React, Next.js et l'écosystème TypeScript.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "Architecture Cloud",
    description: "Déploiement, scalabilité et gestion d'infrastructures sur Google Cloud Platform (GCP) et AWS.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 border-t border-[#EAEAEA] dark:border-[#222222]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-medium text-[#111111] dark:text-[#EDEDED] mb-2">
          Services
        </h2>
        <p className="text-[#666666] dark:text-[#888888] font-light">
          Ce que je propose via mon agence AGWS.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#222222] hover:border-[#CCCCCC] dark:hover:border-[#444444] transition-colors group"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${service.bgColor} ${service.color} group-hover:scale-110 transition-transform duration-300`}>
              {service.icon}
            </div>
            <h3 className="text-lg font-medium text-[#111111] dark:text-[#EDEDED] mb-3">
              {service.title}
            </h3>
            <p className="text-sm text-[#666666] dark:text-[#888888] leading-relaxed font-light">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
