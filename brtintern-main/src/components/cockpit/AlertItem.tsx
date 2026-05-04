import { Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Info, ShieldAlert } from "lucide-react";

type Severity = "critical" | "warning" | "info";
const cfg: Record<Severity, { bar: string; Icon: typeof Info; label: string; tone: string; bg: string }> = {
  critical: { bar: "bg-critical", Icon: ShieldAlert, label: "Critique", tone: "text-critical", bg: "bg-critical/8" },
  warning:  { bar: "bg-warning",  Icon: AlertTriangle, label: "Surveillance", tone: "text-warning", bg: "bg-warning/8" },
  info:     { bar: "bg-brand",    Icon: Info,        label: "Info",       tone: "text-brand",    bg: "bg-brand/8" },
};

export function AlertItem({
  severity, title, impact, action, page,
}: { severity: Severity; title: string; impact: string; action: string; page: string }) {
  const c = cfg[severity];
  return (
    <Link
      to={page}
      className={`group relative flex items-start gap-3 overflow-hidden rounded-lg border border-border ${c.bg} p-3 transition-all hover:border-foreground/20 hover:bg-accent/40`}
    >
      <span className={`absolute left-0 top-0 h-full w-[3px] ${c.bar}`} />
      <c.Icon className={`mt-0.5 h-4 w-4 ${c.tone}`} />
      <div className="flex-1 space-y-0.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider ${c.bg} ${c.tone}`}>
            {c.label}
          </span>
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        <p className="text-xs text-muted-foreground">{impact}</p>
        <p className="text-xs font-medium text-foreground/90">→ {action}</p>
      </div>
      <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
    </Link>
  );
}
