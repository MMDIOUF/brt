import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select, SelectContent, SelectItem, SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar, X, Activity, Bus, Clock, MapPin, Zap } from "lucide-react";
import { useFilters, type Ligne, type Zone, type Periode, type Pointe } from "@/lib/filter-context";
import { networkScore } from "@/lib/data";
import { FreshnessBadge } from "./FreshnessBadge";
import brt1 from "@/assets/sunubrt/brt1.svg";
import brt2 from "@/assets/sunubrt/brt2.svg";
import brt3 from "@/assets/sunubrt/brt3.svg";

const LINE_META = {
  B1: { color: "#1D9E75", bgLight: "#1D9E7514", label: "Omnibus",      stops: "23 stations · 6h–21h",    img: brt1 },
  B2: { color: "#E2682A", bgLight: "#E2682A14", label: "Semi-Express", stops: "7 stations · Lun–Sam",    img: brt2 },
  B3: { color: "#1A6FA4", bgLight: "#1A6FA414", label: "Semi-Express", stops: "7 stations · Pointe",     img: brt3 },
} as const;

/* ── Insigne officiel BRT (badge coloré avec lettre) ── */
function LineInsigne({ id, size = "sm" }: { id: "B1"|"B2"|"B3"; size?: "sm"|"md" }) {
  const m = LINE_META[id];
  const dim = size === "md" ? "h-5 w-7 text-[10px]" : "h-4 w-6 text-[9px]";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded font-black text-white shadow-sm ${dim}`}
      style={{ backgroundColor: m.color }}
    >
      {id}
    </span>
  );
}

function scoreTone(s: number): { dot: string; label: string; cls: string } {
  if (s >= 80) return { dot: "var(--success)",  label: "Sain",         cls: "text-success"  };
  if (s >= 60) return { dot: "var(--warning)",  label: "Surveillance", cls: "text-warning"  };
  return             { dot: "var(--critical)", label: "Critique",     cls: "text-critical" };
}

/* ── Affichage du sélecteur de ligne dans le trigger ── */
function LineSelectDisplay({ ligne }: { ligne: Ligne }) {
  if (ligne === "all") return <span className="text-xs text-muted-foreground">Toutes lignes</span>;
  const m = LINE_META[ligne as "B1"|"B2"|"B3"];
  return (
    <span className="flex items-center gap-1.5">
      <LineInsigne id={ligne as "B1"|"B2"|"B3"} />
      <span className="text-xs font-medium" style={{ color: m.color }}>{m.label}</span>
    </span>
  );
}

export function AppHeader() {
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
  const tone = scoreTone(networkScore);
  const { ligne, zone, periode, pointe, setLigne, setZone, setPeriode, setPointe, reset, isFiltered } = useFilters();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-background/80 px-3 backdrop-blur-xl">
      <SidebarTrigger className="text-foreground/60 hover:text-foreground transition-colors" />
      <Separator orientation="vertical" className="h-5 opacity-50" />

      {/* Date — desktop only */}
      <div className="hidden items-center gap-1.5 text-xs text-muted-foreground md:flex">
        <Calendar className="h-3 w-3" />
        <span className="capitalize">{today}</span>
      </div>

      <div className="ml-auto flex items-center gap-1.5">

        {/* ── Ligne : insigne BRT + image bus ── */}
        <Select value={ligne} onValueChange={(v) => setLigne(v as Ligne)}>
          <SelectTrigger
            className="h-8 w-[136px] border-border bg-card/70 shadow-none transition-all focus:ring-1 focus:ring-brand/40"
            style={ligne !== "all" ? {
              borderColor: LINE_META[ligne as "B1"|"B2"|"B3"].color,
              backgroundColor: LINE_META[ligne as "B1"|"B2"|"B3"].bgLight,
            } : undefined}
          >
            <LineSelectDisplay ligne={ligne} />
          </SelectTrigger>
          <SelectContent className="w-64">
            {/* Option toutes lignes */}
            <SelectItem value="all" className="text-xs py-2">
              <span className="flex items-center gap-2.5">
                <span className="flex h-4 w-6 overflow-hidden rounded">
                  <span className="flex-1" style={{ backgroundColor: "#1D9E75" }} />
                  <span className="flex-1" style={{ backgroundColor: "#E2682A" }} />
                  <span className="flex-1" style={{ backgroundColor: "#1A6FA4" }} />
                </span>
                <span className="font-medium">Toutes les lignes</span>
              </span>
            </SelectItem>

            {/* B1, B2, B3 avec image bus officielle */}
            {(["B1","B2","B3"] as const).map((id) => {
              const m = LINE_META[id];
              return (
                <SelectItem key={id} value={id} className="py-2">
                  <span className="flex items-center gap-3 w-full">
                    {/* Image bus officielle */}
                    <img
                      src={m.img}
                      alt={`Bus ${id}`}
                      className="h-7 w-14 shrink-0 object-contain"
                      style={{ filter: `drop-shadow(0 1px 2px ${m.color}40)` }}
                    />
                    <span className="flex flex-col min-w-0">
                      <span className="flex items-center gap-1.5">
                        <LineInsigne id={id} size="md" />
                        <span className="text-xs font-semibold text-foreground">{m.label}</span>
                      </span>
                      <span className="text-[10px] text-muted-foreground mt-0.5">{m.stops}</span>
                    </span>
                  </span>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        {/* ── Zone ── */}
        <Select value={zone} onValueChange={(v) => setZone(v as Zone)}>
          <SelectTrigger className="h-8 w-[96px] border-border bg-card/70 text-xs font-medium shadow-none">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 shrink-0 text-muted-foreground" />
              <span className="truncate">{zone === "all" ? "Zone" : zone}</span>
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">
              <span className="flex items-center gap-2"><MapPin className="h-3 w-3 text-muted-foreground" />Toutes zones</span>
            </SelectItem>
            <SelectItem value="Nord" className="text-xs">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1D9E75]" />Nord · Guédiawaye
              </span>
            </SelectItem>
            <SelectItem value="Centre" className="text-xs">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#E2682A]" />Centre · Parcelles
              </span>
            </SelectItem>
            <SelectItem value="Sud" className="text-xs">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1A6FA4]" />Sud · Dakar Centre
              </span>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* ── Période ── */}
        <Select value={periode} onValueChange={(v) => setPeriode(v as Periode)}>
          <SelectTrigger className="h-8 w-[108px] border-border bg-card/70 text-xs font-medium shadow-none">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3 shrink-0 text-muted-foreground" />
              <span>{periode === "day" ? "7 jours" : periode === "week" ? "14 jours" : "30 jours"}</span>
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day"   className="text-xs">
              <span className="flex items-center gap-2"><Clock className="h-3 w-3 text-muted-foreground" />7 derniers jours</span>
            </SelectItem>
            <SelectItem value="week"  className="text-xs">
              <span className="flex items-center gap-2"><Clock className="h-3 w-3 text-muted-foreground" />14 derniers jours</span>
            </SelectItem>
            <SelectItem value="month" className="text-xs">
              <span className="flex items-center gap-2"><Clock className="h-3 w-3 text-muted-foreground" />30 derniers jours</span>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* ── Pointe ── */}
        <Select value={pointe} onValueChange={(v) => setPointe(v as Pointe)}>
          <SelectTrigger className="h-8 w-[108px] border-border bg-card/70 text-xs font-medium shadow-none">
            <span className="flex items-center gap-1.5">
              <Zap className="h-3 w-3 shrink-0 text-muted-foreground" />
              <span className="truncate">
                {pointe === "all" ? "Horaire" : pointe === "peak" ? "Pointe" : "Hors pointe"}
              </span>
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all"  className="text-xs">
              <span className="flex items-center gap-2"><Zap className="h-3 w-3 text-muted-foreground" />Tout horaire</span>
            </SelectItem>
            <SelectItem value="peak" className="text-xs">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#C8102E]" />Heure de pointe · 6h–10h / 16h–20h
              </span>
            </SelectItem>
            <SelectItem value="off"  className="text-xs">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1A6FA4]" />Hors pointe · creux
              </span>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* ── Reset filters ── */}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            className="h-8 w-8 shrink-0 p-0 text-muted-foreground transition-colors hover:bg-critical/10 hover:text-critical"
            title="Réinitialiser tous les filtres"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        )}

        <Separator orientation="vertical" className="h-5 opacity-40" />

        {/* ── Score réseau live ── */}
        <div
          className="flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 shadow-sm cursor-help"
          title={`Score réseau global · ${tone.label} · cible ≥ 80`}
        >
          <span className="relative inline-flex h-2 w-2 shrink-0">
            <span className="absolute inset-0 rounded-full live-dot" style={{ backgroundColor: tone.dot }} />
            <span className="relative h-2 w-2 rounded-full" style={{ backgroundColor: tone.dot }} />
          </span>
          <Activity className="h-3 w-3 text-muted-foreground" />
          <span className="text-[11px] font-semibold text-foreground/85 tabular-nums">
            {networkScore}<span className="text-[9px] text-muted-foreground">/100</span>
          </span>
          <span className={`hidden text-[10px] font-semibold lg:block ${tone.cls}`}>
            {tone.label}
          </span>
        </div>

        {/* ── Freshness badge ── */}
        <FreshnessBadge />
      </div>
    </header>
  );
}
