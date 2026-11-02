"use client";

import { useState, useEffect } from "react";

const API = "/api/replyke-comments";

const timeAgo = (date) => {
  const s = Math.floor((Date.now() - new Date(date)) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
};

/* ── Single comment row ── */
function Comment({ comment, currentUser, articleId, onReplyPosted, depth = 0 }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [liked, setLiked] = useState(
    currentUser ? comment.likes?.includes(currentUser._id) : false
  );
  const [likes, setLikes] = useState(comment.likes_count ?? 0);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);

  const loadReplies = async () => {
    const res = await fetch(`${API}?article_id=${articleId}&parent=${comment._id}&sort_by=oldest&limit=50`);
    if (res.ok) setReplies(await res.json());
  };

  const toggleReplies = async () => {
    if (!showReplies && replies.length === 0) await loadReplies();
    setShowReplies((p) => !p);
  };

  const handleLike = async () => {
    if (!currentUser) return;
    const endpoint = liked ? `${API}/unlike` : `${API}/like`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment_id: comment._id, user_id: currentUser._id }),
    });
    if (res.ok) { setLiked((p) => !p); setLikes((p) => p + (liked ? -1 : 1)); }
  };

  const submitReply = async () => {
    if (!replyText.trim() || !currentUser) return;
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        article_id: articleId,
        comment_body: replyText.trim(),
        parent: comment._id,
        author: currentUser,
      }),
    });
    if (res.ok) {
      const newReply = await res.json();
      setReplies((p) => [...p, newReply]);
      setShowReplies(true);
      setReplyText("");
      setShowReply(false);
      onReplyPosted?.();
    }
  };

  return (
    <div className={`flex flex-col gap-1 ${depth > 0 ? "ml-8 border-l-2 border-gray-100 dark:border-gray-700 pl-4" : ""}`}>
      <div className="flex items-start gap-3 py-3">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary-600">
          {(comment.author?.name ?? "?").slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
              {comment.author?.name
                ? `${comment.author.name.slice(0, 6)}…${comment.author.name.slice(-4)}`
                : "Anonymous"}
            </span>
            <span className="text-xs text-gray-400">{timeAgo(comment.created_at)}</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 break-words">{comment.body}</p>
          <div className="flex items-center gap-4 mt-2">
            {/* Like */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-xs transition-colors ${liked ? "text-primary-500" : "text-gray-400 hover:text-primary-500"}`}
            >
              <svg className="w-3.5 h-3.5" fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {likes > 0 && likes}
            </button>
            {/* Reply */}
            {currentUser && depth < 2 && (
              <button
                onClick={() => setShowReply((p) => !p)}
                className="text-xs text-gray-400 hover:text-primary-500 transition-colors"
              >
                Reply
              </button>
            )}
            {/* Show replies */}
            {comment.replies_count > 0 && (
              <button onClick={toggleReplies} className="text-xs text-gray-400 hover:text-primary-500 transition-colors">
                {showReplies ? "Hide" : `${comment.replies_count} repl${comment.replies_count === 1 ? "y" : "ies"}`}
              </button>
            )}
          </div>

          {/* Reply input */}
          {showReply && (
            <div className="flex gap-2 mt-2">
              <input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitReply()}
                placeholder="Write a reply…"
                className="flex-1 text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent outline-none focus:border-primary-400"
              />
              <button onClick={submitReply}
                className="text-xs px-3 py-1.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                Post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Nested replies */}
      {showReplies && replies.map((r) => (
        <Comment key={r._id} comment={r} currentUser={currentUser} articleId={articleId}
          onReplyPosted={loadReplies} depth={depth + 1} />
      ))}
    </div>
  );
}

/* ── Main CommentSection ── */
export default function CommentSection({ articleId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const LIMIT = 10;

  const fetchComments = async (p = 1, sortBy = sort) => {
    setLoading(true);
    const res = await fetch(
      `${API}?article_id=${articleId}&sort_by=${sortBy}&page=${p}&limit=${LIMIT}`
    );
    if (res.ok) {
      const data = await res.json();
      setComments((prev) => (p === 1 ? data : [...prev, ...data]));
      setHasMore(data.length === LIMIT);
    }
    setLoading(false);
  };

  useEffect(() => { fetchComments(1); }, [articleId, sort]);

  const submit = async () => {
    if (!text.trim() || !currentUser) return;
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        article_id: articleId,
        comment_body: text.trim(),
        author: currentUser,
      }),
    });
    if (res.ok) {
      setText("");
      setPage(1);
      fetchComments(1);
    }
  };

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchComments(next);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Sort controls */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-500">Sort:</span>
        {["newest", "oldest", "popular"].map((s) => (
          <button key={s} onClick={() => { setSort(s); setPage(1); }}
            className={`text-xs px-3 py-1 rounded-full transition-colors ${sort === s ? "bg-primary-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50"}`}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* New comment input */}
      {currentUser ? (
        <div className="flex gap-3 items-start">
          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary-600">
            {currentUser.name?.slice(0, 2).toUpperCase() ?? "?"}
          </div>
          <div className="flex-1 flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Write a comment…"
              className="flex-1 text-sm px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent outline-none focus:border-primary-400 transition-colors"
            />
            <button onClick={submit}
              className="px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50"
              disabled={!text.trim()}>
              Post
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-400">Connect your wallet to comment.</p>
      )}

      {/* Comments list */}
      {loading && comments.length === 0 ? (
        <div className="flex justify-center py-6">
          <div className="w-6 h-6 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
        </div>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-400 py-4 text-center">No comments yet. Be the first!</p>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {comments.map((c) => (
            <Comment key={c._id} comment={c} currentUser={currentUser}
              articleId={articleId} onReplyPosted={() => fetchComments(1)} />
          ))}
        </div>
      )}

      {/* Load more */}
      {hasMore && (
        <button onClick={loadMore}
          className="text-sm text-primary-500 hover:text-primary-600 text-center py-2 transition-colors">
          Load more comments
        </button>
      )}
    </div>
  );
}
