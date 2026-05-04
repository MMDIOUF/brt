export type LegendItem = { color: string; label: string; dashed?: boolean; dotOnly?: boolean };

export function Section({
  title, description, children, className = "", action, legend, tip,
}: {
  title: string; description?: string; children: React.ReactNode;
  className?: string; action?: React.ReactNode;
  legend?: LegendItem[];
  tip?: string;
}) {
  return (
    <div className={`card-elevated relative overflow-hidden rounded-xl p-4 ${className}`}>
      {/* Top accent bar */}
      <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-brand/40 via-brand/20 to-transparent" />

      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3
            className="text-sm font-semibold tracking-tight text-foreground"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {title}
          </h3>

          {description && (
            <p className="mt-0.5 text-[11px] text-muted-foreground leading-snug">{description}</p>
          )}

          {/* Légende de lecture du graphique */}
          {legend && legend.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
              {legend.map((item) => (
                <span key={item.label} className="flex items-center gap-1.5 text-[10px] text-muted-foreground/75">
                  {item.dotOnly ? (
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  ) : (
                    <span
                      className="inline-block h-[3px] w-5 rounded-full shrink-0"
                      style={item.dashed
                        ? { background: `repeating-linear-gradient(90deg,${item.color} 0,${item.color} 4px,transparent 4px,transparent 7px)` }
                        : { backgroundColor: item.color }
                      }
                    />
                  )}
                  {item.label}
                </span>
              ))}
            </div>
          )}

          {/* Conseil de lecture rapide */}
          {tip && (
            <p className="mt-1.5 flex items-start gap-1 text-[10px] text-brand/70 leading-snug">
              <span className="shrink-0 font-bold">→</span>
              <span>{tip}</span>
            </p>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
