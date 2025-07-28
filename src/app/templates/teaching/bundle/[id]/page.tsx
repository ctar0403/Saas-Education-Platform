"use client";

import React, { useState } from "react";

interface BundlePageProps {
  params: {
    id: string;
  };
}

const BundlePage = ({ params }: BundlePageProps) => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-gray-100 px-5 py-4 lg:px-20 lg:py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl lg:text-4xl font-bold text-gray-900">
            <span className="font-roboto font-extrabold">FinX</span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-1 px-3 py-2">
              <span className="text-lg font-semibold text-gray-900">Home</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-2">
              <span className="text-lg text-gray-600">About</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-2">
              <span className="text-lg font-semibold text-gray-900">Store</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-2">
              <span className="text-lg font-bold text-gray-600">Blogs</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-2">
              <span className="text-lg text-gray-600">Contact Us</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/74db43e54b5ead003c9723b411c6410c05ffd34c?width=64"
              alt="Global"
              className="w-6 h-6 lg:w-8 lg:h-8"
            />
            <button className="bg-teal-500 text-white px-4 py-2 lg:px-8 lg:py-4 rounded-lg font-semibold text-sm lg:text-base">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Bundle Hero Section */}
      <section className="bg-gray-50 px-5 py-8 lg:px-20 lg:py-12">
        <div className="flex flex-col items-center">
          {/* Hero Image */}
          <div className="w-full max-w-6xl h-48 lg:h-64 rounded-t-lg overflow-hidden mb-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F046614d09b714830be9f4517b1d1f158%2Ff135f29805a44f75ab6401e3847bc815?format=webp&width=800"
              alt="Trading Mastery Bundle"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bundle Info Card */}
          <div className="w-full max-w-6xl bg-white rounded-b-lg p-4 lg:p-6">
            <div className="px-2 lg:px-6 py-3">
              <h1 className="text-lg lg:text-xl font-medium text-black mb-4">
                Trading Mastery Bundle: From Beginner to Pro
              </h1>

              <div className="mb-6">
                <p className="text-sm lg:text-base text-black leading-normal opacity-75">
                  Master the art of trading with our comprehensive bundle that
                  includes digital downloads, coaching sessions, and complete
                  courses. Perfect for beginners looking to become professional
                  traders with real-world strategies and tools.
                </p>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                <div className="flex items-center gap-1 px-2 py-1 bg-orange-50 rounded-full">
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2.625 1.25C2.52555 1.25001 2.43017 1.28952 2.35985 1.35985C2.28952 1.43017 2.25001 1.52555 2.25 1.625V2H1.375C1.27555 2.00001 1.18017 2.03952 1.10985 2.10985C1.03952 2.18017 1.00001 2.27555 1 2.375V10.125C1.00001 10.2245 1.03952 10.3198 1.10985 10.3902C1.18017 10.4605 1.27555 10.5 1.375 10.5H10.625C10.7245 10.5 10.8198 10.4605 10.8902 10.3902C10.9605 10.3198 11 10.2245 11 10.125V2.375C11 2.27555 10.9605 2.18017 10.8902 2.10985C10.8198 2.03952 10.7245 2.00001 10.625 2H9.75V1.625C9.74999 1.52555 9.71048 1.43017 9.64015 1.35985C9.56983 1.28952 9.47445 1.25001 9.375 1.25H7.5C6.87192 1.25 6.34073 1.58323 6 2.06104C5.65927 1.58323 5.12808 1.25 4.5 1.25H2.625Z"
                      fill="#E27603"
                    />
                  </svg>
                  <span className="text-xs text-orange-600 font-medium">
                    4 Digital Downloads
                  </span>
                </div>

                <div className="flex items-center gap-1 px-2 py-1 bg-teal-50 rounded-full">
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M5.99891 0.75C5.03685 0.75 4.24891 1.53794 4.24891 2.5C4.24891 3.46206 5.03685 4.25 5.99891 4.25C6.96097 4.25 7.74891 3.46206 7.74891 2.5C7.74891 1.53794 6.96097 0.75 5.99891 0.75Z"
                      fill="#08AD98"
                    />
                  </svg>
                  <span className="text-xs text-teal-600 font-medium">
                    4 Coaching Sessions
                  </span>
                </div>

                <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-full">
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2.625 1.5C2.57763 1.5 2.53102 1.50262 2.48486 1.50732C2.39287 1.5167 2.30355 1.53533 2.21777 1.56201C1.7868 1.69606 1.44606 2.0368 1.31201 2.46777C1.28533 2.55355 1.2667 2.64287 1.25732 2.73486V2.73535C1.25265 2.78135 1.25 2.82779 1.25 2.875V3.375V9.125C1.25 9.87994 1.87006 10.5 2.625 10.5H9.375C10.1299 10.5 10.75 9.87994 10.75 9.125V3.375V2.875C10.75 2.82765 10.7474 2.78103 10.7427 2.73486C10.7333 2.64287 10.7147 2.55355 10.688 2.46777C10.5539 2.0368 10.2132 1.69606 9.78223 1.56201C9.69645 1.53533 9.60713 1.5167 9.51514 1.50732H9.51465C9.46864 1.5026 9.42218 1.5 9.375 1.5H2.625Z"
                      fill="#9747FF"
                    />
                  </svg>
                  <span className="text-xs text-purple-600 font-medium">
                    3 Complete Courses
                  </span>
                </div>
              </div>

              {/* Bundle Stats */}
              <div className="flex items-center gap-4 lg:gap-6 flex-wrap">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-5 h-5 lg:w-6 lg:h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6.25 3C4.46403 3 3 4.46403 3 6.25V17.75C3 19.536 4.46403 21 6.25 21H17.75C19.536 21 21 19.536 21 17.75V6.25C21 4.46403 19.536 3 17.75 3H6.25Z"
                      fill="#08AD98"
                    />
                  </svg>
                  <span className="text-sm text-black">
                    Updated: 08/07/2024
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 lg:w-5 lg:h-5"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M5.95825 3.20837C5.09888 3.20837 4.36729 3.55539 3.89754 4.08386C3.42779 4.61233 3.20825 5.28997 3.20825 5.95837C3.20825 6.62678 3.42779 7.30442 3.89754 7.83289C4.36729 8.36135 5.09888 8.70837 5.95825 8.70837C6.81763 8.70837 7.54921 8.36135 8.01896 7.83289C8.48871 7.30442 8.70825 6.62678 8.70825 5.95837C8.70825 5.28997 8.48871 4.61233 8.01896 4.08386C7.54921 3.55539 6.81763 3.20837 5.95825 3.20837Z"
                      fill="#08AD98"
                    />
                  </svg>
                  <span className="text-sm text-black">1,384,131 Enrolled</span>
                </div>

                <div className="flex items-center gap-1">
                  <svg
                    className="w-5 h-5 lg:w-6 lg:h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12.0049 2.50001C11.8647 2.49914 11.7271 2.53756 11.6077 2.61092C11.4882 2.68428 11.3917 2.78964 11.3291 2.91505L8.75296 8.0674L2.63578 9.0088C2.49885 9.02996 2.37046 9.08863 2.26485 9.1783C2.15923 9.26798 2.08052 9.38515 2.03743 9.51683C1.99435 9.64851 1.98858 9.78955 2.02076 9.92431C2.05294 10.0591 2.12182 10.1823 2.21976 10.2803L6.45121 14.5117L5.50882 20.6358C5.48774 20.7728 5.50504 20.9129 5.5588 21.0407C5.61256 21.1685 5.70068 21.2789 5.81337 21.3596C5.92607 21.4403 6.05893 21.4882 6.19721 21.498C6.33548 21.5078 6.47377 21.4791 6.59671 21.4151L12 18.5957L17.4034 21.4151C17.5263 21.4791 17.6646 21.5078 17.8029 21.498C17.9411 21.4882 18.074 21.4403 18.1867 21.3596C18.2994 21.2789 18.3875 21.1685 18.4413 21.0407C18.495 20.9129 18.5123 20.7728 18.4912 20.6358L17.5489 14.5117L21.7803 10.2803C21.8782 10.1823 21.9471 10.0591 21.9793 9.92431C22.0115 9.78955 22.0057 9.64851 21.9626 9.51683C21.9195 9.38515 21.8408 9.26798 21.7352 9.1783C21.6296 9.08863 21.5012 9.02996 21.3643 9.0088L15.2471 8.0674L12.6709 2.91505C12.6091 2.79112 12.5141 2.68674 12.3965 2.61349C12.279 2.54023 12.1434 2.50095 12.0049 2.50001Z"
                      fill="#FDC526"
                    />
                  </svg>
                  <span className="text-sm font-medium text-black">4.7</span>
                  <span className="text-sm font-medium text-black">
                    (1,384,131 Reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-gray-50 px-5 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl px-4 lg:px-96 py-6 relative">
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200"></div>
            <div className="flex justify-center gap-6 lg:gap-12">
              <button
                onClick={() => setActiveTab("about")}
                className={`flex flex-col items-center gap-3 lg:gap-6 relative px-2 ${
                  activeTab === "about" ? "text-teal-600" : "text-gray-500"
                }`}
              >
                <span className="text-sm lg:text-base font-medium">About</span>
                {activeTab === "about" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500"></div>
                )}
              </button>

              <button
                onClick={() => setActiveTab("products")}
                className={`flex flex-col items-center gap-3 lg:gap-6 relative px-2 ${
                  activeTab === "products" ? "text-teal-600" : "text-gray-500"
                }`}
              >
                <span className="text-sm lg:text-base font-medium">
                  Products
                </span>
                {activeTab === "products" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500"></div>
                )}
              </button>

              <button
                onClick={() => setActiveTab("pricing")}
                className={`flex flex-col items-center gap-3 relative px-2 ${
                  activeTab === "pricing" ? "text-teal-600" : "text-gray-500"
                }`}
              >
                <span className="text-sm lg:text-base font-medium">
                  Pricing Plan
                </span>
                {activeTab === "pricing" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="bg-gray-50 px-5 lg:px-20 pb-0">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-4">
            {/* About Section */}
            {activeTab === "about" && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 lg:p-10">
                <div className="flex flex-col gap-8">
                  {/* About this Bundle */}
                  <div className="flex flex-col gap-4">
                    <h2 className="text-base lg:text-lg font-medium text-black">
                      About this Bundle
                    </h2>
                    <div className="flex flex-col gap-4">
                      <p className="text-sm lg:text-base text-black opacity-75 leading-relaxed">
                        This comprehensive trading bundle is designed to take
                        you from a complete beginner to a professional trader.
                        You'll learn fundamental analysis, technical analysis,
                        risk management, and advanced trading strategies used by
                        successful traders worldwide.
                      </p>
                      <p className="text-sm lg:text-base text-black opacity-75 leading-relaxed">
                        The bundle includes everything you need: digital
                        downloads with trading templates, one-on-one coaching
                        sessions with expert traders, and complete video courses
                        covering all aspects of modern trading.
                      </p>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                      <h3 className="text-base lg:text-lg font-medium text-black">
                        Skills you will learn
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        {[
                          "Technical Analysis",
                          "Risk Management",
                          "Chart Reading",
                          "Market Psychology",
                          "Trading Strategies",
                          "Portfolio Management",
                        ].map((skill, i) => (
                          <div
                            key={i}
                            className="bg-gray-100 px-4 lg:px-5 py-2 rounded-2xl h-8 lg:h-9 flex items-center"
                          >
                            <span className="text-xs lg:text-sm text-teal-700 font-medium">
                              {skill}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* What will you learn */}
                    <div className="flex flex-col gap-4">
                      <h3 className="text-base lg:text-lg font-medium text-black">
                        What you will learn
                      </h3>
                      <div className="flex flex-col gap-3">
                        {[
                          "Master the fundamentals of technical and fundamental analysis",
                          "Develop effective risk management strategies to protect your capital",
                          "Learn to read market trends and identify profitable trading opportunities",
                          "Understand market psychology and how emotions affect trading decisions",
                          "Build a diversified trading portfolio with proper asset allocation",
                          "Execute trades with confidence using proven strategies and techniques",
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 lg:gap-4"
                          >
                            <div className="w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center flex-shrink-0 mt-1">
                              <svg
                                className="w-5 h-5 lg:w-6 lg:h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
                                  fill="#043A51"
                                />
                              </svg>
                            </div>
                            <span className="text-sm lg:text-base text-black opacity-75">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Instructor Section */}
            {activeTab === "about" && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex flex-col gap-4">
                  <h3 className="text-base lg:text-lg font-medium text-gray-800">
                    Meet Your Instructor
                  </h3>

                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 lg:w-18 lg:h-18 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F046614d09b714830be9f4517b1d1f158%2Fffac57313cd8458d8d8f2bdccfe25ddf?alt=media&token=1dfb8fc8-a2b2-4f00-9383-d33e2c122160&apiKey=046614d09b714830be9f4517b1d1f158"
                        alt="Marwa Alameri - Professional Trader & Instructor"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm lg:text-base font-medium text-gray-800">
                        Marwa Alameri
                      </h4>
                      <p className="text-sm text-gray-600">
                        Professional Trader & Financial Analyst
                      </p>
                    </div>
                  </div>

                  <p className="text-sm lg:text-base text-gray-600 leading-6">
                    With over 10 years of experience in financial markets, Marwa
                    has helped thousands of students master the art of trading.
                    She specializes in technical analysis, risk management, and
                    developing systematic trading approaches that consistently
                    generate profits. Her teaching methodology focuses on
                    practical application rather than just theory, ensuring
                    students can immediately implement what they learn.
                  </p>

                  <div className="flex items-center gap-4 lg:gap-6 flex-wrap">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-5 h-5 lg:w-6 lg:h-6"
                        viewBox="0 0 24 25"
                        fill="none"
                      >
                        <path
                          d="M12.0049 3C11.8647 2.99912 11.7271 3.03754 11.6077 3.1109C11.4882 3.18426 11.3917 3.28962 11.3291 3.41504L8.75296 8.56738L2.63578 9.50879C2.49885 9.52995 2.37046 9.58862 2.26485 9.67829C2.15923 9.76796 2.08052 9.88514 2.03743 10.0168C1.99435 10.1485 1.98858 10.2895 2.02076 10.4243C2.05294 10.5591 2.12182 10.6823 2.21976 10.7803L6.45121 15.0117L5.50882 21.1357C5.48774 21.2728 5.50504 21.4129 5.5588 21.5407C5.61256 21.6685 5.70068 21.7789 5.81337 21.8596C5.92607 21.9403 6.05893 21.9882 6.19721 21.998C6.33548 22.0078 6.47377 21.9791 6.59671 21.915L12 19.0957L17.4034 21.915C17.5263 21.9791 17.6646 22.0078 17.8029 21.998C17.9411 21.9882 18.074 21.9403 18.1867 21.8596C18.2994 21.7789 18.3875 21.6685 18.4413 21.5407C18.495 21.4129 18.5123 21.2728 18.4912 21.1357L17.5489 15.0117L21.7803 10.7803C21.8782 10.6823 21.9471 10.5591 21.9793 10.4243C22.0115 10.2895 22.0057 10.1485 21.9626 10.0168C21.9195 9.88514 21.8408 9.76796 21.7352 9.67829C21.6296 9.58862 21.5012 9.52995 21.3643 9.50879L15.2471 8.56738L12.6709 3.41504C12.6091 3.29111 12.5141 3.18673 12.3965 3.11347C12.279 3.04021 12.1434 3.00094 12.0049 3Z"
                          fill="#FDC526"
                        />
                      </svg>
                      <span className="text-sm font-medium text-black">
                        4.9
                      </span>
                      <span className="text-sm font-medium text-black">
                        (15,847 Reviews)
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 lg:w-5 lg:h-5"
                        viewBox="0 0 22 23"
                        fill="none"
                      >
                        <path
                          d="M5.95825 3.70833C5.09888 3.70833 4.36729 4.05535 3.89754 4.58382C3.42779 5.11229 3.20825 5.78993 3.20825 6.45833C3.20825 7.12673 3.42779 7.80437 3.89754 8.33284C4.36729 8.86131 5.09888 9.20833 5.95825 9.20833C6.81763 9.20833 7.54921 8.86131 8.01896 8.33284C8.48871 7.80437 8.70825 7.12673 8.70825 6.45833C8.70825 5.78993 8.48871 5.11229 8.01896 4.58382C7.54921 4.05535 6.81763 3.70833 5.95825 3.70833Z"
                          fill="#08AD98"
                        />
                      </svg>
                      <span className="text-sm text-black">
                        50,000+ Students Taught
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1 px-2 py-1 bg-orange-50 rounded-full">
                      <svg className="w-3 h-3" viewBox="0 0 12 13" fill="none">
                        <path
                          d="M2.625 1.75C2.52555 1.75001 2.43017 1.78952 2.35985 1.85985C2.28952 1.93017 2.25001 2.02555 2.25 2.125V2.5H1.375C1.27555 2.50001 1.18017 2.53952 1.10985 2.60985C1.03952 2.68017 1.00001 2.77555 1 2.875V10.625C1.00001 10.7245 1.03952 10.8198 1.10985 10.8902C1.18017 10.9605 1.27555 11 1.375 11H10.625C10.7245 11 10.8198 10.9605 10.8902 10.8902C10.9605 10.8198 11 10.7245 11 10.625V2.875C11 2.77555 10.9605 2.68017 10.8902 2.60985C10.8198 2.53952 10.7245 2.50001 10.625 2.5H9.75V2.125C9.74999 2.02555 9.71048 1.93017 9.64015 1.85985C9.56983 1.78952 9.47445 1.75001 9.375 1.75H7.5C6.87192 1.75 6.34073 2.08323 6 2.56104C5.65927 2.08323 5.12808 1.75 4.5 1.75H2.625Z"
                          fill="#E27603"
                        />
                      </svg>
                      <span className="text-xs text-orange-600">
                        15 Digital Products
                      </span>
                    </div>

                    <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-full">
                      <svg className="w-3 h-3" viewBox="0 0 12 13" fill="none">
                        <path
                          d="M2.625 2C2.57763 2 2.53102 2.00262 2.48486 2.00732C2.39287 2.0167 2.30355 2.03533 2.21777 2.06201C1.7868 2.19606 1.44606 2.5368 1.31201 2.96777C1.28533 3.05355 1.2667 3.14287 1.25732 3.23486V3.23535C1.25265 3.28135 1.25 3.32779 1.25 3.375V3.875V9.625C1.25 10.3799 1.87006 11 2.625 11H9.375C10.1299 11 10.75 10.3799 10.75 9.625V3.875V3.375C10.75 3.32765 10.7474 3.28103 10.7427 3.23486C10.7333 3.14287 10.7147 3.05355 10.688 2.96777C10.5539 2.5368 10.2132 2.19606 9.78223 2.06201C9.69645 2.03533 9.60713 2.0167 9.51514 2.00732H9.51465C9.46864 2.0026 9.42218 2 9.375 2H2.625Z"
                          fill="#9747FF"
                        />
                      </svg>
                      <span className="text-xs text-purple-600">
                        8 Premium Courses
                      </span>
                    </div>

                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full">
                      <svg className="w-3 h-3" viewBox="0 0 12 13" fill="none">
                        <path
                          d="M2.625 1.75C2.52555 1.75001 2.43017 1.78952 2.35985 1.85985C2.28952 1.93017 2.25001 2.02555 2.25 2.125V2.5H1.375C1.27555 2.50001 1.18017 2.53952 1.10985 2.60985C1.03952 2.68017 1.00001 2.77555 1 2.875V10.625C1.00001 10.7245 1.03952 10.8198 1.10985 10.8902C1.18017 10.9605 1.27555 11 1.375 11H10.625C10.7245 11 10.8198 10.9605 10.8902 10.8902C10.9605 10.8198 11 10.7245 11 10.625V2.875C11 2.77555 10.9605 2.68017 10.8902 2.60985C10.8198 2.53952 10.7245 2.50001 10.625 2.5H9.75V2.125C9.74999 2.02555 9.71048 1.93017 9.64015 1.85985C9.56983 1.78952 9.47445 1.75001 9.375 1.75H7.5C6.87192 1.75 6.34073 2.08323 6 2.56104C5.65927 2.08323 5.12808 1.75 4.5 1.75H2.625Z"
                          fill="#032C3D"
                        />
                      </svg>
                      <span className="text-xs text-slate-700">
                        3 Trading Bundles
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Tab Content */}
            {activeTab === "products" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Digital Download Card */}
                <div className="flex flex-col justify-center items-center">
                  <div className="flex flex-col w-full max-w-[290px] border border-gray-200 rounded-lg bg-white shadow-sm">
                    {/* Course Image with overlay */}
                    <div
                      className="relative w-full h-[157px] rounded-t-lg overflow-hidden"
                      style={{
                        backgroundImage:
                          "url('https://api.builder.io/api/v1/image/assets/TEMP/dfd4981e578373dc171febba1e567217d3c34445?width=582')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 h-10 flex items-end justify-center pb-2 bg-gradient-to-t from-orange-600 to-transparent">
                        <span className="text-white text-xs font-bold text-center drop-shadow">
                          Limited Time: Free Item!
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col p-3 gap-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 px-2 py-1 bg-orange-50 rounded-full">
                          <svg
                            className="w-3 h-3"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M2.625 1.25C2.52555 1.25001 2.43017 1.28952 2.35985 1.35985C2.28952 1.43017 2.25001 1.52555 2.25 1.625V2H1.375C1.27555 2.00001 1.18017 2.03952 1.10985 2.10985C1.03952 2.18017 1.00001 2.27555 1 2.375V10.125C1.00001 10.2245 1.03952 10.3198 1.10985 10.3902C1.18017 10.4605 1.27555 10.5 1.375 10.5H10.625C10.7245 10.5 10.8198 10.4605 10.8902 10.3902C10.9605 10.3198 11 10.2245 11 10.125V2.375C11 2.27555 10.9605 2.18017 10.8902 2.10985C10.8198 2.03952 10.7245 2.00001 10.625 2H9.75V1.625C9.74999 1.52555 9.71048 1.43017 9.64015 1.35985C9.56983 1.28952 9.47445 1.25001 9.375 1.25H7.5C6.87192 1.25 6.34073 1.58323 6 2.06104C5.65927 1.58323 5.12808 1.25 4.5 1.25H2.625Z"
                              fill="#E27603"
                            />
                          </svg>
                          <span className="text-xs text-orange-600 font-medium">
                            Digital Downloads
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M4.16663 1.33331C3.34413 1.33331 2.66663 2.01081 2.66663 2.83331V13.1666C2.66663 13.9891 3.34413 14.6666 4.16663 14.6666H11.8333C12.6558 14.6666 13.3333 13.9891 13.3333 13.1666V6.16665C13.3333 6.03405 13.2806 5.90689 13.1868 5.81313L13.1816 5.80792L8.85347 1.4798C8.75972 1.38603 8.63256 1.33334 8.49996 1.33331H4.16663ZM4.16663 2.33331H7.99996V5.16665C7.99996 5.98915 8.67746 6.66665 9.49996 6.66665H12.3333V13.1666C12.3333 13.4488 12.1155 13.6666 11.8333 13.6666H4.16663C3.88446 13.6666 3.66663 13.4488 3.66663 13.1666V2.83331C3.66663 2.55115 3.88446 2.33331 4.16663 2.33331ZM8.99996 3.04034L11.6263 5.66665H9.49996C9.21779 5.66665 8.99996 5.44881 8.99996 5.16665V3.04034Z"
                              fill="#667085"
                            />
                          </svg>
                          <span className="text-xs text-gray-600">
                            10 Files
                          </span>
                          <svg
                            className="w-4 h-4 ml-1"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M7.99219 1.99286C7.85969 1.99493 7.73344 2.0495 7.64115 2.1446C7.54887 2.23969 7.4981 2.36752 7.5 2.50002V9.62632L6.35352 8.47984C6.30691 8.43184 6.25115 8.39369 6.18953 8.36763C6.12791 8.34157 6.06169 8.32815 5.99479 8.32815C5.89528 8.32817 5.79805 8.35788 5.71552 8.41348C5.63299 8.46908 5.56893 8.54803 5.53153 8.64024C5.49413 8.73245 5.48509 8.83373 5.50557 8.9311C5.52605 9.02848 5.57511 9.11753 5.64648 9.18687L7.64648 11.1869C7.74026 11.2806 7.86741 11.3333 8 11.3333C8.13259 11.3333 8.25974 11.2806 8.35352 11.1869L10.3535 9.18687C10.4015 9.1408 10.4398 9.08561 10.4662 9.02455C10.4926 8.96348 10.5065 8.89777 10.5072 8.83125C10.5079 8.76473 10.4953 8.69874 10.4701 8.63715C10.445 8.57557 10.4078 8.51961 10.3608 8.47258C10.3137 8.42554 10.2578 8.38836 10.1962 8.36321C10.1346 8.33807 10.0686 8.32546 10.0021 8.32614C9.93559 8.32682 9.86987 8.34076 9.80881 8.36715C9.74774 8.39354 9.69256 8.43185 9.64648 8.47984L8.5 9.62632V2.50002C8.50096 2.4331 8.48848 2.36666 8.46329 2.30466C8.4381 2.24265 8.40072 2.18633 8.35336 2.13903C8.30601 2.09174 8.24964 2.05443 8.1876 2.02932C8.12556 2.00421 8.05911 1.99181 7.99219 1.99286Z"
                              fill="#667085"
                            />
                          </svg>
                          <span className="text-xs text-gray-600">5k</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                          Digital Downloads Name will be here it might have two
                          lines
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed do eiusmod tempor.......
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-700">
                          Purchasers
                        </span>
                        <div className="flex items-center -space-x-2">
                          <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-500 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-600 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                            <span className="text-xs text-gray-600 font-medium">
                              +6
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Card */}
                <div className="flex flex-col justify-center items-center">
                  <div className="flex flex-col w-full max-w-[290px] border border-gray-200 rounded-lg bg-white shadow-sm">
                    {/* Course Image */}
                    <div className="w-full h-[157px] bg-teal-50 rounded-t-lg flex items-center justify-center">
                      <svg
                        className="w-16 h-16"
                        viewBox="0 0 65 64"
                        fill="none"
                      >
                        <path
                          d="M13.1666 8C9.87662 8 7.16663 10.71 7.16663 14V50C7.16663 53.29 9.87662 56 13.1666 56H21.1666C22.7106 56 24.0983 55.3667 25.1666 54.3932C26.235 55.3667 27.6227 56 29.1666 56H35.8333C37.3773 56 38.7649 55.3667 39.8333 54.3932C40.9016 55.3667 42.2893 56 43.8333 56H51.8333C55.1233 56 57.8333 53.29 57.8333 50V14C57.8333 10.71 55.1233 8 51.8333 8H43.8333C40.5433 8 37.8333 10.71 37.8333 14V16.4089C37.2007 16.1794 36.5407 16 35.8333 16H29.1666C28.4592 16 27.7993 16.1794 27.1666 16.4089V14C27.1666 10.71 24.4566 8 21.1666 8H13.1666Z"
                          fill="#08AD98"
                        />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col p-3 gap-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 rounded-full">
                          <svg
                            className="w-3 h-3"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M2.625 1.5C2.57763 1.5 2.53102 1.50262 2.48486 1.50732C2.39287 1.5167 2.30355 1.53533 2.21777 1.56201C1.7868 1.69606 1.44606 2.0368 1.31201 2.46777C1.28533 2.55355 1.2667 2.64287 1.25732 2.73486V2.73535C1.25265 2.78135 1.25 2.82779 1.25 2.875V3.375V9.125C1.25 9.87994 1.87006 10.5 2.625 10.5H9.375C10.1299 10.5 10.75 9.87994 10.75 9.125V3.375V2.875C10.75 2.82765 10.7474 2.78103 10.7427 2.73486C10.7333 2.64287 10.7147 2.55355 10.688 2.46777C10.5539 2.0368 10.2132 1.69606 9.78223 1.56201C9.69645 1.53533 9.60713 1.5167 9.51514 1.50732H9.51465C9.46864 1.5026 9.42218 1.5 9.375 1.5H2.625Z"
                              fill="#9747FF"
                            />
                          </svg>
                          <span className="text-xs text-purple-600 font-medium">
                            Course
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M4.16667 2C2.97602 2 2 2.97602 2 4.16667V11.8333C2 13.024 2.97602 14 4.16667 14H11.8333C13.024 14 14 13.024 14 11.8333V4.16667C14 2.97602 13.024 2 11.8333 2H4.16667Z"
                                fill="#475467"
                              />
                            </svg>
                            <span className="text-xs text-gray-600">
                              08/07/2024
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-5 h-5 relative">
                              <svg
                                className="w-5 h-5 absolute"
                                viewBox="0 0 18 18"
                                fill="none"
                              >
                                <path
                                  d="M8.53834 0.609964C8.70914 0.199318 9.29086 0.199318 9.46166 0.609964L11.5278 5.57744C11.5998 5.75056 11.7626 5.86885 11.9495 5.88383L17.3123 6.31376C17.7556 6.3493 17.9354 6.90256 17.5976 7.19189L13.5117 10.6919C13.3693 10.8139 13.3071 11.0053 13.3506 11.1876L14.5989 16.4208C14.7021 16.8534 14.2315 17.1954 13.8519 16.9635L9.26063 14.1592C9.10062 14.0615 8.89938 14.0615 8.73937 14.1592L4.14806 16.9635C3.76851 17.1954 3.29788 16.8534 3.40108 16.4208L4.64939 11.1876C4.69289 11.0053 4.6307 10.8139 4.48831 10.6919L0.402413 7.19189C0.0646446 6.90256 0.244408 6.3493 0.687735 6.31376L6.05054 5.88383C6.23744 5.86885 6.40024 5.75056 6.47225 5.57744L8.53834 0.609964Z"
                                  fill="#B1C2C9"
                                />
                              </svg>
                              <svg
                                className="w-3 h-5 absolute left-0"
                                viewBox="0 0 13 20"
                                fill="none"
                              >
                                <path
                                  d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z"
                                  fill="#FDB022"
                                />
                              </svg>
                            </div>
                            <span className="text-xs text-gray-600">4.5</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                          Course Name will be here it might have two lines
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed do eiusmod tempor.......
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-700">
                          Purchasers
                        </span>
                        <div className="flex items-center -space-x-2">
                          <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-500 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-600 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                            <span className="text-xs text-gray-600 font-medium">
                              +6
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* One-to-One Coaching Card */}
                <div className="flex flex-col justify-center items-center">
                  <div className="flex flex-col w-full max-w-[290px] border border-gray-200 rounded-lg bg-white shadow-sm">
                    {/* Course Image with overlay */}
                    <div
                      className="relative w-full h-[157px] rounded-t-lg overflow-hidden"
                      style={{
                        backgroundImage:
                          "url('https://api.builder.io/api/v1/image/assets/TEMP/7df14943c0b8604059b0cf8943ebdcc68bd3ba0c?width=582')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 h-10 flex items-end justify-center pb-2 bg-gradient-to-t from-orange-600 to-transparent">
                        <span className="text-white text-xs font-bold text-center drop-shadow">
                          01:30 hours left to start, Hurry!
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col p-3 gap-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 px-2 py-1 bg-teal-50 rounded-full">
                          <svg
                            className="w-3 h-3"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M6 1C4.62373 1 3.5 2.12373 3.5 3.5C3.5 4.87627 4.62373 6 6 6C7.37627 6 8.5 4.87627 8.5 3.5C8.5 2.12373 7.37627 1 6 1Z"
                              fill="#08AD98"
                            />
                          </svg>
                          <span className="text-xs text-teal-600 font-medium">
                            One-to-One
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M1.83329 2.33331C1.19497 2.33331 0.666626 2.86166 0.666626 3.49998V12.5C0.666626 13.1383 1.19497 13.6666 1.83329 13.6666H6.85478C7.08401 14.0639 7.50775 14.3333 7.99996 14.3333"
                              fill="#667085"
                            />
                          </svg>
                          <span className="text-xs text-gray-600">
                            10 Sessions
                          </span>
                          <div className="w-px h-3 bg-gray-300"></div>
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M8.00004 1.33331C4.32406 1.33331 1.33337 4.324 1.33337 7.99998C1.33337 11.676 4.32406 14.6666 8.00004 14.6666C11.676 14.6666 14.6667 11.676 14.6667 7.99998C14.6667 4.324 11.676 1.33331 8.00004 1.33331Z"
                              fill="#667085"
                            />
                          </svg>
                          <span className="text-xs text-gray-600">15h</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                          Coaching Name will be here it might have two lines
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed do eiusmod tempor.......
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-700">
                          Participants
                        </span>
                        <div className="flex items-center -space-x-2">
                          <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-500 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-600 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                            <span className="text-xs text-gray-600 font-medium">
                              +6
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Group Coaching Card */}
                <div className="flex flex-col justify-center items-center">
                  <div className="flex flex-col w-full max-w-[290px] border border-gray-200 rounded-lg bg-white shadow-sm">
                    {/* Course Image */}
                    <div className="w-full h-[157px] bg-teal-50 rounded-t-lg flex items-center justify-center">
                      <svg
                        className="w-16 h-16"
                        viewBox="0 0 65 64"
                        fill="none"
                      >
                        <path
                          d="M13.8333 8C12.4188 8 11.0623 8.5619 10.0621 9.5621C9.06186 10.5623 8.49996 11.9188 8.49996 13.3333C8.49996 14.7478 9.06186 16.1044 10.0621 17.1046C11.0623 18.1048 12.4188 18.6667 13.8333 18.6667C15.2478 18.6667 16.6043 18.1048 17.6045 17.1046C18.6047 16.1044 19.1666 14.7478 19.1666 13.3333C19.1666 11.9188 18.6047 10.5623 17.6045 9.5621C16.6043 8.5619 15.2478 8 13.8333 8Z"
                          fill="#08AD98"
                        />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col p-3 gap-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-full">
                          <svg
                            className="w-3 h-3"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M6 1.5C5.61458 1.5 5.27804 1.65803 5.06348 1.89941C4.84892 2.14079 4.75 2.44792 4.75 2.75C4.75 3.05208 4.84892 3.35921 5.06348 3.60059C5.27804 3.84197 5.61458 4 6 4C6.38542 4 6.72196 3.84197 6.93652 3.60059C7.15108 3.35921 7.25 3.05208 7.25 2.75C7.25 2.44792 7.15108 2.14079 6.93652 1.89941C6.72196 1.65803 6.38542 1.5 6 1.5Z"
                              fill="#043A51"
                            />
                          </svg>
                          <span className="text-xs text-slate-700 font-medium">
                            Group Coaching
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M11.6666 9.99967C10.7476 9.99967 9.99998 9.252 9.99998 8.333C9.99998 7.414 10.7476 6.66633 11.6666 6.66633C12.5856 6.66633 13.3333 7.414 13.3333 8.333C13.3333 9.252 12.5856 9.99967 11.6666 9.99967Z"
                              fill="#667085"
                            />
                          </svg>
                          <span className="text-xs text-gray-600">
                            2 Groups
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                          Coaching Name will be here it might have two lines
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed do eiusmod tempor.......
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-700">
                          Participants
                        </span>
                        <div className="flex items-center -space-x-2">
                          <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-500 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-600 border-2 border-white"></div>
                          <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                            <span className="text-xs text-gray-600 font-medium">
                              +6
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pricing Tab Content */}
            {activeTab === "pricing" && (
              <div className="flex justify-center">
                <div className="w-full max-w-[676px] bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
                  <h2 className="text-2xl font-semibold text-slate-700 mb-8">
                    Flexible Payment Options for Your Learning Journey
                  </h2>

                  <div className="flex flex-col gap-4 mb-8">
                    {/* Monthly subscription option */}
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      </div>
                      <span className="text-base">
                        <span className="text-teal-500 font-medium">
                          $20.00
                        </span>
                        <span className="text-black">
                          {" "}
                          per month – cancel anytime, no commitment required.
                        </span>
                      </span>
                    </div>

                    {/* OR Divider */}
                    <div className="flex items-center gap-4 my-2">
                      <div className="flex-1 h-px bg-gray-300 opacity-60"></div>
                      <span className="text-slate-700 text-base font-medium">
                        OR
                      </span>
                      <div className="flex-1 h-px bg-gray-300 opacity-60"></div>
                    </div>

                    {/* Lifetime payment option */}
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      </div>
                      <span className="text-base">
                        <span className="text-black">Pay </span>
                        <span className="text-teal-500 font-medium">$1000</span>
                        <span className="text-black">
                          {" "}
                          for lifetime access.
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Form Section */}
                  <div className="flex flex-col gap-4 mb-8">
                    {/* Email Address Field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700 px-4">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="write email address"
                          className="w-full h-12 px-4 py-2 border border-gray-200 rounded-xl bg-white text-base text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700 px-4">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          placeholder="write Password"
                          className="w-full h-12 px-4 py-2 border border-gray-200 rounded-xl bg-white text-base text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Coupon Code Section */}
                    <div className="bg-gray-100 rounded-xl p-6">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700 px-4">
                          Have a Coupon Code?
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Enter your code here"
                            className="w-full h-12 px-4 py-2 border border-gray-200 rounded-xl bg-white text-base text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-4">
                    <button className="w-full h-12 bg-teal-500 text-white text-base font-semibold rounded-lg hover:bg-teal-600 transition-colors">
                      Complete your order
                    </button>
                    <button className="w-full h-12 border-2 border-teal-500 text-slate-700 text-base font-semibold rounded-lg hover:bg-teal-50 transition-colors">
                      <span className="text-slate-700 font-semibold">
                        New here?
                      </span>
                      <span className="text-teal-500 font-semibold">
                        {" "}
                        Create Account and Complete Payment
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-700 px-5 py-16 lg:px-20 lg:py-24 mt-8">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-lg font-semibold text-white text-center">
            ©2024 Kadnya
          </h2>

          <div className="flex items-center gap-4 lg:gap-8">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 lg:w-8 lg:h-8"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M16.5 5C10.1664 5 5 10.1664 5 16.5V31.5C5 37.8328 10.1662 43 16.5 43H31.5C37.8329 43 43 37.8329 43 31.5V16.5C43 10.1662 37.8328 5 31.5 5H16.5Z"
                  fill="#1877F2"
                />
                <path
                  d="M27.6894 2.03711C24.4102 2.03711 21.6271 3.05246 19.7519 5.08984C17.8767 7.12723 16.998 10.0328 16.998 13.5V17H13.5175C11.5899 17 9.99843 18.6048 10.0175 20.5332L10.0468 23.5371V23.5391C10.0693 25.4407 11.6471 27.0056 13.5507 27.0039L16.9999 27.002V43.5C16.9999 45.415 18.585 47 20.4999 47H24.4999C26.4149 47 27.9999 45.415 27.9999 43.5V27H31.0956C32.8594 27 34.3673 25.6563 34.5722 23.9043L34.9218 20.9043C35.1603 18.8507 33.5136 17 31.4452 17H28.0195L28.0624 13.7129C28.0625 13.7064 28.0625 13.6999 28.0624 13.6934C28.0624 13.0075 28.5836 12.4863 29.2695 12.4863H32.1777C33.7358 12.4863 35.0312 11.191 35.0312 9.63281V5.0625C35.0312 3.59688 33.891 2.3503 32.4335 2.21875H32.4296C32.1452 2.19387 30.1778 2.03711 27.6894 2.03711Z"
                  fill="white"
                />
              </svg>
            </div>

            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 lg:w-8 lg:h-8"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M26.2649 21.5537L37.0645 9H34.5053L25.128 19.9002L17.6384 9H9L20.3258 25.483L9 38.6475H11.5593L21.462 27.1365L29.3716 38.6475H38.01L26.2643 21.5537H26.2649Z"
                  fill="#1DA1F2"
                />
              </svg>
            </div>

            <div className="w-10 h-10 lg:w-12 lg:h-12 border-2 border-white rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 lg:w-8 lg:h-8"
                viewBox="0 0 35 36"
                fill="none"
              >
                <path
                  d="M17.5001 5.60416C17.6197 5.61 17.7509 5.61 17.7684 5.61C18.8301 5.61 22.4395 5.90385 24.1399 9.74C24.7064 11.019 24.5635 13.2633 24.4498 15.0644C24.4315 15.3466 24.414 15.6105 24.4024 15.8686C24.4323 15.8985 24.6707 16.1326 25.2074 16.1326C25.6011 16.1326 26.0547 16.0123 26.5614 15.7724C26.6453 15.7301 26.7525 15.7126 26.8655 15.7126C27.295 15.7126 27.82 15.989 27.8973 16.3849C27.9388 16.619 27.8499 17.0754 26.7277 17.5195C26.6263 17.5618 26.4951 17.6033 26.358 17.6456C25.7973 17.8257 24.9441 18.0955 24.6875 18.7139C24.5446 19.05 24.5861 19.4642 24.8187 19.9381C24.8246 19.9381 24.8246 19.944 24.8246 19.9498C24.896 20.1117 26.5964 24.0134 30.3903 24.6442C30.5274 24.6624 30.6229 24.7885 30.6229 24.9322C30.6171 24.9861 30.6047 25.0401 30.5813 25.0941C30.426 25.4601 29.7224 25.9822 27.2527 26.3665C27.0441 26.4022 26.9661 26.715 26.8531 27.2189C26.8115 27.4172 26.7634 27.6214 26.7036 27.8314C26.6322 28.0771 26.471 28.1077 26.3215 28.1077C26.1786 28.1077 25.9876 28.072 25.7666 28.0297C25.4086 27.9575 24.9135 27.8612 24.2872 27.8612C23.9408 27.8612 23.577 27.8911 23.2197 27.9517C22.4737 28.0778 21.8474 28.5219 21.1795 28.9958C20.2206 29.6878 19.218 30.3958 17.6671 30.3958C17.6197 30.3958 17.5001 30.39 17.5001 30.39C17.5001 30.39 17.3805 30.3958 17.3331 30.3958C15.7822 30.3958 14.7796 29.6878 13.8192 28.9973C13.1513 28.5233 12.525 28.0785 11.779 27.9531C11.421 27.8933 11.0572 27.8627 10.7115 27.8627C10.0852 27.8627 9.59008 27.959 9.23206 28.0311C9.01112 28.0734 8.82008 28.1092 8.67716 28.1092C8.52768 28.1092 8.36727 28.0793 8.29508 27.8328C8.23529 27.6228 8.18789 27.4186 8.1456 27.2203C8.03258 26.7165 7.95456 26.4036 7.74602 26.3679C5.27633 25.9836 4.57196 25.4616 4.41737 25.0955C4.39331 25.0416 4.38164 24.9876 4.37508 24.9329C4.36925 24.7885 4.4706 24.6631 4.60768 24.6449C8.40154 24.0149 10.102 20.1131 10.1734 19.9505C10.1734 19.9447 10.1734 19.9389 10.1792 19.9389C10.4119 19.4649 10.4534 19.0507 10.3105 18.7146C10.0538 18.0962 9.20071 17.8265 8.63998 17.6456C8.50289 17.6033 8.37169 17.5618 8.27028 17.5195C7.14807 17.0754 7.05919 16.619 7.10069 16.3849C7.17796 15.989 7.70297 15.7126 8.13254 15.7126C8.24554 15.7126 8.35272 15.7301 8.43663 15.7724C8.94333 16.0123 9.39695 16.1326 9.79062 16.1326C10.3273 16.1326 10.5657 15.8985 10.5956 15.8686C10.584 15.6105 10.5665 15.3466 10.5482 15.0644C10.4345 13.2633 10.2916 11.019 10.8581 9.74C12.5585 5.90385 16.1679 5.61 17.2296 5.61C17.2471 5.61 17.3783 5.61 17.4979 5.60416H17.5001Z"
                  fill="white"
                />
              </svg>
            </div>

            <div className="w-10 h-10 lg:w-12 lg:h-12 border-2 border-white rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6"
                viewBox="0 0 26 26"
                fill="none"
              >
                <path
                  d="M3.75578 1.32027C1.96842 1.32027 0.799805 2.49394 0.799805 4.03657C0.799805 5.54513 1.93361 6.75227 3.68719 6.75227H3.72112C5.54344 6.75227 6.67754 5.54513 6.67754 4.03657C6.64347 2.49394 5.54344 1.32027 3.75578 1.32027Z"
                  fill="white"
                />
                <path
                  d="M1.10864 8.89862H6.33385V24.6189H1.10864V8.89862Z"
                  fill="white"
                />
                <path
                  d="M19.1594 8.52966C16.3406 8.52966 14.4505 11.1784 14.4505 11.1784V8.89862H9.2251V24.6189H14.4502V15.8401C14.4502 15.3701 14.4842 14.9009 14.6223 14.5648C15 13.6263 15.8596 12.6541 17.3032 12.6541C19.1939 12.6541 19.9502 14.0957 19.9502 16.209V24.6189H25.1749V15.6052C25.1749 10.7766 22.597 8.52966 19.1594 8.52966Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <p className="text-sm font-semibold text-center">
            <span className="text-white">Powered By </span>
            <span className="text-teal-500">Kadnya</span>
          </p>

          <p className="text-xs font-bold text-white text-center underline">
            Terms & Conditions | Privacy Policy
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BundlePage;
