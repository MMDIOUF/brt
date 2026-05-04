/**
 * NavIcon — Insignes visuels BRT pour la navigation
 * Inspirés de la signalétique officielle SunuBRT / Dakar Mobilité
 * Palette officielle : B1=#1D9E75 · B2=#E2682A · B3=#1A6FA4 · Rouge=#C8102E
 */

const B1 = "#1D9E75";
const B2 = "#E2682A";
const B3 = "#1A6FA4";
const RD = "#C8102E";

export type NavIconType =
  | "dashboard" | "operations" | "ridership" | "finance"
  | "stations"  | "fleet"      | "hr"        | "cx"
  | "alerts"    | "analytics";

export function NavIcon({ type, active }: { type: NavIconType; active?: boolean }) {
  const op = active ? 1 : 0.75;
  return (
    <span className="flex h-4 w-4 shrink-0 items-center justify-center">
      {icons[type](op)}
    </span>
  );
}

const icons: Record<NavIconType, (op: number) => React.ReactNode> = {

  /* ── Vue stratégique : 3 barres tricolores = réseau au complet ─────── */
  dashboard: (op) => (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      {/* Fond carte */}
      <rect x="1" y="1" width="18" height="18" rx="3" fill="currentColor" opacity={0.06}/>
      {/* Barre tri-couleur top */}
      <rect x="1" y="1" width="6"  height="2" rx="0.5" fill={B1} opacity={op}/>
      <rect x="7" y="1" width="6"  height="2" rx="0.5" fill={B2} opacity={op}/>
      <rect x="13" y="1" width="6" height="2" rx="0.5" fill={B3} opacity={op}/>
      {/* 3 colonnes KPI */}
      <rect x="2"  y="11" width="4" height="7" rx="1" fill={B1} opacity={op * 0.9}/>
      <rect x="8"  y="8"  width="4" height="10" rx="1" fill={B2} opacity={op * 0.9}/>
      <rect x="14" y="5"  width="4" height="13" rx="1" fill={B3} opacity={op * 0.9}/>
    </svg>
  ),

  /* ── Opérations : horloge + route BRT ──────────────────────────────── */
  operations: (op) => (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      {/* Cercle horloge */}
      <circle cx="10" cy="9" r="7" stroke={B1} strokeWidth="1.5" opacity={op}/>
      {/* Aiguilles */}
      <line x1="10" y1="9" x2="10" y2="4.5" stroke={B1} strokeWidth="1.5" strokeLinecap="round" opacity={op}/>
      <line x1="10" y1="9" x2="13" y2="10"   stroke={B1} strokeWidth="1.5" strokeLinecap="round" opacity={op}/>
      {/* Indicateur retard */}
      <circle cx="10" cy="9" r="1" fill={B1} opacity={op}/>
      {/* Barre route */}
      <rect x="2" y="17.5" width="16" height="1" rx="0.5" fill={B1} opacity={op * 0.5}/>
      {/* Points stations */}
      <circle cx="4"  cy="18" r="1" fill={B1} opacity={op}/>
      <circle cx="10" cy="18" r="1" fill={B2} opacity={op}/>
      <circle cx="16" cy="18" r="1" fill={B3} opacity={op}/>
    </svg>
  ),

  /* ── Ridership : passagers montant dans le bus ───────────────────────── */
  ridership: (op) => (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      {/* 3 silhouettes passagers */}
      <circle cx="4"  cy="5" r="2" fill={B1} opacity={op}/>
      <circle cx="10" cy="5" r="2" fill={B2} opacity={op}/>
      <circle cx="16" cy="5" r="2" fill={B3} opacity={op}/>
      {/* Corps */}
      <path d="M2 14c0-2 1-4 2-4s2 2 2 4" fill={B1} opacity={op * 0.9}/>
      <path d="M8 14c0-2 1-4 2-4s2 2 2 4" fill={B2} opacity={op * 0.9}/>
      <path d="M14 14c0-2 1-4 2-4s2 2 2 4" fill={B3} opacity={op * 0.9}/>
      {/* Plancher bus */}
      <rect x="1" y="14" width="18" height="2" rx="1" fill={B1} opacity={op * 0.4}/>
      {/* Flèche montée */}
      <path d="M10 18V16M9 17l1-1 1 1" stroke={B1} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity={op}/>
    </svg>
  ),

  /* ── Finance : pièce FCFA + flèche revenue ──────────────────────────── */
  finance: (op) => (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      {/* Pièce */}
      <circle cx="9" cy="11" r="7" stroke={B2} strokeWidth="1.5" opacity={op}/>
      <circle cx="9" cy="11" r="4" stroke={B2} strokeWidth="1"   opacity={op * 0.5}/>
      {/* F de FCFA */}
      <text x="6.5" y="15" fontSize="7" fontWeight="bold" fill={B2} opacity={op}>F</text>
      {/* Flèche haut = recettes */}
      <path d="M15 8V3M13 5l2-2 2 2" stroke={B1} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={op}/>
    </svg>
  ),

  /* ── Stations : poteau BRT avec indicateur tri-couleur ──────────────── */
  stations: (op) => (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      {/* Poteau */}
      <rect x="9" y="7" width="2" height="12" rx="1" fill="currentColor" opacity={op * 0.3}/>
      {/* Panneau tri-couleur */}
      <rect x="4"  y="2" width="4" height="7" rx="1" fill={B1} opacity={op}/>
      <rect x="8"  y="2" width="4" height="7" rx="1" fill={B2} opacity={op}/>
      <rect x="12" y="2" width="4" height="7" rx="1" fill={B3} opacity={op}/>
      {/* Lettres */}
      <text x="4.8"  y="7.5" fontSize="5" fontWeight="bold" fill="white">1</text>
      <text x="8.8"  y="7.5" fontSize="5" fontWeight="bold" fill="white">2</text>
      <text x="12.8" y="7.5" fontSize="5" fontWeight="bold" fill="white">3</text>
      {/* Base */}
      <rect x="7" y="18" width="6" height="1.5" rx="0.75" fill="currentColor" opacity={op * 0.3}/>
    </svg>
  ),

  /* ── Flotte : silhouette bus BYD K9 ─────────────────────────────────── */
  fleet: (op) => (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      {/* Carrosserie bus */}
      <rect x="1" y="6" width="17" height="9" rx="2" fill={B1} opacity={op * 0.15}/>
      <rect x="1" y="6" width="17" height="9" rx="2" stroke={B1} strokeWidth="1.5" opacity={op}/>
      {/* Fenêtres */}
      <rect x="3"  y="8" width="3" height="3" rx="0.5" fill={B1} opacity={op * 0.7}/>
      <rect x="7"  y="8" width="3" height="3" rx="0.5" fill={B2} opacity={op * 0.7}/>
      <rect x="11" y="8" width="3" height="3" rx="0.5" fill={B3} opacity={op * 0.7}/>
      {/* Roues */}
      <circle cx="5"  cy="16" r="2" fill={B1} opacity={op}/>
      <circle cx="14" cy="16" r="2" fill={B1} opacity={op}/>
      {/* Trait avant (blanc reflet) */}
      <rect x="1" y="7" width="17" height="1" rx="0.5" fill={B1} opacity={op * 0.3}/>
      {/* Barre électrique */}
      <line x1="6" y1="6" x2="6" y2="3" stroke={B1} strokeWidth="1" opacity={op * 0.5}/>
      <line x1="14" y1="6" x2="14" y2="3" stroke={B1} strokeWidth="1" opacity={op * 0.5}/>
      <line x1="5" y1="3" x2="15" y2="3" stroke={B1} strokeWidth="1" opacity={op * 0.5}/>
    </svg>
  ),

  /* ── RH & Chauffeurs : volant + badge conducteur ─────────────────────── */
  hr: (op) => (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      {/* Silhouette personne */}
      <circle cx="10" cy="5" r="3" stroke={B3} strokeWidth="1.5" opacity={op}/>
      {/* Corps */}
      <path d="M5 17c0-3 2-5 5-5s5 2 5 5" stroke={B3} strokeWidth="1.5" strokeLinecap="round" opacity={op}/>
      {/* Badge/volant */}
      <circle cx="16" cy="15" r="3.5" stroke={B2} strokeWidth="1.2" opacity={op}/>
      <circle cx="16" cy="15" r="1"   fill={B2} opacity={op}/>
      <line x1="13" y1="15" x2="19" y2="15" stroke={B2} strokeWidth="0.8" opacity={op * 0.7}/>
      <line x1="16" y1="12" x2="16" y2="18" stroke={B2} strokeWidth="0.8" opacity={op * 0.7}/>
    </svg>
  ),

  /* ── Expérience client : étoiles + smiley satisfaction ──────────────── */
  cx: (op) => (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      {/* Visage */}
      <circle cx="10" cy="10" r="8" stroke={B2} strokeWidth="1.5" opacity={op}/>
      {/* Yeux */}
      <circle cx="7.5" cy="8.5" r="1"   fill={B2} opacity={op}/>
      <circle cx="12.5" cy="8.5" r="1"  fill={B2} opacity={op}/>
      {/* Sourire */}
      <path d="M7 12.5c0 0 1.5 2 3 2s3-2 3-2" stroke={B2} strokeWidth="1.5" strokeLinecap="round" opacity={op}/>
      {/* Étoile satisfaction */}
      <path d="M17 2l0.5 1.5H19l-1.3 1 0.5 1.5L17 5l-1.2 1 0.5-1.5L15 3.5h1.5z" fill={B2} opacity={op}/>
    </svg>
  ),

  /* ── Alertes & Risques : balise alerte tricolore ─────────────────────── */
  alerts: (op) => (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      {/* Triangle alerte */}
      <path d="M10 2L19 17H1L10 2z" stroke={RD} strokeWidth="1.5" strokeLinejoin="round" opacity={op}/>
      <path d="M10 2L19 17H1L10 2z" fill={RD} opacity={op * 0.1}/>
      {/* ! exclamation */}
      <rect x="9" y="7.5" width="2" height="5" rx="1" fill={RD} opacity={op}/>
      <circle cx="10" cy="14.5" r="1" fill={RD} opacity={op}/>
    </svg>
  ),

  /* ── Analytics avancé : courbe tendance + gradient ───────────────────── */
  analytics: (op) => (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      {/* Axes */}
      <line x1="2" y1="17" x2="2"  y2="3"  stroke="currentColor" strokeWidth="1" opacity={op * 0.3}/>
      <line x1="2" y1="17" x2="18" y2="17" stroke="currentColor" strokeWidth="1" opacity={op * 0.3}/>
      {/* Courbe tendance tricolore */}
      <path d="M3 15 Q6 12 8 10 Q10 8 12 7 Q14 6 17 4" stroke={B3} strokeWidth="2" strokeLinecap="round" fill="none" opacity={op}/>
      {/* Points clés */}
      <circle cx="3"  cy="15" r="1.2" fill={B1} opacity={op}/>
      <circle cx="10" cy="9"  r="1.2" fill={B2} opacity={op}/>
      <circle cx="17" cy="4"  r="1.2" fill={B3} opacity={op}/>
      {/* Zone gradient fill */}
      <path d="M3 15 Q6 12 8 10 Q10 8 12 7 Q14 6 17 4 L17 17 L3 17Z" fill={B3} opacity={op * 0.08}/>
    </svg>
  ),
};
