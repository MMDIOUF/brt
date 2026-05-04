import { Database, Cpu, Zap, RefreshCw, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { usePipeline, pipelineRelative } from "@/lib/use-pipeline";
import { useEffect, useState } from "react";

/* ── Particule animée entre deux étapes ──────────────────────────────── */
function FlowDots({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-1 px-2">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-1 w-1 rounded-full transition-all duration-500 ${
            active
              ? "bg-brand"
              : "bg-border"
          }`}
          style={active ? {
            animation: `pipeline-dot 1.2s ease-in-out ${i * 0.25}s infinite`,
          } : undefined}
        />
      ))}
    </div>
  );
}

/* ── Étape de pipeline ────────────────────────────────────────────────── */
function Stage({
  icon: Icon,
  title,
  subtitle,
  detail,
  color,
  active,
  pulse,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  detail?: string;
  color: string;
  active: boolean;
  pulse?: boolean;
}) {
  return (
    <div
      className={`relative flex min-w-0 flex-col items-center gap-1.5 rounded-xl border px-4 py-3 text-center transition-all duration-500 ${
        pulse
          ? "border-brand/40 bg-brand/5 shadow-[0_0_16px_-4px_color-mix(in_srgb,var(--brand)_40%,transparent)]"
          : active
          ? "border-border/60 bg-card"
          : "border-border/30 bg-card/50"
      }`}
    >
      {/* Pulse ring on update */}
      {pulse && (
        <span className="absolute inset-0 rounded-xl animate-ping border border-brand/20 opacity-60" />
      )}

      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
          pulse ? "bg-brand/15" : active ? "bg-card" : "bg-muted/50"
        }`}
        style={{ boxShadow: active ? `inset 0 0 0 1.5px ${color}30` : undefined }}
      >
        <Icon
          className="h-4 w-4 transition-colors"
          style={{ color: active ? color : "var(--muted-foreground)" }}
        />
      </div>

      <div>
        <p
          className={`text-xs font-semibold transition-colors ${active ? "text-foreground" : "text-muted-foreground/60"}`}
        >
          {title}
        </p>
        <p className="text-[10px] text-muted-foreground/60 mt-0.5">{subtitle}</p>
        {detail && (
          <p
            className={`mt-1 text-[10px] font-semibold transition-colors ${
              pulse ? "text-brand" : active ? "text-muted-foreground" : "text-muted-foreground/40"
            }`}
          >
            {detail}
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Card principale ─────────────────────────────────────────────────── */
export function DataPipelineCard() {
  const { meta, justUpdated, error, loading } = usePipeline();
  const [tick, setTick] = useState(0);

  /* Tick toutes les 30s pour mettre à jour les temps relatifs */
  useEffect(() => {
    const i = setInterval(() => setTick((n) => n + 1), 30_000);
    return () => clearInterval(i);
  }, []);

  const lastRunLabel = meta?.generated_at
    ? pipelineRelative(meta.generated_at)
    : "—";

  const isHealthy = !error && !!meta;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-500 ${
        justUpdated
          ? "border-brand/30 bg-gradient-to-br from-brand/5 via-card to-card"
          : "border-border/60 bg-card/70"
      }`}
    >
      {/* Top tri-color accent */}
      <div className="absolute inset-x-0 top-0 flex h-[2px]">
        <div className="flex-1 bg-[#1D9E75]" />
        <div className="flex-1 bg-[#E2682A]" />
        <div className="flex-1 bg-[#1A6FA4]" />
      </div>

      {/* Header */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Pipeline de données · temps réel
            </h3>
            {justUpdated && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-bold text-brand">
                <CheckCircle2 className="h-2.5 w-2.5" />
                Mis à jour !
              </span>
            )}
          </div>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {loading
              ? "Chargement du statut…"
              : error
              ? "Impossible de lire le statut — vérifier que watch_data.py tourne"
              : `Dernière synchronisation : ${lastRunLabel} · ${(meta?.rows ?? 0).toLocaleString("fr-FR")} lignes · ${meta?.n_days ?? 0} jours`
            }
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {error ? (
            <span className="flex items-center gap-1 rounded-full bg-critical/10 px-2.5 py-1 text-[10px] font-semibold text-critical">
              <AlertTriangle className="h-3 w-3" />Offline
            </span>
          ) : (
            <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
              justUpdated ? "bg-brand/15 text-brand" : "bg-success/10 text-success"
            }`}>
              <span className={`relative flex h-1.5 w-1.5 shrink-0`}>
                <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-60" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              {justUpdated ? "Synchronisation…" : "Auto"}
            </span>
          )}
        </div>
      </div>

      {/* ── Pipeline visuel ── */}
      <div className="flex items-center gap-1">
        {/* Étape 1 : Excel */}
        <Stage
          icon={Database}
          title="Excel"
          subtitle="brt data.xlsx"
          detail={meta ? `${(meta.rows).toLocaleString("fr-FR")} lignes · ${meta.n_days}j` : "—"}
          color="#1D9E75"
          active={isHealthy}
          pulse={justUpdated}
        />

        {/* Flèche 1 */}
        <FlowDots active={isHealthy && !error} />

        {/* Étape 2 : Bridge Python */}
        <Stage
          icon={Cpu}
          title="Bridge Python"
          subtitle="generate_real_data.py · v3.0"
          detail={meta ? lastRunLabel : "—"}
          color="#E2682A"
          active={isHealthy}
          pulse={justUpdated}
        />

        {/* Flèche 2 */}
        <FlowDots active={isHealthy && !error} />

        {/* Étape 3 : Dashboard */}
        <Stage
          icon={Zap}
          title="Dashboard"
          subtitle="React · Vite HMR · live"
          detail={meta ? `Score ${meta.network_score} · OTP ${meta.otp_pct.toFixed(0)}%` : "—"}
          color="#1A6FA4"
          active={isHealthy}
          pulse={justUpdated}
        />
      </div>

      {/* ── Métriques pipeline rapides ── */}
      {meta && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/40 pt-2.5">
          {[
            { label: "Lignes Excel",     value: meta.rows.toLocaleString("fr-FR")          },
            { label: "Jours d'historique", value: `${meta.n_days} j`                       },
            { label: "Score réseau",     value: `${meta.network_score}/100`                },
            { label: "OTP",              value: `${meta.otp_pct.toFixed(1)}%`              },
            { label: "Pax / jour",       value: meta.daily_pax.toLocaleString("fr-FR")     },
            { label: "Pain Index",       value: meta.pain_index.toFixed(1)                 },
          ].map(({ label, value }) => (
            <span key={label} className="flex flex-col items-start">
              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/45">{label}</span>
              <span className="text-[11px] font-bold tabular-nums text-foreground/80">{value}</span>
            </span>
          ))}
          <span className="ml-auto text-[9px] text-muted-foreground/35">
            Modifie brt data.xlsx → mise à jour automatique en 3–5s
          </span>
        </div>
      )}
    </div>
  );
}
