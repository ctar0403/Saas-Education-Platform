"use client";

import React from 'react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Clock, Users, Star } from 'lucide-react';

export interface CourseCardProps {
  title?: string;
  description?: string;
  instructor?: string;
  duration?: string;
  price?: string;
  imageUrl?: string;
  rating?: number;
  studentsCount?: number;
  level?: string;
  category?: string;
  slug?: string;
  tags?: string[];
}

const CourseCard: React.FC<CourseCardProps> = ({
  title = "Course Title",
  description = "Course description goes here...",
  instructor = "Instructor Name",
  duration = "8 weeks",
  price = "$299",
  imageUrl = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
  rating = 4.5,
  studentsCount = 1234,
  level = "Beginner",
  category = "Business",
  slug = "",
  tags = []
}) => {
  const handleEnrollClick = () => {
    if (slug) {
      window.location.href = `/course/${slug}`;
    }
  };

  return (
    <div className="course-card">
      <div className="course-image">
        <img 
          src={imageUrl} 
          alt={title}
          className="course-image-element"
        />
        <div className="course-overlay">
          <Badge className="category-badge">{category}</Badge>
        </div>
      </div>
      
      <div className="course-content">
        <div className="course-header">
          <h3 className="course-title">{title}</h3>
          <span className="course-price">{price}</span>
        </div>
        
        <p className="course-description">{description}</p>
        
        <div className="course-meta">
          <div className="meta-item">
            <Clock className="meta-icon" />
            <span>{duration}</span>
          </div>
          <div className="meta-item">
            <Users className="meta-icon" />
            <span>{studentsCount.toLocaleString()} students</span>
          </div>
          <div className="meta-item">
            <Star className="meta-icon" />
            <span>{rating}</span>
          </div>
        </div>
        
        <div className="course-instructor">
          <span className="instructor-label">Instructor: </span>
          <span className="instructor-name">{instructor}</span>
        </div>
        
        <div className="course-tags">
          <Badge variant="secondary" className="level-badge">{level}</Badge>
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="tag-badge">{tag}</Badge>
          ))}
        </div>
        
        <Button 
          onClick={handleEnrollClick}
          className="enroll-button"
        >
          Enroll Now
        </Button>
      </div>

      <style jsx>{`
        .course-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .course-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
        }
        
        .course-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        
        .course-image-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .course-overlay {
          position: absolute;
          top: 12px;
          left: 12px;
        }
        
        .category-badge {
          background: rgba(8, 173, 152, 0.9);
          color: white;
        }
        
        .course-content {
          padding: 20px;
        }
        
        .course-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }
        
        .course-title {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
          flex: 1;
          margin-right: 12px;
        }
        
        .course-price {
          font-size: 20px;
          font-weight: 700;
          color: #08AD98;
        }
        
        .course-description {
          color: #6b7280;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        
        .course-meta {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
          flex-wrap: wrap;
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
        
        .course-instructor {
          margin-bottom: 16px;
          font-size: 14px;
        }
        
        .instructor-label {
          color: #6b7280;
        }
        
        .instructor-name {
          color: #1f2937;
          font-weight: 500;
        }
        
        .course-tags {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        
        .level-badge {
          background: #f3f4f6;
          color: #374151;
        }
        
        .tag-badge {
          font-size: 12px;
        }
        
        .enroll-button {
          width: 100%;
          background: #08AD98;
          color: white;
        }
        
        .enroll-button:hover {
          background: #069688;
        }
      `}</style>
    </div>
  );
};

export default CourseCard;
