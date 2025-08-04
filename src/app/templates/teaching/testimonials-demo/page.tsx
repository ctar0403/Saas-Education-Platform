import React from "react";
import Navigation from "../components/Navigation/Navigation";
import TestimonialsCarousel from "../components/Testimonials/TestimonialsCarousel";
import DarkFooter from "../components/Footer/DarkFooter";
import FigmaButton from "../components/ui/FigmaButton";

const TestimonialsDemo = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navigation />
      
      {/* Page Header */}
      <div className="py-16 px-4 sm:px-8 md:px-12 lg:px-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#032C3D] mb-6">
            Enhanced Testimonials Section
          </h1>
          <p className="text-lg text-[#4E4D4F] mb-8">
            A fully functional testimonials carousel with working navigation buttons, 
            more testimonial items, and Figma-styled buttons.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <FigmaButton variant="primary" size="md">
              Book your FREE consultation now
            </FigmaButton>
            <FigmaButton variant="outline" size="md">
              View Details
            </FigmaButton>
            <FigmaButton variant="secondary" size="md">
              Send Message for Free Assessment
            </FigmaButton>
          </div>
        </div>
      </div>

      {/* Enhanced Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-8 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#032C3D] text-center mb-12">
            New Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#032C3D] mb-3">
                🎯 Working Navigation
              </h3>
              <p className="text-[#4E4D4F]">
                Fully functional previous/next buttons with smooth transitions and pagination dots.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#032C3D] mb-3">
                📱 Responsive Design
              </h3>
              <p className="text-[#4E4D4F]">
                Adapts seamlessly to mobile (1 item), tablet (2 items), and desktop (2 items) layouts.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#032C3D] mb-3">
                ⭐ Enhanced Content
              </h3>
              <p className="text-[#4E4D4F]">
                6 unique testimonials with ratings, roles, and improved visual styling.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#032C3D] mb-3">
                🎨 Figma Buttons
              </h3>
              <p className="text-[#4E4D4F]">
                Pixel-perfect buttons matching the provided Figma designs with hover effects.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#032C3D] mb-3">
                🔄 Smooth Transitions
              </h3>
              <p className="text-[#4E4D4F]">
                CSS transitions for sliding animations and interactive button states.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#032C3D] mb-3">
                🎯 Call to Action
              </h3>
              <p className="text-[#4E4D4F]">
                Integrated CTA section with Figma-styled button to drive conversions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <DarkFooter />
    </div>
  );
};

export default TestimonialsDemo;
