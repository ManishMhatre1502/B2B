import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { requireRoleContext } from "@/lib/session";
import Business from "@/models/Business";
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

export async function POST(request: Request) {
  const context = await requireRoleContext("owner");
  if (!context) return NextResponse.json({ error: "Please sign in as an owner." }, { status: 401 });
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const websiteUrl = String(body.websiteUrl || "").trim();
    const industry = String(body.industry || "").trim();
    const description = String(body.description || "").trim();
    const kpis = cleanKpis(body.kpis);
    if (!name || name.length > 120) return NextResponse.json({ error: "Business name is required." }, { status: 400 });
    if (websiteUrl && !/^https?:\/\/.+\..+/.test(websiteUrl)) return NextResponse.json({ error: "Enter a website address beginning with http:// or https://." }, { status: 400 });
    if (!kpis) return NextResponse.json({ error: "Add 1–20 unique daily metrics." }, { status: 400 });
    await dbConnect();
    const business = await Business.create({ ownerId: context.user._id, name, websiteUrl, industry, description, kpis });
    return NextResponse.json({ businessId: business._id.toString() }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "We could not save this business. Please try again." }, { status: 500 });
  }
}
