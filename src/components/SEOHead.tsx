import React, { useEffect } from "react";
import { siteConfig } from "@/data/site";
import { Product } from "@/data/products";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  product?: Product;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl,
  product,
}) => {
  const finalTitle = title
    ? `${title} | ${siteConfig.brandName}`
    : `${siteConfig.brandName} | Ceiling Fans & Table Fans Manufacturer`;

  const finalDescription =
    description ||
    `LE LIMRA by ${siteConfig.companyName} — ceiling fans, table fans and pedestal fans for homes, businesses, retailers, wholesalers and bulk buyers in ${siteConfig.city}, ${siteConfig.state}, ${siteConfig.country}.`;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", finalDescription);

    // Update OG title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", finalTitle);

    // Update OG description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", finalDescription);

    // Schema.org Structured Data
    const scriptId = "schema-structured-data";
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = scriptId;
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }

    const jsonLd = product
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          category: product.category,
          brand: {
            "@type": "Brand",
            name: siteConfig.brandName,
          },
          manufacturer: {
            "@type": "Organization",
            name: siteConfig.companyName,
          },
          offers: {
            "@type": "Offer",
            availability: product.available
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.companyName,
          alternateName: siteConfig.brandName,
          url: window.location.origin,
          description: siteConfig.aboutText,
          address: {
            "@type": "PostalAddress",
            addressLocality: siteConfig.city,
            addressRegion: siteConfig.state,
            addressCountry: siteConfig.country,
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: siteConfig.phone,
            contactType: "customer service",
            areaServed: "IN",
          },
        };

    scriptTag.textContent = JSON.stringify(jsonLd);
  }, [finalTitle, finalDescription, product]);

  return null;
};
