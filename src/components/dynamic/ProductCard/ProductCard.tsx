"use client";

import React from 'react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { ShoppingCart, Star, Heart } from 'lucide-react';

export interface ProductCardProps {
  title?: string;
  description?: string;
  price?: string;
  originalPrice?: string;
  imageUrl?: string;
  rating?: number;
  reviewsCount?: number;
  category?: string;
  slug?: string;
  tags?: string[];
  isOnSale?: boolean;
  inStock?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title = "Product Title",
  description = "Product description goes here...",
  price = "$99",
  originalPrice = "",
  imageUrl = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80",
  rating = 4.5,
  reviewsCount = 89,
  category = "Digital Product",
  slug = "",
  tags = [],
  isOnSale = false,
  inStock = true
}) => {
  const handleAddToCart = () => {
    if (slug) {
      window.location.href = `/product/${slug}`;
    }
  };

  const handleWishlist = () => {
    // Wishlist functionality
    console.log('Added to wishlist:', title);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={imageUrl} 
          alt={title}
          className="product-image-element"
        />
        <div className="product-overlay">
          {isOnSale && <Badge className="sale-badge">Sale</Badge>}
          {!inStock && <Badge className="stock-badge">Out of Stock</Badge>}
          <button 
            onClick={handleWishlist}
            className="wishlist-button"
          >
            <Heart className="heart-icon" />
          </button>
        </div>
      </div>
      
      <div className="product-content">
        <div className="product-header">
          <Badge variant="outline" className="category-badge">{category}</Badge>
        </div>
        
        <h3 className="product-title">{title}</h3>
        <p className="product-description">{description}</p>
        
        <div className="product-rating">
          <div className="rating-stars">
            <Star className="star-icon filled" />
            <span className="rating-value">{rating}</span>
          </div>
          <span className="reviews-count">({reviewsCount} reviews)</span>
        </div>
        
        <div className="product-pricing">
          <span className="current-price">{price}</span>
          {originalPrice && (
            <span className="original-price">{originalPrice}</span>
          )}
        </div>
        
        <div className="product-tags">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="tag-badge">{tag}</Badge>
          ))}
        </div>
        
        <Button 
          onClick={handleAddToCart}
          disabled={!inStock}
          className="add-to-cart-button"
        >
          <ShoppingCart className="cart-icon" />
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>

      <style jsx>{`
        .product-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
        }
        
        .product-image {
          position: relative;
          height: 240px;
          overflow: hidden;
        }
        
        .product-image-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .product-overlay {
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        
        .sale-badge {
          background: #ef4444;
          color: white;
        }
        
        .stock-badge {
          background: #6b7280;
          color: white;
        }
        
        .wishlist-button {
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .wishlist-button:hover {
          background: white;
          transform: scale(1.1);
        }
        
        .heart-icon {
          width: 18px;
          height: 18px;
          color: #6b7280;
        }
        
        .product-content {
          padding: 20px;
        }
        
        .product-header {
          margin-bottom: 8px;
        }
        
        .category-badge {
          font-size: 12px;
          color: #6b7280;
        }
        
        .product-title {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 8px 0;
        }
        
        .product-description {
          color: #6b7280;
          margin-bottom: 12px;
          line-height: 1.5;
          font-size: 14px;
        }
        
        .product-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        
        .rating-stars {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .star-icon {
          width: 16px;
          height: 16px;
          fill: #fbbf24;
          color: #fbbf24;
        }
        
        .rating-value {
          font-weight: 500;
          color: #1f2937;
        }
        
        .reviews-count {
          color: #6b7280;
          font-size: 14px;
        }
        
        .product-pricing {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .current-price {
          font-size: 24px;
          font-weight: 700;
          color: #08AD98;
        }
        
        .original-price {
          font-size: 16px;
          color: #6b7280;
          text-decoration: line-through;
        }
        
        .product-tags {
          display: flex;
          gap: 6px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        
        .tag-badge {
          font-size: 12px;
          background: #f3f4f6;
          color: #374151;
        }
        
        .add-to-cart-button {
          width: 100%;
          background: #08AD98;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .add-to-cart-button:hover:not(:disabled) {
          background: #069688;
        }
        
        .add-to-cart-button:disabled {
          background: #d1d5db;
          color: #6b7280;
          cursor: not-allowed;
        }
        
        .cart-icon {
          width: 18px;
          height: 18px;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
