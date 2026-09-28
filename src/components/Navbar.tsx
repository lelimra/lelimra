import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { siteConfig } from "@/data/site";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { NavSearchBar } from "@/components/NavSearchBar";
import { useAIAssistant } from "@/context/AIAssistantContext";
import {
  Menu,
  X,
  Phone,
  MessageSquare,
  ChevronDown,
  Fan,
  Wind,
  ShieldCheck,
  Search,
  Building2,
  FileText,
  Sparkles,
  Bot,
} from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/utils/whatsapp";

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const { openAssistant } = useAIAssistant();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsDropdownOpen(false);
    setIsMobileSearchOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Utility Announcement Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Direct Manufacturer Trust Notice */}
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="w-2 h-2 rounded-full bg-[#e31e24] shrink-0" />
            <span className="font-medium text-white">Direct Factory Manufacturer</span>
            <span className="text-slate-500 hidden sm:inline">·</span>
            <span className="text-slate-400 hidden sm:inline">Hyderabad</span>
            <span className="text-slate-500 hidden md:inline">·</span>
            <span className="text-slate-400 hidden md:inline">Pan-India Wholesale &amp; Retail Supply</span>
          </div>

          {/* Quick Direct Contacts & Language */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-xs">
            <a
              href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              title="Call factory sales desk"
            >
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline font-mono">{siteConfig.phone}</span>
            </a>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>{t("topBarWhatsApp")}</span>
            </a>

            <Link
              to="/admin"
              className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded border border-slate-700 transition-all"
              title="Business Owner Admin Dashboard"
            >
              <span>🔒 Admin</span>
            </Link>

            <div className="hidden sm:block pl-2 border-l border-slate-700">
              <LanguageSwitcher variant="topbar" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200 bg-white/95 backdrop-blur-md ${
          isScrolled
            ? "shadow-sm border-b border-slate-200 py-3"
            : "border-b border-slate-200 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Zone 1: Clean Brand Wordmark */}
          <Link
            to="/"
            className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#091a32] rounded py-0.5"
            aria-label="LE LIMRA Home"
          >
            <Logo size="header" />
          </Link>

          {/* Zone 2: 5 Core Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                location.pathname === "/"
                  ? "text-[#091a32] font-semibold bg-slate-100"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {t("navHome")}
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <Link
                to="/products"
                className={`px-3 py-2 text-sm font-medium inline-flex items-center gap-1.5 rounded-md transition-colors ${
                  location.pathname.startsWith("/products")
                    ? "text-[#091a32] font-semibold bg-slate-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span>{t("navProducts")}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              {isProductsDropdownOpen && (
                <div className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-lg border border-slate-200 py-2 mt-1 animate-in fade-in-50 duration-150 z-50">
                  <Link
                    to="/products"
                    className="flex items-center px-4 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50 border-b border-slate-100"
                  >
                    {t("navAllProducts")} &rarr;
                  </Link>
                  <Link
                    to="/products/ceiling-fans"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#091a32]"
                  >
                    <Fan className="w-4 h-4 text-[#091a32]" />
                    <span>{t("navCeilingFans")}</span>
                  </Link>
                  <Link
                    to="/products/table-fans"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#091a32]"
                  >
                    <Wind className="w-4 h-4 text-[#091a32]" />
                    <span>{t("navTableFans")}</span>
                  </Link>
                  <Link
                    to="/products/pedestal-fans"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#091a32]"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#091a32]" />
                    <span>{t("navPedestalFans")}</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/dealers"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                isActive("/dealers") || isActive("/wholesale")
                  ? "text-[#091a32] font-semibold bg-slate-100"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span>Applications</span>
            </Link>

            <Link
              to="/warranty"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                isActive("/warranty")
                  ? "text-[#091a32] font-semibold bg-slate-100"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span>{t("whyWarranty")}</span>
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                isActive("/contact")
                  ? "text-[#091a32] font-semibold bg-slate-100"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {t("navContact")}
            </Link>
          </nav>

          {/* Zone 3: Quick Search & Primary Quote Action */}
          <div className="hidden lg:flex items-center gap-2.5">
            <NavSearchBar variant="navbar" className="w-40 xl:w-48" />

            <button
              onClick={() => openAssistant()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#091a32] text-xs font-bold transition-colors shrink-0 border border-slate-200 shadow-2xs group"
              title="Ask Limra AI Fan Advisor"
              aria-label="Open AI Assistant"
            >
              <Bot className="w-3.5 h-3.5 text-[#e31e24] group-hover:rotate-12 transition-transform" />
              <span>AI Assist</span>
              <Sparkles className="w-3 h-3 text-amber-500" />
            </button>

            <Link
              to="/dealers?role=Super+Stockist"
              className="bg-[#e31e24] hover:bg-[#c4181d] text-white px-3.5 py-2 rounded-lg text-xs font-bold tracking-wide shadow-xs transition-colors shrink-0"
            >
              Apply as Stockist
            </Link>
          </div>

          {/* Mobile Right Controls: AI Icon, Search Icon, Language & Hamburger */}
          <div className="flex items-center lg:hidden gap-1.5">
            <button
              onClick={() => openAssistant()}
              className="p-2 rounded-md text-[#091a32] bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1"
              aria-label="Open AI Fan Advisor"
              title="AI Assistant"
            >
              <Bot className="w-4 h-4 text-[#e31e24]" />
              <span className="text-[10px] font-extrabold uppercase">AI</span>
            </button>

            <button
              onClick={() => {
                setIsMobileSearchOpen(!isMobileSearchOpen);
                if (isMobileMenuOpen) setIsMobileMenuOpen(false);
              }}
              className={`p-2 rounded-md transition-colors ${
                isMobileSearchOpen
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-700 hover:text-slate-900"
              }`}
              aria-label="Search fans"
            >
              <Search className="w-5 h-5" />
            </button>

            <LanguageSwitcher variant="header" />

            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                if (isMobileSearchOpen) setIsMobileSearchOpen(false);
              }}
              className="p-2 rounded-md text-slate-700 hover:text-slate-900"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Quick Search Bar Overlay */}
        {isMobileSearchOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-slate-50 px-4 py-3 animate-in slide-in-from-top-2 duration-150">
            <NavSearchBar
              variant="mobile"
              onCloseMobile={() => setIsMobileSearchOpen(false)}
            />
          </div>
        )}

        {/* Clean Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <Link
              to="/"
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                location.pathname === "/"
                  ? "bg-slate-100 text-[#091a32] font-bold"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {t("navHome")}
            </Link>

            <div className="space-y-1 pt-1">
              <Link
                to="/products"
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === "/products"
                    ? "bg-slate-100 text-[#091a32] font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {t("navAllProducts")}
              </Link>
              <div className="pl-4 space-y-1 border-l-2 border-slate-100 ml-3">
                <Link
                  to="/products/ceiling-fans"
                  className="block px-3 py-1.5 text-xs text-slate-600 hover:text-[#091a32]"
                >
                  {t("navCeilingFans")}
                </Link>
                <Link
                  to="/products/table-fans"
                  className="block px-3 py-1.5 text-xs text-slate-600 hover:text-[#091a32]"
                >
                  {t("navTableFans")}
                </Link>
                <Link
                  to="/products/pedestal-fans"
                  className="block px-3 py-1.5 text-xs text-slate-600 hover:text-[#091a32]"
                >
                  {t("navPedestalFans")}
                </Link>
              </div>
            </div>

            <Link
              to="/dealers"
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                isActive("/dealers") || isActive("/wholesale")
                  ? "bg-slate-100 text-[#091a32] font-bold"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              Applications
            </Link>

            <Link
              to="/warranty"
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                isActive("/warranty")
                  ? "bg-slate-100 text-[#091a32] font-bold"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              Digital Warranty
            </Link>

            <Link
              to="/contact"
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                isActive("/contact")
                  ? "bg-slate-100 text-[#091a32] font-bold"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {t("navContact")}
            </Link>

            {/* Quick Action Buttons */}
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openAssistant();
                }}
                className="w-full bg-[#091a32] hover:bg-[#0d274c] text-white text-center py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4 text-[#e31e24]" />
                <span>Ask Limra AI Fan Advisor</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </button>

              <Link
                to="/dealers?role=Super+Stockist"
                className="w-full bg-[#e31e24] hover:bg-[#c4181d] text-white text-center py-2.5 rounded-lg text-xs font-bold"
              >
                Apply for Super Stockist
              </Link>
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{t("topBarWhatsApp")}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
