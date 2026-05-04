"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutGrid, Sparkles, ArrowLeft } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { getCategories } from "../../lib/museumApi";

const categoryCardImages = [
    "/assets/images/1.jpg",
    "/assets/images/2.jpg",
    "/assets/images/3.jpg",
];

function mapApiCategoryToUi(category) {
    const name = category?.name || "Collection";
    const hashBase = [...name].reduce(
        (acc, ch) => acc + ch.charCodeAt(0),
        0,
    );
    const cardImage =
        categoryCardImages[hashBase % categoryCardImages.length];

    return {
        id: category?.id || "",
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        name,
        hieroglyph: "𓋹",
        title: "Collection from the museum archive.",
        image: cardImage,
        itemCount: 0,
        status: "published",
        featured: false,
    };
}

// مكون الأيقونة الديناميكي
const DynamicIcon = ({ name, size = 32 }) => {
    const IconComponent = LucideIcons[name];
    return IconComponent ? (
        <IconComponent size={size} />
    ) : (
        <LucideIcons.Landmark size={size} />
    );
};

// --- المكون الرئيسي للملف ---
export default function ViewAllCategories() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        let isMounted = true;

        async function loadCategories() {
            try {
                const response = await getCategories();
                const apiCategories = Array.isArray(response?.data)
                    ? response.data.map(mapApiCategoryToUi)
                    : [];

                if (!isMounted) {
                    return;
                }

                setCategories(apiCategories);
            } catch {}
        }

        loadCategories();

        return () => {
            isMounted = false;
        };
    }, []);

    // 2. فلترة الأقسام بناءً على البحث (للصفحة الرئيسية)
    const filteredCategories = categories.filter(
        (cat) =>
            cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cat.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 relative overflow-hidden">
            {/* الديكور الخلفي (النقشة المصرية) */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `url("https://www.transparenttextures.com/patterns/egyptian-hieroglyphs.png")`,
                    backgroundRepeat: "repeat",
                }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header: العنوان والبحث */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        {/* 1. زرار الرجوع (بقى فوق خالص وفي مكانه الصح) */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors mb-8 font-bold uppercase tracking-widest text-xs">
                                <ArrowLeft size={16} /> Back to Tours
                            </Link>
                        </motion.div>

                        {/* 2. التاج الصغير (Archive Management) */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center gap-3 text-[#D4AF37] mb-4">
                            <LayoutGrid size={20} />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                                Archive Management
                            </span>
                        </motion.div>

                        {/* 3. العنوان الرئيسي العملاق */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl md:text-7xl font-serif font-bold leading-tight">
                            The Sacred{" "}
                            <span className="text-[#D4AF37] italic">
                                Collections
                            </span>
                        </motion.h1>
                    </div>

                    {/* 4. شريط البحث (خد delay بسيط عشان يظهر بعد العنوان) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative w-full md:w-80 group">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Search galleries..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all font-medium"
                        />
                    </motion.div>
                </div>

                {/* شبكة الأقسام (Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredCategories.map((cat, index) => (
                            <motion.div
                                key={cat.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                whileHover={{ y: -10 }}
                                className="group relative h-[500px] rounded-[2.5rem] bg-[#0a0a0f] border border-white/5 overflow-hidden flex flex-col justify-end p-8 shadow-2xl">
                                {/* الصورة الخلفية */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-[1.5s]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
                                </div>

                                {/* الهيروغليف الشفاف */}
                                <div className="absolute top-8 left-8 text-white/25 text-6xl font-bold select-none z-10">
                                    {cat.hieroglyph}
                                </div>

                                {/* المحتوى */}
                                <div className="relative z-20">
                                    <div className="mb-6 text-[#D4AF37] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                                        <DynamicIcon name={cat.iconName} />
                                    </div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[10px] font-black text-[#D4AF37] tracking-[0.3em] uppercase">
                                            {cat.itemCount} Items
                                        </span>
                                        <span
                                            className={`text-[8px] font-bold px-2 py-1 rounded-md uppercase border ${cat.status === "published" ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/5" : "border-gray-500/30 text-gray-500"}`}>
                                            {cat.status}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                                        {cat.name}
                                    </h3>
                                    <p className="text-gray-400 text-xs font-medium leading-relaxed mb-8 line-clamp-2">
                                        {cat.title}
                                    </p>

                                    {/* زر فتح الجاليري الخاص بهذا القسم */}
                                    <Link href={`/ViewAllCategories/${cat.id}`}>
                                        <button className="w-full py-4 rounded-2xl border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-500">
                                            Open Gallery
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* رسالة في حالة عدم وجود نتائج */}
                {filteredCategories.length === 0 && (
                    <div className="text-center py-40">
                        <p className="text-gray-500 font-serif italic text-xl">
                            "The scrolls are silent... no galleries found for
                            this search."
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
