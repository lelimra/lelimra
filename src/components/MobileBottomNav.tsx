import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getGeneralWhatsAppUrl } from "@/utils/whatsapp";
import {
  Home,
  Fan,
  ShieldCheck,
  Building2,
  MessageSquare,
} from "lucide-react";

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();

  const isPathActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav
      aria-label="Mobile Navigation Dock"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="grid grid-cols-5 h-14 items-center px-1 max-w-md mx-auto">
        {/* 1. Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center h-full py-1 text-center transition-colors ${
            isPathActive("/")
              ? "text-[#091a32] font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Home
            className={`w-5 h-5 transition-transform ${
              isPathActive("/") ? "scale-105 stroke-[2.2]" : "stroke-[1.7]"
            }`}
          />
          <span className="text-[10px] mt-0.5 leading-tight">Home</span>
        </Link>

        {/* 2. Fans Catalog */}
        <Link
          to="/products"
          className={`flex flex-col items-center justify-center h-full py-1 text-center transition-colors ${
            isPathActive("/products")
              ? "text-[#091a32] font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Fan
            className={`w-5 h-5 transition-transform ${
              isPathActive("/products") ? "scale-105 stroke-[2.2]" : "stroke-[1.7]"
            }`}
          />
          <span className="text-[10px] mt-0.5 leading-tight">Fans</span>
        </Link>

        {/* 3. Super Stockist & Partner Applications */}
        <Link
          to="/dealers?role=Super+Stockist"
          className={`flex flex-col items-center justify-center h-full py-1 text-center transition-colors ${
            isPathActive("/dealers")
              ? "text-[#091a32] font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
          title="Applications for Super Stockist, Distributors & Dealers"
        >
          <Building2
            className={`w-5 h-5 transition-transform ${
              isPathActive("/dealers")
                ? "scale-105 stroke-[2.2]"
                : "stroke-[1.7]"
            }`}
          />
          <span className="text-[10px] mt-0.5 leading-tight font-medium">Applications</span>
        </Link>

        {/* 4. Warranty */}
        <Link
          to="/warranty"
          className={`flex flex-col items-center justify-center h-full py-1 text-center transition-colors ${
            isPathActive("/warranty")
              ? "text-[#091a32] font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <ShieldCheck
            className={`w-5 h-5 transition-transform ${
              isPathActive("/warranty") ? "scale-105 stroke-[2.2]" : "stroke-[1.7]"
            }`}
          />
          <span className="text-[10px] mt-0.5 leading-tight">Warranty</span>
        </Link>

        {/* 5. Direct WhatsApp Chat */}
        <a
          href={getGeneralWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-full py-1 text-center text-emerald-600 hover:text-emerald-700 transition-colors"
          aria-label="Direct WhatsApp Enquiry"
        >
          <MessageSquare className="w-5 h-5 fill-emerald-600" />
          <span className="text-[10px] mt-0.5 font-bold leading-tight">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
};
