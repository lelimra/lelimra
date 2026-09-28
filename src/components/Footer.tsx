import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/data/site";
import { useLanguage } from "@/context/LanguageContext";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Facebook,
  Instagram,
  Youtube,
  ChevronRight,
} from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/utils/whatsapp";
import { Logo } from "@/components/Logo";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#091a32] text-slate-300 border-t border-slate-800">
      {/* Top Banner inside Footer */}
      <div className="border-b border-slate-200 py-10 bg-slate-50 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#091a32]">
              {t("trustManufacturer")}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-['Cabinet_Grotesk',sans-serif]">
              {t("wholesaleHeadline")}
            </h3>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              {t("wholesaleText")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/wholesale"
              className="bg-[#e31e24] hover:bg-[#c4181d] text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all duration-150"
            >
              {t("navGetQuote")}
            </Link>
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#091a32] hover:bg-[#112d52] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all duration-150 shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-[#e31e24]" />
              <span>{t("topBarWhatsApp")}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col items-start">
              <Logo variant="footer" size="footer" />
              <span className="text-xs font-bold text-slate-400 tracking-wider mt-2.5">
                {siteConfig.companyName}
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              {t("footerAboutText")}
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  {siteConfig.city}, {siteConfig.state}, {siteConfig.country}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{siteConfig.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{siteConfig.email}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#e31e24] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#e31e24] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#e31e24] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Fan Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
              {t("navProducts")}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/products/ceiling-fans"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t("navCeilingFans")}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products/table-fans"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t("navTableFans")}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products/pedestal-fans"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t("navPedestalFans")}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300 font-semibold"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#e31e24]" />
                  <span>{t("navAllProducts")}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Business */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t("navAbout")}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/wholesale"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t("navWholesale")}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/freight-estimator"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#e31e24]" />
                  <span>Freight &amp; Master Carton Estimator</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/warranty"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#e31e24]" />
                  <span>Digital Warranty Registration</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/catalogue"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t("navCatalogue")}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t("navContact")}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Operations & Supply Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
              {t("tradeSupply")}
            </h4>
            <div className="space-y-3 text-xs text-slate-400 leading-relaxed">
              <div className="p-3 rounded bg-slate-800/60 border border-slate-700/60">
                <span className="font-semibold text-slate-200 block text-xs">
                  {t("trustManufacturer")}
                </span>
                {t("trustManufacturerDesc")}
              </div>
              <div className="p-3 rounded bg-slate-800/60 border border-slate-700/60">
                <span className="font-semibold text-slate-200 block text-xs">
                  {t("trustDelivery")}
                </span>
                {t("trustDeliveryDesc")}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Legal */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026 {siteConfig.companyName}. {t("copyright")}</span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1 font-bold text-slate-300">
              <span className="text-[#e31e24]">★</span> Quality Without Compromise
            </span>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            <span>Brand: {siteConfig.brandName}</span>
            <span>•</span>
            <span>Made in {siteConfig.country}</span>
            <span>•</span>
            <Link to="/contact" className="hover:text-white underline">
              {t("navContact")}
            </Link>
            <span>•</span>
            <Link
              to="/admin"
              className="text-amber-400 hover:text-amber-300 font-bold bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded border border-slate-700 flex items-center gap-1 transition-all"
            >
              🔒 Owner Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
