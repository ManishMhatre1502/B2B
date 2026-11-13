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
  const headId = business.headIds[0];
  if (!headId) return NextResponse.json({ error: "No business head is assigned." }, { status: 404 });
  business.headIds = business.headIds.filter((userId) => userId.toString() !== headId.toString()) as typeof business.headIds;
  await business.save();
  await Invitation.updateMany({ businessId: business._id, status: "accepted" }, { $set: { status: "revoked" } });
  return NextResponse.json({ success: true });
}
