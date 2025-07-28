import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const WorthIt = () => {
  const features = [
    "Ongoing Support",
    "Personalized Financial Roadmaps",
    "Actionable Strategies",
    "Tailored Solutions",
  ];

  return (
    <section className="flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 bg-white">
      <div className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-6xl text-center">
        <h2 className="w-full text-[#032C3D] font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight sm:leading-[50px] md:leading-[70px]">
          Is Mastering Your Business Finances Really Worth It?
        </h2>

        <p className="w-full text-[#032C3D] font-poppins text-base sm:text-lg md:text-xl font-normal leading-relaxed sm:leading-[28px] md:leading-[33px] max-w-4xl">
          Are you wondering if investing in your financial knowledge is worth
          the cost? We understand. That&apos;s why we let our clients&apos;
          success stories speak for themselves.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full my-4 sm:my-6 md:my-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-lg bg-gray-50"
            >
              <Check className="w-5 h-5 sm:w-6 sm:h-6 text-[#08AD98] flex-shrink-0" />
              <span className="text-[#032C3D] font-poppins text-sm sm:text-base font-semibold leading-relaxed text-center sm:text-left">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <Button className="bg-[#08AD98] hover:bg-[#06967f] text-white font-poppins font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-[10px] w-full sm:w-auto max-w-sm">
          Send Message for Free Assessment
        </Button>
      </div>
    </section>
  );
};

export default WorthIt;
