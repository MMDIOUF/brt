import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useFilters } from "@/lib/filter-context";
import { networkScore, lineMetrics } from "@/lib/data";
import { NavIcon, type NavIconType } from "./NavIcon";
import { Filter, Radio } from "lucide-react";
import brt1 from "@/assets/sunubrt/brt1.svg";
import brt2 from "@/assets/sunubrt/brt2.svg";
import brt3 from "@/assets/sunubrt/brt3.svg";

const BUS_IMGS = { B1: brt1, B2: brt2, B3: brt3 } as const;

const items: {
  title: string;
  url: string;
  navIcon: NavIconType;
  group: "Pilotage" | "Réseau" | "Ressources" | "Intelligence";
  hint: string;
}[] = [
  { title: "Vue stratégique",   url: "/",           navIcon: "dashboard",   group: "Pilotage",      hint: "Tableau de bord global" },
  { title: "Opérations",        url: "/operations",  navIcon: "operations",  group: "Pilotage",      hint: "OTP & ponctualité" },
  { title: "Ridership",         url: "/ridership",   navIcon: "ridership",   group: "Pilotage",      hint: "Fréquentation passagers" },
  { title: "Finance",           url: "/finance",     navIcon: "finance",     group: "Pilotage",      hint: "Recettes & coûts" },
  { title: "Stations (23)",     url: "/stations",    navIcon: "stations",    group: "Réseau",        hint: "Performance par arrêt" },
  { title: "Flotte",            url: "/fleet",       navIcon: "fleet",       group: "Réseau",        hint: "144 bus BYD K9" },
  { title: "RH & Chauffeurs",   url: "/hr",          navIcon: "hr",          group: "Ressources",    hint: "Équipes & conducteurs" },
  { title: "Expérience client", url: "/cx",          navIcon: "cx",          group: "Ressources",    hint: "Satisfaction usagers" },
  { title: "Alertes & Risques", url: "/alerts",      navIcon: "alerts",      group: "Intelligence",  hint: "Incidents & actions" },
  { title: "Analytics avancé",  url: "/analytics",   navIcon: "analytics",   group: "Intelligence",  hint: "Prévisions & anomalies" },
];

const groups = ["Pilotage", "Réseau", "Ressources", "Intelligence"] as const;

function scoreTone(s: number) {
  if (s >= 80) return { color: "var(--success)",  label: "Sain",         pct: `${s}%` };
  if (s >= 60) return { color: "var(--warning)",  label: "Surveillance", pct: `${s}%` };
  return             { color: "var(--critical)", label: "Critique",     pct: `${s}%` };
}
function lineStatusColor(status: string) {
  if (status === "critical") return "var(--critical)";
  if (status === "warning")  return "var(--warning)";
  return "var(--success)";
}
const LINE_COLORS = { B1: "#1D9E75", B2: "#E2682A", B3: "#1A6FA4" } as const;

