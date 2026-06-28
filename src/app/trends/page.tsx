import historical from "@/data/historical.json";
import TrendsCharts from "@/components/TrendsCharts";

export default function TrendsPage() {
  const first = historical.years[0];
  const last = historical.years[historical.years.length - 1];
  const ffoGrowth = ((last.ffo_m / first.ffo_m - 1) * 100).toFixed(1);

  return (
    <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
      <div className="mb-8 sm:mb-12 mt-2">
        <p className="section-label mb-3">Historical Trends</p>
        <h1 className="text-2xl sm:text-4xl font-medium text-cog-black leading-tight">
          5-Year Performance
        </h1>
        <p className="mt-3 text-cog-muted text-base">
          {first.year}–{last.year} · FFO growth of {ffoGrowth}% over the period · Select any metric below to visualise the trend.
        </p>
      </div>

      <TrendsCharts years={historical.years} />
    </div>
  );
}
