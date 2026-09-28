import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useProducts } from "@/context/ProductContext";
import { siteConfig } from "@/data/site";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Search,
  Printer,
  Download,
  Share2,
  MessageSquare,
  Sparkles,
  Calendar,
  Building2,
  Phone,
  User,
  MapPin,
  FileText,
  Clock,
  HelpCircle,
  Award,
  Zap,
  RefreshCw,
  QrCode,
  ArrowRight,
  PlusCircle,
  Package,
  Upload,
  Camera,
  Image as ImageIcon,
  Check,
  X,
  Eye,
  FileSpreadsheet,
  BadgeCheck,
  Maximize2,
} from "lucide-react";

export interface WarrantyRecord {
  id: string; // e.g., LIM-WR-2026-89421
  customerName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  productName: string;
  modelCode: string;
  serialNumber: string;
  invoiceNumber: string;
  purchaseDate: string;
  dealerName: string;
  dealerCity: string;
  quantity: number;
  registeredAt: string;
  expiryDate: string;
  warrantyPeriodYears: number;
  status: "ACTIVE" | "EXPIRED" | "CLAIMED";
  invoiceImage?: string; // base64 or URL
  invoiceFileName?: string;
  invoiceFileSize?: string;
  hasDealerStamp?: boolean;
}

const STORAGE_KEY = "limra_warranties_records";

// Sample Stamped Bill SVG Data URI for realistic test demo records
const SAMPLE_STAMPED_BILL_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 900" width="700" height="900" style="background:#ffffff;font-family:Arial,sans-serif;">
  <!-- Border -->
  <rect x="20" y="20" width="660" height="860" fill="#ffffff" stroke="#0b2f5c" stroke-width="3" rx="8"/>
  
  <!-- Header Banner -->
  <rect x="20" y="20" width="660" height="90" fill="#07192f" rx="6 6 0 0"/>
  <text x="350" y="55" fill="#ffffff" font-size="22" font-weight="900" text-anchor="middle" letter-spacing="2">SRI LAKSHMI ELECTRICALS &amp; HARDWARE</text>
  <text x="350" y="78" fill="#93c5fd" font-size="11" text-anchor="middle">Authorized Dealer • LE LIMRA Fans • Balanagar Main Rd, Hyderabad</text>
  <text x="350" y="96" fill="#cbd5e1" font-size="10" text-anchor="middle">GSTIN: 36AAAAA0000A1Z5 • Phone: +91 98765 43210</text>

  <!-- Title -->
  <rect x="250" y="125" width="200" height="30" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1" rx="4"/>
  <text x="350" y="145" fill="#0f172a" font-size="13" font-weight="bold" text-anchor="middle">TAX INVOICE / CASH MEMO</text>

  <!-- Bill Info Grid -->
  <line x1="40" y1="175" x2="660" y2="175" stroke="#e2e8f0" stroke-width="1"/>
  <text x="45" y="195" fill="#64748b" font-size="11">Invoice No: <tspan fill="#0f172a" font-weight="bold">INV-2026-0491</tspan></text>
  <text x="480" y="195" fill="#64748b" font-size="11">Date: <tspan fill="#0f172a" font-weight="bold">15-Mar-2026</tspan></text>
  <text x="45" y="220" fill="#64748b" font-size="11">Customer Name: <tspan fill="#0f172a" font-weight="bold">Ramesh Sharma</tspan></text>
  <text x="480" y="220" fill="#64748b" font-size="11">Contact: <tspan fill="#0f172a" font-weight="bold">9876543210</tspan></text>
  <text x="45" y="245" fill="#64748b" font-size="11">Address: <tspan fill="#0f172a">Plot 42, Jubilee Hills, Hyderabad - 500001</tspan></text>
  <line x1="40" y1="260" x2="660" y2="260" stroke="#e2e8f0" stroke-width="1"/>

  <!-- Table Header -->
  <rect x="40" y="275" width="620" height="30" fill="#0b2f5c" rx="4"/>
  <text x="55" y="295" fill="#ffffff" font-size="11" font-weight="bold">#</text>
  <text x="80" y="295" fill="#ffffff" font-size="11" font-weight="bold">Item Description</text>
  <text x="360" y="295" fill="#ffffff" font-size="11" font-weight="bold">Serial / Batch No.</text>
  <text x="490" y="295" fill="#ffffff" font-size="11" font-weight="bold">Qty</text>
  <text x="540" y="295" fill="#ffffff" font-size="11" font-weight="bold">Rate (₹)</text>
  <text x="610" y="295" fill="#ffffff" font-size="11" font-weight="bold">Total (₹)</text>

  <!-- Table Row 1 -->
  <rect x="40" y="310" width="620" height="40" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="55" y="335" fill="#0f172a" font-size="11">1</text>
  <text x="80" y="330" fill="#0f172a" font-size="11" font-weight="bold">LE LIMRA Jazz 1200mm Ceiling Fan</text>
  <text x="80" y="344" fill="#64748b" font-size="9">Color: Smooky / Satin Gold • 2-Yr Motor Warranty</text>
  <text x="360" y="335" fill="#0f172a" font-size="10" font-family="monospace">SN-LIM-2026-JZ9012</text>
  <text x="500" y="335" fill="#0f172a" font-size="11">2</text>
  <text x="545" y="335" fill="#0f172a" font-size="11">2,150.00</text>
  <text x="610" y="335" fill="#0f172a" font-size="11" font-weight="bold">4,300.00</text>

  <!-- Table Totals -->
  <line x1="40" y1="420" x2="660" y2="420" stroke="#cbd5e1" stroke-width="1"/>
  <text x="460" y="445" fill="#64748b" font-size="11">Subtotal:</text>
  <text x="610" y="445" fill="#0f172a" font-size="11" font-weight="bold">₹ 4,300.00</text>
  <text x="460" y="470" fill="#64748b" font-size="11">GST (18% Included):</text>
  <text x="610" y="470" fill="#0f172a" font-size="11">₹ 656.00</text>
  <rect x="440" y="485" width="220" height="35" fill="#0b2f5c" rx="4"/>
  <text x="460" y="508" fill="#ffffff" font-size="12" font-weight="bold">GRAND TOTAL:</text>
  <text x="590" y="508" fill="#fde047" font-size="13" font-weight="black">₹ 4,300.00</text>

  <!-- Terms -->
  <text x="45" y="550" fill="#0f172a" font-size="11" font-weight="bold">Terms &amp; Conditions:</text>
  <text x="45" y="570" fill="#64748b" font-size="9">• Goods once sold will not be taken back without original bill &amp; dealer stamp.</text>
  <text x="45" y="585" fill="#64748b" font-size="9">• 2-Year Manufacturer Warranty on Motor &amp; Bearings covered by LIMRA INDUSTRIES.</text>
  <text x="45" y="600" fill="#64748b" font-size="9">• Please retain this stamped cash memo for warranty registration.</text>

  <!-- OFFICIAL DEALER RUBBER STAMP GRAPHIC -->
  <g transform="translate(180, 680) rotate(-6)">
    <!-- Outer stamp double circle -->
    <circle cx="100" cy="80" r="75" fill="none" stroke="#dc2626" stroke-width="4" stroke-dasharray="8 4"/>
    <circle cx="100" cy="80" r="68" fill="#fef2f2" fill-opacity="0.85" stroke="#dc2626" stroke-width="2"/>
    
    <!-- Stamp curved text / banner -->
    <text x="100" y="32" fill="#b91c1c" font-size="9" font-weight="900" text-anchor="middle" letter-spacing="1">★ SRI LAKSHMI ELECTRICALS ★</text>
    <text x="100" y="46" fill="#991b1b" font-size="8" font-weight="bold" text-anchor="middle">AUTHORIZED LIMRA DEALER</text>
    
    <!-- Center Stamp Box -->
    <rect x="45" y="58" width="110" height="42" fill="#dc2626" rx="4"/>
    <text x="100" y="76" fill="#ffffff" font-size="11" font-weight="900" text-anchor="middle" letter-spacing="2">VERIFIED &amp; PAID</text>
    <text x="100" y="92" fill="#fee2e2" font-size="9" font-weight="bold" text-anchor="middle">STAMP &amp; SIGN</text>
    
    <text x="100" y="118" fill="#b91c1c" font-size="8" font-weight="bold" text-anchor="middle">BALANAGAR, HYD-37</text>
    <text x="100" y="132" fill="#991b1b" font-size="8" font-weight="bold" text-anchor="middle">TELANGANA</text>
    
    <!-- Stylized signature scribble -->
    <path d="M 60 100 Q 80 85, 100 105 T 140 95 T 150 110" fill="none" stroke="#1e3a8a" stroke-width="2.5"/>
  </g>

  <!-- Dealer Signature Box on Right -->
  <rect x="460" y="700" width="190" height="80" fill="#f8fafc" stroke="#94a3b8" stroke-dasharray="4" rx="4"/>
  <text x="555" y="770" fill="#64748b" font-size="10" font-weight="bold" text-anchor="middle">Authorized Dealer Signature</text>
  <path d="M 490 735 Q 520 710, 560 740 T 620 725" fill="none" stroke="#1e3a8a" stroke-width="2.5"/>

  <!-- Footer Notice -->
  <rect x="20" y="840" width="660" height="40" fill="#f1f5f9" rx="0 0 6 6"/>
  <text x="350" y="865" fill="#475569" font-size="10" font-weight="bold" text-anchor="middle">
    Official Purchase Bill with Registered Dealer Stamp • LE LIMRA 2-Year Motor Warranty
  </text>
