import React, { useState, useRef } from "react";
import { useLogo } from "@/context/LogoContext";
import {
  Upload,
  X,
  RotateCcw,
  Check,
  Image as ImageIcon,
  Sliders,
  Sun,
  Moon,
  Plus,
  Minus,
} from "lucide-react";

export const LogoUploadModal: React.FC = () => {
  const {
    customLogo,
    customLogoWhite,
    logoScale,
    isModalOpen,
    closeModal,
    uploadLogo,
    uploadLogoWhite,
    setLogoScale,
    resetToDefault,
  } = useLogo();

  const [dragActive, setDragActive] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const whiteFileInputRef = useRef<HTMLInputElement>(null);

  if (!isModalOpen) return null;

  const handleFileProcess = (file: File, isWhiteVersion: boolean = false) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, SVG, WebP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        if (isWhiteVersion) {
          uploadLogoWhite(result);
          setSuccessMessage("White logo version saved successfully!");
        } else {
          uploadLogo(result);
          setSuccessMessage("Logo updated across the entire website!");
        }
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0], false);
    }
  };

  const scalePresets = [
    { label: "Compact", value: 85 },
    { label: "Balanced", value: 100 },
    { label: "Medium", value: 120 },
    { label: "Large", value: 140 },
    { label: "Extra Large", value: 160 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logo-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#003882] to-[#0c458e] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-blue-200" />
            <h3 id="logo-modal-title" className="font-bold text-base">
              Logo Settings & Size Adjustment
            </h3>
          </div>
          <button
            onClick={closeModal}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[82vh] overflow-y-auto">
          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Size Scale Adjustment Section - Placed prominently */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-[#003882]" /> Adjust Logo Size (Scale)
              </label>
              <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-lg px-2 py-0.5 shadow-xs">
                <button
                  type="button"
                  onClick={() => setLogoScale(Math.max(50, (logoScale || 100) - 5))}
                  className="p-1 hover:bg-slate-100 rounded text-slate-600 cursor-pointer"
                  title="Decrease size"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-[#003882] min-w-[3.5rem] text-center font-mono">
                  {logoScale || 100}%
                </span>
                <button
                  type="button"
                  onClick={() => setLogoScale(Math.min(200, (logoScale || 100) + 5))}
                  className="p-1 hover:bg-slate-100 rounded text-slate-600 cursor-pointer"
                  title="Increase size"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Range Slider */}
            <input
              type="range"
              min="50"
              max="180"
              step="5"
              value={logoScale || 100}
              onChange={(e) => setLogoScale(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#003882]"
            />

            {/* Quick Scale Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {scalePresets.map((preset) => {
                const isActive = (logoScale || 100) === preset.value;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setLogoScale(preset.value)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#003882] text-white shadow-xs font-semibold"
                        : "bg-white border border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-blue-50/50"
                    }`}
                  >
                    {preset.label} ({preset.value}%)
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upload Dropzone */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Official Logo File
              </label>
              {customLogo && (
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Custom Logo Active
                </span>
              )}
            </div>
            <div
              onDragEnter={() => setDragActive(true)}
              onDragLeave={() => setDragActive(false)}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                dragActive
                  ? "border-[#003882] bg-blue-50/50"
                  : "border-slate-300 hover:border-blue-500 hover:bg-slate-50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleFileProcess(e.target.files[0], false);
                  }
                }}
              />
              <div className="w-10 h-10 rounded-full bg-blue-100 text-[#003882] flex items-center justify-center mx-auto mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                {customLogo ? "Click to replace logo file" : "Click to select logo image file"}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PNG, SVG, JPG, or WebP
              </p>
            </div>
          </div>

          {/* Live Previews */}
          <div className="space-y-3 pt-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Live Preview
            </h4>

            {/* Light Preview (Navbar style) */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500" /> Header Preview
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                  Scale: {logoScale || 100}%
                </span>
              </div>
              <div className="h-20 flex items-center justify-start border-t border-slate-100 pt-2 overflow-hidden">
                {customLogo ? (
                  <div
                    style={{
                      transform: `scale(${(logoScale || 100) / 100})`,
                      transformOrigin: "left center",
                    }}
                    className="transition-transform duration-150"
                  >
                    <img
                      src={customLogo}
                      alt="Custom Logo Preview"
                      className="max-h-14 w-auto object-contain"
                    />
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 italic">
                    Currently showing default vector logo
                  </span>
                )}
              </div>
            </div>

            {/* Dark Preview (Footer style) */}
            <div className="border border-slate-800 rounded-xl p-4 bg-[#07192f] text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-blue-400" /> Footer Preview (Dark Navy)
                </span>
              </div>
              <div className="h-20 flex items-center justify-start border-t border-slate-800 pt-2 overflow-hidden">
                {customLogoWhite ? (
                  <div
                    style={{
                      transform: `scale(${(logoScale || 100) / 100})`,
                      transformOrigin: "left center",
                    }}
                    className="transition-transform duration-150"
                  >
                    <img
                      src={customLogoWhite}
                      alt="White Logo Preview"
                      className="max-h-14 w-auto object-contain"
                    />
                  </div>
                ) : customLogo ? (
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        transform: `scale(${(logoScale || 100) / 100})`,
                        transformOrigin: "left center",
                      }}
                      className="transition-transform duration-150 bg-white px-3.5 py-2 rounded-xl shadow-sm"
                    >
                      <img
                        src={customLogo}
                        alt="Custom Logo"
                        className="max-h-12 w-auto object-contain"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => whiteFileInputRef.current?.click()}
                      className="text-[11px] text-blue-300 hover:text-white underline cursor-pointer"
                    >
                      Upload dedicated white version?
                    </button>
                    <input
                      ref={whiteFileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileProcess(e.target.files[0], true);
                        }
                      }}
                    />
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 italic">
                    Default high-contrast vector logo
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={resetToDefault}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>

          <button
            onClick={closeModal}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#003882] hover:bg-[#09479e] px-5 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Done & Apply</span>
          </button>
        </div>
      </div>
    </div>
  );
};
