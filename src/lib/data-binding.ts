import { builder } from "@builder.io/sdk";

// Types for different content models
export interface ContentModelBase {
  id: string;
  slug: string;
  createdDate: Date;
  publishedDate?: Date;
  status: 'draft' | 'published' | 'archived';
}

export interface CourseModel extends ContentModelBase {
  title: string;
  description: string;
  instructor: string;
  duration: string;
  price: string;
  imageUrl: string;
  rating: number;
  studentsCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  tags: string[];
  curriculum?: {
    module: string;
    lessons: string[];
  }[];
}

export interface ProductModel extends ContentModelBase {
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  category: string;
  tags: string[];
  isOnSale: boolean;
  inStock: boolean;
  downloadUrl?: string;
  features?: string[];
}

export interface BlogModel extends ContentModelBase {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  publishDate: string;
  readTime: string;
  imageUrl: string;
  category: string;
  tags: string[];
  isFeatured: boolean;
}

// Data fetching utilities
export class DataBindingService {
  private builderApiKey: string;

  constructor(apiKey: string) {
    this.builderApiKey = apiKey;
    builder.init(apiKey);
  }

  // Generic method to fetch content from Builder.io data models
  async fetchContent<T>(modelName: string, options?: {
    query?: any;
    limit?: number;
    offset?: number;
    fields?: string;
    sort?: string;
  }): Promise<T[]> {
    try {
      const query = builder.getAll(modelName, {
        ...options,
        apiKey: this.builderApiKey,
      });

      const results = await query;
      return results.map(item => ({
        id: item.id,
        ...item.data,
        createdDate: new Date(item.createdDate),
        publishedDate: item.publishedDate ? new Date(item.publishedDate) : undefined,
      })) as T[];
    } catch (error) {
      console.error(`Error fetching ${modelName}:`, error);
      return [];
    }
  }

  // Specific methods for each content type
  async fetchCourses(options?: {
    category?: string;
    level?: string;
    featured?: boolean;
    limit?: number;
  }): Promise<CourseModel[]> {
    const query: any = { published: 'published' };
    
    if (options?.category) {
      query.category = options.category;
    }
    
    if (options?.level) {
      query.level = options.level;
    }
    
    if (options?.featured) {
      query.featured = true;
    }

    return this.fetchContent<CourseModel>('course', {
      query,
      limit: options?.limit,
      sort: '-rating',
    });
  }

  async fetchProducts(options?: {
    category?: string;
    inStock?: boolean;
    onSale?: boolean;
    priceRange?: { min: number; max: number };
    limit?: number;
  }): Promise<ProductModel[]> {
    const query: any = { published: 'published' };
    
    if (options?.category) {
      query.category = options.category;
    }
    
    if (options?.inStock !== undefined) {
      query.inStock = options.inStock;
    }
    
    if (options?.onSale !== undefined) {
      query.isOnSale = options.onSale;
    }

    return this.fetchContent<ProductModel>('product', {
      query,
      limit: options?.limit,
      sort: '-rating',
    });
  }

  async fetchBlogPosts(options?: {
    category?: string;
    author?: string;
    featured?: boolean;
    dateRange?: { from: Date; to: Date };
    limit?: number;
  }): Promise<BlogModel[]> {
    const query: any = { published: 'published' };
    
    if (options?.category) {
      query.category = options.category;
    }
    
    if (options?.author) {
      query.author = options.author;
    }
    
    if (options?.featured) {
      query.isFeatured = true;
    }

    return this.fetchContent<BlogModel>('blog', {
      query,
      limit: options?.limit,
      sort: '-publishedDate',
    });
  }

  // Get single content item by slug
  async getContentBySlug<T>(modelName: string, slug: string): Promise<T | null> {
    try {
      const content = await builder.get(modelName, {
        query: {
          'data.slug': slug,
        },
        apiKey: this.builderApiKey,
      }).toPromise();

      if (!content) {
        return null;
      }

      return {
        id: content.id,
        ...content.data,
        createdDate: new Date(content.createdDate),
        publishedDate: content.publishedDate ? new Date(content.publishedDate) : undefined,
      } as T;
    } catch (error) {
      console.error(`Error fetching ${modelName} by slug ${slug}:`, error);
      return null;
    }
  }

  // Search content across fields
  async searchContent<T>(modelName: string, searchTerm: string, searchFields: string[] = ['title', 'description']): Promise<T[]> {
    const searchQueries = searchFields.map(field => ({
      [`data.${field}`]: { $regex: searchTerm, $options: 'i' }
    }));

    return this.fetchContent<T>(modelName, {
      query: {
        $or: searchQueries,
        published: 'published',
      },
    });
  }

  // Get related content based on tags or category
  async getRelatedContent<T>(modelName: string, currentItemId: string, category?: string, tags?: string[], limit: number = 3): Promise<T[]> {
    const query: any = {
      published: 'published',
      id: { $ne: currentItemId }, // Exclude current item
    };

    if (category) {
      query.category = category;
    }

    if (tags && tags.length > 0) {
      query.tags = { $in: tags };
    }

    return this.fetchContent<T>(modelName, {
      query,
      limit,
      sort: '-publishedDate',
    });
  }
}

// Hook for using data binding in React components
export function useDataBinding(apiKey?: string) {
  const service = new DataBindingService(apiKey || process.env.NEXT_PUBLIC_BUILDER_API_KEY!);
  return service;
}

// Utility functions for data transformation
export const DataTransformers = {
  // Transform Builder.io data to component props format
  courseToCardProps: (course: CourseModel) => ({
    title: course.title,
    description: course.description,
    instructor: course.instructor,
    duration: course.duration,
    price: course.price,
    imageUrl: course.imageUrl,
    rating: course.rating,
    studentsCount: course.studentsCount,
    level: course.level,
    category: course.category,
    slug: course.slug,
    tags: course.tags,
  }),

  productToCardProps: (product: ProductModel) => ({
    title: product.title,
    description: product.description,
    price: product.price,
    originalPrice: product.originalPrice,
    imageUrl: product.imageUrl,
    rating: product.rating,
    reviewsCount: product.reviewsCount,
    category: product.category,
    slug: product.slug,
    tags: product.tags,
    isOnSale: product.isOnSale,
    inStock: product.inStock,
  }),

  blogToCardProps: (blog: BlogModel) => ({
    title: blog.title,
    excerpt: blog.excerpt,
    author: blog.author,
    authorImage: blog.authorImage,
    publishDate: blog.publishDate,
    readTime: blog.readTime,
    imageUrl: blog.imageUrl,
    category: blog.category,
    slug: blog.slug,
    tags: blog.tags,
    isFeatured: blog.isFeatured,
  }),
};

// Error handling and loading states
export interface DataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export class DataStateManager<T> {
  private state: DataState<T> = {
    data: null,
    loading: false,
    error: null,
  };

  private listeners: ((state: DataState<T>) => void)[] = [];

  getState(): DataState<T> {
    return this.state;
  }

  setState(newState: Partial<DataState<T>>) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach(listener => listener(this.state));
  }

  subscribe(listener: (state: DataState<T>) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  async execute(asyncOperation: () => Promise<T>) {
    this.setState({ loading: true, error: null });
    
    try {
      const result = await asyncOperation();
      this.setState({ data: result, loading: false });
      return result;
    } catch (error) {
      this.setState({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false 
      });
      throw error;
    }
  }
}

export default DataBindingService;
