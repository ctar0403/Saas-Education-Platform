"use client";

import React from "react";

const GroupHero = () => {
  return (
    <div className="bg-[#1E4A5C] py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h1 className="text-4xl font-roboto font-bold mb-4">
              Group Financial Coaching
            </h1>
            <p className="text-lg mb-6 opacity-90">
              Join a supportive community of like-minded individuals on their
              financial journey. Learn from expert coaches and peers in an
              interactive group setting designed to accelerate your financial
              growth.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold mb-2">Session Duration</h3>
                <p className="text-sm opacity-75">90 minutes</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Price</h3>
                <p className="text-sm opacity-75">$75 per session</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Group Size</h3>
                <p className="text-sm opacity-75">6-8 participants</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Schedule</h3>
                <p className="text-sm opacity-75">Weekly sessions</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Group coaching session"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupHero;
