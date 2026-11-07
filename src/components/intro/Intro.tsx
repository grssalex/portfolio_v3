import { ArrowUpRight, BookOpen, Briefcase, Info, Layers, Mail } from "lucide-react";
import { experiences, stats } from "@/lib/data";
import { IconTile } from "@/components/ui/SectionTitle";
import Typewriter from "./Typewriter";
import Terminal from "./Terminal";

const quick = [
  { href: `#${experiences[0].id}`, icon: Briefcase, title: "Expérience", desc: "Carrefour, Digital Factory et AGWS, mission par mission." },
  { href: "#stack", icon: Layers, title: "Stack", desc: "IA générative, data, web et cloud en production." },
  { href: "#contact", icon: Mail, title: "Contact", desc: "Un projet, une opportunité, un échange tech." },
];

export default function Intro() {
  return (
    <section id="intro" className="scroll-mt-6">
      <div className="flex items-center gap-1.5 text-[13px] text-muted mb-4">
        <BookOpen className="w-3.5 h-3.5" /> Démarrer <span className="mx-0.5">›</span>
        <span className="text-fg">Introduction</span>
      </div>

      <Typewriter />

      <p className="text-lg text-muted max-w-[660px] mb-7">
        Je conçois des plateformes data et des agents IA pour les achats de Carrefour, et des applications web
        sur-mesure pour des PME avec mon agence AGWS.
      </p>

      <div className="flex gap-3 px-4 py-3.5 border border-callout-line border-l-[3px] border-l-accent rounded-[10px] bg-callout mb-7">
        <Info className="w-[18px] h-[18px] shrink-0 mt-[3px] text-accent" />
        <p className="text-[14.5px]">
          <strong className="font-semibold">Actuellement</strong> — Ingénieur en Intelligence Artificielle à la Direction
          des Achats Non Marchands de Carrefour.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {quick.map((q) => (
          <a key={q.title} href={q.href} className="lift relative flex flex-col gap-3 p-[18px] border border-line rounded-xl">
            <IconTile icon={q.icon} />
            <span className="flex flex-col gap-0.5">
              <span className="font-semibold">{q.title}</span>
              <span className="text-[13.5px] text-muted leading-normal">{q.desc}</span>
            </span>
            <ArrowUpRight className="absolute top-[18px] right-[18px] w-[15px] h-[15px] text-muted" />
          </a>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 border border-line rounded-xl overflow-hidden mb-14 bg-subtle">
        {stats.map((s, i) => (
          <div key={s.label} className={`px-[18px] py-4 ${i > 0 ? "sm:border-l" : ""} ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} border-line`}>
            <div className="text-[26px] font-bold tracking-[-0.03em] leading-tight">{s.value}</div>
            <div className="text-[12.5px] text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <Terminal />
    </section>
  );
}
