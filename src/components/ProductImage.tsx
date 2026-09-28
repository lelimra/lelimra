import React, { useState } from "react";
import { Fan, Wind } from "lucide-react";

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  category?: "ceiling-fan" | "table-fan" | "pedestal-fan";
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = "w-full h-full object-cover",
  category = "ceiling-fan",
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!src || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-50 border border-slate-100 text-slate-400 p-6 rounded-lg ${className}`}
        aria-label={alt}
      >
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-2">
          {category === "ceiling-fan" ? (
            <Fan className="w-8 h-8 stroke-[1.5]" />
          ) : (
            <Wind className="w-8 h-8 stroke-[1.5]" />
          )}
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          LE LIMRA
        </span>
        <span className="text-[11px] text-slate-400 mt-0.5">Product Photo</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-50">
      {isLoading && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center">
          <Fan className="w-8 h-8 text-slate-300 animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`${className} transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
};
