"use client";

import React from "react";

const AboutTestimonials = () => {
  return (
    <div className="bg-[#F5F5F5] py-16">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl font-roboto font-bold text-[#032C3D] text-center mb-16">
          Testimonials
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="mb-6">
              <div className="text-6xl text-[#08AD98] mb-4">"</div>
              <p className="text-[#2E2E2E] font-poppins text-sm leading-relaxed">
                Before working with FinX I was business owner struggling
                financially and always anxious about cash flow. Now I have a
                solid financial strategy, consistent revenue and peace of mind
                knowing my business is growing in right direction. I can't
                believe I waited this long to get help.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                alt="Sarah J."
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-poppins font-semibold text-[#032C3D]">
                  Sarah J.
                </div>
                <div className="font-poppins text-sm text-[#2E2E2E]">
                  Business Owner
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="mb-6">
              <div className="text-6xl text-[#08AD98] mb-4">"</div>
              <p className="text-[#2E2E2E] font-poppins text-sm leading-relaxed">
                FinX helped me understand market opportunities I never knew
                existed and create multiple income streams that have completely
                transformed my financial life. The methods work and Mike truly
                cares about your success. FinX helped me equally important
                assess multiple channels of income.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                alt="David Kun"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-poppins font-semibold text-[#032C3D]">
                  David Kun
                </div>
                <div className="font-poppins text-sm text-[#2E2E2E]">
                  Entrepreneur
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-3 h-3 rounded-full bg-[#08AD98]"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutTestimonials;
