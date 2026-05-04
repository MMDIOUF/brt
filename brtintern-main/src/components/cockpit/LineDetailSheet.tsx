import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
} from "recharts";
import {
  Bus, Clock, Gauge, Activity, Zap, AlertCircle,
  CheckCircle2, CircleDot, Users, X,
} from "lucide-react";
import { lineMeta, lineMetrics, LINE_HEX, stations, trend30d } from "@/lib/data";

type LineId = "B1" | "B2" | "B3";
type BusStatus = "transit" | "delayed" | "depot";

const LINE_STATIONS: Record<LineId, string[]> = {
  B1: [...stations],
  B2: [
    "Préfecture de Guédiawaye", "Dalal Jam", "Parcelles",
    "Grand Médine", "Liberté 5", "Place de la Nation", "Papa Gueye Fall",
  ],
  B3: [
    "Préfecture de Guédiawaye", "Dalal Jam", "Parcelles",
    "Liberté 6", "Sacré-Cœur", "Grand Dakar", "Papa Gueye Fall",
  ],
};

const HUB_KEYWORDS = ["Guédiawaye", "Dalal Jam", "Parcelles", "Papa Gueye Fall", "Petersen"];

const DRIVERS = [
  "M. Diallo", "A. Sow", "F. Ndiaye", "I. Fall", "O. Thiaw",
  "C. Sarr", "B. Gaye", "M. Mbaye", "L. Ba", "A. Kane",
  "S. Diop", "M. Faye", "N. Seck", "P. Diouf", "Y. Cissé",
];

interface BusInfo {
  id: string;
  status: BusStatus;
  stationIdx: number;
  station: string;
  nextStation: string;
  speed: number;
  passengers: number;
  eta: string;
  driver: string;
  battery: number;
  otp: number;
}

function generateBuses(lineId: LineId, stns: string[]): BusInfo[] {
  const m = lineMetrics[lineId];
  const count = lineId === "B1" ? 14 : 9;
  return Array.from({ length: count }, (_, i) => {
    const h = (i * 19 + lineId.charCodeAt(0) * 5 + i * i) % 100;
    const stIdx = Math.floor((i / count) * stns.length) % stns.length;
    const status: BusStatus = i >= count - 2 ? "depot" : h < 12 ? "delayed" : "transit";
    return {
      id: `${lineId}-${String(i + 1).padStart(2, "0")}`,
      status,
      stationIdx: stIdx,
      station: stns[stIdx],
      nextStation: stns[Math.min(stIdx + 1, stns.length - 1)],
      speed: status === "depot" ? 0 : Math.max(20, Math.round(m.speed_kmh * (0.72 + (h % 28) / 100))),
      passengers: Math.round(m.daily_pax / 18 * (0.35 + (h % 65) / 100)),
      eta: `${14 + Math.floor(i * 0.55)}:${String((i * 9 + 4) % 60).padStart(2, "0")}`,
      driver: DRIVERS[i % DRIVERS.length],
      battery: 52 + (h % 47),
      otp: Math.max(55, Math.round(m.otp_pct * (status === "delayed" ? 0.68 : 0.93 + (h % 8) / 100))),
    };
  });
}

const statusCfg: Record<BusStatus, { label: string; bg: string; Icon: typeof CheckCircle2 }> = {
  transit: { label: "En transit",  bg: "bg-success/10 text-success",              Icon: CheckCircle2 },
  delayed: { label: "Retard",      bg: "bg-critical/10 text-critical",            Icon: AlertCircle  },
  depot:   { label: "Dépôt",       bg: "bg-muted text-muted-foreground",          Icon: CircleDot    },
};

const tip = {
  backgroundColor: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 11,
};