/* ── Logomark SVG SUNU DASHBOARD ─────────────────────────────────────── */
function SunuLogo({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex items-center gap-2.5 px-2 py-3">
      {/* Insigne officiel : bus + tri-couleur */}
      <div className="relative shrink-0 h-9 w-9 overflow-hidden rounded-xl shadow-md">
        <svg viewBox="0 0 36 36" className="h-9 w-9">
          {/* Fond dégradé */}
          <rect width="36" height="36" rx="10" fill="#0D1117"/>
          {/* Barre tri-couleur B1/B2/B3 */}
          <rect x="0"  y="0" width="12" height="4" rx="0" fill="#1D9E75"/>
          <rect x="12" y="0" width="12" height="4" rx="0" fill="#E2682A"/>
          <rect x="24" y="0" width="12" height="4" rx="0" fill="#1A6FA4"/>
          {/* Silhouette bus BRT stylisé */}
          <rect x="5"  y="11" width="26" height="14" rx="4" fill="none" stroke="white" strokeWidth="1.5" opacity="0.9"/>
          {/* Fenêtres */}
          <rect x="8"  y="14" width="5" height="5" rx="1" fill="#1D9E75" opacity="0.85"/>
          <rect x="15" y="14" width="5" height="5" rx="1" fill="#E2682A" opacity="0.85"/>
          <rect x="22" y="14" width="5" height="5" rx="1" fill="#1A6FA4" opacity="0.85"/>
          {/* Roues */}
          <circle cx="11" cy="27" r="3" fill="white" opacity="0.8"/>
          <circle cx="25" cy="27" r="3" fill="white" opacity="0.8"/>
          <circle cx="11" cy="27" r="1.2" fill="#0D1117" opacity="0.7"/>
          <circle cx="25" cy="27" r="1.2" fill="#0D1117" opacity="0.7"/>
          {/* Ligne électrique */}
          <line x1="12" y1="11" x2="12" y2="8" stroke="white" strokeWidth="1" opacity="0.5"/>
          <line x1="24" y1="11" x2="24" y2="8" stroke="white" strokeWidth="1" opacity="0.5"/>
          <line x1="11" y1="8" x2="25" y2="8" stroke="white" strokeWidth="1" opacity="0.5"/>
        </svg>
      </div>

      {!collapsed && (
        <div className="flex flex-col leading-none min-w-0">
          {/* Wordmark SUNU avec accent tri-couleur */}
          <div className="flex items-end gap-1">
            <span
              className="text-[15px] font-extrabold tracking-tight text-foreground"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.01em" }}
            >
              SUNU
            </span>
            {/* Mini tri-color bar sous le nom */}
            <div className="mb-[3px] flex h-[3px] w-8 overflow-hidden rounded-full">
              <div className="flex-1" style={{ backgroundColor: "#1D9E75" }} />
              <div className="flex-1" style={{ backgroundColor: "#E2682A" }} />
              <div className="flex-1" style={{ backgroundColor: "#1A6FA4" }} />
            </div>
          </div>
          <span
            className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70"
          >
            DASHBOARD
          </span>
        </div>
      )}
    </div>
  );
}

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const path      = useRouterState({ select: (r) => r.location.pathname });
  const { ligne, zone, pointe, isFiltered } = useFilters();
  const tone      = scoreTone(networkScore);

  const activeFilterCount = [ligne !== "all", zone !== "all", pointe !== "all"].filter(Boolean).length;

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">

      {/* ── Header ───────────────────────────────────────────────────── */}
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar p-0">
        <SunuLogo collapsed={collapsed} />

        {!collapsed && (
          <div className="px-3 pb-2.5">
            {/* Score réseau */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] uppercase tracking-wider font-semibold text-sidebar-foreground/40">
                Score réseau
              </span>
              <div className="flex items-center gap-1.5">
                {isFiltered && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-brand/15 px-1.5 py-0.5 text-[9px] font-bold text-brand">
                    <Filter className="h-2 w-2" />{activeFilterCount} filtre{activeFilterCount > 1 ? "s" : ""}
                  </span>
                )}
                <span className="text-[9px] font-bold tabular-nums" style={{ color: tone.color }}>
                  {networkScore} · {tone.label}
                </span>
              </div>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-sidebar-foreground/10">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${networkScore}%`, backgroundColor: tone.color }}
              />
            </div>
          </div>
        )}
      </SidebarHeader>

      {/* ── Navigation ───────────────────────────────────────────────── */}
      <SidebarContent className="gap-0 bg-sidebar">
        {groups.map((g) => (
          <SidebarGroup key={g} className="py-0.5">
            {!collapsed && (
              <SidebarGroupLabel className="h-7 px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-sidebar-foreground/35">
                {g}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {items.filter((i) => i.group === g).map((item) => {
                  const active = item.url === "/" ? path === "/" : path.startsWith(item.url);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        tooltip={collapsed ? `${item.title} — ${item.hint}` : item.hint}
                        className="group relative mx-1 h-9 rounded-lg gap-2.5"
                      >
                        <Link to={item.url}>
                          {active && (
                            <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-brand shadow-[0_0_6px_var(--brand)]" />
                          )}
                          {/* Insigne BRT */}
                          <span
                            className={`rounded-md p-0.5 transition-all ${
                              active
                                ? "opacity-100"
                                : "opacity-55 group-hover:opacity-80"
                            }`}
                          >
                            <NavIcon type={item.navIcon} active={active} />
                          </span>
                          <span
                            className={`text-xs transition-colors ${
                              active
                                ? "font-semibold text-sidebar-foreground"
                                : "text-sidebar-foreground/65 group-hover:text-sidebar-foreground/90"
                            }`}
                          >
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* ── Footer — statut live par ligne ───────────────────────────── */}
      <SidebarFooter className="border-t border-sidebar-border bg-sidebar">
        {!collapsed ? (
          <div className="px-3 py-2.5 space-y-1.5">
            {/* Titre */}
            <p className="text-[9px] uppercase tracking-[0.18em] font-bold text-sidebar-foreground/35 mb-2">
              Statut lignes · live
            </p>
            {(["B1", "B2", "B3"] as const).map((id) => {
              const m  = lineMetrics[id];
              const sc = lineStatusColor(m.status);
              return (
                <div key={id} className="group cursor-default">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Insigne officiel + image bus */}
                      <div className="relative flex items-center">
                        <span
                          className="flex h-5 w-7 items-center justify-center rounded text-[9px] font-extrabold text-white shadow-sm shrink-0"
                          style={{ backgroundColor: LINE_COLORS[id] }}
                        >
                          {id}
                        </span>
                        {/* Image bus petite */}
                        <img
                          src={BUS_IMGS[id]}
                          alt={`Bus ${id}`}
                          className="ml-1 h-4 w-8 object-contain opacity-70"
                        />
                      </div>
                      <span className="relative flex h-1.5 w-1.5 shrink-0">
                        <span className="absolute inset-0 animate-ping rounded-full opacity-50"
                          style={{ backgroundColor: sc }} />
                        <span className="relative h-1.5 w-1.5 rounded-full" style={{ backgroundColor: sc }} />
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] text-sidebar-foreground/45 tabular-nums">
                        OTP {m.otp_pct.toFixed(0)}%
                      </span>
                      <div className="h-1 w-10 overflow-hidden rounded-full bg-sidebar-foreground/10">
                        <div className="h-full rounded-full transition-all"
                          style={{ width: `${m.otp_pct}%`, backgroundColor: sc }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex items-center gap-1.5 pt-1 text-[9px] text-sidebar-foreground/35">
              <Radio className="h-2.5 w-2.5 text-success" />
              <span>18,3 km · 23 stations · Dakar</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 px-2 py-2.5">
            {/* Mini tri-color bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full">
              <div className="flex h-full">
                <div className="flex-1" style={{ backgroundColor: "#1D9E75" }} />
                <div className="flex-1" style={{ backgroundColor: "#E2682A" }} />
                <div className="flex-1" style={{ backgroundColor: "#1A6FA4" }} />
              </div>
            </div>
            {/* Score dot */}
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tone.color }}
              title={`Score réseau ${networkScore} · ${tone.label}`} />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
