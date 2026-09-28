import React, { useState } from "react";
import {
  useApplications,
  ApplicationRecord,
  ApplicationStatus,
} from "@/context/ApplicationContext";
import { useProducts } from "@/context/ProductContext";
import { siteConfig as defaultSiteConfig, SiteConfig } from "@/data/site";
import {
  ShieldCheck,
  Lock,
  Search,
  Filter,
  Download,
  Plus,
  RefreshCw,
  Phone,
  MessageSquare,
  Mail,
  Building2,
  MapPin,
  Calendar,
  FileText,
  UserCheck,
  XCircle,
  CheckCircle2,
  Clock,
  Layers,
  Store,
  Briefcase,
  Printer,
  Trash2,
  Edit3,
  ExternalLink,
  ChevronRight,
  Sparkles,
  RotateCcw,
  LogOut,
  AlertCircle,
  Package,
  BarChart3,
  Sliders,
  Copy,
  Check,
  Tag,
  Settings,
  Send,
  Globe,
  DollarSign,
  TrendingUp,
  Boxes,
} from "lucide-react";

type AdminTab = "leads" | "products" | "analytics" | "templates" | "settings";

export const AdminPage: React.FC = () => {
  const {
    applications,
    updateApplicationStatus,
    updateApplicationNotes,
    deleteApplication,
    addApplication,
    resetToSampleData,
  } = useApplications();

  const {
    products,
    updateProductPrice,
    updateProduct,
    openEditProductModal,
    openAddProductModal,
  } = useProducts();

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<AdminTab>("leads");

  // Simple Admin Authentication State
  const [currentPin, setCurrentPin] = useState<string>(() => {
    return localStorage.getItem("limra_admin_pin") || "1234";
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("limra_admin_auth") === "true";
  });
  const [pinInput, setPinInput] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  // Change PIN modal state
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [oldPinInput, setOldPinInput] = useState<string>("");
  const [newPinInput, setNewPinInput] = useState<string>("");
  const [confirmPinInput, setConfirmPinInput] = useState<string>("");
  const [pinChangeMessage, setPinChangeMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Filters & Search for Leads
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [stateFilter, setStateFilter] = useState<string>("all");

  // Active Selected Application Modal
  const [selectedApp, setSelectedApp] = useState<ApplicationRecord | null>(null);
  const [editNotesText, setEditNotesText] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form state for adding manual offline application
  const [manualForm, setManualForm] = useState({
    role: "Dealer",
    applicantName: "",
    businessName: "",
    phone: "",
    city: "",
    state: "Telangana",
    gstNumber: "",
    expectedVolume: "100 units",
    interestedProducts: "Ceiling Fans & Table Fans",
    message: "Offline phone inquiry received by office.",
  });

  // Business Settings State
  const [liveSettings, setLiveSettings] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem("limra_live_site_config");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultSiteConfig;
  });
  const [settingsSavedMsg, setSettingsSavedMsg] = useState<boolean>(false);

  // WhatsApp Broadcast Copying State
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validPin = localStorage.getItem("limra_admin_pin") || "1234";
    if (pinInput === validPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem("limra_admin_auth", "true");
      setLoginError("");
    } else {
      setLoginError("Incorrect Admin PIN.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("limra_admin_auth");
  };

  const handleChangePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const activePin = localStorage.getItem("limra_admin_pin") || "1234";

    if (oldPinInput !== activePin) {
      setPinChangeMessage({ type: "error", text: "Current PIN is incorrect." });
      return;
    }

    if (newPinInput.length < 4) {
      setPinChangeMessage({ type: "error", text: "New PIN must be at least 4 characters long." });
      return;
    }

    if (newPinInput !== confirmPinInput) {
      setPinChangeMessage({ type: "error", text: "New PIN and Confirm PIN do not match." });
      return;
    }

    localStorage.setItem("limra_admin_pin", newPinInput);
    setCurrentPin(newPinInput);
    setPinChangeMessage({ type: "success", text: "Security PIN updated successfully!" });
    setOldPinInput("");
    setNewPinInput("");
    setConfirmPinInput("");

    setTimeout(() => {
      setShowPinModal(false);
      setPinChangeMessage(null);
    }, 1500);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("limra_live_site_config", JSON.stringify(liveSettings));
      setSettingsSavedMsg(true);
      setTimeout(() => setSettingsSavedMsg(false), 3000);
    } catch (err) {
      alert("Failed to save settings.");
    }
  };

  // Filter Logic for Applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm) ||
      app.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.gstNumber && app.gstNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || app.role === roleFilter;
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesState = stateFilter === "all" || app.state === stateFilter;

    return matchesSearch && matchesRole && matchesStatus && matchesState;
  });

  const availableStates = Array.from(new Set(applications.map((a) => a.state))).filter(Boolean);

  // Lead Metrics
  const totalCount = applications.length;
  const newCount = applications.filter((a) => a.status === "new").length;
  const underReviewCount = applications.filter((a) => a.status === "under_review").length;
  const contactedCount = applications.filter((a) => a.status === "contacted").length;
  const approvedCount = applications.filter((a) => a.status === "approved").length;

  // Analytics Calculations
  const stateBreakdown = applications.reduce((acc, app) => {
    acc[app.state] = (acc[app.state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const roleBreakdown = applications.reduce((acc, app) => {
    acc[app.role] = (acc[app.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleOpenDetail = (app: ApplicationRecord) => {
    setSelectedApp(app);
    setEditNotesText(app.adminNotes || "");
  };

  const handleSaveNotes = () => {
    if (selectedApp) {
      updateApplicationNotes(selectedApp.id, editNotesText);
      setSelectedApp({ ...selectedApp, adminNotes: editNotesText });
    }
  };

  const handleAddManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.applicantName || !manualForm.businessName || !manualForm.phone) {
      alert("Please fill in Applicant Name, Business Name, and Phone Number.");
      return;
    }

    const created = addApplication({
      type: "dealer",
      role: manualForm.role,
      applicantName: manualForm.applicantName,
      businessName: manualForm.businessName,
      phone: manualForm.phone,
      city: manualForm.city || "Hyderabad",
      state: manualForm.state,
      gstNumber: manualForm.gstNumber || "In-Process",
      expectedVolume: manualForm.expectedVolume,
      interestedProducts: manualForm.interestedProducts,
      message: manualForm.message,
    });

    setShowAddModal(false);
    setManualForm({
      role: "Dealer",
      applicantName: "",
      businessName: "",
      phone: "",
      city: "",
      state: "Telangana",
      gstNumber: "",
      expectedVolume: "100 units",
      interestedProducts: "Ceiling Fans & Table Fans",
      message: "Offline phone inquiry received by office.",
    });
    handleOpenDetail(created);
  };

  const exportToCSV = () => {
    if (applications.length === 0) {
      alert("No applications available to export.");
      return;
    }

    const headers = [
      "Inquiry ID",
      "Date",
      "Status",
      "Role",
      "Applicant Name",
      "Business Name",
      "Phone",
      "WhatsApp",
      "Email",
      "City",
      "District",
      "State",
      "GSTIN",
      "Expected Volume",
      "Interested Products",
      "Notes",
    ];

    const rows = applications.map((app) => [
      `"${app.id}"`,
      `"${new Date(app.submittedAt).toLocaleDateString()}"`,
      `"${app.status.toUpperCase()}"`,
      `"${app.role}"`,
      `"${app.applicantName.replace(/"/g, '""')}"`,
      `"${app.businessName.replace(/"/g, '""')}"`,
      `"${app.phone}"`,
      `"${app.whatsapp || app.phone}"`,
      `"${app.email || ""}"`,
      `"${app.city}"`,
      `"${app.district || ""}"`,
      `"${app.state}"`,
      `"${app.gstNumber || ""}"`,
      `"${app.expectedVolume || ""}"`,
      `"${(app.interestedProducts || "").replace(/"/g, '""')}"`,
      `"${(app.adminNotes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `limra_dealer_applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/90 px-2.5 py-1 rounded-full border border-blue-200">
            <Sparkles className="w-3 h-3 text-blue-600 animate-pulse" />
            New Entry
          </span>
        );
      case "under_review":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 px-2.5 py-1 rounded-full border border-amber-200">
            <Clock className="w-3 h-3 text-amber-700" />
            Under Review
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100/90 px-2.5 py-1 rounded-full border border-purple-200">
            <Phone className="w-3 h-3 text-purple-700" />
            Contacted
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-2.5 py-1 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            Approved Partner
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100/90 px-2.5 py-1 rounded-full border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-700" />
            Declined
          </span>
        );
      default:
        return null;
    }
  };

  // Render Authentication Portal if not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-slate-50">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[#0b2f5c] text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
              Owner Admin Portal
            </h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Access & manage all incoming dealer applications, product prices, and business settings for{" "}
              <strong>{liveSettings.brandName}</strong>.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Security PIN / Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (e.g. 1234)"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0b2f5c] focus:border-[#0b2f5c] text-sm font-semibold outline-none"
                  autoFocus
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
              {loginError ? (
                <p className="text-xs font-semibold text-rose-600 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {loginError}
                </p>
              ) : (
                <p className="text-[11px] text-slate-400 mt-1.5">
                  🔑 Active Admin PIN: <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono font-bold">{currentPin}</code>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#0b2f5c] hover:bg-[#174e8c] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Owner Dashboard</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              LIMRA INDUSTRIES — Internal Executive Portal
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Pre-configured WhatsApp Broadcast Templates
  const broadcastTemplates = [
    {
      id: "catalog_and_price_list",
      title: "📄 Official Product Catalog & Price Matrix",
      desc: "Send trade price list, master carton packing specs, and PDF catalog link to new dealer inquiries.",
      text: `Hello {ApplicantName},\n\nThank you for reaching out to *LIMRA INDUSTRIES (LE LIMRA Fans)* regarding dealership for *{FirmName}* in *{City}*.\n\nAttached is our official Trade Price List & Catalog for {Role} partners.\n\n*Key Highlights:*\n• Direct Factory Pricing & Slab Discounts\n• 2-Year Official Motor Warranty\n• Pan-India Transport & Godown Lorry Dispatch\n\nPlease let us know if you would like to schedule a sample order or phone call with our factory team.`,
    },
    {
      id: "dealer_approval_terms",
      title: "✅ Application Approval & Stocking Terms",
      desc: "Formal welcome message for approved dealers and stockists with account registration steps.",
      text: `Dear {ApplicantName} ({FirmName}),\n\nWe are pleased to inform you that your trade application for *{Role}* in *{City}, {State}* has been *APPROVED* by LIMRA INDUSTRIES!\n\n*Your Inquiry Ref ID:* {InquiryID}\n\n*Next Steps for Onboarding:*\n1. Submit GSTIN / Business PAN copy for invoice creation\n2. Select your initial inventory batch (Minimum order: {Volume})\n3. Complete dispatch address verification\n\nOur direct factory helpline is at your service. Welcome to the LE LIMRA distribution family!`,
    },
    {
      id: "freight_and_dispatch",
      title: "🚚 Freight Rates & Lorry Dispatch Guide",
      desc: "Information regarding master carton transport, VRL/Navata logistics, and door delivery.",
      text: `Hello {ApplicantName},\n\nRegarding transport for *{FirmName}* ({City}):\n\n*Master Carton Packaging Specs:*\n• Ceiling Fans: 4 Units per Master Carton (or 2 Units for Premium Decorative Models)\n• Table Fans: 2 Units per Carton\n• Pedestal Fans: 1 Unit Heavy Carton\n\nWe dispatch daily via VRL, Navata, KRL & Local Transport Lorry Services from our Hyderabad factory warehouse. Freight quotes can be generated based on your total carton weight.`,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      {/* Top Banner */}
      <div className="bg-[#0b2f5c] text-white border-b border-slate-800 py-6 px-4 sm:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest bg-blue-500/20 text-blue-200 px-2.5 py-0.5 rounded border border-blue-400/30">
                Executive Owner Control Panel
              </span>
              {newCount > 0 && (
                <span className="text-[11px] font-extrabold text-white bg-rose-500 px-2 py-0.5 rounded-full animate-bounce">
                  {newCount} NEW LEADS!
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-['Cabinet_Grotesk',sans-serif] mt-1">
              LIMRA INDUSTRIES Master Admin
            </h1>
            <p className="text-xs text-blue-100/80 mt-0.5">
              Manage trade applications, product catalog prices, geographic analytics, and company settings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Manual Lead</span>
            </button>

            <button
              onClick={() => {
                setShowPinModal(true);
                setPinChangeMessage(null);
                setOldPinInput("");
                setNewPinInput("");
                setConfirmPinInput("");
              }}
              className="inline-flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-bold text-xs px-3 py-2.5 rounded-xl border border-amber-400/30 transition-all"
              title="Change your Admin Portal Security PIN"
            >
              <Lock className="w-3.5 h-3.5 text-amber-300" />
              <span>Change PIN</span>
            </button>

            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-3 py-2.5 rounded-xl border border-white/20 transition-all"
              title="Download all applications in Excel/CSV"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-semibold text-xs px-3 py-2.5 rounded-xl border border-rose-400/30 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="max-w-7xl mx-auto mt-6 flex items-center gap-2 overflow-x-auto border-t border-slate-700/60 pt-4">
          <button
            onClick={() => setActiveTab("leads")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "leads"
                ? "bg-white text-[#0b2f5c] shadow-sm"
                : "text-blue-100 hover:bg-white/10"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Dealer Applications ({totalCount})</span>
            {newCount > 0 && (
              <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {newCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "products"
                ? "bg-white text-[#0b2f5c] shadow-sm"
                : "text-blue-100 hover:bg-white/10"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Catalog & Prices ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "analytics"
                ? "bg-white text-[#0b2f5c] shadow-sm"
                : "text-blue-100 hover:bg-white/10"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Territory Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab("templates")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "templates"
                ? "bg-white text-[#0b2f5c] shadow-sm"
                : "text-blue-100 hover:bg-white/10"
            }`}
          >
            <Send className="w-4 h-4" />
            <span>WhatsApp Broadcast Studio</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "settings"
                ? "bg-white text-[#0b2f5c] shadow-sm"
                : "text-blue-100 hover:bg-white/10"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Company & Contact Settings</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        {/* TAB 1: DEALER APPLICATIONS */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            {/* KPI Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                  Total Inquiries
                </div>
                <div className="text-2xl font-black text-slate-900 mt-1 font-['Cabinet_Grotesk',sans-serif]">
                  {totalCount}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">All received applications</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-xs bg-gradient-to-br from-blue-50/50 to-white">
                <div className="text-[11px] font-bold uppercase text-blue-800 tracking-wider flex items-center justify-between">
                  <span>New Leads</span>
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className="text-2xl font-black text-blue-900 mt-1 font-['Cabinet_Grotesk',sans-serif]">
                  {newCount}
                </div>
                <p className="text-[10px] text-blue-700 mt-0.5">Awaiting first review</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs bg-gradient-to-br from-amber-50/40 to-white">
                <div className="text-[11px] font-bold uppercase text-amber-800 tracking-wider">
                  Under Review
                </div>
                <div className="text-2xl font-black text-amber-900 mt-1 font-['Cabinet_Grotesk',sans-serif]">
                  {underReviewCount}
                </div>
                <p className="text-[10px] text-amber-700 mt-0.5">Documents checking</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-purple-200 shadow-xs">
                <div className="text-[11px] font-bold uppercase text-purple-800 tracking-wider">
                  Contacted
                </div>
                <div className="text-2xl font-black text-purple-900 mt-1 font-['Cabinet_Grotesk',sans-serif]">
                  {contactedCount}
                </div>
                <p className="text-[10px] text-purple-700 mt-0.5">Rates sent on WhatsApp</p>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-white p-4 rounded-xl border border-emerald-200 shadow-xs bg-gradient-to-br from-emerald-50/40 to-white">
                <div className="text-[11px] font-bold uppercase text-emerald-800 tracking-wider flex items-center justify-between">
                  <span>Approved</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-emerald-900 mt-1 font-['Cabinet_Grotesk',sans-serif]">
                  {approvedCount}
                </div>
                <p className="text-[10px] text-emerald-700 mt-0.5">Active Channel Dealers</p>
              </div>
            </div>

            {/* Filter Controls Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by Applicant Name, Shop Name, Phone, GSTIN, or City..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] focus:border-[#0b2f5c]"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 shrink-0 text-xs">
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-xl font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0b2f5c]"
                  >
                    <option value="all">All Roles</option>
                    <option value="Super Stockist">Super Stockist</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Dealer">Dealer</option>
                    <option value="Wholesaler">Wholesaler</option>
                    <option value="Retailer">Retailer</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-xl font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0b2f5c]"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="under_review">Under Review</option>
                    <option value="contacted">Contacted</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  <select
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-xl font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0b2f5c]"
                  >
                    <option value="all">All States</option>
                    {availableStates.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {(searchTerm || roleFilter !== "all" || statusFilter !== "all" || stateFilter !== "all") && (
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>
                    Showing <strong>{filteredApps.length}</strong> of {totalCount} total records
                  </span>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setRoleFilter("all");
                      setStatusFilter("all");
                      setStateFilter("all");
                    }}
                    className="text-[#0b2f5c] hover:underline font-bold text-xs"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>

            {/* Applications List Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {filteredApps.length === 0 ? (
                <div className="p-12 text-center space-y-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800">No Applications Found</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    No dealer applications matched your current search or filter parameters.
                  </p>
                  <button
                    onClick={resetToSampleData}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b2f5c] bg-blue-50 px-3.5 py-2 rounded-lg border border-blue-200 hover:bg-blue-100"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Load Sample Dealer Data</span>
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-extrabold uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Ref ID / Date</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">Firm / Proprietor</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Phone / GSTIN</th>
                        <th className="py-3 px-4">Volume</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                      {filteredApps.map((app) => (
                        <tr
                          key={app.id}
                          className={`hover:bg-blue-50/40 transition-colors ${
                            app.status === "new" ? "bg-blue-50/20" : ""
                          }`}
                        >
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900 font-mono text-[11px]">
                              {app.id}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {new Date(app.submittedAt).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                              {app.role}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 max-w-[200px]">
                            <div className="font-bold text-slate-900 truncate" title={app.businessName}>
                              {app.businessName}
                            </div>
                            <div className="text-[11px] text-slate-500 truncate">
                              {app.applicantName} {app.designation ? `(${app.designation})` : ""}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-800">{app.city}</div>
                            <div className="text-[10px] text-slate-500">{app.state}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{app.phone}</div>
                            <div className="text-[10px] font-mono text-slate-500 truncate max-w-[130px]">
                              GST: {app.gstNumber || "N/A"}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-[#0b2f5c] text-[11px]">
                              {app.expectedVolume || "N/A"}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={app.status}
                              onChange={(e) =>
                                updateApplicationStatus(app.id, e.target.value as ApplicationStatus)
                              }
                              className="text-[11px] font-bold rounded-lg border border-slate-300 py-1 px-2 bg-white focus:ring-1 focus:ring-[#0b2f5c] outline-none"
                            >
                              <option value="new">🆕 New</option>
                              <option value="under_review">⏳ Under Review</option>
                              <option value="contacted">📞 Contacted</option>
                              <option value="approved">✅ Approved</option>
                              <option value="rejected">❌ Declined</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenDetail(app)}
                                className="bg-[#0b2f5c] hover:bg-[#174e8c] text-white font-bold text-[11px] px-3 py-1.5 rounded-lg shadow-2xs transition-all flex items-center gap-1"
                              >
                                <span>View Full</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>

                              <button
                                onClick={() => {
                                  const clean = app.phone.replace(/[^0-9]/g, "");
                                  const targetPhone = clean.length === 10 ? `91${clean}` : clean;
                                  const text = `Hello ${app.applicantName}, regarding your ${app.role} application [${app.id}] for ${app.businessName} with ${liveSettings.brandName}. We would like to discuss dealership terms with you.`;
                                  window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`, "_blank");
                                }}
                                className="p-1.5 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200"
                                title="Reply on WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => deleteApplication(app.id)}
                                className="p-1.5 rounded-lg text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT CATALOG & PRICE MANAGER */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
                  Product & Trade Pricing Manager
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update wholesale prices, stock availability, and featured models live on the site.
                </p>
              </div>

              <button
                onClick={() => openAddProductModal("ceiling-fan")}
                className="inline-flex items-center gap-2 bg-[#0b2f5c] hover:bg-[#174e8c] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Fan Model</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-extrabold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Model & Name</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Trade Price (₹)</th>
                      <th className="py-3 px-4">MRP (₹)</th>
                      <th className="py-3 px-4">Stock Status</th>
                      <th className="py-3 px-4">Featured</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.images?.[0] || "/images/products/avencer-prime.jpg"}
                              alt={prod.name}
                              className="w-10 h-10 object-cover rounded-lg border border-slate-200 bg-slate-50 shrink-0"
                            />
                            <div>
                              <div className="font-bold text-slate-900 text-sm">{prod.name}</div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                {prod.model || prod.id}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 capitalize">
                          <span className="inline-block px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-semibold text-[10px]">
                            {prod.category.replace("-", " ")}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1 font-bold text-emerald-700 text-sm">
                            <span>₹</span>
                            <input
                              type="number"
                              value={prod.price || ""}
                              onChange={(e) =>
                                updateProductPrice(
                                  prod.id,
                                  Number(e.target.value) || undefined,
                                  prod.mrp
                                )
                              }
                              className="w-20 p-1 border border-slate-300 rounded font-bold text-xs bg-white text-emerald-800 outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1 text-slate-500 text-xs">
                            <span>₹</span>
                            <input
                              type="number"
                              value={prod.mrp || ""}
                              onChange={(e) =>
                                updateProductPrice(
                                  prod.id,
                                  prod.price,
                                  Number(e.target.value) || undefined
                                )
                              }
                              className="w-20 p-1 border border-slate-300 rounded text-xs bg-white text-slate-700 outline-none focus:ring-1 focus:ring-slate-400"
                            />
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <button
                            onClick={() =>
                              updateProduct(prod.id, {
                                available: prod.available === false ? true : false,
                              })
                            }
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                              prod.available !== false
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : "bg-rose-100 text-rose-800 border border-rose-300"
                            }`}
                          >
                            {prod.available !== false ? "In Stock" : "Out of Stock"}
                          </button>
                        </td>

                        <td className="py-3.5 px-4">
                          <button
                            onClick={() =>
                              updateProduct(prod.id, {
                                featured: !prod.featured,
                              })
                            }
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              prod.featured
                                ? "bg-amber-100 text-amber-800 border border-amber-300"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            {prod.featured ? "★ Featured" : "Standard"}
                          </button>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => openEditProductModal(prod)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#0b2f5c] hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Full</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TERRITORY ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* State Geographic Breakdown */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 font-['Cabinet_Grotesk',sans-serif] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#0b2f5c]" />
                    <span>State & Territory Demand</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">{totalCount} total inquiries</span>
                </div>

                <div className="space-y-3">
                  {Object.entries(stateBreakdown).map(([st, count]) => {
                    const percent = Math.round((count / totalCount) * 100);
                    return (
                      <div key={st} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-800">
                          <span>{st}</span>
                          <span>
                            {count} leads ({percent}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#0b2f5c] h-full rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Business Role Tier Breakdown */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 font-['Cabinet_Grotesk',sans-serif] flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#0b2f5c]" />
                    <span>Distribution Channel Tiers</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">Tier Breakdown</span>
                </div>

                <div className="space-y-3">
                  {Object.entries(roleBreakdown).map(([role, count]) => {
                    const percent = Math.round((count / totalCount) * 100);
                    return (
                      <div key={role} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-800">
                          <span>{role}</span>
                          <span>
                            {count} applicants ({percent}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: WHATSAPP BROADCAST STUDIO */}
        {activeTab === "templates" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-xl font-bold text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
                WhatsApp Broadcast & Reply Studio
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Pre-written response templates for dealer catalog sharing, approval letters, and dispatch guidelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {broadcastTemplates.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{tmpl.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{tmpl.desc}</p>

                    <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-700 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                      {tmpl.text}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(tmpl.text);
                      setCopiedTemplateId(tmpl.id);
                      setTimeout(() => setCopiedTemplateId(null), 2000);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all"
                  >
                    {copiedTemplateId === tmpl.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Message Template</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: COMPANY & CONTACT SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
                    Live Company Contact & Address Settings
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Update your official business phone, WhatsApp number, email, and factory address instantly across the app.
                  </p>
                </div>

                {settingsSavedMsg && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 animate-in fade-in-50">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Saved Live!</span>
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={liveSettings.brandName}
                    onChange={(e) => setLiveSettings({ ...liveSettings, brandName: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company Entity Name</label>
                  <input
                    type="text"
                    value={liveSettings.companyName}
                    onChange={(e) => setLiveSettings({ ...liveSettings, companyName: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary Office Phone (Display)</label>
                  <input
                    type="text"
                    value={liveSettings.phone}
                    onChange={(e) => setLiveSettings({ ...liveSettings, phone: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    WhatsApp Number (10 Digits with Country Code e.g. 919876543210)
                  </label>
                  <input
                    type="text"
                    value={liveSettings.whatsapp}
                    onChange={(e) => setLiveSettings({ ...liveSettings, whatsapp: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official Email Address</label>
                  <input
                    type="email"
                    value={liveSettings.email}
                    onChange={(e) => setLiveSettings({ ...liveSettings, email: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">GSTIN Number</label>
                  <input
                    type="text"
                    value={liveSettings.gstNumber || ""}
                    onChange={(e) => setLiveSettings({ ...liveSettings, gstNumber: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-mono font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Full Factory / Warehouse Address</label>
                  <textarea
                    rows={2}
                    value={liveSettings.address}
                    onChange={(e) => setLiveSettings({ ...liveSettings, address: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-semibold"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-100">
                <button
                  type="submit"
                  className="bg-[#0b2f5c] hover:bg-[#174e8c] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save Business Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in-50 duration-200 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="bg-[#0b2f5c] text-white p-5 flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase bg-white/20 text-white px-2 py-0.5 rounded">
                    {selectedApp.role} Application
                  </span>
                  <span className="text-xs font-mono text-blue-200">
                    ID: {selectedApp.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedApp.businessName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-800">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700">Application Status:</span>
                  {getStatusBadge(selectedApp.status)}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-semibold">Change:</span>
                  <select
                    value={selectedApp.status}
                    onChange={(e) => {
                      const newSt = e.target.value as ApplicationStatus;
                      updateApplicationStatus(selectedApp.id, newSt);
                      setSelectedApp({ ...selectedApp, status: newSt });
                    }}
                    className="border border-slate-300 rounded-lg text-xs font-bold py-1.5 px-3 bg-white outline-none"
                  >
                    <option value="new">🆕 New</option>
                    <option value="under_review">⏳ Under Review</option>
                    <option value="contacted">📞 Contacted</option>
                    <option value="approved">✅ Approved</option>
                    <option value="rejected">❌ Declined</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-extrabold uppercase text-slate-500 tracking-wider text-[11px] border-b border-slate-100 pb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#0b2f5c]" />
                  <span>Business & Proprietor Profile</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-slate-50/70 p-4 rounded-xl border border-slate-200/80">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Proprietor / Contact:</span>
                    <strong className="text-slate-900 text-sm">
                      {selectedApp.applicantName}
                    </strong>
                    {selectedApp.designation && (
                      <span className="text-slate-500 block text-[11px]">
                        {selectedApp.designation}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">Business Type:</span>
                    <strong className="text-slate-900">{selectedApp.businessType || "N/A"}</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">Date Submitted:</span>
                    <strong className="text-slate-900">
                      {new Date(selectedApp.submittedAt).toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">GSTIN Number:</span>
                    <strong className="text-slate-900 font-mono">
                      {selectedApp.gstNumber || "Not Registered"}
                    </strong>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">PAN Number:</span>
                    <strong className="text-slate-900 font-mono">
                      {selectedApp.panNumber || "N/A"}
                    </strong>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">Godown / Warehouse:</span>
                    <strong className="text-slate-900">
                      {selectedApp.godownArea ? `${selectedApp.godownArea} sq ft` : "N/A"}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-extrabold uppercase text-slate-500 tracking-wider text-[11px] border-b border-slate-100 pb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0b2f5c]" />
                  <span>Contact & Dispatch Location</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50/70 p-4 rounded-xl border border-slate-200/80">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Phone Number:</span>
                    <strong className="text-slate-900 text-sm">{selectedApp.phone}</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">WhatsApp Number:</span>
                    <strong className="text-slate-900 text-sm">
                      {selectedApp.whatsapp || selectedApp.phone}
                    </strong>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">Email Address:</span>
                    <strong className="text-slate-900">{selectedApp.email || "Not Provided"}</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">City, District & State:</span>
                    <strong className="text-slate-900">
                      {selectedApp.city}
                      {selectedApp.district ? `, ${selectedApp.district}` : ""}, {selectedApp.state}{" "}
                      {selectedApp.pincode ? `- ${selectedApp.pincode}` : ""}
                    </strong>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="text-slate-500 block text-[10px]">Full Address:</span>
                    <strong className="text-slate-900">
                      {selectedApp.address || "N/A"}{" "}
                      {selectedApp.landmark ? `(Landmark: ${selectedApp.landmark})` : ""}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-extrabold uppercase text-slate-500 tracking-wider text-[11px] border-b border-slate-100 pb-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#0b2f5c]" />
                  <span>Commercial & Territory Requirements</span>
                </h4>

                <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Expected Initial Volume:</span>
                      <strong className="text-[#0b2f5c] text-sm">
                        {selectedApp.expectedVolume || "N/A"}
                      </strong>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px]">Transport Preference:</span>
                      <strong className="text-slate-900">
                        {selectedApp.transportPreference || "Standard Lorry Direct"}
                      </strong>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">Product Range Interested:</span>
                    <p className="text-slate-800 font-semibold">{selectedApp.interestedProducts || "All Fan Ranges"}</p>
                  </div>

                  {selectedApp.message && (
                    <div className="pt-2 border-t border-slate-200/60">
                      <span className="text-slate-500 block text-[10px]">Applicant Notes / Remarks:</span>
                      <p className="text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 italic mt-1">
                        "{selectedApp.message}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 bg-blue-50/40 p-4 rounded-xl border border-blue-200">
                <label className="block text-xs font-bold text-[#0b2f5c] flex items-center gap-1.5">
                  <Edit3 className="w-4 h-4" />
                  <span>Internal Owner Notes & Next Steps:</span>
                </label>
                <textarea
                  rows={2}
                  value={editNotesText}
                  onChange={(e) => setEditNotesText(e.target.value)}
                  placeholder="Add private office notes (e.g., 'Met in Hyderabad depot on Tuesday. GST checked. Authorized for Tier-2 rate card.')"
                  className="w-full p-2.5 bg-white border border-blue-200 rounded-lg text-xs font-sans outline-none focus:ring-2 focus:ring-[#0b2f5c]"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNotes}
                    className="bg-[#0b2f5c] hover:bg-[#174e8c] text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-2xs"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const clean = selectedApp.phone.replace(/[^0-9]/g, "");
                    const targetPhone = clean.length === 10 ? `91${clean}` : clean;
                    const text = `Hello ${selectedApp.applicantName}, this is regarding your ${selectedApp.role} application [${selectedApp.id}] for ${selectedApp.businessName} with ${liveSettings.brandName}. We reviewed your details and would like to share our factory trade price matrix.`;
                    window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`, "_blank");
                  }}
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Reply via WhatsApp</span>
                </button>

                <a
                  href={`tel:${selectedApp.phone}`}
                  className="inline-flex items-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Applicant</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs px-3 py-2 rounded-lg border border-slate-300"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>

                <button
                  onClick={() => setSelectedApp(null)}
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD MANUAL APPLICATION MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in-50 duration-200 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden my-8 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
                Log Offline Dealer Lead
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddManualSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Partnership Role</label>
                <select
                  value={manualForm.role}
                  onChange={(e) => setManualForm({ ...manualForm, role: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg font-semibold"
                >
                  <option value="Super Stockist">Super Stockist</option>
                  <option value="Distributor">Distributor</option>
                  <option value="Dealer">Dealer</option>
                  <option value="Wholesaler">Wholesaler</option>
                  <option value="Retailer">Retailer</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Proprietor Name *</label>
                  <input
                    type="text"
                    required
                    value={manualForm.applicantName}
                    onChange={(e) => setManualForm({ ...manualForm, applicantName: e.target.value })}
                    placeholder="e.g. Ramesh Varma"
                    className="w-full p-2.5 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Business/Shop Name *</label>
                  <input
                    type="text"
                    required
                    value={manualForm.businessName}
                    onChange={(e) => setManualForm({ ...manualForm, businessName: e.target.value })}
                    placeholder="e.g. Varma Electricals"
                    className="w-full p-2.5 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={manualForm.phone}
                    onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="w-full p-2.5 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City / Town *</label>
                  <input
                    type="text"
                    required
                    value={manualForm.city}
                    onChange={(e) => setManualForm({ ...manualForm, city: e.target.value })}
                    placeholder="e.g. Warangal"
                    className="w-full p-2.5 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">GSTIN Number (Optional)</label>
                <input
                  type="text"
                  value={manualForm.gstNumber}
                  onChange={(e) => setManualForm({ ...manualForm, gstNumber: e.target.value })}
                  placeholder="36XXXXX..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Expected Monthly Volume</label>
                <input
                  type="text"
                  value={manualForm.expectedVolume}
                  onChange={(e) => setManualForm({ ...manualForm, expectedVolume: e.target.value })}
                  placeholder="50-100 units"
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Office Call Notes</label>
                <textarea
                  rows={2}
                  value={manualForm.message}
                  onChange={(e) => setManualForm({ ...manualForm, message: e.target.value })}
                  placeholder="Walk-in inquiry at Hyderabad office..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0b2f5c] hover:bg-[#174e8c] text-white font-bold rounded-lg"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE SECURITY PIN MODAL */}
      {showPinModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in-50 duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
                    Change Security PIN
                  </h3>
                  <p className="text-[11px] text-slate-500">Update your Admin Portal access password</p>
                </div>
              </div>
              <button
                onClick={() => setShowPinModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-base"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleChangePinSubmit} className="space-y-3 text-xs">
              {pinChangeMessage && (
                <div
                  className={`p-3 rounded-lg flex items-center gap-2 text-xs font-semibold ${
                    pinChangeMessage.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}
                >
                  {pinChangeMessage.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  )}
                  <span>{pinChangeMessage.text}</span>
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">Current PIN *</label>
                <input
                  type="password"
                  required
                  value={oldPinInput}
                  onChange={(e) => setOldPinInput(e.target.value)}
                  placeholder="Enter existing PIN (Default: 1234)"
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">New PIN *</label>
                <input
                  type="password"
                  required
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  placeholder="Enter new 4+ digit PIN"
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Confirm New PIN *</label>
                <input
                  type="password"
                  required
                  value={confirmPinInput}
                  onChange={(e) => setConfirmPinInput(e.target.value)}
                  placeholder="Re-enter new PIN"
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-sm font-semibold"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Reset PIN back to default '1234'?")) {
                      localStorage.setItem("limra_admin_pin", "1234");
                      setCurrentPin("1234");
                      alert("Admin PIN has been reset to default '1234'.");
                      setShowPinModal(false);
                    }
                  }}
                  className="text-[11px] font-bold text-slate-400 hover:text-slate-600 underline"
                >
                  Reset to Default (1234)
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPinModal(false)}
                    className="px-3.5 py-2 border border-slate-300 rounded-lg font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0b2f5c] hover:bg-[#174e8c] text-white font-bold rounded-lg shadow-sm"
                  >
                    Save New PIN
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
