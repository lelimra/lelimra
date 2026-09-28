import { jsPDF } from "jspdf";
import { CATALOGUE_PAGES, CataloguePageData } from "@/data/catalogueData";

/**
 * Generates the official 15-Page LE LIMRA Product Catalogue PDF
 */
export function generateCataloguePdf(): jsPDF {
  // A4 Landscape orientation matching the official LE LIMRA physical catalogue layout
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 297mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 210mm

  CATALOGUE_PAGES.forEach((pageData: CataloguePageData, index: number) => {
    if (index > 0) {
      doc.addPage("a4", "landscape");
    }

    // Page Background
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Header Banner
    doc.setFillColor(7, 25, 47); // Dark navy
    doc.rect(0, 0, pageWidth, 24, "F");

    // Brand Title in Header
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("LE LIMRA", 14, 14);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(190, 215, 255);
    doc.text("QUALITY WITHOUT COMPROMISE ...", 50, 14);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text("PRODUCT CATALOGUE", pageWidth - 14, 14, { align: "right" });

    // Bottom Footer Banner
    doc.setFillColor(11, 47, 92);
    doc.rect(0, pageHeight - 12, pageWidth, 12, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(230, 240, 255);
    doc.text(
      "Manufacturing: Table Fans, Pedestal Fans, Wall Fans, & Ceiling Fans  |  LIMRA INDUSTRIES, Hyderabad - Contact: 8919854467",
      pageWidth / 2,
      pageHeight - 4.5,
      { align: "center" }
    );

    // Page Number
    doc.setFont("helvetica", "bold");
    doc.text(`Page ${pageData.pageNumber} of 15`, pageWidth - 14, pageHeight - 4.5, { align: "right" });

    // PAGE-SPECIFIC CONTENT
    if (pageData.pageNumber === 1) {
      // COVER PAGE
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(20, 34, pageWidth - 40, 150, 4, 4, "F");

      doc.setTextColor(11, 47, 92);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(36);
      doc.text("LE LIMRA", pageWidth / 2, 60, { align: "center" });

      doc.setFontSize(12);
      doc.setTextColor(100, 116, 139);
      doc.text("QUALITY WITHOUT COMPROMISE...", pageWidth / 2, 70, { align: "center" });

      doc.setFontSize(28);
      doc.setTextColor(185, 28, 28);
      doc.text("Crysta & Designer Series", pageWidth / 2, 90, { align: "center" });

      doc.setFontSize(12);
      doc.setTextColor(30, 41, 59);
      doc.text("Official Technical Catalogue & Range Overview", pageWidth / 2, 102, { align: "center" });

      // Badges
      doc.setFillColor(239, 246, 255);
      doc.roundedRect(40, 118, 65, 22, 2, 2, "F");
      doc.setTextColor(11, 47, 92);
      doc.setFontSize(10);
      doc.text("SAVE WATER", 72.5, 128, { align: "center" });
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text("Eco-conscious plant", 72.5, 134, { align: "center" });

      doc.setFillColor(236, 253, 245);
      doc.roundedRect(116, 118, 65, 22, 2, 2, "F");
      doc.setTextColor(6, 95, 70);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("SAVE GREEN", 148.5, 128, { align: "center" });
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text("Energy efficient motors", 148.5, 134, { align: "center" });

      doc.setFillColor(254, 243, 199);
      doc.roundedRect(192, 118, 65, 22, 2, 2, "F");
      doc.setTextColor(146, 64, 14);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("MAKE IN INDIA", 224.5, 128, { align: "center" });
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text("Hyderabad, Telangana", 224.5, 134, { align: "center" });
    } else if (pageData.pageNumber === 2) {
      // PROFILE PAGE
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(20, 32, pageWidth - 40, 154, 4, 4, "F");

      doc.setTextColor(11, 47, 92);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("LIMRA INDUSTRIES", 30, 48);

      doc.setFontSize(10);
      doc.setTextColor(220, 38, 38);
      doc.text("Manufacturing : Table Fans, Pedestal Fans, Wall Fans, & Ceiling Fans", 30, 56);

      doc.setTextColor(51, 65, 85);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      const p1 =
        "We strictly follow international standards while manufacturing our products. We manufacture our products by using the best quality raw materials and under strict supervision of quality controllers. With the assistance of our team, we have a dominating place in the domestic and international markets. We offer products to our clients at competitive prices.";
      doc.text(doc.splitTextToSize(p1, 160), 30, 68);

      const p2 =
        "We offer a wide range of Decorative Ceiling Fan, which is one of its kind and is known in the market for its durability. This makes us stand as one of the best Ceiling Fans Manufacturers in India. Our Ceiling Fans components like blades, motors, etc. are of standard quality, procured from the established vendors in the market. Our range of Ceiling Fan is available in different designs, colors and provided with gloss finishes that add grace to the decor of the surroundings.";
      doc.text(doc.splitTextToSize(p2, 160), 30, 96);

      const p3 =
        "Based in Telangana, India, the company came into existence in the year of 2005. The company is efficiently working under the supervision who has rich experience of over three decades in setting up electrical ceiling fans manufacturing units.";
      doc.text(doc.splitTextToSize(p3, 160), 30, 134);

      // Seal on the right
      doc.setFillColor(220, 38, 38);
      doc.circle(230, 80, 22, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("TOP", 230, 76, { align: "center" });
      doc.text("QUALITY", 230, 82, { align: "center" });
      doc.setFontSize(7);
      doc.text("GUARANTEED", 230, 87, { align: "center" });

      doc.setFillColor(241, 245, 249);
      doc.roundedRect(200, 115, 60, 48, 2, 2, "F");
      doc.setTextColor(11, 47, 92);
      doc.setFontSize(9);
      doc.text("Factory Location:", 205, 124);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text("LIMRA INDUSTRIES", 205, 130);
      doc.text("# 10-1-31, Fathenagar,", 205, 135);
      doc.text("Balanagar, Hyderabad - 18", 205, 140);
      doc.text("Telangana, India", 205, 145);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(11, 47, 92);
      doc.text("Ph: 8919854467", 205, 153);
    } else if (pageData.pageNumber >= 3 && pageData.pageNumber <= 13) {
      // CEILING FANS & 24" FANS
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(16, 30, pageWidth - 32, 156, 3, 3, "F");

      // Model Title
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.text(pageData.title, 26, 46);

      if (pageData.modelCode) {
        doc.setTextColor(220, 38, 38);
        doc.setFontSize(14);
        doc.text(pageData.modelCode, 26, 54);
      }

      // High speed & Warranty badges
      doc.setFillColor(15, 23, 42);
      doc.roundedRect(pageWidth - 85, 36, 60, 14, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text("HIGH SPEED", pageWidth - 55, 45, { align: "center" });

      doc.setFillColor(241, 245, 249);
      doc.roundedRect(26, 62, 120, 22, 2, 2, "F");
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(8);
      doc.text("Available Colours / Finishes:", 30, 68);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(11, 47, 92);
      const colorList = pageData.colors?.map((c) => c.name).join("  •  ") || "";
      doc.text(colorList, 30, 77);

      // Specs Table Box
      doc.setFillColor(255, 255, 255);
      doc.rect(26, 92, 120, 48, "D");
      doc.setFillColor(15, 23, 42);
      doc.rect(26, 92, 120, 8, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text("TECHNICAL SPECIFICATIONS", 30, 97.5);

      doc.setTextColor(51, 65, 85);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);

      const rows = [
        ["Sweep (mm)", `${pageData.specs?.sweepMm} mm`],
        ["Rated Power (Watts)", `${pageData.specs?.powerWatts}`],
        ["Rated Speed (RPM)", `${pageData.specs?.speedRpm}`],
        ["Minimum Air Delivery (CMM)", `${pageData.specs?.airDeliveryCmm}`],
        ["Official Warranty", "2 YEARS WARRANTY"],
      ];

      rows.forEach((row, rIdx) => {
        const y = 106 + rIdx * 6.5;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(row[0], 30, y);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(row[1], 140, y, { align: "right" });
      });

      // 5 Core feature icons/boxes
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(26, 146, 120, 28, 2, 2, "F");
      doc.setFontSize(7.5);
      doc.setTextColor(11, 47, 92);
      doc.setFont("helvetica", "bold");
      doc.text("• Imported Double Ball Bearings", 30, 153);
      doc.text("• Powerful Performance Heavy Motor", 30, 159);
      doc.text("• HSLV Low Voltage Tech", 30, 165);
      doc.text("• Wide Angle Air Flow Blades", 85, 153);
      doc.text("• 100% Pure Copper Winding", 85, 159);

      // Decorative Illustration Area on Right
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(156, 62, pageWidth - 182, 112, 3, 3, "F");
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(pageData.title.toUpperCase(), 156 + (pageWidth - 182) / 2, 105, { align: "center" });
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text("High Velocity Aero Blade Design", 156 + (pageWidth - 182) / 2, 115, { align: "center" });
      doc.text("Whisper Quiet Double Ball Bearing", 156 + (pageWidth - 182) / 2, 122, { align: "center" });
    } else if (pageData.pageNumber === 14) {
      // PEDESTAL, TABLE, WALL FANS
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(16, 30, pageWidth - 32, 156, 3, 3, "F");

      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("RANGE OF PEDESTAL, TABLE, & WALL FANS", 26, 46);

      doc.setFillColor(220, 38, 38);
      doc.roundedRect(pageWidth - 85, 36, 60, 14, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.text("12 MONTHS WARRANTY", pageWidth - 55, 43, { align: "center" });
      doc.setFontSize(7);
      doc.text("(ONLY MOTOR)", pageWidth - 55, 48, { align: "center" });

      const fanTypes = [
        { name: "TABLE FAN", sweep: "400 mm", power: "95 W", rpm: "2100 RPM", air: "95 CMM" },
        { name: "WALL FAN", sweep: "400 mm", power: "95 W", rpm: "2100 RPM", air: "95 CMM" },
        { name: "PEDESTAL FAN", sweep: "400 mm", power: "95 W", rpm: "2100 RPM", air: "95 CMM" },
      ];

      fanTypes.forEach((ft, fIdx) => {
        const x = 26 + fIdx * 84;
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(x, 60, 78, 114, 2, 2, "F");

        doc.setFillColor(11, 47, 92);
        doc.roundedRect(x + 4, 66, 70, 10, 1, 1, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text(ft.name, x + 39, 72.5, { align: "center" });

        const specsList = [
          ["Sweep (mm)", ft.sweep],
          ["Rated Power", ft.power],
          ["Rated Speed", ft.rpm],
          ["Min Air Delivery", ft.air],
          ["Warranty", "12 Mos Motor"],
        ];

        specsList.forEach((s, sIdx) => {
          const sy = 90 + sIdx * 9;
          doc.setFont("helvetica", "normal");
          doc.setTextColor(71, 85, 105);
          doc.setFontSize(8);
          doc.text(s[0], x + 8, sy);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(15, 23, 42);
          doc.text(s[1], x + 70, sy, { align: "right" });
        });
      });
    } else if (pageData.pageNumber === 15) {
      // SELECTION GUIDE & BACK COVER
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(16, 30, pageWidth - 32, 156, 3, 3, "F");

      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("Selection Guide - Ceiling Fans", 26, 46);

      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      doc.setFont("helvetica", "normal");
      doc.text("Recommended Sweep for different room sizes :", 26, 54);

      // Table
      doc.setFillColor(15, 23, 42);
      doc.rect(26, 60, 160, 8, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.text("Room Size", 30, 65.5);
      doc.text("Fan Sweep", 180, 65.5, { align: "right" });

      const guideRows = [
        ["For small shops, cabins & ceiling", "600 mm (24\")"],
        ["2.4 mtr x 2.7 mtr to 2.4 mtr x 2.4 mtr (8'x10' to 8'x8') upto 6.5 sq. mtr", "900 mm (36\")"],
        ["2.7 mtr x 3.3 mtr to 3 mtr x 3 mtr (9'x11' to 10'x10') upto 9 sq. mtr", "1050 mm (42\")"],
        ["3.3 mtr x 4 mtr to 3.7 mtr x 3.7 mtr (10'x13' to 12'x12') upto 14 sq. mtr", "1200 mm (48\")"],
        ["4 mtr x 5 mtr to 4.5 mtr x 4.5 mtr (13'x16' to 15'x15') upto 20 sq. mtr", "1400 mm (56\")"],
      ];

      guideRows.forEach((gr, gIdx) => {
        const gy = 75 + gIdx * 7.5;
        doc.setFillColor(gIdx % 2 === 0 ? 248 : 255, gIdx % 2 === 0 ? 250 : 255, gIdx % 2 === 0 ? 252 : 255);
        doc.rect(26, gy - 5, 160, 7.5, "F");
        doc.setFont("helvetica", "normal");
        doc.setTextColor(51, 65, 85);
        doc.text(gr[0], 30, gy);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(11, 47, 92);
        doc.text(gr[1], 180, gy, { align: "right" });
      });

      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      doc.setFont("helvetica", "normal");
      doc.text(
        "To optimize the air delivery, ceiling fan should be approximately 10 feet from the ground level and 1 feet below the ceiling.",
        26,
        118
      );

      // Spacing row
      doc.setFillColor(241, 245, 249);
      doc.rect(26, 122, 160, 14, "F");
      doc.setFont("helvetica", "bold");
      doc.text("Centre distance:   1400 mm: 3m   |   1200 mm: 2.5m   |   1050 mm: 2m   |   900 mm: 1.8m", 30, 130);

      // Manufacturer Card on the Right
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(196, 60, 75, 80, 2, 2, "F");
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(8);
      doc.text("Manufactured by :", 202, 70);

      doc.setTextColor(11, 47, 92);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("LIMRA INDUSTRIES", 202, 78);

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      doc.text("# 10-1-31, Fathenagar,", 202, 85);
      doc.text("Balanagar, Hyderabad - 500018", 202, 90);
      doc.text("Telangana, India", 202, 95);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(11, 47, 92);
      doc.text("Contact No.: 8919854467", 202, 105);

      // Authorized Dealer Box
      doc.setFillColor(255, 255, 255);
      doc.rect(202, 112, 63, 22, "D");
      doc.setTextColor(148, 163, 184);
      doc.setFontSize(7.5);
      doc.text("Authorised Dealer Stamp", 233.5, 124, { align: "center" });
    }
  });

  return doc;
}
