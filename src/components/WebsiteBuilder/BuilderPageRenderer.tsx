"use client";

import React, { useState, useEffect } from 'react';
import { BuilderComponent, builder, Builder } from '@builder.io/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Loader2, 
  AlertCircle, 
  ExternalLink, 
  RefreshCw,
  Monitor,
  Tablet,
  Smartphone
} from 'lucide-react';

interface BuilderPageRendererProps {
  pageUrl: string;
  builderApiKey: string;
  builderSpaceId: string;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export const BuilderPageRenderer: React.FC<BuilderPageRendererProps> = ({
  pageUrl,
  builderApiKey,
  builderSpaceId
}) => {
  const [page, setPage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');

  useEffect(() => {
    // Initialize Builder.io
    builder.init(builderApiKey);
    
    loadPage();
  }, [pageUrl, builderApiKey]);

  const loadPage = async () => {
    setIsLoading(true);
    setError('');

    try {
      console.log('🔍 Fetching page from Builder.io:', pageUrl);
      
      // Fetch the page from Builder.io
      const fetchedPage = await builder
        .get('page', {
          userAttributes: {
            urlPath: pageUrl,
          },
          options: {
            includeRefs: true,
          },
        })
        .toPromise();

      if (!fetchedPage) {
        throw new Error('Page not found in Builder.io');
      }

      console.log('✅ Page loaded successfully:', fetchedPage);
      setPage(fetchedPage);
      
    } catch (err) {
      console.error('❌ Error loading page:', err);
      setError(err instanceof Error ? err.message : 'Failed to load page');
    } finally {
      setIsLoading(false);
    }
  };

  const getViewportStyles = () => {
    switch (viewportMode) {
      case 'tablet':
        return { maxWidth: '768px', margin: '0 auto' };
      case 'mobile':
        return { maxWidth: '375px', margin: '0 auto' };
      default:
        return { width: '100%' };
    }
  };

  const getViewportClass = () => {
    switch (viewportMode) {
      case 'tablet':
        return 'tablet-view';
      case 'mobile':
        return 'mobile-view';
      default:
        return 'desktop-view';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Loading Preview</h3>
              <p className="text-gray-500">Fetching your website from Builder.io...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              <div className="flex items-center justify-between">
                <span>{error}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadPage}
                  className="ml-4"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-indigo-600" />
              Website Preview
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">
                URL: {pageUrl}
              </Badge>
              <Badge variant="secondary">
                Space: {builderSpaceId.substring(0, 8)}...
              </Badge>
            </div>
          </div>
          
          {/* Viewport Controls */}
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewportMode('desktop')}
                className={`p-2 rounded-md transition-colors ${
                  viewportMode === 'desktop' 
                    ? 'bg-white shadow-sm text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewportMode('tablet')}
                className={`p-2 rounded-md transition-colors ${
                  viewportMode === 'tablet' 
                    ? 'bg-white shadow-sm text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Tablet View"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewportMode('mobile')}
                className={`p-2 rounded-md transition-colors ${
                  viewportMode === 'mobile' 
                    ? 'bg-white shadow-sm text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`https://cdn.builder.io/api/v1/page/page/${page.id}`, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Full Page
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          {/* Viewport Indicator */}
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">Viewport:</span>
              <span className="capitalize">{viewportMode}</span>
              <span className="text-gray-400">
                ({viewportMode === 'desktop' ? '1200px+' : 
                  viewportMode === 'tablet' ? '768px' : '375px'})
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Live Preview</span>
            </div>
          </div>
          
          {/* Page Content */}
          <div 
            style={getViewportStyles()}
            className={`transition-all duration-300 ${getViewportClass()}`}
          >
            <div className="min-h-[600px] bg-white">
              {page ? (
                <BuilderComponent
                  model="page"
                  content={page}
                  options={{
                    includeRefs: true,
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center text-gray-500">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                    <p>No content available</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Page Info */}
        {page && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Page ID:</span>
                <div className="text-gray-600 font-mono">{page.id}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Last Updated:</span>
                <div className="text-gray-600">
                  {new Date(page.lastUpdated).toLocaleString()}
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Status:</span>
                <div className="text-gray-600">
                  <Badge variant={page.published === 'published' ? 'default' : 'secondary'}>
                    {page.published || 'draft'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Register Builder.io component styles
if (typeof document !== 'undefined') {
  // Add responsive styles for different viewport modes
  const style = document.createElement('style');
  style.textContent = `
    .desktop-view {
      width: 100%;
    }
    
    .tablet-view {
      max-width: 768px;
      margin: 0 auto;
      border-left: 1px solid #e5e7eb;
      border-right: 1px solid #e5e7eb;
    }
    
    .mobile-view {
      max-width: 375px;
      margin: 0 auto;
      border-left: 1px solid #e5e7eb;
      border-right: 1px solid #e5e7eb;
    }
    
    /* Override Builder.io default styles for better preview */
    .builder-block {
      position: relative;
    }
    
    .builder-component {
      width: 100%;
    }
  `;
  document.head.appendChild(style);
}
