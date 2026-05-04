import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/cockpit/PageShell";
import { Section } from "@/components/cockpit/Section";
import { AlertItem } from "@/components/cockpit/AlertItem";
import { KpiCard } from "@/components/cockpit/KpiCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFilteredData } from "@/lib/use-filtered-data";

export const Route = createFileRoute("/alerts")({ component: AlertsPage });

type Severity = "critical" | "warning" | "info";
type AlertType = "operation" | "fleet" | "finance" | "hr";

const types: { id: AlertType | "all"; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "operation", label: "Opération" },
  { id: "fleet", label: "Flotte" },
  { id: "finance", label: "Finance" },
  { id: "hr", label: "RH" },
];

function guessType(page: string): AlertType {
  if (page.includes("fleet")) return "fleet";
  if (page.includes("finance")) return "finance";
  if (page.includes("hr")) return "hr";
  return "operation";
}

function AlertsPage() {
  const { alerts } = useFilteredData();
  const [filter, setFilter] = useState<AlertType | "all">("all");

  const typedAlerts = alerts.map((a) => ({ ...a, type: guessType(a.page) }));
  const filtered = filter === "all" ? typedAlerts : typedAlerts.filter((a) => a.type === filter);

  const counts = {
    critical: typedAlerts.filter((a) => a.severity === "critical").length,
    warning:  typedAlerts.filter((a) => a.severity === "warning").length,
    info:     typedAlerts.filter((a) => a.severity === "info").length,
  };

  return (
    <PageShell title="Alerts & Risk Center" subtitle="Centralisation et priorisation des risques — données réelles">

      <div className="grid grid-cols-3 gap-3">
        <KpiCard
          label="Alertes critiques"
          value={String(counts.critical)}
          delta={counts.critical > 0 ? "action immédiate" : "aucune"}
          trend={counts.critical > 0 ? "up" : "down"}
          status={counts.critical > 0 ? "critical" : "success"}
          icon="AlertOctagon"
        />
        <KpiCard
          label="Surveillance"
          value={String(counts.warning)}
          delta={counts.warning > 3 ? "pic d'alertes" : "niveau normal"}
          trend={counts.warning > 3 ? "up" : "down"}
          status={counts.warning > 5 ? "warning" : "success"}
          icon="AlertTriangle"
        />
        <KpiCard
          label="Informations"
          value={String(counts.info)}
          delta="à traiter sous 48h"
          trend="down"
          status="success"
          icon="Info"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {types.map((t) => (
          <Button
            key={t.id}
            size="sm"
            variant={filter === t.id ? "default" : "outline"}
            onClick={() => setFilter(t.id)}
            className="h-8"
          >
            {t.label}
          </Button>
        ))}
        <Badge variant="outline" className="ml-auto">
          {filtered.length} alerte{filtered.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <Section
        title="Alertes actives"
        description="Priorisées par sévérité · cliquer pour accéder à la section concernée"
      >
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Aucune alerte pour ce filtre.
            </p>
          ) : (
            filtered.map((a) => <AlertItem key={a.id} {...a} />)
          )}
        </div>
      </Section>
    </PageShell>
  );
}
