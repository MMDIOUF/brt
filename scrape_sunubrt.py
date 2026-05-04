"""
scrape_sunubrt.py — Fetches public data from sunubrt.sn and outputs JSON
for the SunuBRT dashboard landing page.

Usage:
  python scrape_sunubrt.py
  python scrape_sunubrt.py --output brtintern-main/public/sunubrt-live.json

Output JSON schema:
  {
    "scraped_at": "ISO datetime",
    "source": "sunubrt.sn",
    "news": [{ "title", "date", "excerpt", "url", "image" }],
    "service_alerts": [{ "title", "body", "severity" }],
    "network_info": { "lines_count", "stations_count", "km", "fleet_size" },
    "fallback": bool   -- true if scrape failed and cached data was used
  }
"""

import sys
import json
import re
import time
import argparse
from datetime import datetime
from pathlib import Path

try:
    import urllib.request as req
    from urllib.error import URLError
    from html.parser import HTMLParser
except ImportError:
    print("Python stdlib not available", file=sys.stderr)
    sys.exit(1)

BASE_URL = "https://www.sunubrt.sn"
HEADERS  = {
    "User-Agent": "SunuBRT-Cockpit/1.0 (internal dashboard; contact serviceclient@sunubrt.sn)",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
}

# ── Static fallback (always valid) ───────────────────────────────────────────
STATIC_NEWS = [
    {
        "title": "SunuBRT inaugure sa première extension de ligne",
        "date": "2025-01-14",
        "excerpt": "Le réseau BRT de Dakar étend son corridor vers de nouvelles zones de Guédiawaye pour mieux desservir les quartiers Nord.",
        "url": "https://www.sunubrt.sn",
        "image": "https://www.sunubrt.sn/app/uploads/2025/12/Prolongement-2-747x1024.jpg",
        "tag": "Réseau",
    },
    {
        "title": "Zéro harcèlement dans les transports — Programme actif",
        "date": "2025-03-08",
        "excerpt": "SunuBRT renforce ses engagements en matière de sécurité et de respect pour tous les voyageurs, avec un focus sur la protection des femmes.",
        "url": "https://www.sunubrt.sn",
        "image": "https://www.sunubrt.sn/app/uploads/iris-images/7942/zero-harcelement-dans-les-transports-360x260-f50_50.webp",
        "tag": "Sécurité",
    },
    {
        "title": "Abonnement jeune — Tarif préférentiel pour les étudiants",
        "date": "2025-04-01",
        "excerpt": "SunuBRT lance un abonnement mensuel à tarif réduit pour les jeunes de moins de 26 ans et les étudiants dakarois.",
        "url": "https://www.sunubrt.sn",
        "image": "https://www.sunubrt.sn/app/uploads/2025/04/sunuBRT-abonnement-jeune.png",
        "tag": "Tarification",
    },
    {
        "title": "SunuCRC — Centre de Relation Client opérationnel",
        "date": "2024-11-15",
        "excerpt": "Le nouveau centre de relation client SunuBRT répond aux demandes 6j/7 par téléphone, email et formulaire en ligne.",
        "url": "https://www.sunubrt.sn",
        "image": "https://www.sunubrt.sn/app/uploads/iris-images/3785/SunuCRC-460x260-f50_50.jpeg",
        "tag": "Service client",
    },
]

STATIC_NETWORK = {
    "lines_count": 3,
    "stations_count": 23,
    "km": 18.3,
    "fleet_size": 144,
    "fleet_type": "100% électrique (BYD K9)",
    "capacity_per_day": 300000,
    "inauguration": "2024-01-14",
    "operator": "Dakar Mobilité",
    "tariff_1zone_fcfa": 400,
    "tariff_allzones_fcfa": 500,
    "tariff_carnet10_1zone": 3600,
    "tariff_carnet10_allzones": 4500,
    "tariff_mensuel_1zone": 17000,
    "tariff_mensuel_allzones": 22000,
    "tariff_jeune_1zone": 14000,
    "tariff_jeune_allzones": 18000,
    "tariff_avg_fcfa": 329,
}


