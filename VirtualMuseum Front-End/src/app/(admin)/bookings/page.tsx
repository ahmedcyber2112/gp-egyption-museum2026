"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Ticket, Calendar, Clock, MapPin, User } from "lucide-react";
import { getAdminBookings } from "../../../lib/adminEvents";

export default function BookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {
        const load = () => setBookings(getAdminBookings());
        load();
        window.addEventListener("storage", load);
        return () => window.removeEventListener("storage", load);
    }, []);

    return (
        <div className="p-8 space-y-8 min-h-screen">
            <div>
                <h1 className="text-3xl font-serif font-bold text-white mb-2">Ticket Bookings</h1>
                <p className="text-gray-400 text-sm">Live booking records from user activity.</p>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/[0.02] border-b border-white/5">
                            <tr>
                                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Source</th>
                                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Guide / Channel</th>
                                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Date & Time</th>
                                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Itinerary</th>
                                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Total</th>
                                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Created</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                                        No ticket bookings yet.
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((booking, idx) => (
                                    <motion.tr
                                        key={booking.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.03 }}
                                        className="hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-6 py-4 text-xs text-[#D4AF37] font-black uppercase tracking-widest">{booking.source || "-"}</td>
                                        <td className="px-6 py-4 text-sm text-white font-bold">{booking.guideName || "-"}</td>
                                        <td className="px-6 py-4 text-xs text-gray-300">
                                            <div className="flex items-center gap-2"><Calendar size={12} className="text-[#D4AF37]" />{booking.date || "-"}</div>
                                            <div className="flex items-center gap-2 mt-1"><Clock size={12} className="text-[#D4AF37]" />{booking.time || "-"}</div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-300">
                                            {(booking.locations || []).length
                                                ? booking.locations.join(", ")
                                                : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-white font-mono">{booking.totalPrice ?? 0}</td>
                                        <td className="px-6 py-4 text-xs text-gray-500">{new Date(booking.createdAt).toLocaleString()}</td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
