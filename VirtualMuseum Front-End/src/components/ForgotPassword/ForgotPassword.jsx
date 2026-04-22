"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { requestPasswordReset } from "../../lib/authApi";

export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRequest = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setLoading(true);

        try {
            const res = await requestPasswordReset({ email: email.trim() });
            if (!res?.success) {
                throw new Error(res?.message || "Could not request reset code.");
            }

            setSuccessMessage(
                "If an account exists for this email, a reset code has been sent. Redirecting...",
            );
            setTimeout(
                () =>
                    router.push(
                        `/reset-password?email=${encodeURIComponent(
                            email.trim(),
                        )}`,
                    ),
                800,
            );
        } catch (err) {
            setError(err?.message || "Request failed. Please try again.");
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
                        Forgot Password
                    </h2>
                    <p className="text-sm text-gray-600">
                        We’ll send you a 6-digit code to reset your password.
                    </p>
                </div>

                <form onSubmit={handleRequest} className="space-y-4">
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8950A] text-gray-900 py-2.5 rounded-lg font-bold text-sm hover:shadow-lg transition-all disabled:opacity-70 active:scale-95">
                        {loading ? "Sending..." : "Send reset code"}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Remembered your password?{" "}
                        <Link
                            href="/Signin"
                            className="text-[#D4AF37] font-bold hover:text-[#B8950A]">
                            Sign In
                        </Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
}

