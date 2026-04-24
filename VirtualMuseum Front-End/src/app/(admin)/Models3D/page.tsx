"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Upload,
    Eye,
    Trash2,
    Box,
    Clock,
    X,
    Database,
    HardDrive,
    BarChart3,
    Edit,
} from "lucide-react";
import {
    createAdminFile,
    createArtifact,
    deleteArtifact,
    getAdminArtifacts,
    getAdminCategories,
    getAdminEras,
    getAdminMaterials,
    updateArtifact,
} from "../../../lib/adminApi";
import { getCurrentUser } from "../../../lib/authStorage";
import { useRouter } from "next/navigation";

function slugify(input: string) {
    return input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export default function Models3D() {
    const router = useRouter();
    const [models, setModels] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [eras, setEras] = useState<any[]>([]);
    const [materials, setMaterials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [showUploadModal, setShowUploadModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [eraId, setEraId] = useState("");
    const [materialId, setMaterialId] = useState("");
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [depth, setDepth] = useState("");
    const [weight, setWeight] = useState("");
    const [saving, setSaving] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [modelUrl, setModelUrl] = useState("");

    const totalStorageMb = useMemo(() => models.length * 18.5, [models.length]);

    const load = async () => {
        setLoading(true);
        setError("");
        try {
            const [artRes, catRes, eraRes, matRes] = await Promise.all([
                getAdminArtifacts(),
                getAdminCategories(),
                getAdminEras(),
                getAdminMaterials(),
            ]);
            setModels(Array.isArray(artRes?.data) ? artRes.data : []);
            setCategories(Array.isArray(catRes?.data) ? catRes.data : []);
            setEras(Array.isArray(eraRes?.data) ? eraRes.data : []);
            setMaterials(Array.isArray(matRes?.data) ? matRes.data : []);
        } catch (e: any) {
            setError(e?.message || "Failed to load models.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const openCreate = () => {
        setEditingId(null);
        setTitle("");
        setCategoryId("");
        setEraId("");
        setMaterialId("");
        setHeight("");
        setWidth("");
        setDepth("");
        setWeight("");
        setThumbnailUrl("");
        setModelUrl("");
        setShowUploadModal(true);
        setError("");
        setSuccess("");
    };

    const openEdit = (model: any) => {
        setEditingId(model.id);
        setTitle(model.slug || "");
        setCategoryId(model.categoryId || "");
        setEraId(model.eraId || "");
        setMaterialId(model.materialId || "");
        setHeight(model.height ?? "");
        setWidth(model.width ?? "");
        setDepth(model.depth ?? "");
        setWeight(model.weight ?? "");
        setThumbnailUrl(model.thumbnailFile?.url || "");
        setModelUrl(model.modelFile?.url || "");
        setShowUploadModal(true);
        setError("");
        setSuccess("");
    };

    const saveModel = async () => {
        const candidateSlug = slugify(title || "");
        if (!candidateSlug) {
            setError("Model title is required.");
            return;
        }

        setSaving(true);
        setError("");
        try {
            const me = getCurrentUser();
            const createFileIfPresent = async (url: string, fileType: string) => {
                if (!url.trim()) return null;
                const res = await createAdminFile({
                    url: url.trim(),
                    fileName: url.split("/").pop() || `${fileType}-${Date.now()}`,
                    fileType,
                    storageProvider: "external",
                });
                return res?.data?.id || null;
            };
            const modelFileId = await createFileIfPresent(modelUrl, "model");
            const thumbnailFileId = await createFileIfPresent(thumbnailUrl, "image");
            const payload: any = {
                slug: editingId ? candidateSlug : `${candidateSlug}-${Date.now()}`,
                categoryId: categoryId || null,
                eraId: eraId || null,
                materialId: materialId || null,
                discoveryLocationId: null,
                modelFileId,
                thumbnailFileId,
                height: height === "" ? null : Number(height),
                width: width === "" ? null : Number(width),
                depth: depth === "" ? null : Number(depth),
                weight: weight === "" ? null : Number(weight),
                createdBy: me?.userId || null,
            };

            if (editingId) {
                await updateArtifact(editingId, payload);
                setSuccess("3D model updated.");
            } else {
                await createArtifact(payload);
                setSuccess("3D model uploaded.");
            }
            setShowUploadModal(false);
            await load();
        } catch (e: any) {
            setError(e?.message || "Failed to save model.");
        } finally {
            setSaving(false);
        }
    };

    const removeModel = async (model: any) => {
        if (!window.confirm(`Delete model "${model.slug}"?`)) return;
        setError("");
        setSuccess("");
        try {
            await deleteArtifact(model.id);
            setSuccess("3D model deleted.");
            await load();
        } catch (e: any) {
            setError(e?.message || "Failed to delete model.");
        }
    };

    const previewModel = (model: any) => {
        if (!model?.id) return;
        router.push(`/artifacts/${model.id}`);
    };

    return (
        <div className="p-8 space-y-10 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-white mb-2">
                        Dimension Control
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Upload/edit/delete 3D assets. Changes reflect on user pages.
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] text-black font-black uppercase tracking-tighter rounded-xl hover:bg-[#b5952f] transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] active:scale-95"
                >
                    <Upload className="w-5 h-5" />
                    Inject 3D Asset
                </button>
            </div>

            {(error || success) && (
                <div className="space-y-2">
                    {error ? (
                        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300 text-sm">
                            {error}
                        </div>
                    ) : null}
                    {success ? (
                        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-300 text-sm">
                            {success}
                        </div>
                    ) : null}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        label: "Archived Assets",
                        value: String(models.length),
                        icon: Database,
                        color: "text-[#D4AF37]",
                    },
                    {
                        label: "Visual Interactions",
                        value: "Live",
                        icon: BarChart3,
                        color: "text-emerald-500",
                    },
                    {
                        label: "Vault Storage",
                        value: `${(totalStorageMb / 1024).toFixed(2)} GB`,
                        icon: HardDrive,
                        color: "text-blue-500",
                    },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#111] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group"
                    >
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-[#D4AF37]/30 transition-colors">
                                <stat.icon size={24} className={stat.color} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">
                                    {stat.label}
                                </p>
                                <p className="text-3xl font-mono font-bold text-white">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                        <Box
                            size={80}
                            className="absolute -bottom-6 -right-6 text-white opacity-[0.02] group-hover:scale-110 transition-transform duration-700"
                        />
                    </motion.div>
                ))}
            </div>

            {loading ? (
                <div className="text-gray-400 text-sm">Loading models...</div>
            ) : (
                <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/[0.02] border-b border-white/5">
                                <tr>
                                    <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">
                                        Asset Name
                                    </th>
                                    <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">
                                        Linked Category
                                    </th>
                                    <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black text-center">
                                        Dimensions
                                    </th>
                                    <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black text-center">
                                        Dates
                                    </th>
                                    <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-black">
                                        Status
                                    </th>
                                    <th className="px-6 py-5 text-center text-xs text-gray-500 uppercase tracking-widest font-black">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {models.map((model, index) => (
                                    <motion.tr
                                        key={model.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-white/[0.01] transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-xl flex items-center justify-center border border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-colors">
                                                    <Box className="w-6 h-6 text-[#D4AF37]" />
                                                </div>
                                                <div className="text-white font-medium group-hover:text-[#D4AF37] transition-colors">
                                                    {model.slug}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-sm font-medium">
                                            {model.category?.name || "Uncategorized"}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="text-white font-mono text-xs">
                                                H:{model.height ?? "-"} W:{model.width ?? "-"} D:{model.depth ?? "-"}
                                            </div>
                                            <div className="text-[10px] text-gray-600 font-bold uppercase mt-1">
                                                Weight {model.weight ?? "-"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-white font-mono font-bold text-xs">
                                                    {new Date(model.createdAt).toLocaleDateString()}
                                                </span>
                                                <span className="text-[9px] text-gray-600 uppercase font-black tracking-tighter">
                                                    Uploaded
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-emerald-500">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">
                                                    Online
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => previewModel(model)}
                                                    className="p-2 text-gray-500 hover:text-white transition-all bg-white/5 rounded-lg border border-white/5 hover:border-white/20"
                                                    title="Open 3D preview"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => openEdit(model)}
                                                    className="p-2 text-gray-500 hover:text-[#D4AF37] transition-all bg-white/5 rounded-lg border border-white/5 hover:border-[#D4AF37]/30"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => removeModel(model)}
                                                    className="p-2 text-gray-500 hover:text-red-500 transition-all bg-white/5 rounded-lg border border-white/5 hover:border-red-500/30"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <AnimatePresence>
                {showUploadModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !saving && setShowUploadModal(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] p-10 w-full max-w-2xl relative z-10 shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20">
                                        <Upload className="text-[#D4AF37]" size={24} />
                                    </div>
                                    <h2 className="text-2xl font-serif font-bold text-white">
                                        {editingId ? "Edit 3D Model" : "Upload Neural Scan"}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => !saving && setShowUploadModal(false)}
                                    className="p-2 text-gray-500 hover:text-white transition-colors bg-white/5 rounded-full"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-3">
                                        Model Title
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all font-medium appearance-none"
                                        placeholder="Model title (used as slug)"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-3">
                                        Metadata
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <select
                                            value={categoryId}
                                            onChange={(e) => setCategoryId(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                                        >
                                            <option value="" className="bg-[#111]">
                                                Category
                                            </option>
                                            {categories.map((c) => (
                                                <option key={c.id} value={c.id} className="bg-[#111]">
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            value={eraId}
                                            onChange={(e) => setEraId(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                                        >
                                            <option value="" className="bg-[#111]">
                                                Era
                                            </option>
                                            {eras.map((er) => (
                                                <option key={er.id} value={er.id} className="bg-[#111]">
                                                    {er.name}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            value={materialId}
                                            onChange={(e) => setMaterialId(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                                        >
                                            <option value="" className="bg-[#111]">
                                                Material
                                            </option>
                                            {materials.map((m) => (
                                                <option key={m.id} value={m.id} className="bg-[#111]">
                                                    {m.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-3">
                                        Asset URLs
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <input
                                            value={thumbnailUrl}
                                            onChange={(e) => setThumbnailUrl(e.target.value)}
                                            type="text"
                                            placeholder="2D thumbnail URL"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                                        />
                                        <input
                                            value={modelUrl}
                                            onChange={(e) => setModelUrl(e.target.value)}
                                            type="text"
                                            placeholder="3D model URL (.glb/.gltf)"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-3">
                                        Dimensions
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <input
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            type="number"
                                            step="0.01"
                                            placeholder="Height"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                                        />
                                        <input
                                            value={width}
                                            onChange={(e) => setWidth(e.target.value)}
                                            type="number"
                                            step="0.01"
                                            placeholder="Width"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                                        />
                                        <input
                                            value={depth}
                                            onChange={(e) => setDepth(e.target.value)}
                                            type="number"
                                            step="0.01"
                                            placeholder="Depth"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                                        />
                                        <input
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            type="number"
                                            step="0.01"
                                            placeholder="Weight"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={saveModel}
                                        disabled={saving}
                                        className="flex-1 px-6 py-4 bg-[#D4AF37] text-black font-black uppercase tracking-widest rounded-2xl hover:bg-[#b5952f] transition-all shadow-xl active:scale-95 disabled:opacity-60"
                                    >
                                        {saving
                                            ? "Saving..."
                                            : editingId
                                              ? "Save Changes"
                                              : "Upload Model"}
                                    </button>
                                    <button
                                        onClick={() =>
                                            !saving && setShowUploadModal(false)
                                        }
                                        className="flex-1 px-6 py-4 bg-white/5 text-gray-400 font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/10"
                                    >
                                        Abort
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

