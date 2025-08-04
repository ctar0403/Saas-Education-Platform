"use client";

import React from "react";
import AnnouncementsNavigation from "../../components/Navigation/AnnouncementsNavigation";
import StoreHero from "../components/StoreHero/StoreHero";
import ProductSection from "../components/ProductSection/ProductSection";
import { convertApiProductToInternal } from "@/lib/api/paginatedProducts";
import LightFooter from "../../components/Footer/LightFooter";

// Mock data matching the API response structure
const mockApiProducts = [
  {
    id: 1,
    expert: ["expert1@example.com", "John Doe"],
    category: {
      id: 1,
      name: "videos",
      description: "Video content"
    },
    title: "Advanced JavaScript Masterclass",
    description: "Complete guide to modern JavaScript development",
    date: "06,July,2025",
    type: "course",
    title_url: "advanced-javascript",
    view_style: "grid",
    is_paid: true,
    price: "199.00",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    comments: 15,
    benefits: 5,
    files: [
      {
        id: 1,
        files: "https://example.com/file1.pdf"
      }
    ],
    links: []
  },
  {
    id: 2,
    expert: ["expert2@example.com", "Jane Smith"],
    category: {
      id: 2,
      name: "courses",
      description: "Course content"
    },
    title: "React Development Bootcamp",
    description: "Learn React from basics to advanced concepts",
    date: "15,July,2025",
    type: "course",
    title_url: "react-bootcamp",
    view_style: "grid",
    is_paid: true,
    price: "249.00",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    comments: 28,
    benefits: 8,
    files: [
      {
        id: 2,
        files: "https://example.com/file2.pdf"
      }
    ],
    links: []
  },
  {
    id: 3,
    expert: ["expert3@example.com", "Mike Johnson"],
    category: {
      id: 3,
      name: "tutorials",
      description: "Tutorial content"
    },
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js",
    date: "22,July,2025",
    type: "course",
    title_url: "nodejs-backend",
    view_style: "grid",
    is_paid: true,
    price: "179.00",
    thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    comments: 12,
    benefits: 6,
    files: [
      {
        id: 3,
        files: "https://example.com/file3.pdf"
      }
    ],
    links: []
  },
  {
    id: 4,
    expert: ["expert4@example.com", "Sarah Wilson"],
    category: {
      id: 1,
      name: "videos",
      description: "Video content"
    },
    title: "Python for Data Science",
    description: "Master Python for data analysis and machine learning",
    date: "30,July,2025",
    type: "course",
    title_url: "python-data-science",
    view_style: "grid",
    is_paid: true,
    price: "299.00",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    comments: 45,
    benefits: 10,
    files: [
      {
        id: 4,
        files: "https://example.com/file4.pdf"
      }
    ],
    links: []
  },
  {
    id: 5,
    expert: ["expert5@example.com", "David Brown"],
    category: {
      id: 4,
      name: "workshops",
      description: "Workshop content"
    },
    title: "UI/UX Design Fundamentals",
    description: "Learn the principles of great user interface and experience design",
    date: "05,August,2025",
    type: "workshop",
    title_url: "uiux-fundamentals",
    view_style: "grid",
    is_paid: true,
    price: "149.00",
    thumbnail: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    comments: 33,
    benefits: 7,
    files: [
      {
        id: 5,
        files: "https://example.com/file5.pdf"
      }
    ],
    links: []
  },
  {
    id: 6,
    expert: ["expert6@example.com", "Emily Davis"],
    category: {
      id: 5,
      name: "masterclass",
      description: "Masterclass content"
    },
    title: "Digital Marketing Strategy",
    description: "Complete guide to modern digital marketing",
    date: "12,August,2025",
    type: "masterclass",
    title_url: "digital-marketing",
    view_style: "grid",
    is_paid: true,
    price: "399.00",
    thumbnail: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    comments: 67,
    benefits: 12,
    files: [
      {
        id: 6,
        files: "https://example.com/file6.pdf"
      }
    ],
    links: []
  }
];

const DemoPaginationPage = () => {
  // Handle product click
  const handleProductClick = (product: any) => {
    console.log("Product clicked:", product);
    alert(`You clicked on: ${product.title}\nPrice: $${product.price}`);
  };

  // Convert API products to internal format for demo
  const convertedProducts = mockApiProducts.map(convertApiProductToInternal);

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementsNavigation />
      <StoreHero />

      {/* Section with Static Data and Pagination */}
      <ProductSection
        title="Featured Courses (With Pagination)"
        products={convertedProducts}
        enablePagination={true}
        pageSize={3}
        showCount={true}
        onProductClick={handleProductClick}
      />

      {/* Section with larger page size */}
      <ProductSection
        title="All Courses (Larger Page Size)"
        products={convertedProducts}
        enablePagination={true}
        pageSize={4}
        showCount={true}
        onProductClick={handleProductClick}
      />

      {/* Section without pagination */}
      <ProductSection
        title="Quick Overview (No Pagination)"
        products={convertedProducts.slice(0, 3)}
        enablePagination={false}
        showCount={true}
        onProductClick={handleProductClick}
      />

      {/* Example with API endpoint (commented out since we don't have a real API) */}
      {/*
      <ProductSection
        title="Live API Products"
        products={[]}
        apiEndpoint="/api/products"
        enablePagination={true}
        pageSize={5}
        showCount={true}
        onProductClick={handleProductClick}
      />
      */}

      {/* Info section explaining the implementation */}
      <div className="py-12 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#032C3D] mb-6">
            Pagination Implementation Details
          </h2>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Features:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>API Integration:</strong> Supports cursor-based pagination from your API</li>
              <li>• <strong>Static Data Support:</strong> Can work with static product arrays for testing</li>
              <li>• <strong>Responsive Design:</strong> Grid layout adapts to screen size</li>
              <li>• <strong>Loading States:</strong> Shows loading spinner during API calls</li>
              <li>• <strong>Error Handling:</strong> Displays error messages with retry option</li>
              <li>• <strong>Click Events:</strong> Products are clickable with custom handlers</li>
              <li>• <strong>Flexible Pagination:</strong> Can be enabled/disabled per section</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-4">API Response Format:</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`{
  "status": "success",
  "code": 200,
  "data": {
    "pagination": {
      "total_items": 50,
      "next_cursor": "eyJpZCI6MTB9",
      "previous_cursor": null,
      "page_size": 5
    },
    "data": [
      {
        "id": 1,
        "title": "Product Title",
        "price": "199.00",
        "thumbnail": "image-url",
        "category": { "name": "videos" },
        // ... other fields
      }
    ]
  }
}`}
            </pre>

            <h3 className="text-lg font-semibold mt-6 mb-4">Usage Examples:</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`// With API endpoint
<ProductSection
  title="API Products"
  products={[]}
  apiEndpoint="/api/products"
  enablePagination={true}
  pageSize={5}
  showCount={true}
  onProductClick={handleClick}
/>

// With static data
<ProductSection
  title="Static Products"
  products={productArray}
  enablePagination={true}
  pageSize={3}
  showCount={true}
  onProductClick={handleClick}
/>`}
            </pre>
          </div>
        </div>
      </div>

      <LightFooter />
    </div>
  );
};

export default DemoPaginationPage;
