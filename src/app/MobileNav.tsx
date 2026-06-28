"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 -mr-2 text-cog-muted hover:text-cog-black transition-colors"
        aria-label="Toggle menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-cog-rule shadow-sm">
          <nav className="flex flex-col px-4 py-2">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm text-cog-muted hover:text-cog-black transition-colors border-b border-cog-rule last:border-0"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
