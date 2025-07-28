"use client";

import React, { useState } from "react";

const GroupBooking = () => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [formData, setFormData] = useState({
    experience: "",
    goals: "",
    availability: "",
    expectations: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Group booking submission:", { selectedGroup, ...formData });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-roboto font-bold text-[#032C3D] mb-6">
        Join a Group Session
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Group Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Group Level *
          </label>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08AD98] focus:border-transparent"
          >
            <option value="">Choose your level</option>
            <option value="beginner">
              Financial Foundations (Beginner) - $75
            </option>
            <option value="intermediate">
              Wealth Building Strategies (Intermediate) - $75
            </option>
            <option value="advanced">
              Financial Independence (Advanced) - $75
            </option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Financial Experience Level *
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08AD98] focus:border-transparent"
          >
            <option value="">Select your experience</option>
            <option value="complete-beginner">Complete beginner</option>
            <option value="some-knowledge">Some financial knowledge</option>
            <option value="intermediate">Intermediate understanding</option>
            <option value="advanced">Advanced knowledge</option>
          </select>
        </div>

        {/* Financial Goals */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Financial Goals *
          </label>
          <textarea
            name="goals"
            value={formData.goals}
            onChange={handleInputChange}
            required
            rows={3}
            placeholder="What are your main financial goals? (e.g., pay off debt, save for house, build emergency fund, invest for retirement)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08AD98] focus:border-transparent resize-vertical"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Availability *
          </label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08AD98] focus:border-transparent"
          >
            <option value="">Select your availability</option>
            <option value="weekday-morning">Weekday mornings</option>
            <option value="weekday-afternoon">Weekday afternoons</option>
            <option value="weekday-evening">Weekday evenings</option>
            <option value="weekend-morning">Weekend mornings</option>
            <option value="weekend-afternoon">Weekend afternoons</option>
            <option value="flexible">Flexible schedule</option>
          </select>
        </div>

        {/* Expectations */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What do you hope to achieve? *
          </label>
          <textarea
            name="expectations"
            value={formData.expectations}
            onChange={handleInputChange}
            required
            rows={3}
            placeholder="Describe what you hope to learn and achieve through group coaching"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08AD98] focus:border-transparent resize-vertical"
          />
        </div>

        {/* Group Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Group Guidelines</h4>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Attend all sessions when possible for maximum benefit</li>
            <li>• Participate actively and respectfully in discussions</li>
            <li>• Keep all group discussions confidential</li>
            <li>• Come prepared with questions and insights to share</li>
            <li>• Support fellow group members on their financial journey</li>
          </ul>
        </div>

        {/* Pricing Summary */}
        {selectedGroup && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">
              Booking Summary
            </h4>
            <div className="text-green-700 text-sm space-y-1">
              <p>
                <strong>Group:</strong>{" "}
                {selectedGroup.charAt(0).toUpperCase() + selectedGroup.slice(1)}{" "}
                Level
              </p>
              <p>
                <strong>Price:</strong> $75 per session
              </p>
              <p>
                <strong>Duration:</strong> 90 minutes per session
              </p>
              <p>
                <strong>Commitment:</strong> Weekly sessions for program
                duration
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={!selectedGroup || !formData.experience || !formData.goals}
            className="bg-[#08AD98] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#078c7d] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Submit Application
          </button>
          <button
            type="button"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Save as Draft
          </button>
        </div>

        <p className="text-sm text-gray-500">
          * Applications are reviewed within 24 hours. You'll receive a
          confirmation email with group details and payment instructions.
        </p>
      </form>
    </div>
  );
};

export default GroupBooking;
