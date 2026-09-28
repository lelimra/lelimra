import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SEOHead } from "@/components/SEOHead";
import { TrustStrip } from "@/components/TrustStrip";
import { FreightEstimator } from "@/components/FreightEstimator";
import { siteConfig } from "@/data/site";
import { getGeneralWhatsAppUrl } from "@/utils/whatsapp";
import {
  Truck,
  ShieldCheck,
  PackageCheck,
  MapPin,
  Clock,
  FileCheck2,
  Boxes,
  HelpCircle,
  MessageSquare,
  Building2,
  Layers,
} from "lucide-react";

export const FreightEstimatorPage: React.FC = () => {
  const whatsappUrl = getGeneralWhatsAppUrl();

  const logisticsFeatures = [
    {
      icon: Truck,
      title: "Pan-India Transport Tie-ups",
      desc: "Daily night dispatch via premier road carriers including Navata, VRL Logistics, TCI Freight, Kranti, BMPS, and Southern Roadways.",
    },
    {
      icon: PackageCheck,
      title: "5-Ply Export Grade Packaging",
      desc: "Heavy 5-ply corrugated master cartons with corner edge protectors and high-tensile polypropylene strapping to prevent in-transit crush.",
    },
    {
      icon: FileCheck2,
      title: "Instant GST & E-Way Bill",
      desc: "Consignments above ₹50,000 are dispatched with automated GST E-Way bills (HSN 84145100) ensuring 100% tax compliant interstate movement.",
    },
    {
      icon: ShieldCheck,
      title: "Insured Transit & LR Security",
      desc: "Lorry Receipt (LR) tracking copy shared immediately upon handover to transporter so your inventory is fully trackable until delivery.",
    },
  ];

  const faqs = [
    {
      q: "How are ceiling fans packed for bulk dispatch?",
      a: "Standard ceiling fans (1200mm / 1400mm) are packed 4 units per master carton, containing 4 motor assemblies, 4 downrods, 4 canopy pairs, and 4 sets of precision aerofoil blades in protected separate compartments. Premium decorative models are packed 2 units per box.",
    },
    {
      q: "What does 'To-Pay' freight mean?",
      a: "Most wholesale electrical consignments in India operate on a 'To-Pay' (Lorry Receipt / LR) basis. The factory dispatches goods from Hyderabad and provides the LR copy. You pay the freight directly to the local transporter's godown upon delivery or collection.",
    },
    {
      q: "What is the typical transit duration from Hyderabad?",
      a: "Telangana & Andhra Pradesh: Same Day to 24–48 hours. Karnataka, Maharashtra & Tamil Nadu: 2 to 3 days. Central & North India (Gujarat, MP, Delhi-NCR, UP): 3 to 4 days. Eastern & North-East states: 4 to 7 days.",
    },
    {
      q: "Do I need a GST number to receive bulk shipments?",
      a: "For small sample lots or retailer trial orders below ₹50,000, shipments can be booked under Udyam / Aadhaar. For commercial trade lots exceeding ₹50,000, a valid GSTIN is legally required for E-Way bill generation.",
    },
    {
      q: "Can I choose my own preferred transporter?",
      a: "Yes! If you have an established account or preferential rates with a specific transport agency (e.g. Navata, VRL, TCI, BMPS, Kranti, Sugama, etc.), simply notify us during order booking, and we will dispatch through your preferred carrier.",
    },
  ];

  return (
    <>
      <SEOHead
        title="Master Carton & Transport Freight Estimator | LE LIMRA Fans"
        description="Calculate master carton quantities, gross shipping weight, CBM volume, and estimated road transport freight from LIMRA INDUSTRIES Hyderabad factory across India."
      />

      <div className="bg-slate-50 min-h-screen pb-20">
        {/* Top Header */}
        <div className="bg-white border-b border-slate-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: "Logistics & Freight Estimator" }]} />
            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  B2B Logistics &amp; Transport Engine
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1 font-['Cabinet_Grotesk',sans-serif]">
                  Master Carton &amp; Freight Estimator
                </h1>
                <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                  Real-time master carton calculations, gross consignment weight, and estimated road transport rates from our <strong>Hyderabad factory (PIN 500005)</strong> across all Indian states and transport hubs.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Dispatch WhatsApp Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
          {/* Interactive Calculator Engine */}
          <FreightEstimator />

          {/* 4 Feature Logistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {logisticsFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2 hover:border-slate-300 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0b2f5c] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Logistics & Transporter Information FAQs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Transport Guidelines
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Cabinet_Grotesk',sans-serif] mt-1">
                Frequently Asked Questions on Factory Dispatch &amp; Freight
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h4 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-[#0b2f5c] shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Banner */}
          <TrustStrip />
        </div>
      </div>
    </>
  );
};
