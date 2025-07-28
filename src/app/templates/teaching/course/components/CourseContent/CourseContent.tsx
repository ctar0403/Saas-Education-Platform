"use client";

import React, { useState } from "react";

const CourseContent = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = ["Overview", "Lessons", "Resources", "Discussion"];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "text-[#08AD98] border-[#08AD98]"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "Overview" && (
          <div>
            <h2 className="text-2xl font-roboto font-bold text-[#032C3D] mb-6">
              Course Overview
            </h2>

            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                This comprehensive budgeting course will teach you the essential
                skills needed to take control of your finances. Whether you're
                just starting your financial journey or looking to improve your
                current budgeting system, this course provides practical tools
                and strategies you can implement immediately.
              </p>

              <h3 className="text-lg font-semibold text-[#032C3D] mb-3">
                What you'll learn:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>
                  How to create a realistic budget that works for your lifestyle
                </li>
                <li>Strategies for tracking and categorizing your expenses</li>
                <li>
                  Methods to reduce unnecessary spending and increase savings
                </li>
                <li>Tools and apps to help automate your budgeting process</li>
                <li>How to handle irregular income and unexpected expenses</li>
                <li>Building emergency funds and planning for future goals</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#032C3D] mb-3">
                Course Structure:
              </h3>
              <p className="text-gray-700 mb-4">
                The course is divided into 12 comprehensive lessons, each
                building upon the previous one. You'll have access to
                downloadable worksheets, budget templates, and practical
                exercises to reinforce your learning.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Prerequisites:
                </h4>
                <p className="text-blue-700 text-sm">
                  No prior financial knowledge required. Basic math skills and
                  willingness to track expenses for the course duration.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Lessons" && (
          <div>
            <h2 className="text-2xl font-roboto font-bold text-[#032C3D] mb-6">
              Course Lessons
            </h2>

            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: "Introduction to Budgeting",
                  duration: "15 min",
                  completed: true,
                },
                {
                  id: 2,
                  title: "Understanding Your Income",
                  duration: "20 min",
                  completed: true,
                },
                {
                  id: 3,
                  title: "Tracking Your Expenses",
                  duration: "25 min",
                  completed: true,
                },
                {
                  id: 4,
                  title: "Creating Your First Budget",
                  duration: "30 min",
                  completed: true,
                },
                {
                  id: 5,
                  title: "Budget Categories and Allocation",
                  duration: "22 min",
                  completed: true,
                },
                {
                  id: 6,
                  title: "Managing Variable Expenses",
                  duration: "18 min",
                  completed: true,
                },
                {
                  id: 7,
                  title: "Building an Emergency Fund",
                  duration: "20 min",
                  completed: true,
                },
                {
                  id: 8,
                  title: "Debt Management Strategies",
                  duration: "28 min",
                  completed: true,
                },
                {
                  id: 9,
                  title: "Saving for Goals",
                  duration: "25 min",
                  current: true,
                },
                {
                  id: 10,
                  title: "Budget Review and Adjustment",
                  duration: "20 min",
                  locked: false,
                },
                {
                  id: 11,
                  title: "Advanced Budgeting Techniques",
                  duration: "30 min",
                  locked: true,
                },
                {
                  id: 12,
                  title: "Long-term Financial Planning",
                  duration: "35 min",
                  locked: true,
                },
              ].map((lesson) => (
                <div
                  key={lesson.id}
                  className={`flex items-center justify-between p-4 border rounded-lg ${
                    lesson.current
                      ? "border-[#08AD98] bg-green-50"
                      : lesson.completed
                        ? "border-green-200 bg-green-50"
                        : lesson.locked
                          ? "border-gray-200 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        lesson.completed
                          ? "bg-green-500 text-white"
                          : lesson.current
                            ? "bg-[#08AD98] text-white"
                            : lesson.locked
                              ? "bg-gray-300 text-gray-500"
                              : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {lesson.completed ? (
                        <svg
                          className="w-5 h-5"
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
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : lesson.locked ? (
                        <svg
                          className="w-4 h-4"
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
                        lesson.id
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-[#032C3D]">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-500">{lesson.duration}</p>
                    </div>
                  </div>

                  <button
                    className={`px-4 py-2 rounded text-sm font-medium ${
                      lesson.completed
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : lesson.current
                          ? "bg-[#08AD98] text-white hover:bg-[#078c7d]"
                          : lesson.locked
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    }`}
                    disabled={lesson.locked}
                  >
                    {lesson.completed
                      ? "Review"
                      : lesson.current
                        ? "Continue"
                        : lesson.locked
                          ? "Locked"
                          : "Start"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Resources" && (
          <div>
            <h2 className="text-2xl font-roboto font-bold text-[#032C3D] mb-6">
              Course Resources
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Budget Planning Worksheet",
                  type: "PDF",
                  size: "1.2 MB",
                },
                {
                  title: "Monthly Budget Template",
                  type: "Excel",
                  size: "856 KB",
                },
                {
                  title: "Expense Tracking Guide",
                  type: "PDF",
                  size: "2.1 MB",
                },
                {
                  title: "Emergency Fund Calculator",
                  type: "Excel",
                  size: "645 KB",
                },
                { title: "Debt Payoff Planner", type: "PDF", size: "1.8 MB" },
                {
                  title: "Goal Setting Worksheet",
                  type: "PDF",
                  size: "932 KB",
                },
              ].map((resource, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#032C3D]">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {resource.type} • {resource.size}
                      </p>
                    </div>
                  </div>
                  <button className="w-full bg-[#08AD98] text-white text-sm font-medium py-2 rounded hover:bg-[#078c7d] transition-colors">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Discussion" && (
          <div>
            <h2 className="text-2xl font-roboto font-bold text-[#032C3D] mb-6">
              Course Discussion
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">
                Community Guidelines
              </h3>
              <p className="text-blue-700 text-sm">
                Please keep discussions respectful and on-topic. Share your
                experiences, ask questions, and help fellow students on their
                financial journey.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  user: "Sarah M.",
                  avatar:
                    "https://images.unsplash.com/photo-1494790108755-2616b612b34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                  time: "2 hours ago",
                  message:
                    "Just completed lesson 5! The budget allocation strategies really opened my eyes to where my money was going. Has anyone tried the 50/30/20 rule mentioned in the lesson?",
                  replies: 3,
                },
                {
                  user: "Mike Chen",
                  avatar:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                  time: "1 day ago",
                  message:
                    "Quick question about lesson 3 - what's the best app for expense tracking that integrates with multiple bank accounts? Looking for something automated.",
                  replies: 7,
                },
                {
                  user: "Jessica R.",
                  avatar:
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                  time: "3 days ago",
                  message:
                    "Thanks for this course! I've already started my emergency fund after lesson 7. Small steps but feeling more confident about my finances.",
                  replies: 2,
                },
              ].map((post, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={post.avatar}
                      alt={post.user}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-[#032C3D]">
                          {post.user}
                        </span>
                        <span className="text-sm text-gray-500">
                          {post.time}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{post.message}</p>
                      <button className="text-sm text-[#08AD98] hover:underline">
                        {post.replies} replies
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 border border-gray-200 rounded-lg">
              <textarea
                placeholder="Join the discussion..."
                className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#08AD98] focus:border-transparent"
              />
              <div className="flex justify-end mt-3">
                <button className="bg-[#08AD98] text-white px-4 py-2 rounded hover:bg-[#078c7d] transition-colors">
                  Post Reply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseContent;
