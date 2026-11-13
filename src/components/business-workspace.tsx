"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Activity, ArrowLeft, Building2, Check, Clock3, ExternalLink, LoaderCircle, Mail, Pencil, Search, ShieldCheck, Trash2, UserRound } from "lucide-react";
import { AnalyticsChart } from "@/components/analytics-chart";
import { BusinessForm } from "@/components/business-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import type { KpiType } from "@/lib/templates";

export type BusinessView = {
  id: string;
  name: string;
  websiteUrl: string;
  industry: string;
  description: string;
  kpis: Array<{ id: string; name: string; type: KpiType; isRequired: boolean }>;
};
export type ReportView = {
  id: string;
  reportDate: string;
  metricsData: Record<string, string | number>;
  additionalNotes: string;
};
type InviteView = { email: string; expiresAt: string } | null;

function displayValue(value: string | number | undefined, type: KpiType) {
  if (value === undefined || value === "") return "—";
  if (type === "currency" && typeof value === "number") return formatCurrency(value);
  if (type === "percentage" && typeof value === "number") return value + "%";
  return String(value);
}

export function BusinessWorkspace({ business, reports, pendingInvite, headEmail }: { business: BusinessView; reports: ReportView[]; pendingInvite: InviteView; headEmail?: string }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [metricId, setMetricId] = useState(business.kpis.find((kpi) => kpi.type !== "text")?.id || "");
  const [query, setQuery] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const numericKpis = business.kpis.filter((kpi) => kpi.type !== "text");
  const selectedKpi = numericKpis.find((kpi) => kpi.id === metricId) || numericKpis[0];
  const points = selectedKpi ? [...reports].reverse().map((report) => {
    const value = report.metricsData[selectedKpi.id];
    return { date: report.reportDate, value: typeof value === "number" ? value : null };
  }) : [];
  const filteredReports = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return reports;
    return reports.filter((report) => report.reportDate.includes(value) || report.additionalNotes.toLowerCase().includes(value) || Object.values(report.metricsData).some((item) => String(item).toLowerCase().includes(value)));
  }, [query, reports]);

  async function sendInvite(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError(""); setMessage(""); setInviteLink("");
    const response = await fetch("/api/businesses/" + business.id + "/invite", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: inviteEmail }) });
    const result = await response.json();
    if (!response.ok) setError(result.error || "Could not send the invitation.");
    else {
      setMessage(result.inviteUrl ? "Invitation created. Share this one-time link with the business head." : "Invitation email sent. It expires in 48 hours.");
      if (result.inviteUrl) setInviteLink(result.inviteUrl);
      setInviteEmail("");
      router.refresh();
    }
    setBusy(false);
  }
  async function revokeHead() {
    setBusy(true); setError(""); setMessage("");
    const endpoint = headEmail ? "/head/revoke" : "/invite/revoke";
    const response = await fetch("/api/businesses/" + business.id + endpoint, { method: "POST" });
    const result = await response.json();
    if (!response.ok) setError(result.error || "Could not revoke access.");
    else { setMessage(headEmail ? "Business head access was removed." : "Invitation revoked."); setInviteLink(""); router.refresh(); }
    setBusy(false);
  }
  async function archiveBusiness() {
    if (!window.confirm("Archive " + business.name + "? It will no longer accept reports.")) return;
    setBusy(true); setError("");
    const response = await fetch("/api/businesses/" + business.id, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isArchived: true }) });
    const result = await response.json();
    if (!response.ok) { setError(result.error || "Could not archive the business."); setBusy(false); return; }
    router.push("/dashboard");
    router.refresh();
  }

  if (editing) return <div className="mx-auto max-w-4xl"><button type="button" onClick={() => setEditing(false)} className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={15} /> Back to business</button><div className="rounded-2xl border border-border bg-card p-5 sm:p-7"><h2 className="mb-6 text-xl font-semibold">Edit business details</h2><BusinessForm initial={{ ...business, kpis: business.kpis.map(({ id, name, type, isRequired }) => ({ id, name, type, isRequired })) }} /></div></div>;

  return (
    <div className="mx-auto max-w-6xl">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={15} /> Portfolio overview</Link>
      <div className="mb-8 mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Building2 size={20} /></div><div><p className="text-xs uppercase tracking-[.16em] text-muted-foreground">{business.industry || "Business"}</p><h1 className="mt-1 text-3xl font-semibold tracking-tight">{business.name}</h1></div></div>{business.description && <p className="mt-4 max-w-2xl leading-6 text-muted-foreground">{business.description}</p>}{business.websiteUrl && <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline">{business.websiteUrl}<ExternalLink size={13} /></a>}</div>
        <Button type="button" variant="secondary" onClick={() => setEditing(true)}><Pencil size={15} /> Edit business</Button>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-4"><p className="text-xs text-muted-foreground">Daily metrics</p><p className="mt-2 text-2xl font-semibold">{business.kpis.length}</p><p className="mt-1 text-xs text-muted-foreground">Configured for this business</p></div>
        <div className="rounded-2xl border border-border bg-card p-4"><p className="text-xs text-muted-foreground">Reports on file</p><p className="mt-2 text-2xl font-semibold">{reports.length}</p><p className="mt-1 text-xs text-muted-foreground">Daily submissions received</p></div>
        <div className="rounded-2xl border border-border bg-card p-4"><p className="text-xs text-muted-foreground">Business head</p><p className="mt-2 truncate text-base font-semibold">{headEmail || pendingInvite?.email || "Not appointed"}</p><p className="mt-1 text-xs text-muted-foreground">{headEmail ? "Has access to this business" : pendingInvite ? "Invitation awaiting acceptance" : "Invite a team lead to report"}</p></div>
      </div>

      <div className="mb-6 grid gap-3 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          {numericKpis.length > 1 && <div className="mb-3 flex flex-wrap items-center gap-3"><Label htmlFor="metric-select" className="mb-0 text-xs text-muted-foreground">Chart metric</Label><select id="metric-select" value={selectedKpi?.id || ""} onChange={(event) => setMetricId(event.target.value)} className="h-10 rounded-xl border border-input bg-card px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">{numericKpis.map((kpi) => <option key={kpi.id} value={kpi.id}>{kpi.name}</option>)}</select></div>}
          {selectedKpi ? <AnalyticsChart points={points} metricName={selectedKpi.name} currency={selectedKpi.type === "currency"} /> : <div className="flex h-64 items-center justify-center rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">This business tracks text-only metrics. Numeric trends will appear after a number or currency metric is added.</div>}
        </div>
        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2"><Activity size={17} className="text-primary" /><h2 className="font-semibold">Team access</h2></div>
          {headEmail || pendingInvite ? <div className="mt-4 rounded-xl border border-border bg-background p-3"><p className="text-xs text-muted-foreground">{headEmail ? "Appointed business head" : "Pending invitation"}</p><p className="mt-1 break-all text-sm font-medium">{headEmail || pendingInvite?.email}</p>{pendingInvite && <p className="mt-2 inline-flex items-center gap-1 text-xs text-primary"><Clock3 size={13} /> Expires {new Date(pendingInvite.expiresAt).toLocaleDateString()}</p>}</div> : <p className="mt-4 text-sm leading-6 text-muted-foreground">Appoint one business head to submit daily updates.</p>}
          {!headEmail && !pendingInvite && <form onSubmit={sendInvite} className="mt-4 space-y-3"><div><Label htmlFor="inviteEmail">Business head email</Label><Input id="inviteEmail" type="email" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} autoComplete="email" placeholder="lead@company.com" required /></div><Button type="submit" className="w-full" disabled={busy}>{busy ? <><LoaderCircle size={15} className="animate-spin" /> Sending…</> : <><Mail size={15} /> Send invite</>}</Button></form>}
          {(headEmail || pendingInvite) && <Button type="button" variant="secondary" className="mt-4 w-full" onClick={revokeHead} disabled={busy}>{busy ? "Updating…" : <><ShieldCheck size={15} /> {headEmail ? "Remove head access" : "Revoke invitation"}</>}</Button>}
          {inviteLink && <div className="mt-4 rounded-xl border border-primary/25 bg-primary/5 p-3"><p className="text-xs font-semibold text-primary">Local invite link</p><a href={inviteLink} className="mt-2 block break-all text-xs text-foreground underline decoration-primary/50 underline-offset-2">{inviteLink}</a></div>}
          {message && <p role="status" className="mt-3 flex items-start gap-2 text-xs leading-5 text-emerald"><Check size={14} className="mt-0.5 shrink-0" />{message}</p>}
          {error && <p role="alert" className="mt-3 text-xs leading-5 text-coral">{error}</p>}
        </section>
      </div>

      <section className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"><div><h2 className="font-semibold">Daily submissions</h2><p className="mt-1 text-xs text-muted-foreground">Search dates, values, and operational notes.</p></div><div className="relative w-full sm:max-w-xs"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><Input aria-label="Search reports" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search submissions…" className="pl-9" /></div></div>
        {filteredReports.length ? <div className="soft-scrollbar overflow-x-auto"><table className="w-full min-w-[760px] border-collapse text-left text-sm"><thead><tr className="bg-background/70 text-xs text-muted-foreground"><th className="px-5 py-3 font-medium">Date</th>{business.kpis.map((kpi) => <th key={kpi.id} className="px-4 py-3 font-medium">{kpi.name}</th>)}<th className="px-4 py-3 font-medium">Additional notes</th></tr></thead><tbody>{filteredReports.map((report) => <tr key={report.id} className="border-t border-border align-top hover:bg-background/40"><td className="whitespace-nowrap px-5 py-4 font-medium">{new Date(report.reportDate + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</td>{business.kpis.map((kpi) => <td key={kpi.id} className="max-w-48 px-4 py-4 text-muted-foreground">{displayValue(report.metricsData[kpi.id], kpi.type)}</td>)}<td className="min-w-56 max-w-sm px-4 py-4 text-muted-foreground">{report.additionalNotes || <span className="text-muted-foreground/60">No notes</span>}</td></tr>)}</tbody></table></div> : <div className="px-5 py-14 text-center"><div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-background text-muted-foreground"><UserRound size={18} /></div><p className="mt-4 font-medium">{query ? "No submissions match that search." : "No daily submissions yet."}</p><p className="mt-2 text-sm text-muted-foreground">{query ? "Try another date, metric value, or note." : "Reports from the appointed business head will appear here."}</p></div>}
      </section>
      <div className="mt-6 flex justify-end"><Button type="button" variant="danger" onClick={archiveBusiness} disabled={busy}><Trash2 size={15} /> Archive business</Button></div>
    </div>
  );
}
