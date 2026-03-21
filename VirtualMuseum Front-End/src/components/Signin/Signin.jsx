"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, Chrome } from 'lucide-react';

export default function Signin() {
  return (
    /* 1. الحاوية الخارجية (الإطار البني) */
    <div className="min-h-screen w-full bg-[#A88A5B] p-4 md:p-8 lg:p-12"> 
      
      {/* 2. الحاوية الداخلية (الصفحة الفعلية) اللي واخدة زوايا دائرية وهيدخل جواها المحتوى */}
      <div className="relative w-full h-full min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-12rem)] rounded-[2.5rem] overflow-hidden flex items-center justify-center lg:justify-end md:p-12 lg:pr-32 shadow-2xl">
        
        {/* خلفية الصفحة (الصورة) */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700"
          style={{ 
            backgroundImage: `url('/assets/images/Signin.png')`,
            backgroundColor: '#1a1a1a' 
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* كارت تسجيل الدخول */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-[480px] bg-white/10 backdrop-blur-[15px] border border-white/20 p-8 md:p-12 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col"
        >
          <div className="mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome Back</h3>
            <p className="text-white/80 text-sm font-medium">Login to Egyptian Museum</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs text-white/90 font-semibold ml-1 text-left block">Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white border-none rounded-lg py-3.5 px-11 text-gray-800 focus:ring-2 focus:ring-[#D4AF37] transition-all placeholder:text-gray-400 text-sm outline-none"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-white/90 font-semibold ml-1 text-left block">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="Enter your password" 
                  className="w-full bg-white border-none rounded-lg py-3.5 px-11 text-gray-800 focus:ring-2 focus:ring-[#D4AF37] transition-all placeholder:text-gray-400 text-sm outline-none"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Eye className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={18} />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-white/90">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-none accent-[#D4AF37]" /> Remember me
              </label>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</a>
            </div>

            <div className="pt-2 space-y-4">
                <button 
                  type="button" 
                  className="w-full bg-white text-gray-700 py-3.5 rounded-lg font-semibold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all active:scale-[0.98] shadow-md text-sm"
                >
                  <img src="https://freelogopng.com/images/all_img/1657952440google-logo-png-transparent.png" alt="Google" className="w-5 h-5" />
                  Login with Google
                </button>

                <button 
                  type="submit" 
                  className="w-full bg-[#FF0000] text-white py-3.5 rounded-lg font-bold uppercase tracking-wider hover:bg-red-700 transition-all shadow-lg active:scale-[0.98] text-sm"
                >
                  Login
                </button>
            </div>

            <p className="text-center text-white/90 text-xs mt-4">
              Don't have an account? <a href="/Signup" className="text-blue-400 font-bold hover:underline">Sign up</a>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}