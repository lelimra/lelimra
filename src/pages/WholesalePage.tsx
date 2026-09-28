import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/data/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WholesaleForm } from "@/components/WholesaleForm";
import { SEOHead } from "@/components/SEOHead";
import { TrustStrip } from "@/components/TrustStrip";
import { getWholesaleEnquiryWhatsAppUrl } from "@/utils/whatsapp";
import {
  Building2,
  Package,
  Truck,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  Boxes,
  Handshake,
} from "lucide-react";

export const WholesalePage: React.FC = () => {
  const whatsappUrl = getWholesaleEnquiryWhatsAppUrl();

  const buyerTypes = [
    {
      title: "Super Stockist & State Depots",
      desc: "High-volume container and truckload inventory with top tier factory direct commercial margins.",
    },
    {
      title: "Authorized Dealers & City Showrooms",
      desc: "Exclusive showroom display kits, catalogue support, and prioritized inventory allocation.",
    },
    {
      title: "Regional Wholesalers & Trade Stockists",
      desc: "Master carton orders dispatched direct from our Hyderabad factory with pan-India transport.",
    },
    {
      title: "Electrical Retailers & Counter Shops",
      desc: "Carton quantities with healthy trade margins and dependable 2-year warranty backing.",
    },
    {
      title: "Builders, Contractors & Institutional Projects",
      desc: "Hostels, colleges, hospitals, and residential towers with batch production testing.",
    },
  ];

  return (
    <>
      <SEOHead
        title="Super Stockist, Dealers, Wholesaler & Retailer Supply | LE LIMRA"
        description="Factory direct wholesale and bulk fan supply for Super Stockists, Dealers, Wholesalers, and Retailers from LIMRA INDUSTRIES, Hyderabad."
      />

      <div className="bg-slate-50 min-h-screen pb-20">
        {/* Top Header */}
        <div className="bg-white border-b border-slate-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: "Wholesale & Bulk Supply" }]} />
            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#174e8c]">
                  B2B Trade Supply • Commercial Network
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1 font-['Cabinet_Grotesk',sans-serif]">
                  Super Stockist, Dealers, Wholesaler & Retailer Supply
                </h1>
                <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                  LE LIMRA supplies genuine factory-direct ceiling fans, table fans, and pedestal fans for
                  <strong> Super Stockists</strong>, <strong>Dealers</strong>, <strong>Wholesalers</strong>, 
                  <strong> Retailers</strong>, hostels, and bulk commercial projects.
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
                  <span>WhatsApp Quotation</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Wholesale Content & Form */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Info: Why Buy Wholesale from LE LIMRA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Boxes className="w-5 h-5 text-[#0b2f5c]" />
                  Who We Supply
                </h3>
                <div className="space-y-3 text-xs">
                  {buyerTypes.map((buyer, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-50 border border-slate-200/80"
                    >
                      <h4 className="font-bold text-slate-800 text-xs mb-1">
                        {buyer.title}
                      </h4>
                      <p className="text-slate-500 leading-relaxed">
                        {buyer.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wholesale Process Highlights */}
              <div className="bg-[#07192f] text-white rounded-xl p-6 shadow-sm space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400">
                  Wholesale Benefits
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Direct factory billing from LIMRA INDUSTRIES</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Tested motor balancing to avoid shop returns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Robust factory packaging designed for safe freight transport</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Pan-India transport coordination from Hyderabad hub</span>
                  </li>
                </ul>

                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <Link
                    to="/freight-estimator"
                    className="p-3 rounded-lg bg-emerald-900/40 hover:bg-emerald-900/60 border border-emerald-500/40 text-xs text-white flex items-center justify-between font-bold transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Logistics &amp; Freight Estimator</span>
                    </div>
                    <span className="text-[11px] text-emerald-300">Calculate &rarr;</span>
                  </Link>

                  <Link
                    to="/dealers"
                    className="p-3 rounded-lg bg-blue-900/60 hover:bg-blue-900 border border-blue-700/50 text-xs text-white flex items-center justify-between font-semibold transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Handshake className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Super Stockist, Distributor, Dealer &amp; Retailer Inquiry</span>
                    </div>
                    <span className="text-[11px] text-blue-200">&rarr;</span>
                  </Link>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Includes 2-Year Warranty &amp; GST Verification Guide</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Wholesale Inquiry Form */}
            <div className="lg:col-span-7">
              <WholesaleForm />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <TrustStrip />
        </div>
      </div>
    </>
  );
};
