import React from "react";
import { Button } from "@/components/ui/button";

interface PainPointProps {
  heading?: string;
  subheading?: string;
  pain1Title?: string;
  pain1Description?: string;
  pain2Title?: string;
  pain2Description?: string;
  pain3Title?: string;
  pain3Description?: string;
  buttonText?: string;
  backgroundColor?: string;
}

const PainPoint: React.FC<PainPointProps> = ({
  heading = "Overwhelmed & Uncertain?",
  subheading = "Feeling lost in the financial maze of your business? You're not alone. Many entrepreneurs struggle with the same challenges. Let's tackle them together.",
  pain1Title = "Cash Flow Chaos",
  pain1Description = "Are unpredictable income streams and unexpected expenses keeping you up at night?",
  pain2Title = "Profitability Puzzle",
  pain2Description = "Is your business making enough money? Are you unsure how to increase your profit margins?",
  pain3Title = "Growth Gridlock",
  pain3Description = "Feeling stuck and unsure how to scale your business? Break through barriers and unlock your full potential.",
  buttonText = "Book your FREE consultation now",
  backgroundColor = "#FFFFFF",
}) => {
  const painPoints = [
    {
      title: pain1Title,
      description: pain1Description,
    },
    {
      title: pain2Title,
      description: pain2Description,
    },
    {
      title: pain3Title,
      description: pain3Description,
    },
  ];

  return (
    <section className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 gap-4" style={{ backgroundColor }}>
      <div className="flex flex-col items-start gap-4 w-full">
        <h2 className="w-full text-[#032C3D] text-center font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight sm:leading-[50px] md:leading-[70px] px-2">
          {heading}
        </h2>
        <p className="w-full text-[#032C3D] text-center font-poppins text-base sm:text-lg md:text-xl font-normal leading-relaxed sm:leading-[28px] md:leading-[33px] px-2">
          {subheading}
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
        {buttonText}
      </Button>
    </section>
  );
};

export default PainPoint;
