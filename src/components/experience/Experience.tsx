"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { experiences } from "@/lib/data";
import { CarrefourLogo } from "@/components/ui/Logos";

export default function Experience() {
  const [open, setOpen] = useState<string | null>(experiences[0]?.id ?? null);

  return (
    <section id="experience" className="py-24 border-t border-[#E6E6E6] dark:border-[#222222] scroll-mt-20">
      <h2 className="text-[28px] font-medium mb-14">Expérience</h2>

      <div className="flex flex-col gap-14">
        {experiences.map((e) => {
          const isOpen = open === e.id;
          return (
            <div key={e.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-12">
              <span className="font-mono text-[13px] text-[#5F5F5F] dark:text-[#8F8F8F] pt-1">{e.date}</span>

              <div className="md:col-span-3 flex flex-col gap-2.5">
                <div className="flex items-center gap-4">
                  {e.logo === "carrefour" ? (
                    <span className="w-[52px] h-[52px] shrink-0 rounded-xl bg-white border border-[#E6E6E6] dark:border-[#222222] inline-flex items-center justify-center">
                      <CarrefourLogo className="w-[33px] h-[22px]" />
                    </span>
                  ) : (
                    <span className="w-[52px] h-[52px] shrink-0 rounded-xl bg-[#111111] text-[#FAFAFA] dark:bg-[#EDEDED] dark:text-[#0A0A0A] inline-flex items-center justify-center font-display font-bold text-[15px]">
                      AG
                    </span>
                  )}
                  <div className="flex flex-col gap-1 min-w-0">
                    <h3 className="text-[22px] font-medium leading-snug tracking-[-0.02em]">{e.role}</h3>
                    <span className="text-[15px] text-[#5F5F5F] dark:text-[#8F8F8F]">{e.org}</span>
                  </div>
                </div>

                <p className="mt-1.5 text-base leading-relaxed font-light text-[#5F5F5F] dark:text-[#8F8F8F] max-w-[720px]">
                  {e.desc}
                </p>

                {e.missions.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : e.id)}
                      aria-expanded={isOpen}
                      className="self-start mt-2 min-h-11 inline-flex items-center gap-2 px-4 border border-[#E6E6E6] dark:border-[#222222] rounded-lg text-sm font-medium hover:bg-[#F0F0F0] dark:hover:bg-[#151515] transition-colors"
                    >
                      {isOpen ? "Masquer les missions" : "Voir les missions"}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-7 mt-4 pl-6 border-l border-[#E6E6E6] dark:border-[#222222]">
                            {e.missions.map((m) => (
                              <div key={m.title} className="flex flex-col gap-1.5">
                                <h4 className="text-base font-medium">{m.title}</h4>
                                <p className="text-[15px] leading-relaxed font-light text-[#5F5F5F] dark:text-[#8F8F8F]">
                                  {m.desc}
                                </p>
                                {m.tech && <span className="font-mono text-xs">{m.tech}</span>}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
