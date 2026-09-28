import React from "react";
import { useLogo } from "@/context/LogoContext";

export interface LogoProps {
  variant?: "default" | "white" | "monochrome" | "footer";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "header" | "footer";
}

/**
 * Official LE LIMRA Brand Logo Component
 * - Matches official trademark identity with stacked "LE", airflow breeze waves, "(TM)",
 *   bold "LIMRA" wordmark with iconic red 'A' triangle, separator bar, and
 *   "QUALITY WITHOUT COMPROMISE ..." tagline.
 * - Supports custom uploaded logo via LogoContext (stored in localStorage)
 * - Vector precision for header, footer, mobile nav, and high-DPI displays
 */
export const Logo: React.FC<LogoProps> = ({
  variant = "default",
  className = "",
  size = "md",
}) => {
  const { customLogo, customLogoWhite, logoScale } = useLogo();
  const isWhite = variant === "white";
  const isMonochrome = variant === "monochrome";
  const isFooter = variant === "footer";

  // Color mappings
  const blueColor = isFooter
    ? "#38BDF8"
    : isWhite
    ? "#FFFFFF"
    : isMonochrome
    ? "currentColor"
    : "#1A3B8B";

  const redColor = isMonochrome
    ? "currentColor"
    : isFooter || isWhite
    ? "#EF4444"
    : "#E31E24";

  const waveColor = isFooter
    ? "#94A3B8"
    : isWhite
    ? "#CBD5E1"
    : isMonochrome
    ? "currentColor"
    : "#94A3B8";

  const separatorColor = isFooter
    ? "#475569"
    : isWhite
    ? "#CBD5E1"
    : isMonochrome
    ? "currentColor"
    : "#94A3B8";

  const taglineColor = isFooter
    ? "#94A3B8"
    : isWhite
    ? "#E2E8F0"
    : isMonochrome
    ? "currentColor"
    : "#475569";

  // Responsive height scale
  const heightMap: Record<string, string> = {
    sm: "h-8 sm:h-9",
    md: "h-10 sm:h-12",
    header: "h-10 sm:h-12 md:h-13 lg:h-14",
    footer: "h-16 sm:h-20 md:h-24",
    lg: "h-14 sm:h-16 md:h-18",
    xl: "h-20 sm:h-24 md:h-28",
  };

  const selectedHeight = heightMap[size] || heightMap.md;
  const scaleRatio = (logoScale || 100) / 100;
  const scaleStyle =
    scaleRatio !== 1
      ? {
          transform: `scale(${scaleRatio})`,
          transformOrigin: "left center",
        }
      : undefined;

  // Custom logo override if user uploaded through Logo Upload modal
  if (customLogo) {
    if ((isWhite || isFooter) && customLogoWhite) {
      return (
        <div
          className={`inline-flex items-center select-none shrink-0 transition-transform duration-150 ${className}`}
          style={scaleStyle}
        >
          <img
            src={customLogoWhite}
            alt="LE LIMRA Logo"
            className={`${selectedHeight} w-auto max-w-full object-contain block`}
          />
        </div>
      );
    }

    return (
      <div
        className={`inline-flex items-center select-none shrink-0 transition-transform duration-150 ${className}`}
        style={scaleStyle}
      >
        <img
          src={customLogo}
          alt="LE LIMRA Logo"
          className={`${selectedHeight} w-auto max-w-full object-contain block`}
        />
      </div>
    );
  }

  // Official Brand Vector Logo matching uploaded image
  return (
    <div
      className={`inline-flex items-center select-none shrink-0 transition-transform duration-150 ${className}`}
      style={scaleStyle}
    >
      <svg
        viewBox="0 0 520 250"
        className={`${selectedHeight} w-auto aspect-[520/250] block`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="LE LIMRA Logo - Quality Without Compromise"
      >
        {/* ================= TOP SECTION: "LE", AIRFLOW WAVES & (TM) ================= */}
        {/* "LE" Section (Slanted aerodynamic styling) */}
        <g id="logo-top-le">
          {/* Letter L */}
          <path
            fill={blueColor}
            d="M 52 32 L 72 32 L 56 74 L 88 74 L 84 86 L 36 86 L 40 70 Z"
          />

          {/* Letter E */}
          <path
            fill={blueColor}
            d="M 94 32 L 138 32 L 134 44 L 110 44 L 106 54 L 128 54 L 124 66 L 102 66 L 98 74 L 130 74 L 126 86 L 80 86 Z"
          />

          {/* E Center Red Accent */}
          <polygon
            fill={redColor}
            points="108,50 134,50 130,62 104,62"
          />
        </g>

        {/* Aerodynamic Airflow Waves */}
        <g id="logo-wind-waves" stroke={waveColor} strokeWidth="4.5" strokeLinecap="round" fill="none">
          <path d="M 270 54 C 295 42, 335 72, 380 50" />
          <path d="M 275 66 C 300 54, 340 84, 385 62" />
        </g>

        {/* (TM) Trademark Badge */}
        <g id="logo-trademark" transform="translate(402, 58)">
          <circle cx="11" cy="0" r="11" stroke={blueColor} strokeWidth="1.8" fill="none" />
          <text
            x="11"
            y="3.5"
            fill={blueColor}
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="8.5"
            fontWeight="900"
            textAnchor="middle"
          >TM</text>
        </g>

        {/* ================= CENTER WORDMARK: "LIMRA" ================= */}
        <g id="logo-main-limra">
          {/* Letter L */}
          <path
            fill={blueColor}
            d="M 36 100 L 64 100 L 64 164 L 95 164 L 95 186 L 36 186 Z"
          />

          {/* Letter I */}
          <rect fill={blueColor} x="106" y="100" width="27" height="86" rx="1" />

          {/* Letter M */}
          <path
            fill={blueColor}
            d="M 144 100 L 171 100 L 191 148 L 211 100 L 238 100 L 238 186 L 213 186 L 213 134 L 197 172 L 185 172 L 169 134 L 169 186 L 144 186 Z"
          />

          {/* Letter R */}
          <path
            fill={blueColor}
            d="M 249 100 L 298 100 C 318 100 328 110 328 126 C 328 138 320 148 305 151 L 331 186 L 301 186 L 279 154 L 275 154 L 275 186 L 249 186 Z M 275 119 L 275 137 L 294 137 C 300 137 304 134 304 128 C 304 122 300 119 294 119 Z"
          />

          {/* Letter A Base */}
          <path
            fill={blueColor}
            d="M 382 100 L 424 186 L 396 186 L 387 166 L 377 166 L 368 186 L 340 186 Z M 382 128 L 372 150 L 392 150 Z"
          />

          {/* Letter A Red Triangle Inset (Iconic brand mark) */}
          <polygon
            fill={redColor}
            points="382,142 402,186 362,186"
          />
        </g>

        {/* ================= BOTTOM SECTION: SEPARATOR & TAGLINE ================= */}
        {/* Horizontal Separator Bar */}
        <rect
          fill={separatorColor}
          x="36"
          y="198"
          width="388"
          height="3.5"
          rx="1"
        />

        {/* Tagline: "QUALITY WITHOUT COMPROMISE ..." */}
        <text
          x="230"
          y="222"
          fill={taglineColor}
          fontFamily="'Cabinet Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontSize="13"
          fontWeight="800"
          letterSpacing="2.8"
          textAnchor="middle"
        >QUALITY WITHOUT COMPROMISE ...</text>
      </svg>
    </div>
  );
};
