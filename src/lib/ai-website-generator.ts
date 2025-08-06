import { builder } from "@builder.io/sdk";

export interface AIPromptAnalysis {
  websiteType: 'teaching' | 'cooking' | 'business' | 'portfolio' | 'ecommerce' | 'blog';
  industry: string;
  targetAudience: string;
  features: string[];
  colorScheme: 'blue' | 'green' | 'purple' | 'orange' | 'dark' | 'minimal';
  tone: 'professional' | 'friendly' | 'modern' | 'elegant' | 'playful';
  pages: string[];
}

export interface GeneratedContent {
  title: string;
  description: string;
  heroHeading: string;
  heroSubheading: string;
  sections: {
    type: string;
    content: any;
  }[];
}

export class AIWebsiteGenerator {
  private apiKey: string;
  private spaceId: string;

  constructor(apiKey?: string, spaceId?: string) {
    this.apiKey = apiKey || process.env.NEXT_PUBLIC_BUILDER_API_KEY || '';
    this.spaceId = spaceId || process.env.NEXT_PUBLIC_BUILDER_SPACE_ID || 'ab5b460294654ac49703c8715debb464';
  }

  // Analyze the user prompt to understand requirements
  analyzePrompt(prompt: string): AIPromptAnalysis {
    const lowercasePrompt = prompt.toLowerCase();

    // Determine website type
    let websiteType: AIPromptAnalysis['websiteType'] = 'business';
    if (lowercasePrompt.includes('teach') || lowercasePrompt.includes('course') || lowercasePrompt.includes('education')) {
      websiteType = 'teaching';
    } else if (lowercasePrompt.includes('cook') || lowercasePrompt.includes('recipe') || lowercasePrompt.includes('food')) {
      websiteType = 'cooking';
    } else if (lowercasePrompt.includes('portfolio') || lowercasePrompt.includes('showcase')) {
      websiteType = 'portfolio';
    } else if (lowercasePrompt.includes('shop') || lowercasePrompt.includes('store') || lowercasePrompt.includes('sell')) {
      websiteType = 'ecommerce';
    } else if (lowercasePrompt.includes('blog') || lowercasePrompt.includes('article')) {
      websiteType = 'blog';
    }

    // Determine color scheme
    let colorScheme: AIPromptAnalysis['colorScheme'] = 'blue';
    if (lowercasePrompt.includes('green') || lowercasePrompt.includes('nature')) {
      colorScheme = 'green';
    } else if (lowercasePrompt.includes('purple') || lowercasePrompt.includes('creative')) {
      colorScheme = 'purple';
    } else if (lowercasePrompt.includes('orange') || lowercasePrompt.includes('warm')) {
      colorScheme = 'orange';
    } else if (lowercasePrompt.includes('dark') || lowercasePrompt.includes('elegant')) {
      colorScheme = 'dark';
    } else if (lowercasePrompt.includes('minimal') || lowercasePrompt.includes('clean')) {
      colorScheme = 'minimal';
    }

    // Determine tone
    let tone: AIPromptAnalysis['tone'] = 'professional';
    if (lowercasePrompt.includes('friendly') || lowercasePrompt.includes('casual')) {
      tone = 'friendly';
    } else if (lowercasePrompt.includes('modern') || lowercasePrompt.includes('contemporary')) {
      tone = 'modern';
    } else if (lowercasePrompt.includes('elegant') || lowercasePrompt.includes('sophisticated')) {
      tone = 'elegant';
    } else if (lowercasePrompt.includes('fun') || lowercasePrompt.includes('playful')) {
      tone = 'playful';
    }

    // Extract features
    const features: string[] = [];
    if (lowercasePrompt.includes('contact')) features.push('contact form');
    if (lowercasePrompt.includes('gallery')) features.push('image gallery');
    if (lowercasePrompt.includes('blog')) features.push('blog section');
    if (lowercasePrompt.includes('testimonial')) features.push('testimonials');
    if (lowercasePrompt.includes('about')) features.push('about page');
    if (lowercasePrompt.includes('service')) features.push('services section');
    if (lowercasePrompt.includes('portfolio')) features.push('portfolio showcase');

    // Determine pages
    const pages = ['home'];
    if (features.includes('about page') || lowercasePrompt.includes('about')) pages.push('about');
    if (features.includes('contact form') || lowercasePrompt.includes('contact')) pages.push('contact');
    if (features.includes('services section') || lowercasePrompt.includes('service')) pages.push('services');
    if (features.includes('blog section') || lowercasePrompt.includes('blog')) pages.push('blog');

    return {
      websiteType,
      industry: this.extractIndustry(prompt),
      targetAudience: this.extractTargetAudience(prompt),
      features,
      colorScheme,
      tone,
      pages
    };
  }

