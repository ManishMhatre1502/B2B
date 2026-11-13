import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { Resend } from "resend";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import Business from "@/models/Business";
import Invitation from "@/models/Invitation";
import { createInviteToken, hashInviteToken } from "@/lib/tokens";

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id || session.user.roleContext !== "owner") return NextResponse.json({ error: "Please sign in as an owner." }, { status: 401 });
  const { id } = await params;
  if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Business not found." }, { status: 404 });
  try {
    const { email: rawEmail } = await request.json();
    const email = String(rawEmail || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    if (process.env.NODE_ENV === "production" && !process.env.RESEND_API_KEY) return NextResponse.json({ error: "Invitation email is not configured yet. Add RESEND_API_KEY to the production environment." }, { status: 503 });
    await dbConnect();
    const business = await Business.findOne({ _id: id, ownerId: session.user.id, isArchived: false });
    if (!business) return NextResponse.json({ error: "Business not found." }, { status: 404 });
    await Invitation.updateMany({ businessId: business._id, status: "pending", expiresAt: { $lte: new Date() } }, { $set: { status: "expired" } });
    const pending = await Invitation.findOne({ businessId: business._id, status: "pending", expiresAt: { $gt: new Date() } });
    if (business.headIds.length || pending) return NextResponse.json({ error: "This business already has an active head or invitation. Revoke it before sending another." }, { status: 409 });
    const existingUser = await (await import("@/models/User")).default.findOne({ email });
    const token = createInviteToken();
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);
    const invitation = await Invitation.create({ businessId: business._id, invitedBy: session.user.id, invitedEmail: email, token: hashInviteToken(token), status: "pending", expiresAt });
    const origin = process.env.AUTH_URL || new URL(request.url).origin;
    const inviteUrl = origin + "/invite/accept?token=" + encodeURIComponent(token);
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.RESEND_FROM || "Grwolyx <onboarding@resend.dev>";
      const businessName = escapeHtml(business.name);
      const result = await resend.emails.send({
        from,
        to: email,
        subject: "You have been appointed to " + business.name,
        html: "<div style='background:#08090B;padding:36px 16px;font-family:Arial,sans-serif;color:#F5F3EF'><div style='max-width:520px;margin:auto;background:#111317;border:1px solid #1F232B;border-radius:20px;padding:32px'><p style='color:#FFC900;font-weight:700;letter-spacing:2px'>GRWOLYX</p><h1 style='font-size:25px'>You're invited to lead " + businessName + "</h1><p style='color:#9CA3AF;line-height:1.7'>Accept your appointment to submit daily updates for this business. This link expires in 48 hours.</p><a href='" + inviteUrl + "' style='display:inline-block;background:#FFC900;color:#08090B;text-decoration:none;font-weight:700;border-radius:10px;padding:14px 20px;margin-top:12px'>Accept Appointment</a><p style='color:#6B7280;font-size:12px;margin-top:28px'>If you weren't expecting this invitation, you can ignore this email.</p></div></div>",
      });
      if (result.error) {
        invitation.status = "revoked";
        await invitation.save();
        return NextResponse.json({ error: "The invitation email could not be sent. Check your Resend sender setup and try again." }, { status: 502 });
      }
      return NextResponse.json({ success: true, email, expiresAt });
    }
    return NextResponse.json({ success: true, email, expiresAt, existingUser: Boolean(existingUser), inviteUrl });
  } catch {
    return NextResponse.json({ error: "We could not send this invitation. Please try again." }, { status: 500 });
  }
}
