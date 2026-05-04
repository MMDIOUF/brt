// FICHIER AUTO-GENERE — NE PAS EDITER MANUELLEMENT
// Source: brt data.xlsx | Generé: 2026-05-04T13:36:37
// Lignes: 100,000 | Jours: 364 | Bridge v3.0

export const realData = {
  "meta": {
    "generated_at": "2026-05-04T13:36:37",
    "source": "brt data.xlsx",
    "rows": 100000,
    "n_days": 364,
    "bridge_version": "3.0"
  },
  "networkScore": 75,
  "kpis": [
    {
      "id": "otp",
      "label": "OTP Réseau",
      "value": "73.3%",
      "delta": "-2.7 pt vs S-1",
      "trend": "down",
      "status": "critical",
      "icon": "Timer",
      "description": "% passages ≤ 5 min de retard",
      "target": "≥ 88%"
    },
    {
      "id": "pain",
      "label": "Pain Index",
      "value": "43.8 / 100",
      "delta": "+1.2 pt vs S-1",
      "trend": "down",
      "status": "warning",
      "icon": "Heart",
      "description": "Indice d'inconfort composite (bas = bon)",
      "target": "< 30"
    },
    {
      "id": "regularity",
      "label": "Régularité headway",
      "value": "87.6%",
      "delta": "Headway médian 9.8 min",
      "trend": "up",
      "status": "success",
      "icon": "Activity",
      "description": "% intervalles dans ±30% de la cible 6 min",
      "target": "≥ 80%"
    },
    {
      "id": "ridership",
      "label": "Passagers / jour",
      "value": "17 730",
      "delta": "+16.4% vs S-1",
      "trend": "up",
      "status": "critical",
      "icon": "Users",
      "description": "Capacite max: 300 000 pass/j",
      "target": "≥ 80 000"
    },
    {
      "id": "peak_load",
      "label": "Charge pointe",
      "value": "101.3%",
      "delta": "+2.0 pt vs S-1",
      "trend": "up",
      "status": "critical",
      "icon": "Gauge",
      "description": "Load factor moyen 6-10h et 16-20h",
      "target": "70–90%"
    },
    {
      "id": "rev_per_km",
      "label": "Recettes / km",
      "value": "16.0 k FCFA",
      "delta": "Coût/km: 10.4 k FCFA",
      "trend": "up",
      "status": "success",
      "icon": "Wallet",
      "description": "Ratio exploitation 1.54x",
      "target": "> coût/km"
    },
    {
      "id": "carbon",
      "label": "CO₂ évité",
      "value": "255 kg/j",
      "delta": "93 t CO₂/an",
      "trend": "down",
      "status": "success",
      "icon": "Leaf",
      "description": "vs flotte diesel equivalente",
      "target": "max"
    },
    {
      "id": "fleet",
      "label": "Disponibilité flotte",
      "value": "93.3%",
      "delta": "140 / 150 bus actifs",
      "trend": "up",
      "status": "success",
      "icon": "Bus",
      "description": "Taux de disponibilite flotte BYD K9",
      "target": "≥ 90%"
    }
  ],
  "summary": {
    "n_days": 364,
    "total_pax": 6453918,
    "daily_pax": 17730,
    "otp_pct": 73.3,
    "delay_mean_min": 4.2,
    "delay_p95_min": 8.0,
    "load_pct": 65.1,
    "peak_load_pct": 101.3,
    "offpeak_load_pct": 32.5,
    "pain_index": 43.8,
    "satisfaction": 56.2,
    "headway_median_min": 9.8,
    "headway_reg_pct": 87.6,
    "freq_adherence_pct": 68.8,
    "fleet_pct": 93.3,
    "fleet_active": 140,
    "fleet_total": 150,
    "rev_per_km_kfcfa": 16.0,
    "cost_per_km_kfcfa": 10.4,
    "rev_per_pax_fcfa": 372,
    "cost_per_pax_fcfa": 242,
    "co2_saved_kg_day": 255.0,
    "co2_saved_t_year": 93.2,
    "breakeven_pax_day": 11524,
    "dwell_avg_sec": 29.0,
    "dwell_efficiency_pct": 97.7,
    "pax_km_total": 59.05,
    "network_avail_pct": 100.0,
    "op_ratio": 1.54,
    "rev_30_mfcfa": 197.9,
    "network_score": 75
  },
  "lineMetrics": {
    "B1": {
      "otp_pct": 72.2,
      "delay_mean_min": 4.2,
      "delay_p95_min": 8.0,
      "daily_pax": 5947,
      "load_pct": 65.3,
      "peak_load_pct": 101.1,
      "pain_index": 44.1,
      "satisfaction": 55.9,
      "headway_med_min": 8.5,
      "headway_reg_pct": 81.6,
      "freq_adh_pct": 100.0,
      "revenue_mfcfa": 805.4,
      "speed_kmh": 24.8,
      "dwell_avg_sec": 29.0,
      "n_days": 364,
      "status": "critical"
    },
    "B2": {
      "otp_pct": 73.7,
      "delay_mean_min": 4.2,
      "delay_p95_min": 8.0,
      "daily_pax": 5885,
      "load_pct": 64.8,
      "peak_load_pct": 101.3,
      "pain_index": 43.4,
      "satisfaction": 56.6,
      "headway_med_min": 13.3,
      "headway_reg_pct": 93.7,
      "freq_adh_pct": 100.0,
      "revenue_mfcfa": 796.9,
      "speed_kmh": 26.7,
      "dwell_avg_sec": 29.1,
      "n_days": 364,
      "status": "critical"
    },
    "B3": {
      "otp_pct": 74.0,
      "delay_mean_min": 4.2,
      "delay_p95_min": 8.0,
      "daily_pax": 5897,
      "load_pct": 65.2,
      "peak_load_pct": 101.4,
      "pain_index": 43.8,
      "satisfaction": 56.2,
      "headway_med_min": 10.3,
      "headway_reg_pct": 87.4,
      "freq_adh_pct": 100.0,
      "revenue_mfcfa": 798.6,
      "speed_kmh": 32.1,
      "dwell_avg_sec": 28.9,
      "n_days": 364,
      "status": "critical"
    }
  },
  "trend30d": [
    {
      "day": "J-29",
      "passengers": 23179,
      "otp": 85.8,
      "painIndex": 47.2,
      "loadFactor": 70.2,
      "revenue": 8.62,
      "headway": 10.1
    },
    {
      "day": "J-28",
      "passengers": 19818,
      "otp": 88.1,
      "painIndex": 47.2,
      "loadFactor": 71.7,
      "revenue": 7.37,
      "headway": 10.2
    },
    {
      "day": "J-27",
      "passengers": 19858,
      "otp": 93.8,
      "painIndex": 43.7,
      "loadFactor": 69.7,
      "revenue": 7.39,
      "headway": 10.3
    },
    {
      "day": "J-26",
      "passengers": 17082,
      "otp": 94.5,
      "painIndex": 45.2,
      "loadFactor": 72.3,
      "revenue": 6.35,
      "headway": 9.9
    },
    {
      "day": "J-25",
      "passengers": 11761,
      "otp": 90.9,
      "painIndex": 40.0,
      "loadFactor": 49.7,
      "revenue": 4.38,
      "headway": 10.0
    },
    {
      "day": "J-24",
      "passengers": 12043,
      "otp": 87.7,
      "painIndex": 38.2,
      "loadFactor": 46.4,
      "revenue": 4.48,
      "headway": 10.0
    },
    {
      "day": "J-23",
      "passengers": 19748,
      "otp": 82.9,
      "painIndex": 49.1,
      "loadFactor": 72.2,
      "revenue": 7.35,
      "headway": 10.1
    },
    {
      "day": "J-22",
      "passengers": 18421,
      "otp": 92.1,
      "painIndex": 45.8,
      "loadFactor": 71.0,
      "revenue": 6.85,
      "headway": 10.1
    },
    {
      "day": "J-21",
      "passengers": 21099,
      "otp": 90.3,
      "painIndex": 46.5,
      "loadFactor": 72.7,
      "revenue": 7.85,
      "headway": 9.8
    },
    {
      "day": "J-20",
      "passengers": 20621,
      "otp": 98.3,
      "painIndex": 42.8,
      "loadFactor": 69.7,
      "revenue": 7.67,
      "headway": 9.8
    },
    {
      "day": "J-19",
      "passengers": 20629,
      "otp": 90.9,
      "painIndex": 47.1,
      "loadFactor": 73.7,
      "revenue": 7.67,
      "headway": 9.7
    },
    {
      "day": "J-18",
      "passengers": 12787,
      "otp": 92.4,
      "painIndex": 38.1,
      "loadFactor": 47.5,
      "revenue": 4.76,
      "headway": 9.9
    },
    {
      "day": "J-17",
      "passengers": 14151,
      "otp": 93.8,
      "painIndex": 39.5,
      "loadFactor": 51.5,
      "revenue": 5.26,
      "headway": 9.8
    },
    {
      "day": "J-16",
      "passengers": 23148,
      "otp": 93.3,
      "painIndex": 46.9,
      "loadFactor": 76.9,
      "revenue": 8.61,
      "headway": 9.8
    },
    {
      "day": "J-15",
      "passengers": 19618,
      "otp": 87.3,
      "painIndex": 45.8,
      "loadFactor": 72.2,
      "revenue": 7.3,
      "headway": 10.0
    },
    {
      "day": "J-14",
      "passengers": 21431,
      "otp": 91.4,
      "painIndex": 47.3,
      "loadFactor": 74.8,
      "revenue": 7.97,
      "headway": 9.7
    },
    {
      "day": "J-13",
      "passengers": 18655,
      "otp": 95.7,
      "painIndex": 43.3,
      "loadFactor": 67.1,
      "revenue": 6.94,
      "headway": 9.8
    },
    {
      "day": "J-12",
      "passengers": 18943,
      "otp": 95.4,
      "painIndex": 44.5,
      "loadFactor": 72.3,
      "revenue": 7.05,
      "headway": 9.8
    },
    {
      "day": "J-11",
      "passengers": 12551,
      "otp": 87.1,
      "painIndex": 40.8,
      "loadFactor": 48.3,
      "revenue": 4.67,
      "headway": 9.9
    },
    {
      "day": "J-10",
      "passengers": 13010,
      "otp": 92.7,
      "painIndex": 37.1,
      "loadFactor": 46.1,
      "revenue": 4.84,
      "headway": 10.0
    },
    {
      "day": "J-9",
      "passengers": 19872,
      "otp": 96.5,
      "painIndex": 44.7,
      "loadFactor": 71.8,
      "revenue": 7.39,
      "headway": 9.6
    },
    {
      "day": "J-8",
      "passengers": 20411,
      "otp": 93.9,
      "painIndex": 43.3,
      "loadFactor": 70.5,
      "revenue": 7.59,
      "headway": 9.7
    },
    {
      "day": "J-7",
      "passengers": 16725,
      "otp": 81.4,
      "painIndex": 48.1,
      "loadFactor": 72.0,
      "revenue": 6.22,
      "headway": 10.1
    },
    {
      "day": "J-6",
      "passengers": 20484,
      "otp": 88.5,
      "painIndex": 46.1,
      "loadFactor": 71.3,
      "revenue": 7.62,
      "headway": 9.9
    },
    {
      "day": "J-5",
      "passengers": 17934,
      "otp": 93.3,
      "painIndex": 44.1,
      "loadFactor": 71.1,
      "revenue": 6.67,
      "headway": 9.4
    },
    {
      "day": "J-4",
      "passengers": 12998,
      "otp": 93.9,
      "painIndex": 39.7,
      "loadFactor": 50.2,
      "revenue": 4.84,
      "headway": 9.5
    },
    {
      "day": "J-3",
      "passengers": 14217,
      "otp": 88.3,
      "painIndex": 40.9,
      "loadFactor": 51.0,
      "revenue": 5.29,
      "headway": 9.5
    },
    {
      "day": "J-2",
      "passengers": 19871,
      "otp": 96.7,
      "painIndex": 44.5,
      "loadFactor": 72.0,
      "revenue": 7.39,
      "headway": 9.5
    },
    {
      "day": "J-1",
      "passengers": 23667,
      "otp": 91.6,
      "painIndex": 45.1,
      "loadFactor": 73.3,
      "revenue": 8.8,
      "headway": 9.6
    },
    {
      "day": "J-0",
      "passengers": 19429,
      "otp": 89.8,
      "painIndex": 45.3,
      "loadFactor": 70.2,
      "revenue": 7.23,
      "headway": 9.9
    }
  ],
  "heatmap": [
    {
      "station": "Petersen / Papa Gueye Fall",
      "values": [
        {
          "hour": 5,
          "value": 10
        },
        {
          "hour": 6,
          "value": 10
        },
        {
          "hour": 7,
          "value": 10
        },
        {
          "hour": 8,
          "value": 10
        },
        {
          "hour": 9,
          "value": 10
        },
        {
          "hour": 10,
          "value": 10
        },
        {
          "hour": 11,
          "value": 10
        },
        {
          "hour": 12,
          "value": 10
        },
        {
          "hour": 13,
          "value": 10
        },
        {
          "hour": 14,
          "value": 10
        },
        {
          "hour": 15,
          "value": 10
        },
        {
          "hour": 16,
          "value": 10
        },
        {
          "hour": 17,
          "value": 10
        },
        {
          "hour": 18,
          "value": 10
        },
        {
          "hour": 19,
          "value": 10
        },
        {
          "hour": 20,
          "value": 10
        },
        {
          "hour": 21,
          "value": 10
        },
        {
          "hour": 22,
          "value": 10
        }
      ]
    },
    {
      "station": "Préfecture de Guédiawaye",
      "values": [
        {
          "hour": 5,
          "value": 10
        },
        {
          "hour": 6,
          "value": 10
        },
        {
          "hour": 7,
          "value": 10
        },
        {
          "hour": 8,
          "value": 10
        },
        {
          "hour": 9,
          "value": 10
        },
        {
          "hour": 10,
          "value": 10
        },
        {
          "hour": 11,
          "value": 10
        },
        {
          "hour": 12,
          "value": 10
        },
        {
          "hour": 13,
          "value": 10
        },
        {
          "hour": 14,
          "value": 10
        },
        {
          "hour": 15,
          "value": 10
        },
        {
          "hour": 16,
          "value": 10
        },
        {
          "hour": 17,
          "value": 10
        },
        {
          "hour": 18,
          "value": 10
        },
        {
          "hour": 19,
          "value": 10
        },
        {
          "hour": 20,
          "value": 10
        },
        {
          "hour": 21,
          "value": 10
        },
        {
          "hour": 22,
          "value": 10
        }
      ]
    },
    {
      "station": "Grand Médine",
      "values": [
        {
          "hour": 5,
          "value": 10
        },
        {
          "hour": 6,
          "value": 10
        },
        {
          "hour": 7,
          "value": 10
        },
        {
          "hour": 8,
          "value": 10
        },
        {
          "hour": 9,
          "value": 10
        },
        {
          "hour": 10,
          "value": 10
        },
        {
          "hour": 11,
          "value": 10
        },
        {
          "hour": 12,
          "value": 10
        },
        {
          "hour": 13,
          "value": 10
        },
        {
          "hour": 14,
          "value": 10
        },
        {
          "hour": 15,
          "value": 10
        },
        {
          "hour": 16,
          "value": 10
        },
        {
          "hour": 17,
          "value": 10
        },
        {
          "hour": 18,
          "value": 10
        },
        {
          "hour": 19,
          "value": 10
        },
        {
          "hour": 20,
          "value": 10
        },
        {
          "hour": 21,
          "value": 10
        },
        {
          "hour": 22,
          "value": 10
        }
      ]
    },
    {
      "station": "Dial Diop / Thiandoum",
      "values": [
        {
          "hour": 5,
          "value": 10
        },
        {
          "hour": 6,
          "value": 10
        },
        {
          "hour": 7,
          "value": 10
        },
        {
          "hour": 8,
          "value": 10
        },
        {
          "hour": 9,
          "value": 10
        },
        {
          "hour": 10,
          "value": 10
        },
        {
          "hour": 11,
          "value": 10
        },
        {
          "hour": 12,
          "value": 10
        },
        {
          "hour": 13,
          "value": 10
        },
        {
          "hour": 14,
          "value": 10
        },
        {
          "hour": 15,
          "value": 10
        },
        {
          "hour": 16,
          "value": 10
        },
        {
          "hour": 17,
          "value": 10
        },
        {
          "hour": 18,
          "value": 10
        },
        {
          "hour": 19,
          "value": 10
        },
        {
          "hour": 20,
          "value": 10
        },
        {
          "hour": 21,
          "value": 10
        },
        {
          "hour": 22,
          "value": 10
        }
      ]
    },
    {
      "station": "Dalal Jamm / Hôpital Dalal Jamm",
      "values": [
        {
          "hour": 5,
          "value": 10
        },
        {
          "hour": 6,
          "value": 10
        },
        {
          "hour": 7,
          "value": 10
        },
        {
          "hour": 8,
          "value": 10
        },
        {
          "hour": 9,
          "value": 10
        },
        {
          "hour": 10,
          "value": 10
        },
        {
          "hour": 11,
          "value": 10
        },
        {
          "hour": 12,
          "value": 10
        },
        {
          "hour": 13,
          "value": 10
        },
        {
          "hour": 14,
          "value": 10
        },
        {
          "hour": 15,
          "value": 10
        },
        {
          "hour": 16,
          "value": 10
        },
        {
          "hour": 17,
          "value": 10
        },
        {
          "hour": 18,
          "value": 10
        },
        {
          "hour": 19,
          "value": 10
        },
        {
          "hour": 20,
          "value": 10
        },
        {
          "hour": 21,
          "value": 10
        },
        {
          "hour": 22,
          "value": 10
        }
      ]
    },
    {
      "station": "Malika",
      "values": [
        {
          "hour": 5,
          "value": 10
        },
        {
          "hour": 6,
          "value": 10
        },
        {
          "hour": 7,
          "value": 10
        },
        {
          "hour": 8,
          "value": 10
        },
        {
          "hour": 9,
          "value": 10
        },
        {
          "hour": 10,
          "value": 10
        },
        {
          "hour": 11,
          "value": 10
        },
        {
          "hour": 12,
          "value": 10
        },
        {
          "hour": 13,
          "value": 10
        },
        {
          "hour": 14,
          "value": 10
        },
        {
          "hour": 15,
          "value": 10
        },
        {
          "hour": 16,
          "value": 10
        },
        {
          "hour": 17,
          "value": 10
        },
        {
          "hour": 18,
          "value": 10
        },
        {
          "hour": 19,
          "value": 10
        },
        {
          "hour": 20,
          "value": 10
        },
        {
          "hour": 21,
          "value": 10
        },
        {
          "hour": 22,
          "value": 10
        }
      ]
    },
    {
      "station": "Keur Massar",
      "values": [
        {
          "hour": 5,
          "value": 10
        },
        {
          "hour": 6,
          "value": 10
        },
        {
          "hour": 7,
          "value": 10
        },
        {
          "hour": 8,
          "value": 10
        },
        {
          "hour": 9,
          "value": 10
        },
        {
          "hour": 10,
          "value": 10
        },
        {
          "hour": 11,
          "value": 10
        },
        {
          "hour": 12,
          "value": 10
        },
        {
          "hour": 13,
          "value": 10
        },
        {
          "hour": 14,
          "value": 10
        },
        {
          "hour": 15,
          "value": 10
        },
        {
          "hour": 16,
          "value": 10
        },
        {
          "hour": 17,
          "value": 10
        },
        {
          "hour": 18,
          "value": 10
        },
        {
          "hour": 19,
          "value": 10
        },
        {
          "hour": 20,
          "value": 10
        },
        {
          "hour": 21,
          "value": 10
        },
        {
          "hour": 22,
          "value": 10
        }
      ]
    },
    {
      "station": "Yeumbeul",
      "values": [
        {
          "hour": 5,
          "value": 10
        },
        {
          "hour": 6,
          "value": 10
        },
        {
          "hour": 7,
          "value": 10
        },
        {
          "hour": 8,
          "value": 10
        },
        {
          "hour": 9,
          "value": 10
        },
        {
          "hour": 10,
          "value": 10
        },
        {
          "hour": 11,
          "value": 10
        },
        {
          "hour": 12,
          "value": 10
        },
        {
          "hour": 13,
          "value": 10
        },
        {
          "hour": 14,
          "value": 10
        },
        {
          "hour": 15,
          "value": 10
        },
        {
          "hour": 16,
          "value": 10
        },
        {
          "hour": 17,
          "value": 10
        },
        {
          "hour": 18,
          "value": 10
        },
        {
          "hour": 19,
          "value": 10
        },
        {
          "hour": 20,
          "value": 10
        },
        {
          "hour": 21,
          "value": 10
        },
        {
          "hour": 22,
          "value": 10
        }
      ]
    },
    {
      "station": "Sacré-Cœur / Liberté",
      "values": [
        {
          "hour": 5,
          "value": 10
        },
        {
          "hour": 6,
          "value": 10
        },
        {
          "hour": 7,
          "value": 10
        },
        {
          "hour": 8,
          "value": 10
        },
        {
          "hour": 9,
          "value": 10
        },
        {
          "hour": 10,
          "value": 10
        },
        {
          "hour": 11,
          "value": 10
        },
        {
          "hour": 12,
          "value": 10
        },
        {
          "hour": 13,
          "value": 10
        },
        {
          "hour": 14,
          "value": 10
        },
        {
          "hour": 15,
          "value": 10
        },
        {
          "hour": 16,
          "value": 10
        },
        {
          "hour": 17,
          "value": 10
        },
        {
          "hour": 18,
          "value": 10
        },
        {
          "hour": 19,
          "value": 10
        },
        {
          "hour": 20,
          "value": 10
        },
        {
          "hour": 21,
          "value": 10
        },
        {
          "hour": 22,
          "value": 10
        }
      ]
    },
    {
      "station": "Place de la Nation / Baux Maraîchers",
      "values": [
        {
          "hour": 5,
          "value": 10
        },
        {
          "hour": 6,
          "value": 10
        },
        {
          "hour": 7,
          "value": 10
        },
        {
          "hour": 8,
          "value": 10
        },
        {
          "hour": 9,
          "value": 10
        },
        {
          "hour": 10,
          "value": 10
        },
        {
          "hour": 11,
          "value": 10
        },
        {
          "hour": 12,
          "value": 10
        },
        {
          "hour": 13,
          "value": 10
        },
        {
          "hour": 14,
          "value": 10
        },
        {
          "hour": 15,
          "value": 10
        },
        {
          "hour": 16,
          "value": 10
        },
        {
          "hour": 17,
          "value": 10
        },
        {
          "hour": 18,
          "value": 10
        },
        {
          "hour": 19,
          "value": 10
        },
        {
          "hour": 20,
          "value": 10
        },
        {
          "hour": 21,
          "value": 10
        },
        {
          "hour": 22,
          "value": 10
        }
      ]
    },
    {
      "station": "Khar Yallah",
      "values": [
        {
          "hour": 5,
          "value": 10
        },
        {
          "hour": 6,
          "value": 10
        },
        {
          "hour": 7,
          "value": 10
        },
        {
          "hour": 8,
          "value": 10
        },
        {
          "hour": 9,
          "value": 10
        },
        {
          "hour": 10,
          "value": 10
        },
        {
          "hour": 11,
          "value": 10
        },
        {
          "hour": 12,
          "value": 10
        },
        {
          "hour": 13,
          "value": 10
        },
        {
          "hour": 14,
          "value": 10
        },
        {
          "hour": 15,
          "value": 10
        },
        {
          "hour": 16,
          "value": 10
        },
        {
          "hour": 17,
          "value": 10
        },
        {
          "hour": 18,
          "value": 10
        },
        {
          "hour": 19,
          "value": 10
        },
        {
          "hour": 20,
          "value": 10
        },
        {
          "hour": 21,
          "value": 10
        },
        {
          "hour": 22,
          "value": 10
        }
      ]
    },
    {
      "station": "Golf Nord",
      "values": [
        {
          "hour": 5,
          "value": 10
        },
        {
          "hour": 6,
          "value": 10
        },
        {
          "hour": 7,
          "value": 10
        },
        {
          "hour": 8,
          "value": 10
        },
        {
          "hour": 9,
          "value": 10
        },
        {
          "hour": 10,
          "value": 10
        },
        {
          "hour": 11,
          "value": 10
        },
        {
          "hour": 12,
          "value": 10
        },
        {
          "hour": 13,
          "value": 10
        },
        {
          "hour": 14,
          "value": 10
        },
        {
          "hour": 15,
          "value": 10
        },
        {
          "hour": 16,
          "value": 10
        },
        {
          "hour": 17,
          "value": 10
        },
        {
          "hour": 18,
          "value": 10
        },
        {
          "hour": 19,
          "value": 10
        },
        {
          "hour": 20,
          "value": 10
        },
        {
          "hour": 21,
          "value": 10
        },
        {
          "hour": 22,
          "value": 10
        }
      ]
    },
    {
      "station": "Thiaroye",
      "values": [
        {
          "hour": 5,
          "value": 10
        },
        {
          "hour": 6,
          "value": 10
        },
        {
          "hour": 7,
          "value": 10
        },
        {
          "hour": 8,
          "value": 10
        },
        {
          "hour": 9,
          "value": 10
        },
        {
          "hour": 10,
          "value": 10
        },
        {
          "hour": 11,
          "value": 10
        },
        {
          "hour": 12,
          "value": 10
        },
        {
          "hour": 13,
          "value": 10
        },
        {
          "hour": 14,
          "value": 10
        },
        {
          "hour": 15,
          "value": 10
        },
        {
          "hour": 16,
          "value": 10
        },
        {
          "hour": 17,
          "value": 10
        },
        {
          "hour": 18,
          "value": 10
        },
        {
          "hour": 19,
          "value": 10
        },
        {
          "hour": 20,
          "value": 10
        },
        {
          "hour": 21,
          "value": 10
        },
        {
          "hour": 22,
          "value": 10
        }
      ]
    },
    {
      "station": "Golf",
      "values": [
        {
          "hour": 5,
          "value": 10
        },
        {
          "hour": 6,
          "value": 10
        },
        {
          "hour": 7,
          "value": 10
        },
        {
          "hour": 8,
          "value": 10
        },
        {
          "hour": 9,
          "value": 10
        },
        {
          "hour": 10,
          "value": 10
        },
        {
          "hour": 11,
          "value": 10
        },
        {
          "hour": 12,
          "value": 10
        },
        {
          "hour": 13,
          "value": 10
        },
        {
          "hour": 14,
          "value": 10
        },
        {
          "hour": 15,
          "value": 10
        },
        {
          "hour": 16,
          "value": 10
        },
        {
          "hour": 17,
          "value": 10
        },
        {
          "hour": 18,
          "value": 10
        },
        {
          "hour": 19,
          "value": 10
        },
        {
          "hour": 20,
          "value": 10
        },
        {
          "hour": 21,
          "value": 10
        },
        {
          "hour": 22,
          "value": 10
        }
      ]
    }
  ],
  "painHeatmap": [
    {
      "station": "Petersen / Papa Gueye Fall",
      "values": [
        {
          "hour": 5,
          "value": 49.3
        },
        {
          "hour": 6,
          "value": 49.1
        },
        {
          "hour": 7,
          "value": 71.1
        },
        {
          "hour": 8,
          "value": 72.0
        },
        {
          "hour": 9,
          "value": 71.8
        },
        {
          "hour": 10,
          "value": 71.9
        },
        {
          "hour": 11,
          "value": 49.1
        },
        {
          "hour": 12,
          "value": 49.2
        },
        {
          "hour": 13,
          "value": 49.0
        },
        {
          "hour": 14,
          "value": 50.0
        },
        {
          "hour": 15,
          "value": 48.8
        },
        {
          "hour": 16,
          "value": 72.5
        },
        {
          "hour": 17,
          "value": 71.4
        },
        {
          "hour": 18,
          "value": 71.6
        },
        {
          "hour": 19,
          "value": 70.0
        },
        {
          "hour": 20,
          "value": 72.3
        },
        {
          "hour": 21,
          "value": 47.4
        },
        {
          "hour": 22,
          "value": 49.6
        }
      ]
    },
    {
      "station": "Préfecture de Guédiawaye",
      "values": [
        {
          "hour": 5,
          "value": 49.0
        },
        {
          "hour": 6,
          "value": 49.8
        },
        {
          "hour": 7,
          "value": 72.2
        },
        {
          "hour": 8,
          "value": 72.4
        },
        {
          "hour": 9,
          "value": 72.1
        },
        {
          "hour": 10,
          "value": 71.8
        },
        {
          "hour": 11,
          "value": 50.0
        },
        {
          "hour": 12,
          "value": 49.1
        },
        {
          "hour": 13,
          "value": 48.3
        },
        {
          "hour": 14,
          "value": 50.9
        },
        {
          "hour": 15,
          "value": 49.1
        },
        {
          "hour": 16,
          "value": 70.4
        },
        {
          "hour": 17,
          "value": 69.9
        },
        {
          "hour": 18,
          "value": 72.7
        },
        {
          "hour": 19,
          "value": 72.9
        },
        {
          "hour": 20,
          "value": 72.0
        },
        {
          "hour": 21,
          "value": 50.0
        },
        {
          "hour": 22,
          "value": 50.3
        }
      ]
    },
    {
      "station": "Grand Médine",
      "values": [
        {
          "hour": 5,
          "value": 44.2
        },
        {
          "hour": 6,
          "value": 44.6
        },
        {
          "hour": 7,
          "value": 71.5
        },
        {
          "hour": 8,
          "value": 70.8
        },
        {
          "hour": 9,
          "value": 70.9
        },
        {
          "hour": 10,
          "value": 70.1
        },
        {
          "hour": 11,
          "value": 43.3
        },
        {
          "hour": 12,
          "value": 43.9
        },
        {
          "hour": 13,
          "value": 43.6
        },
        {
          "hour": 14,
          "value": 44.4
        },
        {
          "hour": 15,
          "value": 43.3
        },
        {
          "hour": 16,
          "value": 70.9
        },
        {
          "hour": 17,
          "value": 70.1
        },
        {
          "hour": 18,
          "value": 71.6
        },
        {
          "hour": 19,
          "value": 69.5
        },
        {
          "hour": 20,
          "value": 71.3
        },
        {
          "hour": 21,
          "value": 43.4
        },
        {
          "hour": 22,
          "value": 43.3
        }
      ]
    },
    {
      "station": "Dial Diop / Thiandoum",
      "values": [
        {
          "hour": 5,
          "value": 32.7
        },
        {
          "hour": 6,
          "value": 32.8
        },
        {
          "hour": 7,
          "value": 57.9
        },
        {
          "hour": 8,
          "value": 57.6
        },
        {
          "hour": 9,
          "value": 57.6
        },
        {
          "hour": 10,
          "value": 57.7
        },
        {
          "hour": 11,
          "value": 33.0
        },
        {
          "hour": 12,
          "value": 33.5
        },
        {
          "hour": 13,
          "value": 32.5
        },
        {
          "hour": 14,
          "value": 33.9
        },
        {
          "hour": 15,
          "value": 33.4
        },
        {
          "hour": 16,
          "value": 57.3
        },
        {
          "hour": 17,
          "value": 58.4
        },
        {
          "hour": 18,
          "value": 57.9
        },
        {
          "hour": 19,
          "value": 56.6
        },
        {
          "hour": 20,
          "value": 58.0
        },
        {
          "hour": 21,
          "value": 33.3
        },
        {
          "hour": 22,
          "value": 33.8
        }
      ]
    },
    {
      "station": "Dalal Jamm / Hôpital Dalal Jamm",
      "values": [
        {
          "hour": 5,
          "value": 32.8
        },
        {
          "hour": 6,
          "value": 32.5
        },
        {
          "hour": 7,
          "value": 59.2
        },
        {
          "hour": 8,
          "value": 57.9
        },
        {
          "hour": 9,
          "value": 57.2
        },
        {
          "hour": 10,
          "value": 57.7
        },
        {
          "hour": 11,
          "value": 33.8
        },
        {
          "hour": 12,
          "value": 32.7
        },
        {
          "hour": 13,
          "value": 33.1
        },
        {
          "hour": 14,
          "value": 32.9
        },
        {
          "hour": 15,
          "value": 33.2
        },
        {
          "hour": 16,
          "value": 57.7
        },
        {
          "hour": 17,
          "value": 59.1
        },
        {
          "hour": 18,
          "value": 58.8
        },
        {
          "hour": 19,
          "value": 56.7
        },
        {
          "hour": 20,
          "value": 57.3
        },
        {
          "hour": 21,
          "value": 34.2
        },
        {
          "hour": 22,
          "value": 32.9
        }
      ]
    },
    {
      "station": "Malika",
      "values": [
        {
          "hour": 5,
          "value": 33.8
        },
        {
          "hour": 6,
          "value": 33.3
        },
        {
          "hour": 7,
          "value": 58.7
        },
        {
          "hour": 8,
          "value": 56.0
        },
        {
          "hour": 9,
          "value": 58.1
        },
        {
          "hour": 10,
          "value": 58.0
        },
        {
          "hour": 11,
          "value": 33.2
        },
        {
          "hour": 12,
          "value": 32.9
        },
        {
          "hour": 13,
          "value": 33.9
        },
        {
          "hour": 14,
          "value": 32.0
        },
        {
          "hour": 15,
          "value": 33.3
        },
        {
          "hour": 16,
          "value": 58.6
        },
        {
          "hour": 17,
          "value": 58.9
        },
        {
          "hour": 18,
          "value": 57.5
        },
        {
          "hour": 19,
          "value": 56.4
        },
        {
          "hour": 20,
          "value": 57.5
        },
        {
          "hour": 21,
          "value": 34.0
        },
        {
          "hour": 22,
          "value": 33.2
        }
      ]
    },
    {
      "station": "Keur Massar",
      "values": [
        {
          "hour": 5,
          "value": 32.7
        },
        {
          "hour": 6,
          "value": 32.4
        },
        {
          "hour": 7,
          "value": 58.2
        },
        {
          "hour": 8,
          "value": 56.9
        },
        {
          "hour": 9,
          "value": 56.7
        },
        {
          "hour": 10,
          "value": 57.9
        },
        {
          "hour": 11,
          "value": 32.3
        },
        {
          "hour": 12,
          "value": 32.3
        },
        {
          "hour": 13,
          "value": 32.9
        },
        {
          "hour": 14,
          "value": 32.6
        },
        {
          "hour": 15,
          "value": 32.5
        },
        {
          "hour": 16,
          "value": 56.9
        },
        {
          "hour": 17,
          "value": 58.1
        },
        {
          "hour": 18,
          "value": 57.2
        },
        {
          "hour": 19,
          "value": 56.3
        },
        {
          "hour": 20,
          "value": 58.1
        },
        {
          "hour": 21,
          "value": 33.4
        },
        {
          "hour": 22,
          "value": 32.0
        }
      ]
    },
    {
      "station": "Yeumbeul",
      "values": [
        {
          "hour": 5,
          "value": 33.1
        },
        {
          "hour": 6,
          "value": 31.7
        },
        {
          "hour": 7,
          "value": 57.1
        },
        {
          "hour": 8,
          "value": 57.1
        },
        {
          "hour": 9,
          "value": 57.7
        },
        {
          "hour": 10,
          "value": 57.4
        },
        {
          "hour": 11,
          "value": 32.4
        },
        {
          "hour": 12,
          "value": 32.1
        },
        {
          "hour": 13,
          "value": 33.3
        },
        {
          "hour": 14,
          "value": 33.1
        },
        {
          "hour": 15,
          "value": 32.9
        },
        {
          "hour": 16,
          "value": 57.1
        },
        {
          "hour": 17,
          "value": 56.9
        },
        {
          "hour": 18,
          "value": 56.6
        },
        {
          "hour": 19,
          "value": 57.0
        },
        {
          "hour": 20,
          "value": 56.4
        },
        {
          "hour": 21,
          "value": 32.4
        },
        {
          "hour": 22,
          "value": 32.3
        }
      ]
    },
    {
      "station": "Sacré-Cœur / Liberté",
      "values": [
        {
          "hour": 5,
          "value": 32.4
        },
        {
          "hour": 6,
          "value": 32.9
        },
        {
          "hour": 7,
          "value": 58.1
        },
        {
          "hour": 8,
          "value": 57.0
        },
        {
          "hour": 9,
          "value": 55.9
        },
        {
          "hour": 10,
          "value": 57.5
        },
        {
          "hour": 11,
          "value": 32.3
        },
        {
          "hour": 12,
          "value": 32.8
        },
        {
          "hour": 13,
          "value": 34.0
        },
        {
          "hour": 14,
          "value": 32.9
        },
        {
          "hour": 15,
          "value": 32.3
        },
        {
          "hour": 16,
          "value": 59.3
        },
        {
          "hour": 17,
          "value": 59.2
        },
        {
          "hour": 18,
          "value": 58.5
        },
        {
          "hour": 19,
          "value": 57.5
        },
        {
          "hour": 20,
          "value": 57.6
        },
        {
          "hour": 21,
          "value": 33.4
        },
        {
          "hour": 22,
          "value": 33.2
        }
      ]
    },
    {
      "station": "Place de la Nation / Baux Maraîchers",
      "values": [
        {
          "hour": 5,
          "value": 32.2
        },
        {
          "hour": 6,
          "value": 32.7
        },
        {
          "hour": 7,
          "value": 57.0
        },
        {
          "hour": 8,
          "value": 56.2
        },
        {
          "hour": 9,
          "value": 57.6
        },
        {
          "hour": 10,
          "value": 57.3
        },
        {
          "hour": 11,
          "value": 33.4
        },
        {
          "hour": 12,
          "value": 32.7
        },
        {
          "hour": 13,
          "value": 33.2
        },
        {
          "hour": 14,
          "value": 33.2
        },
        {
          "hour": 15,
          "value": 33.2
        },
        {
          "hour": 16,
          "value": 58.7
        },
        {
          "hour": 17,
          "value": 55.6
        },
        {
          "hour": 18,
          "value": 56.1
        },
        {
          "hour": 19,
          "value": 56.3
        },
        {
          "hour": 20,
          "value": 57.4
        },
        {
          "hour": 21,
          "value": 32.2
        },
        {
          "hour": 22,
          "value": 32.8
        }
      ]
    },
    {
      "station": "Khar Yallah",
      "values": [
        {
          "hour": 5,
          "value": 30.9
        },
        {
          "hour": 6,
          "value": 30.9
        },
        {
          "hour": 7,
          "value": 49.9
        },
        {
          "hour": 8,
          "value": 48.5
        },
        {
          "hour": 9,
          "value": 48.6
        },
        {
          "hour": 10,
          "value": 49.6
        },
        {
          "hour": 11,
          "value": 30.5
        },
        {
          "hour": 12,
          "value": 30.6
        },
        {
          "hour": 13,
          "value": 30.8
        },
        {
          "hour": 14,
          "value": 30.1
        },
        {
          "hour": 15,
          "value": 30.3
        },
        {
          "hour": 16,
          "value": 48.5
        },
        {
          "hour": 17,
          "value": 49.6
        },
        {
          "hour": 18,
          "value": 49.5
        },
        {
          "hour": 19,
          "value": 49.9
        },
        {
          "hour": 20,
          "value": 50.0
        },
        {
          "hour": 21,
          "value": 31.5
        },
        {
          "hour": 22,
          "value": 31.2
        }
      ]
    },
    {
      "station": "Golf Nord",
      "values": [
        {
          "hour": 5,
          "value": 30.6
        },
        {
          "hour": 6,
          "value": 30.4
        },
        {
          "hour": 7,
          "value": 50.7
        },
        {
          "hour": 8,
          "value": 49.1
        },
        {
          "hour": 9,
          "value": 49.0
        },
        {
          "hour": 10,
          "value": 48.5
        },
        {
          "hour": 11,
          "value": 29.6
        },
        {
          "hour": 12,
          "value": 31.0
        },
        {
          "hour": 13,
          "value": 31.1
        },
        {
          "hour": 14,
          "value": 31.6
        },
        {
          "hour": 15,
          "value": 30.4
        },
        {
          "hour": 16,
          "value": 49.9
        },
        {
          "hour": 17,
          "value": 49.7
        },
        {
          "hour": 18,
          "value": 50.7
        },
        {
          "hour": 19,
          "value": 49.4
        },
        {
          "hour": 20,
          "value": 50.7
        },
        {
          "hour": 21,
          "value": 30.9
        },
        {
          "hour": 22,
          "value": 30.1
        }
      ]
    }
  ],
  "alerts": [
    {
      "id": 1,
      "severity": "warning",
      "title": "Saturation aux heures de pointe",
      "impact": "Load factor pointe 101.3%",
      "action": "Renforcer fréquence B1 en pointe",
      "page": "/ridership"
    },
    {
      "id": 2,
      "severity": "warning",
      "title": "Station critique : Préfecture de Guédiawaye",
      "impact": "Score 97/100 · Load 113%",
      "action": "Revoir affectation bus sur ce tronçon",
      "page": "/stations"
    },
    {
      "id": 3,
      "severity": "info",
      "title": "Recettes 30j : 197.9 M FCFA",
      "impact": "Ratio exploitation 1.54x",
      "action": "Vérifier validation billets",
      "page": "/finance"
    }
  ],
  "linePerformance": [
    {
      "line": "B1",
      "otp": 90.9,
      "delay": 4.2,
      "completion": 97,
      "ridership": 5947,
      "status": "success",
      "stations": 23,
      "type": "Omnibus",
      "speed": 24.8,
      "pain_index": 44.1,
      "load_pct": 65.3
    },
    {
      "line": "B2",
      "otp": 91.2,
      "delay": 4.2,
      "completion": 95,
      "ridership": 5885,
      "status": "success",
      "stations": 7,
      "type": "Semi-Express",
      "speed": 26.7,
      "pain_index": 43.4,
      "load_pct": 64.8
    },
    {
      "line": "B3",
      "otp": 91.5,
      "delay": 4.2,
      "completion": 91,
      "ridership": 5897,
      "status": "success",
      "stations": 7,
      "type": "Semi-Express",
      "speed": 32.1,
      "pain_index": 43.8,
      "load_pct": 65.2
    }
  ],
  "delayDistribution": [
    {
      "bucket": "< 1 min",
      "count": 70736
    },
    {
      "bucket": "1–3 min",
      "count": 7993
    },
    {
      "bucket": "3–5 min",
      "count": 8417
    },
    {
      "bucket": "5–10 min",
      "count": 12593
    },
    {
      "bucket": "> 10 min",
      "count": 261
    }
  ],
  "speedData": [
    {
      "line": "B1",
      "theoretical": 28.0,
      "actual": 24.8
    },
    {
      "line": "B2",
      "theoretical": 28.0,
      "actual": 26.7
    },
    {
      "line": "B3",
      "theoretical": 28.0,
      "actual": 32.1
    }
  ],
  "loadFactorDist": [
    {
      "range": "0–25%",
      "buses": 20962
    },
    {
      "range": "25–50%",
      "buses": 27228
    },
    {
      "range": "50–75%",
      "buses": 10664
    },
    {
      "range": "75–100%",
      "buses": 16285
    },
    {
      "range": "> 100%",
      "buses": 24861
    }
  ],
  "ridershipByHour": [
    {
      "hour": "5h",
      "passengers": 158204
    },
    {
      "hour": "6h",
      "passengers": 156446
    },
    {
      "hour": "7h",
      "passengers": 553295
    },
    {
      "hour": "8h",
      "passengers": 535653
    },
    {
      "hour": "9h",
      "passengers": 549299
    },
    {
      "hour": "10h",
      "passengers": 548242
    },
    {
      "hour": "11h",
      "passengers": 151105
    },
    {
      "hour": "12h",
      "passengers": 154993
    },
    {
      "hour": "13h",
      "passengers": 153797
    },
    {
      "hour": "14h",
      "passengers": 154490
    },
    {
      "hour": "15h",
      "passengers": 152360
    },
    {
      "hour": "16h",
      "passengers": 541305
    },
    {
      "hour": "17h",
      "passengers": 544000
    },
    {
      "hour": "18h",
      "passengers": 543709
    },
    {
      "hour": "19h",
      "passengers": 557703
    },
    {
      "hour": "20h",
      "passengers": 539676
    },
    {
      "hour": "21h",
      "passengers": 153435
    },
    {
      "hour": "22h",
      "passengers": 151584
    }
  ],
  "ridershipByStation": [
    {
      "station": "Petersen / Papa Gueye Fall",
      "passengers": 678007
    },
    {
      "station": "Préfecture de Guédiawaye",
      "passengers": 675636
    },
    {
      "station": "Grand Médine",
      "passengers": 524571
    },
    {
      "station": "Dial Diop / Thiandoum",
      "passengers": 277532
    },
    {
      "station": "Dalal Jamm / Hôpital Dalal Jamm",
      "passengers": 275555
    },
    {
      "station": "Malika",
      "passengers": 273277
    },
    {
      "station": "Keur Massar",
      "passengers": 271249
    },
    {
      "station": "Yeumbeul",
      "passengers": 270585
    },
    {
      "station": "Sacré-Cœur / Liberté",
      "passengers": 269785
    },
    {
      "station": "Place de la Nation / Baux Maraîchers",
      "passengers": 265748
    },
    {
      "station": "Khar Yallah",
      "passengers": 212989
    },
    {
      "station": "Golf Nord",
      "passengers": 212400
    },
    {
      "station": "Thiaroye",
      "passengers": 208954
    },
    {
      "station": "Golf",
      "passengers": 207212
    },
    {
      "station": "Parcelles Assainies",
      "passengers": 206856
    }
  ],
  "dailyRevenue": [
    {
      "day": "J-29",
      "revenue": 8.6,
      "cost": 5.6
    },
    {
      "day": "J-28",
      "revenue": 7.4,
      "cost": 4.8
    },
    {
      "day": "J-27",
      "revenue": 7.4,
      "cost": 4.8
    },
    {
      "day": "J-26",
      "revenue": 6.4,
      "cost": 4.1
    },
    {
      "day": "J-25",
      "revenue": 4.4,
      "cost": 2.8
    },
    {
      "day": "J-24",
      "revenue": 4.5,
      "cost": 2.9
    },
    {
      "day": "J-23",
      "revenue": 7.3,
      "cost": 4.8
    },
    {
      "day": "J-22",
      "revenue": 6.9,
      "cost": 4.5
    },
    {
      "day": "J-21",
      "revenue": 7.8,
      "cost": 5.1
    },
    {
      "day": "J-20",
      "revenue": 7.7,
      "cost": 5.0
    },
    {
      "day": "J-19",
      "revenue": 7.7,
      "cost": 5.0
    },
    {
      "day": "J-18",
      "revenue": 4.8,
      "cost": 3.1
    },
    {
      "day": "J-17",
      "revenue": 5.3,
      "cost": 3.4
    },
    {
      "day": "J-16",
      "revenue": 8.6,
      "cost": 5.6
    },
    {
      "day": "J-15",
      "revenue": 7.3,
      "cost": 4.7
    },
    {
      "day": "J-14",
      "revenue": 8.0,
      "cost": 5.2
    },
    {
      "day": "J-13",
      "revenue": 6.9,
      "cost": 4.5
    },
    {
      "day": "J-12",
      "revenue": 7.0,
      "cost": 4.6
    },
    {
      "day": "J-11",
      "revenue": 4.7,
      "cost": 3.0
    },
    {
      "day": "J-10",
      "revenue": 4.8,
      "cost": 3.1
    },
    {
      "day": "J-9",
      "revenue": 7.4,
      "cost": 4.8
    },
    {
      "day": "J-8",
      "revenue": 7.6,
      "cost": 4.9
    },
    {
      "day": "J-7",
      "revenue": 6.2,
      "cost": 4.0
    },
    {
      "day": "J-6",
      "revenue": 7.6,
      "cost": 5.0
    },
    {
      "day": "J-5",
      "revenue": 6.7,
      "cost": 4.3
    },
    {
      "day": "J-4",
      "revenue": 4.8,
      "cost": 3.1
    },
    {
      "day": "J-3",
      "revenue": 5.3,
      "cost": 3.4
    },
    {
      "day": "J-2",
      "revenue": 7.4,
      "cost": 4.8
    },
    {
      "day": "J-1",
      "revenue": 8.8,
      "cost": 5.7
    },
    {
      "day": "J-0",
      "revenue": 7.2,
      "cost": 4.7
    }
  ],
  "costWaterfall": [
    {
      "name": "Recettes",
      "value": 2400
    },
    {
      "name": "Énergie",
      "value": -187
    },
    {
      "name": "RH",
      "value": -546
    },
    {
      "name": "Maintenance",
      "value": -281
    },
    {
      "name": "Infrastructure",
      "value": -312
    },
    {
      "name": "Autres",
      "value": -234
    },
    {
      "name": "Marge",
      "value": 841
    }
  ],
  "fleetStatus": [
    {
      "name": "En service",
      "value": 140,
      "color": "var(--success)"
    },
    {
      "name": "Maintenance",
      "value": 10,
      "color": "var(--warning)"
    },
    {
      "name": "Hors service",
      "value": 0,
      "color": "var(--critical)"
    }
  ],
  "fleetMeta": {
    "total": 150,
    "avg_km": 33214
  },
  "driverPerf": [
    {
      "driver": "CHF-1001",
      "score": 71,
      "hours": 25
    },
    {
      "driver": "CHF-1002",
      "score": 89,
      "hours": 31
    },
    {
      "driver": "CHF-1003",
      "score": 82,
      "hours": 22
    },
    {
      "driver": "CHF-1004",
      "score": 72,
      "hours": 27
    },
    {
      "driver": "CHF-1005",
      "score": 74,
      "hours": 26
    },
    {
      "driver": "CHF-1006",
      "score": 73,
      "hours": 29
    },
    {
      "driver": "CHF-1007",
      "score": 85,
      "hours": 21
    },
    {
      "driver": "CHF-1008",
      "score": 90,
      "hours": 27
    },
    {
      "driver": "CHF-1009",
      "score": 91,
      "hours": 18
    },
    {
      "driver": "CHF-1010",
      "score": 82,
      "hours": 34
    },
    {
      "driver": "CHF-1011",
      "score": 81,
      "hours": 30
    },
    {
      "driver": "CHF-1012",
      "score": 90,
      "hours": 26
    },
    {
      "driver": "CHF-1013",
      "score": 77,
      "hours": 28
    },
    {
      "driver": "CHF-1014",
      "score": 94,
      "hours": 27
    },
    {
      "driver": "CHF-1015",
      "score": 83,
      "hours": 26
    },
    {
      "driver": "CHF-1016",
      "score": 86,
      "hours": 25
    },
    {
      "driver": "CHF-1017",
      "score": 77,
      "hours": 27
    },
    {
      "driver": "CHF-1018",
      "score": 68,
      "hours": 24
    },
    {
      "driver": "CHF-1019",
      "score": 68,
      "hours": 25
    },
    {
      "driver": "CHF-1020",
      "score": 85,
      "hours": 28
    },
    {
      "driver": "CHF-1021",
      "score": 68,
      "hours": 30
    },
    {
      "driver": "CHF-1022",
      "score": 69,
      "hours": 29
    },
    {
      "driver": "CHF-1023",
      "score": 72,
      "hours": 31
    },
    {
      "driver": "CHF-1024",
      "score": 90,
      "hours": 28
    },
    {
      "driver": "CHF-1025",
      "score": 68,
      "hours": 29
    },
    {
      "driver": "CHF-1026",
      "score": 66,
      "hours": 26
    },
    {
      "driver": "CHF-1027",
      "score": 87,
      "hours": 31
    },
    {
      "driver": "CHF-1028",
      "score": 74,
      "hours": 21
    }
  ],
  "driverZoneStats": [
    {
      "zone": "Nord",
      "total": 100,
      "actifs": 100,
      "absents": 0,
      "absenteisme_pct": 0.0,
      "anciennete_moy": 1.4
    },
    {
      "zone": "Sud",
      "total": 100,
      "actifs": 100,
      "absents": 0,
      "absenteisme_pct": 0.0,
      "anciennete_moy": 1.4
    }
  ],
  "cxMetrics": [
    {
      "id": "wait",
      "label": "Attente moyenne",
      "value": "4.2 min",
      "status": "success"
    },
    {
      "id": "pain",
      "label": "Pain Index réseau",
      "value": "44/100",
      "status": "warning"
    },
    {
      "id": "crowd",
      "label": "Saturation stations",
      "value": "24.1%",
      "status": "critical"
    },
    {
      "id": "sat",
      "label": "Satisfaction proxy",
      "value": "56%",
      "status": "critical"
    }
  ],
  "stationDirectory": [
    {
      "id": 1,
      "name": "Petersen / Papa Gueye Fall",
      "lines": [
        "B1",
        "B2",
        "B3"
      ],
      "hub": true,
      "zone": "Nord",
      "passengers": 1862,
      "load": 112,
      "pain": 59.7,
      "status": "critical"
    },
    {
      "id": 2,
      "name": "Place de la Nation / Baux Maraîchers",
      "lines": [
        "B1"
      ],
      "hub": false,
      "zone": "Nord",
      "passengers": 730,
      "load": 68,
      "pain": 44.3,
      "status": "success"
    },
    {
      "id": 3,
      "name": "Sacré-Cœur / Liberté",
      "lines": [
        "B1"
      ],
      "hub": false,
      "zone": "Nord",
      "passengers": 741,
      "load": 69,
      "pain": 45.0,
      "status": "success"
    },
    {
      "id": 4,
      "name": "Dial Diop / Thiandoum",
      "lines": [
        "B1"
      ],
      "hub": false,
      "zone": "Nord",
      "passengers": 762,
      "load": 69,
      "pain": 45.0,
      "status": "success"
    },
    {
      "id": 5,
      "name": "Dalal Jamm / Hôpital Dalal Jamm",
      "lines": [
        "B1",
        "B2",
        "B3"
      ],
      "hub": false,
      "zone": "Nord",
      "passengers": 757,
      "load": 68,
      "pain": 44.8,
      "status": "success"
    },
    {
      "id": 6,
      "name": "Fadia",
      "lines": [
        "B1"
      ],
      "hub": false,
      "zone": "Nord",
      "passengers": 557,
      "load": 52,
      "pain": 39.7,
      "status": "success"
    },
    {
      "id": 7,
      "name": "Golf",
      "lines": [
        "B1"
      ],
      "hub": false,
      "zone": "Nord",
      "passengers": 569,
      "load": 53,
      "pain": 40.3,
      "status": "success"
    },
    {
      "id": 8,
      "name": "Khar Yallah",
      "lines": [
        "B1"
      ],
      "hub": false,
      "zone": "Nord",
      "passengers": 585,
      "load": 53,
      "pain": 39.6,
      "status": "success"
    },
    {
      "id": 9,
      "name": "Parcelles Assainies",
      "lines": [
        "B1",
        "B2",
        "B3"
      ],
      "hub": false,
      "zone": "Centre",
      "passengers": 568,
      "load": 52,
      "pain": 39.9,
      "status": "success"
    },
    {
      "id": 10,
      "name": "Grand Médine",
      "lines": [
        "B1"
      ],
      "hub": true,
      "zone": "Centre",
      "passengers": 1441,
      "load": 103,
      "pain": 56.9,
      "status": "warning"
    },
    {
      "id": 11,
      "name": "Grand Yoff",
      "lines": [
        "B1",
        "B2"
      ],
      "hub": false,
      "zone": "Centre",
      "passengers": 551,
      "load": 52,
      "pain": 39.8,
      "status": "success"
    },
    {
      "id": 12,
      "name": "Ancienne Piste",
      "lines": [
        "B1"
      ],
      "hub": false,
      "zone": "Centre",
      "passengers": 565,
      "load": 53,
      "pain": 39.8,
      "status": "success"
    },
    {
      "id": 13,
      "name": "Case Bi / Séquence",
      "lines": [
        "B1"
      ],
      "hub": false,
      "zone": "Centre",
      "passengers": 567,
      "load": 52,
      "pain": 39.8,
      "status": "success"
    },
    {
      "id": 14,
      "name": "Ndingala / Liberté VI",
      "lines": [
        "B1",
        "B2",
        "B3"
      ],
      "hub": false,
      "zone": "Centre",
      "passengers": 562,
      "load": 52,
      "pain": 39.2,
      "status": "success"
    },
    {
      "id": 15,
      "name": "Fith Mith",
      "lines": [
        "B1"
      ],
      "hub": false,
      "zone": "Centre",
      "passengers": 550,
      "load": 52,
      "pain": 39.6,
      "status": "success"
    },
    {
      "id": 16,
      "name": "Golf Nord",
      "lines": [
        "B1",
        "B3"
      ],
      "hub": false,
      "zone": "Centre",
      "passengers": 583,
      "load": 53,
      "pain": 39.8,
      "status": "success"
    },
    {
      "id": 17,
      "name": "Gueule Tapée",
      "lines": [
        "B1"
      ],
      "hub": false,
      "zone": "Sud",
      "passengers": 541,
      "load": 52,
      "pain": 39.9,
      "status": "success"
    },
    {
      "id": 18,
      "name": "Pikine Nord",
      "lines": [
        "B1",
        "B2"
      ],
      "hub": false,
      "zone": "Sud",
      "passengers": 562,
      "load": 52,
      "pain": 39.9,
      "status": "success"
    },
    {
      "id": 19,
      "name": "Thiaroye",
      "lines": [
        "B1",
        "B3"
      ],
      "hub": false,
      "zone": "Sud",
      "passengers": 574,
      "load": 52,
      "pain": 40.0,
      "status": "success"
    },
    {
      "id": 20,
      "name": "Malika",
      "lines": [
        "B1"
      ],
      "hub": false,
      "zone": "Sud",
      "passengers": 750,
      "load": 68,
      "pain": 44.9,
      "status": "success"
    },
    {
      "id": 21,
      "name": "Yeumbeul",
      "lines": [
        "B1"
      ],
      "hub": false,
      "zone": "Sud",
      "passengers": 743,
      "load": 67,
      "pain": 43.8,
      "status": "success"
    },
    {
      "id": 22,
      "name": "Keur Massar",
      "lines": [
        "B1"
      ],
      "hub": false,
      "zone": "Sud",
      "passengers": 745,
      "load": 68,
      "pain": 44.4,
      "status": "success"
    },
    {
      "id": 23,
      "name": "Préfecture de Guédiawaye",
      "lines": [
        "B1",
        "B2",
        "B3"
      ],
      "hub": true,
      "zone": "Sud",
      "passengers": 1856,
      "load": 112,
      "pain": 60.1,
      "status": "critical"
    }
  ],
  "stationCriticality": [
    {
      "station": "Préfecture de Guédiawaye",
      "criticality": 97.0,
      "load": 112.6,
      "delay": 5.3,
      "painIndex": 60.1,
      "status": "critical"
    },
    {
      "station": "Petersen / Papa Gueye Fall",
      "criticality": 96.1,
      "load": 112.7,
      "delay": 5.3,
      "painIndex": 59.7,
      "status": "critical"
    },
    {
      "station": "Grand Médine",
      "criticality": 93.9,
      "load": 103.4,
      "delay": 5.4,
      "painIndex": 56.9,
      "status": "critical"
    },
    {
      "station": "Dial Diop / Thiandoum",
      "criticality": 82.6,
      "load": 69.1,
      "delay": 3.6,
      "painIndex": 45.0,
      "status": "critical"
    },
    {
      "station": "Sacré-Cœur / Liberté",
      "criticality": 71.3,
      "load": 69.7,
      "delay": 3.5,
      "painIndex": 45.0,
      "status": "warning"
    },
    {
      "station": "Dalal Jamm / Hôpital Dalal Jamm",
      "criticality": 70.4,
      "load": 68.6,
      "delay": 3.6,
      "painIndex": 44.8,
      "status": "warning"
    },
    {
      "station": "Malika",
      "criticality": 70.0,
      "load": 68.9,
      "delay": 3.5,
      "painIndex": 44.9,
      "status": "warning"
    },
    {
      "station": "Keur Massar",
      "criticality": 60.0,
      "load": 69.0,
      "delay": 3.4,
      "painIndex": 44.4,
      "status": "warning"
    },
    {
      "station": "Golf",
      "criticality": 57.0,
      "load": 53.5,
      "delay": 3.6,
      "painIndex": 40.3,
      "status": "warning"
    },
    {
      "station": "Place de la Nation / Baux Maraîchers",
      "criticality": 48.7,
      "load": 68.8,
      "delay": 3.2,
      "painIndex": 44.3,
      "status": "success"
    },
    {
      "station": "Yeumbeul",
      "criticality": 45.2,
      "load": 67.5,
      "delay": 3.2,
      "painIndex": 43.8,
      "status": "success"
    },
    {
      "station": "Ancienne Piste",
      "criticality": 44.8,
      "load": 53.0,
      "delay": 3.6,
      "painIndex": 39.8,
      "status": "success"
    },
    {
      "station": "Parcelles Assainies",
      "criticality": 44.3,
      "load": 52.5,
      "delay": 3.7,
      "painIndex": 39.9,
      "status": "success"
    },
    {
      "station": "Grand Yoff",
      "criticality": 43.9,
      "load": 52.7,
      "delay": 3.6,
      "painIndex": 39.8,
      "status": "success"
    },
    {
      "station": "Pikine Nord",
      "criticality": 40.9,
      "load": 52.1,
      "delay": 3.6,
      "painIndex": 39.9,
      "status": "success"
    }
  ],
  "anomalies": [
    {
      "day": "J-29",
      "passengers": 23179,
      "otp": 85.8,
      "painIndex": 47.2,
      "loadFactor": 70.2,
      "revenue": 8.62,
      "headway": 10.1,
      "anomaly": null
    },
    {
      "day": "J-28",
      "passengers": 19818,
      "otp": 88.1,
      "painIndex": 47.2,
      "loadFactor": 71.7,
      "revenue": 7.37,
      "headway": 10.2,
      "anomaly": null
    },
    {
      "day": "J-27",
      "passengers": 19858,
      "otp": 93.8,
      "painIndex": 43.7,
      "loadFactor": 69.7,
      "revenue": 7.39,
      "headway": 10.3,
      "anomaly": null
    },
    {
      "day": "J-26",
      "passengers": 17082,
      "otp": 94.5,
      "painIndex": 45.2,
      "loadFactor": 72.3,
      "revenue": 6.35,
      "headway": 9.9,
      "anomaly": null
    },
    {
      "day": "J-25",
      "passengers": 11761,
      "otp": 90.9,
      "painIndex": 40.0,
      "loadFactor": 49.7,
      "revenue": 4.38,
      "headway": 10.0,
      "anomaly": 11761
    },
    {
      "day": "J-24",
      "passengers": 12043,
      "otp": 87.7,
      "painIndex": 38.2,
      "loadFactor": 46.4,
      "revenue": 4.48,
      "headway": 10.0,
      "anomaly": null
    },
    {
      "day": "J-23",
      "passengers": 19748,
      "otp": 82.9,
      "painIndex": 49.1,
      "loadFactor": 72.2,
      "revenue": 7.35,
      "headway": 10.1,
      "anomaly": null
    },
    {
      "day": "J-22",
      "passengers": 18421,
      "otp": 92.1,
      "painIndex": 45.8,
      "loadFactor": 71.0,
      "revenue": 6.85,
      "headway": 10.1,
      "anomaly": null
    },
    {
      "day": "J-21",
      "passengers": 21099,
      "otp": 90.3,
      "painIndex": 46.5,
      "loadFactor": 72.7,
      "revenue": 7.85,
      "headway": 9.8,
      "anomaly": null
    },
    {
      "day": "J-20",
      "passengers": 20621,
      "otp": 98.3,
      "painIndex": 42.8,
      "loadFactor": 69.7,
      "revenue": 7.67,
      "headway": 9.8,
      "anomaly": null
    },
    {
      "day": "J-19",
      "passengers": 20629,
      "otp": 90.9,
      "painIndex": 47.1,
      "loadFactor": 73.7,
      "revenue": 7.67,
      "headway": 9.7,
      "anomaly": null
    },
    {
      "day": "J-18",
      "passengers": 12787,
      "otp": 92.4,
      "painIndex": 38.1,
      "loadFactor": 47.5,
      "revenue": 4.76,
      "headway": 9.9,
      "anomaly": null
    },
    {
      "day": "J-17",
      "passengers": 14151,
      "otp": 93.8,
      "painIndex": 39.5,
      "loadFactor": 51.5,
      "revenue": 5.26,
      "headway": 9.8,
      "anomaly": null
    },
    {
      "day": "J-16",
      "passengers": 23148,
      "otp": 93.3,
      "painIndex": 46.9,
      "loadFactor": 76.9,
      "revenue": 8.61,
      "headway": 9.8,
      "anomaly": null
    },
    {
      "day": "J-15",
      "passengers": 19618,
      "otp": 87.3,
      "painIndex": 45.8,
      "loadFactor": 72.2,
      "revenue": 7.3,
      "headway": 10.0,
      "anomaly": null
    },
    {
      "day": "J-14",
      "passengers": 21431,
      "otp": 91.4,
      "painIndex": 47.3,
      "loadFactor": 74.8,
      "revenue": 7.97,
      "headway": 9.7,
      "anomaly": null
    },
    {
      "day": "J-13",
      "passengers": 18655,
      "otp": 95.7,
      "painIndex": 43.3,
      "loadFactor": 67.1,
      "revenue": 6.94,
      "headway": 9.8,
      "anomaly": null
    },
    {
      "day": "J-12",
      "passengers": 18943,
      "otp": 95.4,
      "painIndex": 44.5,
      "loadFactor": 72.3,
      "revenue": 7.05,
      "headway": 9.8,
      "anomaly": null
    },
    {
      "day": "J-11",
      "passengers": 12551,
      "otp": 87.1,
      "painIndex": 40.8,
      "loadFactor": 48.3,
      "revenue": 4.67,
      "headway": 9.9,
      "anomaly": null
    },
    {
      "day": "J-10",
      "passengers": 13010,
      "otp": 92.7,
      "painIndex": 37.1,
      "loadFactor": 46.1,
      "revenue": 4.84,
      "headway": 10.0,
      "anomaly": null
    },
    {
      "day": "J-9",
      "passengers": 19872,
      "otp": 96.5,
      "painIndex": 44.7,
      "loadFactor": 71.8,
      "revenue": 7.39,
      "headway": 9.6,
      "anomaly": null
    },
    {
      "day": "J-8",
      "passengers": 20411,
      "otp": 93.9,
      "painIndex": 43.3,
      "loadFactor": 70.5,
      "revenue": 7.59,
      "headway": 9.7,
      "anomaly": null
    },
    {
      "day": "J-7",
      "passengers": 16725,
      "otp": 81.4,
      "painIndex": 48.1,
      "loadFactor": 72.0,
      "revenue": 6.22,
      "headway": 10.1,
      "anomaly": null
    },
    {
      "day": "J-6",
      "passengers": 20484,
      "otp": 88.5,
      "painIndex": 46.1,
      "loadFactor": 71.3,
      "revenue": 7.62,
      "headway": 9.9,
      "anomaly": null
    },
    {
      "day": "J-5",
      "passengers": 17934,
      "otp": 93.3,
      "painIndex": 44.1,
      "loadFactor": 71.1,
      "revenue": 6.67,
      "headway": 9.4,
      "anomaly": null
    },
    {
      "day": "J-4",
      "passengers": 12998,
      "otp": 93.9,
      "painIndex": 39.7,
      "loadFactor": 50.2,
      "revenue": 4.84,
      "headway": 9.5,
      "anomaly": null
    },
    {
      "day": "J-3",
      "passengers": 14217,
      "otp": 88.3,
      "painIndex": 40.9,
      "loadFactor": 51.0,
      "revenue": 5.29,
      "headway": 9.5,
      "anomaly": null
    },
    {
      "day": "J-2",
      "passengers": 19871,
      "otp": 96.7,
      "painIndex": 44.5,
      "loadFactor": 72.0,
      "revenue": 7.39,
      "headway": 9.5,
      "anomaly": null
    },
    {
      "day": "J-1",
      "passengers": 23667,
      "otp": 91.6,
      "painIndex": 45.1,
      "loadFactor": 73.3,
      "revenue": 8.8,
      "headway": 9.6,
      "anomaly": null
    },
    {
      "day": "J-0",
      "passengers": 19429,
      "otp": 89.8,
      "painIndex": 45.3,
      "loadFactor": 70.2,
      "revenue": 7.23,
      "headway": 9.9,
      "anomaly": null
    }
  ],
  "zoneDistribution": [
    {
      "zone": "Banlieue",
      "passengers": 2514373,
      "otp": 91.3,
      "painIndex": 43.6,
      "load": 64.6
    },
    {
      "zone": "Dakar Centre",
      "passengers": 1491072,
      "otp": 90.3,
      "painIndex": 48.5,
      "load": 80.0
    },
    {
      "zone": "Centre",
      "passengers": 1342909,
      "otp": 91.1,
      "painIndex": 43.1,
      "load": 62.9
    },
    {
      "zone": "Nord",
      "passengers": 1105564,
      "otp": 91.9,
      "painIndex": 40.9,
      "load": 56.2
    }
  ],
  "corridorProfile": [
    {
      "station": "Petersen / Papa Gueye Fall",
      "order": 1,
      "boardings": 678007,
      "alightings": 505630,
      "load": 112.7,
      "pain": 59.7
    },
    {
      "station": "Place de la Nation / Baux Maraîchers",
      "order": 2,
      "boardings": 265748,
      "alightings": 197403,
      "load": 68.8,
      "pain": 44.3
    },
    {
      "station": "Sacré-Cœur / Liberté",
      "order": 3,
      "boardings": 269785,
      "alightings": 200303,
      "load": 69.7,
      "pain": 45.0
    },
    {
      "station": "Dial Diop / Thiandoum",
      "order": 4,
      "boardings": 277532,
      "alightings": 205622,
      "load": 69.1,
      "pain": 45.0
    },
    {
      "station": "Dalal Jamm / Hôpital Dalal Jamm",
      "order": 5,
      "boardings": 275555,
      "alightings": 204220,
      "load": 68.6,
      "pain": 44.8
    },
    {
      "station": "Fadia",
      "order": 6,
      "boardings": 202952,
      "alightings": 150042,
      "load": 52.6,
      "pain": 39.7
    },
    {
      "station": "Golf",
      "order": 7,
      "boardings": 207212,
      "alightings": 154036,
      "load": 53.5,
      "pain": 40.3
    },
    {
      "station": "Khar Yallah",
      "order": 8,
      "boardings": 212989,
      "alightings": 158185,
      "load": 53.5,
      "pain": 39.6
    },
    {
      "station": "Parcelles Assainies",
      "order": 9,
      "boardings": 206856,
      "alightings": 153028,
      "load": 52.5,
      "pain": 39.9
    },
    {
      "station": "Grand Médine",
      "order": 10,
      "boardings": 524571,
      "alightings": 392375,
      "load": 103.4,
      "pain": 56.9
    },
    {
      "station": "Grand Yoff",
      "order": 11,
      "boardings": 200788,
      "alightings": 148732,
      "load": 52.7,
      "pain": 39.8
    },
    {
      "station": "Ancienne Piste",
      "order": 12,
      "boardings": 206011,
      "alightings": 152228,
      "load": 53.0,
      "pain": 39.8
    },
    {
      "station": "Case Bi / Séquence",
      "order": 13,
      "boardings": 206736,
      "alightings": 152749,
      "load": 52.7,
      "pain": 39.8
    },
    {
      "station": "Ndingala / Liberté VI",
      "order": 14,
      "boardings": 204803,
      "alightings": 151271,
      "load": 52.5,
      "pain": 39.2
    },
    {
      "station": "Fith Mith",
      "order": 15,
      "boardings": 200344,
      "alightings": 148103,
      "load": 52.7,
      "pain": 39.6
    },
    {
      "station": "Golf Nord",
      "order": 16,
      "boardings": 212400,
      "alightings": 156705,
      "load": 53.5,
      "pain": 39.8
    },
    {
      "station": "Gueule Tapée",
      "order": 17,
      "boardings": 197010,
      "alightings": 145851,
      "load": 52.6,
      "pain": 39.9
    },
    {
      "station": "Pikine Nord",
      "order": 18,
      "boardings": 204918,
      "alightings": 151511,
      "load": 52.1,
      "pain": 39.9
    },
    {
      "station": "Thiaroye",
      "order": 19,
      "boardings": 208954,
      "alightings": 154689,
      "load": 52.3,
      "pain": 40.0
    },
    {
      "station": "Malika",
      "order": 20,
      "boardings": 273277,
      "alightings": 202411,
      "load": 68.9,
      "pain": 44.9
    },
    {
      "station": "Yeumbeul",
      "order": 21,
      "boardings": 270585,
      "alightings": 201227,
      "load": 67.5,
      "pain": 43.8
    },
    {
      "station": "Keur Massar",
      "order": 22,
      "boardings": 271249,
      "alightings": 200733,
      "load": 69.0,
      "pain": 44.4
    },
    {
      "station": "Préfecture de Guédiawaye",
      "order": 23,
      "boardings": 675636,
      "alightings": 504951,
      "load": 112.6,
      "pain": 60.1
    }
  ],
  "seasonalImpact": [
    {
      "saison": "Pluies",
      "avgPax": 64.6,
      "otp": 91.4,
      "painIndex": 43.6,
      "load": 65.0,
      "count": 25147
    },
    {
      "saison": "Seche",
      "avgPax": 64.5,
      "otp": 91.1,
      "painIndex": 43.8,
      "load": 65.1,
      "count": 74853
    }
  ],
  "headwayByHour": [
    {
      "hour": "5h",
      "headway_B1": 10.3,
      "cv_B1": 14.5,
      "headway_B2": 15.4,
      "cv_B2": 9.5,
      "headway_B3": 12.3,
      "cv_B3": 12.0
    },
    {
      "hour": "6h",
      "headway_B1": 10.4,
      "cv_B1": 14.6,
      "headway_B2": 15.4,
      "cv_B2": 9.8,
      "headway_B3": 12.3,
      "cv_B3": 11.9
    },
    {
      "hour": "7h",
      "headway_B1": 5.4,
      "cv_B1": 27.2,
      "headway_B2": 8.5,
      "cv_B2": 17.7,
      "headway_B3": 6.4,
      "cv_B3": 23.7
    },
    {
      "hour": "8h",
      "headway_B1": 5.3,
      "cv_B1": 28.1,
      "headway_B2": 8.4,
      "cv_B2": 18.3,
      "headway_B3": 6.3,
      "cv_B3": 23.5
    },
    {
      "hour": "9h",
      "headway_B1": 5.4,
      "cv_B1": 27.3,
      "headway_B2": 8.4,
      "cv_B2": 17.6,
      "headway_B3": 6.4,
      "cv_B3": 22.8
    },
    {
      "hour": "10h",
      "headway_B1": 5.4,
      "cv_B1": 28.0,
      "headway_B2": 8.3,
      "cv_B2": 17.8,
      "headway_B3": 6.4,
      "cv_B3": 23.2
    },
    {
      "hour": "11h",
      "headway_B1": 10.4,
      "cv_B1": 14.0,
      "headway_B2": 15.4,
      "cv_B2": 9.6,
      "headway_B3": 12.3,
      "cv_B3": 12.2
    },
    {
      "hour": "12h",
      "headway_B1": 10.4,
      "cv_B1": 14.7,
      "headway_B2": 15.3,
      "cv_B2": 9.6,
      "headway_B3": 12.4,
      "cv_B3": 11.9
    },
    {
      "hour": "13h",
      "headway_B1": 10.4,
      "cv_B1": 14.1,
      "headway_B2": 15.3,
      "cv_B2": 9.7,
      "headway_B3": 12.4,
      "cv_B3": 12.2
    },
    {
      "hour": "14h",
      "headway_B1": 10.4,
      "cv_B1": 14.3,
      "headway_B2": 15.4,
      "cv_B2": 9.8,
      "headway_B3": 12.4,
      "cv_B3": 11.7
    },
    {
      "hour": "15h",
      "headway_B1": 10.4,
      "cv_B1": 13.9,
      "headway_B2": 15.3,
      "cv_B2": 9.6,
      "headway_B3": 12.4,
      "cv_B3": 11.9
    },
    {
      "hour": "16h",
      "headway_B1": 5.3,
      "cv_B1": 27.2,
      "headway_B2": 8.4,
      "cv_B2": 17.5,
      "headway_B3": 6.4,
      "cv_B3": 23.3
    },
    {
      "hour": "17h",
      "headway_B1": 5.4,
      "cv_B1": 28.0,
      "headway_B2": 8.4,
      "cv_B2": 17.4,
      "headway_B3": 6.3,
      "cv_B3": 22.1
    },
    {
      "hour": "18h",
      "headway_B1": 5.4,
      "cv_B1": 27.2,
      "headway_B2": 8.4,
      "cv_B2": 18.7,
      "headway_B3": 6.4,
      "cv_B3": 23.0
    },
    {
      "hour": "19h",
      "headway_B1": 5.4,
      "cv_B1": 27.0,
      "headway_B2": 8.3,
      "cv_B2": 17.5,
      "headway_B3": 6.4,
      "cv_B3": 22.6
    },
    {
      "hour": "20h",
      "headway_B1": 5.4,
      "cv_B1": 27.0,
      "headway_B2": 8.4,
      "cv_B2": 17.5,
      "headway_B3": 6.4,
      "cv_B3": 23.8
    },
    {
      "hour": "21h",
      "headway_B1": 10.4,
      "cv_B1": 14.4,
      "headway_B2": 15.4,
      "cv_B2": 9.6,
      "headway_B3": 12.4,
      "cv_B3": 12.0
    },
    {
      "hour": "22h",
      "headway_B1": 10.4,
      "cv_B1": 14.4,
      "headway_B2": 15.3,
      "cv_B2": 9.8,
      "headway_B3": 12.4,
      "cv_B3": 12.2
    }
  ],
  "directionFlows": [
    {
      "zone": "Banlieue",
      "direction": "Banlieue",
      "passengers": 853431
    },
    {
      "zone": "Banlieue",
      "direction": "CentreVille",
      "passengers": 638144
    },
    {
      "zone": "Banlieue",
      "direction": "Neutre",
      "passengers": 1022798
    },
    {
      "zone": "Centre",
      "direction": "Banlieue",
      "passengers": 450720
    },
    {
      "zone": "Centre",
      "direction": "CentreVille",
      "passengers": 346991
    },
    {
      "zone": "Centre",
      "direction": "Neutre",
      "passengers": 545198
    },
    {
      "zone": "Dakar Centre",
      "direction": "Banlieue",
      "passengers": 514417
    },
    {
      "zone": "Dakar Centre",
      "direction": "CentreVille",
      "passengers": 370438
    },
    {
      "zone": "Dakar Centre",
      "direction": "Neutre",
      "passengers": 606217
    },
    {
      "zone": "Nord",
      "direction": "Banlieue",
      "passengers": 368149
    },
    {
      "zone": "Nord",
      "direction": "CentreVille",
      "passengers": 282674
    },
    {
      "zone": "Nord",
      "direction": "Neutre",
      "passengers": 454741
    }
  ]
} as const;
