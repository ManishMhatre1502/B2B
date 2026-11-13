"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Save, Trash2 } from "lucide-react";
import { KPI_TEMPLATES, type KpiType } from "@/lib/templates";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Kpi = { id?: string; name: string; type: KpiType; isRequired: boolean };
type BusinessInitial = { id?: string; name: string; websiteUrl: string; industry: string; description: string; kpis: Kpi[] };
const typeLabels: Record<KpiType, string> = { currency: "Currency", number: "Number", percentage: "Percentage", text: "Text" };

export function BusinessForm({ initial }: { initial?: BusinessInitial }) {
  const router = useRouter();
  const [kpis, setKpis] = useState<Kpi[]>(initial?.kpis?.length ? initial.kpis : KPI_TEMPLATES.map((item) => ({ ...item })));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  function patchKpi(index: number, field: keyof Kpi, value: string | boolean) {
    setKpis((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item));
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = { name: String(form.get("name") || ""), websiteUrl: String(form.get("websiteUrl") || ""), industry: String(form.get("industry") || ""), description: String(form.get("description") || ""), kpis };
    const response = await fetch(initial?.id ? "/api/businesses/" + initial.id : "/api/businesses", { method: initial?.id ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!response.ok) { setError(result.error || "We could not save this business."); setLoading(false); return; }
    router.push("/dashboard/business/" + (initial?.id || result.businessId));
    router.refresh();
  }
  function addKpi() {
    if (kpis.length >= 20) return;
    setKpis((current) => [...current, { name: "", type: "number", isRequired: false }]);
  }
  return (
    <form onSubmit={submit} className="space-y-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <div><Label htmlFor="name">Business name</Label><Input id="name" name="name" defaultValue={initial?.name} placeholder="e.g. Northstar Studio" maxLength={120} required /></div>
        <div><Label htmlFor="websiteUrl">Website URL <span className="font-normal text-muted-foreground">(optional)</span></Label><Input id="websiteUrl" name="websiteUrl" type="url" defaultValue={initial?.websiteUrl} placeholder="https://example.com" /></div>
        <div><Label htmlFor="industry">Industry <span className="font-normal text-muted-foreground">(optional)</span></Label><Input id="industry" name="industry" defaultValue={initial?.industry} maxLength={100} placeholder="e.g. Retail, services, manufacturing" /></div>
        <div className="sm:col-span-2"><Label htmlFor="description">Summary <span className="font-normal text-muted-foreground">(optional)</span></Label><Textarea id="description" name="description" defaultValue={initial?.description} maxLength={1000} placeholder="A short note about this business and what it does." className="min-h-24" /></div>
      </div>
      <section className="rounded-2xl border border-border bg-background/70 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="font-semibold">Daily metrics</h2><p className="mt-1 text-sm text-muted-foreground">Choose what the business head should report each day.</p></div><Button type="button" variant="secondary" size="sm" onClick={addKpi} disabled={kpis.length >= 20}><Plus size={15} /> Add metric</Button></div>
        <div className="mt-5 space-y-3">
          {kpis.map((kpi, index) => <div key={index} className="grid gap-3 rounded-xl border border-border bg-card p-3 sm:grid-cols-[minmax(0,1fr)_150px_auto_auto] sm:items-end">
            <div><Label htmlFor={"kpi-name-" + index}>Metric name</Label><Input id={"kpi-name-" + index} value={kpi.name} onChange={(event) => patchKpi(index, "name", event.target.value)} maxLength={80} placeholder="e.g. Units produced" required /></div>
            <div><Label htmlFor={"kpi-type-" + index}>Type</Label><select id={"kpi-type-" + index} value={kpi.type} onChange={(event) => patchKpi(index, "type", event.target.value)} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">{Object.entries(typeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
            <label className="flex min-h-11 items-center gap-2 px-2 text-xs text-muted-foreground"><input type="checkbox" checked={kpi.isRequired} onChange={(event) => patchKpi(index, "isRequired", event.target.checked)} className="h-4 w-4 accent-primary" /> Required</label>
            <Button type="button" variant="ghost" size="sm" onClick={() => setKpis((current) => current.filter((_, itemIndex) => itemIndex !== index))} disabled={kpis.length <= 1} aria-label={"Remove " + (kpi.name || "metric")}><Trash2 size={15} className="text-coral" /></Button>
          </div>)}
        </div>
        {kpis.length >= 20 && <p className="mt-3 text-xs text-muted-foreground">You can add up to 20 daily metrics.</p>}
      </section>
      {error && <p role="alert" className="rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral">{error}</p>}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="secondary" onClick={() => initial?.id ? router.push("/dashboard/business/" + initial.id) : router.push("/dashboard")}>Cancel</Button><Button type="submit" disabled={loading}>{loading ? "Saving…" : <><Save size={16} /> {initial?.id ? "Save changes" : "Create business"}</>}</Button></div>
    </form>
  );
}
