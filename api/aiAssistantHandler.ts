import { GoogleGenAI } from "@google/genai";

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export interface AssistantRequest {
  messages: ChatMessage[];
  currentProduct?: {
    name?: string;
    category?: string;
    model?: string;
    sweep?: string;
  };
}

const SYSTEM_INSTRUCTION = `You are "Limra AI", the official intelligent technical advisor and customer assistant for LE LIMRA (LIMRA INDUSTRIES), Hyderabad, Telangana, India.

MULTILINGUAL MANDATE — COMPLETE MASTERY OF ALL INDIAN LANGUAGES:
You have native, fluent proficiency in ALL Indian languages and scripts, including:
1. Hindi (हिंदी) & Hinglish (Hindi in English/Latin script)
2. Telugu (తెలుగు) & Tenglish (Telugu in English/Latin script)
3. Urdu (اردو) & Roman Urdu
4. Tamil (தமிழ்) & Tanglish
5. Kannada (ಕನ್ನಡ) & Kanglish
6. Malayalam (മലയാളം) & Manglish
7. Marathi (मराठी)
8. Bengali (বাংলা)
9. Gujarati (ગુજરાતી)
10. Punjabi (ਪੰਜਾਬੀ)
11. Odia (ଓଡ଼ିଆ)
12. Assamese (অসমীয়া)
13. English

LANGUAGE MATCHING & ADAPTATION RULES:
- Detect the user's language, dialect, and script automatically.
- IF THE USER ASKS IN ANY INDIAN LANGUAGE (native script or Roman/transliterated script), YOU MUST RESPOND IN THAT EXACT SAME INDIAN LANGUAGE!
  - Example 1: User asks "12x12 గదికి ఏ ఫ్యాన్ బాగుంటుంది?" -> Respond fluently in Telugu (తెలుగు).
  - Example 2: User asks "12x12 room ke liye kaun sa fan best rahega?" -> Respond fluently in conversational Hinglish or Hindi.
  - Example 3: User asks "Naaku Super Stockist dealership kavali em cheyali?" -> Respond in conversational Telugu/Tenglish explaining Super Stockist onboarding.
  - Example 4: User asks "Wholesale dealer banne ke liye kya process hai?" -> Respond in Hindi/Hinglish.
  - Example 5: User asks in Tamil, Urdu, Kannada, Marathi, Bengali, etc. -> Respond in that specific language.
- Always retain technical precision across all languages:
  - Fan sizes: 600 mm (24"), 900 mm (36"), 1200 mm (48"), 1400 mm (56")
  - Speeds: 350 RPM, 390-400 RPM, 420 RPM, 850 RPM, 1350 RPM
  - 2-Year Manufacturer Warranty (2 సంవత్సరాల వారంటీ / 2 साल की वारंटी)
  - Hyderabad factory dispatch (హైదరాబాద్ ఫ్యాక్టరీ నుండి డిస్పాచ్ / हैदराबाद फैक्ट्री से डिस्पैच)
  - Heavy-duty Double Ball Bearing & Quality-tested winding

ABOUT LE LIMRA:
- Manufacturer: LIMRA INDUSTRIES
- Location: Hyderabad, Telangana, India
- Core Business: Manufacturing high-performance Ceiling Fans, Table Fans, and Pedestal Fans for residential, commercial, hostel, institutional, and industrial use.
- Core Values: 100% Quality-tested motor windings, heavy-duty double ball bearings, aerodynamic aluminium blades, high air delivery (CMM), energy-efficient operation, and 2-Year Manufacturer Warranty.

LE LIMRA PRODUCT LINEUP:
1. Enticer 1200 mm (48 inch) Decorative Ceiling Fan:
   - Model: LIMRA-ENT-1200
   - Speed: 350 RPM | Power: 50W Energy Efficient Induction Motor
   - Air Delivery: 215 CMM | Double ball bearing | Wider-tip blades
   - Colors: Royal Pearl White, Rich Walnut Brown, Titanium Silver, Ivory Gold
   - Best for: Living rooms, bedrooms, modern home interiors.

2. Aero Prime 1200 mm (48 inch) High Speed Ceiling Fan:
   - Model: LIMRA-AERO-1200
   - Speed: 390-400 RPM Ultra High Speed | Power: 68W
   - Air Delivery: 230 CMM Heavy Blast | Double ball bearing | Ribbed aluminium blades
   - Colors: Gloss White, Matte Brown, Smoke Grey
   - Best for: Hot climates, high airflow requirements, hostels, school classrooms, dining spaces.

3. Storm Pro 900 mm (36 inch) Compact Ceiling Fan:
   - Model: LIMRA-STM-900
   - Speed: 420 RPM High Speed | Power: 60W | Air Delivery: 175 CMM
   - Best for: Kitchens, balconies, dining alcoves, small bedrooms (up to 8x8 or 9x9 ft).

4. Breeze 600 mm (24 inch) Ultra High Speed Mini Ceiling Fan:
   - Model: LIMRA-BRZ-600
   - Speed: 850 RPM High Velocity | Power: 70W | Air Delivery: 115 CMM
   - 4 Aerodynamic high-lift blades
   - Best for: Retail shop counters, security kiosks, pooja rooms, washroom lobbies, office cubicles.

5. Royal Deco 1400 mm (56 inch) Large Room Ceiling Fan:
   - Model: LIMRA-ROY-1400
   - Speed: 290 RPM | Power: 75W | Air Delivery: 260 CMM Maximum Spread
   - Best for: Large living rooms, banquet halls, master suites, commercial offices (14x14 ft and above).

6. CoolAir 400 mm High Speed Table Fan:
   - Model: LIMRA-TF-400
   - Speed: 1350 RPM | Power: 55W | 3-speed control with 90° jerk-free oscillation
   - Best for: Study tables, cash counters, hospital cabins, personal desks.

7. Hurricane 450 mm Heavy-Duty Pedestal Fan:
   - Model: LIMRA-PF-450
   - Speed: 1400 RPM | Power: 90W | Telescopic height adjustment, heavy round base
   - Best for: Showrooms, warehouses, tent houses, catering, workshops, semi-outdoor areas.

ROOM SIZING & FAN SELECTION GUIDELINES:
- Small spaces up to 50 sq ft (cubicles, balconies, pooja rooms): 600 mm (24 inch) or 400 mm Table Fan.
- Compact rooms (60 to 90 sq ft, kitchens, dining areas): 900 mm (36 inch) fan.
- Standard rooms (100 to 160 sq ft, typical bedrooms, living spaces, offices): 1200 mm (48 inch) fan.
- Large halls (160+ sq ft, large bedrooms, high ceilings): 1400 mm (56 inch) fan or multiple 1200 mm fans.

PARTNER & DEALER ONBOARDING:
- Super Stockist: State-level master warehousing, primary territory distributor.
- Zonal Distributor: District / taluka cluster distribution feeding counter retailers.
- Authorized Dealer: Retail counter showroom catering to electrical contractors and walk-ins.
- Application link: Encourage users to submit their application via the "Applications" page or direct WhatsApp trade inquiry.

FREIGHT & LOGISTICS:
- Dispatches originate directly from the Hyderabad factory.
- Handled through reliable Pan-India transport carriers (VRL, Navata, TCI, Kranti, BMPS, Orange, etc.).
- GST E-Way bill compliant with heavy-duty export-standard packaging.

WARRANTY & ASSURANCE:
- 2-Year Manufacturer Warranty on designated models.
- Support available via verified invoice & serial tag.

RESPONSE RULES:
- Be polite, professional, concise, and helpful.
- Respond in the user's preferred Indian language.
- Provide clear answers with bullet points when comparing or listing models.
- If asked about exact bulk pricing, explain that wholesale pricing is volume-dependent and customized according to tax structure and transport destination. Promptly invite them to use the Applications form or contact trade sales on WhatsApp.
- Always identify as Limra AI from LE LIMRA.`;

