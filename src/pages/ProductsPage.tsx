import React, { useState, useMemo, useEffect } from "react";
import { useLocation, Link, useSearchParams } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import { ProductCategory } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/context/LanguageContext";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Plus,
} from "lucide-react";

interface ProductsPageProps {
  initialCategory?: ProductCategory;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ initialCategory }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchQuery = searchParams.get("q") || searchParams.get("search") || "";

  const { t } = useLanguage();
  const { products: allProducts, openAddProductModal } = useProducts();

  // Determine current active category from props or URL
  const activeUrlCategory = useMemo<ProductCategory | "all">(() => {
    if (initialCategory) return initialCategory;
    if (location.pathname.includes("ceiling-fans")) return "ceiling-fan";
    if (location.pathname.includes("table-fans")) return "table-fan";
    if (location.pathname.includes("pedestal-fans")) return "pedestal-fan";
    return "all";
  }, [initialCategory, location.pathname]);

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">(
    activeUrlCategory
  );
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"default" | "name-asc" | "name-desc">("default");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Sync category state when URL changes
  useEffect(() => {
    setSelectedCategory(activeUrlCategory);
  }, [activeUrlCategory]);

  // Sync searchQuery when URL query param changes
  useEffect(() => {
    if (urlSearchQuery !== searchQuery) {
      setSearchQuery(urlSearchQuery);
    }
  }, [urlSearchQuery]);

  const handleSearchChange = (newQuery: string) => {
    setSearchQuery(newQuery);
    const newParams = new URLSearchParams(searchParams);
    if (newQuery.trim()) {
      newParams.set("q", newQuery.trim());
    } else {
      newParams.delete("q");
      newParams.delete("search");
    }
    setSearchParams(newParams, { replace: true });
  };

  const clearSearch = () => {
    handleSearchChange("");
  };

  // Available sizes
  const availableSizes = useMemo(() => {
    const sizes = new Set<string>();
    allProducts.forEach((p) => {
      if (p.specifications.size) sizes.add(p.specifications.size);
    });
    return Array.from(sizes).sort();
  }, [allProducts]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        // Category filter
        if (selectedCategory !== "all" && product.category !== selectedCategory) {
          return false;
        }

        // Size filter
        if (selectedSize !== "all" && product.specifications.size !== selectedSize) {
          return false;
        }

        // Availability filter
        if (inStockOnly && !product.available) {
          return false;
        }

        // Search Query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchesName = product.name.toLowerCase().includes(query);
          const matchesModel = product.model?.toLowerCase().includes(query) || false;
          const matchesCategory = product.category.toLowerCase().includes(query);
          const matchesDesc = product.shortDescription.toLowerCase().includes(query);
          const matchesFeatures = product.features.some((f) =>
            f.toLowerCase().includes(query)
          );

          if (
            !matchesName &&
            !matchesModel &&
            !matchesCategory &&
            !matchesDesc &&
            !matchesFeatures
          ) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOrder === "name-asc") {
          return a.name.localeCompare(b.name);
        }
        if (sortOrder === "name-desc") {
          return b.name.localeCompare(a.name);
        }
        return 0;
      });
  }, [allProducts, selectedCategory, selectedSize, inStockOnly, searchQuery, sortOrder]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedSize("all");
    handleSearchChange("");
    setSortOrder("default");
    setInStockOnly(false);
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedSize !== "all" ||
    searchQuery !== "" ||
    sortOrder !== "default" ||
    inStockOnly;

  const categoryTitles: Record<string, string> = {
    all: t("navAllProducts"),
    "ceiling-fan": t("navCeilingFans"),
    "table-fan": t("navTableFans"),
    "pedestal-fan": t("navPedestalFans"),
  };

  const pageTitle = categoryTitles[selectedCategory] || t("navProducts");

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={`Explore LE LIMRA ${pageTitle} manufactured by LIMRA INDUSTRIES. Dependable cooling, wholesale supply, and factory pricing.`}
      />

      <div className="bg-slate-50 min-h-screen pb-20">
        {/* Header Section */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumbs
              items={[
                { label: t("navProducts"), href: "/products" },
                ...(selectedCategory !== "all"
                  ? [{ label: categoryTitles[selectedCategory] }]
                  : []),
              ]}
            />

            <div className="mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {pageTitle}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? "fan" : "fans"} available for direct wholesale &amp; retail supply.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    openAddProductModal(
                      selectedCategory !== "all" ? selectedCategory : undefined
                    )
                  }
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                  title="Add product photo and specifications"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Fan</span>
                </button>

                <Link
                  to="/wholesale"
                  className="bg-[#e31e24] hover:bg-[#c4181d] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  {t("navGetQuote")}
                </Link>
              </div>
            </div>

            {/* Segmented Category Buttons */}
            <div className="flex items-center gap-1.5 mt-5 overflow-x-auto pb-1 no-scrollbar">
              {[
                { id: "all", label: "All Fans" },
                { id: "ceiling-fan", label: "Ceiling Fans" },
                { id: "table-fan", label: "Table Fans" },
                { id: "pedestal-fan", label: "Pedestal Fans" },
              ].map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                      isActive
                        ? "bg-[#091a32] text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content & Filter Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {/* Top Control Bar: Search Input & Sort */}
          <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by fan name, model, sweep (e.g. 1200mm), or watts..."
                className="w-full pl-9 pr-8 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#091a32] text-slate-800 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort & Mobile Filter Toggle */}
            <div className="flex items-center gap-2">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#091a32]"
              >
                <option value="default">Sort by: Featured</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>

              <button
                onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
                className={`lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                  hasActiveFilters
                    ? "bg-[#091a32] text-white border-[#091a32]"
                    : "bg-white text-slate-700 border-slate-200"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <aside
              className={`lg:block ${
                isFilterDrawerOpen ? "block" : "hidden"
              } lg:col-span-1`}
            >
              <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-5 sticky top-24">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Filters
                  </span>
                  {hasActiveFilters && (
                    <button
                      onClick={resetFilters}
                      className="text-xs text-[#091a32] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </button>
                  )}
                </div>

                {/* Sweep Size Filter */}
                {availableSizes.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Sweep Size
                    </label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#091a32]"
                    >
                      <option value="all">All Sizes</option>
                      {availableSizes.map((sz) => (
                        <option key={sz} value={sz}>
                          {sz}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Availability Filter */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="accent-[#091a32] rounded"
                    />
                    <span>In Stock Only</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <main className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                    <Search className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    No matching fans found
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Try different keywords or reset your filters to see all available models.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 inline-flex items-center gap-1.5 bg-[#091a32] text-white text-xs font-semibold px-4 py-2 rounded-lg"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>View All Fans</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredProducts.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};
