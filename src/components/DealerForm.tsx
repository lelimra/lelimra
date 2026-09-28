import React, { useState } from "react";
import { siteConfig } from "@/data/site";
import { getTradePartnerWhatsAppUrl, TradePartnerInquiryPayload } from "@/utils/whatsapp";
import { useApplications } from "@/context/ApplicationContext";
import {
  CheckCircle2,
  Handshake,
  MessageSquare,
  Send,
  Building2,
  MapPin,
  FileText,
  HelpCircle,
  Layers,
  Briefcase,
  Store,
  Building,
  ShieldCheck,
  Copy,
  Printer,
  Sparkles,
} from "lucide-react";
import { FormFillingGuide } from "./FormFillingGuide";

export type PartnerRole = "Super Stockist" | "Dealer" | "Wholesaler" | "Retailer" | "Distributor";

interface DealerFormProps {
  initialRole?: PartnerRole;
}

export const DealerForm: React.FC<DealerFormProps> = ({ initialRole = "Dealer" }) => {
  const { addApplication } = useApplications();
  const [selectedRole, setSelectedRole] = useState<PartnerRole>(initialRole);
  const [showGuide, setShowGuide] = useState(false);
  const [hasGst, setHasGst] = useState(true);
  const [sameWhatsapp, setSameWhatsapp] = useState(true);
  const [copied, setCopied] = useState(false);

  // Sync when initialRole changes via URL or parent prop
  React.useEffect(() => {
    if (initialRole) {
      setSelectedRole(initialRole);
    }
  }, [initialRole]);

  const [formData, setFormData] = useState({
    name: "",
    designation: "Proprietor",
    businessName: "",
    businessType: "Proprietorship",
    gstNumber: "",
    panNumber: "",
    phone: "",
    whatsapp: "",
    email: "",
    addressLine: "",
    landmark: "",
    city: "",
    district: "",
    state: "Telangana",
    pincode: "",
    godownArea: "",
    experienceYears: "5-10 years",
    currentBrands: "",
    targetTerritory: "",
    expectedVolume: "50-100 units",
    interestedProducts: "All Fan Ranges (Ceiling, Table & Pedestal)",
    transportPreference: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState("");

  const roleOptions: {
    id: PartnerRole;
    title: string;
    badge: string;
    icon: React.ComponentType<{ className?: string }>;
    desc: string;
    minUnits: string;
    color: string;
  }[] = [
    {
      id: "Super Stockist",
      title: "Super Stockist",
      badge: "State / Regional Hub",
      icon: Layers,
      desc: "Regional depot & warehouse stockist serving multiple districts with high-volume margins and primary priority supply.",
      minUnits: "300 - 1,000+ Units",
      color: "border-purple-300 text-purple-700 bg-purple-50/50",
    },
    {
      id: "Distributor",
      title: "Authorized Distributor",
      badge: "Zonal / District Partner",
      icon: Briefcase,
      desc: "Zonal volume distributor supplying trade counters, builders, and retail stores across designated territory.",
      minUnits: "200 - 500 Units",
      color: "border-indigo-300 text-indigo-700 bg-indigo-50/50",
    },
    {
      id: "Dealer",
      title: "Authorized Dealer",
      badge: "Town / City Showroom",
      icon: Store,
      desc: "Authorized town showroom & counter stocking fans for local contractors, electricians, and retail customers.",
      minUnits: "50 - 200 Units",
      color: "border-blue-300 text-[#0b2f5c] bg-blue-50/50",
    },
    {
      id: "Wholesaler",
      title: "Wholesaler",
      badge: "Bulk Master Carton",
      icon: Briefcase,
      desc: "Supplies retail electrical shops, builders, hostels, and local institutional projects across assigned territory.",
      minUnits: "100 - 300 Units",
      color: "border-amber-300 text-amber-800 bg-amber-50/50",
    },
    {
      id: "Retailer",
      title: "Retailer / Shop",
      badge: "Counter / Hardware Shop",
      icon: Building,
      desc: "Electrical & hardware shop seeking competitive factory direct rates and dependable 2-year warranty support.",
      minUnits: "30 - 100 Units",
      color: "border-emerald-300 text-emerald-800 bg-emerald-50/50",
    },
  ];

  const indianStates = [
    "Telangana",
    "Andhra Pradesh",
    "Karnataka",
    "Maharashtra",
    "Tamil Nadu",
    "Kerala",
    "Gujarat",
    "Madhya Pradesh",
    "Uttar Pradesh",
    "Rajasthan",
    "West Bengal",
    "Delhi NCR",
    "Punjab",
    "Haryana",
    "Odisha",
    "Bihar",
    "Chhattisgarh",
    "Jharkhand",
    "Assam",
    "Other Indian State",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "phone" && sameWhatsapp) {
        updated.whatsapp = value;
      }
      return updated;
    });
  };

  const handleSameWhatsappToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSameWhatsapp(checked);
    if (checked) {
      setFormData((prev) => ({ ...prev, whatsapp: prev.phone }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const savedRecord = addApplication({
      type: "dealer",
      role: selectedRole,
      applicantName: formData.name,
      designation: formData.designation,
      businessName: formData.businessName,
      businessType: formData.businessType,
      phone: formData.phone,
      whatsapp: formData.whatsapp || formData.phone,
      email: formData.email,
      city: formData.city,
      district: formData.district,
      state: formData.state,
      pincode: formData.pincode,
      address: formData.addressLine,
      landmark: formData.landmark,
      gstNumber: hasGst ? formData.gstNumber : "Not Registered / In-Process",
      panNumber: formData.panNumber,
      godownArea: formData.godownArea,
      experienceYears: formData.experienceYears,
      expectedVolume: formData.expectedVolume,
      interestedProducts: formData.interestedProducts,
      transportPreference: formData.transportPreference,
      message: formData.message,
    });

    setInquiryId(savedRecord.id);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }, 600);
  };

  const constructPayload = (): TradePartnerInquiryPayload => {
    return {
      role: selectedRole,
      name: formData.name,
      shopName: formData.businessName,
      gst: hasGst ? formData.gstNumber : "Not Registered / In-Process",
      pan: formData.panNumber || undefined,
      phone: formData.phone,
      city: formData.city,
      district: formData.district,
      state: formData.state,
      pincode: formData.pincode,
      address: `${formData.addressLine}${formData.landmark ? `, Landmark: ${formData.landmark}` : ""}`,
      expectedVolume: formData.expectedVolume,
      interestedProducts: formData.interestedProducts,
      message: `${formData.businessType} | Exp: ${formData.experienceYears} | Area: ${
        formData.godownArea || "N/A"
      } sq ft | Transport: ${formData.transportPreference || "Standard"} | Notes: ${
        formData.message || "None"
      }`,
    };
  };

  const handleWhatsAppDirect = () => {
    const payload = constructPayload();
    const url = getTradePartnerWhatsAppUrl(payload);
    window.open(url, "_blank");
  };

  const copyInquirySummary = () => {
    const text = `LE LIMRA TRADE INQUIRY [${inquiryId}]
Role: ${selectedRole}
Firm: ${formData.businessName}
Proprietor: ${formData.name} (${formData.designation})
Phone: ${formData.phone}
WhatsApp: ${formData.whatsapp || formData.phone}
GST: ${hasGst ? formData.gstNumber : "Not Registered / In-Process"}
Location: ${formData.city}, ${formData.district}, ${formData.state} - ${formData.pincode}
Address: ${formData.addressLine}, Landmark: ${formData.landmark}
Expected Volume: ${formData.expectedVolume}
Products: ${formData.interestedProducts}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl border border-emerald-200 p-6 sm:p-10 shadow-lg text-slate-900 animate-in fade-in-50 duration-300">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Inquiry Reference: {inquiryId}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-['Cabinet_Grotesk',sans-serif]">
              {selectedRole} Application Received!
            </h3>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Thank you for partnering with <strong>{siteConfig.brandName}</strong> (
              {siteConfig.companyName}). Our commercial distribution team at Hyderabad will
              review your shop details and contact you within 24 business hours.
            </p>
          </div>

          {/* 2-Year Warranty Badge Reassurance */}
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center gap-2 text-xs font-semibold text-[#0b2f5c]">
            <ShieldCheck className="w-4 h-4 text-[#174e8c]" />
            <span>
              All LE LIMRA designated fans come with <strong>2-Year Official Manufacturer Warranty</strong> for total dealer peace of mind.
            </span>
          </div>

          {/* Summary Box */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2.5 font-sans">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-800 text-sm">{formData.businessName}</span>
              <span className="font-bold text-[#0b2f5c] uppercase text-[11px] bg-blue-100/70 px-2.5 py-0.5 rounded">
                {selectedRole}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
              <div>
                <strong>Proprietor:</strong> {formData.name} ({formData.designation})
              </div>
              <div>
                <strong>Phone / WhatsApp:</strong> {formData.phone}
              </div>
              <div>
                <strong>GSTIN:</strong> {hasGst ? formData.gstNumber || "Provided" : "Not Registered"}
              </div>
              <div>
                <strong>City & State:</strong> {formData.city}, {formData.state} ({formData.pincode})
              </div>
              <div>
                <strong>Dispatch Address:</strong> {formData.addressLine}
              </div>
              <div>
                <strong>Landmark:</strong> {formData.landmark || "N/A"}
              </div>
              <div>
                <strong>Initial Expected Volume:</strong> {formData.expectedVolume}
              </div>
              <div>
                <strong>Fan Lines:</strong> {formData.interestedProducts}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleWhatsAppDirect}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Send Directly on WhatsApp</span>
            </button>

            <button
              onClick={copyInquirySummary}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold px-5 py-3 rounded-xl border border-slate-300 transition-all"
            >
              <Copy className="w-4 h-4" />
              <span>{copied ? "Copied to Clipboard!" : "Copy Summary"}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold px-4 py-3 rounded-xl border border-slate-300 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Slip</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400">
            You can also connect with our direct factory helpline: <strong>{siteConfig.phone}</strong> (9:30 AM – 7:00 PM)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toggleable Guide Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gradient-to-r from-blue-50 to-indigo-50/70 border border-blue-200/80 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#0b2f5c] text-white flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#07192f]">
              Need help with GST, Address, or Role Selection?
            </h4>
            <p className="text-xs text-slate-600">
              Read our comprehensive step-by-step guide with GSTIN examples & onboarding timeline.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowGuide(!showGuide)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all shadow-xs shrink-0 bg-white border border-[#0b2f5c] text-[#0b2f5c] hover:bg-blue-50"
        >
          <span>{showGuide ? "Hide Guide" : "📖 Open Form Filling Guide"}</span>
        </button>
      </div>

      {/* Embedded Form Filling Guide when toggled */}
      {showGuide && (
        <div className="animate-in fade-in-50 duration-200">
          <FormFillingGuide
            onSelectRole={(role) => {
              setSelectedRole(role);
              setShowGuide(false);
            }}
          />
        </div>
      )}

      {/* Main Trade Inquiry Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-7"
      >
        {/* Form Title & Introduction */}
        <div className="border-b border-slate-100 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#174e8c]">
              Official B2B Channel Inquiry
            </span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>2-Year Official Warranty Backing</span>
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
            Trade Partnership Application
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Apply for <strong>Super Stockist</strong>, <strong>Distributor</strong>,{" "}
            <strong>Authorized Dealer</strong>, or <strong>Retailer</strong> supply from LIMRA INDUSTRIES, Hyderabad.
          </p>
        </div>

        {/* STEP 1: Select Partnership Role */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Handshake className="w-4 h-4 text-[#0b2f5c]" />
              <span>Step 1: Select Partnership Role <span className="text-red-500">*</span></span>
            </label>
            <span className="text-[11px] text-slate-400">Click to select your business tier</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {roleOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedRole === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setSelectedRole(opt.id)}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? "border-[#0b2f5c] bg-blue-50/70 shadow-sm ring-2 ring-[#0b2f5c]/20"
                      : "border-slate-200 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          isSelected ? "bg-[#0b2f5c] text-white" : "bg-slate-200/70 text-slate-700"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-[#0b2f5c] shrink-0" />
                      )}
                    </div>
                    <div className="font-bold text-xs text-slate-900">{opt.title}</div>
                    <div className="text-[10px] font-semibold text-slate-500 mt-0.5">
                      {opt.badge}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {opt.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] font-bold text-[#0b2f5c]">
                    Min. Order: {opt.minUnits}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 2: Shop & Business Details */}
        <div className="space-y-4 border-t border-slate-100 pt-5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-[#0b2f5c]" />
            <span>Step 2: Shop & Business Identification <span className="text-red-500">*</span></span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Shop / Firm Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Shop / Firm / Business Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="e.g. Royal Electricals & Hardware"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                As registered in trade license / GST / bank current account
              </span>
            </div>

            {/* Business Constitution */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business Constitution <span className="text-red-500">*</span>
              </label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
              >
                <option value="Proprietorship">Sole Proprietorship</option>
                <option value="Partnership">Partnership Firm</option>
                <option value="Private Limited / LLP">Private Limited / LLP</option>
                <option value="Individual Counter">Individual Retail Counter</option>
              </select>
            </div>
          </div>

          {/* GST Status Toggle & Input */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#0b2f5c]" />
                <span>GST Registration (GSTIN)</span>
              </span>
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="gstStatus"
                    checked={hasGst}
                    onChange={() => setHasGst(true)}
                    className="text-[#0b2f5c] focus:ring-[#0b2f5c]"
                  />
                  <span>Have Active GST</span>
                </label>
                <label className="inline-flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="gstStatus"
                    checked={!hasGst}
                    onChange={() => setHasGst(false)}
                    className="text-[#0b2f5c] focus:ring-[#0b2f5c]"
                  />
                  <span>Retailer without GST / In-Process</span>
                </label>
              </div>
            </div>

            {hasGst ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    15-Digit GST Number (GSTIN) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required={hasGst}
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, gstNumber: e.target.value.toUpperCase().trim() })
                    }
                    maxLength={15}
                    placeholder="e.g. 36AAAAA0000A1Z5"
                    className="w-full px-3.5 py-2.5 text-sm font-mono tracking-wider rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-white uppercase"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Example: 36 for Telangana, 37 for AP, 29 for Karnataka, 27 for Maharashtra
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business / Proprietor PAN Number
                  </label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, panNumber: e.target.value.toUpperCase().trim() })
                    }
                    maxLength={10}
                    placeholder="e.g. ABCDE1234F"
                    className="w-full px-3.5 py-2.5 text-sm font-mono tracking-wider rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-white uppercase"
                  />
                </div>
              </div>
            ) : (
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900 space-y-1">
                <p className="font-semibold">
                  Retailers and small electrical counters can apply without a regular GST:
                </p>
                <p className="text-[11px] text-amber-800">
                  Please provide your PAN or Shop Act license during our onboarding phone call. We supply billing as per GST threshold norms.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* STEP 3: Proprietor & Contact Person */}
        <div className="space-y-4 border-t border-slate-100 pt-5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Handshake className="w-4 h-4 text-[#0b2f5c]" />
            <span>Step 3: Proprietor & Contact Person <span className="text-red-500">*</span></span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Proprietor / Partner Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Mohammed Salman / Ramesh Kumar"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Designation <span className="text-red-500">*</span>
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
              >
                <option value="Proprietor">Proprietor / Owner</option>
                <option value="Managing Partner">Managing Partner</option>
                <option value="Director">Director</option>
                <option value="Store Manager">Store / Purchase Manager</option>
              </select>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Calling Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-xs font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  className="w-full px-3.5 py-2.5 text-sm rounded-r-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
                />
              </div>
            </div>

            {/* WhatsApp Number with same-as checkbox */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <label className="inline-flex items-center gap-1 text-[11px] text-slate-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sameWhatsapp}
                    onChange={handleSameWhatsappToggle}
                    className="rounded text-[#0b2f5c] focus:ring-[#0b2f5c]"
                  />
                  <span>Same as mobile</span>
                </label>
              </div>
              <div className="relative flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-xs font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  name="whatsapp"
                  disabled={sameWhatsapp}
                  value={sameWhatsapp ? formData.phone : formData.whatsapp}
                  onChange={handleChange}
                  maxLength={10}
                  placeholder="WhatsApp number for price list PDF"
                  className={`w-full px-3.5 py-2.5 text-sm rounded-r-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] ${
                    sameWhatsapp ? "bg-slate-100 text-slate-600" : "bg-slate-50/50"
                  }`}
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Catalog and confidential trade price list will be sent here
              </span>
            </div>

            {/* Email Address */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Email Address (Optional)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. sales@yourfirm.com"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
              />
            </div>
          </div>
        </div>

        {/* STEP 4: Complete Dispatch & Godown Address */}
        <div className="space-y-4 border-t border-slate-100 pt-5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#0b2f5c]" />
            <span>Step 4: Shop / Godown Address & Freight Hub <span className="text-red-500">*</span></span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Address Line */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Shop / Building / Godown Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                placeholder="Shop No. 4-2-18, Main Road, Electrical Market"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
              />
            </div>

            {/* Landmark */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Landmark (Crucial for freight delivery) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                placeholder="e.g. Opposite Old Bus Stand / Near Canara Bank"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                City / Town <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Nizamabad / Warangal / Gulbarga"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
              />
            </div>

            {/* District */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                District <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="e.g. Rangareddy / Krishna / Pune"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
              >
                {indianStates.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                6-Digit PIN Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                name="pincode"
                maxLength={6}
                value={formData.pincode}
                onChange={handleChange}
                placeholder="e.g. 500001"
                className="w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
              />
            </div>

            {/* Carpet Area */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Shop / Godown Area (Approx. Sq. Ft.)
              </label>
              <input
                type="text"
                name="godownArea"
                value={formData.godownArea}
                onChange={handleChange}
                placeholder="e.g. 500 sq ft"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
              />
            </div>
          </div>
        </div>

        {/* STEP 5: Commercial Volume & Requirements */}
        <div className="space-y-4 border-t border-slate-100 pt-5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#0b2f5c]" />
            <span>Step 5: Commercial Volume & Territory <span className="text-red-500">*</span></span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Expected Initial Order Volume */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Expected Initial Order Quantity <span className="text-red-500">*</span>
              </label>
              <select
                name="expectedVolume"
                value={formData.expectedVolume}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
              >
                <option value="30-100 units (Retailer: 30 - 100 Units)">
                  30 - 100 Units (Retailer Shop lot)
                </option>
                <option value="50-200 units (Authorized Dealer: 50 - 200 Units)">
                  50 - 200 Units (Authorized Dealer lot)
                </option>
                <option value="200-500 units (Wholesaler / Distributor lot)">
                  200 - 500 Units (Wholesaler / Distributor lot)
                </option>
                <option value="500-1000+ units (Super Stockist / Container)">
                  500 - 1,000+ Units (Super Stockist / Container)
                </option>
              </select>
            </div>

            {/* Fan Categories */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fan Categories Required <span className="text-red-500">*</span>
              </label>
              <select
                name="interestedProducts"
                value={formData.interestedProducts}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
              >
                <option value="All Fan Ranges (Ceiling, Table & Pedestal)">
                  All Fan Ranges (Ceiling, Table & Pedestal)
                </option>
                <option value="Ceiling Fans Only (AeroFlow / Decor Series)">
                  Ceiling Fans Only (AeroFlow / Decor Series)
                </option>
                <option value="Table Fans Only (Breeze / Storm Series)">
                  Table Fans Only (Breeze / Storm Series)
                </option>
                <option value="Pedestal Fans Only (AirMax Series)">
                  Pedestal Fans Only (AirMax Series)
                </option>
              </select>
            </div>

            {/* Years in Business */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Years in Electrical Trade
              </label>
              <select
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
              >
                <option value="New Store (<1 year)">New Store (&lt;1 year)</option>
                <option value="1-3 years">1 - 3 years</option>
                <option value="3-7 years">3 - 7 years</option>
                <option value="7-15 years">7 - 15 years</option>
                <option value="15+ years established">15+ years established</option>
              </select>
            </div>

            {/* Preferred Transport */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Transport Service in Your City
              </label>
              <input
                type="text"
                name="transportPreference"
                value={formData.transportPreference}
                onChange={handleChange}
                placeholder="e.g. Navata / VRL / Kranti / TCI / Local Parcel"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
              />
            </div>

            {/* Existing Brands Handled */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Other Electrical Lines / Brands Carried (Optional)
              </label>
              <input
                type="text"
                name="currentBrands"
                value={formData.currentBrands}
                onChange={handleChange}
                placeholder="e.g. Cables, Switches, LED lighting, Local and branded fans"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
              />
            </div>

            {/* Additional Message / Territorial Request */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Specific Territory Requested or Special Requirements
              </label>
              <textarea
                rows={3}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Mention specific taluka or town exclusivity queries, sample requirements, or payment terms queries..."
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
              />
            </div>
          </div>
        </div>

        {/* Form Submission Buttons */}
        <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto flex-1 bg-[#0b2f5c] hover:bg-[#07192f] text-white text-sm font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>
              {isSubmitting ? "Submitting Inquiry..." : `Submit ${selectedRole} Application`}
            </span>
          </button>

          <button
            type="button"
            onClick={handleWhatsAppDirect}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Direct WhatsApp Inquiry</span>
          </button>
        </div>

        <div className="text-center">
          <p className="text-[11px] text-slate-400">
            By submitting, you agree to receive catalog updates and wholesale quotation details via WhatsApp or telephone from LIMRA INDUSTRIES, Hyderabad.
          </p>
        </div>
      </form>
    </div>
  );
};