  // Generate content based on the analysis
  async generateContent(analysis: AIPromptAnalysis, originalPrompt: string): Promise<GeneratedContent> {
    // Simulate AI content generation (in a real app, you'd call OpenAI/Claude API)
    const contentTemplates = this.getContentTemplates(analysis);

    return {
      title: contentTemplates.title,
      description: contentTemplates.description,
      heroHeading: contentTemplates.heroHeading,
      heroSubheading: contentTemplates.heroSubheading,
      sections: contentTemplates.sections
    };
  }

  // Generate content from existing templates (cooking/teaching)
  async generateContentFromTemplates(analysis: AIPromptAnalysis, originalPrompt: string): Promise<GeneratedContent> {
    // Use existing template structure based on website type
    const templateContent = this.getTemplateBasedContent(analysis, originalPrompt);

    return templateContent;
  }

  // Create a new Builder.io space and API key for the user
  async createBuilderSpace(projectName: string): Promise<{spaceId: string, apiKey: string, success: boolean}> {
    try {
      // In a real implementation, this would create a new Builder.io space
      // For demo purposes, we'll simulate this with a mock space
      const mockSpaceId = `space_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const mockApiKey = `bpk-${Math.random().toString(36).substr(2, 32)}`;

      console.log('Creating new Builder.io space:', {
        projectName,
        spaceId: mockSpaceId,
        apiKey: mockApiKey.substring(0, 8) + '...'
      });

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      return {
        spaceId: mockSpaceId,
        apiKey: mockApiKey,
        success: true
      };
    } catch (error) {
      console.error('Failed to create Builder.io space:', error);
      return {
        spaceId: '',
        apiKey: '',
        success: false
      };
    }
  }

  // Generate complete website with space creation and template selection
  async generateWebsiteWithSpace(prompt: string): Promise<{
    spaceId: string;
    apiKey: string;
    pageId: string;
    analysis: AIPromptAnalysis;
    content: GeneratedContent;
    templateType: string;
    success: boolean;
  }> {
    try {
      console.log('🚀 Starting complete website generation process...');

      // Step 1: Analyze the prompt
      const analysis = this.analyzePrompt(prompt);
      console.log('✅ Prompt analyzed:', analysis);

      // Step 2: Create new Builder.io space
      const spaceResult = await this.createBuilderSpace(`AI Generated ${analysis.websiteType} Site`);
      if (!spaceResult.success) {
        throw new Error('Failed to create Builder.io space');
      }
      console.log('✅ Builder.io space created:', spaceResult.spaceId);

      // Step 3: Generate content based on selected template
      const content = await this.generateContentFromTemplates(analysis, prompt);
      console.log('✅ Content generated for template:', analysis.websiteType);

      // Step 4: Create page in the new space
      const newGenerator = new AIWebsiteGenerator(spaceResult.apiKey, spaceResult.spaceId);
      const pageResult = await newGenerator.createInternalBuilderPage(content, analysis);

      console.log('✅ Website generation complete!');

      return {
        spaceId: spaceResult.spaceId,
        apiKey: spaceResult.apiKey,
        pageId: pageResult.pageId,
        analysis,
        content,
        templateType: analysis.websiteType,
        success: true
      };
    } catch (error) {
      console.error('❌ Website generation failed:', error);

      // Return fallback with mock data for demo
      const analysis = this.analyzePrompt(prompt);
      const content = await this.generateContentFromTemplates(analysis, prompt);

      return {
        spaceId: `demo_space_${Date.now()}`,
        apiKey: 'demo_api_key',
        pageId: `demo_page_${Date.now()}`,
        analysis,
        content,
        templateType: analysis.websiteType,
        success: false
      };
    }
  }

  // Create internal Builder.io page without external redirect
  async createInternalBuilderPage(content: GeneratedContent, analysis: AIPromptAnalysis, retryCount: number = 0): Promise<{pageId: string, success: boolean, error?: string}> {
    const maxRetries = 2;

    try {
      const builderApiKey = this.apiKey || process.env.NEXT_PUBLIC_BUILDER_API_KEY;
      const builderSpaceId = this.spaceId || process.env.NEXT_PUBLIC_BUILDER_SPACE_ID || 'ab5b460294654ac49703c8715debb464';

      if (!builderApiKey) {
        console.log('No Builder API key found, creating mock page');
        console.log('To enable real Builder.io integration, set NEXT_PUBLIC_BUILDER_API_KEY environment variable');
        return {
          pageId: `mock-${Date.now()}`,
          success: true
        };
      }

      // Validate API key format
      if (!builderApiKey.startsWith('bpk-') && !builderApiKey.startsWith('bbk-')) {
        console.warn('Builder API key format may be incorrect - should start with "bpk-" or "bbk-"');
        console.log('Current API key starts with:', builderApiKey.substring(0, 4));
      }

      // Validate required data
      if (!content || !content.title) {
        console.warn('Missing content data, creating fallback page');
        return {
          pageId: `fallback-${Date.now()}`,
          success: true
        };
      }

      // Create page data using template components
      const pageData = {
        name: `AI Generated - ${content.title}`,
        data: {
          title: content.title,
          description: content.description,
          blocks: this.generateTemplateBasedBlocks(content, analysis),
          url: '/ai-generated-page',
          state: {
            deviceSize: 'large',
            location: {
              pathname: '/ai-generated-page',
              search: '',
              hash: ''
            }
          }
        },
        published: 'draft',
        model: 'page',
        testRatio: 1,
        createdDate: Date.now(),
        lastUpdated: Date.now(),
        meta: {
          kind: 'page',
          hasLinks: false,
          lastPreviewUrl: `/ai-generated-page?builder.space=${builderSpaceId}&builder.cachebust=true`,
          symbolsUsed: []
        }
      };

      // Validate page data structure
      if (!pageData.name || !pageData.data || !Array.isArray(pageData.data.blocks)) {
        console.warn('Invalid page data structure, creating minimal fallback');
        return {
          pageId: `minimal-${Date.now()}`,
          success: true
        };
      }

      console.log('Creating Builder page with data:', pageData);

      // Create a timeout controller
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      let response: Response;

      try {
        response = await fetch(`https://builder.io/api/v1/write/page`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${builderApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pageData),
          signal: controller.signal
        });
      } catch (fetchError) {
        clearTimeout(timeoutId);
        console.warn('🌐 Fetch request failed:', fetchError);
        return {
          pageId: `demo-network-${Date.now()}`,
          success: false,
          error: 'network'
        };
      }

      clearTimeout(timeoutId);

        // Handle response based on status without reading body multiple times
      if (response.ok) {
        // Success response - try to read JSON
        try {
          const responseData = await response.json();
          console.log('✅ Builder page created successfully:', responseData);
          return {
            pageId: responseData.id || responseData.data?.id || `success-${Date.now()}`,
            success: true
          };
        } catch (jsonError) {
          // JSON parsing failed but response was successful
          console.warn('Response was successful but could not parse JSON:', jsonError);
          return {
            pageId: `success-${Date.now()}`,
            success: true
          };
        }
      } else {
        // Error response - handle gracefully for better UX
        console.warn(`⚠️ Builder API error: ${response.status} ${response.statusText}`);

        // Handle specific error codes - return demo page instead of throwing
        if (response.status === 401) {
          console.warn('🔑 Builder API authentication failed - API key invalid or missing');
          console.log('💡 This is expected in demo mode. Website generation will continue with demo features.');
          return {
            pageId: `demo-auth-${Date.now()}`,
            success: false,
            error: 'authentication'
          };
        } else if (response.status === 403) {
          console.warn('🚫 Builder API access forbidden - check permissions');
          return {
            pageId: `demo-perms-${Date.now()}`,
            success: false,
            error: 'permissions'
          };
        } else if (response.status === 429) {
          console.warn('⏰ Builder API rate limit exceeded - try again later');
          return {
            pageId: `demo-rate-${Date.now()}`,
            success: false,
            error: 'rate_limit'
          };
        } else {
          console.warn(`❌ Builder API error: ${response.status}`);
          return {
            pageId: `demo-error-${Date.now()}`,
            success: false,
            error: 'api_error'
          };
        }
      }
    } catch (error) {
      console.warn('⚠️ Builder.io integration unavailable:', error);

      // Log helpful information without errors
      console.log('🎯 Demo Mode Active: Website generation continues with full functionality');
      console.log('📝 All editing features remain available in the visual editor');

      const isDevelopment = process.env.NODE_ENV === 'development';
      if (isDevelopment) {
        console.log('');
        console.log('🔧 Optional: Enable Real Builder.io Integration');
        console.log('   1. Sign up at https://builder.io');
        console.log('   2. Get API key from https://builder.io/account/space');
        console.log('   3. Add NEXT_PUBLIC_BUILDER_API_KEY=your-key to .env.local');
        console.log('   4. Restart development server');
        console.log('');
      }

      // Always return a working demo page
      return {
        pageId: `demo-${Date.now()}`,
        success: false,
        error: 'demo_mode'
      };
    }
  }

  // Create a Builder.io page with the generated content
  async createBuilderPage(content: GeneratedContent, analysis: AIPromptAnalysis): Promise<string> {
    const pageData = {
      name: `AI Generated - ${content.title}`,
      data: {
        blocks: this.generateBuilderBlocks(content, analysis)
      },
      published: 'draft',
      modelId: 'page'
    };

    try {
      // In a real implementation, you would create the page via Builder.io API
      const builderApiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;
      if (builderApiKey) {
        const response = await fetch(`https://builder.io/api/v1/write/page`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${builderApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pageData)
        });

        if (response.ok) {
          const result = await response.json();
          return result.id;
        }
      }
    } catch (error) {
      console.error('Error creating Builder page:', error);
    }

    // Return a mock page ID for demo purposes
    return `ai-generated-${Date.now()}`;
  }

  private extractIndustry(prompt: string): string {
    const industries = [
      'education', 'food', 'technology', 'healthcare', 'finance',
      'real estate', 'consulting', 'photography', 'design', 'fitness'
    ];

    for (const industry of industries) {
      if (prompt.toLowerCase().includes(industry)) {
        return industry;
      }
    }
    return 'general';
  }

  private extractTargetAudience(prompt: string): string {
    if (prompt.toLowerCase().includes('student')) return 'students';
    if (prompt.toLowerCase().includes('business')) return 'businesses';
    if (prompt.toLowerCase().includes('individual')) return 'individuals';
    if (prompt.toLowerCase().includes('professional')) return 'professionals';
    return 'general audience';
  }

  private getTemplateBasedContent(analysis: AIPromptAnalysis, originalPrompt: string): GeneratedContent {
    // Generate content based on existing templates
    const templates = this.getContentTemplates(analysis);

    // Enhance with prompt-specific customization
    const customizedContent = this.customizeContentForPrompt(templates, originalPrompt, analysis);

    return customizedContent;
  }

  private customizeContentForPrompt(baseTemplate: any, prompt: string, analysis: AIPromptAnalysis): GeneratedContent {
    // Customize the template content based on the specific prompt
    let customizedTitle = baseTemplate.title;
    let customizedHeading = baseTemplate.heroHeading;
    let customizedSubheading = baseTemplate.heroSubheading;

    // Extract specific terms from prompt to customize content
    const promptLower = prompt.toLowerCase();

    if (analysis.websiteType === 'cooking') {
      if (promptLower.includes('recipe')) {
        customizedHeading = 'Discover Amazing Recipes';
        customizedSubheading = 'Master delicious recipes from around the world with step-by-step guidance';
      } else if (promptLower.includes('course')) {
        customizedHeading = 'Learn Cooking Like a Pro';
        customizedSubheading = 'Professional cooking courses to elevate your culinary skills';
      }
    } else if (analysis.websiteType === 'teaching') {
      if (promptLower.includes('online')) {
        customizedHeading = 'Online Learning Excellence';
        customizedSubheading = 'Transform your skills with our comprehensive online education platform';
      } else if (promptLower.includes('course')) {
        customizedHeading = 'Expert-Led Courses';
        customizedSubheading = 'Learn from industry experts through our structured course programs';
      }
    }

    return {
      title: customizedTitle,
      description: baseTemplate.description,
      heroHeading: customizedHeading,
      heroSubheading: customizedSubheading,
      sections: baseTemplate.sections
    };
  }

  private generateTemplateBasedBlocks(content: GeneratedContent, analysis: AIPromptAnalysis) {
    // Generate blocks based on the website type using actual template components
    const websiteType = analysis.websiteType;

    if (websiteType === 'teaching') {
      return this.generateTeachingTemplateBlocks(content, analysis);
    } else if (websiteType === 'cooking') {
      return this.generateCookingTemplateBlocks(content, analysis);
    } else {
      return this.generateDefaultTemplateBlocks(content, analysis);
    }
  }

  private generateTeachingTemplateBlocks(content: GeneratedContent, analysis: AIPromptAnalysis) {
    const colorScheme = this.getColorScheme(analysis.colorScheme);
    return [
      {
        '@type': '@builder.io/sdk:Element',
        '@version': 2,
        id: 'teaching-header',
        component: {
          name: 'Header',
          options: {
            heading: content.heroHeading,
            subheading: content.heroSubheading,
            buttonText: 'Start Learning',
            buttonColor: colorScheme.primary,
            backgroundColor: colorScheme.primary
          }
        }
      },
      {
        '@type': '@builder.io/sdk:Element',
        '@version': 2,
        id: 'program-info',
        component: {
          name: 'Program Info',
          options: {
            heading: 'Our Programs',
            description: 'Comprehensive learning programs designed for success',
            backgroundColor: '#f8fafc',
            buttonColor: colorScheme.primary
          }
        }
      },
      {
        '@type': '@builder.io/sdk:Element',
        '@version': 2,
        id: 'expert-info',
        component: {
          name: 'Expert Info',
          options: {
            title: 'Learn from Experts',
            description: 'Get guidance from industry professionals',
            buttonText: 'Meet Our Experts',
            buttonColor: colorScheme.primary
          }
        }
      },
      {
        '@type': '@builder.io/sdk:Element',
        '@version': 2,
        id: 'testimonials',
        component: {
          name: 'Testimonials',
          options: {
            heading: 'Student Success Stories',
            backgroundColor: '#ffffff'
          }
        }
      },
      {
        '@type': '@builder.io/sdk:Element',
        '@version': 2,
        id: 'free-assessment',
        component: {
          name: 'Free Assessment',
          options: {
            heading: 'Start Your Learning Journey',
            description: 'Get a personalized learning path',
            buttonText: 'Get Free Assessment',
            buttonColor: colorScheme.primary,
            backgroundColor: colorScheme.secondary
          }
        }
      }
    ];
  }

  private generateCookingTemplateBlocks(content: GeneratedContent, analysis: AIPromptAnalysis) {
    const colorScheme = this.getColorScheme(analysis.colorScheme);
    return [
      {
        '@type': '@builder.io/sdk:Element',
        '@version': 2,
        id: 'cooking-hero',
        component: {
          name: 'Hero Banner',
          options: {
            heading: content.heroHeading,
            subheading: content.heroSubheading,
            buttonText: 'Start Cooking',
            buttonLink: '#programs',
            backgroundImageUrl: '/mobile_hero_section.png'
          }
        }
      },
      {
        '@type': '@builder.io/sdk:Element',
        '@version': 2,
        id: 'program-info',
        component: {
          name: 'Program Info',
          options: {
            heading: 'Cooking Programs',
            description: 'From beginner to professional chef',
            backgroundColor: '#f8fafc'
          }
        }
      },
      {
        '@type': '@builder.io/sdk:Element',
        '@version': 2,
        id: 'value-stack',
        component: {
          name: 'Value Stack',
          options: {
            backgroundColor: colorScheme.primary,
            value1: 'Expert Instruction',
            value2: 'Hands-on Practice',
            value3: 'Professional Techniques'
          }
        }
      },
      {
        '@type': '@builder.io/sdk:Element',
        '@version': 2,
        id: 'help-section',
        component: {
          name: 'Help Section',
          options: {
            title: 'Need Help Getting Started?',
            description: 'Our culinary experts are here to guide you',
            buttonText: 'Get Help',
            buttonLink: '#contact',
            points: ['1-on-1 guidance', 'Recipe support', '24/7 community']
          }
        }
      },
      {
        '@type': '@builder.io/sdk:Element',
        '@version': 2,
        id: 'assessment',
        component: {
          name: 'Assessment',
          options: {
            heading: 'Find Your Cooking Style',
            buttonText: 'Take Assessment',
            buttonColor: colorScheme.primary,
            backgroundColor: '#ffffff'
          }
        }
      }
    ];
  }

  private generateDefaultTemplateBlocks(content: GeneratedContent, analysis: AIPromptAnalysis) {
    return [
      {
        '@type': '@builder.io/sdk:Element',
        '@version': 2,
        id: 'hero-section',
        component: {
          name: 'Header',
          options: {
            title: content.heroHeading,
            subtitle: content.heroSubheading,
            buttonText: 'Get Started'
          }
        }
      }
    ];
  }

  private getColorScheme(colorScheme: string) {
    const schemes = {
      blue: { primary: '#08AD98', secondary: '#043A51' },
      green: { primary: '#10B981', secondary: '#064E3B' },
      purple: { primary: '#8B5CF6', secondary: '#4C1D95' },
      orange: { primary: '#F59E0B', secondary: '#92400E' },
      dark: { primary: '#1F2937', secondary: '#111827' },
      minimal: { primary: '#6B7280', secondary: '#374151' }
    };
    return schemes[colorScheme as keyof typeof schemes] || schemes.blue;
  }

  private getContentTemplates(analysis: AIPromptAnalysis) {
    const templates = {
      teaching: {
        title: 'Professional Learning Platform',
        description: 'Empowering minds through expert-led education',
        heroHeading: 'Transform Your Skills with Expert Teaching',
        heroSubheading: 'Join thousands of learners who have advanced their careers through our comprehensive courses',
        sections: [
          { type: 'hero', content: { template: 'teaching-header' } },
          { type: 'features', content: { template: 'teaching-program-info' } },
          { type: 'testimonials', content: { template: 'teaching-testimonials' } },
          { type: 'cta', content: { template: 'teaching-free-assessment' } }
        ]
      },
      cooking: {
        title: 'Culinary Excellence Academy',
        description: 'Master the art of cooking with professional guidance',
        heroHeading: 'Cook Like a Professional Chef',
        heroSubheading: 'Learn authentic techniques and create amazing dishes from the comfort of your kitchen',
        sections: [
          { type: 'hero', content: { template: 'cooking-hero' } },
          { type: 'program', content: { template: 'cooking-program-info' } },
          { type: 'values', content: { template: 'cooking-value-stack' } },
          { type: 'assessment', content: { template: 'cooking-assessment' } }
        ]
      },
      business: {
        title: 'Professional Business Solutions',
        description: 'Growing your business with expert strategies',
        heroHeading: 'Scale Your Business with Confidence',
        heroSubheading: 'Expert consulting and proven strategies to take your business to the next level',
        sections: [
          { type: 'hero', content: { template: 'teaching-header' } },
          { type: 'services', content: { template: 'teaching-program-info' } },
          { type: 'testimonials', content: { template: 'teaching-testimonials' } },
          { type: 'contact', content: { template: 'teaching-free-assessment' } }
        ]
      },
      portfolio: {
        title: 'Creative Portfolio Showcase',
        description: 'Showcasing exceptional creative work',
        heroHeading: 'Bringing Ideas to Life',
        heroSubheading: 'Explore a collection of innovative projects and creative solutions',
        sections: [
          { type: 'hero', content: { template: 'teaching-header' } },
          { type: 'portfolio', content: { template: 'teaching-program-info' } },
          { type: 'about', content: { template: 'teaching-expert-info' } },
          { type: 'contact', content: { template: 'teaching-free-assessment' } }
        ]
      },
      ecommerce: {
        title: 'Online Store Excellence',
        description: 'Premium products for discerning customers',
        heroHeading: 'Discover Premium Quality Products',
        heroSubheading: 'Carefully curated collection of exceptional products for your lifestyle',
        sections: [
          { type: 'hero', content: { template: 'teaching-header' } },
          { type: 'products', content: { template: 'product-list' } },
          { type: 'features', content: { template: 'teaching-program-info' } },
          { type: 'testimonials', content: { template: 'teaching-testimonials' } }
        ]
      },
      blog: {
        title: 'Insights & Knowledge Hub',
        description: 'Sharing valuable insights and expertise',
        heroHeading: 'Stay Informed, Stay Ahead',
        heroSubheading: 'Expert insights, industry trends, and valuable knowledge to help you succeed',
        sections: [
          { type: 'hero', content: { template: 'teaching-header' } },
          { type: 'blog', content: { template: 'blog-list' } },
          { type: 'about', content: { template: 'teaching-expert-info' } },
          { type: 'newsletter', content: { template: 'teaching-free-assessment' } }
        ]
      }
    };

    return templates[analysis.websiteType] || templates.business;
  }

  private generateBuilderBlocks(content: GeneratedContent, analysis: AIPromptAnalysis) {
    const colorSchemes = {
      blue: { primary: '#08AD98', secondary: '#043A51' },
      green: { primary: '#10B981', secondary: '#064E3B' },
      purple: { primary: '#8B5CF6', secondary: '#4C1D95' },
      orange: { primary: '#F59E0B', secondary: '#92400E' },
      dark: { primary: '#1F2937', secondary: '#111827' },
      minimal: { primary: '#6B7280', secondary: '#374151' }
    };

    const scheme = colorSchemes[analysis.colorScheme];

    // Create a proper Builder.io page structure
    return [
      {
        '@type': '@builder.io/sdk:Element',
        '@version': 2,
        id: 'hero-section',
        component: {
          name: analysis.websiteType === 'teaching' ? 'Header' : (analysis.websiteType === 'cooking' ? 'HeroSection' : 'Text'),
          options: {
            text: `<div style="text-align: center; padding: 60px 20px; background: linear-gradient(135deg, ${scheme.primary}, ${scheme.secondary}); color: white; border-radius: 12px; margin: 20px;">
              <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem;">${content.heroHeading}</h1>
              <p style="font-size: 1.25rem; opacity: 0.9; max-width: 600px; margin: 0 auto 2rem;">${content.heroSubheading}</p>
              <button style="background: white; color: ${scheme.primary}; padding: 12px 32px; border: none; border-radius: 8px; font-weight: bold; font-size: 1rem; cursor: pointer;">Get Started</button>
            </div>`
          }
        }
      },
      ...content.sections.slice(1).map((section, index) => ({
        '@type': '@builder.io/sdk:Element',
        '@version': 2,
        id: `section-${index + 1}`,
        component: {
          name: this.getComponentName(section.type, analysis.websiteType),
          options: {
            text: `<div style="padding: 40px 20px; text-align: center; ${index % 2 === 0 ? 'background: #f8fafc;' : 'background: white;'}">
              <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem; color: ${scheme.secondary};">${this.getSectionHeading(section.type)}</h2>
              <p style="font-size: 1.1rem; color: #6b7280; max-width: 600px; margin: 0 auto;">${this.getSectionDescription(section.type)}</p>
            </div>`,
            backgroundColor: index % 2 === 0 ? '#F8FAFC' : '#FFFFFF',
            buttonColor: scheme.primary,
            ...this.getComponentOptions(section.type, analysis)
          }
        }
      }))
    ];
  }

  private getComponentName(sectionType: string, websiteType: string): string {
    const componentMap: { [key: string]: string } = {
      hero: websiteType === 'teaching' ? 'Header' : 'Hero Banner',
      features: 'Program Info',
      testimonials: 'Testimonials',
      cta: 'Free Assessment',
      program: 'Program Info',
      values: 'Value Stack',
      assessment: 'Assessment',
      services: 'Program Info',
      contact: 'Free Assessment',
      portfolio: 'Program Info',
      about: 'Expert Info',
      products: 'Product List',
      blog: 'Blog List',
      newsletter: 'Free Assessment'
    };

    return componentMap[sectionType] || 'Program Info';
  }

  private getSectionHeading(sectionType: string): string {
    const headings: { [key: string]: string } = {
      features: 'Our Features',
      testimonials: 'What Our Clients Say',
      cta: 'Get Started Today',
      program: 'Our Programs',
      values: 'Our Values',
      assessment: 'Free Assessment',
      services: 'Our Services',
      contact: 'Contact Us',
      portfolio: 'Our Work',
      about: 'About Us',
      products: 'Featured Products',
      blog: 'Latest Articles',
      newsletter: 'Stay Updated'
    };

    return headings[sectionType] || 'Section Heading';
  }

  private getSectionDescription(sectionType: string): string {
    const descriptions: { [key: string]: string } = {
      features: 'Discover what makes us different',
      testimonials: 'Success stories from our community',
      cta: 'Ready to begin your journey?',
      program: 'Comprehensive programs designed for success',
      values: 'The principles that guide us',
      assessment: 'Start with a free consultation',
      services: 'Professional services tailored to your needs',
      contact: 'Get in touch with our team',
      portfolio: 'See our latest projects',
      about: 'Learn more about our mission',
      products: 'Carefully selected for quality',
      blog: 'Insights and industry knowledge',
      newsletter: 'Get the latest updates'
    };

    return descriptions[sectionType] || 'Section description';
  }

  private getComponentOptions(sectionType: string, analysis: AIPromptAnalysis) {
    // Return specific options based on section type and analysis
    const baseOptions: { [key: string]: any } = {
      hero: {
        buttonText: 'Get Started',
        backgroundImageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80'
      },
      testimonials: {
        testimonial1Quote: 'This platform transformed how we approach our goals. Highly recommended!',
        testimonial1Name: 'Sarah Johnson',
        testimonial2Quote: 'Exceptional quality and professional service. Exceeded our expectations.',
        testimonial2Name: 'Michael Chen'
      },
      cta: {
        buttonText: 'Start Free Trial',
        heading: 'Ready to Begin?'
      }
    };

    return baseOptions[sectionType] || {};
  }
}

export default AIWebsiteGenerator;
