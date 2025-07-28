"use client";

import React from "react";

const MyVision = () => {
  return (
    <div className="bg-[#FAFAFA] py-16">
      <div className="max-w-6xl mx-auto px-8">
        {/* Vision Text Section */}
        <div className="bg-[#08AD98] rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-roboto font-bold text-white mb-4">
            My Vision
          </h2>
          <p className="text-white font-poppins text-sm leading-relaxed">
            I envision a world where every entrepreneur feels empowered to
            understand and control of their financial destiny. I aim to create
            access to financial education, tools, and mentorship that remove the
            barriers preventing people from achieving true financial
            independence. My goal is to democratize financial wisdom and make it
            accessible to everyone, regardless of their background or starting
            point.
          </p>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-6">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Team collaboration"
              className="w-full h-[200px] object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Business meeting"
              className="w-full h-[280px] object-cover rounded-lg"
            />
          </div>

          <div className="space-y-6">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Financial analysis"
              className="w-full h-[280px] object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Business planning"
              className="w-full h-[200px] object-cover rounded-lg"
            />
          </div>

          <div className="space-y-6">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Professional consultation"
              className="w-full h-[200px] object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Team success"
              className="w-full h-[280px] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyVision;
