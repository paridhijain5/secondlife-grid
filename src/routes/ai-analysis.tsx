import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { matchedRecipients } from "../lib/data";

type Search = { name?: string; category?: string; condition?: string; location?: string; image?: string };

export const Route = createFileRoute("/ai-analysis")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    name: typeof s.name === "string" ? s.name : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
    condition: typeof s.condition === "string" ? s.condition : undefined,
    location: typeof s.location === "string" ? s.location : undefined,
    image: typeof s.image === "string" ? s.image : undefined,
  }),
  head: () => ({ meta: [{ title: "AI Analysis — SecondLife Grid" }, { name: "description", content: "AI-powered item analysis and smart matching." }] }),
  component: AIAnalysisPage,
});

function AIAnalysisPage() {
  const s = useSearch({ from: "/ai-analysis" });
  const name = s.name || "Dell Latitude Laptop";
  const category = s.category || "Electronics";
  const condition = s.condition || "Excellent";
  const image = s.image || "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=80";

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <span className="text-xs font-medium uppercase tracking-wider text-accent">AI Analysis</span>
        <h1 className="mt-2 font-display text-4xl font-semibold text-primary">Item intelligence report</h1>
        <p className="mt-2 text-muted-foreground">Computer vision + condition modeling determines usability, savings and the best recipients.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* image */}
        <div className="rounded-3xl border border-border/60 bg-card overflow-hidden">
          <div className="aspect-square bg-secondary">
            <img src={image} alt={name} className="h-full w-full object-cover" />
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-primary">{name}</h3>
              <span className="rounded-full bg-[color:var(--sage)] text-primary text-xs px-2 py-1">{condition}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{category}</p>
          </div>
        </div>

        {/* details */}
        <div className="lg:col-span-2 rounded-3xl border border-border/60 bg-card p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Detected item</p>
              <h2 className="font-display text-2xl font-semibold text-primary mt-1">{name}</h2>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Confidence</p>
              <p className="font-display text-3xl font-semibold text-accent">97%</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent to-primary" style={{ width: "97%" }} />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            <Stat label="Category" value={category} />
            <Stat label="Condition" value={condition} />
            <Stat label="Repair required" value="No" tint="var(--sage)" />
            <Stat label="Estimated life" value="4 years" />
            <Stat label="Usability score" value="95%" />
            <Stat label="CO₂ savings" value="22 kg" tint="var(--sage)" />
          </div>

          <div className="mt-8 rounded-2xl bg-[color:var(--skyblue)]/60 p-5">
            <p className="text-xs uppercase tracking-wider text-primary/70 font-medium">Suggested repair</p>
            <p className="mt-1 text-primary font-medium">No repair required. Ready for redistribution.</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-[color:var(--lavender)]/60 p-5">
              <p className="text-xs uppercase tracking-wider text-primary/70 font-medium">Waste diverted</p>
              <p className="mt-1 font-display text-xl font-semibold text-primary">2.5 kg</p>
            </div>
            <div className="rounded-2xl bg-[color:var(--sage)]/70 p-5">
              <p className="text-xs uppercase tracking-wider text-primary/70 font-medium">Environmental savings</p>
              <p className="mt-1 font-display text-xl font-semibold text-primary">22 kg CO₂</p>
            </div>
          </div>
        </div>
      </div>

      {/* matches */}
      <section className="mt-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-semibold text-primary">Smart matching</h2>
            <p className="text-sm text-muted-foreground mt-1">Best recipients ranked by need, proximity and program fit.</p>
          </div>
          <Link to="/organizations" className="text-sm font-medium text-primary hover:underline">View all organizations →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {matchedRecipients.map((m) => {
            const isHigh = m.urgency === "High";
            return (
              <div key={m.id} className={`rounded-2xl border p-6 bg-card transition hover:shadow-md ${isHigh ? "border-accent/60 ring-1 ring-accent/30" : "border-border/60"}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-semibold text-primary">{m.name}</h3>
                      <span className={`text-[10px] uppercase tracking-wider rounded-full px-2 py-0.5 font-medium ${isHigh ? "bg-accent text-accent-foreground" : "bg-secondary text-primary"}`}>{m.urgency} urgency</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{m.location}</p>
                    <p className="text-sm text-foreground/80 mt-3">{m.note}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Match</p>
                    <p className="font-display text-2xl font-semibold text-accent">{m.score}%</p>
                  </div>
                </div>
                <button className="mt-5 w-full rounded-full bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:opacity-90">
                  Donate to this organization
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, tint }: { label: string; value: string; tint?: string }) {
  return (
    <div className="rounded-xl border border-border/60 p-4" style={tint ? { background: `color-mix(in oklab, ${tint} 50%, var(--card))` } : undefined}>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
      <p className="mt-1 font-medium text-primary">{value}</p>
    </div>
  );
}
