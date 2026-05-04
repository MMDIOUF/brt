import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/cockpit/PageShell";
import { Section } from "@/components/cockpit/Section";
import { KpiCard } from "@/components/cockpit/KpiCard";
import { useFilteredData } from "@/lib/use-filtered-data";
import {
  ResponsiveContainer, ComposedChart, Line, Scatter, ScatterChart,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell,
} from "recharts";

export const Route = createFileRoute("/analytics")({ component: Analytics });

const tip = { backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 };

function critColor(s: string) {
  if (s === "critical") return "var(--critical)";
  if (s === "warning")  return "var(--warning)";
  return "var(--success)";
}

function Analytics() {
  const { anomalies, trend30d, stationCriticality, seasonalImpact, zoneDistribution, summary } = useFilteredData();

  // Forecast basé sur la tendance réelle des 7 derniers jours
  const trendSlice = trend30d.slice(-7);
  const avgDaily = trendSlice.length > 1
    ? (trendSlice[trendSlice.length - 1].passengers - trendSlice[0].passengers) / (trendSlice.length - 1)
    : 0;
  const lastPax = trend30d[trend30d.length - 1]?.passengers ?? summary.daily_pax;
  const forecast = [
    ...trend30d.map((d) => ({ day: d.day, actual: d.passengers, forecast: null as number | null })),
    ...Array.from({ length: 7 }, (_, i) => ({
      day: `J+${i + 1}`,
      actual: null as number | null,
      forecast: Math.max(0, Math.round(lastPax + avgDaily * (i + 1))),
    })),
  ];

  const clusterData = stationCriticality.map((s) => ({
    x: s.load,
    y: s.delay,
    z: s.painIndex,
    name: s.station,
    status: s.status,
  }));

  const anomalyCount = anomalies.filter((a) => a.anomaly !== null).length;
  const avgPainIndex = summary.pain_index;

  return (
    <PageShell title="Advanced Analytics" subtitle="Anomalies · forecast · criticité stations · saisonnalité · données réelles">

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard
          label="Pain Index réseau"
          value={`${avgPainIndex.toFixed(1)} / 100`}
          delta={avgPainIndex < 30 ? "bon niveau" : avgPainIndex < 50 ? "surveillance" : "critique"}
          trend={avgPainIndex < 30 ? "down" : "up"}
          status={avgPainIndex < 30 ? "success" : avgPainIndex < 50 ? "warning" : "critical"}
          icon="Heart"
          description="Headway + retard + charge composite"
          target="< 30"
        />
        <KpiCard
          label="Régularité headway"
          value={`${summary.headway_reg_pct.toFixed(1)}%`}
          delta={`Fréq. adhérence ${summary.freq_adherence_pct.toFixed(1)}%`}
          trend={summary.headway_reg_pct >= 80 ? "up" : "down"}
          status={summary.headway_reg_pct >= 80 ? "success" : summary.headway_reg_pct >= 65 ? "warning" : "critical"}
          icon="Activity"
          description="Intervalles dans ±30% cible 6 min"
          target="≥ 80%"
        />
        <KpiCard
          label="Anomalies détectées"
          value={String(anomalyCount)}
          delta={`sur ${anomalies.length} jours analysés`}
          trend={anomalyCount > 3 ? "up" : "down"}
          status={anomalyCount === 0 ? "success" : anomalyCount <= 3 ? "warning" : "critical"}
          icon="AlertOctagon"
          description="Écarts > 1.8σ sur la fréquentation"
        />
        <KpiCard
          label="CO₂ évité / an"
          value={`${summary.co2_saved_t_year.toFixed(0)} t`}
          delta={`${Math.round(summary.co2_saved_kg_day).toLocaleString("fr-FR")} kg/j vs diesel`}
          trend="down"
          status="success"
          icon="Leaf"
          description="Économie carbone flotte électrique"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Anomalies z-score */}
        <Section title="Anomalies passagers (z-score)" description="Points marqués = écarts statistiquement significatifs (|z| > 1.8)">
          <div className="h-64">
            <ResponsiveContainer>
              <ComposedChart data={anomalies} margin={{ top: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} interval={Math.floor(anomalies.length / 5)} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                <Tooltip contentStyle={tip} formatter={(v: number) => [v.toLocaleString("fr-FR"), "Passagers"]} />
                <Line type="monotone" dataKey="passengers" name="Passagers" stroke="var(--chart-1)" dot={false} strokeWidth={2} />
                <Scatter dataKey="anomaly" name="Anomalie" fill="var(--critical)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Forecast 7 jours */}
        <Section title="Forecast demande · 7 jours" description="Projection basée sur la tendance de la période analysée">
          <div className="h-64">
            <div className="h-64">
              <ResponsiveContainer>
                <ComposedChart data={forecast} margin={{ top: 8 }}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} interval={Math.floor(forecast.length / 6)} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                  <Tooltip contentStyle={tip} formatter={(v: number) => [v?.toLocaleString("fr-FR"), ""]} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="actual" name="Réel" stroke="var(--chart-1)" dot={false} strokeWidth={2} connectNulls={false} />
                  <Line type="monotone" dataKey="forecast" name="Prévision" stroke="var(--chart-3)" dot={false} strokeWidth={2} strokeDasharray="5 5" connectNulls={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Section>

        {/* Criticité stations — scatter réel */}
        <Section
          title="Carte criticité stations"
          className="lg:col-span-2"
          description="Load factor × retard moyen · couleur = statut · données réelles (score composite IQR rank)"
        >
          <div className="h-80">
            <ResponsiveContainer>
              <ScatterChart margin={{ left: 16, bottom: 24 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                <XAxis
                  dataKey="x" name="Load factor (%)" type="number"
                  tick={{ fontSize: 11 }} unit="%"
                  label={{ value: "Load factor (%)", position: "insideBottom", offset: -10, fontSize: 11 }}
                />
                <YAxis dataKey="y" name="Retard moyen (min)" type="number" tick={{ fontSize: 11 }} unit=" min" />
                <Tooltip
                  contentStyle={tip}
                  cursor={{ strokeDasharray: "3 3" }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div style={tip} className="text-xs">
                        <p className="font-semibold">{d.name}</p>
                        <p>Load: {d.x?.toFixed(0)}%</p>
                        <p>Retard: {d.y?.toFixed(1)} min</p>
                        <p>Pain: {d.z?.toFixed(0)}</p>
                      </div>
                    );
                  }}
                />
                <Scatter data={clusterData.filter((c) => c.status === "critical")} name="Critique" fill="var(--critical)" fillOpacity={0.75} />
                <Scatter data={clusterData.filter((c) => c.status === "warning")} name="Vigilance" fill="var(--warning)" fillOpacity={0.75} />
                <Scatter data={clusterData.filter((c) => c.status === "success")} name="OK" fill="var(--success)" fillOpacity={0.75} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Saisonnalité */}
        <Section title="Saisonnalité Sèche vs Pluies" description="OTP et pain index selon la saison · données réelles">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={seasonalImpact} margin={{ top: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="saison" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={tip} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="otp" name="OTP (%)" fill="var(--success)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="painIndex" name="Pain Index" fill="var(--warning)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="avgPax" name="Pax moyens" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* OTP par zone */}
        <Section title="OTP et pain index par zone" description="Performance opérationnelle par zone géographique · données réelles">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={zoneDistribution} layout="vertical" margin={{ left: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 100]} />
                <YAxis type="category" dataKey="zone" tick={{ fontSize: 10 }} width={120} />
                <Tooltip contentStyle={tip} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="otp" name="OTP (%)" fill="var(--chart-1)" radius={[0, 6, 6, 0]} />
                <Bar dataKey="painIndex" name="Pain index" fill="var(--chart-4)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>
    </PageShell>
  );
}
