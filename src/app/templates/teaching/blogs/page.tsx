"use client";

import React, { useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import DarkFooter from "../components/Footer/DarkFooter";

const BlogPostPage = () => {
  const [currentView, setCurrentView] = useState<"list" | "post">("list");

  const BlogListingView = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* View Toggle */}
      <section className="bg-white px-5 py-4 lg:px-20">
        <div className="flex justify-center">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setCurrentView("list")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                currentView === "list"
                  ? "bg-teal-500 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Blog List
            </button>
            <button
              onClick={() => setCurrentView("post")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                currentView === "post"
                  ? "bg-teal-500 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Blog Post
            </button>
          </div>
        </div>
      </section>

      {/* Blog Header Section */}
      <section className="bg-white px-5 py-12 lg:px-20 lg:py-16">
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Explore Our Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover insights, tips, and trends that matter to you. Our blog
            covers everything from industry news to practical guides.
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row items-center gap-4 w-full max-w-4xl mt-8">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>All Categories</option>
              <option>Technology</option>
              <option>Finance</option>
              <option>Lifestyle</option>
            </select>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="bg-gray-50 px-5 py-12 lg:px-20 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="lg:flex">
              <div className="lg:w-1/2">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/00b7285e5554bf2349a9a93cf63585bf19b7f7f5?width=1520"
                  alt="Featured article"
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm font-medium rounded-full">
                    Featured
                  </span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                    Technology
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  The Future of Technology in Financial Services
                </h2>
                <p className="text-gray-600 mb-6">
                  Discover how emerging technologies are reshaping the financial
                  industry and what it means for businesses and consumers alike.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">John Doe</p>
                      <p className="text-sm text-gray-600">Dec 15, 2024</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentView("post")}
                    className="bg-teal-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-600 transition-colors"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-white px-5 py-12 lg:px-20 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Latest Articles
            </h2>
            <div className="flex items-center gap-2">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <article
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <img
                  src={`https://api.builder.io/api/v1/image/assets/TEMP/00b7285e5554bf2349a9a93cf63585bf19b7f7f5?width=400&height=200`}
                  alt={`Article ${index}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      Technology
                    </span>
                    <span className="text-xs text-gray-500">5 min read</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {index === 1 && "Understanding Modern Web Development"}
                    {index === 2 && "The Rise of Artificial Intelligence"}
                    {index === 3 && "Sustainable Technology Solutions"}
                    {index === 4 && "Digital Transformation Strategies"}
                    {index === 5 && "Cloud Computing Best Practices"}
                    {index === 6 && "Cybersecurity in 2024"}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Author Name
                        </p>
                        <p className="text-xs text-gray-600">
                          Dec {10 + index}, 2024
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setCurrentView("post")}
                      className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                    >
                      Read →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-teal-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 px-5 py-12 lg:px-20 lg:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter and never miss out on the latest
            insights and updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button className="bg-teal-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <DarkFooter />
    </div>
  );

  const BlogPostView = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* View Toggle */}
      <section className="bg-white px-5 py-4 lg:px-20">
        <div className="flex justify-center">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setCurrentView("list")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                currentView === "list"
                  ? "bg-teal-500 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Blog List
            </button>
            <button
              onClick={() => setCurrentView("post")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                currentView === "post"
                  ? "bg-teal-500 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Blog Post
            </button>
          </div>
        </div>
      </section>

      {/* Blog Post Content */}
      <section className="bg-white px-5 py-12 lg:px-20 lg:py-12">
        <div className="flex justify-center gap-6">
          {/* Main Content */}
          <div className="flex flex-col items-center gap-8 max-w-[760px]">
            {/* Featured Image */}
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/00b7285e5554bf2349a9a93cf63585bf19b7f7f5?width=1520"
              alt="Blog featured image"
              className="w-full h-[428px] object-cover rounded-lg"
            />

            {/* Title Section */}
            <div className="flex flex-col gap-4 w-full">
              {/* Stats and Add to Library */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {/* Viewer Count */}
                  <div className="flex items-center gap-0.5">
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M7.9954 3C4.2222 3 0.897585 5.61531 0.0155862 9.04232C-0.0173933 9.17078 0.00201032 9.30709 0.0695283 9.42124C0.137046 9.5354 0.247148 9.61806 0.375612 9.65104C0.504076 9.68402 0.64038 9.66462 0.754538 9.5971C0.868696 9.52958 0.951357 9.41948 0.984336 9.29102C1.74434 6.33803 4.68861 4 7.9954 4C11.3022 4 14.2558 6.33885 15.0156 9.29102C15.0486 9.41948 15.1312 9.52958 15.2454 9.5971C15.3595 9.66462 15.4958 9.68402 15.6243 9.65104C15.7528 9.61806 15.8629 9.5354 15.9304 9.42124C15.9979 9.30709 16.0173 9.17078 15.9843 9.04232C15.1021 5.61448 11.7686 3 7.9954 3Z"
                        fill="#475467"
                      />
                    </svg>
                    <span className="text-xs text-gray-700">1.2K Viewer</span>
                  </div>

                  {/* Reading Time */}
                  <div className="flex items-center gap-0.5">
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3.50004 1.66669C3.36744 1.6667 3.24027 1.71938 3.1465 1.81315C3.05274 1.90691 3.00005 2.03408 3.00004 2.16669V2.66669H1.83337C1.70077 2.6667 1.5736 2.71938 1.47984 2.81315C1.38607 2.90691 1.33339 3.03408 1.33337 3.16669V13.5C1.33339 13.6326 1.38607 13.7598 1.47984 13.8536C1.5736 13.9473 1.70077 14 1.83337 14H14.1667C14.2993 14 14.4265 13.9473 14.5202 13.8536C14.614 13.7598 14.6667 13.6326 14.6667 13.5V3.16669C14.6667 3.03408 14.614 2.90691 14.5202 2.81315C14.4265 2.71938 14.2993 2.6667 14.1667 2.66669H13V2.16669C13 2.03408 12.9473 1.90691 12.8536 1.81315C12.7598 1.71938 12.6326 1.6667 12.5 1.66669H10C9.1626 1.66669 8.45435 2.111 8.00004 2.74807C7.54573 2.111 6.83748 1.66669 6.00004 1.66669H3.50004Z"
                        fill="#475467"
                      />
                    </svg>
                    <span className="text-xs text-gray-700">10 min</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-0.5">
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8.00328 1.6667C7.90983 1.66611 7.81809 1.69173 7.73846 1.74063C7.65883 1.78954 7.5945 1.85978 7.55276 1.94339L5.83531 5.37829L1.75718 6.00589C1.6659 6.01999 1.58031 6.05911 1.5099 6.11889C1.43949 6.17867 1.38701 6.25679 1.35829 6.34458C1.32957 6.43236 1.32572 6.52639 1.34717 6.61623C1.36863 6.70607 1.41455 6.78821 1.47984 6.85355L4.3008 9.67451L3.67255 13.7572C3.65849 13.8485 3.67003 13.942 3.70587 14.0272C3.74171 14.1124 3.80045 14.1859 3.87558 14.2398C3.95071 14.2936 4.03928 14.3255 4.13147 14.332C4.22366 14.3386 4.31585 14.3194 4.39781 14.2767L8.00002 12.3972L11.6022 14.2767C11.6842 14.3194 11.7764 14.3386 11.8686 14.332C11.9608 14.3255 12.0493 14.2936 12.1245 14.2398C12.1996 14.1859 12.2583 14.1124 12.2942 14.0272C12.33 13.942 12.3416 13.8485 12.3275 13.7572L11.6992 9.67451L14.5202 6.85355C14.5855 6.78821 14.6314 6.70607 14.6529 6.61623C14.6743 6.52639 14.6705 6.43236 14.6418 6.34458C14.613 6.25679 14.5606 6.17867 14.4901 6.11889C14.4197 6.05911 14.3341 6.01999 14.2429 6.00589L10.1647 5.37829L8.44729 1.94339C8.40604 1.86077 8.34273 1.79118 8.26435 1.74234C8.18598 1.69351 8.09562 1.66732 8.00328 1.6667Z"
                        fill="#4E4D4F"
                      />
                    </svg>
                    <span className="text-xs text-gray-700">4.7</span>
                    <span className="text-xs text-gray-700">+1k Rating</span>
                  </div>
                </div>

                {/* Add to Library Button */}
                <button className="flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded-lg">
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6.16668 2C5.16009 2 4.33334 2.82674 4.33334 3.83333V5.83333C4.33241 5.89959 4.34465 5.96537 4.36935 6.02685C4.39406 6.08834 4.43074 6.1443 4.47726 6.19148C4.52379 6.23867 4.57922 6.27614 4.64035 6.30171C4.70148 6.32729 4.76708 6.34046 4.83334 6.34046C4.89961 6.34046 4.96521 6.32729 5.02634 6.30171C5.08747 6.27614 5.1429 6.23867 5.18942 6.19148C5.23595 6.1443 5.27263 6.08834 5.29733 6.02685C5.32204 5.96537 5.33428 5.89959 5.33334 5.83333V3.83333C5.33334 3.36726 5.7006 3 6.16668 3H12.1667C12.6328 3 13 3.36726 13 3.83333V12.1667C13 12.6327 12.6328 13 12.1667 13H6.16668C5.7006 13 5.33334 12.6327 5.33334 12.1667V10.1732C5.33428 10.1069 5.32204 10.0411 5.29733 9.97966C5.27263 9.91817 5.23595 9.86221 5.18942 9.81503C5.1429 9.76784 5.08747 9.73037 5.02634 9.7048C4.96521 9.67923 4.89961 9.66606 4.83334 9.66606C4.76708 9.66606 4.70148 9.67923 4.64035 9.7048C4.57922 9.73037 4.52379 9.76784 4.47726 9.81503C4.43074 9.86221 4.39406 9.91817 4.36935 9.97966C4.34465 10.0411 4.33241 10.1069 4.33334 10.1732V12.1667C4.33334 13.1733 5.16009 14 6.16668 14H12.1667C13.1733 14 14 13.1733 14 12.1667V3.83333C14 2.82674 13.1733 2 12.1667 2H6.16668Z"
                      fill="white"
                    />
                  </svg>
                  <span className="text-base font-medium">Add To Library</span>
                </button>
              </div>

              {/* Blog Title */}
              <h1 className="text-4xl font-medium text-gray-900 leading-[54px]">
                Blog Title will be here
              </h1>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-[60px] h-[60px] bg-gray-300 rounded-full"></div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-700">
                    Marwa Doe
                  </span>
                  <span className="text-sm text-gray-600">
                    Published on Oct 04, 2024
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-600 leading-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing
                elit. Sed do eiusmod temporLorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed do eiusmod
              </p>

              {/* Technology Tag */}
              <div className="flex">
                <div className="px-4 py-1 bg-yellow-400 rounded-xl">
                  <span className="text-base font-semibold text-yellow-900">
                    Technology
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-300"></div>

            {/* Article Content */}
            <div className="flex flex-col gap-8 w-full">
              {/* First Paragraph */}
              <p className="text-lg text-gray-600 leading-normal">
                Quisque at odio semper, elementum leo sed, congue tellus. Proin
                nunc mauris, porttitor ut eleifend ut, consectetur ut dolor. In
                hac habitasse platea dictumst. Pellentesque ornare nulla ut quam
                blandit scelerisque. Suspendisse non orci id elit tempor rhoncus
                ac id nunc. Integer scelerisque at turpis sit amet faucibus.
                Etiam non euismod urna. Suspendisse vel ex justo. Vivamus
                posuere porttitor ante eu hendrerit.
              </p>

              {/* Article Image */}
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/1efe04c1eff4a17fd1babfba7d90e263e78c634b?width=1500"
                alt="Article image"
                className="w-full h-[500px] object-cover rounded"
              />

              {/* Second Paragraph */}
              <p className="text-lg text-gray-600 leading-normal">
                In lacinia sapien a libero accumsan facilisis. Donec vitae lorem
                massa. Aliquam tristique vehicula enim ut luctus. Vivamus
                gravida dignissim ligula, dictum laoreet elit malesuada ac.
                Praesent est justo, posuere a nisl porta, pharetra posuere
                lectus. Nulla velit odio, tincidunt vel metus a, viverra
                placerat ligula.
                <br />
                <br />
                Donec id nisl et risus volutpat tempor a eget mauris. Nullam
                velit eros, porttitor et urna sit amet, ullamcorper vestibulum
                magna. Quisque consequat arcu eros, lobortis faucibus purus
                facilisis vitae. Nulla at nunc non purus vehicula elementum.
              </p>

              {/* Section Heading */}
              <h2 className="text-3xl font-normal text-gray-900 leading-[42px] tracking-[1.2px]">
                Big heading for a new topic
              </h2>

              {/* Third Paragraph */}
              <p className="text-lg text-gray-600 leading-normal">
                Morbi pellentesque finibus libero, in blandit lorem eleifend
                eget. Praesent egestas hendrerit augue a vestibulum. Nullam
                fringilla, eros malesuada eleifend placerat, lacus tellus
                egestas erat, nec varius sem lorem ut mauris. Morbi libero
                felis.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6 w-[576px]">
            {/* Tags Cloud */}
            <div className="flex flex-wrap gap-2">
              {[
                "AI",
                "MachineLearning",
                "Innovation",
                "Technology",
                "Finance",
                "Blockchain",
                "Data Science",
                "Cloud",
              ].map((tag, index) => (
                <div key={index} className="px-4 py-1 bg-teal-50 rounded-xl">
                  <span className="text-base font-medium text-teal-600">
                    {tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Time Travel Adventure Card */}
            <div className="flex flex-col items-center gap-8 p-12 bg-gray-50 rounded-xl border border-gray-300">
              <div className="w-[252px] h-[119px] relative">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/afe336cddaee2a3c2a6bbce902e3640a376b1ae7?width=1009"
                  alt="Time travel illustration"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col items-center gap-6 text-center">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-slate-700">
                    Ready to Continue Your Journey?
                  </h3>
                  <p className="text-base text-slate-700 max-w-[390px]">
                    Your adventure isn't over yet! With the "Time Travel
                    Adventure" button, you'll dive deeper into the topic you've
                    just explored.
                  </p>
                </div>

                <button className="flex items-center justify-center px-6 py-3 bg-teal-500 text-white rounded-xl text-base font-medium min-w-[266px]">
                  Time Travel Adventure
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DarkFooter />
    </div>
  );

  return currentView === "list" ? <BlogListingView /> : <BlogPostView />;
};

export default BlogPostPage;
