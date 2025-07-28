"use client";

import React from "react";

const LibraryHero = () => {
  return (
    <div className="bg-[#1E4A5C] rounded-lg p-8 mb-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-roboto font-bold">
          Your Journey to Success
        </h1>
        <button className="flex items-center gap-2 text-sm font-medium hover:underline">
          Continue Watch <span>→</span>
        </button>
      </div>

      <p className="text-sm mb-8 opacity-90">
        Learning is a journey, not a race. Celebrate your progress, embrace the
        challenges, and remember that every effort brings you closer to your
        goals. You've got this!
      </p>

      {/* Progress Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 relative">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#08AD98"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${40 * 1.75} ${100 * 1.75}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold">40%</span>
            </div>
          </div>
          <h3 className="font-poppins font-semibold mb-1">Progress</h3>
          <p className="text-xs opacity-75">40% Complete</p>
          <p className="text-xs opacity-75">Keep it up! Every step counts!</p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold">10/22</span>
          </div>
          <h3 className="font-poppins font-semibold mb-1">Lessons Conquered</h3>
          <p className="text-xs opacity-75">10/22 Lessons</p>
          <p className="text-xs opacity-75">You're making great strides!</p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold">4</span>
          </div>
          <h3 className="font-poppins font-semibold mb-1">Skills Unlocked</h3>
          <p className="text-xs opacity-75">4 New Skills Learned</p>
          <p className="text-xs opacity-75">Our knowledge is expanding!</p>
        </div>
      </div>

      {/* Continue Learning Section */}
      <div className="bg-[#08AD98] rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-poppins font-semibold mb-1">
              Continue Learning:
            </h3>
            <p className="text-sm">
              Budgeting Basics: Take Control of Your Spending
            </p>
          </div>
          <button className="bg-white text-[#08AD98] font-semibold px-4 py-2 rounded hover:bg-gray-100 transition-colors">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LibraryHero;
