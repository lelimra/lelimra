# LE LIMRA — Official Website & Product System

Official website for **LE LIMRA**, an Indian electrical ceiling fan, table fan, and pedestal fan brand manufactured by **LIMRA INDUSTRIES** in Hyderabad, Telangana, India.

---

## Quick Start Guide

### 11. How to Run the Website Locally
To start the local development server:
```bash
# 1. Install dependencies (first time only)
npm install

# 2. Start the development server
npm run dev
```
The website will be live at `http://localhost:3000`.

### 12. How to Build the Website
To compile and test the production-ready build:
```bash
npm run build
```
This checks all TypeScript types, bundles CSS, and outputs the optimized static website into the `dist/` directory.

### 13. How to Deploy the Website
You can deploy this website to any standard hosting platform:
- **Cloud Run / Docker**: Use the preconfigured Node container.
- **Vercel / Netlify / Cloudflare Pages / GitHub Pages**:
  - Build command: `npm run build`
  - Output directory: `dist`
  - Single Page Application (SPA) redirect: Route all requests (`/*`) to `/index.html`.

---

## Non-Programmer Administration Guide

You **never need to edit React components** to manage products or business details. Everything is controlled from two central files:
1. Business Details: `/data/site.ts`
2. Product Catalog: `/data/products.ts`
3. Product Images: `/public/images/products/`

---

### 1. How to Add a Product
Open `/data/products.ts`, scroll down to the `products` list, and add a new item inside the `products = [...]` array:

```typescript
{
  id: "cf-04",
  slug: "le-limra-turbo-speed-ceiling-fan", // URL will be /products/le-limra-turbo-speed-ceiling-fan
  name: "LE LIMRA Turbo Speed Ceiling Fan",
  category: "ceiling-fan", // Options: "ceiling-fan" | "table-fan" | "pedestal-fan"
  model: "LL-CF-1200-TS",
  shortDescription: "High-speed 1200mm ceiling fan with aerodynamic blades.",
  description: "Detailed description of the fan, its performance, and intended spaces.",
  images: [
    "/images/products/ceiling-fan-01.jpg",
  ],
  price: 1950, // Selling price in Rupees (optional)
  mrp: 2499,   // MRP in Rupees (optional)
  specifications: {
    size: "1200 mm (48 inch)",
    sweep: "1200 mm",
    rpm: "390 RPM",
    wattage: "72W",
    voltage: "230V AC",
    motorType: "High-speed induction motor",
    winding: "100% Copper winding",
    blades: "3 Aluminium blades",
    airDelivery: "220 CMM",
    colors: ["Gloss White", "Brown", "Ivory"],
  },
  features: [
    "High-speed motor designed for Indian summers",
    "Double ball bearing system for whisper-quiet rotation",
    "Anti-corrosion powder-coated finish",
  ],
  warranty: "1 Year Warranty", // Enter warranty or leave undefined
  available: true,             // Set to false if currently out of stock
  featured: true,              // Set to true to display on homepage featured section
}
```

---

### 2. How to Remove a Product
1. Open `/data/products.ts`.
2. Locate the product block you want to remove.
3. Delete the entire `{ ... }` block (or set `available: false` if you only want to temporarily mark it as out of stock).
4. Save the file.

---

### 3. How to Change a Product Price
1. Open `/data/products.ts`.
2. Find the product by name or model.
3. Change `price` and `mrp`:
   ```typescript
   price: 1850,
   mrp: 2399,
   ```
4. If you want to hide the price and show "Price on Request" instead, simply remove or comment out the `price` and `mrp` lines.

---

### 4. How to Change Product Photos
1. Place your new photo in the folder `/public/images/products/`.
2. You can either:
   - **Method A (Easiest)**: Name your photo with the existing filename (e.g. replace `ceiling-fan-01.jpg` with your own file of the exact same name).
   - **Method B**: Put your photo (e.g. `my-new-fan.jpg`) in `/public/images/products/`, then open `/data/products.ts` and update the `images` list:
     ```typescript
     images: [
       "/images/products/my-new-fan.jpg",
     ],
     ```

---

### 5. How to Change Specifications
1. Open `/data/products.ts`.
2. Locate the product.
3. Under `specifications: { ... }`, update any field:
   ```typescript
   specifications: {
     size: "1200 mm (48 inch)",
     rpm: "400 RPM",
     wattage: "68W",
     winding: "100% Copper winding",
     airDelivery: "225 CMM",
     colors: ["Pearl White", "Walnut Brown", "Titanium Grey"],
   }
   ```
   *Note: Only fields with values are displayed on the website. If a spec is unknown, leave it blank or omit it.*

---

### 6. How to Change WhatsApp Number
1. Open `/data/site.ts`.
2. Find `whatsapp`:
   ```typescript
   whatsapp: "919876543210",
   ```
   *Important: Enter with the country code (91 for India), without the `+` sign or spaces.*
   All WhatsApp buttons across the entire website will immediately update.

---

### 7. How to Change Phone Number
1. Open `/data/site.ts`.
2. Find `phone`:
   ```typescript
   phone: "+91 98765 43210",
   ```
   Save the file.

---

### 8. How to Change Email
1. Open `/data/site.ts`.
2. Find `email`:
   ```typescript
   email: "contact@limraindustries.com",
   ```
   Save the file.

---

### 9. How to Change Homepage Text
1. Open `/data/site.ts`.
2. Edit any of these fields:
   ```typescript
   heroTitle: "Powerful Air. Built for India.",
   heroSubtitle: "Ceiling Fans & Table Fans from LE LIMRA — designed for reliable performance, everyday comfort and value.",
   aboutText: "...",
   warrantyText: "1 Year Warranty on designated models",
   deliveryText: "Pan-India Delivery for Wholesale & Dealer Orders",
   ```

---

### 10. How to Add a New Category
1. Open `/data/products.ts`.
2. If introducing a new category (e.g., `"exhaust-fan"`), update `ProductCategory`:
   ```typescript
   export type ProductCategory = "ceiling-fan" | "table-fan" | "pedestal-fan" | "exhaust-fan";
   ```
3. Assign products with `category: "exhaust-fan"`.
4. In `/src/components/Navbar.tsx` and `/src/components/Footer.tsx`, add navigation links pointing to `/products?category=exhaust-fan` or `/products/exhaust-fans`.

---

## Future Database / Admin Panel Architecture

The application is structured to decouple UI from data:
- All product reads flow through `getAllProducts()`, `getProductBySlug()`, etc., in `/data/products.ts`.
- When ready to connect **Supabase, PostgreSQL, or an Admin CMS**:
  1. Replace the local array returns in `/data/products.ts` with API/Database queries.
  2. The entire website (`ProductCard`, `ProductsPage`, `ProductDetailPage`, filter system, search) will work without changes.

---

## Brand & Compliance Guardrails

- **Brand:** LE LIMRA
- **Company:** LIMRA INDUSTRIES
- **Location:** Hyderabad, Telangana, India
- **Warranty:** 1 Year Warranty is displayed strictly where individual product data states warranty is 1 year.
- **Claims:** No fake ISO, BIS, customer testimonials, or fake statistics are included.
