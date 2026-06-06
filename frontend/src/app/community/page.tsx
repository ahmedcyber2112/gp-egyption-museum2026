"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MessageCircle,
  ImageIcon,
  Send,
  Share2,
  MoreHorizontal,
  MapPin,
  BadgeCheck,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { getCurrentUser, isLoggedIn } from "../../lib/authStorage";
import { consumePostLoginAction, setPostLoginAction, setPostLoginRedirect } from "../../lib/authGate";
import LoginRequiredModal from "../../components/Auth/LoginRequiredModal";
import {
  addCommunityComment,
  createCommunityPost,
  getCommunityPosts,
  setCommunityReaction,
  uploadCommunityImage,
} from "../../lib/communityApi";

const REACTIONS_OPTIONS: Array<{
  id: ReactionId;
  icon: string;
  label: string;
  color: string;
}> = [
  { id: "like", icon: "👍", label: "Like", color: "text-blue-400" },
  { id: "love", icon: "❤️", label: "Love", color: "text-red-500" },
  { id: "wow", icon: "🤯", label: "Wow", color: "text-purple-400" },
  { id: "crown", icon: "👑", label: "Royal", color: "text-[#D4AF37]" },
];

type ReactionId = "like" | "love" | "wow" | "crown";

type CommunityComment = {
  id: string;
  user: string;
  avatar: string;
  text: string;
  createdAt: string;
};

type CommunityPost = {
  id: string;
  user: string;
  role: string;
  isVerified: boolean;
  avatar: string;
  location: string;
  content: string;
  image: string | null;
  reactionCount: number;
  userReaction: ReactionId | null;
  commentsCount: number;
  commentsList: CommunityComment[];
  createdAt: string;
};

const POLL_MS = 20000;

