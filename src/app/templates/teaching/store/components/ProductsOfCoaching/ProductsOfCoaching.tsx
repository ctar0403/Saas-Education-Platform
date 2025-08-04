"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Pagination from "../Pagination/Pagination";
import { productsAPI, Product, PaginationInfo } from "@/lib/api/products-api";

interface ProductsOfCoachingProps {
  className?: string;
  apiEndpoint?: string;
}

const ProductsOfCoaching: React.FC<ProductsOfCoachingProps> = ({ 
  className = "", 
  apiEndpoint 
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    total_items: 0,
    next_cursor: null,
    previous_cursor: null,
    page_size: 4
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pageSize = 4;
  const category = "coaching";

  const fetchProducts = async (page: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await productsAPI.fetchProducts(category, page, pageSize);
      
      if (response.status === "success") {
        const convertedProducts = response.data.data.map(productsAPI.convertApiProduct);
        setProducts(convertedProducts);
        setPaginationInfo(response.data.pagination);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load coaching products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleProductClick = (product: Product) => {
    console.log("Coaching product clicked:", product);
    // Add your product click logic here
  };

  const totalPages = Math.ceil(paginationInfo.total_items / paginationInfo.page_size);

  if (error) {
    return (
      <div className={`py-12 px-8 ${className}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => fetchProducts(currentPage)}
              className="bg-[#08AD98] text-white px-4 py-2 rounded-lg hover:bg-[#078c7d] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-12 px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-roboto font-bold text-[#032C3D]">
            Products of Coaching
          </h2>
          <div className="text-sm text-gray-600">
            {paginationInfo.total_items} total product{paginationInfo.total_items !== 1 ? 's' : ''}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#08AD98]"></div>
            <p className="text-gray-600 mt-2">Loading coaching products...</p>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
            
            {totalPages > 1 && (
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
            <p className="text-gray-600">No coaching products available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsOfCoaching;
