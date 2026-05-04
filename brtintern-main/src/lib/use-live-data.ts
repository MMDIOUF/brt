import { useState, useEffect, useCallback, useRef } from "react";

export type LiveNewsItem = {
  title: string;
  date: string;
  excerpt: string;
  url: string;
  image: string;
  tag: string;
};

export type LiveData = {
  scraped_at: string;
  source: string;
  fallback: boolean;
  news: LiveNewsItem[];
  service_alerts: { title: string; body: string; severity: string }[];
  network_info: {
    lines_count: number;
    stations_count: number;
    km: number;
    fleet_size: number;
    fleet_type: string;
    capacity_per_day: number;
    inauguration: string;
    operator: string;
    tariff_fcfa: number;
  };
};

const LIVE_URL    = "/sunubrt-live.json";
const REFRESH_MS  = 5 * 60 * 1000; // 5 min
const CACHE_KEY   = "sunu_live_v1";

function loadCache(): LiveData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts < 30 * 60 * 1000) return data as LiveData;
    return null;
  } catch { return null; }
}

function saveCache(data: LiveData) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() })); } catch {}
}

export function useLiveData() {
  const [data, setData]         = useState<LiveData | null>(() => loadCache());
  const [loading, setLoading]   = useState(!loadCache());
  const [error, setError]       = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<Date | null>(null);
  const lastGood = useRef<LiveData | null>(loadCache());

  const fetch_ = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(LIVE_URL, { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: LiveData = await res.json();
      lastGood.current = json;
      saveCache(json);
      setData(json);
      setError(null);
      setFetchedAt(new Date());
    } catch (e: any) {
      // Use last good cached data as fallback
      if (lastGood.current) {
        setData(lastGood.current);
        setError("fallback");
      } else {
        setError(e.message ?? "Erreur réseau");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetch_();
    const id = setInterval(() => void fetch_(), REFRESH_MS);
    return () => clearInterval(id);
  }, [fetch_]);

  return { data, loading, error, fetchedAt, refresh: fetch_ };
}
