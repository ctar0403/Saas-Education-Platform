"use client";

import React from "react";

const LessonHeader = () => {
  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-roboto font-bold text-[#032C3D]">
            Entrepreneurship 101
          </h1>
          <button className="bg-[#08AD98] hover:bg-[#078c7d] text-white font-poppins font-medium px-6 py-2 rounded-lg transition-colors duration-200">
            Mark as complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonHeader;