</svg>
`)}`;

const SAMPLE_RECORDS: WarrantyRecord[] = [
  {
    id: "LIM-WR-2026-58291",
    customerName: "Ramesh Sharma",
    phone: "9876543210",
    email: "ramesh.sharma@example.com",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500001",
    address: "Plot 42, Jubilee Hills, Hyderabad",
    productName: "Jazz Decorative Ceiling Fan",
    modelCode: "JAZZ-1200",
    serialNumber: "SN-LIM-2026-JZ9012",
    invoiceNumber: "INV-2026-0491",
    purchaseDate: "2026-03-15",
    dealerName: "Sri Lakshmi Electricals & Hardware",
    dealerCity: "Hyderabad",
    quantity: 2,
    registeredAt: "2026-03-16T10:30:00.000Z",
    expiryDate: "2028-03-15",
    warrantyPeriodYears: 2,
    status: "ACTIVE",
    invoiceImage: SAMPLE_STAMPED_BILL_SVG,
    invoiceFileName: "Invoice_SriLakshmi_Stamped_0491.png",
    invoiceFileSize: "248 KB",
    hasDealerStamp: true,
  },
  {
    id: "LIM-WR-2025-11049",
    customerName: "Mohd Imran",
    phone: "9123456780",
    email: "imran.electricals@example.com",
    city: "Vijayawada",
    state: "Andhra Pradesh",
    pincode: "520002",
    address: "Shop 12, Governorpet Market, Vijayawada",
    productName: "Enticer Premium High Air Fan",
    modelCode: "ENTICER-1200",
    serialNumber: "SN-LIM-2025-EN3384",
    invoiceNumber: "INV-9920",
    purchaseDate: "2025-08-10",
    dealerName: "Royal Electrical Agencies",
    dealerCity: "Vijayawada",
    quantity: 4,
    registeredAt: "2025-08-11T14:15:00.000Z",
    expiryDate: "2027-08-10",
    warrantyPeriodYears: 2,
    status: "ACTIVE",
    invoiceImage: SAMPLE_STAMPED_BILL_SVG,
    invoiceFileName: "Royal_Agencies_Stamped_Memo.jpg",
    invoiceFileSize: "310 KB",
    hasDealerStamp: true,
  },
];

