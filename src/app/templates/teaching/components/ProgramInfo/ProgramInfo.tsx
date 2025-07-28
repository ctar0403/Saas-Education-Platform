import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, TrendingUp, Building2, FileText } from "lucide-react";

const ProgramInfo = () => {
  const features = [
    {
      icon: <Eye className="w-9 h-9 text-[#043A51]" />,
      title: "Gain Clarity",
      description:
        "We'll create a personalized roadmap to optimize cash flow, conquer debt, and fuel your growth.",
      bgColor: "#EDF3FF",
    },
    {
      icon: <TrendingUp className="w-9 h-9 text-[#043A51]" />,
      title: "Growth Strategy",
      description:
        "We'll help you identify profit leaks, price strategically, and build a sustainable business",
      bgColor: "#E8FAF6",
    },
    {
      icon: <Building2 className="w-9 h-9 text-[#043A51]" />,
      title: "Freedom For Enterprise",
      description:
        "We'll equip you with the financial tools and strategies to secure funding, manage growth,",
      bgColor: "#FFEAEE",
    },
    {
      icon: <FileText className="w-9 h-9 text-[#043A51]" />,
      title: "Financial Planning",
      description:
        "We'll guide you toward smart investments, tax efficiency, and long-term wealth building.",
      bgColor: "#FFF4DA",
    },
  ];

  return (
    <section className="flex flex-col lg:flex-row justify-between items-center px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 bg-white gap-8 lg:gap-12">
      <div className="flex flex-col justify-center items-start gap-4 sm:gap-6 w-full lg:w-auto">
        <h2 className="w-full max-w-[576px] text-[#032C3D] font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight sm:leading-[50px] md:leading-[70px]">
          Financial Edition Program
        </h2>

        <p className="w-full max-w-[576px] text-[#032C3D] font-poppins text-base sm:text-lg md:text-xl font-semibold leading-relaxed sm:leading-[28px] md:leading-[33px]">
          It&apos;s time to transform your relationship with money and fuel your
          business growth.
        </p>

        <p className="w-full max-w-[576px] text-[#032C3D] font-poppins text-base sm:text-lg md:text-xl font-normal leading-relaxed sm:leading-[28px] md:leading-[33px]">
          You&apos;re passionate about your business, but financial worries keep
          you up at night. Cash flow problems, confusing taxes, and the fear of
          making the wrong decisions are holding you back.
          <br />
          <br />
          I&apos;m here to guide you through the financial fog. Together,
          we&apos;ll create a clear financial roadmap, optimize your cash flow,
          and build a solid foundation for sustainable business success.
        </p>

        <Button className="w-full max-w-[576px] bg-[#08AD98] hover:bg-[#06967f] text-white font-poppins font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-[10px]">
          View Details
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full lg:w-[607px] max-w-[607px]">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-start gap-4 p-4 sm:p-6 rounded border shadow-sm bg-white w-full min-h-[200px] sm:min-h-[254px]"
          >
            <div className="flex flex-col justify-center items-start gap-2 h-auto">
              <div
                className="flex justify-center items-center w-12 h-12 sm:w-16 sm:h-16 p-2 sm:p-3 rounded-xl"
                style={{ backgroundColor: feature.bgColor }}
              >
                {feature.icon}
              </div>
              <h3 className="text-[#043A51] font-poppins text-sm sm:text-base font-medium leading-6 sm:leading-10">
                {feature.title}
              </h3>
            </div>
            <p className="w-full text-[#4E4D4F] font-poppins text-xs sm:text-sm font-normal leading-5 sm:leading-[25px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgramInfo;
