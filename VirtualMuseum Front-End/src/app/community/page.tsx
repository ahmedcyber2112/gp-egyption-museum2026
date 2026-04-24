"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MessageCircle, ImageIcon, Send, Share2, MoreHorizontal, MapPin, BadgeCheck, Map, Sparkles, CornerDownRight } from 'lucide-react';
import Link from 'next/link';
import { getCurrentUser, isLoggedIn } from '../../lib/authStorage';
import { consumePostLoginAction, setPostLoginAction, setPostLoginRedirect } from '../../lib/authGate';
import LoginRequiredModal from '../../components/Auth/LoginRequiredModal';

// --- الريأكتات المتاحة ---
const REACTIONS_OPTIONS: Array<{
  id: ReactionId;
  icon: string;
  label: string;
  color: string;
}> = [
  { id: 'like', icon: '👍', label: 'Like', color: 'text-blue-400' },
  { id: 'love', icon: '❤️', label: 'Love', color: 'text-red-500' },
  { id: 'wow', icon: '🤯', label: 'Wow', color: 'text-purple-400' },
  { id: 'crown', icon: '👑', label: 'Royal', color: 'text-[#D4AF37]' },
];

type ReactionId = 'like' | 'love' | 'wow' | 'crown';

type CommunityComment = {
  id: number;
  user: string;
  avatar: string;
  text: string;
};

type CommunityPost = {
  id: number;
  user: string;
  role: string;
  isVerified: boolean;
  avatar: string;
  time: string;
  location: string;
  content: string;
  image: string | null;
  reactionCount: number;
  userReaction: ReactionId | null;
  commentsCount: number;
  commentsList: CommunityComment[];
  createdAt: string;
};

// --- داتا وهمية مطورة (بما فيها التعليقات) ---
const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 1,
    user: "Dr. Zahi Hawass",
    role: "Lead Egyptologist",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&q=80",
    time: "2 hours ago",
    location: "Grand Hall",
    content: "The newly restored artifacts from the Middle Kingdom are finally on display. The craftsmanship is beyond anything we've seen. Truly a historic day! 🏛️✨",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2b45?q=80&w=800&auto=format&fit=crop",
    reactionCount: 1245,
    userReaction: null,
    commentsCount: 2,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    commentsList: [
      { id: 101, user: "Ahmed Ali", avatar: "https://i.pravatar.cc/150?img=11", text: "Can't wait to see this in person! 😍" },
      { id: 102, user: "Sarah Jenkins", avatar: "https://i.pravatar.cc/150?img=47", text: "Absolutely stunning restoration work." }
    ]
  },
  {
    id: 2,
    user: "Sarah Jenkins",
    role: "Explorer",
    isVerified: false,
    avatar: "https://i.pravatar.cc/150?img=47",
    time: "5 hours ago",
    location: "Tutankhamun's Treasures",
    content: "Just saw the Golden Mask in person... Pictures don't do it justice. I'm literally crying right now. Can anyone recommend a good book about his reign?",
    image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop",
    reactionCount: 342,
    userReaction: 'love',
    commentsCount: 0,
    commentsList: [],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  }
];

