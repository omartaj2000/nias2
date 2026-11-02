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

    let updated;
    if (article) {
      if (article.likes.includes(user_id)) {
        return NextResponse.json(
          { error: "User already liked article" },
          { status: 409 }
        );
      }
      updated = await Article.findOneAndUpdate(
        { article_id },
        { $inc: { likes_count: 1 }, $push: { likes: user_id } },
        { new: true }
      );
    } else {
      updated = await Article.create({
        article_id,
        likes: [user_id],
        likes_count: 1,
        comments_count: 0,
        replies_count: 0,
      });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Like article error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
