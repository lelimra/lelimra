import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { siteConfig } from "@/data/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DealerForm, PartnerRole } from "@/components/DealerForm";
import { FormFillingGuide } from "@/components/FormFillingGuide";
import { SEOHead } from "@/components/SEOHead";
import { TrustStrip } from "@/components/TrustStrip";
import { getDealerEnquiryWhatsAppUrl } from "@/utils/whatsapp";
import {
  Handshake,
  TrendingUp,
  ShieldCheck,
  Truck,
  Building,
  MessageSquare,
  BadgePercent,
  Layers,
  Store,
  Briefcase,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

export const DealersPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const whatsappUrl = getDealerEnquiryWhatsAppUrl();
  const [activeTab, setActiveTab] = useState<"form" | "guide">("form");

  // Determine initial role from URL query param (?role=Super+Stockist, ?role=Distributor, ?role=Dealer, ?role=Retailer)
  const rawRoleParam = searchParams.get("role") || "";
  const getParsedRole = (param: string): PartnerRole => {
    const lower = param.toLowerCase();
    if (lower.includes("super")) return "Super Stockist";
    if (lower.includes("distribut")) return "Distributor";
    if (lower.includes("wholesal")) return "Wholesaler";
    if (lower.includes("retail")) return "Retailer";
    return "Dealer";
  };

  const [currentRole, setCurrentRole] = useState<PartnerRole>(() => getParsedRole(rawRoleParam));

  useEffect(() => {
    if (rawRoleParam) {
      setCurrentRole(getParsedRole(rawRoleParam));
    }
  }, [rawRoleParam]);

  const advantages = [
    {
      icon: BadgePercent,
      title: "Direct Manufacturer Margins",
      desc: "Work directly with LIMRA INDUSTRIES, cutting middleman markups for healthier gross profit margins on counter and wholesale trade.",
    },
    {
      icon: ShieldCheck,
      title: "2 Years Official Warranty Support",
      desc: "Direct manufacturer replacement and prompt service support on designated models so you can supply retail consumers and projects with 100% confidence.",
    },
    {
      icon: Layers,
      title: "Reliable Stock Availability",
      desc: "Steady production and buffer inventory across peak Indian summer seasons without unexpected factory dry-outs.",
    },
    {
      icon: Truck,
      title: "Pan-India Logistics & Consignment Tracking",
      desc: "Established dispatch via premier transport carriers (Navata, VRL, TCI, Kranti, BMPS, etc.) with insured E-way bill logistics directly to your local transport hub.",
    },
  ];

  const tiers = [
    {
      role: "Super Stockist" as PartnerRole,
      title: "Super Stockist",
      desc: "Regional / State warehousing hub with container and truckload inventory.",
      badge: "State Level Hub",
      icon: Layers,
      color: "text-purple-600 bg-purple-50",
    },
    {
      role: "Distributor" as PartnerRole,
      title: "Distributor",
      desc: "Zonal & district volume distribution supplying trade counters and retailers.",
      badge: "Zonal Partner",
      icon: Briefcase,
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      role: "Dealer" as PartnerRole,
      title: "Dealer",
      desc: "Town / city showroom & counter supplying electricians, contractors, and retail buyers.",
      badge: "Town Showroom",
      icon: Store,
      color: "text-blue-600 bg-blue-50",
    },
    {
      role: "Retailer" as PartnerRole,
      title: "Retailer",
      desc: "Neighborhood electrical & hardware counter seeking factory direct rates and warranty support.",
      badge: "Counter Shop",
      icon: Building,
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <>
      <SEOHead
        title="Super Stockist, Dealers, Wholesaler & Retailer Network | LE LIMRA"
        description="Partner with LE LIMRA. Authorized inquiry for Super Stockists, Dealers, Wholesalers, and Retailers. Direct factory pricing, 2-Year Warranty, and Pan-India delivery from Hyderabad."
      />

      <div className="bg-slate-50 min-h-screen pb-20">
        {/* Page Top Header */}
        <div className="bg-white border-b border-slate-200 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: "Trade Partner & Dealer Network" }]} />
            
            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#174e8c]">
                    B2B Commercial Supply • LIMRA INDUSTRIES
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    2-Year Warranty Backed
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
                  Super Stockist, Dealers, Wholesaler & Retailer Supply
                </h1>
                <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  Join our nationwide factory network as a <strong>Super Stockist</strong>, <strong>Dealer</strong>,{" "}
                  <strong>Wholesaler</strong>, or <strong>Retailer</strong> with direct manufacturer margins from Hyderabad.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === "form" ? "guide" : "form")}
                  className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-lg border border-slate-300 transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-[#0b2f5c]" />
                  <span>{activeTab === "form" ? "How to Fill Form Guide" : "Back to Inquiry Form"}</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Dealer WhatsApp Line</span>
                </a>
              </div>
            </div>

            {/* Partner Tiers Visual Strip (Clickable) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
              {tiers.map((tier) => {
                const Icon = tier.icon;
                const isSelected = currentRole === tier.role;
                return (
                  <button
                    type="button"
                    key={tier.role}
                    onClick={() => {
                      setCurrentRole(tier.role);
                      setActiveTab("form");
                    }}
                    className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                      isSelected
                        ? "bg-white border-[#0b2f5c] shadow-md ring-2 ring-[#0b2f5c]/20"
                        : "bg-slate-50 hover:bg-white border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tier.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className={`text-xs font-bold truncate ${isSelected ? "text-[#0b2f5c]" : "text-slate-900"}`}>
                          {tier.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 block">
                        {tier.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {activeTab === "guide" ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
                    Partner Onboarding & Form Filling Guide
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Step-by-step guidance on selecting your tier, GSTIN formatting, and address instructions.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("form")}
                  className="bg-[#0b2f5c] hover:bg-[#07192f] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                >
                  Proceed to Fill Form &rarr;
                </button>
              </div>

              <FormFillingGuide />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Dealer Perks Left Column */}
              <div className="lg:col-span-4 space-y-6">
                {/* 2-Year Warranty Feature Callout */}
                <div className="bg-gradient-to-br from-[#07192f] to-[#0b2f5c] text-white rounded-2xl p-6 shadow-md space-y-3 relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-blue-400/10 rounded-full blur-xl pointer-events-none" />
                  <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Quality Assurance</span>
                  </div>
                  <h3 className="text-xl font-bold font-['Cabinet_Grotesk',sans-serif] text-white">
                    2-Year Official Warranty Support
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Unlike fly-by-night brands, LE LIMRA backs designated ceiling, table, and pedestal fans with a genuine <strong>2-year manufacturer warranty</strong>. You can offer immediate over-the-counter customer confidence.
                  </p>
                </div>

                {/* Why Partner Perks */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-['Cabinet_Grotesk',sans-serif]">
                    <TrendingUp className="w-5 h-5 text-[#0b2f5c]" />
                    <span>Commercial Advantages</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Engineered for high air velocity and heavy-duty continuous summer use, designed to minimize counter returns and maximize repeat dealer turnover.
                  </p>

                  <div className="space-y-3 pt-1">
                    {advantages.map((adv, idx) => {
                      const Icon = adv.icon;
                      return (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#0b2f5c]/10 text-[#0b2f5c] flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">
                              {adv.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                              {adv.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Direct Factory Credential Box */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-[#0b2f5c] font-bold">
                    <Building className="w-4 h-4" />
                    <span>Factory & Commercial Headquarters</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      LIMRA INDUSTRIES, Hyderabad
                    </h4>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Telangana, India • Direct Commercial Desk
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px] text-slate-600">
                    <p>• Phone: {siteConfig.phone}</p>
                    <p>• WhatsApp: +{siteConfig.whatsapp}</p>
                    <p>• Email: {siteConfig.email}</p>
                    <p>• Working Hours: 9:30 AM – 7:00 PM (Mon-Sat)</p>
                  </div>
                </div>
              </div>

              {/* Right: Comprehensive Application Form */}
              <div className="lg:col-span-8">
                <DealerForm initialRole={currentRole} />
              </div>
            </div>
          )}
        </div>

        <div className="mt-16">
          <TrustStrip />
        </div>
      </div>
    </>
  );
};
