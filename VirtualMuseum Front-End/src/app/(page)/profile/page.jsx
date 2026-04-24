"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, MapPin, PencilLine } from "lucide-react";
import {
    clearAuthSession,
    getCurrentUser,
    isLoggedIn,
} from "../../../lib/authStorage";
import { getMyProfile, updateMyProfile } from "../../../lib/authApi";

export default function ProfilePage() {
    const router = useRouter();
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const fileInputRef = useRef(null);

    const localUser = useMemo(
        () => (typeof window === "undefined" ? null : getCurrentUser()),
        [],
    );
    const [profile, setProfile] = useState(() => ({
        userId: localUser?.userId || "",
        email: localUser?.email || "",
        fullName: localUser?.fullName || "",
        region: localUser?.region || "",
    }));

    const avatarKey = useMemo(
        () => (profile.userId ? `profile_avatar_${profile.userId}` : ""),
        [profile.userId],
    );
    const [avatarDataUrl, setAvatarDataUrl] = useState(() => {
        if (typeof window === "undefined") return "";
        if (!localUser?.userId) return "";
        return localStorage.getItem(`profile_avatar_${localUser.userId}`) || "";
    });

    const [editing, setEditing] = useState(false);
    const [editFullName, setEditFullName] = useState(profile.fullName);
    const [editRegion, setEditRegion] = useState(profile.region);

    useEffect(() => {
        if (!isLoggedIn()) {
            router.replace("/Signin");
            return;
        }
        setReady(true);
    }, [router]);

    useEffect(() => {
        let active = true;
        const load = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await getMyProfile();
                if (res?.success && res?.data && active) {
                    const next = {
                        userId: res.data.userId,
                        email: res.data.email,
                        fullName: res.data.fullName,
                        region: res.data.region,
                    };
                    setProfile(next);
                    setEditFullName(next.fullName);
                    setEditRegion(next.region);
                } else if (active) {
                    setError(res?.message || "Could not load profile.");
                }
            } catch (e) {
                if (active) setError(e?.message || "Could not load profile.");
            } finally {
                if (active) setLoading(false);
            }
        };

        if (ready) load();
        return () => {
            active = false;
        };
    }, [ready, localUser?.role]);

    const onLogout = () => {
        clearAuthSession();
        router.push("/Signin");
    };

    if (!ready) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-sm text-gray-600">Loading...</div>
            </div>
        );
    }

    const onPickAvatar = () => fileInputRef.current?.click();

    const onAvatarSelected = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please select an image file.");
            return;
        }

        // Keep it lightweight in localStorage.
        const maxBytes = 1_200_000;
        if (file.size > maxBytes) {
            setError("Image is too large. Please choose an image under 1.2MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = typeof reader.result === "string" ? reader.result : "";
            setAvatarDataUrl(dataUrl);
            setError("");
            if (avatarKey) localStorage.setItem(avatarKey, dataUrl);
        };
        reader.readAsDataURL(file);
    };

    const openEdit = () => {
        setSuccess("");
        setError("");
        setEditFullName(profile.fullName);
        setEditRegion(profile.region);
        setEditing(true);
    };

    const saveEdit = async () => {
        setSaving(true);
        setError("");
        setSuccess("");
        try {
            const res = await updateMyProfile({
                fullName: editFullName.trim(),
                region: editRegion.trim(),
            });

            if (!res?.success || !res?.data) {
                throw new Error(res?.message || "Could not update profile.");
            }

            const next = {
                ...profile,
                fullName: res.data.fullName,
                region: res.data.region,
            };
            setProfile(next);

            // Update localStorage cached user so Navbar + other UI updates.
            const raw = localStorage.getItem("currentUser");
            const existing = raw ? JSON.parse(raw) : {};
            localStorage.setItem(
                "currentUser",
                JSON.stringify({
                    ...existing,
                    fullName: next.fullName,
                    region: next.region,
                }),
            );
            localStorage.setItem("userName", next.fullName || "User");
            window.dispatchEvent(new Event("storage"));

            setSuccess("Profile updated successfully.");
            setEditing(false);
        } catch (e) {
            setError(e?.message || "Could not update profile.");
        } finally {
            setSaving(false);
        }
    };

    const initials = (profile.fullName || "User")
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join("");

    return (
        <div className="min-h-screen w-full bg-[#0a0a0f] relative overflow-hidden flex items-start justify-center pt-20 sm:pt-24 pb-8 px-4 sm:px-6">
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[55rem] h-[20rem] rounded-full bg-[#D4AF37]/10 blur-[120px]" />
            <div className="w-full max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden"
                >
                    <div className="relative">
                        <div className="h-28 sm:h-32 bg-linear-to-r from-[#111827] via-[#1f2937] to-[#111827]" />
                        <div className="absolute top-3 left-4 flex items-center gap-3">
                            <Image
                                src="/assets/images/eh.png"
                                alt="Grand Egyptian Museum Logo"
                                width={90}
                                height={36}
                                className="h-8 w-auto object-contain"
                                priority
                            />
                            <div className="text-white">
                                <div className="text-lg sm:text-xl font-black">
                                    Profile
                                </div>
                                <div className="text-[11px] sm:text-xs text-white/70">
                                    Manage your account information
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-8 left-6 sm:left-8 flex items-end gap-3">
                            <div className="relative">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white shadow-xl border border-white/40 overflow-hidden flex items-center justify-center">
                                    {avatarDataUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={avatarDataUrl}
                                            alt="Profile avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-linear-to-br from-[#D4AF37] to-[#B8950A] flex items-center justify-center">
                                            <span className="text-gray-900 text-2xl font-black">
                                                {initials || "U"}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={onPickAvatar}
                                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all"
                                    title="Change photo"
                                >
                                    <Camera size={15} className="text-gray-700" />
                                </button>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={onAvatarSelected}
                                />
                            </div>

                            <div className="pb-3">
                                <div className="text-xl sm:text-2xl font-black text-white drop-shadow">
                                    {profile.fullName || "User"}
                                </div>
                                <div className="text-white/80 text-xs sm:text-sm inline-flex items-center gap-1">
                                    <MapPin size={14} />
                                        {profile.region || "—"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 sm:pt-14 px-5 sm:px-8 pb-7">
                        {(error || success) && (
                            <div className="mb-4">
                                {error ? (
                                    <div className="bg-red-50 border border-red-200 p-3 rounded-xl text-red-700 text-sm font-medium">
                                        {error}
                                    </div>
                                ) : null}
                                {success ? (
                                    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-emerald-700 text-sm font-medium mt-2">
                                        {success}
                                    </div>
                                ) : null}
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                            <div className="text-sm text-gray-600">
                                {loading ? "Loading your profile..." : "Your account details"}
                            </div>
                            <button
                                type="button"
                                onClick={openEdit}
                                disabled={loading}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition-all disabled:opacity-60"
                            >
                                <PencilLine size={16} />
                                Edit profile
                            </button>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:col-span-2">
                                <div className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold">
                                    Name
                                </div>
                                <div className="text-gray-900 font-bold mt-1 break-words">
                                    {profile.fullName || "—"}
                                </div>
                            </div>

                            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                                <div className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold">
                                    Email
                                </div>
                                <div className="text-gray-900 font-bold mt-1 break-words">
                                    {profile.email || "—"}
                                </div>
                            </div>

                            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                                <div className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold">
                                    Region
                                </div>
                                <div className="text-gray-900 font-bold mt-1 break-words">
                                    {profile.region || "—"}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
                            <button
                                type="button"
                                onClick={() => router.push("/")}
                                className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                            >
                                Back to home
                            </button>
                            <button
                                type="button"
                                onClick={onLogout}
                                className="px-4 py-2 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition-all"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </motion.div>

                {editing ? (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-black/50"
                            onClick={() => !saving && setEditing(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 sm:p-6"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="text-lg font-black text-gray-900">
                                        Edit profile
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Update your name and region.
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => !saving && setEditing(false)}
                                    className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50"
                                >
                                    Close
                                </button>
                            </div>

                            <div className="mt-4 space-y-3">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-700">
                                        Full name
                                    </label>
                                    <input
                                        type="text"
                                        value={editFullName}
                                        onChange={(e) => setEditFullName(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-700">
                                        Region
                                    </label>
                                    <input
                                        type="text"
                                        value={editRegion}
                                        onChange={(e) => setEditRegion(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setEditing(false)}
                                    disabled={saving}
                                    className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-all disabled:opacity-60"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={saveEdit}
                                    disabled={saving}
                                    className="px-4 py-2 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition-all disabled:opacity-60"
                                >
                                    {saving ? "Saving..." : "Save changes"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

