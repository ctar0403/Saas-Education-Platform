export const BUILDER_CONFIG = {
  API_KEY: 'ab5b460294654ac49703c8715debb464',
  BASE_URL: 'https://builder.io/api/v1',
  ENDPOINTS: {
    CREATE_PAGE: '/content',
    GET_MODELS: '/models',
    REGISTER_COMPONENTS: '/components'
  }
};

export const REGISTERED_COMPONENTS = [
  {
    name: 'CourseList',
    component: 'CourseList',
    inputs: [
      { name: 'heading', type: 'string', defaultValue: 'Featured Courses' },
      { name: 'description', type: 'string', defaultValue: 'Discover our most popular courses' },
      { name: 'viewMode', type: 'string', enum: ['grid', 'list'], defaultValue: 'grid' },
      { name: 'showFilters', type: 'boolean', defaultValue: true },
      { name: 'showSearch', type: 'boolean', defaultValue: true },
      { name: 'showViewToggle', type: 'boolean', defaultValue: true },
      { name: 'maxItemsToShow', type: 'number', defaultValue: 0 },
      { name: 'backgroundColor', type: 'string', defaultValue: '#ffffff' }
    ]
  },
  {
    name: 'ProductList',
    component: 'ProductList',
    inputs: [
      { name: 'heading', type: 'string', defaultValue: 'Featured Products' },
      { name: 'description', type: 'string', defaultValue: 'Discover our best-selling digital products' },
      { name: 'viewMode', type: 'string', enum: ['grid', 'list'], defaultValue: 'grid' },
      { name: 'showFilters', type: 'boolean', defaultValue: true },
      { name: 'showSearch', type: 'boolean', defaultValue: true },
      { name: 'showViewToggle', type: 'boolean', defaultValue: true },
      { name: 'showPriceFilter', type: 'boolean', defaultValue: true },
      { name: 'maxItemsToShow', type: 'number', defaultValue: 0 },
      { name: 'backgroundColor', type: 'string', defaultValue: '#ffffff' }
    ]
  },
  {
    name: 'BlogList',
    component: 'BlogList',
    inputs: [
      { name: 'heading', type: 'string', defaultValue: 'Latest Blog Posts' },
      { name: 'description', type: 'string', defaultValue: 'Stay updated with our latest insights' },
      { name: 'viewMode', type: 'string', enum: ['grid', 'list'], defaultValue: 'grid' },
      { name: 'showFilters', type: 'boolean', defaultValue: true },
      { name: 'showSearch', type: 'boolean', defaultValue: true },
      { name: 'showViewToggle', type: 'boolean', defaultValue: true },
      { name: 'showDateFilter', type: 'boolean', defaultValue: true },
      { name: 'featuredFirst', type: 'boolean', defaultValue: true },
      { name: 'maxItemsToShow', type: 'number', defaultValue: 0 },
      { name: 'backgroundColor', type: 'string', defaultValue: '#ffffff' }
    ]
  },
  {
    name: 'CourseCard',
    component: 'CourseCard',
    inputs: [
      { name: 'title', type: 'string', required: true },
      { name: 'description', type: 'string', required: true },
      { name: 'instructor', type: 'string' },
      { name: 'duration', type: 'string' },
      { name: 'price', type: 'string' },
      { name: 'imageUrl', type: 'string' },
      { name: 'rating', type: 'number' },
      { name: 'studentsCount', type: 'number' },
      { name: 'level', type: 'string' },
      { name: 'category', type: 'string' },
      { name: 'slug', type: 'string', required: true }
    ]
  },
  {
    name: 'ProductCard',
    component: 'ProductCard',
    inputs: [
      { name: 'title', type: 'string', required: true },
      { name: 'description', type: 'string', required: true },
      { name: 'price', type: 'string' },
      { name: 'originalPrice', type: 'string' },
      { name: 'imageUrl', type: 'string' },
      { name: 'rating', type: 'number' },
      { name: 'reviewsCount', type: 'number' },
      { name: 'category', type: 'string' },
      { name: 'slug', type: 'string', required: true },
      { name: 'isOnSale', type: 'boolean', defaultValue: false },
      { name: 'inStock', type: 'boolean', defaultValue: true }
    ]
  },
  {
    name: 'BlogCard',
    component: 'BlogCard',
    inputs: [
      { name: 'title', type: 'string', required: true },
      { name: 'excerpt', type: 'string', required: true },
      { name: 'author', type: 'string' },
      { name: 'authorImage', type: 'string' },
      { name: 'publishDate', type: 'string' },
      { name: 'readTime', type: 'string' },
      { name: 'imageUrl', type: 'string' },
      { name: 'category', type: 'string' },
      { name: 'slug', type: 'string', required: true },
      { name: 'isFeatured', type: 'boolean', defaultValue: false }
    ]
  }
];
