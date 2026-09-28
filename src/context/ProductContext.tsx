import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  Product,
  ProductCategory,
  products as initialProducts,
} from "@/data/products";

const STORAGE_KEY = "le_limra_custom_products_v4";

interface ProductContextType {
  products: Product[];
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  getFeaturedProducts: () => Product[];
  getProductsByCategory: (category: ProductCategory) => Product[];
  getRelatedProducts: (currentSlug: string, category: ProductCategory, limit?: number) => Product[];
  
  // Mutation operations
  addProduct: (product: Omit<Product, "id">) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  updateProductPrice: (id: string, price?: number, mrp?: number) => void;
  addProductImage: (id: string, imageDataUrl: string) => void;
  removeProductImage: (id: string, imageIndex: number) => void;
  setProductImages: (id: string, images: string[]) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;

  // Modal controller state for in-app "Add/Edit Product & Price"
  isModalOpen: boolean;
  editingProduct: Product | null;
  modalTab: "basics" | "images" | "specs";
  openAddProductModal: (category?: ProductCategory, initialTab?: "basics" | "images" | "specs") => void;
  openEditProductModal: (product: Product, initialTab?: "basics" | "images" | "specs") => void;
  setModalTab: (tab: "basics" | "images" | "specs") => void;
  closeModal: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge any initial products that might be new
          const existingIds = new Set(parsed.map((p: Product) => p.id));
          const missingDefaults = initialProducts.filter((p) => !existingIds.has(p.id));
          if (missingDefaults.length > 0) {
            return [...missingDefaults, ...parsed];
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to load products from localStorage", e);
    }
    return initialProducts;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [modalTab, setModalTab] = useState<"basics" | "images" | "specs">("basics");

  // Synchronize state changes to localStorage
  const saveProducts = useCallback((newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
    } catch (e) {
      console.error("Failed to save products to localStorage", e);
    }
  }, []);

  const getProductBySlug = useCallback(
    (slug: string) => products.find((p) => p.slug === slug),
    [products]
  );

  const getProductById = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products]
  );

  const getFeaturedProducts = useCallback(
    () => products.filter((p) => p.featured),
    [products]
  );

  const getProductsByCategory = useCallback(
    (category: ProductCategory) => products.filter((p) => p.category === category),
    [products]
  );

  const getRelatedProducts = useCallback(
    (currentSlug: string, category: ProductCategory, limit = 3) =>
      products
        .filter((p) => p.slug !== currentSlug && p.category === category)
        .slice(0, limit),
    [products]
  );

  const addProduct = useCallback(
    (productData: Omit<Product, "id">): Product => {
      const newId = `prod-${Date.now()}`;
      const slug =
        productData.slug ||
        productData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") + `-${Math.floor(Math.random() * 1000)}`;

      const newProduct: Product = {
        ...productData,
        id: newId,
        slug,
      };

      const updated = [newProduct, ...products];
      saveProducts(updated);
      return newProduct;
    },
    [products, saveProducts]
  );

  const updateProduct = useCallback(
    (id: string, updates: Partial<Product>) => {
      const updated = products.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            ...updates,
            specifications: {
              ...p.specifications,
              ...(updates.specifications || {}),
            },
          };
        }
        return p;
      });
      saveProducts(updated);
    },
    [products, saveProducts]
  );

  const updateProductPrice = useCallback(
    (id: string, price?: number, mrp?: number) => {
      updateProduct(id, { price, mrp });
    },
    [updateProduct]
  );

  const addProductImage = useCallback(
    (id: string, imageDataUrl: string) => {
      const target = products.find((p) => p.id === id);
      if (!target) return;
      const updatedImages = [imageDataUrl, ...target.images];
      updateProduct(id, { images: updatedImages });
    },
    [products, updateProduct]
  );

  const removeProductImage = useCallback(
    (id: string, imageIndex: number) => {
      const target = products.find((p) => p.id === id);
      if (!target) return;
      const updatedImages = target.images.filter((_, idx) => idx !== imageIndex);
      updateProduct(id, { images: updatedImages });
    },
    [products, updateProduct]
  );

  const setProductImages = useCallback(
    (id: string, images: string[]) => {
      updateProduct(id, { images });
    },
    [updateProduct]
  );

  const deleteProduct = useCallback(
    (id: string) => {
      const updated = products.filter((p) => p.id !== id);
      saveProducts(updated);
    },
    [products, saveProducts]
  );

  const resetProductsToDefault = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    setProducts(initialProducts);
  }, []);

  const openAddProductModal = useCallback((category?: ProductCategory, initialTab: "basics" | "images" | "specs" = "basics") => {
    setEditingProduct(null);
    setModalTab(initialTab);
    setIsModalOpen(true);
  }, []);

  const openEditProductModal = useCallback((product: Product, initialTab: "basics" | "images" | "specs" = "basics") => {
    setEditingProduct(product);
    setModalTab(initialTab);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingProduct(null);
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        getProductBySlug,
        getProductById,
        getFeaturedProducts,
        getProductsByCategory,
        getRelatedProducts,
        addProduct,
        updateProduct,
        updateProductPrice,
        addProductImage,
        removeProductImage,
        setProductImages,
        deleteProduct,
        resetProductsToDefault,
        isModalOpen,
        editingProduct,
        modalTab,
        openAddProductModal,
        openEditProductModal,
        setModalTab,
        closeModal,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
