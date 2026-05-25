"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
    ArrowLeft,
    Box,
    Ruler,
    MapPin,
    Calendar,
    User,
    Hammer,
    Info,
    Heart,
    Share2,
    Check,
    Star, // 👈 ضفنا الـ Star هنا
} from "lucide-react";
import { getArtifactById } from "../../../lib/museumApi";
import { mapApiArtifactToUi } from "../../../lib/museumMappers";
import { isLoggedIn } from "../../../lib/authStorage";
import { getScopedFavorites, setScopedFavorites } from "../../../lib/favoritesStorage";
import {
    consumePostLoginAction,
    setPostLoginAction,
    setPostLoginRedirect,
} from "../../../lib/authGate";
import LoginRequiredModal from "../../../components/Auth/LoginRequiredModal";

const ModelViewer = dynamic(
    () => import("../../../components/ModelViewer/ModelViewer"),
    { ssr: false },
);

type Artifact = {
    id: string;
    categoryId: string;
    name: string;
    description: string;
    image: string;
    accessionNumber: string;
    period: string;
    associatedKing: string;
    material: string;
    dimensions: Record<string, string>;
    discoverySite: string;
    historicalContext?: string;
    image3D: string | null;
    status: string;
};

export default function ArtifactDetails() {
    const [show3D, setShow3D] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [artifact, setArtifact] = useState<Artifact | null>(null);

    // States الخاصة بالزراير
    const [isFavorite, setIsFavorite] = useState(false);
    const [shareCopied, setShareCopied] = useState(false);

    // States الخاصة بالتقييم
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [hasRated, setHasRated] = useState(false);

    // تحميل الداتا
    useEffect(() => {
        let isMounted = true;

        async function loadFromApi() {
            if (!id) return;

            try {
                const response = await getArtifactById(id);
                if (!response?.data || !isMounted) {
                    return;
                }

                const mappedArtifact = mapApiArtifactToUi(
                    response.data,
                ) as Artifact;
                setArtifact(mappedArtifact);

                const liked: Artifact[] = getScopedFavorites("liked_artifacts");
                setIsFavorite(
                    liked.some(
                        (item: Artifact) => item.id === mappedArtifact.id,
                    ),
                );
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
        if (action?.type === "open-artifact-3d" && action?.artifactId === id) {
            setShow3D(true);
        }
    }, [id]);

    // دالة إضافة/إزالة من المفضلات
    const toggleFavorite = () => {
        if (!artifact) return;

        let liked = getScopedFavorites("liked_artifacts");

        if (isFavorite) {
            liked = liked.filter((item: Artifact) => item.id !== artifact.id);
        } else {
            liked.push(artifact);
        }

        setScopedFavorites("liked_artifacts", liked);
        setIsFavorite(!isFavorite);

        window.dispatchEvent(new Event("update_liked"));
    };

    // دالة المشاركة
    const handleShare = async () => {
        if (!artifact) return;

        const shareData = {
            title: `Grand Egyptian Museum: ${artifact.name}`,
            text: `Check out this amazing historical artifact: ${artifact.name}`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log("Error sharing:", err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            setShareCopied(true);
            setTimeout(() => setShareCopied(false), 2000);
        }
    };

    // دالة تسجيل التقييم
    const handleRating = (selectedRating: number) => {
        setRating(selectedRating);
        setHasRated(true);
        // هنا ممكن تبعت التقييم للـ Backend أو الـ Database بعدين
    };

    const handleOpen3D = () => {
        if (isLoggedIn()) {
            setShow3D(true);
            return;
        }
        setPostLoginRedirect(`/artifacts/${id}`);
        setPostLoginAction({ type: "open-artifact-3d", artifactId: id });
        setShowLoginModal(true);
    };

    if (!artifact)
        return (
            <div className="h-screen bg-[#050505] flex items-center justify-center text-[#D4AF37] font-serif">
                Loading History...
            </div>
        );

    return (
        <div className="min-h-screen bg-[#050505] text-white pb-20">
            {/* --- Header & Back Button --- */}
            <div className="p-6 relative z-10">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors">
                    <ArrowLeft size={20} /> Back to Collection
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* --- Left Column: Image Showcase --- */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative h-125 lg:h-175 rounded-4xl overflow-hidden border border-white/10 group shadow-2xl">
                    <Image
                        src={artifact.image}
                        alt={artifact.name}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        loading="eager"
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>

                    <motion.button
                        onClick={handleOpen3D}
                        whileHover={{ scale: 1.1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black px-8 py-4 rounded-full font-black uppercase tracking-widest flex items-center gap-3 shadow-[0_10px_30px_rgba(212,175,55,0.4)]">
                        <Box size={20} /> View 3D Hologram
                    </motion.button>
                </motion.div>

                {/* --- Right Column: Artifact Dossier --- */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8">
                    <div>
                        <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.3em] mb-2 block">
                            Accession: {artifact.accessionNumber}
                        </span>
                        <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-tight mb-4">
                            {artifact.name}
                        </h1>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <SpecCard
                            icon={<Calendar size={18} />}
                            label="Period"
                            value={artifact.period}
                        />
                        <SpecCard
                            icon={<User size={18} />}
                            label="Associated King"
                            value={artifact.associatedKing}
                        />
                        <SpecCard
                            icon={<Hammer size={18} />}
                            label="Material"
                            value={artifact.material}
                        />
                        <SpecCard
                            icon={<MapPin size={18} />}
                            label="Discovery Site"
                            value={artifact.discoverySite === "Unknown Site" ? "Not specified yet" : artifact.discoverySite}
                        />
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                        <h3 className="text-[#D4AF37] font-bold flex items-center gap-2 mb-6 uppercase text-sm tracking-widest">
                            <Ruler size={18} /> Physical Dimensions
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {Object.entries(artifact.dimensions).map(
                                ([key, val]) => (
                                    <div key={key}>
                                        <div className="text-gray-500 text-[10px] uppercase font-bold mb-1">
                                            {key}
                                        </div>
                                        <div className="text-lg font-mono font-bold">
                                            {val}
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-serif font-bold flex items-center gap-2">
                            <Info size={20} className="text-[#D4AF37]" />{" "}
                            Historical Context
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-lg italic break-words whitespace-pre-wrap max-w-full overflow-hidden">
                            {artifact.historicalContext?.trim()
                                ? artifact.historicalContext
                                : `This magnificent piece, belonging to the ${artifact.period}, was discovered in ${artifact.discoverySite === "Unknown Site" ? "an unregistered location" : artifact.discoverySite}. It stands as a testament to the craftsmanship of ancient Egypt.`}
                        </p>
                    </div>

                    {/* ========================================== */}
                    {/* قسم التقييم التفاعلي (Interactive Rating) */}
                    {/* ========================================== */}
                    <div className="bg-linear-to-r from-white/5 to-transparent border border-white/10 rounded-2xl p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h4 className="text-white font-bold mb-1">
                                    Rate this Artifact
                                </h4>
                                <p className="text-gray-500 text-xs">
                                    How fascinating did you find this piece?
                                </p>
                            </div>

                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onMouseEnter={() =>
                                            !hasRated && setHoverRating(star)
                                        }
                                        onMouseLeave={() =>
                                            !hasRated && setHoverRating(0)
                                        }
                                        onClick={() => handleRating(star)}
                                        className="p-1 transition-transform hover:scale-125 focus:outline-none"
                                        disabled={hasRated}>
                                        <Star
                                            size={24}
                                            className={`transition-colors duration-200 ${
                                                (hoverRating || rating) >= star
                                                    ? "fill-[#D4AF37] text-[#D4AF37]"
                                                    : "text-gray-600"
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                        {hasRated && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-3 text-emerald-400 text-xs font-bold flex items-center gap-2">
                                <Check size={14} /> Thank you for your feedback!
                            </motion.div>
                        )}
                    </div>

                    {/* ========================================== */}
                    {/* الأزرار التفاعلية (Favorites & Share) */}
                    {/* ========================================== */}
                    <div className="pt-4 flex gap-4">
                        {/* زرار المفضلات */}
                        <button
                            onClick={toggleFavorite}
                            className={`flex-1 flex justify-center items-center gap-2 border border-[#D4AF37] py-4 rounded-2xl font-bold uppercase text-xs tracking-widest transition-all ${
                                isFavorite
                                    ? "bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                                    : "text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                            }`}>
                            <Heart
                                size={18}
                                className={isFavorite ? "fill-black" : ""}
                            />
                            {isFavorite
                                ? "Saved to Favorites"
                                : "Add to Favorites"}
                        </button>

                        {/* زرار المشاركة */}
                        <button
                            onClick={handleShare}
                            className="flex-1 flex justify-center items-center gap-2 bg-white/5 text-white py-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-all">
                            {shareCopied ? (
                                <>
                                    <Check
                                        size={18}
                                        className="text-emerald-500"
                                    />
                                    <span className="text-emerald-500">
                                        Link Copied!
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Share2 size={18} />
                                    Share Dossier
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>
            <AnimatePresence>
                {show3D && artifact.image3D && (
                    <ModelViewer
                        modelPath={artifact.image3D}
                        onClose={() => setShow3D(false)}
                    />
                )}
            </AnimatePresence>
            <LoginRequiredModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                nextPath={`/artifacts/${id}`}
                title="Sign in to view 3D model"
                message="Please sign in first, then we will open this artifact model for you."
            />
        </div>
    );
}

function SpecCard({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="bg-white/3 border border-white/5 p-5 rounded-2xl hover:border-[#D4AF37]/30 transition-colors group">
            <div className="text-[#D4AF37] mb-3 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">
                {label}
            </div>
            <div className="text-sm font-bold text-gray-200 break-words overflow-hidden">
                {value}
            </div>
        </div>
    );
}
