"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";

const COLORS = ["#0e7490", "#374151", "#6b7280", "#9ca3af", "#d1d5db"];

interface DebtMaturity {
  year: string;
  amount_m: number;
  type: string;
}

interface GearingHistory {
  year: string;
  gearing_pct: number;
  interest_cover_x: number;
}

interface FundingSource {
  source: string;
  amount_m: number;
  pct: number;
}

export default function CapitalCharts({
  debtMaturity,
  gearingHistory,
  fundingSources,
}: {
  debtMaturity: DebtMaturity[];
  gearingHistory: GearingHistory[];
  fundingSources: FundingSource[];
}) {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="border border-cog-rule bg-white p-6">
          <p className="section-label mb-6">Debt Maturity Profile (A$m)</p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={debtMaturity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ fontSize: 12, border: "1px solid #e5e7eb" }}
                  formatter={(value: number) => `$${value.toLocaleString()}m`}
                />
                <Bar dataKey="amount_m" fill="#0e7490" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border border-cog-rule bg-white p-6">
          <p className="section-label mb-6">Gearing & Interest Cover</p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gearingHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} domain={[20, 32]} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} domain={[2, 5]} />
                <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #e5e7eb" }} />
                <Line yAxisId="left" type="monotone" dataKey="gearing_pct" stroke="#0e7490" strokeWidth={2} name="Gearing %" dot={{ r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="interest_cover_x" stroke="#374151" strokeWidth={2} name="ICR (x)" dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="border border-cog-rule bg-white p-6">
        <p className="section-label mb-6">Funding Sources</p>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fundingSources}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  dataKey="amount_m"
                  nameKey="source"
                  label={({ pct }) => `${pct.toFixed(1)}%`}
                  labelLine={false}
                  style={{ fontSize: 11 }}
                >
                  {fundingSources.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ fontSize: 12, border: "1px solid #e5e7eb" }}
                  formatter={(value: number) => `$${value.toLocaleString()}m`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {fundingSources.map((f, i) => (
              <div key={f.source} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                <div className="flex-1">
                  <p className="text-sm text-cog-body">{f.source}</p>
                  <p className="text-xs text-cog-muted">${f.amount_m.toLocaleString()}m · {f.pct}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
