export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Comment } from "@/models/Comment";
import { Article } from "@/models/Article";

// Ethereum address regex (42 hex chars, 0x-prefixed)
const ETH_ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/;
const MAX_BODY_LENGTH = 2000;

function validateAuthor(author) {
  if (!author || typeof author !== "object") return "author is required";
  if (!author._id || !ETH_ADDRESS_RE.test(author._id))
    return "author._id must be a valid Ethereum address";
  if (author.name && typeof author.name !== "string") return "author.name must be a string";
  // Normalise — only allow the wallet address as the display name
  return null;
}

function sanitiseBody(body) {
  if (typeof body !== "string") return null;
  const trimmed = body.trim();
  if (!trimmed) return null;
  if (trimmed.length > MAX_BODY_LENGTH) return null;
  return trimmed;
}

// GET /api/replyke-comments?article_id=&sort_by=&parent=&page=&limit=
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const article_id = searchParams.get("article_id");
    const sort_by = searchParams.get("sort_by");
    const parent = searchParams.get("parent");
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Math.min(Number(searchParams.get("limit") ?? 5), 50); // cap at 50

    if (!article_id) {
      return NextResponse.json({ error: "article_id is required" }, { status: 400 });
    }

    if (isNaN(limit) || isNaN(page) || page < 1 || limit < 1) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    await connectDB();

    let sort = {};
    if (sort_by === "popular") sort = { likes_count: -1, created_at: -1 };
    else if (sort_by === "newest") sort = { created_at: -1 };
    else if (sort_by === "oldest") sort = { created_at: 1 };

    const query = { article_id, parent: parent ?? null };
    const comments = await Comment.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json(comments);
  } catch (err) {
    console.error("Get comments error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/replyke-comments
export async function POST(request) {
  try {
    const { article_id, comment_body, parent, author } = await request.json();

    // Validate article_id
    if (!article_id || typeof article_id !== "string" || !article_id.trim()) {
      return NextResponse.json({ error: "article_id is required" }, { status: 400 });
    }

    // Validate body
    const body = sanitiseBody(comment_body);
    if (!body) {
      return NextResponse.json(
        { error: `comment_body is required and must be under ${MAX_BODY_LENGTH} characters` },
        { status: 400 }
      );
    }

    // Validate author — _id must be the poster's own wallet address
    const authorError = validateAuthor(author);
    if (authorError) {
      return NextResponse.json({ error: authorError }, { status: 400 });
    }

    // Normalise author: only keep _id and a short display name derived from the address
    const safeAuthor = {
      _id: author._id.toLowerCase(),
      name: author._id, // use wallet address as canonical name; UI truncates it
      img: "",
    };

    await connectDB();

    const comment = await Comment.create({
      article_id: article_id.trim(),
      body,
      parent: parent ?? null,
      likes: [],
      likes_count: 0,
      replies_count: 0,
      created_at: new Date(),
      author: safeAuthor,
    });

    // Update parent reply count
    if (parent) {
      await Comment.findByIdAndUpdate(parent, { $inc: { replies_count: 1 } });
    }

    // Update or create article counters
    const article = await Article.findOne({ article_id }).lean();
    if (article) {
      const field = parent ? "replies_count" : "comments_count";
      await Article.findOneAndUpdate({ article_id }, { $inc: { [field]: 1 } });
    } else {
      await Article.create({
        article_id: article_id.trim(),
        likes: [],
        likes_count: 0,
        comments_count: parent ? 0 : 1,
        replies_count: parent ? 1 : 0,
      });
    }

    return NextResponse.json(comment);
  } catch (err) {
    console.error("Post comment error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH /api/replyke-comments  { comment_id, update, author_id }
export async function PATCH(request) {
  try {
    const { comment_id, update, author_id } = await request.json();

    if (!comment_id) {
      return NextResponse.json({ error: "comment_id is required" }, { status: 400 });
    }

    if (!author_id || !ETH_ADDRESS_RE.test(author_id)) {
      return NextResponse.json(
        { error: "author_id must be a valid Ethereum address" },
        { status: 400 }
      );
    }

    const body = sanitiseBody(update);
    if (!body) {
      return NextResponse.json(
        { error: `update is required and must be under ${MAX_BODY_LENGTH} characters` },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await Comment.findById(comment_id).lean();
    if (!existing) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Only the original author can edit their comment
    if (existing.author._id.toLowerCase() !== author_id.toLowerCase()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await Comment.findByIdAndUpdate(
      comment_id,
      { body },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Update comment error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/replyke-comments  { comment_id, author_id }
export async function DELETE(request) {
  try {
    const { comment_id, author_id } = await request.json();

    if (!comment_id) {
      return NextResponse.json({ error: "comment_id is required" }, { status: 400 });
    }

    if (!author_id || !ETH_ADDRESS_RE.test(author_id)) {
      return NextResponse.json(
        { error: "author_id must be a valid Ethereum address" },
        { status: 400 }
      );
    }

    await connectDB();

    const target = await Comment.findById(comment_id).lean();
    if (!target) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Only the original author can delete their comment
    if (target.author._id.toLowerCase() !== author_id.toLowerCase()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    let firstLevelDeleted = 0;
    let repliesDeleted = 0;

    async function deleteTree(id) {
      const doc = await Comment.findByIdAndDelete(id).lean();
      if (!doc) throw new Error("Comment deletion failed");
      doc.parent ? repliesDeleted++ : firstLevelDeleted++;
      const children = await Comment.find({ parent: doc._id }).lean();
      for (const child of children) await deleteTree(child._id);
    }

    await deleteTree(comment_id);

    if (target.parent) {
      await Comment.findByIdAndUpdate(target.parent, {
        $inc: { replies_count: -1 },
      });
    }

    const article = await Article.findOneAndUpdate(
      { article_id: target.article_id },
      {
        $inc: {
          comments_count: -firstLevelDeleted,
          replies_count: -repliesDeleted,
        },
      },
      { new: true }
    );

    return NextResponse.json(article);
  } catch (err) {
    console.error("Delete comment error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
