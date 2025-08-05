"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowLeft,
  ExternalLink,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Copy,
  RefreshCw,
  Plus
} from 'lucide-react';
import Link from 'next/link';

// Embedded Builder.io Visual Editor
function EmbeddedBuilderEditor() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showCreatePageModal, setShowCreatePageModal] = useState(false);
  const [newPageData, setNewPageData] = useState({
    name: '',
    url: '',
    template: 'page'
  });

  // Check if this is a Kadnya AI generated website
  const isKadnyaGenerated = searchParams.get('source') === 'kadnya-api';
  const kadnyaApiResponse = searchParams.get('apiResponse');
  const originalPrompt = searchParams.get('prompt');

  // Your Builder.io space configuration
  const BUILDER_SPACE_ID = 'dab30bfb91004dd2b3bb838b92ceeb9d';
  const BUILDER_API_KEY = 'dab30bfb91004dd2b3bb838b92ceeb9d';

  // Initialize with the default space URL immediately
  const [editorUrl, setEditorUrl] = useState<string>(`https://builder.io/content/${BUILDER_SPACE_ID}`);

  useEffect(() => {
    // Set loading to false after initial render
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const createNewPage = async () => {
    if (!newPageData.name) return;

    setIsLoading(true);
    try {
      // Create a new page entry - for now we'll just navigate to the editor with the page name
      const pageUrl = `https://builder.io/content/${BUILDER_SPACE_ID}?model=page&name=${encodeURIComponent(newPageData.name)}&url=${encodeURIComponent(newPageData.url || `/${newPageData.name.toLowerCase().replace(/\s+/g, '-')}`)}`;
      setEditorUrl(pageUrl);
      setShowCreatePageModal(false);
      setNewPageData({ name: '', url: '', template: 'page' });
    } catch (error) {
      console.error('Error creating page:', error);
      setError('Failed to create new page. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const openInNewTab = () => {
    if (editorUrl) {
      window.open(editorUrl, '_blank', 'width=1400,height=900');
    }
  };

  const copyEditorUrl = () => {
    if (editorUrl) {
      navigator.clipboard.writeText(editorUrl);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              Configuration Error
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">{error}</p>
            <div className="space-y-2">
              <Button onClick={() => window.location.reload()} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-xl font-semibold text-gray-900">
              Builder.io Visual Editor
            </h1>
            <Badge variant="secondary">
              <CheckCircle className="w-3 h-3 mr-1" />
              Connected to Space
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowCreatePageModal(true)}
              variant="outline"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Page
            </Button>
            <Button
              onClick={copyEditorUrl}
              variant="outline"
              size="sm"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy URL
            </Button>
            <Button
              onClick={openInNewTab}
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in New Tab
            </Button>
          </div>
        </div>
      </header>

      {/* Space Info Banner */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-indigo-500 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-indigo-900 mb-2">
                🎉 {searchParams.get('source') === 'kadnya-api' ? 'Kadnya AI Generated Website' : 'Connected to Builder.io Space!'}
              </h3>
              <p className="text-indigo-800 text-sm mb-3">
                {searchParams.get('source') === 'kadnya-api'
                  ? 'Your website was generated using Kadnya AI. You can now edit it with Builder.io\'s drag-and-drop editor.'
                  : 'You\'re now connected to the Builder.io visual editor with full access to create and edit content. All your dynamic components are registered and ready for drag-and-drop editing.'
                }
              </p>
              <div className="flex flex-wrap gap-2">
                {searchParams.get('source') === 'kadnya-api' && (
                  <Badge className="bg-blue-200 text-blue-800">
                    Generated by Kadnya AI
                  </Badge>
                )}
                <Badge className="bg-indigo-200 text-indigo-800">
                  Space ID: {BUILDER_SPACE_ID.substring(0, 8)}...
                </Badge>
                <Badge className="bg-indigo-200 text-indigo-800">
                  API Key: {BUILDER_API_KEY.substring(0, 8)}...
                </Badge>
                <Badge variant="outline" className="border-indigo-300 text-indigo-700">
                  Visual Editor: Active
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Builder.io Editor */}
      <main className="h-[calc(100vh-180px)]">
        <div className="h-full">
          {isLoading ? (
            <div className="h-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Loading Builder.io Editor</h3>
                <p className="text-gray-500">Setting up your visual editor...</p>
              </div>
            </div>
          ) : (
            <div className="h-full relative">
              <iframe
                src={editorUrl}
                className="w-full h-full border-0"
                title="Builder.io Visual Editor"
                allow="clipboard-write; fullscreen; microphone; camera; geolocation"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-top-navigation allow-downloads"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => console.log('Builder.io iframe loaded successfully')}
                onError={(e) => {
                  console.error('Builder.io iframe error:', e);
                  setError('Failed to load Builder.io editor. Please try opening in a new tab.');
                }}
              />

              {/* Fallback overlay - shows if iframe takes too long */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center opacity-0 transition-opacity duration-1000"
                   style={{opacity: isLoading ? 1 : 0, pointerEvents: isLoading ? 'auto' : 'none'}}>
                <div className="text-center max-w-md p-8">
                  <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <ExternalLink className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Builder.io Visual Editor</h3>
                  <p className="text-gray-500 mb-6">
                    Access your Builder.io space directly for the best editing experience.
                  </p>
                  <div className="space-y-3">
                    <Button onClick={openInNewTab} className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open Builder.io Editor
                    </Button>
                    <p className="text-sm text-gray-400">
                      Space: {BUILDER_SPACE_ID.substring(0, 8)}...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Create New Page Modal */}
      {showCreatePageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Create New Page</h3>
                <button
                  onClick={() => setShowCreatePageModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Name
                  </label>
                  <input
                    type="text"
                    value={newPageData.name}
                    onChange={(e) => setNewPageData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Homepage, About Us, Contact"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Path (optional)
                  </label>
                  <input
                    type="text"
                    value={newPageData.url}
                    onChange={(e) => setNewPageData(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="e.g., /about, /contact (auto-generated if empty)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Type
                  </label>
                  <select
                    value={newPageData.template}
                    onChange={(e) => setNewPageData(prev => ({ ...prev, template: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="page">Page (Standard)</option>
                    <option value="landing-page">Landing Page</option>
                    <option value="blog-post">Blog Post</option>
                    <option value="product-page">Product Page</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowCreatePageModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={createNewPage}
                  disabled={!newPageData.name || isLoading}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Page'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions Panel */}
      <div className="fixed bottom-6 right-6 max-w-sm">
        <Card className="shadow-lg border-indigo-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-indigo-600" />
              Using the Visual Editor
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2 text-sm text-gray-600">
            <p>• Drag components from the left panel</p>
            <p>• Click elements to edit text and styling</p>
            <p>• Use the "Data" tab to connect dynamic content</p>
            <p>• Preview your changes with the eye icon</p>
            <p>• Publish when ready!</p>
            <div className="mt-3 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                If the editor doesn't load, click "Open in New Tab" above.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error fallback overlay */}
      {error && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Editor Loading Issue</h3>
                  <p className="text-gray-600 text-sm">The embedded editor couldn't load</p>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{error}</p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setError('');
                    window.location.reload();
                  }}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
                <Button
                  className="flex-1"
                  onClick={openInNewTab}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in New Tab
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main component with Suspense wrapper
export default function VisualEditorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading Builder.io Visual Editor...</p>
        </div>
      </div>
    }>
      <EmbeddedBuilderEditor />
    </Suspense>
  );
}
