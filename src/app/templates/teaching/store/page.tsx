import React from "react";
import AnnouncementsNavigation from "../components/Navigation/AnnouncementsNavigation";
import StoreHero from "./components/StoreHero/StoreHero";
import ProductsOfCourse from "./components/ProductsOfCourse/ProductsOfCourse";
import ProductsOfCoaching from "./components/ProductsOfCoaching/ProductsOfCoaching";
import ProductsOfDigitalDownloads from "./components/ProductsOfDigitalDownloads/ProductsOfDigitalDownloads";
import GeneralProducts from "./components/GeneralProducts/GeneralProducts";
import BundleProducts from "./components/BundleProducts/BundleProducts";
import LightFooter from "../components/Footer/LightFooter";

const StorePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementsNavigation />
      <StoreHero />

      {/* Products of Course - API Connected */}
      <ProductsOfCourse />

      {/* Products of Coaching - API Connected */}
      <ProductsOfCoaching />

      {/* Products of Digital Downloads - API Connected */}
      <ProductsOfDigitalDownloads />

      {/* General Products - API Connected */}
      <GeneralProducts />

      {/* Bundle Desert - API Connected */}
      <BundleProducts 
        title="Bundle Desert"
        bundleType="desert"
      />

      {/* Bundle Lunch - API Connected */}
      <BundleProducts 
        title="Bundle Lunch"
        bundleType="lunch"
      />

      <LightFooter />
    </div>
  );
};

export default StorePage;
