export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Comment } from "@/models/Comment";

export async function POST(request) {
  try {
    const { comment_id, user_id } = await request.json();

    if (!comment_id || !user_id) {
      return NextResponse.json(
        { error: "comment_id and user_id are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const comment = await Comment.findById(comment_id).lean();
    if (!comment)
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });

    if (comment.likes.includes(user_id)) {
      return NextResponse.json(
        { error: "User already liked this comment" },
        { status: 409 }
      );
    }

    const updated = await Comment.findByIdAndUpdate(
      comment_id,
      { $inc: { likes_count: 1 }, $push: { likes: user_id } },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Like comment error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
