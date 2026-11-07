import { User } from "lucide-react";
import { profile } from "@/lib/data";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function Profile() {
  return (
    <section id="profil" className="mb-16 scroll-mt-6">
      <SectionTitle icon={User}>Profil</SectionTitle>
      <div className="overflow-x-auto border border-line rounded-xl">
        <table className="w-full border-collapse text-[14.5px] min-w-[520px]">
          <thead>
            <tr className="bg-subtle text-left">
              <th className="w-[34%] px-4 py-2.5 text-[12.5px] font-semibold uppercase tracking-[0.05em] text-muted border-b border-line">
                Champ
              </th>
              <th className="px-4 py-2.5 text-[12.5px] font-semibold uppercase tracking-[0.05em] text-muted border-b border-line">
                Valeur
              </th>
            </tr>
          </thead>
          <tbody>
            {profile.map(({ icon: Icon, key, value }) => (
              <tr key={key} className="hover:bg-subtle transition-colors [&:last-child>td]:border-b-0">
                <td className="px-4 py-3 border-b border-line align-top">
                  <span className="inline-flex items-center gap-2.5">
                    <Icon className="w-[15px] h-[15px] text-muted" />
                    <code className="font-mono text-[13px] px-[7px] py-0.5 rounded-[5px] bg-code">{key}</code>
                  </span>
                </td>
                <td className="px-4 py-3 border-b border-line">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
