"use client";

import React, { useState } from "react";

const SessionBooking = () => {
  const [selectedDate, setSelectedDate] = useState("2024-01-15");
  const [selectedTime, setSelectedTime] = useState("");

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const bookedSlots = ["10:00 AM", "2:00 PM"];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <h2 className="text-2xl font-roboto font-bold text-[#032C3D] mb-6">
        Book Your Session
      </h2>

      {/* Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-[#032C3D] mb-4">
            Select Date
          </h3>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-gray-500 p-2"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <button
                  key={day}
                  onClick={() =>
                    setSelectedDate(
                      `2024-01-${day.toString().padStart(2, "0")}`,
                    )
                  }
                  className={`p-2 text-sm rounded hover:bg-gray-100 ${
                    selectedDate ===
                    `2024-01-${day.toString().padStart(2, "0")}`
                      ? "bg-[#08AD98] text-white"
                      : "text-gray-700"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="text-lg font-semibold text-[#032C3D] mb-4">
            Available Times
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                disabled={bookedSlots.includes(time)}
                className={`p-3 text-sm rounded-lg border transition-colors ${
                  bookedSlots.includes(time)
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                    : selectedTime === time
                      ? "bg-[#08AD98] text-white border-[#08AD98]"
                      : "bg-white text-gray-700 border-gray-300 hover:border-[#08AD98]"
                }`}
              >
                {time}
                {bookedSlots.includes(time) && (
                  <div className="text-xs mt-1">Booked</div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-[#032C3D] mb-4">
          Session Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Topic
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08AD98] focus:border-transparent">
              <option>Budget Planning</option>
              <option>Investment Strategy</option>
              <option>Debt Management</option>
              <option>Retirement Planning</option>
              <option>General Financial Review</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests
            </label>
            <input
              type="text"
              placeholder="Any specific topics you'd like to cover?"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08AD98] focus:border-transparent"
            />
          </div>
        </div>

        {selectedDate && selectedTime && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">
              Booking Summary
            </h4>
            <p className="text-green-700 text-sm">
              <strong>Date:</strong>{" "}
              {new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-green-700 text-sm">
              <strong>Time:</strong> {selectedTime}
            </p>
            <p className="text-green-700 text-sm">
              <strong>Duration:</strong> 60 minutes
            </p>
            <p className="text-green-700 text-sm">
              <strong>Price:</strong> $150
            </p>
          </div>
        )}

        <div className="flex gap-4 mt-6">
          <button
            disabled={!selectedDate || !selectedTime}
            className="bg-[#08AD98] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#078c7d] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Book Session ($150)
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Save for Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionBooking;
