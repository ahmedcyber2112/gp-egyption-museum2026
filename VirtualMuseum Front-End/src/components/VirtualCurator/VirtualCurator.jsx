"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, Send } from 'lucide-react';

export default function VirtualCurator() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        
        {/* الجزء الأيسر: الشخصية الفرعونية (AI Avatar) */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          {/* دوائر إشعاع خلف الشخصية */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#D4AF37]/20 rounded-full blur-3xl animate-pulse"></div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            animate={{ 
              y: [0, -15, 0], // حركة طفو هادئة
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative z-10"
          >
            {/* هنا تضع صورة الشخصية الفرعونية المرسومة بالـ AI */}
            <img 
              src="/assets/images/ai-curator.png" // تأكد من إضافة صورة شفافة (PNG) لشخصية فرعونية
              alt="AI Curator"
              className="w-64 md:w-80 h-auto drop-shadow-[0_20px_50px_rgba(212,175,55,0.3)]"
            />
            
            {/* Bubble Talk - فقاعة الكلام */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl rounded-bl-none shadow-2xl border border-gray-100 max-w-[200px] z-20"
            >
              <p className="text-xs font-medium text-gray-800 leading-relaxed">
                "Welcome traveler! I am your <span className="text-[#D4AF37] font-bold">AI Guide</span>. Ask me anything about our treasures."
              </p>
              <div className="flex gap-1 mt-2">
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce delay-200"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* الجزء الأيمن: واجهة التفاعل السريع */}
        <div className="w-full md:w-1/2 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mb-6">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Next-Gen Interaction</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            Meet Your <span className="text-[#D4AF37]">Virtual Curator</span>
          </h2>
          
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Experience history like never before. Our AI-powered guide understands your questions and provides deep insights into the secrets of Ancient Egypt in real-time.
          </p>

          {/* Quick Chat Input Box (Mockup) */}
          <div className="relative max-w-md group">
            <div className="absolute inset-0 bg-[#D4AF37] rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white border border-gray-200 rounded-2xl p-2 flex items-center shadow-sm">
              <div className="pl-4 text-gray-400">
                <MessageSquare size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Ask: Who built the Pyramids?" 
                className="w-full bg-transparent border-none focus:ring-0 text-sm py-3 px-4 text-gray-700 outline-none"
              />
              <button className="bg-[#1A1A40] hover:bg-[#D4AF37] text-white p-3 rounded-xl transition-all shadow-lg">
                <Send size={18} />
              </button>
            </div>
            
            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["Golden Mask", "Mummification", "King Tut"].map((tag) => (
                <button key={tag} className="text-[10px] font-bold uppercase tracking-tighter px-3 py-1.5 bg-gray-50 text-gray-400 rounded-md border border-gray-100 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}