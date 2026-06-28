import peers from "@/data/peers.json";

const METRICS: { key: keyof typeof peers.peers[0]; label: string; format: (v: unknown) => string; higherBetter: boolean }[] = [
  { key: "market_cap_bn", label: "Market Cap (A$B)", format: (v) => `$${(v as number).toFixed(1)}B`, higherBetter: true },
  { key: "distribution_yield_pct", label: "Dist. Yield", format: (v) => `${(v as number).toFixed(1)}%`, higherBetter: true },
  { key: "gearing_pct", label: "Gearing", format: (v) => `${(v as number).toFixed(1)}%`, higherBetter: false },
  { key: "occupancy_pct", label: "Occupancy", format: (v) => `${(v as number).toFixed(1)}%`, higherBetter: true },
  { key: "specialty_sales_psm", label: "Sales/sqm", format: (v) => `$${(v as number).toLocaleString()}`, higherBetter: true },
  { key: "npi_growth_pct", label: "NPI Growth", format: (v) => `${(v as number).toFixed(1)}%`, higherBetter: true },
  { key: "total_aum_bn", label: "AUM (A$B)", format: (v) => `$${(v as number).toFixed(1)}B`, higherBetter: true },
  { key: "centres", label: "Centres", format: (v) => String(v), higherBetter: true },
  { key: "credit_rating", label: "Rating", format: (v) => String(v), higherBetter: true },
];

export default function PeersPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10">
      <div className="mb-8 sm:mb-12 mt-2">
        <p className="section-label mb-3">Peer Comparison</p>
        <h1 className="text-2xl sm:text-4xl font-medium text-cog-black leading-tight">
          A-REIT Benchmarking
        </h1>
        <p className="mt-3 text-cog-muted text-base">
          Scentre Group vs major Australian retail REITs and diversified property groups.
        </p>
      </div>

      <section className="overflow-x-auto">
        <table className="w-full text-sm border border-cog-rule">
          <thead>
            <tr className="bg-cog-surface border-b border-cog-rule">
              <th className="px-4 py-3 text-left text-xs text-cog-light uppercase tracking-[0.15em] font-normal sticky left-0 bg-cog-surface">
                Company
              </th>
              {METRICS.map((m) => (
                <th key={m.key} className="px-4 py-3 text-right text-xs text-cog-light uppercase tracking-[0.15em] font-normal whitespace-nowrap">
                  {m.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {peers.peers.map((p) => (
              <tr
                key={p.ticker}
                className={`border-b border-cog-rule transition-colors ${
                  p.highlight ? "bg-accent/5" : "hover:bg-cog-surface"
                }`}
              >
                <td className={`px-4 py-3 sticky left-0 ${p.highlight ? "bg-accent/5" : "bg-white"}`}>
                  <div className="flex items-center gap-2">
                    {p.highlight && <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />}
                    <div>
                      <p className={`font-medium ${p.highlight ? "text-accent" : "text-cog-black"}`}>{p.name}</p>
                      <p className="text-xs text-cog-muted">{p.ticker} · {p.portfolio_type}</p>
                    </div>
                  </div>
                </td>
                {METRICS.map((m) => {
                  const val = p[m.key];
                  const isBest = m.key !== "credit_rating" && isBestInClass(peers.peers, m.key, m.higherBetter, p.ticker);
                  return (
                    <td key={m.key} className={`px-4 py-3 text-right whitespace-nowrap ${isBest ? "font-medium text-accent" : "text-cog-body"}`}>
                      {m.format(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <p className="section-label mb-4">Peer Profiles</p>
        <div className="grid gap-px bg-cog-rule md:grid-cols-2 border border-cog-rule">
          {peers.peers.filter((p) => !p.highlight).map((p) => (
            <div key={p.ticker} className="bg-white p-6">
              <h3 className="text-lg font-medium text-cog-black font-serif">{p.name}</h3>
              <p className="text-xs text-cog-muted mt-1">{p.ticker} · {p.portfolio_type} · {p.credit_rating}</p>
              <div className="mt-3 grid grid-cols-3 gap-3">
                <MiniStat label="Mkt Cap" value={`$${p.market_cap_bn}B`} />
                <MiniStat label="Yield" value={`${p.distribution_yield_pct}%`} />
                <MiniStat label="Occ." value={`${p.occupancy_pct}%`} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="section-label mb-4">Metric Definitions</p>
        <div className="border border-cog-rule bg-white p-6 space-y-2">
          {Object.entries(peers.metrics_definitions).map(([key, def]) => (
            <div key={key} className="flex gap-2 text-sm">
              <span className="text-cog-muted font-medium min-w-[200px]">{key}</span>
              <span className="text-cog-body">{def}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function isBestInClass(
  allPeers: typeof peers.peers,
  key: keyof typeof peers.peers[0],
  higherBetter: boolean,
  ticker: string,
): boolean {
  const values = allPeers.map((p) => ({ ticker: p.ticker, val: p[key] as number }));
  const sorted = [...values].sort((a, b) => higherBetter ? b.val - a.val : a.val - b.val);
  return sorted[0].ticker === ticker;
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-cog-light uppercase tracking-[0.15em]">{label}</p>
      <p className="text-sm font-medium text-cog-black font-serif">{value}</p>
    </div>
  );
}
