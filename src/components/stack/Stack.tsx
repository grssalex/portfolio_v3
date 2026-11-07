import { Layers } from "lucide-react";
import { stack } from "@/lib/data";
import { IconTile, SectionTitle } from "@/components/ui/SectionTitle";
import { TechIcon } from "@/components/ui/TechIcon";

export default function Stack() {
  return (
    <section id="stack" className="mb-16 scroll-mt-6">
      <SectionTitle icon={Layers}>Stack</SectionTitle>
      <p className="text-muted -mt-2 mb-[18px]">Outils utilisés en production, par domaine.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {stack.map((s) => (
          <div key={s.category} className="lift border border-line rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <IconTile icon={s.icon} size="sm" />
              <h3 className="font-semibold text-sm">{s.category}</h3>
              <span className="ml-auto font-mono text-[11px] text-muted">{s.items.length}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {s.items.map((i) => (
                <span
                  key={i.name}
                  className="inline-flex items-center gap-1.5 text-[13px] px-[9px] py-1 border border-line rounded-[7px] bg-subtle"
                >
                  <TechIcon name={i.icon} className="w-[13px] h-[13px]" />
                  {i.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
