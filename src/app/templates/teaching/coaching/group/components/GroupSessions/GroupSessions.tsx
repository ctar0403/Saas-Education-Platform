"use client";

import React, { useState } from "react";

const GroupSessions = () => {
  const [activeGroup, setActiveGroup] = useState("beginner");

  const groups = {
    beginner: {
      title: "Financial Foundations (Beginner)",
      description: "Perfect for those just starting their financial journey",
      schedule: "Tuesdays 7:00 PM EST",
      duration: "8 weeks",
      spots: "3 spots left",
      participants: 5,
      maxParticipants: 8,
      nextSession: "2024-01-16",
      topics: [
        "Understanding Your Financial Situation",
        "Creating Your First Budget",
        "Emergency Fund Basics",
        "Introduction to Investing",
        "Debt Management Strategies",
        "Setting Financial Goals",
        "Building Credit",
        "Financial Planning for the Future",
      ],
    },
    intermediate: {
      title: "Wealth Building Strategies (Intermediate)",
      description: "For those ready to accelerate their wealth building",
      schedule: "Thursdays 7:00 PM EST",
      duration: "6 weeks",
      spots: "2 spots left",
      participants: 6,
      maxParticipants: 8,
      nextSession: "2024-01-18",
      topics: [
        "Advanced Investment Strategies",
        "Portfolio Diversification",
        "Tax Optimization",
        "Real Estate Investing",
        "Business Investment",
        "Retirement Planning",
      ],
    },
    advanced: {
      title: "Financial Independence (Advanced)",
      description: "Advanced strategies for achieving financial independence",
      schedule: "Mondays 6:00 PM EST",
      duration: "4 weeks",
      spots: "Full - Join Waitlist",
      participants: 8,
      maxParticipants: 8,
      nextSession: "2024-01-22",
      topics: [
        "FIRE Strategies",
        "Advanced Tax Planning",
        "Estate Planning",
        "Multiple Income Streams",
      ],
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <h2 className="text-2xl font-roboto font-bold text-[#032C3D] mb-6">
        Available Group Sessions
      </h2>

      {/* Group Selection Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200 overflow-x-auto">
        {Object.entries(groups).map(([key, group]) => (
          <button
            key={key}
            onClick={() => setActiveGroup(key)}
            className={`pb-2 px-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeGroup === key
                ? "text-[#08AD98] border-[#08AD98]"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            {group.title.split("(")[0].trim()}
          </button>
        ))}
      </div>

      {/* Selected Group Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-[#032C3D] mb-2">
            {groups[activeGroup].title}
          </h3>
          <p className="text-gray-600 mb-4">
            {groups[activeGroup].description}
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Schedule:</span>
              <span className="font-medium">
                {groups[activeGroup].schedule}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">
                {groups[activeGroup].duration}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Next Session:</span>
              <span className="font-medium">
                {new Date(groups[activeGroup].nextSession).toLocaleDateString(
                  "en-US",
                  {
                    timeZone: "UTC",
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  },
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Participants:</span>
              <span className="font-medium">
                {groups[activeGroup].participants}/
                {groups[activeGroup].maxParticipants}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Group Capacity</span>
              <span>
                {groups[activeGroup].participants}/
                {groups[activeGroup].maxParticipants}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#08AD98] h-2 rounded-full"
                style={{
                  width: `${(groups[activeGroup].participants / groups[activeGroup].maxParticipants) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              disabled={groups[activeGroup].spots.includes("Full")}
              className="bg-[#08AD98] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#078c7d] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {groups[activeGroup].spots.includes("Full")
                ? "Join Waitlist"
                : "Join Group ($75)"}
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Topics Covered */}
        <div>
          <h4 className="text-lg font-semibold text-[#032C3D] mb-4">
            Topics Covered
          </h4>
          <div className="space-y-3">
            {groups[activeGroup].topics.map((topic, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-6 h-6 bg-[#08AD98] text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-sm text-gray-700">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Participants Preview */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-lg font-semibold text-[#032C3D] mb-4">
          Current Participants
        </h4>
        <div className="flex -space-x-2">
          {Array.from({ length: groups[activeGroup].participants }, (_, i) => (
            <div
              key={i}
              className="w-10 h-10 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-sm font-medium text-gray-600"
            >
              {String.fromCharCode(65 + i)}
            </div>
          ))}
          {groups[activeGroup].participants <
            groups[activeGroup].maxParticipants && (
            <div className="w-10 h-10 bg-gray-100 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Join a diverse group of motivated individuals working towards
          financial success
        </p>
      </div>
    </div>
  );
};

export default GroupSessions;
