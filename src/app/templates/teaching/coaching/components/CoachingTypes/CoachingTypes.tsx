"use client";

import React from "react";

const CoachingTypes = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-roboto font-bold text-[#032C3D] mb-4">
            Why Choose Our Coaching?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our coaching programs are designed to provide you with the tools,
            knowledge, and support you need to achieve lasting financial
            success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Expert Guidance */}
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-roboto font-bold text-[#032C3D] mb-4">
              Expert Guidance
            </h3>
            <p className="text-gray-600">
              Learn from certified financial coaches with years of experience
              helping clients achieve their financial goals.
            </p>
          </div>

          {/* Personalized Approach */}
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-roboto font-bold text-[#032C3D] mb-4">
              Personalized Approach
            </h3>
            <p className="text-gray-600">
              Every coaching session is tailored to your unique financial
              situation, goals, and challenges.
            </p>
          </div>

          {/* Proven Results */}
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-roboto font-bold text-[#032C3D] mb-4">
              Proven Results
            </h3>
            <p className="text-gray-600">
              Our clients have achieved an average of 40% improvement in their
              financial wellness within 6 months.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-[#08AD98] hover:bg-[#078c7d] text-white font-poppins font-semibold px-8 py-4 rounded-lg transition-colors duration-200">
            Schedule Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachingTypes;
