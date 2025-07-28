"use client";

import React from "react";

const OneToOneHero = () => {
  return (
    <div className="bg-[#1E4A5C] py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h1 className="text-4xl font-roboto font-bold mb-4">
              One-to-One Financial Coaching
            </h1>
            <p className="text-lg mb-6 opacity-90">
              Get personalized, focused coaching sessions designed specifically
              for your financial goals. Work directly with our expert coaches to
              create a customized roadmap to financial success.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold mb-2">Session Duration</h3>
                <p className="text-sm opacity-75">60 minutes</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Price</h3>
                <p className="text-sm opacity-75">$150 per session</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Format</h3>
                <p className="text-sm opacity-75">Video call</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Availability</h3>
                <p className="text-sm opacity-75">Mon-Fri, 9AM-6PM</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="One-to-one coaching session"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneToOneHero;
