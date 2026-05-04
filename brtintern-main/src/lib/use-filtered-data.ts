import { useMemo } from "react";
import { useFilters } from "./filter-context";
import type { Ligne } from "./filter-context";
import * as D from "./data";

// ─── Station membership per line ─────────────────────────────────────────────
const B2_NAMES = new Set([
  "Petersen / Papa Gueye Fall",
  "Place de la Nation / Baux Maraîchers",
  "Dalal Jam",
  "Parcelles",
  "Grand Médine",
  "Liberté 5",
  "Préfecture de Guédiawaye",
]);
const B3_NAMES = new Set([
  "Petersen / Papa Gueye Fall",
  "Dalal Jam",
  "Parcelles",
  "Liberté 6",
  "Sacré-Cœur",
  "Grand Dakar",
  "Préfecture de Guédiawaye",
]);

function inLigne(name: string, ligne: Ligne): boolean {
  if (ligne === "all" || ligne === "B1") return true;
  if (ligne === "B2") return B2_NAMES.has(name);
  if (ligne === "B3") return B3_NAMES.has(name);
  return true;
}

// Peak hours: morning 6-10h, evening 16-20h
const PEAK_H = new Set([6, 7, 8, 9, 10, 16, 17, 18, 19, 20]);

function periodSlice(nDays: number) {
  return { trend: D.trend30d.slice(-nDays), rev: D.dailyRevenue.slice(-nDays), an: D.anomalies.slice(-nDays) };
}

