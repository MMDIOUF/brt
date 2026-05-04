// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PYTHON    = "C:\\Users\\7MAKSACOD\\AppData\\Local\\Programs\\Python\\Python310\\python.exe";
const WATCHER   = path.resolve(__dirname, "../watch_data.py");
const BRT_ROOT  = path.resolve(__dirname, "..");

/* ── Plugin : démarre watch_data.py automatiquement avec le dev server ─── */
function brtAutoWatcherPlugin() {
  return {
    name: "brt-auto-watcher",
    configureServer(server: any) {
      const proc = spawn(PYTHON, [WATCHER], {
        cwd: BRT_ROOT,
        stdio: ["ignore", "pipe", "pipe"],
        windowsHide: true,
      });

      proc.stdout?.on("data", (d: Buffer) =>
        process.stdout.write(`\x1b[36m[BRT Watch]\x1b[0m ${d.toString().trim()}\n`));
      proc.stderr?.on("data", (d: Buffer) =>
        process.stderr.write(`\x1b[33m[BRT Watch]\x1b[0m ${d.toString().trim()}\n`));
      proc.on("exit", (code: number) =>
        console.log(`\x1b[36m[BRT Watch]\x1b[0m Arrêté (code ${code})`));

      /* Tue le watcher proprement quand Vite s'arrête */
      server.httpServer?.once("close", () => {
        proc.kill();
      });

      console.log("\x1b[36m[BRT Watch]\x1b[0m ✓ Watcher démarré — surveille brt data.xlsx toutes les 3s");
    },
  };
}

export default defineConfig({
  vite: {
    plugins: [brtAutoWatcherPlugin()],
  },
});
