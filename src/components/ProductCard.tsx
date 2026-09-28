import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useProducts } from "@/context/ProductContext";
import { ProductImage } from "./ProductImage";
import { useLanguage } from "@/context/LanguageContext";
import { getProductEnquiryWhatsAppUrl, getProductNotifyWhatsAppUrl } from "@/utils/whatsapp";
import {
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Zap,
  Gauge,
  Edit3,
  Bell,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useLanguage();
  const { openEditProductModal } = useProducts();

  const categoryLabels: Record<Product["category"], string> = {
    "ceiling-fan": t("navCeilingFans"),
    "table-fan": t("navTableFans"),
    "pedestal-fan": t("navPedestalFans"),
  };

  return (
    <div className="group relative bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      {/* Product Image */}
      <div className="relative block w-full aspect-[4/3] bg-slate-50 overflow-hidden border-b border-slate-100">
        <Link
          to={`/products/${product.slug}`}
          className="w-full h-full block"
          tabIndex={-1}
        >
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            category={product.category}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Discreet Staff Quick Edit Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openEditProductModal(product);
          }}
          className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 p-1.5 rounded-md shadow-xs border border-slate-200 transition-opacity"
          title="Edit product"
          aria-label="Edit product details"
        >
          <Edit3 className="w-3.5 h-3.5" />
        </button>

        {/* Out of Stock Overlay */}
        {!product.available && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
            <span className="bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-xs">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Category & Sweep Metadata (Clean unboxed text) */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <span>{categoryLabels[product.category]}</span>
          {product.specifications.size && (
            <>
              <span aria-hidden="true">·</span>
              <span>{product.specifications.size}</span>
            </>
          )}
          {product.model && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-[11px]">{product.model}</span>
            </>
          )}
        </div>

        {/* Product Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#091a32] transition-colors line-clamp-1 mt-1">
          <Link to={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Clean Spec Line */}
        <div className="flex items-center gap-3 text-xs text-slate-600 mt-2 font-medium">
          {product.specifications.rpm && (
            <span className="flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-slate-400" />
              <span>{product.specifications.rpm}</span>
            </span>
          )}
          {product.specifications.wattage && (
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-slate-400" />
              <span>{product.specifications.wattage}</span>
            </span>
          )}
          {product.warranty && (
            <span className="flex items-center gap-1 text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-[#e31e24]" />
              <span>{product.warranty}</span>
            </span>
          )}
        </div>

        {/* Availability / Trade Supply Baseline */}
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100 text-xs">
          <span className="font-semibold text-slate-700">
            Factory Direct Supply
          </span>
          <span
            className={`font-medium ${
              product.available ? "text-emerald-700" : "text-amber-700"
            }`}
          >
            {product.available ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* 2 Decisive Actions */}
        <div className="grid grid-cols-2 gap-2 mt-3.5">
          <Link
            to={`/products/${product.slug}`}
            className="w-full inline-flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2 px-3 rounded-lg transition-colors text-center"
          >
            <span>{t("viewDetails")}</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
          </Link>

          {product.available ? (
            <a
              href={getProductEnquiryWhatsAppUrl(product.name, product.model)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 bg-[#e31e24] hover:bg-[#c4181d] text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors text-center"
              title="Enquire on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>{t("enquireBtn")}</span>
            </a>
          ) : (
            <a
              href={getProductNotifyWhatsAppUrl(product.name, product.model)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors text-center"
              title="Notify Me on WhatsApp for next availability date"
            >
              <Bell className="w-3.5 h-3.5 text-[#e31e24]" />
              <span>Notify Me</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
