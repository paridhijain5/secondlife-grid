import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/donate", label: "Donate" },
  { to: "/ai-analysis", label: "AI Analysis" },
  { to: "/organizations", label: "Organizations" },
  { to: "/impact", label: "Impact" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary grid place-items-center">
            <div className="h-3 w-3 rounded-full bg-accent" />
          </div>
          <span className="font-display text-lg font-semibold text-primary">SecondLife Grid</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary bg-secondary" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-primary" }}
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/donate"
          className="inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 text-sm font-medium shadow-sm transition"
        >
          Donate Item
        </Link>
      </div>
    </header>
  );
}
