"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown } from "lucide-react";

interface Centre {
  name: string;
  state: string;
  city: string;
  gla_sqm: number;
  valuation_m: number;
  occupancy_pct: number;
  specialty_sales_psm: number;
  annual_visits_m: number;
  anchors: string[];
  type: string;
}

interface StateSummary {
  state: string;
  centres: number;
  gla_sqm_k: number;
  valuation_bn: number;
}

type SortKey = "name" | "valuation_m" | "specialty_sales_psm" | "occupancy_pct" | "gla_sqm" | "annual_visits_m";

export default function PortfolioFilter({
  centres,
  stateSummary,
}: {
  centres: Centre[];
  stateSummary: StateSummary[];
}) {
  const [stateFilter, setStateFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortKey>("valuation_m");
  const [sortAsc, setSortAsc] = useState(false);

  const states = useMemo(() => ["All", ...Array.from(new Set(centres.map((c) => c.state)))], [centres]);
  const types = useMemo(() => ["All", ...Array.from(new Set(centres.map((c) => c.type)))], [centres]);

  const filtered = useMemo(() => {
    let list = centres;
    if (stateFilter !== "All") list = list.filter((c) => c.state === stateFilter);
    if (typeFilter !== "All") list = list.filter((c) => c.type === typeFilter);
    return [...list].sort((a, b) => {
      const va = a[sortBy];
      const vb = b[sortBy];
      if (typeof va === "string" && typeof vb === "string") return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
      return sortAsc ? (va as number) - (vb as number) : (vb as number) - (va as number);
    });
  }, [centres, stateFilter, typeFilter, sortBy, sortAsc]);

  function toggleSort(key: SortKey) {
    if (sortBy === key) setSortAsc(!sortAsc);
    else { setSortBy(key); setSortAsc(false); }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div>
          <label className="text-xs text-cog-light uppercase tracking-[0.15em] block mb-1">State</label>
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="border border-cog-border rounded px-3 py-1.5 text-sm bg-white"
          >
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-cog-light uppercase tracking-[0.15em] block mb-1">Type</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-cog-border rounded px-3 py-1.5 text-sm bg-white"
          >
            {types.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="ml-auto text-sm text-cog-muted">
          {filtered.length} of {centres.length} centres
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px bg-cog-rule md:grid-cols-7 border border-cog-rule mb-6">
        {stateSummary.map((s) => (
          <button
            key={s.state}
            onClick={() => setStateFilter(stateFilter === s.state ? "All" : s.state)}
            className={`bg-white p-4 text-left transition-colors hover:bg-cog-surface ${stateFilter === s.state ? "ring-2 ring-inset ring-accent" : ""}`}
          >
            <p className="text-xs text-cog-light uppercase tracking-[0.15em]">{s.state}</p>
            <p className="mt-1 text-lg font-medium text-cog-black font-serif">{s.centres}</p>
            <p className="text-xs text-cog-muted">${s.valuation_bn.toFixed(1)}B</p>
          </button>
        ))}
      </div>

      <div className="overflow-x-auto border border-cog-rule">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-cog-surface border-b border-cog-rule">
              <SortHeader label="Centre" sortKey="name" current={sortBy} asc={sortAsc} onSort={toggleSort} />
              <th className="px-4 py-3 text-left text-xs text-cog-light uppercase tracking-[0.15em] font-normal">State</th>
              <th className="px-4 py-3 text-left text-xs text-cog-light uppercase tracking-[0.15em] font-normal">Type</th>
              <SortHeader label="Valuation" sortKey="valuation_m" current={sortBy} asc={sortAsc} onSort={toggleSort} />
              <SortHeader label="GLA (sqm)" sortKey="gla_sqm" current={sortBy} asc={sortAsc} onSort={toggleSort} />
              <SortHeader label="Occupancy" sortKey="occupancy_pct" current={sortBy} asc={sortAsc} onSort={toggleSort} />
              <SortHeader label="Sales/sqm" sortKey="specialty_sales_psm" current={sortBy} asc={sortAsc} onSort={toggleSort} />
              <SortHeader label="Visits (m)" sortKey="annual_visits_m" current={sortBy} asc={sortAsc} onSort={toggleSort} />
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.name} className="border-b border-cog-rule hover:bg-cog-surface transition-colors">
                <td className="px-4 py-3 font-medium text-cog-black">{c.name}</td>
                <td className="px-4 py-3 text-cog-muted">{c.state}</td>
                <td className="px-4 py-3 text-cog-muted">{c.type}</td>
                <td className="px-4 py-3 text-cog-body">${c.valuation_m.toLocaleString()}m</td>
                <td className="px-4 py-3 text-cog-body">{c.gla_sqm.toLocaleString()}</td>
                <td className="px-4 py-3 text-cog-body">{c.occupancy_pct}%</td>
                <td className="px-4 py-3 text-cog-body">${c.specialty_sales_psm.toLocaleString()}</td>
                <td className="px-4 py-3 text-cog-body">{c.annual_visits_m}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SortHeader({
  label,
  sortKey,
  current,
  asc,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  current: SortKey;
  asc: boolean;
  onSort: (key: SortKey) => void;
}) {
  return (
    <th className="px-4 py-3 text-left">
      <button
        onClick={() => onSort(sortKey)}
        className="flex items-center gap-1 text-xs text-cog-light uppercase tracking-[0.15em] font-normal hover:text-cog-black transition-colors"
      >
        {label}
        <ArrowUpDown className={`w-3 h-3 ${current === sortKey ? "text-cog-black" : "text-cog-light"}`} />
        {current === sortKey && <span className="text-[10px]">{asc ? "asc" : "desc"}</span>}
      </button>
    </th>
  );
}
