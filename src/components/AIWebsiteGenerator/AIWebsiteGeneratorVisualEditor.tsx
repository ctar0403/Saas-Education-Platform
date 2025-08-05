"use client";

import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BUILDER_CONFIG } from '@/lib/config/builder-config';

interface AIWebsiteGeneratorVisualEditorProps {
  pageId: string;
  urlPath: string;
}

export function AIWebsiteGeneratorVisualEditor({ 
  pageId, 
  urlPath 
}: AIWebsiteGeneratorVisualEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Builder.io visual editor
    const loadEditor = async () => {
      try {
        // Import Builder.io editor dynamically
        const { builder } = await import('@builder.io/react');

        if (editorRef.current) {
          // Clear previous editor
          editorRef.current.innerHTML = '';

          // Initialize Builder.io Visual Editor
          const editorUrl = `https://builder.io/content/${BUILDER_CONFIG.API_KEY}/${pageId}?url=${encodeURIComponent(urlPath)}&apiKey=${BUILDER_CONFIG.API_KEY}&model=page&preview=true&editing=true&inline=true&frameId=editor-frame`;

          // Create iframe for the visual editor
          const iframe = document.createElement('iframe');
          iframe.src = editorUrl;
          iframe.style.width = '100%';
          iframe.style.height = '600px';
          iframe.style.border = 'none';
          iframe.style.borderRadius = '8px';
          iframe.id = 'builder-editor-iframe';
          iframe.title = 'Builder.io Visual Editor';

          // Handle iframe load
          iframe.onload = () => {
            console.log('✅ Builder.io Visual Editor loaded');
            
            // Send message to iframe to configure editor
            iframe.contentWindow?.postMessage({
              type: 'builder.configurePage',
              data: {
                apiKey: BUILDER_CONFIG.API_KEY,
                model: 'page',
                url: urlPath,
                pageId: pageId,
                editing: true,
                preview: true,
                inline: true
              }
            }, '*');
          };

          iframe.onerror = (error) => {
            console.error('❌ Failed to load Builder.io Visual Editor:', error);
          };

          editorRef.current.appendChild(iframe);

          // Listen for messages from the editor
          const handleMessage = (event: MessageEvent) => {
            if (event.origin !== 'https://builder.io') {
              return;
            }

            switch (event.data.type) {
              case 'builder.saved':
                console.log('✅ Page saved in Builder.io');
                break;
              case 'builder.published':
                console.log('✅ Page published in Builder.io');
                break;
              case 'builder.error':
                console.error('❌ Builder.io error:', event.data.error);
                break;
            }
          };

          window.addEventListener('message', handleMessage);

          // Cleanup function
          return () => {
            window.removeEventListener('message', handleMessage);
          };
        }
      } catch (error) {
        console.error('❌ Failed to load Builder.io editor:', error);
        
        // Fallback: Show direct link to Builder.io editor
        if (editorRef.current) {
          editorRef.current.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full p-8 text-center">
              <h3 class="text-xl font-semibold mb-4">Builder.io Visual Editor</h3>
              <p class="text-muted-foreground mb-6">Click below to open the visual editor in a new tab</p>
              <a 
                href="https://builder.io/content/${BUILDER_CONFIG.API_KEY}/${pageId}?model=page" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Open Visual Editor
                <svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          `;
        }
      }
    };

    loadEditor();
  }, [pageId, urlPath]);

  return (
    <Card>
      <CardContent className="p-0">
        <div 
          ref={editorRef} 
          className="min-h-[600px] bg-gray-50 rounded-lg overflow-hidden"
        >
          {/* Loading state */}
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading Builder.io Visual Editor...</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
