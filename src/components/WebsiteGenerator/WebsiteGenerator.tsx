"use client";

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { builderApiService } from '../../lib/api/builder-api';
import { REGISTERED_COMPONENTS } from '../../lib/config/builder-config';
import { Loader2, ExternalLink, CheckCircle, XCircle, Globe } from 'lucide-react';

interface WebsiteGeneratorProps {
  className?: string;
}

const WebsiteGenerator: React.FC<WebsiteGeneratorProps> = ({ className = '' }) => {
  const [siteName, setSiteName] = useState('');
  const [selectedComponents, setSelectedComponents] = useState<string[]>(['CourseList', 'ProductList']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleComponentToggle = (componentName: string) => {
    setSelectedComponents(prev => 
      prev.includes(componentName)
        ? prev.filter(name => name !== componentName)
        : [...prev, componentName]
    );
  };

  const handleGenerate = async () => {
    if (!siteName.trim()) {
      setError('Please enter a site name');
      return;
    }

    if (selectedComponents.length === 0) {
      setError('Please select at least one component');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGenerationResult(null);

    try {
      const result = await builderApiService.generateWebsiteWithComponents(
        siteName.trim(),
        selectedComponents
      );

      setGenerationResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate website');
    } finally {
      setIsGenerating(false);
    }
  };

  const componentDescriptions = {
    CourseList: 'Display and filter courses with search and categorization',
    ProductList: 'Showcase products with pricing and detailed filtering',
    BlogList: 'Organize blog posts with date filtering and sorting',
    CourseCard: 'Individual course display with ratings and details',
    ProductCard: 'Product showcase with pricing and reviews',
    BlogCard: 'Blog post preview with author and read time'
  };

  return (
    <div className={`website-generator ${className}`}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Builder.io Website Generator
          </CardTitle>
          <p className="text-gray-600">
            Generate a new website using our dynamic content components with Builder.io integration
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Site Name Input */}
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-2">
              Website Name
            </label>
            <input
              id="siteName"
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="Enter your website name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={isGenerating}
            />
          </div>

          {/* Component Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Components to Include
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REGISTERED_COMPONENTS.map((component) => (
                <div
                  key={component.name}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedComponents.includes(component.name)
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleComponentToggle(component.name)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{component.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {componentDescriptions[component.name as keyof typeof componentDescriptions]}
                      </p>
                    </div>
                    {selectedComponents.includes(component.name) && (
                      <CheckCircle className="w-5 h-5 text-indigo-500 ml-2 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Components Summary */}
          {selectedComponents.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selected Components ({selectedComponents.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedComponents.map((name) => (
                  <Badge key={name} variant="secondary" className="bg-indigo-100 text-indigo-800">
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {/* Generation Result */}
          {generationResult && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium text-green-800">Website Generated Successfully!</span>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  <strong>Name:</strong> {generationResult.name}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Status:</strong> {generationResult.published}
                </p>
                
                <div className="flex gap-3 mt-4">
                  {generationResult.editorUrl && (
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700" asChild>
                      <a href={generationResult.editorUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Open in Builder.io Editor
                      </a>
                    </Button>
                  )}
                  
                  {generationResult.url && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={generationResult.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View Page
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !siteName.trim() || selectedComponents.length === 0}
            size="lg"
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating Website...
              </>
            ) : (
              <>
                <Globe className="w-5 h-5 mr-2" />
                Generate Website with Builder.io
              </>
            )}
          </Button>

          {/* Info */}
          <div className="text-sm text-gray-500 text-center">
            This will create a new page in your Builder.io space with the selected components.
            You can then customize it further in the Builder.io visual editor.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteGenerator;
