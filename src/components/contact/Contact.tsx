"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

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
        <p className="text-[#666666] dark:text-[#888888] font-light max-w-xl">
          Une idée de projet ? Un besoin en développement ou en IA ? N'hésitez pas à me contacter directement.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Carte Email */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-8 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#222222] hover:border-[#CCCCCC] dark:hover:border-[#444444] transition-colors group flex flex-col justify-between min-h-[200px]"
        >
          <div>
            <p className="text-sm text-[#666666] dark:text-[#888888] mb-4 font-mono">Email</p>
            <a
              href="mailto:contact@grssalex.dev"
              className="text-xl sm:text-2xl font-medium text-[#111111] dark:text-[#EDEDED] hover:text-blue-500 transition-colors break-all"
            >
              contact@grssalex.dev
            </a>
          </div>
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#EAEAEA] dark:border-[#222222]">
            <a
              href="mailto:contact@grssalex.dev"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#111111] dark:text-[#EDEDED] hover:text-blue-500 transition-colors"
            >
              Écrire un message
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => copyToClipboard("contact@grssalex.dev", "email")}
              className="p-2 rounded-full hover:bg-[#F5F5F5] dark:hover:bg-[#111111] text-[#666666] dark:text-[#888888] transition-colors"
              title="Copier l'email"
            >
              {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>

        {/* Carte Téléphone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-8 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-[#EAEAEA] dark:border-[#222222] hover:border-[#CCCCCC] dark:hover:border-[#444444] transition-colors group flex flex-col justify-between min-h-[200px]"
        >
          <div>
            <p className="text-sm text-[#666666] dark:text-[#888888] mb-4 font-mono">Téléphone</p>
            <a
              href="tel:+33625023130"
              className="text-xl sm:text-2xl font-medium text-[#111111] dark:text-[#EDEDED] hover:text-blue-500 transition-colors"
            >
              +33 6 25 02 31 30
            </a>
          </div>
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#EAEAEA] dark:border-[#222222]">
            <a
              href="tel:+33625023130"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#111111] dark:text-[#EDEDED] hover:text-blue-500 transition-colors"
            >
              Appeler
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => copyToClipboard("+33625023130", "phone")}
              className="p-2 rounded-full hover:bg-[#F5F5F5] dark:hover:bg-[#111111] text-[#666666] dark:text-[#888888] transition-colors"
              title="Copier le numéro"
            >
              {copiedPhone ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
