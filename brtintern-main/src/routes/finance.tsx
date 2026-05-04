import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/cockpit/PageShell";
import { Section } from "@/components/cockpit/Section";
import { KpiCard } from "@/components/cockpit/KpiCard";
import { useFilteredData } from "@/lib/use-filtered-data";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from "recharts";

export const Route = createFileRoute("/finance")({ component: Finance });

const tip = { backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 };

function Finance() {
  const { dailyRevenue, costWaterfall, summary } = useFilteredData();

  const totalRev  = dailyRevenue.reduce((s, d) => s + d.revenue, 0);
  const totalCost = dailyRevenue.reduce((s, d) => s + d.cost,    0);
  const marge     = totalRev - totalCost;
  const opRatio   = totalCost > 0 ? (totalRev / totalCost).toFixed(2) : "—";
  const dailyPax  = summary.daily_pax;
  const coutPax   = summary.cost_per_pax_fcfa;

  return (
    <PageShell title="Finance" subtitle="Suivi rentabilité du réseau — données réelles Excel">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard
          label="Recettes 30j"
          value={`${summary.rev_30_mfcfa.toFixed(1)} M FCFA`}
          delta={marge >= 0 ? `+${marge.toFixed(1)} M marge période` : `${marge.toFixed(1)} M marge`}
          trend={marge >= 0 ? "up" : "down"}
          status={marge >= 0 ? "success" : "warning"}
          icon="Wallet"
          description="Recettes brutes sur la période"
        />
        <KpiCard
          label="Recettes / km"
          value={`${summary.rev_per_km_kfcfa.toFixed(1)} k FCFA`}
          delta={`Coût/km ${summary.cost_per_km_kfcfa.toFixed(1)} k · ratio ${summary.op_ratio.toFixed(2)}x`}
          trend={summary.rev_per_km_kfcfa > summary.cost_per_km_kfcfa ? "up" : "down"}
          status={summary.rev_per_km_kfcfa > summary.cost_per_km_kfcfa ? "success" : "warning"}
          icon="TrendingUp"
          description="Efficience financière par km parcouru"
          target="> coût/km"
        />
        <KpiCard
          label="Passagers / jour"
          value={dailyPax.toLocaleString("fr-FR")}
          delta={`breakeven ${summary.breakeven_pax_day.toLocaleString("fr-FR")} pax/j`}
          trend={dailyPax > summary.breakeven_pax_day ? "up" : "down"}
          status={dailyPax > summary.breakeven_pax_day * 1.5 ? "success" : dailyPax > summary.breakeven_pax_day ? "warning" : "critical"}
          icon="Users"
          description="Seuil de rentabilité journalier"
        />
        <KpiCard
          label="Coût / passager"
          value={`${summary.cost_per_pax_fcfa} FCFA`}
          delta={`tarif moy. ~329 F · 1 zone 400 F · ttes zones 500 F · pax-km ${summary.pax_km_total.toFixed(1)} M`}
          trend={summary.cost_per_pax_fcfa < 329 ? "up" : "down"}
          status={summary.cost_per_pax_fcfa < 280 ? "success" : summary.cost_per_pax_fcfa < 329 ? "warning" : "critical"}
          icon="Coins"
          description="Coût opérationnel par passager"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recettes vs coûts */}
        <Section
          title="Recettes vs coûts journaliers"
          description={`Chaque jour sur ${dailyRevenue.length} jours — si la ligne verte est au-dessus de la rouge, le réseau est rentable`}
          legend={[
            { color: "var(--success)",  label: "Recettes (M FCFA)" },
            { color: "var(--critical)", label: "Coûts (M FCFA)" },
          ]}
          tip="Écart = marge nette. Une courbe rouge qui dépasse le vert = déficit à investiguer."
        >
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={dailyRevenue}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} interval={Math.floor(dailyRevenue.length / 5)} />
                <YAxis tick={{ fontSize: 11 }} unit=" M" />
                <Tooltip contentStyle={tip} formatter={(v: number) => [`${v?.toFixed(1)} M FCFA`]} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="revenue" name="Recettes"  stroke="var(--success)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="cost"    name="Coûts"     stroke="var(--critical)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Waterfall */}
        <Section
          title="Décomposition du résultat"
          description="Chaque barre = un poste financier. Vert = recette, rouge = charge. La dernière barre = résultat net."
          tip="Si la dernière barre est verte et haute → bonne santé financière."
        >
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={costWaterfall}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} unit=" M" />
                <Tooltip contentStyle={tip} formatter={(v: number) => [`${v} M FCFA`]} />
                <ReferenceLine y={0} stroke="var(--border)" />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {costWaterfall.map((d, i) => (
                    <Cell
                      key={i}
                      fill={i === 0
                        ? "var(--chart-1)"
                        : d.value >= 0 ? "var(--success)" : "var(--critical)"}
                      fillOpacity={0.85}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>

      {/* Grille tarifaire SunuBRT */}
      <Section
        title="Grille tarifaire SunuBRT"
        description="Titres de transport en vigueur — source officielle sunubrt.sn"
        tip="Le tarif moyen pondéré (~329 FCFA) tient compte du mix réel : occas. 60% · carnets 25% · abonnés 15%."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TARIFF_GRID.map((t) => (
            <div key={t.label} className="rounded-lg border bg-card p-4 flex flex-col gap-1.5">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{t.category}</span>
                {t.badge && (
                  <span className="rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: t.badgeBg, color: t.badgeColor }}>{t.badge}</span>
                )}
              </div>
              <p className="text-sm font-medium text-foreground leading-snug">{t.label}</p>
              <p className="text-xl font-bold tabular-nums" style={{ color: "var(--brand)" }}>{t.price}</p>
              {t.perTrip && <p className="text-[11px] text-muted-foreground">≈ {t.perTrip} FCFA / trajet</p>}
              {t.note && <p className="text-[10px] text-muted-foreground mt-0.5">{t.note}</p>}
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}

const TARIFF_GRID = [
  { category: "Ticket unitaire", label: "1 zone", price: "400 FCFA", perTrip: null, note: "Petersen ↔ Guédiawaye (1 zone)", badge: null, badgeBg: "", badgeColor: "" },
  { category: "Ticket unitaire", label: "Toutes zones", price: "500 FCFA", perTrip: null, note: "Réseau complet (multi-zones)", badge: null, badgeBg: "", badgeColor: "" },
  { category: "Carnet 10 trajets", label: "1 zone", price: "3 600 FCFA", perTrip: "360", note: "Économie : −10% vs ticket unitaire", badge: "−10%", badgeBg: "var(--success)/15", badgeColor: "var(--success)" },
  { category: "Carnet 10 trajets", label: "Toutes zones", price: "4 500 FCFA", perTrip: "450", note: "Économie : −10% vs ticket unitaire", badge: "−10%", badgeBg: "var(--success)/15", badgeColor: "var(--success)" },
  { category: "Abonnement mensuel", label: "1 zone", price: "17 000 FCFA", perTrip: "283", note: "≈ 60 trajets / mois", badge: "−29%", badgeBg: "var(--brand)/15", badgeColor: "var(--brand)" },
  { category: "Abonnement mensuel", label: "Toutes zones", price: "22 000 FCFA", perTrip: "367", note: "≈ 60 trajets / mois", badge: "−27%", badgeBg: "var(--brand)/15", badgeColor: "var(--brand)" },
  { category: "Pass Jeune (<26 ans)", label: "1 zone", price: "14 000 FCFA", perTrip: "233", note: "≈ 60 trajets / mois", badge: "−42%", badgeBg: "var(--brand-2)/15", badgeColor: "var(--brand-2)" },
  { category: "Pass Jeune (<26 ans)", label: "Toutes zones", price: "18 000 FCFA", perTrip: "300", note: "≈ 60 trajets / mois", badge: "−40%", badgeBg: "var(--brand-2)/15", badgeColor: "var(--brand-2)" },
];
