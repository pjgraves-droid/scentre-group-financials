"use client";

import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell,
} from "recharts";

const COLORS = ["#0e7490", "#374151", "#6b7280", "#9ca3af"];

interface Segment {
  name: string;
  fy2024_m: number;
  fy2023_m: number;
  fy2022_m: number;
  fy2021_m: number;
  fy2020_m: number;
  description: string;
}

interface Quarter {
  quarter: string;
  base_rent_m: number;
  percentage_rent_m: number;
  mgmt_fees_m: number;
  dev_income_m: number;
}

interface Props {
  segments: Segment[];
  quarterly: Quarter[];
}

export default function RevenueCharts({ segments, quarterly }: Props) {
  const [view, setView] = useState<"annual" | "quarterly">("annual");

  const annualData = ["FY2020", "FY2021", "FY2022", "FY2023", "FY2024"].map((yr) => {
    const key = yr.toLowerCase().replace("fy", "fy") + "_m" as keyof Segment;
    const row: Record<string, string | number> = { year: yr };
    segments.forEach((s) => {
      row[s.name] = s[key] as number;
    });
    return row;
  });

  const pieData = segments.map((s) => ({
    name: s.name,
    value: s.fy2024_m,
  }));

  const quarterlyData = quarterly.map((q) => ({
    quarter: q.quarter,
    "Base Rent": q.base_rent_m,
    "Percentage Rent": q.percentage_rent_m,
    "Mgmt Fees": q.mgmt_fees_m,
    "Dev Income": q.dev_income_m,
  }));

  return (
    <div className="space-y-8">
      <div className="flex gap-2">
        <button
          onClick={() => setView("annual")}
          className={`px-4 py-1.5 text-sm rounded transition-colors ${
            view === "annual" ? "bg-cog-black text-white" : "bg-cog-surface text-cog-muted hover:text-cog-black"
          }`}
        >
          Annual
        </button>
        <button
          onClick={() => setView("quarterly")}
          className={`px-4 py-1.5 text-sm rounded transition-colors ${
            view === "quarterly" ? "bg-cog-black text-white" : "bg-cog-surface text-cog-muted hover:text-cog-black"
          }`}
        >
          Quarterly FY2024
        </button>
      </div>

      {view === "annual" ? (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="section-label mb-4">Revenue by Segment (A$m)</p>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={annualData}>
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ fontSize: 12, border: "1px solid #e5e7eb" }}
                    formatter={(value: number) => `$${value.toFixed(1)}m`}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  {segments.map((s, i) => (
                    <Bar key={s.name} dataKey={s.name} stackId="a" fill={COLORS[i % COLORS.length]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <p className="section-label mb-4">FY2024 Revenue Mix</p>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                    style={{ fontSize: 11 }}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ fontSize: 12, border: "1px solid #e5e7eb" }}
                    formatter={(value: number) => `$${value.toFixed(1)}m`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="section-label mb-4">Quarterly Revenue FY2024 (A$m)</p>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quarterlyData}>
                <XAxis dataKey="quarter" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ fontSize: 12, border: "1px solid #e5e7eb" }}
                  formatter={(value: number) => `$${value.toFixed(1)}m`}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Base Rent" stackId="a" fill={COLORS[0]} />
                <Bar dataKey="Percentage Rent" stackId="a" fill={COLORS[1]} />
                <Bar dataKey="Mgmt Fees" stackId="a" fill={COLORS[2]} />
                <Bar dataKey="Dev Income" stackId="a" fill={COLORS[3]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
