import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Building2, ClipboardCheck, Clock3 } from "lucide-react";
import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard-shell";
import { ReportForm } from "@/components/report-form";
import { dbConnect } from "@/lib/db";
import { todayIsoDate } from "@/lib/utils";
import Business from "@/models/Business";
import DailyReport from "@/models/DailyReport";

export default async function HeadDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?role=head");
  if (session.user.roleContext !== "head") redirect("/dashboard");
  await dbConnect();
  const businesses = await Business.find({ headIds: session.user.id, isArchived: false }).sort({ createdAt: -1 });
  const today = todayIsoDate();
  const reports = businesses.length ? await DailyReport.find({ businessId: { $in: businesses.map((business) => business._id) }, reportDate: today }) : [];
  const reportByBusiness = new Map(reports.map((report) => [report.businessId.toString(), report]));
  return <DashboardShell role="head" active="reports">
    <div className="mx-auto max-w-5xl">
      <div className="mb-8"><p className="text-xs font-semibold uppercase tracking-[.18em] text-primary">Business head workspace</p><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Share today’s picture.</h1><p className="mt-3 max-w-2xl text-muted-foreground">Submit the metrics your owner configured and add context where it helps.</p></div>
      <div className="mb-7 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-4"><div className="flex items-center justify-between text-sm text-muted-foreground"><span>Assigned businesses</span><Building2 size={16} className="text-primary" /></div><p className="mt-3 text-2xl font-semibold">{businesses.length}</p></div>
        <div className="rounded-2xl border border-border bg-card p-4"><div className="flex items-center justify-between text-sm text-muted-foreground"><span>Submitted today</span><ClipboardCheck size={16} className="text-emerald" /></div><p className="mt-3 text-2xl font-semibold">{reports.length}<span className="text-base font-medium text-muted-foreground"> / {businesses.length}</span></p></div>
        <div className="rounded-2xl border border-border bg-card p-4"><div className="flex items-center justify-between text-sm text-muted-foreground"><span>Reporting date</span><Clock3 size={16} className="text-primary" /></div><p className="mt-3 text-base font-semibold">{new Date(today + "T00:00:00").toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</p></div>
      </div>
      {businesses.length ? <div className="space-y-5">{businesses.map((business) => {
        const report = reportByBusiness.get(business._id.toString());
        const initial = report ? {
          reportDate: report.reportDate,
          metricsData: (report.metricsData instanceof Map ? Object.fromEntries(report.metricsData) : report.metricsData) as Record<string, string | number>,
          additionalNotes: report.additionalNotes || "",
        } : null;
        return <ReportForm key={business._id.toString()} businessId={business._id.toString()} businessName={business.name} today={today} initial={initial} kpis={business.kpis.map((kpi) => ({ id: kpi._id.toString(), name: kpi.name, type: kpi.type as "currency" | "number" | "percentage" | "text", isRequired: kpi.isRequired }))} />;
      })}</div> : <div className="rounded-3xl border border-dashed border-border bg-card/50 px-6 py-14 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-muted-foreground"><Building2 size={20} /></div><h2 className="mt-5 text-xl font-semibold">No assigned businesses yet</h2><p className="mx-auto mt-2 max-w-md leading-6 text-muted-foreground">When an owner appoints you to a business, it will appear here. Check your invitation email or ask the owner to send a new invite.</p><Link href="/" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">Back to Grolyx <ArrowRight size={15} /></Link></div>}
    </div>
  </DashboardShell>;
}
