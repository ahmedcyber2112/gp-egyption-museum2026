"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { GiAnkh, GiScarabBeetle, GiEyeOfHorus } from 'react-icons/gi';

// المكون بعد حذف تعريفات الـ TypeScript ليعمل في ملف .jsx
const PyramidIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 20h20L12 2z" />
        <path d="M12 2v18" />
        <path d="M2 20l10-18 10 18" />
    </svg>
);

const artifacts = [
    {
        title: "TUTANKHAMUN'S MASK",
        category: "ROYAL TREASURES",
        img: "/assets/images/tut-mask.jpg",
        era: "18th Dynasty",
        icon: <GiAnkh size={24} />
    },
    {
        title: "THE ROSETTA STONE",
        category: "HISTORICAL INSCRIPTIONS",
        img: "/assets/images/rosetta.webp",
        era: "Ptolemaic Period",
        icon: <GiScarabBeetle size={24} />
    },
    {
        title: "NEFERTITI'S BUST",
        category: "ANCIENT SCULPTURES",
        img: "/assets/images/nefertiti.webp",
        era: "Amarna Period",
        icon: <GiEyeOfHorus size={24} />
    }
];

export default function PharaohLegacy() {
    return (
        <section className="py-28 bg-white relative overflow-hidden">

            {/* الخلفية البيضاء بنقوش هيروغليفية خفيفة */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
                style={{
                    backgroundImage: `url("https://www.transparenttextures.com/patterns/egyptian-hieroglyphs.png")`,
                    backgroundRepeat: 'repeat'
                }}>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header - العنوان */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#D4AF37] font-bold tracking-[0.3em] text-xs uppercase mb-3 block"
                    >
                        Explore
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif font-bold text-gray-900"
                    >
                        Our Most Famous <span className="italic text-[#D4AF37]">Artifact Categories</span>
                    </motion.h2>
                    <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                        Discover our extensive collection of artifacts carefully categorized to facilitate your exploration                    </p>
                </div>

                {/* Artifacts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {artifacts.map((art, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            whileHover={{ y: -15 }}
                            className="relative group cursor-pointer h-[550px] rounded-[2rem] overflow-hidden shadow-2xl shadow-yellow-950/10 border border-gray-100 bg-gray-50"
                        >
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={art.img}
                                    alt={art.title}
                                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-in-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                            </div>

                            <div className="absolute top-8 left-8 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-[#D4AF37] border border-white/20 scale-0 group-hover:scale-100 transition-transform duration-500">
                                {art.icon}
                            </div>

                            <div className="absolute bottom-0 left-0 p-10 z-20 w-full transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-[2px] h-8 bg-[#D4AF37]"></div>
                                    <div>
                                        <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase block">
                                            {art.category}
                                        </span>
                                        <p className="text-gray-400 text-[10px] mt-0.5">{art.era}</p>
                                    </div>
                                </div>
                                <h4 className="text-3xl font-serif font-bold text-white mb-6 leading-tight">
                                    {art.title}
                                </h4>
                                <button className="text-white text-[9px] tracking-[0.3em] uppercase border border-white/30 rounded-full px-8 py-3 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100">
                                    View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}