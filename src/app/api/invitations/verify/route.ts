import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { hashInviteToken } from "@/lib/tokens";
import Business from "@/models/Business";
import Invitation from "@/models/Invitation";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = String(body.token || "");
    if (!/^[a-f0-9]{64}$/i.test(token)) return NextResponse.json({ error: "This invitation link is invalid." }, { status: 400 });
    await dbConnect();
    const invitation = await Invitation.findOne({ token: hashInviteToken(token), status: "pending" });
    if (!invitation) return NextResponse.json({ error: "This invitation link is invalid or has already been used." }, { status: 404 });
    if (invitation.expiresAt <= new Date()) {
      invitation.status = "expired";
      await invitation.save();
      return NextResponse.json({ error: "This invitation has expired. Ask the owner to send a new one." }, { status: 410 });
    }
    const business = await Business.findOne({ _id: invitation.businessId, isArchived: false }).select("name");
    if (!business) return NextResponse.json({ error: "This business is no longer available." }, { status: 410 });
    const existingUser = await User.exists({ email: invitation.invitedEmail });
    return NextResponse.json({ email: invitation.invitedEmail, businessName: business.name, existingUser: Boolean(existingUser), expiresAt: invitation.expiresAt });
  } catch {
    return NextResponse.json({ error: "We could not verify this invitation. Please try again." }, { status: 500 });
  }
}
