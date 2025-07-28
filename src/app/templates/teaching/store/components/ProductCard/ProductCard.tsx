"use client";

import React from "react";

interface ProductCardProps {
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

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  category,
  duration,
  rating,
  price,
  originalPrice,
  featured,
  badge,
  noImage,
  icon,
}) => {
  const renderIcon = () => {
    const iconClass = "w-16 h-16 text-[#08AD98]";
    switch (icon) {
      case "coaching":
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        );
      case "download":
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
        );
      case "course":
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
          </svg>
        );
      case "library":
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
          </svg>
        );
      default:
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Image or Icon Section */}
      <div className="relative">
        {noImage ? (
          <div className="h-48 bg-gray-50 flex items-center justify-center">
            {renderIcon()}
          </div>
        ) : (
          <div className="h-48 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {badge && (
            <span
              className={`px-2 py-1 text-xs font-bold rounded ${
                badge === "BEST SELLER"
                  ? "bg-yellow-400 text-black"
                  : badge === "NEW"
                    ? "bg-yellow-400 text-black"
                    : "bg-red-500 text-white"
              }`}
            >
              {badge}
            </span>
          )}
          {featured && (
            <span className="bg-[#08AD98] text-white px-2 py-1 text-xs font-bold rounded">
              FEATURED
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category and Duration */}
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-gray-100 text-[#032C3D] text-xs px-2 py-1 rounded font-medium">
            {category}
          </span>
          <span className="text-gray-500 text-xs">{duration} Minutes</span>
        </div>

        {/* Title */}
        <h3 className="font-poppins font-semibold text-sm text-[#032C3D] mb-3 line-clamp-2 h-10">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({rating})</span>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-poppins font-bold text-lg text-[#032C3D]">
              ${price}
            </span>
            {originalPrice && (
              <span className="font-poppins text-sm text-gray-500 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          <button className="bg-[#08AD98] hover:bg-[#078c7d] text-white text-xs font-semibold px-4 py-2 rounded transition-colors duration-200">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
