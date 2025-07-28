import React from "react";
import { Button } from "@/components/ui/button";
import { DollarSign, FileText, Eye } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: (
        <DollarSign className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[105px] lg:h-[105px] text-[#043A51]" />
      ),
      title: "Uncover Your Financial Vision",
      description:
        "Together, we'll dive deep into your business goals and financial aspirations.",
    },
    {
      icon: (
        <FileText className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[105px] lg:h-[105px] text-[#043A51]" />
      ),
      title: "Craft Your Personalized Financial Roadmap",
      description:
        "We'll provide you with the tools and strategies tailored to your unique business needs",
    },
    {
      icon: (
        <Eye className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[105px] lg:h-[105px] text-[#043A51]" />
      ),
      title: "Achieve Financial Freedom",
      description:
        "We'll work together to implement your plan and overcome any challenges along the way.",
    },
  ];

  return (
    <section className="w-full">
      <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-12 px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 bg-white">
        <div className="flex flex-col items-center gap-4 w-full text-center">
          <h2 className="w-full text-[#032C3D] font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight sm:leading-[50px] md:leading-[70px]">
            How does it work ?
          </h2>
          <p className="w-full text-[#032C3D] font-poppins text-base sm:text-lg md:text-xl font-normal leading-relaxed sm:leading-[28px] md:leading-[33px] max-w-4xl">
            Overwhelmed by your business finances? Ready to turn chaos into
            confidence?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 w-full max-w-7xl">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-[#F2F4F7] min-h-[300px] sm:min-h-[350px] md:min-h-[393px] justify-center"
            >
              <div className="flex-shrink-0">{step.icon}</div>
              <h3 className="w-full text-[#032C3D] text-center font-poppins text-lg sm:text-xl md:text-2xl font-medium leading-8 sm:leading-10">
                {step.title}
              </h3>
              <p className="w-full text-[#4E4D4F] text-center font-poppins text-sm sm:text-base md:text-lg font-normal leading-relaxed sm:leading-[28px] md:leading-[33px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <Button className="bg-[#08AD98] hover:bg-[#06967f] text-white font-poppins font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-[10px] w-full sm:w-auto max-w-sm">
          Book your FREE consultation now
        </Button>
      </div>
    </section>
  );
};

export default HowItWorks;