// ─── Main hook ────────────────────────────────────────────────────────────────
export function useFilteredData() {
  const { ligne, zone, periode, pointe } = useFilters();

  return useMemo(() => {
    const nDays = periode === "day" ? 7 : periode === "week" ? 14 : 30;
    const { trend, rev, an } = periodSlice(nDays);

    // ── Line filter ──────────────────────────────────────────────────────────
    const linePerformance = ligne === "all"
      ? D.linePerformance
      : D.linePerformance.filter((l) => l.line === ligne);

    const speedData = ligne === "all"
      ? D.speedData
      : D.speedData.filter((d) => d.line === ligne);

    // Headway filtered by ligne + pointe
    const headwayByHour = D.headwayByHour.filter((h) => {
      if (pointe === "all") return true;
      const hr = parseInt(String(h.hour));
      return pointe === "peak" ? PEAK_H.has(hr) : !PEAK_H.has(hr);
    });

    // ── Station filter (ligne ∩ zone) ────────────────────────────────────────
    const stationDirectory = D.stationDirectory.filter((s) => {
      const ok_l = ligne === "all" || s.lines.includes(ligne as D.LineId);
      const ok_z = zone  === "all" || s.zone === zone;
      return ok_l && ok_z;
    });
    const stationNames = new Set(stationDirectory.map((s) => s.name));

    const ridershipByStation = D.ridershipByStation.filter(
      (s) => inLigne(s.station, ligne) &&
             (zone === "all" || stationNames.has(s.station)),
    );

    const heatmap = D.heatmap.filter(
      (r) => inLigne(r.station, ligne) &&
             (zone === "all" || stationNames.has(r.station)),
    );

    const painHeatmap = D.painHeatmap.filter(
      (r) => inLigne(r.station, ligne) &&
             (zone === "all" || stationNames.has(r.station)),
    );

    const corridorProfile = D.corridorProfile.filter(
      (s) => inLigne(s.station, ligne) &&
             (zone === "all" || stationNames.has(s.station)),
    );

    const stationCriticality = D.stationCriticality.filter(
      (s) => zone === "all" || stationNames.has(s.station),
    );

    // ── Hourly filter ────────────────────────────────────────────────────────
    const ridershipByHour = D.ridershipByHour.filter((h) => {
      if (pointe === "all") return true;
      const hr = parseInt(h.hour);
      return pointe === "peak" ? PEAK_H.has(hr) : !PEAK_H.has(hr);
    });

    // ── Zone filter ──────────────────────────────────────────────────────────
    const zoneDistribution = zone === "all"
      ? D.zoneDistribution
      : D.zoneDistribution.filter((z2) => z2.zone.includes(zone));

    const driverZoneStats = zone === "all"
      ? D.driverZoneStats
      : D.driverZoneStats.filter((z2) => z2.zone === zone);

    // ── KPIs — line-aware override when a specific line is selected ─────────
    const kpis = (() => {
      if (ligne === "all") return D.kpis;
      const m = D.lineMetrics[ligne as "B1" | "B2" | "B3"];
      if (!m) return D.kpis;
      return D.kpis.map((k) => {
        switch (k.id) {
          case "otp": return {
            ...k,
            value:  `${m.otp_pct.toFixed(1)}%`,
            delta:  `Ligne ${ligne} · ${m.n_days} jours`,
            status: (m.otp_pct >= 85 ? "success" : m.otp_pct >= 70 ? "warning" : "critical") as typeof k.status,
            trend:  (m.otp_pct >= 85 ? "up" : "down") as typeof k.trend,
          };
          case "pain": return {
            ...k,
            value:  `${m.pain_index.toFixed(1)} / 100`,
            delta:  m.pain_index < 30 ? "bon niveau" : m.pain_index < 50 ? "surveillance" : "critique",
            status: (m.pain_index < 30 ? "success" : m.pain_index < 50 ? "warning" : "critical") as typeof k.status,
            trend:  (m.pain_index < 30 ? "down" : "up") as typeof k.trend,
          };
          case "ridership": return {
            ...k,
            value: m.daily_pax.toLocaleString("fr-FR"),
            delta: `Ligne ${ligne} · ${m.n_days} jours`,
          };
          case "regularity": return {
            ...k,
            value:  `${m.headway_reg_pct.toFixed(1)}%`,
            delta:  `Headway médian ${m.headway_med_min.toFixed(1)} min`,
            status: (m.headway_reg_pct >= 80 ? "success" : m.headway_reg_pct >= 65 ? "warning" : "critical") as typeof k.status,
            trend:  (m.headway_reg_pct >= 80 ? "up" : "down") as typeof k.trend,
          };
          case "peak_load": return {
            ...k,
            value:  `${m.peak_load_pct.toFixed(1)}%`,
            delta:  `Load moyen ${m.load_pct.toFixed(1)}% · Ligne ${ligne}`,
            status: (m.peak_load_pct > 100 ? "critical" : m.peak_load_pct > 80 ? "warning" : "success") as typeof k.status,
          };
          default: return k;
        }
      });
    })();

    // ── Pass-through (pre-aggregated, no row-level split available) ──────────
    return {
      // Time-sliced
      trend30d: trend,
      dailyRevenue: rev,
      anomalies: an,
      // Ligne-filtered
      linePerformance,
      speedData,
      headwayByHour,
      // Station-filtered
      stationDirectory,
      ridershipByStation,
      heatmap,
      painHeatmap,
      corridorProfile,
      stationCriticality,
      // Hour-filtered
      ridershipByHour,
      // Zone-filtered
      zoneDistribution,
      driverZoneStats,
      // Pass-through
      kpis,
      delayDistribution: D.delayDistribution,
      loadFactorDist:  D.loadFactorDist,
      costWaterfall:   D.costWaterfall,
      fleetStatus:     D.fleetStatus,
      fleetMeta:       D.fleetMeta,
      driverPerf:      D.driverPerf,
      cxMetrics:       D.cxMetrics,
      seasonalImpact:  D.seasonalImpact,
      directionFlows:  D.directionFlows,
      alerts:          D.alerts,
      summary:         D.summary,
      networkScore:    D.networkScore,
      lineMetrics:     D.lineMetrics,
      // Metadata
      activeFilters: { ligne, zone, periode, pointe },
    };
  }, [ligne, zone, periode, pointe]);
}
