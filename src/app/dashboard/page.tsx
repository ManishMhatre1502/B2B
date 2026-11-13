import Link from "next/link";
import { redirect } from "next/navigation";
import { Activity, ArrowRight, ArrowUpRight, Building2, CircleDollarSign, Plus, Sparkles } from "lucide-react";
import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency, todayIsoDate } from "@/lib/utils";
import { dbConnect } from "@/lib/db";
import Business from "@/models/Business";
import DailyReport from "@/models/DailyReport";

type Card = { id: string; name: string; industry: string; headCount: number; kpiCount: number; report: null | { metricsData: Record<string, unknown>; reportDate: string }; revenue: number };

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.roleContext === "head") redirect("/head/dashboard");
  await dbConnect();
  const businesses = await Business.find({ ownerId: session.user.id, isArchived: false }).sort({ createdAt: -1 });
  const businessIds = businesses.map((business) => business._id);
  const today = todayIsoDate();
  const reports = businessIds.length ? await DailyReport.find({ businessId: { $in: businessIds }, reportDate: today }) : [];
  const reportByBusiness = new Map(reports.map((report) => [report.businessId.toString(), report]));
  const cards: Card[] = businesses.map((business) => {
    const report = reportByBusiness.get(business._id.toString());
    const raw = report?.metricsData instanceof Map ? Object.fromEntries(report.metricsData) : report?.metricsData || {};
    const revenueKpi = business.kpis.find((kpi) => /revenue|sales/i.test(kpi.name) && kpi.type !== "text");
    const revenue = revenueKpi ? Number((raw as Record<string, unknown>)[revenueKpi._id.toString()] || 0) : 0;
    return { id: business._id.toString(), name: business.name, industry: business.industry || "Business", headCount: business.headIds.length, kpiCount: business.kpis.length, report: report ? { reportDate: report.reportDate, metricsData: raw as Record<string, unknown> } : null, revenue: Number.isFinite(revenue) ? revenue : 0 };
  });
  const totalRevenue = cards.reduce((sum, business) => sum + (business.report ? business.revenue : 0), 0);
  const submitted = cards.filter((business) => business.report).length;
  return <DashboardShell active="overview">
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-primary">Owner overview</p><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Your portfolio, at a glance.</h1><p className="mt-3 max-w-2xl text-muted-foreground">Today’s numbers and reporting status across your businesses.</p></div>
        <Link href="/dashboard/businesses/new"><Button><Plus size={16} /> Add a business</Button></Link>
      </div>
      <div className="mb-7 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5"><div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">Revenue today</p><CircleDollarSign size={17} className="text-primary" /></div><p className="mt-3 text-2xl font-semibold tracking-tight">{formatCurrency(totalRevenue)}</p><p className="mt-1 text-xs text-muted-foreground">Across reports received today</p></div>
        <div className="rounded-2xl border border-border bg-card p-5"><div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">Submissions today</p><Activity size={17} className="text-primary" /></div><p className="mt-3 text-2xl font-semibold tracking-tight">{submitted}<span className="text-base font-medium text-muted-foreground"> / {cards.length}</span></p><p className="mt-1 text-xs text-muted-foreground">Business heads reporting today</p></div>
        <div className="rounded-2xl border border-border bg-card p-5"><div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">Active businesses</p><Building2 size={17} className="text-primary" /></div><p className="mt-3 text-2xl font-semibold tracking-tight">{cards.length}</p><p className="mt-1 text-xs text-muted-foreground">In your workspace</p></div>
      </div>
      <div className="mb-4 flex items-center justify-between"><div><h2 className="text-lg font-semibold">Your businesses</h2><p className="mt-1 text-sm text-muted-foreground">Open a business to explore reports and settings.</p></div><span className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">{cards.length} active</span></div>
      {cards.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((business) => {
          const status = business.report ? "submitted" : business.headCount ? "pending" : "none";
          return <Link key={business.id} href={"/dashboard/business/" + business.id} className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-glow">
            <div className="flex items-start justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-background text-primary"><Building2 size={19} /></div><ArrowUpRight size={17} className="text-muted-foreground transition-colors group-hover:text-primary" /></div>
            <p className="mt-5 text-xs uppercase tracking-[.14em] text-muted-foreground">{business.industry}</p><h3 className="mt-1 truncate text-lg font-semibold">{business.name}</h3>
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4"><div><p className="text-[11px] text-muted-foreground">Today</p><p className="mt-1 text-sm font-semibold">{business.report ? (business.revenue ? formatCurrency(business.revenue) : "Report received") : "Awaiting update"}</p></div>
              <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-medium", status === "submitted" ? "border-emerald/20 bg-emerald/10 text-emerald" : status === "pending" ? "border-primary/20 bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground")}><span className={cn("h-1.5 w-1.5 rounded-full", status === "submitted" ? "bg-emerald" : status === "pending" ? "bg-primary" : "bg-muted-foreground")} />{status === "submitted" ? "Submitted today" : status === "pending" ? "Pending report" : "No head appointed"}</span>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground"><span>{business.kpiCount} daily metrics</span><span>{business.headCount ? "Head appointed" : "No active head"}</span></div>
          </Link>;
        })}
        <Link href="/dashboard/businesses/new" className="flex min-h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background/40 p-6 text-center transition-colors hover:border-primary/40 hover:bg-primary/5"><div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card text-primary"><Plus size={19} /></div><p className="mt-4 font-semibold">Add another business</p><p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">Give your next team a shared place for daily reporting.</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Create business <ArrowRight size={15} /></span></Link>
      </div> : <div className="rounded-3xl border border-dashed border-border bg-card/50 px-5 py-16 text-center sm:px-10"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Sparkles size={23} /></div><h2 className="mt-5 text-xl font-semibold">Start with one business</h2><p className="mx-auto mt-2 max-w-lg leading-6 text-muted-foreground">Add the company and the daily metrics you want to follow. You can invite a business head whenever you’re ready.</p><Link href="/dashboard/businesses/new" className="mt-6 inline-flex"><Button><Plus size={16} /> Add your first business</Button></Link></div>}
    </div>
  </DashboardShell>;
}
