import { useEffect, useRef, useState } from "react";

export type PipelineStageStatus = "active" | "idle" | "running" | "error";

export interface PipelineMeta {
  generated_at: string;
  source: string;
  rows: number;
  n_days: number;
  network_score: number;
  otp_pct: number;
  daily_pax: number;
  pain_index: number;
}

export interface PipelineState {
  meta: PipelineMeta | null;
  lastFetch: Date;
  prevGeneratedAt: string | null;
  justUpdated: boolean;   /* true pendant 4s après une détection de changement */
  error: boolean;
  loading: boolean;
  trigger: number;        /* incrémenté à chaque changement pour forcer re-render */
}

const POLL_MS = 15_000;   /* poll toutes les 15s */
const FLASH_MS = 4_000;   /* durée de l'animation "just updated" */

export function usePipeline(): PipelineState {
  const [state, setState] = useState<PipelineState>({
    meta: null,
    lastFetch: new Date(),
    prevGeneratedAt: null,
    justUpdated: false,
    error: false,
    loading: true,
    trigger: 0,
  });

  const prevGenAt = useRef<string | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function poll() {
    try {
      const res = await fetch("/data-meta.json", { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const meta: PipelineMeta = await res.json();

      const isNew = prevGenAt.current !== null && prevGenAt.current !== meta.generated_at;

      if (isNew) {
        /* Nouveau run de bridge détecté → flash animation */
        if (flashTimer.current) clearTimeout(flashTimer.current);
        setState((s) => ({
          ...s,
          meta,
          lastFetch: new Date(),
          prevGeneratedAt: prevGenAt.current,
          justUpdated: true,
          error: false,
          loading: false,
          trigger: s.trigger + 1,
        }));
        flashTimer.current = setTimeout(() => {
          setState((s) => ({ ...s, justUpdated: false }));
        }, FLASH_MS);
      } else {
        setState((s) => ({
          ...s,
          meta,
          lastFetch: new Date(),
          error: false,
          loading: false,
        }));
      }

      prevGenAt.current = meta.generated_at;
    } catch {
      setState((s) => ({ ...s, error: true, loading: false }));
    }
  }

  useEffect(() => {
    void poll();
    const interval = setInterval(() => void poll(), POLL_MS);
    return () => {
      clearInterval(interval);
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
  }, []);

  return state;
}

/* Formate une date ISO en temps relatif français */
export function pipelineRelative(iso: string): string {
  const d = new Date(iso);
  const s = Math.max(1, Math.round((Date.now() - d.getTime()) / 1000));
  if (s < 60)   return `il y a ${s}s`;
  if (s < 3600) return `il y a ${Math.round(s / 60)} min`;
  if (s < 86400) return `il y a ${Math.round(s / 3600)}h`;
  return `il y a ${Math.round(s / 86400)}j`;
}
