"use client";

import React from 'react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

export interface BlogCardProps {
  title?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  authorImage?: string;
  publishDate?: string;
  readTime?: string;
  imageUrl?: string;
  category?: string;
  slug?: string;
  tags?: string[];
  isFeatured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title = "Blog Post Title",
  excerpt = "This is a brief excerpt of the blog post that gives readers a preview of what they can expect to learn...",
  content = "",
  author = "Author Name",
  authorImage = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&q=80",
  publishDate = "Dec 15, 2024",
  readTime = "5 min read",
  imageUrl = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&q=80",
  category = "Education",
  slug = "",
  tags = [],
  isFeatured = false
}) => {
  const handleReadMore = () => {
    if (slug) {
      window.location.href = `/blog/${slug}`;
    }
  };

  return (
    <article className="blog-card">
      <div className="blog-image">
        <img 
          src={imageUrl} 
          alt={title}
          className="blog-image-element"
        />
        <div className="blog-overlay">
          <Badge className="category-badge">{category}</Badge>
          {isFeatured && (
            <Badge className="featured-badge">Featured</Badge>
          )}
        </div>
      </div>
      
      <div className="blog-content">
        <div className="blog-meta">
          <div className="meta-item">
            <Calendar className="meta-icon" />
            <span>{publishDate}</span>
          </div>
          <div className="meta-item">
            <Clock className="meta-icon" />
            <span>{readTime}</span>
          </div>
        </div>
        
        <h3 className="blog-title">{title}</h3>
        <p className="blog-excerpt">{excerpt}</p>
        
        <div className="blog-tags">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="tag-badge">{tag}</Badge>
          ))}
        </div>
        
        <div className="blog-footer">
          <div className="author-info">
            <img 
              src={authorImage} 
              alt={author}
              className="author-avatar"
            />
            <div className="author-details">
              <span className="author-name">{author}</span>
              <span className="author-role">Author</span>
            </div>
          </div>
          
          <Button 
            onClick={handleReadMore}
            variant="ghost"
            className="read-more-button"
          >
            Read More
            <ArrowRight className="arrow-icon" />
          </Button>
        </div>
      </div>

      <style jsx>{`
        .blog-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
        }
        
        .blog-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        
        .blog-image-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .blog-overlay {
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        
        .category-badge {
          background: rgba(8, 173, 152, 0.9);
          color: white;
        }
        
        .featured-badge {
          background: rgba(239, 68, 68, 0.9);
          color: white;
        }
        
        .blog-content {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .blog-meta {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
        }
        
        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #6b7280;
          font-size: 14px;
        }
        
        .meta-icon {
          width: 16px;
          height: 16px;
        }
        
        .blog-title {
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 12px 0;
          line-height: 1.3;
        }
        
        .blog-excerpt {
          color: #6b7280;
          margin-bottom: 16px;
          line-height: 1.6;
          flex: 1;
        }
        
        .blog-tags {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        
        .tag-badge {
          font-size: 12px;
          color: #6b7280;
        }
        
        .blog-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid #f3f4f6;
        }
        
        .author-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .author-details {
          display: flex;
          flex-direction: column;
        }
        
        .author-name {
          font-weight: 500;
          color: #1f2937;
          font-size: 14px;
        }
        
        .author-role {
          color: #6b7280;
          font-size: 12px;
        }
        
        .read-more-button {
          color: #08AD98;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 500;
        }
        
        .read-more-button:hover {
          background: rgba(8, 173, 152, 0.1);
        }
        
        .arrow-icon {
          width: 16px;
          height: 16px;
          transition: transform 0.2s;
        }
        
        .read-more-button:hover .arrow-icon {
          transform: translateX(4px);
        }
      `}</style>
    </article>
  );
};

export default BlogCard;
