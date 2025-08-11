"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Wand2, Layout, Code, Palette, Zap, ArrowRight, Building } from "lucide-react";
import BuilderIOApiService from "@/lib/services/builder-io-api";

export default function Home() {
  const router = useRouter();
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'info' | 'warning', message: string} | null>(null);

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);

    try {
      console.log('🚀 Starting Builder.io website generation...');
      
      setNotification({
        type: 'info',
        message: 'Creating website with Builder.io...'
      });

      // Generate website content based on prompt
      const websiteContent = {
        title: 'AI Generated Website',
        description: 'Website generated with AI and Builder.io',
        heroHeading: aiPrompt.includes('portfolio') ? 'Welcome to My Portfolio' :
                     aiPrompt.includes('cooking') || aiPrompt.includes('recipe') ? 'Delicious Recipes Await' :
                     aiPrompt.includes('teaching') || aiPrompt.includes('course') ? 'Learn with Expert Guidance' :
                     aiPrompt.includes('business') ? 'Growing Your Business' :
                     'Welcome to Your New Website',
        heroSubheading: 'Built with AI technology and ready for customization',
        sections: []
      };
      
      const websiteAnalysis = {
        websiteType: aiPrompt.includes('portfolio') ? 'portfolio' :
                     aiPrompt.includes('cooking') || aiPrompt.includes('recipe') ? 'cooking' :
                     aiPrompt.includes('teaching') || aiPrompt.includes('course') ? 'teaching' :
                     aiPrompt.includes('business') ? 'business' : 'general',
        industry: 'general',
        targetAudience: 'general',
        features: ['Modern Design', 'Responsive Layout', 'User Friendly'],
        colorScheme: aiPrompt.includes('dark') ? 'dark' :
                     aiPrompt.includes('blue') ? 'blue' :
                     aiPrompt.includes('green') ? 'green' :
                     aiPrompt.includes('purple') ? 'purple' : 'blue',
        tone: 'professional',
        pages: ['home']
      };

      const pageId = `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Create Builder.io page using API
      console.log('🏗️ Creating Builder.io page...');
      const builderService = new BuilderIOApiService('bpk-1646c514b03e4c47a46d70aedae3e345');

      // Generate Builder.io content structure
      const builderContent = builderService.createBuilderContentFromGenerated(websiteContent, websiteAnalysis);

      // Create page in Builder.io
      const pageResult = await builderService.createPage(
        '', // spaceId not needed for new API
        {
          name: `AI Generated - ${websiteAnalysis.websiteType.charAt(0).toUpperCase() + websiteAnalysis.websiteType.slice(1)}`,
          url: `/generated/${pageId}`,
          data: builderContent,
          published: 'draft',
          modelId: 'page',
          meta: {
            title: websiteContent.title,
            description: websiteContent.description
          }
        }
      );

      if (pageResult.success && pageResult.page) {
        console.log('✅ Builder.io page created successfully');

        setNotification({
          type: 'success',
          message: 'Website created! Opening visual editor...'
        });

        // Redirect to visual editor with the generated page
        const editorUrl = `/visual-editor?builderPageId=${pageResult.page.id}&source=ai-generated&pageType=${websiteAnalysis.websiteType}`;
        router.push(editorUrl);
        setShowSuccess(true);
      } else {
        throw new Error(pageResult.error || 'Failed to create page in Builder.io');
      }

      // Clear notifications
      setTimeout(() => {
        setShowSuccess(false);
        setNotification(null);
      }, 4000);

    } catch (error) {
      console.error('❌ Website Generation Error:', error);
      
      setNotification({
        type: 'warning',
        message: 'Failed to create website. Please try again.'
      });
    }

    setIsGenerating(false);
  };

  const handleVisualEditor = () => {
    router.push('/visual-editor');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Notification Banner */}
      {notification && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg max-w-md ${
          notification.type === 'success' ? 'bg-green-500 text-white' :
          notification.type === 'info' ? 'bg-blue-500 text-white' :
          'bg-yellow-500 text-black'
        }`}>
          <div className="flex items-center gap-2">
            <span>
              {notification.type === 'success' ? '✅' :
               notification.type === 'info' ? 'ℹ️' : '⚠️'}
            </span>
            <span className="text-sm font-medium">{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="ml-2 text-current opacity-70 hover:opacity-100"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      {/* Hero Section with AI Prompt */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">AI-Powered Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              AI Website Builder
            </h1>

            <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into beautiful websites instantly with AI and Builder.io. Create professional websites with drag-and-drop editing.
            </p>

            {/* AI Prompt Input Section */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl">
                    <Wand2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold">AI Website Generator</h3>
                    <p className="text-purple-100 text-sm">Describe your website and watch AI build it</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Textarea
                    placeholder="Describe your website... e.g., 'Create a modern portfolio website for a graphic designer with a dark theme, portfolio gallery, contact form, and blog section'"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    rows={4}
                    className="w-full bg-white/20 border-white/30 text-white placeholder:text-purple-200 rounded-xl text-lg resize-none"
                  />

                  {/* Sample Prompts */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setAiPrompt("Create a modern cooking website with recipes, blog, and cooking courses")}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-sm text-white transition-colors"
                    >
                      🍳 Cooking Site
                    </button>
                    <button
                      onClick={() => setAiPrompt("Build a professional teaching platform with courses, testimonials, and free assessment")}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-sm text-white transition-colors"
                    >
                      🎓 Teaching Platform
                    </button>
                    <button
                      onClick={() => setAiPrompt("Design a portfolio website for a photographer with dark theme and image gallery")}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-sm text-white transition-colors"
                    >
                      📷 Portfolio
                    </button>
                  </div>

                  <Button
                    onClick={handleAiGenerate}
                    disabled={!aiPrompt.trim() || isGenerating}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold py-4 rounded-xl text-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        <span>Creating website with Builder.io...</span>
                      </div>
                    ) : showSuccess ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        {notification?.message || 'Website Created! Opening Editor...'}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Generate Website with AI
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Editor Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Or Build Visually
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jump straight into our powerful visual editor. Drag, drop, and customize components to create your perfect website.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl">
                  <div className="p-3 bg-blue-500 rounded-xl">
                    <Layout className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Drag & Drop</h4>
                    <p className="text-sm text-gray-600">Visual builder</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl">
                  <div className="p-3 bg-purple-500 rounded-xl">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Custom Code</h4>
                    <p className="text-sm text-gray-600">Full control</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl">
                  <div className="p-3 bg-green-500 rounded-xl">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Theming</h4>
                    <p className="text-sm text-gray-600">Brand colors</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-orange-50 to-red-100 rounded-2xl">
                  <div className="p-3 bg-orange-500 rounded-xl">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Real-time</h4>
                    <p className="text-sm text-gray-600">Live preview</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleVisualEditor}
                  size="lg"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl text-lg transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <Building className="w-6 h-6" />
                    Go to Visual Editor Panel
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-4 rounded-xl text-lg transition-all duration-300 group"
                >
                  <Link href="/ai-website-generator">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-6 h-6" />
                      AI Website Generator
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Layout className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-700">Visual Editor Preview</h4>
                    <p className="text-gray-500 text-sm">Drag & drop interface</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Start with Templates
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our professionally designed templates and customize them to match your vision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Cooking Template */}
            <Link href="/templates/cooking" className="group">
              <Card className="w-full shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl cursor-pointer overflow-hidden bg-white group-hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/mobile_hero_section.png"
                    alt="Cooking Template"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      🍳 Food & Cooking
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Cooking Template
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Master the art of cooking with our beginner-friendly template. Create delightful dishes step by step with professional layouts.
                  </p>
                  <div className="mt-4 flex items-center text-indigo-600 font-medium group-hover:text-purple-600 transition-colors">
                    View Template
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Teaching Template */}
            <Link href="/templates/teaching" className="group">
              <Card className="w-full shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl cursor-pointer overflow-hidden bg-white group-hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/about_hero_section.png"
                    alt="Teaching Template"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      🎓 Education
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Teaching Template
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Empower learners and share knowledge effectively with our professional teaching template designed for educators.
                  </p>
                  <div className="mt-4 flex items-center text-indigo-600 font-medium group-hover:text-purple-600 transition-colors">
                    View Template
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Dynamic Demo Template */}
            <Link href="/dynamic-demo" className="group flex flex-col justify-start items-start gap-0.5">
              <Card className="w-full shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl cursor-pointer overflow-hidden bg-white group-hover:scale-105">
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Layout className="w-16 h-16 mx-auto mb-4 opacity-80" />
                      <h4 className="text-xl font-bold">Dynamic Components</h4>
                      <p className="text-sm opacity-80">Live Demo</p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-2 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ⚡ Interactive
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Dynamic Components
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Explore our dynamic content system with courses, products, and blog components that connect to live data.
                  </p>
                  <div className="mt-4 flex items-center text-indigo-600 font-medium group-hover:text-purple-600 transition-colors">
                    Try Demo
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Join thousands of creators who are building beautiful websites with AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleVisualEditor}
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300"
            >
              Start Building Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-[#5b37f7] hover:bg-white hover:text-indigo-600 font-semibold py-4 px-8 rounded-[55px] text-lg transition-all duration-300 overflow-hidden"
            >
              View Templates
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
