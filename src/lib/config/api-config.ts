// API Configuration for different environments
export const API_CONFIG = {
  // Base URLs for different environments
  development: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    endpoints: {
      products: '/products',
      courses: '/products?category=course',
      coaching: '/products?category=coaching',
      digitalDownloads: '/products?category=digital-downloads',
      bundles: '/products?category=bundle',
    }
  },
  
  production: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://your-api-domain.com/api',
    endpoints: {
      products: '/products',
      courses: '/products?category=course',
      coaching: '/products?category=coaching',
      digitalDownloads: '/products?category=digital-downloads',
      bundles: '/products?category=bundle',
    }
  },

  // Mock mode for development/testing
  mock: {
    enabled: process.env.NEXT_PUBLIC_USE_MOCK_API === 'true',
    delay: 1000, // Simulate API delay in ms
  }
};

// Get current environment configuration
export const getCurrentConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return API_CONFIG[env as keyof typeof API_CONFIG] || API_CONFIG.development;
};

// Product category mappings
export const PRODUCT_CATEGORIES = {
  COURSE: 'course',
  COACHING: 'coaching',
  DIGITAL_DOWNLOADS: 'digital-downloads',
  GENERAL: 'general',
  BUNDLE_DESERT: 'bundle-desert',
  BUNDLE_LUNCH: 'bundle-lunch',
} as const;

// API response status codes
export const API_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
} as const;

// Default pagination settings
export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 4,
  INITIAL_PAGE: 1,
  MAX_PAGE_SIZE: 20,
} as const;
