export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Email } from "@/models/Email";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectDB();
    const newEmail = new Email({ email });
    await newEmail.save();

    return NextResponse.json({ message: "Subscribed successfully" });
  } catch (err) {
    if (err.code === 11000) {
      return NextResponse.json(
        { message: "Email already subscribed" },
        { status: 409 }
      );
    }
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
