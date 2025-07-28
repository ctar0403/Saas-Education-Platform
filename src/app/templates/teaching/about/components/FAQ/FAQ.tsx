"use client";

import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is a Financial business coach?",
      answer:
        "A financial business coach is a professional who combines business development expertise with financial planning knowledge to help entrepreneurs and business owners make informed decisions that drive sustainable growth. They provide guidance on cash flow management, investment strategies, and operational efficiency.",
    },
    {
      question: "How can a Financial business coach help my business?",
      answer:
        "A financial business coach can help optimize your financial operations, create sustainable revenue streams, improve cash flow management, develop investment strategies, and create long-term financial plans that align with your business goals.",
    },
    {
      question: "What can I expect from working with FinX?",
      answer:
        "Working with FinX, you can expect personalized financial strategies, comprehensive business analysis, ongoing support and mentorship, practical tools and resources, and measurable results in your financial performance and business growth.",
    },
    {
      question: "How can FinX help me achieve my financial goals?",
      answer:
        "FinX provides customized financial roadmaps, strategic planning sessions, implementation support, regular progress monitoring, and expert guidance to help you systematically achieve your short-term and long-term financial objectives.",
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-8">
        <h2 className="text-4xl font-roboto font-bold text-[#032C3D] text-center mb-16">
          FAQ
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full text-left p-6 bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span className="font-poppins font-semibold text-[#032C3D] text-lg pr-4">
                  {faq.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-full bg-[#08AD98] flex items-center justify-center transition-transform duration-200 ${openIndex === index ? "rotate-45" : ""}`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 4V12M4 8H12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 bg-gray-50">
                  <p className="font-poppins text-[#2E2E2E] text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
