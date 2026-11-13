import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    if (fullName.length < 2 || fullName.length > 100) return NextResponse.json({ error: "Enter your full name." }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    if (password.length < 10 || password.length > 128) return NextResponse.json({ error: "Your password must be between 10 and 128 characters." }, { status: 400 });
    await dbConnect();
    if (await User.exists({ email })) return NextResponse.json({ error: "An account already exists for this email. Please sign in." }, { status: 409 });
    await User.create({ fullName, email, passwordHash: await bcrypt.hash(password, 12), roles: ["owner"] });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "We could not create your account. Please try again." }, { status: 500 });
  }
}
