import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/data/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SEOHead } from "@/components/SEOHead";
import { TrustStrip } from "@/components/TrustStrip";
import { Logo } from "@/components/Logo";
import {
  Factory,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Layers,
  Phone,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const AboutPage: React.FC = () => {
  const pillars = [
    {
      icon: Cpu,
      title: "Practical Engineering",
      desc: "Designed specifically for Indian climate conditions, voltage tolerances, and continuous daily operation.",
    },
    {
      icon: Factory,
      title: "Direct Manufacturing",
      desc: "Operated by LIMRA INDUSTRIES in Hyderabad, ensuring close supervision over winding quality and balancing.",
    },
    {
      icon: ShieldCheck,
      title: "Reliable Performance",
      desc: "Balanced motor construction with low vibration and smooth air circulation across domestic and commercial rooms.",
    },
    {
      icon: Layers,
      title: "Competitive Pricing",
      desc: "Factory-direct pricing models designed to deliver genuine margins for electrical dealers and wholesalers.",
    },
    {
      icon: Sparkles,
      title: "Wholesale & Dealer Supply",
      desc: "Structured logistics and carton packaging for reliable dispatch to shops and distributors across Indian states.",
    },
    {
      icon: Phone,
      title: "Direct Customer & Trade Support",
      desc: "Direct communication with our Hyderabad office for warranty assistance, spare parts, and quotation queries.",
    },
  ];

  return (
    <>
      <SEOHead
        title="About LE LIMRA | Fan Manufacturer"
        description="Learn about LE LIMRA, an Indian electrical fan brand operating under LIMRA INDUSTRIES in Hyderabad, Telangana."
      />

      <div className="bg-white min-h-screen pb-20">
        {/* Page Header */}
        <div className="bg-slate-50 border-b border-slate-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: "About Us" }]} />
            <div className="mt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174e8c]">
                Brand & Company Profile
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1 font-['Cabinet_Grotesk',sans-serif]">
                About LE LIMRA
              </h1>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl">
                A focused Indian electrical fan brand operating under LIMRA INDUSTRIES, Hyderabad, Telangana.
              </p>
            </div>
          </div>
        </div>

        {/* Core Company Narrative */}
        <section className="py-14 sm:py-18">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
                  Practical Air Comfort Built for Everyday India
                </h2>

                <p>
                  <strong>LE LIMRA</strong> is an Indian electrical brand specializing in the manufacture and distribution of ceiling fans, table fans, and pedestal fans. The brand operates under <strong>LIMRA INDUSTRIES</strong>, headquartered in Hyderabad, Telangana.
                </p>

                <p>
                  In Indian households, businesses, shops, and institutions, fans are not occasional appliances — they run for twelve to eighteen hours a day throughout long summer months. Our engineering focus is centered on core reliability: robust motor windings, durable bearings, stable aerodynamic blades, and balanced air circulation that homeowners and facility managers can count on.
                </p>

                <p>
                  By controlling assembly and quality inspection directly at the factory level, LE LIMRA delivers dependable cooling solutions without inflating costs with superficial markups.
                </p>

                <div className="pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-[#0b2f5c] text-sm block mb-1">
                      Our Business Model
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      We support retailers, wholesale stockists, regional dealers, institutions, hostels, and bulk project contractors through transparent pricing and coordinated transport dispatch across India.
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual Framing Card */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-white border border-slate-200 text-slate-900 p-8 sm:p-10 shadow-lg space-y-6">
                  <div className="flex flex-col items-start border-b border-slate-200 pb-6">
                    <Logo variant="default" size="xl" />
                    <span className="text-xs text-slate-500 mt-2 font-semibold">
                      LIMRA INDUSTRIES • Direct Manufacturer
                    </span>
                  </div>

                  <div className="space-y-4 text-xs text-slate-600">
                    <div>
                      <span className="text-slate-400 block font-semibold">Headquarters & Manufacturing</span>
                      <span className="text-slate-900 text-sm font-bold">
                        {siteConfig.city}, {siteConfig.state}, {siteConfig.country}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-semibold">Product Specialization</span>
                      <span className="text-slate-900 text-sm font-bold">
                        Ceiling Fans • Table Fans • Pedestal Fans
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-semibold">Supply Capabilities</span>
                      <span className="text-slate-900 text-sm font-bold">
                        Wholesale, Dealer Supply, Distributor Supply & Bulk Orders
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <Link
                      to="/wholesale"
                      className="w-full bg-[#e31e24] hover:bg-[#c4181d] text-white font-bold py-3 px-4 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <span>Connect with Wholesale Team</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Core Pillars */}
        <section className="py-14 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174e8c]">
                Operational Pillars
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-['Cabinet_Grotesk',sans-serif]">
                What We Focus On
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0b2f5c]/10 text-[#0b2f5c] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <TrustStrip />
      </div>
    </>
  );
};
