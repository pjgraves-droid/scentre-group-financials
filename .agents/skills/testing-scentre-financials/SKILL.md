---
name: testing-scentre-financials
description: Test the Scentre Group financials explorer end-to-end. Use when verifying UI rendering, interactive features, or data accuracy after code changes.
---

# Testing the Scentre Group Financials App

## Prerequisites

- Node.js and npm installed
- Dependencies installed (`npm install`)

## Running the App

```bash
cd /home/ubuntu/repos/scentre-group-financials
npm run dev
# App runs at http://localhost:3000
```

## Lint / Typecheck / Build

```bash
npm run lint
npm run typecheck
npm run build
```

All three must pass before creating a PR.

## Pages to Test

The app has 8 pages accessible via the header navigation:

| Route | Page | Key Content |
|---|---|---|
| `/` | Overview | FY2024 highlights, portfolio summary, FY2025 guidance, 7 nav cards |
| `/snapshot` | Financial Snapshot | Earnings, operating metrics, balance sheet KPIs with YoY deltas |
| `/revenue` | Revenue Breakdown | Segment stats + interactive charts (annual/quarterly toggle) |
| `/portfolio` | Property Portfolio | Sortable/filterable table of 42 Westfield centres |
| `/trends` | Historical Trends | 11 selectable metrics with bar/line charts |
| `/capital` | Capital Management | Key metrics + debt maturity, gearing, funding source charts |
| `/pipeline` | Development Pipeline | Project cards with status badges + vertical timeline |
| `/peers` | Peer Comparison | Benchmarking table with best-in-class highlighting |

## Interactive Features to Test

### Revenue Page (`/revenue`)
- **Annual/Quarterly toggle**: Click "Quarterly FY2024" button to switch from annual stacked bar + pie chart to quarterly Q1-Q4 bars. Click "Annual" to switch back.
- Verify: chart title changes, pie chart appears/disappears.

### Portfolio Page (`/portfolio`)
- **State filter**: Click any state summary card (e.g. NSW) to filter the table. Click again to reset.
- **Type filter**: Use the "Type" dropdown to filter by centre type.
- **Column sorting**: Click any sortable column header (Centre, Valuation, GLA, Occupancy, Sales/sqm, Visits) to sort. Click again to reverse.
- Verify: row count updates (e.g. "15 of 42 centres" for NSW), state dropdown syncs with card clicks.

### Trends Page (`/trends`)
- **Metric selector**: Click any of the 11 metric buttons to switch charts.
- Verify: chart type changes (bar for absolute values like FFO, line for percentages like Occupancy), data table below updates with correct values.

## Data Verification

All data lives in `data/*.json`. Key values to spot-check:

- **FFO**: $1,118.2m (FY2024)
- **FFO/Security**: 21.76c
- **Distribution**: 17c
- **Occupancy**: 99.4%
- **Gearing**: 25.3% (target 24-28%)
- **Total Centres**: 42
- **Total AUM**: A$36.3B
- **Total Revenue**: A$1,789.5m
- **Base Rent**: $1,423.6m (79.6% of total)
- **Pipeline Capex**: A$2.7B across 8 projects
- **SCG Market Cap**: $17.6B

## Architecture Notes

- **Framework**: Next.js 14 App Router
- **Static data**: No API routes; all data in `data/*.json` imported at build time
- **Client components**: `RevenueCharts`, `PortfolioFilter`, `TrendsCharts`, `CapitalCharts` (all `"use client"`)
- **Server components**: All page files (`page.tsx`) are server components that import data and pass to client components
- **Design system**: Cognition brand — STK Bureau Serif (headings), NB International Pro (body), `cog-*` color tokens in Tailwind config
- **Charts**: Recharts library

## Common Issues

- If fonts don't render, check that `public/fonts/` contains STK Bureau Serif and NB International Pro woff2 files.
- If charts don't render, check browser console for Recharts errors — may indicate a data shape mismatch.
- The portfolio table sorts strings and numbers differently; verify both work correctly when testing sort.
