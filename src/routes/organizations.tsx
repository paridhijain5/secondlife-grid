import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { organizations, type Organization } from "../lib/data";

export const Route = createFileRoute("/organizations")({
  head: () => ({ meta: [{ title: "Organizations — SecondLife Grid" }, { name: "description", content: "Verified schools, NGOs and shelters receiving donations across India." }] }),
  component: OrganizationsPage,
});

const TYPE_FILTERS = ["Schools", "NGOs", "Shelters"] as const;
const TAG_FILTERS = ["Books", "Electronics", "Furniture"] as const;

function OrganizationsPage() {
  const [q, setQ] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [highOnly, setHighOnly] = useState(false);

  const filtered = useMemo(() => {
    return organizations.filter((o: Organization) => {
      if (q && !(`${o.name} ${o.location} ${o.description}`.toLowerCase().includes(q.toLowerCase()))) return false;
      if (types.length) {
        const wanted = types.map((t) => t.replace(/s$/, ""));
        if (!wanted.includes(o.type)) return false;
      }
      if (highOnly && o.urgency !== "High") return false;
      if (tags.length && !o.needs.some((n) => tags.includes(n.tag))) return false;
      return true;
    });
  }, [q, types, tags, highOnly]);

  function toggle(list: string[], set: (v: string[]) => void, v: string) {
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
        <div>
          <h1 className="font-display text-4xl font-semibold text-primary">Partner organizations</h1>
          <p className="mt-2 text-muted-foreground max-w-xl">12 verified schools, NGOs and shelters currently receiving donations through the grid.</p>
        </div>
        <div className="relative w-full md:w-80">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search organizations…" className="w-full rounded-full border border-border bg-card pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent" />
          <svg className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {TYPE_FILTERS.map((t) => (
          <Chip key={t} active={types.includes(t)} onClick={() => toggle(types, setTypes, t)}>{t}</Chip>
        ))}
        <Chip active={highOnly} onClick={() => setHighOnly(!highOnly)} tone="accent">High urgency</Chip>
        <div className="w-px bg-border mx-2" />
        {TAG_FILTERS.map((t) => (
          <Chip key={t} active={tags.includes(t)} onClick={() => toggle(tags, setTags, t)}>{t}</Chip>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((o) => <OrgCard key={o.id} o={o} />)}
        {filtered.length === 0 && <p className="text-muted-foreground col-span-full">No organizations match these filters.</p>}
      </div>
    </div>
  );
}

function Chip({ children, active, onClick, tone }: { children: React.ReactNode; active: boolean; onClick: () => void; tone?: "accent" }) {
  return (
    <button onClick={onClick} className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition ${active ? (tone === "accent" ? "bg-accent text-accent-foreground border-accent" : "bg-primary text-primary-foreground border-primary") : "bg-card text-primary border-border hover:bg-secondary"}`}>
      {children}
    </button>
  );
}

function OrgCard({ o }: { o: Organization }) {
  const urgencyStyles = {
    High: "bg-accent text-accent-foreground",
    Medium: "bg-[color:var(--lavender)] text-primary",
    Low: "bg-[color:var(--sage)] text-primary",
  } as const;
  return (
    <article className="rounded-2xl border border-border/60 bg-card overflow-hidden hover:shadow-md transition">
      <div className="relative aspect-[16/9] bg-secondary overflow-hidden">
        <img src={o.banner} alt={o.name} className="h-full w-full object-cover" />
        <span className={`absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-medium ${urgencyStyles[o.urgency]}`}>{o.urgency} urgency</span>
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-background/90 text-primary font-medium">{o.type}</span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-primary">{o.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{o.location} · {o.children} people supported</p>
        <p className="mt-3 text-sm text-foreground/80 line-clamp-2">{o.description}</p>
        <div className="mt-4">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-2">Currently needed</p>
          <div className="flex flex-wrap gap-1.5">
            {o.needs.map((n, i) => (
              <span key={i} className="text-xs rounded-full bg-secondary text-primary px-2.5 py-1">{n.item} <span className="text-muted-foreground">({n.qty})</span></span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
