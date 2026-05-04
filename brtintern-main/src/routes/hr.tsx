import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/cockpit/PageShell";
import { Section } from "@/components/cockpit/Section";
import { KpiCard } from "@/components/cockpit/KpiCard";
import { useFilteredData } from "@/lib/use-filtered-data";
import {
  ResponsiveContainer, ScatterChart, Scatter, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, Cell, ReferenceLine,
} from "recharts";

export const Route = createFileRoute("/hr")({ component: HR });

const tip = { backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 };

function HR() {
  const { driverPerf, driverZoneStats } = useFilteredData();

  const totalDrivers = driverZoneStats.reduce((a, z) => a + z.total, 0);
  const totalActifs  = driverZoneStats.reduce((a, z) => a + z.actifs, 0);
  const totalAbsents = driverZoneStats.reduce((a, z) => a + z.absents, 0);
  const absentPct    = totalDrivers > 0 ? (totalAbsents / totalDrivers * 100).toFixed(1) : "0";
  const avgHeures    = driverPerf.length > 0
    ? Math.round(driverPerf.reduce((a, d) => a + d.hours, 0) / driverPerf.length)
    : 0;
  const avgScore     = driverPerf.length > 0
    ? Math.round(driverPerf.reduce((a, d) => a + d.score, 0) / driverPerf.length)
    : 0;

  return (
    <PageShell title="RH & Chauffeurs" subtitle="Performance et allocation ressources humaines — données réelles Excel">

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard
          label="Chauffeurs actifs"
          value={String(totalActifs)}
          delta={`/ ${totalDrivers} total réseau`}
          trend="up"
          status="success"
          icon="Users"
          description="Chauffeurs présents et affectés"
        />
        <KpiCard
          label="Taux d'absentéisme"
          value={`${absentPct}%`}
          delta={`${totalAbsents} absents aujourd'hui`}
          trend={Number(absentPct) > 5 ? "up" : "down"}
          status={Number(absentPct) > 8 ? "critical" : Number(absentPct) > 4 ? "warning" : "success"}
          icon="UserX"
          description="Absences / effectif total"
          target="< 5%"
        />
        <KpiCard
          label="Heures / chauffeur"
          value={`${avgHeures} h`}
          delta="mensuel moyen"
          trend="up"
          status={avgHeures > 150 ? "success" : "warning"}
          icon="Clock"
          description="Temps de conduite mensuel"
        />
        <KpiCard
          label="Score perf moyen"
          value={`${avgScore} / 100`}
          delta={avgScore > 80 ? "objectif 80 atteint" : "sous objectif 80"}
          trend={avgScore > 80 ? "up" : "down"}
          status={avgScore > 80 ? "success" : avgScore > 70 ? "warning" : "critical"}
          icon="Award"
          description="Score composite ponctualité + sécurité"
          target="≥ 80"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Score × Heures */}
        <Section title="Score × Heures" description={`Distribution des ${driverPerf.length} chauffeurs analysés — données réelles`}>
          <div className="h-64">
            <ResponsiveContainer>
              <ScatterChart margin={{ top: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                <XAxis dataKey="hours" name="Heures" tick={{ fontSize: 11 }} unit=" h" />
                <YAxis dataKey="score" name="Score" tick={{ fontSize: 11 }} domain={[60, 100]} />
                <Tooltip
                  contentStyle={tip}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div style={tip} className="text-xs">
                        <p className="font-semibold">{d.driver}</p>
                        <p>Score: {d.score}</p>
                        <p>Heures: {d.hours} h</p>
                      </div>
                    );
                  }}
                />
                <ReferenceLine y={80} stroke="var(--warning)" strokeDasharray="4 4" label={{ value: "Cible 80", position: "right", fontSize: 10 }} />
                <Scatter data={driverPerf} fill="var(--chart-1)" fillOpacity={0.75} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Allocation par zone */}
        <Section title="Allocation & absentéisme par zone" description="Chauffeurs actifs vs absents par zone d'assignation · données réelles Excel">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={driverZoneStats} margin={{ top: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="zone" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={tip} formatter={(v: number, n: string) => [v, n === "actifs" ? "Actifs" : "Absents"]} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="actifs" name="Actifs" fill="var(--success)" radius={[6, 6, 0, 0]} fillOpacity={0.85} />
                <Bar dataKey="absents" name="Absents" fill="var(--critical)" radius={[6, 6, 0, 0]} fillOpacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Taux d'absentéisme par zone */}
        <Section title="Taux d'absentéisme par zone (%)" description="Comparaison inter-zones · seuil critique 10%">
          <div className="h-48">
            <ResponsiveContainer>
              <BarChart data={driverZoneStats} margin={{ top: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="zone" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} unit="%" domain={[0, 30]} />
                <Tooltip contentStyle={tip} formatter={(v: number) => [`${v?.toFixed(1)}%`, "Absentéisme"]} />
                <ReferenceLine y={10} stroke="var(--critical)" strokeDasharray="4 4" label={{ value: "Seuil 10%", position: "right", fontSize: 10 }} />
                <Bar dataKey="absenteisme_pct" name="Absentéisme %" radius={[6, 6, 0, 0]}>
                  {driverZoneStats.map((z) => (
                    <Cell
                      key={z.zone}
                      fill={z.absenteisme_pct > 10 ? "var(--critical)" : z.absenteisme_pct > 5 ? "var(--warning)" : "var(--success)"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Ancienneté par zone */}
        <Section title="Ancienneté moyenne par zone" description="Années d'expérience moyenne des chauffeurs · données réelles">
          <div className="h-48">
            <ResponsiveContainer>
              <BarChart data={driverZoneStats} margin={{ top: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="zone" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} unit=" ans" />
                <Tooltip contentStyle={tip} formatter={(v: number) => [`${v?.toFixed(1)} ans`, "Ancienneté"]} />
                <Bar dataKey="anciennete_moy" name="Ancienneté" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>
    </PageShell>
  );
}
