import { Building2, Calendar } from "lucide-react";
import { experiences } from "@/lib/data";
import { CarrefourLogo } from "@/components/ui/Logos";
import { IconTile } from "@/components/ui/SectionTitle";
import { TechIcon } from "@/components/ui/TechIcon";

export default function Experience() {
  return (
    <>
      {experiences.map((e) => (
        <section key={e.id} id={e.id} className="mb-16 scroll-mt-6">
          <div className="flex flex-wrap items-center gap-3.5 pb-3.5 border-b border-line mb-4">
            {e.logo === "carrefour" ? (
              <span className="w-11 h-11 shrink-0 rounded-[10px] bg-white border border-line inline-flex items-center justify-center">
                <CarrefourLogo className="w-7 h-[18px]" />
              </span>
            ) : (
              <span className="w-11 h-11 shrink-0 rounded-[10px] bg-fg text-bg inline-flex items-center justify-center font-bold text-[13px]">
                AG
              </span>
            )}
            <div className="flex-[1_1_280px] min-w-0">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] leading-tight">{e.role}</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13.5px] text-muted mt-1">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="w-[13px] h-[13px]" /> {e.org}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[12.5px]">
                  <Calendar className="w-[13px] h-[13px]" /> {e.date}
                </span>
              </div>
            </div>
            {e.current && (
              <span className="inline-flex items-center gap-[7px] text-xs font-medium px-[11px] py-1 rounded-full bg-callout text-accent border border-callout-line">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Poste actuel
              </span>
            )}
          </div>

          <p className="max-w-[720px] mb-[22px]">{e.desc}</p>

          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-[15px] font-semibold">Missions</h3>
            <span className="font-mono text-[11.5px] px-[7px] rounded-full bg-code text-muted">{e.missions.length}</span>
          </div>

          <div className="border border-line rounded-xl overflow-hidden">
            {e.missions.map((m) => (
              <div
                key={m.title}
                className="flex flex-wrap gap-x-5 gap-y-3 p-[18px] border-b border-line last:border-b-0 hover:bg-subtle transition-colors"
              >
                <IconTile icon={m.icon} />
                <div className="flex-[1_1_340px] min-w-0">
                  <h4 className="font-semibold text-[15px] mb-0.5">{m.title}</h4>
                  <p className="text-sm text-muted mb-2.5">{m.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {m.tags.map((t) => (
                      <span
                        key={t.name}
                        className="inline-flex items-center gap-[5px] font-mono text-[11.5px] px-2 py-0.5 rounded-md bg-code border border-line"
                      >
                        <TechIcon name={t.icon} className="w-[11px] h-[11px]" />
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
