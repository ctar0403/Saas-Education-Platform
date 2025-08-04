"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Pagination from "../Pagination/Pagination";
import { fetchPaginatedProducts, convertApiProductToInternal, ApiProduct } from "@/lib/api/paginatedProducts";

interface Product {
  id: number;
  title: string;
  image?: string;
  category: string;
  duration: string;
  rating: number;
  price: number;
  originalPrice?: number;
  featured?: boolean;
  badge?: string;
  noImage?: boolean;
  icon?: string;
}

interface ApiResponse {
  status: string;
  code: number;
  data: {
    pagination: {
      total_items: number;
      next_cursor: string | null;
      previous_cursor: string | null;
      page_size: number;
    };
    data: any[];
  };
}

interface PaginationInfo {
  total_items: number;
  next_cursor: string | null;
  previous_cursor: string | null;
  page_size: number;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
  onProductClick?: (product: Product) => void;
  className?: string;
  showCount?: boolean;
  apiEndpoint?: string;
  enablePagination?: boolean;
  pageSize?: number;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  products: initialProducts,
  onProductClick,
  className = "",
  showCount = false,
  apiEndpoint,
  enablePagination = false,
  pageSize = 4
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    total_items: initialProducts.length,
    next_cursor: null,
    previous_cursor: null,
    page_size: pageSize
  });
  const [loading, setLoading] = useState(false);
  // Generate more mock data if pagination is enabled but no API endpoint
  useEffect(() => {
    if (enablePagination && !apiEndpoint) {
      // Generate additional mock products for demonstration
      const additionalProducts = [];
      const baseProduct = initialProducts[0] || {
        id: 1,
        title: "Sample Product",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        category: "Sample Category",
        duration: "17",
        rating: 4.5,
        price: 25
      };

      for (let i = initialProducts.length + 1; i <= 15; i++) {
        additionalProducts.push({
          ...baseProduct,
          id: i,
          title: `${baseProduct.title} ${i}`,
          price: Math.floor(Math.random() * 100) + 20
        });
      }

      const allProducts = [...initialProducts, ...additionalProducts];
      const totalItems = allProducts.length;
      const currentPageProducts = allProducts.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );

      setProducts(currentPageProducts);
      setPaginationInfo({
        total_items: totalItems,
        next_cursor: currentPage * pageSize < totalItems ? `page-${currentPage + 1}` : null,
        previous_cursor: currentPage > 1 ? `page-${currentPage - 1}` : null,
        page_size: pageSize
      });
    }
  }, [currentPage, enablePagination, apiEndpoint, initialProducts, pageSize]);

  const fetchProducts = async (page: number) => {
    if (!apiEndpoint) return;

    setLoading(true);
    try {
      const response = await fetchPaginatedProducts({
        endpoint: apiEndpoint,
        page,
        limit: pageSize
      });

      if (response.status === "success") {
        // Convert API products to internal format
        const convertedProducts = response.data.data.map(convertApiProductToInternal);
        setProducts(convertedProducts);
        setPaginationInfo(response.data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (apiEndpoint) {
      fetchProducts(page);
    }
  };

  const handleProductClick = (product: Product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const totalPages = Math.ceil(paginationInfo.total_items / paginationInfo.page_size);
  const displayProducts = enablePagination ? products : initialProducts;

  return (
    <div className={`py-12 px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-roboto font-bold text-[#032C3D]">
            {title}
          </h2>
          {showCount && displayProducts.length > 0 && (
            <div className="text-sm text-gray-600">
              {enablePagination
                ? `${paginationInfo.total_items} total product${paginationInfo.total_items !== 1 ? 's' : ''}`
                : `${displayProducts.length} product${displayProducts.length !== 1 ? 's' : ''}`
              }
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#08AD98]"></div>
            <p className="text-gray-600 mt-2">Loading products...</p>
          </div>
        ) : displayProducts.length > 0 ? (
          <>
            <div
              className={`grid gap-6 ${
                displayProducts.length === 3
                  ? "grid-cols-1 md:grid-cols-3"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>

            {enablePagination && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={paginationInfo.total_items}
                pageSize={paginationInfo.page_size}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No products available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
