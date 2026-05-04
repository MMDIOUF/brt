import { useState } from "react";
import { Lock, Bus } from "lucide-react";

// NOTE: This is a lightweight access gate, not a replacement for server-side auth.
// For production: replace with OAuth2 / SSO backed by the Dakar Mobilité identity provider.
const AUTH_KEY   = "sunu_brt_auth_v1";
const CORRECT_PIN = "brt2024";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(() => {
    try { return sessionStorage.getItem(AUTH_KEY) === "1"; }
    catch { return false; }
  });
  const [pin, setPin]     = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  if (authed) return <>{children}</>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pin === CORRECT_PIN) {
      try { sessionStorage.setItem(AUTH_KEY, "1"); } catch {}
      setAuthed(true);
    } else {
      setError(true);
      setShake(true);
      setPin("");
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div className="grid-bg flex min-h-screen items-center justify-center bg-background p-4">
      <div
        className={`card-elevated w-full max-w-sm rounded-2xl p-8 space-y-6 transition-transform ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}
        style={shake ? { animation: "shake 0.4s ease-in-out" } : {}}
      >
        {/* Branding */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 ring-1 ring-brand/30">
            <Bus className="h-7 w-7 text-brand" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight">SunuBRT · Cockpit</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Outil interne de pilotage stratégique
            </p>
          </div>
          <span className="rounded-full border border-brand/20 bg-brand/5 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-brand">
            Dakar Mobilité
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Code d'accès
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                value={pin}
                onChange={(e) => { setPin(e.target.value); setError(false); }}
                className={`w-full rounded-lg border bg-card py-2.5 pl-9 pr-3 text-sm transition-colors
                  focus:outline-none focus:ring-2 focus:ring-brand/40
                  ${error ? "border-critical text-critical" : "border-border"}`}
                placeholder="••••••••"
                autoFocus
                autoComplete="current-password"
              />
            </div>
            {error && (
              <p className="flex items-center gap-1.5 text-xs text-critical">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-critical" />
                Code incorrect. Contactez l'administrateur réseau.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white
              hover:bg-brand/90 active:scale-[.98] transition-all"
          >
            Accéder au cockpit
          </button>
        </form>

        <p className="text-center text-[11px] text-muted-foreground">
          Réseau BRT Dakar · 18,3 km · 23 stations · Données opérationnelles internes
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
