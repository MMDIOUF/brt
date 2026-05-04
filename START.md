# SunuBRT Dashboard — Guide de démarrage

## Chemins essentiels

| Rôle | Chemin |
|------|--------|
| Racine workspace | `C:\Users\7MAKSACOD\OneDrive\Desktop\brt\` |
| Application dashboard | `C:\Users\7MAKSACOD\OneDrive\Desktop\brt\brtintern-main\` |
| Source données Excel | `C:\Users\7MAKSACOD\OneDrive\Desktop\brt\brt data.xlsx` |
| Bridge Python v3.0 | `C:\Users\7MAKSACOD\OneDrive\Desktop\brt\generate_real_data.py` |
| Watcher auto | `C:\Users\7MAKSACOD\OneDrive\Desktop\brt\watch_data.py` |
| Scraper SunuBRT | `C:\Users\7MAKSACOD\OneDrive\Desktop\brt\scrape_sunubrt.py` |
| Notebook analyse | `C:\Users\7MAKSACOD\OneDrive\Desktop\brt\notebooks\analysis_and_viz.ipynb` |
| Python 3.10 | `C:\Users\7MAKSACOD\AppData\Local\Programs\Python\Python310\python.exe` |

---

## Démarrage standard (dev)

Ouvrir **deux terminaux** dans `C:\Users\7MAKSACOD\OneDrive\Desktop\brt\`

### Terminal 1 — Watcher données (optionnel mais recommandé)
```powershell
python watch_data.py
```
> Surveille `brt data.xlsx` toutes les 3s. Si le fichier change, relance automatiquement le bridge et Vite HMR recharge le dashboard.

### Terminal 2 — Dashboard
```powershell
.\run_intern.ps1
```
ou manuellement :
```powershell
Set-Location brtintern-main
npm run dev
```
Dashboard accessible sur **http://localhost:5173**  
PIN d'accès : **`brt2024`**

---

## Régénérer les données manuellement

Si tu modifies `brt data.xlsx` sans le watcher actif :
```powershell
python generate_real_data.py
```
Génère :
- `brtintern-main\src\lib\real-data.ts` — données TypeScript injectées dans le dashboard
- `brtintern-main\public\data-meta.json` — horodatage affiché dans le badge de fraîcheur

---

## Scraper SunuBRT (données live)

```powershell
python scrape_sunubrt.py
```
Génère `brtintern-main\public\sunubrt-live.json` — lu toutes les 5 min par le hook `useLiveData()`.

---

## Build production

```powershell
Set-Location brtintern-main
npm run build
```
Output dans `brtintern-main\dist\`

Pour prévisualiser le build :
```powershell
npx vite preview --port 5173
```

---

## Dépendances Python

```powershell
pip install -r requirements.txt
```
Packages clés : `pandas`, `openpyxl`, `numpy`, `requests`, `beautifulsoup4`

---

## Structure workspace

```
brt/
├── brtintern-main/          ← dashboard React (projet actif)
│   ├── src/
│   │   ├── routes/          ← 10 pages (index, operations, ridership…)
│   │   ├── lib/
│   │   │   ├── real-data.ts ← généré par le bridge (ne pas éditer)
│   │   │   ├── data.ts      ← types + transformations
│   │   │   └── use-filtered-data.ts ← hook unique pour toutes les pages
│   │   └── components/cockpit/  ← KpiCard, Section, PageShell…
│   └── public/
│       ├── data-meta.json   ← horodatage bridge
│       └── sunubrt-live.json ← données scraper
├── notebooks/
│   └── analysis_and_viz.ipynb
├── brt data.xlsx            ← source vérité (9 feuilles star schema)
├── generate_real_data.py    ← bridge Excel → TypeScript
├── watch_data.py            ← watcher MD5 auto
├── scrape_sunubrt.py        ← scraper sunubrt.sn
├── run_intern.ps1           ← raccourci démarrage dashboard
└── requirements.txt
```

---

## Routes du dashboard

| URL | Page |
|-----|------|
| `/` | Executive (vue globale) |
| `/operations` | Opérations & ponctualité |
| `/ridership` | Fréquentation passagers |
| `/finance` | Finances & rentabilité |
| `/fleet` | Flotte & maintenance |
| `/hr` | Ressources humaines |
| `/cx` | Expérience client |
| `/stations` | Stations & criticité |
| `/alerts` | Alertes réseau |
| `/analytics` | Analytics avancés |

---

## Workflow mise à jour données

```
Modifier brt data.xlsx
        ↓
watch_data.py détecte le changement (MD5)
        ↓
generate_real_data.py s'exécute automatiquement
        ↓
real-data.ts est mis à jour
        ↓
Vite HMR recharge le dashboard dans le navigateur
```
