import React, { createContext, useContext, useState, useEffect } from "react";

export type ApplicationType = "dealer" | "wholesale" | "quote";

export type ApplicationStatus =
  | "new"
  | "under_review"
  | "contacted"
  | "approved"
  | "rejected";

export interface ApplicationRecord {
  id: string;
  type: ApplicationType;
  role: string; // "Super Stockist" | "Distributor" | "Dealer" | "Wholesaler" | "Retailer"
  applicantName: string;
  designation?: string;
  businessName: string;
  businessType?: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  city: string;
  district?: string;
  state: string;
  pincode?: string;
  address?: string;
  landmark?: string;
  gstNumber?: string;
  panNumber?: string;
  godownArea?: string;
  experienceYears?: string;
  expectedVolume?: string;
  interestedProducts?: string;
  transportPreference?: string;
  message?: string;
  submittedAt: string; // ISO date string
  status: ApplicationStatus;
  adminNotes?: string;
}

interface ApplicationContextType {
  applications: ApplicationRecord[];
  addApplication: (
    data: Omit<ApplicationRecord, "id" | "submittedAt" | "status" | "adminNotes">
  ) => ApplicationRecord;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void;
  updateApplicationNotes: (id: string, notes: string) => void;
  deleteApplication: (id: string) => void;
  resetToSampleData: () => void;
  clearAllApplications: () => void;
  unreadCount: number;
}

const STORAGE_KEY = "limra_dealer_applications_v1";

