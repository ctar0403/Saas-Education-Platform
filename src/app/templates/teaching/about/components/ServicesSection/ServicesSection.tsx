"use client";

import React from "react";

const ServicesSection = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-8 text-center">
        <h2 className="text-4xl font-roboto font-bold text-[#032C3D] mb-16">
          Ways we can serve you
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Debt Free */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="30" cy="30" r="30" fill="#032C3D" />
                <path
                  d="M30 15C24.4772 15 20 19.4772 20 25C20 30.5228 24.4772 35 30 35C35.5228 35 40 30.5228 40 25C40 19.4772 35.5228 15 30 15Z"
                  stroke="white"
                  strokeWidth="2"
                />
                <path d="M28 22V28H32V22H28Z" fill="white" />
                <path d="M28 30H32V32H28V30Z" fill="white" />
                <path
                  d="M15 40L20 35L25 40L30 35L35 40L40 35L45 40"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-poppins font-bold text-[#032C3D] mb-4">
              Debt Free
            </h3>
            <p className="text-[#2E2E2E] font-poppins text-sm leading-relaxed">
              Our comprehensive debt elimination strategies help you
              systematically pay off debt and you secure your financial future
              using proven methods that work.
            </p>
          </div>

          {/* Business Consulting */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="30" cy="30" r="30" fill="#032C3D" />
                <path
                  d="M30 17C25.5817 17 22 20.5817 22 25C22 29.4183 25.5817 33 30 33C34.4183 33 38 29.4183 38 25C38 20.5817 34.4183 17 30 17Z"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M18 43C18 37.4772 22.4772 33 28 33H32C37.5228 33 42 37.4772 42 43"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M25 20L27 22L33 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-poppins font-bold text-[#032C3D] mb-4">
              Business Consulting
            </h3>
            <p className="text-[#2E2E2E] font-poppins text-sm leading-relaxed">
              Expert guidance for entrepreneurs and business owners looking to
              optimize their financial operations and maximize profitable growth
              opportunities.
            </p>
          </div>

          {/* Accounting & Financial Planning */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="30" cy="30" r="30" fill="#032C3D" />
                <path
                  d="M26 20V22C24.8954 22 24 22.8954 24 24V36C24 37.1046 24.8954 38 26 38H34C35.1046 38 36 37.1046 36 36V24C36 22.8954 35.1046 22 34 22V20C34 18.8954 33.1046 18 32 18H28C26.8954 18 26 18.8954 26 20Z"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M28 26H32"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M28 30H32"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M28 34H30"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M30 15V18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="30" cy="13" r="2" fill="white" />
              </svg>
            </div>
            <h3 className="text-2xl font-poppins font-bold text-[#032C3D] mb-4">
              Accounting & Financial planning
            </h3>
            <p className="text-[#2E2E2E] font-poppins text-sm leading-relaxed">
              Accurate, organized financial records and strategic planning that
              keeps your money flowing in the right direction for long-term
              wealth building.
            </p>
          </div>
        </div>

        <button className="bg-[#08AD98] hover:bg-[#078c7d] transition-colors duration-300 text-white font-poppins font-semibold text-lg px-8 py-4 rounded-lg">
          Start your FREE consultation now
        </button>
      </div>
    </div>
  );
};

export default ServicesSection;
