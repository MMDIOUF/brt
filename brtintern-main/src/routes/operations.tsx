import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/cockpit/PageShell";
import { Section } from "@/components/cockpit/Section";
import { KpiCard } from "@/components/cockpit/KpiCard";
import { useFilteredData } from "@/lib/use-filtered-data";
import { LINE_COLORS, type LineId } from "@/lib/data";
import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ReferenceLine,
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/operations")({ component: Operations });

const tip = { backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 };

function statusColor(s: string) {
  if (s === "critical") return "bg-critical/10 text-critical border-critical/30";
  if (s === "warning")  return "bg-warning/10 text-warning border-warning/30";
  return "bg-success/10 text-success border-success/30";
}

function Operations() {
  const {
    linePerformance, delayDistribution, speedData,
    headwayByHour, stationCriticality, summary,
  } = useFilteredData();

  const avgDelay = linePerformance.length
    ? (linePerformance.reduce((s, l) => s + l.delay, 0) / linePerformance.length).toFixed(1)
    : "—";
  const avgOtp = linePerformance.length
    ? Math.round(linePerformance.reduce((s, l) => s + l.otp, 0) / linePerformance.length)
    : 0;
  const critStations = stationCriticality.filter((s) => s.status === "critical").length;

  return (
    <PageShell title="Opérations" subtitle="Performance opérationnelle du réseau — données réelles Excel">

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard
          label="OTP réseau"
          value={`${summary.otp_pct.toFixed(1)}%`}
          delta={summary.otp_pct >= 85 ? "cible 88% atteinte" : "sous cible 88%"}
          trend={summary.otp_pct >= 85 ? "up" : "down"}
          status={summary.otp_pct >= 90 ? "success" : summary.otp_pct >= 80 ? "warning" : "critical"}
          icon="Timer"
          description="% passages ≤ 5 min de retard"
        />
        <KpiCard
          label="Régularité headway"
          value={`${summary.headway_reg_pct.toFixed(1)}%`}
          delta={`Headway médian ${summary.headway_median_min.toFixed(1)} min · cible 6 min`}
          trend={summary.headway_reg_pct >= 80 ? "up" : "down"}
          status={summary.headway_reg_pct >= 80 ? "success" : summary.headway_reg_pct >= 65 ? "warning" : "critical"}
          icon="Activity"
          description="Intervalles dans ±30% de la cible"
        />
        <KpiCard
          label="Retard moyen"
          value={`${avgDelay} min`}
          delta={`p95 : ${summary.delay_p95_min.toFixed(1)} min`}
          trend={Number(avgDelay) <= 5 ? "down" : "up"}
          status={Number(avgDelay) <= 3 ? "success" : Number(avgDelay) <= 5 ? "warning" : "critical"}
          icon="Clock"
          description="Retard moyen sur passages en retard"
        />
        <KpiCard
          label="Stations critiques"
          value={String(critStations)}
          delta={`/ ${stationCriticality.length} évaluées`}
          trend={critStations > 2 ? "up" : "down"}
          status={critStations === 0 ? "success" : critStations <= 3 ? "warning" : "critical"}
          icon="AlertTriangle"
          description="Score criticité > 75"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* OTP par ligne */}
        <Section
          title="Ponctualité par ligne (OTP)"
          description="OTP = % de passages arrivés à l'heure (≤5 min de retard). Chaque barre = une ligne BRT."
          tip="Barre au-dessus du trait orange = ligne dans les objectifs. En dessous = retards excessifs à traiter."
        >
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={linePerformance} margin={{ top: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="line" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                <Tooltip contentStyle={tip} formatter={(v: number) => [`${v}%`, "OTP"]} />
                <ReferenceLine y={88} stroke="var(--warning)" strokeDasharray="4 4" label={{ value: "Cible 88%", position: "right", fontSize: 10, fill: "var(--warning)" }} />
                <Bar dataKey="otp" name="OTP" radius={[6, 6, 0, 0]}>
                  {linePerformance.map((d) => (
                    <Cell key={d.line} fill={LINE_COLORS[d.line as LineId] ?? "var(--chart-1)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Distribution retards */}
        <Section
          title="Répartition des retards"
          description="Combien de passages ont eu tel retard (en minutes). La grande barre à gauche = la plupart arrivent à l'heure."
          tip="Idéal : pic fort sur '0–2 min'. Barres hautes sur '5+ min' = problème opérationnel."
        >
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={delayDistribution} margin={{ top: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="bucket" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={tip} formatter={(v: number) => [v, "Passages"]} />
                <Bar dataKey="count" name="Passages" fill="var(--brand-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Vitesse réelle vs théorique */}
        <Section title="Vitesse réelle vs théorique" description="km/h moyen par ligne">
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={speedData} margin={{ top: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="line" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} unit=" km/h" />
                <Tooltip contentStyle={tip} formatter={(v: number, n: string) => [`${v} km/h`, n]} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="theoretical" name="Théorique" fill="var(--muted-foreground)" fillOpacity={0.35} radius={[6, 6, 0, 0]} />
                <Bar dataKey="actual" name="Réel" radius={[6, 6, 0, 0]}>
                  {speedData.map((d) => (
                    <Cell key={d.line} fill={LINE_COLORS[d.line as LineId] ?? "var(--chart-1)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Headway par heure */}
        <Section title="Headway moyen par heure" description="Intervalle entre bus (min) · cible 6 min · données réelles Excel">
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={headwayByHour} margin={{ top: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={2} />
                <YAxis tick={{ fontSize: 11 }} unit=" min" domain={[0, 30]} />
                <Tooltip contentStyle={tip} formatter={(v: number) => [`${v?.toFixed(1)} min`]} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <ReferenceLine y={6} stroke="var(--muted-foreground)" strokeDasharray="4 4"
                  label={{ value: "Cible 6 min", position: "right", fontSize: 10 }} />
                <Line type="monotone" dataKey="headway_B1" name="B1" stroke={LINE_COLORS.B1} dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="headway_B2" name="B2" stroke={LINE_COLORS.B2} dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="headway_B3" name="B3" stroke={LINE_COLORS.B3} dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>

      {/* Classement lignes */}
      <Section title="Classement des lignes" description="Performance globale — données réelles Excel">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ligne</TableHead>
              <TableHead className="text-right">OTP</TableHead>
              <TableHead className="text-right">Retard moy.</TableHead>
              <TableHead className="text-right">Pain Index</TableHead>
              <TableHead className="text-right">Load factor</TableHead>
              <TableHead className="text-right">Passagers/j</TableHead>
              <TableHead className="text-right">Vitesse</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {linePerformance.map((l) => (
              <TableRow key={l.line}>
                <TableCell>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: LINE_COLORS[l.line as LineId] ?? "var(--chart-1)" }} />
                    <span className="font-semibold">{l.line}</span>
                    <span className="text-[10px] text-muted-foreground">{l.type}</span>
                  </span>
                </TableCell>
                <TableCell className="text-right tabular-nums font-medium">{l.otp}%</TableCell>
                <TableCell className="text-right tabular-nums">{l.delay} min</TableCell>
                <TableCell className="text-right tabular-nums">
                  <span className={l.pain_index != null && l.pain_index > 50 ? "text-critical" : l.pain_index != null && l.pain_index > 30 ? "text-warning" : "text-success"}>
                    {l.pain_index?.toFixed(0) ?? "—"}
                  </span>
                </TableCell>
                <TableCell className="text-right tabular-nums">{l.load_pct?.toFixed(0) ?? "—"}%</TableCell>
                <TableCell className="text-right tabular-nums">{l.ridership.toLocaleString("fr-FR")}</TableCell>
                <TableCell className="text-right tabular-nums">{l.speed?.toFixed(1) ?? "—"} km/h</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColor(l.status)}>
                    {l.status === "success" ? "OK" : l.status === "warning" ? "Vigilance" : "Critique"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      {/* Criticité stations */}
      <Section title="Stations à risque" description="Score composite: charge × retard × pain index (données réelles)">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Station</TableHead>
                <TableHead className="text-right">Score criticité</TableHead>
                <TableHead className="text-right">Load factor</TableHead>
                <TableHead className="text-right">Retard moy.</TableHead>
                <TableHead className="text-right">Pain index</TableHead>
                <TableHead>Niveau</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stationCriticality.slice(0, 8).map((s, i) => (
                <TableRow key={s.station}>
                  <TableCell className="text-muted-foreground text-sm">{i + 1}</TableCell>
                  <TableCell className="font-medium max-w-[160px] truncate">{s.station}</TableCell>
                  <TableCell className="text-right tabular-nums font-bold">{s.criticality.toFixed(0)}</TableCell>
                  <TableCell className="text-right tabular-nums">{s.load.toFixed(0)}%</TableCell>
                  <TableCell className="text-right tabular-nums">{s.delay.toFixed(1)} min</TableCell>
                  <TableCell className="text-right tabular-nums">{s.painIndex.toFixed(0)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColor(s.status)}>
                      {s.status === "critical" ? "Critique" : s.status === "warning" ? "Vigilance" : "OK"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>
    </PageShell>
  );
}