export const WarrantyPage: React.FC = () => {
  const { products } = useProducts();
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<"register" | "lookup" | "certificate" | "claim" | "policy">(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["register", "lookup", "certificate", "claim", "policy"].includes(tabParam)) {
      return tabParam as any;
    }
    return "register";
  });

  // Local storage records
  const [records, setRecords] = useState<WarrantyRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return SAMPLE_RECORDS;
  });

  // Active certificate being viewed
  const [activeCertificate, setActiveCertificate] = useState<WarrantyRecord | null>(null);

  // Full-screen Modal Image Preview state
  const [previewModalImage, setPreviewModalImage] = useState<{
    url: string;
    title: string;
    hasStamp: boolean;
  } | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    state: "Telangana",
    city: "",
    pincode: "",
    address: "",
    selectedProductSlug: products[0]?.slug || "jazz",
    serialNumber: "",
    invoiceNumber: "",
    purchaseDate: new Date().toISOString().split("T")[0],
    dealerName: "",
    dealerCity: "",
    quantity: 1,
    invoiceImage: "",
    invoiceFileName: "",
    invoiceFileSize: "",
    hasDealerStamp: true,
    acceptedTerms: true,
  });

  // Lookup state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<WarrantyRecord[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Claim Form State
  const [claimData, setClaimData] = useState({
    regIdOrSerial: "",
    customerName: "",
    phone: "",
    city: "",
    issueType: "Motor not rotating / humming sound",
    description: "",
    troubleshootingDone: false,
  });
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  // Auto-save records to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.error(e);
    }
  }, [records]);

  // Handle URL model pre-selection & certificate ID lookup
  useEffect(() => {
    const prefillModel = searchParams.get("model");
    if (prefillModel) {
      const matched = products.find(
        (p) => p.slug.toLowerCase() === prefillModel.toLowerCase() || p.id === prefillModel
      );
      if (matched) {
        setFormData((prev) => ({ ...prev, selectedProductSlug: matched.slug }));
      }
    }

    const regId = searchParams.get("id");
    if (regId) {
      const found = records.find((r) => r.id.toLowerCase() === regId.toLowerCase());
      if (found) {
        setActiveCertificate(found);
        setActiveTab("certificate");
      }
    }
  }, [searchParams, products, records]);

  // Sync tab with URL
  const handleTabChange = (newTab: "register" | "lookup" | "certificate" | "claim" | "policy") => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  // Generate Unique Warranty ID
  const generateWarrantyId = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const year = new Date().getFullYear();
    return `LIM-WR-${year}-${randomNum}`;
  };

  // File upload handler for Bill with Dealer Stamp
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit. Please upload a smaller image or compressed PDF.");
      return;
    }

    const sizeFormatted = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${Math.round(file.size / 1024)} KB`;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setFormData((prev) => ({
        ...prev,
        invoiceImage: result,
        invoiceFileName: file.name,
        invoiceFileSize: sizeFormatted,
        hasDealerStamp: true,
      }));
    };
    reader.readAsDataURL(file);
  };

  // Remove uploaded file
  const handleRemoveUploadedBill = () => {
    setFormData((prev) => ({
      ...prev,
      invoiceImage: "",
      invoiceFileName: "",
      invoiceFileSize: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Quick fill sample data helper with Dealer Stamped Bill
  const handleFillDemoData = () => {
    const randomSerial = `SN-LIM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomInv = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
    setFormData({
      customerName: "Mohammed Salman",
      phone: "9876543210",
      email: "salman.limra@example.com",
      state: "Telangana",
      city: "Hyderabad",
      pincode: "500008",
      address: "Shop #14, Mehdipatnam Main Road, Hyderabad",
      selectedProductSlug: "jazz",
      serialNumber: randomSerial,
      invoiceNumber: randomInv,
      purchaseDate: new Date().toISOString().split("T")[0],
      dealerName: "Sri Lakshmi Electricals & Hardware",
      dealerCity: "Hyderabad",
      quantity: 1,
      invoiceImage: SAMPLE_STAMPED_BILL_SVG,
      invoiceFileName: "Invoice_SriLakshmi_Dealer_Stamped.png",
      invoiceFileSize: "248 KB",
      hasDealerStamp: true,
      acceptedTerms: true,
    });
  };

  // Handle Warranty Registration Form Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const matchedProduct = products.find((p) => p.slug === formData.selectedProductSlug);
    const productName = matchedProduct ? matchedProduct.name : "LE LIMRA Ceiling Fan";
    const modelCode = matchedProduct?.model || "1200MM-STD";

    const purchaseD = new Date(formData.purchaseDate || Date.now());
    const expiryD = new Date(purchaseD);
    expiryD.setFullYear(expiryD.getFullYear() + 2); // 2 Year Warranty

    const newRecord: WarrantyRecord = {
      id: generateWarrantyId(),
      customerName: formData.customerName,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      address: formData.address,
      productName: productName,
      modelCode: modelCode,
      serialNumber: formData.serialNumber.trim() || `SN-LIM-${Date.now().toString().slice(-6)}`,
      invoiceNumber: formData.invoiceNumber.trim() || "CASH-MEMO",
      purchaseDate: formData.purchaseDate,
      dealerName: formData.dealerName.trim() || "Authorized LE LIMRA Dealer",
      dealerCity: formData.dealerCity.trim() || formData.city,
      quantity: Number(formData.quantity) || 1,
      registeredAt: new Date().toISOString(),
      expiryDate: expiryD.toISOString().split("T")[0],
      warrantyPeriodYears: 2,
      status: "ACTIVE",
      invoiceImage: formData.invoiceImage || undefined,
      invoiceFileName: formData.invoiceFileName || undefined,
      invoiceFileSize: formData.invoiceFileSize || undefined,
      hasDealerStamp: formData.hasDealerStamp,
    };

    const updated = [newRecord, ...records];
    setRecords(updated);
    setActiveCertificate(newRecord);
    setActiveTab("certificate");
    setSearchParams({ tab: "certificate", id: newRecord.id });
  };

  // Search / Lookup handler
  const handleSearchLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toLowerCase();
    const results = records.filter(
      (r) =>
        r.id.toLowerCase().includes(query) ||
        r.phone.toLowerCase().includes(query) ||
        r.serialNumber.toLowerCase().includes(query) ||
        r.invoiceNumber.toLowerCase().includes(query) ||
        r.customerName.toLowerCase().includes(query)
    );

    setSearchResult(results);
    setHasSearched(true);
  };

  // Calculate days remaining
  const calculateDaysRemaining = (expiryDateStr: string) => {
    const expiry = new Date(expiryDateStr);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Generate WhatsApp confirmation link for active certificate
  const generateCertificateWhatsAppUrl = (record: WarrantyRecord) => {
    const daysLeft = calculateDaysRemaining(record.expiryDate);
    const stampInfo = record.hasDealerStamp ? "Yes (Dealer Stamped Bill Uploaded)" : "Pending Verification";
    const msg = `*LE LIMRA OFFICIAL WARRANTY REGISTRATION CONFIRMATION*\n━━━━━━━━━━━━━━━━━━━━━\n*Warranty ID:* ${record.id}\n*Customer:* ${record.customerName}\n*Mobile:* ${record.phone}\n*Product:* ${record.productName} (${record.modelCode})\n*Serial No:* ${record.serialNumber}\n*Invoice No:* ${record.invoiceNumber}\n*Dealer:* ${record.dealerName}\n*Dealer Stamp:* ${stampInfo}\n*Purchase Date:* ${record.purchaseDate}\n*Warranty Expiry:* ${record.expiryDate} (${daysLeft > 0 ? `${daysLeft} days active` : "Expired"})\n*Coverage:* 2 Years Heavy-Duty Motor Guarantee\n*Factory Helpline:* +91 8919854467\n━━━━━━━━━━━━━━━━━━━━━\nPlease verify and log this warranty into LIMRA INDUSTRIES centralized service system.`;
    return `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msg)}`;
  };

  // Handle Print Certificate
  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <>
      <SEOHead
        title="Digital Warranty Registration & Certificate Portal | LE LIMRA Fans"
        description="Register your 2-Year official manufacturer warranty for LE LIMRA ceiling, table, and pedestal fans online. Upload your dealer stamped invoice, generate digital certificates, and track service claims."
      />

      {/* Full Screen Image / Stamped Invoice Modal Preview */}
      {previewModalImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-blue-400" />
                <div>
                  <h4 className="text-sm font-bold truncate max-w-sm">{previewModalImage.title}</h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    <span>Official Dealer Stamped Bill</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setPreviewModalImage(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-auto max-h-[calc(90vh-130px)] flex items-center justify-center bg-slate-100">
              {previewModalImage.url.startsWith("data:image") || previewModalImage.url.startsWith("http") || previewModalImage.url.startsWith("/") ? (
                <img
                  src={previewModalImage.url}
                  alt="Dealer Stamped Bill"
                  className="max-w-full max-h-[70vh] object-contain rounded-lg border border-slate-300 shadow-md bg-white"
                />
              ) : (
                <div className="p-12 text-center text-slate-600 bg-white rounded-xl border border-slate-300">
                  <FileText className="w-16 h-16 text-blue-600 mx-auto mb-3" />
                  <p className="font-bold text-sm">PDF Document Attached</p>
                  <p className="text-xs text-slate-500 mt-1">{previewModalImage.title}</p>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Dealer Stamp & Signature Verified
              </span>
              <button
                onClick={() => setPreviewModalImage(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-slate-900 text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs
            items={[
              { label: t("navHome"), href: "/" },
              { label: "Warranty Portal", href: "/warranty" },
            ]}
          />

          {/* Hero Header */}
          <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Official 2-Year Motor Protection
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight font-['Cabinet_Grotesk',sans-serif]">
                Digital Warranty Registration Portal
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
                Register your purchase in under 60 seconds. Upload your dealer-stamped bill to activate your genuine 2-Year Motor & Double Ball Bearing Guarantee with instant downloadable certificate & WhatsApp verification.
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-sm">
                <Award className="w-6 h-6 text-amber-400" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">Warranty Coverage</div>
                  <div className="text-sm font-black text-white">2 Years Replacement</div>
                </div>
              </div>

              <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-sm">
                <BadgeCheck className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">Stamp Verification</div>
                  <div className="text-sm font-black text-white">Dealer Bill Stamped</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto gap-2 mt-8 pt-4 border-t border-slate-800 scrollbar-none">
            <button
              onClick={() => handleTabChange("register")}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "register"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>1. Register New Warranty</span>
            </button>

            <button
              onClick={() => handleTabChange("lookup")}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "lookup"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Search className="w-4 h-4" />
              <span>2. Check Status / Lookup</span>
            </button>

            {activeCertificate && (
              <button
                onClick={() => handleTabChange("certificate")}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === "certificate"
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                    : "bg-slate-800/80 text-emerald-400 hover:bg-slate-800"
                }`}
              >
                <FileCheck className="w-4 h-4" />
                <span>3. Digital Certificate ({activeCertificate.id.slice(-5)})</span>
              </button>
            )}

            <button
              onClick={() => handleTabChange("claim")}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "claim"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <AlertCircle className="w-4 h-4" />
              <span>4. Service & Claims</span>
            </button>

            <button
              onClick={() => handleTabChange("policy")}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "policy"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>5. Warranty Terms & FAQ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Views */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ========================================================
            TAB 1: WARRANTY REGISTRATION FORM
            ======================================================== */}
        {activeTab === "register" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Registration Form */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
                    Fan Warranty Registration
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Fill in your customer & product details and attach your dealer-stamped invoice.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleFillDemoData}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0b2f5c] text-xs font-bold transition-colors flex items-center gap-1 border border-blue-200 shadow-2xs"
                  title="Fill form with sample details including stamped invoice for quick testing"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Fill Demo Data</span>
                </button>
              </div>

              <form onSubmit={handleRegisterSubmit} className="mt-6 space-y-6">
                {/* Section A: Customer Details */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#0b2f5c] mb-3 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>1. Customer & Location Details</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Customer Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        placeholder="e.g. Mohammed Salman / Ramesh Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        WhatsApp / Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 9876543210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. customer@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        City / Town <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Hyderabad, Warangal, Nizamabad"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50 font-medium"
                      >
                        <option value="Telangana">Telangana</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Other State">Other State (Pan India)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        placeholder="e.g. 500008"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Installation / Postal Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="House / Shop / Flat No, Street, Landmark"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Section B: Product & Invoice Details */}
                <div className="pt-5 border-t border-slate-100">
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#0b2f5c] mb-3 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5" />
                    <span>2. Product & Purchase Invoice Information</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Fan Model Purchased <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.selectedProductSlug}
                        onChange={(e) =>
                          setFormData({ ...formData, selectedProductSlug: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50 font-bold"
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.slug}>
                            {p.name} {p.model ? `(${p.model})` : ""} — {p.specifications.size || "1200mm"}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Purchase Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.purchaseDate}
                        onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Serial Number / Barcode (Printed on Box / Motor)
                      </label>
                      <input
                        type="text"
                        value={formData.serialNumber}
                        onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                        placeholder="e.g. SN-LIM-2026-8910"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Invoice / Cash Memo Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.invoiceNumber}
                        onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                        placeholder="e.g. INV-2026-4401"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Dealer / Retail Shop Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.dealerName}
                        onChange={(e) => setFormData({ ...formData, dealerName: e.target.value })}
                        placeholder="e.g. Sri Lakshmi Electricals & Hardware"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Quantity of Units
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={formData.quantity}
                        onChange={(e) =>
                          setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Section C: Upload Bill with Dealer Stamp */}
                <div className="pt-5 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#0b2f5c] flex items-center gap-1.5">
                      <BadgeCheck className="w-4 h-4 text-emerald-600" />
                      <span>3. Upload Bill / Invoice with Dealer Stamp</span>
                    </h3>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ★ Stamped Bill Verification
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mb-3">
                    Upload a clear photo or scan of your purchase invoice or cash memo featuring the <strong>official retail dealer rubber stamp and signature</strong>.
                  </p>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*,application/pdf"
                    className="hidden"
                    id="dealer-bill-upload"
                  />

                  {formData.invoiceImage ? (
                    /* Attached Bill Preview Card */
                    <div className="p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all">
                      <div className="flex items-center gap-3">
                        <div
                          onClick={() =>
                            setPreviewModalImage({
                              url: formData.invoiceImage,
                              title: formData.invoiceFileName || "Uploaded Dealer Stamped Bill",
                              hasStamp: formData.hasDealerStamp,
                            })
                          }
                          className="relative w-16 h-16 rounded-lg bg-white border border-emerald-300 overflow-hidden shrink-0 cursor-pointer group shadow-2xs"
                          title="Click to zoom bill"
                        >
                          <img
                            src={formData.invoiceImage}
                            alt="Bill preview"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                            <Maximize2 className="w-4 h-4" />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-900 truncate max-w-[200px] sm:max-w-[280px]">
                              {formData.invoiceFileName || "Dealer_Stamped_Bill.png"}
                            </span>
                            <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded">
                              {formData.invoiceFileSize || "Attached"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold mt-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Dealer Stamp &amp; Signature Attached</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={() =>
                            setPreviewModalImage({
                              url: formData.invoiceImage,
                              title: formData.invoiceFileName || "Uploaded Dealer Stamped Bill",
                              hasStamp: formData.hasDealerStamp,
                            })
                          }
                          className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-white border border-emerald-300 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Full Bill</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                        >
                          Change
                        </button>

                        <button
                          type="button"
                          onClick={handleRemoveUploadedBill}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all"
                          title="Remove attached bill"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Upload Box Zone */
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-blue-300 hover:border-[#0b2f5c] rounded-2xl p-6 text-center bg-blue-50/30 hover:bg-blue-50/60 transition-all cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-[#0b2f5c] mx-auto flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
                        <Upload className="w-6 h-6" />
                      </div>

                      <div className="text-sm font-bold text-slate-800">
                        Click or drag &amp; drop your <span className="text-[#0b2f5c]">Dealer Stamped Bill / Cash Memo</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Supports JPG, PNG, WEBP, or PDF (Max 10 MB). Ensure the retail dealer seal/stamp is visible.
                      </p>

                      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                          className="px-4 py-2 rounded-xl bg-[#0b2f5c] hover:bg-[#134074] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>Browse / Take Photo</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFillDemoData();
                          }}
                          className="px-3 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all flex items-center gap-1"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Attach Sample Stamped Invoice</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Dealer Stamp Confirmation Checkbox */}
                  <div className="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.hasDealerStamp}
                        onChange={(e) => setFormData({ ...formData, hasDealerStamp: e.target.checked })}
                        className="mt-0.5 w-4 h-4 text-[#0b2f5c] rounded border-slate-300 focus:ring-[#0b2f5c]"
                      />
                      <span className="text-xs text-slate-700 leading-relaxed font-medium">
                        I confirm that the purchase invoice contains the <strong>official retail store / dealer rubber stamp &amp; signature</strong>. (Provides instant 1-click warranty verification &amp; priority replacement).
                      </span>
                    </label>
                  </div>
                </div>

                {/* Terms & Consent */}
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.acceptedTerms}
                      onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                      className="mt-0.5 w-4 h-4 text-[#0b2f5c] rounded border-slate-300 focus:ring-[#0b2f5c]"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      I hereby declare that the provided invoice details and serial numbers are authentic and agree to the{" "}
                      <button
                        type="button"
                        onClick={() => handleTabChange("policy")}
                        className="text-[#0b2f5c] font-bold underline"
                      >
                        LE LIMRA 2-Year Motor Warranty Policy &amp; Conditions
                      </button>
                      .
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!formData.acceptedTerms}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#0b2f5c] hover:bg-[#134074] disabled:bg-slate-300 text-white font-black text-sm tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                  >
                    <ShieldCheck className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>Generate Official 2-Year Digital Warranty Certificate</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Col: Benefits & Instructions */}
            <div className="lg:col-span-4 space-y-6">
              {/* Coverage Highlights Card */}
              <div className="bg-gradient-to-br from-[#07192f] to-[#0b2f5c] text-white rounded-2xl p-6 border border-blue-900 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-blue-600/40 border border-blue-400/30 flex items-center justify-center text-amber-300 mb-4">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-black font-['Cabinet_Grotesk',sans-serif]">
                  What Does Your Warranty Cover?
                </h3>
                <ul className="mt-4 space-y-3 text-xs text-slate-200">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Heavy-Duty Motor Winding:</strong> Free repair or motor replacement for burnout under standard voltage.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Double Ball Bearings:</strong> Free bearing replacement for friction or abnormal mechanical noise.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Dealer Stamped Bill Protection:</strong> Instant replacement dispatch at all partner stockists.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Full 2-Year Term:</strong> Instant validity from the date of your purchase invoice.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Dealer Stamp Verification Tip Box */}
              <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 text-amber-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-800">
                  <BadgeCheck className="w-4 h-4 text-amber-600" />
                  <span>Why Dealer Stamp is Recommended</span>
                </div>
                <p className="text-xs text-amber-800/90 leading-relaxed">
                  A purchase bill bearing the retailer's physical rubber seal and signature prevents invoice tampering and enables our centralized service team to approve replacement requests without physical store verification.
                </p>
              </div>

              {/* Support & Helpline Box */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Factory Service Helpline</span>
                </h4>
                <p className="text-xs text-slate-600">
                  Need assistance with serial numbers, warranty lookup, or institutional registrations?
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      "Hello LE LIMRA Service Team, I need help registering my ceiling fan warranty."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp (+91 8919854467)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: WARRANTY STATUS LOOKUP
            ======================================================== */}
        {activeTab === "lookup" && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="text-center max-w-xl mx-auto mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0b2f5c] mx-auto flex items-center justify-center mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
                  Track &amp; Verify Warranty Status
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Enter your Warranty ID, Mobile Number, or Fan Serial Number to verify coverage validity.
                </p>
              </div>

              <form onSubmit={handleSearchLookup} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-grow">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter Warranty ID (e.g. LIM-WR-2026-58291) or Phone (9876543210)..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#0b2f5c] hover:bg-[#134074] text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Check Status</span>
                </button>
              </form>

              {/* Sample Quick Searches */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold">Quick sample lookups:</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("LIM-WR-2026-58291");
                  }}
                  className="text-blue-600 underline font-medium hover:text-blue-800"
                >
                  LIM-WR-2026-58291
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("9876543210");
                  }}
                  className="text-blue-600 underline font-medium hover:text-blue-800"
                >
                  9876543210
                </button>
              </div>

              {/* Search Results Display */}
              {hasSearched && (
                <div className="mt-8 pt-6 border-t border-slate-200">
                  {searchResult && searchResult.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-800">
                          Found {searchResult.length} Registered Fan Warranty Record(s):
                        </h3>
                      </div>

                      {searchResult.map((rec) => {
                        const daysLeft = calculateDaysRemaining(rec.expiryDate);
                        const isExpired = daysLeft <= 0;

                        return (
                          <div
                            key={rec.id}
                            className="p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300 transition-all shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                          >
                            <div className="space-y-1.5 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-black text-slate-900 text-sm">{rec.productName}</span>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                    isExpired
                                      ? "bg-red-100 text-red-700 border border-red-200"
                                      : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                  }`}
                                >
                                  {isExpired ? "EXPIRED" : `ACTIVE (${daysLeft} Days Left)`}
                                </span>

                                {rec.hasDealerStamp && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                    <BadgeCheck className="w-3 h-3 text-blue-600" />
                                    <span>Dealer Stamp Verified</span>
                                  </span>
                                )}
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs text-slate-600">
                                <div>
                                  <span className="text-slate-400">Warranty ID:</span>{" "}
                                  <strong className="text-slate-800">{rec.id}</strong>
                                </div>
                                <div>
                                  <span className="text-slate-400">Customer:</span>{" "}
                                  <span className="font-semibold text-slate-800">{rec.customerName}</span>
                                </div>
                                <div>
                                  <span className="text-slate-400">Serial No:</span>{" "}
                                  <span className="font-mono text-slate-800">{rec.serialNumber}</span>
                                </div>
                                <div>
                                  <span className="text-slate-400">Purchase Date:</span> {rec.purchaseDate}
                                </div>
                                <div>
                                  <span className="text-slate-400">Valid Till:</span>{" "}
                                  <strong className="text-slate-900">{rec.expiryDate}</strong>
                                </div>
                                <div>
                                  <span className="text-slate-400">Dealer:</span> {rec.dealerName}
                                </div>
                              </div>
                            </div>

                            <div className="flex sm:flex-col items-center gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  setActiveCertificate(rec);
                                  setActiveTab("certificate");
                                  setSearchParams({ tab: "certificate", id: rec.id });
                                }}
                                className="w-full px-4 py-2 rounded-lg bg-[#0b2f5c] hover:bg-[#134074] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                              >
                                <FileCheck className="w-3.5 h-3.5" />
                                <span>View Certificate</span>
                              </button>

                              {rec.invoiceImage && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPreviewModalImage({
                                      url: rec.invoiceImage!,
                                      title: `Dealer Stamped Bill - ${rec.id}`,
                                      hasStamp: !!rec.hasDealerStamp,
                                    })
                                  }
                                  className="w-full px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition-colors flex items-center justify-center gap-1"
                                >
                                  <Eye className="w-3 h-3 text-emerald-600" />
                                  <span>View Stamped Bill</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                      <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <div className="font-bold text-sm text-slate-700">No warranty record found</div>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                        We could not find an active registration matching '{searchQuery}'. Check for typos or register your fan now.
                      </p>
                      <button
                        type="button"
                        onClick={() => handleTabChange("register")}
                        className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow transition-all inline-flex items-center gap-1.5"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Register This Fan Now</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: DIGITAL CERTIFICATE VIEW
            ======================================================== */}
        {activeTab === "certificate" && (
          <div className="max-w-4xl mx-auto">
            {activeCertificate ? (
              <div className="space-y-6">
                {/* Certificate Action Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm print:hidden">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs sm:text-sm font-bold text-slate-800">
                      Official Digital Certificate ID:{" "}
                      <strong className="text-[#0b2f5c]">{activeCertificate.id}</strong>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handlePrintCertificate}
                      className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print / Save PDF</span>
                    </button>

                    <a
                      href={generateCertificateWhatsAppUrl(activeCertificate)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Send to WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* AUTHENTIC OFFICIAL CERTIFICATE CARD */}
                <div
                  id="printable-warranty-certificate"
                  className="bg-white rounded-2xl border-4 border-[#0b2f5c] shadow-2xl p-6 sm:p-10 relative overflow-hidden print:p-8 print:border-2"
                >
                  {/* Decorative Background Guilloche / Security Pattern watermark */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center select-none font-black text-9xl text-slate-900 rotate-[-25deg]">
                    LE LIMRA
                  </div>

                  {/* Top Certificate Header */}
                  <div className="border-b-2 border-slate-200 pb-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl sm:text-3xl font-black text-[#0b2f5c] tracking-tight font-['Cabinet_Grotesk',sans-serif]">
                            LE LIMRA
                          </span>
                          <span className="text-xs font-bold bg-[#0b2f5c] text-white px-2 py-0.5 rounded">
                            FANS
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">
                          LIMRA INDUSTRIES • ISO QUALITY CERTIFIED APPLIANCES
                        </p>
                      </div>

                      {/* Official Seal Badge */}
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-full border-2 border-amber-500 bg-amber-50 flex flex-col items-center justify-center text-center p-1 shadow-sm">
                          <ShieldCheck className="w-5 h-5 text-amber-600" />
                          <span className="text-[8px] font-black uppercase text-amber-900 leading-tight">
                            2 YEARS MOTOR
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">
                            Registration ID
                          </span>
                          <span className="text-sm font-black text-slate-900 font-mono">
                            {activeCertificate.id}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 text-center">
                      <h2 className="text-xl sm:text-3xl font-black uppercase tracking-wider text-[#07192f] font-['Cabinet_Grotesk',sans-serif]">
                        Official Digital Warranty Certificate
                      </h2>
                      <p className="text-xs text-slate-600 mt-1 max-w-xl mx-auto">
                        This document certifies that the LE LIMRA product described below is officially registered with LIMRA INDUSTRIES and protected under our 2-Year Motor Manufacturer Warranty.
                      </p>
                    </div>
                  </div>

                  {/* Certificate Specs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/80 rounded-xl p-6 border border-slate-200">
                    {/* Customer Info */}
                    <div className="space-y-2.5 text-xs">
                      <div className="text-[10px] font-black uppercase tracking-wider text-[#0b2f5c] pb-1 border-b border-slate-200">
                        Registered Owner Information
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Customer Name:</span>
                        <span className="font-bold text-slate-900">{activeCertificate.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Contact Number:</span>
                        <span className="font-mono font-bold text-slate-900">{activeCertificate.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Location:</span>
                        <span className="font-semibold text-slate-800">
                          {activeCertificate.city}, {activeCertificate.state}
                        </span>
                      </div>
                      {activeCertificate.address && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Address:</span>
                          <span className="font-normal text-slate-700 max-w-[200px] text-right truncate">
                            {activeCertificate.address}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product & Warranty Info */}
                    <div className="space-y-2.5 text-xs">
                      <div className="text-[10px] font-black uppercase tracking-wider text-[#0b2f5c] pb-1 border-b border-slate-200">
                        Product &amp; Coverage Details
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Product Model:</span>
                        <span className="font-black text-[#0b2f5c]">{activeCertificate.productName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Serial / Batch No:</span>
                        <span className="font-mono font-bold text-slate-900">{activeCertificate.serialNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Invoice / Memo No:</span>
                        <span className="font-semibold text-slate-800">{activeCertificate.invoiceNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Purchase Date:</span>
                        <span className="font-medium text-slate-800">{activeCertificate.purchaseDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Dealer Name:</span>
                        <span className="font-medium text-slate-800">{activeCertificate.dealerName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Attached Dealer Stamped Bill Section inside Certificate */}
                  <div className="mt-6 p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">
                          <BadgeCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                              Dealer Stamped Purchase Invoice Attachment
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              ✓ Stamped &amp; Verified
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Official dealer rubber seal and purchase memo logged under Record #{activeCertificate.id}.
                          </p>
                        </div>
                      </div>

                      {activeCertificate.invoiceImage && (
                        <button
                          type="button"
                          onClick={() =>
                            setPreviewModalImage({
                              url: activeCertificate.invoiceImage!,
                              title: `Attached Dealer Stamped Invoice - ${activeCertificate.id}`,
                              hasStamp: !!activeCertificate.hasDealerStamp,
                            })
                          }
                          className="px-3.5 py-1.5 rounded-lg bg-[#0b2f5c] hover:bg-[#134074] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all print:hidden"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Stamped Bill</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Validity & Terms Bar */}
                  <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-900 to-[#07192f] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-blue-300 uppercase font-bold tracking-wider block">
                        Warranty Validity Period
                      </span>
                      <div className="text-base sm:text-lg font-black mt-0.5">
                        {activeCertificate.purchaseDate} &nbsp;➔&nbsp; {activeCertificate.expiryDate}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-300 block">Coverage Status</span>
                        <span className="text-xs font-black text-emerald-400 uppercase tracking-wide">
                          ✓ 2-YEAR ACTIVE COVERAGE
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Seal & Verification Footer */}
                  <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg border border-slate-200">
                        <QrCode className="w-8 h-8 text-slate-800" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">Scan / Verify Online</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          limraindustries.com/warranty?id={activeCertificate.id}
                        </div>
                      </div>
                    </div>

                    <div className="text-center sm:text-right">
                      <div className="font-['Caveat',cursive,sans-serif] text-lg font-bold text-[#0b2f5c] tracking-wider">
                        Authorized Quality Signatory
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        LIMRA INDUSTRIES QUALITY CELL • HYDERABAD
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back / Action Link */}
                <div className="text-center print:hidden">
                  <button
                    onClick={() => handleTabChange("register")}
                    className="text-xs text-blue-600 hover:text-blue-800 font-bold inline-flex items-center gap-1"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Register another fan warranty</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <FileCheck className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No Active Certificate Selected</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Please register a new fan or lookup an existing warranty ID to view and download your digital certificate.
                </p>
                <button
                  onClick={() => handleTabChange("register")}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow"
                >
                  Register Warranty Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 4: SERVICE CLAIMS
            ======================================================== */}
        {activeTab === "claim" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  Direct Factory Replacement
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Cabinet_Grotesk',sans-serif] mt-2">
                  Raise a Warranty Service Claim
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Experiencing motor or bearing issues? Submit your claim for expedited technical replacement.
                </p>
              </div>

              {claimSubmitted ? (
                <div className="text-center py-8 bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h3 className="text-lg font-black text-emerald-900">Service Claim Submitted Successfully</h3>
                  <p className="text-xs text-emerald-800 mt-1 max-w-md mx-auto">
                    Your claim for <strong>{claimData.regIdOrSerial}</strong> has been received by our Hyderabad Service Cell. Our technical support team will contact you within 24 business hours.
                  </p>
                  <div className="mt-6 flex justify-center gap-3">
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp.replace(
                        /[^0-9]/g,
                        ""
                      )}?text=${encodeURIComponent(
                        `*URGENT SERVICE CLAIM*\nWarranty / Serial: ${claimData.regIdOrSerial}\nCustomer: ${claimData.customerName}\nPhone: ${claimData.phone}\nIssue: ${claimData.issueType}\nDescription: ${claimData.description}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow inline-flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat with Technical Support on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setClaimSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Warranty ID or Fan Serial Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={claimData.regIdOrSerial}
                      onChange={(e) => setClaimData({ ...claimData, regIdOrSerial: e.target.value })}
                      placeholder="e.g. LIM-WR-2026-58291 or SN-LIM-2026-XXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Customer / Dealer Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={claimData.customerName}
                        onChange={(e) => setClaimData({ ...claimData, customerName: e.target.value })}
                        placeholder="e.g. Ramesh Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Contact Phone / WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={claimData.phone}
                        onChange={(e) => setClaimData({ ...claimData, phone: e.target.value })}
                        placeholder="e.g. 9876543210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Issue Encountered <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={claimData.issueType}
                      onChange={(e) => setClaimData({ ...claimData, issueType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50 font-medium"
                    >
                      <option value="Motor not rotating / humming sound">Motor not rotating / humming sound</option>
                      <option value="Abnormal grinding / bearing noise">Abnormal grinding / bearing noise</option>
                      <option value="Low speed even on regulator step 5">Low speed even on regulator step 5</option>
                      <option value="Capacitor failure / slow startup">Capacitor failure / slow startup</option>
                      <option value="Wobbling / blade imbalance">Wobbling / blade imbalance</option>
                      <option value="Other technical issue">Other technical issue</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Brief Description of Issue &amp; Installation Details
                    </label>
                    <textarea
                      rows={3}
                      value={claimData.description}
                      onChange={(e) => setClaimData({ ...claimData, description: e.target.value })}
                      placeholder="Mention the fan model, room location, and when the issue started..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>Submit Service Claim</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: WARRANTY POLICY & FAQS
            ======================================================== */}
        {activeTab === "policy" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Cabinet_Grotesk',sans-serif] mb-4">
                LE LIMRA 2-Year Official Manufacturer Warranty Terms
              </h2>

              <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div>
                  <h3 className="font-black text-slate-900 text-base mb-2">1. Scope of Coverage</h3>
                  <p>
                    LIMRA INDUSTRIES warrants to the original retail buyer that all designated LE LIMRA Ceiling, Table, and Pedestal Fans are free from manufacturing defects in motor winding and mechanical components for a period of <strong>two (2) years</strong> from the date of purchase.
                  </p>
                </div>

                <div>
                  <h3 className="font-black text-slate-900 text-base mb-2">2. What Is Covered</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                    <li>
                      <strong>Heavy-Duty Motor Stator &amp; Rotor Winding:</strong> Defective coils, winding burnout under normal rated voltage (220V - 240V AC, 50Hz).
                    </li>
                    <li>
                      <strong>ZZ Double Ball Bearings:</strong> Seizure, friction noise, or mechanical manufacturing defects.
                    </li>
                    <li>
                      <strong>Die-Cast Motor Housing:</strong> Structural defects present at the time of unboxing.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-black text-slate-900 text-base mb-2">3. Dealer Stamped Bill Requirement</h3>
                  <p>
                    For seamless service claims and direct over-the-counter motor replacements at authorized retail stockists, the customer must present either their <strong>Digital Warranty Certificate</strong> or the <strong>original purchase bill stamped and signed by an authorized dealer</strong>.
                  </p>
                </div>

                <div>
                  <h3 className="font-black text-slate-900 text-base mb-2">4. What Is Excluded</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                    <li>Physical damage caused by improper hanging, dropping, or external impact.</li>
                    <li>Damage resulting from water ingress, lightning surges, or ungrounded wiring.</li>
                    <li>Paint scratches or aesthetic wear and tear occurring after installation.</li>
                    <li>Unauthorized repair attempts or tampering with factory motor seals.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-black text-slate-900 text-base mb-2">5. Dealer &amp; Stockist Claim Process</h3>
                  <p>
                    Dealers and Super Stockists can collect defective motors during regular trade dispatch cycles and receive direct factory replacement against the registered warranty certificate or purchase bill.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
