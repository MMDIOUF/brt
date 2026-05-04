# SunuBRT Cockpit — Guide de référence complet

> Guide technique et contextuel pour tout agent ou développeur qui reprend ce projet.
> Dernière mise à jour : mai 2026.

---

## 1. Contexte métier

**SunuBRT** est le réseau Bus Rapid Transit de Dakar (Sénégal), opéré par **Dakar Mobilité**.

| Fait | Valeur |
|------|--------|
| Corridor | Guédiawaye ↔ Petersen (Papa Gueye Fall) |
| Longueur | 18,3 km |
| Stations | 23 stations closes et sécurisées |
| Flotte | 144 bus BYD K9 100% électriques |
| Tarif | 350 FCFA |
| Capacité | 90 sièges / bus · 300 000 pass/j théorique |
| Inauguration | 14 janvier 2024 |

### Lignes
| Ligne | Type | Stations | Horaires |
|-------|------|----------|---------|
| **B1** | Omnibus | 23 (toutes) | 6h–21h · 7j/7 · toutes 6 min |
| **B2** | Semi-Express | 7 (pôles) | Lun–Sam |
| **B3** | Semi-Express | 7 (sans Grand Médine) | Pointe · Lun–Ven |

### Couleurs officielles
| Élément | Hex | Var CSS |
|---------|-----|---------|
| B1 Omnibus (vert) | `#1D9E75` | `var(--line-b1)` |
| B2 Semi-Express (orange) | `#E2682A` | `var(--line-b2)` |
| B3 Semi-Express (bleu) | `#1A6FA4` | `var(--line-b3)` |
| Rouge SunuBRT (accent) | `#C8102E` | `var(--brand-red)` |
| Brand principal | `#1D9E75` | `var(--brand)` |

---

## 2. Architecture du projet

```
brtintern-main/
├── src/
│   ├── routes/                    # Pages TanStack Router (une route = une page)
│   │   ├── index.tsx              # Vue stratégique (landing page)
│   │   ├── operations.tsx         # OTP, headway, vitesse, criticité stations
│   │   ├── ridership.tsx          # Fréquentation, corridor, zones
│   │   ├── finance.tsx            # Recettes, coûts, waterfall
│   │   ├── fleet.tsx              # Statut flotte, maintenance
│   │   ├── hr.tsx                 # Chauffeurs, absentéisme, zones
│   │   ├── cx.tsx                 # Satisfaction client, headway client
│   │   ├── stations.tsx           # Annuaire 23 stations avec search/filtre
│   │   ├── alerts.tsx             # Centre d'alertes priorisées
│   │   ├── analytics.tsx          # Anomalies, forecast, scatter criticité
│   │   └── __root.tsx             # Layout racine (AuthGate + Providers)
│   │
│   ├── components/
│   │   ├── cockpit/
│   │   │   ├── AppHeader.tsx      # Header sticky (filtres, freshness badge, score)
│   │   │   ├── AppSidebar.tsx     # Navigation latérale avec légende lignes
│   │   │   ├── KpiCard.tsx        # Carte KPI (status, icon, trend, delta)
│   │   │   ├── Section.tsx        # Wrapper section avec accent bar
│   │   │   ├── PageShell.tsx      # Wrapper page (titre + FreshnessNote)
│   │   │   ├── Heatmap.tsx        # Heatmap trafic (station × heure)
│   │   │   ├── AlertItem.tsx      # Item alerte (severity, impact, action)
│   │   │   └── FreshnessBadge.tsx # Indicateur de fraîcheur des données
│   │   └── auth/
│   │       └── AuthGate.tsx       # PIN gate (PIN = "brt2024")
│   │
│   ├── lib/
│   │   ├── data.ts                # Source unique typée (importe real-data.ts)
│   │   ├── real-data.ts           # ⚡ AUTO-GÉNÉRÉ par generate_real_data.py
│   │   ├── filter-context.tsx     # Context React pour les 4 filtres globaux
│   │   ├── use-filtered-data.ts   # Hook useMemo — applique les filtres à toutes les données
│   │   ├── use-live-data.ts       # Hook — charge /public/sunubrt-live.json (actualités)
│   │   ├── data-freshness.tsx     # Context — auto-refresh + statut Live/Updated/Stale
│   │   └── mock-data.ts           # Types partagés (LineId, StationInfo, etc.)
│   │
│   ├── assets/sunubrt/            # Images officielles locales
│   │   ├── brt1.svg / brt2.svg / brt3.svg / brt4.svg
│   │   ├── rabattement-a.jpg / rabattement-b.jpg
│   │   ├── prolongement.jpg
│   │   └── abonnement-jeune.png
│   │
│   └── styles.css                 # Design system complet (charte SunuBRT)
│
├── public/
│   └── sunubrt-live.json          # ⚡ Généré par scrape_sunubrt.py (actualités live)
│
├── generate_real_data.py          # ⚡ Bridge Python Excel → TypeScript
├── scrape_sunubrt.py              # ⚡ Scraper sunubrt.sn → JSON
└── brt data.xlsx                  # Source de données Excel (star schema)
```

