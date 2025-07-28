"use client";

import React from "react";

const WhoIAm = () => {
  return (
    <div className="bg-[#FAFAFA] py-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 h-[500px]">
              {/* Large image - top */}
              <div className="col-span-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Financial advisor working"
                  className="w-full h-[300px] object-cover rounded-lg"
                />
              </div>

              {/* Two smaller images - bottom */}
              <div>
                <img
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Financial planning session"
                  className="w-full h-[180px] object-cover rounded-lg"
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Business consultation"
                  className="w-full h-[180px] object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="bg-[#1E4A5C] rounded-lg p-8 text-white">
            <h2 className="text-3xl font-roboto font-bold mb-6">Who I Am</h2>

            <div className="space-y-4 mb-8">
              <p className="font-poppins text-sm leading-relaxed">
                I'm a passionate financial coach and guiding development who
                helps people transform their relationship with money. With over
                15 years of experience in financial planning, investment
                strategies, and wealth building, I've helped thousands of
                individuals create sustainable financial independence.
              </p>

              <p className="font-poppins text-sm leading-relaxed">
                My journey began when I realized how complex the financial world
                seemed for everyday people. I dedicated my life to simplifying
                these concepts and creating practical, actionable strategies
                that anyone can follow to achieve their financial dreams.
              </p>

              <p className="font-poppins text-sm leading-relaxed">
                Through my comprehensive courses and personalized coaching, I've
                helped people eliminate debt, build emergency funds, invest
                wisely, and create multiple income streams that provide lasting
                financial security.
              </p>
            </div>

            <button className="bg-[#08AD98] hover:bg-[#078c7d] transition-colors duration-300 text-white font-poppins font-semibold text-sm px-6 py-3 rounded-lg">
              Start your FREE consultation now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoIAm;
