"use client";

import React from "react";

const CoachingFeatures = () => {
  return (
    <div className="space-y-6">
      {/* What's Included */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-roboto font-bold text-[#032C3D] mb-4">
          What's Included
        </h3>

        <div className="space-y-4">
          {[
            {
              icon: "💬",
              title: "1-on-1 Video Session",
              description:
                "60-minute personalized coaching session via video call",
            },
            {
              icon: "📋",
              title: "Custom Action Plan",
              description: "Tailored financial roadmap based on your goals",
            },
            {
              icon: "📊",
              title: "Financial Analysis",
              description:
                "Comprehensive review of your current financial situation",
            },
            {
              icon: "📖",
              title: "Resource Materials",
              description: "Worksheets, templates, and guides for your journey",
            },
            {
              icon: "💡",
              title: "Follow-up Support",
              description: "Email support for 7 days after your session",
            },
          ].map((feature, index) => (
            <div key={index} className="flex gap-3">
              <div className="text-2xl">{feature.icon}</div>
              <div>
                <h4 className="font-medium text-[#032C3D] mb-1">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coach Profile */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-roboto font-bold text-[#032C3D] mb-4">
          Your Coach
        </h3>

        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
            alt="Coach John Smith"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-[#032C3D]">John Smith</h4>
            <p className="text-sm text-gray-600">Certified Financial Planner</p>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-gray-500 ml-1">(4.9)</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-4">
          With over 10 years of experience in financial planning, John has
          helped hundreds of clients achieve their financial goals through
          personalized coaching and strategic planning.
        </p>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Experience:</span>
            <span className="font-medium">10+ years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Clients Helped:</span>
            <span className="font-medium">500+</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Specialization:</span>
            <span className="font-medium">Investment Planning</span>
          </div>
        </div>
      </div>

      {/* Policies */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-roboto font-bold text-[#032C3D] mb-4">
          Booking Policies
        </h3>

        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-[#08AD98] rounded-full mt-2 flex-shrink-0"></div>
            <span>Sessions can be rescheduled up to 24 hours in advance</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-[#08AD98] rounded-full mt-2 flex-shrink-0"></div>
            <span>
              Full refund available if cancelled 48 hours before session
            </span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-[#08AD98] rounded-full mt-2 flex-shrink-0"></div>
            <span>Session recordings available upon request</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-[#08AD98] rounded-full mt-2 flex-shrink-0"></div>
            <span>All discussions are completely confidential</span>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Need Help?</h4>
        <p className="text-blue-700 text-sm mb-3">
          Have questions about booking or need to make changes?
        </p>
        <button className="text-blue-600 text-sm font-medium hover:underline">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default CoachingFeatures;
