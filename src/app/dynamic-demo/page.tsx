"use client";

import React from 'react';
import CourseList from '../../components/dynamic/CourseList/CourseList';
import ProductList from '../../components/dynamic/ProductList/ProductList';
import BlogList from '../../components/dynamic/BlogList/BlogList';
import CourseCard from '../../components/dynamic/CourseCard/CourseCard';
import ProductCard from '../../components/dynamic/ProductCard/ProductCard';
import BlogCard from '../../components/dynamic/BlogCard/BlogCard';
import WebsiteGenerator from '../../components/WebsiteGenerator/WebsiteGenerator';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowLeft, ExternalLink, Github, BookOpen } from 'lucide-react';
import Link from 'next/link';

const DynamicContentDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Kadnya Home
            </Link>
            <div className="flex items-center gap-3">
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                Live Demo
              </Badge>
              <Button variant="secondary" size="sm" asChild>
                <Link href="/visual-editor">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Visual Editor
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Dynamic Content Components
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
              Interactive demonstration of the dynamic content system built for Kadnya's Builder.io integration
            </p>
          </div>
        </div>
      </header>

      {/* Individual Cards Demo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Individual Components
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These are individual dynamic components that can be used in Builder.io. 
              Each component is fully customizable and data-driven.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <CourseCard
                title="Advanced React Development"
                description="Master React with hooks, context, and advanced patterns"
                instructor="Sarah Johnson"
                duration="10 weeks"
                price="$299"
                rating={4.8}
                studentsCount={1567}
                level="Advanced"
                category="Programming"
                tags={["React", "JavaScript", "Frontend"]}
                slug="advanced-react-development"
              />
            </div>
            
            <div className="space-y-4">
              <ProductCard
                title="Digital Marketing Toolkit"
                description="Complete set of templates and guides for digital marketing"
                price="$79"
                originalPrice="$129"
                rating={4.6}
                reviewsCount={234}
                category="Templates"
                tags={["Marketing", "Templates"]}
                isOnSale={true}
                inStock={true}
                slug="digital-marketing-toolkit"
              />
            </div>
            
            <div className="space-y-4 md:col-span-2 lg:col-span-1">
              <BlogCard
                title="The Future of E-Learning"
                excerpt="Exploring how technology is reshaping education and online learning experiences."
                author="Mike Chen"
                authorImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&q=80"
                publishDate="Dec 15, 2024"
                readTime="8 min read"
                category="Education"
                tags={["EdTech", "Future", "Learning"]}
                isFeatured={true}
                slug="future-of-elearning"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course List Demo */}
      <section className="py-20">
        <CourseList
          heading="Course Collection Demo"
          description="Browse our most popular courses with filtering and search capabilities"
          backgroundColor="#f8fafc"
        />
      </section>

      {/* Product List Demo */}
      <section className="py-20">
        <ProductList
          heading="Product Catalog Demo"
          description="Discover our collection of digital resources and tools"
          backgroundColor="#ffffff"
        />
      </section>

      {/* Blog List Demo */}
      <section className="py-20">
        <BlogList
          heading="Article Library Demo"
          description="Stay updated with our latest insights and industry knowledge"
          backgroundColor="#f8fafc"
        />
      </section>

      {/* Builder.io Integration Guide */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🎯 How to Use with Builder.io
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these steps to integrate these components into your Builder.io workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="relative overflow-hidden border-2 border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-lg">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-indigo-600">1</span>
                </div>
                <CardTitle className="text-lg">Create Data Models</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">
                  In Builder.io dashboard, create data models for Course, Product, and Blog with the fields defined in our TypeScript interfaces.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-lg">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <CardTitle className="text-lg">Add Content Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Create entries in your data models with actual course, product, and blog data.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-lg">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-red-500"></div>
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-pink-600">3</span>
                </div>
                <CardTitle className="text-lg">Use in Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Drag and drop our dynamic components into Builder.io pages and connect them to your data models.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-lg">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                <CardTitle className="text-lg">Enable Dynamic Routing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Set up URL targeting by data model in Builder.io to create dynamic pages like /course/:slug
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ✨ Dynamic Content Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with modern web standards and best practices for maximum performance and flexibility
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Search & Filter</h3>
              <p className="text-gray-600 leading-relaxed">
                Built-in search functionality and category/price filtering for better content discovery.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">���</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Responsive Design</h3>
              <p className="text-gray-600 leading-relaxed">
                All components are fully responsive and work perfectly on mobile, tablet, and desktop.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customizable Styling</h3>
              <p className="text-gray-600 leading-relaxed">
                Easy to customize colors, layouts, and styling to match your brand.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Dynamic Routing</h3>
              <p className="text-gray-600 leading-relaxed">
                Automatic generation of individual pages for courses, products, and blog posts.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Binding</h3>
              <p className="text-gray-600 leading-relaxed">
                Seamless integration with Builder.io data models and external APIs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance Optimized</h3>
              <p className="text-gray-600 leading-relaxed">
                Built with Next.js best practices for fast loading and SEO optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Builder.io Website Generator */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🚀 Generate Your Website with Builder.io
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Use our registered components to instantly create a new website in your Builder.io space.
              Select the components you want and click generate!
            </p>
          </div>

          <WebsiteGenerator />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build with These Components?
          </h2>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Start using these dynamic components in your Kadnya projects today. Build beautiful, data-driven websites in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold" asChild>
              <Link href="/visual-editor">
                <ExternalLink className="w-5 h-5 mr-2" />
                Try Visual Editor
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600 font-semibold" asChild>
              <Link href="/">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600 font-semibold" asChild>
              <a href="/DYNAMIC_CONTENT_GUIDE.md" target="_blank">
                <BookOpen className="w-5 h-5 mr-2" />
                View Documentation
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DynamicContentDemo;
