> **Comment utiliser ce PRD**
> Ce document est découpé en **7 étapes séquentielles**. Chaque étape contient un bloc `PROMPT` à copier-coller tel quel dans ton agent IA (Claude, GPT-4, Gemini, etc.). L'agent exécute chaque étape dans l'ordre. **Tu ne sautes aucune étape.** À la fin, tu as une application web déployée, animée et fonctionnelle — nettement plus belle et plus puissante que Power BI.

---

## Sommaire

- [0. Vision & Contexte BRT](#0-vision--contexte-brt)
- [1. Architecture & Stack](#1-architecture--stack)
- [Étape 1 — Initialisation Reflex](#étape-1--initialisation-du-projet-reflex)
- [Étape 2 — Pipeline Data](#étape-2--pipeline-data--nettoyage--kpis)
- [Étape 3 — State & Composants](#étape-3--state-reflex--composants-de-base)
- [Étape 4 — Page Accueil](#étape-4--page-accueil--executive-summary)
- [Étape 5 — Pages Métier](#étape-5--pages-opérations-ridership--flotte)
- [Étape 6 — Finance & Polish](#étape-6--page-finance--polish-final)
- [Étape 7 — Déploiement](#étape-7--déploiement-gratuit)
- [Annexe A — Règles Métier BRT](#annexe-a--règles-métier-brt-complètes)
- [Annexe B — Palette & Design](#annexe-b--palette-design-système)
- [Annexe C — Checklist Livraison](#annexe-c--checklist-de-livraison)

---

## 0. Vision & Contexte BRT

### 0.1 Contexte opérationnel du Sunu BRT Dakar

Le **Sunu BRT** (Bus Rapid Transit) est le premier système de bus à haut niveau de service (BHNS) d'Afrique de l'Ouest, inauguré en 2023. Il constitue l'épine dorsale du transport en commun de l'agglomération dakaroise.

| Paramètre | Valeur |
|-----------|--------|
| **Gestionnaire** | Dakar Mobilité (supervision CETUD) |
| **Longueur corridor** | 18,3 km de voie dédiée exclusive |
| **Nombre de stations** | 23 stations avec quais hauts et portes palières |
| **Terminus Nord** | Petersen / Papa Gueye Fall (Plateau — Centre de Dakar) |
| **Terminus Sud** | Préfecture de Guédiawaye (Guédiawaye) |
| **Flotte** | ~144 bus articulés 100% électriques (18 m de long) |
| **Ridership actuel** | 80 000 – 100 000 passagers/jour en semaine |
| **Objectif LT** | 300 000 passagers/jour |
| **Trajet complet** | ~45 minutes (réduit de 90–95 min) |
| **Fréquence normale** | 1 bus toutes les 6 minutes |
| **Fréquence en pointe** | 1 bus toutes les 2–3 minutes |
| **Taux de satisfaction** | ~93% (ponctualité, sécurité, information) |
| **Tarif moyen** | 350 FCFA (~0,55 €) |

### 0.2 Lignes et desserte

| Ligne | Type | Arrêts | Description |
|-------|------|--------|-------------|
| **B1** | Omnibus | 23 stations | S'arrête à toutes les stations du terminus au terminus |
| **B2** | Semi-express | 7 stations majeures | Petersen, Grand Médine, Parcelles, Grand Yoff, Guédiawaye |
| **B3** | Semi-express | 7 stations majeures | Variante de B2 — dessert les pôles d'échange |
| **B4** | Express (en projet) | 4 stations | Terminus uniquement — prévu 2026–2027 |

### 0.3 Les 23 stations — Géographie & Zones

| # | Nom station | Commune | Zone analytique | Type | Commentaire opérationnel |
|---|-------------|---------|-----------------|------|--------------------------|
| 1 | **Petersen / Papa Gueye Fall** | Plateau | Dakar Centre | 🔵 Pôle + Terminus | Connexion Dem Dikk, forte montée de passagers le matin. Plus grande affluence en sens banlieue→centre 7h–10h |
| 2 | Place de la Nation / Baux Maraîchers | Dakar | Dakar Centre | Standard | Zone commerciale, montées élevées le midi |
| 3 | Sacré-Cœur / Liberté | Liberté 5–6 | Liberté | Standard | Quartier résidentiel, forte demande matin et soir |
| 4 | Dial Diop / Thiandoum | Grand Dakar | Grand Dakar | Standard | Proximité stade Léopold Sédar Senghor |
| 5 | Dalal Jamm / Hôpital Dalal Jamm | Grand Dakar | Grand Dakar | Standard | Pic d'affluence lié à l'hôpital (visiteurs, personnel) |
| 6 | Fadia | Grand Dakar | Grand Dakar | Standard | Zone mixte résidentielle-commerciale |
| 7 | Golf | Grand Dakar | Grand Dakar | Standard | Quartier résidentiel moyen standing |
| 8 | Khar Yallah | Parcelles | Parcelles Assainies | Standard | Entrée des Parcelles, forte densité résidentielle |
| 9 | Parcelles Assainies | Parcelles | Parcelles Assainies | Standard | Zone très dense, fort ridership en pointe soir |
| 10 | **Grand Médine** | Parcelles | Parcelles Assainies | 🔵 Pôle d'échange | 2ème pôle majeur, correspondance bus locaux. Dwell time élevé |
| 11 | Grand Yoff | Grand Yoff | Grand Yoff | Standard | Zone très peuplée, fort ridership le week-end |
| 12 | Ancienne Piste | Grand Yoff | Grand Yoff | Standard | Quartier en densification |
| 13 | Case Bi / Séquence | Grand Yoff | Grand Yoff | Standard | Proche marché local |
| 14 | Ndingala / Liberté VI | Grand Yoff | Grand Yoff | Standard | Limite Dakar–Pikine |
| 15 | Fith Mith | Pikine | Pikine | Standard | Entrée Pikine, fort ridership matin |
| 16 | Golf Nord | Pikine | Pikine | Standard | Quartier résidentiel Pikine |
| 17 | Guédiawaye Station 1 | Guédiawaye | Guédiawaye | Standard | Zone banlieue dense |
| 18 | Guédiawaye Station 2 | Guédiawaye | Guédiawaye | Standard | — |
| 19 | Guédiawaye Station 3 | Guédiawaye | Guédiawaye | Standard | — |
| 20 | Pikine Station 1 | Pikine | Pikine | Standard | — |
| 21 | Pikine Station 2 | Pikine | Pikine | Standard | — |
| 22 | Pikine Station 3 | Pikine | Pikine | Pré-terminus | Dernière station avant terminus |
| 23 | **Préfecture de Guédiawaye** | Guédiawaye | Guédiawaye | 🔵 Pôle + Terminus | Terminus Sud, forte montée en sens centre→banlieue 16h–20h |

### 0.4 Profil de la demande — Réalités sénégalaises à modéliser

Ces réalités **doivent impacter les données générées et les visualisations** :

**Rythme journalier typique :**
- `00h–06h` : Nuit — trafic quasi nul (moins de 500 pax/h sur tout le réseau)
- `07h–10h` : **Pointe Matin** — banlieue → centre. Remplissage souvent > 90%. File d'attente visible aux stations Parcelles Assainies, Grand Médine, Préfecture Guédiawaye
- `10h–16h` : Heures creuses — trafic stable ~3 000–4 000 pax/h
- `16h–20h` : **Pointe Soir** — centre → banlieue. Légèrement plus forte que la pointe matin (retours + déplacements loisirs)
- `20h–22h` : Déclin progressif
- `22h–00h` : Service réduit

**Variabilité hebdomadaire :**
- Lundi–vendredi : ridership max, OTP légèrement dégradé en pointe
- Samedi : ridership ~80% du max, meilleures performances opérationnelles
- Dimanche : ridership ~60%, OTP optimal

**Saisonnalité (contexte sénégalais) :**
- Juillet–Septembre : **Saison des pluies** → dwell time +15–20%, OTP dégradé de 3–5 points, ridership -10% (inondations, routes accessibles)
- Octobre–Juin : **Saison sèche** → performances optimales

**Impact chaleur :**
- En avril–juin (harmattan) : hausse de la demande (moins de marche), +5% ridership

---

## 1. Architecture & Stack

### 1.1 Pourquoi cette stack est supérieure à Power BI

| Critère | Power BI | Cette stack (Reflex + Plotly) |
|---------|----------|-------------------------------|
| **Design** | Templates rigides, peu customisables | 100% custom — style Apple/Shadcn |
| **Animations** | Limitées, pas de frames Plotly | Animations fluides, Play/Pause, transitions |
| **Hébergement** | Power BI Service payant (Premium) | **Gratuit** — Reflex Cloud |
| **Backend** | DAX (langage propriétaire) | Python pur — pandas, polars, numpy |
| **Contrôle code** | Boîte noire | 100% open source, versionnable sous Git |
| **Mobile** | Responsive limité | Responsive natif (React sous le capot) |
| **Personnalisation** | Limitée aux visuels marketplace | Infinie — n'importe quel composant React |
| **Collaboration** | SharePoint / Teams | GitHub, URL publique, partage direct |
| **Coût** | Licence mensuelle obligatoire | **0 FCFA** |

### 1.2 Stack technologique

| Couche | Technologie | Version | Rôle |
|--------|-------------|---------|------|
| **Framework** | Reflex | ≥ 0.6.0 | Full Python → compile React + FastAPI |
| **Visualisations** | Plotly | ≥ 5.18.0 | Graphiques interactifs + animations frames |
| **Data** | Pandas | ≥ 2.1.0 | Manipulation, nettoyage, KPIs |
| **Data fast** | Polars | ≥ 0.20.0 | Calculs rapides sur grands datasets |
| **Sérialisation** | PyArrow | ≥ 14.0.0 | Lecture/écriture Parquet |
| **Stats** | NumPy + SciPy | latest | Calculs statistiques, IQR, régressions |
| **Hébergement** | Reflex Cloud | Free Tier | URL .reflex.run — 0 coût |
| **CI/CD** | GitHub Actions | latest | Déploiement automatique sur push main |

### 1.3 Architecture en couches

```
┌─────────────────────────────────────────────────────────────────┐
│                        COUCHE FRONTEND                           │
│  Reflex (compile → React)  ·  Design Apple/Shadcn  ·  Dark Mode │
│  Sidebar  ·  5 Pages  ·  KPI Cards  ·  Filtres globaux          │
├─────────────────────────────────────────────────────────────────┤
│                       COUCHE VISUALISATION                        │
│         Plotly Express + Graph Objects + Animation Frames        │
│  Heatmaps  ·  Line Charts  ·  Gauges  ·  Sankey  ·  Treemaps   │
├─────────────────────────────────────────────────────────────────┤
│                        COUCHE STATE                              │
│              Reflex State (Python) — Computed Vars               │
│      Filtrage réactif  ·  KPI aggregation  ·  Routing           │
├─────────────────────────────────────────────────────────────────┤
│                        COUCHE BACKEND                            │
│        data_loader.py  ·  kpi_engine.py  ·  Parquet             │
│   Nettoyage  ·  Feature engineering  ·  Calculs métier BRT      │
└─────────────────────────────────────────────────────────────────┘
```

### 1.4 Structure complète du projet

```
brt_dakar_app/
├── brt_dakar_app/
│   ├── __init__.py
│   ├── brt_dakar_app.py          # Entry point · layout global · routing
│   ├── state.py                   # State Reflex · computed vars · filtres
│   │
│   ├── components/
│   │   ├── __init__.py
│   │   ├── sidebar.py             # Navigation latérale premium
│   │   ├── kpi_card.py            # Cards KPI animées style Apple
│   │   ├── filters.py             # Filtres globaux (ligne, zone, tranche)
│   │   ├── charts.py              # Wrappers Plotly → Reflex rx.plotly
│   │   ├── badges.py              # Status badges, alertes, indicateurs
│   │   └── station_map.py         # Carte interactive des 23 stations
│   │
│   ├── pages/
│   │   ├── __init__.py
│   │   ├── accueil.py             # Executive Summary · 6 KPIs · Trends
│   │   ├── operations.py          # OTP · Dwell Time · Ponctualité
│   │   ├── ridership.py           # Flux passagers · Heatmaps · Zones
│   │   ├── flotte.py              # Véhicules · Énergie · Maintenance
│   │   └── finance.py             # Revenus · Coûts · Rentabilité
│   │
│   └── data/
│       ├── __init__.py
│       ├── data_loader.py         # Ingestion · Nettoyage · Feature Eng.
│       ├── kpi_engine.py          # Calcul de tous les KPIs métier BRT
│       ├── station_config.py      # Config statique des 23 stations
│       └── brt_clean.parquet      # Dataset propre (généré au build)
│
├── assets/
│   ├── brt_logo.svg
│   └── favicon.ico
│
├── requirements.txt
├── rxconfig.py
├── build.sh                       # Script build + déploiement
├── Dockerfile                     # Pour Render/Railway (fallback)
├── .gitignore
└── .github/
    └── workflows/
        └── deploy.yml             # CI/CD GitHub Actions
```

---

## Étape 1 — Initialisation du projet Reflex

**Durée estimée :** 15–20 minutes
**Prérequis :** Python 3.11+, Node.js 18+, Git installés

**Ce que cette étape produit :**
- Projet Reflex initialisé et fonctionnel
- Structure de dossiers complète
- Thème dark Apple/Shadcn configuré
- App accessible sur `http://localhost:3000`

---

```
╔══════════════════════════════════════════════════════════════╗
║  PROMPT ÉTAPE 1 — Initialisation Reflex BRT Dakar            ║
╚══════════════════════════════════════════════════════════════╝

Tu es expert Reflex (Python full-stack, compile React + FastAPI) et
design UI premium style Apple/Shadcn.

CONTEXTE : Je construis un dashboard BI professionnel pour le
Sunu BRT de Dakar (Sénégal) — 18,3 km, 23 stations, bus électriques,
~80-100k pax/jour. L'app doit être nettement plus belle que Power BI.

═══ MISSION ═══

ÉTAPE A — Génère les commandes bash dans l'ordre exact :

  pip install reflex plotly pandas polars numpy pyarrow scipy
  reflex init brt_dakar_app
  cd brt_dakar_app

ÉTAPE B — Génère le fichier rxconfig.py :

  import reflex as rx
  config = rx.Config(
      app_name="brt_dakar_app",
      telemetry_enabled=False,
      frontend_port=3000,
      backend_port=8000,
  )

ÉTAPE C — Génère requirements.txt avec versions exactes :

  reflex>=0.6.0
  plotly>=5.18.0
  pandas>=2.1.0
  polars>=0.20.0
  numpy>=1.26.0
  pyarrow>=14.0.0
  scipy>=1.11.0

ÉTAPE D — Génère la structure de dossiers avec tous les __init__.py :

  mkdir -p brt_dakar_app/components
  mkdir -p brt_dakar_app/pages
  mkdir -p brt_dakar_app/data
  mkdir -p assets
  touch brt_dakar_app/components/__init__.py
  touch brt_dakar_app/pages/__init__.py
  touch brt_dakar_app/data/__init__.py

ÉTAPE E — Génère le fichier brt_dakar_app/brt_dakar_app.py COMPLET :

  Le fichier doit contenir :
  - Import de toutes les pages (accueil, operations, ridership, flotte, finance)
  - Import du layout global (sidebar + main content wrapper)
  - Définition de l'app avec rx.App()
  - Routes :
      "/" → accueil.accueil_page
      "/operations" → operations.operations_page
      "/ridership" → ridership.ridership_page
      "/flotte" → flotte.flotte_page
      "/finance" → finance.finance_page
  - Thème global : rx.theme(color_mode="dark", accent_color="blue")
  - CSS global injecté via style= parameter avec ces variables :
      --brt-blue: #1A6FA4       /* accent principal BRT */
      --brt-green: #1D9E75      /* succès, OTP OK, revenus */
      --brt-orange: #E17A47     /* alertes, dwell time élevé */
      --brt-red: #E05252        /* erreurs, retards critiques */
      --brt-dark: #0D1117       /* fond principal (GitHub dark) */
      --brt-card: #161B22       /* fond des cartes */
      --brt-border: #30363D     /* bordures, séparateurs */
      --brt-text: #E6EDF3       /* texte principal */
      --brt-muted: #8B949E      /* labels, sous-titres */
  - Police system Apple : font-family: -apple-system, BlinkMacSystemFont,
    "SF Pro Display", "Segoe UI", system-ui, sans-serif;

ÉTAPE F — Génère le fichier brt_dakar_app/state.py MINIMAL
  (juste le squelette — on le complète à l'étape 3) :

  import reflex as rx

  class State(rx.State):
      current_page: str = "accueil"
      sidebar_collapsed: bool = False

ÉTAPE G — Génère des placeholders vides pour chaque page et composant
  (juste les fonctions avec return rx.text("Coming soon")) de façon
  à ce que l'app démarre sans ImportError.

ÉTAPE H — Génère le fichier brt_dakar_app/data/station_config.py
  avec la liste complète des 23 stations en dict Python :

  STATIONS = [
    {"id": 1,  "nom": "Petersen / Papa Gueye Fall",
     "commune": "Plateau", "zone": "Dakar Centre",
     "type": "pole_terminus", "pole_echange": True,
     "lat": 14.6937, "lon": -17.4441, "ordre": 1},
    {"id": 2,  "nom": "Place de la Nation / Baux Maraîchers",
     "commune": "Dakar", "zone": "Dakar Centre",
     "type": "standard", "pole_echange": False,
     "lat": 14.6901, "lon": -17.4398, "ordre": 2},
    {"id": 3,  "nom": "Sacré-Cœur / Liberté",
     "commune": "Liberté", "zone": "Liberté",
     "type": "standard", "pole_echange": False,
     "lat": 14.7021, "lon": -17.4512, "ordre": 3},
    {"id": 4,  "nom": "Dial Diop / Thiandoum",
     "commune": "Grand Dakar", "zone": "Grand Dakar",
     "type": "standard", "pole_echange": False,
     "lat": 14.7089, "lon": -17.4478, "ordre": 4},
    {"id": 5,  "nom": "Dalal Jamm / Hôpital Dalal Jamm",
     "commune": "Grand Dakar", "zone": "Grand Dakar",
     "type": "standard", "pole_echange": False,
     "lat": 14.7143, "lon": -17.4532, "ordre": 5},
    {"id": 6,  "nom": "Fadia", "commune": "Grand Dakar",
     "zone": "Grand Dakar", "type": "standard", "pole_echange": False,
     "lat": 14.7198, "lon": -17.4589, "ordre": 6},
    {"id": 7,  "nom": "Golf", "commune": "Grand Dakar",
     "zone": "Grand Dakar", "type": "standard", "pole_echange": False,
     "lat": 14.7245, "lon": -17.4623, "ordre": 7},
    {"id": 8,  "nom": "Khar Yallah", "commune": "Parcelles",
     "zone": "Parcelles Assainies", "type": "standard",
     "pole_echange": False, "lat": 14.7301, "lon": -17.4668, "ordre": 8},
    {"id": 9,  "nom": "Parcelles Assainies", "commune": "Parcelles",
     "zone": "Parcelles Assainies", "type": "standard",
     "pole_echange": False, "lat": 14.7356, "lon": -17.4712, "ordre": 9},
    {"id": 10, "nom": "Grand Médine", "commune": "Parcelles",
     "zone": "Parcelles Assainies", "type": "pole",
     "pole_echange": True, "lat": 14.7412, "lon": -17.4756, "ordre": 10},
    {"id": 11, "nom": "Grand Yoff", "commune": "Grand Yoff",
     "zone": "Grand Yoff", "type": "standard", "pole_echange": False,
     "lat": 14.7467, "lon": -17.4801, "ordre": 11},
    {"id": 12, "nom": "Ancienne Piste", "commune": "Grand Yoff",
     "zone": "Grand Yoff", "type": "standard", "pole_echange": False,
     "lat": 14.7523, "lon": -17.4845, "ordre": 12},
    {"id": 13, "nom": "Case Bi / Séquence", "commune": "Grand Yoff",
     "zone": "Grand Yoff", "type": "standard", "pole_echange": False,
     "lat": 14.7578, "lon": -17.4889, "ordre": 13},
    {"id": 14, "nom": "Ndingala / Liberté VI", "commune": "Grand Yoff",
     "zone": "Grand Yoff", "type": "standard", "pole_echange": False,
     "lat": 14.7634, "lon": -17.4934, "ordre": 14},
    {"id": 15, "nom": "Fith Mith", "commune": "Pikine",
     "zone": "Pikine", "type": "standard", "pole_echange": False,
     "lat": 14.7689, "lon": -17.4978, "ordre": 15},
    {"id": 16, "nom": "Golf Nord", "commune": "Pikine",
     "zone": "Pikine", "type": "standard", "pole_echange": False,
     "lat": 14.7745, "lon": -17.5023, "ordre": 16},
    {"id": 17, "nom": "Guédiawaye 1", "commune": "Guédiawaye",
     "zone": "Guédiawaye", "type": "standard", "pole_echange": False,
     "lat": 14.7801, "lon": -17.5067, "ordre": 17},
    {"id": 18, "nom": "Guédiawaye 2", "commune": "Guédiawaye",
     "zone": "Guédiawaye", "type": "standard", "pole_echange": False,
     "lat": 14.7856, "lon": -17.5112, "ordre": 18},
    {"id": 19, "nom": "Guédiawaye 3", "commune": "Guédiawaye",
     "zone": "Guédiawaye", "type": "standard", "pole_echange": False,
     "lat": 14.7912, "lon": -17.5156, "ordre": 19},
    {"id": 20, "nom": "Pikine 1", "commune": "Pikine",
     "zone": "Pikine", "type": "standard", "pole_echange": False,
     "lat": 14.7967, "lon": -17.5201, "ordre": 20},
    {"id": 21, "nom": "Pikine 2", "commune": "Pikine",
     "zone": "Pikine", "type": "standard", "pole_echange": False,
     "lat": 14.8023, "lon": -17.5245, "ordre": 21},
    {"id": 22, "nom": "Pikine 3", "commune": "Pikine",
     "zone": "Pikine", "type": "standard", "pole_echange": False,
     "lat": 14.8078, "lon": -17.5289, "ordre": 22},
    {"id": 23, "nom": "Préfecture de Guédiawaye", "commune": "Guédiawaye",
     "zone": "Guédiawaye", "type": "pole_terminus",
     "pole_echange": True, "lat": 14.8134, "lon": -17.5334, "ordre": 23},
  ]

  ZONES = ["Dakar Centre","Grand Dakar","Liberté","Parcelles Assainies",
           "Grand Yoff","Pikine","Guédiawaye"]
  POLES_ECHANGE = ["Petersen / Papa Gueye Fall","Grand Médine",
                   "Préfecture de Guédiawaye"]
  LIGNES = ["B1","B2","B3"]

Génère TOUT le code complet. Lance ensuite : reflex run
L'app doit démarrer sur http://localhost:3000 sans erreur.
```

**✅ Validation Étape 1 :**
- `reflex run` → démarre sans erreur
- `http://localhost:3000` s'ouvre (page vide ou placeholder = OK)
- Tous les fichiers et dossiers créés
- `station_config.py` contient les 23 stations

---

## Étape 2 — Pipeline Data · Nettoyage & KPIs

**Durée estimée :** 30–45 minutes
**Entrée :** Ton dataset personnel (CSV ou Excel)
**Sortie :** `brt_clean.parquet` + toutes les fonctions KPI

**Ce que cette étape produit :**
- Dataset nettoyé et enrichi avec toutes les features BRT
- Fichier `kpi_engine.py` avec toutes les formules métier
- Rapport qualité des données automatique

---

```
╔══════════════════════════════════════════════════════════════╗
║  PROMPT ÉTAPE 2 — Data Pipeline BRT Dakar                    ║
╚══════════════════════════════════════════════════════════════╝

Tu es Senior Data Engineer Python spécialisé transport public BRT
africain. Tu connais les réalités opérationnelles du Sunu BRT Dakar.

⚠️  CHARGE MON DATASET MAINTENANT avant de continuer.
    Format accepté : CSV ou Excel (.csv, .xlsx, .xls)
    [GLISSE TON FICHIER ICI]

═══ FICHIER 1 : brt_dakar_app/data/data_loader.py ═══

Génère ce fichier COMPLET avec les sections suivantes :

─── SECTION 1 : IMPORTS ET CONFIG ───

import pandas as pd
import polars as pl
import numpy as np
from pathlib import Path
from brt_dakar_app.data.station_config import STATIONS, ZONES, POLES_ECHANGE
import difflib, warnings
warnings.filterwarnings("ignore")

DATA_DIR = Path(__file__).parent
PARQUET_PATH = DATA_DIR / "brt_clean.parquet"

─── SECTION 2 : AUDIT QUALITÉ ───

def audit_dataset(df: pd.DataFrame) -> dict:
    """Retourne un rapport complet sur la qualité du dataset."""
    rapport = {
        "nb_lignes": len(df),
        "nb_colonnes": len(df.columns),
        "colonnes": list(df.columns),
        "dtypes": df.dtypes.astype(str).to_dict(),
        "nulls_pct": (df.isnull().sum() / len(df) * 100).round(2).to_dict(),
        "doublons": df.duplicated().sum(),
        "periode": None,
    }
    # Détecter la colonne datetime
    for col in df.columns:
        if df[col].dtype in ['datetime64[ns]', 'object']:
            try:
                parsed = pd.to_datetime(df[col], errors='coerce')
                if parsed.notna().sum() > len(df) * 0.5:
                    rapport["periode"] = {
                        "debut": str(parsed.min()),
                        "fin": str(parsed.max()),
                        "nb_jours": (parsed.max() - parsed.min()).days
                    }
                    break
            except: pass
    print("=" * 60)
    print("AUDIT QUALITÉ DATASET BRT")
    print("=" * 60)
    for k, v in rapport.items():
        if k not in ["colonnes","dtypes","nulls_pct"]:
            print(f"  {k:20s} : {v}")
    print("\nNulls par colonne :")
    for col, pct in rapport["nulls_pct"].items():
        if pct > 0:
            print(f"  {col:30s} : {pct:.1f}%")
    print("=" * 60)
    return rapport

─── SECTION 3 : MAPPING AUTOMATIQUE DES COLONNES ───

COLUMN_MAPPING = {
    # Passagers / boardings
    "boardings": ["boardings","passengers","passagers","montees",
                  "embarquements","ridership","pax","count","nombre"],
    # Datetime du trajet
    "trip_datetime": ["datetime","timestamp","date","time","heure",
                      "trip_date","service_date","recorded_at"],
    # Nom de la station
    "station_name": ["station","stop","arret","station_name",
                     "stop_name","nom_station","halte"],
    # Ligne BRT
    "ligne": ["ligne","line","route","route_id","service",
              "itineraire","bus_line"],
    # Retard en minutes
    "delay_minutes": ["delay","retard","delay_min","late_minutes",
                      "delay_minutes","minutes_late","ecart"],
    # Temps d'arrêt en secondes
    "dwell_seconds": ["dwell","dwell_time","dwell_seconds",
                      "arret_duree","stop_duration","temps_arret"],
    # Capacité du bus
    "capacity": ["capacity","capacite","places","seats","max_pax"],
    # Heure programmée
    "scheduled_time": ["scheduled","schedule","heure_prevue",
                       "planned_time","timetable"],
    # Heure réelle
    "actual_time": ["actual","real_time","heure_reelle","arrival_time"],
    # Revenus
    "revenue": ["revenue","recettes","montant","fare","tarif","income"],
}

def map_columns(df: pd.DataFrame) -> pd.DataFrame:
    """Détecte et renomme automatiquement les colonnes vers le schéma BRT."""
    rename_dict = {}
    df_cols_lower = {col.lower().replace(" ","_").replace("-","_"): col
                     for col in df.columns}
    for target, candidates in COLUMN_MAPPING.items():
        for cand in candidates:
            if cand in df_cols_lower:
                rename_dict[df_cols_lower[cand]] = target
                break
    df = df.rename(columns=rename_dict)
    print(f"Colonnes mappées : {list(rename_dict.values())} → {list(rename_dict.keys())}")
    return df

─── SECTION 4 : STANDARDISATION DES NOMS DE STATIONS ───

STATION_NAMES_OFFICIAL = [s["nom"] for s in STATIONS]

def standardize_station_name(name: str) -> str:
    """Mappe un nom de station approximatif vers le nom officiel."""
    if pd.isna(name): return "Inconnue"
    name_str = str(name).strip()
    # Correspondance exacte d'abord
    if name_str in STATION_NAMES_OFFICIAL:
        return name_str
    # Fuzzy matching
    matches = difflib.get_close_matches(
        name_str, STATION_NAMES_OFFICIAL, n=1, cutoff=0.55
    )
    return matches[0] if matches else name_str

─── SECTION 5 : NETTOYAGE PRINCIPAL ───

def clean_dataset(df: pd.DataFrame) -> pd.DataFrame:
    """Pipeline de nettoyage complet adapté au contexte BRT Dakar."""

    print("\n[1/8] Suppression des doublons...")
    before = len(df)
    df = df.drop_duplicates()
    print(f"  → {before - len(df)} doublons supprimés")

    print("[2/8] Mapping des colonnes...")
    df = map_columns(df)

    print("[3/8] Parsing datetime...")
    if "trip_datetime" in df.columns:
        df["trip_datetime"] = pd.to_datetime(df["trip_datetime"],
                                              errors="coerce",
                                              dayfirst=True)  # format sénégalais DD/MM/YYYY
        df = df.dropna(subset=["trip_datetime"])
        df["heure"] = df["trip_datetime"].dt.hour
        df["date"] = df["trip_datetime"].dt.date
        df["jour_semaine"] = df["trip_datetime"].dt.dayofweek
        df["mois"] = df["trip_datetime"].dt.month
    else:
        # Créer datetime synthétique si absent
        import datetime
        dates = pd.date_range("2025-01-01", periods=len(df), freq="1min")
        df["trip_datetime"] = dates
        df["heure"] = df["trip_datetime"].dt.hour
        df["date"] = df["trip_datetime"].dt.date
        df["jour_semaine"] = df["trip_datetime"].dt.dayofweek
        df["mois"] = df["trip_datetime"].dt.month

    print("[4/8] Gestion des valeurs manquantes...")
    # Numériques → médiane + flag
    numeric_cols = ["boardings","delay_minutes","dwell_seconds","capacity","revenue"]
    for col in numeric_cols:
        if col in df.columns:
            pct_null = df[col].isnull().mean() * 100
            if pct_null > 0:
                median_val = df[col].median()
                df[f"{col}_imputed"] = df[col].isnull().astype(int)
                df[col] = df[col].fillna(median_val)
                print(f"  → {col}: {pct_null:.1f}% imputés par médiane ({median_val:.1f})")

    # Colonnes créées si absentes
    if "boardings" not in df.columns:
        df["boardings"] = np.random.randint(20, 150, len(df))
    if "delay_minutes" not in df.columns:
        df["delay_minutes"] = 0.0
    if "dwell_seconds" not in df.columns:
        df["dwell_seconds"] = 90.0
    if "capacity" not in df.columns:
        df["capacity"] = 150  # Bus articulé 18m typique
    if "revenue" not in df.columns:
        df["revenue"] = df["boardings"] * 350  # 350 FCFA/passager

    print("[5/8] Standardisation noms de stations...")
    if "station_name" in df.columns:
        df["station_name"] = df["station_name"].apply(standardize_station_name)
    else:
        # Distribuer les stations de façon réaliste
        stations_weighted = []
        for s in STATIONS:
            weight = 3 if s["pole_echange"] else 1
            stations_weighted.extend([s["nom"]] * weight)
        df["station_name"] = np.random.choice(stations_weighted, len(df))

    print("[6/8] Standardisation des lignes...")
    if "ligne" in df.columns:
        df["ligne"] = df["ligne"].astype(str).str.upper().str.strip()
        df["ligne"] = df["ligne"].replace({
            "LINE1":"B1","LINE 1":"B1","1":"B1",
            "LINE2":"B2","LINE 2":"B2","2":"B2",
            "LINE3":"B3","LINE 3":"B3","3":"B3",
        })
        # Valeurs non reconnues → B1 (omnibus, majoritaire)
        df.loc[~df["ligne"].isin(["B1","B2","B3"]), "ligne"] = "B1"
    else:
        # B1 = 60%, B2 = 20%, B3 = 20%
        df["ligne"] = np.random.choice(["B1","B2","B3"],
                                        len(df), p=[0.6, 0.2, 0.2])

    print("[7/8] Détection et flag des outliers...")
    # Dwell time (contexte BRT Dakar)
    Q1 = df["dwell_seconds"].quantile(0.25)
    Q3 = df["dwell_seconds"].quantile(0.75)
    IQR = Q3 - Q1
    df["anomalie_dwell"] = (df["dwell_seconds"] > Q3 + 1.5 * IQR) | \
                            (df["dwell_seconds"] > 600)  # > 10 min = anomalie certaine

    # Retards (contexte BRT Dakar : retard > 30 min = rupture de service)
    df["anomalie_delay"] = df["delay_minutes"] > 30

    pct_dwell_anomaly = df["anomalie_dwell"].mean() * 100
    pct_delay_anomaly = df["anomalie_delay"].mean() * 100
    print(f"  → Anomalies dwell time : {pct_dwell_anomaly:.1f}%")
    print(f"  → Anomalies retard : {pct_delay_anomaly:.1f}%")

    print("[8/8] Feature engineering BRT Dakar...")
    df = add_brt_features(df)

    return df

─── SECTION 6 : FEATURE ENGINEERING ───

def add_brt_features(df: pd.DataFrame) -> pd.DataFrame:
    """Ajoute toutes les features métier BRT Dakar."""

    # Tranche horaire (spécifique aux horaires dakarois)
    def get_tranche(h):
        if 7 <= h < 10:  return "PointeMatin"
        elif 16 <= h < 20: return "PointeSoir"
        elif 5 <= h < 7 or 20 <= h < 22: return "HorsPointe"
        elif 22 <= h or h < 5: return "Nuit"
        else: return "HorsPointe"
    df["tranche_horaire"] = df["heure"].apply(get_tranche)

    # Type de jour (calendrier sénégalais simplifié)
    jours_feries_senegal = [
        "2025-01-01","2025-04-04","2025-04-18","2025-04-21",
        "2025-05-01","2025-06-16","2025-08-15","2025-11-01","2025-12-25"
    ]
    df["date_str"] = df["date"].astype(str)
    df["type_jour"] = df["jour_semaine"].apply(
        lambda x: "Weekend" if x >= 5 else "Semaine"
    )
    df.loc[df["date_str"].isin(jours_feries_senegal), "type_jour"] = "JourFerie"
    df = df.drop(columns=["date_str"])

    # Saison (Sénégal)
    df["saison"] = df["mois"].apply(
        lambda m: "Pluies" if m in [7,8,9] else "Seche"
    )

    # OTP — cible BRT Dakar : retard ≤ 5 minutes
    df["is_on_time"] = (df["delay_minutes"] <= 5).astype(int)

    # Direction du trajet (logique BRT Dakar)
    # Matin banlieue→centre = B1/B2/B3 vers Petersen
    # Soir centre→banlieue = vers Guédiawaye
    df["direction"] = df["tranche_horaire"].apply(
        lambda t: "CentreVille" if t == "PointeMatin" else "Banlieue"
    )

    # Zone de la station
    station_to_zone = {s["nom"]: s["zone"] for s in STATIONS}
    df["zone_station"] = df["station_name"].map(station_to_zone).fillna("Inconnue")

    # Pôle d'échange
    df["pole_echange"] = df["station_name"].isin(POLES_ECHANGE)

    # Ordre de la station (position 1→23 sur le corridor)
    station_to_order = {s["nom"]: s["ordre"] for s in STATIONS}
    df["ordre_station"] = df["station_name"].map(station_to_order).fillna(0).astype(int)

    # Load factor (si capacity disponible)
    df["load_factor_pct"] = (df["boardings"] / df["capacity"] * 100).clip(0, 120)

    # Indicateurs de performance dwell time
    df["dwell_status"] = df["dwell_seconds"].apply(
        lambda x: "OK" if x <= 90 else ("Élevé" if x <= 180 else "Critique")
    )

    return df

─── SECTION 7 : EXPORT ───

def load_and_prepare(filepath: str = None) -> pd.DataFrame:
    """Point d'entrée principal. Charge, nettoie et exporte le dataset."""

    print("\n🚌 SUNU BRT DAKAR — Pipeline Data")
    print("=" * 60)

    if filepath:
        path = Path(filepath)
        if path.suffix.lower() in ['.xlsx','.xls']:
            df = pd.read_excel(path)
        else:
            # Essai de différents séparateurs courants
            for sep in [',',';','|','\t']:
                try:
                    df = pd.read_csv(path, sep=sep)
                    if len(df.columns) > 1: break
                except: pass
    else:
        # Générer données synthétiques si pas de dataset
        print("⚠️  Aucun dataset fourni → génération de données synthétiques BRT Dakar")
        df = generate_synthetic_brt_data()

    print(f"\n📊 Dataset chargé : {len(df):,} lignes × {len(df.columns)} colonnes")

    # Audit
    audit_dataset(df)

    # Nettoyage
    df_clean = clean_dataset(df)

    # Export Parquet
    df_clean.to_parquet(PARQUET_PATH, index=False, compression="snappy")
    print(f"\n✅ Dataset propre exporté : {PARQUET_PATH}")
    print(f"   Colonnes finales ({len(df_clean.columns)}) :")
    for col in sorted(df_clean.columns):
        print(f"   · {col}")

    return df_clean

─── SECTION 8 : DONNÉES SYNTHÉTIQUES BRT DAKAR ───

def generate_synthetic_brt_data() -> pd.DataFrame:
    """
    Génère des données synthétiques ultra-réalistes pour le BRT Dakar.
    Respecte : pointes matin/soir, ridership par zone, saisonnalité.
    Période : 6 mois (180 jours)
    """
    np.random.seed(42)
    rows = []

    from brt_dakar_app.data.station_config import STATIONS

    # Profil horaire réaliste (index = heure, valeur = multiplicateur ridership)
    HOURLY_PROFILE = {
        0:0.02, 1:0.01, 2:0.01, 3:0.01, 4:0.02, 5:0.08,
        6:0.35, 7:0.95, 8:1.00, 9:0.85, 10:0.50,
        11:0.45, 12:0.55, 13:0.48, 14:0.45, 15:0.60,
        16:0.90, 17:1.00, 18:0.95, 19:0.75, 20:0.45,
        21:0.30, 22:0.18, 23:0.08
    }

    BASE_RIDERSHIP_PAX_PER_TRIP = 80  # passagers moyens par trip hors pointe

    for day_offset in range(180):
        date = pd.Timestamp("2025-01-01") + pd.Timedelta(days=day_offset)
        is_weekend = date.dayofweek >= 5
        is_rain_season = date.month in [7, 8, 9]

        for station in STATIONS:
            for hour in range(5, 23):  # 5h–22h = service BRT
                for ligne in ["B1", "B2", "B3"]:
                    # B2 et B3 s'arrêtent uniquement aux pôles et grandes stations
                    if ligne in ["B2","B3"] and not station["pole_echange"] and station["ordre"] not in [1,5,9,11,14,18,23]:
                        continue

                    # Trips par heure (fréquence BRT)
                    trips_per_hour = 10 if hour in range(7,10) or hour in range(16,20) else 6
                    if ligne != "B1":
                        trips_per_hour = max(2, trips_per_hour // 3)

                    for trip_n in range(trips_per_hour):
                        minute = trip_n * (60 // trips_per_hour)
                        ts = date + pd.Timedelta(hours=hour, minutes=minute)

                        # Multiplicateurs
                        hourly_mult = HOURLY_PROFILE.get(hour, 0.3)
                        weekend_mult = 0.75 if is_weekend else 1.0
                        rain_mult = 0.90 if is_rain_season else 1.0
                        # Stations pôles = plus de passagers
                        station_mult = 2.5 if station["pole_echange"] else 1.0
                        # Zones denses
                        zone_mult = {"Dakar Centre":1.8,"Parcelles Assainies":1.6,
                                     "Grand Yoff":1.4,"Guédiawaye":1.3,
                                     "Pikine":1.2,"Grand Dakar":1.1,"Liberté":1.0,
                                     "Inconnue":1.0}.get(station["zone"], 1.0)

                        boardings = int(np.random.poisson(
                            BASE_RIDERSHIP_PAX_PER_TRIP * hourly_mult *
                            weekend_mult * rain_mult * station_mult * zone_mult
                        ))
                        boardings = max(0, boardings)

                        # Retard (contexte BRT Dakar)
                        base_delay = 0
                        if hour in range(7,10) or hour in range(16,20):
                            base_delay = np.random.exponential(3.5)
                        elif is_rain_season:
                            base_delay = np.random.exponential(2.0)
                        else:
                            base_delay = np.random.exponential(1.2)
                        delay = max(0, base_delay + np.random.normal(0, 1))

                        # Dwell time (plus long aux pôles)
                        base_dwell = 90 if not station["pole_echange"] else 140
                        if boardings > 100: base_dwell += 30
                        dwell = max(15, int(np.random.normal(base_dwell, 20)))

                        rows.append({
                            "trip_datetime": ts,
                            "station_name": station["nom"],
                            "ligne": ligne,
                            "boardings": boardings,
                            "delay_minutes": round(delay, 1),
                            "dwell_seconds": dwell,
                            "capacity": 150,
                            "revenue": boardings * 350,
                            "scheduled_time": ts,
                            "actual_time": ts + pd.Timedelta(minutes=delay),
                        })

    df = pd.DataFrame(rows)
    print(f"✅ Données synthétiques générées : {len(df):,} lignes")
    return df

if __name__ == "__main__":
    load_and_prepare()

═══ FICHIER 2 : brt_dakar_app/data/kpi_engine.py ═══

Génère ce fichier COMPLET avec TOUTES ces fonctions :

import pandas as pd
import numpy as np

# ─── KPIs GLOBAUX ───

def get_kpis_globaux(df: pd.DataFrame) -> dict:
    """
    Retourne les KPIs principaux du tableau de bord BRT Dakar.
    Cibles BRT : OTP≥95%, Load Factor 70-85%, Dwell≤120s
    """
    df_clean = df[~df.get("anomalie_dwell", pd.Series(False, index=df.index))]

    otp = df["is_on_time"].mean() * 100 if "is_on_time" in df.columns else 0
    delay_moyen = df[df["delay_minutes"] > 0]["delay_minutes"].mean() \
                  if (df["delay_minutes"] > 0).any() else 0
    dwell_moyen = df_clean["dwell_seconds"].mean() \
                  if not df_clean.empty else 90
    total_pax = df["boardings"].sum()
    load_factor = df["load_factor_pct"].mean() \
                  if "load_factor_pct" in df.columns else 78.0
    revenus = df["revenue"].sum() if "revenue" in df.columns \
              else total_pax * 350
    cost_ratio = 0.65  # coûts = 65% des recettes (benchmark BRT Afrique)

    return {
        "otp_pct": round(otp, 1),
        "otp_cible": 95.0,
        "otp_status": "ok" if otp >= 95 else ("warning" if otp >= 88 else "critical"),
        "delay_moyen": round(delay_moyen, 1),
        "dwell_moyen_s": round(dwell_moyen, 0),
        "dwell_cible": 120,
        "dwell_status": "ok" if dwell_moyen <= 120 else "warning",
        "total_passagers": int(total_pax),
        "load_factor_pct": round(load_factor, 1),
        "load_factor_cible": 85.0,
        "vehicle_availability_pct": 91.0,
        "revenus_total": int(revenus),
        "cout_par_pax": round((revenus * cost_ratio) / total_pax, 0) \
                        if total_pax > 0 else 0,
        "revenue_par_pax": round(revenus / total_pax, 0) if total_pax > 0 else 0,
        "operating_ratio": round((1 / cost_ratio) * 100, 1),
    }

# ─── RIDERSHIP ───

def get_ridership_par_heure(df: pd.DataFrame) -> pd.DataFrame:
    return df.groupby("heure")["boardings"].sum().reset_index()\
             .rename(columns={"boardings":"total_pax"})\
             .sort_values("heure")

def get_ridership_par_station(df: pd.DataFrame) -> pd.DataFrame:
    return df.groupby(["station_name","zone_station"])["boardings"]\
             .sum().reset_index()\
             .rename(columns={"boardings":"total_pax"})\
             .sort_values("total_pax", ascending=False)

def get_ridership_par_zone(df: pd.DataFrame) -> pd.DataFrame:
    return df.groupby("zone_station")["boardings"].sum().reset_index()\
             .rename(columns={"boardings":"total_pax"})\
             .sort_values("total_pax", ascending=False)

def get_ridership_par_ligne(df: pd.DataFrame) -> pd.DataFrame:
    return df.groupby("ligne")["boardings"].sum().reset_index()\
             .rename(columns={"boardings":"total_pax"})

def get_ridership_par_tranche(df: pd.DataFrame) -> pd.DataFrame:
    order = ["PointeMatin","HorsPointe","PointeSoir","Nuit"]
    result = df.groupby("tranche_horaire")["boardings"].sum().reset_index()
    result["order"] = result["tranche_horaire"].map(
        {t:i for i,t in enumerate(order)}
    )
    return result.sort_values("order")

# ─── PONCTUALITÉ ───

def get_otp_par_ligne(df: pd.DataFrame) -> pd.DataFrame:
    return df.groupby("ligne").apply(
        lambda x: pd.Series({
            "otp_pct": round(x["is_on_time"].mean() * 100, 1),
            "total_trips": len(x),
            "trips_on_time": x["is_on_time"].sum(),
            "delay_moyen": round(x[x["delay_minutes"]>0]["delay_minutes"].mean(), 1),
        })
    ).reset_index()

def get_otp_par_station(df: pd.DataFrame) -> pd.DataFrame:
    return df.groupby(["station_name","zone_station"]).apply(
        lambda x: pd.Series({
            "otp_pct": round(x["is_on_time"].mean() * 100, 1),
            "total_trips": len(x),
            "delay_moyen": round(x["delay_minutes"].mean(), 1),
        })
    ).reset_index().sort_values("otp_pct")

def get_otp_par_heure(df: pd.DataFrame) -> pd.DataFrame:
    return df.groupby("heure").apply(
        lambda x: pd.Series({
            "otp_pct": round(x["is_on_time"].mean() * 100, 1),
            "nb_trips": len(x),
        })
    ).reset_index()

# ─── HEATMAPS ───

def get_heatmap_data(df: pd.DataFrame) -> pd.DataFrame:
    """Matrice stations × heures pour la heatmap d'affluence."""
    pivot = df.pivot_table(
        index="station_name", columns="heure",
        values="boardings", aggfunc="sum", fill_value=0
    )
    # Trier par ordre sur le corridor
    from brt_dakar_app.data.station_config import STATIONS
    order = {s["nom"]: s["ordre"] for s in STATIONS}
    pivot["_order"] = pivot.index.map(order).fillna(99)
    pivot = pivot.sort_values("_order").drop(columns=["_order"])
    return pivot

def get_heatmap_dwell(df: pd.DataFrame) -> pd.DataFrame:
    """Matrice stations × heures pour le dwell time moyen."""
    df_clean = df[~df["anomalie_dwell"]] if "anomalie_dwell" in df.columns else df
    return df_clean.pivot_table(
        index="station_name", columns="heure",
        values="dwell_seconds", aggfunc="mean", fill_value=90
    ).round(0)

# ─── TRENDS ───

def get_trends_7j(df: pd.DataFrame) -> pd.DataFrame:
    """Évolution jour par jour sur les 7 derniers jours."""
    df["date"] = pd.to_datetime(df["trip_datetime"]).dt.date
    last_7 = sorted(df["date"].unique())[-7:]
    df_7j = df[df["date"].isin(last_7)]
    return df_7j.groupby("date").apply(
        lambda x: pd.Series({
            "boardings": x["boardings"].sum(),
            "otp_pct": round(x["is_on_time"].mean() * 100, 1),
            "dwell_moyen": round(x["dwell_seconds"].mean(), 0),
        })
    ).reset_index()

def get_trends_mensuel(df: pd.DataFrame) -> pd.DataFrame:
    return df.groupby(["mois","saison"]).apply(
        lambda x: pd.Series({
            "boardings": x["boardings"].sum(),
            "otp_pct": round(x["is_on_time"].mean() * 100, 1),
        })
    ).reset_index()

# ─── FINANCE ───

def get_finance_par_ligne(df: pd.DataFrame) -> pd.DataFrame:
    result = df.groupby("ligne").apply(
        lambda x: pd.Series({
            "revenus": x["revenue"].sum() if "revenue" in x.columns \
                       else x["boardings"].sum() * 350,
            "nb_pax": x["boardings"].sum(),
        })
    ).reset_index()
    result["couts"] = result["revenus"] * 0.65
    result["marge"] = result["revenus"] - result["couts"]
    result["operating_ratio"] = (result["revenus"] / result["couts"] * 100).round(1)
    return result

def get_finance_par_zone(df: pd.DataFrame) -> pd.DataFrame:
    result = df.groupby("zone_station").apply(
        lambda x: pd.Series({
            "revenus": x["revenue"].sum() if "revenue" in x.columns \
                       else x["boardings"].sum() * 350,
            "nb_pax": x["boardings"].sum(),
        })
    ).reset_index()
    result["couts"] = result["revenus"] * 0.65
    result["marge"] = result["revenus"] - result["couts"]
    result["rev_par_pax"] = (result["revenus"] / result["nb_pax"]).round(0)
    return result.sort_values("revenus", ascending=False)

# ─── COMPARAISONS SAISONNIÈRES ───

def get_impact_saison(df: pd.DataFrame) -> pd.DataFrame:
    """Compare performances saison sèche vs saison des pluies."""
    return df.groupby("saison").apply(
        lambda x: pd.Series({
            "boardings_moyen": round(x["boardings"].mean(), 1),
            "otp_pct": round(x["is_on_time"].mean() * 100, 1),
            "dwell_moyen": round(x["dwell_seconds"].mean(), 0),
            "nb_observations": len(x),
        })
    ).reset_index()

Génère les 2 fichiers COMPLETS avec tout le code.
Lance ensuite : python brt_dakar_app/data/data_loader.py
Le rapport doit s'afficher et le fichier brt_clean.parquet doit être créé.
```

**✅ Validation Étape 2 :**
- `python brt_dakar_app/data/data_loader.py` → affiche rapport complet
- `brt_clean.parquet` existe dans `brt_dakar_app/data/`
- Le fichier contient les colonnes : `tranche_horaire`, `zone_station`, `is_on_time`, `pole_echange`, `load_factor_pct`

---

## Étape 3 — State Reflex & Composants de base

**Durée estimée :** 25–35 minutes
**Ce que cette étape produit :**
- State global réactif avec tous les computed vars
- Sidebar premium avec navigation animée
- KPI cards animées style Apple
- Système de filtres global

---

```
╔══════════════════════════════════════════════════════════════╗
║  PROMPT ÉTAPE 3 — State Reflex + Composants BRT              ║
╚══════════════════════════════════════════════════════════════╝

Tu es expert Reflex et design UI premium.
Le contexte est le dashboard BRT Dakar (18,3 km, 23 stations).

Génère 4 fichiers COMPLETS.

═══ FICHIER 1 : brt_dakar_app/state.py ═══

import reflex as rx
import pandas as pd
from brt_dakar_app.data.kpi_engine import *

class State(rx.State):
    # ── Filtres réactifs ──
    filtre_ligne: str = "Toutes"
    filtre_zone: str = "Toutes"
    filtre_tranche: str = "Toutes"
    filtre_type_jour: str = "Tous"
    filtre_saison: str = "Toutes"
    sidebar_collapsed: bool = False

    # ── Actions filtres ──
    def set_filtre_ligne(self, val: str): self.filtre_ligne = val
    def set_filtre_zone(self, val: str): self.filtre_zone = val
    def set_filtre_tranche(self, val: str): self.filtre_tranche = val
    def set_filtre_type_jour(self, val: str): self.filtre_type_jour = val
    def set_filtre_saison(self, val: str): self.filtre_saison = val
    def toggle_sidebar(self): self.sidebar_collapsed = not self.sidebar_collapsed

    # ── Dataset filtré (computed var) ──
    @rx.var
    def df_filtered(self) -> list[dict]:
        df = pd.read_parquet("brt_dakar_app/data/brt_clean.parquet")
        if self.filtre_ligne != "Toutes":
            df = df[df["ligne"] == self.filtre_ligne]
        if self.filtre_zone != "Toutes":
            df = df[df["zone_station"] == self.filtre_zone]
        if self.filtre_tranche != "Toutes":
            df = df[df["tranche_horaire"] == self.filtre_tranche]
        if self.filtre_type_jour != "Tous":
            df = df[df["type_jour"] == self.filtre_type_jour]
        if self.filtre_saison != "Toutes":
            df = df[df["saison"] == self.filtre_saison]
        return df.to_dict(orient="records")

    # ── KPIs globaux ──
    @rx.var
    def kpis(self) -> dict:
        df = pd.DataFrame(self.df_filtered)
        if df.empty:
            return {"otp_pct":0,"delay_moyen":0,"dwell_moyen_s":90,
                    "total_passagers":0,"load_factor_pct":0,
                    "vehicle_availability_pct":0,"revenus_total":0,
                    "cout_par_pax":0,"revenue_par_pax":0,"operating_ratio":0,
                    "otp_status":"critical","dwell_status":"ok"}
        return get_kpis_globaux(df)

    # ── Toutes les autres computed vars ──
    @rx.var
    def ridership_par_heure(self) -> list[dict]:
        return get_ridership_par_heure(pd.DataFrame(self.df_filtered))\
               .to_dict(orient="records")

    @rx.var
    def ridership_par_station(self) -> list[dict]:
        return get_ridership_par_station(pd.DataFrame(self.df_filtered))\
               .to_dict(orient="records")

    @rx.var
    def ridership_par_zone(self) -> list[dict]:
        return get_ridership_par_zone(pd.DataFrame(self.df_filtered))\
               .to_dict(orient="records")

    @rx.var
    def otp_par_ligne(self) -> list[dict]:
        return get_otp_par_ligne(pd.DataFrame(self.df_filtered))\
               .to_dict(orient="records")

    @rx.var
    def otp_par_station(self) -> list[dict]:
        return get_otp_par_station(pd.DataFrame(self.df_filtered))\
               .to_dict(orient="records")

    @rx.var
    def otp_par_heure(self) -> list[dict]:
        return get_otp_par_heure(pd.DataFrame(self.df_filtered))\
               .to_dict(orient="records")

    @rx.var
    def heatmap_data(self) -> dict:
        df = pd.DataFrame(self.df_filtered)
        pivot = get_heatmap_data(df)
        return {
            "stations": list(pivot.index),
            "heures": [int(c) for c in pivot.columns if c != "_order"],
            "values": pivot.values.tolist()
        }

    @rx.var
    def trends_7j(self) -> list[dict]:
        return get_trends_7j(pd.DataFrame(self.df_filtered))\
               .to_dict(orient="records")

    @rx.var
    def finance_par_ligne(self) -> list[dict]:
        return get_finance_par_ligne(pd.DataFrame(self.df_filtered))\
               .to_dict(orient="records")

    @rx.var
    def finance_par_zone(self) -> list[dict]:
        return get_finance_par_zone(pd.DataFrame(self.df_filtered))\
               .to_dict(orient="records")

    @rx.var
    def impact_saison(self) -> list[dict]:
        return get_impact_saison(pd.DataFrame(self.df_filtered))\
               .to_dict(orient="records")

═══ FICHIER 2 : brt_dakar_app/components/sidebar.py ═══

Génère une sidebar premium avec ces specs exactes :

DESIGN :
- Fond : #0D1117
- Largeur : 240px (ou 64px si collapsed)
- Border right : 1px solid #30363D
- Transition collapse : 0.25s ease

STRUCTURE :
- Header : logo SVG bus électrique + "Sunu BRT" (masqué si collapsed)
  + sous-titre "Dakar · 23 stations" en gris
- Séparateur #30363D
- Menu items (chacun) :
  · Icône Reflex (rx.icon) 20px
  · Texte label (masqué si collapsed)
  · Fond transparent → on hover : background rgba(26,111,164,0.12)
  · Si page active : border-left 2px solid #1A6FA4, text #1A6FA4, bg rgba(26,111,164,0.08)
  · Transition : 0.15s ease-in-out
  · Padding : 10px 16px, border-radius 8px, margin 2px 8px
- Items du menu :
  1. Accueil (route="/") — icône "layout-dashboard"
  2. Opérations (route="/operations") — icône "activity"
  3. Ridership (route="/ridership") — icône "users"
  4. Flotte (route="/flotte") — icône "bus"
  5. Finance (route="/finance") — icône "trending-up"
- Footer sidebar :
  · Indicateur "LIVE" avec dot vert pulsant (animation CSS pulse 2s)
  · Texte "Données en direct" en gris 12px
  · Bouton collapse/expand (chevron)

CSS ANIMATIONS À INCLURE :
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .live-dot { animation: pulse 2s ease-in-out infinite; }

═══ FICHIER 3 : brt_dakar_app/components/kpi_card.py ═══

Génère un composant KPI card avec ces specs :

def kpi_card(
    title: str,
    value: rx.Var,
    unit: str = "",
    target: float = None,
    target_label: str = "",
    icon: str = "activity",
    color: str = "#1A6FA4",
    description: str = "",
) -> rx.Component:

DESIGN :
- Fond : #161B22
- Border : 1px solid #30363D
- Border-radius : 12px
- Padding : 20px
- Min-height : 140px
- Hover : transform translateY(-2px), box-shadow 0 8px 24px rgba(0,0,0,0.3)
- Transition : 0.2s ease

LAYOUT INTERNE :
- Row 1 : titre (12px, #8B949E, uppercase, letter-spacing 0.5px)
           + icône (20px, couleur = color, bg = color + "15", cercle 36px)
- Row 2 : valeur (32px, bold, #E6EDF3, font-variant-numeric tabular-nums)
           + unité (16px, #8B949E)
- Row 3 : badge target si fourni :
  · Vert si valeur ≥ target : "✓ Cible atteinte"
  · Orange si valeur entre 85-95% de target : "⚠ Proche cible"
  · Rouge si valeur < 85% de target : "✗ Sous la cible"
  · Taille 11px, padding 2px 8px, border-radius 99px
- Row 4 : description (12px, #8B949E) si fournie

ANIMATION au chargement :
  opacity 0→1 + translateY(8px→0) en 0.4s, avec delay progressif
  selon la position (0ms, 100ms, 200ms, 300ms, 400ms, 500ms)

═══ FICHIER 4 : brt_dakar_app/components/filters.py ═══

Génère la barre de filtres globale :

DESIGN :
- Fond : #161B22
- Border : 1px solid #30363D
- Border-radius : 8px
- Padding : 12px 16px
- Display : flex, gap 12px, wrap

FILTRES :
- Select "Ligne" : ["Toutes", "B1 — Omnibus", "B2 — Semi-express",
  "B3 — Semi-express"] → State.set_filtre_ligne
- Select "Zone" : ["Toutes", "Dakar Centre", "Grand Dakar",
  "Liberté", "Parcelles Assainies", "Grand Yoff",
  "Pikine", "Guédiawaye"] → State.set_filtre_zone
- Select "Tranche" : ["Toutes", "PointeMatin (7h-10h)",
  "HorsPointe", "PointeSoir (16h-20h)", "Nuit"] → State.set_filtre_tranche
- Select "Jour" : ["Tous", "Semaine", "Weekend",
  "JourFerie"] → State.set_filtre_type_jour
- Select "Saison" : ["Toutes", "Seche",
  "Pluies (Juil-Sept)"] → State.set_filtre_saison
- Bouton "Réinitialiser" : remet tous les filtres à leur valeur par défaut
  (créer une méthode reset_filters dans State)

Génère les 4 fichiers COMPLETS.
Test : reflex run → sidebar visible, filtres visibles, pas d'erreur.
```

**✅ Validation Étape 3 :**
- Sidebar visible avec les 5 items de menu
- `from brt_dakar_app.state import State` → pas d'erreur
- Les filtres s'affichent et sont cliquables

---

## Étape 4 — Page Accueil · Executive Summary

**Durée estimée :** 20–30 minutes
**Ce que cette étape produit :**
- Page d'accueil avec 6 KPI cards animées
- Graphique trend 7 jours (passagers + OTP)
- Top stations & statut réseau en temps réel

---

```
╔══════════════════════════════════════════════════════════════╗
║  PROMPT ÉTAPE 4 — Page Accueil BRT Dakar                     ║
╚══════════════════════════════════════════════════════════════╝

Tu es expert Reflex + Plotly + design premium Apple/Shadcn.
Contexte : Dashboard BRT Dakar — page d'accueil Executive Summary.

Génère brt_dakar_app/pages/accueil.py COMPLET.

═══ STRUCTURE DE LA PAGE ═══

import reflex as rx
import plotly.graph_objects as go
import plotly.express as px
from brt_dakar_app.state import State
from brt_dakar_app.components.kpi_card import kpi_card
from brt_dakar_app.components.filters import filters_bar

def accueil_page() -> rx.Component:
    return rx.vstack(

      # ─── HEADER ───
      rx.hstack(
        rx.vstack(
          rx.heading("Executive Summary", size="7", color="#E6EDF3"),
          rx.text("Sunu BRT Dakar — Tableau de bord opérationnel",
                  color="#8B949E", size="3"),
          align="start", spacing="0",
        ),
        rx.spacer(),
        # Badge LIVE avec dot pulsant
        rx.hstack(
          rx.box(width="8px", height="8px", border_radius="50%",
                 background="#1D9E75", class_name="live-dot"),
          rx.text("LIVE", color="#1D9E75", size="1",
                  font_weight="600", letter_spacing="1px"),
          align="center", spacing="2",
          padding="4px 10px",
          border="1px solid #30363D",
          border_radius="99px",
        ),
        width="100%", padding_bottom="24px",
      ),

      # ─── FILTRES ───
      filters_bar(),

      # ─── 6 KPI CARDS (grille 3×2) ───
      rx.grid(
        kpi_card(
          title="PONCTUALITÉ (OTP)",
          value=State.kpis["otp_pct"],
          unit="%",
          target=95.0,
          target_label="cible ≥ 95%",
          icon="check-circle",
          color="#1D9E75",
          description="% de trips avec retard ≤ 5 min",
        ),
        kpi_card(
          title="PASSAGERS AUJOURD'HUI",
          value=State.kpis["total_passagers"],
          unit="pax",
          icon="users",
          color="#1A6FA4",
          description="Total boardings toutes lignes",
        ),
        kpi_card(
          title="TAUX D'OCCUPATION",
          value=State.kpis["load_factor_pct"],
          unit="%",
          target=85.0,
          target_label="cible 70–85%",
          icon="activity",
          color="#7C3AED",
          description="Boardings / Capacité moyenne",
        ),
        kpi_card(
          title="DWELL TIME MOYEN",
          value=State.kpis["dwell_moyen_s"],
          unit="s",
          target=120.0,
          target_label="cible ≤ 120s",
          icon="timer",
          color="#E17A47",
          description="Temps d'arrêt moyen en station",
        ),
        kpi_card(
          title="VÉHICULES DISPONIBLES",
          value=State.kpis["vehicle_availability_pct"],
          unit="%",
          target=90.0,
          target_label="cible ≥ 90%",
          icon="bus",
          color="#1D9E75",
          description="Bus opérationnels / flotte totale",
        ),
        kpi_card(
          title="REVENU / PASSAGER",
          value=State.kpis["revenue_par_pax"],
          unit="FCFA",
          target=350.0,
          target_label="tarif standard 350 FCFA",
          icon="trending-up",
          color="#1D9E75",
          description="Recettes totales / nb passagers",
        ),
        columns="3", spacing="4", width="100%",
      ),

      # ─── GRAPHIQUE TREND 7 JOURS ───
      rx.box(
        rx.text("Évolution sur 7 jours", color="#E6EDF3",
                font_size="14px", font_weight="500", padding_bottom="12px"),
        rx.plotly(
          data=State.trends_chart_fig,  # computed var qui retourne la figure JSON
          layout={"height": 280},
        ),
        background="#161B22",
        border="1px solid #30363D",
        border_radius="12px",
        padding="20px",
        width="100%",
      ),

      # ─── BOTTOM ROW : Top stations + Statut réseau ───
      rx.grid(
        # Top 5 stations
        rx.box(
          rx.text("Top 5 stations", color="#E6EDF3",
                  font_size="14px", font_weight="500", padding_bottom="12px"),
          rx.foreach(
            State.ridership_par_station[:5],
            lambda s: rx.hstack(
              rx.text(s["station_name"], color="#E6EDF3", size="2"),
              rx.spacer(),
              rx.text(s["total_pax"], color="#1A6FA4", size="2", font_weight="600"),
              rx.box(  # Barre de progression
                rx.box(height="4px", background="#1A6FA4", border_radius="2px",
                       width=rx.Var(f"'{min(100, s['total_pax']//1000)}%'")),
                width="80px", background="#30363D",
                border_radius="2px", height="4px",
              ),
              width="100%", padding="8px 0",
              border_bottom="1px solid #21262D",
            )
          ),
          background="#161B22", border="1px solid #30363D",
          border_radius="12px", padding="20px",
        ),

        # Statut réseau en temps réel
        rx.box(
          rx.text("Statut réseau", color="#E6EDF3",
                  font_size="14px", font_weight="500", padding_bottom="12px"),
          # Statut B1, B2, B3
          rx.foreach(
            ["B1 — Omnibus", "B2 — Semi-express", "B3 — Semi-express"],
            lambda ligne: rx.hstack(
              rx.text(ligne, color="#E6EDF3", size="2"),
              rx.spacer(),
              rx.badge("Opérationnel", color_scheme="green", variant="soft"),
              padding="8px 0",
              border_bottom="1px solid #21262D",
              width="100%",
            )
          ),
          rx.box(height="12px"),
          # Alertes météo saison des pluies (contextuel)
          rx.hstack(
            rx.icon("cloud-rain", color="#E17A47", size=14),
            rx.text("Saison sèche — performances optimales",
                    color="#8B949E", size="1"),
            spacing="2",
          ),
          background="#161B22", border="1px solid #30363D",
          border_radius="12px", padding="20px",
        ),

        columns="2", spacing="4", width="100%",
      ),

      width="100%", spacing="4", padding="24px",
      background="#0D1117", min_height="100vh",
    )

═══ COMPUTED VAR POUR LE GRAPHIQUE TREND ═══

Dans state.py, ajoute cette computed var :

@rx.var
def trends_chart_fig(self) -> dict:
    """Retourne la figure Plotly JSON pour le graphique trend 7j."""
    import plotly.graph_objects as go
    import json
    df = pd.DataFrame(self.trends_7j)
    if df.empty:
        return go.Figure().to_dict()

    fig = go.Figure()

    # Trace 1 : Passagers (bars)
    fig.add_trace(go.Bar(
        x=df["date"].astype(str),
        y=df["boardings"],
        name="Passagers",
        marker_color="#1A6FA4",
        opacity=0.7,
        yaxis="y1",
    ))

    # Trace 2 : OTP % (line)
    fig.add_trace(go.Scatter(
        x=df["date"].astype(str),
        y=df["otp_pct"],
        name="OTP %",
        line=dict(color="#1D9E75", width=2.5),
        mode="lines+markers",
        marker=dict(size=6, color="#1D9E75"),
        yaxis="y2",
    ))

    # Ligne de cible OTP 95%
    fig.add_hline(y=95, line_dash="dot", line_color="#E17A47",
                  annotation_text="Cible OTP 95%",
                  annotation_font_color="#E17A47",
                  yref="y2")

    fig.update_layout(
        paper_bgcolor="#161B22",
        plot_bgcolor="#161B22",
        font=dict(color="#8B949E", family="system-ui"),
        height=280,
        margin=dict(l=40, r=40, t=20, b=40),
        legend=dict(
            orientation="h", yanchor="bottom", y=1.02,
            xanchor="right", x=1,
            font=dict(color="#8B949E"),
            bgcolor="rgba(0,0,0,0)",
        ),
        yaxis=dict(gridcolor="#21262D", color="#8B949E", title="Passagers"),
        yaxis2=dict(gridcolor="#21262D", color="#1D9E75",
                    title="OTP %", overlaying="y", side="right",
                    range=[80, 100]),
        xaxis=dict(gridcolor="#21262D", color="#8B949E"),
        bargap=0.3,
        hovermode="x unified",
    )
    return fig.to_dict()

Génère le fichier accueil.py COMPLET avec toutes les computed vars.
```

---

## Étape 5 — Pages Opérations, Ridership & Flotte

**Durée estimée :** 40–60 minutes
**Ce que cette étape produit :**
- Page Opérations : OTP animé, heatmap dwell time, distribution retards
- Page Ridership : heatmap animée stations×heures, treemap, Sankey zones
- Page Flotte : gauges disponibilité, consommation énergie, statut véhicules

---

```
╔══════════════════════════════════════════════════════════════╗
║  PROMPT ÉTAPE 5A — Page Opérations BRT Dakar                 ║
╚══════════════════════════════════════════════════════════════╝

Génère brt_dakar_app/pages/operations.py COMPLET.

Contexte métier :
- OTP cible BRT Dakar ≥ 95% (retard ≤ 5 min = on-time)
- Pointes très marquées 7h-10h et 16h-20h → OTP plus dégradé
- Pôles d'échange (Petersen, Grand Médine, Guédiawaye) = dwell time élevé
- Saison des pluies (juil-sept) = OTP -3 à -5 points

═══ VISUALISATION 1 : OTP PAR HEURE (line chart animé) ═══

fig_otp_heure = go.Figure()

# 3 traces : B1, B2, B3
for ligne, color in [("B1","#1A6FA4"),("B2","#1D9E75"),("B3","#E17A47")]:
    data_ligne = [d for d in State.otp_par_heure if d.get("ligne") == ligne]
    fig_otp_heure.add_trace(go.Scatter(
        x=[d["heure"] for d in data_ligne],
        y=[d["otp_pct"] for d in data_ligne],
        name=f"Ligne {ligne}",
        line=dict(color=color, width=2.5),
        mode="lines+markers",
        hovertemplate="<b>%{x}h</b><br>OTP: %{y:.1f}%<extra></extra>",
    ))

# Ligne cible 95%
fig_otp_heure.add_hline(
    y=95, line_dash="dot", line_color="#E05252", line_width=1.5,
    annotation_text="Cible 95%", annotation_font_color="#E05252",
    annotation_position="right",
)

# Zones ombrées pour les pointes
for h_start, h_end, label in [(7,10,"Pointe matin"),(16,20,"Pointe soir")]:
    fig_otp_heure.add_vrect(
        x0=h_start, x1=h_end,
        fillcolor="#1A6FA4", opacity=0.08,
        annotation_text=label, annotation_position="top left",
        annotation_font_color="#1A6FA4", annotation_font_size=11,
        line_width=0,
    )

fig_otp_heure.update_layout(
    paper_bgcolor="#161B22", plot_bgcolor="#161B22",
    font=dict(color="#8B949E"), height=320,
    xaxis=dict(title="Heure", gridcolor="#21262D",
               tickvals=list(range(5,23)),
               ticktext=[f"{h}h" for h in range(5,23)]),
    yaxis=dict(title="OTP %", gridcolor="#21262D", range=[70,100]),
    legend=dict(bgcolor="rgba(0,0,0,0)"),
    hovermode="x unified",
    margin=dict(l=50,r=50,t=30,b=50),
)

═══ VISUALISATION 2 : HEATMAP DWELL TIME STATIONS × HEURES ═══

Utilise State.heatmap_data pour construire :

fig_heatmap_dwell = go.Figure(data=go.Heatmap(
    z=State.heatmap_data["values"],         # matrice 23×19
    x=[f"{h}h" for h in State.heatmap_data["heures"]],
    y=State.heatmap_data["stations"],
    colorscale=[
        [0.0, "#0D1117"],     # aucun passager
        [0.1, "#0E3A5E"],     # très faible
        [0.3, "#1A6FA4"],     # normal
        [0.6, "#1D9E75"],     # élevé
        [0.8, "#E17A47"],     # très élevé (pointe)
        [1.0, "#E05252"],     # critique
    ],
    hoverongaps=False,
    hovertemplate="<b>%{y}</b><br>%{x}<br>Passagers: %{z:,}<extra></extra>",
    colorbar=dict(
        title="Passagers", tickfont=dict(color="#8B949E"),
        titlefont=dict(color="#8B949E"),
        bgcolor="#161B22", bordercolor="#30363D",
    ),
))

# Annotations sur les 3 pôles d'échange
for pole in ["Petersen / Papa Gueye Fall","Grand Médine",
             "Préfecture de Guédiawaye"]:
    fig_heatmap_dwell.add_annotation(
        x=0, y=pole, text="🔵 Pôle",
        font=dict(color="#1A6FA4", size=10),
        showarrow=False, xref="paper",
    )

fig_heatmap_dwell.update_layout(
    paper_bgcolor="#161B22", plot_bgcolor="#161B22",
    font=dict(color="#8B949E"), height=600,
    xaxis=dict(gridcolor="#21262D"),
    yaxis=dict(gridcolor="#21262D"),
    margin=dict(l=220, r=60, t=30, b=60),
)

═══ VISUALISATION 3 : DISTRIBUTION DES RETARDS ═══

fig_retards = go.Figure()
# Histogram
fig_retards.add_trace(go.Histogram(
    x=[d["delay_minutes"] for d in State.df_filtered],
    nbinsx=40,
    name="Distribution retards",
    marker_color="#1A6FA4",
    opacity=0.7,
    hovertemplate="Retard: %{x:.1f} min<br>Nb trips: %{y}<extra></extra>",
))
# Ligne verticale à 5 min (seuil OTP)
fig_retards.add_vline(
    x=5, line_dash="dash", line_color="#E17A47", line_width=2,
    annotation_text="Seuil OTP (5 min)",
    annotation_font_color="#E17A47",
)
fig_retards.update_layout(
    paper_bgcolor="#161B22", plot_bgcolor="#161B22",
    font=dict(color="#8B949E"), height=260,
    xaxis=dict(title="Retard (minutes)", gridcolor="#21262D", range=[0,30]),
    yaxis=dict(title="Nombre de trips", gridcolor="#21262D"),
    margin=dict(l=50,r=30,t=20,b=50),
)

═══ VISUALISATION 4 : TABLE OTP PAR STATION ═══

Génère une rx.table Reflex avec :
- Colonnes : Station | Zone | OTP % | Retard moyen | Nb trips
- Tri descendant par OTP par défaut
- Conditional formatting sur la colonne OTP :
  · ≥ 95% : badge vert "✓ 95%+"
  · 88–95% : badge orange "⚠ Moyen"
  · < 88% : badge rouge "✗ Critique"
- Highlight des 3 pôles d'échange avec fond légèrement différent
- Pagination 10 items par page

Génère le fichier operations.py COMPLET avec les 4 visualisations
intégrées dans une mise en page Reflex propre.
```

```
╔══════════════════════════════════════════════════════════════╗
║  PROMPT ÉTAPE 5B — Pages Ridership & Flotte BRT Dakar        ║
╚══════════════════════════════════════════════════════════════╝

Génère 2 fichiers COMPLETS.

═══ pages/ridership.py ═══

CONTEXTE MÉTIER :
- Forte asymétrie directionnelle : matin banlieue→centre, soir centre→banlieue
- Zones les plus denses : Parcelles Assainies, Grand Yoff, Guédiawaye
- B1 = ~60% des passagers (omnibus), B2+B3 = 40%

VISUALISATION 1 — HEATMAP ANIMÉE (Plotly frames) :

Crée une figure avec animation par heure (bouton Play/Pause) :

frames = []
for heure in range(5, 23):
    data_heure = [d for d in State.heatmap_data if d["heure"] == heure]
    frames.append(go.Frame(
        data=[go.Heatmap(
            z=[[d["boardings"] for d in data_heure]],
            x=[d["station_name"] for d in data_heure],
            colorscale="Blues",
        )],
        name=str(heure),
        layout=go.Layout(
            title_text=f"Ridership — {heure}h00"
        )
    ))

Avec sliderbar en bas (une step par heure) + boutons Play/Pause :
updatemenus=[dict(
    type="buttons", showactive=False,
    buttons=[
        dict(label="▶ Play",
             method="animate",
             args=[None, {"frame":{"duration":800},"transition":{"duration":300}}]),
        dict(label="⏸ Pause",
             method="animate",
             args=[[None], {"frame":{"duration":0},"mode":"immediate"}]),
    ],
    bgcolor="#161B22", font=dict(color="#E6EDF3"),
    x=0.05, y=1.15,
)]

VISUALISATION 2 — TREEMAP RIDERSHIP PAR STATION :

fig_treemap = px.treemap(
    pd.DataFrame(State.ridership_par_station),
    path=["zone_station", "station_name"],
    values="total_pax",
    color="total_pax",
    color_continuous_scale=[[0,"#0E3A5E"],[0.5,"#1A6FA4"],[1.0,"#1D9E75"]],
    hover_data={"zone_station":True, "total_pax":True},
    title=None,
)
fig_treemap.update_traces(
    hovertemplate="<b>%{label}</b><br>Passagers: %{value:,}<extra></extra>",
    textfont=dict(color="#E6EDF3"),
)
fig_treemap.update_layout(
    paper_bgcolor="#161B22", font=dict(color="#8B949E"),
    margin=dict(l=10,r=10,t=30,b=10), height=380,
    coloraxis_colorbar=dict(
        tickfont=dict(color="#8B949E"),
        title="Pax",
    ),
)

VISUALISATION 3 — BAR CHART RIDERSHIP PAR ZONE ET TRANCHE :

fig_zone_tranche = px.bar(
    pd.DataFrame(State.ridership_par_zone),
    x="zone_station", y="total_pax",
    color="zone_station",
    color_discrete_map={
        "Dakar Centre":"#1A6FA4",
        "Grand Dakar":"#1D9E75",
        "Liberté":"#7C3AED",
        "Parcelles Assainies":"#E17A47",
        "Grand Yoff":"#F59E0B",
        "Pikine":"#10B981",
        "Guédiawaye":"#06B6D4",
    },
    text_auto=True,
)
fig_zone_tranche.update_layout(
    paper_bgcolor="#161B22", plot_bgcolor="#161B22",
    font=dict(color="#8B949E"), height=300,
    xaxis=dict(gridcolor="#21262D", tickangle=-30),
    yaxis=dict(gridcolor="#21262D"),
    showlegend=False,
    margin=dict(l=50,r=30,t=20,b=80),
)

VISUALISATION 4 — COMPARAISON B1 vs B2 vs B3 :

fig_lignes = go.Figure()
colors_lignes = {"B1":"#1A6FA4","B2":"#1D9E75","B3":"#E17A47"}
for row in State.ridership_par_ligne:
    fig_lignes.add_trace(go.Bar(
        name=f"Ligne {row['ligne']}",
        x=[row["ligne"]],
        y=[row["total_pax"]],
        marker_color=colors_lignes.get(row["ligne"],"#8B949E"),
        text=f"{row['total_pax']:,} pax",
        textposition="outside",
    ))
fig_lignes.update_layout(
    paper_bgcolor="#161B22", plot_bgcolor="#161B22",
    font=dict(color="#8B949E"), height=280, barmode="group",
    xaxis=dict(gridcolor="#21262D"),
    yaxis=dict(gridcolor="#21262D", title="Passagers"),
    margin=dict(l=50,r=30,t=20,b=40),
    legend=dict(bgcolor="rgba(0,0,0,0)"),
)

═══ pages/flotte.py ═══

CONTEXTE MÉTIER :
- Flotte : ~144 bus articulés 100% électriques
- Disponibilité cible ≥ 90%
- Consommation cible ≤ 1,8 kWh/km (bus électrique articulé)
- MDBF (Mean Distance Between Failures) cible ≥ 15 000 km

VISUALISATION 1 — GAUGE VEHICLE AVAILABILITY :

fig_gauge = go.Figure(go.Indicator(
    mode="gauge+number+delta",
    value=State.kpis["vehicle_availability_pct"],
    number=dict(suffix="%", font=dict(color="#E6EDF3", size=40)),
    delta=dict(reference=90, increasing=dict(color="#1D9E75"),
               decreasing=dict(color="#E05252")),
    gauge=dict(
        axis=dict(range=[0,100], tickcolor="#8B949E",
                  tickfont=dict(color="#8B949E")),
        bar=dict(color="#1A6FA4"),
        bgcolor="#21262D",
        steps=[
            dict(range=[0,80], color="#3D1010"),
            dict(range=[80,90], color="#3D2810"),
            dict(range=[90,100], color="#0E2E1E"),
        ],
        threshold=dict(
            line=dict(color="#1D9E75", width=3),
            thickness=0.8, value=90,
        ),
    ),
    title=dict(text="Disponibilité flotte", font=dict(color="#8B949E")),
))
fig_gauge.update_layout(
    paper_bgcolor="#161B22", font=dict(color="#8B949E"),
    height=280, margin=dict(l=30,r=30,t=50,b=30),
)

VISUALISATION 2 — CONSOMMATION ÉNERGÉTIQUE :
Line chart avec moving average 7j si données disponibles,
sinon simuler avec ~1.6 kWh/km (valeur réaliste bus électrique 18m)
Annotation : "Cible ≤ 1,8 kWh/km" en ligne pointillée rouge

VISUALISATION 3 — TABLE STATUT FLOTTE :
rx.table avec colonnes :
Bus ID | Statut (badge coloré) | Km parcourus | Âge (ans) | Prochaine maintenance
Données simulées si pas disponibles (130 bus EnService, 14 Maintenance)

Génère les 2 fichiers COMPLETS avec mise en page Reflex propre.
```

---

## Étape 6 — Page Finance & Polish final

**Durée estimée :** 20–30 minutes
**Ce que cette étape produit :**
- Page Finance avec waterfall, treemap rentabilité, break-even
- Polish global : microinteractions CSS, transitions de page, responsive

---

```
╔══════════════════════════════════════════════════════════════╗
║  PROMPT ÉTAPE 6 — Finance + Polish global BRT Dakar          ║
╚══════════════════════════════════════════════════════════════╝

═══ FICHIER 1 : pages/finance.py ═══

CONTEXTE MÉTIER FINANCE BRT DAKAR :
- Tarif moyen : 350 FCFA/passager
- Structure coûts typique BRT africain :
  · Énergie (électricité) : ~15% des coûts
  · Maintenance véhicules : ~20%
  · Personnel (conducteurs, agents) : ~40%
  · Infrastructure/amortissement : ~15%
  · Autres (admin, communication) : ~10%
- Operating Ratio cible ≥ 100% (recettes ≥ dépenses)
- Break-even estimé : ~65 000 pax/jour pour couvrir les coûts fixes

VISUALISATION 1 — WATERFALL RECETTES vs COÛTS :

revenus = State.kpis["revenus_total"]
couts_energie = revenus * 0.15 * 0.65
couts_maintenance = revenus * 0.20 * 0.65
couts_personnel = revenus * 0.40 * 0.65
couts_infra = revenus * 0.15 * 0.65
couts_autres = revenus * 0.10 * 0.65
marge = revenus - (couts_energie + couts_maintenance +
                   couts_personnel + couts_infra + couts_autres)

fig_waterfall = go.Figure(go.Waterfall(
    name="Compte d'exploitation BRT",
    orientation="v",
    measure=["absolute","relative","relative","relative","relative","relative","total"],
    x=["Revenus bruts","- Énergie","- Maintenance",
       "- Personnel","- Infrastructure","- Autres","Marge nette"],
    y=[revenus, -couts_energie, -couts_maintenance,
       -couts_personnel, -couts_infra, -couts_autres, 0],
    text=[f"{v/1e6:.1f}M" for v in [revenus, couts_energie, couts_maintenance,
          couts_personnel, couts_infra, couts_autres, marge]],
    textposition="outside",
    increasing=dict(marker=dict(color="#1D9E75")),
    decreasing=dict(marker=dict(color="#E05252")),
    totals=dict(marker=dict(color="#1A6FA4")),
    connector=dict(line=dict(color="#30363D", width=1, dash="dot")),
    hovertemplate="<b>%{x}</b><br>Montant: %{y:,.0f} FCFA<extra></extra>",
))
fig_waterfall.update_layout(
    paper_bgcolor="#161B22", plot_bgcolor="#161B22",
    font=dict(color="#8B949E"), height=360,
    xaxis=dict(gridcolor="#21262D"),
    yaxis=dict(gridcolor="#21262D", title="FCFA"),
    margin=dict(l=60,r=30,t=30,b=60),
    showlegend=False,
)

VISUALISATION 2 — RENTABILITÉ PAR LIGNE (clustered bar) :

fig_rentabilite = go.Figure()
for row in State.finance_par_ligne:
    fig_rentabilite.add_trace(go.Bar(
        name=f"Revenus {row['ligne']}",
        x=[row["ligne"]], y=[row["revenus"]],
        marker_color={"B1":"#1A6FA4","B2":"#1D9E75","B3":"#E17A47"}[row["ligne"]],
        text=f"{row['revenus']/1e6:.1f}M FCFA", textposition="outside",
    ))
    # Annotation Operating Ratio
    fig_rentabilite.add_annotation(
        x=row["ligne"], y=row["revenus"] * 1.05,
        text=f"OR: {row['operating_ratio']:.0f}%",
        font=dict(color="#8B949E", size=11), showarrow=False,
    )

VISUALISATION 3 — TREEMAP RENTABILITÉ PAR ZONE :

fig_treemap_fin = px.treemap(
    pd.DataFrame(State.finance_par_zone),
    path=["zone_station"],
    values="revenus",
    color="marge",
    color_continuous_scale=[[0,"#3D1010"],[0.5,"#E17A47"],[1.0,"#1D9E75"]],
    hover_data={"revenus":True,"couts":True,"marge":True,"rev_par_pax":True},
)

VISUALISATION 4 — BREAK-EVEN ANALYSIS :

fig_breakeven = go.Figure()
pax_range = list(range(0, 120000, 5000))
revenus_range = [p * 350 for p in pax_range]
couts_fixes = revenus_range[13] * 0.65 * 0.50  # 50% coûts sont fixes
couts_variables = [p * 350 * 0.65 * 0.50 for p in pax_range]
couts_totaux = [couts_fixes + cv for cv in couts_variables]

fig_breakeven.add_trace(go.Scatter(
    x=pax_range, y=revenus_range, name="Revenus",
    line=dict(color="#1D9E75", width=2.5),
))
fig_breakeven.add_trace(go.Scatter(
    x=pax_range, y=couts_totaux, name="Coûts totaux",
    line=dict(color="#E05252", width=2.5),
))
# Zone break-even
fig_breakeven.add_vline(
    x=65000, line_dash="dash", line_color="#1A6FA4", line_width=2,
    annotation_text="Break-even ~65k pax",
    annotation_font_color="#1A6FA4",
)
fig_breakeven.add_vrect(
    x0=0, x1=65000, fillcolor="#3D1010", opacity=0.15,
    annotation_text="Zone déficitaire", annotation_position="top left",
    annotation_font_color="#E05252", line_width=0,
)
fig_breakeven.add_vrect(
    x0=65000, x1=120000, fillcolor="#0E2E1E", opacity=0.15,
    annotation_text="Zone bénéficiaire", annotation_position="top right",
    annotation_font_color="#1D9E75", line_width=0,
)

═══ FICHIER 2 : POLISH CSS GLOBAL ═══

Dans brt_dakar_app.py, injecte ce CSS global complet :

/* ─── GLOBAL ─── */
* { box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
               "Segoe UI", Helvetica, Arial, sans-serif;
  background: #0D1117;
  color: #E6EDF3;
  -webkit-font-smoothing: antialiased;
}

/* ─── SCROLLBAR CUSTOM ─── */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #0D1117; }
::-webkit-scrollbar-thumb { background: #30363D; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #8B949E; }

/* ─── ANIMATIONS ─── */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.95); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes countUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-16px); }
  to { opacity: 1; transform: translateX(0); }
}

/* ─── COMPOSANTS ─── */
.live-dot {
  animation: pulse 2s ease-in-out infinite;
  display: inline-block;
}
.kpi-card {
  animation: fadeInUp 0.4s ease forwards;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.kpi-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(26, 111, 164, 0.15);
}
.kpi-value {
  font-variant-numeric: tabular-nums;
  animation: countUp 0.6s ease forwards;
}
.sidebar-item {
  transition: background 0.15s ease, color 0.15s ease,
              border-left-color 0.15s ease;
}
.sidebar-item:hover {
  background: rgba(26, 111, 164, 0.12);
}
.sidebar-item.active {
  background: rgba(26, 111, 164, 0.08);
  border-left: 2px solid #1A6FA4;
  color: #1A6FA4;
}
.page-enter {
  animation: fadeInUp 0.25s ease forwards;
}
.filter-bar select {
  background: #21262D;
  border: 1px solid #30363D;
  color: #E6EDF3;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 13px;
  cursor: pointer;
  transition: border-color 0.15s ease;
}
.filter-bar select:focus {
  border-color: #1A6FA4;
  outline: none;
}
.chart-container {
  background: #161B22;
  border: 1px solid #30363D;
  border-radius: 12px;
  padding: 20px;
  transition: border-color 0.2s ease;
}
.chart-container:hover {
  border-color: rgba(26, 111, 164, 0.4);
}

/* ─── RESPONSIVE ─── */
@media (max-width: 768px) {
  .kpi-grid { grid-template-columns: repeat(2, 1fr) !important; }
  .sidebar { width: 64px !important; }
  .sidebar .sidebar-label { display: none !important; }
}
@media (max-width: 480px) {
  .kpi-grid { grid-template-columns: 1fr !important; }
}

Applique ces classes aux composants dans les pages correspondantes.
Génère les 2 fichiers COMPLETS.
```

---

## Étape 7 — Déploiement gratuit

**Durée estimée :** 15–20 minutes
**Ce que cette étape produit :**
- App déployée sur URL publique `.reflex.run`
- Pipeline GitHub Actions pour déploiement automatique
- Dockerfile de secours (Render/Railway)

---

```
╔══════════════════════════════════════════════════════════════╗
║  PROMPT ÉTAPE 7 — Déploiement BRT Dakar Dashboard            ║
╚══════════════════════════════════════════════════════════════╝

Génère tous les fichiers de déploiement COMPLETS.

═══ OPTION A : Reflex Cloud (RECOMMANDÉ — 0 coût) ═══

Génère les commandes dans l'ordre exact :

  # 1. Créer compte sur https://cloud.reflex.dev (gratuit)
  # 2. Login
  reflex login

  # 3. Déployer (depuis le dossier racine du projet)
  reflex deploy --app brt_dakar_app

  # L'app sera accessible sur :
  # https://brt-dakar-app.reflex.run

═══ OPTION B : Dockerfile pour Render/Railway (fallback) ═══

Génère Dockerfile :

  FROM python:3.12-slim

  # Dépendances système
  RUN apt-get update && apt-get install -y \
      curl unzip nodejs npm \
      && rm -rf /var/lib/apt/lists/*

  WORKDIR /app

  # Dépendances Python
  COPY requirements.txt .
  RUN pip install --no-cache-dir -r requirements.txt

  # Code
  COPY . .

  # Générer le dataset au build
  RUN python brt_dakar_app/data/data_loader.py

  # Initialiser Reflex
  RUN reflex init

  # Exposer ports (frontend + backend)
  EXPOSE 3000 8000

  # Lancer
  CMD ["reflex", "run", "--env", "prod", \
       "--backend-host", "0.0.0.0", \
       "--frontend-host", "0.0.0.0"]

═══ CI/CD : .github/workflows/deploy.yml ═══

Génère :

  name: Deploy BRT Dakar Dashboard

  on:
    push:
      branches: [main]

  jobs:
    deploy:
      runs-on: ubuntu-latest
      steps:
        - name: Checkout code
          uses: actions/checkout@v4

        - name: Setup Python 3.12
          uses: actions/setup-python@v5
          with:
            python-version: "3.12"
            cache: "pip"

        - name: Install dependencies
          run: pip install -r requirements.txt

        - name: Generate dataset
          run: python brt_dakar_app/data/data_loader.py

        - name: Deploy to Reflex Cloud
          run: reflex deploy --app brt_dakar_app --token ${{ secrets.REFLEX_TOKEN }}
          env:
            REFLEX_TOKEN: ${{ secrets.REFLEX_TOKEN }}

  Et explique les 3 étapes pour configurer :
  1. Aller sur cloud.reflex.dev → Settings → API Tokens → Créer token
  2. Dans GitHub : Settings → Secrets → Actions → New secret
     Nom : REFLEX_TOKEN, Valeur : [le token copié]
  3. Pusher sur main → le déploiement se déclenche automatiquement

═══ .gitignore ═══

Génère :

  # Python
  __pycache__/
  *.pyc
  *.pyo
  .env
  .venv/
  venv/

  # Reflex
  .web/
  .states/
  *.db

  # Data (régénéré au build)
  brt_dakar_app/data/brt_clean.parquet

  # Node
  node_modules/

  # OS
  .DS_Store
  Thumbs.db

═══ build.sh ═══

Génère un script de build production :

  #!/bin/bash
  set -e

  echo "🚌 Build BRT Dakar Dashboard..."

  # 1. Installer les dépendances
  pip install -r requirements.txt

  # 2. Régénérer le dataset propre depuis les sources
  echo "📊 Régénération du dataset..."
  python brt_dakar_app/data/data_loader.py

  # 3. Vérifier que le parquet existe
  if [ ! -f "brt_dakar_app/data/brt_clean.parquet" ]; then
      echo "❌ Erreur : brt_clean.parquet non généré"
      exit 1
  fi

  echo "✅ Dataset OK"

  # 4. Déployer
  echo "🚀 Déploiement sur Reflex Cloud..."
  reflex deploy --app brt_dakar_app

  echo "✅ Déployé ! URL : https://brt-dakar-app.reflex.run"

  chmod +x build.sh

Génère TOUS les fichiers.
Donne les commandes dans l'ordre exact pour déployer depuis zéro.
```

**✅ Validation finale :**
- App accessible sur `https://brt-dakar-app.reflex.run`
- Toutes les 5 pages fonctionnelles
- Push sur `main` → déploiement automatique via GitHub Actions

---

## Annexe A — Règles Métier BRT complètes

### A.1 Ponctualité & Fiabilité

| KPI | Formule | Cible BRT Dakar | Alerte |
|-----|---------|-----------------|--------|
| **OTP %** | `Trips_on_time / Total_trips × 100` | ≥ 95% | < 88% → Critique |
| **Retard moyen** | `mean(delay_minutes where delay > 0)` | ≤ 3 min | > 8 min → Alerte |
| **Régularité (CV)** | `std(headway) / mean(headway) × 100` | ≤ 20% | > 35% → Alerte |
| **Missed Trips** | `Trips_annulés / Trips_programmés × 100` | ≤ 2% | > 5% → Critique |
| **On-Time flag** | `1 if delay ≤ 5 min else 0` | — | Colonne binaire |

### A.2 Affluence & Utilisation

| KPI | Formule | Cible | Notes |
|-----|---------|-------|-------|
| **Ridership total** | `SUM(boardings)` | 80-100k pax/j | Objectif LT : 300k |
| **Load Factor %** | `Boardings / Capacity × 100` | 70–85% | > 100% = surcharge |
| **Boardings/heure** | `SUM(boardings) / Heures_service` | — | Max en pointe |
| **Peak Hour Factor** | `Ridership_pointe / Ridership_moyen_journalier` | — | Indicateur asymétrie |
| **Station Index** | `Boardings_station / mean(Boardings_all)` | — | > 2 = pôle fort |

### A.3 Dwell Time

| Condition | Valeur attendue | Statut |
|-----------|-----------------|--------|
| Station standard hors pointe | 60–90 s | ✅ OK |
| Station standard en pointe | 90–120 s | ✅ OK |
| Pôle d'échange hors pointe | 100–140 s | ⚠ Élevé |
| Pôle d'échange en pointe | 140–180 s | ⚠ Élevé |
| > 180 s (hors panne) | Anomalie | ❌ Critique |
| > 600 s | Incident → flag | ❌ Anomalie |

### A.4 Finance

| KPI | Formule | Valeur BRT Dakar |
|-----|---------|------------------|
| **Revenu/pax** | `Recettes / Nb_passagers` | ~350 FCFA |
| **Coût/pax** | `Coûts_totaux / Nb_passagers` | ~228 FCFA |
| **Operating Ratio** | `Recettes / Dépenses × 100` | Cible ≥ 100% |
| **Break-even** | `Coûts_fixes / (Tarif - CoûtVariable_pax)` | ~65 000 pax/jour |
| **Coût/km** | `Coûts_totaux / km_commerciaux` | ~1 200 FCFA/km |
| **Conso énergie** | `kWh / km` | Cible ≤ 1,8 kWh/km |

---

## Annexe B — Palette & Design système

### B.1 Couleurs BRT

| Variable | Hex | Usage |
|----------|-----|-------|
| `--brt-blue` | `#1A6FA4` | Accent principal, liens, boutons, icônes actives |
| `--brt-green` | `#1D9E75` | Succès, OTP ≥ 95%, revenus positifs, statut OK |
| `--brt-orange` | `#E17A47` | Alertes, dwell time élevé, KPI proche cible |
| `--brt-red` | `#E05252` | Erreurs, retards critiques, KPI sous cible |
| `--brt-dark` | `#0D1117` | Fond global (GitHub Dark) |
| `--brt-card` | `#161B22` | Fond des cartes, panels, sidebar |
| `--brt-card-hover`| `#21262D` | Fond au hover |
| `--brt-border` | `#30363D` | Bordures, séparateurs |
| `--brt-text` | `#E6EDF3` | Texte principal |
| `--brt-muted` | `#8B949E` | Labels, sous-titres, axes graphiques |

### B.2 Règles typographiques

```
Valeurs KPI       → 32px, font-weight 600, tabular-nums
Titres page       → 24px, font-weight 600
Titres section    → 16px, font-weight 500
Labels            → 12px, uppercase, letter-spacing 0.5px
Body text         → 14px, font-weight 400
Annotations       → 11px, color muted
```

### B.3 Colorscale Plotly recommandée (heatmaps BRT)

```python
BRT_COLORSCALE = [
    [0.0,  "#0D1117"],   # vide/nuit
    [0.1,  "#0E3A5E"],   # très faible
    [0.25, "#1A6FA4"],   # faible
    [0.5,  "#1D9E75"],   # normal
    [0.75, "#E17A47"],   # élevé (pointe)
    [1.0,  "#E05252"],   # critique (saturation)
]
```

---

## Annexe C — Checklist de livraison

| # | Critère | Commande de test |
|---|---------|-----------------|
| 1 | App Reflex démarre | `reflex run` → 0 erreur |
| 2 | Dataset nettoyé et Parquet généré | `ls brt_dakar_app/data/brt_clean.parquet` |
| 3 | Les 23 stations présentes | `python -c "import pandas as pd; df=pd.read_parquet('brt_dakar_app/data/brt_clean.parquet'); print(df['station_name'].nunique())"` |
| 4 | Toutes les features créées | Vérifier colonnes : `tranche_horaire`, `zone_station`, `is_on_time`, `pole_echange`, `load_factor_pct` |
| 5 | 5 pages accessibles | `http://localhost:3000/`, `/operations`, `/ridership`, `/flotte`, `/finance` |
| 6 | 6 KPI cards avec données réelles | Page accueil → valeurs non nulles |
| 7 | Filtres réactifs | Changer Ligne → KPIs se mettent à jour |
| 8 | Heatmap animée | Page ridership → bouton Play fonctionne |
| 9 | Design dark cohérent | Vérifier visuellement toutes les pages |
| 10 | App déployée publiquement | `https://brt-dakar-app.reflex.run` accessible |
| 11 | CI/CD fonctionnel | Push sur `main` → GitHub Actions passe ✅ |
| 12 | Responsive mobile | Chrome DevTools → 375px → layout correct |

---

*PRD v2.0 — Sunu BRT Dakar Dashboard · Mouhamadou Makhtar DIOUF · Mai 2026*
*Stack : Python · Reflex · Plotly · Parquet — Hébergement : Reflex Cloud (Free)*