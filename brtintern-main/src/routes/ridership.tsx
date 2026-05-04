import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/cockpit/PageShell";
import { Section } from "@/components/cockpit/Section";
import { KpiCard } from "@/components/cockpit/KpiCard";
import { Heatmap } from "@/components/cockpit/Heatmap";
import { useFilteredData } from "@/lib/use-filtered-data";
import {
  ResponsiveContainer, BarChart, Bar, AreaChart, Area, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ReferenceLine,
} from "recharts";

export const Route = createFileRoute("/ridership")({ component: Ridership });

const tip = { backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 };

function Ridership() {
  const {
    ridershipByHour, ridershipByStation, loadFactorDist,
    corridorProfile, zoneDistribution, seasonalImpact, summary,
  } = useFilteredData();

  const totalPax = ridershipByStation.reduce((s, r) => s + r.passengers, 0);
  const avgLoad = summary.load_pct;

  return (
    <PageShell title="Ridership & Usage" subtitle="Comprendre la demande passagers — données réelles Excel">

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard
          label="Passagers / jour"
          value={summary.daily_pax.toLocaleString("fr-FR")}
          delta={`${summary.total_pax.toLocaleString("fr-FR")} total · ${summary.n_days}j`}
          trend={summary.daily_pax > 15000 ? "up" : "down"}
          status={summary.daily_pax > 20000 ? "success" : summary.daily_pax > 10000 ? "warning" : "critical"}
          icon="Users"
          description="Montées quotidiennes moyennes"
          target="≥ 80 000"
        />
        <KpiCard
          label="Load factor global"
          value={`${avgLoad.toFixed(1)}%`}
          delta={`Pointe ${summary.peak_load_pct.toFixed(1)}% · HP ${summary.offpeak_load_pct.toFixed(1)}%`}
          trend={avgLoad > 85 ? "up" : "down"}
          status={avgLoad > 100 ? "critical" : avgLoad > 75 ? "warning" : "success"}
          icon="Gauge"
          description="Taux de remplissage moyen réseau"
          target="70–90%"
        />
        <KpiCard
          label="Charge pointe"
          value={`${summary.peak_load_pct.toFixed(1)}%`}
          delta="6–10h et 16–20h"
          trend={summary.peak_load_pct > 90 ? "up" : "down"}
          status={summary.peak_load_pct > 100 ? "critical" : summary.peak_load_pct > 80 ? "warning" : "success"}
          icon="TrendingUp"
          description="Load factor aux heures de pointe"
          target="70–90%"
        />
        <KpiCard
          label="Pax-km total"
          value={`${summary.pax_km_total.toFixed(1)} M`}
          delta={`top-15 stations : ${totalPax.toLocaleString("fr-FR")} pax`}
          trend="up"
          status="success"
          icon="MapPin"
          description="Passagers × distance parcourue"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Passagers par heure */}
        <Section
          title="Passagers par heure de la journée"
          description="Nombre moyen de voyageurs embarqués à chaque heure. Les deux pics = heures de pointe BRT."
          legend={[{ color: "var(--chart-1)", label: "Passagers / heure (k = milliers)" }]}
          tip="Pointe matin 7h–10h et pointe soir 16h–20h. Le creux de midi = heures creuses normales."
        >
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={ridershipByHour} margin={{ top: 8 }}>
                <defs>
                  <linearGradient id="gP" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                <Tooltip contentStyle={tip} formatter={(v: number) => [v.toLocaleString("fr-FR"), "Passagers"]} />
                <Area type="monotone" dataKey="passengers" name="Passagers" stroke="var(--chart-1)" fill="url(#gP)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Load factor distribution */}
        <Section title="Distribution load factor" description="Répartition du taux de remplissage (BYD K9, 90 sièges)">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={loadFactorDist} margin={{ top: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={tip} formatter={(v: number) => [v, "Observations"]} />
                <ReferenceLine x="80-100%" stroke="var(--warning)" strokeDasharray="4 4" />
                <Bar dataKey="buses" name="Observations" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Top stations */}
        <Section title="Passagers par station" className="lg:col-span-2" description={`Top ${Math.min(ridershipByStation.length, 12)} stations par volume de montées`}>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={ridershipByStation.slice(0, 12)} layout="vertical" margin={{ left: 24 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                <YAxis type="category" dataKey="station" tick={{ fontSize: 10 }} width={140} />
                <Tooltip contentStyle={tip} formatter={(v: number) => [v.toLocaleString("fr-FR"), "Passagers"]} />
                <Bar dataKey="passengers" name="Passagers" fill="var(--chart-1)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Heatmap trafic */}
        <Section title="Heatmap trafic · Station × Heure" className="lg:col-span-2">
          <Heatmap />
        </Section>

        {/* Profil corridor */}
        <Section
          title="Profil corridor — Montées vs Descentes"
          className="lg:col-span-2"
          description="Flux cumulés le long du corridor Petersen ↔ Guédiawaye · données réelles"
        >
          <div className="h-72">
            <ResponsiveContainer>
              <ComposedChart data={corridorProfile} margin={{ left: 16 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="station" tick={{ fontSize: 9 }} angle={-30} textAnchor="end" height={50} interval={0} />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 130]} tick={{ fontSize: 11 }} unit="%" />
                <Tooltip contentStyle={tip} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar yAxisId="left" dataKey="boardings" name="Montées" fill="var(--chart-1)" fillOpacity={0.85} />
                <Bar yAxisId="left" dataKey="alightings" name="Descentes" fill="var(--chart-2)" fillOpacity={0.85} />
                <Line yAxisId="right" type="monotone" dataKey="load" name="Load %" stroke="var(--critical)" dot={false} strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Distribution par zone */}
        <Section title="Fréquentation par zone" description="Montées cumulées et OTP par zone géographique · données réelles">
          <div className="h-64">
            <ResponsiveContainer>
              <ComposedChart data={zoneDistribution} layout="vertical" margin={{ left: 16 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="zone" tick={{ fontSize: 11 }} width={110} />
                <Tooltip contentStyle={tip} formatter={(v: number, n: string) => [n === "passengers" ? v.toLocaleString("fr-FR") : `${v}%`, n === "passengers" ? "Passagers" : "OTP"]} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="passengers" name="Passagers" fill="var(--chart-1)" radius={[0, 6, 6, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Impact saisonnalité */}
        <Section title="Impact saisonnalité" description="Saison sèche vs saison des pluies · OTP et pain index · données réelles">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={seasonalImpact} margin={{ top: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="saison" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={tip} formatter={(v: number, n: string) => [n === "otp" ? `${v}%` : String(v), n === "otp" ? "OTP" : n === "painIndex" ? "Pain Index" : "Pax moy."]} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="otp" name="OTP (%)" fill="var(--success)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="painIndex" name="Pain Index" fill="var(--warning)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>
    </PageShell>
  );
}
