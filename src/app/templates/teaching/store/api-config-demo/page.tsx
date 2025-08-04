import React from "react";
import AnnouncementsNavigation from "../../components/Navigation/AnnouncementsNavigation";
import LightFooter from "../../components/Footer/LightFooter";

const ApiConfigDemo = () => {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementsNavigation />
      
      <div className="py-16 px-4 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#032C3D] mb-8">
            API Configuration Guide
          </h1>
          
          <div className="space-y-8">
            {/* Overview */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-[#032C3D] mb-4">
                Overview
              </h2>
              <p className="text-gray-700 mb-4">
                The store page has been refactored into individual API-connected components for each product section:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>ProductsOfCourse</strong> - Fetches course products</li>
                <li><strong>ProductsOfCoaching</strong> - Fetches coaching products</li>
                <li><strong>ProductsOfDigitalDownloads</strong> - Fetches digital downloads</li>
                <li><strong>GeneralProducts</strong> - Fetches general products</li>
                <li><strong>BundleProducts</strong> - Fetches bundle products (reusable for different bundle types)</li>
              </ul>
            </div>

            {/* API Response Format */}
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-[#032C3D] mb-4">
                Expected API Response Format
              </h2>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "status": "success",
  "code": 200,
  "data": {
    "pagination": {
      "total_items": 15,
      "next_cursor": "page-2",
      "previous_cursor": null,
      "page_size": 4
    },
    "data": [
      {
        "id": 1,
        "expert": ["expert@email.com", "Expert Name"],
        "category": {
          "id": 1,
          "name": "videos",
          "description": "Video content"
        },
        "title": "Product Title",
        "description": "Product description",
        "date": "06,July,2025",
        "type": "course",
        "title_url": "product-slug",
        "view_style": "grid",
        "is_paid": true,
        "price": "199.00",
        "thumbnail": "https://example.com/image.jpg",
        "comments": 15,
        "benefits": 5,
        "files": [],
        "links": []
      }
    ]
  }
}`}
              </pre>
            </div>

            {/* Configuration */}
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-[#032C3D] mb-4">
                Environment Configuration
              </h2>
              <p className="text-gray-700 mb-4">
                Create a <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> file in your project root:
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm">
{`# API Configuration
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api

# Use mock data for development (optional)
NEXT_PUBLIC_USE_MOCK_API=false`}
              </pre>
            </div>

            {/* API Endpoints */}
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-[#032C3D] mb-4">
                Required API Endpoints
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-[#032C3D]">GET /api/products</h3>
                  <p className="text-gray-700 mb-2">Fetch products with pagination and filtering</p>
                  <div className="bg-gray-100 p-3 rounded">
                    <strong>Query Parameters:</strong>
                    <ul className="list-disc list-inside mt-1 text-sm">
                      <li><code>category</code> - Product category (course, coaching, digital-downloads, etc.)</li>
                      <li><code>page</code> - Page number (default: 1)</li>
                      <li><code>page_size</code> - Items per page (default: 4)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Component Usage */}
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-[#032C3D] mb-4">
                Component Usage Examples
              </h2>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`// Basic usage with default API
<ProductsOfCourse />

// With custom API endpoint
<ProductsOfCourse apiEndpoint="https://custom-api.com/api" />

// Bundle products (reusable)
<BundleProducts 
  title="Bundle Desert"
  bundleType="desert"
/>

<BundleProducts 
  title="Bundle Lunch"
  bundleType="lunch"
/>`}
              </pre>
            </div>

            {/* Features */}
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-[#032C3D] mb-4">
                Component Features
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-[#032C3D] mb-2">Pagination</h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>Working next/previous buttons</li>
                    <li>Clickable page numbers</li>
                    <li>Items count display</li>
                    <li>Responsive design</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[#032C3D] mb-2">Error Handling</h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>Loading states with spinners</li>
                    <li>Error messages with retry buttons</li>
                    <li>Graceful fallback to mock data</li>
                    <li>Network error handling</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-[#032C3D] mb-4">
                Next Steps
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Set up your API endpoints that return the expected format</li>
                <li>Configure environment variables with your API URL</li>
                <li>Test each component with real data</li>
                <li>Customize the product click handlers for your needs</li>
                <li>Add authentication if required by your API</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <LightFooter />
    </div>
  );
};

export default ApiConfigDemo;
