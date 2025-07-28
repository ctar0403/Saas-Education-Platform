import React from "react";
import { Button } from "@/components/ui/button";

const PainPoint = () => {
  const painPoints = [
    {
      title: "Cash Flow Chaos",
      description:
        "Are unpredictable income streams and unexpected expenses keeping you up at night?",
    },
    {
      title: "Profitability Puzzle",
      description:
        "Is your business making enough money? Are you unsure how to increase your profit margins?",
    },
    {
      title: "Growth Gridlock",
      description:
        "Feeling stuck and unsure how to scale your business? Break through barriers and unlock your full potential.",
    },
  ];

  return (
    <section className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 bg-white gap-4">
      <div className="flex flex-col items-start gap-4 w-full">
        <h2 className="w-full text-[#032C3D] text-center font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight sm:leading-[50px] md:leading-[70px] px-2">
          Overwhelmed & Uncertain?
        </h2>
        <p className="w-full text-[#032C3D] text-center font-poppins text-base sm:text-lg md:text-xl font-normal leading-relaxed sm:leading-[28px] md:leading-[33px] px-2">
          Feeling lost in the financial maze of your business? You&apos;re not
          alone. Many entrepreneurs struggle with the same challenges.
          Let&apos;s tackle them together.
        </p>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-4 sm:gap-6 w-full p-4 sm:p-8 md:p-12">
        {painPoints.map((point, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-4 w-full sm:w-[313px] min-w-[209px] max-w-[587px] p-4 sm:p-6 rounded-2xl bg-[#043A51]"
          >
            <div className="flex flex-col items-center gap-3 w-full min-h-[114px]">
              <h3 className="w-full text-white text-center font-poppins text-lg sm:text-xl md:text-2xl font-medium leading-8 sm:leading-10">
                {point.title}
              </h3>
            </div>
            <p className="min-h-[120px] sm:min-h-[165px] w-full text-white text-center font-outfit text-base sm:text-lg md:text-xl font-normal leading-6 sm:leading-8">
              {point.description}
            </p>
          </div>
        ))}
      </div>

      <Button className="bg-[#08AD98] hover:bg-[#06967f] text-white font-poppins font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-[10px] w-full sm:w-auto max-w-sm">
        Book your FREE consultation now
      </Button>
    </section>
  );
};

export default PainPoint;