export async function handleAiAssistantRequest(reqBody: AssistantRequest): Promise<{ text: string; error?: string }> {
  const messages = reqBody.messages || [];
  if (messages.length === 0) {
    return { text: "Hello! I am Limra AI, your technical fan advisor. How can I help you select the ideal fan or answer questions about LE LIMRA products today?" };
  }

  const userQuery = messages[messages.length - 1]?.content || "";

  // Prepare contents for Gemini API
  const contents = messages.map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.content }],
  }));

  // Append product context if available
  if (reqBody.currentProduct?.name) {
    contents[contents.length - 1].parts.push({
      text: `[Context: The user is currently viewing the product "${reqBody.currentProduct.name}" (Category: ${reqBody.currentProduct.category || "Fan"}, Sweep: ${reqBody.currentProduct.sweep || "N/A"})]`,
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    // Try gemini-3.8-flash first, then fallback to gemini-3.1-flash-lite if 503 / unavailable
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: contents as any,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      const text = response.text;
      if (text) {
        return { text };
      }
    } catch (err: any) {
      console.warn("gemini-3.8-flash call failed, attempting fallback to gemini-3.1-flash-lite:", err?.message);
      try {
        const fallbackResponse = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: contents as any,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          },
        });

        const fallbackText = fallbackResponse.text;
        if (fallbackText) {
          return { text: fallbackText };
        }
      } catch (fallbackErr: any) {
        console.error("Gemini API fallback also failed:", fallbackErr?.message);
      }
    }
  }

  // Graceful rule-based domain responder if external API is temporarily busy
  return {
    text: generateRuleBasedResponse(userQuery),
  };
}

