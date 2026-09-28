import React from "react";
import { Link } from "react-router-dom";
import { HeroCarousel } from "@/components/HeroCarousel";
import { TrustStrip } from "@/components/TrustStrip";
import { DealerForm } from "@/components/DealerForm";
import { ProductCard } from "@/components/ProductCard";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/context/LanguageContext";
import { useProducts } from "@/context/ProductContext";
import {
  ChevronRight,
  Fan,
  Wind,
  ShieldCheck,
  Factory,
  Cpu,
  Gauge,
  Zap,
  Sparkles,
  Handshake,
  ArrowRight,
  Layers,
  Briefcase,
  Store,
} from "lucide-react";

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const { products } = useProducts();

  // Featured 4 fans for quick discovery on homepage
  const featuredFans = products.slice(0, 4);

  const categories = [
    {
      id: "ceiling-fans",
      title: t("navCeilingFans"),
      subtitle: "1200mm & High Speed",
      desc: t("categoryCeilingDesc"),
      image: "/images/products/ceiling-fan-01.jpg",
      href: "/products/ceiling-fans",
      icon: Fan,
    },
    {
      id: "table-fans",
      title: t("navTableFans"),
      subtitle: "400mm Compact Airflow",
      desc: t("categoryTableDesc"),
      image: "/images/products/table-fan-01.jpg",
      href: "/products/table-fans",
      icon: Wind,
    },
    {
      id: "pedestal-fans",
      title: t("navPedestalFans"),
      subtitle: "Heavy Duty Stand Fans",
      desc: t("categoryPedestalDesc"),
      image: "/images/products/pedestal-fan-01.jpg",
      href: "/products/pedestal-fans",
      icon: ShieldCheck,
    },
  ];

  const whyLimraFeatures = [
    {
      icon: Factory,
      title: t("whyFactoryDirect"),
      desc: t("whyFactoryDirectDesc"),
    },
    {
      icon: Cpu,
      title: t("whyReliableMotor"),
      desc: t("whyReliableMotorDesc"),
    },
    {
      icon: Gauge,
      title: t("whyHighAir"),
      desc: t("whyHighAirDesc"),
    },
    {
      icon: Zap,
      title: t("whyEnergyEfficient"),
      desc: t("whyEnergyEfficientDesc"),
    },
    {
      icon: Sparkles,
      title: t("whyQualityComponents"),
      desc: t("whyQualityComponentsDesc"),
    },
    {
      icon: ShieldCheck,
      title: t("whyWarranty"),
      desc: t("whyWarrantyDesc"),
    },
  ];

  return (
    <>
      <SEOHead
        title="LE LIMRA | Ceiling Fans & Table Fans Manufacturer"
        description={t("heroSubtitle")}
      />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Trust Strip */}
      <TrustStrip />

      {/* Popular Fan Models Section (Instant discovery & easy buying) */}
      <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold text-[#091a32] uppercase tracking-wider">
                Direct From Hyderabad Factory
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Featured Fan Models
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Reliable copper motors, double ball bearings, and pan-India dispatch.
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#091a32] hover:text-[#e31e24] transition-colors shrink-0"
            >
              <span>View All {products.length} Models</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredFans.map((fan) => (
              <ProductCard key={fan.id} product={fan} />
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Product Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {t("categoriesHeading")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t("categoriesDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden border-b border-slate-100">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#e31e24]" />
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#091a32] transition-colors">
                          {cat.title}
                        </h3>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">
                        {cat.subtitle}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-grow">
                      {cat.desc}
                    </p>

                    <Link
                      to={cat.href}
                      className="inline-flex items-center justify-between w-full bg-slate-100 hover:bg-[#091a32] text-slate-800 hover:text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors"
                    >
                      <span>Explore Collection</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why LE LIMRA: 6 Clean Points */}
      <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Manufacturing Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {t("whyHeading")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t("whyDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyLimraFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-colors flex flex-col"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-[#091a32] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-[#091a32]" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Applications for Super Stockist, Distributors & Dealers Section */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200" id="stockist-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-[#e31e24] uppercase tracking-wider">
                Distribution Network
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Applications for Super Stockist, Distributors &amp; Dealers
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                LE LIMRA (LIMRA INDUSTRIES) is expanding its PAN-India footprint. Partner directly with our Hyderabad manufacturing facility for state-level warehousing, district distribution, and authorized dealership privileges.
              </p>

              {/* Partner Tiers Quick View */}
              <div className="space-y-2.5 pt-1">
                <Link
                  to="/dealers?role=Super+Stockist"
                  className="flex items-center gap-3 p-3 rounded-xl bg-purple-50/70 border border-purple-200/80 hover:bg-purple-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-950">Super Stockist</span>
                      <span className="text-[10px] font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">State Level Hub</span>
                    </div>
                    <p className="text-[11px] text-purple-800 truncate">Regional warehouse hub, bulk dispatches &amp; primary territory</p>
                  </div>
                </Link>

                <Link
                  to="/dealers?role=Distributor"
                  className="flex items-center gap-3 p-3 rounded-xl bg-indigo-50/70 border border-indigo-200/80 hover:bg-indigo-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-950">Zonal Distributor</span>
                      <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">District Partner</span>
                    </div>
                    <p className="text-[11px] text-indigo-800 truncate">District &amp; cluster distribution feeding counter retailers</p>
                  </div>
                </Link>

                <Link
                  to="/dealers?role=Dealer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 hover:bg-blue-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Store className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-950">Authorized Dealer</span>
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Town Showroom</span>
                    </div>
                    <p className="text-[11px] text-blue-800 truncate">Showroom counter catering to electrical contractors &amp; walk-ins</p>
                  </div>
                </Link>
              </div>

              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <Factory className="w-4 h-4 text-[#091a32] shrink-0" />
                  <span>Direct factory manufacturer supply from Hyderabad plant.</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>2 Years manufacturer warranty backed with hassle-free support.</span>
                </div>
              </div>
            </div>

            {/* Right: Partner Application Form */}
            <div className="lg:col-span-7">
              <DealerForm initialRole="Super Stockist" />
            </div>
          </div>
        </div>
      </section>

      {/* Applications for Super Stockist Bottom Callout Bar */}
      <div className="bg-[#091a32] text-white py-4 px-4 sm:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e31e24] animate-pulse shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">
                Applications Open for Super Stockist, Distributors &amp; Authorized Dealers
              </p>
              <p className="text-xs text-slate-300">
                Direct Hyderabad factory allocation with state-level territorial rights and verified warranty support.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              to="/dealers?role=Super+Stockist"
              className="bg-[#e31e24] hover:bg-[#c4181d] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-colors inline-flex items-center gap-1.5"
            >
              <span>Apply for Super Stockist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/dealers"
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3.5 py-2.5 rounded-lg transition-colors border border-white/20"
            >
              All Partner Roles
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
