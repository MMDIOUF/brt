import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/cockpit/AppSidebar";
import { AppHeader } from "@/components/cockpit/AppHeader";
import { Toaster } from "@/components/ui/sonner";
import { FilterProvider } from "@/lib/filter-context";
import { DataFreshnessProvider } from "@/lib/data-freshness";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SunuBRT — Cockpit de pilotage stratégique" },
      { name: "description", content: "Outil interne de pilotage du réseau SunuBRT Dakar." },
      { name: "theme-color", content: "#0D1117" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  return (
    <DataFreshnessProvider>
      <FilterProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="min-w-0">
            <AppHeader />
            <main className="min-h-[calc(100vh-3.5rem)]">
              <Outlet />
            </main>
          </SidebarInset>
          <Toaster />
        </SidebarProvider>
      </FilterProvider>
    </DataFreshnessProvider>
  );
}
