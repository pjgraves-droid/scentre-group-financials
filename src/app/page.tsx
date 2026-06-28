import Link from "next/link";
import snapshot from "@/data/snapshot.json";
import historical from "@/data/historical.json";

const fy = snapshot.fy2024;
const latest = historical.years[historical.years.length - 1];

export default function Overview() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
      <div className="mb-8 sm:mb-12 mt-2">
        <p className="section-label mb-3">Financial Explorer</p>
        <h1 className="text-2xl sm:text-4xl font-medium text-cog-black leading-tight">
          {snapshot.legal_name}
        </h1>
        <p className="mt-3 text-cog-muted text-base">
          {snapshot.ticker} · HQ {snapshot.hq} · CEO {snapshot.ceo} · {snapshot.centres} Westfield Living Centres · A${snapshot.total_aum_bn}B AUM
        </p>
      </div>

      <section>
        <p className="section-label mb-4">FY2024 Highlights</p>
        <div className="grid grid-cols-2 gap-px bg-cog-rule md:grid-cols-5 border border-cog-rule">
          <Stat label="FFO" value={`$${fy.ffo_m.toLocaleString()}m`} sub={`+${fy.ffo_yoy_pct}% YoY`} />
          <Stat label="FFO / Security" value={`${fy.ffo_per_security_cents}c`} />
          <Stat label="Distribution" value={`${fy.distribution_per_security_cents}c`} sub={`+${fy.distribution_yoy_pct}% YoY`} />
          <Stat label="Occupancy" value={`${fy.occupancy_pct}%`} />
          <Stat label="Gearing" value={`${fy.gearing_pct}%`} sub={`ICR ${fy.interest_cover_x}x`} />
        </div>
      </section>

      <section>
        <p className="section-label mb-4">Portfolio at a Glance</p>
        <div className="grid grid-cols-2 gap-px bg-cog-rule md:grid-cols-4 border border-cog-rule">
          <Stat label="Total Centres" value={String(snapshot.centres)} />
          <Stat label="GLA" value={`${snapshot.gla_sqm_m}m sqm`} />
          <Stat label="Total AUM" value={`A$${snapshot.total_aum_bn}B`} />
          <Stat label="Customer Visits" value={`${latest.customer_visits_m}m`} />
        </div>
      </section>

      <section>
        <p className="section-label mb-4">FY2025 Guidance</p>
        <div className="grid grid-cols-2 gap-px bg-cog-rule md:grid-cols-3 border border-cog-rule">
          <Stat label="FFO / Security" value={`${snapshot.fy2025_guidance.ffo_per_security_cents_low}–${snapshot.fy2025_guidance.ffo_per_security_cents_high}c`} />
          <Stat label="Distribution" value={`${snapshot.fy2025_guidance.distribution_per_security_cents}c`} />
          <Stat label="Credit Rating" value={fy.credit_rating} />
        </div>
      </section>

      <section>
        <p className="section-label mb-4">Explore</p>
        <div className="grid gap-px bg-cog-rule md:grid-cols-3 border border-cog-rule">
          <FeatureCard href="/snapshot" title="Financial Snapshot" body="Key operating metrics, profitability KPIs, and year-on-year performance." />
          <FeatureCard href="/revenue" title="Revenue Breakdown" body="Interactive charts of revenue by segment with quarterly and annual views." />
          <FeatureCard href="/portfolio" title="Property Portfolio" body="All 42 Westfield centres with valuations, occupancy, and specialty sales." />
          <FeatureCard href="/trends" title="Historical Trends" body="Five-year trends across FFO, NPI, occupancy, and sales performance." />
          <FeatureCard href="/capital" title="Capital Management" body="Gearing profile, debt maturity, funding sources, and credit ratings." />
          <FeatureCard href="/pipeline" title="Development Pipeline" body="Active and planned developments with capex and target yields." />
          <FeatureCard href="/peers" title="Peer Comparison" body="Benchmarking against Vicinity, GPT, Charter Hall Retail, and Stockland." />
        </div>
      </section>

      <section>
        <p className="section-label mb-4">Key Sources</p>
        <div className="space-y-2">
          {snapshot.key_sources.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-cog-body underline decoration-black/20 hover:decoration-black/50 transition-colors"
            >
              {s.label}
            </a>
          ))}
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
      {sub && <p className="text-xs text-cog-muted mt-0.5">{sub}</p>}
    </div>
  );
}

function FeatureCard({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link href={href} className="group block bg-white p-6 hover:bg-cog-surface transition-colors duration-150">
      <h3 className="text-lg sm:text-xl font-medium text-cog-black group-hover:text-black transition-colors font-serif">
        {title}
      </h3>
      <p className="mt-2 text-sm text-cog-muted leading-relaxed">{body}</p>
    </Link>
  );
}
