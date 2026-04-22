"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { resetPasswordWithOtp } from "../../lib/authApi";

export default function ResetPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialEmail = useMemo(
        () => (searchParams?.get("email") || "").trim(),
        [searchParams],
    );

    const [email, setEmail] = useState(initialEmail);
    const [otpCode, setOtpCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!email && initialEmail) setEmail(initialEmail);
    }, [email, initialEmail]);

    const handleReset = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (!otpCode.trim()) {
            setError("Please enter the OTP code.");
            return;
        }

        setLoading(true);
        try {
            const res = await resetPasswordWithOtp({
                email: email.trim(),
                otpCode: otpCode.trim(),
                newPassword,
                confirmPassword,
            });

            if (!res?.success) {
                throw new Error(res?.message || "Reset failed.");
            }

            setSuccessMessage(
                "Password reset successful. Redirecting to sign in...",
            );
            setTimeout(() => router.push("/Signin"), 900);
        } catch (err) {
            setError(err?.message || "Reset failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#A88A5B] to-[#8B7355] flex items-center justify-center p-4 sm:p-6 lg:p-8">
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
                        Reset Password
                    </h2>
                    <p className="text-sm text-gray-600">
                        Enter the OTP code and set your new password.
                    </p>
                </div>

                <form onSubmit={handleReset} className="space-y-4">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 p-3 rounded-lg text-red-700 text-sm font-medium">
                            {error}
                        </motion.div>
                    )}

                    {successMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-emerald-700 text-sm font-medium">
                            {successMessage}
                        </motion.div>
                    )}

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

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-700">
                            OTP Code
                        </label>
                        <input
                            type="text"
                            required
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            placeholder="Enter 6-digit code"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 text-sm text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-700">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
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

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={
                                    showConfirmPassword ? "text" : "password"
                                }
                                required
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="••••••••"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 pl-10 text-sm text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                            />
                            <Lock
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={16}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                {showConfirmPassword ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8950A] text-gray-900 py-2.5 rounded-lg font-bold text-sm hover:shadow-lg transition-all disabled:opacity-70 active:scale-95">
                        {loading ? "Resetting..." : "Reset password"}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        <Link
                            href="/Signin"
                            className="text-[#D4AF37] font-bold hover:text-[#B8950A]">
                            Back to Sign In
                        </Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
}

