"use client";

import React from "react";

interface LibraryCardProps {
  id: number;
  title: string;
  image: string;
  type: string;
  subType?: string;
  date: string;
  status: string;
  badge?: string;
  category?: string;
  downloads?: string;
  products?: string;
}

const LibraryCard: React.FC<LibraryCardProps> = ({
  title,
  image,
  type,
  subType,
  date,
  status,
  badge,
  category,
  downloads,
  products,
}) => {
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      case "Upcoming":
        return "bg-blue-100 text-blue-800";
      case "Payment Due Soon":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Course":
        return "bg-purple-100 text-purple-800";
      case "Coaching":
        return "bg-blue-100 text-blue-800";
      case "Digital Downloads":
        return "bg-orange-100 text-orange-800";
      case "Bundle":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-40 object-cover" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${getTypeColor(type)}`}
          >
            {type}
          </span>
          {subType && (
            <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800">
              {subType}
            </span>
          )}
        </div>

        {badge && (
          <div className="absolute top-3 right-3">
            <span
              className={`px-2 py-1 text-xs font-medium rounded ${getBadgeColor(badge)}`}
            >
              {badge}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Date */}
        <div className="flex items-center gap-1 mb-2">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xs text-gray-500">{date}</span>
        </div>

        {/* Title */}
        <h3 className="font-poppins font-semibold text-sm text-[#032C3D] mb-2 line-clamp-2 h-10">
          {title}
        </h3>

        {/* Status */}
        <p className="text-xs text-gray-600 mb-3">{status}</p>

        {/* Additional Info */}
        {downloads && (
          <div className="flex items-center gap-1 mb-3">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-xs text-gray-500">{downloads}</span>
          </div>
        )}

        {products && (
          <div className="mb-3">
            <span className="text-xs text-gray-600">Products: {products}</span>
          </div>
        )}

        {category && (
          <div className="mb-3">
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              Category: {category}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {badge === "Completed" ? (
            <button className="flex-1 bg-green-500 text-white text-xs font-medium py-2 rounded hover:bg-green-600 transition-colors">
              View Certificate
            </button>
          ) : badge === "Expired" ? (
            <button className="flex-1 bg-gray-400 text-white text-xs font-medium py-2 rounded cursor-not-allowed">
              Renew Access
            </button>
          ) : (
            <button className="flex-1 bg-[#08AD98] text-white text-xs font-medium py-2 rounded hover:bg-[#078c7d] transition-colors">
              {type === "Digital Downloads" ? "Download" : "Continue"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryCard;
