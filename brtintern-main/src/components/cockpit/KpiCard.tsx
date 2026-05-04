import { ArrowDownRight, ArrowUpRight, ChevronRight } from "lucide-react";
import * as Icons from "lucide-react";

type Status = "success" | "warning" | "critical";

const tone: Record<Status, {
  border: string; iconBg: string; iconText: string; deltaBg: string; deltaText: string; glow: string;
  barColor: string;
}> = {
  success: {
    border:    "border-success/20",
    iconBg:    "bg-success/10",
    iconText:  "text-success",
    deltaBg:   "bg-success/10",
    deltaText: "text-success",
    glow:      "hover:shadow-[0_4px_20px_-4px_color-mix(in_srgb,var(--success)_25%,transparent)]",
    barColor:  "var(--success)",
  },
  warning: {
    border:    "border-warning/20",
    iconBg:    "bg-warning/10",
    iconText:  "text-warning",
    deltaBg:   "bg-warning/10",
    deltaText: "text-warning",
    glow:      "hover:shadow-[0_4px_20px_-4px_color-mix(in_srgb,var(--warning)_25%,transparent)]",
    barColor:  "var(--warning)",
  },
  critical: {
    border:    "border-critical/25",
    iconBg:    "bg-critical/10",
    iconText:  "text-critical",
    deltaBg:   "bg-critical/10",
    deltaText: "text-critical",
    glow:      "hover:shadow-[0_4px_20px_-4px_color-mix(in_srgb,var(--critical)_25%,transparent)]",
    barColor:  "var(--critical)",
  },
};

const statusLabel: Record<Status, { text: string; emoji: string }> = {
  success:  { text: "Objectif atteint",   emoji: "✓" },
  warning:  { text: "À surveiller",       emoji: "!" },
  critical: { text: "Action requise",     emoji: "⚠" },
};

const statusDot: Record<Status, string> = {
  success:  "bg-success",
  warning:  "bg-warning",
  critical: "bg-critical animate-pulse",
};

export function KpiCard({
  label, value, delta, trend, status, icon, onClick, description, target,
}: {
  label: string; value: string; delta: string; trend: "up" | "down";
  status: Status; icon: string; onClick?: () => void;
  description?: string; target?: string;
}) {
  const Icon      = (Icons as any)[icon] ?? Icons.Activity;
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;
  const t         = tone[status];
  const sl        = statusLabel[status];

  return (
    <button
      onClick={onClick}
      className={`card-elevated group relative w-full overflow-hidden rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 ${t.border} ${t.glow} ${onClick ? "cursor-pointer" : "cursor-default"}`}
    >
      {/* Top accent line */}
      <span
        className="absolute inset-x-0 top-0 h-[2.5px] rounded-t-xl"
        style={{ background: t.barColor, opacity: 0.8 }}
      />

      {/* Hover sheen */}
      <span className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${statusDot[status]}`} />
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground truncate">
            {label}
          </p>
        </div>
        <div className={`rounded-lg p-1.5 ${t.iconBg} ${t.iconText} shrink-0`}>
          <Icon className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* Value */}
      <p className="metric-value mt-2 text-[28px] leading-none text-foreground">
        {value}
      </p>

      {/* Status reading — always visible, tells what it means */}
      <div className="mt-1.5 flex items-center gap-1">
        <span className={`text-[10px] font-bold ${t.deltaText}`}>{sl.emoji} {sl.text}</span>
        {target && (
          <span className="text-[10px] font-normal text-muted-foreground/55">· cible {target}</span>
        )}
      </div>

      {description && (
        <p className="mt-1 text-[10px] text-muted-foreground/65 leading-snug">{description}</p>
      )}

      {/* Footer row: delta + CTA */}
      <div className="mt-2.5 flex items-center justify-between gap-2">
        <div className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.deltaBg} ${t.deltaText}`}>
          <TrendIcon className="h-3 w-3 shrink-0" />
          <span className="truncate max-w-[130px]">{delta}</span>
        </div>

        {/* CTA — toujours légèrement visible, bien visible au hover */}
        {onClick && (
          <span className="flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[9px] font-semibold text-muted-foreground/50 transition-all group-hover:bg-brand/8 group-hover:text-brand group-hover:opacity-100 opacity-50">
            Voir le détail
            <ChevronRight className="h-2.5 w-2.5" />
          </span>
        )}
      </div>
    </button>
  );
}
