import React from "react";
import { Star, Eye, Settings } from "lucide-react";

const ValueStack = () => {
  const values = [
    {
      icon: (
        <Star className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
      ),
      text: "Value",
    },
    {
      icon: (
        <Eye className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
      ),
      text: "Value",
    },
    {
      icon: (
        <Settings className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
      ),
      text: "Value",
    },
  ];

  return (
    <section className="flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 py-8 sm:py-12 md:py-16 bg-[#043A51]">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 w-full">
        {values.map((value, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-3 sm:gap-4 min-w-[200px] sm:min-w-[240px]"
          >
            {value.icon}
            <span className="text-white font-poppins text-xl sm:text-2xl md:text-3xl font-medium">
              {value.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueStack;