function formatRelativeTime(isoTime: string) {
  const timestamp = new Date(isoTime).getTime();
  if (Number.isNaN(timestamp)) return "Just now";
  const diffSec = Math.max(1, Math.floor((Date.now() - timestamp) / 1000));
  if (diffSec < 60) return "Just now";
  const min = Math.floor(diffSec / 60);
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hour${hr > 1 ? "s" : ""} ago`;
  const day = Math.floor(hr / 24);
  return `${day} day${day > 1 ? "s" : ""} ago`;
}

function mapPostFromApi(row: Record<string, unknown>): CommunityPost {
  const comments = Array.isArray(row.commentsList) ? row.commentsList : [];
  const userReaction = row.userReaction ? String(row.userReaction) : null;
  return {
    id: String(row.id ?? ""),
    user: String(row.user ?? "Member"),
    role: String(row.role ?? "Explorer"),
    isVerified: Boolean(row.isVerified),
    avatar: String(row.avatar ?? "https://ui-avatars.com/api/?name=Guest&background=D4AF37&color=000"),
    location: String(row.location ?? "Museum Lobby"),
    content: String(row.content ?? ""),
    image: row.image ? String(row.image) : null,
    reactionCount: Number(row.reactionCount ?? 0),
    userReaction:
      userReaction === "like" ||
      userReaction === "love" ||
      userReaction === "wow" ||
      userReaction === "crown"
        ? userReaction
        : null,
    commentsCount: Number(row.commentsCount ?? comments.length),
    commentsList: comments.map((c: Record<string, unknown>) => ({
      id: String(c.id ?? ""),
      user: String(c.user ?? "Member"),
      avatar: String(c.avatar ?? "https://ui-avatars.com/api/?name=Guest&background=D4AF37&color=000"),
      text: String(c.text ?? ""),
      createdAt: String(c.createdAt ?? new Date().toISOString()),
    })),
    createdAt: String(row.createdAt ?? new Date().toISOString()),
  };
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [exploringNow, setExploringNow] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newPostText, setNewPostText] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const loadPosts = useCallback(async (opts?: { silent?: boolean }) => {
    const silent = opts?.silent === true;
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError(null);

    try {
      const res = await getCommunityPosts({ take: 50 });
      const data = (res?.data ?? {}) as Record<string, unknown>;
      const rows = Array.isArray(data.posts) ? data.posts : [];
      setPosts(rows.map((row) => mapPostFromApi(row as Record<string, unknown>)));
      setExploringNow(Number(data.exploringNow ?? 0));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to load community feed";
      setError(message);
      if (!silent) setPosts([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    const timer = window.setInterval(() => loadPosts({ silent: true }), POLL_MS);
    return () => window.clearInterval(timer);
  }, [loadPosts]);

  useEffect(() => {
    const syncUser = () => setCurrentUser(getCurrentUser());
    syncUser();
    window.addEventListener("storage", syncUser);
    window.addEventListener("auth:logged-in", syncUser);
    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("auth:logged-in", syncUser);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (selectedImagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(selectedImagePreview);
      }
    };
  }, [selectedImagePreview]);

  const requireCommunityAuth = (action: Record<string, unknown>) => {
    if (isLoggedIn()) return true;
    setPostLoginRedirect("/community");
    setPostLoginAction({ type: "community-action", ...action });
    setShowLoginModal(true);
    return false;
  };

  const submitPostText = async (text: string, imageFile?: File | null) => {
    const trimmed = text.trim();
    if (!trimmed && !imageFile) return;

    setPosting(true);
    setError(null);
    try {
      let imageUrl: string | null = null;
      if (imageFile) {
        imageUrl = await uploadCommunityImage(imageFile);
      }

      await createCommunityPost({
        content: trimmed || "Shared an image from my visit.",
        imageUrl,
      });

      setNewPostText("");
      setSelectedImageFile(null);
      if (selectedImagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(selectedImagePreview);
      }
      setSelectedImagePreview(null);
      await loadPosts({ silent: true });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to publish post";
      setError(message);
    } finally {
      setPosting(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) return;
    const action = consumePostLoginAction();
    if (!action || action.type !== "community-action") return;

    if (action.mode === "post" && typeof action.text === "string") {
      submitPostText(action.text, selectedImageFile);
      return;
    }

    if (
      action.mode === "comment" &&
      typeof action.postId === "string" &&
      typeof action.text === "string"
    ) {
      submitComment(action.postId, action.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReact = async (postId: string, reactionId: ReactionId) => {
    if (!requireCommunityAuth({ mode: "react", postId, reactionType: reactionId })) return;

    try {
      const res = await setCommunityReaction(postId, reactionId);
      const data = (res?.data ?? {}) as Record<string, unknown>;
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id !== postId) return post;
          const userReaction = data.userReaction ? String(data.userReaction) : null;
          return {
            ...post,
            reactionCount: Number(data.reactionCount ?? post.reactionCount),
            userReaction:
              userReaction === "like" ||
              userReaction === "love" ||
              userReaction === "wow" ||
              userReaction === "crown"
                ? userReaction
                : null,
          };
        }),
      );
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to update reaction";
      setError(message);
    }
  };

  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = newPostText.trim();
    if (!text && !selectedImageFile) return;
    if (!requireCommunityAuth({ mode: "post", text })) return;
    await submitPostText(text, selectedImageFile);
  };

  const toggleCommentsSection = (postId: string) => {
    setOpenComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const submitComment = async (postId: string, commentText: string) => {
    if (!commentText?.trim()) return;

    try {
      const res = await addCommunityComment(postId, commentText.trim());
      const data = (res?.data ?? {}) as Record<string, unknown>;
      const newComment: CommunityComment = {
        id: String(data.id ?? Date.now()),
        user: String(data.user ?? currentUser?.fullName ?? "You"),
        avatar: String(
          data.avatar ??
            "https://ui-avatars.com/api/?name=You&background=D4AF37&color=000",
        ),
        text: String(data.text ?? commentText),
        createdAt: String(data.createdAt ?? new Date().toISOString()),
      };

      setPosts((prev) =>
        prev.map((post) => {
          if (post.id !== postId) return post;
          return {
            ...post,
            commentsCount: post.commentsCount + 1,
            commentsList: [...post.commentsList, newComment],
          };
        }),
      );
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
      setOpenComments((prev) => ({ ...prev, [postId]: true }));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to add comment";
      setError(message);
    }
  };

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>, postId: string) => {
    e.preventDefault();
    const commentText = commentInputs[postId];
    if (!commentText?.trim()) return;
    if (!requireCommunityAuth({ mode: "comment", postId, text: commentText })) return;
    submitComment(postId, commentText);
  };

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!requireCommunityAuth({ mode: "image" })) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5_000_000) {
      alert("Please choose an image under 5 MB.");
      return;
    }

    if (selectedImagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(selectedImagePreview);
    }
    setSelectedImageFile(file);
    setSelectedImagePreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleShare = async (post: CommunityPost) => {
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/community?post=${post.id}`
        : `https://egyptianmuseum.me/community?post=${post.id}`;
    const shareText = `${post.user}: ${post.content.slice(0, 120)}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: "Grand Egyptian Museum Lounge", text: shareText, url: shareUrl });
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      alert("Post link copied to clipboard.");
    } catch {
      // user cancelled share
    }
  };

  const userAvatar =
    currentUser?.fullName
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.fullName)}&background=D4AF37&color=000&size=128`
      : "https://ui-avatars.com/api/?name=You&background=D4AF37&color=000";

  return (
    <>
      <div className="min-h-screen bg-[#050505] text-white pt-24 pb-32 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#D4AF37]/5 blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="mb-8 border-b border-white/10 pb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors mb-4 font-bold uppercase tracking-widest text-xs">
              <ArrowLeft size={16} /> Back to Museum
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-6xl font-serif font-black">
                  The <span className="text-[#D4AF37] italic">Lounge</span>
                </h1>
                <p className="text-gray-500 mt-2">
                  Join the conversation with history enthusiasts worldwide.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => loadPosts({ silent: true })}
                  disabled={refreshing}
                  className="p-2 rounded-full border border-white/10 text-gray-400 hover:text-[#D4AF37] disabled:opacity-60">
                  <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
                </button>
                <div className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 shrink-0">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-300">
                    {exploringNow > 0 ? `${exploringNow.toLocaleString()} Active Today` : "Be the first to post"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {error ? (
            <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          ) : null}

          <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide mb-4">
            <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-xs uppercase tracking-widest shrink-0 pr-4 border-r border-white/10">
              <Sparkles size={16} /> Trending
            </div>
            {["#GrandOpening", "#KingTut", "#NewDiscovery", "#RoyalMummies", "#GizaPlateau"].map((tag) => (
              <button
                key={tag}
                type="button"
                className="shrink-0 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors">
                {tag}
              </button>
            ))}
          </div>

          <div className="space-y-8">
            {loading ? (
              <div className="text-gray-500 text-sm py-8 text-center">Loading community feed…</div>
            ) : posts.length === 0 ? (
              <div className="bg-[#111] border border-white/10 rounded-4xl p-10 text-center text-gray-500">
                No posts yet. Be the first to share your museum experience!
              </div>
            ) : (
              <AnimatePresence>
                {posts.map((post) => {
                  const currentReaction = REACTIONS_OPTIONS.find((r) => r.id === post.userReaction);
                  const isCommentsOpen = openComments[post.id];

                  return (
                    <motion.div
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-linear-to-b from-[#111] to-[#0a0a0a] border border-white/10 rounded-4xl p-6 md:p-8 shadow-2xl hover:border-[#D4AF37]/30 transition-all">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Image
                              src={post.avatar}
                              alt={post.user}
                              width={56}
                              height={56}
                              loading="lazy"
                              className="w-14 h-14 rounded-full object-cover border-2"
                              style={{ borderColor: post.isVerified ? "#D4AF37" : "transparent" }}
                            />
                            {post.isVerified ? (
                              <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5">
                                <BadgeCheck size={18} className="text-[#D4AF37] fill-[#D4AF37]/20" />
                              </div>
                            ) : null}
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-lg">{post.user}</h4>
                            <div className="flex items-center gap-3 text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                              <span className={post.isVerified ? "text-[#D4AF37]" : ""}>{post.role}</span>
                              <span>•</span>
                              <span>{formatRelativeTime(post.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        <button type="button" className="text-gray-500 hover:text-white transition-colors p-2">
                          <MoreHorizontal size={20} />
                        </button>
                      </div>

                      <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-400 mb-4">
                        <MapPin size={14} className="text-[#D4AF37]" /> Checked in at{" "}
                        <span className="text-white">{post.location}</span>
                      </div>

                      <p className="text-gray-200 mb-6 leading-relaxed text-lg">{post.content}</p>

                      {post.image ? (
                        <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-6 border border-white/10 group">
                          <Image
                            src={post.image}
                            alt="Post attachment"
                            fill
                            sizes="(max-width: 768px) 100vw, 800px"
                            loading="lazy"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      ) : null}

                      <div className="flex items-center justify-between text-sm text-gray-500 border-b border-white/10 pb-4 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-1">
                            <span className="bg-[#111] rounded-full text-base z-20">❤️</span>
                            <span className="bg-[#111] rounded-full text-base z-10">👍</span>
                            <span className="bg-[#111] rounded-full text-base z-0">👑</span>
                          </div>
                          <span>{(post.reactionCount || 0).toLocaleString()} Reactions</span>
                        </div>
                        <span>{post.commentsCount} Comments</span>
                      </div>

                      <div className="flex items-center gap-2 md:gap-6 relative">
                        <div className="relative group">
                          <div className="absolute bottom-full left-0 mb-2 bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-2 flex items-center gap-3 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-50">
                            {REACTIONS_OPTIONS.map((react) => (
                              <button
                                key={react.id}
                                type="button"
                                onClick={() => handleReact(post.id, react.id)}
                                className="text-2xl hover:scale-125 hover:-translate-y-2 transition-transform origin-bottom"
                                title={react.label}>
                                {react.icon}
                              </button>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleReact(post.id, "like")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                              currentReaction
                                ? `${currentReaction.color} bg-white/5`
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}>
                            {currentReaction ? (
                              <span className="text-lg">{currentReaction.icon}</span>
                            ) : (
                              <span className="text-lg opacity-80">🤍</span>
                            )}
                            {currentReaction ? currentReaction.label : "React"}
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleCommentsSection(post.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                            isCommentsOpen
                              ? "bg-white/10 text-white"
                              : "text-gray-400 hover:bg-white/5 hover:text-white"
                          }`}>
                          <MessageCircle size={18} /> Comment
                        </button>

                        <button
                          type="button"
                          onClick={() => handleShare(post)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all ml-auto">
                          <Share2 size={18} /> Share
                        </button>
                      </div>

                      <AnimatePresence>
                        {isCommentsOpen ? (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mt-4">
                            <div className="bg-black/30 border border-white/5 rounded-2xl p-4 md:p-6 space-y-4">
                              {post.commentsList.length > 0 ? (
                                <div className="space-y-4 mb-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                  {post.commentsList.map((comment) => (
                                    <div key={comment.id} className="flex gap-3">
                                      <Image
                                        src={comment.avatar}
                                        alt={comment.user}
                                        width={32}
                                        height={32}
                                        loading="lazy"
                                        className="w-8 h-8 rounded-full object-cover shrink-0"
                                      />
                                      <div className="bg-white/5 rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[90%]">
                                        <h5 className="text-white text-xs font-bold mb-1">{comment.user}</h5>
                                        <p className="text-gray-300 text-sm">{comment.text}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center text-gray-500 text-sm py-4 italic">
                                  Be the first to share your thoughts!
                                </div>
                              )}

                              <form
                                onSubmit={(e) => handleAddComment(e, post.id)}
                                className="flex gap-3 items-center relative mt-2 border-t border-white/5 pt-4">
                                <Image
                                  src={userAvatar}
                                  alt="You"
                                  width={32}
                                  height={32}
                                  loading="lazy"
                                  className="w-8 h-8 rounded-full object-cover shrink-0"
                                />
                                <div className="relative flex-1">
                                  <input
                                    type="text"
                                    placeholder="Write a comment..."
                                    value={commentInputs[post.id] || ""}
                                    onChange={(e) =>
                                      setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                                    }
                                    className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                                  />
                                  <button
                                    type="submit"
                                    disabled={!commentInputs[post.id]?.trim()}
                                    className={`absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all ${
                                      commentInputs[post.id]?.trim()
                                        ? "bg-[#D4AF37] text-black"
                                        : "text-gray-500"
                                    }`}>
                                    <Send size={14} />
                                  </button>
                                </div>
                              </form>
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-linear-to-t from-[#050505] via-[#050505]/90 to-transparent pt-24 pb-8 px-4 z-50">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={handlePostSubmit}
              className="bg-[#111]/90 backdrop-blur-xl border border-white/10 rounded-4xl p-3 flex items-center gap-2 shadow-[0_0_50px_rgba(0,0,0,0.8)] focus-within:border-[#D4AF37]/50 transition-colors">
              <div className="flex gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => document.getElementById("community-image-input")?.click()}
                  className="p-3 text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full transition-colors">
                  <ImageIcon size={20} />
                </button>
                <input
                  id="community-image-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onPickImage}
                />
              </div>
              <input
                type="text"
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="Share your museum experience..."
                className="flex-1 bg-transparent border-none focus:outline-none text-white px-2 text-sm md:text-base placeholder:text-gray-600"
              />
              <button
                type="submit"
                disabled={posting || (!newPostText.trim() && !selectedImageFile)}
                className={`px-6 py-3 rounded-full flex items-center gap-2 font-bold uppercase tracking-widest text-xs transition-all shrink-0 ${
                  !posting && (newPostText.trim() || selectedImageFile)
                    ? "bg-[#D4AF37] text-black hover:bg-white hover:scale-105"
                    : "bg-white/5 text-gray-600 cursor-not-allowed"
                }`}>
                {posting ? "Posting…" : "Post"} <Send size={16} />
              </button>
            </form>
            {selectedImagePreview ? (
              <div className="mt-3 rounded-2xl border border-white/10 bg-[#111]/80 p-3">
                <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">
                  Selected image (uploads to Cloudinary)
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedImagePreview}
                  alt="Selected upload"
                  className="h-28 w-auto rounded-xl object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <LoginRequiredModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        nextPath="/community"
        title="Sign in to post in community"
        message="You can browse the community freely. Please sign in to post, comment, react, or upload images."
      />
    </>
  );
}
