import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import { Product, ProductCategory } from "@/data/products";
import { ProductImage } from "@/components/ProductImage";
import { useLanguage } from "@/context/LanguageContext";
import {
  Search,
  X,
  ArrowRight,
  Fan,
  Wind,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Folder,
  Tag,
  CornerDownLeft,
  ChevronRight,
  Layers,
} from "lucide-react";

interface NavSearchBarProps {
  variant?: "navbar" | "mobile" | "compact" | "page";
  onCloseMobile?: () => void;
  className?: string;
  initialQuery?: string;
  onQueryChange?: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
  onSelectCategory?: (category: ProductCategory) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

interface CategoryInfo {
  id: ProductCategory;
  name: string;
  path: string;
  icon: React.ElementType;
  keywords: string[];
  description: string;
}

const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: "ceiling-fan",
    name: "Ceiling Fans",
    path: "/products/ceiling-fans",
    icon: Fan,
    keywords: ["ceiling", "roof", "room", "hall", "1200mm", "aeroflow", "jazz", "enticer", "avencer", "prime", "zest", "bldc", "decorative"],
    description: "Premium high-airflow 1200mm & decorative ceiling models",
  },
  {
    id: "table-fan",
    name: "Table Fans",
    path: "/products/table-fans",
    icon: Wind,
    keywords: ["table", "desk", "portable", "compact", "breeze", "400mm", "office", "study"],
    description: "Compact & powerful portable cooling fans",
  },
  {
    id: "pedestal-fan",
    name: "Pedestal Fans",
    path: "/products/pedestal-fans",
    icon: ShieldCheck,
    keywords: ["pedestal", "stand", "standing", "floor", "tall", "oscillating", "heavy duty", "large space"],
    description: "Heavy-duty standing fans for large spaces and halls",
  },
];

const POPULAR_SEARCHES = [
  "Avencer Prime",
  "Enticer 1200mm",
  "Ceiling Fans",
  "Table Fans",
  "Pedestal Fans",
  "1200 mm Sweep",
  "50 Watts Motor",
  "Double Ball Bearing",
  "High Speed 390 RPM",
  "Jazz Decorative",
];

