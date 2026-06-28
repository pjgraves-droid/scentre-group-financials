"use client";

import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

interface YearData {
  year: string;
  ffo_m: number;
  ffo_per_security_cents: number;
  distribution_per_security_cents: number;
  npi_m: number;
  occupancy_pct: number;
  specialty_sales_psm: number;
  total_centre_sales_bn: number;
  gearing_pct: number;
  security_price_close: number;
  total_aum_bn: number;
  customer_visits_m: number;
}

type MetricKey = keyof Omit<YearData, "year">;

const METRICS: { key: MetricKey; label: string; format: (v: number) => string; chartType: "line" | "bar" }[] = [
  { key: "ffo_m", label: "FFO (A$m)", format: (v) => `$${v.toLocaleString()}m`, chartType: "bar" },
  { key: "ffo_per_security_cents", label: "FFO / Security (cents)", format: (v) => `${v.toFixed(2)}c`, chartType: "line" },
  { key: "distribution_per_security_cents", label: "Distribution / Security (cents)", format: (v) => `${v.toFixed(2)}c`, chartType: "bar" },
  { key: "npi_m", label: "Net Property Income (A$m)", format: (v) => `$${v.toLocaleString()}m`, chartType: "bar" },
  { key: "occupancy_pct", label: "Occupancy (%)", format: (v) => `${v.toFixed(1)}%`, chartType: "line" },
  { key: "specialty_sales_psm", label: "Specialty Sales /sqm (A$)", format: (v) => `$${v.toLocaleString()}`, chartType: "bar" },
  { key: "total_centre_sales_bn", label: "Total Centre Sales (A$B)", format: (v) => `$${v.toFixed(1)}B`, chartType: "bar" },
  { key: "gearing_pct", label: "Gearing (%)", format: (v) => `${v.toFixed(1)}%`, chartType: "line" },
  { key: "security_price_close", label: "Security Price ($)", format: (v) => `$${v.toFixed(2)}`, chartType: "line" },
  { key: "total_aum_bn", label: "Total AUM (A$B)", format: (v) => `$${v.toFixed(1)}B`, chartType: "bar" },
  { key: "customer_visits_m", label: "Customer Visits (m)", format: (v) => `${v}m`, chartType: "bar" },
];

export default function TrendsCharts({ years }: { years: YearData[] }) {
  const [selected, setSelected] = useState<MetricKey>("ffo_m");
  const metric = METRICS.find((m) => m.key === selected)!;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {METRICS.map((m) => (
          <button
            key={m.key}
            onClick={() => setSelected(m.key)}
            className={`px-3 py-1.5 text-xs rounded transition-colors ${
              selected === m.key
                ? "bg-cog-black text-white"
                : "bg-cog-surface text-cog-muted hover:text-cog-black"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="border border-cog-rule bg-white p-6">
        <p className="section-label mb-6">{metric.label} — 5 Year Trend</p>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            {metric.chartType === "bar" ? (
              <BarChart data={years}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ fontSize: 12, border: "1px solid #e5e7eb" }}
                  formatter={(value: number) => metric.format(value)}
                />
                <Bar dataKey={selected} fill="#0e7490" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={years}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ fontSize: 12, border: "1px solid #e5e7eb" }}
                  formatter={(value: number) => metric.format(value)}
                />
                <Line
                  type="monotone"
                  dataKey={selected}
                  stroke="#0e7490"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#0e7490" }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-5 gap-px bg-cog-rule border border-cog-rule">
          {years.map((y) => (
            <div key={y.year} className="bg-white p-3 text-center">
              <p className="text-xs text-cog-light">{y.year}</p>
              <p className="text-sm font-medium text-cog-black font-serif mt-1">
                {metric.format(y[selected] as number)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
