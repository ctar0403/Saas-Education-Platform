import React from "react";
import Navigation from "../components/Navigation/Navigation";
import CoachingHero from "./components/CoachingHero/CoachingHero";
import CoachingTypes from "./components/CoachingTypes/CoachingTypes";
import Footer from "../components/Footer/Footer";

const CoachingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <CoachingHero />
      <CoachingTypes />
      <Footer />
    </div>
  );
};

export default CoachingPage;
