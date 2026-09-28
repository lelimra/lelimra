export interface CatalogueColor {
  name: string;
  hex?: string;
  badge?: string;
}

export interface CataloguePageData {
  pageNumber: number;
  title: string;
  subtitle: string;
  category: "Cover" | "Profile" | "Ceiling Fans" | "Special Fans" | "Pedestal & Table" | "Technical Guide";
  modelCode?: string;
  colors?: CatalogueColor[];
  specs?: {
    sweepMm: number | string;
    powerWatts: string;
    speedRpm: string;
    airDeliveryCmm: string;
    warranty: string;
  };
  features?: string[];
  description?: string;
  keywords: string[];
}

export const CATALOGUE_PAGES: CataloguePageData[] = [
  {
    pageNumber: 1,
    title: "LE LIMRA Product Catalogue",
    subtitle: "Quality Without Compromise...",
    category: "Cover",
    description: "Official Product Catalogue of LIMRA INDUSTRIES — Manufacturing Table Fans, Pedestal Fans, Wall Fans, & Ceiling Fans in Hyderabad, India.",
    keywords: ["Cover", "LE LIMRA", "Catalogue", "Crysta", "Make In India", "Save Water Save Green"],
  },
  {
    pageNumber: 2,
    title: "Company Profile",
    subtitle: "LIMRA INDUSTRIES, Hyderabad",
    category: "Profile",
    description: "Based in Telangana, India, LIMRA INDUSTRIES came into existence in the year 2005 under leadership with over three decades of manufacturing expertise in setting up electrical ceiling fan units.",
    features: [
      "Strict compliance with national & international manufacturing standards",
      "Prime-grade raw materials & multi-stage quality control checks",
      "Over 30 years of industry experience in electrical ceiling fans",
      "Dominating domestic & export presence with highly competitive pricing",
      "Top Quality Guaranteed certified manufacturing facility",
    ],
    keywords: ["Profile", "About", "2005", "Manufacturer", "Hyderabad", "Balanagar", "Fathenagar", "Quality"],
  },
  {
    pageNumber: 3,
    title: "Jazz",
    subtitle: "High Speed Decorative Fan",
    modelCode: "LE-001",
    category: "Ceiling Fans",
    colors: [
      { name: "Smooky", hex: "#2b262d" },
      { name: "Satin Gold", hex: "#c9a86a" },
    ],
    specs: {
      sweepMm: 1200,
      powerWatts: "70±5 W",
      speedRpm: "390±10 RPM",
      airDeliveryCmm: "230 CMM",
      warranty: "2 Years Official",
    },
    features: [
      "Imported Double Ball Bearings",
      "Powerful Performance Motor",
      "HSLV (High Speed Low Voltage) Technology",
      "Wide Angle Air Flow Aerodynamic Blades",
      "Heavy-Duty Motor Winding",
    ],
    keywords: ["Jazz", "LE-001", "Smooky", "Satin Gold", "1200mm", "Decorative"],
  },
  {
    pageNumber: 4,
    title: "Aura",
    subtitle: "High Speed Designer Fan",
    modelCode: "LE-002",
    category: "Ceiling Fans",
    colors: [
      { name: "Copper Gold", hex: "#b87333" },
      { name: "Satin Gold", hex: "#d4af37" },
      { name: "Ivory", hex: "#fffff0" },
    ],
    specs: {
      sweepMm: 1200,
      powerWatts: "70±5 W",
      speedRpm: "390±10 RPM",
      airDeliveryCmm: "230 CMM",
      warranty: "2 Years Official",
    },
    features: [
      "Imported Double Ball Bearings",
      "Powerful Performance Motor",
      "HSLV Technology",
      "Wide Angle Air Flow",
      "Heavy-Duty Motor Winding",
    ],
    keywords: ["Aura", "LE-002", "Copper Gold", "Satin Gold", "Ivory", "1200mm"],
  },
  {
    pageNumber: 5,
    title: "Enticer",
    subtitle: "Premium High Speed Decorative Fan",
    modelCode: "LE-003",
    category: "Ceiling Fans",
    colors: [
      { name: "D.Brown", hex: "#4a2e18" },
      { name: "Rose Gold", hex: "#b76e79" },
      { name: "Pearl White", hex: "#f8f8ff" },
      { name: "Satin Gold", hex: "#c9a86a" },
    ],
    specs: {
      sweepMm: 1200,
      powerWatts: "70±5 W",
      speedRpm: "390±10 RPM",
      airDeliveryCmm: "230 CMM",
      warranty: "2 Years Official",
    },
    features: [
      "Imported Double Ball Bearings",
      "Powerful Performance Motor",
      "HSLV Technology",
      "Wide Angle Air Flow",
      "Heavy-Duty Motor Winding",
    ],
    keywords: ["Enticer", "LE-003", "Rose Gold", "D.Brown", "Pearl White", "Satin Gold", "1200mm"],
  },
  {
    pageNumber: 6,
    title: "Avenger",
    subtitle: "Aerodynamic High Speed Fan",
    modelCode: "LE-004",
    category: "Ceiling Fans",
    colors: [
      { name: "D.Brown", hex: "#4a2e18" },
      { name: "Blue", hex: "#1e3a8a" },
      { name: "Satin Gold", hex: "#c9a86a" },
      { name: "Pearl Ivory", hex: "#fbf6e9" },
    ],
    specs: {
      sweepMm: 1200,
      powerWatts: "70±5 W",
      speedRpm: "390±10 RPM",
      airDeliveryCmm: "230 CMM",
      warranty: "2 Years Official",
    },
    features: [
      "Imported Double Ball Bearings",
      "Powerful Performance Motor",
      "HSLV Technology",
      "Wide Angle Air Flow",
      "Heavy-Duty Motor Winding",
    ],
    keywords: ["Avenger", "LE-004", "Blue", "D.Brown", "Satin Gold", "Pearl Ivory", "1200mm"],
  },
  {
    pageNumber: 7,
    title: "Breeza",
    subtitle: "High Velocity Modern Fan",
    modelCode: "LE-005",
    category: "Ceiling Fans",
    colors: [
      { name: "D.Brown", hex: "#4a2e18" },
      { name: "Matt Black", hex: "#1f2937" },
    ],
    specs: {
      sweepMm: 1200,
      powerWatts: "70±5 W",
      speedRpm: "390±10 RPM",
      airDeliveryCmm: "230 CMM",
      warranty: "2 Years Official",
    },
    features: [
      "Imported Double Ball Bearings",
      "Powerful Performance Motor",
      "HSLV Technology",
      "Wide Angle Air Flow",
      "Heavy-Duty Motor Winding",
    ],
    keywords: ["Breeza", "LE-005", "Matt Black", "D.Brown", "1200mm"],
  },
  {
    pageNumber: 8,
    title: "FORD",
    subtitle: "Sports Styled High Speed Fan",
    modelCode: "LE-006",
    category: "Ceiling Fans",
    colors: [
      { name: "Smooky", hex: "#2b262d" },
      { name: "Satin Gold", hex: "#c9a86a" },
    ],
    specs: {
      sweepMm: 1200,
      powerWatts: "70±5 W",
      speedRpm: "390±10 RPM",
      airDeliveryCmm: "230 CMM",
      warranty: "2 Years Official",
    },
    features: [
      "Imported Double Ball Bearings",
      "Powerful Performance Motor",
      "HSLV Technology",
      "Wide Angle Air Flow",
      "Heavy-Duty Motor Winding",
    ],
    keywords: ["FORD", "LE-006", "Smooky", "Satin Gold", "1200mm"],
  },
  {
    pageNumber: 9,
    title: "Creata",
    subtitle: "Elegance Series High Speed Fan",
    modelCode: "LE-007",
    category: "Ceiling Fans",
    colors: [
      { name: "Copper Bronze", hex: "#cd7f32" },
      { name: "D.Brown", hex: "#4a2e18" },
      { name: "Satin Gold", hex: "#c9a86a" },
    ],
    specs: {
      sweepMm: 1200,
      powerWatts: "70±5 W",
      speedRpm: "390±10 RPM",
      airDeliveryCmm: "230 CMM",
      warranty: "2 Years Official",
    },
    features: [
      "Imported Double Ball Bearings",
      "Powerful Performance Motor",
      "HSLV Technology",
      "Wide Angle Air Flow",
      "Heavy-Duty Motor Winding",
    ],
    keywords: ["Creata", "LE-007", "Copper Bronze", "D.Brown", "Satin Gold", "1200mm"],
  },
  {
    pageNumber: 10,
    title: "Tesla",
    subtitle: "Futuristic High Speed Fan",
    modelCode: "LE-008",
    category: "Ceiling Fans",
    colors: [
      { name: "Pearl Ivory", hex: "#fbf6e9" },
      { name: "Matt Black", hex: "#1f2937" },
    ],
    specs: {
      sweepMm: 1200,
      powerWatts: "70±5 W",
      speedRpm: "390±10 RPM",
      airDeliveryCmm: "230 CMM",
      warranty: "2 Years Official",
    },
    features: [
      "Imported Double Ball Bearings",
      "Powerful Performance Motor",
      "HSLV Technology",
      "Wide Angle Air Flow",
      "Heavy-Duty Motor Winding",
    ],
    keywords: ["Tesla", "LE-008", "Pearl Ivory", "Matt Black", "1200mm"],
  },
  {
    pageNumber: 11,
    title: "HI-BREEZA",
    subtitle: "Classic High Delivery Fan",
    modelCode: "LE-009",
    category: "Ceiling Fans",
    colors: [
      { name: "Brown", hex: "#5c3317" },
      { name: "Ivory", hex: "#fffff0" },
    ],
    specs: {
      sweepMm: 1200,
      powerWatts: "70±5 W",
      speedRpm: "390±10 RPM",
      airDeliveryCmm: "230 CMM",
      warranty: "2 Years Official",
    },
    features: [
      "Imported Double Ball Bearings",
      "Powerful Performance Motor",
      "HSLV Technology",
      "Wide Angle Air Flow",
      "Heavy-Duty Motor Winding",
    ],
    keywords: ["HI-BREEZA", "LE-009", "Brown", "Ivory", "1200mm"],
  },
  {
    pageNumber: 12,
    title: "Classic",
    subtitle: "Heritage Textured Ceiling Fan",
    modelCode: "LE-009 / Classic",
    category: "Ceiling Fans",
    colors: [
      { name: "Brown", hex: "#5c3317" },
      { name: "M.Black", hex: "#1f2937" },
      { name: "Satin Gold", hex: "#c9a86a" },
      { name: "Classic Texture", hex: "#3b302a" },
    ],
    specs: {
      sweepMm: 1200,
      powerWatts: "70±5 W",
      speedRpm: "390±10 RPM",
      airDeliveryCmm: "230 CMM",
      warranty: "2 Years Official",
    },
    features: [
      "Imported Double Ball Bearings",
      "Powerful Performance Motor",
      "HSLV Technology",
      "Wide Angle Air Flow",
      "Heavy-Duty Motor Winding",
    ],
    keywords: ["Classic", "Classic Texture", "Brown", "M.Black", "Satin Gold", "1200mm"],
  },
  {
    pageNumber: 13,
    title: "24\" High Speed Fans",
    subtitle: "4-Blade Compact High Velocity Series",
    modelCode: "LE-010 / 24-INCH",
    category: "Special Fans",
    colors: [
      { name: "Brown", hex: "#5c3317" },
      { name: "Matt Brown", hex: "#4a3525" },
      { name: "White", hex: "#ffffff" },
      { name: "Ivory", hex: "#fffff0" },
      { name: "Beige Gold / Copper", hex: "#c89d66" },
      { name: "Voila / Silver", hex: "#c0c0c0" },
      { name: "Coffee Metallic", hex: "#6f4e37" },
    ],
    specs: {
      sweepMm: "600 mm (24\") & 1200 mm",
      powerWatts: "70±5 W",
      speedRpm: "390±10 RPM",
      airDeliveryCmm: "230 CMM",
      warranty: "2 Years Official",
    },
    features: [
      "4-Blade aerodynamic compact sweep",
      "High concentrated down-draft for cabins & small shops",
      "Imported Double Ball Bearings",
      "Heavy-Duty Motor Winding",
    ],
    keywords: ["24 Inch", "600mm", "4 Blade", "High Speed", "Cabin Fan", "White", "Ivory", "Brown"],
  },
  {
    pageNumber: 14,
    title: "Range of Pedestal, Table & Wall Fans",
    subtitle: "Portable & Directional Air Range",
    category: "Pedestal & Table",
    specs: {
      sweepMm: "400 mm (16\")",
      powerWatts: "95 W",
      speedRpm: "2100 RPM High Speed",
      airDeliveryCmm: "95 CMM",
      warranty: "12 Months Warranty (Only Motor)",
    },
    features: [
      "High Speed 2100 RPM heavy-duty motor",
      "400mm aerodynamically balanced 3-leaf blades",
      "Smooth wide-angle oscillation with tilt mechanism",
      "Heavy duty base & reinforced safety finger grill",
      "12 Months Warranty (Only Motor)",
    ],
    keywords: ["Table Fan", "Wall Fan", "Pedestal Fan", "400mm", "2100 RPM", "12 Months Warranty"],
  },
  {
    pageNumber: 15,
    title: "Selection Guide - Ceiling Fans",
    subtitle: "Recommended Sweep by Room Size",
    category: "Technical Guide",
    description: "Official factory selection guide for ceiling fan sizing, spacing distance, and height optimization from LIMRA INDUSTRIES, Hyderabad.",
    features: [
      "Small shops, cabins & ceiling: 600 mm (24\")",
      "8' x 8' to 8' x 10' (upto 6.5 sq. mtr): 900 mm (36\") • 1.8m spacing",
      "9' x 11' to 10' x 10' (upto 9 sq. mtr): 1050 mm (42\") • 2.0m spacing",
      "10' x 13' to 12' x 12' (upto 14 sq. mtr): 1200 mm (48\") • 2.5m spacing",
      "13' x 16' to 15' x 15' (upto 20 sq. mtr): 1400 mm (56\") • 3.0m spacing",
      "Optimum Height: 10 feet from ground level & 1 foot below ceiling",
    ],
    keywords: ["Selection Guide", "Room Size", "Sweep Size", "Center Distance", "Hyderabad", "Limra Industries"],
  },
];
