// data.ts — source unique de données pour le cockpit SunuBRT.
// Valeurs calculées depuis brt data.xlsx via generate_real_data.py.
// Données statiques (couleurs, stations, réseau) maintenues ici.

import { realData } from "./real-data";
import type { LineId, StationInfo } from "./mock-data";
export type { LineId, StationInfo };

// Cast helper: brise le `as const` readonly pour les tableaux générés
function mutable<T>(v: unknown): T { return v as T; }

// ─── Statique ─────────────────────────────────────────────────────────────────
export const lines = ["B1", "B2", "B3"] as const;

export const LINE_COLORS: Record<LineId, string> = {
  B1: "var(--line-b1)",
  B2: "var(--line-b2)",
  B3: "var(--line-b3)",
};
export const LINE_HEX: Record<LineId, string> = {
  B1: "#1D9E75",
  B2: "#E2682A",
  B3: "#1A6FA4",
};

export const lineMeta = {
  B1: { name: "Omnibus",      stations: 23, color: "var(--line-b1)", desc: "Dessert toutes les 23 stations." },
  B2: { name: "Semi-Express", stations: 7,  color: "var(--line-b2)", desc: "7 stations dont les 3 pôles d'échange." },
  B3: { name: "Semi-Express", stations: 7,  color: "var(--line-b3)", desc: "Heures de pointe · Lun–Ven, hors Grand-Médine." },
} as const;

export const networkInfo = {
  operator: "Dakar Mobilité",
  hours: "6h – 21h",
  frequency: "Toutes les 6 min",
  days: "7j/7",
  hotline: "818 55 55 55",
  email: "serviceclient@sunubrt.sn",
  fleetType: "100% électrique",
  corridor: "Guédiawaye ↔ Petersen · 18,3 km",
};

export const stations = [
  "Préfecture de Guédiawaye", "Gueule Tapée", "Golf Nord", "Fith Mith", "Dalal Jam",
  "Golf Sud", "Ndingala", "Parcelles", "Croisement 22", "Police Parcelles",
  "Grand Médine", "Card. Hyacinthe Thiandoum", "Scat Urbam", "Khar Yalla",
  "Liberté 6", "Liberté 5", "Sacré-Cœur", "Liberté 1", "Grand Dakar",
  "Dial Diop", "Place de la Nation", "Grande Mosquée", "Papa Gueye Fall",
];

// ─── Données réelles (depuis brt data.xlsx) ───────────────────────────────────

export const networkScore: number = realData.networkScore;

export const kpis: Array<{
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  status: "success" | "warning" | "critical";
  icon: string;
  description?: string;
  target?: string;
}> = mutable(realData.kpis);

export const trend30d: Array<{
  day: string;
  passengers: number;
  otp: number;
  painIndex: number;
  loadFactor: number;
  revenue: number;
  headway: number;
}> = mutable(realData.trend30d);

export const heatmap: Array<{ station: string; values: Array<{ hour: number; value: number }> }> =
  mutable(realData.heatmap);

export const alerts: Array<{
  id: number;
  severity: "critical" | "warning" | "info";
  title: string;
  impact: string;
  action: string;
  page: string;
}> = mutable(realData.alerts);

export const linePerformance: Array<{
  line: string;
  otp: number;
  delay: number;
  completion: number;
  ridership: number;
  status: string;
  stations: number;
  type: string;
  speed?: number;
  pain_index?: number;
  load_pct?: number;
}> = mutable(realData.linePerformance);

export const delayDistribution: Array<{ bucket: string; count: number }> =
  mutable(realData.delayDistribution);

export const speedData: Array<{ line: string; theoretical: number; actual: number }> =
  mutable(realData.speedData);

export const ridershipByHour: Array<{ hour: string; passengers: number }> =
  mutable(realData.ridershipByHour);

export const ridershipByStation: Array<{ station: string; passengers: number }> =
  mutable(realData.ridershipByStation);

export const loadFactorDist: Array<{ range: string; buses: number }> =
  mutable(realData.loadFactorDist);

export const dailyRevenue: Array<{ day: string; revenue: number; cost: number }> =
  mutable(realData.dailyRevenue);

export const costWaterfall: Array<{ name: string; value: number }> =
  mutable(realData.costWaterfall);

export const fleetStatus: Array<{ name: string; value: number; color: string }> =
  mutable(realData.fleetStatus);

export const driverPerf: Array<{ driver: string; score: number; hours: number }> =
  mutable(realData.driverPerf);

export const cxMetrics: Array<{
  id: string;
  label: string;
  value: string;
  status: string;
}> = mutable(realData.cxMetrics);

export const anomalies: Array<{
  day: string;
  passengers: number;
  otp: number;
  anomaly: number | null;
}> = mutable(realData.anomalies);

