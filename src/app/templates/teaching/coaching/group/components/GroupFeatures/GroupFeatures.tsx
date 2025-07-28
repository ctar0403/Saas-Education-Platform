"use client";

import React from "react";

const GroupFeatures = () => {
  return (
    <div className="space-y-6">
      {/* Group Benefits */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-roboto font-bold text-[#032C3D] mb-4">
          Group Coaching Benefits
        </h3>

        <div className="space-y-4">
          {[
            {
              icon: "👥",
              title: "Peer Learning",
              description:
                "Learn from diverse perspectives and shared experiences",
            },
            {
              icon: "💰",
              title: "Cost Effective",
              description:
                "Get expert coaching at a fraction of individual session cost",
            },
            {
              icon: "🎯",
              title: "Structured Program",
              description:
                "Follow a proven curriculum designed for progressive learning",
            },
            {
              icon: "🤝",
              title: "Accountability",
              description:
                "Stay motivated with group support and accountability",
            },
            {
              icon: "🌟",
              title: "Community Support",
              description:
                "Build lasting connections with like-minded individuals",
            },
            {
              icon: "📈",
              title: "Accelerated Results",
              description:
                "Achieve goals faster through group motivation and insights",
            },
          ].map((benefit, index) => (
            <div key={index} className="flex gap-3">
              <div className="text-2xl">{benefit.icon}</div>
              <div>
                <h4 className="font-medium text-[#032C3D] mb-1">
                  {benefit.title}
                </h4>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Group Structure */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-roboto font-bold text-[#032C3D] mb-4">
          How It Works
        </h3>

        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-[#08AD98] text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="font-medium text-[#032C3D] mb-1">
                Apply & Get Matched
              </h4>
              <p className="text-sm text-gray-600">
                Submit your application and get matched with the right group
                level
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 bg-[#08AD98] text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
              2
            </div>
            <div>
              <h4 className="font-medium text-[#032C3D] mb-1">
                Join Weekly Sessions
              </h4>
              <p className="text-sm text-gray-600">
                Attend 90-minute weekly sessions with your group and coach
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 bg-[#08AD98] text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
              3
            </div>
            <div>
              <h4 className="font-medium text-[#032C3D] mb-1">
                Complete Assignments
              </h4>
              <p className="text-sm text-gray-600">
                Work on practical exercises between sessions to reinforce
                learning
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 bg-[#08AD98] text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
              4
            </div>
            <div>
              <h4 className="font-medium text-[#032C3D] mb-1">
                Achieve Your Goals
              </h4>
              <p className="text-sm text-gray-600">
                Graduate with actionable plans and ongoing peer support network
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-roboto font-bold text-[#032C3D] mb-4">
          Success Stories
        </h3>

        <div className="space-y-4">
          <div className="border-l-4 border-[#08AD98] pl-4">
            <p className="text-sm text-gray-700 italic mb-2">
              "The group coaching program helped me pay off $15,000 in debt in
              just 8 months. The peer support was invaluable!"
            </p>
            <p className="text-xs text-gray-500">
              - Sarah M., Beginner Group Graduate
            </p>
          </div>

          <div className="border-l-4 border-[#08AD98] pl-4">
            <p className="text-sm text-gray-700 italic mb-2">
              "I learned investment strategies I never knew existed. My
              portfolio has grown 25% since completing the intermediate
              program."
            </p>
            <p className="text-xs text-gray-500">
              - Mike C., Intermediate Group Graduate
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-roboto font-bold text-[#032C3D] mb-4">
          Frequently Asked Questions
        </h3>

        <div className="space-y-3 text-sm">
          <div>
            <h4 className="font-medium text-[#032C3D] mb-1">
              What if I miss a session?
            </h4>
            <p className="text-gray-600">
              All sessions are recorded and shared with the group within 24
              hours.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-[#032C3D] mb-1">
              Can I switch groups?
            </h4>
            <p className="text-gray-600">
              Yes, if you find the level isn't right, we can help you transfer
              to a more suitable group.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-[#032C3D] mb-1">
              Is there homework?
            </h4>
            <p className="text-gray-600">
              Light assignments help reinforce learning, typically 30-60 minutes
              per week.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Questions?</h4>
        <p className="text-blue-700 text-sm mb-3">
          Not sure which group is right for you? Our team can help!
        </p>
        <button className="text-blue-600 text-sm font-medium hover:underline">
          Schedule Free Consultation
        </button>
      </div>
    </div>
  );
};

export default GroupFeatures;
