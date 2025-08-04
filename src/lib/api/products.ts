// API utility functions for product data

export interface ApiProduct {
  id: number;
  expert: [string, string]; // [email, name]
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
  files: {
    id: number;
    files: string;
  }[];
  links: any[];
}

export interface ApiPagination {
  total_items: number;
  next_cursor: string | null;
  previous_cursor: string | null;
  page_size: number;
}

export interface ApiResponse {
  status: string;
  code: number;
  data: {
    pagination: ApiPagination;
    data: ApiProduct[];
  };
}

export class ProductsAPI {
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl.replace(/\/+$/, ''); // Remove trailing slashes
    this.apiKey = apiKey;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<Response> {
    // Ensure we're only making requests on the client side
    if (typeof window === 'undefined') {
      throw new Error('API requests can only be made on the client side');
    }

    const url = `${this.baseUrl}${endpoint}`;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add API key to headers if provided
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
      // or headers['X-API-Key'] = this.apiKey; depending on your API
    }

    const requestOptions: RequestInit = {
      ...options,
      headers,
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response;
  }

  async getProducts(params: {
    cursor?: string | null;
    pageSize?: number;
    category?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<ApiResponse> {
    const {
      cursor,
      pageSize = 5,
      category,
      search,
      sortBy,
      sortOrder = 'desc'
    } = params;

    const queryParams = new URLSearchParams();
    
    if (cursor) queryParams.append('cursor', cursor);
    queryParams.append('page_size', pageSize.toString());
    if (category) queryParams.append('category', category);
    if (search) queryParams.append('search', search);
    if (sortBy) queryParams.append('sort_by', sortBy);
    queryParams.append('sort_order', sortOrder);

    const endpoint = `/products?${queryParams.toString()}`;
    const response = await this.makeRequest(endpoint);
    
    return response.json();
  }

  async getProductById(id: number): Promise<{ status: string; data: ApiProduct }> {
    const endpoint = `/products/${id}`;
    const response = await this.makeRequest(endpoint);
    
    return response.json();
  }

  async getProductsByCategory(categoryId: number, params: {
    cursor?: string | null;
    pageSize?: number;
  } = {}): Promise<ApiResponse> {
    const { cursor, pageSize = 5 } = params;
    
    const queryParams = new URLSearchParams();
    queryParams.append('category_id', categoryId.toString());
    if (cursor) queryParams.append('cursor', cursor);
    queryParams.append('page_size', pageSize.toString());

    const endpoint = `/products/category?${queryParams.toString()}`;
    const response = await this.makeRequest(endpoint);
    
    return response.json();
  }

  async searchProducts(query: string, params: {
    cursor?: string | null;
    pageSize?: number;
  } = {}): Promise<ApiResponse> {
    const { cursor, pageSize = 5 } = params;
    
    const queryParams = new URLSearchParams();
    queryParams.append('q', query);
    if (cursor) queryParams.append('cursor', cursor);
    queryParams.append('page_size', pageSize.toString());

    const endpoint = `/products/search?${queryParams.toString()}`;
    const response = await this.makeRequest(endpoint);
    
    return response.json();
  }
}

// Helper function to create a pre-configured API instance
export function createProductsAPI(config?: {
  baseUrl?: string;
  apiKey?: string;
}) {
  const defaultBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://107.21.185.46:9007';
  const defaultApiKey = process.env.NEXT_PUBLIC_API_KEY;

  return new ProductsAPI(
    config?.baseUrl || defaultBaseUrl,
    config?.apiKey || defaultApiKey
  );
}

// Example usage:
/*
const api = createProductsAPI();

// Get products with pagination
const response = await api.getProducts({
  pageSize: 5,
  cursor: null
});

// Search products
const searchResults = await api.searchProducts('javascript', {
  pageSize: 10
});

// Get products by category
const categoryProducts = await api.getProductsByCategory(1, {
  pageSize: 8
});
*/
