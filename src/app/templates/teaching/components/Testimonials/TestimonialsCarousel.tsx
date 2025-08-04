"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  quote: string;
  name: string;
  date: string;
  avatar: string;
  role?: string;
  rating?: number;
}

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(2); // Default for desktop

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerView(1); // Mobile
      } else if (width < 1024) {
        setItemsPerView(2); // Tablet
      } else {
        setItemsPerView(2); // Desktop
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const testimonials: Testimonial[] = [
    {
      quote: "Before working with FinX, my business finances felt like a tangled mess. I was constantly stressed and unsure if I was making the right decisions. Now, I have a clear financial roadmap and the confidence to invest in my business's future. I finally feel in control!",
      name: "Maher L",
      date: "29 August 2024",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&q=80",
      role: "Business Owner",
      rating: 5
    },
    {
      quote: "I always knew my passion could be profitable, but I struggled to turn it into a sustainable income. FinX helped me identify hidden costs, optimize my pricing, and create a business model that truly works. My profits have soared, and I'm finally able to pay myself what I'm worth.",
      name: "Samar L",
      date: "15 September 2024",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=56&q=80",
      role: "Entrepreneur",
      rating: 5
    },
    {
      quote: "The coaching sessions were transformative! I learned not just the technical aspects of financial management, but also how to develop the right mindset for business success. The personalized approach made all the difference.",
      name: "David M",
      date: "02 October 2024",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=56&q=80",
      role: "Freelancer",
      rating: 5
    },
    {
      quote: "As a small business owner, I was drowning in paperwork and financial confusion. This program gave me the tools and confidence to take control of my finances. I can't recommend it enough!",
      name: "Jessica R",
      date: "18 October 2024",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=56&q=80",
      role: "Small Business Owner",
      rating: 5
    },
    {
      quote: "The step-by-step approach made complex financial concepts easy to understand. I now have a sustainable business model and clear growth strategy. My revenue has increased by 40% in just 6 months!",
      name: "Michael K",
      date: "05 November 2024",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=56&q=80",
      role: "Consultant",
      rating: 5
    },
    {
      quote: "What sets this program apart is the ongoing support and community. Even after completing the course, I feel supported in my business journey. The strategies are practical and actually work!",
      name: "Amanda T",
      date: "20 November 2024",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=56&q=80",
      role: "Digital Marketer",
      rating: 5
    }
  ];

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerView);
  
  // Fill remaining slots if needed
  while (visibleTestimonials.length < itemsPerView && testimonials.length > itemsPerView) {
    const remainingSlots = itemsPerView - visibleTestimonials.length;
    const startFromBeginning = testimonials.slice(0, remainingSlots);
    visibleTestimonials.push(...startFromBeginning);
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="w-full">
      <div className="flex flex-col justify-center items-center gap-8 sm:gap-12 px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 bg-[#E6EBEE]">
        <div className="flex flex-col items-center gap-4 w-full max-w-6xl">
          <h2 className="w-full text-[#232024] text-center font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight sm:leading-[50px] md:leading-[70px]">
            What Our Students Say
          </h2>
          <p className="text-[#4E4D4F] text-center font-poppins text-lg max-w-2xl">
            Discover how our program has transformed the financial future of hundreds of entrepreneurs and business owners
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="w-full max-w-6xl overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out gap-6 sm:gap-8 lg:gap-12"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              width: `${(testimonials.length / itemsPerView) * 100}%`
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-4 sm:gap-5 p-4 sm:p-6 rounded-lg bg-white relative min-h-[350px] sm:min-h-[400px] md:min-h-[450px] shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ 
                  width: `${100 / itemsPerView}%`,
                  flexShrink: 0
                }}
              >
                <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-[#08AD98]" />

                <p className="w-full text-[#032C3D] font-poppins text-sm sm:text-base md:text-lg font-normal leading-relaxed sm:leading-[28px] md:leading-[33px] flex-1">
                  {testimonial.quote}
                </p>

                {/* Rating */}
                {testimonial.rating && (
                  <div className="flex items-center gap-1">
                    {renderStars(testimonial.rating)}
                  </div>
                )}

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
                    {testimonial.role && (
                      <p className="text-[#08AD98] font-poppins text-xs sm:text-sm font-medium leading-5 sm:leading-[25px]">
                        {testimonial.role}
                      </p>
                    )}
                    <p className="text-[#4E4D4F] font-poppins text-xs sm:text-sm font-normal leading-5 sm:leading-[25px]">
                      {testimonial.date}
                    </p>
                  </div>
                </div>

                <Quote className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-4 h-4 sm:w-5 sm:h-5 text-[#08AD98] rotate-180 opacity-50" />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-8 sm:gap-12 w-full">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white border-2 border-[#08AD98] hover:bg-[#08AD98] hover:text-white transition-all duration-300 shadow-lg"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className={`w-6 h-6 sm:w-7 sm:h-7 ${currentIndex === 0 ? 'text-gray-400' : 'text-[#08AD98] hover:text-white'}`} />
          </button>
          
          {/* Pagination Dots */}
          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-[#08AD98] scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextSlide}
            className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-[#08AD98] text-white hover:bg-[#078c7d] transition-all duration-300 shadow-lg"
            disabled={currentIndex >= maxIndex}
          >
            <ChevronRight className={`w-6 h-6 sm:w-7 sm:h-7 ${currentIndex >= maxIndex ? 'text-gray-400' : 'text-white'}`} />
          </button>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-6 mt-8">
          <p className="text-[#032C3D] font-poppins text-lg text-center max-w-2xl">
            Ready to transform your business like these successful entrepreneurs?
          </p>
          <button className="flex justify-center items-center gap-4 px-8 py-4 bg-[#08AD98] hover:bg-[#078c7d] text-white font-poppins font-semibold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Book your FREE consultation now
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
