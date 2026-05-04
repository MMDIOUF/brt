import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/cockpit/PageShell";
import { KpiCard } from "@/components/cockpit/KpiCard";
import { Section } from "@/components/cockpit/Section";
import { AlertItem } from "@/components/cockpit/AlertItem";
import { Heatmap } from "@/components/cockpit/Heatmap";
import { LineDetailSheet } from "@/components/cockpit/LineDetailSheet";
import { lineMeta, networkInfo, LINE_HEX } from "@/lib/data";
import { useFilteredData } from "@/lib/use-filtered-data";
import { useLiveData, type LiveNewsItem } from "@/lib/use-live-data";
import { Phone, Mail, Clock, Zap, MapPin, ArrowRight, Tag, ChevronRight } from "lucide-react";
import { DataPipelineCard } from "@/components/cockpit/DataPipelineCard";
import brt1 from "@/assets/sunubrt/brt1.svg";
import brt2 from "@/assets/sunubrt/brt2.svg";
import brt3 from "@/assets/sunubrt/brt3.svg";
import rabattementA from "@/assets/sunubrt/rabattement-a.jpg";
import rabattementB from "@/assets/sunubrt/rabattement-b.jpg";
import prolongement from "@/assets/sunubrt/prolongement.jpg";
import abonnementJeune from "@/assets/sunubrt/abonnement-jeune.png";
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ReferenceLine,
} from "recharts";

export const Route = createFileRoute("/")({ component: Executive });

const tooltipStyle = {
  backgroundColor: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  fontSize: 11,
  padding: "6px 10px",
  boxShadow: "0 10px 30px -10px rgba(0,0,0,.4)",
};

type LineId = "B1" | "B2" | "B3";

