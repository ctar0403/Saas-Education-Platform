"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import ErrorBoundary from "./ErrorBoundary";

// Types based on the API response structure
interface Category {
  id: number;
  name: string;
  description: string;
}

interface FileItem {
  id: number;
  files: string;
}

interface Product {
  id: number;
  expert: [string, string]; // [email, name]
  category: Category;
  title: string;
  description: string;
  date: string;
  type: string;
  title_url: string;
  view_style: string;
  is_paid: boolean;
  price: string;
  thumbnail: string;
  comments: number;
  benefits: number;
  files: FileItem[];
  links: any[];
}

interface PaginationInfo {
  total_items: number;
  next_cursor: string | null;
  previous_cursor: string | null;
  page_size: number;
}

interface ApiResponse {
  status: string;
  code: number;
  data: {
    pagination: PaginationInfo;
    data: Product[];
  };
}

interface ProductSectionWithPaginationProps {
  title: string;
  apiEndpoint?: string; // Optional API endpoint
  staticProducts?: Product[]; // Optional static products for testing
  pageSize?: number;
  showPagination?: boolean;
  onProductClick?: (product: Product) => void;
}

const ProductSectionWithPagination: React.FC<ProductSectionWithPaginationProps> = ({
  title,
  apiEndpoint,
  staticProducts,
  pageSize = 5,
  showPagination = true,
  onProductClick,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total_items: 0,
    next_cursor: null,
    previous_cursor: null,
    page_size: pageSize,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before making any requests
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Convert legacy product format to new format for testing
  const convertLegacyProduct = (legacyProduct: any): Product => ({
    id: legacyProduct.id,
    expert: ["expert@example.com", "Expert Name"],
    category: {
      id: 1,
      name: legacyProduct.category || "General",
      description: "Product category",
    },
    title: legacyProduct.title,
    description: legacyProduct.description || "Product description",
    date: new Date().toLocaleDateString(),
    type: "product",
    title_url: legacyProduct.title_url || "",
    view_style: "grid",
    is_paid: true,
    price: legacyProduct.price?.toString() || "0",
    thumbnail: legacyProduct.image || "/placeholder-image.jpg",
    comments: 0,
    benefits: 1,
    files: [],
    links: [],
  });

  // Fetch products from API
  const fetchProducts = async (cursor?: string | null) => {
    // Only fetch if we're in the browser and have an API endpoint
    if (typeof window === 'undefined' || !isMounted) {
      return;
    }

    if (!apiEndpoint) {
      // Use static products if no API endpoint provided
      if (staticProducts) {
        const convertedProducts = staticProducts.map(convertLegacyProduct);
        setProducts(convertedProducts);
        setPagination({
          total_items: convertedProducts.length,
          next_cursor: null,
          previous_cursor: null,
          page_size: pageSize,
        });
      }
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let url = apiEndpoint;
      const params = new URLSearchParams();

      if (cursor) {
        params.append('cursor', cursor);
      }
      params.append('page_size', pageSize.toString());

      if (params.toString()) {
        url += '?' + params.toString();
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (data.status === 'success') {
        setProducts(data.data.data);
        setPagination(data.data.pagination);
      } else {
        throw new Error('API returned error status');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load - only on client side after component is mounted
  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      fetchProducts();
    }
  }, [apiEndpoint, pageSize, isMounted]);

  // Handle page navigation
  const handleNextPage = () => {
    if (pagination.next_cursor) {
      setCurrentPage(prev => prev + 1);
      fetchProducts(pagination.next_cursor);
    }
  };

  const handlePreviousPage = () => {
    if (pagination.previous_cursor) {
      setCurrentPage(prev => prev - 1);
      fetchProducts(pagination.previous_cursor);
    }
  };

  // Calculate pagination info
  const totalPages = Math.ceil(pagination.total_items / pagination.page_size);
  const hasNextPage = pagination.next_cursor !== null;
  const hasPreviousPage = pagination.previous_cursor !== null;

  // Handle product click
  const handleProductClick = (product: Product) => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      console.log('Product clicked:', product);
    }
  };

  // Prevent SSR hydration issues
  if (!isMounted) {
    return (
      <div className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-roboto font-bold text-[#032C3D] mb-8">
            {title}
          </h2>
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-600">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-roboto font-bold text-[#032C3D]">
            {title}
          </h2>
          {pagination.total_items > 0 && (
            <div className="text-sm text-gray-600">
              Showing {products.length} of {pagination.total_items} products
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#08AD98]" />
            <span className="ml-2 text-gray-600">Loading products...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">Error loading products: {error}</p>
            <button
              onClick={() => fetchProducts()}
              className="mt-2 text-sm text-red-800 hover:text-red-900 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div
            className={`grid gap-6 ${
              products.length === 3
                ? "grid-cols-1 md:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.thumbnail}
                category={product.category.name}
                duration={product.date}
                rating={4.5} // Default rating since not in API
                price={parseFloat(product.price)}
                featured={product.benefits > 0}
                badge={product.is_paid ? undefined : "FREE"}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found.</p>
          </div>
        )}

        {/* Pagination */}
        {showPagination && !loading && !error && products.length > 0 && totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={handlePreviousPage}
              disabled={!hasPreviousPage}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                hasPreviousPage
                  ? "border-gray-300 hover:border-[#08AD98] hover:text-[#08AD98] text-gray-700"
                  : "border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {/* Page Info */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNumber = i + 1;
                  const isActive = pageNumber === currentPage;
                  return (
                    <button
                      key={pageNumber}
                      className={`w-8 h-8 rounded text-sm transition-colors ${
                        isActive
                          ? "bg-[#08AD98] text-white"
                          : "hover:bg-gray-100 text-gray-600"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                {totalPages > 5 && (
                  <>
                    <span className="text-gray-400">...</span>
                    <button className="w-8 h-8 rounded text-sm hover:bg-gray-100 text-gray-600">
                      {totalPages}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              disabled={!hasNextPage}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                hasNextPage
                  ? "border-gray-300 hover:border-[#08AD98] hover:text-[#08AD98] text-gray-700"
                  : "border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Pagination Info */}
        {showPagination && !loading && !error && products.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              {pagination.total_items} total products • {pagination.page_size} per page
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Wrapped component with error boundary
const ProductSectionWithPaginationWrapped: React.FC<ProductSectionWithPaginationProps> = (props) => {
  return (
    <ErrorBoundary>
      <ProductSectionWithPagination {...props} />
    </ErrorBoundary>
  );
};

export default ProductSectionWithPaginationWrapped;
