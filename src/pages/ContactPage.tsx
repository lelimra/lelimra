import React, { useState } from "react";
import { siteConfig } from "@/data/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SEOHead } from "@/components/SEOHead";
import { Logo } from "@/components/Logo";
import { getGeneralWhatsAppUrl } from "@/utils/whatsapp";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Send,
  CheckCircle2,
  Building2,
} from "lucide-react";

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <>
      <SEOHead
        title="Contact Us | LE LIMRA Fans"
        description={`Contact LE LIMRA & LIMRA INDUSTRIES in ${siteConfig.city}, ${siteConfig.state}. Reach out for wholesale pricing, dealerships, or customer queries.`}
      />

      <div className="bg-slate-50 min-h-screen pb-20">
        {/* Page Top Header */}
        <div className="bg-white border-b border-slate-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: "Contact Us" }]} />
            <div className="mt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174e8c]">
                Get in Touch
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1 font-['Cabinet_Grotesk',sans-serif]">
                Contact LE LIMRA
              </h1>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Have questions about our ceiling fans, table fans, or bulk delivery? Reach out directly to our Hyderabad office.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Contact Details Left */}
            <div className="lg:col-span-5 space-y-6">
              {/* Business Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <Logo size="lg" />
                  <span className="text-xs font-semibold text-slate-500 mt-2 block">
                    {siteConfig.companyName}
                  </span>
                </div>

                <div className="space-y-4 text-xs text-slate-700">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0b2f5c] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">
                        Factory & Office Location
                      </span>
                      <span className="text-slate-600 leading-relaxed">
                        {siteConfig.address}
                      </span>
                      <span className="block text-[11px] text-slate-400 mt-0.5">
                        {siteConfig.city}, {siteConfig.state}, {siteConfig.country}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0b2f5c] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">
                        Direct Calling Phone
                      </span>
                      <a
                        href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                        className="text-[#0b2f5c] hover:underline font-semibold text-sm"
                      >
                        {siteConfig.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">
                        Official WhatsApp Business
                      </span>
                      <a
                        href={getGeneralWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 hover:underline font-semibold text-sm"
                      >
                        +{siteConfig.whatsapp}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0b2f5c] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">
                        Official Email
                      </span>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-slate-700 hover:text-[#0b2f5c] hover:underline"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0b2f5c] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">
                        Working Hours
                      </span>
                      <span className="text-slate-600">
                        Monday – Saturday: 9:30 AM – 7:30 PM
                      </span>
                      <span className="block text-slate-400 text-[11px]">
                        Sunday: Closed
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <a
                    href={getGeneralWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat Directly on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Contact Form Right */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <div className="border-b border-slate-100 pb-3 mb-6">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#0b2f5c]" />
                    Send a Message
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out this form and our customer representative will respond within 24 hours.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-3">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">
                      Message Sent Successfully
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      Thank you for contacting LE LIMRA. We will review your message and contact you promptly.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4 text-xs font-semibold text-[#0b2f5c] hover:underline"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="e.g. Mohd. Farooq"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone / Mobile <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="e.g. 9876543210"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="e.g. name@example.com"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Inquiry Type
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Product Pricing">Product Pricing</option>
                          <option value="Dealership">Dealership Opportunity</option>
                          <option value="Wholesale">Wholesale Bulk Order</option>
                          <option value="Warranty / Service">Warranty Support</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Message / Query <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Write your requirement or question here..."
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0b2f5c] bg-slate-50/50"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#0b2f5c] hover:bg-[#07192f] text-white text-xs font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
