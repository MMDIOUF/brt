import { RefreshCw, Wifi, WifiOff, Clock, CheckCircle2 } from "lucide-react";
import { useFreshness, formatRelative } from "@/lib/data-freshness";
import { useEffect, useState } from "react";

const STYLE = {
  live:     { dot: "var(--success)",  label: "Live",      icon: Wifi,          textClass: "text-success"  },
  updated:  { dot: "var(--brand-2)",  label: "Mis à jour", icon: CheckCircle2, textClass: "text-brand-2" },
  stale:    { dot: "var(--warning)",  label: "Obsolète",   icon: Clock,        textClass: "text-warning"  },
  fallback: { dot: "var(--critical)", label: "Fallback",   icon: WifiOff,      textClass: "text-critical" },
} as const;

export function FreshnessBadge({ compact = false }: { compact?: boolean }) {
  const { lastUpdate, status, source, refreshing, excelGeneratedAt, refresh } = useFreshness();
  const s    = STYLE[status];
  const Icon = s.icon;

  // Tick every 10s to update relative time
  const [, tick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => tick((n) => n + 1), 10_000);
    return () => clearInterval(i);
  }, []);

  return (
    <button
      onClick={() => void refresh()}
      title={`Source: ${source}\nDernière MAJ: ${lastUpdate.toLocaleString("fr-FR")}${excelGeneratedAt ? `\nDonnées Excel: ${excelGeneratedAt}` : ""}\nCliquer pour rafraîchir`}
      className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-2.5 py-1 text-[11px] font-medium transition-all hover:bg-accent hover:border-brand/30"
    >
      {/* Pulsating status dot */}
      <span className="relative inline-flex h-2 w-2 shrink-0">
        <span
          className="absolute inset-0 rounded-full live-dot"
          style={{ backgroundColor: s.dot }}
        />
        <span
          className="relative h-2 w-2 rounded-full"
          style={{ backgroundColor: s.dot }}
        />
      </span>

      <Icon className={`h-3 w-3 shrink-0 ${s.textClass}`} />

      <span className={`font-semibold ${s.textClass}`}>{s.label}</span>

      {!compact && (
        <>
          <span className="text-muted-foreground/60">·</span>
          <span className="text-muted-foreground">MAJ {formatRelative(lastUpdate)}</span>
        </>
      )}

      <RefreshCw
        className={`h-3 w-3 text-muted-foreground transition-all group-hover:text-foreground ${refreshing ? "animate-spin" : "group-hover:rotate-180"}`}
        style={{ transitionDuration: refreshing ? undefined : "300ms" }}
      />
    </button>
  );
}

export function FreshnessNote() {
  const { lastUpdate, status, source, excelGeneratedAt } = useFreshness();
  const s = STYLE[status];

  const [, tick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => tick((n) => n + 1), 10_000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
        <span className={`font-semibold ${s.textClass}`}>{s.label}</span>
      </span>
      <span className="text-muted-foreground/50">·</span>
      <span>Données {formatRelative(lastUpdate)}</span>
      <span className="text-muted-foreground/50">·</span>
      <span className="text-muted-foreground/80">{source}</span>
      {excelGeneratedAt && (
        <>
          <span className="text-muted-foreground/50">·</span>
          <span className="text-muted-foreground/60">Excel généré le {excelGeneratedAt}</span>
        </>
      )}
    </div>
  );
}
