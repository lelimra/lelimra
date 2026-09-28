import React, { useState } from "react";
import { siteConfig } from "@/data/site";
import { useLanguage } from "@/context/LanguageContext";
import { useApplications } from "@/context/ApplicationContext";
import { getWholesaleEnquiryWhatsAppUrl } from "@/utils/whatsapp";
import { CheckCircle2, Send, MessageSquare, Building2, MapPin, Package } from "lucide-react";

interface WholesaleFormProps {
  defaultProduct?: string;
}

export const WholesaleForm: React.FC<WholesaleFormProps> = ({ defaultProduct = "" }) => {
  const { t } = useLanguage();
  const { addApplication } = useApplications();

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    city: "",
    state: "",
    mobileNumber: "",
    email: "",
    interestedProduct: defaultProduct || "Ceiling Fans (Bulk)",
    quantityRequired: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    "Other Indian State",
  ];

  const productOptions = [
    "Ceiling Fans (Bulk)",
    "Table Fans (Bulk)",
    "Pedestal Fans (Bulk)",
    "Mixed Container / Assorted Order",
    "Institutional Supply (Hostels / Colleges / Offices)",
    "Dealer Distribution Inquiry",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    addApplication({
      type: "wholesale",
      role: "Wholesaler",
      applicantName: formData.name,
      businessName: formData.businessName,
      phone: formData.mobileNumber,
      email: formData.email,
      city: formData.city,
      state: formData.state,
      expectedVolume: formData.quantityRequired ? `${formData.quantityRequired} units` : "Bulk Order",
      interestedProducts: formData.interestedProduct,
      message: formData.message,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    const url = getWholesaleEnquiryWhatsAppUrl({
      product: formData.interestedProduct,
      quantity: formData.quantityRequired || "Bulk",
      location: `${formData.city}, ${formData.state}`,
    });
    window.open(url, "_blank");
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-xl border border-emerald-200 p-8 shadow-sm text-center">
        <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          Wholesale Enquiry Received
        </h3>
        <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>!
          The LIMRA INDUSTRIES sales team will review your requirement for{" "}
          <span className="font-semibold text-slate-900">{formData.interestedProduct}</span>{" "}
          ({formData.quantityRequired || "Bulk"} units) and contact you at{" "}
          <span className="font-semibold text-slate-900">{formData.mobileNumber}</span> shortly.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleWhatsAppDirect}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-sm transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Send Copy to WhatsApp for Faster Response
          </button>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: "",
                businessName: "",
                city: "",
                state: "",
                mobileNumber: "",
                email: "",
                interestedProduct: "Ceiling Fans (Bulk)",
                quantityRequired: "",
                message: "",
              });
            }}
            className="w-full sm:w-auto text-xs text-slate-500 hover:text-slate-800 underline py-2"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4"
    >
      <div className="border-b border-slate-100 pb-4 mb-2">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#091a32]" />
          {t("wholesaleFormTitle")}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Direct factory pricing for retailers, electrical dealers, distributors, and institutional bulk buyers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t("formName")} <span className="text-[#e31e24]">*</span>
          </label>
          <input
            type="text"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Ramesh Kumar"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#091a32] focus:border-transparent bg-slate-50/50"
          />
        </div>

        {/* Business Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t("formBusinessName")} <span className="text-[#e31e24]">*</span>
          </label>
          <input
            type="text"
            required
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="e.g. Sri Balaji Electricals"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#091a32] focus:border-transparent bg-slate-50/50"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t("formCity")} <span className="text-[#e31e24]">*</span>
          </label>
          <input
            type="text"
            required
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g. Hyderabad / Vijayawada / Pune"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#091a32] focus:border-transparent bg-slate-50/50"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t("formState")} <span className="text-[#e31e24]">*</span>
          </label>
          <select
            required
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#091a32] focus:border-transparent bg-slate-50/50"
          >
            <option value="">Select State</option>
            {indianStates.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t("formPhone")} <span className="text-[#e31e24]">*</span>
          </label>
          <input
            type="tel"
            required
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="e.g. +91 98765 43210"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#091a32] focus:border-transparent bg-slate-50/50"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t("formEmail")}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. contact@business.com"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#091a32] focus:border-transparent bg-slate-50/50"
          />
        </div>

        {/* Interested Product */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t("formProduct")} <span className="text-[#e31e24]">*</span>
          </label>
          <select
            required
            name="interestedProduct"
            value={formData.interestedProduct}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#091a32] focus:border-transparent bg-slate-50/50"
          >
            {productOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity Required */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t("formQuantity")} <span className="text-[#e31e24]">*</span>
          </label>
          <input
            type="text"
            required
            name="quantityRequired"
            value={formData.quantityRequired}
            onChange={handleChange}
            placeholder="e.g. 25 Fans, 50 Fans, 100+ Fans"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#091a32] focus:border-transparent bg-slate-50/50"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          {t("formMessage")}
        </label>
        <textarea
          rows={3}
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Specify models, delivery timeline, or any specific requests..."
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#091a32] focus:border-transparent bg-slate-50/50"
        />
      </div>

      {/* Submit button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto flex-1 bg-[#091a32] hover:bg-[#112d52] text-white text-sm font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? "Processing Inquiry..." : t("formSubmitWholesale")}</span>
        </button>

        <button
          type="button"
          onClick={handleWhatsAppDirect}
          className="w-full sm:w-auto bg-[#e31e24] hover:bg-[#c4181d] text-white text-sm font-bold py-3 px-5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{t("topBarWhatsApp")}</span>
        </button>
      </div>

      <p className="text-[11px] text-slate-400 text-center pt-1">
        Direct from factory floor • Dispatch available pan-India via registered transport services.
      </p>
    </form>
  );
};
