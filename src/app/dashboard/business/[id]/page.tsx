import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { Types } from "mongoose";
import { BusinessWorkspace, type BusinessView, type ReportView } from "@/components/business-workspace";
import { DashboardShell } from "@/components/dashboard-shell";
import { dbConnect } from "@/lib/db";
import Business from "@/models/Business";
import DailyReport from "@/models/DailyReport";
import Invitation from "@/models/Invitation";
import User from "@/models/User";

export default async function BusinessDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.roleContext === "head") redirect("/head/dashboard");
  const { id } = await params;
  if (!Types.ObjectId.isValid(id)) notFound();
  await dbConnect();
  const business = await Business.findOne({ _id: id, ownerId: session.user.id, isArchived: false });
  if (!business) notFound();
  const [documents, pending, head] = await Promise.all([
    DailyReport.find({ businessId: business._id }).sort({ reportDate: -1 }).limit(365),
    Invitation.findOne({ businessId: business._id, status: "pending", expiresAt: { $gt: new Date() } }).sort({ createdAt: -1 }),
    business.headIds[0] ? User.findById(business.headIds[0]).select("email") : null,
  ]);
  const businessView: BusinessView = {
    id: business._id.toString(),
    name: business.name,
    websiteUrl: business.websiteUrl || "",
    industry: business.industry || "",
    description: business.description || "",
    kpis: business.kpis.map((kpi) => ({ id: kpi._id.toString(), name: kpi.name, type: kpi.type as BusinessView["kpis"][number]["type"], isRequired: kpi.isRequired })),
  };
  const reportViews: ReportView[] = documents.map((report) => ({
    id: report._id.toString(),
    reportDate: report.reportDate,
    metricsData: (report.metricsData instanceof Map ? Object.fromEntries(report.metricsData) : report.metricsData) as Record<string, string | number>,
    additionalNotes: report.additionalNotes || "",
  }));
  return <DashboardShell><BusinessWorkspace business={businessView} reports={reportViews} pendingInvite={pending ? { email: pending.invitedEmail, expiresAt: pending.expiresAt.toISOString() } : null} headEmail={head?.email} /></DashboardShell>;
}
