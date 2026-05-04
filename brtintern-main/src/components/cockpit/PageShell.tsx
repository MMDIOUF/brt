import { FreshnessNote } from "./FreshnessBadge";

export function PageShell({
  title, subtitle, children, eyebrow,
}: {
  title: string; subtitle?: string; eyebrow?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-6 p-4 md:p-6 animate-[fade-in_0.4s_ease-out]">
      <div className="flex flex-col gap-1.5">
        {/* Tri-color brand bar + contextual eyebrow */}
        <div className="flex items-center gap-2">
          <div className="flex h-[3px] w-7 shrink-0 overflow-hidden rounded-full">
            <div className="flex-1" style={{ backgroundColor: "#1D9E75" }} />
            <div className="flex-1" style={{ backgroundColor: "#E2682A" }} />
            <div className="flex-1" style={{ backgroundColor: "#1A6FA4" }} />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
            {eyebrow ?? "Sunu Dashboard"}
          </span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        <FreshnessNote />
      </div>
      {children}
    </div>
  );
}
