"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-[#EAEAEA] dark:border-[#222222]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-medium text-[#111111] dark:text-[#EDEDED] mb-2">
          Contact
        </h2>
        <p className="text-[#666666] dark:text-[#888888] font-light">
          Disponible pour de nouvelles opportunités.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-sm text-[#666666] dark:text-[#888888] mb-2 font-mono">Email</p>
          <a
            href="mailto:contact@grssalex.dev"
            className="group inline-flex items-center gap-1 text-lg font-medium text-[#111111] dark:text-[#EDEDED] hover:text-[#666666] dark:hover:text-[#888888] transition-colors"
          >
            contact@grssalex.dev
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-sm text-[#666666] dark:text-[#888888] mb-2 font-mono">Téléphone</p>
          <a
            href="tel:+33625023130"
            className="group inline-flex items-center gap-1 text-lg font-medium text-[#111111] dark:text-[#EDEDED] hover:text-[#666666] dark:hover:text-[#888888] transition-colors"
          >
            +33 6 25 02 31 30
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
