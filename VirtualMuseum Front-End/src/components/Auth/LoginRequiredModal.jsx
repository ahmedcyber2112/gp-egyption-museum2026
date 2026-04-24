"use client";

import Link from "next/link";
import { Lock, X } from "lucide-react";

export default function LoginRequiredModal({
    open,
    title = "Login Required",
    message = "Please sign in to continue this action.",
    onClose,
    nextPath,
}) {
    if (!open) return null;

    const signinHref = nextPath
        ? `/Signin?next=${encodeURIComponent(nextPath)}`
        : "/Signin";
    const signupHref = nextPath
        ? `/Signup?next=${encodeURIComponent(nextPath)}`
        : "/Signup";

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md rounded-3xl border border-[#D4AF37]/30 bg-[#0b0b10]/95 p-6 text-white shadow-2xl">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-3 top-3 rounded-full p-2 text-gray-400 hover:bg-white/5 hover:text-white">
                    <X size={18} />
                </button>

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#D4AF37]">
                    <Lock size={24} />
                </div>

                <h3 className="mb-2 text-2xl font-serif font-bold">{title}</h3>
                <p className="mb-6 text-sm text-gray-300">{message}</p>

                <div className="grid grid-cols-2 gap-3">
                    <Link
                        href={signinHref}
                        className="rounded-xl bg-[#D4AF37] px-4 py-3 text-center text-xs font-black uppercase tracking-widest text-black transition hover:bg-white">
                        Sign In
                    </Link>
                    <Link
                        href={signupHref}
                        className="rounded-xl border border-white/15 px-4 py-3 text-center text-xs font-black uppercase tracking-widest transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37]">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}