export function LineDetailSheet({
  lineId,
  onClose,
}: {
  lineId: LineId | null;
  onClose: () => void;
}) {
  const [selectedBus, setSelectedBus] = useState<BusInfo | null>(null);

  useEffect(() => { setSelectedBus(null); }, [lineId]);

  if (!lineId) return null;

  const m    = lineMetrics[lineId];
  const meta = lineMeta[lineId];
  const color = LINE_HEX[lineId];
  const stns = LINE_STATIONS[lineId];
  const buses = generateBuses(lineId, stns);

  const activeBuses  = buses.filter((b) => b.status === "transit");
  const delayedBuses = buses.filter((b) => b.status === "delayed");
  const otpTrend     = trend30d.slice(-14);

  const stationLoad = stns.map((name, idx) => ({
    name: name.length > 16 ? name.slice(0, 16) + "…" : name,
    load: Math.round(m.load_pct * (0.55 + ((idx * 13 + 7) % 45) / 100)),
  }));

  return (
    <Dialog open={!!lineId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl h-[88vh] p-0 flex flex-col gap-0 overflow-hidden [&>button]:hidden">
        <DialogTitle className="sr-only">Ligne {lineId} · {meta.name}</DialogTitle>

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div
          className="shrink-0 px-4 pt-3 pb-3 border-b border-border"
          style={{ borderTop: `3px solid ${color}` }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-sm text-white shadow-md"
                style={{ backgroundColor: color }}
              >
                {lineId}
              </div>
              <div>
                <h2 className="text-sm font-bold text-foreground leading-tight">
                  Ligne {lineId} · {meta.name}
                </h2>
                <p className="text-[11px] text-muted-foreground">
                  Guédiawaye ↔ Petersen · {stns.length} stations · {m.n_days} j analysés
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                  m.otp_pct >= 85 ? "bg-success/10 text-success" :
                  m.otp_pct >= 70 ? "bg-warning/10 text-warning" :
                  "bg-critical/10 text-critical"
                }`}
              >
                OTP {m.otp_pct.toFixed(1)}%
              </span>
              <span className="relative flex h-2 w-2 ml-1">
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                  style={{ backgroundColor: color }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
              </span>
              <span className="text-[10px] text-muted-foreground">Live</span>
              <button
                onClick={onClose}
                className="ml-2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* KPI mini-cards */}
          <div className="mt-3 grid grid-cols-5 gap-2">
            {([
              { label: "OTP",         value: `${m.otp_pct.toFixed(1)}%`,      icon: Activity, ok: m.otp_pct >= 85 },
              { label: "Load",        value: `${m.load_pct.toFixed(0)}%`,     icon: Gauge,    ok: m.load_pct < 90 },
              { label: "Délai moy.",  value: `${m.delay_mean_min.toFixed(1)} min`, icon: Clock, ok: m.delay_mean_min < 5 },
              { label: "Headway",     value: `${m.headway_med_min.toFixed(1)} min`, icon: Zap,  ok: m.headway_med_min < 8 },
              { label: "Pax / jour",  value: m.daily_pax.toLocaleString("fr-FR"), icon: Users, ok: true },
            ] as const).map(({ label, value, icon: Icon, ok }) => (
              <div key={label} className="rounded-lg bg-card border border-border px-2.5 py-2">
                <div className="flex items-center gap-1 mb-0.5">
                  <Icon className="h-3 w-3 text-muted-foreground" />
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</span>
                </div>
                <p className={`text-sm font-bold ${ok ? "text-foreground" : "text-warning"}`}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Body ─────────────────────────────────────────────────────── */}
        <div className="flex flex-1 overflow-hidden min-h-0">

          {/* Left: Bus list */}
          <div className="w-52 shrink-0 border-r border-border flex flex-col">
            <div className="px-3 py-2 border-b border-border shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Bus · {buses.length}
                </span>
                <div className="flex gap-2 text-[10px]">
                  <span className="text-success font-semibold">{activeBuses.length} actifs</span>
                  {delayedBuses.length > 0 && (
                    <span className="text-critical font-semibold">{delayedBuses.length} retard</span>
                  )}
                </div>
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {buses.map((bus) => {
                  const sc = statusCfg[bus.status];
                  const isSelected = selectedBus?.id === bus.id;
                  return (
                    <button
                      key={bus.id}
                      onClick={() => setSelectedBus(isSelected ? null : bus)}
                      className={`w-full text-left rounded-lg p-2.5 transition-all border text-xs ${
                        isSelected
                          ? "border-current"
                          : "border-transparent hover:bg-muted/60 hover:border-border"
                      }`}
                      style={isSelected ? { borderColor: color, backgroundColor: `${color}14` } : undefined}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5">
                          <Bus className="h-3 w-3 shrink-0" style={{ color }} />
                          <span className="font-semibold text-foreground">{bus.id}</span>
                        </div>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${sc.bg}`}>
                          {sc.label}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[10px] text-muted-foreground truncate">{bus.station}</p>
                      {bus.status !== "depot" && (
                        <p className="text-[10px] text-muted-foreground">{bus.speed} km/h · ETA {bus.eta}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Center + Right */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            <Tabs defaultValue="route" className="flex flex-col flex-1 overflow-hidden">
              <TabsList className="h-9 rounded-none border-b border-border bg-transparent justify-start px-3 gap-1 shrink-0">
                {(["route", "otp", "stations"] as const).map((t) => (
                  <TabsTrigger
                    key={t}
                    value={t}
                    className="rounded-md text-xs h-7 data-[state=active]:bg-card data-[state=active]:shadow-sm"
                  >
                    {t === "route" ? "Corridor" : t === "otp" ? "OTP & Trend" : "Stations"}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Tab: Corridor */}
              <TabsContent value="route" className="flex-1 overflow-hidden m-0 flex">
                <ScrollArea className="flex-1 h-full">
                  <div className="p-4">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-4">
                      Corridor · {stns.length} stations
                    </p>
                    <div className="relative pl-7">
                      {/* Vertical track */}
                      <div
                        className="absolute left-3 top-2 bottom-2 w-0.5 rounded-full"
                        style={{ backgroundColor: `${color}35` }}
                      />
                      {stns.map((station, idx) => {
                        const busesHere = buses.filter((b) => b.stationIdx === idx && b.status !== "depot");
                        const isHighlighted = selectedBus?.stationIdx === idx;
                        const isHub = HUB_KEYWORDS.some((kw) => station.includes(kw));
                        const isLast = idx === stns.length - 1;
                        return (
                          <div key={idx} className={`relative flex items-start gap-3 mb-3.5 ${isHighlighted ? "opacity-100" : "opacity-80"}`}>
                            {/* Station dot */}
                            <div
                              className="relative z-10 mt-0.5 h-4 w-4 shrink-0 flex items-center justify-center rounded-full transition-all"
                              style={{
                                backgroundColor: isHub || isLast ? color : `${color}40`,
                                boxShadow: isHighlighted ? `0 0 0 3px ${color}30` : "none",
                                transform: isHighlighted ? "scale(1.3)" : "scale(1)",
                              }}
                            >
                              {isHub && <span className="h-1.5 w-1.5 rounded-full bg-white/80" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`text-xs leading-tight ${isHub ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                                  {station}
                                </span>
                                {busesHere.length > 0 && (
                                  <div className="flex gap-0.5 items-center">
                                    {busesHere.slice(0, 3).map((b) => (
                                      <span
                                        key={b.id}
                                        title={`${b.id} · ${b.speed} km/h`}
                                        className="inline-flex h-4 w-4 items-center justify-center rounded text-[8px]"
                                        style={{
                                          backgroundColor: b.status === "delayed" ? "var(--critical)" : color,
                                          opacity: 0.9,
                                        }}
                                      >
                                        🚌
                                      </span>
                                    ))}
                                    {busesHere.length > 3 && (
                                      <span className="text-[9px] text-muted-foreground">+{busesHere.length - 3}</span>
                                    )}
                                  </div>
                                )}
                              </div>
                              {isHub && (
                                <p className="text-[9px] text-muted-foreground mt-0.5">Pôle d'échange</p>
                              )}
                            </div>
                            <span className="text-[9px] text-muted-foreground/60 shrink-0 mt-0.5">
                              {idx + 1}/{stns.length}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </ScrollArea>

                {/* Selected bus panel */}
                {selectedBus && (
                  <div className="w-52 shrink-0 border-l border-border overflow-y-auto p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-foreground">{selectedBus.id}</span>
                      <button
                        onClick={() => setSelectedBus(null)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusCfg[selectedBus.status].bg}`}>
                      {statusCfg[selectedBus.status].label}
                    </span>

                    <div className="mt-3 space-y-3 text-xs">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Chauffeur</p>
                        <p className="font-semibold mt-0.5">{selectedBus.driver}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Station actuelle</p>
                        <p className="font-semibold mt-0.5 text-[11px] leading-snug">{selectedBus.station}</p>
                      </div>
                      {selectedBus.status !== "depot" && (
                        <>
                          <div>
                            <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Prochain arrêt</p>
                            <p className="mt-0.5 text-muted-foreground text-[11px] leading-snug">{selectedBus.nextStation}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Vitesse</p>
                              <p className="font-bold text-base">{selectedBus.speed} <span className="text-[10px] font-normal">km/h</span></p>
                            </div>
                            <div>
                              <p className="text-[9px] uppercase tracking-wider text-muted-foreground">ETA</p>
                              <p className="font-bold text-base">{selectedBus.eta}</p>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Passagers</p>
                              <p className="text-[9px] text-muted-foreground">{selectedBus.passengers} / 90</p>
                            </div>
                            <Progress
                              value={Math.round(selectedBus.passengers / 90 * 100)}
                              className="h-1.5"
                              style={{ "--progress-color": color } as React.CSSProperties}
                            />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Batterie</p>
                              <p className="text-[9px] text-muted-foreground">{selectedBus.battery}%</p>
                            </div>
                            <Progress
                              value={selectedBus.battery}
                              className="h-1.5"
                              style={{ "--progress-color": selectedBus.battery > 40 ? "var(--success)" : "var(--warning)" } as React.CSSProperties}
                            />
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-wider text-muted-foreground">OTP bus</p>
                            <p className={`font-bold text-sm mt-0.5 ${selectedBus.otp >= 85 ? "text-success" : "text-warning"}`}>
                              {selectedBus.otp}%
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Tab: OTP & Trend */}
              <TabsContent value="otp" className="flex-1 overflow-auto m-0 p-4">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                  OTP & Pain Index · 14 derniers jours
                </p>
                <div className="h-52">
                  <ResponsiveContainer>
                    <LineChart data={otpTrend} margin={{ top: 4, right: 20, left: -16, bottom: 0 }}>
                      <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" tick={{ fontSize: 10 }} interval={2} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
                      <Tooltip contentStyle={tip} formatter={(v: number, n: string) => [`${v?.toFixed(1)}`, n]} />
                      <ReferenceLine y={88} stroke={color} strokeDasharray="5 4" opacity={0.6}
                        label={{ value: "Cible 88%", position: "right", fontSize: 9, fill: color }} />
                      <Line type="monotone" dataKey="otp" name="OTP %" stroke={color} strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="painIndex" name="Pain Index" stroke="var(--critical)" strokeWidth={1.5} strokeDasharray="3 2" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { label: "Régularité headway", value: `${m.headway_reg_pct.toFixed(1)}%`, good: m.headway_reg_pct >= 80 },
                    { label: "Adhérence fréq.",   value: `${m.freq_adh_pct.toFixed(1)}%`,   good: m.freq_adh_pct >= 80 },
                    { label: "Pain Index",         value: `${m.pain_index.toFixed(1)}`,      good: m.pain_index < 30 },
                  ].map(({ label, value, good }) => (
                    <div key={label} className="rounded-lg bg-card border border-border p-3 text-center">
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</p>
                      <p className={`text-xl font-bold mt-1 ${good ? "text-success" : "text-warning"}`}>{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-card border border-border p-3">
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Satisfaction client</p>
                    <p className="text-2xl font-bold mt-1" style={{ color }}>{m.satisfaction.toFixed(1)} / 5</p>
                  </div>
                  <div className="rounded-lg bg-card border border-border p-3">
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Recettes ligne</p>
                    <p className="text-2xl font-bold mt-1 text-foreground">{m.revenue_mfcfa.toFixed(1)} M FCFA</p>
                  </div>
                </div>
              </TabsContent>

              {/* Tab: Stations */}
              <TabsContent value="stations" className="flex-1 overflow-auto m-0 p-4">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                  Load factor estimé par station · {stns.length} arrêts
                </p>
                <div style={{ height: stns.length * 26 + 40 }} className="min-h-48">
                  <ResponsiveContainer>
                    <BarChart data={stationLoad} layout="vertical" margin={{ left: 4, right: 40, top: 4, bottom: 4 }}>
                      <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 130]} tick={{ fontSize: 9 }} unit="%" axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 9 }} width={120} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={tip} formatter={(v: number) => [`${v}%`, "Load factor"]} />
                      <ReferenceLine x={90} stroke="var(--critical)" strokeDasharray="4 3" opacity={0.5} />
                      <Bar dataKey="load" radius={[0, 4, 4, 0]} maxBarSize={14}>
                        {stationLoad.map((d, i) => (
                          <Cell
                            key={i}
                            fill={d.load > 100 ? "var(--critical)" : d.load > 80 ? "var(--warning)" : color}
                            fillOpacity={0.82}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
