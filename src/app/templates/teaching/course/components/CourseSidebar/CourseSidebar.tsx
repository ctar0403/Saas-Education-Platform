"use client";

import React from "react";

const CourseSidebar = () => {
  return (
    <div className="space-y-6">
      {/* Course Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-roboto font-bold text-[#032C3D] mb-4">
          Course Actions
        </h3>

        <div className="space-y-3">
          <button className="w-full bg-[#08AD98] text-white font-medium py-3 rounded-lg hover:bg-[#078c7d] transition-colors">
            Continue Learning
          </button>
          <button className="w-full border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors">
            Download Materials
          </button>
          <button className="w-full border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors">
            Mark as Complete
          </button>
        </div>
      </div>

      {/* Course Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-roboto font-bold text-[#032C3D] mb-4">
          Your Progress
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Overall Progress
              </span>
              <span className="text-sm text-gray-500">67%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#08AD98] h-2 rounded-full"
                style={{ width: "67%" }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#032C3D]">8</div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#032C3D]">4</div>
              <div className="text-sm text-gray-500">Remaining</div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-lg font-semibold text-[#08AD98]">3h 15m</div>
            <div className="text-sm text-gray-500">Time Spent</div>
          </div>
        </div>
      </div>

      {/* Quick Lessons */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-roboto font-bold text-[#032C3D] mb-4">
          Quick Access
        </h3>

        <div className="space-y-3">
          {[
            {
              title: "Current: Saving for Goals",
              progress: "In Progress",
              current: true,
            },
            { title: "Next: Budget Review", progress: "Locked", locked: true },
            {
              title: "Previous: Emergency Fund",
              progress: "Completed",
              completed: true,
            },
          ].map((lesson, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${
                lesson.current
                  ? "border-[#08AD98] bg-green-50"
                  : lesson.completed
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm text-[#032C3D]">
                    {lesson.title}
                  </h4>
                  <p
                    className={`text-xs ${
                      lesson.current
                        ? "text-[#08AD98]"
                        : lesson.completed
                          ? "text-green-600"
                          : "text-gray-500"
                    }`}
                  >
                    {lesson.progress}
                  </p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    lesson.completed
                      ? "bg-green-500 text-white"
                      : lesson.current
                        ? "bg-[#08AD98] text-white"
                        : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {lesson.completed ? (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : lesson.current ? (
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-roboto font-bold text-[#032C3D] mb-4">
          Course Information
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Instructor:</span>
            <span className="font-medium text-[#032C3D]">John Smith</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium text-[#032C3D]">4.5 hours</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Lessons:</span>
            <span className="font-medium text-[#032C3D]">12 lessons</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Level:</span>
            <span className="font-medium text-[#032C3D]">Beginner</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Certificate:</span>
            <span className="font-medium text-[#032C3D]">Yes</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Access:</span>
            <span className="font-medium text-[#032C3D]">Lifetime</span>
          </div>
        </div>
      </div>

      {/* Instructor */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-roboto font-bold text-[#032C3D] mb-4">
          Your Instructor
        </h3>

        <div className="flex items-center gap-3 mb-3">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
            alt="John Smith"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-medium text-[#032C3D]">John Smith</h4>
            <p className="text-sm text-gray-500">Financial Coach</p>
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-3">
          Certified financial planner with over 10 years of experience helping
          individuals take control of their finances.
        </p>

        <button className="text-sm text-[#08AD98] hover:underline">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default CourseSidebar;
