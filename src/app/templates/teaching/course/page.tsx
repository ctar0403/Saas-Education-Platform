import React from "react";
import Navigation from "../components/Navigation/Navigation";
import CourseHero from "./components/CourseHero/CourseHero";
import CourseContent from "./components/CourseContent/CourseContent";
import CourseSidebar from "./components/CourseSidebar/CourseSidebar";
import Footer from "../components/Footer/Footer";

const CoursePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <CourseHero />

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CourseContent />
          </div>
          <div className="lg:col-span-1">
            <CourseSidebar />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CoursePage;
