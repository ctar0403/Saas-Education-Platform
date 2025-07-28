import React from "react";
import Navigation from "../components/Navigation/Navigation";
import LessonHeader from "./components/LessonHeader/LessonHeader";
import LessonContent from "./components/LessonContent/LessonContent";
import LessonSidebar from "./components/LessonSidebar/LessonSidebar";
import Comments from "./components/Comments/Comments";
import Footer from "../components/Footer/Footer";

const LessonPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <LessonHeader />

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <LessonContent />
            <Comments />
          </div>
          <div className="lg:col-span-1">
            <LessonSidebar />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LessonPage;
