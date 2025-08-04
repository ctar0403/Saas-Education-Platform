// API Response Types
export interface ApiProduct {
  id: number;
  expert: [string, string];
  category: {
    id: number;
    name: string;
    description: string;
  };
  title: string;
  description: string;
  date: string;
  type: string;
  title_url: string;
  view_style: string;
  is_paid: boolean;
  price: string;
  thumbnail: string;
  comments: number;
  benefits: number;
  files: Array<{
    id: number;
    files: string;
  }>;
  links: any[];
}

export interface PaginationInfo {
  total_items: number;
  next_cursor: string | null;
  previous_cursor: string | null;
  page_size: number;
}

export interface ApiResponse {
  status: string;
  code: number;
  data: {
    pagination: PaginationInfo;
    data: ApiProduct[];
  };
}

// Internal Product Type (converted from API)
export interface Product {
  id: number;
  title: string;
  image?: string;
  category: string;
  duration: string;
  rating: number;
  price: number;
  originalPrice?: number;
  featured?: boolean;
  badge?: string;
  noImage?: boolean;
  icon?: string;
}

// API Service
export class ProductsAPI {
  private baseUrl: string;
  private useMockData: boolean;

  constructor(baseUrl?: string) {
    // Use environment variable or default to mock in development
    this.baseUrl = baseUrl || process.env.NEXT_PUBLIC_API_URL || '/api';

    // Force mock data in development if no real API URL is provided
    this.useMockData = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true' ||
                     (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_API_URL);

    // Log the configuration in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 ProductsAPI initialized:', {
        baseUrl: this.baseUrl,
        useMockData: this.useMockData,
        hasApiUrl: !!process.env.NEXT_PUBLIC_API_URL,
        environment: process.env.NODE_ENV
      });
    }
  }

  async fetchProducts(
    category: string,
    page = 1,
    pageSize = 4
  ): Promise<ApiResponse> {
    // If explicitly configured to use mock data, return it immediately
    if (this.useMockData) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`🎭 Using mock data for category: ${category}, page: ${page}`);
      }
      return this.getMockResponse(category, page, pageSize);
    }

    // In development, if no real API URL is configured, use mock data
    if (process.env.NODE_ENV === 'development' && this.baseUrl === '/api') {
      if (process.env.NODE_ENV === 'development') {
        console.log(`🎭 No real API configured, using mock data for category: ${category}, page: ${page}`);
      }
      return this.getMockResponse(category, page, pageSize);
    }

    try {
      const params = new URLSearchParams({
        category,
        page: page.toString(),
        page_size: pageSize.toString(),
      });

      const url = `${this.baseUrl}/products?${params}`;
      if (process.env.NODE_ENV === 'development') {
        console.log(`🌐 Fetching from API: ${url}`);
      }

      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn(`⚠️ API endpoint returned ${response.status}, falling back to mock data`);
        return this.getMockResponse(category, page, pageSize);
      }

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.warn(`⚠️ API returned ${contentType}, expected JSON. Falling back to mock data`);
        return this.getMockResponse(category, page, pageSize);
      }

      const data = await response.json();

      // Validate response structure
      if (!data || !data.data || !data.data.pagination || !Array.isArray(data.data.data)) {
        console.warn('⚠️ Invalid API response structure, falling back to mock data');
        return this.getMockResponse(category, page, pageSize);
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(`✅ Successfully fetched ${data.data.data.length} products from API`);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.warn('⚠️ API request timed out, falling back to mock data');
        } else if (error.message.includes('Failed to fetch')) {
          console.warn('⚠️ Network error (API endpoint not available), falling back to mock data');
        } else if (error instanceof SyntaxError && error.message.includes('Unexpected token')) {
          console.warn('⚠️ API returned HTML instead of JSON (likely 404), falling back to mock data');
        } else {
          console.warn('⚠️ Error fetching products:', error.message);
        }
      } else {
        console.warn('⚠️ Unknown error fetching products:', error);
      }
      return this.getMockResponse(category, page, pageSize);
    }
  }

  // Convert API product to internal format
  convertApiProduct(apiProduct: ApiProduct): Product {
    return {
      id: apiProduct.id,
      title: apiProduct.title,
      image: apiProduct.thumbnail,
      category: apiProduct.category.name,
      duration: "17", // Default as API doesn't provide
      rating: 4.5, // Default as API doesn't provide
      price: parseFloat(apiProduct.price),
      featured: apiProduct.benefits > 0,
      badge: apiProduct.is_paid ? "PREMIUM" : undefined,
    };
  }

  // Mock data for when API is not available
  private getMockResponse(category: string, page: number, pageSize: number): ApiResponse {
    const imageUrls = [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ];

    const titles = [
      "Complete Financial Planning Masterclass",
      "Business Growth Strategy Course",
      "Investment Fundamentals Workshop",
      "Cash Flow Management Guide",
      "Entrepreneurship Bootcamp",
      "Digital Marketing for Business",
      "Advanced Excel for Finance",
      "Leadership Development Program",
      "Project Management Essentials",
      "Sales Funnel Optimization",
      "Customer Retention Strategies",
      "Brand Building Fundamentals",
      "Social Media Marketing",
      "E-commerce Success Blueprint",
      "Personal Finance Mastery"
    ];

    const descriptions = [
      "Transform your financial future with proven strategies",
      "Scale your business with data-driven growth tactics",
      "Master investment principles for long-term wealth",
      "Optimize cash flow for business sustainability",
      "Launch and grow your entrepreneurial venture",
      "Build a powerful online presence for your business"
    ];

    const mockProducts: ApiProduct[] = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      expert: ["expert@finx.com", "FinX Expert"],
      category: {
        id: 1,
        name: category,
        description: `${category} category description`
      },
      title: titles[i] || `${category} Product ${i + 1} - Complete Guide`,
      description: descriptions[i % descriptions.length],
      date: "06,July,2025",
      type: category.includes('bundle') ? 'bundle' : 'course',
      title_url: (titles[i] || `${category}-product-${i + 1}`).toLowerCase().replace(/\s+/g, '-'),
      view_style: "grid",
      is_paid: true,
      price: (Math.random() * 400 + 99).toFixed(2),
      thumbnail: imageUrls[i % imageUrls.length],
      comments: Math.floor(Math.random() * 50),
      benefits: Math.floor(Math.random() * 8) + 1,
      files: [],
      links: []
    }));

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = mockProducts.slice(startIndex, endIndex);

    return {
      status: "success",
      code: 200,
      data: {
        pagination: {
          total_items: mockProducts.length,
          next_cursor: endIndex < mockProducts.length ? `page-${page + 1}` : null,
          previous_cursor: page > 1 ? `page-${page - 1}` : null,
          page_size: pageSize
        },
        data: paginatedProducts
      }
    };
  }
}

// Default instance
export const productsAPI = new ProductsAPI();
