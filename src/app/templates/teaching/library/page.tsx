import React from "react";
import AnnouncementsNavigation from "../components/Navigation/AnnouncementsNavigation";
import LibraryHero from "./components/LibraryHero/LibraryHero";
import MyLibrary from "./components/MyLibrary/MyLibrary";
import LightFooter from "../components/Footer/LightFooter";

const LibraryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AnnouncementsNavigation />
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <LibraryHero />
            <MyLibrary />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-roboto font-bold text-[#032C3D]">
                    Continue Watch
                  </h3>
                  <button className="text-[#08AD98] text-sm font-medium hover:underline">
                    →
                  </button>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex gap-3">
                      <div className="relative">
                        <img
                          src={`https://images.unsplash.com/photo-${item === 1 ? "1516321318423-f06f85e504b3" : item === 2 ? "1554224155-6726b3ff858f" : item === 3 ? "1559526324-4b87b5e36e44" : "1507003211169-0a1dd7228f2d"}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`}
                          alt="Course thumbnail"
                          className="w-20 h-16 object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 rounded flex items-center justify-center">
                          <div className="w-8 h-8 bg-[#08AD98] rounded-full flex items-center justify-center">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="white"
                            >
                              <path d="M3 1.5L9 6L3 10.5V1.5Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                          8:49
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-poppins font-medium text-sm text-[#032C3D] line-clamp-2 mb-1">
                          Paid Ads: A Financial Game-Changer
                        </h4>
                        <p className="text-xs text-gray-500">
                          Business & Finance
                        </p>
                        <p className="text-xs text-gray-500">Lesson 8 of 12</p>
                        <button className="w-full bg-[#08AD98] text-white text-xs font-medium py-2 rounded mt-2 hover:bg-[#078c7d] transition-colors">
                          Continue Course
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LightFooter />
    </div>
  );
};

export default LibraryPage;
