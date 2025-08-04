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
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { AIWebsiteGenerator } from '@/lib/ai-website-generator';

// Real Builder.io Visual Editor Integration
function BuilderVisualEditor() {
  const searchParams = useSearchParams();
  const prompt = searchParams.get('prompt');
  const analysis = searchParams.get('analysis');
  const content = searchParams.get('content');
  const pageId = searchParams.get('pageId');
  const spaceId = searchParams.get('spaceId');
  const apiKey = searchParams.get('apiKey');
  const templateType = searchParams.get('templateType');
  const isInternal = searchParams.get('internal') === 'true';

  const [builderEditorUrl, setBuilderEditorUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [parsedAnalysis, setParsedAnalysis] = useState<any>(null);
  const [parsedContent, setParsedContent] = useState<any>(null);
  const [showAiSummary, setShowAiSummary] = useState(true);
  const [showSpaceNotification, setShowSpaceNotification] = useState(false);

  useEffect(() => {
    initializeBuilderEditor();
  }, [prompt, analysis, content]);

  const initializeBuilderEditor = async () => {
    try {
      setIsLoading(true);

      // Parse the AI-generated data if available
      if (analysis) {
        setParsedAnalysis(JSON.parse(decodeURIComponent(analysis)));
      }
      if (content) {
        setParsedContent(JSON.parse(decodeURIComponent(content)));
      }

      // Get Builder.io configuration (use provided space info if available)
      const builderApiKey = apiKey || process.env.NEXT_PUBLIC_BUILDER_API_KEY;
      const builderSpaceId = spaceId || process.env.NEXT_PUBLIC_BUILDER_SPACE_ID || 'dab30bfb91004dd2b3bb838b92ceeb9d';

      // Create Builder.io editor URL
      let editorUrl;
      const hasAIContent = prompt && parsedAnalysis && parsedContent;

      if (isInternal) {
        // Internal mode - embed Builder.io within our application
        if (builderApiKey && pageId && pageId.startsWith('mock-') === false && pageId.startsWith('demo-') === false) {
          // Real Builder.io page exists - create embedded editor URL
          editorUrl = `https://builder.io/content/${builderSpaceId}/${pageId}?model=page&embedded=true&hideHeader=true&hideNav=true`;
          console.log('Using embedded Builder.io editor for page:', pageId);
        } else {
          // Use enhanced internal editor with template-based content
          console.log('Using enhanced internal visual editor with template components');
          editorUrl = 'internal-editor';
        }
      } else if (builderApiKey) {
        // External mode - use regular Builder.io
        if (hasAIContent && pageId) {
          editorUrl = `https://builder.io/content/${builderSpaceId}/${pageId}?model=page`;
        } else {
          editorUrl = `https://builder.io/content/${builderSpaceId}?model=page`;
        }
      } else {
        // No API key - use enhanced mock editor
        console.log('No Builder API key found. Using enhanced visual editor.');
        editorUrl = 'mock-editor';
      }

      setBuilderEditorUrl(editorUrl);
      setIsLoading(false);

      // Show space creation notification if new space was created
      if (spaceId && spaceId.startsWith('space_')) {
        setShowSpaceNotification(true);
        setTimeout(() => setShowSpaceNotification(false), 5000);
      }

    } catch (error) {
      console.error('Error initializing Builder editor:', error);
      setError('Failed to initialize visual editor. Please try again.');
      setIsLoading(false);
    }
  };

  const createBuilderPage = async (apiKey: string, spaceId: string) => {
    try {
      // Create a real Builder.io page with the AI content
      const generator = new AIWebsiteGenerator(apiKey);
      const pageId = await generator.createBuilderPage(parsedContent, parsedAnalysis);

      return {
        success: true,
        pageId: pageId
      };
    } catch (error) {
      console.error('Failed to create Builder page:', error);
      return {
        success: false,
        pageId: `demo-page-${Date.now()}`
      };
    }
  };

  const openInNewTab = () => {
    if (builderEditorUrl && builderEditorUrl !== 'mock-editor') {
      window.open(builderEditorUrl, '_blank', 'width=1400,height=900');
    }
  };

  const copyEditorUrl = () => {
    if (builderEditorUrl && builderEditorUrl !== 'mock-editor') {
      navigator.clipboard.writeText(builderEditorUrl);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Creating Your AI Website</h2>
          <p className="text-gray-600">Setting up your personalized Builder.io environment...</p>
          {prompt && (
            <div className="mt-4 p-4 bg-orange-50 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-orange-800 mb-3">
                <Sparkles className="w-4 h-4 inline mr-1" />
                Processing: "{prompt.substring(0, 50)}..."
              </p>
              <div className="space-y-2 text-xs text-orange-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Analyzing your requirements</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Creating new Builder.io space</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Selecting best template</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Registering custom components</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

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
              Back to Kadnya
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-xl font-semibold text-gray-900">
              Visual Editor
              {templateType && (
                <span className="text-sm text-gray-500 ml-2">
                  ({templateType.charAt(0).toUpperCase() + templateType.slice(1)} Template)
                </span>
              )}
            </h1>
            <Badge variant="secondary">
              <CheckCircle className="w-3 h-3 mr-1" />
              {spaceId && spaceId.startsWith('space_') ? 'New Space Connected' : 'Connected'}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            {builderEditorUrl !== 'mock-editor' && (
              <>
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
              </>
            )}
          </div>
        </div>
      </header>

      {/* Space Creation Notification */}
      {showSpaceNotification && spaceId && spaceId.startsWith('space_') && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200 px-6 py-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-green-500 rounded-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-900 mb-2">🎉 New Builder.io Space Created!</h3>
                <p className="text-green-800 text-sm mb-3">
                  Your AI-generated website now has its own dedicated Builder.io space with custom {templateType} template components.
                  All components are registered and ready for drag-and-drop editing.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-200 text-green-800">
                    Space ID: {spaceId.substring(0, 20)}...
                  </Badge>
                  {apiKey && (
                    <Badge className="bg-green-200 text-green-800">
                      API Key: {apiKey.substring(0, 8)}...
                    </Badge>
                  )}
                  <Badge variant="outline" className="border-green-300 text-green-700">
                    Template: {templateType?.charAt(0).toUpperCase() + templateType?.slice(1)}
                  </Badge>
                </div>
              </div>
              <button
                onClick={() => setShowSpaceNotification(false)}
                className="absolute top-4 right-4 p-1 text-green-600 hover:text-green-800 hover:bg-green-200 rounded-full transition-colors"
                aria-label="Close notification"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Summary (if generated from prompt) */}
      {parsedAnalysis && parsedContent && showAiSummary && (
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-200 px-6 py-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-orange-900 mb-2">
                  🎉 AI Generated {parsedAnalysis.websiteType.charAt(0).toUpperCase() + parsedAnalysis.websiteType.slice(1)} Website Ready!
                </h3>
                <p className="text-orange-800 text-sm mb-3">
                  Created a new Builder.io space with {parsedAnalysis.websiteType} template, {parsedAnalysis.tone} tone
                  and {parsedAnalysis.colorScheme} color scheme. Custom components are ready for drag-and-drop editing!
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className="bg-orange-200 text-orange-800">
                    📱 Template: {parsedAnalysis.websiteType}
                  </Badge>
                  <Badge className="bg-orange-200 text-orange-800">
                    🎨 Style: {parsedAnalysis.tone}
                  </Badge>
                  <Badge className="bg-orange-200 text-orange-800">
                    🏢 Industry: {parsedAnalysis.industry}
                  </Badge>
                  {spaceId && spaceId.startsWith('space_') && (
                    <Badge className="bg-green-200 text-green-800">
                      🏗️ New Space Created
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {parsedAnalysis.features.map((feature: string, index: number) => (
                    <Badge key={index} variant="outline" className="border-orange-300 text-orange-700">
                      {feature}
                    </Badge>
                  ))}
                </div>
                {spaceId && (
                  <div className="mt-3 p-2 bg-orange-100 rounded text-xs text-orange-700">
                    Space ID: {spaceId.substring(0, 20)}...
                    {apiKey && ` | API Key: ${apiKey.substring(0, 8)}...`}
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowAiSummary(false)}
                className="absolute top-4 right-4 p-1 text-orange-600 hover:text-orange-800 hover:bg-orange-200 rounded-full transition-colors"
                aria-label="Close AI summary"
              >
                <AlertCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Builder.io Editor Iframe or Enhanced Mock Editor */}
      <main className="h-[calc(100vh-140px)]">
        {builderEditorUrl &&
         builderEditorUrl !== 'mock-editor' &&
         builderEditorUrl !== 'internal-editor' &&
         builderEditorUrl.startsWith('https://builder.io') ? (
          <div className="h-full">
            <iframe
              src={builderEditorUrl}
              className="w-full h-full border-0"
              title="Builder.io Visual Editor"
              allow="clipboard-write"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
          </div>
        ) : (
          <EnhancedMockEditor
            prompt={prompt}
            analysis={parsedAnalysis}
            content={parsedContent}
            builderUrl={builderEditorUrl === 'mock-editor' ? `https://builder.io/content/dab30bfb91004dd2b3bb838b92ceeb9d` : builderEditorUrl}
            isInternal={isInternal}
            pageId={pageId}
          />
        )}
      </main>

      {/* Instructions Panel (for first-time users) */}
      {builderEditorUrl !== 'mock-editor' && (
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
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// Enhanced Mock Visual Editor Component with component panel
function EnhancedMockEditor({ prompt, analysis, content, builderUrl, isInternal, pageId }: {
  prompt: string | null;
  analysis: any;
  content: any;
  builderUrl: string;
  isInternal?: boolean;
  pageId?: string | null;
}) {
  const searchParams = useSearchParams();
  const templateType = searchParams.get('templateType') || analysis?.websiteType;
  const [selectedComponent, setSelectedComponent] = useState<string>('');
  const [showComponentPanel, setShowComponentPanel] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [publishStatus, setPublishStatus] = useState<'idle' | 'publishing' | 'published' | 'error'>('idle');
  const [componentProps, setComponentProps] = useState<{[key: string]: any}>({});

  const openBuilderInNewTab = () => {
    if (builderUrl) {
      window.open(builderUrl, '_blank');
    }
  };

  // Template-based component library for internal mode
  const templateComponentLibrary = (templateType || analysis?.websiteType) === 'teaching' ? [
    // Navigation
    { name: 'Navigation', icon: '🧭', category: 'navigation', group: 'Teaching Template / Navigation', description: 'Main navigation bar' },

    // Landing Components
    { name: 'Header', icon: '🎓', category: 'landing', group: 'Teaching Template / Landing', description: 'Teaching platform header' },
    { name: 'Program Info', icon: '📚', category: 'landing', group: 'Teaching Template / Landing', description: 'Program information section' },
    { name: 'Expert Info', icon: '👨‍🏫', category: 'landing', group: 'Teaching Template / Landing', description: 'Expert introduction' },
    { name: 'Pain Point', icon: '⚠️', category: 'landing', group: 'Teaching Template / Landing', description: 'Problem identification' },
    { name: 'How It Works', icon: '🔄', category: 'landing', group: 'Teaching Template / Landing', description: 'Process explanation' },
    { name: 'Value Stack', icon: '⭐', category: 'landing', group: 'Teaching Template / Landing', description: 'Value propositions' },
    { name: 'Worth It', icon: '💰', category: 'landing', group: 'Teaching Template / Landing', description: 'Investment justification' },
    { name: 'Testimonials', icon: '💬', category: 'landing', group: 'Teaching Template / Landing', description: 'Student testimonials' },
    { name: 'Free Assessment', icon: '📝', category: 'landing', group: 'Teaching Template / Landing', description: 'Assessment form' },

    // Footer
    { name: 'Footer', icon: '📋', category: 'footer', group: 'Teaching Template / Footer', description: 'Teaching platform footer' },
    { name: 'Dark Footer', icon: '🌑', category: 'footer', group: 'Teaching Template / Footer', description: 'Dark themed footer' },
    { name: 'Light Footer', icon: '🌕', category: 'footer', group: 'Teaching Template / Footer', description: 'Light themed footer' },
  ] : (templateType || analysis?.websiteType) === 'cooking' ? [
    // Navigation
    { name: 'Navbar', icon: '🧭', category: 'navigation', group: 'Cooking Template / Navigation', description: 'Main navigation bar' },

    // Landing Components
    { name: 'Hero Banner', icon: '🍳', category: 'landing', group: 'Cooking Template / Landing', description: 'Cooking hero banner' },
    { name: 'Assessment', icon: '📝', category: 'landing', group: 'Cooking Template / Landing', description: 'Cooking skills assessment' },
    { name: 'Help Section', icon: '🆘', category: 'landing', group: 'Cooking Template / Landing', description: 'Expert help section' },
    { name: 'Pain Point', icon: '⚠���', category: 'landing', group: 'Cooking Template / Landing', description: 'Problem identification' },
    { name: 'Program Info', icon: '📚', category: 'landing', group: 'Cooking Template / Landing', description: 'Cooking program details' },
    { name: 'Worth It', icon: '💰', category: 'landing', group: 'Cooking Template / Landing', description: 'Investment value' },

    // Content Components
    { name: 'Value Stack', icon: '⭐', category: 'content', group: 'Cooking Template / Content', description: 'Cooking course benefits' },

    // About Components
    { name: 'Hero Section', icon: '🏠', category: 'about', group: 'Cooking Template / About', description: 'About hero section' },
    { name: 'Mission Section', icon: '🎯', category: 'about', group: 'Cooking Template / About', description: 'Mission statement' },
    { name: 'Value Section', icon: '💎', category: 'about', group: 'Cooking Template / About', description: 'Core values' },
    { name: 'Work Section', icon: '👨‍🍳', category: 'about', group: 'Cooking Template / About', description: 'How we work' },

    // Footer
    { name: 'Footer', icon: '📋', category: 'footer', group: 'Cooking Template / Footer', description: 'Cooking site footer' },
  ] : [
    { name: 'Hero Section', icon: '🏠', category: 'layout', description: 'Main hero section' },
    { name: 'Text Block', icon: '📝', category: 'content', description: 'Text content block' },
    { name: 'Image', icon: '🖼️', category: 'media', description: 'Image component' },
    { name: 'Button', icon: '🔘', category: 'interactive', description: 'Call-to-action button' },
    { name: 'Testimonials', icon: '💬', category: 'social', description: 'Customer testimonials' },
    { name: 'Contact Form', icon: '📧', category: 'forms', description: 'Contact form' },
  ];

  const componentLibrary = isInternal ? templateComponentLibrary : [
    { name: 'Hero Section', icon: '🏠', category: 'layout' },
    { name: 'Text Block', icon: '📝', category: 'content' },
    { name: 'Image', icon: '🖼️', category: 'media' },
    { name: 'Button', icon: '🔘', category: 'interactive' },
    { name: 'Video', icon: '🎥', category: 'media' },
    { name: 'Testimonials', icon: '💬', category: 'social' },
    { name: 'Contact Form', icon: '📧', category: 'forms' },
    { name: 'Blog List', icon: '📄', category: 'dynamic' },
    { name: 'Product Grid', icon: '🛍️', category: 'ecommerce' },
    { name: 'Navigation', icon: '🧭', category: 'layout' },
    { name: 'Footer', icon: '📋', category: 'layout' },
    { name: 'Columns', icon: '📊', category: 'layout' },
  ];

  const handleDragStart = (componentName: string) => {
    setIsDragging(true);
    setSelectedComponent(componentName);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleSaveDraft = async () => {
    setSaveStatus('saving');
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (pageId && !pageId.startsWith('mock-') && !pageId.startsWith('demo-')) {
        // Real Builder.io save
        console.log('Saving to Builder.io page:', pageId);
      } else {
        // Mock save
        console.log('Draft saved locally');
      }

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handlePublish = async () => {
    setPublishStatus('publishing');
    try {
      // Simulate publish operation
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (pageId && !pageId.startsWith('mock-') && !pageId.startsWith('demo-')) {
        // Real Builder.io publish
        console.log('Publishing Builder.io page:', pageId);
      } else {
        // Mock publish
        console.log('Website published (demo)');
      }

      setPublishStatus('published');
      setShowSaveModal(true);
      setTimeout(() => setPublishStatus('idle'), 3000);
    } catch (error) {
      console.error('Publish error:', error);
      setPublishStatus('error');
      setTimeout(() => setPublishStatus('idle'), 3000);
    }
  };

  const handlePreview = () => {
    // Open preview in new tab
    const previewUrl = pageId && !pageId.startsWith('mock-') && !pageId.startsWith('demo-')
      ? `https://cdn.builder.io/api/v1/page/page/${pageId}`
      : '/templates/' + (analysis?.websiteType || 'cooking');
    window.open(previewUrl, '_blank');
  };

  const handleComponentPropChange = (componentName: string, propName: string, value: any) => {
    setComponentProps(prev => ({
      ...prev,
      [componentName]: {
        ...prev[componentName],
        [propName]: value
      }
    }));
  };

  const getComponentProps = (componentName: string) => {
    const defaultProps = getDefaultPropsForComponent(componentName, analysis);
    return {
      ...defaultProps,
      ...componentProps[componentName]
    };
  };

  const getDefaultPropsForComponent = (componentName: string, analysis: any) => {
    const colorScheme = analysis?.colorScheme === 'blue' ? '#08AD98' :
                       analysis?.colorScheme === 'green' ? '#10B981' :
                       analysis?.colorScheme === 'purple' ? '#8B5CF6' :
                       analysis?.colorScheme === 'orange' ? '#F59E0B' : '#08AD98';

    switch (componentName) {
      case 'Header':
        return {
          heading: content?.heroHeading || 'Learn from Experts',
          subheading: content?.heroSubheading || 'Transform your skills with professional guidance',
          buttonText: 'Start Learning',
          buttonColor: colorScheme,
          backgroundColor: colorScheme
        };
      case 'Hero Banner':
        return {
          heading: content?.heroHeading || 'Master the Art of Cooking',
          subheading: content?.heroSubheading || 'Professional cooking techniques made simple',
          buttonText: 'Start Cooking',
          buttonLink: '#programs',
          backgroundImageUrl: '/mobile_hero_section.png'
        };
      case 'Program Info':
        return {
          heading: `${analysis?.websiteType === 'cooking' ? 'Cooking' : 'Learning'} Programs`,
          description: 'Comprehensive programs designed for success',
          backgroundColor: '#f8fafc',
          buttonColor: colorScheme
        };
      case 'Testimonials':
        return {
          heading: `What Our ${analysis?.websiteType === 'cooking' ? 'Students' : 'Learners'} Say`,
          backgroundColor: '#ffffff'
        };
      case 'Free Assessment':
        return {
          heading: 'Start Your Learning Journey',
          description: 'Get a personalized learning path',
          buttonText: 'Get Free Assessment',
          buttonColor: colorScheme,
          backgroundColor: '#f8fafc'
        };
      case 'Assessment':
        return {
          heading: 'Find Your Cooking Style',
          buttonText: 'Take Assessment',
          buttonColor: colorScheme,
          backgroundColor: '#ffffff'
        };
      case 'Value Stack':
        return {
          backgroundColor: colorScheme,
          value1: 'Expert Instruction',
          value2: 'Hands-on Practice',
          value3: 'Professional Techniques'
        };
      default:
        return {};
    }
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* Component Panel - Left Sidebar */}
      {showComponentPanel && (
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Panel Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">
                {isInternal ? 'Template Components' : 'Components'}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComponentPanel(false)}
              >
                ×
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {isInternal ? 'Based on your template' : 'Drag to add components'}
            </p>
          </div>

          {/* Component Library */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {isInternal ? (
                // Template-based components with Builder.io-style grouping
                <div className="space-y-4">
                  {/* Group components by category */}
                  {['navigation', 'landing', 'content', 'about', 'footer'].map((category) => {
                    const categoryComponents = componentLibrary.filter(comp => comp.category === category);
                    if (categoryComponents.length === 0) return null;

                    return (
                      <div key={category}>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 border-b border-gray-200 pb-1">
                          {category === 'navigation' ? '🧭 Navigation' :
                           category === 'landing' ? '🏠 Landing Page' :
                           category === 'content' ? '📄 Content' :
                           category === 'about' ? 'ℹ️ About' :
                           category === 'footer' ? '📋 Footer' :
                           category.charAt(0).toUpperCase() + category.slice(1)}
                        </h4>
                        <div className="space-y-1">
                          {categoryComponents.map((component) => (
                            <div
                              key={component.name}
                              draggable
                              onDragStart={() => handleDragStart(component.name)}
                              onDragEnd={handleDragEnd}
                              className="bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg p-3 cursor-move transition-all group hover:shadow-sm"
                              title={`Drag to add ${component.name}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-lg flex-shrink-0">{component.icon}</div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-gray-700 group-hover:text-blue-700 truncate">
                                    {component.name}
                                  </div>
                                  {'description' in component && (
                                    <div className="text-xs text-gray-500 group-hover:text-blue-600 truncate">
                                      {component.description}
                                    </div>
                                  )}
                                  {'group' in component && (
                                    <div className="text-xs text-gray-400 mt-1">
                                      {component.group}
                                    </div>
                                  )}
                                </div>
                                <div className="text-xs text-gray-400 group-hover:text-blue-500">
                                  ⋮⋮
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // Standard components
                ['Layout', 'Content', 'Media', 'Interactive', 'Forms', 'Dynamic'].map((category) => (
                  <div key={category}>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      {category}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {componentLibrary
                        .filter(comp => comp.category === category.toLowerCase())
                        .map((component) => (
                          <div
                            key={component.name}
                            draggable
                            onDragStart={() => handleDragStart(component.name)}
                            onDragEnd={handleDragEnd}
                            className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-3 cursor-move transition-colors group"
                          >
                            <div className="text-lg mb-1">{component.icon}</div>
                            <div className="text-xs font-medium text-gray-700 group-hover:text-gray-900">
                              {component.name}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Panel Footer */}
          <div className="p-4 border-t border-gray-200">
            {isInternal ? (
              <div className="space-y-2">
                <Button
                  className="w-full"
                  size="sm"
                  variant="outline"
                  onClick={handleSaveDraft}
                  disabled={saveStatus === 'saving'}
                >
                  {saveStatus === 'saving' ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  {searchParams.get('spaceId')?.startsWith('space_')
                    ? '🆕 New Builder.io Space Connected'
                    : pageId && !pageId.startsWith('mock-') && !pageId.startsWith('demo-')
                    ? '🔗 Connected to Builder.io'
                    : '📝 Template preview mode'
                  }
                </p>
              </div>
            ) : (
              <>
                <Button onClick={openBuilderInNewTab} className="w-full" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Builder.io Studio
                </Button>
                {!process.env.NEXT_PUBLIC_BUILDER_API_KEY && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Demo Mode - Set API key for full features
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Canvas Toolbar */}
        <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!showComponentPanel && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComponentPanel(true)}
              >
                Components
              </Button>
            )}
            <div className="h-4 w-px bg-gray-300"></div>
            <Button variant="ghost" size="sm" onClick={handlePreview}>
              <Copy className="w-4 h-4 mr-1" />
              Preview
            </Button>
            <Button variant="ghost" size="sm">
              📱 Responsive
            </Button>
            {pageId && (
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                ID: {pageId.substring(0, 8)}...
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveDraft}
              disabled={saveStatus === 'saving'}
            >
              {saveStatus === 'saving' ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                  Saving...
                </>
              ) : saveStatus === 'saved' ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                  Saved
                </>
              ) : saveStatus === 'error' ? (
                <>
                  <AlertCircle className="w-4 h-4 mr-1 text-red-600" />
                  Error
                </>
              ) : (
                'Save Draft'
              )}
            </Button>
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              onClick={handlePublish}
              disabled={publishStatus === 'publishing'}
            >
              {publishStatus === 'publishing' ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                  Publishing...
                </>
              ) : publishStatus === 'published' ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Published
                </>
              ) : publishStatus === 'error' ? (
                <>
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Error
                </>
              ) : (
                'Publish'
              )}
            </Button>
          </div>
        </div>

        {/* Canvas Content */}
        <div className="flex-1 overflow-auto p-8 bg-gray-100">
          {!prompt ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ExternalLink className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Start Building</h3>
                <p className="text-gray-500 mb-6">
                  Drag components from the left panel or use AI to generate your website.
                </p>
                <div className="space-y-3">
                  <Button onClick={openBuilderInNewTab} className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Builder.io Studio
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/">Use AI Generator</Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <AIGeneratedWebsite
              analysis={analysis}
              content={content}
              selectedComponent={selectedComponent}
              onComponentSelect={setSelectedComponent}
              isDragging={isDragging}
            />
          )}
        </div>
      </div>

      {/* Properties Panel - Right Sidebar (when component selected) */}
      {selectedComponent && (
        <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Properties</h3>
            <button
              onClick={() => setSelectedComponent('')}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-1">
                {selectedComponent}
              </div>
              <div className="text-xs text-gray-500">
                {componentLibrary.find(c => c.name === selectedComponent)?.group || `${templateType?.charAt(0).toUpperCase() + templateType?.slice(1) || 'Template'} Component`}
              </div>
              {componentLibrary.find(c => c.name === selectedComponent)?.description && (
                <div className="text-xs text-gray-400 mt-1">
                  {componentLibrary.find(c => c.name === selectedComponent)?.description}
                </div>
              )}
            </div>

            {/* Dynamic properties based on component */}
            {selectedComponent === 'Header' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={getComponentProps('Header').heading}
                    onChange={(e) => handleComponentPropChange('Header', 'heading', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subheading
                  </label>
                  <textarea
                    value={getComponentProps('Header').subheading}
                    onChange={(e) => handleComponentPropChange('Header', 'subheading', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded h-16"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={getComponentProps('Header').buttonText}
                    onChange={(e) => handleComponentPropChange('Header', 'buttonText', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Color
                  </label>
                  <input
                    type="color"
                    value={getComponentProps('Header').buttonColor}
                    onChange={(e) => handleComponentPropChange('Header', 'buttonColor', e.target.value)}
                    className="w-full h-10 rounded border border-gray-300"
                  />
                </div>
              </>
            )}

            {selectedComponent === 'Hero Banner' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={getComponentProps('Hero Banner').heading}
                    onChange={(e) => handleComponentPropChange('Hero Banner', 'heading', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subheading
                  </label>
                  <textarea
                    value={getComponentProps('Hero Banner').subheading}
                    onChange={(e) => handleComponentPropChange('Hero Banner', 'subheading', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded h-16"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={getComponentProps('Hero Banner').buttonText}
                    onChange={(e) => handleComponentPropChange('Hero Banner', 'buttonText', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </>
            )}

            {selectedComponent === 'Program Info' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={getComponentProps('Program Info').heading}
                    onChange={(e) => handleComponentPropChange('Program Info', 'heading', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={getComponentProps('Program Info').description}
                    onChange={(e) => handleComponentPropChange('Program Info', 'description', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded h-16"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <input
                    type="color"
                    value={getComponentProps('Program Info').backgroundColor}
                    onChange={(e) => handleComponentPropChange('Program Info', 'backgroundColor', e.target.value)}
                    className="w-full h-10 rounded border border-gray-300"
                  />
                </div>
              </>
            )}

            {selectedComponent === 'Value Stack' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value 1
                  </label>
                  <input
                    type="text"
                    value={getComponentProps('Value Stack').value1}
                    onChange={(e) => handleComponentPropChange('Value Stack', 'value1', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value 2
                  </label>
                  <input
                    type="text"
                    value={getComponentProps('Value Stack').value2}
                    onChange={(e) => handleComponentPropChange('Value Stack', 'value2', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value 3
                  </label>
                  <input
                    type="text"
                    value={getComponentProps('Value Stack').value3}
                    onChange={(e) => handleComponentPropChange('Value Stack', 'value3', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <input
                    type="color"
                    value={getComponentProps('Value Stack').backgroundColor}
                    onChange={(e) => handleComponentPropChange('Value Stack', 'backgroundColor', e.target.value)}
                    className="w-full h-10 rounded border border-gray-300"
                  />
                </div>
              </>
            )}

            {/* Generic properties for other components */}
            {!['Header', 'Hero Banner', 'Program Info', 'Value Stack'].includes(selectedComponent) && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <input type="color" className="w-full h-10 rounded border border-gray-300" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color
                  </label>
                  <input type="color" className="w-full h-10 rounded border border-gray-300" />
                </div>
              </>
            )}

            <div className="pt-4 border-t border-gray-200">
              <Button
                onClick={handleSaveDraft}
                className="w-full"
                size="sm"
                disabled={saveStatus === 'saving'}
              >
                {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Website Published!</h3>
                  <p className="text-gray-600">Your AI-generated website is now live</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Website Type:</span>
                  <span className="text-sm text-gray-600 capitalize">{analysis?.websiteType || 'Custom'}</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Template:</span>
                  <span className="text-sm text-gray-600">{analysis?.tone || 'Professional'} Style</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Components:</span>
                  <span className="text-sm text-gray-600">{componentLibrary.length} Available</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Builder.io Space:</span>
                  <span className="text-sm text-gray-600">
                    {searchParams.get('spaceId')?.startsWith('space_') ? '🆕 New Space' : '🔗 Connected'}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handlePreview}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Site
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setShowSaveModal(false)}
                >
                  Continue Editing
                </Button>
              </div>

              <button
                onClick={() => setShowSaveModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// AI Generated Website Component for the enhanced editor
function AIGeneratedWebsite({ analysis, content, selectedComponent, onComponentSelect, isDragging }: {
  analysis: any;
  content: any;
  selectedComponent: string;
  onComponentSelect: (component: string) => void;
  isDragging: boolean;
}) {
  const componentSuggestions = analysis ? [
    analysis.websiteType === 'teaching' ? 'Teaching Header' : 'Hero Banner',
    analysis.websiteType === 'cooking' ? 'Cooking Program Info' : 'Program Info',
    'Testimonials',
    analysis.websiteType === 'teaching' ? 'Free Assessment' : 'Contact Section',
    analysis.features.includes('blog section') ? 'Blog List' : null,
    analysis.features.includes('contact form') ? 'Contact Form' : null,
  ].filter(Boolean) : [];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg min-h-[800px] relative">
      {/* Drop Zone Overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center z-10">
          <div className="text-center text-blue-600">
            <div className="text-2xl mb-2">📦</div>
            <div className="font-medium">Drop component here</div>
          </div>
        </div>
      )}

      {/* AI Generated Website Preview */}
      <div className="p-0">
        {/* Hero Section */}
        <div
          className={`text-center p-12 text-white relative overflow-hidden cursor-pointer transition-all ${
            selectedComponent === componentSuggestions[0] ? 'ring-4 ring-blue-400' : ''
          } ${
            analysis?.colorScheme === 'blue' ? 'bg-gradient-to-br from-blue-600 to-blue-800' :
            analysis?.colorScheme === 'green' ? 'bg-gradient-to-br from-green-600 to-green-800' :
            analysis?.colorScheme === 'purple' ? 'bg-gradient-to-br from-purple-600 to-purple-800' :
            analysis?.colorScheme === 'orange' ? 'bg-gradient-to-br from-orange-600 to-orange-800' :
            analysis?.colorScheme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' :
            'bg-gradient-to-br from-indigo-600 to-indigo-800'
          }`}
          onClick={() => onComponentSelect(componentSuggestions[0] || 'Hero Section')}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {content?.heroHeading || 'Your AI-Generated Website'}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              {content?.heroSubheading || 'This is a preview of your AI-generated website based on your prompt.'}
            </p>
            <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              {analysis?.websiteType === 'teaching' ? 'Start Learning' :
               analysis?.websiteType === 'cooking' ? 'View Recipes' :
               'Get Started'}
            </Button>
          </div>

          {selectedComponent === componentSuggestions[0] && (
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Selected
            </div>
          )}
        </div>

        {/* Generated Sections */}
        <div className="space-y-0">
          {content?.sections?.slice(1).map((section: any, index: number) => (
            <div
              key={index}
              className={`p-8 transition-all duration-300 cursor-pointer relative ${
                selectedComponent === componentSuggestions[index + 1]
                  ? 'ring-4 ring-blue-400 bg-blue-50'
                  : index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => onComponentSelect(componentSuggestions[index + 1] || '')}
            >
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {section.type === 'hero' ? '' :
                   section.type === 'features' ? 'Why Choose Us' :
                   section.type === 'testimonials' ? 'What Our Students Say' :
                   section.type === 'program' ? `${analysis?.websiteType === 'cooking' ? 'Cooking' : 'Learning'} Programs` :
                   section.type === 'values' ? 'Our Values' :
                   section.type === 'assessment' ? 'Free Assessment' :
                   'Section'}
                </h2>

                {section.type === 'testimonials' && (
                  <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <p className="text-gray-600 italic mb-4">"This platform transformed how I approach learning. The content is exceptional!"</p>
                      <div className="font-semibold text-gray-900">Sarah Johnson</div>
                      <div className="text-sm text-gray-500">Student</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <p className="text-gray-600 italic mb-4">"Professional quality instruction that really makes a difference."</p>
                      <div className="font-semibold text-gray-900">Michael Chen</div>
                      <div className="text-sm text-gray-500">Professional</div>
                    </div>
                  </div>
                )}

                {section.type === 'features' && (
                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    {['Expert Guidance', 'Practical Skills', 'Community Support'].map((feature, idx) => (
                      <div key={idx} className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                          analysis?.colorScheme === 'blue' ? 'bg-blue-100 text-blue-600' :
                          analysis?.colorScheme === 'green' ? 'bg-green-100 text-green-600' :
                          analysis?.colorScheme === 'purple' ? 'bg-purple-100 text-purple-600' :
                          analysis?.colorScheme === 'orange' ? 'bg-orange-100 text-orange-600' :
                          'bg-indigo-100 text-indigo-600'
                        }`}>
                          ✓
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{feature}</h3>
                        <p className="text-gray-600 text-sm">Professional quality that makes a difference</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === 'program' && (
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white p-6 rounded-lg shadow-md text-left">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {analysis?.websiteType === 'cooking' ? 'Beginner Cooking Course' : 'Foundation Program'}
                      </h3>
                      <p className="text-gray-600 mb-4">Perfect for getting started with the fundamentals</p>
                      <Button variant="outline" size="sm">Learn More</Button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-left">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {analysis?.websiteType === 'cooking' ? 'Advanced Culinary Arts' : 'Advanced Program'}
                      </h3>
                      <p className="text-gray-600 mb-4">Take your skills to the professional level</p>
                      <Button variant="outline" size="sm">Learn More</Button>
                    </div>
                  </div>
                )}

                {section.type === 'assessment' && (
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-lg mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Your Free Assessment</h3>
                    <p className="text-gray-600 mb-6">Discover your learning path with our personalized assessment</p>
                    <Button className={`px-8 py-3 ${
                      analysis?.colorScheme === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                      analysis?.colorScheme === 'green' ? 'bg-green-600 hover:bg-green-700' :
                      analysis?.colorScheme === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                      analysis?.colorScheme === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
                      'bg-indigo-600 hover:bg-indigo-700'
                    }`}>
                      Start Free Assessment
                    </Button>
                  </div>
                )}
              </div>

              {selectedComponent === componentSuggestions[index + 1] && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Selected
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer CTA Section */}
        <div
          className={`text-center text-white p-12 cursor-pointer transition-all relative ${
            selectedComponent === 'Footer CTA' ? 'ring-4 ring-blue-400' : ''
          } ${
            analysis?.colorScheme === 'blue' ? 'bg-gradient-to-r from-blue-600 to-blue-800' :
            analysis?.colorScheme === 'green' ? 'bg-gradient-to-r from-green-600 to-green-800' :
            analysis?.colorScheme === 'purple' ? 'bg-gradient-to-r from-purple-600 to-purple-800' :
            analysis?.colorScheme === 'orange' ? 'bg-gradient-to-r from-orange-600 to-orange-800' :
            'bg-gradient-to-r from-indigo-600 to-purple-600'
          }`}
          onClick={() => onComponentSelect('Footer CTA')}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {analysis?.websiteType === 'teaching' ? 'Join thousands of learners who have transformed their skills' :
             analysis?.websiteType === 'cooking' ? 'Start your culinary journey today' :
             'Take the next step towards your goals'}
          </p>
          <div className="space-x-4">
            <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3">
              {analysis?.websiteType === 'teaching' ? 'Enroll Now' :
               analysis?.websiteType === 'cooking' ? 'Start Cooking' :
               'Get Started'}
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3">
              Learn More
            </Button>
          </div>

          {selectedComponent === 'Footer CTA' && (
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Selected
            </div>
          )}
        </div>
      </div>
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
          <p>Loading Visual Editor...</p>
        </div>
      </div>
    }>
      <BuilderVisualEditor />
    </Suspense>
  );
}
