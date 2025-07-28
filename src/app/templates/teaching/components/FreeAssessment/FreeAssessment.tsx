import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FreeAssessment = () => {
  return (
    <section className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 bg-[#EAF1F6]">
      <div className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-2xl">
        <h2 className="w-full text-[#011117] text-center font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight sm:leading-[50px] md:leading-[70px]">
          Free Assessment
        </h2>

        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <Input
              placeholder="User name"
              className="w-full px-4 py-3 border border-[#CBCBCB] rounded-lg bg-white placeholder:text-[#CBCBCB] font-poppins text-base sm:text-lg font-semibold"
            />
            <Input
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-[#CBCBCB] rounded-lg bg-white placeholder:text-[#CBCBCB] font-poppins text-base sm:text-lg font-semibold"
            />
          </div>
          <Textarea
            placeholder="Message"
            className="w-full h-32 sm:h-40 md:h-[197px] px-4 py-3 border border-[#CBCBCB] rounded-lg bg-white placeholder:text-[#CBCBCB] font-poppins text-base sm:text-lg font-semibold resize-none"
          />
        </div>

        <Button className="bg-[#08AD98] hover:bg-[#06967f] text-white font-poppins font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-[10px] w-full sm:w-auto">
          Send Message for Free Assessment
        </Button>
      </div>
    </section>
  );
};

export default FreeAssessment;
