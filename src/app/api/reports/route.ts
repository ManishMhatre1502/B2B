import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { dbConnect } from "@/lib/db";
import { requireRoleContext } from "@/lib/session";
import { isIsoDate, todayIsoDate } from "@/lib/utils";
import Business from "@/models/Business";
import DailyReport from "@/models/DailyReport";

export async function GET(request: Request) {
  const context = await requireRoleContext("head");
  if (!context) return NextResponse.json({ error: "Please sign in as a business head." }, { status: 401 });
  const url = new URL(request.url);
  const businessId = url.searchParams.get("businessId") || "";
  const reportDate = url.searchParams.get("reportDate") || "";
  if (!Types.ObjectId.isValid(businessId) || !isIsoDate(reportDate)) return NextResponse.json({ error: "Choose a valid business and date." }, { status: 400 });
  await dbConnect();
  const business = await Business.findOne({ _id: businessId, headIds: context.user._id, isArchived: false }).select("_id");
  if (!business) return NextResponse.json({ error: "This business is not assigned to your account." }, { status: 403 });
  const report = await DailyReport.findOne({ businessId: business._id, reportDate });
  if (!report) return NextResponse.json({ report: null });
  const metricsData = report.metricsData instanceof Map ? Object.fromEntries(report.metricsData) : report.metricsData;
  return NextResponse.json({ report: { reportDate: report.reportDate, metricsData, additionalNotes: report.additionalNotes } });
}

export async function POST(request: Request) {
  const context = await requireRoleContext("head");
  if (!context) return NextResponse.json({ error: "Please sign in as a business head." }, { status: 401 });
  try {
    const body = await request.json();
    const businessId = String(body.businessId || "");
    const reportDate = String(body.reportDate || "");
    const metricsData = body.metricsData && typeof body.metricsData === "object" && !Array.isArray(body.metricsData) ? body.metricsData as Record<string, unknown> : {};
    const additionalNotes = String(body.additionalNotes || "").trim();
    if (!Types.ObjectId.isValid(businessId)) return NextResponse.json({ error: "Choose a business assigned to you." }, { status: 400 });
    if (!isIsoDate(reportDate) || reportDate > todayIsoDate()) return NextResponse.json({ error: "Choose today or a previous reporting date." }, { status: 400 });
    if (additionalNotes.length > 3000) return NextResponse.json({ error: "Notes must be 3,000 characters or fewer." }, { status: 400 });
    await dbConnect();
    const business = await Business.findOne({ _id: businessId, headIds: context.user._id, isArchived: false });
    if (!business) return NextResponse.json({ error: "This business is not assigned to your account." }, { status: 403 });
    const validIds = new Set(business.kpis.map((kpi) => kpi._id.toString()));
    if (Object.keys(metricsData).some((key) => !validIds.has(key))) return NextResponse.json({ error: "This report includes an unrecognized metric. Refresh and try again." }, { status: 400 });
    const cleanData: Record<string, string | number> = {};
    for (const kpi of business.kpis) {
      const key = kpi._id.toString();
      const raw = metricsData[key];
      if (raw === undefined || raw === null || raw === "") {
        if (kpi.isRequired) return NextResponse.json({ error: kpi.name + " is required." }, { status: 400 });
        continue;
      }
      if (kpi.type === "text") {
        const text = String(raw).trim();
        if (text.length > 500) return NextResponse.json({ error: kpi.name + " must be 500 characters or fewer." }, { status: 400 });
        if (text) cleanData[key] = text;
        else if (kpi.isRequired) return NextResponse.json({ error: kpi.name + " is required." }, { status: 400 });
      } else {
        const number = Number(raw);
        if (!Number.isFinite(number) || number < 0) return NextResponse.json({ error: kpi.name + " must be a valid non-negative number." }, { status: 400 });
        if (kpi.type === "percentage" && number > 100) return NextResponse.json({ error: kpi.name + " must be between 0 and 100." }, { status: 400 });
        cleanData[key] = number;
      }
    }
    await DailyReport.findOneAndUpdate(
      { businessId: business._id, reportDate },
      { $set: { submittedBy: context.user._id, metricsData: cleanData, additionalNotes }, $setOnInsert: { businessId: business._id, reportDate } },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "We could not save this report. Please refresh and try again." }, { status: 500 });
  }
}
