"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, TrendingUp, Calendar, Filter, Share2, BarChart3, PieChart as PieChartIcon, X, Sparkles } from "lucide-react";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from "recharts";
import { getAdminArtifacts, getAdminCategories, getAdminUsers } from "../../../lib/adminApi";

export default function Reports() {
  const [artifacts, setArtifacts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [intelligenceNote, setIntelligenceNote] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [artRes, userRes, catRes] = await Promise.all([
          getAdminArtifacts(),
          getAdminUsers(),
          getAdminCategories(),
        ]);
        setArtifacts(Array.isArray(artRes?.data) ? artRes.data : []);
        setUsers(Array.isArray(userRes?.data) ? userRes.data : []);
        setCategories(Array.isArray(catRes?.data) ? catRes.data : []);
      } catch (e: any) {
        setError(e?.message || "Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const monthlyData = useMemo(() => {
    const now = new Date();
    const months = [...Array(6)].map((_, idx) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - idx), 1);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      return { key, month: d.toLocaleString("en-US", { month: "short" }), artifacts: 0, users: 0, views: 0 };
    });
    artifacts.forEach((a) => {
      const d = new Date(a.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const m = months.find((x) => x.key === key);
      if (m) {
        m.artifacts += 1;
        m.views += a.modelFileId ? 12 : 4;
      }
    });
    users.forEach((u) => {
      const d = new Date(u.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const m = months.find((x) => x.key === key);
      if (m) m.users += 1;
    });
    return months.map(({ key, ...rest }) => rest);
  }, [artifacts, users]);

  const reports = useMemo(
    () => [
      { id: 1, name: "Live Visitor Report", description: `3D-ready artifacts: ${artifacts.filter((a) => a.modelFileId).length}`, date: new Date().toISOString().slice(0, 10), type: "Analytics" },
      { id: 2, name: "Artifact Inventory Report", description: `Total artifacts: ${artifacts.length}`, date: new Date().toISOString().slice(0, 10), type: "Inventory" },
      { id: 3, name: "User Engagement Report", description: `Active users: ${users.filter((u) => u.isActive).length}`, date: new Date().toISOString().slice(0, 10), type: "Users" },
      { id: 4, name: "Category Coverage Report", description: `Total categories: ${categories.length}`, date: new Date().toISOString().slice(0, 10), type: "Catalog" },
    ],
    [artifacts, users, categories],
  );

  const filteredReports = useMemo(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    return reports.filter((r) => {
      const typeOk = selectedType === "all" || r.type.toLowerCase() === selectedType.toLowerCase();
      const monthOk = selectedMonth === "all" || (selectedMonth === "current" ? r.date.startsWith(currentMonth) : r.date.startsWith(selectedMonth));
      return typeOk && monthOk;
    });
  }, [reports, selectedType, selectedMonth]);

  const downloadReport = (report: any) => {
    const payload = {
      report,
      generatedAt: new Date().toISOString(),
      totals: {
        artifacts: artifacts.length,
        users: users.length,
        categories: categories.length,
      },
      monthlyData,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.name.toLowerCase().replace(/\s+/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateIntelligence = () => {
    const topMonth = monthlyData.reduce(
      (best, row) => (row.views > best.views ? row : best),
      monthlyData[0] || { month: "N/A", views: 0, users: 0, artifacts: 0 },
    );
    setIntelligenceNote(
      `Intelligence generated: Peak engagement in ${topMonth.month} (${topMonth.views} interactions). Active users: ${users.filter((u) => u.isActive).length}.`,
    );
  };

  const exportAsExcel = (report: any) => {
    const rows = [
      ["Report", report.name],
      ["Type", report.type],
      ["GeneratedAt", new Date().toISOString()],
      [],
      ["Month", "Artifacts", "Users", "Views"],
      ...monthlyData.map((m) => [m.month, String(m.artifacts), String(m.users), String(m.views)]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.name.toLowerCase().replace(/\s+/g, "-")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  const exportAsPdf = (report: any) => {
    const content = `
      <html>
      <head><title>${report.name}</title></head>
      <body style="font-family: Arial, sans-serif; padding: 24px;">
        <h1>${report.name}</h1>
        <p><strong>Type:</strong> ${report.type}</p>
        <p><strong>Date:</strong> ${report.date}</p>
        <p><strong>Description:</strong> ${report.description}</p>
        <h3>Monthly Data</h3>
        <table border="1" cellspacing="0" cellpadding="6" style="border-collapse: collapse;">
          <tr><th>Month</th><th>Artifacts</th><th>Users</th><th>Views</th></tr>
          ${monthlyData.map((m) => `<tr><td>${m.month}</td><td>${m.artifacts}</td><td>${m.users}</td><td>${m.views}</td></tr>`).join("")}
        </table>
      </body>
      </html>
    `;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(content);
    w.document.close();
    w.focus();
    w.print();
    setShowExportModal(false);
  };

  return (
    <div className="p-8 space-y-10 min-h-screen pb-20">
      {loading ? <div className="text-sm text-gray-400">Loading reports...</div> : null}
      {error ? <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300 text-sm">{error}</div> : null}
      
      {/* ================= Header ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Insight Archives</h1>
          <p className="text-gray-400 text-sm">Synthesize complex museum data into actionable intelligence.</p>
        </motion.div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-widest"
          >
            <Filter size={16} /> Filter Data
          </button>
          <button
            onClick={generateIntelligence}
            className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-black rounded-xl hover:bg-[#b5952f] transition-all font-black text-xs uppercase tracking-widest shadow-[0_10px_20px_rgba(212,175,55,0.2)]"
          >
            <FileText size={16} /> Generate Intelligence
          </button>
        </div>
      </div>
      {intelligenceNote ? (
        <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-3 text-sm text-[#f5e6b0] inline-flex items-center gap-2">
          <Sparkles size={14} /> {intelligenceNote}
        </div>
      ) : null}

      {/* ================= Quick Stats ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Institutional Growth", value: `${Math.max(0, users.length + artifacts.length)} total`, icon: TrendingUp, color: "text-emerald-500", desc: "Based on current DB totals" },
          { label: "Archived Dossiers", value: String(reports.length), icon: BarChart3, color: "text-[#D4AF37]", desc: "Generated from live database" },
          { label: "Latest Compilation", value: new Date().toLocaleDateString(), icon: Calendar, color: "text-blue-500", desc: "Last automatic snapshot" },
        ].map((stat, i) => (
          <motion.div 
            key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-[#111] border border-white/5 rounded-[2rem] p-8 shadow-xl hover:border-[#D4AF37]/20 transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-[#D4AF37]/10 transition-colors">
                <stat.icon className={stat.color} size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em]">{stat.label}</p>
                <p className="text-3xl font-mono font-bold text-white">{stat.value}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 font-medium italic">{stat.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* ================= Advanced Analytics Charts ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Artifact Acquisition BarChart */}
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
                cursor={{ fill: 'rgba(212, 175, 55, 0.05)' }}
              />
              <Bar dataKey="artifacts" fill="#d4af37" radius={[10, 10, 0, 0]} barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* User Engagement AreaChart */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-serif font-bold text-white">Engagement Resonance</h3>
            <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest bg-[#D4AF37]/10 px-3 py-1 rounded-full">User Growth Trend</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
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

      {/* ================= Intelligence Reports List ================= */}
      <div className="bg-[#111] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl font-serif font-bold text-white">Available Intelligence Dossiers</h3>
          <button className="text-gray-500 hover:text-[#D4AF37] transition-all"><Share2 size={20}/></button>
        </div>
        
        <div className="space-y-4">
          {filteredReports.map((report, idx) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col md:flex-row items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-[1.5rem] hover:border-[#D4AF37]/30 hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-center gap-6 mb-4 md:mb-0">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">{report.name}</div>
                  <div className="text-xs text-gray-500 font-medium tracking-wide">{report.description}</div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 rounded-full text-[9px] font-black uppercase tracking-widest">
                    {report.type}
                  </span>
                  <div className="text-[10px] font-mono text-gray-600 mt-2">{report.date}</div>
                </div>
                <button
                  onClick={() => {
                    setSelectedReport(report);
                    setShowExportModal(true);
                  }}
                  className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl group-hover:bg-[#D4AF37] group-hover:text-black transition-all font-black text-[10px] uppercase tracking-widest active:scale-95"
                >
                  <Download size={14} /> Access Data
                </button>
              </div>
            </motion.div>
          ))}
          {filteredReports.length === 0 ? (
            <div className="text-center text-sm text-gray-500 py-8">No reports match current filters.</div>
          ) : null}
        </div>
      </div>

      {showFilterModal ? (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowFilterModal(false)} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0a0a0f] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-serif font-bold text-white">Filter Intelligence Data</h3>
              <button onClick={() => setShowFilterModal(false)} className="p-2 rounded-xl border border-white/10 text-gray-400 hover:text-white"><X size={16} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Report Type</label>
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="mt-2 w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                  <option value="all" className="bg-[#111]">All Types</option>
                  <option value="analytics" className="bg-[#111]">Analytics</option>
                  <option value="inventory" className="bg-[#111]">Inventory</option>
                  <option value="users" className="bg-[#111]">Users</option>
                  <option value="catalog" className="bg-[#111]">Catalog</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Time Scope</label>
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="mt-2 w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                  <option value="all" className="bg-[#111]">All Time</option>
                  <option value="current" className="bg-[#111]">Current Month</option>
                </select>
              </div>
              <button onClick={() => setShowFilterModal(false)} className="w-full px-4 py-3 rounded-xl bg-[#D4AF37] text-black font-black uppercase tracking-widest text-xs">Apply Filters</button>
            </div>
          </motion.div>
        </div>
      ) : null}

      {showExportModal && selectedReport ? (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowExportModal(false)} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0a0a0f] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-serif font-bold text-white">Export Report</h3>
              <button onClick={() => setShowExportModal(false)} className="p-2 rounded-xl border border-white/10 text-gray-400 hover:text-white"><X size={16} /></button>
            </div>
            <p className="text-sm text-gray-400 mb-5">Choose export format for <span className="text-[#D4AF37] font-bold">{selectedReport.name}</span>.</p>
            <div className="grid grid-cols-1 gap-3">
              <button onClick={() => exportAsPdf(selectedReport)} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-bold hover:border-[#D4AF37]/40 hover:text-[#D4AF37]">Download as PDF</button>
              <button onClick={() => exportAsExcel(selectedReport)} className="w-full px-4 py-3 rounded-xl bg-[#D4AF37] text-black font-black">Download as Excel</button>
              <button onClick={() => downloadReport(selectedReport)} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-transparent text-gray-300 font-bold">Raw JSON</button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}