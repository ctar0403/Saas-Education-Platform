import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import OneToOneHero from "./components/OneToOneHero/OneToOneHero";
import SessionBooking from "./components/SessionBooking/SessionBooking";
import CoachingFeatures from "./components/CoachingFeatures/CoachingFeatures";
import SessionHistory from "./components/SessionHistory/SessionHistory";
import Footer from "../../components/Footer/Footer";

const OneToOneCoachingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <OneToOneHero />

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SessionBooking />
            <SessionHistory />
          </div>
          <div className="lg:col-span-1">
            <CoachingFeatures />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OneToOneCoachingPage;