function Executive() {
  const navigate = useNavigate();
  const [selectedLine, setSelectedLine] = useState<LineId | null>(null);

  const { kpis, trend30d, alerts, linePerformance, summary, activeFilters } = useFilteredData();
  const { data: liveData, loading: liveLoading } = useLiveData();

  const drillTargets: Record<string, string> = {
    otp: "/operations", regularity: "/operations", pain: "/analytics",
    ridership: "/ridership", peak_load: "/ridership",
    rev_per_km: "/finance", carbon: "/fleet", fleet: "/fleet",
  };

  const filterLabel = [
    activeFilters.ligne  !== "all" && activeFilters.ligne,
    activeFilters.zone   !== "all" && activeFilters.zone,
    activeFilters.pointe !== "all" && (activeFilters.pointe === "peak" ? "Pointe" : "Hors pointe"),
  ].filter(Boolean).join(" · ");

  const bottomKpis = [
    { label: "Passagers / jour",  value: summary.daily_pax.toLocaleString("fr-FR"),          unit: `sur ${summary.n_days} jours · cap. 300 000/j`,                              color: "var(--brand)",       href: "/ridership" },
    { label: "CO₂ évité",         value: `${Math.round(summary.co2_saved_kg_day).toLocaleString("fr-FR")} kg`, unit: `${summary.co2_saved_t_year.toFixed(0)} t/an vs flotte diesel`, color: "var(--success)",     href: "/fleet"     },
    { label: "Recettes / km",     value: `${summary.rev_per_km_kfcfa.toFixed(1)} k FCFA`,    unit: `Coût/km : ${summary.cost_per_km_kfcfa.toFixed(1)} k · ratio ${summary.op_ratio.toFixed(2)}x`, color: "var(--line-b2)", href: "/finance" },
    { label: "Flotte disponible", value: `${summary.fleet_active} / ${summary.fleet_total}`, unit: `${summary.fleet_pct.toFixed(1)}% · BYD K9 100% électrique`,                  color: "var(--brand-2)",     href: "/fleet"     },
  ];

  return (
    <PageShell
      eyebrow="Sunu Dashboard"
      title="SunuBRT Dakar — Vue stratégique"
      subtitle={`${networkInfo.corridor} · ${networkInfo.fleetType} · ${networkInfo.frequency} · ${networkInfo.hours} (${networkInfo.days})`}
    >
      {filterLabel && (
        <div className="flex">
          <span className="rounded-full border border-brand/20 bg-brand/8 px-2.5 py-0.5 text-[11px] font-medium text-brand">
            Filtré · {filterLabel}
          </span>
        </div>
      )}

      {/* ── Hero bannière réseau ──────────────────────────────────────────── */}
      <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
        <div className="card-elevated relative overflow-hidden rounded-xl p-5">
          <div className="absolute inset-x-0 top-0 flex h-1.5">
            <div className="flex-1 bg-line-b1" />
            <div className="flex-1 bg-line-b2" />
            <div className="flex-1 bg-line-b3" />
          </div>
          <div className="mb-4 flex items-center gap-2 pt-1">
            <span className="rounded-md bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brand">SunuBRT</span>
            <span className="text-[11px] text-muted-foreground">Bus Rapid Transit · Dakar · 18,3 km · 144 bus électriques</span>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {(["B1", "B2", "B3"] as const).map((id) => {
              const m    = lineMeta[id];
              const perf = linePerformance.find((p) => p.line === id);
              const busImg = id === "B1" ? brt1 : id === "B2" ? brt2 : brt3;
              const color  = LINE_HEX[id];
              return (
                <button
                  key={id}
                  onClick={() => setSelectedLine(id)}
                  className="group relative overflow-hidden rounded-lg border border-border bg-gradient-to-br from-background/80 to-background/40 p-3 backdrop-blur-sm text-left transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                >
                  {/* hover ring */}
                  <span
                    className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ boxShadow: `inset 0 0 0 2px ${color}` }}
                  />
                  <img src={busImg} alt={`Bus ${id}`}
                    className="pointer-events-none absolute -right-2 bottom-0 h-16 w-auto opacity-90 transition-transform group-hover:translate-x-1" />
                  <div className="flex items-center gap-2">
                    <span className="line-pill shrink-0 px-2" style={{ backgroundColor: color }}>{id}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground">{m.name}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {m.stations} stations · OTP{" "}
                        <span className="font-semibold" style={{ color }}>{perf?.otp ?? "—"}%</span>
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 line-clamp-2 max-w-[65%] text-[11px] leading-snug text-muted-foreground">{m.desc}</p>
                  <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold opacity-0 transition-opacity group-hover:opacity-100" style={{ color }}>
                    Voir détail <ChevronRight className="h-3 w-3" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Service client */}
        <div className="card-elevated rounded-xl p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Service client SunuBRT</p>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 shrink-0 text-brand" /><span className="font-semibold tabular-nums text-foreground">{networkInfo.hotline}</span><span className="text-muted-foreground">· 6h–22h</span></div>
            <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 shrink-0 text-brand" /><span className="text-foreground">{networkInfo.email}</span></div>
            <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 shrink-0 text-brand" /><span>{networkInfo.hours} · {networkInfo.days}</span></div>
            <div className="flex items-center gap-2"><Zap className="h-3.5 w-3.5 shrink-0 text-brand-2" /><span className="font-medium text-foreground">{networkInfo.fleetType}</span></div>
            <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 shrink-0 text-brand-accent" /><span>{networkInfo.corridor}</span></div>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {[{ label: "144 bus", color: "var(--brand)" }, { label: "23 stations", color: "var(--brand-2)" }, { label: "dès 400 F", color: "var(--brand-accent)" }].map(({ label, color }) => (
              <span key={label} className="rounded-full border px-2 py-0.5 text-[10px] font-semibold"
                style={{ color, borderColor: `${color}30`, backgroundColor: `${color}10` }}>{label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── KPI Cards ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 stagger-children md:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard
            key={k.id}
            label={k.label}
            value={k.value}
            delta={k.delta}
            trend={k.trend}
            status={k.status as "success" | "warning" | "critical"}
            icon={k.icon}
            description={k.description}
            target={k.target}
            onClick={() => navigate({ to: drillTargets[k.id] ?? "/" })}
          />
        ))}
      </div>

      {/* ── Pipeline data temps réel ──────────────────────────────────────── */}
      <DataPipelineCard />

      {/* ── Trend Charts ──────────────────────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Section
          title="Passagers par jour"
          description={`Nombre de voyageurs embarqués chaque jour · ${trend30d.length} jours`}
          legend={[{ color: "#1D9E75", label: "Passagers / jour (k = milliers)" }]}
          tip="Une courbe qui monte = le réseau gagne en popularité. Survole un point pour le détail."
        >
          <div className="h-52">
            <ResponsiveContainer>
              <AreaChart data={trend30d} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="gPax" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#1D9E75" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#1D9E75" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                  interval={Math.max(1, Math.floor(trend30d.length / 5))} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                <Tooltip contentStyle={tooltipStyle}
                  formatter={(v: number) => [v.toLocaleString("fr-FR") + " passagers", "Fréquentation"]}
                  labelFormatter={(l) => `Jour : ${l}`} />
                <Area type="monotone" dataKey="passengers" name="Passagers"
                  stroke="#1D9E75" fill="url(#gPax)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section
          title="Ponctualité & Confort passager"
          description="OTP = % de bus à l'heure (cible 88%). Pain Index = inconfort ressenti (bas = confortable)."
          legend={[
            { color: "#1A6FA4", label: "OTP % · ponctualité réseau" },
            { color: "#C8102E", label: "Pain Index · stress passager (0=excellent)", dashed: true },
          ]}
          tip="OTP au-dessus de 88% = service normal. Pain élevé = passagers stressés → action requise."
        >
          <div className="h-52">
            <ResponsiveContainer>
              <LineChart data={trend30d} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                  interval={Math.max(1, Math.floor(trend30d.length / 5))} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                  axisLine={false} tickLine={false} unit="%" />
                <Tooltip contentStyle={tooltipStyle}
                  formatter={(v: number, n: string) => [`${v?.toFixed(1)}%`, n]}
                  labelFormatter={(l) => `Jour : ${l}`} />
                <ReferenceLine y={88} stroke="#E2682A" strokeDasharray="4 4" strokeOpacity={0.8}
                  label={{ value: "Objectif OTP 88%", position: "insideTopRight", fontSize: 9, fill: "#E2682A" }} />
                <Line type="monotone" dataKey="otp" name="OTP %" stroke="#1A6FA4" strokeWidth={2.2} dot={false} />
                <Line type="monotone" dataKey="painIndex" name="Pain Index"
                  stroke="#C8102E" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>

      {/* ── Heatmap + Alertes ─────────────────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Section
          title="Trafic par station et heure"
          description="Chaque cellule = charge d'une station à une heure précise. Rouge foncé = bondé."
          tip="Les colonnes 7h–10h et 16h–20h sont les heures de pointe BRT à surveiller."
          className="lg:col-span-2"
        >
          <Heatmap />
        </Section>
        <Section
          title="Alertes à traiter maintenant"
          description="Incidents classés par priorité. Cliquer pour voir le détail et l'action recommandée."
          tip="Rouge = urgent, orange = surveillance, vert = informatif."
        >
          <div className="space-y-2">
            {alerts.slice(0, 5).map((a) => (<AlertItem key={a.id} {...a} />))}
            {alerts.length === 0 && <p className="py-4 text-center text-xs text-muted-foreground">Aucune alerte active</p>}
          </div>
        </Section>
      </div>

      {/* ── Actualités SunuBRT ────────────────────────────────────────────── */}
      <Section title="Actualités SunuBRT" description="Données en direct · sunubrt.sn"
        action={<a href="https://www.sunubrt.sn" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] text-brand hover:underline">
          Voir tout <ArrowRight className="h-3 w-3" /></a>}>
        {liveLoading && !liveData ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-44 animate-pulse rounded-lg bg-muted" />)}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(liveData?.news ?? []).slice(0, 4).map((item: LiveNewsItem, i) => <NewsCard key={i} item={item} />)}
          </div>
        )}
      </Section>

      {/* ── Galerie officielle ────────────────────────────────────────────── */}
      <Section title="Réseau en images" description="Photos officielles SunuBRT / Dakar Mobilité">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { src: rabattementA,   label: "Pôle Petersen",    caption: "Pôle d'échange · Rabattement R01A vers centre-ville",          lc: "bg-black/60"    },
            { src: rabattementB,   label: "DemDikk + BRT",    caption: "Intermodalité DemDikk · actif depuis 15 mai 2024",             lc: "bg-black/60"    },
            { src: prolongement,   label: "Extension",        caption: "Projet de prolongement du corridor BRT 2025",                  lc: "bg-line-b1/80"  },
            { src: abonnementJeune,label: "Abonnement jeune", caption: "Tarif préférentiel -26 ans · Abonnement mensuel",              lc: "bg-line-b2/80", top: true },
          ].map(({ src, label, caption, lc, top }) => (
            <figure key={label} className="card-elevated group overflow-hidden rounded-lg">
              <div className="relative h-36 overflow-hidden">
                <img src={src} alt={label}
                  className={`h-full w-full object-cover ${top ? "object-top" : ""} transition-transform duration-500 group-hover:scale-105`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className={`absolute bottom-2 left-2 rounded px-1.5 py-0.5 text-[10px] font-medium text-white ${lc}`}>{label}</span>
              </div>
              <figcaption className="p-2 text-[11px] text-muted-foreground">{caption}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* ── Indicateurs stratégiques — cliquables ─────────────────────────── */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {bottomKpis.map(({ label, value, unit, color, href }) => (
          <button
            key={label}
            onClick={() => navigate({ to: href })}
            className="group card-elevated rounded-xl p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
            <p className="metric-value mt-1 text-2xl" style={{ color }}>{value}</p>
            <p className="text-[11px] text-muted-foreground">{unit}</p>
            <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold opacity-0 transition-opacity group-hover:opacity-70" style={{ color }}>
              Voir détail <ChevronRight className="h-3 w-3" />
            </div>
          </button>
        ))}
      </div>

      {/* ── Line Detail Sheet ─────────────────────────────────────────────── */}
      <LineDetailSheet lineId={selectedLine} onClose={() => setSelectedLine(null)} />
    </PageShell>
  );
}

function NewsCard({ item }: { item: LiveNewsItem }) {
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer"
      className="card-elevated group flex flex-col overflow-hidden rounded-lg transition-all hover:-translate-y-0.5">
      {item.image ? (
        <div className="relative h-28 overflow-hidden bg-muted">
          <img src={item.image} alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {item.tag && (
            <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-brand/90 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
              <Tag className="h-2.5 w-2.5" />{item.tag}
            </span>
          )}
        </div>
      ) : (
        <div className="flex h-28 items-center justify-center bg-gradient-to-br from-brand/10 to-brand-2/10">
          <span className="text-3xl font-bold text-brand/30">BRT</span>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="text-[10px] text-muted-foreground">{item.date}</p>
        <h4 className="text-xs font-semibold leading-snug text-foreground line-clamp-2 group-hover:text-brand transition-colors">{item.title}</h4>
        {item.excerpt && <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-2">{item.excerpt}</p>}
      </div>
    </a>
  );
}
