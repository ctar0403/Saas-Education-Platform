"use client";

import React, { useState } from "react";
import Image from "next/image";

const FigmaTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      quote: "Before working with FinX, my business finances felt like a tangled mess. I was constantly stressed and unsure if I was making the right decisions. Now, I have a clear financial roadmap and the confidence to invest in my business's future. I finally feel in control!",
      name: "Maher L",
      date: "29 August 2021",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&q=80"
    },
    {
      quote: "I always knew my passion could be profitable, but I struggled to turn it into a sustainable income. FinX helped me identify hidden costs, optimize my pricing, and create a business model that truly works. My profits have soared, and I'm finally able to pay myself what I'm worth.",
      name: "Samar L", 
      date: "29 August 2021",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=56&q=80"
    },
    {
      quote: "The coaching sessions were transformative! I learned not just the technical aspects of financial management, but also how to develop the right mindset for business success. The personalized approach made all the difference.",
      name: "David M",
      date: "02 October 2021",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=56&q=80"
    },
    {
      quote: "As a small business owner, I was drowning in paperwork and financial confusion. This program gave me the tools and confidence to take control of my finances. I can't recommend it enough!",
      name: "Jessica R",
      date: "18 October 2021", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=56&q=80"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 2 >= testimonials.length ? 0 : prev + 2));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? Math.max(0, testimonials.length - 2) : prev - 2));
  };

  const currentTestimonials = testimonials.slice(currentIndex, currentIndex + 2);
  if (currentTestimonials.length === 1) {
    currentTestimonials.push(testimonials[0]); // Fill second slot if needed
  }

  return (
    <div className="flex w-full items-start align-content-start flex-wrap relative">
      <div className="flex p-24 flex-col justify-center items-center gap-12 flex-1 bg-[#E6EBEE] relative">
        {/* Title */}
        <div className="flex flex-col items-start gap-4 self-stretch relative">
          <h2 className="self-stretch text-[#232024] text-center font-poppins text-[42px] font-semibold leading-[70px]">
            Testimonials
          </h2>
        </div>

        {/* Cards */}
        <div className="flex justify-center items-start align-content-start gap-12 self-stretch flex-wrap relative">
          {currentTestimonials.map((testimonial, index) => (
            <div
              key={currentIndex + index}
              className="flex w-[447px] h-[406px] p-6 flex-col items-start gap-5 rounded-lg bg-white relative"
            >
              {/* Top Quote Icon */}
              <svg 
                className="w-[21px] h-[22px] flex-shrink-0 relative" 
                width="22" 
                height="23" 
                viewBox="0 0 22 23" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M9.76988 4.90535L9.16068 3.88574C4.9431 6.97006 2.60001 10.7171 2.60001 13.8014C2.60001 16.7838 4.61507 18.1857 6.32553 18.1857C8.48118 18.1857 10.0042 16.1975 10.0042 14.1073C10.0042 12.3485 8.97323 10.8446 7.5908 10.2838C7.19247 10.1308 6.81758 10.0034 6.81758 9.26417C6.81758 8.32104 7.45022 6.91908 9.76988 4.90535ZM19.072 4.90535L18.4628 3.88574C14.2921 6.97006 11.9021 10.7171 11.9021 13.8014C11.9021 16.7838 13.964 18.1857 15.6745 18.1857C17.8536 18.1857 19.4 16.1975 19.4 14.1073C19.4 12.3485 18.3456 10.8446 16.9163 10.2838C16.518 10.1308 16.1665 10.0034 16.1665 9.26417C16.1665 8.32104 16.8226 6.91908 19.072 4.90535Z" 
                  fill="#4E4D4F"
                />
              </svg>

              {/* Quote Text */}
              <div className="self-stretch text-[#032C3D] font-poppins text-lg font-normal leading-[33px] relative">
                "{testimonial.quote}"
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-5 relative">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full border border-[#4E4D4F] relative"
                />
                <div className="flex w-[162px] flex-col items-start relative">
                  <div className="self-stretch text-[#032C3D] font-poppins text-lg font-semibold leading-[40px] relative">
                    {testimonial.name}
                  </div>
                  <div className="self-stretch text-[#032C3D] font-poppins text-sm font-normal leading-[25px] relative">
                    {testimonial.date}
                  </div>
                </div>
              </div>

              {/* Bottom Quote Icon (Reversed) */}
              <svg 
                className="w-[22px] h-[22px] absolute right-[30px] bottom-[73px]" 
                width="23" 
                height="23" 
                viewBox="0 0 23 23" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12.7887 17.1661L13.4269 18.1857C17.8453 15.1014 20.3 11.3544 20.3 8.27006C20.3 5.2877 18.189 3.88574 16.3971 3.88574C14.1388 3.88574 12.5432 5.87398 12.5432 7.96417C12.5432 9.723 13.6233 11.2269 15.0716 11.7877C15.4889 11.9406 15.8816 12.0681 15.8816 12.8073C15.8816 13.7504 15.2188 15.1524 12.7887 17.1661ZM3.04367 17.1661L3.68188 18.1857C8.0512 15.1014 10.555 11.3544 10.555 8.27006C10.555 5.2877 8.39485 3.88574 6.60294 3.88574C4.3201 3.88574 2.70001 5.87398 2.70001 7.96417C2.70001 9.723 3.80461 11.2269 5.30196 11.7877C5.71926 11.9406 6.08746 12.0681 6.08746 12.8073C6.08746 13.7504 5.40015 15.1524 3.04367 17.1661Z" 
                  fill="#4E4D4F"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-12 self-stretch relative">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="w-9 h-9 relative hover:opacity-80 transition-opacity"
            disabled={currentIndex === 0}
          >
            <svg 
              className="w-9 h-9" 
              width="36" 
              height="37" 
              viewBox="0 0 36 37" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_4080_48255)">
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M18 36.5859C8.05881 36.5859 -9.15527e-05 28.527 -9.15527e-05 18.5859C-9.15527e-05 8.64475 8.05881 0.585846 18 0.585846C27.9411 0.585846 36 8.64475 36 18.5859C36 28.527 27.9411 36.5859 18 36.5859ZM20.258 25.7795C20.5195 25.9828 20.8977 25.9643 21.1381 25.7241L21.1935 25.6612C21.3968 25.3997 21.3784 25.0216 21.1381 24.7812L14.9434 18.5859L21.1381 12.3906L21.1935 12.3278C21.3968 12.0663 21.3784 11.6881 21.1381 11.4478C20.8777 11.1874 20.4556 11.1874 20.1953 11.4478L13.5286 18.1145L13.4732 18.1773C13.2699 18.4388 13.2883 18.817 13.5286 19.0574L20.1953 25.7241L20.258 25.7795Z" 
                  fill="#D0D5DD"
                />
              </g>
              <defs>
                <clipPath id="clip0_4080_48255">
                  <rect width="36" height="36" fill="white" transform="matrix(-1 0 0 -1 36 36.5859)"/>
                </clipPath>
              </defs>
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="w-9 h-9 relative hover:opacity-80 transition-opacity"
          >
            <svg 
              className="w-9 h-9" 
              width="36" 
              height="37" 
              viewBox="0 0 36 37" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_4080_48259)">
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M18 0.585938C27.9412 0.585938 36.0001 8.64484 36.0001 18.586C36.0001 28.5271 27.9412 36.586 18 36.586C8.0589 36.586 0 28.5271 0 18.586C0 8.64484 8.0589 0.585938 18 0.585938ZM15.742 11.3924C15.4805 11.1891 15.1023 11.2075 14.8619 11.4478L14.8065 11.5106C14.6032 11.7721 14.6216 12.1503 14.8619 12.3907L21.0566 18.586L14.8619 24.7813L14.8065 24.8441C14.6032 25.1056 14.6216 25.4838 14.8619 25.7241C15.1223 25.9845 15.5444 25.9845 15.8047 25.7241L22.4714 19.0574L22.5268 18.9945C22.7301 18.733 22.7117 18.3549 22.4714 18.1145L15.8047 11.4478L15.742 11.3924Z" 
                  fill="#08AD98"
                />
              </g>
              <defs>
                <clipPath id="clip0_4080_48259">
                  <rect width="36" height="36" fill="white" transform="translate(0 0.585938)"/>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FigmaTestimonials;
