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

export interface PaginationMeta {
  total_items: number;
  next_cursor: string | null;
  previous_cursor: string | null;
  page_size: number;
}

export interface ApiResponse {
  status: string;
  code: number;
  data: {
    pagination: PaginationMeta;
    data: ApiProduct[];
  };
}

export interface FetchProductsParams {
  endpoint: string;
  page?: number;
  limit?: number;
  category?: string;
}

/**
 * Fetch paginated products from API
 */
export async function fetchPaginatedProducts({
  endpoint,
  page = 1,
  limit = 4,
  category
}: FetchProductsParams): Promise<ApiResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(category && { category })
  });

  const response = await fetch(`${endpoint}?${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Convert API product to internal product format
 */
export function convertApiProductToInternal(apiProduct: ApiProduct) {
  return {
    id: apiProduct.id,
    title: apiProduct.title,
    image: apiProduct.thumbnail,
    category: apiProduct.category.name,
    duration: "17", // Default duration as API doesn't provide this
    rating: 4.5, // Default rating as API doesn't provide this
    price: parseFloat(apiProduct.price),
    featured: apiProduct.benefits > 0,
    badge: apiProduct.is_paid ? "PREMIUM" : undefined
  };
}

/**
 * Mock API response for demonstration when no real endpoint is provided
 */
export function createMockApiResponse(
  products: any[],
  page: number,
  pageSize: number
): ApiResponse {
  const totalItems = products.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return {
    status: "success",
    code: 200,
    data: {
      pagination: {
        total_items: totalItems,
        next_cursor: endIndex < totalItems ? `page-${page + 1}` : null,
        previous_cursor: page > 1 ? `page-${page - 1}` : null,
        page_size: pageSize
      },
      data: paginatedProducts.map(product => ({
        id: product.id,
        expert: ["expert@example.com", "Expert Name"],
        category: {
          id: 1,
          name: product.category,
          description: `${product.category} category`
        },
        title: product.title,
        description: product.title,
        date: new Date().toLocaleDateString('en-US', { 
          day: '2-digit', 
          month: 'long', 
          year: 'numeric' 
        }),
        type: "product",
        title_url: product.title.toLowerCase().replace(/\s+/g, '-'),
        view_style: "grid",
        is_paid: product.price > 0,
        price: product.price.toString(),
        thumbnail: product.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        comments: 0,
        benefits: product.featured ? 1 : 0,
        files: [],
        links: []
      }))
    }
  };
}
