"use client";

import React from 'react';
import CourseCard, { CourseCardProps } from '../CourseCard/CourseCard';
import { Button } from '../../ui/button';
import { Grid, List, Search, Filter } from 'lucide-react';

export interface CourseListProps {
  heading?: string;
  description?: string;
  courses?: CourseCardProps[];
  viewMode?: 'grid' | 'list';
  showFilters?: boolean;
  showSearch?: boolean;
  showViewToggle?: boolean;
  maxItemsToShow?: number;
  backgroundColor?: string;
}

const CourseList: React.FC<CourseListProps> = ({
  heading = "Featured Courses",
  description = "Discover our most popular courses and start learning today",
  courses = [
    {
      title: "Complete Web Development Bootcamp",
      description: "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course",
      instructor: "Sarah Johnson",
      duration: "12 weeks",
      price: "$299",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
      rating: 4.8,
      studentsCount: 2341,
      level: "Beginner",
      category: "Web Development",
      slug: "web-development-bootcamp",
      tags: ["HTML", "CSS", "JavaScript", "React"]
    },
    {
      title: "Digital Marketing Mastery",
      description: "Master SEO, social media marketing, email campaigns, and analytics",
      instructor: "Mike Chen",
      duration: "8 weeks",
      price: "$199",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
      rating: 4.7,
      studentsCount: 1876,
      level: "Intermediate",
      category: "Marketing",
      slug: "digital-marketing-mastery",
      tags: ["SEO", "Social Media", "Analytics"]
    },
    {
      title: "Data Science Fundamentals",
      description: "Learn Python, statistics, machine learning, and data visualization",
      instructor: "Dr. Emily Rodriguez",
      duration: "16 weeks",
      price: "$399",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      rating: 4.9,
      studentsCount: 987,
      level: "Advanced",
      category: "Data Science",
      slug: "data-science-fundamentals",
      tags: ["Python", "Machine Learning", "Statistics"]
    }
  ],
  viewMode = 'grid',
  showFilters = true,
  showSearch = true,
  showViewToggle = true,
  maxItemsToShow = 0,
  backgroundColor = "#ffffff"
}) => {
  const [currentViewMode, setCurrentViewMode] = React.useState<'grid' | 'list'>(viewMode);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  // Filter courses based on search and category
  const filteredCourses = React.useMemo(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (maxItemsToShow > 0) {
      filtered = filtered.slice(0, maxItemsToShow);
    }

    return filtered;
  }, [courses, searchTerm, selectedCategory, maxItemsToShow]);

  // Get unique categories
  const categories = React.useMemo(() => {
    const cats = courses.map(course => course.category).filter(Boolean);
    return ['all', ...Array.from(new Set(cats))];
  }, [courses]);

  return (
    <section className="course-list-section" style={{ backgroundColor }}>
      <div className="course-list-container">
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
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            )}

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
          </div>
        )}

        <div className={`courses-grid ${currentViewMode}`}>
          {filteredCourses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="no-results">
            <p>No courses found matching your criteria.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .course-list-section {
          padding: 60px 20px;
        }

        .course-list-container {
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
          display: flex;
          gap: 20px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .search-container {
          position: relative;
          flex: 1;
          min-width: 300px;
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
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .search-input {
          width: 100%;
          padding: 12px 12px 12px 44px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 16px;
          background: white;
          min-height: 0px;
        }

        .search-input:focus {
          outline: none;
          border-color: #08AD98;
          box-shadow: 0 0 0 3px rgba(8, 173, 152, 0.1);
        }

        .filter-container {
          position: relative;
          min-width: 200px;
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

        .courses-grid.grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }

        .courses-grid.list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
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

          .controls-bar {
            flex-direction: column;
          }

          .search-container,
          .filter-container {
            min-width: auto;
          }

          .courses-grid.grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default CourseList;
