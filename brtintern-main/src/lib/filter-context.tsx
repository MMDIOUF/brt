import { createContext, useContext, useState } from "react";

export type Ligne   = "all" | "B1" | "B2" | "B3";
export type Zone    = "all" | "Nord" | "Centre" | "Sud";
export type Periode = "day" | "week" | "month";
export type Pointe  = "all" | "peak" | "off";

export type FilterState = {
  ligne: Ligne;
  zone: Zone;
  periode: Periode;
  pointe: Pointe;
};

type FilterCtx = FilterState & {
  setLigne:   (v: Ligne) => void;
  setZone:    (v: Zone) => void;
  setPeriode: (v: Periode) => void;
  setPointe:  (v: Pointe) => void;
  reset:      () => void;
  isFiltered: boolean;
};

const DEFAULT: FilterState = { ligne: "all", zone: "all", periode: "month", pointe: "all" };
const Ctx = createContext<FilterCtx | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [f, setF] = useState<FilterState>(DEFAULT);
  const isFiltered = f.ligne !== "all" || f.zone !== "all" || f.pointe !== "all";
  return (
    <Ctx.Provider value={{
      ...f,
      setLigne:   (v) => setF((p) => ({ ...p, ligne: v })),
      setZone:    (v) => setF((p) => ({ ...p, zone: v })),
      setPeriode: (v) => setF((p) => ({ ...p, periode: v })),
      setPointe:  (v) => setF((p) => ({ ...p, pointe: v })),
      reset:      () => setF(DEFAULT),
      isFiltered,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useFilters(): FilterCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFilters must be inside FilterProvider");
  return ctx;
}
