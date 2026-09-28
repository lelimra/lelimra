import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import { LogoProvider } from "@/context/LogoContext";
import { ProductProvider } from "@/context/ProductContext";
import { AIAssistantProvider } from "@/context/AIAssistantContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductEditModal } from "@/components/ProductEditModal";
import { AIAssistantModal } from "@/components/AIAssistantModal";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { HomePage } from "@/pages/HomePage";
import { ProductsPage } from "@/pages/ProductsPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { AboutPage } from "@/pages/AboutPage";
import { WholesalePage } from "@/pages/WholesalePage";
import { DealersPage } from "@/pages/DealersPage";
import { ContactPage } from "@/pages/ContactPage";
import { CataloguePage } from "@/pages/CataloguePage";
import { WarrantyPage } from "@/pages/WarrantyPage";
import { FreightEstimatorPage } from "@/pages/FreightEstimatorPage";
import { AdminPage } from "@/pages/AdminPage";
import { ApplicationProvider } from "@/context/ApplicationContext";
import { getGeneralWhatsAppUrl } from "@/utils/whatsapp";
import { MessageSquare } from "lucide-react";

export default function App() {
  return (
    <LanguageProvider>
      <LogoProvider>
        <ProductProvider>
          <AIAssistantProvider>
            <ApplicationProvider>
              <BrowserRouter>
                <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#0b2f5c] selection:text-white pb-16 lg:pb-0">
                  {/* Sticky Header */}
                  <Navbar />

                  {/* Dynamic Route Pages */}
                  <div className="flex-grow">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/products" element={<ProductsPage />} />
                      <Route
                        path="/products/ceiling-fans"
                        element={<ProductsPage initialCategory="ceiling-fan" />}
                      />
                      <Route
                        path="/products/table-fans"
                        element={<ProductsPage initialCategory="table-fan" />}
                      />
                      <Route
                        path="/products/pedestal-fans"
                        element={<ProductsPage initialCategory="pedestal-fan" />}
                      />
                      <Route path="/products/:slug" element={<ProductDetailPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/wholesale" element={<WholesalePage />} />
                      <Route path="/applications" element={<DealersPage />} />
                      <Route path="/dealers" element={<DealersPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/catalogue" element={<CataloguePage />} />
                      <Route path="/warranty" element={<WarrantyPage />} />
                      <Route path="/freight-estimator" element={<FreightEstimatorPage />} />
                      <Route path="/logistics-estimator" element={<FreightEstimatorPage />} />
                      <Route path="/admin" element={<AdminPage />} />
                      {/* Catch-all fallback */}
                      <Route path="*" element={<HomePage />} />
                    </Routes>
                  </div>

                  {/* Desktop Floating WhatsApp Contact Button */}
                  <aside
                    className="hidden lg:flex fixed bottom-22 right-6 z-40 flex-col items-end gap-2"
                    aria-label="Direct trade quick contacts"
                  >
                    <a
                      href={getGeneralWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 hover:scale-105 text-xs font-bold"
                      aria-label="Direct WhatsApp Enquiry"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>WhatsApp Us</span>
                    </a>
                  </aside>

                  {/* Interactive AI Fan & Trade Assistant Modal */}
                  <AIAssistantModal />

                  {/* Mobile App Bottom Navigation Dock */}
                  <MobileBottomNav />

                  {/* Central In-App Product & Price Editor Modal */}
                  <ProductEditModal />

                  {/* Scroll to Top Button for Mobile & Long Pages */}
                  <ScrollToTop />

                  {/* Footer */}
                  <Footer />
                </div>
              </BrowserRouter>
            </ApplicationProvider>
          </AIAssistantProvider>
        </ProductProvider>
      </LogoProvider>
    </LanguageProvider>
  );
}
