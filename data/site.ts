// ==========================================
// LE LIMRA - SITE & BUSINESS CONFIGURATION
// ==========================================
// All core business details, contact information,
// and hero text are managed in this single file.
// Non-programmers can edit these values safely.
// ==========================================

export interface SiteConfig {
  brandName: string;
  brandTagline: string;
  companyName: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  whatsapp: string; // Enter without '+' or spaces for WhatsApp web links (e.g., "919876543210")
  email: string;
  address: string;
  gstNumber?: string;
  socials: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  warrantyText: string;
  deliveryText: string;
}

export const siteConfig: SiteConfig = {
  brandName: "LE LIMRA",
  brandTagline: "Powerful Air. Built for India.",
  companyName: "LIMRA INDUSTRIES",
  city: "Hyderabad",
  state: "Telangana",
  country: "India",
  phone: "+91 98765 43210", // EDIT: Update with your primary business contact phone
  whatsapp: "919876543210", // EDIT: Update with your 10-digit WhatsApp number (with 91 country code, no +)
  email: "contact@limraindustries.com", // EDIT: Update with your official email
  address: "LIMRA INDUSTRIES, Hyderabad, Telangana, India", // EDIT: Update with your full factory/office address
  gstNumber: "Details to be updated",
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
  heroTitle: "Powerful Air. Built for India.",
  heroSubtitle: "Ceiling Fans & Table Fans from LE LIMRA — designed for reliable performance, everyday comfort and value.",
  aboutText: "LE LIMRA is an Indian electrical brand focused on ceiling fans, table fans and pedestal fans. The company operates under LIMRA INDUSTRIES with a commitment to practical engineering, reliable motor performance, competitive factory pricing, and nationwide dealer & wholesale supply.",
  warrantyText: "2 Year Warranty on designated models",
  deliveryText: "Pan-India Delivery for Wholesale & Dealer Orders",
};
