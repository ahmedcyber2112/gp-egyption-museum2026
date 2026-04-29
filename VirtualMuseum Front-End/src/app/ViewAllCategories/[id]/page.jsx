"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Filter,
    ArrowLeft,
    History,
    Heart,
    Bookmark,
    Share2,
    ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { getArtifacts } from "../../../lib/museumApi";
import { mapApiArtifactToUi } from "../../../lib/museumMappers";
import { isLoggedIn } from "../../../lib/authStorage";
import {
    consumePostLoginAction,
    setPostLoginAction,
    setPostLoginRedirect,
} from "../../../lib/authGate";
import LoginRequiredModal from "../../../components/Auth/LoginRequiredModal";

// =====================================================================
// ================= 1. مكون محتوى الكارت (نفس تصميم الرئيسية) =================
// =====================================================================
const ArtifactCardContent = ({ artifact }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // التأكد من حالة القطعة (محفوظة أو معجب بها) عند تحميل الصفحة
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

    // دالة التعامل مع الحفظ واللايك وإرسال التنبيه للـ Navbar
    const toggleAction = (e, type) => {
        e.stopPropagation(); // منع الانتقال لصفحة التفاصيل عند الضغط على الأزرار

        const key = type === "save" ? "saved_artifacts" : "liked_artifacts";
        const eventName = type === "save" ? "update_saved" : "update_liked";

        let items = JSON.parse(localStorage.getItem(key) || "[]");
        const isPresent = items.some((item) => item.id === artifact.id);

        if (isPresent) {
            items = items.filter((item) => item.id !== artifact.id);
        } else {
            items.push(artifact);
        }

        localStorage.setItem(key, JSON.stringify(items));

        if (type === "save") {
            setIsSaved(!isPresent);
        } else {
            setIsLiked(!isPresent);
        }

        // إرسال الإشارة للـ Navbar
        window.dispatchEvent(new Event(eventName));
    };

    return (
        <>
            {/* الخلفية المتدرجة */}
            <div className="absolute bottom-0 left-0 w-full h-[75%] bg-gradient-to-b from-[#1a1a1f] to-[#0a0a0f] border border-white/5 rounded-3xl group-hover:border-[#D4AF37]/30 transition-colors duration-500 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-[50px] group-hover:bg-[#D4AF37]/20 transition-colors duration-500"></div>
            </div>

            {/* صورة القطعة مع أنميشن الرفع */}
            <div className="relative w-full h-[320px] mb-6 flex justify-center items-end transform group-hover:-translate-y-4 transition-transform duration-700 ease-out z-10 pointer-events-none">
                <img
                    src={artifact.image}
                    alt={artifact.name}
                    className="w-[85%] h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                />
            </div>

            {/* تفاصيل القطعة */}
            <div className="relative z-20 px-6 pb-6">
                <div className="flex items-center gap-2 mb-4">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-black/50 border border-white/10 rounded-full text-[9px] font-bold text-gray-400 tracking-wider uppercase backdrop-blur-md">
                        <History size={10} className="text-[#D4AF37]" />{" "}
                        {artifact.period}
                    </span>
                </div>

                <h3 className="text-xl md:text-2xl font-serif font-bold text-white leading-tight mb-5">
                    {artifact.name}
                </h3>

                {/* الأزرار التفاعلية */}
                <div className="flex items-center justify-between border-t border-white/10 pt-4 group-hover:border-[#D4AF37]/30 transition-colors duration-500">
                    <div className="flex items-center gap-1">
                        {/* زر الـ Like */}
                        <button
                            onClick={(e) => toggleAction(e, "like")}
                            className="p-2 rounded-full hover:bg-white/5 transition-colors">
                            <Heart
                                size={18}
                                className={`transition-colors duration-300 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                            />
                        </button>

                        {/* زر الـ Save */}
                        <button
                            onClick={(e) => toggleAction(e, "save")}
                            className="p-2 rounded-full hover:bg-white/5 transition-colors">
                            <Bookmark
                                size={18}
                                className={`transition-colors duration-300 ${isSaved ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-400"}`}
                            />
                        </button>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:text-black transition-colors shadow-lg">
                        <ArrowUpRight size={16} />
                    </div>
                </div>
            </div>
        </>
    );
};

// =====================================================================
// ========================= 2. الصفحة الرئيسية للجاليري =========================
// =====================================================================
export default function CategoryGalleryPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    const [artifacts, setArtifacts] = useState([]);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        let isMounted = true;

        async function loadFromApi() {
            try {
                const response = await getArtifacts();
                const apiArtifacts = Array.isArray(response?.data)
                    ? response.data
                    : [];

                const mapped = apiArtifacts
                    .filter(
                        (artifact) =>
                            (artifact?.categoryId || artifact?.category?.id) ===
                            id,
                    )
                    .map(mapApiArtifactToUi);

                if (!isMounted) {
                    return;
                }
                setArtifacts(mapped);
            } catch {}
        }

        loadFromApi();

        return () => {
            isMounted = false;
        };
    }, [id]);

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
        setPostLoginRedirect(`/ViewAllCategories/${id}`);
        setPostLoginAction({ type: "open-artifact", artifactId });
        setShowLoginModal(true);
    };

    return (
        <div className="min-h-screen bg-[#050505] pb-32 overflow-hidden selection:bg-[#D4AF37] selection:text-black">
            {/* Header بسيط للرجوع */}
            <div className="max-w-[90rem] mx-auto px-8 pt-10">
                <Link
                    href="/ViewAllCategories"
                    className="flex items-center gap-2 text-[#D4AF37] hover:underline mb-8">
                    <ArrowLeft size={20} /> Back to Collections
                </Link>
                <h2 className="text-4xl md:text-6xl font-serif font-black text-white uppercase mb-16">
                    The <span className="text-[#D4AF37]">Vault</span>{" "}
                    <span className="text-sm font-sans text-gray-500 block mt-2">
                        ID: {id}
                    </span>
                </h2>
            </div>

            <div className="max-w-[90rem] mx-auto px-4 md:px-8 relative">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20">
                    <AnimatePresence>
                        {artifacts.length > 0 ? (
                            artifacts.map((artifact, index) => (
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
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-[#111] border border-white/5 rounded-3xl">
                                <div className="w-24 h-24 bg-[#050505] rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/5">
                                    <Filter
                                        size={40}
                                        className="text-[#D4AF37]/50"
                                    />
                                </div>
                                <h3 className="text-3xl font-serif text-white mb-3">
                                    The Vault is Empty
                                </h3>
                                <p className="text-gray-500 max-w-md text-sm">
                                    No artifacts match this category yet.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
            <LoginRequiredModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                nextPath={`/ViewAllCategories/${id}`}
                title="Sign in to view 3D model"
                message="Please sign in first, then we will open the selected artifact model for you."
            />
        </div>
    );
}
