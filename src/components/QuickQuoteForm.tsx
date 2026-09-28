import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { siteConfig } from "@/data/site";
import {
  Send,
  MessageSquare,
  Building2,
  Package,
  Layers,
  MapPin,
  CheckCircle2,
  Phone,
  Truck,
  Copy,
  Check,
  Sparkles,
  Info,
  ShieldCheck,
  Clock,
  ArrowRight,
} from "lucide-react";

interface QuickQuoteFormProps {
  product: Product;
  selectedColor?: string | null;
  onSuccess?: () => void;
  isModal?: boolean;
}

export const QuickQuoteForm: React.FC<QuickQuoteFormProps> = ({
  product,
  selectedColor,
  onSuccess,
  isModal = false,
}) => {
  // Volume tiers with B2B MOQs
  const volumeTiers = [
    { count: 30, label: "30 Units", tier: "Retailer MOQ", badge: "Trial Lot" },
    { count: 50, label: "50 Units", tier: "Dealer MOQ", badge: "Standard" },
    { count: 100, label: "100 Units", tier: "Authorised Dealer", badge: "Popular" },
    { count: 200, label: "200 Units", tier: "Wholesaler Lot", badge: "Tier 1 Disc." },
    { count: 500, label: "500+ Units", tier: "Super Stockist", badge: "Max Slab" },
  ];

  const [quantity, setQuantity] = useState<number>(50);
  const [buyerName, setBuyerName] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [stateName, setStateName] = useState<string>("Telangana");
  const [deliveryType, setDeliveryType] = useState<"transporter_godown" | "door_delivery">("transporter_godown");
  const [gstNumber, setGstNumber] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [quoteId, setQuoteId] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Units per carton logic based on category
  const unitsPerCarton = useMemo(() => {
    if (product.category === "ceiling-fan") {
      const isDecorative =
        product.name.toLowerCase().includes("crown") ||
        product.name.toLowerCase().includes("deco") ||
        product.name.toLowerCase().includes("antracite") ||
        (product.price && product.price > 2200);
      return isDecorative ? 2 : 4;
    }
    if (product.category === "pedestal-fan") return 1;
    if (product.category === "table-fan") return 2;
    return 4;
  }, [product]);

  const masterCartons = Math.ceil(quantity / unitsPerCarton);
  const weightPerUnitKg = product.category === "ceiling-fan" ? 4.3 : product.category === "pedestal-fan" ? 6.5 : 3.8;
  const totalGrossWeightKg = Math.round(quantity * weightPerUnitKg);

  // Tier classification
  const tierInfo = useMemo(() => {
    if (quantity < 30) {
      return {
        label: "Sample / Counter Test Order",
        color: "text-amber-700 bg-amber-50 border-amber-200",
        discountNote: "Standard Base Trade Price",
      };
    }
    if (quantity < 50) {
      return {
        label: "Retailer Counter Lot (30–49 Units)",
        color: "text-blue-700 bg-blue-50 border-blue-200",
        discountNote: "Retail Wholesale Margin Slab",
      };
    }
    if (quantity < 100) {
      return {
        label: "Authorised Dealer Lot (50–99 Units)",
        color: "text-indigo-700 bg-indigo-50 border-indigo-200",
        discountNote: "Authorised Dealer Direct Factory Rate",
      };
    }
    if (quantity < 200) {
      return {
        label: "Zonal Dealer Tier 1 (100–199 Units)",
        color: "text-purple-700 bg-purple-50 border-purple-200",
        discountNote: "Tier 1 Volume Discount + Freight Rebate",
      };
    }
    return {
      label: "Super Stockist / Wholesale Master Lot (200+ Units)",
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
      discountNote: "Maximum Commercial Slab + Transporter Priority",
    };
  }, [quantity]);

  // Handle WhatsApp Submission
  const handleWhatsAppQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim() || !phone.trim() || !city.trim()) {
      alert("Please fill in your Name, Mobile Number, and City/State to get instant WhatsApp pricing.");
      return;
    }

    const message = `*B2B QUICK QUOTE INQUIRY — ${siteConfig.brandName}*
------------------------------------------------
*Product:* ${product.name}
*Model Code:* ${product.model || "Standard"}
*Finish / Color:* ${selectedColor || "Standard"}
*Quantity Requested:* ${quantity} Units (${masterCartons} Master Cartons)
*Est. Gross Weight:* ~${totalGrossWeightKg} kg
*Tier:* ${tierInfo.label}

*BUYER DETAILS:*
*Name:* ${buyerName.trim()}
*Business/Shop:* ${businessName.trim() || "Electrical Retail / Trade Counter"}
*Mobile:* ${phone.trim()}
*Destination:* ${city.trim()}, ${stateName}
*Delivery Mode:* ${deliveryType === "transporter_godown" ? "To-Pay Transporter Godown Booking" : "Direct Counter Delivery"}
${gstNumber ? `*GSTIN:* ${gstNumber.trim()}\n` : ""}${remarks ? `*Remarks:* ${remarks.trim()}\n` : ""}
------------------------------------------------
Please share the best factory trade price per unit, HSN 84145100 tax invoice breakdown, and estimated road transport freight from Hyderabad plant.`;

    const url = `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    if (onSuccess) onSuccess();
  };

  // Handle On-Page RFQ Submission
  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim() || !phone.trim() || !city.trim()) {
      alert("Please provide your Name, Mobile Number, and City/State.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `RFQ-${Date.now().toString().slice(-6)}`;
      setQuoteId(generatedId);
      setSubmitted(true);
      setIsSubmitting(false);
      if (onSuccess) onSuccess();
    }, 450);
  };

  const copySummaryToClipboard = () => {
    const summaryText = `LE LIMRA Fans — B2B Quick Quote Request (${quoteId})
