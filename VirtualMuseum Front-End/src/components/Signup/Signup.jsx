"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setError('Please accept the terms to continue.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem('userName', name || username || 'New User');
      localStorage.setItem('isLoggedIn', 'false');
      router.push('/Signin');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#A88A5B] to-[#8B7355] flex items-center justify-center p-4 sm:p-5 lg:p-6">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('/assets/images/Signup.png')`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[520px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 sm:p-6"
      >
        <div className="mb-3">
          <Image
            src="/assets/images/eh.png"
            alt="Grand Egyptian Museum Logo"
            width={120}
            height={46}
            className="h-9 w-auto object-contain mb-2"
            priority
          />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-0.5">Create Account</h2>
          <p className="text-xs sm:text-sm text-gray-600">Join the Grand Egyptian Museum experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 p-2.5 rounded-lg text-red-700 text-xs sm:text-sm font-medium"
            >
              {error}
            </motion.div>
          )}

          <div className="grid gap-3 md:grid-cols-2 md:gap-2.5">
            <div className="space-y-1.5">
            <label className="text-[11px] sm:text-xs font-semibold text-gray-700">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 pl-10 text-sm text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
            </div>

            <div className="space-y-1.5">
            <label className="text-[11px] sm:text-xs font-semibold text-gray-700">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 pl-10 text-sm text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 md:gap-2.5">
            <div className="space-y-1.5">
            <label className="text-[11px] sm:text-xs font-semibold text-gray-700">Username</label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="egyptophile"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 pl-10 text-sm text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
            </div>

            <div className="space-y-1.5">
            <label className="text-[11px] sm:text-xs font-semibold text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 pl-10 text-sm text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] sm:text-xs font-semibold text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 pl-10 text-sm text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <label className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="rounded border-gray-300 accent-[#D4AF37] w-4 h-4 mt-0.5"
            />
            <span className="leading-4">
              I agree to the <span className="font-semibold text-gray-800">Terms & Conditions</span> and <span className="font-semibold text-gray-800">Privacy Policy</span>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-[#D4AF37] to-[#B8950A] text-gray-900 py-1.5 rounded-lg font-bold text-sm hover:shadow-lg transition-all disabled:opacity-70 active:scale-95"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-500 font-medium">Or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <button
            type="button"
            className="w-full bg-white border border-gray-200 text-gray-700 py-1.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-95"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" fill="#1f2937" />
              <circle cx="12" cy="12" r="9" fill="white" />
              <path d="M7 12a5 5 0 1 1 10 0 5 5 0 0 1-10 0z" fill="#EA4335" />
              <circle cx="16" cy="12" r="2" fill="#34A853" />
              <circle cx="8" cy="8" r="2" fill="#FBBC05" />
            </svg>
            Google
          </button>
        </form>

        <p className="text-center text-xs sm:text-sm text-gray-600 mt-3">
          Already have an account? <Link href="/Signin" className="text-[#D4AF37] font-bold hover:text-[#B8950A]">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
