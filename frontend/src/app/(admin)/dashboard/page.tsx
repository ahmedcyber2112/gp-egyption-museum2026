"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
// السطر المتصلح (شيلنا المسافة وخليناها ShieldCheck)
import { Package, Users, MessageSquare, Eye, TrendingUp, Clock, ShieldCheck, Activity } from "lucide-react";
import {
  BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import {
  getAdminArtifacts,
  getAdminCategories,
  getTopViewed3DArtifacts,
  getAdminUsers,
} from "../../../lib/adminApi";

const CHART_COLORS = ["#d4af37", "#c19a6b", "#8b6f47", "#5f4b2c", "#d6c09a"];

export default function dashboard() {
  const [artifacts, setArtifacts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [topViewed3D, setTopViewed3D] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [artRes, catRes, userRes, topViewedRes] = await Promise.all([
          getAdminArtifacts(),
          getAdminCategories(),
          getAdminUsers(),
          getTopViewed3DArtifacts(),
        ]);
        setArtifacts(Array.isArray(artRes?.data) ? artRes.data : []);
        setCategories(Array.isArray(catRes?.data) ? catRes.data : []);
        setUsers(Array.isArray(userRes?.data) ? userRes.data : []);
        setTopViewed3D(Array.isArray(topViewedRes?.data) ? topViewedRes.data : []);
      } catch (e: any) {
        setError(e?.message || "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const stats = useMemo(
    () => [
      { label: "Total Artifacts", value: String(artifacts.length), icon: Package, change: "LIVE", color: "text-[#D4AF37]" },
      { label: "Registered Users", value: String(users.length), icon: Users, change: "LIVE", color: "text-blue-500" },
      { label: "Categories", value: String(categories.length), icon: MessageSquare, change: "LIVE", color: "text-[#D4AF37]" },
      { label: "3D Ready", value: String(artifacts.filter((a) => !!a.modelFileId).length), icon: Eye, change: "LIVE", color: "text-emerald-500" },
    ],
    [artifacts, users, categories],
  );

  const visitorData = useMemo(() => {
    const now = new Date();
    const months = [...Array(6)].map((_, idx) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - idx), 1);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      return { key, month: d.toLocaleString("en-US", { month: "short" }), visitors: 0 };
    });
    for (const a of artifacts) {
      const c = new Date(a.createdAt);
      if (Number.isNaN(c.getTime())) continue;
      const key = `${c.getFullYear()}-${c.getMonth()}`;
      const target = months.find((m) => m.key === key);
      if (target) target.visitors += 1;
    }
    return months.map(({ month, visitors }) => ({ month, visitors }));
  }, [artifacts]);

  const eraDistribution = useMemo(() => {
    const map = new Map<string, number>();
    artifacts.forEach((a) => {
      const name = a.era?.name || "Unknown";
      map.set(name, (map.get(name) || 0) + 1);
    });
    return [...map.entries()].map(([name, value], index) => ({
      name,
      value,
      color: CHART_COLORS[index % CHART_COLORS.length],
    }));
  }, [artifacts]);

  const mostViewedArtifacts = useMemo(() => {
    if (topViewed3D.length > 0) {
      return topViewed3D.map((a, idx) => ({
        name: a.slug || `Artifact ${idx + 1}`,
        views: Number(a.views || 0),
      }));
    }
    return artifacts
      .filter((a) => !!a.modelFileId)
      .slice(0, 5)
      .map((a, idx) => ({
        name: a.slug || `Artifact ${idx + 1}`,
        views: 0,
      }));
  }, [artifacts, topViewed3D]);

  const activityTimeline = useMemo(
    () =>
      artifacts
        .slice()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
        .map((a) => ({
          action: `Artifact updated: ${a.slug || a.id}`,
          time: new Date(a.createdAt).toLocaleString(),
          user: "Admin",
          type: a.modelFileId ? "add" : "update",
        })),
    [artifacts],
  );

  const renderEraTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const data = payload[0]?.payload;
    if (!data) return null;
    return (
      <div className="rounded-xl border border-[#D4AF37]/30 bg-[#0b0b10]/95 px-3 py-2 shadow-xl">
        <div className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-black">
          {data.name}
        </div>
        <div className="text-xs text-gray-300 font-bold mt-1">
          {data.value} artifacts
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 xl:p-8 space-y-6 md:space-y-8 min-h-screen pb-16 md:pb-20">
      {loading ? <div className="text-sm text-gray-400">Loading dashboard...</div> : null}
      {error ? <div className="text-sm text-red-300 border border-red-500/30 bg-red-500/10 rounded-xl p-3">{error}</div> : null}
      
      {/* ================= Header ================= */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-serif font-bold text-white mb-2 tracking-tight">Museum Oversight</h1>
        <p className="text-gray-500 text-xs md:text-sm font-medium tracking-wide">Command center for the world's most prestigious digital collection.</p>
      </motion.div>

      {/* ================= Stats Grid ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
            className="bg-[#111] border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl group hover:border-[#D4AF37]/30 transition-all"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`p-3 bg-white/5 rounded-2xl group-hover:bg-[#D4AF37]/10 transition-colors`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                <TrendingUp className="w-3 h-3" /> {stat.change}
              </span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1 font-mono break-all">{stat.value}</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ================= Charts Row ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8">
        {/* Visitor Analytics */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#111] border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl">
          <h3 className="text-base md:text-lg font-serif font-bold text-white mb-4 md:mb-8">Visitor Traffic Analytics</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="month" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "12px" }}
                itemStyle={{ color: "#D4AF37", fontWeight: "bold" }}
              />
              <Line type="monotone" dataKey="visitors" stroke="#d4af37" strokeWidth={3} dot={{ r: 4, fill: "#d4af37" }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Era Distribution */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#111] border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl">
          <h3 className="text-base md:text-lg font-serif font-bold text-white mb-4 md:mb-8">Artifact Era Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={eraDistribution}
                cx="50%" cy="50%"
                innerRadius={42} outerRadius={78}
                paddingAngle={8}
                dataKey="value"
              >
                {eraDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={renderEraTooltip} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* ================= Bottom Row ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8">
        {/* Most Viewed Bar Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#111] border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl">
          <h3 className="text-base md:text-lg font-serif font-bold text-white mb-4 md:mb-8">Top Viewed 3D Treasures</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={mostViewedArtifacts}>
              <XAxis dataKey="name" stroke="#4b5563" fontSize={9} axisLine={false} tickLine={false} interval={0} angle={-10} textAnchor="end" height={50} />
              <Tooltip cursor={{fill: 'rgba(255,255,255,0.02)'}} contentStyle={{ backgroundColor: "#111", border: "1px solid #D4AF37", borderRadius: "8px" }} />
              <Bar dataKey="views" fill="#D4AF37" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Activity Timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#111] border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-base md:text-lg font-serif font-bold text-white">System Logs</h3>
             <Activity className="text-[#D4AF37]/50" size={18} />
          </div>
          <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
            {activityTimeline.map((activity, idx) => (
              <div key={idx} className="flex gap-4 relative z-10">
                <div className={`w-[24px] h-[24px] rounded-full flex items-center justify-center border-4 border-[#111] ${
                  activity.type === 'add' ? 'bg-emerald-500' : 
                  activity.type === 'security' ? 'bg-blue-500' : 'bg-[#D4AF37]'
                }`}></div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-200">{activity.action}</div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                    {activity.time} • <span className="text-[#D4AF37]">{activity.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}