import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { dbConnect } from "@/lib/db";
import { requireRoleContext } from "@/lib/session";
import Business from "@/models/Business";
import Invitation from "@/models/Invitation";
import type { KpiInput, KpiType } from "@/lib/templates";

const allowedTypes: KpiType[] = ["currency", "number", "percentage", "text"];
function cleanKpis(value: unknown): Array<KpiInput & { id?: string }> | null {
  if (!Array.isArray(value) || value.length < 1 || value.length > 20) return null;
  const result: Array<KpiInput & { id?: string }> = [];
  for (const item of value) {
    const name = String(item?.name || "").trim();
    const type = item?.type as KpiType;
    if (!name || name.length > 80 || !allowedTypes.includes(type)) return null;
    if (result.some((kpi) => kpi.name.toLowerCase() === name.toLowerCase())) return null;
    result.push({ id: typeof item.id === "string" ? item.id : undefined, name, type, isRequired: Boolean(item?.isRequired) });
  }
  return result;
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const context = await requireRoleContext("owner");
  if (!context) return NextResponse.json({ error: "Please sign in as an owner." }, { status: 401 });
  const { id } = await params;
  if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Business not found." }, { status: 404 });
  try {
    const body = await request.json();
    await dbConnect();
    const business = await Business.findOne({ _id: id, ownerId: context.user._id });
    if (!business) return NextResponse.json({ error: "Business not found." }, { status: 404 });
    if (body.isArchived === true) {
      business.isArchived = true;
      await Invitation.updateMany({ businessId: business._id, status: "pending" }, { $set: { status: "revoked" } });
    } else {
      const name = String(body.name || "").trim();
      const websiteUrl = String(body.websiteUrl || "").trim();
      const industry = String(body.industry || "").trim();
      const description = String(body.description || "").trim();
      const kpis = cleanKpis(body.kpis);
      if (!name || name.length > 120) return NextResponse.json({ error: "Business name is required." }, { status: 400 });
      if (websiteUrl && !/^https?:\/\/.+\..+/.test(websiteUrl)) return NextResponse.json({ error: "Enter a website address beginning with http:// or https://." }, { status: 400 });
      if (!kpis) return NextResponse.json({ error: "Add 1–20 unique daily metrics." }, { status: 400 });
      business.name = name;
      business.websiteUrl = websiteUrl;
      business.industry = industry;
      business.description = description;
      const existingKpis = new Map(business.kpis.map((kpi) => [kpi._id.toString(), kpi._id]));
      const usedIds = new Set<string>();
      const nextKpis = kpis.map(({ id: kpiId, ...kpi }) => {
        if (kpiId && existingKpis.has(kpiId) && !usedIds.has(kpiId)) {
          usedIds.add(kpiId);
          return { _id: existingKpis.get(kpiId), ...kpi };
        }
        return { _id: new Types.ObjectId(), ...kpi };
      });
      business.kpis = nextKpis as typeof business.kpis;
    }
    await business.save();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "We could not update this business. Please try again." }, { status: 500 });
  }
}
