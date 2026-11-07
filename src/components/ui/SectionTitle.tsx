import type { LucideIcon } from "lucide-react";

export function IconTile({ icon: Icon, size = "md" }: { icon: LucideIcon; size?: "sm" | "md" }) {
  const box = size === "sm" ? "w-[30px] h-[30px] rounded-lg" : "w-9 h-9 rounded-[9px]";
  const ic = size === "sm" ? "w-[15px] h-[15px]" : "w-[17px] h-[17px]";
  return (
    <span className={`${box} shrink-0 bg-tile text-accent inline-flex items-center justify-center`}>
      <Icon className={ic} />
    </span>
  );
}

export function SectionTitle({ icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 pb-3 border-b border-line mb-[18px]">
      <IconTile icon={icon} />
      <h2 className="text-2xl font-semibold tracking-[-0.02em]">{children}</h2>
    </div>
  );
}