---

## 3. Pipeline de données

### 3.1 Données Excel → TypeScript (Bridge v3.0)

```
brt data.xlsx
    └── generate_real_data.py (Bridge v3.0)
            ├── lit 9 feuilles Excel (Fact_Frequentation, Fact_Ponctualite,
            │   Fact_TempsArret, Fact_Trajets, Dim_Station, Dim_Ligne,
            │   Dim_Vehicule, Dim_Chauffeur, + colonne saison)
            ├── joint sur [ts, IDStation, IDLigne, IDBus]
            ├── calcule (métriques stratégiques complètes) :
            │   OTP, headway, pain_index, satisfaction, load_factor (peak/off),
            │   headway_reg_pct, freq_adherence_pct, rev_per_km, cost_per_km,
            │   co2_saved_kg/t, breakeven_pax, dwell_efficiency, pax_km_total,
            │   op_ratio, network_score, lineMetrics (B1/B2/B3), stationCriticality,
            │   corridorProfile (avec pain), zoneDistribution (avec load),
            │   seasonalImpact (avec load), directionFlows, driverZoneStats
            ├── exporte src/lib/real-data.ts  (as const, auto-généré)
            └── exporte public/data-meta.json (pour DataFreshnessProvider)
```

**Commande unique** :
```bash
"C:\Users\7MAKSACOD\AppData\Local\Programs\Python\Python310\python.exe" generate_real_data.py
```

**Auto-update (watcher)** :
```bash
# Lance dans un terminal séparé pendant le dev
"C:\Users\7MAKSACOD\AppData\Local\Programs\Python\Python310\python.exe" watch_data.py
# Surveille brt data.xlsx (MD5 poll 3s) → relance le bridge → Vite HMR recharge
```

> **Ne jamais éditer `real-data.ts` manuellement** — il est écrasé à chaque exécution.

### 3.2 Données live → JSON

```
sunubrt.sn
    └── scrape_sunubrt.py
            ├── fetch https://www.sunubrt.sn (actualités, images)
            ├── fallback sur données statiques si échec réseau
            └── écrit public/sunubrt-live.json
```

**Commande** :
```bash
python scrape_sunubrt.py --output brtintern-main/public/sunubrt-live.json
```

Le hook `useLiveData()` charge ce JSON toutes les 5 minutes avec fallback localStorage.

---

## 4. Système de filtres

### Filtres disponibles (AppHeader)

| Filtre | Type | Valeurs | Variable |
|--------|------|---------|----------|
| Ligne | `Ligne` | `"all" \| "B1" \| "B2" \| "B3"` | `ligne` |
| Zone | `Zone` | `"all" \| "Nord" \| "Centre" \| "Sud"` | `zone` |
| Période | `Periode` | `"day"(7j) \| "week"(14j) \| "month"(30j)` | `periode` |
| Pointe | `Pointe` | `"all" \| "peak" \| "off"` | `pointe` |

### Utilisation dans les pages

```typescript
// Toujours utiliser ce hook dans les pages — JAMAIS importer depuis @/lib/data directement
const {
  trend30d,           // Slicé selon periode
  linePerformance,    // Filtré par ligne
  stationDirectory,   // Filtré par ligne + zone
  ridershipByHour,    // Filtré par pointe
  driverZoneStats,    // Filtré par zone
  // ... (voir use-filtered-data.ts pour la liste complète)
  activeFilters,      // { ligne, zone, periode, pointe }
} = useFilteredData();
```

### Logique de filtrage (use-filtered-data.ts)

- **Période** : `.slice(-nDays)` sur `trend30d`, `dailyRevenue`, `anomalies`
- **Ligne** : filtre `linePerformance`, `speedData` par `l.line === ligne`
- **Ligne + zone** : filtre `stationDirectory` → crée `stationNames` Set → filtre tout ce qui touche aux stations
- **Pointe** : filtre `ridershipByHour`, `headwayByHour` avec `PEAK_H = new Set([6,7,8,9,10,16,17,18,19,20])`
- **Zone** : filtre `driverZoneStats` par `zone`

---

## 5. Formules métier clés

```python
# Pain Index (0–100)
pain_index = clip((headway/2 * 2) + (delay * 3) + (load_factor / 10), 0, 100)

# Satisfaction proxy (%)
satisfaction = 100 - pain_index * 0.7

# Station criticality (score composite IQR rank)
criticality = rank(load) * 0.4 + rank(delay) * 0.3 + rank(pain) * 0.3

# OTP (%)
otp = (passages_dans_les_5min / total_passages) * 100

# Load factor (%)
load_factor = (montees / capacite_bus) * 100  # capacite = 90 (BYD K9)

# Revenue (M FCFA)
revenue = montees * 350 / 1_000_000  # tarif 350 FCFA

# Network Score (0–100)
network_score = otp * 0.4 + (100 - pain_index) * 0.3 + fleet_pct * 0.3
```

---

## 6. Authentification

**Mécanisme** : PIN simple stocké en `sessionStorage` (pas de JWT, pas de cookies).

```
PIN : brt2024
Clé sessionStorage : "sunu_brt_auth_v1"
```

