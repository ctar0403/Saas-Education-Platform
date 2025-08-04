"use client";

import React from "react";

const AboutHero = () => {
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

      <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80')",
          }}
        />

        {/* Dark Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#000000c2",
            backgroundImage: "url(https://cdn.builder.io/api/v1/image/assets%2F046614d09b714830be9f4517b1d1f158%2Fdcfeaee1dcd149af91bc004ef92fd2fd)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            minHeight: "14px"
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold font-roboto mb-6 leading-tight">
            FinX is your Guide to Financial Clarity and
            <br />
            Confidence
          </h1>

          <p className="text-lg md:text-xl font-poppins mb-8 max-w-4xl mx-auto leading-relaxed opacity-90">
            With the best online financial coaching courses, we help you in 2023
            and beyond improve your ability to think of sophisticated financial
            moves including working, saving, investing and spending in a way
            that aligns with your values and brings you joy.
          </p>

          <button className="bg-[#08AD98] hover:bg-[#078c7d] transition-colors duration-300 text-white font-poppins font-semibold text-lg px-8 py-4 rounded-lg">
            Book your FREE consultation now
          </button>
        </div>
      </div>
    </>
  );
};

export default AboutHero;
