// ================================
// EDIT PRODUCTS HERE
// ================================
// Change product name, images,
// specifications, price, warranty etc.
// Non-programmers can edit or add products here.
// ================================

export type ProductCategory = "ceiling-fan" | "table-fan" | "pedestal-fan";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  model?: string;

  shortDescription: string;
  description: string;

  images: string[];

  price?: number;
  mrp?: number;

  specifications: {
    size?: string;
    sweep?: string;
    rpm?: string;
    wattage?: string;
    voltage?: string;
    frequency?: string;
    motorType?: string;
    winding?: string;
    bearing?: string;
    blades?: string;
    bladeDesign?: string;
    specialFeatures?: string;
    airDelivery?: string;
    noise?: string;
    bodyMaterial?: string;
    bladeMaterial?: string;
    colors?: string[];
  };

  highlights?: string[];
  features: string[];

  warranty?: string;

  available: boolean;

  featured: boolean;
};

// ==========================================
// CENTRAL PRODUCTS LIST
// ==========================================
// NOTE: These are sample products labeled with
// "Sample Product — Replace Details" until real
// production details are updated.
// ==========================================

export const products: Product[] = [
  // --- CEILING FANS ---
  {
    id: "cf-enticer",
    slug: "enticer-1200-mm-decorative-ceiling-fan",
    name: "Enticer 1200 mm (48 inch) Decorative Ceiling Fan",
    category: "ceiling-fan",
    model: "LIMRA-ENT-1200",
    shortDescription: "Exotic rich looks with modern styling, 350 RPM speed, 50W energy efficient induction motor, double ball bearing, and wider tip blades.",
    description: "The LE LIMRA Enticer Ceiling Fan combines exotic rich looks with contemporary styling. Engineered with an energy-efficient 50 Watts induction motor, heavy-duty double ball bearings, and durable high-grade motor winding construction. Aerodynamically sculpted wider tip blades ensure expansive air spread with anti-static dust resistant protection, backed by a 2-year warranty.",
    images: [
      "/src/assets/images/hero_decorative_fan_1789988751718.jpg",
      "/images/products/ceiling-fan-01.jpg",
      "/images/products/ceiling-fan-02.jpg",
    ],
    price: 2250,
    mrp: 2899,
    specifications: {
      size: "1200 mm (48 inch)",
      sweep: "1200 mm",
      rpm: "350 RPM",
      wattage: "50 Watts",
      voltage: "230 Volts",
      frequency: "50 Hz",
      motorType: "Energy Efficient Induction motor",
      winding: "Aluminium winding (Heavy-duty motor core)",
      bearing: "Double ball bearing",
      bladeDesign: "Wider tip blades for more air spread",
      specialFeatures: "Dust Resistant",
      blades: "3 Wider-tip aerodynamically balanced blades",
      airDelivery: "215 CMM",
      bodyMaterial: "High-grade aluminium die-cast body",
      bladeMaterial: "Aluminium with anti-dust coating",
      colors: ["Royal Pearl White", "Rich Walnut Brown", "Titanium Silver", "Ivory Gold"],
    },
    highlights: [
      "Energy Efficient Induction motor (Low 50W Power)",
      "Double ball bearing for smooth and whisper-quiet rotation",
      "Heavy-Duty winding construction",
      "Exotic rich looks with modern styling",
      "Wider tip blades for more air spread across the room",
    ],
    features: [
      "Speed: 350 RPM High-Speed Air Circulation",
      "Voltage: 230 Volts (50 Hz AC standard)",
      "Wattage: 50 Watts Ultra-Low Energy Consumption",
      "Motor: Energy Efficient Induction motor",
      "Bearing: Double ball bearing mechanism for extended durability",
      "Winding: Aluminium winding with heavy-duty motor core",
      "Special Features: Dust Resistant anti-static surface coating",
      "Blades: Aerodynamic wider tip blades for enhanced air spread",
      "Styling: Exotic rich looks with contemporary decorative trim",
      "Warranty: 2 Year LIMRA INDUSTRIES Manufacturer Warranty",
    ],
    warranty: "2 Year Warranty",
    available: true,
    featured: true,
  },
  {
    id: "cf-avencer-prime",
    slug: "avencer-prime-1200-mm-decorative-ceiling-fan",
    name: "Avencer Prime 1200 mm (48 inch) Decorative Ceiling Fan",
    category: "ceiling-fan",
    model: "LIMRA-AP-1200",
    shortDescription: "Premium 1200 mm (48 inch) decorative ceiling fan featuring durable aluminium winding, high-speed 380 RPM motor, and 207 CFM rapid airflow.",
    description: "The Avencer Prime 1200 mm (48 inch) Decorative Ceiling Fan combines contemporary aesthetics with reliable, heavy-duty cooling performance. Crafted with a premium aluminium body and durable aluminium winding, it delivers an impressive 207 CFM airflow at 380 RPM with energy-efficient 70 W power usage. Available in four designer finishes — Viola Blue, Pearl Ivory, Baker's Brown, and Satin Gold — and backed by a comprehensive 2-year warranty.",
    images: [
      "/images/products/avencer-prime-viola-blue.jpg",
      "/images/products/avencer-prime-pearl-ivory.jpg",
      "/images/products/avencer-prime-bakers-brown.jpg",
      "/images/products/avencer-prime-satin-gold.jpg",
    ],
    price: 2450,
    mrp: 3199,
    specifications: {
      size: "1200 mm (48 inch)",
      sweep: "1200 mm",
      rpm: "380 RPM",
      wattage: "70 W",
      voltage: "220V - 240V AC",
      frequency: "50 Hz",
      motorType: "High-torque induction motor",
      winding: "Aluminium winding",
      blades: "3",
      airDelivery: "207 CFM",
      bodyMaterial: "Aluminium",
      bladeMaterial: "Aluminium",
      colors: ["Viola blue", "Pearl Ivory", "Baker's Brown", "Satin Gold"],
    },
    features: [
      "High airflow delivery: 207 CFM for rapid room-wide circulation",
      "High-speed motor: 380 RPM rated speed",
      "Durable motor construction: 100% Aluminium winding",
      "Premium body material: Sturdy all-aluminium body & blades",
      "Energy-efficient: 70 W power consumption",
      "3 aerodynamically balanced blades for smooth, stable operation",
      "Available in 4 premium decorative finishes: Viola Blue, Pearl Ivory, Baker's Brown, Satin Gold",
      "Backed by a 2-Year Limra Industries Manufacturer Warranty",
    ],
    warranty: "2 Year Warranty",
    available: true,
    featured: true,
  },
  {
    id: "cf-01",
    slug: "le-limra-aeroflow-ceiling-fan",
    name: "LE LIMRA AeroFlow Ceiling Fan (Sample Product — Replace Details)",
    category: "ceiling-fan",
    model: "LL-CF-1200-AF",
    shortDescription: "High-airflow ceiling fan engineered for dependable everyday cooling in Indian homes and offices.",
    description: "The LE LIMRA AeroFlow ceiling fan delivers balanced air circulation and long-lasting motor durability. Built with precision-balanced blades and quality internal components under LIMRA INDUSTRIES quality standards.",
    images: [
      "/images/products/ceiling-fan-01.jpg",
      "/images/products/ceiling-fan-02.jpg",
    ],
    price: 1850,
    mrp: 2399,
    specifications: {
      size: "1200 mm (48 inch)",
      sweep: "1200 mm",
      rpm: "380 RPM",
      wattage: "70W",
      voltage: "220V - 240V AC",
      frequency: "50 Hz",
      motorType: "Heavy-duty induction motor",
      winding: "High-grade winding",
      blades: "3 Aerodynamic aluminium blades",
      airDelivery: "215 CMM",
      bodyMaterial: "Aluminium die-cast body",
      bladeMaterial: "High-grade aluminium",
      colors: ["Gloss White", "Rich Brown", "Smoked Silver", "Ivory"],
    },
    features: [
      "Precision-balanced aerodynamically shaped blades for wide air spread",
      "Robust motor designed to withstand voltage fluctuations",
      "Double ball bearing system for smooth and quiet rotation",
      "Anti-dust glossy powder coating finish for easy cleaning",
      "Factory direct wholesale and institutional order options",
    ],
    warranty: "2 Year Warranty",
    available: true,
    featured: true,
  },
  {
    id: "cf-02",
    slug: "le-limra-breeze-deluxe-ceiling-fan",
    name: "LE LIMRA Breeze Deluxe Ceiling Fan (Sample Product — Replace Details)",
    category: "ceiling-fan",
    model: "LL-CF-1200-BD",
    shortDescription: "Classic metallic ring finish ceiling fan with high speed air delivery and low power consumption.",
    description: "Designed for living spaces, bedrooms, and commercial establishments. Features an elegant central metallic ring accent and optimized blade pitch for maximum air thrust across the entire room.",
    images: [
      "/images/products/ceiling-fan-02.jpg",
      "/images/products/ceiling-fan-01.jpg",
    ],
    price: 2150,
    mrp: 2799,
    specifications: {
      size: "1200 mm (48 inch)",
      sweep: "1200 mm",
      rpm: "400 RPM",
      wattage: "72W",
      voltage: "230V AC",
      frequency: "50 Hz",
      motorType: "High-speed heavy-duty motor",
      winding: "Heavy-duty winding",
      blades: "3 High-lift blades",
      airDelivery: "230 CMM",
      bodyMaterial: "Aluminium casing with decorative trims",
      bladeMaterial: "Aluminium",
      colors: ["Royal Pearl White", "Metallic Titanium Grey", "Walnut Bronze"],
    },
    features: [
      "Enhanced blade angle for quick room cooling",
      "Metallic decorative motor ring accent",
      "Thermal overload motor protection system",
      "Available for bulk institutional and dealer distribution",
    ],
    warranty: "2 Year Warranty",
    available: true,
    featured: true,
  },
  {
    id: "cf-03",
    slug: "le-limra-economy-speed-ceiling-fan",
    name: "LE LIMRA Economy Speed 900mm (Sample Product — Replace Details)",
    category: "ceiling-fan",
    model: "LL-CF-900-ECO",
    shortDescription: "Compact 900mm ceiling fan engineered for small rooms, kitchens, cabins, and corridors.",
    description: "A compact ceiling fan offering robust air speed in smaller footprints. Reliable, low maintenance, and cost-efficient for budget projects, hostels, and residential quarters.",
    images: [
      "/images/products/ceiling-fan-01.jpg",
    ],
    price: 1550,
    mrp: 1999,
    specifications: {
      size: "900 mm (36 inch)",
      sweep: "900 mm",
      rpm: "440 RPM",
      wattage: "62W",
      voltage: "220V - 240V",
      frequency: "50 Hz",
      motorType: "High-speed motor",
      blades: "3 Compact blades",
      airDelivery: "165 CMM",
      colors: ["White", "Brown"],
    },
    features: [
      "Compact 36-inch sweep ideal for tight spaces and cabins",
      "Fast 440 RPM delivery for concentrated air circulation",
      "Durable powder coated finish resistant to moisture",
    ],
    warranty: "2 Year Warranty",
    available: true,
    featured: false,
  },

  // --- TABLE FANS ---
  {
    id: "tf-01",
    slug: "le-limra-airjet-table-fan",
    name: "LE LIMRA AirJet 400mm Table Fan (Sample Product — Replace Details)",
    category: "table-fan",
    model: "LL-TF-400-AJ",
    shortDescription: "Compact, portable, and powerful high-speed table fan for personal desks, study areas, and countertops.",
    description: "The LE LIMRA AirJet table fan features smooth 90-degree oscillation, 3-speed push-button control, and high-velocity aerodynamic blades encased in a safety grill. Built for continuous usage in Indian summer conditions.",
    images: [
      "/images/products/table-fan-01.jpg",
      "/images/products/table-fan-02.jpg",
    ],
    price: 1699,
    mrp: 2199,
    specifications: {
      size: "400 mm (16 inch)",
      sweep: "400 mm",
      rpm: "1350 RPM",
      wattage: "55W",
      voltage: "230V AC",
      frequency: "50 Hz",
      motorType: "Self-lubricating quiet motor",
      winding: "High-grade winding",
      blades: "3 High-thrust AS plastic blades",
      bodyMaterial: "High-impact ABS engineered plastic",
      colors: ["Blue & White", "Cool Grey", "All White"],
    },
    features: [
      "Wide 90-degree motorized oscillation with push-pull lock pin",
      "3-speed piano-key switch control for custom airflow",
      "Closely spaced safety finger guard for household safety",
      "Stable weighted base preventing vibration and tipping",
      "Sturdy integrated carrying handle for convenient portability",
    ],
    warranty: "2 Year Warranty",
    available: true,
    featured: true,
  },
  {
    id: "tf-02",
    slug: "le-limra-compact-desk-fan",
    name: "LE LIMRA Compact Desk Fan 300mm (Sample Product — Replace Details)",
    category: "table-fan",
    model: "LL-TF-300-CD",
    shortDescription: "300mm lightweight personal table fan with tilt adjustment and smooth oscillation.",
    description: "An economical table fan suited for shop counters, office cubicles, study tables, and small shops. Easy to clean and move around.",
    images: [
      "/images/products/table-fan-02.jpg",
      "/images/products/table-fan-01.jpg",
    ],
    price: 1399,
    mrp: 1799,
    specifications: {
      size: "300 mm (12 inch)",
      sweep: "300 mm",
      rpm: "1400 RPM",
      wattage: "48W",
      voltage: "220V - 240V",
      frequency: "50 Hz",
      blades: "3 Aerodynamic blades",
      colors: ["White", "Sky Blue"],
    },
    features: [
      "Lightweight ergonomic construction",
      "Adjustable vertical tilt angle",
      "3-speed rotary speed control knob",
    ],
    warranty: "2 Year Warranty",
    available: true,
    featured: false,
  },

  // --- PEDESTAL FANS ---
  {
    id: "pf-01",
    slug: "le-limra-stormflow-pedestal-fan",
    name: "LE LIMRA StormFlow Pedestal Fan (Sample Product — Replace Details)",
    category: "pedestal-fan",
    model: "LL-PF-400-SF",
    shortDescription: "Heavy-duty standing pedestal fan with telescopic height adjustment for halls, shops, and workshops.",
    description: "The LE LIMRA StormFlow pedestal fan provides commanding airflow for large spaces, restaurants, retail shops, and warehouses. Built with an ultra-stable round base, telescopic height rod, and robust oscillation mechanism.",
    images: [
      "/images/products/pedestal-fan-01.jpg",
      "/images/products/pedestal-fan-02.jpg",
    ],
    price: 2499,
    mrp: 3299,
    specifications: {
      size: "400 mm (16 inch)",
      sweep: "400 mm",
      rpm: "1350 RPM",
      wattage: "65W",
      voltage: "230V AC",
      frequency: "50 Hz",
      motorType: "Heavy duty motor",
      winding: "Heavy-duty winding",
      blades: "3 High-air delivery blades",
      airDelivery: "95 CMM",
      bodyMaterial: "Powder coated metal stand with ABS housing",
      colors: ["Midnight Black", "Steel Grey & Blue", "Classic White"],
    },
    features: [
      "Telescopic height adjustment rod with quick-lock collar",
      "Wide angle smooth oscillation for expansive room coverage",
      "Weighted heavy round base for anti-vibration stability",
      "Aerodynamic blade geometry providing high air throw distance",
      "Overheat thermal protection for uninterrupted commercial use",
    ],
    warranty: "2 Year Warranty",
    available: true,
    featured: true,
  },
  {
    id: "pf-02",
    slug: "le-limra-commercial-high-thrust-pedestal-fan",
    name: "LE LIMRA High-Thrust Commercial Pedestal Fan (Sample Product — Replace Details)",
    category: "pedestal-fan",
    model: "LL-PF-450-HT",
    shortDescription: "High-thrust 450mm commercial standing fan designed for large gathering areas, tents, and halls.",
    description: "Engineered for demanding commercial environments requiring continuous high air circulation. High-gauge wire grill and extra-strong motor.",
    images: [
      "/images/products/pedestal-fan-02.jpg",
      "/images/products/pedestal-fan-01.jpg",
    ],
    price: 3199,
    mrp: 4199,
    specifications: {
      size: "450 mm (18 inch)",
      sweep: "450 mm",
      rpm: "1400 RPM",
      wattage: "90W",
      voltage: "220V - 240V",
      frequency: "50 Hz",
      blades: "3 Aerodynamic metal/poly blades",
      bodyMaterial: "Heavy-gauge metal and industrial grade components",
      colors: ["Industrial Black"],
    },
    features: [
      "Heavy-duty commercial motor for extended run times",
      "Strong reinforced metal safety guard",
      "Sturdy vibration-free round base plate",
    ],
    warranty: "2 Year Warranty",
    available: false,
    featured: false,
  }
];

// Helper functions for easy consumption across components
export const getAllProducts = (): Product[] => products;

export const getFeaturedProducts = (): Product[] => products.filter((p) => p.featured);

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (category: ProductCategory): Product[] =>
  products.filter((p) => p.category === category);

export const getRelatedProducts = (currentSlug: string, category: ProductCategory, limit = 3): Product[] =>
  products
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
