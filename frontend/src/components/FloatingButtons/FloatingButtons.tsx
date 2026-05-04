"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Bot } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FloatingButtons() {
  const pathname = usePathname();
  if (pathname !== "/") {
    return null;
  }

  return (
    // fixed: عشان يفضل ثابت في الشاشة
    // bottom-8 right-8: مكانه في أسفل اليمين
    // z-50: عشان يفضل دايماً فوق أي عنصر تاني في الصفحة
    <div className="fixed bottom-8 right-6 md:right-8 z-50 flex flex-col gap-4">
      
      {/* 1. مربع الـ AI Chat */}
      <Link href="/AIAssistant" className="group"> {/* عدل اللينك لصفحة الـ AI بتاعتك */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-14 h-14 bg-[#111]/80 backdrop-blur-md border border-[#D4AF37]/50 rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.15)] group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37] transition-all"
        >
          <Bot size={24} className="text-[#D4AF37]" />
          
          {/* Tooltip بتظهر لما تقف بالماوس */}
          <span className="absolute right-full mr-4 bg-[#111] text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Ask AI Guide
          </span>
        </motion.div>
      </Link>

      {/* 2. مربع حجز التذاكر */}
      <Link href="/Booking" className="group">
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-14 h-14 bg-[#D4AF37] rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:bg-white transition-all"
        >
          <Ticket size={24} className="text-black" />
          
          {/* Tooltip بتظهر لما تقف بالماوس */}
          <span className="absolute right-full mr-4 bg-[#D4AF37] text-black px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Book Tickets
          </span>
        </motion.div>
      </Link>

    </div>
  );
}