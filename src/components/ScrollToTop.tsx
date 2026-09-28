import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  // Scroll to top automatically when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  // Track window scroll position and calculate percentage
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (scrollTop > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-20 right-5 sm:bottom-20 sm:right-5 z-40 transition-all duration-300 transform ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="relative group flex items-center justify-center w-11 h-11 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-[#0b2f5c] text-slate-700 hover:text-white shadow-md hover:shadow-xl border border-slate-200/80 hover:border-[#0b2f5c] backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95"
        aria-label="Scroll to top of page"
        title="Scroll to top"
      >
        {/* Subtle circular SVG progress track */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
          viewBox="0 0 36 36"
        >
          <path
            className="text-slate-200 group-hover:text-blue-900/40 transition-colors"
            strokeWidth="2.5"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-[#0b2f5c] group-hover:text-amber-400 transition-colors"
            strokeDasharray={`${scrollProgress}, 100`}
            strokeWidth="2.5"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>

        <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5 relative z-10" />

        {/* Desktop hover tooltip */}
        <span className="hidden sm:group-hover:block absolute right-full mr-2.5 px-2.5 py-1 text-[11px] font-bold text-white bg-slate-900 rounded-md shadow-lg whitespace-nowrap pointer-events-none">
          Top
        </span>
      </button>
    </div>
  );
};
