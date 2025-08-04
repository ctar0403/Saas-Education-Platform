"use client";

import React from 'react';
import ProductCard, { ProductCardProps } from '../ProductCard/ProductCard';
import { Button } from '../../ui/button';
import { Grid, List, Search, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export interface ProductListProps {
  heading?: string;
  description?: string;
  products?: ProductCardProps[];
  viewMode?: 'grid' | 'list';
  showFilters?: boolean;
  showSearch?: boolean;
  showViewToggle?: boolean;
  showPriceFilter?: boolean;
  maxItemsToShow?: number;
  backgroundColor?: string;
}

const ProductList: React.FC<ProductListProps> = ({
  heading = "Featured Products",
  description = "Discover our best-selling digital products and resources",
  products = [
    {
      title: "Complete Course Bundle",
      description: "Get access to all our premium courses in one comprehensive package",
      price: "$199",
      originalPrice: "$299",
      imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80",
      rating: 4.9,
      reviewsCount: 234,
      category: "Bundle",
      slug: "complete-course-bundle",
      tags: ["Best Value", "All Access"],
      isOnSale: true,
      inStock: true
    },
    {
      title: "Marketing Templates Pack",
      description: "Professional templates for social media, email campaigns, and more",
      price: "$49",
      originalPrice: "",
      imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&q=80",
      rating: 4.6,
      reviewsCount: 89,
      category: "Templates",
      slug: "marketing-templates-pack",
      tags: ["Social Media", "Email"],
      isOnSale: false,
      inStock: true
    },
    {
      title: "Business Plan Workbook",
      description: "Step-by-step guide to creating a winning business plan",
      price: "$29",
      originalPrice: "",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      rating: 4.7,
      reviewsCount: 156,
      category: "eBook",
      slug: "business-plan-workbook",
      tags: ["Planning", "Strategy"],
      isOnSale: false,
      inStock: true
    },
    {
      title: "Exclusive Mentorship Program",
      description: "One-on-one coaching sessions with industry experts",
      price: "$999",
      originalPrice: "",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
      rating: 5.0,
      reviewsCount: 12,
      category: "Coaching",
      slug: "mentorship-program",
      tags: ["Premium", "Personal"],
      isOnSale: false,
      inStock: false
    }
  ],
  viewMode = 'grid',
  showFilters = true,
  showSearch = true,
  showViewToggle = true,
  showPriceFilter = true,
  maxItemsToShow = 0,
  backgroundColor = "#ffffff"
}) => {
  const [currentViewMode, setCurrentViewMode] = React.useState<'grid' | 'list'>(viewMode);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [priceRange, setPriceRange] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('featured');

  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      let matchesPrice = true;
      if (priceRange !== 'all' && product.price) {
        const price = parseFloat(product.price.replace('$', ''));
        switch (priceRange) {
          case 'under-50':
            matchesPrice = price < 50;
            break;
          case '50-100':
            matchesPrice = price >= 50 && price <= 100;
            break;
          case '100-200':
            matchesPrice = price > 100 && price <= 200;
            break;
          case 'over-200':
            matchesPrice = price > 200;
            break;
        }
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price?.replace('$', '') || '0');
          const priceB = parseFloat(b.price?.replace('$', '') || '0');
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price?.replace('$', '') || '0');
          const priceB = parseFloat(b.price?.replace('$', '') || '0');
          return priceB - priceA;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'reviews':
        filtered.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
        break;
    }

    if (maxItemsToShow > 0) {
      filtered = filtered.slice(0, maxItemsToShow);
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, priceRange, sortBy, maxItemsToShow]);

  // Get unique categories
  const categories = React.useMemo(() => {
    const cats = products.map(product => product.category).filter(Boolean);
    return ['all', ...Array.from(new Set(cats))];
  }, [products]);

  return (
    <section className="product-list-section" style={{ backgroundColor }}>
      <div className="product-list-container">
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
                  placeholder="Search products..."
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

              {showPriceFilter && (
                <div className="filter-container">
                  <SlidersHorizontal className="filter-icon" />
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Prices</option>
                    <option value="under-50">Under $50</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="100-200">$100 - $200</option>
                    <option value="over-200">Over $200</option>
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
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className={`products-grid ${currentViewMode}`}>
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <p>No products found matching your criteria.</p>
          </div>
        )}

        <div className="results-count">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      <style jsx>{`
        .product-list-section {
          padding: 60px 20px;
        }

        .product-list-container {
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

        .products-grid.grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
        }

        .products-grid.list {
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

          .products-grid.grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default ProductList;
