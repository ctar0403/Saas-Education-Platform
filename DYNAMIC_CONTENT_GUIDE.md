# Dynamic Content System with Builder.io

This guide explains how to use the dynamic content system built for this e-learning platform. The system allows you to create reusable components that can display dynamic data from Builder.io data models or external APIs.

## 🏗️ Architecture Overview

The dynamic content system consists of:

1. **Individual Components** - Reusable cards for courses, products, and blog posts
2. **List Components** - Components that display multiple items with filtering and search
3. **Data Binding Utilities** - Helper functions to connect to Builder.io data models
4. **Dynamic Routing** - Automatic page generation for individual content items

## 📦 Components Available

### Individual Components

- **CourseCard** - Displays course information with rating, price, and enrollment
- **ProductCard** - Shows product details with pricing and purchase options  
- **BlogCard** - Article preview with author, date, and read time

### List Components

- **CourseList** - Grid/list view of courses with search and filtering
- **ProductList** - Product catalog with price filters and sorting
- **BlogList** - Blog post listing with category and date filters

## 🚀 Quick Start Guide

### 1. Set Up Data Models in Builder.io

Create these data models in your Builder.io dashboard:

#### Course Model
```json
{
  "name": "course",
  "fields": [
    {"name": "title", "type": "text"},
    {"name": "description", "type": "longText"},
    {"name": "instructor", "type": "text"},
    {"name": "duration", "type": "text"},
    {"name": "price", "type": "text"},
    {"name": "imageUrl", "type": "file"},
    {"name": "rating", "type": "number"},
    {"name": "studentsCount", "type": "number"},
    {"name": "level", "type": "enum", "enum": ["Beginner", "Intermediate", "Advanced"]},
    {"name": "category", "type": "text"},
    {"name": "slug", "type": "text"},
    {"name": "tags", "type": "list"}
  ]
}
```

#### Product Model
```json
{
  "name": "product", 
  "fields": [
    {"name": "title", "type": "text"},
    {"name": "description", "type": "longText"},
    {"name": "price", "type": "text"},
    {"name": "originalPrice", "type": "text"},
    {"name": "imageUrl", "type": "file"},
    {"name": "rating", "type": "number"},
    {"name": "reviewsCount", "type": "number"},
    {"name": "category", "type": "text"},
    {"name": "slug", "type": "text"},
    {"name": "tags", "type": "list"},
    {"name": "isOnSale", "type": "boolean"},
    {"name": "inStock", "type": "boolean"}
  ]
}
```

#### Blog Model
```json
{
  "name": "blog",
  "fields": [
    {"name": "title", "type": "text"},
    {"name": "excerpt", "type": "longText"},
    {"name": "content", "type": "richText"},
    {"name": "author", "type": "text"},
    {"name": "authorImage", "type": "file"},
    {"name": "publishDate", "type": "text"},
    {"name": "readTime", "type": "text"},
    {"name": "imageUrl", "type": "file"},
    {"name": "category", "type": "text"},
    {"name": "slug", "type": "text"},
    {"name": "tags", "type": "list"},
    {"name": "isFeatured", "type": "boolean"}
  ]
}
```

### 2. Add Sample Content

Create entries in each data model with your content. Make sure to:
- Use unique slugs for each entry
- Add relevant tags and categories
- Include high-quality images
- Set appropriate pricing and ratings

### 3. Use Components in Builder.io

1. Go to Builder.io Visual Editor
2. Find components under "Dynamic Content" groups:
   - "Dynamic Content / Individual" - for single cards
   - "Dynamic Content / Lists" - for multiple items
3. Drag components onto your page
4. Configure component properties in the right panel
5. For list components, you can either:
   - Use default sample data
   - Connect to your data models using data binding

### 4. Set Up Dynamic Routing

For individual content pages (e.g., `/course/web-development`):

1. In Builder.io, create a new page
2. Set URL targeting to use data model:
   - Path: `/course/:slug`
   - Target by: `course` data model
   - Field: `slug`
3. Design your page using individual components
4. The page will automatically generate for each course entry

## 🔧 Data Binding Usage

### Basic Data Fetching

