import snapshot from "@/data/snapshot.json";
import historical from "@/data/historical.json";

const fy = snapshot.fy2024;
const prev = historical.years[historical.years.length - 2];

function delta(current: number, previous: number): string {
  const pct = ((current - previous) / previous) * 100;
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${pct.toFixed(1)}% YoY`;
}

export default function SnapshotPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
      <div className="mb-8 sm:mb-12 mt-2">
        <p className="section-label mb-3">Financial Snapshot</p>
        <h1 className="text-2xl sm:text-4xl font-medium text-cog-black leading-tight">
          FY2024 Performance
        </h1>
        <p className="mt-3 text-cog-muted text-base">
          Key operating and financial metrics for Scentre Group&apos;s full-year 2024 results.
        </p>
      </div>

      <section>
        <p className="section-label mb-4">Earnings</p>
        <div className="grid grid-cols-2 gap-px bg-cog-rule md:grid-cols-4 border border-cog-rule">
          <Stat label="FFO" value={`$${fy.ffo_m.toLocaleString()}m`} sub={delta(fy.ffo_m, prev.ffo_m)} />
          <Stat label="FFO / Security" value={`${fy.ffo_per_security_cents}c`} sub={delta(fy.ffo_per_security_cents, prev.ffo_per_security_cents)} />
          <Stat label="Distribution" value={`${fy.distribution_per_security_cents}c`} sub={delta(fy.distribution_per_security_cents, prev.distribution_per_security_cents)} />
          <Stat label="NPI" value={`$${fy.net_property_income_m.toLocaleString()}m`} sub={`+${fy.npi_yoy_pct}% YoY`} />
        </div>
      </section>

      <section>
        <p className="section-label mb-4">Operating Metrics</p>
        <div className="grid grid-cols-2 gap-px bg-cog-rule md:grid-cols-4 border border-cog-rule">
          <Stat label="Occupancy" value={`${fy.occupancy_pct}%`} sub={delta(fy.occupancy_pct, prev.occupancy_pct)} />
          <Stat label="Specialty Sales/sqm" value={`$${fy.specialty_sales_psm.toLocaleString()}`} sub={`+${fy.specialty_sales_yoy_pct}% YoY`} />
          <Stat label="Total Centre Sales" value={`$${fy.total_centre_sales_bn}B`} />
          <Stat label="Customer Visits" value={`${fy.customer_visits_m}m`} />
        </div>
      </section>

      <section>
        <p className="section-label mb-4">Balance Sheet</p>
        <div className="grid grid-cols-2 gap-px bg-cog-rule md:grid-cols-4 border border-cog-rule">
          <Stat label="Gearing" value={`${fy.gearing_pct}%`} sub={delta(fy.gearing_pct, prev.gearing_pct)} />
          <Stat label="Interest Cover" value={`${fy.interest_cover_x}x`} />
          <Stat label="Avg Debt Maturity" value={`${fy.weighted_avg_debt_maturity_yrs} yrs`} />
          <Stat label="Credit Rating" value={fy.credit_rating} />
        </div>
      </section>

      <section>
        <p className="section-label mb-4">Portfolio</p>
        <div className="grid grid-cols-2 gap-px bg-cog-rule md:grid-cols-4 border border-cog-rule">
          <Stat label="Centres" value={String(snapshot.centres)} />
          <Stat label="GLA" value={`${snapshot.gla_sqm_m}m sqm`} />
          <Stat label="Total AUM" value={`A$${snapshot.total_aum_bn}B`} />
          <Stat label="Securities" value={`${snapshot.securities_on_issue_bn}B`} />
        </div>
      </section>

      <section>
        <p className="section-label mb-4">FY2025 Guidance</p>
        <div className="grid grid-cols-2 gap-px bg-cog-rule md:grid-cols-3 border border-cog-rule">
          <Stat label="FFO / Security" value={`${snapshot.fy2025_guidance.ffo_per_security_cents_low}–${snapshot.fy2025_guidance.ffo_per_security_cents_high}c`} />
          <Stat label="Distribution" value={`${snapshot.fy2025_guidance.distribution_per_security_cents}c`} />
          <Stat
            label="FFO Growth Implied"
            value={`${(((snapshot.fy2025_guidance.ffo_per_security_cents_low + snapshot.fy2025_guidance.ffo_per_security_cents_high) / 2 / fy.ffo_per_security_cents - 1) * 100).toFixed(1)}%`}
          />
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white p-5">
      <p className="text-xs text-cog-light uppercase tracking-[0.15em]">{label}</p>
      <p className="mt-1 text-xl sm:text-2xl font-medium text-cog-black font-serif">{value}</p>
      {sub && (
        <p className={`text-xs mt-0.5 ${sub.startsWith("+") ? "text-emerald-600" : sub.startsWith("-") ? "text-red-600" : "text-cog-muted"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}
