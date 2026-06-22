import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/donate")({
  head: () => ({ meta: [{ title: "Donate — SecondLife Grid" }, { name: "description", content: "Donate an item in minutes. Our AI matches it with an organization that needs it most." }] }),
  component: DonatePage,
});

function DonatePage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "Dell Latitude Laptop", category: "Electronics", condition: "Excellent", location: "Bengaluru, KA" });
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setPreview(URL.createObjectURL(f));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStage(1);
    await new Promise((r) => setTimeout(r, 1100));
    setStage(2);
    await new Promise((r) => setTimeout(r, 1100));
    navigate({ to: "/ai-analysis", search: { name: form.name, category: form.category, condition: form.condition, location: form.location, image: preview ?? "" } as any });
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <div className="mb-10">
        <span className="text-xs font-medium uppercase tracking-wider text-accent">Step 1 of 2</span>
        <h1 className="mt-2 font-display text-4xl font-semibold text-primary">Donate an item</h1>
        <p className="mt-2 text-muted-foreground">Upload a photo and a few details. Our AI handles the rest.</p>
      </div>

      <form onSubmit={submit} className="rounded-3xl border border-border/60 bg-card p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* upload */}
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Item photo</label>
          <div
            onClick={() => fileRef.current?.click()}
            className="cursor-pointer aspect-[4/3] rounded-2xl border-2 border-dashed border-border bg-secondary/40 hover:bg-secondary transition grid place-items-center overflow-hidden"
          >
            {preview ? (
              <img src={preview} alt="preview" className="h-full w-full object-cover" />
            ) : (
              <div className="text-center px-6">
                <div className="mx-auto h-12 w-12 rounded-full bg-card grid place-items-center border border-border">
                  <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                </div>
                <p className="mt-3 text-sm font-medium text-primary">Click to upload</p>
                <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" />
        </div>

        {/* fields */}
        <div className="space-y-4">
          <Field label="Item name">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" required />
          </Field>
          <Field label="Category">
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input">
              {["Electronics", "Books", "Furniture", "Appliances", "Others"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Condition">
            <select value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })} className="input">
              {["Excellent", "Good", "Fair", "Needs repair"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Location">
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input" required />
          </Field>
          <button type="submit" disabled={loading} className="w-full mt-4 rounded-full bg-primary text-primary-foreground py-3 font-medium hover:opacity-90 disabled:opacity-60">
            {loading ? "Analyzing…" : "Submit for AI analysis"}
          </button>
        </div>
      </form>

      {loading && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm grid place-items-center">
          <div className="rounded-3xl bg-card border border-border/60 p-10 max-w-sm w-full text-center shadow-xl">
            <div className="mx-auto h-14 w-14 rounded-full border-4 border-secondary border-t-accent animate-spin" />
            <p className="mt-6 font-display text-lg font-semibold text-primary">
              {stage < 2 ? "Analyzing image…" : "Finding best matches…"}
            </p>
            <div className="mt-4 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-accent transition-all duration-700" style={{ width: stage === 1 ? "50%" : "95%" }} />
            </div>
          </div>
        </div>
      )}

      <style>{`.input{width:100%;padding:0.65rem 0.85rem;border-radius:0.75rem;border:1px solid var(--border);background:var(--card);font-size:0.875rem;color:var(--foreground);outline:none}.input:focus{border-color:var(--accent);box-shadow:0 0 0 3px color-mix(in oklab, var(--accent) 25%, transparent)}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-primary mb-1.5">{label}</span>
      {children}
    </label>
  );
}
