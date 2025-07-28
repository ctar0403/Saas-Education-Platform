"use client";

import React, { useState } from "react";

const SessionHistory = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingSessions = [
    {
      id: 1,
      date: "2024-01-15",
      time: "2:00 PM",
      topic: "Investment Strategy Review",
      coach: "John Smith",
      status: "confirmed",
    },
    {
      id: 2,
      date: "2024-01-22",
      time: "10:00 AM",
      topic: "Budget Optimization",
      coach: "John Smith",
      status: "pending",
    },
  ];

  const pastSessions = [
    {
      id: 3,
      date: "2024-01-08",
      time: "3:00 PM",
      topic: "Financial Goal Setting",
      coach: "John Smith",
      status: "completed",
      recording: true,
      notes: true,
    },
    {
      id: 4,
      date: "2024-01-01",
      time: "11:00 AM",
      topic: "Debt Management Plan",
      coach: "John Smith",
      status: "completed",
      recording: true,
      notes: true,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-roboto font-bold text-[#032C3D] mb-6">
        My Sessions
      </h2>

      {/* Tabs */}
      <div className="flex gap-6 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "upcoming"
              ? "text-[#08AD98] border-[#08AD98]"
              : "text-gray-500 border-transparent hover:text-gray-700"
          }`}
        >
          Upcoming ({upcomingSessions.length})
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "past"
              ? "text-[#08AD98] border-[#08AD98]"
              : "text-gray-500 border-transparent hover:text-gray-700"
          }`}
        >
          Past Sessions ({pastSessions.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === "upcoming" && (
        <div className="space-y-4">
          {upcomingSessions.length > 0 ? (
            upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-[#032C3D] mb-1">
                      {session.topic}
                    </h3>
                    <p className="text-sm text-gray-600">
                      with {session.coach}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      session.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {session.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date(session.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {session.time}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="bg-[#08AD98] text-white text-sm px-4 py-2 rounded hover:bg-[#078c7d] transition-colors">
                    Join Session
                  </button>
                  <button className="border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Reschedule
                  </button>
                  <button className="text-red-600 text-sm px-4 py-2 rounded hover:bg-red-50 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-500">No upcoming sessions</p>
              <button className="mt-4 bg-[#08AD98] text-white px-4 py-2 rounded hover:bg-[#078c7d] transition-colors">
                Book New Session
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === "past" && (
        <div className="space-y-4">
          {pastSessions.map((session) => (
            <div
              key={session.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-[#032C3D] mb-1">
                    {session.topic}
                  </h3>
                  <p className="text-sm text-gray-600">with {session.coach}</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
                  {session.status}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {new Date(session.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {session.time}
                </div>
              </div>

              <div className="flex gap-3">
                {session.recording && (
                  <button className="border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    View Recording
                  </button>
                )}
                {session.notes && (
                  <button className="border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Download Notes
                  </button>
                )}
                <button className="bg-[#08AD98] text-white text-sm px-4 py-2 rounded hover:bg-[#078c7d] transition-colors">
                  Book Follow-up
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionHistory;
