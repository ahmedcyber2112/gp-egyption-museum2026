"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Filter,
    ArrowUpRight,
    Hexagon,
    History,
    Heart,
    Bookmark,
    Share2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getArtifacts } from "../../lib/museumApi";
import { mapApiArtifactToUi } from "../../lib/museumMappers";
import { isLoggedIn } from "../../lib/authStorage";
import {
    consumePostLoginAction,
    setPostLoginAction,
    setPostLoginRedirect,
} from "../../lib/authGate";
import LoginRequiredModal from "../Auth/LoginRequiredModal";

const categoriesMap = {
    cat_001: "Statues",
    cat_002: "Statues",
    cat_003: "Jewelry",
    cat_004: "Treasures",
    cat_005: "Inscriptions",
    cat_006: "Treasures",
};

const pharaohs = [
    "RAMESSES II",
    "TUTANKHAMUN",
    "HATSHEPSUT",
    "KHUFU",
    "AKHENATEN",
    "THUTMOSE III",
    "AMENHOTEP III",
    "CLEOPATRA",
    "SETI I",
];

// =====================================================================
// ================= 2. مكون محتوى الكارت (لإدارة التفاعلات) =================
// =====================================================================
const ArtifactCardContent = ({ artifact }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // التحقق من حالة الحفظ واللايك عند تحميل الصفحة
    useEffect(() => {
        const savedItems = JSON.parse(
            localStorage.getItem("saved_artifacts") || "[]",
        );
        const likedItems = JSON.parse(
            localStorage.getItem("liked_artifacts") || "[]",
        );

        setIsSaved(savedItems.some((item) => item.id === artifact.id));
        setIsLiked(likedItems.some((item) => item.id === artifact.id));
    }, [artifact.id]);

    const toggleAction = (e, type) => {
        e.stopPropagation(); // منع الانتقال لصفحة التفاصيل عند الضغط على الأزرار

        const key = type === "save" ? "saved_artifacts" : "liked_artifacts";
        let items = JSON.parse(localStorage.getItem(key) || "[]");

        const isPresent = items.some((item) => item.id === artifact.id);

        if (isPresent) {
            items = items.filter((item) => item.id !== artifact.id);
        } else {
            items.push(artifact);
        }

        localStorage.setItem(key, JSON.stringify(items));

        // تحديث الحالة محلياً
        if (type === "save") {
            setIsSaved(!isPresent);
            // إرسال إشارة للـ Navbar لتحديث العداد
            window.dispatchEvent(new Event("update_saved"));
        } else {
            setIsLiked(!isPresent);
            window.dispatchEvent(new Event("update_liked"));
        }
    };

    const handleShare = (e) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: artifact.name,
                text: `Check out this ancient Egyptian artifact: ${artifact.name}`,
                url: window.location.href,
            });
        } else {
            alert(`Link copied for: ${artifact.name}`);
        }
    };

    return (
        <>
            <div className="absolute bottom-0 left-0 w-full h-[75%] bg-gradient-to-b from-[#1a1a1f] to-[#0a0a0f] border border-white/5 rounded-3xl group-hover:border-[#D4AF37]/30 transition-colors duration-500 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-[50px] group-hover:bg-[#D4AF37]/20 transition-colors duration-500"></div>
            </div>

            <div className="relative w-full h-[320px] mb-6 flex justify-center items-end transform group-hover:-translate-y-4 transition-transform duration-700 ease-out z-10 pointer-events-none">
                <img
                    src={artifact.image}
                    alt={artifact.name}
                    className="w-[85%] h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                />
            </div>

            <div className="relative z-20 px-6 pb-6">
                <div className="flex items-center gap-2 mb-4">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-black/50 border border-white/10 rounded-full text-[9px] font-bold text-gray-400 tracking-wider uppercase backdrop-blur-md">
                        <History size={10} className="text-[#D4AF37]" />{" "}
                        {artifact.period}
                    </span>
                    <span className="px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full text-[9px] font-bold text-[#D4AF37] tracking-wider uppercase">
                        {artifact.categoryName ||
                            categoriesMap[artifact.categoryId] ||
                            "Artifact"}
                    </span>
                </div>

                <h3 className="text-xl md:text-2xl font-serif font-bold text-white leading-tight mb-5">
                    {artifact.name}
                </h3>

                <div className="flex items-center justify-between border-t border-white/10 pt-4 group-hover:border-[#D4AF37]/30 transition-colors duration-500">
                    <div className="flex items-center gap-1">
                        {/* زر الـ Love */}
                        <button
                            onClick={(e) => toggleAction(e, "like")}
                            className="p-2 rounded-full hover:bg-white/5 transition-colors group/btn"
                            title="Love">
                            <Heart
                                size={18}
                                className={`transition-colors duration-300 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-400 group-hover/btn:text-red-400"}`}
                            />
                        </button>

                        {/* زر الـ Save */}
                        <button
                            onClick={(e) => toggleAction(e, "save")}
                            className="p-2 rounded-full hover:bg-white/5 transition-colors group/btn"
                            title="Save">
                            <Bookmark
                                size={18}
                                className={`transition-colors duration-300 ${isSaved ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-400 group-hover/btn:text-[#D4AF37]"}`}
                            />
                        </button>

                        <button
                            onClick={handleShare}
                            className="p-2 rounded-full hover:bg-white/5 transition-colors group/btn"
                            title="Share">
                            <Share2
                                size={18}
                                className="text-gray-400 group-hover/btn:text-blue-400 transition-colors duration-300"
                            />
                        </button>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-black transition-colors duration-300 shadow-lg">
                        <ArrowUpRight size={16} />
                    </div>
                </div>
            </div>
        </>
    );
};