// Helper to highlight matching text
export const HighlightText: React.FC<{ text: string; highlight: string; className?: string }> = ({
  text,
  highlight,
  className = "font-black text-[#0b2f5c] bg-blue-100/90 rounded-xs px-0.5",
}) => {
  if (!highlight || !highlight.trim()) {
    return <span>{text}</span>;
  }

  const queryWords = highlight
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (queryWords.length === 0) return <span>{text}</span>;

  // Escape regex special characters
  const escaped = queryWords.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className={className}>
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

export const NavSearchBar: React.FC<NavSearchBarProps> = ({
  variant = "navbar",
  onCloseMobile,
  className = "",
  initialQuery = "",
  onQueryChange,
  onSearchSubmit,
  onSelectCategory,
  placeholder,
  autoFocus = false,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNavIndex, setSelectedNavIndex] = useState<number>(-1);
  const { products } = useProducts();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync with initial query if changed from parent
  useEffect(() => {
    if (initialQuery !== undefined && initialQuery !== query) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSelectedNavIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 1. Compute matching categories in real-time
  const matchingCategories = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    return CATEGORIES_DATA.map((cat) => {
      const categoryProducts = products.filter((p) => p.category === cat.id);
      const totalInCat = categoryProducts.length;

      // Check if category name, keywords or description directly matches query
      const nameMatch = cat.name.toLowerCase().includes(q);
      const idMatch = cat.id.toLowerCase().includes(q);
      const keywordMatch = cat.keywords.some((k) => k.toLowerCase().includes(q));
      const descMatch = cat.description.toLowerCase().includes(q);

      // Also check if products inside this category match the query
      const matchingProdsInCat = categoryProducts.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          (p.model && p.model.toLowerCase().includes(q)) ||
          p.features.some((f) => f.toLowerCase().includes(q))
        );
      });

      const isRelevant =
        nameMatch ||
        idMatch ||
        keywordMatch ||
        descMatch ||
        matchingProdsInCat.length > 0;

      return {
        ...cat,
        totalCount: totalInCat,
        matchCount: matchingProdsInCat.length,
        isDirectMatch: nameMatch || idMatch || keywordMatch,
        isRelevant,
      };
    })
      .filter((cat) => cat.isRelevant)
      .sort((a, b) => {
        // Direct category name match comes first
        if (a.isDirectMatch && !b.isDirectMatch) return -1;
        if (!a.isDirectMatch && b.isDirectMatch) return 1;
        return b.matchCount - a.matchCount;
      });
  }, [query, products]);

  // 2. Compute matching products in real-time with smart relevance ranking
  const matchingProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    const scored = products.map((product) => {
      const name = product.name.toLowerCase();
      const model = (product.model || "").toLowerCase();
      const cat = product.category.toLowerCase();
      const size = (product.specifications.size || "").toLowerCase();
      const desc = product.shortDescription.toLowerCase();
      const features = product.features.join(" ").toLowerCase();

      let score = 0;
      if (name.startsWith(q)) score += 100;
      else if (name.includes(q)) score += 60;

      if (model.startsWith(q)) score += 80;
      else if (model.includes(q)) score += 50;

      if (size.includes(q)) score += 40;
      if (cat.includes(q)) score += 30;
      if (features.includes(q)) score += 20;
      if (desc.includes(q)) score += 10;

      return { product, score };
    });

    return scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.product)
      .slice(0, 6); // Top 6 product suggestions
  }, [query, products]);

  // 3. Matching tags / keywords
  const matchingTags = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return POPULAR_SEARCHES.filter((tag) => tag.toLowerCase().includes(q) && tag.toLowerCase() !== q).slice(0, 4);
  }, [query]);

  // Flattened navigable list for keyboard navigation
  const navigableItems = useMemo(() => {
    const items: Array<{
      type: "category" | "product" | "tag" | "view-all";
      data?: any;
      id: string;
    }> = [];

    matchingCategories.forEach((cat) => {
      items.push({ type: "category", data: cat, id: `cat-${cat.id}` });
    });

    matchingProducts.forEach((prod) => {
      items.push({ type: "product", data: prod, id: `prod-${prod.id}` });
    });

    matchingTags.forEach((tag) => {
      items.push({ type: "tag", data: tag, id: `tag-${tag}` });
    });

    if (query.trim()) {
      items.push({ type: "view-all", data: query.trim(), id: "view-all-results" });
    }

    return items;
  }, [matchingCategories, matchingProducts, matchingTags, query]);

  // Submit search query
  const handleSearchSubmit = useCallback(
    (searchVal: string) => {
      const finalQuery = searchVal.trim();
      if (!finalQuery) return;
      setIsOpen(false);
      setSelectedNavIndex(-1);
      if (onCloseMobile) onCloseMobile();
      if (onSearchSubmit) {
        onSearchSubmit(finalQuery);
      } else {
        navigate(`/products?q=${encodeURIComponent(finalQuery)}`);
      }
    },
    [navigate, onCloseMobile, onSearchSubmit]
  );

  // Select category suggestion
  const handleSelectCategory = (cat: CategoryInfo) => {
    setIsOpen(false);
    setSelectedNavIndex(-1);
    if (onCloseMobile) onCloseMobile();
    if (onSelectCategory) {
      onSelectCategory(cat.id);
    } else {
      navigate(cat.path);
    }
  };

  // Select product suggestion
  const handleSelectProduct = (product: Product) => {
    setIsOpen(false);
    setSelectedNavIndex(-1);
    if (onCloseMobile) onCloseMobile();
    navigate(`/products/${product.slug}`);
  };

  // Select keyword tag
  const handleSelectTag = (tag: string) => {
    setQuery(tag);
    if (onQueryChange) onQueryChange(tag);
    handleSearchSubmit(tag);
  };

  // Keyboard Navigation Handler (ArrowUp, ArrowDown, Enter, Escape)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setIsOpen(true);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedNavIndex((prev) =>
        prev < navigableItems.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedNavIndex((prev) =>
        prev > 0 ? prev - 1 : navigableItems.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedNavIndex >= 0 && navigableItems[selectedNavIndex]) {
        const item = navigableItems[selectedNavIndex];
        if (item.type === "category") {
          handleSelectCategory(item.data);
        } else if (item.type === "product") {
          handleSelectProduct(item.data);
        } else if (item.type === "tag") {
          handleSelectTag(item.data);
        } else if (item.type === "view-all") {
          handleSearchSubmit(query);
        }
      } else {
        handleSearchSubmit(query);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSelectedNavIndex(-1);
      inputRef.current?.blur();
    }
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    if (variant === "compact") return "Search fans...";
    if (variant === "page") return "Search fan models (e.g. Avencer, Jazz, 1200mm) or categories...";
    return "Search fans, categories, models...";
  };

  const hasMatches = matchingCategories.length > 0 || matchingProducts.length > 0 || matchingTags.length > 0;

  return (
    <div
      ref={containerRef}
      className={`relative ${className} ${
        variant === "navbar"
          ? "w-48 md:w-56 lg:w-64"
          : variant === "page"
          ? "w-full"
          : "w-full"
      }`}
    >
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            const val = e.target.value;
            setQuery(val);
            setIsOpen(true);
            setSelectedNavIndex(-1);
            if (onQueryChange) onQueryChange(val);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholder()}
          className={`w-full pl-9 pr-8 transition-all duration-150 border focus:outline-none ${
            variant === "page"
              ? "py-2.5 sm:py-3 text-sm rounded-xl border-slate-200 focus:border-[#0b2f5c] focus:ring-2 focus:ring-blue-100 bg-slate-50/70 focus:bg-white text-slate-800 placeholder:text-slate-400 shadow-2xs"
              : "py-1.5 sm:py-2 text-xs sm:text-sm bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder:text-slate-400 rounded-lg border-slate-200/80 focus:border-[#0b2f5c] focus:ring-2 focus:ring-blue-100"
          }`}
          aria-label="Search fan models and categories"
          autoComplete="off"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSelectedNavIndex(-1);
              inputRef.current?.focus();
              if (onQueryChange) onQueryChange("");
              if (onSearchSubmit) onSearchSubmit("");
            }}
            className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
            title="Clear search"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Real-time Search Suggestions Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-2xl border border-slate-200/90 overflow-hidden z-50 animate-in fade-in-50 duration-150 max-h-[480px] overflow-y-auto divide-y divide-slate-100"
        >
          {query.trim() ? (
            hasMatches ? (
              <div>
                {/* 1. MATCHING CATEGORIES SECTION */}
                {matchingCategories.length > 0 && (
                  <div className="p-2 bg-slate-50/60 border-b border-slate-100">
                    <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#0b2f5c]">
                        <Folder className="w-3 h-3 text-blue-600" />
                        <span>Matching Categories ({matchingCategories.length})</span>
                      </span>
                      <span className="text-[10px] font-normal text-slate-400 lowercase">
                        jump to category
                      </span>
                    </div>

                    <div className="mt-1 space-y-1">
                      {matchingCategories.map((cat) => {
                        const navIdx = navigableItems.findIndex(
                          (item) => item.id === `cat-${cat.id}`
                        );
                        const isSelected = navIdx === selectedNavIndex;
                        const CatIcon = cat.icon;

                        return (
                          <div
                            key={cat.id}
                            onClick={() => handleSelectCategory(cat)}
                            onMouseEnter={() => setSelectedNavIndex(navIdx)}
                            className={`px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-blue-600 text-white shadow-xs"
                                : "hover:bg-white text-slate-800 hover:shadow-xs border border-transparent hover:border-slate-200/60"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div
                                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? "bg-blue-700 text-white"
                                    : "bg-blue-100/70 text-[#0b2f5c]"
                                }`}
                              >
                                <CatIcon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-bold truncate flex items-center gap-2">
                                  <HighlightText
                                    text={cat.name}
                                    highlight={query}
                                    className={
                                      isSelected
                                        ? "bg-blue-800 text-yellow-300 font-black rounded-xs px-0.5"
                                        : "bg-blue-100 text-[#0b2f5c] font-black rounded-xs px-0.5"
                                    }
                                  />
                                  <span
                                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                                      isSelected
                                        ? "bg-blue-500 text-white"
                                        : "bg-slate-200/70 text-slate-600"
                                    }`}
                                  >
                                    {cat.totalCount} {cat.totalCount === 1 ? "fan" : "fans"}
                                  </span>
                                </div>
                                <div
                                  className={`text-[10px] truncate ${
                                    isSelected ? "text-blue-100" : "text-slate-400"
                                  }`}
                                >
                                  {cat.description}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0 ml-2">
                              <span
                                className={`text-[10px] font-semibold hidden sm:inline ${
                                  isSelected ? "text-blue-100" : "text-slate-400"
                                }`}
                              >
                                Explore
                              </span>
                              <ChevronRight
                                className={`w-3.5 h-3.5 ${
                                  isSelected ? "text-white" : "text-slate-400"
                                }`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. MATCHING PRODUCTS SECTION */}
                {matchingProducts.length > 0 && (
                  <div className="py-2">
                    <div className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[#0b2f5c]">
                        <Layers className="w-3 h-3 text-blue-600" />
                        <span>Matching Products ({matchingProducts.length})</span>
                      </span>
                      <span className="text-[10px] font-normal text-slate-400">
                        {matchingProducts.length} top matches
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100/80">
                      {matchingProducts.map((prod) => {
                        const navIdx = navigableItems.findIndex(
                          (item) => item.id === `prod-${prod.id}`
                        );
                        const isSelected = navIdx === selectedNavIndex;

                        const categoryLabel =
                          prod.category === "ceiling-fan"
                            ? "Ceiling"
                            : prod.category === "table-fan"
                            ? "Table"
                            : "Pedestal";

                        return (
                          <div
                            key={prod.id}
                            onClick={() => handleSelectProduct(prod)}
                            onMouseEnter={() => setSelectedNavIndex(navIdx)}
                            className={`px-3 py-2.5 flex items-center gap-3 cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-blue-50/90 text-[#0b2f5c]"
                                : "hover:bg-slate-50 text-slate-800"
                            }`}
                          >
                            {/* Product Thumbnail */}
                            <div className="w-11 h-11 rounded-lg overflow-hidden bg-slate-100 border border-slate-200/80 shrink-0 shadow-2xs">
                              <ProductImage
                                src={prod.images?.[0] || ""}
                                alt={prod.name}
                                category={prod.category}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold truncate">
                                  <HighlightText
                                    text={prod.name}
                                    highlight={query}
                                    className="bg-amber-200/80 text-slate-900 font-black rounded-xs px-0.5"
                                  />
                                </span>
                                <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[9px] font-bold px-1.5 py-0.2 rounded shrink-0">
                                  {categoryLabel}
                                </span>
                                {prod.featured && (
                                  <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1 rounded shrink-0">
                                    ★ Top
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                                {prod.model && (
                                  <span className="font-mono text-slate-600 font-semibold bg-slate-100 px-1 rounded text-[10px]">
                                    <HighlightText
                                      text={prod.model}
                                      highlight={query}
                                      className="bg-yellow-200 text-slate-900 font-bold px-0.5"
                                    />
                                  </span>
                                )}
                                <span>•</span>
                                <span className="text-slate-600 font-medium">
                                  {prod.specifications.size || "1200 mm"}
                                </span>
                                {prod.specifications.rpm && (
                                  <>
                                    <span>•</span>
                                    <span className="text-slate-500 hidden sm:inline">
                                      {prod.specifications.rpm}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Stock Status */}
                            <div className="text-right shrink-0">
                              <span
                                className={`text-[11px] font-semibold block ${
                                  prod.available ? "text-emerald-700" : "text-amber-700"
                                }`}
                              >
                                {prod.available ? "In Stock" : "Out of Stock"}
                              </span>
                              <span className="text-[10px] text-slate-400 block">
                                Factory Direct
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. KEYWORD SUGGESTION CHIPS */}
                {matchingTags.length > 0 && (
                  <div className="p-2.5 bg-slate-50/50 border-t border-slate-100">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-blue-600" />
                      <span>Suggested Keywords</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {matchingTags.map((tag) => {
                        const navIdx = navigableItems.findIndex(
                          (item) => item.id === `tag-${tag}`
                        );
                        const isSelected = navIdx === selectedNavIndex;

                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleSelectTag(tag)}
                            onMouseEnter={() => setSelectedNavIndex(navIdx)}
                            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                              isSelected
                                ? "bg-blue-600 text-white"
                                : "bg-white text-slate-700 hover:bg-blue-50 hover:text-[#0b2f5c] border border-slate-200"
                            }`}
                          >
                            <HighlightText text={tag} highlight={query} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. FOOTER: SEARCH ALL RESULTS IN CATALOG */}
                <div className="p-2.5 bg-slate-100/90 border-t border-slate-200 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleSearchSubmit(query)}
                    className="w-full py-2 px-3 text-xs font-bold text-[#0b2f5c] hover:text-[#07192f] bg-white hover:bg-slate-50 rounded-lg border border-slate-200/90 shadow-2xs flex items-center justify-center gap-2 transition-all group"
                  >
                    <span>
                      View all products matching &ldquo;<strong>{query}</strong>&rdquo;
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ) : (
              /* Zero matches found */
              <div className="p-6 text-center text-slate-500">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-2">
                  <Search className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-700">
                  No fans or categories found for &ldquo;{query}&rdquo;
                </p>
                <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
                  Try searching by sweep (e.g. 1200 mm), model series (Avencer, Enticer), or browse categories below.
                </p>

                {/* Quick Category Fallback Links */}
                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-1.5 text-center">
                  {CATEGORIES_DATA.map((cat) => {
                    const CatIcon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleSelectCategory(cat)}
                        className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#0b2f5c] border border-slate-200/60 transition-colors flex flex-col items-center gap-1 text-[11px] font-bold"
                      >
                        <CatIcon className="w-4 h-4 text-blue-600" />
                        <span>{cat.name.split(" ")[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )
          ) : (
            /* EMPTY QUERY: Popular Searches & Categories Quick Jump */
            <div className="p-3">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                <span>Popular Searches &amp; Trending Models</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_SEARCHES.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleSelectTag(tag)}
                    className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#0b2f5c] rounded-md transition-colors font-medium border border-transparent hover:border-blue-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Quick Category Jump */}
              <div className="mt-3.5 pt-3 border-t border-slate-100">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                  <Folder className="w-3 h-3 text-blue-600" />
                  <span>Browse by Category</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {CATEGORIES_DATA.map((cat) => {
                    const CatIcon = cat.icon;
                    const catCount = products.filter((p) => p.category === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleSelectCategory(cat)}
                        className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-200/80 text-slate-700 hover:text-[#0b2f5c] transition-all flex flex-col items-center text-center group"
                      >
                        <div className="w-7 h-7 rounded-full bg-white shadow-2xs flex items-center justify-center text-blue-600 mb-1 group-hover:scale-110 transition-transform">
                          <CatIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[11px] font-bold leading-tight">{cat.name}</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">{catCount} models</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Keyboard Navigation Tip */}
              <div className="mt-3 pt-2 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <CornerDownLeft className="w-2.5 h-2.5" />
                  Type to see matching models &amp; categories
                </span>
                <span>↑↓ to navigate</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
