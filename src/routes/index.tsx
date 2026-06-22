import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend, BarChart, Bar,
} from "recharts";
import { monthlyDonations, categoryDistribution, impactByCategory, recentDonations } from "../lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — SecondLife Grid" },
      { name: "description", content: "Live impact dashboard for SecondLife Grid donations." },
    ],
  }),
  component: Dashboard,
});

const PALETTE = ["#101B3A", "#F08A63", "#A8C49A", "#B8AEDB", "#9BB5D3"];

function Metric({ label, value, sub, tint }: { label: string; value: string; sub?: string; tint: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border/60 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="h-2 w-2 rounded-full" style={{ background: tint }} />
      </div>
      <div className="mt-3 font-display text-3xl font-semibold text-primary">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Hero */}
      <section className="rounded-3xl border border-border/60 bg-card p-8 md:p-14 relative overflow-hidden">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[color:var(--sage)] opacity-50" />
        <div className="absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-[color:var(--lavender)] opacity-60" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--skyblue)] px-3 py-1 text-xs font-medium text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> AI-powered redistribution
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-6xl font-semibold text-primary leading-[1.05]">
            Don't throw it away.<br />Give it a second life.
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl">
            SecondLife Grid uses AI to recognize items and connect them with nearby schools, NGOs and shelters that need them most.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/donate" className="rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:opacity-90">Donate an item</Link>
            <Link to="/organizations" className="rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-primary hover:bg-secondary">Explore organizations</Link>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Metric label="Items Donated" value="247" sub="+24% vs last month" tint="#F08A63" />
        <Metric label="Waste Diverted" value="685 kg" sub="From landfill" tint="#A8C49A" />
        <Metric label="CO₂ Saved" value="4.3 Tons" sub="Verified savings" tint="#9BB5D3" />
        <Metric label="People Helped" value="1,840" sub="Across 12 cities" tint="#B8AEDB" />
      </section>

      {/* Charts */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border/60 bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-primary">Monthly donations</h3>
            <span className="text-xs text-muted-foreground">2026 YTD</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyDonations} margin={{ left: -10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E0DA" />
              <XAxis dataKey="month" stroke="#6b6b76" fontSize={12} />
              <YAxis stroke="#6b6b76" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E5E0DA" }} />
              <Line type="monotone" dataKey="donations" stroke="#F08A63" strokeWidth={3} dot={{ r: 4, fill: "#101B3A" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-primary mb-4">Category distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={categoryDistribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                {categoryDistribution.map((_, i) => <Cell key={i} fill={PALETTE[i]} />)}
              </Pie>
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-border/60 bg-card p-6">
        <h3 className="font-display text-lg font-semibold text-primary mb-4">Impact by category (kg CO₂ saved)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={impactByCategory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E0DA" />
            <XAxis dataKey="category" stroke="#6b6b76" fontSize={12} />
            <YAxis stroke="#6b6b76" fontSize={12} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E5E0DA" }} />
            <Bar dataKey="co2" radius={[8, 8, 0, 0]} fill="#101B3A" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Recent donations */}
      <section className="mt-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-semibold text-primary">Recent donations</h2>
            <p className="text-sm text-muted-foreground mt-1">Latest items matched and dispatched through the grid.</p>
          </div>
          <Link to="/impact" className="text-sm font-medium text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recentDonations.map((d) => (
            <div key={d.id} className="group rounded-2xl border border-border/60 bg-card overflow-hidden hover:shadow-md transition">
              <div className="aspect-[4/3] bg-secondary overflow-hidden">
                <img src={d.image} alt={d.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-primary text-sm">{d.name}</h4>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{d.category}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{d.location}</span>
                  <span className="rounded-full bg-[color:var(--sage)] text-primary px-2 py-0.5">{d.condition}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