> **Pour la production** : remplacer par OAuth2/SSO avec l'identity provider de Dakar Mobilité.
> Le composant `AuthGate.tsx` est conçu pour être remplacé facilement.

---

## 7. Design system

### Variables CSS principales

```css
--brand:      #1D9E75   /* Vert principal SunuBRT */
--brand-2:    #1A6FA4   /* Bleu B3 */
--brand-red:  #C8102E   /* Rouge officiel SunuBRT */
--line-b1:    #1D9E75
--line-b2:    #E2682A
--line-b3:    #1A6FA4
--success:    #1D9E75
--warning:    #E2682A
--critical:   #C8102E
--chart-1 à --chart-5  /* correspondent exactement aux lignes */
```

### Typographie

- **Corps** : `Inter` (Google Fonts)
- **Titres** : `Plus Jakarta Sans` (700–800)
- Taille de base : 14px, hiérarchie 10px → 28px

### Classes utilitaires clés

```css
.card-elevated      /* carte avec shadow et transition hover */
.line-pill          /* badge arrondi coloré pour les lignes */
.stagger-children   /* animation slide-up en cascade */
.live-dot           /* point pulsant pour le statut Live */
.metric-value       /* numéro de KPI (Plus Jakarta Sans, bold) */
```

---

## 8. Indicateur de fraîcheur des données

Le composant `FreshnessBadge` dans l'AppHeader affiche :
- `Live` (vert) — données fraîches < 5 min
- `Mis à jour` (bleu) — données entre 5–10 min
- `Obsolète` (orange) — données > 10 min
- `Fallback` (rouge) — erreur réseau, données cache

**Auto-refresh** : toutes les 5 minutes (`REFRESH_MS = 5 * 60 * 1000`)
**Fallback** : localStorage cache 30 min + données statiques intégrées

Pour forcer un refresh manuel : cliquer sur le badge FreshnessBadge.

---

## 9. Ajouter une nouvelle fonctionnalité

### Ajouter une nouvelle page

1. Créer `src/routes/ma-page.tsx` avec `createFileRoute("/ma-page")`
2. Utiliser `useFilteredData()` pour toutes les données dynamiques
3. Ajouter l'entrée dans `AppSidebar.tsx` dans le bon groupe
4. Chaque section doit utiliser `<Section title="...">` et `<PageShell title="...">`

### Ajouter un nouveau KPI dans le header

1. Ajouter la métrique dans `generate_real_data.py` (section `kpis`)
2. Re-exécuter le script Python
3. Ajouter la card dans la page concernée via `<KpiCard>`

### Ajouter une nouvelle source de données

1. Ajouter la feuille Excel dans le script Python
2. Ajouter le type + export dans `data.ts`
3. Ajouter l'entrée dans le `return {}` de `useFilteredData()` (avec filtre approprié)

### Modifier le scraper

Modifier `scrape_sunubrt.py` — section `STATIC_NEWS` pour les fallbacks,
`scrape_news()` pour la logique de parsing. Re-exécuter pour mettre à jour `public/sunubrt-live.json`.

---

## 10. Commandes de développement

```bash
# Démarrer le serveur de dev
npm run dev

# Build production
npm run build

# Vérification TypeScript (zéro erreur attendu)
npx tsc --noEmit

# Régénérer les données depuis Excel
python generate_real_data.py

# Scraper les actualités sunubrt.sn
python scrape_sunubrt.py

# Accéder au cockpit (après npm run dev)
# URL : http://localhost:3000
# PIN : brt2024
```

---

## 11. Schéma Excel (star schema)

| Feuille | Clé | Contenu |
|---------|-----|---------|
| `Frequentation` | ts, IDStation, IDLigne | montees, descentes |
| `Ponctualite` | ts, IDStation, IDLigne | retard_min, dans_les_5min |
| `TempsArret` | ts, IDStation, IDBus | duree_arret |
| `Trajets` | ts, IDLigne, IDBus | km_parcourus, duree_trajet |
| `Station` | IDStation | nom, zone, ordre, is_hub |
| `Ligne` | IDLigne | code, type, nb_stations |
| `Vehicule` | IDBus | type, capacite, immat |
| `Chauffeur` | IDChauffeur | zone, anciennete |
| `Saison` | ts | saison (Seche/Pluies) |

---

## 12. Points d'attention

- `real-data.ts` utilise `as const` → utiliser `mutable<T>()` dans `data.ts` pour caster
- Les heures de pointe sont `PEAK_H = {6,7,8,9,10,16,17,18,19,20}` (6h–10h + 16h–20h)
- Le score réseau (`networkScore`) est calculé **une seule fois** au build (statique)
- Les images sont dans `/src/assets/sunubrt/` + CDN `https://www.sunubrt.sn/app/uploads/`
- La font `Plus Jakarta Sans` est chargée depuis Google Fonts (nécessite connexion internet)
- Le filtre "Zone" pour `zoneDistribution` filtre par inclusion du nom de zone dans la chaîne
- L'AuthGate stocke le token en `sessionStorage` (perdu à la fermeture du navigateur)
