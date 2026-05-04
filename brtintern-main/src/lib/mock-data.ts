// SunuBRT Dakar — données alignées avec sunubrt.sn (Dakar Mobilité).
// Référence: 18,3 km · 23 stations · lignes B1 (Omnibus), B2 / B3 (Semi-Express),
// B4 (Express, prochainement) · flotte 100% électrique · 6h–21h, 7j/7 · fréquence 6 min.

export const lines = ["B1", "B2", "B3"] as const;
export type LineId = typeof lines[number];

// Charte graphique unifiée — utiliser PARTOUT (cards, charts, heatmap, badges).
export const LINE_COLORS: Record<LineId, string> = {
  B1: "var(--line-b1)",  // Vert  Omnibus
  B2: "var(--line-b2)",  // Orange Semi-Express
  B3: "var(--line-b3)",  // Bleu  Semi-Express
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

// 23 stations officielles du corridor SunuBRT (source: sunubrt.sn).
export const stations = [
  "Préfecture de Guédiawaye", "Gueule Tapée", "Golf Nord", "Fith Mith", "Dalal Jam",
  "Golf Sud", "Ndingala", "Parcelles", "Croisement 22", "Police Parcelles",
  "Grand Médine", "Card. Hyacinthe Thiandoum", "Scat Urbam", "Khar Yalla",
  "Liberté 6", "Liberté 5", "Sacré-Cœur", "Liberté 1", "Grand Dakar",
  "Dial Diop", "Place de la Nation", "Grande Mosquée", "Papa Gueye Fall",
];

export const networkScore = 82; // 0-100, brand-positive but with warning room

export const kpis = [
  { id: "otp", label: "Ponctualité (OTP)", value: "88.6%", delta: "+1.4 pt", trend: "up", status: "success", icon: "Timer" },
  { id: "completion", label: "Taux de réalisation", value: "95.2%", delta: "−0.6 pt", trend: "down", status: "warning", icon: "CheckCircle2" },
  { id: "headway", label: "Régularité headway", value: "84.0%", delta: "+0.8 pt", trend: "up", status: "success", icon: "Activity" },
  { id: "ridership", label: "Passagers du jour", value: "92 480", delta: "+5.2%", trend: "up", status: "success", icon: "Users" },
  { id: "load", label: "Load factor", value: "73%", delta: "+2 pt", trend: "up", status: "warning", icon: "Gauge" },
  { id: "revenue", label: "Recettes", value: "32.4 M FCFA", delta: "+4.1%", trend: "up", status: "success", icon: "Wallet" },
  { id: "opratio", label: "Operating ratio", value: "104%", delta: "+1.2 pt", trend: "up", status: "success", icon: "TrendingUp" },
  { id: "fleet", label: "Disponibilité flotte", value: "91%", delta: "−2 pt", trend: "down", status: "warning", icon: "Bus" },
] as const;

export const trend30d = Array.from({ length: 30 }, (_, i) => {
  const weekend = i % 7 === 0 || i % 7 === 6;
  const base = 88000 + Math.sin(i / 3) * 6000 + i * 180 - (weekend ? 22000 : 0);
  const otp = 86 + Math.sin(i / 4) * 3 + (i > 22 ? 1.2 : 0);
  return {
    day: `J-${29 - i}`,
    passengers: Math.max(40000, Math.round(base)),
    otp: Math.round(otp * 10) / 10,
  };
});

export const heatmap = stations.slice(0, 14).map((s) => ({
  station: s,
  values: Array.from({ length: 18 }, (_, h) => {
    const hour = h + 5;
    const peak = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19) ? 1.7 : 0.65;
    const stationFactor = 0.55 + Math.random() * 0.95;
    return { hour, value: Math.round(peak * stationFactor * 100) };
  }),
}));

export const alerts = [
  { id: 1, severity: "critical", title: "Petersen — saturation", impact: "Load factor 138% · risque sécurité", action: "Renforcer fréquence B1 (heure pointe)", page: "/ridership" },
  { id: 2, severity: "critical", title: "Bus #B-217 hors service", impact: "Indisponibilité > 48 h · ligne B2 impactée", action: "Escalade atelier maintenance", page: "/fleet" },
  { id: 3, severity: "warning", title: "B3 retard moyen +3.8 min", impact: "OTP ligne 78% · sous cible 85%", action: "Audit terminus Pikine", page: "/operations" },
  { id: 4, severity: "warning", title: "Absentéisme zone Nord", impact: "Couverture chauffeurs −11%", action: "Plan de réaffectation 7j", page: "/hr" },
  { id: 5, severity: "info", title: "Recettes B2 < prévision", impact: "−2.8% vs budget mensuel", action: "Vérifier validation billets", page: "/finance" },
] as const;

export const linePerformance = [
  { line: "B1", otp: 92, delay: 1.1, completion: 97, ridership: 38600, status: "success", stations: 23, type: "Omnibus" },
  { line: "B2", otp: 87, delay: 2.2, completion: 95, ridership: 31480, status: "success", stations: 7,  type: "Semi-Express" },
  { line: "B3", otp: 78, delay: 3.8, completion: 91, ridership: 22400, status: "warning", stations: 7,  type: "Semi-Express" },
];

