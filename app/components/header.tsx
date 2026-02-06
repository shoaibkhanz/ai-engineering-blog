"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

const navItems = [
  { label: "~/home", href: "/" },
  { label: "~/writing", href: "/blog" },
  { label: "~/experiments", href: "/experiments" },
  { label: "~/about", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const [showTop, setShowTop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 300);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-accent font-bold text-sm hover:text-accent-dim transition-colors"
        >
          ~/shoaib
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs transition-colors ${
                  isActive
                    ? "text-accent"
                    : "text-text-secondary hover:text-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="relative w-14 h-5 rounded-full border border-border bg-surface hover:border-accent/30 transition-all"
            aria-label="Toggle theme"
          >
            <span className={`absolute top-1/2 -translate-y-1/2 text-[9px] text-text-secondary select-none transition-opacity duration-300 ${theme === "dark" ? "right-2 opacity-100" : "right-2 opacity-0"}`}>
              light
            </span>
            <span className={`absolute top-1/2 -translate-y-1/2 text-[9px] text-text-secondary select-none transition-opacity duration-300 ${theme === "light" ? "left-2 opacity-100" : "left-2 opacity-0"}`}>
              dark
            </span>
            <span
              className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-accent transition-all duration-300 ${
                theme === "dark" ? "left-0.5" : "left-[calc(100%-16px)]"
              }`}
            />
          </button>

          {/* Scroll to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`text-xs border border-border px-2 py-0.5 rounded transition-all ${
              showTop
                ? "opacity-100 text-text-secondary hover:text-accent hover:border-accent/30"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll to top"
          >
            ↑ top
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          {/* Theme toggle (mobile) */}
          <button
            onClick={toggleTheme}
            className="relative w-14 h-5 rounded-full border border-border bg-surface hover:border-accent/30 transition-all"
            aria-label="Toggle theme"
          >
            <span className={`absolute top-1/2 -translate-y-1/2 text-[9px] text-text-secondary select-none transition-opacity duration-300 ${theme === "dark" ? "right-2 opacity-100" : "right-2 opacity-0"}`}>
              light
            </span>
            <span className={`absolute top-1/2 -translate-y-1/2 text-[9px] text-text-secondary select-none transition-opacity duration-300 ${theme === "light" ? "left-2 opacity-100" : "left-2 opacity-0"}`}>
              dark
            </span>
            <span
              className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-accent transition-all duration-300 ${
                theme === "dark" ? "left-0.5" : "left-[calc(100%-16px)]"
              }`}
            />
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-text-secondary hover:text-accent transition-colors p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-md">
          <nav className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-3">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm py-1 transition-colors ${
                    isActive
                      ? "text-accent"
                      : "text-text-secondary hover:text-text"
                  }`}
                >
                  <span className="text-accent/50 mr-2">$</span>
                  cd {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
