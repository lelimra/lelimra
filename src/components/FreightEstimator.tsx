import React, { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  TRANSPORT_DESTINATIONS,
  FAN_PACKING_SPECS,
  VEHICLE_CAPACITIES,
  TransportDestination,
  FanPackingSpec,
  VehicleCapacity,
} from "../data/freightData";
import { siteConfig } from "@/data/site";
import {
  Truck,
  Package,
  Layers,
  Scale,
  Clock,
  MapPin,
  FileText,
  Printer,
  MessageSquare,
  CheckCircle2,
  Info,
  Building,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Boxes,
  HelpCircle,
} from "lucide-react";

interface FreightEstimatorProps {
  initialUnits?: number;
  initialState?: string;
  isCompact?: boolean;
}

export const FreightEstimator: React.FC<FreightEstimatorProps> = ({
  initialUnits = 50,
  initialState = "Telangana",
  isCompact = false,
}) => {
  const [selectedSpecId, setSelectedSpecId] = useState<string>("standard_ceiling_4in1");
  const [unitCount, setUnitCount] = useState<number>(initialUnits);
  const [selectedStateName, setSelectedStateName] = useState<string>(initialState);
  const [selectedHub, setSelectedHub] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [deliveryType, setDeliveryType] = useState<"godown" | "door">("godown");
  const [businessName, setBusinessName] = useState<string>("");
  const slipRef = useRef<HTMLDivElement>(null);

  const selectedSpec: FanPackingSpec =
    FAN_PACKING_SPECS[selectedSpecId] || FAN_PACKING_SPECS.standard_ceiling_4in1;

  const currentDestination: TransportDestination = useMemo(() => {
    return (
      TRANSPORT_DESTINATIONS.find((d: TransportDestination) => d.state === selectedStateName) ||
      TRANSPORT_DESTINATIONS[0]
    );
  }, [selectedStateName]);

  // Set default hub when state changes
  React.useEffect(() => {
    if (currentDestination.majorHubs.length > 0) {
      setSelectedHub(currentDestination.majorHubs[0]);
    }
  }, [currentDestination]);

  // Calculations
  const calculatedCartons = Math.ceil(unitCount / selectedSpec.unitsPerCarton);
  const totalActualUnits = calculatedCartons * selectedSpec.unitsPerCarton;
  const totalWeightKg = +(calculatedCartons * selectedSpec.cartonGrossWeightKg).toFixed(1);
  const totalWeightQuintals = +(totalWeightKg / 100).toFixed(2);
  const totalCbm = +(calculatedCartons * selectedSpec.cartonCbm).toFixed(3);
  const totalCft = +(calculatedCartons * selectedSpec.cartonCft).toFixed(1);

  // Door delivery surcharge multiplier (approx 15% extra for local delivery van from hub)
  const deliveryMultiplier = deliveryType === "door" ? 1.15 : 1.0;

  const minFreightPerCarton = Math.round(
    currentDestination.freightPerCartonRange[0] * deliveryMultiplier
  );
  const maxFreightPerCarton = Math.round(
    currentDestination.freightPerCartonRange[1] * deliveryMultiplier
  );

  const totalMinFreight = Math.round(calculatedCartons * minFreightPerCarton);
  const totalMaxFreight = Math.round(calculatedCartons * maxFreightPerCarton);

  const minFreightPerFan = +(totalMinFreight / totalActualUnits).toFixed(1);
  const maxFreightPerFan = +(totalMaxFreight / totalActualUnits).toFixed(1);

  // Match recommended vehicle
  const matchedVehicle: VehicleCapacity = useMemo(() => {
    if (calculatedCartons <= VEHICLE_CAPACITIES[0].maxCartons) {
      return VEHICLE_CAPACITIES[0];
    }
    if (calculatedCartons <= VEHICLE_CAPACITIES[1].maxCartons) {
      return VEHICLE_CAPACITIES[1];
    }
    if (calculatedCartons <= VEHICLE_CAPACITIES[2].maxCartons) {
      return VEHICLE_CAPACITIES[2];
    }
    return VEHICLE_CAPACITIES[3];
  }, [calculatedCartons]);

  // Generate WhatsApp inquiry text
  const generateWhatsAppMessage = () => {
    const text = `*FREIGHT & MASTER CARTON ESTIMATION - LIMRA INDUSTRIES*
---------------------------------------
🏢 *Buyer / Firm*: ${businessName.trim() || "Trade Buyer"}
📍 *Destination*: ${selectedHub}, ${selectedStateName} ${pincode ? `(PIN: ${pincode})` : ""}
🚚 *Delivery Mode*: ${deliveryType === "door" ? "Doorstep Delivery" : "Transporter Godown (To-Pay LR)"}

📦 *ORDER & PACKAGING DETAILS*:
• Fan Type: ${selectedSpec.name}
• Total Order: ${totalActualUnits} Units (${calculatedCartons} Master Cartons)
• Master Carton Ratio: ${selectedSpec.unitsPerCarton} Fans per Carton
• Total Gross Weight: ~${totalWeightKg} kg (${totalWeightQuintals} Quintals)
• Volumetric Space: ~${totalCbm} CBM (${totalCft} CFT)
• Suggested Vehicle: ${matchedVehicle.name}

🚛 *ESTIMATED FREIGHT (EX-FACTORY HYDERABAD)*:
• Approx Rate per Carton: ₹${minFreightPerCarton} - ₹${maxFreightPerCarton}
• Approx Freight per Fan: ₹${minFreightPerFan} - ₹${maxFreightPerFan}
• Est. Total Freight: ₹${totalMinFreight.toLocaleString("en-IN")} - ₹${totalMaxFreight.toLocaleString("en-IN")}
• Est. Transit Time: ${currentDestination.estimatedTransitDays}
• Preferred Carriers: ${currentDestination.recommendedCarriers.join(", ")}

Please confirm transporter LR booking, dispatch schedule, and proforma invoice.`;

    const encoded = encodeURIComponent(text);
    return `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encoded}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const volumePresets = [
    { label: "Retailer MOQ", units: 30, desc: "30 Units" },
    { label: "Authorized Dealer", units: 50, desc: "50 Units" },
    { label: "Dealer Large Lot", units: 100, desc: "100 Units" },
    { label: "Wholesaler Lot", units: 200, desc: "200 Units" },
    { label: "Super Stockist", units: 600, desc: "600 Units" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#07192f] via-[#0b2f5c] to-[#174e8c] p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/10 text-blue-200 text-xs font-semibold mb-2 backdrop-blur-xs">
              <Truck className="w-3.5 h-3.5 text-blue-300" />
              <span>Pan-India Logistics & Dispatch Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-['Cabinet_Grotesk',sans-serif] tracking-tight text-white">
              Master Carton & Transport Freight Estimator
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Calculate master carton quantities, gross shipping weight, CBM volume, and estimated road transport freight from our <strong>Hyderabad manufacturing plant (PIN 500005)</strong> to your destination hub.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <a
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Dispatch Desk</span>
            </a>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-8 space-y-8">
        {/* Step 1: Fan Model & Quantity Configuration */}
        <div>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 font-['Cabinet_Grotesk',sans-serif]">
              <span className="w-6 h-6 rounded-full bg-[#0b2f5c] text-white text-xs flex items-center justify-center font-black">
                1
              </span>
              Select Fan Packaging Category &amp; Quantity
            </h3>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              HSN: {selectedSpec.hsnCode}
            </span>
          </div>

          {/* Packaging Spec Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {(Object.values(FAN_PACKING_SPECS) as FanPackingSpec[]).map((spec: FanPackingSpec) => {
              const isSelected = selectedSpecId === spec.id;
              return (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => setSelectedSpecId(spec.id)}
                  className={`text-left p-3.5 rounded-xl border-2 transition-all relative ${
                    isSelected
                      ? "border-[#0b2f5c] bg-blue-50/50 shadow-xs"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`text-xs font-bold ${
                        isSelected ? "text-[#0b2f5c]" : "text-slate-800"
                      }`}
                    >
                      {spec.name}
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {spec.unitsPerCarton} {spec.unitsPerCarton === 1 ? "Unit" : "Units"}/Box
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-tight">
                    {spec.description}
                  </p>
                  <div className="mt-2 text-[10px] text-slate-600 flex items-center gap-2 pt-1 border-t border-slate-100">
                    <span>Wt: ~{spec.cartonGrossWeightKg} kg</span>
                    <span>•</span>
                    <span>{spec.cartonDimensionsCm.length}x{spec.cartonDimensionsCm.width}x{spec.cartonDimensionsCm.height} cm</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Volume Preset Buttons */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Trade Quantity (Units):</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {volumePresets.map((preset) => (
                  <button
                    key={preset.units}
                    type="button"
                    onClick={() => setUnitCount(preset.units)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all ${
                      unitCount === preset.units
                        ? "bg-[#0b2f5c] text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {preset.label} ({preset.desc})
                  </button>
                ))}
              </div>
            </div>

            {/* Slider & Number Input */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2">
              <div className="md:col-span-8">
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step={selectedSpec.unitsPerCarton}
                  value={unitCount}
                  onChange={(e) => setUnitCount(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b2f5c]"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-semibold">
                  <span>10 Units (Sample)</span>
                  <span>100 Units (Dealer)</span>
                  <span>300 Units (Wholesaler)</span>
                  <span>600 Units (Super Stockist)</span>
                  <span>1,000+ Units (Container)</span>
                </div>
              </div>

              <div className="md:col-span-4 flex items-center gap-2">
                <div className="relative w-full">
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={unitCount}
                    onChange={(e) => setUnitCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 text-sm font-bold text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b2f5c]"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">
                    Units
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Destination & Logistics Routing */}
        <div>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 font-['Cabinet_Grotesk',sans-serif]">
              <span className="w-6 h-6 rounded-full bg-[#0b2f5c] text-white text-xs flex items-center justify-center font-black">
                2
              </span>
              Select Delivery Destination &amp; Transporter Options
            </h3>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Origin: Hyderabad, Telangana
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* State Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Destination State *
              </label>
              <select
                value={selectedStateName}
                onChange={(e) => setSelectedStateName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-white font-medium text-slate-900"
              >
                {TRANSPORT_DESTINATIONS.map((dest: TransportDestination) => (
                  <option key={dest.state} value={dest.state}>
                    {dest.state}
                  </option>
                ))}
              </select>
            </div>

            {/* City / Hub Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Major Transport Hub / City *
              </label>
              <select
                value={selectedHub}
                onChange={(e) => setSelectedHub(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-white font-medium text-slate-900"
              >
                {currentDestination.majorHubs.map((hub: string) => (
                  <option key={hub} value={hub}>
                    {hub}
                  </option>
                ))}
              </select>
            </div>

            {/* Pincode Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Destination PIN Code (Optional)
              </label>
              <input
                type="text"
                maxLength={6}
                placeholder="e.g. 500001, 520001"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ""))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-white font-medium"
              />
            </div>

            {/* Delivery Mode */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Delivery Mode
              </label>
              <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setDeliveryType("godown")}
                  className={`py-1.5 text-xs font-bold rounded-md transition-all ${
                    deliveryType === "godown"
                      ? "bg-white text-[#0b2f5c] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Godown LR (To-Pay)
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType("door")}
                  className={`py-1.5 text-xs font-bold rounded-md transition-all ${
                    deliveryType === "door"
                      ? "bg-white text-[#0b2f5c] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Door Delivery
                </button>
              </div>
            </div>
          </div>

          {/* Transporter Recommendations Strip */}
          <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#0b2f5c] shrink-0" />
              <span className="font-bold text-slate-800">
                Recommended Road Transporters:
              </span>
              <span className="text-slate-600">
                {currentDestination.recommendedCarriers.join(" • ")}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-bold text-slate-700">
                Transit Time: {currentDestination.estimatedTransitDays}
              </span>
            </div>
          </div>
        </div>

        {/* Step 3: Real-Time Logistics Computation Cards */}
        <div>
          <div className="pb-3 mb-4 border-b border-slate-200">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 font-['Cabinet_Grotesk',sans-serif]">
              <span className="w-6 h-6 rounded-full bg-[#0b2f5c] text-white text-xs flex items-center justify-center font-black">
                3
              </span>
              Consignment &amp; Freight Breakdown (Ex-Factory Hyderabad)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Master Cartons Card */}
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-4 rounded-xl border border-blue-200 shadow-2xs">
              <div className="flex items-center justify-between text-blue-900 mb-1">
                <span className="text-xs font-extrabold uppercase tracking-wider">
                  Packaging
                </span>
                <Package className="w-4 h-4 text-blue-700" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
                {calculatedCartons}{" "}
                <span className="text-sm font-bold text-slate-600">Cartons</span>
              </div>
              <div className="text-xs text-slate-600 mt-1 font-medium">
                {totalActualUnits} Units total ({selectedSpec.unitsPerCarton} fans/box)
              </div>
            </div>

            {/* 2. Gross Weight Card */}
            <div className="bg-gradient-to-br from-emerald-50 to-slate-50 p-4 rounded-xl border border-emerald-200 shadow-2xs">
              <div className="flex items-center justify-between text-emerald-900 mb-1">
                <span className="text-xs font-extrabold uppercase tracking-wider">
                  Consignment Weight
                </span>
                <Scale className="w-4 h-4 text-emerald-700" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
                {totalWeightKg}{" "}
                <span className="text-sm font-bold text-slate-600">kg</span>
              </div>
              <div className="text-xs text-slate-600 mt-1 font-medium">
                ~ {totalWeightQuintals} Metric Quintals
              </div>
            </div>

            {/* 3. Volumetric CBM Card */}
            <div className="bg-gradient-to-br from-purple-50 to-slate-50 p-4 rounded-xl border border-purple-200 shadow-2xs">
              <div className="flex items-center justify-between text-purple-900 mb-1">
                <span className="text-xs font-extrabold uppercase tracking-wider">
                  Volume (CBM / CFT)
                </span>
                <Boxes className="w-4 h-4 text-purple-700" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
                {totalCbm}{" "}
                <span className="text-sm font-bold text-slate-600">CBM</span>
              </div>
              <div className="text-xs text-slate-600 mt-1 font-medium">
                ~ {totalCft} Cubic Feet (CFT)
              </div>
            </div>

            {/* 4. Estimated Freight Card */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-300 shadow-2xs">
              <div className="flex items-center justify-between text-amber-900 mb-1">
                <span className="text-xs font-extrabold uppercase tracking-wider">
                  Est. Total Freight
                </span>
                <Truck className="w-4 h-4 text-amber-700" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 font-['Cabinet_Grotesk',sans-serif]">
                ₹{totalMinFreight.toLocaleString("en-IN")} – ₹{totalMaxFreight.toLocaleString("en-IN")}
              </div>
              <div className="text-xs text-amber-900 mt-1 font-bold">
                ~ ₹{minFreightPerFan} – ₹{maxFreightPerFan} / fan unit
              </div>
            </div>
          </div>

          {/* Vehicle Capacity Match Card */}
          <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400">
                  Recommended Logistics Vehicle
                </span>
                <h4 className="text-sm font-bold text-white">
                  {matchedVehicle.name}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Payload: up to {matchedVehicle.payloadKg} kg (~{matchedVehicle.maxCartons} master cartons) • {matchedVehicle.bestFor}
                </p>
              </div>
            </div>
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 whitespace-nowrap self-end sm:self-center">
              Load Utilization: {Math.min(100, Math.round((calculatedCartons / matchedVehicle.maxCartons) * 100))}%
            </span>
          </div>
        </div>

        {/* Dispatch Rules, E-Way Bill & Terms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>E-Way Bill Compliance</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Mandatory under GST for consignments exceeding ₹50,000 value. Generated instantly with official Tax Invoice.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <FileText className="w-4 h-4 text-purple-600" />
              <span>Transporter LR Terms (To-Pay)</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Goods dispatched under "Freight To-Pay" where transport charges are settled directly at destination godown upon delivery.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Package className="w-4 h-4 text-emerald-600" />
              <span>5-Ply Export Packing Integrity</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Reinforced corrugated cartons with strapped binding to withstand long-haul Indian highway transit without motor damage.
            </p>
          </div>
        </div>

        {/* Action Buttons: WhatsApp Dispatch Inquiry + Print Estimate Slip + Wholesale Book */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <a
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all hover:scale-102"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Send Estimation to WhatsApp Desk</span>
            </a>

            <button
              type="button"
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-all"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print Dispatch Slip</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Link
              to={`/wholesale?quantity=${totalActualUnits}&state=${encodeURIComponent(selectedStateName)}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0b2f5c] hover:bg-[#07192f] text-white font-bold text-xs shadow transition-all hover:scale-102"
            >
              <span>Proceed to Wholesale Order</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Printable Dispatch Slip (Formatted for Print) */}
      <div className="hidden print:block p-8 bg-white text-slate-900 font-sans" ref={slipRef}>
        <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-black">{siteConfig.companyName}</h1>
            <p className="text-xs text-slate-600">Brand: {siteConfig.brandName} • Hyderabad Plant (Telangana)</p>
            <p className="text-xs text-slate-600">Contact: {siteConfig.phone} • GSTIN: {siteConfig.gstNumber || "36ABCDE1234F1Z5"}</p>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-bold text-slate-800">TRANSPORT ESTIMATION SLIP</h2>
            <p className="text-xs text-slate-500">Date: {new Date().toLocaleDateString("en-IN")}</p>
            <p className="text-xs text-slate-500">HSN Code: {selectedSpec.hsnCode}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs mb-6 border border-slate-300 p-3 rounded">
          <div>
            <p className="font-bold text-slate-700">DISPATCH ORIGIN:</p>
            <p className="font-semibold">{siteConfig.companyName} Factory</p>
            <p>Hyderabad, Telangana (PIN 500005)</p>
          </div>
          <div>
            <p className="font-bold text-slate-700">DESTINATION HUB:</p>
            <p className="font-semibold">{selectedHub}, {selectedStateName}</p>
            <p>Delivery: {deliveryType === "door" ? "Doorstep Delivery" : "Transporter Godown (To-Pay LR)"}</p>
          </div>
        </div>

        <table className="w-full text-xs border-collapse border border-slate-300 mb-6">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 p-2 text-left">Description</th>
              <th className="border border-slate-300 p-2 text-center">Packaging Ratio</th>
              <th className="border border-slate-300 p-2 text-center">Master Cartons</th>
              <th className="border border-slate-300 p-2 text-center">Total Units</th>
              <th className="border border-slate-300 p-2 text-right">Gross Weight</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 p-2 font-bold">{selectedSpec.name}</td>
              <td className="border border-slate-300 p-2 text-center">{selectedSpec.unitsPerCarton} Units/Box</td>
              <td className="border border-slate-300 p-2 text-center font-bold">{calculatedCartons}</td>
              <td className="border border-slate-300 p-2 text-center font-bold">{totalActualUnits}</td>
              <td className="border border-slate-300 p-2 text-right">{totalWeightKg} kg</td>
            </tr>
          </tbody>
        </table>

        <div className="bg-slate-50 border border-slate-200 p-3 text-xs rounded mb-6">
          <p className="font-bold">Logistics Summary:</p>
          <p>• Estimated Road Freight: ₹{totalMinFreight.toLocaleString("en-IN")} – ₹{totalMaxFreight.toLocaleString("en-IN")} (Approx ₹{minFreightPerFan} - ₹{maxFreightPerFan} / unit)</p>
          <p>• Recommended Carriers: {currentDestination.recommendedCarriers.join(", ")}</p>
          <p>• Estimated Transit: {currentDestination.estimatedTransitDays}</p>
          <p>• Volumetric: {totalCbm} CBM ({totalCft} CFT) • Load Match: {matchedVehicle.name}</p>
        </div>

        <p className="text-[10px] text-slate-500 italic">
          * Note: This is an estimated dispatch plan. Actual transporter freight rate may vary slightly based on fuel surcharges and octroi/local toll checkpoints. Goods are dispatched on "To-Pay" Lorry Receipt (LR) basis from Hyderabad.
        </p>
      </div>
    </div>
  );
};
