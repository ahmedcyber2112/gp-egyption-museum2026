"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type VisitorDatum = {
  month: string;
  visitors: number;
};

type EraDatum = {
  name: string;
  value: number;
  color: string;
};

type ViewedDatum = {
  name: string;
  views: number;
};

export default function DashboardCharts({
  visitorData,
  eraDistribution,
  mostViewedArtifacts,
}: {
  visitorData: VisitorDatum[];
  eraDistribution: EraDatum[];
  mostViewedArtifacts: ViewedDatum[];
}) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-lg font-serif font-bold text-white mb-8">Visitor Traffic Analytics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="month" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "12px" }}
                itemStyle={{ color: "#D4AF37", fontWeight: "bold" }}
              />
              <Line type="monotone" dataKey="visitors" stroke="#d4af37" strokeWidth={3} dot={{ r: 4, fill: "#d4af37" }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-lg font-serif font-bold text-white mb-8">Artifact Era Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={eraDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={8}
                dataKey="value"
              >
                {eraDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {eraDistribution.map((era) => (
              <div key={era.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: era.color }}></div>
                <span className="text-[10px] uppercase font-bold text-gray-400">{era.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-lg font-serif font-bold text-white mb-8">Top Viewed 3D Treasures</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mostViewedArtifacts}>
              <XAxis dataKey="name" stroke="#4b5563" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: "rgba(255,255,255,0.02)" }} contentStyle={{ backgroundColor: "#111", border: "1px solid #D4AF37", borderRadius: "8px" }} />
              <Bar dataKey="views" fill="#D4AF37" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </>
  );
}
