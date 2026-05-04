import { heatmap } from "@/lib/data";

export function Heatmap() {
  const max = 170;
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-[3px] text-xs">
        <thead>
          <tr>
            <th className="sticky left-0 bg-card text-left text-[10px] font-medium uppercase tracking-wider text-muted-foreground"></th>
            {heatmap[0].values.map((v) => (
              <th key={v.hour} className="text-[10px] font-normal text-muted-foreground">
                {v.hour}h
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {heatmap.map((row) => (
            <tr key={row.station}>
              <td className="sticky left-0 bg-card pr-2 text-right text-[11px] font-medium text-foreground/80">
                {row.station}
              </td>
              {row.values.map((v) => {
                const intensity = Math.min(1, v.value / max);
                // Ramp officiel SunuBRT: vert B1 → bleu B3 → orange B2 → rouge accent
                let color = "var(--line-b1)";
                if (intensity > 0.78) color = "var(--brand-accent)";
                else if (intensity > 0.58) color = "var(--line-b2)";
                else if (intensity > 0.32) color = "var(--line-b3)";
                const bg = `color-mix(in oklab, ${color} ${Math.round(20 + intensity * 75)}%, transparent)`;
                return (
                  <td
                    key={v.hour}
                    title={`${row.station} · ${v.hour}h · ${v.value}`}
                    className="h-6 w-7 rounded transition-transform hover:scale-110"
                    style={{ backgroundColor: bg }}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 flex items-center gap-2 text-[10px] text-muted-foreground">
        <span>Faible</span>
        <div className="h-1.5 flex-1 rounded-full" style={{ background: "linear-gradient(to right, var(--line-b1), var(--line-b3), var(--line-b2), var(--brand-accent))" }} />
        <span>Saturé</span>
      </div>
    </div>
  );
}
