"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PlusCircle, 
  Settings2, 
  Eraser, 
  History, 
  XCircle, 
  Hourglass, 
  Map 
} from "lucide-react";
import { createEra, deleteEra, getAdminEras, updateEra } from "../../../lib/adminApi";

export default function HistoricalEras() {
  const [eras, setEras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAdminEras();
      setEras(Array.isArray(res?.data) ? res.data : []);
    } catch (e: any) {
      setError(e?.message || "Failed to load eras.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setName("");
    setStartYear("");
    setEndYear("");
    setShowAddModal(true);
    setError("");
    setSuccess("");
  };

  const openEdit = (era: any) => {
    setEditingId(era.id);
    setName(era.name || "");
    setStartYear(era.startYear ?? "");
    setEndYear(era.endYear ?? "");
    setShowAddModal(true);
    setError("");
    setSuccess("");
  };

  const saveEra = async () => {
    if (!name.trim()) {
      setError("Era name is required.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const payload: any = {
        name: name.trim(),
        startYear: startYear === "" ? null : Number(startYear),
        endYear: endYear === "" ? null : Number(endYear),
      };
      if (editingId) {
        await updateEra(editingId, payload);
        setSuccess("Era updated.");
      } else {
        await createEra(payload);
        setSuccess("Era created.");
      }
      setShowAddModal(false);
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to save era.");
    } finally {
      setSaving(false);
    }
  };

  const removeEra = async (era: any) => {
    if (!window.confirm(`Delete era "${era.name}"?`)) return;
    setError("");
    setSuccess("");
    try {
      await deleteEra(era.id);
      setSuccess("Era deleted.");
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to delete era.");
    }
  };

  return (
    <div className="p-8 space-y-10 min-h-screen">
      
      {/* ================= Header ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Chronological Eras</h1>
          <p className="text-gray-400 text-sm">Define and manage the historical timelines of the GEM collection.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] text-black font-black uppercase tracking-tighter rounded-xl hover:bg-[#b5952f] transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] active:scale-95"
        >
          <PlusCircle className="w-5 h-5" /> {/* أيقونة إضافة دائرية أشيك */}
          Create New Era
        </button>
      </div>

      {(error || success) && (
        <div className="space-y-2">
          {error ? <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300 text-sm">{error}</div> : null}
          {success ? <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-300 text-sm">{success}</div> : null}
        </div>
      )}

      {/* ================= Eras Grid ================= */}
      {loading ? (
        <div className="text-gray-400 text-sm">Loading eras...</div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eras.map((era, index) => (
          <motion.div 
            key={era.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-[#111] border border-white/5 rounded-[2.5rem] p-8 hover:border-[#D4AF37]/30 transition-all duration-500 shadow-2xl overflow-hidden"
          >
            {/* إضاءة خلفية ناعمة */}
            <div 
              className="absolute -right-20 -top-20 w-40 h-40 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 blur-[50px] rounded-full"
              style={{ backgroundColor: era.color }}
            />

            <div className="flex items-start justify-between mb-8 relative z-10">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner transition-transform duration-500 group-hover:rotate-[360deg]"
                style={{ backgroundColor: `#d4af3720` }}
              >
                <History className="w-7 h-7 text-[#d4af37]" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(era)} className="p-2 text-gray-500 hover:text-[#D4AF37] hover:bg-white/5 rounded-full transition-all">
                  <Settings2 size={18} />
                </button>
                <button onClick={() => removeEra(era)} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/5 rounded-full transition-all">
                  <Eraser size={18} />
                </button>
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              <div>
                <h3 className="text-2xl font-serif font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
                  {era.name}
                </h3>
                <div className="flex items-center gap-2 text-[#D4AF37] text-[10px] font-black uppercase tracking-widest bg-[#D4AF37]/5 px-3 py-1 rounded-full w-fit border border-[#D4AF37]/20">
                  <Hourglass size={10} /> {(era.startYear ?? "N/A")} - {(era.endYear ?? "N/A")}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-gray-600 tracking-[0.2em]">Identifier</span>
                <span className="text-xs font-mono font-bold text-white">{era.id}</span>
              </div>
            </div>
            
            {/* نقش هيروغليفي للزينة */}
            <div className="absolute -bottom-4 -right-2 text-[5rem] opacity-[0.02] text-white font-serif select-none pointer-events-none group-hover:opacity-[0.05] transition-opacity">
              𓋹
            </div>
          </motion.div>
        ))}
      </div>
      )}

      {/* ================= Add Era Modal ================= */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] p-10 w-full max-w-xl relative z-10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20">
                     <Map className="text-[#D4AF37]" size={24}/> {/* أيقونة الخريطة لتدشين حقبة جديدة */}
                   </div>
                   <h2 className="text-2xl font-serif font-bold text-white">New Historical Era</h2>
                </div>
                <button onClick={() => !saving && setShowAddModal(false)} className="p-2 text-gray-500 hover:text-white transition-colors bg-white/5 rounded-full">
                  <XCircle size={20} /> {/* أيقونة غلق دائرية */}
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-3">Era Designation</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all font-medium"
                    placeholder="e.g., Middle Kingdom"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-3">Time Range</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={startYear}
                      onChange={(e) => setStartYear(e.target.value)}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all font-medium"
                      placeholder="Start Year"
                    />
                    <input
                      type="number"
                      value={endYear}
                      onChange={(e) => setEndYear(e.target.value)}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all font-medium"
                      placeholder="End Year"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button onClick={saveEra} disabled={saving} className="flex-1 px-6 py-4 bg-[#D4AF37] text-black font-black uppercase tracking-widest rounded-2xl hover:bg-[#b5952f] transition-all shadow-xl active:scale-95 disabled:opacity-60">
                    {saving ? "Saving..." : "Save Era"}
                  </button>
                  <button
                    onClick={() => !saving && setShowAddModal(false)}
                    className="flex-1 px-6 py-4 bg-white/5 text-gray-400 font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/10"
                  >
                    Discard
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}