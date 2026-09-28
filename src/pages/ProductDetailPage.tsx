import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import { siteConfig } from "@/data/site";
import { ProductImage } from "@/components/ProductImage";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/context/LanguageContext";
import { useAIAssistant } from "@/context/AIAssistantContext";
import { getProductEnquiryWhatsAppUrl, getProductNotifyWhatsAppUrl } from "@/utils/whatsapp";
import { WholesaleForm } from "@/components/WholesaleForm";
import {
  MessageSquare,
  Building2,
  CheckCircle,
  Truck,
  Layers,
  ArrowRight,
  Info,
  Edit3,
  Camera,
  Trash2,
  Star,
  Plus,
  Check,
  ShieldCheck,
  FileCheck2,
  Sparkles,
  Bell,
  BellRing,
  Clock,
  Bot,
} from "lucide-react";

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const {
    getProductBySlug,
    getRelatedProducts,
    openEditProductModal,
    removeProductImage,
    setProductImages,
  } = useProducts();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product?.specifications.colors?.[0] || null
  );
  const [photoActionNotice, setPhotoActionNotice] = useState<string | null>(null);
  const { t } = useLanguage();
  const { openAssistant } = useAIAssistant();

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const handleDeleteActivePhoto = () => {
    if (!product) return;
    const isPrimary = activeImageIndex === 0;
    const confirmMsg = isPrimary
      ? "Are you sure you want to delete the PRIMARY cover photo? The next available photo will become the new primary photo."
      : "Are you sure you want to delete this photo?";

    if (window.confirm(confirmMsg)) {
      removeProductImage(product.id, activeImageIndex);
      setActiveImageIndex(0);
      setPhotoActionNotice(
        isPrimary
          ? "Primary photo deleted! Next photo is now active."
          : "Photo removed from product."
      );
      setTimeout(() => setPhotoActionNotice(null), 3500);
    }
  };

  const handleMakeActivePhotoPrimary = () => {
    if (!product || activeImageIndex === 0) return;
    const selected = product.images[activeImageIndex];
    const remaining = product.images.filter((_, idx) => idx !== activeImageIndex);
    setProductImages(product.id, [selected, ...remaining]);
    setActiveImageIndex(0);
    setPhotoActionNotice("Set as primary cover photo!");
    setTimeout(() => setPhotoActionNotice(null), 3000);
  };

  const relatedProducts = getRelatedProducts(product.slug, product.category, 3);

  const categoryLabels: Record<string, string> = {
    "ceiling-fan": t("navCeilingFans"),
    "table-fan": t("navTableFans"),
    "pedestal-fan": t("navPedestalFans"),
  };

  const categoryUrl: Record<string, string> = {
    "ceiling-fan": "/products/ceiling-fans",
    "table-fan": "/products/table-fans",
    "pedestal-fan": "/products/pedestal-fans",
  };

  // Specifications table mapping (only render non-empty fields)
  const specRows: { label: string; value?: string }[] = [
    { label: "Size / Sweep", value: product.specifications.size || product.specifications.sweep },
    { label: "Rated Speed (RPM)", value: product.specifications.rpm },
    { label: "Power Input (Wattage)", value: product.specifications.wattage },
    { label: "Rated Voltage", value: product.specifications.voltage },
    { label: "Frequency", value: product.specifications.frequency },
    { label: "Motor Type", value: product.specifications.motorType },
    { label: "Motor Winding", value: product.specifications.winding },
    { label: "Bearing Type", value: product.specifications.bearing },
    { label: "Blade Design", value: product.specifications.bladeDesign },
    { label: "Special Features", value: product.specifications.specialFeatures },
    { label: "Number of Blades", value: product.specifications.blades },
    { label: "Air Delivery", value: product.specifications.airDelivery },
    { label: "Noise Level", value: product.specifications.noise },
    { label: "Body Material", value: product.specifications.bodyMaterial },
    { label: "Blade Material", value: product.specifications.bladeMaterial },
  ].filter((row) => Boolean(row.value));

  const whatsappUrl = getProductEnquiryWhatsAppUrl(
    product.name + (selectedColor ? ` (Finish: ${selectedColor})` : ""),
    product.model
  );

  const notifyWhatsAppUrl = getProductNotifyWhatsAppUrl(
    product.name,
    product.model,
    selectedColor
  );

  return (
    <>
      <SEOHead
        title={product.name}
        description={product.shortDescription}
        product={product}
      />

      <div className="bg-slate-50 min-h-screen pb-20">
        {/* Top Header & Breadcrumbs */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs
              items={[
                { label: t("navProducts"), href: "/products" },
                {
                  label: categoryLabels[product.category] || "Category",
                  href: categoryUrl[product.category] || "/products",
                },
                { label: product.name },
              ]}
            />
          </div>
        </div>

        {/* Main Product Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Image Gallery */}
              <div className="lg:col-span-6 space-y-4">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 border border-slate-200">
                  <ProductImage
                    src={product.images[activeImageIndex] || product.images[0]}
                    alt={product.name}
                    category={product.category}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-[#091a32] text-white text-[11px] font-semibold px-2.5 py-1 rounded shadow-xs uppercase tracking-wide">
                    {categoryLabels[product.category]}
                  </span>
                </div>

                {/* Thumbnails if multiple images */}
                {product.images.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveImageIndex(idx);
                          if (product.specifications.colors && product.specifications.colors[idx]) {
                            setSelectedColor(product.specifications.colors[idx]);
                          }
                        }}
                        className={`relative w-18 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                          activeImageIndex === idx
                            ? "border-[#091a32] shadow-xs"
                            : "border-slate-200 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <ProductImage
                          src={img}
                          alt={`${product.name} - View ${idx + 1}`}
                          category={product.category}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Dispatch & Factory note */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-600">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                    <Truck className="w-4 h-4 text-[#0b2f5c] shrink-0" />
                    <span>Pan-India Transport Dispatch</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-[#0b2f5c] shrink-0" />
                    <span>Carton & Bulk Orders Available</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Product Info & Actions */}
              <div className="lg:col-span-6 flex flex-col">
                {/* Brand & Model & Quality Tagline */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <span>{siteConfig.brandName}</span>
                    <span aria-hidden="true">·</span>
                    <span>Direct Factory</span>
                    {product.model && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-slate-600">Model: {product.model}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Product Name */}
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 leading-tight">
                  {product.name}
                </h1>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {product.description || product.shortDescription}
                </p>

                {/* Stock Status & Factory Supply Strip */}
                <div className="mt-5 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          product.available
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            product.available
                              ? "bg-emerald-600"
                              : "bg-[#e31e24] animate-pulse"
                          }`}
                        />
                        <span>{product.available ? t("inStock") : "Out of Stock"}</span>
                      </span>

                      <span className="text-xs text-slate-600 font-medium">
                        Direct Factory Supply • Wholesale &amp; Trade Inquiries
                      </span>
                    </div>

                    <button
                      onClick={() => openEditProductModal(product)}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-[#091a32] text-xs font-bold shadow-2xs transition-all flex items-center gap-1"
                      title="Edit product stock, photos, or specifications"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Edit Product</span>
                    </button>
                  </div>
                </div>

                {/* Out of Stock Notice & Quick WhatsApp Notification Strip */}
                {!product.available && (
                  <div className="mt-5 p-4 rounded-xl bg-amber-50/90 border border-amber-200 shadow-2xs">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5 sm:mt-0">
                          <BellRing className="w-5 h-5 text-amber-700 animate-bounce" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-amber-950">
                              Currently Out of Stock / In Production
                            </h4>
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-900 tracking-wider">
                              Restock Scheduled
                            </span>
                          </div>
                          <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                            The next factory assembly batch is being scheduled. Inquire directly on WhatsApp to get the exact next availability date or reserve units from the upcoming dispatch.
                          </p>
                        </div>
                      </div>
                      <a
                        href={notifyWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#e31e24] hover:bg-[#c4181d] text-white text-xs font-bold shadow-xs transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
                        id="notify-me-banner-btn"
                        title="Enquire on WhatsApp about next availability date"
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span>Notify Me (WhatsApp)</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Available Colors */}
                {product.specifications.colors && product.specifications.colors.length > 0 && (
                  <div className="mt-6">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Available Finishes / Colors
                    </label>
                    <div className="flex flex-wrap items-center gap-2">
                      {product.specifications.colors.map((clr, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedColor(clr);
                            if (product.images && product.images[idx]) {
                              setActiveImageIndex(idx);
                            }
                          }}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all flex items-center gap-1.5 ${
                            selectedColor === clr
                              ? "bg-[#091a32] text-white border-[#091a32] shadow-xs"
                              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <span>{clr}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Primary Actions: Out of stock 'Notify Me' OR In-stock actions */}
                {!product.available ? (
                  <div className="mt-8 space-y-3">
                    {/* Primary Highlighted 'Notify Me' Button */}
                    <a
                      href={notifyWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2.5 bg-[#e31e24] hover:bg-[#c4181d] text-white text-base font-extrabold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all group text-center"
                      id="notify-me-primary-btn"
                      title="Enquire about next availability date via WhatsApp"
                    >
                      <BellRing className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span>Notify Me for Next Availability Date</span>
                    </a>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold py-3.5 px-4 rounded-xl shadow-xs transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>General Sales Chat</span>
                      </a>

                      <Link
                        to="/wholesale"
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#091a32] hover:bg-[#112d52] text-white text-xs sm:text-sm font-bold py-3.5 px-4 rounded-xl shadow-xs transition-colors"
                      >
                        <Building2 className="w-4 h-4 text-slate-300" />
                        <span>Wholesale &amp; Bulk Inquiry</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#e31e24] hover:bg-[#c4181d] text-white text-sm font-bold py-3.5 px-5 rounded-xl shadow transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Enquire on WhatsApp</span>
                    </a>

                    <Link
                      to="/wholesale"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#091a32] hover:bg-[#112d52] text-white text-sm font-bold py-3.5 px-5 rounded-xl shadow transition-colors"
                    >
                      <Building2 className="w-4 h-4 text-slate-300" />
                      <span>Request Wholesale Quote</span>
                    </Link>
                  </div>
                )}

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Link
                    to="/freight-estimator"
                    className="py-2.5 px-3 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-center shadow-2xs"
                  >
                    <Truck className="w-3.5 h-3.5 text-slate-600" />
                    <span>Freight &amp; Logistics Estimator</span>
                  </Link>

                  <Link
                    to={`/warranty?tab=register&model=${product.slug}`}
                    className="py-2.5 px-3 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-center shadow-2xs"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>2-Year Warranty Portal</span>
                  </Link>
                </div>

                {/* AI Assistant Inquiry Prompt */}
                <button
                  type="button"
                  onClick={() =>
                    openAssistant(
                      `Tell me about ${product.name} (Model: ${product.model || "LE LIMRA"}). What room size is it ideal for, what is its RPM & air delivery, and why should I choose it?`
                    )
                  }
                  className="mt-3 w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-[#091a32] text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs group"
                >
                  <Bot className="w-4 h-4 text-[#e31e24] group-hover:rotate-12 transition-transform" />
                  <span>Ask Limra AI about {product.name.split(" ")[0]} specs &amp; room fit</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </button>

                {/* Product Highlights Strip */}
                {product.highlights && product.highlights.length > 0 && (
                  <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-slate-50 border border-blue-200/80">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#0b2f5c] mb-3">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>Product Highlights</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {product.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs font-semibold text-slate-800 bg-white/90 p-2.5 rounded-lg border border-blue-100 shadow-2xs"
                        >
                          <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Features Bullets */}
                {product.features && product.features.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                      Features & Engineering
                    </h3>
                    <ul className="space-y-2">
                      {product.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Technical Specifications Table */}
            {specRows.length > 0 && (
              <div className="mt-12 pt-10 border-t border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
                    Technical Specifications
                  </h3>
                  <span className="text-xs text-slate-400">
                    Standard Test Conditions (230V / 50Hz)
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full text-xs text-left">
                    <tbody className="divide-y divide-slate-200">
                      {specRows.map((row, idx) => (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-slate-50/70" : "bg-white"}
                        >
                          <td className="px-4 py-3 font-semibold text-slate-700 w-1/3 sm:w-1/4">
                            {row.label}
                          </td>
                          <td className="px-4 py-3 font-medium text-slate-900">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                      {product.warranty && (
                        <tr className="bg-emerald-50/40">
                          <td className="px-4 py-3 font-semibold text-emerald-900">
                            Warranty
                          </td>
                          <td className="px-4 py-3 font-bold text-emerald-900">
                            {product.warranty}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" />
                  Product specifications are subject to continuous design enhancements by LIMRA INDUSTRIES.
                </p>
              </div>
            )}
          </div>

          {/* Sticky Mobile Quick Inquiry Bar for Product Page */}
          <div className="lg:hidden fixed bottom-14 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-md px-4 py-2.5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">
                {product.name}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {product.available ? "In Stock • Factory Direct" : "Out of Stock"}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {product.available ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>Enquire</span>
                </a>
              ) : (
                <a
                  href={notifyWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#e31e24] hover:bg-[#c4181d] text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Notify Me</span>
                </a>
              )}

              <Link
                to="/wholesale"
                className="bg-[#091a32] hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1 shadow-xs transition-colors"
              >
                <span>Wholesale</span>
              </Link>
            </div>
          </div>

          {/* Related Products from same category */}
          {relatedProducts.length > 0 && (
            <div className="mt-14">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
                    Related {categoryLabels[product.category]}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Other fan models in this category
                  </p>
                </div>
                <Link
                  to={categoryUrl[product.category] || "/products"}
                  className="text-xs font-bold text-[#0b2f5c] hover:underline flex items-center gap-1"
                >
                  <span>{t("viewAllProducts")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
