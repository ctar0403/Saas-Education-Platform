"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wand2, Eye, ExternalLink, Code } from 'lucide-react';
import { BuilderComponent } from '@builder.io/react';
import { GeneratedContent } from '@/lib/services/openai-service';
import { BuilderAPIService, BuilderPageResponse } from '@/lib/services/builder-api-service';
import { BUILDER_CONFIG } from '@/lib/config/builder-config';
import { BuilderVisualEditor } from './BuilderVisualEditor';

interface GenerationResult {
  content: GeneratedContent;
  builderPage: BuilderPageResponse;
  urlPath: string;
}

export default function AIWebsiteGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'editor' | 'json'>('preview');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt for your website');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGenerationResult(null);

    try {
      console.log('🚀 Starting website generation...');

      // Step 1: Generate content using OpenAI
      console.log('📝 Generating content with OpenAI...');

      // Call API route to generate content (to keep API key secure)
      const response = await fetch('/api/generate-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate website content');
      }

      const { content } = await response.json();
      console.log('✅ Content generated:', content);

      // Step 2: Create page in Builder.io
      console.log('🏗️ Creating page in Builder.io...');
      const builderService = new BuilderAPIService(
        BUILDER_CONFIG.API_KEY,
        'e7e4e054f28544f2a05c2ce9a547d52a' // Using the space ID from the existing config
      );

      // Generate unique URL path
      const urlPath = builderService.generateUrlPath(content.title);
      console.log('🔗 Generated URL path:', urlPath);

      const builderPage = await builderService.createPage(content, urlPath);
      console.log('✅ Builder.io page created:', builderPage);

      setGenerationResult({
        content,
        builderPage,
        urlPath
      });

    } catch (err) {
      console.error('❌ Generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate website');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = async () => {
    if (!generationResult) return;

    try {
      const builderService = new BuilderAPIService(
        BUILDER_CONFIG.API_KEY,
        'e7e4e054f28544f2a05c2ce9a547d52a'
      );
      
      await builderService.publishPage(generationResult.builderPage.id);
      
      // Update the result to show published status
      setGenerationResult({
        ...generationResult,
        builderPage: {
          ...generationResult.builderPage,
          published: 'published'
        }
      });
    } catch (err) {
      console.error('❌ Publish error:', err);
      setError(err instanceof Error ? err.message : 'Failed to publish page');
    }
  };

  return (
    <div className="ai-website-generator container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-text">
          AI Website Generator
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Generate professional websites instantly using AI. Just describe what you want, 
          and we'll create a complete website with Builder.io components.
        </p>
      </div>

      {/* Input Section */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            Describe Your Website
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="prompt" className="text-sm font-medium">
              Website Description
            </label>
            <Textarea
              id="prompt"
              placeholder="Example: I want a cooking class website with modern layout featuring hero section, program information, testimonials, and contact form. The site should have a warm, inviting feel with green and orange colors."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Cooking Classes</Badge>
            <Badge variant="secondary">Teaching Platform</Badge>
            <Badge variant="secondary">Business Website</Badge>
            <Badge variant="secondary">Portfolio</Badge>
            <Badge variant="secondary">E-commerce</Badge>
          </div>

          <Button 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Website...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Website
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="max-w-4xl mx-auto border-destructive">
          <CardContent className="pt-6">
            <div className="text-destructive">
              <p className="font-medium">Error:</p>
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {generationResult && (
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Results Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{generationResult.content.title}</h2>
                  <p className="text-muted-foreground">{generationResult.content.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">
                      {generationResult.content.websiteType}
                    </Badge>
                    <Badge variant="outline">
                      {generationResult.content.colorScheme}
                    </Badge>
                    <Badge variant={generationResult.builderPage.published === 'published' ? 'default' : 'secondary'}>
                      {generationResult.builderPage.published === 'published' ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  {generationResult.builderPage.published !== 'published' && (
                    <Button onClick={handlePublish} variant="outline">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Publish
                    </Button>
                  )}
                  <Button 
                    onClick={() => setActiveTab('editor')}
                    variant={activeTab === 'editor' ? 'default' : 'outline'}
                  >
                    <Code className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tab Navigation */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'preview' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Eye className="inline mr-2 h-4 w-4" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'editor' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Code className="inline mr-2 h-4 w-4" />
              Visual Editor
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'json' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Code className="inline mr-2 h-4 w-4" />
              JSON
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {activeTab === 'preview' && (
              <Card>
                <CardContent className="p-0">
                  <div className="bg-gray-50 border rounded-lg overflow-hidden">
                    <div className="bg-white p-2 border-b flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex-1 text-sm text-muted-foreground text-center">
                        {generationResult.urlPath}
                      </div>
                    </div>
                    <div className="min-h-[600px] bg-white">
                      <BuilderComponent 
                        model="page" 
                        url={generationResult.urlPath}
                        apiKey={BUILDER_CONFIG.API_KEY}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'editor' && (
              <BuilderVisualEditor
                pageId={generationResult.builderPage.id}
                urlPath={generationResult.urlPath}
                onSave={() => {
                  console.log('✅ Page saved via visual editor');
                }}
                onPublish={() => {
                  console.log('✅ Page published via visual editor');
                  // Update the result to show published status
                  setGenerationResult({
                    ...generationResult,
                    builderPage: {
                      ...generationResult.builderPage,
                      published: 'published'
                    }
                  });
                }}
              />
            )}

            {activeTab === 'json' && (
              <Card>
                <CardContent className="p-0">
                  <pre className="p-6 text-sm overflow-auto max-h-[600px] bg-gray-50">
                    {JSON.stringify(generationResult.content, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
