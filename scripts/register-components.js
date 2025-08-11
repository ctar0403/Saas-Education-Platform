#!/usr/bin/env node

/**
 * Script to register custom components with Builder.io
 * This script pushes your local component definitions to your Builder.io space
 */

const https = require('https');

// Your Builder.io configuration
const BUILDER_API_KEY = 'ab5b460294654ac49703c8715debb464';
const BUILDER_BASE_URL = 'https://builder.io/api/v1';

// Component definitions from your project
const components = [
  {
    name: 'CourseList',
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

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BUILDER_BASE_URL);
    
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Authorization': `Bearer ${BUILDER_API_KEY}`,
        'Content-Type': 'application/json',
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const result = body ? JSON.parse(body) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(result);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${body}`));
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function registerComponents() {
  console.log('🚀 Starting component registration with Builder.io...');
  console.log(`📡 Using API Key: ${BUILDER_API_KEY}`);

  try {
    // Get existing components to avoid duplicates
    console.log('📋 Fetching existing components...');
    let existingComponents, existingNames = [];

    try {
      existingComponents = await makeRequest('/custom-components');
      existingNames = existingComponents.results?.map(c => c.name) || [];
    } catch (error) {
      console.log('⚠️  Could not fetch existing components, proceeding with registration...');
    }
    
    for (const component of components) {
      console.log(`\n🔧 Processing component: ${component.name}`);
      
      if (existingNames.includes(component.name)) {
        console.log(`⏭️  Component "${component.name}" already exists, skipping...`);
        continue;
      }
      
      try {
        const result = await makeRequest('/custom-components', 'POST', component);
        console.log(`✅ Successfully registered: ${component.name}`);
      } catch (error) {
        console.error(`❌ Failed to register ${component.name}:`, error.message);
      }
    }
    
    console.log('\n🎉 Component registration completed!');
    console.log('\n📖 Next steps:');
    console.log('1. Run your development server: npm run dev');
    console.log('2. Visit your Builder.io space: https://builder.io/content');
    console.log('3. Create a new page and look for your custom components in the component palette');
    
  } catch (error) {
    console.error('❌ Registration failed:', error.message);
    process.exit(1);
  }
}

// Run the registration
registerComponents();
