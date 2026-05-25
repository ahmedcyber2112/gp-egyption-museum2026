"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Ticket, Calendar, User, Mail, Phone, MapPin, Users } from "lucide-react";
import { getAdminBookings } from "../../../lib/adminApi";

type BookingRow = {
    id: string;
    ticketNumber: string;
    locationName: string;
    visitorName: string;
    visitorEmail: string;
    visitorPhone?: string | null;
    visitDate: string;
    guests: number;
    totalPaid: number;
    status: string;
    createdAt: string;
};

export default function BookingsPage() {
    const [bookings, setBookings] = useState<BookingRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getAdminBookings();
            const rows = Array.isArray(res?.data) ? res.data : [];
            setBookings(
                rows.map((b: Record<string, unknown>) => ({
                    id: String(b.id ?? ""),
                    ticketNumber: String(b.ticketNumber ?? "-"),
                    locationName: String(b.locationName ?? "-"),
                    visitorName: String(b.visitorName ?? "-"),
                    visitorEmail: String(b.visitorEmail ?? "-"),
                    visitorPhone: b.visitorPhone ? String(b.visitorPhone) : null,
                    visitDate: String(b.visitDate ?? ""),
                    guests: Number(b.guests ?? 0),
                    totalPaid: Number(b.totalPaid ?? 0),
                    status: String(b.status ?? "Confirmed"),
                    createdAt: String(b.createdAt ?? ""),
                })),
            );
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "Failed to load bookings";
            setError(message);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const cairoOptions = { timeZone: "Africa/Cairo" } as const;

    const formatDate = (value: string) => {
        if (!value) return "-";
        const d = new Date(value);
        return Number.isNaN(d.getTime())
            ? value
            : d.toLocaleDateString("en-GB", cairoOptions);
    };

    const formatDateTime = (value: string) => {
        if (!value) return "-";
        const d = new Date(value);
        return Number.isNaN(d.getTime())
            ? value
            : d.toLocaleString("en-GB", {
                  ...cairoOptions,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
              });
    };

    return (
        <div className="p-8 space-y-8 min-h-screen">
            <div>
                <h1 className="text-3xl font-serif font-bold text-white mb-2">Ticket Bookings</h1>
                <p className="text-gray-400 text-sm">
                    Live bookings from the museum app (saved to the server database).
                </p>
            </div>

            {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}. Sign in as admin and ensure the API is reachable.
                </div>
            )}

            <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/[0.02] border-b border-white/5">
                            <tr>
                                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Ticket</th>
                                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Visitor</th>
                                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Location</th>
                                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Visit</th>
                                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Guests</th>
                                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Total (EGP)</th>
                                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Status</th>
                                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">Booked</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-10 text-center text-sm text-gray-500">
                                        Loading bookings…
                                    </td>
                                </tr>
                            ) : bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-10 text-center text-sm text-gray-500">
                                        No ticket bookings yet. Bookings appear here when users complete payment in the mobile app.
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((booking, idx) => (
                                    <motion.tr
                                        key={booking.id || booking.ticketNumber}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.03 }}
                                        className="hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-6 py-4 text-xs text-[#D4AF37] font-mono font-bold">
                                            <div className="flex items-center gap-2">
                                                <Ticket size={14} />
                                                {booking.ticketNumber}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-300">
                                            <div className="flex items-center gap-2 text-white font-bold">
                                                <User size={12} className="text-[#D4AF37]" />
                                                {booking.visitorName}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Mail size={12} className="text-[#D4AF37]" />
                                                {booking.visitorEmail}
                                            </div>
                                            {booking.visitorPhone && (
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Phone size={12} className="text-[#D4AF37]" />
                                                    {booking.visitorPhone}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-white">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={12} className="text-[#D4AF37]" />
                                                {booking.locationName}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-300">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={12} className="text-[#D4AF37]" />
                                                {formatDate(booking.visitDate)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-white">
                                            <div className="flex items-center gap-2">
                                                <Users size={12} className="text-[#D4AF37]" />
                                                {booking.guests}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-white font-mono">{booking.totalPaid}</td>
                                        <td className="px-6 py-4 text-xs text-emerald-400 font-black uppercase tracking-widest">
                                            {booking.status}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-500">
                                            {formatDateTime(booking.createdAt)}
                                        </td>
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
