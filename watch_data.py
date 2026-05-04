"""
watch_data.py — Watche brt data.xlsx et regenere real-data.ts automatiquement.

Usage:
  python watch_data.py

Comportement:
  - Poll le hash MD5 de brt data.xlsx toutes les 3 secondes
  - Si le fichier change, lance generate_real_data.py
  - Vite HMR detecte le changement dans real-data.ts et recharge le dashboard

Prerequis:
  - npm run dev doit tourner dans brtintern-main/
  - Python 3.x avec pandas + openpyxl
"""

import hashlib, subprocess, sys, time
from pathlib import Path

EXCEL  = Path(__file__).parent / "brt data.xlsx"
BRIDGE = Path(__file__).parent / "generate_real_data.py"
PYTHON = sys.executable
POLL_S = 3


def md5(path: Path) -> str:
    h = hashlib.md5()
    try:
        with open(path, "rb") as f:
            for chunk in iter(lambda: f.read(65536), b""):
                h.update(chunk)
        return h.hexdigest()
    except FileNotFoundError:
        return ""


def run_bridge():
    print("[watch] Changement detecte — regeneration real-data.ts...")
    t0 = time.time()
    result = subprocess.run(
        [PYTHON, str(BRIDGE)],
        cwd=str(BRIDGE.parent),
        capture_output=True, text=True, encoding="utf-8", errors="replace"
    )
    elapsed = time.time() - t0
    if result.returncode == 0:
        print(f"[watch] OK en {elapsed:.1f}s — Vite HMR va recharger le dashboard")
    else:
        print(f"[watch] ERREUR bridge ({elapsed:.1f}s):")
        print(result.stderr[-2000:])


def main():
    if not EXCEL.exists():
        print(f"[watch] ERREUR: fichier introuvable: {EXCEL}")
        sys.exit(1)

    print(f"[watch] Surveillance de: {EXCEL.name}")
    print(f"[watch] Intervalle de polling: {POLL_S}s")
    print("[watch] Ctrl+C pour arreter\n")

    last_hash = md5(EXCEL)
    run_bridge()  # run once at startup

    try:
        while True:
            time.sleep(POLL_S)
            current = md5(EXCEL)
            if current and current != last_hash:
                last_hash = current
                run_bridge()
    except KeyboardInterrupt:
        print("\n[watch] Arret.")


if __name__ == "__main__":
    main()
