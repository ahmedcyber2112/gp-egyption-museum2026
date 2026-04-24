"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { registerUser, sendOtp, verifyOtp } from "../../lib/authApi";
import GoogleAuthButton from "../Auth/GoogleAuthButton";
import { pushAdminNotification } from "../../lib/adminEvents";

export default function Signup() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [region, setRegion] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!agreeTerms) {
            setError("Please accept the terms to continue.");
            return;
        }

        setLoading(true);

        try {
            const registerResponse = await registerUser({
                fullName: name.trim(),
                email: email.trim(),
                region: region.trim(),
                password,
            });

            if (!registerResponse?.success) {
                throw new Error(
                    registerResponse?.message || "Registration failed.",
                );
            }

            const otpResponse = await sendOtp({ email: email.trim() });
            if (!otpResponse?.success) {
                throw new Error(otpResponse?.message || "Could not send OTP.");
            }

            setOtpSent(true);
            setSuccessMessage(
                "Account created. OTP sent to your email. Enter the code to verify your account.",
            );
        } catch (err) {
            setError(err?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otpCode.trim()) {
            setError("Please enter the OTP code.");
            return;
        }

        setError("");
        setSuccessMessage("");
        setLoading(true);

        try {
            const verifyResponse = await verifyOtp({
                email: email.trim(),
                code: otpCode.trim(),
            });

            if (!verifyResponse?.success) {
                throw new Error(
                    verifyResponse?.message || "OTP verification failed.",
                );
            }

            setEmailVerified(true);
            pushAdminNotification({
                type: "account-created",
                title: "New account created",
                message: `${name.trim() || email.trim()} joined the platform.`,
                link: "/Users",
            });
            setSuccessMessage(
                "Email verified successfully. Redirecting to sign in...",
            );
            const nextPath = searchParams.get("next");
            setTimeout(
                () =>
                    router.push(
                        nextPath
                            ? `/Signin?next=${encodeURIComponent(nextPath)}`
                            : "/Signin",
                    ),
                900,
            );
        } catch (err) {
            setError(err?.message || "OTP verification failed.");
        } finally {
            setLoading(false);
        }
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
                className="relative z-10 w-full max-w-[520px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 sm:p-6">
                <div className="mb-3">
                    <Image
                        src="/assets/images/eh.png"
                        alt="Grand Egyptian Museum Logo"
                        width={120}
                        height={46}
                        className="h-9 w-auto object-contain mb-2"
                        priority
                    />
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-0.5">
                        Create Account
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600">
                        Join the Grand Egyptian Museum experience
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2.5">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 p-2.5 rounded-lg text-red-700 text-xs sm:text-sm font-medium">
                            {error}
                        </motion.div>
                    )}

                    {successMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-emerald-700 text-xs sm:text-sm font-medium">
                            {successMessage}
                        </motion.div>
                    )}

                    <div className="grid gap-3 md:grid-cols-2 md:gap-2.5">
                        <div className="space-y-1.5">
                            <label className="text-[11px] sm:text-xs font-semibold text-gray-700">
                                Full Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 pl-10 text-sm text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                                />
                                <User
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={16}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] sm:text-xs font-semibold text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 pl-10 text-sm text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                                />
                                <Mail
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={16}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2 md:gap-2.5">
                        <div className="space-y-1.5">
                            <label className="text-[11px] sm:text-xs font-semibold text-gray-700">
                                Region
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    required
                                    value={region}
                                    onChange={(e) => setRegion(e.target.value)}
                                    placeholder="Egypt"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 pl-10 text-sm text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                                />
                                <User
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={16}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] sm:text-xs font-semibold text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="••••••••"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 pl-10 text-sm text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                                />
                                <Lock
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={16}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                    {showPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[11px] sm:text-xs font-semibold text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="••••••••"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 pl-10 text-sm text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
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

                    <label className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-600 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            className="rounded border-gray-300 accent-[#D4AF37] w-4 h-4 mt-0.5"
                        />
                        <span className="leading-4">
                            I agree to the{" "}
                            <span className="font-semibold text-gray-800">
                                Terms & Conditions
                            </span>{" "}
                            and{" "}
                            <span className="font-semibold text-gray-800">
                                Privacy Policy
                            </span>
                        </span>
                    </label>

                    <button
                        type="submit"
                        disabled={loading || otpSent}
                        className="w-full bg-linear-to-r from-[#D4AF37] to-[#B8950A] text-gray-900 py-1.5 rounded-lg font-bold text-sm hover:shadow-lg transition-all disabled:opacity-70 active:scale-95">
                        {loading
                            ? "Processing..."
                            : otpSent
                              ? "Account Created"
                              : "Sign Up"}
                    </button>

                    {otpSent && !emailVerified && (
                        <div className="space-y-2.5 border border-gray-200 rounded-lg p-3 bg-gray-50/60">
                            <label className="text-[11px] sm:text-xs font-semibold text-gray-700">
                                Verification OTP
                            </label>
                            <input
                                type="text"
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value)}
                                placeholder="Enter 6-digit OTP"
                                className="w-full bg-white border border-gray-200 rounded-lg py-2 px-4 text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                            />
                            <button
                                type="button"
                                onClick={handleVerifyOtp}
                                disabled={loading}
                                className="w-full bg-gray-900 text-white py-2 rounded-lg font-semibold text-sm hover:bg-black transition-all disabled:opacity-70">
                                {loading ? "Verifying..." : "Verify OTP"}
                            </button>
                        </div>
                    )}

                    <div className="relative flex items-center gap-3">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-xs text-gray-500 font-medium">
                            Or
                        </span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    <button
                        type="button"
                        className="hidden"
                    />

                    <GoogleAuthButton variant="compact" />
                </form>

                <p className="text-center text-xs sm:text-sm text-gray-600 mt-3">
                    Already have an account?{" "}
                    <Link
                        href="/Signin"
                        className="text-[#D4AF37] font-bold hover:text-[#B8950A]">
                        Sign In
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
