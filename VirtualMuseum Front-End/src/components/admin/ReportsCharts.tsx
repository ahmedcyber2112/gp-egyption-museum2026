"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

type ReportDatum = {
  month: string;
  artifacts: number;
  users: number;
  views: number;
};

export default function ReportsCharts({ monthlyData }: { monthlyData: ReportDatum[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-serif font-bold text-white">Acquisition Flux</h3>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Monthly New Artifacts</span>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis dataKey="month" stroke="#4b5563" fontSize={11} axisLine={false} tickLine={false} />
            <YAxis stroke="#4b5563" fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#111", border: "1px solid #D4AF37", borderRadius: "16px" }}
              cursor={{ fill: "rgba(212, 175, 55, 0.05)" }}
            />
            <Bar dataKey="artifacts" fill="#d4af37" radius={[10, 10, 0, 0]} barSize={35} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-serif font-bold text-white">Engagement Resonance</h3>
          <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest bg-[#D4AF37]/10 px-3 py-1 rounded-full">User Growth Trend</span>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis dataKey="month" stroke="#4b5563" fontSize={11} axisLine={false} tickLine={false} />
            <YAxis stroke="#4b5563" fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #D4AF37", borderRadius: "16px" }} />
            <Area type="monotone" dataKey="users" stroke="#d4af37" strokeWidth={4} fillOpacity={1} fill="url(#colorUsers)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
