"use client";

import React from "react";

const LessonSidebar = () => {
  const lessons = [
    {
      id: 1,
      title: "Unleashing Your Inner Entrepreneur",
      duration: "2 hours 15 minutes",
      thumbnail:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      current: true,
    },
    {
      id: 2,
      title: "Know Your Market Research Fundamentals",
      duration: "2 hours 15 minutes",
      thumbnail:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      locked: true,
    },
    {
      id: 3,
      title: "Blueprint for Success: Building Your Business Plan",
      duration: "2 hours 15 minutes",
      thumbnail:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      locked: true,
    },
    {
      id: 4,
      title: "Show Me the Money: Funding Your Venture",
      duration: "2 hours 15 minutes",
      thumbnail:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      locked: true,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-roboto font-bold text-[#032C3D] mb-6">
        Lessons
      </h3>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`flex gap-3 p-3 rounded-lg border transition-colors duration-200 ${
              lesson.current
                ? "border-[#08AD98] bg-green-50"
                : lesson.locked
                  ? "border-gray-200 bg-gray-50 opacity-75"
                  : "border-gray-200 hover:border-gray-300 cursor-pointer"
            }`}
          >
            <div className="relative flex-shrink-0">
              <img
                src={lesson.thumbnail}
                alt={lesson.title}
                className="w-16 h-12 object-cover rounded"
              />

              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded flex items-center justify-center">
                {lesson.locked ? (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>

            <div className="flex-1">
              <h4
                className={`font-medium text-sm leading-tight mb-1 ${
                  lesson.current ? "text-[#08AD98]" : "text-[#032C3D]"
                }`}
              >
                {lesson.title}
              </h4>
              <p className="text-xs text-gray-500">{lesson.duration}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Next Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-4">Next Section</p>
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-[#032C3D] mb-2">
            Advanced Marketing Strategies
          </h4>
          <p className="text-sm text-gray-600">4 lessons • 3.5 hours</p>
        </div>
      </div>
    </div>
  );
};

export default LessonSidebar;
