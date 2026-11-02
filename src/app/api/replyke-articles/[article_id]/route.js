export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Article } from "@/models/Article";

export async function GET(_request, { params }) {
  try {
    const { article_id } = await params;
    await connectDB();

    const article = await Article.findOne({ article_id }).lean();
    if (!article) return new NextResponse(null, { status: 404 });

    return NextResponse.json(article);
  } catch (err) {
    console.error("Get article error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