```typescript
import { useDataBinding } from '@/lib/data-binding';

const dataService = useDataBinding();

// Fetch all courses
const courses = await dataService.fetchCourses();

// Fetch courses with filters
const advancedCourses = await dataService.fetchCourses({
  level: 'Advanced',
  category: 'Programming',
  limit: 6
});

// Get single course by slug
const course = await dataService.getContentBySlug('course', 'web-development');
```

### Search Functionality

```typescript
// Search across multiple fields
const results = await dataService.searchContent('course', 'react', ['title', 'description']);

// Get related content
const related = await dataService.getRelatedContent('course', currentId, 'Programming', ['React', 'JavaScript']);
```

### Custom Data Sources

You can extend the data binding system to work with external APIs:

```typescript
import { DataBindingService } from '@/lib/data-binding';

class CustomDataService extends DataBindingService {
  async fetchFromAPI(endpoint: string) {
    const response = await fetch(`https://api.example.com/${endpoint}`);
    return response.json();
  }
}
```

## 🎨 Customization

### Styling Components

Components use CSS-in-JS for easy customization. Modify the `<style jsx>` blocks in each component:

```jsx
<style jsx>{`
  .course-card {
    background: white;
    border-radius: 12px;
    /* Your custom styles */
  }
`}</style>
```

### Adding New Component Props

1. Update the TypeScript interface
2. Add the new prop to the component registration in `builder-registry.ts`
3. Use the prop in your component logic

Example:
```typescript
export interface CourseCardProps {
  // existing props...
  difficulty?: string; // new prop
}

// In builder-registry.ts
{
  name: "difficulty",
  type: "string",
  defaultValue: "Beginner",
}
```

## 📱 Responsive Design

All components are built with mobile-first responsive design:

- Grid layouts automatically adapt to screen size
- Typography scales appropriately
- Interactive elements are touch-friendly
- Images are optimized for different viewports

## ⚡ Performance Best Practices

### Image Optimization

- Use WebP format when possible
- Implement lazy loading for lists
- Provide appropriate alt text

### Data Loading

- Use pagination for large datasets
- Implement search debouncing
- Cache frequently accessed data

### SEO Optimization

Dynamic pages automatically generate:
- Proper meta titles and descriptions
- Open Graph tags for social sharing
- Structured data for search engines

## 🔍 Advanced Features

### Custom Filters

Add custom filtering logic:

```typescript
const filterCourses = (courses: CourseModel[], filters: any) => {
  return courses.filter(course => {
    if (filters.priceRange && course.price) {
      const price = parseFloat(course.price.replace('$', ''));
      return price >= filters.priceRange.min && price <= filters.priceRange.max;
    }
    return true;
  });
};
```

### Analytics Integration

Track user interactions:

```typescript
const handleCourseClick = (courseId: string) => {
  // Track with your analytics service
  analytics.track('Course Viewed', { courseId });
  
  // Navigate to course page
  router.push(`/course/${courseSlug}`);
};
```

### A/B Testing

Test different layouts and content:

```typescript
const isVariantB = Math.random() > 0.5;

<CourseList 
  viewMode={isVariantB ? 'list' : 'grid'}
  // other props
/>
```

## 🚀 Deployment

1. Set your Builder.io API key in environment variables:
   ```
   NEXT_PUBLIC_BUILDER_API_KEY=your_key_here
   ```

2. Build and deploy your Next.js application

3. Configure Builder.io webhook to trigger rebuilds when content changes

## 🐛 Troubleshooting

### Common Issues

**Components not showing in Builder.io:**
- Check that `builder-registry.ts` is imported
- Verify API key is set correctly
- Ensure components are properly registered

**Data not loading:**
- Check network requests in browser dev tools
- Verify data model names match exactly
- Ensure content is published in Builder.io

**Styling issues:**
- Check for conflicting CSS
- Verify responsive breakpoints
- Test across different browsers

### Debug Mode

Enable debug logging:

```typescript
// In development
if (process.env.NODE_ENV === 'development') {
  console.log('Data loading:', data);
}
```

## 📚 Additional Resources

- [Builder.io Documentation](https://www.builder.io/c/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Component Demo Page](/dynamic-demo)

## 🤝 Contributing

To add new dynamic components:

1. Create component in `/components/dynamic/`
2. Add TypeScript interfaces
3. Register in `builder-registry.ts`
4. Add to demo page
5. Update this documentation

## 📧 Support

If you need help implementing dynamic content features, please refer to this guide or check the demo page at `/dynamic-demo`.
