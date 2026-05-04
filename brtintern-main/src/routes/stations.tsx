import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/cockpit/PageShell";
import { Section } from "@/components/cockpit/Section";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFilteredData } from "@/lib/use-filtered-data";
import { lines, LINE_COLORS, type LineId } from "@/lib/data";
import { Search, MapPin, Users, Gauge, Bus, Heart } from "lucide-react";

export const Route = createFileRoute("/stations")({ component: Stations });

function Stations() {
  const { stationDirectory } = useFilteredData();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | LineId>("all");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return stationDirectory.filter((s) => {
      if (filter !== "all" && !s.lines.includes(filter)) return false;
      if (needle && !s.name.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [stationDirectory, q, filter]);

  const zoneCounts = useMemo(() => ({
    Nord:   stationDirectory.filter((s) => s.zone === "Nord").length,
    Centre: stationDirectory.filter((s) => s.zone === "Centre").length,
    Sud:    stationDirectory.filter((s) => s.zone === "Sud").length,
  }), [stationDirectory]);

  const hubCount = stationDirectory.filter((s) => s.hub).length;
  const criticalCount = stationDirectory.filter((s) => s.status === "critical").length;

  return (
    <PageShell
      eyebrow={`Réseau · ${stationDirectory.length} stations officielles`}
      title="Stations SunuBRT"
      subtitle="Liste officielle Guédiawaye ↔ Petersen — KPI station · charge · passagers."
    >
      {/* Stats bar */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { label: "Nord", value: zoneCounts.Nord, color: "var(--chart-3)" },
          { label: "Centre", value: zoneCounts.Centre, color: "var(--chart-1)" },
          { label: "Sud", value: zoneCounts.Sud, color: "var(--chart-2)" },
          { label: "Pôles d'échange", value: hubCount, color: "var(--brand-accent)" },
        ].map(({ label, value, color }) => (
          <div key={label} className="card-elevated flex items-center gap-3 rounded-lg p-3">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
            <div>
              <p className="text-xs font-semibold text-foreground">{value}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher une station…"
            className="h-9 pl-8"
          />
        </div>
        <div className="flex items-center gap-1 rounded-md border border-border bg-card p-1">
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")} label="Toutes" />
          {lines.map((l) => (
            <FilterChip
              key={l}
              active={filter === l}
              onClick={() => setFilter(l)}
              label={l}
              color={LINE_COLORS[l]}
            />
          ))}
        </div>
        <span className="ml-auto text-[11px] text-muted-foreground">
          {filtered.length} / {stationDirectory.length} stations
          {criticalCount > 0 && (
            <span className="ml-2 text-critical">· {criticalCount} critiques</span>
          )}
        </span>
      </div>

      <Section
        title="Annuaire des stations"
        description="23 stations officielles · Guédiawaye ↔ Papa Gueye Fall (Petersen)"
      >
        <div className="grid gap-2 stagger-children sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <article
              key={s.id}
              className="card-elevated rounded-lg p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>#{String(s.id).padStart(2, "0")} · {s.zone}</span>
                    {s.hub && (
                      <Badge className="bg-brand-accent/10 text-brand-accent border-brand-accent/20 text-[9px] uppercase" variant="outline">
                        Pôle
                      </Badge>
                    )}
                  </div>
                  <h3 className="mt-0.5 truncate text-sm font-semibold text-foreground">{s.name}</h3>
                </div>
                <StatusDot status={s.status} />
              </div>

              <div className="mt-2 flex items-center gap-1">
                {s.lines.map((l) => (
                  <span
                    key={l}
                    className="inline-flex h-5 w-7 items-center justify-center rounded text-[10px] font-bold text-white"
                    style={{ backgroundColor: LINE_COLORS[l] }}
                  >{l}</span>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                <Metric icon={Users} label="Pax/jour" value={s.passengers.toLocaleString("fr-FR")} />
                <Metric icon={Gauge} label="Charge" value={`${s.load}%`} status={s.status} />
                <Metric
                  icon={Heart}
                  label="Pain"
                  value={`${s.pain.toFixed(0)}`}
                  status={s.pain > 50 ? "critical" : s.pain > 30 ? "warning" : "success"}
                />
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full flex flex-col items-center gap-3 py-16 text-center">
              <Bus className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">Aucune station ne correspond à votre recherche.</p>
            </div>
          )}
        </div>
      </Section>
    </PageShell>
  );
}

function FilterChip({
  active, onClick, label, color,
}: { active: boolean; onClick: () => void; label: string; color?: string }) {
  return (
    <Button
      type="button"
      variant={active ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      className="h-7 px-2.5 text-[11px]"
      style={active && color ? { backgroundColor: color, borderColor: color, color: "white" } : undefined}
    >
      {color && !active && (
        <span className="mr-1.5 h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      )}
      {label}
    </Button>
  );
}

function StatusDot({ status }: { status: "success" | "warning" | "critical" }) {
  const c = status === "critical" ? "var(--critical)" : status === "warning" ? "var(--warning)" : "var(--success)";
  return <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: c }} />;
}

function Metric({
  icon: Icon, label, value, status,
}: { icon: any; label: string; value: string; status?: "success" | "warning" | "critical" }) {
  const tone = status === "critical" ? "text-critical" : status === "warning" ? "text-warning" : "text-foreground";
  return (
    <div className="rounded border border-border bg-background/50 px-2 py-1.5">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3 w-3" />
        <span>{label}</span>
      </div>
      <div className={`mt-0.5 text-sm font-semibold tabular-nums ${tone}`}>{value}</div>
    </div>
  );
}
