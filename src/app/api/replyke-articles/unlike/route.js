export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Article } from "@/models/Article";

export async function POST(request) {
  try {
    const { article_id, user_id } = await request.json();

    if (!article_id || !user_id) {
      return NextResponse.json(
        { error: "Missing article_id or user_id" },
        { status: 400 }
      );
    }

    await connectDB();
    const article = await Article.findOne({ article_id }).lean();

    if (!article || !article.likes.includes(user_id)) {
      return NextResponse.json(
        { error: "User has not liked this article" },
        { status: 409 }
      );
    }

    const updated = await Article.findOneAndUpdate(
      { article_id },
      { $inc: { likes_count: -1 }, $pull: { likes: user_id } },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Unlike article error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
