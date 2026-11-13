import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { hashInviteToken } from "@/lib/tokens";
import Business from "@/models/Business";
import Invitation from "@/models/Invitation";
import User from "@/models/User";

export async function POST(request: Request) {
  let createdUserId: string | null = null;
  try {
    const body = await request.json();
    const token = String(body.token || "");
    if (!/^[a-f0-9]{64}$/i.test(token)) return NextResponse.json({ error: "This invitation link is invalid." }, { status: 400 });
    await dbConnect();
    const invitation = await Invitation.findOne({ token: hashInviteToken(token), status: "pending", expiresAt: { $gt: new Date() } });
    if (!invitation) return NextResponse.json({ error: "This invitation is invalid, expired, or already used." }, { status: 410 });
    const business = await Business.findOne({ _id: invitation.businessId, isArchived: false });
    if (!business) return NextResponse.json({ error: "This business is no longer available." }, { status: 410 });
    if (business.headIds.length) return NextResponse.json({ error: "This business already has an appointed head. Ask the owner to review the invitation." }, { status: 409 });

    const session = await auth();
    let user = await User.findOne({ email: invitation.invitedEmail }).select("+passwordHash");
    let newPassword = "";
    if (user) {
      if (!session?.user?.id || session.user.id !== user._id.toString() || session.user.email?.toLowerCase() !== invitation.invitedEmail) {
        return NextResponse.json({ error: "Sign in with the invited email to accept this appointment.", requiresLogin: true }, { status: 401 });
      }
    } else {
      const fullName = String(body.fullName || "").trim();
      newPassword = String(body.password || "");
      if (fullName.length < 2 || fullName.length > 100) return NextResponse.json({ error: "Enter your full name." }, { status: 400 });
      if (newPassword.length < 10 || newPassword.length > 128) return NextResponse.json({ error: "Your password must be between 10 and 128 characters." }, { status: 400 });
      user = await User.create({ fullName, email: invitation.invitedEmail, passwordHash: await bcrypt.hash(newPassword, 12), roles: ["head"] });
      createdUserId = user._id.toString();
    }

    await User.updateOne({ _id: user._id }, { $addToSet: { roles: "head" } });
    const claimed = await Invitation.findOneAndUpdate(
      { _id: invitation._id, status: "pending", expiresAt: { $gt: new Date() } },
      { $set: { status: "accepted" } },
      { new: true },
    );
    if (!claimed) {
      if (createdUserId) await User.findByIdAndDelete(createdUserId);
      return NextResponse.json({ error: "This invitation was just used or expired. Ask the owner for a new link." }, { status: 409 });
    }
    const assigned = await Business.updateOne(
      { _id: business._id, isArchived: false, headIds: { $size: 0 } },
      { $addToSet: { headIds: user._id } },
    );
    if (!assigned.modifiedCount) {
      await Invitation.updateOne({ _id: claimed._id }, { $set: { status: "revoked" } });
      if (createdUserId) await User.findByIdAndDelete(createdUserId);
      return NextResponse.json({ error: "This business already has an appointed head. Ask the owner to review the invitation." }, { status: 409 });
    }
    return NextResponse.json({ success: true, createdAccount: Boolean(createdUserId), email: invitation.invitedEmail });
  } catch {
    if (createdUserId) await User.findByIdAndDelete(createdUserId).catch(() => undefined);
    return NextResponse.json({ error: "We could not accept this appointment. Please try again." }, { status: 500 });
  }
}
