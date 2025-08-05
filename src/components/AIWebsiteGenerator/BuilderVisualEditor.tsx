"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Save, Eye } from 'lucide-react';
import { BUILDER_CONFIG } from '@/lib/config/builder-config';

interface BuilderVisualEditorProps {
  pageId: string;
  urlPath: string;
  onSave?: () => void;
  onPublish?: () => void;
}

export function BuilderVisualEditor({ 
  pageId, 
  urlPath,
  onSave,
  onPublish
}: BuilderVisualEditorProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeEditor = async () => {
      if (!containerRef.current) return;

      try {
        setIsLoading(true);

        // Clear container
        containerRef.current.innerHTML = '';

        // Create the Builder.io editor iframe URL
        const baseUrl = 'https://builder.io';
        const editorParams = new URLSearchParams({
          apiKey: BUILDER_CONFIG.API_KEY,
          model: 'page',
          url: urlPath,
          editing: 'true',
          preview: previewMode.toString(),
          inline: 'true',
          hideTopBar: 'true',
          frameId: `editor-${pageId}`
        });

        const editorUrl = `${baseUrl}/content/${BUILDER_CONFIG.API_KEY}/${pageId}?${editorParams.toString()}`;

        // Create iframe
        const iframe = document.createElement('iframe');
        iframe.src = editorUrl;
        iframe.style.cssText = `
          width: 100%;
          height: 600px;
          border: none;
          border-radius: 8px;
          background: white;
        `;
        iframe.id = `builder-editor-${pageId}`;
        iframe.title = 'Builder.io Visual Editor';

        // Handle iframe events
        iframe.onload = () => {
          console.log('✅ Builder.io editor loaded');
          setIsLoading(false);
          
          // Configure the editor
          iframe.contentWindow?.postMessage({
            type: 'builder.editingEnabled',
            data: {
              enabled: !previewMode,
              apiKey: BUILDER_CONFIG.API_KEY,
              model: 'page',
              url: urlPath
            }
          }, '*');
        };

        iframe.onerror = () => {
          console.error('❌ Failed to load Builder.io editor');
          setIsLoading(false);
        };

        containerRef.current.appendChild(iframe);

        // Listen for messages from Builder.io
        const handleMessage = (event: MessageEvent) => {
          if (!event.origin.includes('builder.io')) {
            return;
          }

          const { type, data } = event.data || {};

          switch (type) {
            case 'builder.contentSaved':
              console.log('✅ Content saved in Builder.io');
              onSave?.();
              break;
            case 'builder.contentPublished':
              console.log('✅ Content published in Builder.io');
              onPublish?.();
              break;
            case 'builder.ready':
              console.log('✅ Builder.io editor ready');
              setIsLoading(false);
              break;
            case 'builder.error':
              console.error('❌ Builder.io error:', data);
              break;
          }
        };

        window.addEventListener('message', handleMessage);

        return () => {
          window.removeEventListener('message', handleMessage);
        };

      } catch (error) {
        console.error('❌ Error initializing Builder.io editor:', error);
        setIsLoading(false);
      }
    };

    initializeEditor();
  }, [pageId, urlPath, previewMode, onSave, onPublish]);

  const openInNewTab = () => {
    const builderUrl = `https://builder.io/content/${BUILDER_CONFIG.API_KEY}/${pageId}?model=page&url=${encodeURIComponent(urlPath)}`;
    window.open(builderUrl, '_blank', 'noopener,noreferrer');
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <div className="space-y-4">
      {/* Editor Controls */}
      <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Visual Editor</h3>
          <span className="text-sm text-muted-foreground">
            {previewMode ? 'Preview Mode' : 'Edit Mode'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePreview}
          >
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={openInNewTab}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in New Tab
          </Button>
        </div>
      </div>

      {/* Editor Container */}
      <Card>
        <CardContent className="p-0">
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-sm text-muted-foreground">
                    Loading Builder.io Visual Editor...
                  </p>
                </div>
              </div>
            )}
            
            <div 
              ref={containerRef} 
              className="min-h-[600px] bg-gray-50 rounded-lg overflow-hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* Help Text */}
      <div className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
        <p className="font-medium mb-2">How to use the Visual Editor:</p>
        <ul className="space-y-1 text-xs">
          <li>• Click on any component to edit its properties</li>
          <li>• Drag components to rearrange them</li>
          <li>• Use the toolbar to add new components</li>
          <li>• Changes are automatically saved</li>
          <li>• Click "Open in New Tab" for the full editing experience</li>
        </ul>
      </div>
    </div>
  );
}
