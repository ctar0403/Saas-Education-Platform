import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ExpertInfoProps {
  imageUrl?: string;
  heading?: string;
  description?: string;
  benefit1?: string;
  benefit2?: string;
  benefit3?: string;
  buttonText?: string;
  backgroundColor?: string;
}

const ExpertInfo: React.FC<ExpertInfoProps> = ({
  imageUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=640&q=80",
  heading = "I'm Here To help!",
  description = "As a financial business coach, I understand the unique challenges you face. It's not just about crunching numbers; it's about making informed decisions that drive your business forward. I'm here to be your trusted partner, offering:",
  benefit1 = "Together, we'll demystify your finances, creating a clear picture of your current situation and future possibilities.",
  benefit2 = "Armed with knowledge and a solid plan, you'll gain the confidence to make bold decisions and pursue ambitious goals.",
  benefit3 = "No more feeling at the mercy of your finances. You'll take charge, steering your business towards sustainable growth and long-term success.",
  buttonText = "Book your FREE consultation now",
  backgroundColor = "#E6EBEE",
}) => {
  const benefits = [benefit1, benefit2, benefit3];

  return (
    <section className="px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24" style={{ backgroundColor }}>
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 max-w-7xl mx-auto">
        {/* Left side - Image and Benefits */}
        <div className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2">
          <div className="relative w-full">
            <Image
              src={imageUrl}
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
            {heading}
          </h2>

          <p className="text-[#032C3D] font-poppins text-base sm:text-lg md:text-xl font-normal leading-relaxed sm:leading-[28px] md:leading-[33px]">
            {description}
          </p>

          <Button className="bg-[#08AD98] hover:bg-[#06967f] text-white font-poppins font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-[10px] w-full sm:w-auto">
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExpertInfo;
