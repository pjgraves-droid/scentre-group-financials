import pipeline from "@/data/pipeline.json";

const STATUS_COLORS: Record<string, string> = {
  "Completed": "bg-emerald-100 text-emerald-800",
  "Under Construction": "bg-amber-100 text-amber-800",
  "Planning": "bg-blue-100 text-blue-800",
};

export default function PipelinePage() {
  const s = pipeline.summary;

  return (
    <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
      <div className="mb-8 sm:mb-12 mt-2">
        <p className="section-label mb-3">Development Pipeline</p>
        <h1 className="text-2xl sm:text-4xl font-medium text-cog-black leading-tight">
          A${(s.total_pipeline_capex_m / 1000).toFixed(1)}B Development Program
        </h1>
        <p className="mt-3 text-cog-muted text-base">
          {s.projects_under_construction} under construction · {s.projects_planning} in planning ·
          {s.projects_completed_fy2024} completed FY2024 · A${s.estimated_incremental_noi_m}m estimated incremental NOI
        </p>
      </div>

      <section>
        <p className="section-label mb-4">Pipeline Summary</p>
        <div className="grid grid-cols-2 gap-px bg-cog-rule md:grid-cols-4 border border-cog-rule">
          <Stat label="Total Capex" value={`A$${(s.total_pipeline_capex_m / 1000).toFixed(1)}B`} />
          <Stat label="Under Construction" value={String(s.projects_under_construction)} />
          <Stat label="Planning" value={String(s.projects_planning)} />
          <Stat label="Est. Incremental NOI" value={`A$${s.estimated_incremental_noi_m}m`} />
        </div>
      </section>

      <section>
        <p className="section-label mb-4">Projects</p>
        <div className="space-y-4">
          {pipeline.projects.map((p) => (
            <div key={p.name} className="border border-cog-rule bg-white p-6 hover:bg-cog-surface transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-medium text-cog-black font-serif">{p.name}</h3>
                    <span className={`inline-block px-2 py-0.5 text-xs rounded ${STATUS_COLORS[p.status] || "bg-cog-surface text-cog-muted"}`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-cog-muted">{p.centre} · {p.state}</p>
                  <p className="mt-2 text-sm text-cog-body leading-relaxed">{p.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-right flex-shrink-0">
                  <div>
                    <p className="text-xs text-cog-light uppercase tracking-[0.15em]">Capex</p>
                    <p className="text-lg font-medium text-cog-black font-serif">A${p.capex_m}m</p>
                  </div>
                  <div>
                    <p className="text-xs text-cog-light uppercase tracking-[0.15em]">Completion</p>
                    <p className="text-lg font-medium text-cog-black font-serif">{p.expected_completion}</p>
                  </div>
                  <div>
                    <p className="text-xs text-cog-light uppercase tracking-[0.15em]">GLA Added</p>
                    <p className="text-sm font-medium text-cog-black">{p.gla_addition_sqm.toLocaleString()} sqm</p>
                  </div>
                  <div>
                    <p className="text-xs text-cog-light uppercase tracking-[0.15em]">Target Yield</p>
                    <p className="text-sm font-medium text-cog-black">{p.target_yield_pct}%</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="section-label mb-4">Pipeline Timeline</p>
        <div className="border border-cog-rule bg-white p-6">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-cog-rule" />
            {pipeline.projects
              .sort((a, b) => a.expected_completion.localeCompare(b.expected_completion))
              .map((p, i) => (
                <div key={p.name} className="relative pl-10 pb-8 last:pb-0">
                  <div className={`absolute left-2.5 w-3 h-3 rounded-full border-2 border-white ${
                    p.status === "Completed" ? "bg-emerald-500" :
                    p.status === "Under Construction" ? "bg-amber-500" : "bg-blue-500"
                  }`} style={{ top: i === 0 ? 0 : 4 }} />
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-sm font-medium text-cog-black">{p.expected_completion}</span>
                    <span className="text-sm text-cog-body">{p.name}</span>
                    <span className="text-xs text-cog-muted">A${p.capex_m}m</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white p-5">
      <p className="text-xs text-cog-light uppercase tracking-[0.15em]">{label}</p>
      <p className="mt-1 text-xl sm:text-2xl font-medium text-cog-black font-serif">{value}</p>
    </div>
  );
}
