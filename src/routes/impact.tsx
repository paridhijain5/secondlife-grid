import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend, BarChart, Bar,
} from "recharts";
import { monthlyDonations, categoryDistribution, impactByCategory, recentDonations } from "../lib/data";

export const Route = createFileRoute("/impact")({
  head: () => ({ meta: [{ title: "Impact — SecondLife Grid" }, { name: "description", content: "Measured environmental and social impact of every donation through SecondLife Grid." }] }),
  component: ImpactPage,
});

const PALETTE = ["#101B3A", "#F08A63", "#A8C49A", "#B8AEDB", "#9BB5D3"];

const trends = monthlyDonations.map((m, i) => ({ month: m.month, donations: m.donations, co2: Math.round(m.donations * 17.5) }));

const timeline = [
  { time: "2 hours ago", text: "Dell Latitude Laptop matched with Sunrise School" },
  { time: "5 hours ago", text: "120 NCERT books delivered to Rural Education Trust" },
  { time: "Yesterday", text: "Microwave oven donated to Community Shelter, Delhi" },
  { time: "2 days ago", text: "School bags (12) dispatched to Shiksha Foundation" },
  { time: "3 days ago", text: "Office chair matched with Skill Development Center" },
  { time: "4 days ago", text: "Lenovo ThinkPad delivered to Learning Hub, Hyderabad" },
];

function ImpactPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const cats = ["All", "Electronics", "Books", "Furniture", "Appliances", "Others"];

  const filtered = useMemo(() => recentDonations.filter((d) =>
    (cat === "All" || d.category === cat) &&
    (!q || `${d.name} ${d.location}`.toLowerCase().includes(q.toLowerCase()))
  ), [q, cat]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-semibold text-primary">Impact dashboard</h1>
        <p className="mt-2 text-muted-foreground max-w-xl">A real-time look at the environmental and social impact generated through the grid.</p>
      </div>

      {/* Top metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <BigStat label="Items donated" value="247" />
        <BigStat label="Waste diverted" value="685 kg" />
        <BigStat label="CO₂ saved" value="4.3 T" />
        <BigStat label="People helped" value="1,840" />
        <BigStat label="Partner orgs" value="38" />
        <BigStat label="Cities covered" value="12" />
      </div>

      {/* Charts */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border/60 bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-primary mb-4">Monthly growth & CO₂ saved</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trends} margin={{ left: -10, right: 10 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F08A63" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#F08A63" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#101B3A" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#101B3A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E0DA" />
              <XAxis dataKey="month" stroke="#6b6b76" fontSize={12} />
              <YAxis stroke="#6b6b76" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E5E0DA" }} />
              <Area type="monotone" dataKey="donations" stroke="#F08A63" strokeWidth={2.5} fill="url(#g1)" />
              <Area type="monotone" dataKey="co2" stroke="#101B3A" strokeWidth={2.5} fill="url(#g2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-primary mb-4">Category distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryDistribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={3}>
                {categoryDistribution.map((_, i) => <Cell key={i} fill={PALETTE[i]} />)}
              </Pie>
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border/60 bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-primary mb-4">Environmental impact (kg CO₂)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={impactByCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E0DA" />
              <XAxis dataKey="category" stroke="#6b6b76" fontSize={12} />
              <YAxis stroke="#6b6b76" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E5E0DA" }} />
              <Bar dataKey="co2" radius={[8, 8, 0, 0]} fill="#A8C49A" />
              <Bar dataKey="items" radius={[8, 8, 0, 0]} fill="#101B3A" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-primary mb-4">Recent activity</h3>
          <ol className="relative border-l border-border ml-2 space-y-5">
            {timeline.map((t, i) => (
              <li key={i} className="ml-4">
                <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                <p className="text-sm text-primary">{t.text}</p>
                <p className="text-xs text-muted-foreground">{t.time}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Donations explorer */}
      <section className="mt-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl font-semibold text-primary">Donation explorer</h2>
            <p className="text-sm text-muted-foreground mt-1">Search and filter every donation that has flowed through the grid.</p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search donations…" className="rounded-full border border-border bg-card px-4 py-2 text-sm focus:outline-none focus:border-accent" />
            <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-full border border-border bg-card px-4 py-2 text-sm">
              {cats.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((d) => (
            <div key={d.id} className="rounded-2xl border border-border/60 bg-card overflow-hidden hover:shadow-md transition">
              <div className="aspect-[4/3] bg-secondary"><img src={d.image} alt={d.name} className="h-full w-full object-cover" /></div>
              <div className="p-4">
                <h4 className="font-medium text-primary text-sm">{d.name}</h4>
                <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{d.location}</span>
                  <span className="rounded-full bg-[color:var(--sage)] text-primary px-2 py-0.5">{d.condition}</span>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-muted-foreground col-span-full">No donations match your filters.</p>}
        </div>
      </section>
    </div>
  );
}

function BigStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold text-primary">{value}</p>
    </div>
  );
}
