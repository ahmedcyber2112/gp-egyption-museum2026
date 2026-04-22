"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "../../lib/authApi";
import { setAuthSession } from "../../lib/authStorage";
import GoogleAuthButton from "../Auth/GoogleAuthButton";

export default function Signin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await loginUser({
                email: email.trim(),
                password,
            });

            if (!response?.success || !response?.data) {
                throw new Error(response?.message || "Login failed.");
            }

            setAuthSession(response.data);

            if ((response.data.role || "").toLowerCase() === "admin") {
                router.push("/dashboard");
            } else {
                router.push("/");
            }
        } catch (err) {
            setError(err?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#A88A5B] to-[#8B7355] flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
                style={{
                    backgroundImage: `url('/assets/images/Signin.png')`,
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8">
                {/* Header */}
                <div className="mb-6">
                    <Image
                        src="/assets/images/eh.png"
                        alt="Grand Egyptian Museum Logo"
                        width={140}
                        height={54}
                        className="h-11 w-auto object-contain mb-3"
                        priority
                    />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                        Welcome Back
                    </h2>
                    <p className="text-sm text-gray-600">
                        Sign in to your account
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 p-3 rounded-lg text-red-700 text-sm font-medium">
                            {error}
                        </motion.div>
                    )}

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-700">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 pl-10 text-sm text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                            />
                            <Mail
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={16}
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 pl-10 text-sm text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                            />
                            <Lock
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={16}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                {showPassword ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex items-center justify-between text-xs">
                        <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 accent-[#D4AF37] w-4 h-4"
                            />
                            Remember me
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-[#D4AF37] hover:text-[#B8950A] font-semibold">
                            Forgot?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8950A] text-gray-900 py-2.5 rounded-lg font-bold text-sm hover:shadow-lg transition-all disabled:opacity-70 active:scale-95">
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                    {/* Divider */}
                    <div className="relative flex items-center gap-3">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-xs text-gray-500 font-medium">
                            Or
                        </span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    {/* Google Button */}
                    <GoogleAuthButton />
                </form>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-gray-600 mt-5">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/Signup"
                        className="text-[#D4AF37] font-bold hover:text-[#B8950A]">
                        Sign Up
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
