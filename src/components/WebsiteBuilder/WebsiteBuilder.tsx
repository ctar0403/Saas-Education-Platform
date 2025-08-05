"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Sparkles, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Eye,
  Edit3,
  Copy,
  Download
} from 'lucide-react';
import { OpenAIContentService, GeneratedContent } from '@/lib/services/openai-service';
import { BuilderAPIService, BuilderPageResponse } from '@/lib/services/builder-api-service';
import { BuilderPageRenderer } from './BuilderPageRenderer';
import { BuilderVisualEditor } from './BuilderVisualEditor';

interface WebsiteBuilderProps {
  openaiApiKey: string;
  builderApiKey: string;
  builderSpaceId: string;
}

type BuilderStep = 'prompt' | 'generating' | 'preview' | 'editing';

export const WebsiteBuilder: React.FC<WebsiteBuilderProps> = ({
  openaiApiKey,
  builderApiKey,
  builderSpaceId
}) => {
  const [step, setStep] = useState<BuilderStep>('prompt');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [builderPage, setBuilderPage] = useState<BuilderPageResponse | null>(null);
  const [pageUrl, setPageUrl] = useState<string>('');

  // Sample prompts for inspiration
  const samplePrompts = [
    "Create a modern cooking class website with hero section, about the chef, class schedules, and contact form",
    "Build a photography portfolio with dark theme, image gallery, about section, and contact details",
    "Design a teaching platform website with courses, testimonials, pricing, and student portal",
    "Create a business consulting website with services, team, case studies, and consultation booking",
    "Build an e-commerce site for handmade jewelry with product showcase, about story, and shopping cart"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a website description');
      return;
    }

    setIsGenerating(true);
    setError('');
    setStep('generating');

    try {
      // Step 1: Generate content with OpenAI
      console.log('🤖 Generating content with OpenAI...');
      const openaiService = new OpenAIContentService(openaiApiKey);
      const content = await openaiService.generateWebsiteContent(prompt);
      setGeneratedContent(content);
      
      // Step 2: Create page in Builder.io
      console.log('🏗️ Creating page in Builder.io...');
      const builderService = new BuilderAPIService(builderApiKey, builderSpaceId);
      const urlPath = builderService.generateUrlPath(content.title);
      const page = await builderService.createPage(content, urlPath);
      setBuilderPage(page);
      setPageUrl(urlPath);
      
      console.log('✅ Website generated successfully!');
      setStep('preview');
      
    } catch (err) {
      console.error('❌ Generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate website');
      setStep('prompt');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEdit = () => {
    setStep('editing');
  };

  const handleBackToPreview = () => {
    setStep('preview');
  };

  const handlePublish = async () => {
    if (!builderPage) return;

    try {
      const builderService = new BuilderAPIService(builderApiKey, builderSpaceId);
      await builderService.publishPage(builderPage.id);
      alert('Website published successfully!');
    } catch (err) {
      console.error('Publish error:', err);
      setError('Failed to publish website');
    }
  };

  const copyPageUrl = () => {
    if (pageUrl) {
      navigator.clipboard.writeText(`${window.location.origin}${pageUrl}`);
      alert('URL copied to clipboard!');
    }
  };

  const openBuilderStudio = () => {
    if (builderPage) {
      window.open(`https://builder.io/content/${builderSpaceId}/${builderPage.id}`, '_blank');
    }
  };

  const handleReset = () => {
    setStep('prompt');
    setPrompt('');
    setGeneratedContent(null);
    setBuilderPage(null);
    setPageUrl('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-indigo-100 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">AI Website Builder</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Build Websites with AI + Builder.io
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Describe your website and watch AI generate it instantly using Builder.io components
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              step === 'prompt' ? 'bg-indigo-600 text-white' : 
              ['generating', 'preview', 'editing'].includes(step) ? 'bg-green-100 text-green-700' : 
              'bg-gray-100 text-gray-500'
            }`}>
              <span className="w-6 h-6 rounded-full bg-current opacity-20 flex items-center justify-center text-xs font-bold">1</span>
              <span className="text-sm font-medium">Describe</span>
            </div>
            
            <div className={`w-8 h-0.5 ${
              ['generating', 'preview', 'editing'].includes(step) ? 'bg-green-300' : 'bg-gray-200'
            }`}></div>
            
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              step === 'generating' ? 'bg-indigo-600 text-white' : 
              ['preview', 'editing'].includes(step) ? 'bg-green-100 text-green-700' : 
              'bg-gray-100 text-gray-500'
            }`}>
              <span className="w-6 h-6 rounded-full bg-current opacity-20 flex items-center justify-center text-xs font-bold">2</span>
              <span className="text-sm font-medium">Generate</span>
            </div>
            
            <div className={`w-8 h-0.5 ${
              ['preview', 'editing'].includes(step) ? 'bg-green-300' : 'bg-gray-200'
            }`}></div>
            
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              step === 'preview' ? 'bg-indigo-600 text-white' : 
              step === 'editing' ? 'bg-green-100 text-green-700' : 
              'bg-gray-100 text-gray-500'
            }`}>
              <span className="w-6 h-6 rounded-full bg-current opacity-20 flex items-center justify-center text-xs font-bold">3</span>
              <span className="text-sm font-medium">Preview</span>
            </div>
            
            <div className={`w-8 h-0.5 ${
              step === 'editing' ? 'bg-green-300' : 'bg-gray-200'
            }`}></div>
            
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              step === 'editing' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              <span className="w-6 h-6 rounded-full bg-current opacity-20 flex items-center justify-center text-xs font-bold">4</span>
              <span className="text-sm font-medium">Edit</span>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {/* Step 1: Prompt Input */}
        {step === 'prompt' && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                Describe Your Website
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website Description
                </label>
                <Textarea
                  placeholder="Example: Create a modern cooking class website with hero section, about the chef, class schedules, testimonials, and contact form. Use a warm color scheme with professional photos."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="w-full"
                />
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Try these examples:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {samplePrompts.map((sample, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(sample)}
                      className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                    >
                      <p className="text-sm text-gray-700">{sample}</p>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                size="lg"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Website...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Generate Website
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Generating */}
        {step === 'generating' && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Creating Your Website
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3 justify-center">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                    <span>Analyzing your requirements with AI...</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                    <span>Generating content and layout...</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                    <span>Creating Builder.io page...</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Preview */}
        {step === 'preview' && generatedContent && builderPage && (
          <div className="space-y-6">
            {/* Page Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Website Generated Successfully!
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-4">
                      <Badge variant="secondary">
                        Type: {generatedContent.websiteType}
                      </Badge>
                      <Badge variant="secondary">
                        Components: {generatedContent.components.length}
                      </Badge>
                      <Badge variant="secondary">
                        Status: Draft
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyPageUrl}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy URL
                    </Button>
                    <Button variant="outline" size="sm" onClick={openBuilderStudio}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in Builder.io
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Page Details</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>Title:</strong> {generatedContent.title}</p>
                      <p><strong>URL:</strong> {pageUrl}</p>
                      <p><strong>Page ID:</strong> {builderPage.id}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Components</h4>
                    <div className="space-y-1">
                      {generatedContent.components.map((comp, index) => (
                        <Badge key={index} variant="outline" className="mr-1 mb-1">
                          {comp.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button onClick={handleEdit} className="w-full">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit with Visual Editor
                    </Button>
                    <Button onClick={handlePublish} variant="outline" className="w-full">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Publish Website
                    </Button>
                    <Button onClick={handleReset} variant="ghost" className="w-full">
                      Start Over
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Page Preview */}
            <BuilderPageRenderer
              pageUrl={pageUrl}
              builderApiKey={builderApiKey}
              builderSpaceId={builderSpaceId}
            />
          </div>
        )}

        {/* Step 4: Visual Editor */}
        {step === 'editing' && builderPage && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Visual Editor</h2>
                <p className="text-gray-600">Edit your website components with drag-and-drop</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleBackToPreview}>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Mode
                </Button>
                <Button onClick={handlePublish}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Publish
                </Button>
              </div>
            </div>

            <BuilderVisualEditor
              pageId={builderPage.id}
              pageUrl={pageUrl}
              builderApiKey={builderApiKey}
              builderSpaceId={builderSpaceId}
            />
          </div>
        )}
      </div>
    </div>
  );
};