// =====================================================================
// ========================== 3. الصفحة الرئيسية ==========================
// =====================================================================
export default function CategoryPage() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [artifacts, setArtifacts] = useState([]);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        let isMounted = true;

        async function loadArtifacts() {
            try {
                const response = await getArtifacts();
                const apiArtifacts = Array.isArray(response?.data)
                    ? response.data.map(mapApiArtifactToUi)
                    : [];

                if (!isMounted) {
                    return;
                }
                setArtifacts(apiArtifacts);
            } catch {}
        }

        loadArtifacts();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (!isLoggedIn()) return;
        const action = consumePostLoginAction();
        if (action?.type === "open-artifact" && action?.artifactId) {
            router.push(`/artifacts/${action.artifactId}`);
        }
    }, [router]);

    const handleOpenArtifact = (artifactId) => {
        if (isLoggedIn()) {
            router.push(`/artifacts/${artifactId}`);
            return;
        }

        setPostLoginRedirect("/Categories");
        setPostLoginAction({ type: "open-artifact", artifactId });
        setShowLoginModal(true);
    };

    const categories = [
        "All",
        ...new Set(
            artifacts.map(
                (artifact) =>
                    artifact.categoryName ||
                    categoriesMap[artifact.categoryId] ||
                    "Artifact",
            ),
        ),
    ];

    const filteredArtifacts = artifacts.filter((artifact) => {
        const catName =
            artifact.categoryName || categoriesMap[artifact.categoryId] || "";
        const matchesCategory =
            activeCategory === "All" || catName === activeCategory;
        const matchesSearch = artifact.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#050505] pb-32 overflow-hidden selection:bg-[#D4AF37] selection:text-black">
            {/* Hero Section */}
            <section className="relative h-[65vh] flex flex-col justify-center items-center overflow-hidden border-b border-white/5 bg-[#0a0a0f] pt-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none"></div>
                <div className="absolute opacity-[0.02] text-[25rem] font-serif select-none pointer-events-none text-white z-0">
                    𓋹
                </div>

                <motion.img
                    src="/assets/images/Gemini_Generated_Image_fez0kjfez0kjfez0.png"
                    alt="Guardian Left"
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                    className="absolute left-0 bottom-0 h-[75%] z-10 object-contain hidden md:block select-none pointer-events-none drop-shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
                />

                <div className="relative z-20 text-center px-6 max-w-4xl flex flex-col items-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-3 mb-6 border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-6 py-2 rounded-full backdrop-blur-md">
                        <Hexagon
                            size={14}
                            className="text-[#D4AF37] fill-[#D4AF37]"
                        />
                        <span className="text-[#D4AF37] font-bold tracking-[0.4em] uppercase text-[10px]">
                            The Grand Archive
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-serif font-black uppercase text-center relative z-20 tracking-tighter text-gray-200">
                        Curated{" "}
                        <span className="text-[#D4AF37]">Collections</span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-gray-400 text-sm leading-loose font-medium max-w-2xl mx-auto">
                        "Step into the vault of eternity. Explore thousands of
                        meticulously preserved artifacts spanning over 5,000
                        years of ancient Egyptian history."
                    </motion.p>
                </div>

                <motion.img
                    src="/assets/images/Gemini_Generated_Image_fez0kjfez0kjfez0.png"
                    alt="Guardian Right"
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                    className="absolute right-0 bottom-0 h-[75%] z-10 object-contain hidden md:block select-none pointer-events-none scale-x-[-1] drop-shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
                />
            </section>

            {/* Slider Section */}
            <div className="w-full bg-[#111] border-y border-[#D4AF37]/20 py-8 overflow-hidden flex relative z-20 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex whitespace-nowrap items-center w-max">
                    {[...pharaohs, ...pharaohs].map((name, index) => (
                        <div
                            key={index}
                            className="flex items-center mx-6 group cursor-default">
                            <div className="relative flex items-center justify-center px-10 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#c59b27] border-4 border-[#050505] outline outline-2 outline-[#D4AF37]/50 rounded-full z-10 min-w-[220px]">
                                <span className="text-[#050505] font-serif text-2xl tracking-[0.2em] uppercase font-black">
                                    {name}
                                </span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="max-w-[90rem] mx-auto px-4 md:px-8 mt-16 relative">
                {/* Filter Bar */}
                <div className="sticky top-24 z-50 flex justify-center mb-28 pointer-events-none">
                    <div className="pointer-events-auto flex flex-col xl:flex-row items-center gap-4 p-2.5 bg-[#111]/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2rem] xl:rounded-full w-full xl:w-auto transition-all">
                        <div className="flex flex-wrap items-center justify-center gap-1.5 px-2 w-full xl:w-auto">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                                        activeCategory === cat
                                            ? "bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                                            : "bg-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                                    }`}>
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="hidden xl:block w-[1px] h-8 bg-white/10 mx-2"></div>

                        <div className="relative w-full xl:w-80 group">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Search the vault..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-none py-3 pl-12 pr-4 text-sm font-medium text-white focus:outline-none placeholder:text-gray-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20 pt-10">
                    <AnimatePresence>
                        {filteredArtifacts.length > 0 ? (
                            filteredArtifacts.map((artifact, index) => (
                                <motion.div
                                    key={artifact.id}
                                    layout
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                        filter: "blur(10px)",
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.05,
                                    }}
                                    className="relative group cursor-pointer"
                                    onClick={() => handleOpenArtifact(artifact.id)}>
                                    <ArtifactCardContent artifact={artifact} />
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-32 flex flex-col items-center justify-center text-center">
                                <h3 className="text-3xl font-serif text-white">
                                    The Vault is Empty
                                </h3>
                            </div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
            <LoginRequiredModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                nextPath="/Categories"
                title="Sign in to view 3D model"
                message="You can browse categories freely. Please sign in to open this artifact and view it in 3D."
            />
        </div>
    );
}
