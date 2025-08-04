import React from "react";
import Navigation from "../components/Navigation/Navigation";
import AboutHero from "./components/AboutHero/AboutHero";
import ValueProposition from "./components/ValueProposition/ValueProposition";
import WhoIAm from "./components/WhoIAm/WhoIAm";
import MyVision from "./components/MyVision/MyVision";
import MyMission from "./components/MyMission/MyMission";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import AboutTestimonialsCarousel from "./components/AboutTestimonials/AboutTestimonialsCarousel";
import FAQ from "./components/FAQ/FAQ";
import LightFooter from "../components/Footer/LightFooter";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navigation />
      <AboutHero />
      <ValueProposition />
      <WhoIAm />
      <MyVision />
      <MyMission />
      <ServicesSection />
      <AboutTestimonialsCarousel />
      <FAQ />
      <LightFooter />
    </div>
  );
};

export default AboutPage;
