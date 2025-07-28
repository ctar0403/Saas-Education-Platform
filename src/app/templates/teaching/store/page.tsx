import React from "react";
import AnnouncementsNavigation from "../components/Navigation/AnnouncementsNavigation";
import StoreHero from "./components/StoreHero/StoreHero";
import ProductSection from "./components/ProductSection/ProductSection";
import LightFooter from "../components/Footer/LightFooter";

const StorePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementsNavigation />
      <StoreHero />

      {/* Products of course */}
      <ProductSection
        title="Products of course"
        products={[
          {
            id: 1,
            title: "Course Name will be here it might have two lines",
            image:
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "Group Coaching",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
            featured: true,
            badge: "BEST SELLER",
          },
          {
            id: 2,
            title: "Course Name will be here it might have two lines",
            image:
              "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "Group Coaching",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
          },
          {
            id: 3,
            title: "Course Name will be here it might have two lines",
            image:
              "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "Group Coaching",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
            badge: "BEST SELLER",
          },
          {
            id: 4,
            title: "Course Name will be here it might have two lines",
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "Group Coaching",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
          },
        ]}
      />

      {/* Products of Coaching */}
      <ProductSection
        title="Products of Coaching"
        products={[
          {
            id: 5,
            title: "Coaching Name will be here it might have two lines",
            image:
              "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "Group Coaching",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
          },
          {
            id: 6,
            title: "Coaching Name will be here it might have two lines",
            image:
              "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "1 to 1 Coaching",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
            featured: true,
          },
          {
            id: 7,
            title: "Coaching Name will be here it might have two lines",
            image:
              "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "Group Coaching",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
          },
          {
            id: 8,
            title: "Coaching Name will be here it might have two lines",
            image:
              "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "Group Coaching",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
            badge: "BEST SELLER",
          },
        ]}
      />

      {/* Products of Digital Downloads */}
      <ProductSection
        title="Products of Digital Downloads"
        products={[
          {
            id: 9,
            title:
              "Digital Downloads Name will be here it might have two lines",
            image:
              "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "Digital Downloads",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
            badge: "BEST SELLER",
          },
          {
            id: 10,
            title:
              "Digital Downloads Name will be here it might have two lines",
            image:
              "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "Digital Downloads",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
          },
          {
            id: 11,
            title:
              "Digital Downloads Name will be here it might have two lines",
            image:
              "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "Digital Downloads",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
            featured: true,
          },
          {
            id: 12,
            title:
              "Digital Downloads Name will be here it might have two lines",
            image:
              "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "Digital Downloads",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
            badge: "BEST SELLER",
          },
        ]}
      />

      {/* Products */}
      <ProductSection
        title="Products"
        products={[
          {
            id: 13,
            title: "Coaching Name will be here it might have two lines",
            image:
              "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "Group Coaching",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
          },
          {
            id: 14,
            title:
              "Digital Downloads Name will be here it might have two lines",
            image:
              "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "Digital Downloads",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
            featured: true,
          },
          {
            id: 15,
            title: "Coaching Name will be here it might have two lines",
            image:
              "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "Group Coaching",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
          },
          {
            id: 16,
            title: "Course Name will be here it might have two lines",
            image:
              "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "Group Coaching",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
            badge: "BEST SELLER",
          },
        ]}
      />

      {/* Bundle Desert */}
      <ProductSection
        title="Bundle Desert"
        products={[
          {
            id: 17,
            title:
              "Bundle Name will be here it mightmightmightmight have two lines",
            image:
              "https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "BEST OFFER",
            duration: "17 Minutes",
            rating: 4.5,
            price: 45,
            originalPrice: 65,
            featured: true,
          },
          {
            id: 18,
            title:
              "Bundle Name will be here it mightmightmightmight have two lines",
            image:
              "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "BEST OFFER",
            duration: "17 Minutes",
            rating: 4.5,
            price: 45,
            originalPrice: 65,
            featured: true,
          },
          {
            id: 19,
            title:
              "Bundle Name will be here it mightmightmightmight have two lines",
            image:
              "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "BEST OFFER",
            duration: "17 Minutes",
            rating: 4.5,
            price: 45,
            originalPrice: 65,
            featured: true,
          },
        ]}
      />

      {/* Bundle Lunch */}
      <ProductSection
        title="Bundle Lunch"
        products={[
          {
            id: 20,
            title:
              "Bundle Name will be here it mightmightmightmight have two lines",
            image:
              "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "BEST OFFER",
            duration: "7",
            rating: 4.5,
            price: 45,
            originalPrice: 65,
          },
          {
            id: 21,
            title:
              "Bundle Name will be here it mightmightmightmight have two lines",
            image:
              "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "BEST OFFER",
            duration: "7",
            rating: 4.5,
            price: 45,
            originalPrice: 65,
          },
          {
            id: 22,
            title:
              "Bundle Name will be here it mightmightmightmight have two lines",
            image:
              "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "BEST OFFER",
            duration: "7",
            rating: 4.5,
            price: 45,
            originalPrice: 65,
          },
        ]}
      />

      {/* Products without images */}
      <ProductSection
        title="Products without images"
        products={[
          {
            id: 23,
            title: "Coaching Name will be here it might have two lines",
            category: "Group Coaching",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
            noImage: true,
            icon: "coaching",
          },
          {
            id: 24,
            title:
              "Digital Downloads Name will be here it might have two lines",
            category: "Digital Downloads",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
            noImage: true,
            icon: "download",
            badge: "NEW",
          },
          {
            id: 25,
            title: "Course Name will be here it might have two lines",
            category: "Group Coaching",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
            noImage: true,
            icon: "course",
          },
          {
            id: 26,
            title: "Course Name will be here it might have two lines",
            category: "Group Coaching",
            duration: "17 Minutes",
            rating: 4.5,
            price: 25,
            noImage: true,
            icon: "library",
            badge: "NEW",
          },
        ]}
      />

      <LightFooter />
    </div>
  );
};

export default StorePage;
