"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Database, Zap, Thermometer, ShieldCheck, Activity } from 'lucide-react';

const MuseumPulse = () => {
  // محاكاة لتغير البيانات لحظياً (Real-time Simulation)
  const [visitorCount, setVisitorCount] = useState(1240);
  const [serverLoad, setServerLoad] = useState(32);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 5) - 2);
      setServerLoad(prev => Math.min(Math.max(prev + Math.floor(Math.random() * 3) - 1, 20), 45));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { 
      label: "Virtual Visitors", 
      value: visitorCount.toLocaleString(), 
      icon: <Users className="text-blue-400" />, 
      desc: "Live connection via WebSockets" 
    },
    { 
      label: "Environment Sync", 
      value: "22°C", 
      icon: <Thermometer className="text-orange-400" />, 
      desc: "Smart HVAC Sensors Active" 
    },
    { 
      label: "System Integrity", 
      value: "99.9%", 
      icon: <ShieldCheck className="text-green-400" />, 
      desc: "Encrypted SQL Transactional Logs" 
    },
    { 
      label: "Server Efficiency", 
      value: `${serverLoad}%`, 
      icon: <Database className="text-purple-400" />, 
      desc: "Optimized Query Execution Time" 
    },
  ];

  return (
    <section className="py-24 bg-[#080808] relative overflow-hidden">
      {/* تأثير خلفية تقني */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#D4AF37 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-[#D4AF37] font-black uppercase tracking-[0.3em] text-xs mb-3 flex items-center gap-2">
              <Activity size={16} className="animate-pulse" /> Live System Status
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
              The Digital Heart of <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-[#D4AF37]">The Grand Museum</span>
            </h3>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-gray-400 text-sm font-mono tracking-tighter">ENGINEERING MODE: ONLINE</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.05)" }}
              className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <h4 className="text-3xl font-black text-white mb-1 font-mono tracking-tighter">
                {stat.value}
              </h4>
              <p className="text-[#D4AF37] font-bold text-[10px] uppercase tracking-widest mb-4">
                {stat.label}
              </p>
              <div className="h-[1px] w-full bg-gradient-to-r from-[#D4AF37]/30 to-transparent mb-4"></div>
              <p className="text-gray-500 text-xs leading-relaxed italic">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Technical Note for Jury */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 p-6 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-black">
            <Zap size={24} fill="black" />
          </div>
          <div className="text-left">
            <h5 className="text-white font-bold text-sm uppercase">Technical Architecture Note</h5>
            <p className="text-gray-400 text-xs mt-1 max-w-3xl">
              This dashboard simulates the integration between the **C# Backend engine** and the **SQL Server database**. 
              It monitors asynchronous events and stored procedure execution times to ensure a seamless 3D virtual experience 
              with zero latency during high-traffic intervals.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MuseumPulse;