const COMMUNITY_POSTS_STORAGE_KEY = "community_posts";

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

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    if (typeof window === "undefined") return INITIAL_POSTS;
    const raw = localStorage.getItem(COMMUNITY_POSTS_STORAGE_KEY);
    if (!raw) return INITIAL_POSTS;
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });
  const [newPostText, setNewPostText] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedImageDataUrl, setSelectedImageDataUrl] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  
  // States للتعليقات
  const [openComments, setOpenComments] = useState<Record<number, boolean>>({}); // عشان نفتح ونقفل سكشن الكومنتات لكل بوست
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({}); // عشان نحفظ الكلام اللي بيتكتب في كل بوست

  useEffect(() => {
    const syncUser = () => setCurrentUser(getCurrentUser());
    syncUser();
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(COMMUNITY_POSTS_STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    const timer = setInterval(() => setPosts((prev) => [...prev]), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const requireCommunityAuth = (action: Record<string, unknown>) => {
    if (isLoggedIn()) return true;
    setPostLoginRedirect('/community');
    setPostLoginAction({ type: 'community-action', ...action });
    setShowLoginModal(true);
    return false;
  };

  useEffect(() => {
    if (!isLoggedIn()) return;
    const action = consumePostLoginAction();
    if (!action || action.type !== 'community-action') return;

    if (action.mode === 'image' && action.dataUrl && typeof action.dataUrl === 'string') {
      setSelectedImageDataUrl(action.dataUrl);
      return;
    }

    if (action.mode === 'post' && typeof action.text === 'string') {
      submitPostText(action.text, action.dataUrl && typeof action.dataUrl === 'string' ? action.dataUrl : selectedImageDataUrl);
      return;
    }

    if (
      action.mode === 'comment' &&
      typeof action.postId === 'number' &&
      typeof action.text === 'string'
    ) {
      submitComment(action.postId, action.text);
    }
  }, []);

  // 1. دالة اختيار الريأكت
  const handleReact = (postId: number, reactionId: ReactionId) => {
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        const isRemoving = post.userReaction === reactionId;
        return {
          ...post,
          userReaction: isRemoving ? null : reactionId,
          reactionCount: isRemoving ? post.reactionCount - 1 : (post.userReaction ? post.reactionCount : post.reactionCount + 1)
        };
      }
      return post;
    }));
  };

  // 2. دالة نشر بوست جديد
  const submitPostText = (text: string, imageDataUrl?: string | null) => {
    if (!text.trim()) return;
    const userName = (currentUser?.fullName || currentUser?.email || "Explorer").trim();
    const userId = currentUser?.userId || "";
    const userAvatar =
      userId ? localStorage.getItem(`profile_avatar_${userId}`) : null;
    const newPost = {
      id: Date.now(),
      user: userName,
      role: "New Member",
      isVerified: false,
      avatar: userAvatar || "https://i.pravatar.cc/150?img=33",
      time: "Just now",
      location: "Museum Lobby",
      content: text,
      image: imageDataUrl || null,
      reactionCount: 0,
      userReaction: null,
      commentsCount: 0,
      commentsList: [],
      createdAt: new Date().toISOString()
    };

    setPosts((prev) => [newPost, ...prev]);
    setNewPostText("");
    setSelectedImageDataUrl(null);
  };

  const handlePostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = newPostText.trim();
    if (!text && !selectedImageDataUrl) return;
    if (!requireCommunityAuth({ mode: 'post', text, dataUrl: selectedImageDataUrl })) return;
    submitPostText(text || "Shared an image from my visit.", selectedImageDataUrl);
  };

  // 3. دالة فتح/قفل سكشن الكومنتات للبوست
  const toggleCommentsSection = (postId: number) => {
    setOpenComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  // 4. دالة إضافة تعليق جديد
  const submitComment = (postId: number, commentText: string) => {
    if (!commentText?.trim()) return;
    const newComment = {
      id: Date.now(),
      user: (currentUser?.fullName || "You"),
      avatar:
        (currentUser?.userId
          ? localStorage.getItem(`profile_avatar_${currentUser.userId}`)
          : null) || "https://i.pravatar.cc/150?img=33",
      text: commentText
    };

    setPosts((prev) => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          commentsCount: post.commentsCount + 1,
          commentsList: [...post.commentsList, newComment]
        };
      }
      return post;
    }));

    // تفريغ مربع الإدخال بعد الإرسال
    setCommentInputs(prev => ({ ...prev, [postId]: "" }));
  };

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!requireCommunityAuth({ mode: 'image' })) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 1_500_000) {
      alert("Please choose image under 1.5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : null;
      setSelectedImageDataUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>, postId: number) => {
    e.preventDefault();
    const commentText = commentInputs[postId];
    if (!commentText?.trim()) return;
    if (!requireCommunityAuth({ mode: 'comment', postId, text: commentText })) return;
    submitComment(postId, commentText);
  };

  return (
    <>
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-32 px-4 md:px-8 relative overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#D4AF37]/5 blur-[150px] pointer-events-none rounded-full"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* --- Header --- */}
        <div className="mb-8 border-b border-white/10 pb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors mb-4 font-bold uppercase tracking-widest text-xs">
            <ArrowLeft size={16} /> Back to Museum
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-6xl font-serif font-black">
                The <span className="text-[#D4AF37] italic">Lounge</span>
              </h1>
              <p className="text-gray-500 mt-2">Join the conversation with history enthusiasts worldwide.</p>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 shrink-0">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-300">2,401 Exploring Now</span>
            </div>
          </div>
        </div>

        {/* --- Trending Topics --- */}
        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide mb-4">
          <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-xs uppercase tracking-widest shrink-0 pr-4 border-r border-white/10">
            <Sparkles size={16} /> Trending
          </div>
          {["#GrandOpening", "#KingTut", "#NewDiscovery", "#RoyalMummies", "#GizaPlateau"].map(tag => (
            <button key={tag} className="shrink-0 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors">
              {tag}
            </button>
          ))}
        </div>

        {/* --- Feed (Posts) --- */}
        <div className="space-y-8">
          <AnimatePresence>
            {posts.map((post) => {
              const currentReaction = REACTIONS_OPTIONS.find(r => r.id === post.userReaction);
              const isCommentsOpen = openComments[post.id];

              return (
                <motion.div 
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-linear-to-b from-[#111] to-[#0a0a0a] border border-white/10 rounded-4xl p-6 md:p-8 shadow-2xl hover:border-[#D4AF37]/30 transition-all"
                >
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Image src={post.avatar} alt={post.user} width={56} height={56} loading="lazy" decoding="async" className="w-14 h-14 rounded-full object-cover border-2 border-transparent" style={{ borderColor: post.isVerified ? '#D4AF37' : 'transparent' }} />
                        {post.isVerified && (
                          <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5">
                            <BadgeCheck size={18} className="text-[#D4AF37] fill-[#D4AF37]/20" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-lg">{post.user}</h4>
                        </div>
                        <div className="flex items-center gap-3 text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                          <span className={post.isVerified ? "text-[#D4AF37]" : ""}>{post.role}</span>
                          <span>•</span>
                          <span>{formatRelativeTime(post.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-500 hover:text-white transition-colors p-2">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>

                  {/* Location Tag */}
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-400 mb-4">
                    <MapPin size={14} className="text-[#D4AF37]" /> Checked in at <span className="text-white">{post.location}</span>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-200 mb-6 leading-relaxed text-lg">
                    {post.content}
                  </p>

                  {/* Post Image */}
                  {post.image && (
                    <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-6 border border-white/10 group cursor-pointer">
                      <Image src={post.image} alt="Post attachment" fill sizes="(max-width: 768px) 100vw, 800px" loading="lazy" decoding="async" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  )}

                  {/* Stats */}
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

                  {/* Action Bar */}
                  <div className="flex items-center gap-2 md:gap-6 relative">
                    <div className="relative group">
                      <div className="absolute bottom-full left-0 mb-2 bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-2 flex items-center gap-3 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-50">
                        {REACTIONS_OPTIONS.map(react => (
                          <button key={react.id} onClick={() => handleReact(post.id, react.id)} className="text-2xl hover:scale-125 hover:-translate-y-2 transition-transform origin-bottom" title={react.label}>
                            {react.icon}
                          </button>
                        ))}
                      </div>
                      <button onClick={() => handleReact(post.id, 'like')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${currentReaction ? currentReaction.color + ' bg-white/5' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                        {currentReaction ? <span className="text-lg">{currentReaction.icon}</span> : <span className="text-lg opacity-80">🤍</span>}
                        {currentReaction ? currentReaction.label : 'React'}
                      </button>
                    </div>

                    {/* زرار الكومنت اللي بيفتح السكشن */}
                    <button 
                      onClick={() => toggleCommentsSection(post.id)} 
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isCommentsOpen ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                      <MessageCircle size={18} /> Comment
                    </button>

                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all ml-auto">
                      <Share2 size={18} /> Share
                    </button>
                  </div>

                  {/* ========================================= */}
                  {/* سكشن التعليقات التفاعلي (Live Comments) */}
                  {/* ========================================= */}
                  <AnimatePresence>
                    {isCommentsOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-4"
                      >
                        <div className="bg-black/30 border border-white/5 rounded-2xl p-4 md:p-6 space-y-4">
                          
                          {/* عرض التعليقات القديمة */}
                          {post.commentsList.length > 0 ? (
                            <div className="space-y-4 mb-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                              {post.commentsList.map(comment => (
                                <div key={comment.id} className="flex gap-3">
                                  <Image src={comment.avatar} alt={comment.user} width={32} height={32} loading="lazy" decoding="async" className="w-8 h-8 rounded-full object-cover shrink-0" />
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

                          {/* مربع إضافة تعليق جديد */}
                          <form onSubmit={(e) => handleAddComment(e, post.id)} className="flex gap-3 items-center relative mt-2 border-t border-white/5 pt-4">
                            <Image
                              src={
                                (currentUser?.userId
                                  ? localStorage.getItem(`profile_avatar_${currentUser.userId}`)
                                  : null) || "https://i.pravatar.cc/150?img=33"
                              }
                              alt="You"
                              width={32}
                              height={32}
                              loading="lazy"
                              decoding="async"
                              className="w-8 h-8 rounded-full object-cover shrink-0"
                            />
                            <div className="relative flex-1">
                              <input 
                                type="text" 
                                placeholder="Write a comment..."
                                value={commentInputs[post.id] || ""}
                                onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                              />
                              <button 
                                type="submit" 
                                disabled={!commentInputs[post.id]?.trim()}
                                className={`absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all ${commentInputs[post.id]?.trim() ? 'bg-[#D4AF37] text-black' : 'text-gray-500'}`}
                              >
                                <Send size={14} className={commentInputs[post.id]?.trim() ? "translate-x-0.5" : ""} />
                              </button>
                            </div>
                          </form>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* --- Sticky Input Box (لإضافة بوست جديد) --- */}
      <div className="fixed bottom-0 left-0 w-full bg-linear-to-t from-[#050505] via-[#050505]/90 to-transparent pt-24 pb-8 px-4 z-50">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handlePostSubmit} className="bg-[#111]/90 backdrop-blur-xl border border-white/10 rounded-4xl p-3 flex items-center gap-2 shadow-[0_0_50px_rgba(0,0,0,0.8)] focus-within:border-[#D4AF37]/50 transition-colors">
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
              <button type="button" className="hidden sm:block p-3 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-full transition-colors"><Map size={20} /></button>
            </div>
            <input 
              type="text" 
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="Share your museum experience..." 
              className="flex-1 bg-transparent border-none focus:outline-none text-white px-2 text-sm md:text-base placeholder:text-gray-600"
            />
            <button type="submit" disabled={!newPostText.trim() && !selectedImageDataUrl} className={`px-6 py-3 rounded-full flex items-center gap-2 font-bold uppercase tracking-widest text-xs transition-all shrink-0 ${newPostText.trim() || selectedImageDataUrl ? 'bg-[#D4AF37] text-black hover:bg-white hover:scale-105' : 'bg-white/5 text-gray-600 cursor-not-allowed'}`}>
              Post <Send size={16} className={newPostText.trim() || selectedImageDataUrl ? "translate-x-1" : ""} />
            </button>
          </form>
          {selectedImageDataUrl ? (
            <div className="mt-3 rounded-2xl border border-white/10 bg-[#111]/80 p-3">
              <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Selected image</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedImageDataUrl} alt="Selected upload" className="h-28 w-auto rounded-xl object-cover" />
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
      message="You can browse the community freely. Please sign in to post, comment, or upload images."
    />
    </>
  );
}