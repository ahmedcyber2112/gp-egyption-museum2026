"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit, Trash2, Upload, Filter, X, Eye, Box } from "lucide-react";
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

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

export default function Artifacts() {
  const [artifacts, setArtifacts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [eras, setEras] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEra, setSelectedEra] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [eraId, setEraId] = useState("");
  const [materialId, setMaterialId] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [modelUrl, setModelUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

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
      setArtifacts(Array.isArray(artRes?.data) ? artRes.data : []);
      setCategories(Array.isArray(catRes?.data) ? catRes.data : []);
      setEras(Array.isArray(eraRes?.data) ? eraRes.data : []);
      setMaterials(Array.isArray(matRes?.data) ? matRes.data : []);
    } catch (e: any) {
      setError(e?.message || "Failed to load artifacts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filteredArtifacts = useMemo(() => artifacts.filter(
    (artifact) =>
      (artifact.slug || "").toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedEra === "all" || artifact.era?.name === selectedEra),
  ), [artifacts, searchTerm, selectedEra]);

  const openCreate = () => {
    setEditingId(null);
    setTitle("");
    setCategoryId("");
    setEraId("");
    setMaterialId("");
    setThumbnailUrl("");
    setModelUrl("");
    setShowAddModal(true);
  };

  const openEdit = (artifact: any) => {
    setEditingId(artifact.id);
    setTitle(artifact.slug || "");
    setCategoryId(artifact.categoryId || "");
    setEraId(artifact.eraId || "");
    setMaterialId(artifact.materialId || "");
    setThumbnailUrl(artifact.thumbnailFile?.url || "");
    setModelUrl(artifact.modelFile?.url || "");
    setShowAddModal(true);
  };

  const resolveFileId = async (url: string, fileType: string) => {
    if (!url.trim()) return null;
    const res = await createAdminFile({
      url: url.trim(),
      fileName: url.split("/").pop() || `${fileType}-${Date.now()}`,
      fileType,
      storageProvider: "external",
    });
    return res?.data?.id || null;
  };

  const readFileAsDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
      reader.onerror = () => reject(new Error("Failed to read selected file."));
      reader.readAsDataURL(file);
    });

  const handleSelectImageFile = async (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image format.");
      return;
    }
    if (file.size > 5_000_000) {
      setError("Image too large. Max 5MB.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setThumbnailUrl(dataUrl);
      setSuccess("Image uploaded in form. Save artifact to persist.");
    } catch (e: any) {
      setError(e?.message || "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSelectModelFile = async (file?: File | null) => {
    if (!file) return;
    const allowed =
      [".glb", ".gltf", ".obj", ".fbx", ".stl", ".usdz"].some((ext) =>
        file.name.toLowerCase().endsWith(ext),
      );
    if (!allowed) {
      setError("Supported 3D formats: GLB, GLTF, OBJ, FBX, STL, USDZ.");
      return;
    }
    if (file.size > 8_000_000) {
      setError("3D model too large. Max 8MB.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setModelUrl(dataUrl);
      setSuccess("3D model uploaded in form. Save artifact to persist.");
    } catch (e: any) {
      setError(e?.message || "Failed to upload 3D model.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    const candidate = slugify(title);
    if (!candidate) {
      setError("Artifact title is required.");
      return;
    }
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const me = getCurrentUser();
      const thumbnailFileId = await resolveFileId(thumbnailUrl, "image");
      const modelFileId = await resolveFileId(modelUrl, "model");
      const payload: any = {
        slug: editingId ? candidate : `${candidate}-${Date.now()}`,
        categoryId: categoryId || null,
        eraId: eraId || null,
        materialId: materialId || null,
        discoveryLocationId: null,
        modelFileId,
        thumbnailFileId,
        height: null,
        width: null,
        depth: null,
        weight: null,
        createdBy: me?.userId || null,
      };
      if (editingId) {
        await updateArtifact(editingId, payload);
        setSuccess("Artifact updated successfully.");
      } else {
        await createArtifact(payload);
        setSuccess("Artifact created successfully.");
      }
      setShowAddModal(false);
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to save artifact.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (artifact: any) => {
    if (!window.confirm(`Delete artifact "${artifact.slug}"?`)) return;
    try {
      await deleteArtifact(artifact.id);
      setSuccess("Artifact deleted.");
      await load();
    } catch (e: any) {
      setError(e?.message || "Failed to delete artifact.");
    }
  };

  return (
    <div className="p-8 space-y-8 min-h-screen">
      
      {/* ================= Header ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Artifacts Management</h1>
          <p className="text-gray-400 text-sm">Create, edit, and organize museum treasures.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#b5952f] transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add New Artifact
        </button>
      </div>

      {/* ================= Filters ================= */}
      <div className="bg-[#111] border border-white/5 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
              <Filter className="w-5 h-5 text-gray-500" />
            </div>
            <select
              value={selectedEra}
              onChange={(e) => setSelectedEra(e.target.value)}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all cursor-pointer"
            >
              <option value="all" className="bg-[#111]">All Eras</option>
              <option value="Pharaonic" className="bg-[#111]">Pharaonic</option>
              <option value="Greek" className="bg-[#111]">Greek</option>
              <option value="Roman" className="bg-[#111]">Roman</option>
              <option value="Ptolemaic" className="bg-[#111]">Ptolemaic</option>
            </select>
          </div>
        </div>
      </div>

      {(error || success) ? (
        <div className="space-y-2">
          {error ? <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300 text-sm">{error}</div> : null}
          {success ? <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-300 text-sm">{success}</div> : null}
        </div>
      ) : null}

      {/* ================= Artifacts Table ================= */}
      <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/5">
              <tr>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-bold">Artifact</th>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-bold">Era</th>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-bold">Category</th>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-bold">Location</th>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-bold">Analytics</th>
                <th className="px-6 py-5 text-left text-xs text-gray-500 uppercase tracking-widest font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredArtifacts.map((artifact, index) => (
                  <motion.tr 
                    key={artifact.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#050505] border border-white/10 rounded-xl flex items-center justify-center text-2xl group-hover:border-[#D4AF37]/50 transition-colors shadow-inner">
                          {artifact.image}
                        </div>
                        <div>
                          <div className="text-white font-medium group-hover:text-[#D4AF37] transition-colors">{artifact.slug}</div>
                          <div className="text-[10px] text-gray-600 font-mono tracking-tighter">ID: {artifact.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {artifact.era?.name || "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm font-medium">{artifact.category?.name || "Uncategorized"}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{artifact.discoveryLocation?.name || "Not set"}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Eye size={14} className="text-emerald-500" />
                        <span className="text-white font-mono text-sm">{new Date(artifact.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openEdit(artifact)} className="p-2 text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-xl transition-all" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => openEdit(artifact)} className="p-2 text-gray-400 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-all" title="Upload 3D">
                          <Box className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(artifact)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= Add Modal ================= */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-2xl relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-hide"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-bold text-white">{editingId ? "Edit Artifact" : "Add Royal Artifact"}</h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 text-gray-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2 group-focus-within:text-white transition-colors">Artifact Name</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                    placeholder="e.g., statue-of-anubis"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Historical Era</label>
                    <select value={eraId} onChange={(e) => setEraId(e.target.value)} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all appearance-none cursor-pointer">
                      <option value="" className="bg-[#111]">Select Era</option>
                      {eras.map((era) => <option key={era.id} value={era.id} className="bg-[#111]">{era.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Category</label>
                    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all appearance-none cursor-pointer">
                      <option value="" className="bg-[#111]">Select Category</option>
                      {categories.map((c) => <option key={c.id} value={c.id} className="bg-[#111]">{c.name}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Material</label>
                  <select value={materialId} onChange={(e) => setMaterialId(e.target.value)} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all appearance-none cursor-pointer">
                    <option value="" className="bg-[#111]">Select Material</option>
                    {materials.map((m) => <option key={m.id} value={m.id} className="bg-[#111]">{m.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">2D Thumbnail URL</label>
                  <input
                    type="text"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">3D Model URL</label>
                  <input
                    type="text"
                    value={modelUrl}
                    onChange={(e) => setModelUrl(e.target.value)}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                    placeholder="https://...glb"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Visual Content</label>
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 text-center hover:border-[#D4AF37]/50 transition-all bg-white/[0.01]">
                    <Upload className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                    <p className="text-sm text-gray-400 font-medium">Upload image and 3D model files</p>
                    <p className="text-[10px] text-gray-600 mt-1">Images: all formats (max 5MB) • 3D: glb/gltf/obj/fbx/stl/usdz (max 8MB)</p>
                    <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                      <label className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white cursor-pointer hover:border-[#D4AF37]/40">
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleSelectImageFile(e.target.files?.[0])}
                        />
                      </label>
                      <label className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white cursor-pointer hover:border-[#D4AF37]/40">
                        Upload 3D Model
                        <input
                          type="file"
                          accept=".glb,.gltf,.obj,.fbx,.stl,.usdz,model/gltf-binary,model/gltf+json"
                          className="hidden"
                          onChange={(e) => handleSelectModelFile(e.target.files?.[0])}
                        />
                      </label>
                    </div>
                    {uploading ? <div className="mt-3 text-xs text-[#D4AF37]">Processing upload...</div> : null}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button onClick={handleSave} disabled={saving} className="flex-1 px-6 py-4 bg-[#D4AF37] text-black font-black uppercase tracking-widest rounded-2xl hover:bg-[#b5952f] transition-all active:scale-95 shadow-xl disabled:opacity-60">
                    {saving ? "Saving..." : editingId ? "Save Artifact" : "Register Artifact"}
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/10"
                  >
                    Cancel
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