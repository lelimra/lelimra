import React, { useState } from "react";
import {
  HelpCircle,
  CheckCircle2,
  FileText,
  Building,
  Truck,
  ShieldCheck,
  ChevronDown,
  Info,
  Layers,
  Store,
  Briefcase,
  ExternalLink,
} from "lucide-react";

interface FormFillingGuideProps {
  onSelectRole?: (role: "Super Stockist" | "Distributor" | "Dealer" | "Retailer") => void;
}

export const FormFillingGuide: React.FC<FormFillingGuideProps> = ({ onSelectRole }) => {
  const [activeTab, setActiveTab] = useState<"roles" | "fields" | "faq">("roles");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const roles = [
    {
      id: "Super Stockist" as const,
      badge: "State / Regional Level",
      title: "Super Stockist",
      icon: Layers,
      color: "bg-purple-50 text-purple-700 border-purple-200",
      accent: "border-l-4 border-l-purple-600",
      tag: "Highest Volume Margin",
      description:
        "Acts as the state or multi-district warehouse depot for LE LIMRA fans. Maintains buffer inventory to feed regional distributors and large institutional projects.",
      eligibility:
        "Large commercial godown (1,000+ sq ft), strong working capital, GST registration mandatory, and direct freight handling capability.",
      minOrder: "300 - 1,000+ Units (Truckload / Container lots)",
      turnaround: "Direct dispatch from Hyderabad factory via dedicated freight carrier.",
    },
    {
      id: "Distributor" as const,
      badge: "District / Zonal Level",
      title: "Distributor",
      icon: Briefcase,
      color: "bg-blue-50 text-blue-700 border-blue-200",
      accent: "border-l-4 border-l-[#0b2f5c]",
      tag: "Zonal Wholesale",
      description:
        "Distributes LE LIMRA fans to electrical shops, hardware dealers, and contractors across an assigned district or cluster of talukas.",
      eligibility:
        "Active electrical distribution network, sales team or field van, GST registration, and warehouse space (400+ sq ft).",
      minOrder: "100 - 300 Units",
      turnaround: "Regional transport delivery within 2-4 working days.",
    },
    {
      id: "Dealer" as const,
      badge: "Town / City Showroom",
      title: "Authorized Dealer",
      icon: Store,
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      accent: "border-l-4 border-l-emerald-600",
      tag: "Retail Showroom & Counter",
      description:
        "Authorized town dealer maintaining counter inventory, display fans, and supplying local electricians, homeowners, and civil contractors.",
      eligibility:
        "Prime location electrical showroom/counter, GST or trade license, direct retail customer base.",
      minOrder: "50 - 200 Units (Assorted ceiling, table & pedestal fans)",
      turnaround: "Fast replenishment through nearest distributor or factory transport.",
    },
    {
      id: "Retailer" as const,
      badge: "Counter Shop / Electrician Hub",
      title: "Retailer (Electrical Shop)",
      icon: Building,
      color: "bg-amber-50 text-amber-800 border-amber-200",
      accent: "border-l-4 border-l-amber-500",
      tag: "Direct Counter Sales",
      description:
        "Neighborhood electrical, hardware, or lighting retail shop looking for competitive factory-direct pricing with dependable 2-year warranty peace of mind.",
      eligibility:
        "Retail electrical counter. Small retailers operating under composition or Udyam can apply even before regular GST.",
      minOrder: "30 - 100 Units",
      turnaround: "Doorstep delivery or pickup from local transport godown.",
    },
  ];

  const fieldInstructions = [
    {
      field: "Business Role (Tier)",
      requirement: "Mandatory",
      tip: "Select whether you are applying as Super Stockist, Distributor, Dealer, or Retailer based on your storage capacity and distribution reach.",
    },
    {
      field: "Shop / Firm / Business Name",
      requirement: "Mandatory",
      tip: "Enter the legal or trade name printed on your shop signboard, GST certificate, or bank current account (e.g. 'Sri Lakshmi Electrical Agencies').",
    },
    {
      field: "Proprietor / Contact Person",
      requirement: "Mandatory",
      tip: "Full name of the business owner or managing partner handling procurement.",
    },
    {
      field: "GST Number (GSTIN)",
      requirement: "Recommended / Required for Stockists",
      tip: "15-digit GSTIN (e.g. 36AAAAA0000A1Z5). The first 2 digits are state code (e.g. 36 for Telangana, 37 for AP, 29 for Karnataka, 27 for Maharashtra). If you are a small counter shop without GST, select 'Retailer without GST' and mention your PAN / Trade license.",
    },
    {
      field: "Mobile & WhatsApp Number",
      requirement: "Mandatory",
      tip: "Provide your primary working mobile number. The official LE LIMRA wholesale catalog, product specifications, and trade onboarding details will be dispatched to your WhatsApp.",
    },
    {
      field: "Full Shop / Godown Address",
      requirement: "Mandatory",
      tip: "Include Shop/Building Number, Street Name, and an unmistakable Landmark (e.g. 'Opposite Old Bus Stand, Near State Bank'). Transporters rely on landmarks for truck unloading.",
    },
    {
      field: "City, District, State & PIN Code",
      requirement: "Mandatory",
      tip: "Accurate 6-digit postal PIN code is strictly required to calculate transport freight from Hyderabad and assign the nearest regional logistics hub.",
    },
    {
      field: "Expected Order Quantity",
      requirement: "Recommended",
      tip: "Mention the approximate number of units required. Specifying clear quantities helps us prioritize stock allocation and dispatch scheduling.",
    },
  ];

  const faqs = [
    {
      q: "What is the warranty period on LE LIMRA fans?",
      a: "LE LIMRA provides a 2-Year Official Manufacturer Warranty on designated fan models. We support our channel partners with straightforward warranty replacement and motor service support so dealers can sell with 100% confidence to end consumers.",
    },
    {
      q: "Can I apply if my shop is newly established or does not have GST yet?",
      a: "Yes! Small retailers and newly established electrical shops can select the 'Retailer' role. You can enter your PAN Number or Shop & Establishment Act / Udyam registration while your GST is in process.",
    },
    {
      q: "How are goods dispatched from the Hyderabad factory to my city?",
      a: "LIMRA INDUSTRIES partners with premier Pan-India logistics carriers (VRL, Navata, TCI, Kranti, BMPS, Orange, and state express parcel services). Consignments are packed in heavy-duty export-standard packaging with protective straps and insured transport E-way bills.",
    },
    {
      q: "What happens after I submit this inquiry form?",
      a: "Within 24 business hours, our commercial trade manager from Hyderabad will call you to verify your shop location, understand your volume needs, and share the confidential dealer catalog and trade terms on WhatsApp.",
    },
    {
      q: "Are samples available before placing a bulk order?",
      a: "Yes. Once your business credentials (GST/Shop address) are verified, authorized dealers and distributors can order sample pieces to inspect blade balance, finish, air delivery, and packaging quality.",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#07192f] via-[#0b2f5c] to-[#174e8c] text-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-blue-300">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-200">
                Partner Onboarding Manual
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                How to Fill Your Trade Inquiry Form
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>2-Year Warranty Guaranteed</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 mt-5 border-b border-white/15">
          <button
            onClick={() => setActiveTab("roles")}
            className={`pb-2.5 px-3 text-xs font-bold transition-colors relative ${
              activeTab === "roles"
                ? "text-white border-b-2 border-amber-400"
                : "text-slate-300 hover:text-white"
            }`}
          >
            1. Choose Your Role
          </button>
          <button
            onClick={() => setActiveTab("fields")}
            className={`pb-2.5 px-3 text-xs font-bold transition-colors relative ${
              activeTab === "fields"
                ? "text-white border-b-2 border-amber-400"
                : "text-slate-300 hover:text-white"
            }`}
          >
            2. Field-by-Field Guide (GST, Address, etc.)
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={`pb-2.5 px-3 text-xs font-bold transition-colors relative ${
              activeTab === "faq"
                ? "text-white border-b-2 border-amber-400"
                : "text-slate-300 hover:text-white"
            }`}
          >
            3. Onboarding & FAQs
          </button>
        </div>
      </div>

      {/* Tab 1: Roles Breakdown */}
      {activeTab === "roles" && (
        <div className="p-5 sm:p-6 space-y-4">
          <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-100 flex items-start gap-3 text-xs text-[#0b2f5c]">
            <Info className="w-4 h-4 text-[#0b2f5c] shrink-0 mt-0.5" />
            <p>
              LE LIMRA operates a structured trade network. Please select the role matching your capital, storage capacity, and counter/wholesale operation:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.id}
                  className={`p-4 rounded-xl border transition-all ${r.accent} bg-slate-50/60 hover:bg-slate-50 relative flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${r.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{r.title}</h4>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-700">
                        {r.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {r.description}
                    </p>

                    <div className="space-y-1.5 text-[11px] text-slate-500 border-t border-slate-200/60 pt-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-700">Ideal For:</span>
                        <span className="text-slate-600 text-right">{r.eligibility}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-700">Typical Order:</span>
                        <span className="font-medium text-[#0b2f5c]">{r.minOrder}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-700">Logistics:</span>
                        <span className="text-slate-600">{r.turnaround}</span>
                      </div>
                    </div>
                  </div>

                  {onSelectRole && (
                    <button
                      type="button"
                      onClick={() => onSelectRole(r.id)}
                      className="mt-3.5 w-full text-center py-1.5 px-3 bg-white border border-slate-300 hover:border-[#0b2f5c] text-[#0b2f5c] rounded-lg text-xs font-bold transition-all shadow-xs"
                    >
                      Select {r.title} in Form &rarr;
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Field-by-Field Instructions */}
      {activeTab === "fields" && (
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Required Information Checklist
            </h4>
            <span className="text-[11px] text-slate-400">
              Accurate details ensure same-day price quotation
            </span>
          </div>

          <div className="space-y-3">
            {fieldInstructions.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-slate-200/70 bg-slate-50/40 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0b2f5c] shrink-0" />
                    <span className="text-xs font-bold text-slate-900">{item.field}</span>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      item.requirement === "Mandatory"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    {item.requirement}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 pl-5 leading-relaxed">
                  {item.tip}
                </p>
              </div>
            ))}
          </div>

          {/* Quick GST Helper Box */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 mt-4 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <FileText className="w-4 h-4" />
              <span>GSTIN Format Quick Example</span>
            </div>
            <p className="text-slate-300 font-mono text-[12px] tracking-wider bg-slate-800 p-2 rounded border border-slate-700">
              36 AAAAA 0000 A 1 Z 5
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-slate-400 pt-1">
              <div><strong className="text-slate-200">36:</strong> State Code (Telangana)</div>
              <div><strong className="text-slate-200">AAAAA0000A:</strong> Business PAN</div>
              <div><strong className="text-slate-200">1:</strong> Entity registration count</div>
              <div><strong className="text-slate-200">Z 5:</strong> Default alphabet & checksum</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Onboarding & FAQs */}
      {activeTab === "faq" && (
        <div className="p-5 sm:p-6 space-y-4">
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50/50"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-3.5 flex items-center justify-between text-xs font-bold text-slate-900 hover:bg-slate-100/70 transition-colors"
                >
                  <span className="pr-2">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaq === idx ? "rotate-180 text-[#0b2f5c]" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-3.5 pt-0 text-xs text-slate-600 bg-white border-t border-slate-100 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Direct Assistance Card */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5 text-center sm:text-left">
              <h5 className="font-bold text-emerald-950">Need Help While Filling?</h5>
              <p className="text-emerald-800">
                Our commercial trade desk at Hyderabad is available from 9:30 AM to 7:00 PM (Mon-Sat).
              </p>
            </div>
            <span className="shrink-0 font-bold text-[#0b2f5c] bg-white px-3 py-1.5 rounded-lg border border-emerald-200 shadow-xs">
              Direct Support: +91 98765 43210
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