# ── HTML Parser ───────────────────────────────────────────────────────────────
class NewsParser(HTMLParser):
    """Extracts article titles, dates, images and excerpts from sunubrt.sn."""

    def __init__(self):
        super().__init__()
        self.news = []
        self._in_article = False
        self._in_title = False
        self._in_excerpt = False
        self._current: dict = {}
        self._depth = 0

    def handle_starttag(self, tag, attrs):
        attrs_d = dict(attrs)
        cls = attrs_d.get("class", "")

        # article blocks
        if tag == "article":
            self._in_article = True
            self._current = {}

        if self._in_article:
            if tag in ("h2", "h3") and ("title" in cls or "entry" in cls.lower()):
                self._in_title = True
            if tag == "a" and "href" in attrs_d and not self._current.get("url"):
                href = attrs_d["href"]
                if href.startswith("http"):
                    self._current["url"] = href
            if tag == "img" and "src" in attrs_d and not self._current.get("image"):
                src = attrs_d.get("src", "")
                if src.startswith("http") and any(ext in src for ext in [".jpg", ".png", ".webp", ".jpeg"]):
                    self._current["image"] = src
            if tag == "time" and "datetime" in attrs_d:
                self._current["date"] = attrs_d["datetime"][:10]
            if tag in ("p", "div") and "excerpt" in cls.lower():
                self._in_excerpt = True

    def handle_endtag(self, tag):
        if tag in ("h2", "h3"):
            self._in_title = False
        if tag in ("p", "div") and self._in_excerpt:
            self._in_excerpt = False
        if tag == "article":
            self._in_article = False
            if self._current.get("title"):
                self.news.append(dict(self._current))
            self._current = {}

    def handle_data(self, data):
        text = data.strip()
        if not text:
            return
        if self._in_title and self._in_article:
            self._current["title"] = text
        if self._in_excerpt and self._in_article:
            self._current["excerpt"] = text


def fetch_url(url: str, timeout: int = 8) -> str | None:
    try:
        request = req.Request(url, headers=HEADERS)
        with req.urlopen(request, timeout=timeout) as resp:
            charset = resp.headers.get_content_charset("utf-8")
            return resp.read().decode(charset, errors="replace")
    except Exception as e:
        print(f"[scrape] WARN: could not fetch {url}: {e}", file=sys.stderr)
        return None


def scrape_news(html: str) -> list[dict]:
    parser = NewsParser()
    parser.feed(html)

    # Deduplicate and clean
    seen = set()
    results = []
    for item in parser.news:
        title = item.get("title", "").strip()
        if not title or title in seen:
            continue
        seen.add(title)
        results.append({
            "title":   title,
            "date":    item.get("date", datetime.now().date().isoformat()),
            "excerpt": item.get("excerpt", "")[:280],
            "url":     item.get("url", BASE_URL),
            "image":   item.get("image", ""),
            "tag":     "Actualité",
        })
    return results[:8]  # limit to 8 items


def build_output(news: list[dict], fallback: bool) -> dict:
    return {
        "scraped_at": datetime.now().isoformat(),
        "source": "sunubrt.sn · Dakar Mobilité",
        "fallback": fallback,
        "news": news if news else STATIC_NEWS,
        "service_alerts": [],
        "network_info": STATIC_NETWORK,
    }


def main():
    parser = argparse.ArgumentParser(description="Scrape SunuBRT website")
    parser.add_argument("--output", default="brtintern-main/public/sunubrt-live.json")
    parser.add_argument("--timeout", type=int, default=10)
    args = parser.parse_args()

    print(f"[scrape] Fetching {BASE_URL} ...")
    html = fetch_url(BASE_URL, timeout=args.timeout)

    if html:
        news = scrape_news(html)
        fallback = len(news) == 0
        if fallback:
            print("[scrape] No articles parsed, using static fallback.")
            news = STATIC_NEWS
        else:
            print(f"[scrape] Parsed {len(news)} news items.")
        data = build_output(news, fallback)
    else:
        print("[scrape] Fetch failed — writing static fallback data.")
        data = build_output(STATIC_NEWS, fallback=True)

    out_path = Path(args.output)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[scrape] Written to {out_path}")


if __name__ == "__main__":
    main()
