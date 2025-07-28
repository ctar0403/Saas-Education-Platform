"use client";

import React, { useState } from "react";

const LessonContent = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
      {/* Video Player */}
      <div className="relative aspect-video rounded-t-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
          alt="Lesson video thumbnail"
          className="w-full h-full object-cover"
        />

        {/* Video overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 bg-[#08AD98] rounded-full flex items-center justify-center hover:bg-[#078c7d] transition-colors duration-200 group"
          >
            {isPlaying ? (
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8 text-white ml-1"
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
          </button>
        </div>

        {/* Video progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-30">
          <div className="h-full bg-[#08AD98]" style={{ width: "35%" }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-roboto font-bold text-[#032C3D] mb-4">
          Overview
        </h2>

        <div className="prose max-w-none">
          <p className="text-gray-700 mb-6 leading-relaxed">
            This introductory course explores the essential elements of starting
            and running a successful business. Students will learn how to
            identify and evaluate business opportunities, develop a solid
            business plan, secure funding, build a strong team, and market their
            products or services effectively. Through practical exercises and
            case studies, participants will gain the knowledge and confidence to
            turn their entrepreneurial dreams into reality.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#032C3D] mb-3">
              Key Topics Covered:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-[#08AD98] rounded-full mt-2 flex-shrink-0"></span>
                <span>Idea Generation and Validation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-[#08AD98] rounded-full mt-2 flex-shrink-0"></span>
                <span>Market Research and Analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-[#08AD98] rounded-full mt-2 flex-shrink-0"></span>
                <span>Business Planning and Strategy</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">
              Learning Objectives:
            </h4>
            <p className="text-blue-700 text-sm">
              By the end of this lesson, you will understand the fundamental
              principles of entrepreneurship and be able to evaluate business
              opportunities effectively.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonContent;
