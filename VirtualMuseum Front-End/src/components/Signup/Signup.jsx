"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, User, Phone, Chrome } from 'lucide-react';
import Link from 'next/link';

export default function Signup() {
  return (
    /* 1. الحاوية الخارجية (الإطار البيج) */
    <div className="min-h-screen w-full bg-[#E6D5B8] p-4 md:p-8 lg:p-10 flex items-center justify-center">
      
      {/* 2. الحاوية الداخلية (الكتاب المفتوح أو القسمين) */}
      <div className="relative w-full max-w-6xl h-full min-h-[85vh] bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border-[3px] border-[#7AB2D3]">
        
        {/* الجانب الأيسر: الفورم (اللون الأبيض) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white z-10">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
          </div>

          <form className="space-y-4">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 ml-1">Name</label>
              <div className="relative">
                <input type="text" placeholder="Enter your name" className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-10 text-sm outline-none focus:border-purple-500 transition-all" />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            {/* Email or Phone */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 ml-1">Email or Phone no.</label>
              <div className="relative">
                <input type="text" placeholder="Enter your email or phone" className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-10 text-sm outline-none focus:border-purple-500 transition-all" />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 ml-1">Username</label>
              <div className="relative">
                <input type="text" placeholder="Choose a username" className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-10 text-sm outline-none focus:border-purple-500 transition-all" />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 ml-1">Password</label>
              <div className="relative">
                <input type="password" placeholder="Create a password" className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-10 text-sm outline-none focus:border-purple-500 transition-all" />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={16} />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 ml-1">Confirm Password</label>
              <div className="relative">
                <input type="password" placeholder="Confirm a password" className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-10 text-sm outline-none focus:border-purple-500 transition-all" />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={16} />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 py-2">
              <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
              <span className="text-[10px] text-gray-500 font-medium">
                I agree to all terms and <span className="text-purple-600 cursor-pointer">Privacy Policy</span>
              </span>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-amber-500 text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-amber-900 transition-all active:scale-[0.98]">
                Sign Up
              </button>
              
              <button type="button" className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-[0.98]">
                                  <img src="https://freelogopng.com/images/all_img/1657952440google-logo-png-transparent.png" alt="Google" className="w-5 h-5" />

                signup with Google
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-4 font-medium">
              Already have an account? <Link href="/Signin" className="text-orange-400 font-bold hover:underline">Log In</Link>
            </p>
          </form>
        </div>

        {/* الجانب الأيمن: الصورة والزخارف (النص الفرعوني) */}
        <div className="hidden md:flex md:w-1/2 relative bg-[#F5EFE6]">
          {/* شريط الهيروغليفية الفاصل */}
          

          {/* الصورة الأساسية */}
          <div 
            className="w-full h-full bg-cover bg-right"
            style={{ 
              backgroundImage: `url('/assets/images/Signup.png')`, // ضع مسار صورتك هنا
            }}
          >
            {/* Overlay خفيف لضبط الإضاءة */}
            <div className="w-full h-full bg-black/5 backdrop-contrast-125"></div>
          </div>
        </div>

      </div>
    </div>
  );
}