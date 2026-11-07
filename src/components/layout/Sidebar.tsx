"use client";

import { BookOpen, Briefcase, Layers, Mail, User, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { experiences } from "@/lib/data";

type Item = { id: string; label: string; icon: LucideIcon };

const groups: { title: string; items: Item[] }[] = [
  {
    title: "Démarrer",
    items: [
      { id: "intro", label: "Introduction", icon: BookOpen },
      { id: "profil", label: "Profil", icon: User },
    ],
  },
  { title: "Expérience", items: experiences.map((e) => ({ id: e.id, label: e.nav, icon: Briefcase })) },
  {
    title: "Référence",
    items: [
      { id: "stack", label: "Stack", icon: Layers },
      { id: "contact", label: "Contact", icon: Mail },
    ],
  },
];

const ids = groups.flatMap((g) => g.items.map((i) => i.id));

/** Section visible la plus haute, pour surligner l'entrée de menu correspondante. */
function useActiveSection() {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const visible = new Map<string, boolean>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        const first = ids.find((id) => visible.get(id));
        if (first) setActive(first);
      },
      { rootMargin: "-80px 0px -55% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);
  return active;
}

export default function Sidebar() {
  const active = useActiveSection();

  return (
    <aside className="hidden lg:block flex-[1_1_220px] max-w-[250px] py-8 text-sm">
      <nav aria-label="Sommaire" className="sticky top-6 flex flex-col gap-6">
        {groups.map((g) => (
          <div key={g.title} className="flex flex-col gap-0.5">
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.07em] text-muted mb-1.5 ml-2.5">
              {g.title}
            </span>
            {g.items.map(({ id, label, icon: Icon }) => {
              const isActive = id === active;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`flex items-center gap-2.5 px-2.5 py-[7px] rounded-[7px] transition-colors hover:bg-active hover:text-fg ${
                    isActive ? "bg-active text-fg font-medium shadow-[inset_2px_0_0_var(--accent)]" : "text-muted"
                  }`}
                >
                  <Icon className="w-[15px] h-[15px] shrink-0" />
                  {label}
                </a>
              );
            })}
          </div>
        ))}

        <div className="p-3.5 border border-line rounded-[10px] bg-subtle">
          <div className="flex items-center gap-2 font-semibold text-[13px] mb-1">
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inset-0 rounded-full bg-emerald-500 opacity-70" />
              <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
            </span>
            Disponible
          </div>
          <p className="text-[12.5px] text-muted leading-normal">Ouvert aux échanges IA, data et web. Réponse sous 48 h.</p>
        </div>
      </nav>
    </aside>
  );
}
