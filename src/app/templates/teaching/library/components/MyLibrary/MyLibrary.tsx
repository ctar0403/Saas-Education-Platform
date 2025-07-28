"use client";

import React, { useState } from "react";
import LibraryCard from "../LibraryCard/LibraryCard";

const MyLibrary = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = [
    { name: "All", count: 14 },
    { name: "My Course", count: 10 },
    { name: "Bundle", count: 3 },
    { name: "Coaching", count: 2 },
    { name: "Digital Downloads", count: 3 },
    { name: "Articles", count: 5 },
  ];

  const libraryItems = [
    {
      id: 1,
      title: "Course Name will be here it might have two lines",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      type: "Course",
      date: "08/07/2024",
      status: "Ready to Start! 5 Lessons Awaits!",
      badge: "Payment Due Soon",
      category: "Business",
    },
    {
      id: 2,
      title: "Coaching Name will be here it might have two lines",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      type: "Coaching",
      subType: "one to one coaching",
      date: "08/07/2024",
      status: "2 of 5 Sessions Completed",
      badge: "Completed",
    },
    {
      id: 3,
      title: "Course Name will be here it might have two lines",
      image:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      type: "Course",
      date: "08/07/2024",
      status: "Congrats! Certificate Available Now",
      badge: "Completed",
    },
    {
      id: 4,
      title: "Coaching Name will be here it might have two lines",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      type: "Coaching",
      subType: "one to one coaching",
      date: "08/07/2024",
      status: "Congrats! Certificate Available Now",
      badge: "Completed",
    },
    {
      id: 5,
      title: "Coaching Name will be here it might have two lines",
      image:
        "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      type: "Coaching",
      subType: "one to one coaching",
      date: "08/07/2024",
      status: "2 of 5 Sessions Completed",
      badge: "Completed",
    },
    {
      id: 6,
      title: "Course Name will be here it might have two lines",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      type: "Course",
      date: "08/07/2024",
      status: "Upcoming Session",
      badge: "Upcoming",
    },
    {
      id: 7,
      title: "Resource Name will be here it might have two lines",
      image:
        "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      type: "Digital Downloads",
      date: "08/07/2024",
      status: "2 of 5 Sessions Completed",
      badge: "Expired",
    },
    {
      id: 8,
      title: "Course Name will be here it might have two lines",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      type: "Course",
      date: "08/07/2024",
      status: "2 of 5 Sessions Completed",
      badge: "Expired",
    },
    {
      id: 9,
      title: "Resource Name will be here it might have two lines",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      type: "Digital Downloads",
      date: "08/07/2024",
      status: "eBook",
      downloads: "10 Files",
    },
    {
      id: 10,
      title: "Course Name will be here it might have two lines",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      type: "Course",
      date: "08/07/2024",
      status: "3 of 5 Sessions Completed",
      badge: "Expired",
    },
    {
      id: 11,
      title: "Resource Name will be here it might have two lines",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      type: "Digital Downloads",
      date: "08/07/2024",
      status: "Resource Pack",
      downloads: "10 Files",
    },
    {
      id: 12,
      title: "Bundle Name will be here it might have two lines",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      type: "Bundle",
      date: "08/07/2024",
      status: "Ready to Start",
      products: "4 Coaching + 5 Courses",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h2 className="text-2xl font-roboto font-bold text-[#032C3D] mb-6">
        My Library
      </h2>

      {/* Search and Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg w-64 text-sm focus:outline-none focus:ring-2 focus:ring-[#08AD98] focus:border-transparent"
          />
          <svg
            className="absolute right-3 top-2.5 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
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
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
            />
          </svg>
          Filters
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.name
                ? "text-[#08AD98] border-[#08AD98]"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            {tab.name} <span className="ml-1 text-xs">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Library Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {libraryItems.map((item) => (
          <LibraryCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default MyLibrary;
