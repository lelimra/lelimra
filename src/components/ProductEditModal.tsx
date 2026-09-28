import React, { useState, useEffect, useRef } from "react";
import { useProducts } from "@/context/ProductContext";
import { Product, ProductCategory } from "@/data/products";
import { optimizeImageFile } from "@/utils/imageOptimizer";
import {
  X,
  Upload,
  Image as ImageIcon,
  IndianRupee,
  Trash2,
  Plus,
  Check,
  Star,
  Info,
  Layers,
  Sparkles,
  RotateCcw,
  Tag,
  AlertCircle,
} from "lucide-react";

export const ProductEditModal: React.FC = () => {
  const {
    isModalOpen,
    editingProduct,
    modalTab,
    closeModal,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState<ProductCategory>("ceiling-fan");
  const [price, setPrice] = useState<string>("");
  const [mrp, setMrp] = useState<string>("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [sweep, setSweep] = useState("1200 mm (48 inch)");
  const [rpm, setRpm] = useState("380 RPM");
  const [wattage, setWattage] = useState("70 W");
  const [airDelivery, setAirDelivery] = useState("207 CFM");
  const [winding, setWinding] = useState("Aluminium winding");
  const [bodyMaterial, setBodyMaterial] = useState("Aluminium");
  const [blades, setBlades] = useState("3");
  const [colorsText, setColorsText] = useState("Viola blue, Pearl Ivory, Baker's Brown, Satin Gold");
  const [warranty, setWarranty] = useState("2 Year Warranty");
  const [available, setAvailable] = useState(true);
  const [featured, setFeatured] = useState(true);

  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"basics" | "images" | "specs">("basics");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when modal opens or editingProduct changes
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || "");
      setModel(editingProduct.model || "");
      setCategory(editingProduct.category || "ceiling-fan");
      setPrice(editingProduct.price ? String(editingProduct.price) : "");
      setMrp(editingProduct.mrp ? String(editingProduct.mrp) : "");
      setShortDescription(editingProduct.shortDescription || "");
      setDescription(editingProduct.description || "");
      setImages(editingProduct.images ? [...editingProduct.images] : []);
      setSweep(editingProduct.specifications.size || editingProduct.specifications.sweep || "");
      setRpm(editingProduct.specifications.rpm || "");
      setWattage(editingProduct.specifications.wattage || "");
      setAirDelivery(editingProduct.specifications.airDelivery || "");
      setWinding(editingProduct.specifications.winding || "");
      setBodyMaterial(editingProduct.specifications.bodyMaterial || "");
      setBlades(editingProduct.specifications.blades || "3");
      setColorsText(editingProduct.specifications.colors?.join(", ") || "");
      setWarranty(editingProduct.warranty || "2 Year Warranty");
      setAvailable(editingProduct.available !== false);
      setFeatured(Boolean(editingProduct.featured));
    } else {
      // Defaults for new product
      setName("");
      setModel("LIMRA-NEW-01");
      setCategory("ceiling-fan");
      setPrice("2299");
      setMrp("2999");
      setShortDescription("High-speed durable fan designed for premium cooling performance.");
      setDescription("Engineered with precision balanced blades, heavy-duty motor, and factory-tested components for reliable everyday use.");
      setImages([]);
      setSweep("1200 mm (48 inch)");
      setRpm("380 RPM");
      setWattage("70 W");
      setAirDelivery("210 CFM");
      setWinding("Aluminium winding");
      setBodyMaterial("Aluminium");
      setBlades("3");
      setColorsText("Viola blue, Pearl Ivory, Baker's Brown, Satin Gold");
      setWarranty("2 Year Warranty");
      setAvailable(true);
      setFeatured(true);
    }
    setErrorMsg(null);
    setSuccessMsg(null);
    setActiveTab(modalTab || "basics");
  }, [editingProduct, isModalOpen, modalTab]);

  if (!isModalOpen) return null;

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsProcessingImage(true);
    setErrorMsg(null);

    try {
      const newImagesList = [...images];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          setErrorMsg("Please upload valid image files (JPG, PNG, WebP).");
          continue;
        }
        // Optimize and convert to Data URL
        const optimized = await optimizeImageFile(file, 1200, 0.88);
        newImagesList.push(optimized);
      }
      setImages(newImagesList);
      setSuccessMsg(`Added ${files.length} photo(s) successfully!`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to process image. Please try another file.");
    } finally {
      setIsProcessingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const isPrimary = indexToRemove === 0;
    const newImages = images.filter((_, idx) => idx !== indexToRemove);
    setImages(newImages);
    if (isPrimary && newImages.length > 0) {
      setSuccessMsg("Primary photo deleted! The next photo is now your primary cover pic.");
    } else if (newImages.length === 0) {
      setSuccessMsg("All photos deleted. You can upload new photos or save to use default.");
    } else {
      setSuccessMsg(`Photo #${indexToRemove + 1} deleted.`);
    }
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const handleRemoveAllImages = () => {
    if (window.confirm("Are you sure you want to delete ALL photos for this product?")) {
      setImages([]);
      setSuccessMsg("All photos have been deleted.");
      setTimeout(() => setSuccessMsg(null), 3500);
    }
  };

  const handleSetPrimaryImage = (index: number) => {
    if (index === 0) return;
    const selected = images[index];
    const remaining = images.filter((_, idx) => idx !== index);
    setImages([selected, ...remaining]);
    setSuccessMsg("Primary cover photo updated!");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Product name is required.");
      setActiveTab("basics");
      return;
    }

    const parsedPrice = price ? parseFloat(price) : undefined;
    const parsedMrp = mrp ? parseFloat(mrp) : undefined;

    const colorsArray = colorsText
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    const productPayload: Omit<Product, "id"> = {
      name: name.trim(),
      slug:
        editingProduct?.slug ||
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
      category,
      model: model.trim() || undefined,
      shortDescription: shortDescription.trim() || "High quality industrial fan.",
      description: description.trim() || shortDescription.trim(),
      images:
        images.length > 0
          ? images
          : category === "ceiling-fan"
          ? ["/images/products/ceiling-fan-01.jpg"]
          : category === "table-fan"
          ? ["/images/products/table-fan-01.jpg"]
          : ["/images/products/pedestal-fan-01.jpg"],
      price: parsedPrice,
      mrp: parsedMrp,
      specifications: {
        size: sweep || undefined,
        sweep: sweep || undefined,
        rpm: rpm || undefined,
        wattage: wattage || undefined,
        airDelivery: airDelivery || undefined,
        winding: winding || undefined,
        bodyMaterial: bodyMaterial || undefined,
        blades: blades || undefined,
        colors: colorsArray.length > 0 ? colorsArray : undefined,
      },
      features: [
        airDelivery ? `Air Delivery: ${airDelivery}` : "High airflow output",
        rpm ? `High Speed Motor: ${rpm}` : "High speed motor",
        winding ? `Motor Winding: ${winding}` : "Durable motor winding",
        warranty ? `Warranty: ${warranty}` : "2 Year Warranty",
        "Factory direct quality standard by LIMRA INDUSTRIES",
      ],
      warranty: warranty || "2 Year Warranty",
      available,
      featured,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    closeModal();
  };

  const handleDelete = () => {
    if (!editingProduct) return;
    if (window.confirm(`Are you sure you want to delete "${editingProduct.name}"?`)) {
      deleteProduct(editingProduct.id);
      closeModal();
    }
  };

  const numPrice = parseFloat(price) || 0;
  const numMrp = parseFloat(mrp) || 0;
  const discountPercent =
    numMrp > numPrice && numPrice > 0
      ? Math.round(((numMrp - numPrice) / numMrp) * 100)
      : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#07192f] via-[#0b2f5c] to-[#174e8c] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-blue-200">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 id="product-modal-title" className="font-bold text-base leading-snug">
                {editingProduct ? "Edit Product, Photo & Price" : "Add New Product & Photo"}
              </h3>
              <p className="text-[11px] text-blue-200/80">
                Update prices, upload photos, and edit specifications instantly
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 pb-0 bg-slate-50 border-b border-slate-200 flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("basics")}
            className={`px-3.5 py-2 text-xs font-bold rounded-t-lg border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "basics"
                ? "border-[#0b2f5c] text-[#0b2f5c] bg-white shadow-sm"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <IndianRupee className="w-3.5 h-3.5" />
            <span>Price & Basics</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("images")}
            className={`px-3.5 py-2 text-xs font-bold rounded-t-lg border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "images"
                ? "border-[#0b2f5c] text-[#0b2f5c] bg-white shadow-sm"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Product Photos ({images.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("specs")}
            className={`px-3.5 py-2 text-xs font-bold rounded-t-lg border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "specs"
                ? "border-[#0b2f5c] text-[#0b2f5c] bg-white shadow-sm"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Specifications</span>
          </button>
        </div>

        {/* Notifications */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-5">
          {/* TAB 1: PRICE & BASICS */}
          {activeTab === "basics" && (
            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Avencer Prime 1200 mm Decorative Ceiling Fan"
                  required
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] font-medium"
                />
              </div>

              {/* Price & MRP Highlight Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/70 to-slate-50 border border-blue-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0b2f5c] uppercase tracking-wider">
                    <IndianRupee className="w-4 h-4" />
                    <span>Pricing (Internal Reference Only)</span>
                  </div>
                  {discountPercent !== null && (
                    <span className="bg-emerald-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Selling Price (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 font-bold text-sm">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="e.g. 2450"
                        min="0"
                        className="w-full pl-7 pr-3 py-2 text-sm font-bold text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2f5c]"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 mt-0.5 block">
                      Internal base rate (hidden from public product pages)
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Maximum Retail Price / MRP (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 font-bold text-sm">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={mrp}
                        onChange={(e) => setMrp(e.target.value)}
                        placeholder="e.g. 3199"
                        min="0"
                        className="w-full pl-7 pr-3 py-2 text-sm text-slate-700 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2f5c]"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 mt-0.5 block">
                      Internal reference MRP (hidden from public display)
                    </span>
                  </div>
                </div>
              </div>

              {/* Category & Model */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Fan Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-white font-medium text-slate-800"
                  >
                    <option value="ceiling-fan">Ceiling Fan</option>
                    <option value="table-fan">Table Fan</option>
                    <option value="pedestal-fan">Pedestal Fan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Model Code / Number
                  </label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="e.g. LIMRA-AP-1200"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] font-mono text-slate-800"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="e.g. Premium 1200 mm decorative ceiling fan with aluminium winding and 207 CFM airflow."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] text-slate-700 resize-none"
                />
              </div>

              {/* Available & Featured Toggles */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={available}
                    onChange={(e) => setAvailable(e.target.checked)}
                    className="rounded text-[#0b2f5c] focus:ring-[#0b2f5c] w-4 h-4"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">In Stock</span>
                    <span className="text-[10px] text-slate-500">Available for immediate dispatch</span>
                  </div>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded text-[#0b2f5c] focus:ring-[#0b2f5c] w-4 h-4"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Featured Product</span>
                    <span className="text-[10px] text-slate-500">Showcases on Homepage</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCT PHOTOS / IMAGES */}
          {activeTab === "images" && (
            <div className="space-y-4">
              {/* Drag & Drop Upload Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                  dragActive
                    ? "border-[#0b2f5c] bg-blue-50/50 scale-[1.01]"
                    : "border-slate-300 hover:border-[#0b2f5c] hover:bg-slate-50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0b2f5c] mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    Click to browse or drag & drop fan photos
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Upload PNG, JPG, or WebP. Add photos for each color finish (Viola Blue, Ivory, Brown, Gold, etc.)
                  </p>
                  {isProcessingImage && (
                    <span className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-[#0b2f5c] animate-pulse">
                      <Sparkles className="w-3.5 h-3.5" />
                      Optimizing and preparing image...
                    </span>
                  )}
                </div>
              </div>

              {/* Photos Gallery / Thumbnails */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-[#0b2f5c]" />
                      <span>Product Photos ({images.length})</span>
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      The 1st photo is your <strong>Primary Cover Photo</strong>. You can delete any pic or set another as primary.
                    </span>
                  </div>

                  {images.length > 0 && (
                    <button
                      type="button"
                      onClick={handleRemoveAllImages}
                      className="px-2.5 py-1 text-[11px] font-bold text-red-600 hover:text-red-700 hover:bg-red-50 rounded border border-red-200 transition-colors inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete All Photos</span>
                    </button>
                  )}
                </div>

                {images.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs flex flex-col items-center">
                    <ImageIcon className="w-8 h-8 text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-700">No photos in catalog for this fan</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Upload photos above using drag & drop or the browse button.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                    {images.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className={`relative rounded-xl overflow-hidden border-2 bg-white flex flex-col shadow-sm transition-all ${
                          idx === 0
                            ? "border-[#0b2f5c] ring-2 ring-blue-100"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {/* Image Preview */}
                        <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                          <img
                            src={imgUrl}
                            alt={`Product view ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />

                          {/* Top Status Tag */}
                          {idx === 0 ? (
                            <div className="absolute top-2 left-2 bg-[#0b2f5c] text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow flex items-center gap-1">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>PRIMARY PIC</span>
                            </div>
                          ) : (
                            <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                              PHOTO #{idx + 1}
                            </div>
                          )}
                        </div>

                        {/* Control Bar under each image */}
                        <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex flex-col gap-1.5">
                          {idx === 0 ? (
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="text-[11px] font-bold text-[#0b2f5c] truncate">
                                Main Cover Picture
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleRemoveImage(0);
                                }}
                                className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold rounded shadow-sm transition-all inline-flex items-center gap-1 shrink-0"
                                title="Delete this primary picture"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete Primary Pic</span>
                              </button>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-1.5">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleSetPrimaryImage(idx);
                                }}
                                className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-[10px] font-bold rounded shadow-sm transition-all inline-flex items-center justify-center gap-1"
                                title="Make this the main cover photo"
                              >
                                <Star className="w-3 h-3 text-amber-500" />
                                <span>Make Primary</span>
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleRemoveImage(idx);
                                }}
                                className="px-2 py-1 bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border border-red-200 hover:border-red-600 text-[10px] font-bold rounded shadow-sm transition-all inline-flex items-center justify-center gap-1"
                                title="Delete this photo"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete Pic</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: DETAILED SPECIFICATIONS */}
          {activeTab === "specs" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Sweep / Size
                  </label>
                  <input
                    type="text"
                    value={sweep}
                    onChange={(e) => setSweep(e.target.value)}
                    placeholder="e.g. 1200 mm (48 inch)"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2f5c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Motor Speed (RPM)
                  </label>
                  <input
                    type="text"
                    value={rpm}
                    onChange={(e) => setRpm(e.target.value)}
                    placeholder="e.g. 380 RPM"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2f5c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Power Consumption (Wattage)
                  </label>
                  <input
                    type="text"
                    value={wattage}
                    onChange={(e) => setWattage(e.target.value)}
                    placeholder="e.g. 70 W"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2f5c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Airflow Delivery
                  </label>
                  <input
                    type="text"
                    value={airDelivery}
                    onChange={(e) => setAirDelivery(e.target.value)}
                    placeholder="e.g. 207 CFM or 220 CMM"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2f5c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Motor Winding
                  </label>
                  <input
                    type="text"
                    value={winding}
                    onChange={(e) => setWinding(e.target.value)}
                    placeholder="e.g. Heavy-Duty Winding / Aluminium Winding"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2f5c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Body Material
                  </label>
                  <input
                    type="text"
                    value={bodyMaterial}
                    onChange={(e) => setBodyMaterial(e.target.value)}
                    placeholder="e.g. Aluminium"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2f5c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Number of Blades
                  </label>
                  <input
                    type="text"
                    value={blades}
                    onChange={(e) => setBlades(e.target.value)}
                    placeholder="e.g. 3"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2f5c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Warranty
                  </label>
                  <input
                    type="text"
                    value={warranty}
                    onChange={(e) => setWarranty(e.target.value)}
                    placeholder="e.g. 2 Year Warranty"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2f5c]"
                  />
                </div>
              </div>

              {/* Available Colors */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Available Color Options (comma separated)
                </label>
                <input
                  type="text"
                  value={colorsText}
                  onChange={(e) => setColorsText(e.target.value)}
                  placeholder="e.g. Viola blue, Pearl Ivory, Baker's Brown, Satin Gold"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2f5c]"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Creates interactive finish selector buttons on product page
                </span>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
            <div>
              {editingProduct && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-3.5 py-2 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Product</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#0b2f5c] hover:bg-[#07192f] text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all inline-flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{editingProduct ? "Save Changes" : "Add Product"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
