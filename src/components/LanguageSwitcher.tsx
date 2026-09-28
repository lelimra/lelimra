import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe, ChevronDown, Check } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "header" | "topbar" | "mobile";
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = "header",
  className = "",
}) => {
  const { language, setLanguage, supportedLanguages, currentOption } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (variant === "mobile") {
    return (
      <div className={`pt-2 border-t border-slate-100 ${className}`}>
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 px-1">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#0b2f5c]" />
            <span>Indian Languages ({supportedLanguages.length})</span>
          </div>
          <span className="text-[10px] text-slate-400 font-normal normal-case">
            Select Language
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
          {supportedLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium border transition-all text-left ${
                language === lang.code
                  ? "bg-[#0b2f5c] text-white border-[#0b2f5c] font-bold shadow-sm"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <div className="flex flex-col min-w-0 pr-1">
                <span className="text-xs font-bold truncate leading-tight">
                  {lang.nativeLabel}
                </span>
                <span
                  className={`text-[10px] truncate ${
                    language === lang.code ? "text-blue-200" : "text-slate-500"
                  }`}
                >
                  {lang.label}
                </span>
              </div>
              {language === lang.code && (
                <Check className="w-3.5 h-3.5 flex-shrink-0 text-white" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "topbar") {
    return (
      <div className={`relative inline-block ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 rounded transition-colors"
          aria-label="Select Language"
          aria-expanded={isOpen}
        >
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-medium">{currentOption.nativeLabel}</span>
          <span className="text-[10px] text-slate-400">({currentOption.label})</span>
          <ChevronDown
            className={`w-3 h-3 text-slate-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-1.5 w-64 max-h-80 overflow-y-auto bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 text-slate-800 animate-in fade-in-50 duration-150">
            <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1 flex items-center justify-between">
              <span>All Indian Languages</span>
              <span className="text-slate-400 font-semibold">{supportedLanguages.length} Available</span>
            </div>
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors border-b border-slate-50 last:border-0 ${
                  language === lang.code
                    ? "bg-blue-50/80 text-[#0b2f5c] font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="min-w-0 pr-2">
                  <div className="font-semibold text-slate-900 leading-tight">
                    {lang.nativeLabel}
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <span className="font-medium text-slate-600">{lang.label}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[9px] text-slate-400 truncate">
                      {lang.community}
                    </span>
                  </div>
                </div>
                {language === lang.code && (
                  <Check className="w-4 h-4 text-[#0b2f5c] flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Header variant (standard)
  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-[#0b2f5c] bg-slate-100/80 hover:bg-slate-100 rounded-lg border border-slate-200/80 transition-colors"
        aria-label="Choose Language"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-[#174e8c]" />
        <span>{currentOption.nativeLabel}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-72 max-h-88 overflow-y-auto bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 animate-in fade-in-50 duration-150">
          <div className="px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1 flex items-center justify-between">
            <span>Select Indian Language</span>
            <span className="text-slate-400 font-semibold">{supportedLanguages.length} Options</span>
          </div>
          {supportedLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors border-b border-slate-50 last:border-0 ${
                language === lang.code
                  ? "bg-blue-50/80 text-[#0b2f5c] font-bold"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className="min-w-0 pr-2">
                <span className="block font-bold text-slate-900 text-sm leading-tight">
                  {lang.nativeLabel}
                </span>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                  <span className="font-semibold text-slate-700">{lang.label}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[10px] text-slate-400 truncate">
                    {lang.community}
                  </span>
                </div>
              </div>
              {language === lang.code && (
                <Check className="w-4 h-4 text-[#0b2f5c] flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
