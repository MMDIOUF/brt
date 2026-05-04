import { createContext, useContext, useEffect, useRef, useState } from "react";

export type FreshnessStatus = "live" | "updated" | "stale" | "fallback";

export type Freshness = {
  lastUpdate: Date;
  status: FreshnessStatus;
  source: string;
  refreshing: boolean;
  excelGeneratedAt: string | null;
  networkScore: number | null;
  refresh: () => Promise<void>;
};

const Ctx = createContext<Freshness | null>(null);

const LIVE_URL   = "/sunubrt-live.json";
const META_URL   = "/data-meta.json";
const REFRESH_MS = 5 * 60 * 1000;
const STALE_MS   = 10 * 60 * 1000;

export function DataFreshnessProvider({ children }: { children: React.ReactNode }) {
  const [lastUpdate,        setLastUpdate]        = useState<Date>(new Date());
  const [status,            setStatus]            = useState<FreshnessStatus>("live");
  const [source,            setSource]            = useState("sunubrt.sn · Dakar Mobilité");
  const [refreshing,        setRefreshing]        = useState(false);
  const [excelGeneratedAt,  setExcelGeneratedAt]  = useState<string | null>(null);
  const [networkScore,      setNetworkScore]      = useState<number | null>(null);
  const lastGood = useRef<Date>(new Date());

  async function refresh() {
    setRefreshing(true);
    try {
      // Check live news freshness
      const liveRes = await fetch(LIVE_URL, { cache: "no-cache" });
      if (liveRes.ok) {
        const json = await liveRes.json();
        const now = new Date(json.scraped_at ?? Date.now());
        lastGood.current = now;
        setLastUpdate(now);
        setStatus(json.fallback ? "updated" : "live");
        setSource(json.source ?? "sunubrt.sn · Dakar Mobilité");
      } else {
        throw new Error(`HTTP ${liveRes.status}`);
      }
    } catch {
      setStatus("fallback");
      setSource("Cache local · dernière donnée valide");
    }

    // Check Excel data freshness (non-critical)
    try {
      const metaRes = await fetch(META_URL, { cache: "no-cache" });
      if (metaRes.ok) {
        const meta = await metaRes.json();
        setExcelGeneratedAt(meta.generated_at ?? null);
        setNetworkScore(meta.network_score ?? null);
      }
    } catch {
      // meta is best-effort
    }

    setRefreshing(false);
  }

  useEffect(() => {
    void refresh();
    const autoRefresh = setInterval(() => void refresh(), REFRESH_MS);
    const staleCheck  = setInterval(() => {
      const ageMs = Date.now() - lastGood.current.getTime();
      if (ageMs > STALE_MS * 2) setStatus((s) => s !== "fallback" ? "stale" : s);
      else if (ageMs > STALE_MS) setStatus((s) => s === "live" ? "updated" : s);
    }, 30_000);
    return () => { clearInterval(autoRefresh); clearInterval(staleCheck); };
  }, []);

  return (
    <Ctx.Provider value={{ lastUpdate, status, source, refreshing, excelGeneratedAt, networkScore, refresh }}>
      {children}
    </Ctx.Provider>
  );
}

export function useFreshness() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useFreshness must be used inside DataFreshnessProvider");
  return v;
}

export function formatRelative(d: Date) {
  const s = Math.max(1, Math.round((Date.now() - d.getTime()) / 1000));
  if (s < 60) return `il y a ${s}s`;
  if (s < 3600) return `il y a ${Math.round(s / 60)} min`;
  return `il y a ${Math.round(s / 3600)}h`;
}
