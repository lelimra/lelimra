import React, { useState, useEffect, useRef } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SEOHead } from "@/components/SEOHead";
import { generateCataloguePdf } from "@/utils/generateCataloguePdf";
import {
  saveUploadedPdf,
  getSavedUploadedPdf,
  deleteSavedUploadedPdf,
  StoredPdfData,
} from "@/utils/pdfStorage";
import { CATALOGUE_PAGES, CataloguePageData, CatalogueColor } from "@/data/catalogueData";
import { getProductEnquiryWhatsAppUrl, getGeneralWhatsAppUrl } from "@/utils/whatsapp";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  Layers,
  ArrowDownToLine,
  FileUp,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  BookOpen,
  Eye,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export const CataloguePage: React.FC = () => {
  const [activePdfUrl, setActivePdfUrl] = useState<string | null>(null);
  const [customFileMeta, setCustomFileMeta] = useState<StoredPdfData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [viewerMode, setViewerMode] = useState<"embedded" | "interactive">("embedded");

  // Interactive mode states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(100);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeColor, setActiveColor] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalPages = CATALOGUE_PAGES.length;
  const currentData =
    CATALOGUE_PAGES.find((p) => p.pageNumber === currentPage) || CATALOGUE_PAGES[0];

  useEffect(() => {
    if (currentData.colors && currentData.colors.length > 0) {
      setActiveColor(currentData.colors[0].name);
    } else {
      setActiveColor("");
    }
  }, [currentPage, currentData]);

  // Load saved custom PDF on mount or fallback to generated catalogue PDF
  useEffect(() => {
    let currentObjectUrl: string | null = null;

    async function loadPdf() {
      setIsLoading(true);
      try {
        const saved = await getSavedUploadedPdf();
        if (saved && saved.blob) {
          currentObjectUrl = URL.createObjectURL(saved.blob);
          setActivePdfUrl(currentObjectUrl);
          setCustomFileMeta(saved);
        } else {
          // Generate default 15-page catalogue PDF
          const doc = generateCataloguePdf();
          const blob = doc.output("blob");
          currentObjectUrl = URL.createObjectURL(blob);
          setActivePdfUrl(currentObjectUrl);
          setCustomFileMeta(null);
        }
      } catch (err) {
        console.error("Error loading PDF:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadPdf();

    return () => {
      if (currentObjectUrl) {
        URL.revokeObjectURL(currentObjectUrl);
      }
    };
  }, []);

  const handleFileUpload = async (file: File) => {
    if (!file || file.type !== "application/pdf") {
      alert("Please select a valid PDF document (.pdf)");
      return;
    }

    setIsLoading(true);
    try {
      const saved = await saveUploadedPdf(file);
      if (activePdfUrl) {
        URL.revokeObjectURL(activePdfUrl);
      }
      const newUrl = URL.createObjectURL(saved.blob);
      setActivePdfUrl(newUrl);
      setCustomFileMeta(saved);
      setViewerMode("embedded");
    } catch (err) {
      console.error("Failed to save uploaded PDF", err);
      alert("Could not upload PDF file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetToDefault = async () => {
    if (window.confirm("Reset back to the preloaded 15-page LE LIMRA official catalogue?")) {
      setIsLoading(true);
      try {
        await deleteSavedUploadedPdf();
        if (activePdfUrl) {
          URL.revokeObjectURL(activePdfUrl);
        }
        const doc = generateCataloguePdf();
        const blob = doc.output("blob");
        const defaultUrl = URL.createObjectURL(blob);
        setActivePdfUrl(defaultUrl);
        setCustomFileMeta(null);
      } catch (err) {
        console.error("Failed to reset PDF", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDownload = () => {
    if (customFileMeta && customFileMeta.blob) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(customFileMeta.blob);
      link.download = customFileMeta.fileName || "LE-LIMRA-Product-Catalogue.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const doc = generateCataloguePdf();
      doc.save("LE-LIMRA-Product-Catalogue.pdf");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <>
      <SEOHead
        title="Product Catalogue & PDF Viewer | LE LIMRA Fans"
        description="Official LE LIMRA Product Catalogue PDF viewer. View or upload custom catalogue files, browse decorative ceiling fans, table, wall & pedestal fans from LIMRA INDUSTRIES, Hyderabad."
      />

      <div className="bg-slate-100 min-h-screen pb-16">
        {/* Top Header & Breadcrumbs */}
        <div className="bg-white border-b border-slate-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: "Catalogue PDF Viewer" }]} />

            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#174e8c]">
                    LIMRA INDUSTRIES • Hyderabad
                  </span>
                  {customFileMeta ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                      Custom Uploaded PDF Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Official 15-Page Catalogue Loaded
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
                  Product Catalogue PDF
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                  {customFileMeta
                    ? `Currently viewing custom file: "${customFileMeta.fileName}" (${formatFileSize(customFileMeta.fileSize)})`
                    : "View the official 15-page catalogue directly or upload your own catalogue PDF file below."}
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="application/pdf,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  className="hidden"
                />

                {/* Manual Upload Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0b2f5c] hover:bg-[#07192f] text-white text-xs font-bold shadow-md transition-all hover:scale-102 cursor-pointer"
                  title="Upload your own catalogue PDF"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload / Replace PDF</span>
                </button>

                {/* Reset button if custom PDF is uploaded */}
                {customFileMeta && (
                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-red-200 hover:bg-red-50 text-red-600 text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    title="Reset back to standard 15-page catalogue"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Reset Default</span>
                  </button>
                )}

                {/* Download PDF button */}
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <ArrowDownToLine className="w-4 h-4 text-slate-600" />
                  <span>Download PDF</span>
                </button>

                {/* WhatsApp Inquiry */}
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Quote</span>
                </a>
              </div>
            </div>

            {/* Quick Drag & Drop Banner */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                const file = e.dataTransfer.files?.[0];
                if (file) handleFileUpload(file);
              }}
              className={`mt-4 rounded-xl border-2 border-dashed p-3 sm:p-4 text-center transition-colors flex flex-col sm:flex-row items-center justify-between gap-3 ${
                isDragOver
                  ? "border-[#0b2f5c] bg-blue-50/80"
                  : "border-slate-300 bg-slate-50/60 hover:bg-slate-100/60"
              }`}
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#0b2f5c] flex items-center justify-center shrink-0">
                  <FileUp className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Have a newer or custom LIMRA catalogue PDF?
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Drag & drop your PDF file here or click "Upload / Replace PDF" to load it instantly.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-bold text-[#0b2f5c] hover:underline bg-white px-3 py-1.5 rounded-lg border border-slate-200 cursor-pointer shadow-2xs"
                >
                  Browse Computer...
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode Switcher Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewerMode("embedded")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewerMode === "embedded"
                    ? "bg-[#0b2f5c] text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Direct PDF Viewer</span>
              </button>

              <button
                type="button"
                onClick={() => setViewerMode("interactive")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewerMode === "interactive"
                    ? "bg-[#0b2f5c] text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>15-Page Interactive Reader</span>
              </button>
            </div>

            {activePdfUrl && (
              <a
                href={activePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#0b2f5c] hover:underline inline-flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in New Browser Tab</span>
              </a>
            )}
          </div>

          {/* MAIN VIEWER CONTAINER */}
          {viewerMode === "embedded" ? (
            /* MODE 1: Direct Native PDF Document Viewer */
            <div className="bg-[#2a2d30] rounded-2xl border-2 border-slate-400 shadow-2xl overflow-hidden">
              {/* PDF Top Bar */}
              <div className="bg-[#1f2224] text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b border-[#44484c]">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-red-600 flex items-center justify-center text-white font-black text-xs">
                    PDF
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold block leading-tight text-white">
                      {customFileMeta ? customFileMeta.fileName : "LE-LIMRA-Product-Catalogue.pdf"}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {customFileMeta
                        ? `Uploaded: ${new Date(customFileMeta.uploadedAt).toLocaleDateString()} • ${formatFileSize(customFileMeta.fileSize)}`
                        : "Official 15-Page Manufacturer Publication • LIMRA INDUSTRIES"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="bg-[#3c4043] hover:bg-[#4d5155] text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-[#55595d] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                </div>
              </div>

              {/* Direct Embedded PDF Object */}
              <div className="w-full bg-[#525659] min-h-[750px] sm:min-h-[880px] flex items-center justify-center relative">
                {isLoading ? (
                  <div className="text-center p-12 text-white">
                    <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm font-bold">Loading Catalogue PDF...</p>
                  </div>
                ) : activePdfUrl ? (
                  <object
                    data={activePdfUrl}
                    type="application/pdf"
                    className="w-full h-[750px] sm:h-[880px] border-none"
                  >
                    {/* Fallback container if browser blocks object embed */}
                    <div className="p-12 text-center max-w-md mx-auto space-y-4 bg-white rounded-2xl m-8 shadow-xl">
                      <FileText className="w-16 h-16 text-[#0b2f5c] mx-auto" />
                      <h3 className="text-lg font-bold text-slate-900">
                        {customFileMeta ? customFileMeta.fileName : "LE LIMRA Catalogue PDF"}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Click below to open the PDF directly or switch to the 15-Page Interactive Reader tab above.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                        <a
                          href={activePdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#0b2f5c] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Open PDF Viewer</span>
                        </a>
                        <button
                          onClick={handleDownload}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-300 cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  </object>
                ) : (
                  <div className="text-center p-12 text-white">
                    <p className="text-sm font-bold text-red-400">PDF not available</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* MODE 2: 15-Page Interactive Reader */
            <div className="bg-[#323639] rounded-2xl border-2 border-slate-400 shadow-2xl overflow-hidden flex flex-col">
              {/* Reader Sub-Bar */}
              <div className="bg-[#2a2d30] border-b border-[#44484c] px-4 py-2.5 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-1 rounded bg-[#3c4043] hover:bg-[#4d5155] text-slate-200 cursor-pointer"
                  >
                    {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
                  </button>
                  <span className="font-bold">Page {currentPage} of {totalPages}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1 rounded bg-[#3c4043] hover:bg-[#4d5155] disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <select
                    value={currentPage}
                    onChange={(e) => setCurrentPage(Number(e.target.value))}
                    className="bg-[#1f2224] text-white border border-[#55595d] px-2 py-0.5 rounded text-xs"
                  >
                    {CATALOGUE_PAGES.map((p) => (
                      <option key={p.pageNumber} value={p.pageNumber}>
                        Page {p.pageNumber}: {p.title}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1 rounded bg-[#3c4043] hover:bg-[#4d5155] disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Reader Body */}
              <div className="flex overflow-hidden min-h-[680px]">
                {isSidebarOpen && (
                  <aside className="w-56 bg-[#23272a] border-r border-[#44484c] p-3 overflow-y-auto space-y-2 shrink-0 h-[680px]">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                      Catalogue Pages
                    </span>
                    {CATALOGUE_PAGES.map((p) => (
                      <button
                        key={p.pageNumber}
                        type="button"
                        onClick={() => setCurrentPage(p.pageNumber)}
                        className={`w-full text-left p-2 rounded-lg text-xs transition-colors cursor-pointer border ${
                          p.pageNumber === currentPage
                            ? "bg-[#0b2f5c] border-blue-400 text-white"
                            : "bg-[#2d3135] border-[#44484c] text-slate-300 hover:bg-[#383d42]"
                        }`}
                      >
                        <div className="font-bold flex justify-between">
                          <span>Page {p.pageNumber}</span>
                          {p.modelCode && <span className="text-red-300 text-[10px]">{p.modelCode}</span>}
                        </div>
                        <div className="truncate text-slate-300 text-[11px]">{p.title}</div>
                      </button>
                    ))}
                  </aside>
                )}

                {/* Active Interactive Sheet Canvas */}
                <main className="flex-1 p-6 sm:p-10 overflow-y-auto bg-[#525659] flex items-center justify-center">
                  <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-3xl w-full text-slate-900 aspect-[1.414/1] flex flex-col justify-between">
                    <div className="border-b pb-3 flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
                          {currentData.title}
                        </h2>
                        {currentData.modelCode && (
                          <span className="text-xs bg-red-600 text-white font-bold px-2 py-0.5 rounded">
                            {currentData.modelCode}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-slate-400">
                        Page {currentData.pageNumber} / {totalPages}
                      </span>
                    </div>

                    <div className="py-4 text-xs sm:text-sm text-slate-700">
                      {currentData.specs && (
                        <div className="border rounded-lg overflow-hidden my-2">
                          <table className="w-full text-xs">
                            <tbody className="divide-y">
                              <tr>
                                <td className="p-2 bg-slate-50 font-bold">Sweep (mm)</td>
                                <td className="p-2 text-right font-black">{currentData.specs.sweepMm} mm</td>
                              </tr>
                              <tr>
                                <td className="p-2 bg-slate-50 font-bold">Rated Speed</td>
                                <td className="p-2 text-right font-black">{currentData.specs.speedRpm}</td>
                              </tr>
                              <tr>
                                <td className="p-2 bg-slate-50 font-bold">Air Delivery</td>
                                <td className="p-2 text-right font-black">{currentData.specs.airDeliveryCmm}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                      {currentData.description && (
                        <p className="text-xs leading-relaxed text-slate-600 mt-2">{currentData.description}</p>
                      )}
                    </div>

                    <div className="border-t pt-3 flex items-center justify-between text-xs text-slate-500">
                      <span>LIMRA INDUSTRIES • Hyderabad</span>
                      <a
                        href={getProductEnquiryWhatsAppUrl(currentData.title, currentData.modelCode)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Enquire on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
