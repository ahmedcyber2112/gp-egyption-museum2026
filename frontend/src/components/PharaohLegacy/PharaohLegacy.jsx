"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
// استيراد جميع أيقونات Lucide
import * as LucideIcons from "lucide-react";
import { getCategories } from "../../lib/museumApi";
import { resolveGalleryCardImage } from "../../lib/galleryCardImages";
// مكون ديناميكي لعرض الأيقونة بناءً على الاسم الموجود في الـ JSON
const DynamicIcon = ({ name, size = 28 }) => {
    const IconComponent = LucideIcons[name];
    // إذا لم يجد الأيقونة يضع أيقونة افتراضية (Pyramid/Landmark)
    return IconComponent ? (
        <IconComponent size={size} />
    ) : (
        <LucideIcons.Landmark size={size} />
    );
};

export default function PharaohLegacy() {
    const [featuredCategories, setFeaturedCategories] = React.useState([]);

    React.useEffect(() => {
        let isMounted = true;

        async function loadCategories() {
            try {
                const response = await getCategories();
                const apiCategories = Array.isArray(response?.data)
                    ? response.data
                    : [];
                if (!isMounted) return;

                const mapped = apiCategories.slice(0, 3).map((cat) => {
                    const name = cat?.name || "Collection";

                    return {
                        id: cat?.id || "",
                        name,
                        title: "Collection from the museum archive.",
                        image: resolveGalleryCardImage(name),
                        itemCount: 0,
                        hieroglyph: "𓋹",
                        iconName: "Landmark",
                    };
                });

                setFeaturedCategories(mapped);
            } catch {}
        }

        loadCategories();
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="py-28 bg-white relative overflow-hidden font-sans">
            {/* الخلفية الهيروغليفية */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
                style={{
                    backgroundImage: `url("https://www.transparenttextures.com/patterns/egyptian-hieroglyphs.png")`,
                    backgroundRepeat: "repeat",
                }}></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* العنوان الرئيسي */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#D4AF37] font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">
                        Ancient Treasures
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">
                        Explore Our{" "}
                        <span className="italic text-[#D4AF37]">
                            Sacred Galleries
                        </span>
                    </motion.h2>
                </div>

                {/* شبكة الأقسام (Featured Only) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {featuredCategories.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            className="group relative h-145 rounded-[3rem] overflow-hidden bg-[#0a0a0f] shadow-2xl">
                            {/* الصورة الخلفية */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    loading="lazy"
                                    decoding="async"
                                    className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-[2s] ease-out"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent z-10" />
                            </div>

                            {/* الاسم بالهيروغليفية - لمسة جمالية في الخلفية */}
                            <div className="absolute top-8 right-10 text-white/5 text-7xl font-bold select-none z-10 pointer-events-none">
                                {cat.hieroglyph}
                            </div>

                            {/* المحتوى */}
                            <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                                <div className="mb-6 w-14 h-14 rounded-2xl bg-[#D4AF37]/10 backdrop-blur-xl border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                                    <DynamicIcon name={cat.iconName} />
                                </div>

                                <span className="text-[#D4AF37] text-[10px] font-black tracking-[0.3em] uppercase mb-2 block">
                                    {cat.itemCount} ARTIFACTS
                                </span>

                                <h4 className="text-3xl font-serif font-bold text-white mb-4 leading-none">
                                    {cat.name}
                                </h4>

                                <p className="text-gray-400 text-sm mb-8 line-clamp-2 font-medium leading-relaxed">
                                    {cat.title}
                                </p>

                                <Link href={`/ViewAllCategories/${cat.id}`}>
                                    <button className="w-full py-4 rounded-2xl border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-500">
                                        Open Gallery
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* زر عرض كل الأقسام - ينقلك لصفحة تحتوي على الـ 6 أقسام كاملة */}
                <div className="mt-20 text-center">
                    <Link href="/ViewAllCategories">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-4 px-12 py-5 bg-[#0a0a0f] text-[#D4AF37] rounded-full text-xs font-black uppercase tracking-[0.3em] shadow-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-500 group">
                            View All Categories
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
