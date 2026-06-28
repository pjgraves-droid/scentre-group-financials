import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scentre Group Financials — Cognition AU",
  description: "Interactive explorer for Scentre Group (ASX: SCG) financial performance, property portfolio, and capital structure.",
};

const NAV = [
  { href: "/", label: "Overview" },
  { href: "/snapshot", label: "Snapshot" },
  { href: "/revenue", label: "Revenue" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/trends", label: "Trends" },
  { href: "/capital", label: "Capital" },
  { href: "/pipeline", label: "Pipeline" },
  { href: "/peers", label: "Peers" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-cog-rule sticky top-0 z-50 bg-white relative">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 sm:gap-4 hover:opacity-80 transition-opacity">
              <Image
                src="/COGNITION_LOCKUP_HORIZONTAL_WHITE.svg"
                alt="Cognition"
                width={140}
                height={36}
                className="w-[100px] sm:w-[140px] h-auto"
                priority
              />
              <div className="h-6 w-px bg-cog-border hidden sm:block" />
              <span className="section-label text-[11px] hidden sm:inline">Scentre Group</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="text-sm text-cog-muted hover:text-cog-black transition-colors"
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            <MobileNav />
          </div>
        </header>

        <div className="flex-1 flex max-w-[1600px] mx-auto w-full">
          <main className="flex-1 min-w-0 px-4 sm:px-8 py-6 sm:py-10">
            {children}
          </main>
        </div>

        <footer className="border-t border-cog-rule bg-white py-4 sm:py-6 text-center text-xs text-cog-muted">
          Built by Cognition AU account team · Internal use only
        </footer>
      </body>
    </html>
  );
}
