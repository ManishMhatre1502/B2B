"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Check, LoaderCircle, Save } from "lucide-react";
import type { KpiType } from "@/lib/templates";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Kpi = { id: string; name: string; type: KpiType; isRequired: boolean };
type ExistingReport = { reportDate: string; metricsData: Record<string, string | number>; additionalNotes: string } | null;

function localToday() {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 10);
}

export function ReportForm({ businessId, businessName, kpis, today, initial }: { businessId: string; businessName: string; kpis: Kpi[]; today: string; initial: ExistingReport }) {
  const router = useRouter();
  const [date, setDate] = useState(today);
  const [metrics, setMetrics] = useState<Record<string, string | number>>({});
  const [notes, setNotes] = useState("");
  const [savedForDate, setSavedForDate] = useState("");
  const [loadingRecord, setLoadingRecord] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;
    fetch("/api/reports?businessId=" + encodeURIComponent(businessId) + "&reportDate=" + encodeURIComponent(date))
      .then((response) => response.json())
      .then((result) => {
        if (!live) return;
        const report: ExistingReport = date === today && initial ? initial : result.report || null;
        setMetrics(report?.metricsData || {});
        setNotes(report?.additionalNotes || "");
        setSavedForDate(report?.reportDate || "");
        setMessage("");
        setError("");
      })
      .catch(() => { if (live) setError("Could not load the saved report for this date."); })
      .finally(() => { if (live) setLoadingRecord(false); });
    return () => { live = false; };
  }, [businessId, date, initial, today]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    const response = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessId, reportDate: date, metricsData: metrics, additionalNotes: notes }),
    });
    const result = await response.json();
    if (!response.ok) { setError(result.error || "We could not save the report."); setSaving(false); return; }
    setSavedForDate(date);
    setMessage("Your daily report has been saved.");
    router.refresh();
    setSaving(false);
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-4 sm:p-6">
      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div><div className="flex items-center gap-2"><CalendarDays size={17} className="text-primary" /><h2 className="font-semibold">Daily report</h2></div><p className="mt-1 text-sm text-muted-foreground">{businessName}</p></div>
        {savedForDate && savedForDate === date && <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald/20 bg-emerald/10 px-2.5 py-1.5 text-xs font-medium text-emerald"><Check size={13} /> Submitted for this date</span>}
      </div>
      <div className="mt-5 max-w-xs"><Label htmlFor={"date-" + businessId}>Report date</Label><Input id={"date-" + businessId} type="date" value={date} max={today || localToday()} onChange={(event) => { setDate(event.target.value); setLoadingRecord(true); }} required /><p className="mt-2 text-xs text-muted-foreground">Choose today or a missed date to add a backfill.</p></div>
      {loadingRecord && <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground"><LoaderCircle size={14} className="animate-spin text-primary" /> Checking for an existing report…</p>}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {kpis.map((kpi) => <div key={kpi.id}>
          <Label htmlFor={kpi.id}>{kpi.name}{kpi.isRequired && <span className="ml-1 text-primary">*</span>}</Label>
          {kpi.type === "text"
            ? <Input id={kpi.id} type="text" maxLength={500} required={kpi.isRequired} value={String(metrics[kpi.id] ?? "")} onChange={(event) => setMetrics((current) => ({ ...current, [kpi.id]: event.target.value }))} placeholder="Add a short update" />
            : <Input id={kpi.id} type="number" inputMode="decimal" min="0" max={kpi.type === "percentage" ? "100" : undefined} step={kpi.type === "currency" ? "0.01" : "any"} required={kpi.isRequired} value={metrics[kpi.id] ?? ""} onChange={(event) => setMetrics((current) => ({ ...current, [kpi.id]: event.target.value }))} placeholder={kpi.type === "currency" ? "0.00" : kpi.type === "percentage" ? "0–100" : "0"} />}
          <p className="mt-1.5 text-xs text-muted-foreground">{kpi.type === "currency" ? "Enter an amount." : kpi.type === "percentage" ? "Enter a value from 0 to 100." : kpi.type === "number" ? "Enter a non-negative number." : "Keep this update to 500 characters."}</p>
        </div>)}
      </div>
      <div className="mt-5"><Label htmlFor={"notes-" + businessId}>Additional notes / issues</Label><Textarea id={"notes-" + businessId} value={notes} onChange={(event) => setNotes(event.target.value)} maxLength={3000} placeholder="Share blockers, operational updates, or a highlight from the day." className="min-h-28" /><p className="mt-1.5 text-right text-xs text-muted-foreground">{notes.length} / 3,000</p></div>
      {error && <p role="alert" className="mt-4 rounded-xl border border-coral/30 bg-coral/10 px-3 py-2.5 text-sm text-coral">{error}</p>}
      {message && <p role="status" className="mt-4 flex items-center gap-2 text-sm text-emerald"><Check size={15} />{message}</p>}
      <div className="mt-5 flex justify-end"><Button type="submit" disabled={saving || loadingRecord}>{saving ? <><LoaderCircle size={15} className="animate-spin" /> Saving…</> : <><Save size={15} /> {savedForDate === date ? "Update report" : "Submit report"}</>}</Button></div>
    </form>
  );
}