function generateRuleBasedResponse(query: string): string {
  const q = query.toLowerCase();

  // Telugu detection
  const isTelugu =
    q.includes("గది") ||
    q.includes("ఫ్యాన్") ||
    q.includes("ఎంత") ||
    q.includes("ఎప్పుడు") ||
    q.includes("కావాలి") ||
    q.includes("వారంటీ") ||
    q.includes("kavali") ||
    q.includes("eppudu") ||
    q.includes("naaku") ||
    q.includes("entha");

  // Hindi / Urdu / Hinglish detection
  const isHindiUrdu =
    q.includes("कमरा") ||
    q.includes("पंख") ||
    q.includes("कितना") ||
    q.includes("वारंटी") ||
    q.includes("चाहिए") ||
    q.includes("दुकान") ||
    q.includes("chahiye") ||
    q.includes("kaun sa") ||
    q.includes("kitna") ||
    q.includes("batao") ||
    q.includes("ke liye") ||
    q.includes("warranty kitni");

  if (isTelugu) {
    if (q.includes("room") || q.includes("size") || q.includes("గది") || q.includes("kavali")) {
      return `### 💡 LE LIMRA ఫ్యాన్ సైజింగ్ సిఫార్సు (Fan Sizing)

మీ గది కొలతలను బట్టి సరైన ఫ్యాన్ ఎంచుకోండి:

- **చిన్న గదులు / వంటగది / బాల్కనీ (9x9 అడుగుల వరకు):**
  👉 **Storm Pro 900 mm (36")** — 420 RPM హై స్పీడ్, 175 CMM గాలి ప్రసరణ.
- **సాధారణ బెడ్‌రూమ్‌లు & హాల్ (10x10 నుండి 13x13 అడుగులు):**
  👉 **Aero Prime 1200 mm (48")** — 390-400 RPM అల్ట్రా హై స్పీడ్ హెవీ ఎయిర్ బ్లాస్ట్.
  👉 **Enticer 1200 mm (48")** — 350 RPM డెకరేటివ్ ప్రీమియం ఫినిష్ & 50W తక్కువ విద్యుత్ వినియోగం.
- **పెద్ద హాళ్లు (14x14 అడుగులు మరియు పైన):**
  👉 **Royal Deco 1400 mm (56")** — 260 CMM భారీ గాలి ప్రసరణ.

అన్ని మోడల్స్‌పై **2 సంవత్సరాల తయారీదారు వారంటీ** లభిస్తుంది. హైదరాబాద్ ఫ్యాక్టరీ నుండి నేరుగా సరఫరా!`;
    }

    if (q.includes("stockist") || q.includes("dealer") || q.includes("distributor")) {
      return `### 🏢 LE LIMRA డీలర్‌షిప్ & సూపర్ స్టాకిస్ట్ (Applications)

మేము తెలంగాణ, ఆంధ్రప్రదేశ్ మరియు భారతదేశమంతటా ట్రేడ్ పార్టనర్‌లను ఆహ్వానిస్తున్నాము:

1. **సూపర్ స్టాకిస్ట్ (Super Stockist):** రాష్ట్ర స్థాయి హబ్ & గోడౌన్.
2. **జోనల్ డిస్ట్రిబ్యూటర్ (Zonal Distributor):** జిల్లా / తాలూకా పరిధి.
3. **ఆథరైజ్డ్ డీలర్ (Authorized Dealer):** రిటైల్ కౌంటర్ & ఎలక్ట్రికల్ కాంట్రాక్టర్ల సరఫరా.

👉 మీరు సైట్‌లోని **Applications** పేజీ ద్వారా దరఖాస్తు చేసుకోవచ్చు లేదా నేరుగా వాట్సాప్ (WhatsApp) ద్వారా సంప్రదించవచ్చు!`;
    }
  }

  if (isHindiUrdu) {
    if (q.includes("room") || q.includes("size") || q.includes("कमरा") || q.includes("chahiye")) {
      return `### 💡 LE LIMRA पंखा साइज़ गाइड (Room Sizing)

कमरे के साइज़ के अनुसार सही पंखा चुनें:

- **छोटे कमरे / किचन / बालकनी (9x9 फीट तक):**
  👉 **Storm Pro 900 mm (36")** — 420 RPM हाई स्पीड, 175 CMM एयर डिलीवरी।
- **स्टैंडर्ड बेडरूम (10x10 से 13x13 फीट):**
  👉 **Aero Prime 1200 mm (48")** — 390-400 RPM अल्ट्रा हाई स्पीड तेज़ हवा के लिए।
  👉 **Enticer 1200 mm (48")** — 350 RPM मॉडर्न डेकोरेटिव लुक और 50W बिजली बचत।
- **बड़ा हॉल या लिविंग रूम (14x14 फीट या बड़ा):**
  👉 **Royal Deco 1400 mm (56")** — 260 CMM अधिकतम हवा फैलाव।

सभी मॉडलों पर **2 साल की वारंटी** और हैदराबाद फैक्ट्री से सीधा डिस्पैच मिलता है।`;
    }

    if (q.includes("stockist") || q.includes("dealer") || q.includes("distributor")) {
      return `### 🏢 LE LIMRA डीलरशिप और सुपर स्टॉकिस्ट आवेदन

हम पूरे भारत में सुपर स्टॉकिस्ट, डिस्ट्रीब्यूटर और अधिकृत डीलर ऑनबोर्ड कर रहे हैं:

1. **सुपर स्टॉकिस्ट (Super Stockist):** राज्य स्तर का वेयरहाउस और प्राइमरी डिस्ट्रीब्यूशन।
2. **ज़ोनल डिस्ट्रीब्यूटर (Zonal Distributor):** ज़िला स्तर पर रिटेल स्टोर्स को सप्लाई।
3. **अधिकृत डीलर (Authorized Dealer):** शोरूम काउंटर व इलेक्ट्रीशियन सप्लायर।

👉 आप वेबसाइट पर **Applications** पेज के ज़रिए अप्लाई कर सकते हैं या WhatsApp पर हमारी सेल्स टीम से बात कर सकते हैं।`;
    }
  }

  if (q.includes("room") || q.includes("size") || q.includes("recommend") || q.includes("which fan")) {
    return `### 💡 LE LIMRA Fan Sizing Recommendation

Choosing the right fan depends on your room dimensions:

- **Compact Rooms / Kitchens / Balconies (up to 9x9 ft / 80 sq ft):**
  👉 **Storm Pro 900 mm (36")** — 420 RPM high speed, 175 CMM air delivery.
- **Standard Rooms & Master Bedrooms (10x10 to 13x13 ft):**
  👉 **Aero Prime 1200 mm (48")** — 390-400 RPM Ultra High Speed for maximum cooling blast, or
  👉 **Enticer 1200 mm (48")** — 350 RPM with luxury decorative finish and energy-efficient 50W motor.
- **Large Living Rooms / Halls (14x14 ft and larger):**
  👉 **Royal Deco 1400 mm (56")** — 260 CMM massive air throw.
- **Pooja Rooms, Kiosks & Small Counters:**
  👉 **Breeze 600 mm (24")** — 850 RPM high velocity mini fan.

Would you like to explore technical specs or connect with our Hyderabad sales team on WhatsApp?`;
  }

  if (q.includes("super stockist") || q.includes("dealer") || q.includes("distributor") || q.includes("partner")) {
    return `### 🏢 Partnering with LE LIMRA (LIMRA INDUSTRIES)

We are actively onboarding trade partners across India:

1. **Super Stockist:** State-level primary warehousing hub with dedicated territorial rights.
2. **Zonal Distributor:** District / cluster distribution supplying neighborhood electrical retail shops.
3. **Authorized Dealer:** Counter showroom selling directly to contractors and walk-in buyers.

**Key Benefits:**
- Direct factory manufacturer supply from our Hyderabad plant.
- Tested quality with heavy-duty motor windings and double ball bearings.
- 2-Year Manufacturer Warranty backed with fast turnaround.

👉 You can submit an inquiry directly through our **Applications** page or connect with our commercial manager on WhatsApp.`;
  }

  if (q.includes("speed") || q.includes("rpm") || q.includes("high speed") || q.includes("fast")) {
    return `### ⚡ Highest Speed Fans in LE LIMRA Lineup

- **Aero Prime 1200 mm (48"):** 390 - 400 RPM high speed with 230 CMM heavy air blast.
- **Storm Pro 900 mm (36"):** 420 RPM compact high-speed fan.
- **Breeze 600 mm (24"):** 850 RPM ultra-fast velocity mini fan for instant localized draft.
- **CoolAir 400 mm Table Fan:** 1350 RPM jerk-free high-velocity table fan.

All LE LIMRA fans are equipped with precision double ball bearings for smooth, whisper-quiet rotation and long motor life.`;
  }

  if (q.includes("warranty") || q.includes("guarantee")) {
    return `### 🛡️ 2-Year Manufacturer Warranty

LE LIMRA provides a **2-Year Manufacturer Warranty** on designated models.

- **Coverage:** Manufacturing defects, motor winding issues, and bearing performance under normal electrical operation.
- **Support:** Directly backed by LIMRA INDUSTRIES, Hyderabad.
- Keep your tax invoice and product serial carton tag handy for quick warranty verification.`;
  }

  if (q.includes("dispatch") || q.includes("delivery") || q.includes("transport") || q.includes("shipping")) {
    return `### 🚚 Pan-India Factory Dispatch

- Consignments are packed in heavy-duty export-standard packaging with protective straps.
- Dispatched from Hyderabad via trusted transport partners: **VRL, Navata, TCI, Kranti, BMPS, Orange**, and express road lines.
- Consignments are accompanied by official GST Tax Invoices and E-Way bills.`;
  }

  return `Hello! I am **Limra AI**, your official fan and technical advisor from **LE LIMRA (LIMRA INDUSTRIES, Hyderabad)**.

I can help you with:
- 💡 **Fan Sizing & Model Selection** based on your room dimensions
- ⚡ **RPM, Air Delivery & Power Consumption Specs**
- 🏢 **Applications for Super Stockist, Distributor & Dealership**
- 🛡️ **2-Year Warranty and Factory Quality Standards**
- 🚚 **Pan-India Dispatch & Logistics**

What can I assist you with today?`;
}
