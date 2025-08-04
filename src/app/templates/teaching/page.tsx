import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Header from "./components/Header/Header";
import ValueStack from "./components/ValueStack/ValueStack";
import PainPoint from "./components/PainPoint/PainPoint";
import ExpertInfo from "./components/ExpertInfo/ExpertInfo";
import ProgramInfo from "./components/ProgramInfo/ProgramInfo";
import FigmaTestimonials from "./components/Testimonials/FigmaTestimonials";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import FreeAssessment from "./components/FreeAssessment/FreeAssessment";
import WorthIt from "./components/WorthIt/WorthIt";
import DarkFooter from "./components/Footer/DarkFooter";

const TeachingPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navigation />
      <Header />
      <ValueStack />
      <PainPoint />
      <ExpertInfo />
      <ProgramInfo />
      <FigmaTestimonials />
      <HowItWorks />
      <FreeAssessment />
      <WorthIt />
      <DarkFooter />
    </div>
  );
};

export default TeachingPage;