Product: ${product.name} (${selectedColor || "Standard Finish"})
Quantity: ${quantity} Units (~${masterCartons} Master Cartons, ${totalGrossWeightKg} kg)
Buyer: ${buyerName} (${businessName || "Trade Counter"})
Contact: ${phone} | ${city}, ${stateName}
Slab: ${tierInfo.label}`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // If submitted via direct RFQ, show clean confirmation card
  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-emerald-200 p-6 sm:p-8 shadow-sm text-center space-y-5 animate-in fade-in-50 duration-200">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Quote Reference: {quoteId}
          </span>
          <h3 className="text-2xl font-black text-slate-900 mt-2 font-['Cabinet_Grotesk',sans-serif]">
            Quick Quote Request Received!
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
            Our commercial dispatch and pricing desk at Hyderabad factory will contact <strong>{phone}</strong> within 30 minutes with the official wholesale slab rate and transport schedule.
          </p>
        </div>

        {/* Summary Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-slate-500 font-medium">Product &amp; Finish:</span>
            <span className="font-bold text-slate-900 truncate max-w-[200px]">
              {product.name} ({selectedColor || "Standard"})
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-slate-500 font-medium">Order Quantity:</span>
            <span className="font-bold text-[#0b2f5c]">
              {quantity} Units ({masterCartons} Master Cartons)
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-slate-500 font-medium">Consignment Weight:</span>
            <span className="font-semibold text-slate-800">~{totalGrossWeightKg} kg</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-slate-500 font-medium">Destination:</span>
            <span className="font-semibold text-slate-800">{city}, {stateName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">Trade Slab:</span>
            <span className="font-bold text-emerald-700">{tierInfo.label}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={copySummaryToClipboard}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied Quote Info" : "Copy Quote Summary"}</span>
          </button>

          <a
            href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
              `Hi LIMRA INDUSTRIES, I submitted Quick Quote Ref: ${quoteId} for ${quantity} units of ${product.name}. Please share official proforma.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Fast-Track on WhatsApp</span>
          </a>
        </div>

        <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Factory direct 2-Year warranty &amp; GST tax invoice guaranteed</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl ${isModal ? "" : "border border-slate-200 shadow-sm"} overflow-hidden`}>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#07192f] via-[#0b2f5c] to-[#123e74] text-white p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-300 bg-blue-900/60 px-2.5 py-0.5 rounded-full border border-blue-700/50">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Direct Factory Trade Quotation
            </span>
            <h3 className="text-xl sm:text-2xl font-black mt-1 font-['Cabinet_Grotesk',sans-serif]">
              Instant B2B Volume Pricing
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Select quantity to get instant trade slabs, master carton calculations &amp; factory pricing for <strong>{product.name}</strong>.
            </p>
          </div>

          <div className="hidden sm:flex flex-col items-end text-right shrink-0">
            <span className="text-[10px] text-blue-200 font-bold uppercase">HSN Code</span>
            <span className="text-xs font-mono font-bold bg-white/10 px-2 py-0.5 rounded text-white">
              84145100
            </span>
          </div>
        </div>

        {/* Product Spec Snapshot */}
        <div className="mt-4 pt-3 border-t border-blue-800/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-300">Selected Model:</span>
            <span className="font-bold text-white">{product.name}</span>
            {selectedColor && (
              <span className="bg-white/20 text-[11px] px-2 py-0.5 rounded-full font-medium">
                {selectedColor}
              </span>
            )}
          </div>
          {product.price && (
            <div className="text-slate-300 text-[11px]">
              Counter List Rate: <span className="text-white font-bold">₹{product.price.toLocaleString("en-IN")}</span> (Taxes Extra)
            </div>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* 1. Volume Selector & Tiers */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Step 1: Choose Volume Tier / Order Quantity</span>
            </label>
            <span className="text-xs font-black text-[#0b2f5c] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
              {quantity} Fans (~{masterCartons} Cartons)
            </span>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {volumeTiers.map((t) => {
              const isSelected = quantity === t.count;
              return (
                <button
                  key={t.count}
                  type="button"
                  onClick={() => setQuantity(t.count)}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center relative ${
                    isSelected
                      ? "border-[#0b2f5c] bg-blue-50/80 text-[#0b2f5c] shadow-xs ring-1 ring-[#0b2f5c]"
                      : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"
                  }`}
                >
                  <span className="text-xs font-black">{t.label}</span>
                  <span className="text-[10px] text-slate-500 leading-tight mt-0.5">{t.tier}</span>
                  <span
                    className={`text-[8px] font-extrabold px-1.5 py-0.2 rounded mt-1 ${
                      isSelected ? "bg-[#0b2f5c] text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {t.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quantity Stepper & Slider */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(10, prev - 10))}
                className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 font-bold text-slate-700 text-sm flex items-center justify-center transition-colors shadow-2xs"
                title="Decrease by 10"
              >
                -10
              </button>
              <input
                type="number"
                min={1}
                max={5000}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 px-2 py-1 text-center font-black text-sm text-slate-900 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0b2f5c]"
              />
              <button
                type="button"
                onClick={() => setQuantity((prev) => prev + 10)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 font-bold text-slate-700 text-sm flex items-center justify-center transition-colors shadow-2xs"
                title="Increase by 10"
              >
                +10
              </button>
              <button
                type="button"
                onClick={() => setQuantity((prev) => prev + 50)}
                className="px-2.5 h-8 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 font-bold text-slate-700 text-xs flex items-center justify-center transition-colors shadow-2xs"
                title="Increase by 50"
              >
                +50
              </button>
            </div>

            {/* Packaging live specs */}
            <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <Package className="w-4 h-4 text-blue-600" />
                <span><strong>{masterCartons}</strong> Master Boxes ({unitsPerCarton} in 1)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-slate-500" />
                <span>~<strong>{totalGrossWeightKg}</strong> kg Gross Wt.</span>
              </div>
            </div>
          </div>

          {/* Tier Highlight Alert */}
          <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${tierInfo.color}`}>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span><strong>{tierInfo.label}:</strong> {tierInfo.discountNote}</span>
            </div>
            <Link
              to="/freight-estimator"
              className="hidden sm:inline-flex items-center gap-1 font-bold underline hover:opacity-80 text-[11px]"
            >
              <span>Transport Estimator</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* 2. Simplified Buyer Form */}
        <form onSubmit={handleDirectSubmit} className="space-y-4 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Step 2: Enter Buyer &amp; Destination Details</span>
            </label>
            <span className="text-[11px] text-slate-400">Fast 1-Minute Process</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Contact Person Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Contact Person Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar, Shaik Imran"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-white"
              />
            </div>

            {/* Mobile / WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mobile Number (WhatsApp) *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xs font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full pl-10 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-white font-medium"
                />
              </div>
            </div>

            {/* Business / Electrical Shop Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Shop / Electrical Enterprise Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Sri Balaji Electricals, Supreme Infra"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-white"
              />
            </div>

            {/* Destination City & State */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  City / Town *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hyderabad, Vijayawada"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  State *
                </label>
                <select
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-white font-medium text-slate-800"
                >
                  <option value="Telangana">Telangana</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Delhi-NCR">Delhi-NCR</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Other">Other State</option>
                </select>
              </div>
            </div>
          </div>

          {/* Delivery Mode & GST */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Dispatch &amp; Delivery Preference
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryType("transporter_godown")}
                  className={`p-2 rounded-lg border text-left text-xs font-bold transition-all ${
                    deliveryType === "transporter_godown"
                      ? "border-[#0b2f5c] bg-blue-50 text-[#0b2f5c]"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="block text-[11px]">Transporter Godown</span>
                  <span className="text-[9px] font-normal text-slate-500">To-Pay LR Basis</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType("door_delivery")}
                  className={`p-2 rounded-lg border text-left text-xs font-bold transition-all ${
                    deliveryType === "door_delivery"
                      ? "border-[#0b2f5c] bg-blue-50 text-[#0b2f5c]"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="block text-[11px]">Door Delivery</span>
                  <span className="text-[9px] font-normal text-slate-500">Shop / Site Direct</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                GST Number (Optional)
              </label>
              <input
                type="text"
                maxLength={15}
                placeholder="e.g. 36AAAAA0000A1Z5"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-white font-mono uppercase"
              />
            </div>
          </div>

          {/* Action Buttons: 1-Tap WhatsApp & Direct RFQ */}
          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
            {/* WhatsApp Fast-Track Primary CTA */}
            <button
              type="button"
              onClick={handleWhatsAppQuote}
              className="w-full sm:w-1/2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Instant WhatsApp Pricing</span>
            </button>

            {/* Direct RFQ Secondary CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-1/2 py-3.5 px-4 rounded-xl bg-[#0b2f5c] hover:bg-[#07192f] text-white text-xs font-bold shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-75"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Generating Quote..." : "Submit Direct Factory RFQ"}</span>
            </button>
          </div>

          {/* Trust Footnote */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Direct factory turnaround within 30 minutes</span>
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>2-Year warranty &amp; GST tax invoice guaranteed</span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