export const stationDirectory: StationInfo[] = (
  mutable<Array<{
    id: number;
    name: string;
    lines: string[];
    hub: boolean;
    zone: string;
    passengers: number;
    load: number;
    pain: number;
    status: string;
  }>>(realData.stationDirectory)
).map((s) => ({
  id: s.id,
  name: s.name,
  lines: s.lines.filter((l) => ["B1", "B2", "B3"].includes(l)) as LineId[],
  hub: s.hub,
  zone: (["Nord", "Centre", "Sud"].includes(s.zone) ? s.zone : "Centre") as "Nord" | "Centre" | "Sud",
  passengers: s.passengers,
  load: s.load,
  pain: s.pain ?? 0,
  status: (["success", "warning", "critical"].includes(s.status)
    ? s.status : "success") as "success" | "warning" | "critical",
}));

// ─── Métriques avancées (notebook) ────────────────────────────────────────────

export const zoneDistribution: Array<{
  zone: string;
  passengers: number;
  otp: number;
  painIndex: number;
  load: number;
}> = mutable(realData.zoneDistribution);

export const corridorProfile: Array<{
  station: string;
  order: number;
  boardings: number;
  alightings: number;
  load: number;
  pain: number;
}> = mutable(realData.corridorProfile);

export const seasonalImpact: Array<{
  saison: string;
  avgPax: number;
  otp: number;
  painIndex: number;
  load: number;
  count: number;
}> = mutable(realData.seasonalImpact);

export const stationCriticality: Array<{
  station: string;
  criticality: number;
  load: number;
  delay: number;
  painIndex: number;
  status: string;
}> = mutable(realData.stationCriticality);

export const headwayByHour: Array<Record<string, string | number>> =
  mutable(realData.headwayByHour);

export const directionFlows: Array<{
  zone: string;
  direction: string;
  passengers: number;
}> = mutable(realData.directionFlows);

export const driverZoneStats: Array<{
  zone: string;
  total: number;
  actifs: number;
  absents: number;
  absenteisme_pct: number;
  anciennete_moy: number;
}> = mutable(realData.driverZoneStats);

export const painHeatmap: Array<{
  station: string;
  values: Array<{ hour: number; value: number }>;
}> = mutable(realData.painHeatmap);

export const fleetMeta: { total: number; avg_km: number } =
  realData.fleetMeta as { total: number; avg_km: number };

export const summary: {
  n_days: number;
  total_pax: number;
  daily_pax: number;
  otp_pct: number;
  delay_mean_min: number;
  delay_p95_min: number;
  load_pct: number;
  peak_load_pct: number;
  offpeak_load_pct: number;
  pain_index: number;
  satisfaction: number;
  headway_median_min: number;
  headway_reg_pct: number;
  freq_adherence_pct: number;
  fleet_pct: number;
  fleet_active: number;
  fleet_total: number;
  rev_per_km_kfcfa: number;
  cost_per_km_kfcfa: number;
  rev_per_pax_fcfa: number;
  cost_per_pax_fcfa: number;
  co2_saved_kg_day: number;
  co2_saved_t_year: number;
  breakeven_pax_day: number;
  dwell_avg_sec: number;
  dwell_efficiency_pct: number;
  pax_km_total: number;
  network_avail_pct: number;
  op_ratio: number;
  rev_30_mfcfa: number;
  network_score: number;
} = realData.summary as {
  n_days: number;
  total_pax: number;
  daily_pax: number;
  otp_pct: number;
  delay_mean_min: number;
  delay_p95_min: number;
  load_pct: number;
  peak_load_pct: number;
  offpeak_load_pct: number;
  pain_index: number;
  satisfaction: number;
  headway_median_min: number;
  headway_reg_pct: number;
  freq_adherence_pct: number;
  fleet_pct: number;
  fleet_active: number;
  fleet_total: number;
  rev_per_km_kfcfa: number;
  cost_per_km_kfcfa: number;
  rev_per_pax_fcfa: number;
  cost_per_pax_fcfa: number;
  co2_saved_kg_day: number;
  co2_saved_t_year: number;
  breakeven_pax_day: number;
  dwell_avg_sec: number;
  dwell_efficiency_pct: number;
  pax_km_total: number;
  network_avail_pct: number;
  op_ratio: number;
  rev_30_mfcfa: number;
  network_score: number;
};

export const lineMetrics: Record<"B1" | "B2" | "B3", {
  otp_pct: number;
  delay_mean_min: number;
  daily_pax: number;
  load_pct: number;
  peak_load_pct: number;
  pain_index: number;
  satisfaction: number;
  headway_med_min: number;
  headway_reg_pct: number;
  freq_adh_pct: number;
  revenue_mfcfa: number;
  speed_kmh: number;
  dwell_avg_sec: number;
  n_days: number;
  status: string;
}> = realData.lineMetrics as Record<"B1" | "B2" | "B3", {
  otp_pct: number;
  delay_mean_min: number;
  daily_pax: number;
  load_pct: number;
  peak_load_pct: number;
  pain_index: number;
  satisfaction: number;
  headway_med_min: number;
  headway_reg_pct: number;
  freq_adh_pct: number;
  revenue_mfcfa: number;
  speed_kmh: number;
  dwell_avg_sec: number;
  n_days: number;
  status: string;
}>;
