"use client";

import React from 'react';
import BlogCard, { BlogCardProps } from '../BlogCard/BlogCard';
import { Button } from '../../ui/button';
import { Grid, List, Search, Filter, Calendar, ArrowUpDown } from 'lucide-react';

export interface BlogListProps {
  heading?: string;
  description?: string;
  posts?: BlogCardProps[];
  viewMode?: 'grid' | 'list';
  showFilters?: boolean;
  showSearch?: boolean;
  showViewToggle?: boolean;
  showDateFilter?: boolean;
  featuredFirst?: boolean;
  maxItemsToShow?: number;
  backgroundColor?: string;
}

const BlogList: React.FC<BlogListProps> = ({
  heading = "Latest Blog Posts",
  description = "Stay updated with our latest insights, tips, and industry knowledge",
  posts = [
    {
      title: "The Future of Online Learning: Trends to Watch in 2024",
      excerpt: "Discover the emerging trends that are shaping the future of digital education and how they impact learners and educators alike.",
      author: "Sarah Johnson",
      authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&q=80",
      publishDate: "Dec 15, 2024",
      readTime: "8 min read",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
      category: "Education",
      slug: "future-of-online-learning-2024",
      tags: ["EdTech", "Trends", "Future"],
      isFeatured: true
    },
    {
      title: "Building Your First E-commerce Business: A Complete Guide",
      excerpt: "Learn the essential steps to launch a successful online business, from market research to customer acquisition strategies.",
      author: "Mike Chen",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&q=80",
      publishDate: "Dec 12, 2024",
      readTime: "12 min read",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
      category: "Business",
      slug: "first-ecommerce-business-guide",
      tags: ["E-commerce", "Entrepreneurship", "Guide"],
      isFeatured: false
    },
    {
      title: "Mastering Digital Marketing: SEO vs. Paid Advertising",
      excerpt: "Compare the pros and cons of organic SEO strategies versus paid advertising campaigns to determine the best approach for your business.",
      author: "Emily Rodriguez",
      authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&q=80",
      publishDate: "Dec 10, 2024",
      readTime: "6 min read",
      imageUrl: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&q=80",
      category: "Marketing",
      slug: "seo-vs-paid-advertising",
      tags: ["SEO", "PPC", "Marketing"],
      isFeatured: false
    },
    {
      title: "The Psychology of Color in Web Design",
      excerpt: "Understand how color choices impact user behavior and conversion rates in web design and digital marketing campaigns.",
      author: "David Kim",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&q=80",
      publishDate: "Dec 8, 2024",
      readTime: "10 min read",
      imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80",
      category: "Design",
      slug: "psychology-of-color-web-design",
      tags: ["Design", "Psychology", "UX"],
      isFeatured: false
    }
  ],
  viewMode = 'grid',
  showFilters = true,
  showSearch = true,
  showViewToggle = true,
  showDateFilter = true,
  featuredFirst = true,
  maxItemsToShow = 0,
  backgroundColor = "#ffffff"
}) => {
  const [currentViewMode, setCurrentViewMode] = React.useState<'grid' | 'list'>(viewMode);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [dateFilter, setDateFilter] = React.useState('all');
  const [sortBy, setSortBy] = React.useState(featuredFirst ? 'featured' : 'newest');

  // Filter and sort blog posts
  const filteredPosts = React.useMemo(() => {
    let filtered = posts.filter(post => {
      const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.author?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;

      let matchesDate = true;
      if (dateFilter !== 'all' && post.publishDate) {
        const postDate = new Date(post.publishDate);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));

        switch (dateFilter) {
          case 'week':
            matchesDate = daysDiff <= 7;
            break;
          case 'month':
            matchesDate = daysDiff <= 30;
            break;
          case 'quarter':
            matchesDate = daysDiff <= 90;
            break;
        }
      }

      return matchesSearch && matchesCategory && matchesDate;
    });

    // Sort posts
    switch (sortBy) {
      case 'featured':
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return new Date(b.publishDate || '').getTime() - new Date(a.publishDate || '').getTime();
        });
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.publishDate || '').getTime() - new Date(b.publishDate || '').getTime());
        break;
      case 'readtime-short':
        filtered.sort((a, b) => {
          const timeA = parseInt(a.readTime?.replace(/\D/g, '') || '0');
          const timeB = parseInt(b.readTime?.replace(/\D/g, '') || '0');
          return timeA - timeB;
        });
        break;
      case 'readtime-long':
        filtered.sort((a, b) => {
          const timeA = parseInt(a.readTime?.replace(/\D/g, '') || '0');
          const timeB = parseInt(b.readTime?.replace(/\D/g, '') || '0');
          return timeB - timeA;
        });
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.publishDate || '').getTime() - new Date(a.publishDate || '').getTime());
    }

    if (maxItemsToShow > 0) {
      filtered = filtered.slice(0, maxItemsToShow);
    }

    return filtered;
  }, [posts, searchTerm, selectedCategory, dateFilter, sortBy, maxItemsToShow]);

  // Get unique categories
  const categories = React.useMemo(() => {
    const cats = posts.map(post => post.category).filter(Boolean);
    return ['all', ...Array.from(new Set(cats))];
  }, [posts]);

  return (
    <section className="blog-list-section" style={{ backgroundColor }}>
      <div className="blog-list-container">
        <div className="section-header">
          <div className="header-content">
            <h2 className="section-heading">{heading}</h2>
            <p className="section-description">{description}</p>
          </div>

          {showViewToggle && (
            <div className="view-toggle">
              <Button
                variant={currentViewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentViewMode('grid')}
                className="toggle-button"
              >
                <Grid className="toggle-icon" />
              </Button>
              <Button
                variant={currentViewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentViewMode('list')}
                className="toggle-button"
              >
                <List className="toggle-icon" />
              </Button>
            </div>
          )}
        </div>

        {(showSearch || showFilters) && (
          <div className="controls-bar">
            {showSearch && (
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            )}

            <div className="filters-row">
              {showFilters && (
                <div className="filter-container">
                  <Filter className="filter-icon" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-select"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {showDateFilter && (
                <div className="filter-container">
                  <Calendar className="filter-icon" />
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Time</option>
                    <option value="week">Past Week</option>
                    <option value="month">Past Month</option>
                    <option value="quarter">Past 3 Months</option>
                  </select>
                </div>
              )}

              <div className="filter-container">
                <ArrowUpDown className="filter-icon" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="readtime-short">Quick Reads</option>
                  <option value="readtime-long">Long Reads</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className={`posts-grid ${currentViewMode}`}>
          {filteredPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="no-results">
            <p>No articles found matching your criteria.</p>
          </div>
        )}

        <div className="results-count">
          Showing {filteredPosts.length} of {posts.length} articles
        </div>
      </div>

      <style jsx>{`
        .blog-list-section {
          padding: 60px 20px;
        }

        .blog-list-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
        }

        .header-content {
          flex: 1;
        }

        .section-heading {
          font-size: 36px;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 12px 0;
        }

        .section-description {
          font-size: 18px;
          color: #6b7280;
          margin: 0;
        }

        .view-toggle {
          display: flex;
          gap: 4px;
        }

        .toggle-button {
          padding: 8px;
        }

        .toggle-icon {
          width: 18px;
          height: 18px;
        }

        .controls-bar {
          margin-bottom: 40px;
        }

        .search-container {
          position: relative;
          margin-bottom: 20px;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          color: #6b7280;
          z-index: 1;
        }

        .search-input {
          width: 100%;
          padding: 12px 12px 12px 44px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 16px;
          background: white;
        }

        .search-input:focus {
          outline: none;
          border-color: #08AD98;
          box-shadow: 0 0 0 3px rgba(8, 173, 152, 0.1);
        }

        .filters-row {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .filter-container {
          position: relative;
          min-width: 180px;
        }

        .filter-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          color: #6b7280;
          pointer-events: none;
          z-index: 1;
        }

        .filter-select {
          width: 100%;
          padding: 12px 12px 12px 44px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 16px;
          background: white;
          cursor: pointer;
        }

        .filter-select:focus {
          outline: none;
          border-color: #08AD98;
          box-shadow: 0 0 0 3px rgba(8, 173, 152, 0.1);
        }

        .posts-grid.grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }

        .posts-grid.list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }

        .results-count {
          text-align: center;
          margin-top: 40px;
          color: #6b7280;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .section-heading {
            font-size: 28px;
          }

          .filters-row {
            flex-direction: column;
          }

          .filter-container {
            min-width: auto;
          }

          .posts-grid.grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default BlogList;
