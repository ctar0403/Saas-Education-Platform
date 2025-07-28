"use client";

import React from "react";
import Link from "next/link";

const CoachingHero = () => {
  return (
    <div className="bg-[#1E4A5C] py-16">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <h1 className="text-4xl lg:text-5xl font-roboto font-bold text-white mb-6">
          Personal Financial Coaching
        </h1>
        <p className="text-xl text-white opacity-90 mb-12 max-w-3xl mx-auto">
          Get personalized guidance from expert financial coaches to accelerate
          your journey to financial independence. Choose the coaching style that
          works best for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* One-to-One Coaching Card */}
          <Link href="/templates/teaching/coaching/one-to-one">
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
              <div className="w-16 h-16 bg-[#08AD98] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-roboto font-bold text-[#032C3D] mb-4">
                One-to-One Coaching
              </h3>
              <p className="text-gray-600 mb-6">
                Personalized coaching sessions tailored to your specific
                financial goals and challenges.
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#08AD98] rounded-full"></div>
                  <span>Private 1-on-1 sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#08AD98] rounded-full"></div>
                  <span>Customized financial plans</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#08AD98] rounded-full"></div>
                  <span>Direct coach access</span>
                </li>
              </ul>
              <div className="text-center">
                <span className="text-3xl font-bold text-[#08AD98]">$150</span>
                <span className="text-gray-500">/hour</span>
              </div>
            </div>
          </Link>

          {/* Group Coaching Card */}
          <Link href="/templates/teaching/coaching/group">
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
              <div className="w-16 h-16 bg-[#08AD98] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h3 className="text-2xl font-roboto font-bold text-[#032C3D] mb-4">
                Group Coaching
              </h3>
              <p className="text-gray-600 mb-6">
                Join a supportive community of like-minded individuals on their
                financial journey.
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#08AD98] rounded-full"></div>
                  <span>Small group sessions (6-8 people)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#08AD98] rounded-full"></div>
                  <span>Peer learning & support</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#08AD98] rounded-full"></div>
                  <span>Cost-effective coaching</span>
                </li>
              </ul>
              <div className="text-center">
                <span className="text-3xl font-bold text-[#08AD98]">$75</span>
                <span className="text-gray-500">/session</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoachingHero;
