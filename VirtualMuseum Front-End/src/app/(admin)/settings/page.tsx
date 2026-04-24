"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { 
  Save, User, Bell, Shield, Database, 
  Palette, Lock, Globe, Mail, CheckCircle 
} from "lucide-react";
import { getCurrentUser } from "../../../lib/authStorage";
import { getMyProfile, updateMyProfile } from "../../../lib/authApi";
import { getAdminArtifacts, getAdminCategories, getAdminUsers } from "../../../lib/adminApi";

export default function settings() {
  const [profile, setProfile] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [notifArtifacts, setNotifArtifacts] = useState(true);
  const [notifSystem, setNotifSystem] = useState(true);
  const [notifMetrics, setNotifMetrics] = useState(true);
  const [stats, setStats] = useState({ users: 0, artifacts: 0, categories: 0 });

  useEffect(() => {
    const load = async () => {
      const me = getCurrentUser();
      try {
        const [profileRes, uRes, aRes, cRes] = await Promise.all([
          getMyProfile(),
          getAdminUsers(),
          getAdminArtifacts(),
          getAdminCategories(),
        ]);
        const p = profileRes?.data || {
          fullName: me?.fullName || "",
          email: me?.email || "",
          region: me?.region || "",
        };
        setProfile(p);
        setName(p.fullName || "");
        setEmail(p.email || "");
        setRegion(p.region || "");
        setStats({
          users: Array.isArray(uRes?.data) ? uRes.data.length : 0,
          artifacts: Array.isArray(aRes?.data) ? aRes.data.length : 0,
          categories: Array.isArray(cRes?.data) ? cRes.data.length : 0,
        });
      } catch {
        setProfile({
          fullName: me?.fullName || "",
          email: me?.email || "",
          region: me?.region || "",
        });
      }
      const notifRaw = localStorage.getItem("admin_settings_notifications");
      if (notifRaw) {
        try {
          const parsed = JSON.parse(notifRaw);
          setNotifArtifacts(!!parsed.artifacts);
          setNotifSystem(!!parsed.system);
          setNotifMetrics(!!parsed.metrics);
        } catch {}
      }
    };
    load();
  }, []);

  const roleLabel = useMemo(() => {
    const role = (getCurrentUser()?.role || "admin").toString();
    return role.charAt(0).toUpperCase() + role.slice(1);
  }, []);

  const saveAll = async () => {
    setSaving(true);
    setMessage("");
    try {
      await updateMyProfile({
        fullName: name.trim(),
        region: region.trim(),
      });
      const raw = localStorage.getItem("currentUser");
      const current = raw ? JSON.parse(raw) : {};
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...current,
          fullName: name.trim(),
          region: region.trim(),
          email: email.trim(),
        }),
      );
      localStorage.setItem(
        "admin_settings_notifications",
        JSON.stringify({
          artifacts: notifArtifacts,
          system: notifSystem,
          metrics: notifMetrics,
        }),
      );
      window.dispatchEvent(new Event("storage"));
      setMessage("Settings synchronized with live profile data.");
    } catch (e: any) {
      setMessage(e?.message || "Failed to synchronize settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 space-y-10 min-h-screen pb-24">
      
      {/* ================= Header ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Core Configurations</h1>
          <p className="text-gray-400 text-sm italic">"Tailoring the digital heart of the Grand Museum."</p>
        </motion.div>
        
        <button onClick={saveAll} disabled={saving} className="flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-black font-black uppercase tracking-widest rounded-2xl hover:bg-[#b5952f] transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)] active:scale-95 group disabled:opacity-60">
          <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
          {saving ? "Synchronizing..." : "Synchronize Settings"}
        </button>
      </div>
      {message ? <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-gray-300">{message}</div> : null}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* ================= 1. Profile Dossier ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl space-y-8"
        >
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl"><User className="text-[#D4AF37]" size={24} /></div>
            <h3 className="text-xl font-serif font-bold text-white">Administrator Identity</h3>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Official Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Registry Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Region</label>
              <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Current Authority Role</label>
              <div className="w-full px-6 py-4 bg-white/[0.02] border border-white/5 rounded-2xl text-[#D4AF37] font-bold flex items-center gap-2">
                <Shield size={16} /> {roleLabel}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= 2. Security Protocols ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl space-y-8"
        >
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
            <div className="p-3 bg-red-500/10 rounded-2xl"><Lock className="text-red-500" size={24} /></div>
            <h3 className="text-xl font-serif font-bold text-white">Security & Encryption</h3>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Master Access Key</label>
              <input type="password" placeholder="••••••••••••" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-red-500/50 transition-all" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">New Authority Token</label>
                <input type="password" placeholder="Define new key" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Re-verify Token</label>
                <input type="password" placeholder="Confirm new key" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= 3. Notification Hub ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl space-y-8"
        >
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
            <div className="p-3 bg-blue-500/10 rounded-2xl"><Bell className="text-blue-500" size={24} /></div>
            <h3 className="text-xl font-serif font-bold text-white">Alert Transmissions</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { title: "Artifact Ingestion", desc: "Alert when new items enter the registry" },
              { title: "System Anomalies", desc: "Notify upon workflow or 3D render failures" },
              { title: "Curiosity Metrics", desc: "Daily summary of user interactions" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-3xl group hover:bg-white/[0.04] transition-all">
                <div>
                  <div className="text-sm font-bold text-white mb-1">{item.title}</div>
                  <div className="text-[10px] text-gray-500 font-medium">{item.desc}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={i === 0 ? notifArtifacts : i === 1 ? notifSystem : notifMetrics}
                    onChange={(e) => {
                      if (i === 0) setNotifArtifacts(e.target.checked);
                      if (i === 1) setNotifSystem(e.target.checked);
                      if (i === 2) setNotifMetrics(e.target.checked);
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37] after:peer-checked:bg-white"></div>
                </label>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ================= 4. System & Aesthetics ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl space-y-8"
        >
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
            <div className="p-3 bg-emerald-500/10 rounded-2xl"><Database className="text-emerald-500" size={24} /></div>
            <h3 className="text-xl font-serif font-bold text-white">Core Engine Settings</h3>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Linguistic Framework</label>
              <div className="relative group">
                <Globe size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" />
                <select className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all appearance-none cursor-pointer font-medium">
                  <option className="bg-[#111]">Ancient Knowledge (Arabic/English)</option>
                  <option className="bg-[#111]">Multilingual Expansion</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
               <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Palette size={12} /> Visual Signature (Aesthetics)
               </label>
               <div className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-3xl">
                  <div className="text-sm font-bold text-white italic">"Royal Necropolis Dark"</div>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 bg-[#050505] border border-[#D4AF37] rounded-xl flex items-center justify-center text-[#D4AF37]"><CheckCircle size={14} /></div>
                    <div className="w-10 h-10 bg-[#1a1a1f] border border-white/5 rounded-xl"></div>
                    <div className="w-10 h-10 bg-[#8b6f47] border border-white/5 rounded-xl"></div>
                  </div>
               </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Users</div>
                <div className="text-white font-black text-2xl mt-1">{stats.users}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Artifacts</div>
                <div className="text-white font-black text-2xl mt-1">{stats.artifacts}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Categories</div>
                <div className="text-white font-black text-2xl mt-1">{stats.categories}</div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}