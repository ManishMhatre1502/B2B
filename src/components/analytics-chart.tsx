"use client";

import { useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";

type Point = { date: string; value: number | null };
export function AnalyticsChart({ points, metricName, currency }: { points: Point[]; metricName: string; currency: boolean }) {
  const [range, setRange] = useState<7 | 30 | "custom">(7);
  const [fromDate, setFromDate] = useState(points[0]?.date || "");
  const [toDate, setToDate] = useState(points[points.length - 1]?.date || "");
  const visible = useMemo(() => range === "custom"
    ? points.filter((point) => (!fromDate || point.date >= fromDate) && (!toDate || point.date <= toDate))
    : points.slice(-range), [points, range, fromDate, toDate]);
  const formatter = (value: number) => currency ? "$" + new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value) : new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
  return (
    <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div><p className="text-sm font-semibold">{metricName} trend</p><p className="mt-1 text-xs text-muted-foreground">Daily submissions for this business</p></div>
        <div className="inline-flex w-fit rounded-xl border border-border bg-background p-1" aria-label="Chart date range">
          {([7, 30] as const).map((days) => <button key={days} type="button" aria-pressed={range === days} onClick={() => setRange(days)} className={cn("min-h-9 rounded-lg px-3 text-xs font-medium transition-colors", range === days ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground")}>{days} days</button>)}
          <button type="button" aria-pressed={range === "custom"} onClick={() => setRange("custom")} className={cn("min-h-9 rounded-lg px-3 text-xs font-medium transition-colors", range === "custom" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground")}>Custom</button>
        </div>
      </div>
      {range === "custom" && <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"><div><label htmlFor="chart-from" className="mb-1.5 block text-xs font-medium text-muted-foreground">From</label><input id="chart-from" aria-label="Chart start date" type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} className="h-10 rounded-xl border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div><div><label htmlFor="chart-to" className="mb-1.5 block text-xs font-medium text-muted-foreground">To</label><input id="chart-to" aria-label="Chart end date" type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} className="h-10 rounded-xl border border-input bg-background px-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div></div>}
      {visible.length ? <div className="mt-6 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={visible} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid stroke="#1F232B" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 11 }} tickFormatter={(value: string) => value.slice(5)} minTickGap={22} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 11 }} tickFormatter={formatter} width={65} />
            <Tooltip contentStyle={{ background: "#111317", border: "1px solid #1F232B", borderRadius: 12, color: "#F5F3EF" }} labelStyle={{ color: "#9CA3AF", marginBottom: 4 }} formatter={(value) => [formatter(Number(value)), metricName]} />
            <Line type="monotone" dataKey="value" stroke="#FFC900" strokeWidth={2.5} dot={{ r: 3, strokeWidth: 0, fill: "#FFC900" }} activeDot={{ r: 5, stroke: "#08090B", strokeWidth: 2 }} connectNulls />
          </LineChart>
        </ResponsiveContainer>
      </div> : <div className="mt-6 flex h-64 items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">No numeric reports yet. Your trend will appear after a submission.</div>}
    </section>
  );
}
