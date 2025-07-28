import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ExpertInfo = () => {
  const benefits = [
    "Together, we'll demystify your finances, creating a clear picture of your current situation and future possibilities.",
    "Armed with knowledge and a solid plan, you'll gain the confidence to make bold decisions and pursue ambitious goals.",
    "No more feeling at the mercy of your finances. You'll take charge, steering your business towards sustainable growth and long-term success.",
  ];

  return (
    <section className="px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 bg-[#E6EBEE]">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 max-w-7xl mx-auto">
        {/* Left side - Image and Benefits */}
        <div className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2">
          <div className="relative w-full">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=640&q=80"
              alt="Financial Expert"
              width={640}
              height={400}
              className="rounded border w-full h-auto object-cover"
            />
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 rounded-lg bg-[#045147]">
            {benefits.map((benefit, index) => (
              <p
                key={index}
                className="text-white font-poppins text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed sm:leading-[28px] md:leading-[33px]"
              >
                {benefit}
              </p>
            ))}
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex flex-col items-start gap-4 sm:gap-6 w-full lg:w-1/2">
          <h2 className="text-[#032C3D] font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight sm:leading-[50px] md:leading-[70px]">
            I&apos;m Here To help!
          </h2>

          <p className="text-[#032C3D] font-poppins text-base sm:text-lg md:text-xl font-normal leading-relaxed sm:leading-[28px] md:leading-[33px]">
            As a financial business coach, I understand the unique challenges
            you face. It&apos;s not just about crunching numbers; it&apos;s
            about making informed decisions that drive your business forward.
            I&apos;m here to be your trusted partner, offering:
          </p>

          <Button className="bg-[#08AD98] hover:bg-[#06967f] text-white font-poppins font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-[10px] w-full sm:w-auto">
            Book your FREE consultation now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExpertInfo;
