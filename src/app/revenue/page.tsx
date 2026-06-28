import revenue from "@/data/revenue.json";
import RevenueCharts from "@/components/RevenueCharts";

export default function RevenuePage() {
  const total = revenue.segments.reduce((acc, s) => acc + s.fy2024_m, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
      <div className="mb-8 sm:mb-12 mt-2">
        <p className="section-label mb-3">Revenue Breakdown</p>
        <h1 className="text-2xl sm:text-4xl font-medium text-cog-black leading-tight">
          FY2024 Revenue: A${total.toFixed(1)}m
        </h1>
        <p className="mt-3 text-cog-muted text-base">
          Revenue composition by segment with annual and quarterly views.
        </p>
      </div>

      <section>
        <p className="section-label mb-4">Revenue Segments</p>
        <div className="grid grid-cols-2 gap-px bg-cog-rule md:grid-cols-4 border border-cog-rule">
          {revenue.segments.map((s) => {
            const pct = ((s.fy2024_m / total) * 100).toFixed(1);
            const yoy = (((s.fy2024_m - s.fy2023_m) / s.fy2023_m) * 100).toFixed(1);
            return (
              <div key={s.name} className="bg-white p-5">
                <p className="text-xs text-cog-light uppercase tracking-[0.15em]">{s.name}</p>
                <p className="mt-1 text-xl sm:text-2xl font-medium text-cog-black font-serif">
                  ${s.fy2024_m.toLocaleString()}m
                </p>
                <p className="text-xs text-cog-muted mt-0.5">{pct}% of total · +{yoy}% YoY</p>
              </div>
            );
          })}
        </div>
      </section>

      <RevenueCharts segments={revenue.segments} quarterly={revenue.quarterly_fy2024} />

      <section>
        <p className="section-label mb-4">Segment Descriptions</p>
        <div className="grid gap-px bg-cog-rule md:grid-cols-2 border border-cog-rule">
          {revenue.segments.map((s) => (
            <div key={s.name} className="bg-white p-6">
              <h3 className="text-lg font-medium text-cog-black font-serif">{s.name}</h3>
              <p className="mt-2 text-sm text-cog-muted leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
