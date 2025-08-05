"use client";

import { useEffect, useState, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Eye,
  Edit,
  Share,
  Download,
  Palette,
  Layout,
  Zap
} from 'lucide-react';
import Link from 'next/link';

interface GeneratedContent {
  title: string;
  description: string;
  heroHeading: string;
  heroSubheading: string;
  sections: {
    type: string;
    content: any;
  }[];
}

interface AIPromptAnalysis {
  websiteType: 'teaching' | 'cooking' | 'business' | 'portfolio' | 'ecommerce' | 'blog';
  industry: string;
  targetAudience: string;
  features: string[];
  colorScheme: 'blue' | 'green' | 'purple' | 'orange' | 'dark' | 'minimal';
  tone: 'professional' | 'friendly' | 'modern' | 'elegant' | 'playful';
  pages: string[];
}

function PreviewContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [analysis, setAnalysis] = useState<AIPromptAnalysis | null>(null);
  const [prompt, setPrompt] = useState<string>('');

  useEffect(() => {
    // Get data from URL parameters
    const contentParam = searchParams.get('content');
    const analysisParam = searchParams.get('analysis');
    const promptParam = searchParams.get('prompt');

    if (contentParam) {
      try {
        setContent(JSON.parse(decodeURIComponent(contentParam)));
      } catch (error) {
        console.error('Error parsing content:', error);
      }
    }

    if (analysisParam) {
      try {
        setAnalysis(JSON.parse(decodeURIComponent(analysisParam)));
      } catch (error) {
        console.error('Error parsing analysis:', error);
      }
    }

    if (promptParam) {
      setPrompt(decodeURIComponent(promptParam));
    }
  }, [searchParams]);

  const getColorScheme = (colorScheme: string) => {
    const schemes = {
      blue: { primary: '#08AD98', secondary: '#043A51', bg: '#f0f9ff' },
      green: { primary: '#10B981', secondary: '#064E3B', bg: '#f0fdf4' },
      purple: { primary: '#8B5CF6', secondary: '#4C1D95', bg: '#faf5ff' },
      orange: { primary: '#F59E0B', secondary: '#92400E', bg: '#fffbeb' },
      dark: { primary: '#1F2937', secondary: '#111827', bg: '#f9fafb' },
      minimal: { primary: '#6B7280', secondary: '#374151', bg: '#f9fafb' }
    };
    return schemes[colorScheme as keyof typeof schemes] || schemes.blue;
  };

  const colors = analysis ? getColorScheme(analysis.colorScheme) : getColorScheme('blue');

  const openEditor = () => {
    const editorParams = new URLSearchParams({
      prompt: prompt,
      content: JSON.stringify(content),
      analysis: JSON.stringify(analysis),
      pageId: params.pageId as string,
      source: searchParams.get('source') || 'kadnya-api',
      apiResponse: searchParams.get('apiResponse') || '',
      internal: 'true'
    });
    window.open(`/visual-editor?${editorParams.toString()}`, '_blank');
  };

  const shareWebsite = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    // Show toast notification (you could implement this)
    alert('Preview URL copied to clipboard!');
  };

  if (!content || !analysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading generated website...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Preview Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Generator
              </Link>
              <div className="h-5 w-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold text-gray-900">Website Preview</span>
                <Badge className="bg-green-100 text-green-800">
                  Generated
                </Badge>
                {searchParams.get('source') === 'kadnya-api' && (
                  <Badge className="bg-blue-100 text-blue-800">
                    Kadnya AI
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={shareWebsite} variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button onClick={openEditor} size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                <Edit className="w-4 h-4 mr-2" />
                Edit in Builder.io
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Website Content */}
      <div className="bg-white">
        {/* Hero Section */}
        <section 
          className="relative py-20 px-4"
          style={{ 
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            color: 'white'
          }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {content.heroHeading}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              {content.heroSubheading}
            </p>
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl"
            >
              Get Started
            </Button>
          </div>
        </section>

        {/* Website Type Specific Sections */}
        {analysis.websiteType === 'teaching' && (
          <>
            {/* Programs Section */}
            <section className="py-16 bg-gray-50">
              <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Our Programs
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Comprehensive learning programs designed to help you achieve your goals
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: colors.primary }}
                          >
                            <Layout className="w-5 h-5 text-white" />
                          </div>
                          Course {i}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Professional course designed to enhance your skills and advance your career.
                        </p>
                        <Button variant="outline" className="w-full">
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-white">
              <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Student Success Stories
                  </h2>
                  <p className="text-xl text-gray-600">
                    See how our students have transformed their careers
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    { name: "Sarah Johnson", role: "Software Developer", quote: "This platform completely transformed my career. The courses are comprehensive and the instructors are amazing!" },
                    { name: "Michael Chen", role: "Data Scientist", quote: "I went from beginner to professional in just 6 months. The structured learning path made all the difference." }
                  ].map((testimonial, i) => (
                    <Card key={i} className="p-6">
                      <CardContent className="p-0">
                        <div className="flex items-start gap-4">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: colors.primary }}
                          >
                            {testimonial.name[0]}
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-600 mb-3 italic">
                              "{testimonial.quote}"
                            </p>
                            <div>
                              <p className="font-semibold text-gray-900">{testimonial.name}</p>
                              <p className="text-sm text-gray-500">{testimonial.role}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {analysis.websiteType === 'cooking' && (
          <>
            {/* Cooking Programs Section */}
            <section className="py-16 bg-gray-50">
              <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Cooking Programs
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    From beginner basics to professional techniques, master the art of cooking
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { title: "Beginner Basics", desc: "Learn fundamental cooking techniques and essential recipes" },
                    { title: "International Cuisine", desc: "Explore flavors from around the world" },
                    { title: "Professional Skills", desc: "Advanced techniques used by professional chefs" }
                  ].map((program, i) => (
                    <Card key={i} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: colors.primary }}
                          >
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          {program.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          {program.desc}
                        </p>
                        <Button variant="outline" className="w-full">
                          Start Cooking
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Recipe Showcase */}
            <section className="py-16 bg-white">
              <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Featured Recipes
                  </h2>
                  <p className="text-xl text-gray-600">
                    Discover delicious recipes to try at home
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div 
                        className="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center"
                      >
                        <Palette className="w-12 h-12 text-white opacity-50" />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Recipe {i}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Delicious and easy to follow recipe with step-by-step instructions.
                        </p>
                        <Button variant="outline" className="w-full">
                          View Recipe
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* CTA Section */}
        <section 
          className="py-16 text-white"
          style={{ backgroundColor: colors.primary }}
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of satisfied customers who have achieved their goals with us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3"
              >
                Get Started Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Website Info Panel */}
      <div className="fixed bottom-6 right-6 max-w-sm">
        <Card className="shadow-lg border-indigo-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Generated Website
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <Badge variant="secondary" className="capitalize">
                  {analysis.websiteType}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Theme:</span>
                <Badge variant="outline" className="capitalize">
                  {analysis.colorScheme}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tone:</span>
                <Badge variant="outline" className="capitalize">
                  {analysis.tone}
                </Badge>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500">Source:</span>
                <Badge variant="outline" className="text-xs">
                  {searchParams.get('source') === 'kadnya-api' ? 'Kadnya AI' : 'Demo'}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mb-2">Original prompt:</p>
              <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                {prompt.substring(0, 80)}...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading generated website preview...</p>
        </div>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}
