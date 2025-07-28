import React from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Before working with FinX, my business finances felt like a tangled mess. I was constantly stressed and unsure if I was making the right decisions. Now, I have a clear financial roadmap and the confidence to invest in my business's future. I finally feel in control!",
      name: "Maher L",
      date: "29 August 2021",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&q=80",
    },
    {
      quote:
        "I always knew my passion could be profitable, but I struggled to turn it into a sustainable income. FinX helped me identify hidden costs, optimize my pricing, and create a business model that truly works. My profits have soared, and I'm finally able to pay myself what I'm worth.",
      name: "Samar L",
      date: "29 August 2021",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=56&q=80",
    },
  ];

  return (
    <section className="w-full">
      <div className="flex flex-col justify-center items-center gap-8 sm:gap-12 px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 bg-[#E6EBEE]">
        <div className="flex flex-col items-start gap-4 w-full">
          <h2 className="w-full text-[#232024] text-center font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight sm:leading-[50px] md:leading-[70px]">
            Testimonials
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-start gap-6 sm:gap-8 lg:gap-12 w-full max-w-6xl">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-4 sm:gap-5 p-4 sm:p-6 rounded-lg bg-white relative w-full lg:w-1/2 min-h-[300px] sm:min-h-[350px] md:min-h-[406px]"
            >
              <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-[#4E4D4F]" />

              <p className="w-full text-[#032C3D] font-poppins text-sm sm:text-base md:text-lg font-normal leading-relaxed sm:leading-[28px] md:leading-[33px] flex-1">
                {testimonial.quote}
              </p>

              <div className="flex items-center gap-3 sm:gap-5 mt-auto">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={56}
                  height={56}
                  className="rounded-full border border-[#4E4D4F] w-10 h-10 sm:w-14 sm:h-14"
                />
                <div className="flex flex-col items-start">
                  <h4 className="text-[#032C3D] font-poppins text-sm sm:text-base md:text-lg font-semibold leading-6 sm:leading-10">
                    {testimonial.name}
                  </h4>
                  <p className="text-[#032C3D] font-poppins text-xs sm:text-sm font-normal leading-5 sm:leading-[25px]">
                    {testimonial.date}
                  </p>
                </div>
              </div>

              <Quote className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-4 h-4 sm:w-5 sm:h-5 text-[#4E4D4F] rotate-180" />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-8 sm:gap-12 w-full">
          <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <ChevronLeft className="w-8 h-8 sm:w-9 sm:h-9 text-[#D0D5DD]" />
          </button>
          <button className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <ChevronRight className="w-8 h-8 sm:w-9 sm:h-9 text-[#08AD98]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
