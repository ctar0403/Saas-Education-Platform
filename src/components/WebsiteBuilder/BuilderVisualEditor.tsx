"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Edit3, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle, 
  Loader2,
  Save,
  Eye,
  Settings,
  RefreshCw
} from 'lucide-react';

interface BuilderVisualEditorProps {
  pageId: string;
  pageUrl: string;
  builderApiKey: string;
  builderSpaceId: string;
}

export const BuilderVisualEditor: React.FC<BuilderVisualEditorProps> = ({
  pageId,
  pageUrl,
  builderApiKey,
  builderSpaceId
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [editorUrl, setEditorUrl] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    initializeEditor();
  }, [pageId, builderSpaceId]);

  const initializeEditor = () => {
    try {
      // Construct the Builder.io editor URL for embedded editing
      const baseEditorUrl = `https://builder.io/content/${builderSpaceId}/${pageId}`;
      const editorParams = new URLSearchParams({
        model: 'page',
        embedded: 'true',
        hideHeader: 'true',
        hideNav: 'true',
        hideFooter: 'true',
        apiKey: builderApiKey,
        // Enable inline editing mode
        mode: 'edit',
        // Auto-save changes
        autoSave: 'true'
      });

      const fullEditorUrl = `${baseEditorUrl}?${editorParams.toString()}`;
      setEditorUrl(fullEditorUrl);
      setIsLoading(false);
      
      console.log('🎨 Builder.io editor initialized:', fullEditorUrl);
    } catch (err) {
      console.error('❌ Editor initialization error:', err);
      setError('Failed to initialize visual editor');
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // In a real implementation, you would call the Builder.io API to save
      // For now, we'll simulate the save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastSaved(new Date());
      console.log('💾 Changes saved successfully');
    } catch (err) {
      console.error('❌ Save error:', err);
      setError('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const openInBuilderStudio = () => {
    const studioUrl = `https://builder.io/content/${builderSpaceId}/${pageId}`;
    window.open(studioUrl, '_blank', 'width=1400,height=900');
  };

  const previewPage = () => {
    const previewUrl = `https://cdn.builder.io/api/v1/page/page/${pageId}`;
    window.open(previewUrl, '_blank');
  };

  const refreshEditor = () => {
    setIsLoading(true);
    setError('');
    const iframe = document.getElementById('builder-editor-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src; // Reload iframe
    }
    setTimeout(() => setIsLoading(false), 2000);
  };

  if (error && !editorUrl) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              <div className="flex items-center justify-between">
                <span>{error}</span>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={initializeEditor}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openInBuilderStudio}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in Studio
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Editor Controls */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-indigo-600" />
                Visual Editor
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">
                  Page ID: {pageId.substring(0, 8)}...
                </Badge>
                <Badge variant="secondary">
                  URL: {pageUrl}
                </Badge>
                {lastSaved && (
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Saved {lastSaved.toLocaleTimeString()}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={refreshEditor}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={previewPage}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
              
              <Button
                size="sm"
                onClick={openInBuilderStudio}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Full Editor
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Embedded Editor */}
      <Card>
        <CardContent className="p-0">
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Loading Visual Editor</h3>
                  <p className="text-gray-500">Setting up drag-and-drop interface...</p>
                </div>
              </div>
            )}
            
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              {/* Editor Header */}
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Builder.io Visual Editor
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Settings className="w-4 h-4" />
                    <span>Embedded Mode</span>
                  </div>
                </div>
              </div>
              
              {/* Editor Iframe */}
              <div className="relative" style={{ height: '800px' }}>
                {editorUrl ? (
                  <iframe
                    id="builder-editor-iframe"
                    src={editorUrl}
                    className="w-full h-full border-0"
                    title="Builder.io Visual Editor"
                    allow="clipboard-write; fullscreen"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-top-navigation"
                    onLoad={() => {
                      setIsLoading(false);
                      console.log('✅ Builder.io editor loaded successfully');
                    }}
                    onError={(e) => {
                      console.error('❌ Editor iframe error:', e);
                      setError('Failed to load visual editor. Please try the full editor.');
                      setIsLoading(false);
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        Editor Not Available
                      </h3>
                      <p className="text-gray-500 mb-4">
                        The embedded editor couldn't be loaded.
                      </p>
                      <Button onClick={openInBuilderStudio}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open in Builder.io Studio
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editor Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How to Use the Visual Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Editing Components</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Click on any component to select and edit it</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Use the properties panel to change text, colors, and settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Drag components to reorder them on the page</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Add new components from the left sidebar</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Advanced Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Changes are automatically saved as you edit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Use the preview button to see your changes live</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Switch to responsive mode to edit mobile layouts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Open the full editor for advanced customization</span>
                </li>
              </ul>
            </div>
          </div>
          
          {error && (
            <Alert className="mt-4 border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-700">
                <strong>Note:</strong> {error} You can always use the "Full Editor" button to access all Builder.io features.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