const INITIAL_SAMPLE_APPLICATIONS: ApplicationRecord[] = [
  {
    id: "LL-SUP-89210",
    type: "dealer",
    role: "Super Stockist",
    applicantName: "Rajesh Kumar",
    designation: "Managing Director",
    businessName: "Sri Lakshmi Electrical Depot & Wholesalers",
    businessType: "Partnership Firm",
    phone: "+91 98490 12345",
    whatsapp: "9849012345",
    email: "rajesh@srilakshmielectricals.com",
    city: "Vijayawada",
    district: "Krishna",
    state: "Andhra Pradesh",
    pincode: "520001",
    address: "Door No. 12-4/2, One Town Market Yard, Governorpet",
    landmark: "Near Benz Circle Main Depot",
    gstNumber: "37AAACS1234A1Z5",
    panNumber: "AAACS1234A",
    godownArea: "3,500",
    experienceYears: "10+ years",
    expectedVolume: "500-1000 units",
    interestedProducts: "All Fan Ranges (Ceiling, Table & Pedestal Fans)",
    transportPreference: "VRL Logistics / Navata Transport",
    message: "We have 18 district distributor networks across AP and want primary stocking rights for Andhra region.",
    submittedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: "new",
    adminNotes: "High value candidate. Call regarding Governorpet depot capacity.",
  },
  {
    id: "LL-DEA-76541",
    type: "dealer",
    role: "Dealer",
    applicantName: "Mohammed Salman Siddiqui",
    designation: "Proprietor",
    businessName: "Deccan Fan House & Lighting",
    businessType: "Proprietorship",
    phone: "+91 91000 98765",
    whatsapp: "9100098765",
    email: "deccanfans.hyd@gmail.com",
    city: "Hyderabad",
    district: "Hyderabad",
    state: "Telangana",
    pincode: "500003",
    address: "Shop No. 14, Ranigunj Electrical Market, Secunderabad",
    landmark: "Opposite General Post Office",
    gstNumber: "36ABCPD9876E1Z9",
    panNumber: "ABCPD9876E",
    godownArea: "1,200",
    experienceYears: "5-10 years",
    expectedVolume: "100-200 units",
    interestedProducts: "High-Speed Ceiling Fans & Decorative Metallic Finish Models",
    transportPreference: "Local Pickup / Direct Factory Lorry",
    message: "Requires display stand & catalog leaflets for Secunderabad showroom.",
    submittedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: "under_review",
    adminNotes: "Sample models requested on Monday.",
  },
  {
    id: "LL-DIS-43109",
    type: "dealer",
    role: "Distributor",
    applicantName: "Suresh Gowda",
    designation: "Proprietor",
    businessName: "Gowda Electricals & Hardware Suppliers",
    businessType: "Proprietorship",
    phone: "+91 99801 54321",
    whatsapp: "9980154321",
    email: "contact@gowdaelectricals.in",
    city: "Bengaluru",
    district: "Bengaluru Urban",
    state: "Karnataka",
    pincode: "560002",
    address: "No. 45, BKP Market, Chickpet Main Road",
    landmark: "Near City Railway Station Road",
    gstNumber: "29AABCG4321F1Z2",
    panNumber: "AABCG4321F",
    godownArea: "2,000",
    experienceYears: "5-10 years",
    expectedVolume: "200-500 units",
    interestedProducts: "B2B Bulk Ceiling Fans for Contractor & Builder Projects",
    transportPreference: "KRL Express Lorry Service",
    message: "Supplying 15 hostel projects in North Bengaluru. Need special price slab.",
    submittedAt: new Date(Date.now() - 3600000 * 42).toISOString(),
    status: "contacted",
    adminNotes: "Spoke on phone. Price list sent via WhatsApp.",
  },
  {
    id: "LL-WHO-12890",
    type: "wholesale",
    role: "Wholesaler",
    applicantName: "Amit Patel",
    designation: "Partner",
    businessName: "Patel Traders & Electrical Wholesale",
    businessType: "Partnership",
    phone: "+91 94260 88990",
    whatsapp: "9426088990",
    email: "amit@pateltraders.com",
    city: "Nagpur",
    district: "Nagpur",
    state: "Maharashtra",
    pincode: "440002",
    address: "Gandhibagh Market, Central Avenue Road",
    gstNumber: "27AAAFP1122K1Z4",
    expectedVolume: "300 units",
    interestedProducts: "Table Fans & Pedestal Fans (Bulk Master Cartons)",
    message: "Requires 300 units of Table Fans for summer stock.",
    submittedAt: new Date(Date.now() - 3600000 * 70).toISOString(),
    status: "approved",
    adminNotes: "Dealer agreement signed. First advance payment received.",
  },
];

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [applications, setApplications] = useState<ApplicationRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to load applications from localStorage", e);
    }
    return INITIAL_SAMPLE_APPLICATIONS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    } catch (e) {
      console.error("Failed to save applications to localStorage", e);
    }
  }, [applications]);

  const addApplication = (
    data: Omit<ApplicationRecord, "id" | "submittedAt" | "status" | "adminNotes">
  ): ApplicationRecord => {
    const prefix =
      data.role === "Super Stockist"
        ? "SUP"
        : data.role === "Distributor"
        ? "DIS"
        : data.role === "Dealer"
        ? "DEA"
        : data.role === "Wholesaler"
        ? "WHO"
        : "APP";

    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const newId = `LL-${prefix}-${randomDigits}`;

    const newApp: ApplicationRecord = {
      ...data,
      id: newId,
      submittedAt: new Date().toISOString(),
      status: "new",
      adminNotes: "",
    };

    setApplications((prev) => [newApp, ...prev]);
    return newApp;
  };

  const updateApplicationStatus = (id: string, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const updateApplicationNotes = (id: string, notes: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, adminNotes: notes } : app))
    );
  };

  const deleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  const resetToSampleData = () => {
    setApplications(INITIAL_SAMPLE_APPLICATIONS);
  };

  const clearAllApplications = () => {
    setApplications([]);
  };

  const unreadCount = applications.filter((app) => app.status === "new").length;

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        addApplication,
        updateApplicationStatus,
        updateApplicationNotes,
        deleteApplication,
        resetToSampleData,
        clearAllApplications,
        unreadCount,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("useApplications must be used within an ApplicationProvider");
  }
  return context;
};
