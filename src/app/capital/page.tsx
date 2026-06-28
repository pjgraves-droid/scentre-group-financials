import capital from "@/data/capital.json";
import CapitalCharts from "@/components/CapitalCharts";

const o = capital.overview;

export default function CapitalPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
      <div className="mb-8 sm:mb-12 mt-2">
        <p className="section-label mb-3">Capital Management</p>
        <h1 className="text-2xl sm:text-4xl font-medium text-cog-black leading-tight">
          Balance Sheet & Debt Profile
        </h1>
        <p className="mt-3 text-cog-muted text-base">
          {o.credit_rating_sp} (S&amp;P) / {o.credit_rating_moodys} (Moody&apos;s) rated ·
          A${(o.total_debt_m / 1000).toFixed(1)}B total debt ·
          A${(o.available_liquidity_m / 1000).toFixed(1)}B available liquidity
        </p>
      </div>

      <section>
        <p className="section-label mb-4">Key Metrics</p>
        <div className="grid grid-cols-2 gap-px bg-cog-rule md:grid-cols-4 border border-cog-rule">
          <Stat label="Gearing" value={`${o.gearing_pct}%`} sub={`Target ${o.gearing_target_low_pct}–${o.gearing_target_high_pct}%`} />
          <Stat label="Interest Cover" value={`${o.interest_cover_x}x`} />
          <Stat label="Avg Cost of Debt" value={`${o.weighted_avg_cost_of_debt_pct}%`} />
          <Stat label="Avg Debt Maturity" value={`${o.weighted_avg_debt_maturity_yrs} yrs`} />
        </div>
      </section>

      <section>
        <p className="section-label mb-4">Hedging & Risk</p>
        <div className="grid grid-cols-2 gap-px bg-cog-rule md:grid-cols-4 border border-cog-rule">
          <Stat label="Hedged" value={`${o.hedged_pct}%`} />
          <Stat label="Fixed Rate" value={`${o.fixed_rate_pct}%`} />
          <Stat label="S&P Rating" value={o.credit_rating_sp} />
          <Stat label="Moody's Rating" value={o.credit_rating_moodys} />
        </div>
      </section>

      <CapitalCharts
        debtMaturity={capital.debt_maturity}
        gearingHistory={capital.gearing_history}
        fundingSources={capital.funding_sources}
      />
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white p-5">
      <p className="text-xs text-cog-light uppercase tracking-[0.15em]">{label}</p>
      <p className="mt-1 text-xl sm:text-2xl font-medium text-cog-black font-serif">{value}</p>
      {sub && <p className="text-xs text-cog-muted mt-0.5">{sub}</p>}
    </div>
  );
}