export const delayDistribution = [
  { bucket: "< 1 min", count: 462 },
  { bucket: "1–3 min", count: 284 },
  { bucket: "3–5 min", count: 138 },
  { bucket: "5–10 min", count: 64 },
  { bucket: "> 10 min", count: 19 },
];

export const speedData = lines.map((l, i) => ({
  line: l,
  theoretical: 28,
  actual: 27 - i * 1.4,
}));

export const ridershipByHour = Array.from({ length: 18 }, (_, h) => {
  const hour = h + 5;
  const peak = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19) ? 1.7 : 0.55;
  return { hour: `${hour}h`, passengers: Math.round(4200 * peak + Math.random() * 800) };
});

export const ridershipByStation = stations.map((s) => ({
  station: s, passengers: Math.round(2800 + Math.random() * 9000),
})).sort((a, b) => b.passengers - a.passengers).slice(0, 12);

export const loadFactorDist = [
  { range: "0–25%", buses: 18 },
  { range: "25–50%", buses: 36 },
  { range: "50–75%", buses: 54 },
  { range: "75–100%", buses: 41 },
  { range: "> 100%", buses: 11 },
];

export const dailyRevenue = Array.from({ length: 30 }, (_, i) => ({
  day: `J-${29 - i}`,
  revenue: Math.round(28 + Math.sin(i / 4) * 4 + i * 0.15),
  cost: Math.round(27 + Math.cos(i / 5) * 3),
}));

export const costWaterfall = [
  { name: "Recettes", value: 32 },
  { name: "Énergie", value: -8 },
  { name: "RH", value: -11 },
  { name: "Maintenance", value: -5 },
  { name: "Autres", value: -3 },
  { name: "Marge", value: 5 },
];

export const fleetStatus = [
  { name: "En service", value: 132, color: "var(--success)" },
  { name: "Maintenance", value: 9, color: "var(--warning)" },
  { name: "Hors service", value: 4, color: "var(--critical)" },
];

export const driverPerf = Array.from({ length: 28 }, (_, i) => ({
  driver: `D${100 + i}`,
  score: Math.round(68 + Math.random() * 28),
  hours: Math.round(140 + Math.random() * 40),
}));

export const cxMetrics = [
  { id: "wait", label: "Temps d'attente moyen", value: "4.2 min", status: "success" },
  { id: "pain", label: "Pain index", value: "28 / 100", status: "warning" },
  { id: "crowd", label: "Crowding stations", value: "11%", status: "warning" },
  { id: "sat", label: "Satisfaction proxy", value: "81%", status: "success" },
];

export const anomalies = trend30d.map((d, i) => ({
  ...d,
  anomaly: i === 12 || i === 23 ? Math.round(d.passengers * 0.55) : null,
}));

// Mapping officiel station → lignes (B1 dessert toutes les 23, B2/B3 sur sous-ensembles).
// B2 Semi-Express : 7 stations dont 3 pôles d'échange (Petersen / Grand Médine / Guédiawaye).
// B3 Semi-Express : 7 stations sans Grand-Médine, lun-ven heures de pointe.
const B2_STATIONS = new Set([
  "Préfecture de Guédiawaye", "Dalal Jam", "Parcelles", "Grand Médine",
  "Liberté 5", "Place de la Nation", "Papa Gueye Fall",
]);
const B3_STATIONS = new Set([
  "Préfecture de Guédiawaye", "Dalal Jam", "Parcelles",
  "Liberté 6", "Sacré-Cœur", "Grand Dakar", "Papa Gueye Fall",
]);

export type StationInfo = {
  id: number;
  name: string;
  lines: LineId[];
  hub: boolean;
  zone: "Nord" | "Centre" | "Sud";
  passengers: number;
  load: number;
  pain: number;
  status: "success" | "warning" | "critical";
};

export const stationDirectory: StationInfo[] = stations.map((name, idx) => {
  const linesAt: LineId[] = ["B1"];
  if (B2_STATIONS.has(name)) linesAt.push("B2");
  if (B3_STATIONS.has(name)) linesAt.push("B3");
  const hub = ["Préfecture de Guédiawaye", "Grand Médine", "Papa Gueye Fall"].includes(name);
  const zone: StationInfo["zone"] = idx < 8 ? "Nord" : idx < 16 ? "Centre" : "Sud";
  const seed = (idx * 9301 + 49297) % 233280;
  const passengers = 1800 + Math.round((seed / 233280) * 7800) + (hub ? 4500 : 0);
  const load = 38 + Math.round((seed / 233280) * 70) + (hub ? 18 : 0);
  const status: StationInfo["status"] = load > 110 ? "critical" : load > 85 ? "warning" : "success";
  return { id: idx + 1, name, lines: linesAt, hub, zone, passengers, load, pain: 30, status };
});
