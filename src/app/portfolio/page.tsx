import portfolio from "@/data/portfolio.json";
import PortfolioFilter from "@/components/PortfolioFilter";

export default function PortfolioPage() {
  const totalVal = portfolio.centres.reduce((a, c) => a + c.valuation_m, 0);
  const totalGla = portfolio.centres.reduce((a, c) => a + c.gla_sqm, 0);
  const avgOcc = portfolio.centres.reduce((a, c) => a + c.occupancy_pct, 0) / portfolio.centres.length;
  const avgSales = portfolio.centres.reduce((a, c) => a + c.specialty_sales_psm, 0) / portfolio.centres.length;

  return (
    <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10">
      <div className="mb-8 sm:mb-12 mt-2">
        <p className="section-label mb-3">Property Portfolio</p>
        <h1 className="text-2xl sm:text-4xl font-medium text-cog-black leading-tight">
          {portfolio.centres.length} Westfield Living Centres
        </h1>
        <p className="mt-3 text-cog-muted text-base">
          Across Australia and New Zealand · Total valuation A${(totalVal / 1000).toFixed(1)}B ·{" "}
          {(totalGla / 1000000).toFixed(1)}m sqm GLA · {avgOcc.toFixed(1)}% avg occupancy ·{" "}
          ${Math.round(avgSales).toLocaleString()}/sqm avg specialty sales
        </p>
      </div>

      <PortfolioFilter centres={portfolio.centres} stateSummary={portfolio.state_summary} />
    </div>
  );
}
