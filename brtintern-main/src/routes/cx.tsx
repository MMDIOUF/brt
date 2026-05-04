import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/cockpit/PageShell";
import { Section } from "@/components/cockpit/Section";
import { KpiCard } from "@/components/cockpit/KpiCard";
import { useFilteredData } from "@/lib/use-filtered-data";
import {
  ResponsiveContainer, RadialBarChart, RadialBar, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ReferenceLine, Legend, LineChart, Line,
} from "recharts";

export const Route = createFileRoute("/cx")({ component: CX });

const tip = { backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 };

function CX() {
  const { cxMetrics, summary, headwayByHour, stationCriticality } = useFilteredData();

  const satValue = Math.round(summary.satisfaction);
  const satData = [{ name: "Satisfaction", value: satValue, fill: satValue >= 70 ? "var(--success)" : satValue >= 55 ? "var(--warning)" : "var(--critical)" }];

  const waitByStation = stationCriticality.slice(0, 6).map((s) => ({
    station: s.station.split(" / ")[0].split(" ").slice(0, 2).join(" "),
    wait: (s.delay * 0.8 + s.load * 0.03).toFixed(1),
  }));

  return (
    <PageShell title="Expérience Client" subtitle="Perception et confort des passagers — données réelles">

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {cxMetrics.map((m, i) => {
          const icons = ["Clock", "Heart", "AlertTriangle", "Smile"];
          const targets = ["≤ 5 min", "< 30", "< 10%", "≥ 75%"];
          const descs = [
            "Attente moyenne sur passages en retard",
            "Inconfort composite (headway + retard + charge)",
            "Passages en surcharge (> 100% capacité)",
            "Proxy satisfaction (100 − Pain × 0.7)",
          ];
          return (
            <KpiCard
              key={m.id}
              label={m.label}
              value={m.value}
              delta={m.status === "success" ? "objectif atteint" : m.status === "warning" ? "à surveiller" : "sous objectif"}
              trend={m.status === "success" ? "up" : "down"}
              status={m.status as "success" | "warning" | "critical"}
              icon={icons[i] ?? "Smile"}
              description={descs[i]}
              target={targets[i]}
            />
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Satisfaction proxy */}
        <Section title="Satisfaction proxy" description={`Score basé sur pain index + OTP · ${summary.n_days} jours`}>
          <div className="h-64 relative">
            <ResponsiveContainer>
              <RadialBarChart
                data={satData}
                innerRadius="60%"
                outerRadius="100%"
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar dataKey="value" cornerRadius={10} background={{ fill: "var(--muted)" }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-0.5">
              <span className="text-3xl font-bold tabular-nums text-foreground">{satValue}%</span>
              <span className="text-[11px] text-muted-foreground">satisfaction</span>
            </div>
          </div>
        </Section>

        {/* Temps d'attente estimé par station */}
        <Section title="Attente estimée par station" className="lg:col-span-2" description="Retard moyen × load factor · stations les plus critiques">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={waitByStation} margin={{ top: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="station" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} unit=" min" />
                <Tooltip contentStyle={tip} formatter={(v: number) => [`${v} min`, "Attente estimée"]} />
                <ReferenceLine y={5} stroke="var(--warning)" strokeDasharray="4 4" label={{ value: "Seuil 5 min", position: "right", fontSize: 10 }} />
                <Bar dataKey="wait" name="Attente (min)" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Headway moyen — confort de service */}
        <Section
          title="Régularité · headway réseau"
          className="lg:col-span-3"
          description="Intervalle entre bus (min) · B1/B2/B3 · faible headway = meilleure expérience client"
        >
          <div className="h-52">
            <ResponsiveContainer>
              <LineChart data={headwayByHour} margin={{ top: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={2} />
                <YAxis tick={{ fontSize: 11 }} unit=" min" domain={[0, 25]} />
                <Tooltip contentStyle={tip} formatter={(v: number) => [`${v?.toFixed(1)} min`]} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <ReferenceLine y={10} stroke="var(--warning)" strokeDasharray="4 4" label={{ value: "Seuil confort 10 min", position: "right", fontSize: 10 }} />
                <Line type="monotone" dataKey="headway_B1" name="B1 Omnibus" stroke="var(--line-b1)" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="headway_B2" name="B2 Semi-Express" stroke="var(--line-b2)" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="headway_B3" name="B3 Semi-Express" stroke="var(--line-b3)" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>
    </PageShell>
  );
}
