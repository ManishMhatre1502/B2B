import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import Business from "@/models/Business";
import Invitation from "@/models/Invitation";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id || session.user.roleContext !== "owner") return NextResponse.json({ error: "Please sign in as an owner." }, { status: 401 });
  const { id } = await params;
  if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Business not found." }, { status: 404 });
  await dbConnect();
  const business = await Business.findOne({ _id: id, ownerId: session.user.id });
  if (!business) return NextResponse.json({ error: "Business not found." }, { status: 404 });
  const invitation = await Invitation.findOneAndUpdate(
    { businessId: business._id, status: "pending" },
    { $set: { status: "revoked" } },
    { new: true, sort: { createdAt: -1 } },
  );
  if (!invitation) return NextResponse.json({ error: "There is no pending invitation to revoke." }, { status: 404 });
  return NextResponse.json({ success: true });
}
