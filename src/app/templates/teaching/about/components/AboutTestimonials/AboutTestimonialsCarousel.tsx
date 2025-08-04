"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AboutTestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(2);

  const testimonials = [
    {
      id: 1,
      quote: "Before working with FinX I was business owner struggling financially and always anxious about cash flow. Now I have a solid financial strategy, consistent revenue and peace of mind knowing my business is growing in right direction. I can't believe I waited this long to get help.",
      name: "Sarah J.",
      role: "Business Owner",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 2,
      quote: "FinX helped me understand market opportunities I never knew existed and create multiple income streams that have completely transformed my financial life. The methods work and Mike truly cares about your success. FinX helped me equally important assess multiple channels of income.",
      name: "David Kun",
      role: "Entrepreneur",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 3,
      quote: "The transformation in my business has been incredible. FinX gave me the tools and knowledge to not just survive, but thrive in competitive markets. My revenue has doubled in just 6 months, and I finally have the confidence to make smart financial decisions.",
      name: "Maria Rodriguez",
      role: "Restaurant Owner",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 4,
      quote: "As a freelancer, managing finances was my biggest weakness. FinX taught me how to budget, save, and invest properly. Now I have multiple income streams and a solid emergency fund. I sleep better knowing my financial future is secure.",
      name: "James Thompson",
      role: "Freelance Designer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 5,
      quote: "I was drowning in debt and had no idea how to get out. FinX provided a clear roadmap and ongoing support. Within a year, I paid off all my credit cards and started building wealth. The investment in coaching was the best decision I ever made.",
      name: "Lisa Chen",
      role: "Marketing Manager",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 6,
      quote: "Running a tech startup, I needed to understand complex financial structures and investment opportunities. FinX helped me navigate funding rounds, understand valuations, and make strategic financial decisions that led to a successful exit.",
      name: "Michael Park",
      role: "Tech Entrepreneur",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
    }
  ];

  // Responsive items per view
  useEffect(() => {
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

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / itemsPerView);
  const maxIndex = totalSlides - 1;

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerView,
    (currentIndex * itemsPerView) + itemsPerView
  );

  return (
    <div className="bg-[#F5F5F5] py-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-roboto font-bold text-[#032C3D] mb-4">
            Testimonials
          </h2>
          <p className="text-lg text-[#2E2E2E] font-poppins max-w-2xl mx-auto">
            Hear from our successful clients who have transformed their financial lives with FinX coaching
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div 
                  key={slideIndex}
                  className="w-full flex-shrink-0"
                >
                  <div className={`grid gap-6 ${itemsPerView === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                    {testimonials
                      .slice(slideIndex * itemsPerView, (slideIndex * itemsPerView) + itemsPerView)
                      .map((testimonial) => (
                        <div key={testimonial.id} className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                          <div className="mb-6">
                            <div className="text-6xl text-[#08AD98] mb-4 font-serif">"</div>
                            <p className="text-[#2E2E2E] font-poppins text-sm leading-relaxed">
                              {testimonial.quote}
                            </p>
                          </div>

                          <div className="flex items-center gap-4">
                            <img
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                            />
                            <div>
                              <div className="font-poppins font-semibold text-[#032C3D]">
                                {testimonial.name}
                              </div>
                              <div className="font-poppins text-sm text-[#2E2E2E]">
                                {testimonial.role}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10"
            disabled={currentIndex === 0}
          >
            <ChevronLeft 
              className={`w-5 h-5 ${currentIndex === 0 ? 'text-gray-300' : 'text-[#08AD98]'}`} 
            />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10"
            disabled={currentIndex === maxIndex}
          >
            <ChevronRight 
              className={`w-5 h-5 ${currentIndex === maxIndex ? 'text-gray-300' : 'text-[#08AD98]'}`} 
            />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                currentIndex === index ? 'bg-[#08AD98]' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-[#08AD98] mb-2">500+</div>
            <div className="text-sm font-poppins text-[#2E2E2E]">Successful Clients</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-[#08AD98] mb-2">$2M+</div>
            <div className="text-sm font-poppins text-[#2E2E2E]">Revenue Generated</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-3xl font-bold text-[#08AD98] mb-2">98%</div>
            <div className="text-sm font-poppins text-[#2E2E2E]">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTestimonialsCarousel;
