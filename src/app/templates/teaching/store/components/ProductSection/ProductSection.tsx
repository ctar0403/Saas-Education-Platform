"use client";

import React from "react";
import ProductCard from "../ProductCard/ProductCard";

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

interface ProductSectionProps {
  title: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  return (
    <div className="py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-roboto font-bold text-[#032C3D] mb-8">
          {title}
        </h2>

        <div
          className={`grid gap-6 ${
            products.length === 3
              ? "grid-cols-1 md:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
