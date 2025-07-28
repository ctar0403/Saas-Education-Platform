"use client";

import React from "react";

const ValueProposition = () => {
  return (
    <div className="bg-[#1E4A5C] py-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* We and you first */}
          <div className="text-center text-white">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-poppins font-semibold mb-3">
              We put you first
            </h3>
            <p className="text-sm font-poppins leading-relaxed opacity-90">
              We work for you and your success first before anything else. You
              are our priority and we will ensure you get the best value from
              our courses.
            </p>
          </div>

          {/* We offer ongoing support */}
          <div className="text-center text-white">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-poppins font-semibold mb-3">
              We offer ongoing support
            </h3>
            <p className="text-sm font-poppins leading-relaxed opacity-90">
              We offer comprehensive ongoing support throughout your entire
              journey to ensure you succeed and reach your financial goals.
            </p>
          </div>

          {/* We make it simple */}
          <div className="text-center text-white">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 11L12 14L22 4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-poppins font-semibold mb-3">
              We make it simple
            </h3>
            <p className="text-sm font-poppins leading-relaxed opacity-90">
              We break down complex financial concepts into simple,
              easy-to-understand lessons that anyone can follow and implement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueProposition;
