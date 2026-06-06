"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Activity,
  Sparkles,
  TrendingUp,
  ThumbsUp,
  Clock,
  Search,
  User,
  RefreshCw,
} from "lucide-react";
import { getAiChatLogs } from "../../../lib/adminApi";

type ChatLogEntry = {
  id: string;
  userLabel: string;
  userMessage: string;
  assistantReply: string;
  source: string;
  createdAt: string;
  fromN8n: boolean;
};

type TopQuestion = {
  question: string;
  count: number;
};

type ChatStats = {
  totalQueries: number;
  queriesToday: number;
  successfulReplies: number;
  topQuestions: TopQuestion[];
};

const POLL_MS = 15000;

function formatRelativeTime(value: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

export default function ChatbotPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState<ChatLogEntry[]>([]);
  const [stats, setStats] = useState<ChatStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (opts?: { silent?: boolean }) => {
      const silent = opts?.silent === true;
      if (!silent) setLoading(true);
      else setRefreshing(true);
      setError(null);

      try {
        const res = await getAiChatLogs({ take: 50, search: searchTerm.trim() });
        const data = res?.data as Record<string, unknown> | undefined;
        const rawStats = (data?.stats ?? {}) as Record<string, unknown>;
        const rawEntries = Array.isArray(data?.entries) ? data.entries : [];

        setStats({
          totalQueries: Number(rawStats.totalQueries ?? 0),
          queriesToday: Number(rawStats.queriesToday ?? 0),
          successfulReplies: Number(rawStats.successfulReplies ?? 0),
          topQuestions: (Array.isArray(rawStats.topQuestions) ? rawStats.topQuestions : []).map(
            (q: Record<string, unknown>) => ({
              question: String(q.question ?? ""),
              count: Number(q.count ?? 0),
            }),
          ),
        });

        setEntries(
          rawEntries.map((row: Record<string, unknown>) => ({
            id: String(row.id ?? ""),
            userLabel: String(row.userLabel ?? "Guest"),
            userMessage: String(row.userMessage ?? ""),
            assistantReply: String(row.assistantReply ?? ""),
            source: String(row.source ?? "web"),
            createdAt: String(row.createdAt ?? ""),
            fromN8n: Boolean(row.fromN8n),
          })),
        );
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Failed to load chat logs";
        setError(message);
        if (!silent) {
          setEntries([]);
          setStats(null);
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [searchTerm],
  );

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      load({ silent: true });
    }, POLL_MS);
    return () => window.clearInterval(timer);
  }, [load]);

  const filteredConversations = entries;

  return (
    <div className="p-8 space-y-10 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2 flex items-center gap-3">
            <Sparkles className="text-[#D4AF37]" size={28} /> AI Oracle Analytics
          </h1>
          <p className="text-gray-400 text-sm italic">
            Live stream of the latest user query and AI response from web and mobile.
          </p>
        </div>
        <button
          type="button"
          onClick={() => load({ silent: true })}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:bg-white/5 disabled:opacity-60">
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Queries",
            value: stats ? stats.totalQueries.toLocaleString() : "—",
            icon: MessageSquare,
            color: "text-[#D4AF37]",
          },
          {
            label: "Queries Today",
            value: stats ? stats.queriesToday.toLocaleString() : "—",
            icon: TrendingUp,
            color: "text-emerald-500",
          },
          {
            label: "AI Success Rate",
            value: stats ? `${stats.successfulReplies}%` : "—",
            icon: ThumbsUp,
            color: "text-blue-500",
          },
          {
            label: "Live Refresh",
            value: `${POLL_MS / 1000}s`,
            icon: Clock,
            color: "text-[#D4AF37]",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#111] border border-white/5 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/5 rounded-lg">
                <stat.icon size={18} className={stat.color} />
              </div>
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">
                {stat.label}
              </span>
            </div>
            <div className="text-3xl font-bold text-white font-mono">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#111] border border-white/5 rounded-2xl p-4 shadow-xl">
        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Uncover specific knowledge transfers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") load();
            }}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
          />
        </div>
      </div>

      {error ? (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-serif font-bold text-white mb-4 flex items-center gap-2">
            Live Knowledge Stream
            {refreshing ? (
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono">
                Updating…
              </span>
            ) : null}
          </h3>

          {loading ? (
            <div className="text-gray-500 text-sm">Loading live chat logs…</div>
          ) : filteredConversations.length === 0 ? (
            <div className="bg-[#111] border border-white/5 rounded-2xl p-8 text-center text-gray-500 text-sm">
              No chat exchanges yet. Messages from the web AI assistant and mobile app will appear
              here automatically.
            </div>
          ) : (
            <AnimatePresence>
              {filteredConversations.map((conv, idx) => (
                <motion.div
                  key={conv.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(idx * 0.05, 0.4) }}
                  className="bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-[#D4AF37]/20 transition-all group shadow-md">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                        <User className="text-[#D4AF37]" size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{conv.userLabel}</div>
                        <div className="text-[10px] text-gray-500 uppercase font-mono tracking-tighter">
                          {formatRelativeTime(conv.createdAt)} · {conv.source}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        conv.fromN8n
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          : "bg-white/5 text-gray-500 border-white/10"
                      }`}>
                      {conv.fromN8n ? <ThumbsUp size={10} /> : <Activity size={10} />}
                      {conv.fromN8n ? "ai reply" : "fallback"}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[#D4AF37]/20">
                      <div className="text-[10px] uppercase font-bold text-gray-600 mb-1">
                        Human Query
                      </div>
                      <div className="text-sm text-gray-300 italic">&quot;{conv.userMessage}&quot;</div>
                    </div>
                    <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-blue-500/20 bg-blue-500/[0.02] p-4 rounded-r-xl">
                      <div className="text-[10px] uppercase font-bold text-blue-500 mb-1 flex items-center gap-2">
                        <Sparkles size={10} /> Oracle Response
                      </div>
                      <div className="text-sm text-white leading-relaxed">{conv.assistantReply}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-serif font-bold text-white mb-4">Curiosity Ranking</h3>
          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 shadow-2xl sticky top-28">
            <div className="space-y-6">
              {(stats?.topQuestions?.length ? stats.topQuestions : []).map((q, idx) => (
                <div key={`${q.question}-${idx}`} className="flex items-start gap-4 group">
                  <div className="w-8 h-8 bg-[#050505] border border-white/5 rounded-lg flex items-center justify-center text-xs font-mono font-bold text-[#D4AF37] group-hover:border-[#D4AF37]/50 transition-colors">
                    0{idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-white font-medium mb-1 group-hover:text-[#D4AF37] transition-colors">
                      {q.question}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                        {q.count} times
                      </div>
                    </div>
                    <div className="mt-2 w-full h-[1px] bg-white/5" />
                  </div>
                </div>
              ))}
              {!stats?.topQuestions?.length ? (
                <div className="text-gray-500 text-sm">Top questions will appear as users chat.</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
