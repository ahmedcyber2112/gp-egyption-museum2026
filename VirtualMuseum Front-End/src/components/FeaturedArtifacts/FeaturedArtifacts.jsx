"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Star,
    MapPin,
    Clock,
    ArrowRight,
    History,
    Sparkles,
} from "lucide-react";
import { getArtifacts } from "../../lib/museumApi";
import { mapApiArtifactToUi } from "../../lib/museumMappers";

function mapApiArtifactToCard(apiArtifact) {
    const mapped = mapApiArtifactToUi(apiArtifact);
    return {
        id: mapped.id,
        name: mapped.name,
        image: mapped.image,
        period: mapped.period,
        associatedKing: mapped.associatedKing,
        discoverySite: mapped.discoverySite,
    };
}

export default function FeaturedArtifacts() {
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        let isMounted = true;

        async function loadFeatured() {
            try {
                const response = await getArtifacts();
                const apiArtifacts = Array.isArray(response?.data)
                    ? response.data
                    : [];
                if (!apiArtifacts.length || !isMounted) {
                    return;
                }

                setFeatured(apiArtifacts.slice(0, 3).map(mapApiArtifactToCard));
            } catch {}
        }

        loadFeatured();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden">
            {/* 1. خلفية الرموز الفرعونية المتكررة */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `url("https://www.transparenttextures.com/patterns/egyptian-hieroglyphs.png")`,
                    backgroundRepeat: "repeat",
                }}></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header - العنوان */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 text-[#D4AF37] mb-6">
                        <Sparkles size={18} />
                        <span className="font-black tracking-[0.5em] text-[10px] uppercase">
                            Masterpieces
                        </span>
                        <Sparkles size={18} />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
                        Ancient{" "}
                        <span className="italic text-[#D4AF37]">Treasures</span>
                    </motion.h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed tracking-wide">
                        Witness the most prestigious artifacts recovered from
                        the golden sands of Egypt.
                    </p>
                </div>

                {/* Artifacts Grid - شبكة القطع */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {featured.map((art, index) => (
                        <motion.div
                            key={art.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            className="group relative">
                            {/* الكارت الخلفي الفخم */}
                            <div className="absolute inset-0 bg-linear-to-b from-[#1a1a1f] to-[#0a0a0f] border border-white/5 rounded-[2.5rem] group-hover:border-[#D4AF37]/30 transition-all duration-500 shadow-2xl"></div>

                            {/* تأثير ضوئي ذهبي عند الـ Hover */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-[60px] group-hover:bg-[#D4AF37]/15 transition-all"></div>

                            {/* صورة القطعة */}
                            <div className="relative h-72 flex justify-center items-end p-8 transform group-hover:-translate-y-4 transition-transform duration-700 ease-out z-10">
                                <Image
                                    src={art.image}
                                    alt={art.name}
                                    width={520}
                                    height={520}
                                    loading="lazy"
                                    decoding="async"
                                    className="max-h-full w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                                />
                            </div>

                            {/* المحتوى */}
                            <div className="relative z-20 p-8 pt-2">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">
                                        {art.period}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors leading-tight">
                                    {art.name}
                                </h3>

                                <div className="flex items-center gap-4 text-gray-500 text-[11px] mb-8 font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <History
                                            size={14}
                                            className="text-[#D4AF37]"
                                        />
                                        {art.associatedKing}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin
                                            size={14}
                                            className="text-[#D4AF37]"
                                        />
                                        {art.discoverySite}
                                    </div>
                                </div>

                                {/* زر الانتقال للجاليري الخاص بالقسم */}
                                <Link href={`/artifacts/${art.id}`}>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.2em] group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-[#D4AF37] transition-all duration-500 flex items-center justify-center gap-3">
                                        View Details
                                        <ArrowRight size={14} />
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-24">
                    <Link href="/ViewAllCategories">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-5 bg-[#D4AF37] text-black rounded-full font-black text-[11px] uppercase tracking-[0.3em] shadow-[0_10px_40px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_50px_rgba(212,175,55,0.4)] transition-all flex items-center gap-4 mx-auto group">
                            Explore Entire Collection
                            <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
                                <ArrowRight size={14} />
                            </div>
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
