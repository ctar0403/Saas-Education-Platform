import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FigmaButton from "../ui/FigmaButton";

interface FreeAssessmentProps {
  heading?: string;
  usernamePlaceholder?: string;
  emailPlaceholder?: string;
  messagePlaceholder?: string;
  buttonText?: string;
  backgroundColor?: string;
}

const FreeAssessment: React.FC<FreeAssessmentProps> = ({
  heading = "Free Assessment",
  usernamePlaceholder = "User name",
  emailPlaceholder = "Email Address",
  messagePlaceholder = "Message",
  buttonText = "Send Message for Free Assessment",
  backgroundColor = "#EAF1F6",
}) => {
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24" style={{ backgroundColor }}>
      <div className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-2xl">
        <h2 className="w-full text-[#011117] text-center font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight sm:leading-[50px] md:leading-[70px]">
          {heading}
        </h2>

        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <Input
              placeholder={usernamePlaceholder}
              className="w-full px-4 py-3 border border-[#CBCBCB] rounded-lg bg-white placeholder:text-[#CBCBCB] font-poppins text-base sm:text-lg font-semibold"
            />
            <Input
              placeholder={emailPlaceholder}
              className="w-full px-4 py-3 border border-[#CBCBCB] rounded-lg bg-white placeholder:text-[#CBCBCB] font-poppins text-base sm:text-lg font-semibold"
            />
          </div>
          <Textarea
            placeholder={messagePlaceholder}
            className="w-full h-32 sm:h-40 md:h-[197px] px-4 py-3 border border-[#CBCBCB] rounded-lg bg-white placeholder:text-[#CBCBCB] font-poppins text-base sm:text-lg font-semibold resize-none"
          />
        </div>

        <FigmaButton variant="primary" size="md" fullWidth>
          {buttonText}
        </FigmaButton>
      </div>
    </section>
  );
};

export default FreeAssessment;
