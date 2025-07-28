"use client";

import React, { useState } from "react";

const ContactHero = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <>
      <style>
        {`
          :root {
            --Temp2-Background-bg-Primary: #FFF;
            --Temp2-Text-Primary: #032C3D;
            --Temp2-Button-Primary-bg-primary: #08AD98;
          }
        `}
      </style>

      <div className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80')",
          }}
        />

        {/* Dark Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-70"
          style={{
            backgroundImage:
              "url(https://cdn.builder.io/api/v1/image/assets%2F046614d09b714830be9f4517b1d1f158%2F4ecda91cd9654ee0872a8a60c1371991)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-roboto font-bold mb-8 leading-tight">
                Contact me today to learn more about how I can help you
              </h1>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                  <p className="font-poppins text-lg">
                    Develop a clear business plan
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                  <p className="font-poppins text-lg">
                    Attract and retain high-value clients
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                  <p className="font-poppins text-lg">
                    Streamline your operations
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                  <p className="font-poppins text-lg">
                    Increase your profitability
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                  <p className="font-poppins text-lg">
                    Achieve your personal and professional goals
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="mb-6">
                <h2 className="text-2xl font-roboto font-bold text-[#032C3D] mb-4">
                  Ready to take your financial business to the next level?
                </h2>
                <p className="text-[#2E2E2E] font-poppins text-sm leading-relaxed">
                  I'm here to help. Whether you're just starting out or looking
                  to scale your existing practice, I offer personalized coaching
                  and support to help you achieve your goals.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[#032C3D] font-poppins font-medium mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="write name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-poppins text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#08AD98] focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[#032C3D] font-poppins font-medium mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="write email address"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-poppins text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#08AD98] focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[#032C3D] font-poppins font-medium mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="write Message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-poppins text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#08AD98] focus:border-transparent resize-vertical"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#08AD98] hover:bg-[#078c7d] transition-colors duration-300 text-white font-poppins font-semibold text-lg py-4 rounded-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactHero;
