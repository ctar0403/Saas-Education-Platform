"use client";

import React from "react";

const MyMission = () => {
  return (
    <div className="bg-[#FAFAFA] py-16">
      <div className="max-w-6xl mx-auto px-8">
        {/* Mission Text Section */}
        <div className="bg-[#1E4A5C] rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-roboto font-bold text-white mb-4">
            My Mission
          </h2>
          <p className="text-white font-poppins text-sm leading-relaxed">
            My mission is to empower individuals and families with practical
            financial education that leads to measurable results. Through
            comprehensive courses, personalized coaching, and ongoing support, I
            help people break free from financial stress and build sustainable
            wealth that lasts for generations. I believe everyone deserves
            access to quality financial education, and I'm committed to making
            it accessible, affordable, and actionable.
          </p>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Office workspace"
              className="w-full h-[280px] object-cover rounded-lg"
            />
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Strategic planning"
              className="w-full h-[280px] object-cover rounded-lg"
            />
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Team collaboration"
              className="w-full h-[280px] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8">
          <button className="bg-[#08AD98] hover:bg-[#078c7d] transition-colors duration-300 text-white font-poppins font-semibold text-lg px-8 py-4 rounded-lg">
            Book your FREE consultation now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyMission;
