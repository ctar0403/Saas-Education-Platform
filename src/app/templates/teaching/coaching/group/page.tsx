import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import GroupHero from "./components/GroupHero/GroupHero";
import GroupSessions from "./components/GroupSessions/GroupSessions";
import GroupBooking from "./components/GroupBooking/GroupBooking";
import GroupFeatures from "./components/GroupFeatures/GroupFeatures";
import Footer from "../../components/Footer/Footer";

const GroupCoachingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <GroupHero />

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GroupSessions />
            <GroupBooking />
          </div>
          <div className="lg:col-span-1">
            <GroupFeatures />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GroupCoachingPage;
