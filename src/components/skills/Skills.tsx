"use client";

import { motion } from "framer-motion";

const skills = [
  "python", "tensorflow", "pytorch", "gcp", "aws", "docker",
  "react", "nextjs", "tailwind", "typescript", "nodejs", "git"
];

export default function Skills() {
  const skillUrl = `https://skillicons.dev/icons?i=${skills.join(",")}&theme=light&perline=6`;
  const skillUrlDark = `https://skillicons.dev/icons?i=${skills.join(",")}&theme=dark&perline=6`;

  return (
    <section className="py-24 border-t border-[#EAEAEA] dark:border-[#222222]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-medium text-[#111111] dark:text-[#EDEDED] mb-2">
          Technologies
        </h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <img 
          src={skillUrl} 
          alt="My Skills" 
          className="max-w-full h-auto dark:hidden"
          loading="lazy"
        />
        <img 
          src={skillUrlDark} 
          alt="My Skills" 
          className="max-w-full h-auto hidden dark:block"
          loading="lazy"
        />
      </motion.div>
    </section>
  );
}
