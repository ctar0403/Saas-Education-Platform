"use client";

import React from "react";
import AnnouncementsNavigation from "../../components/Navigation/AnnouncementsNavigation";
import ProductSection from "../components/ProductSection/ProductSection";
import LightFooter from "../../components/Footer/LightFooter";

const ApiExamplePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementsNavigation />
      
      <div className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-roboto font-bold text-[#032C3D] mb-4">
              API Integration Example
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              This page demonstrates how to integrate the pagination component with your actual API endpoints.
              Replace the apiEndpoint prop with your real API URL.
            </p>
          </div>
        </div>
      </div>

      {/* Example with API endpoint */}
      <ProductSection
        title="Products from API"
        enablePagination={true}
        pageSize={5}
        showCount={true}
        apiEndpoint="/api/products" // Replace with your actual API endpoint
        products={[]} // Empty initial products when using API
      />

      {/* Example with mock data and pagination */}
      <ProductSection
        title="Mock Data with Pagination"
        enablePagination={true}
        pageSize={4}
        showCount={true}
        products={[
          {
            id: 1,
            title: "Course Name will be here it might have two lines",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "Group Coaching",
            duration: "17",
            rating: 4.5,
            price: 25,
            featured: true,
            badge: "BEST SELLER",
          },
          {
            id: 2,
            title: "Another Course Name",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            category: "Digital Downloads",
            duration: "25",
            rating: 4.8,
            price: 35,
          }
        ]}
      />

      <div className="py-12 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-roboto font-bold text-[#032C3D] mb-6">
            Integration Instructions
          </h3>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h4 className="text-lg font-semibold mb-4">How to integrate with your API:</h4>
            
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>
                <strong>Set the apiEndpoint prop:</strong> Pass your API URL to the ProductSection component
              </li>
              <li>
                <strong>API Response Format:</strong> Ensure your API returns data in the following format:
              </li>
            </ol>
            
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
{`{
  "status": "success",
  "code": 200,
  "data": {
    "pagination": {
      "total_items": 15,
      "next_cursor": "page-2",
      "previous_cursor": null,
      "page_size": 5
    },
    "data": [
      {
        "id": 1,
        "title": "Product Title",
        "thumbnail": "image-url",
        "category": { "name": "Category Name" },
        "price": "25.00",
        "is_paid": true,
        ...
      }
    ]
  }
}`}
              </pre>
            </div>
            
            <div className="mt-4">
              <h5 className="font-semibold mb-2">Example Usage:</h5>
              <div className="p-4 bg-gray-100 rounded-lg">
                <pre className="text-sm text-gray-800">
{`<ProductSection
  title="Your Products"
  enablePagination={true}
  pageSize={4}
  showCount={true}
  apiEndpoint="https://your-api.com/products"
  products={[]} // Empty when using API
/>`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LightFooter />
    </div>
  );
};

export default ApiExamplePage;
