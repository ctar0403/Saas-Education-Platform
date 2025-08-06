interface BuilderPage {
  id: string;
  name: string;
  data: any;
  published?: 'draft' | 'published' | 'archived';
}

interface CreatePageRequest {
  name: string;
  url: string;
  data: any;
  published?: 'draft' | 'published';
  modelId?: string;
  meta?: {
    title?: string;
    description?: string;
  };
}

export class BuilderIOSimpleService {
  private readonly apiKey: string;
  private readonly defaultSpaceId = 'ab5b460294654ac49703c8715debb464'; // Use existing space
  private readonly baseUrl = 'https://builder.io/api/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ success: boolean; data?: T; error?: string }> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      console.log(`🔗 Builder.io API Request: ${options.method || 'GET'} ${url}`);

      const response = await fetch(url, {
        ...options,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      console.log(`📡 Response status: ${response.status}`);

      // Read the response text only once
      let responseText: string;
      try {
        responseText = await response.text();
      } catch (e) {
        console.error(`❌ Failed to read response:`, e);
        return {
          success: false,
          error: `Failed to read response: ${e}`,
        };
      }

      console.log(`📥 Raw response:`, responseText.substring(0, 200));

      if (!response.ok) {
        console.error(`❌ Builder.io API Error (${response.status}):`, responseText);
        return {
          success: false,
          error: `HTTP ${response.status}: ${responseText.substring(0, 100)}`,
        };
      }

      let data: T;
      try {
        data = JSON.parse(responseText);
        console.log(`✅ Builder.io API Response:`, data);
      } catch (e) {
        console.error(`❌ Failed to parse JSON response:`, responseText);
        return {
          success: false,
          error: `Invalid JSON response: ${responseText.substring(0, 100)}`,
        };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('❌ Builder.io API Request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Create a new page in the default space
   */
  async createPage(request: CreatePageRequest): Promise<{ success: boolean; page?: BuilderPage; editorUrl?: string; error?: string }> {
    console.log(`📄 Creating new page in default space:`, request.name);

    const pageData = {
      name: request.name,
      data: {
        url: request.url,
        ...request.data,
      },
      published: request.published || 'draft',
      modelId: request.modelId || 'page',
      meta: request.meta || {},
    };

    const result = await this.makeRequest<BuilderPage>(`/write/${this.defaultSpaceId}`, {
      method: 'POST',
      body: JSON.stringify(pageData),
    });

    if (result.success && result.data) {
      const editorUrl = this.generateEditorUrl(result.data.id);
      console.log(`✅ Page created successfully: ${result.data.id}`);
      console.log(`🔗 Editor URL: ${editorUrl}`);
      
      return {
        success: true,
        page: result.data,
        editorUrl,
      };
    }

    return {
      success: false,
      error: result.error || 'Failed to create page',
    };
  }

  /**
   * Get pages from the default space
   */
  async getPages(modelId: string = 'page'): Promise<{ success: boolean; pages?: BuilderPage[]; error?: string }> {
    console.log(`📋 Fetching pages from default space, model ${modelId}`);

    const result = await this.makeRequest<{ results: BuilderPage[] }>(`/content/${this.defaultSpaceId}/${modelId}`);

    if (result.success && result.data) {
      return {
        success: true,
        pages: result.data.results || [],
      };
    }

    return {
      success: false,
      error: result.error || 'Failed to fetch pages',
    };
  }

  /**
   * Generate Builder.io visual editor URL for a specific page
   */
  generateEditorUrl(pageId: string): string {
    return `https://builder.io/content/${this.defaultSpaceId}/${pageId}`;
  }

  /**
   * Generate Builder.io preview URL for a page
   */
  generatePreviewUrl(pageUrl: string): string {
    return `https://${this.defaultSpaceId}.builder.io${pageUrl}`;
  }

  /**
   * Get the default space ID
   */
  getDefaultSpaceId(): string {
    return this.defaultSpaceId;
  }

  /**
   * Create Builder.io content data structure from generated website
   */
  createBuilderContentFromGenerated(content: any, analysis: any): any {
    const colorScheme = this.getColorScheme(analysis.colorScheme || 'blue');
    
    return {
      blocks: [
        // Hero Section
        {
          '@type': '@builder.io/sdk:Element',
          '@version': 2,
          id: 'hero-section',
          component: {
            name: 'Box',
            options: {
              style: {
                background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
                color: 'white',
                padding: '80px 20px',
                textAlign: 'center',
                minHeight: '500px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
          },
          children: [
            {
              '@type': '@builder.io/sdk:Element',
              '@version': 2,
              id: 'hero-title',
              component: {
                name: 'Text',
                options: {
                  text: content.heroHeading || 'Welcome to Your Website',
                  style: {
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    lineHeight: '1.2',
                  },
                },
              },
            },
            {
              '@type': '@builder.io/sdk:Element',
              '@version': 2,
              id: 'hero-subtitle',
              component: {
                name: 'Text',
                options: {
                  text: content.heroSubheading || 'Built with AI technology',
                  style: {
                    fontSize: '1.25rem',
                    marginBottom: '2rem',
                    opacity: 0.9,
                    maxWidth: '600px',
                  },
                },
              },
            },
            {
              '@type': '@builder.io/sdk:Element',
              '@version': 2,
              id: 'hero-cta',
              component: {
                name: 'Button',
                options: {
                  text: 'Get Started',
                  style: {
                    backgroundColor: 'white',
                    color: colorScheme.primary,
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                  },
                },
              },
            },
          ],
        },
        // Features Section
        {
          '@type': '@builder.io/sdk:Element',
          '@version': 2,
          id: 'features-section',
          component: {
            name: 'Box',
            options: {
              style: {
                padding: '60px 20px',
                backgroundColor: '#f9fafb',
                maxWidth: '1200px',
                margin: '0 auto',
              },
            },
          },
          children: [
            {
              '@type': '@builder.io/sdk:Element',
              '@version': 2,
              id: 'features-title',
              component: {
                name: 'Text',
                options: {
                  text: 'Key Features',
                  style: {
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '3rem',
                    color: '#1f2937',
                  },
                },
              },
            },
            {
              '@type': '@builder.io/sdk:Element',
              '@version': 2,
              id: 'features-grid',
              component: {
                name: 'Box',
                options: {
                  style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                  },
                },
              },
              children: (analysis.features || ['Modern Design', 'Responsive Layout', 'User Friendly']).slice(0, 3).map((feature: string, index: number) => ({
                '@type': '@builder.io/sdk:Element',
                '@version': 2,
                id: `feature-${index}`,
                component: {
                  name: 'Box',
                  options: {
                    style: {
                      backgroundColor: 'white',
                      padding: '2rem',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      textAlign: 'center',
                    },
                  },
                },
                children: [
                  {
                    '@type': '@builder.io/sdk:Element',
                    '@version': 2,
                    id: `feature-title-${index}`,
                    component: {
                      name: 'Text',
                      options: {
                        text: feature,
                        style: {
                          fontSize: '1.25rem',
                          fontWeight: 'bold',
                          color: colorScheme.primary,
                          marginBottom: '1rem',
                        },
                      },
                    },
                  },
                  {
                    '@type': '@builder.io/sdk:Element',
                    '@version': 2,
                    id: `feature-desc-${index}`,
                    component: {
                      name: 'Text',
                      options: {
                        text: `Experience the power of ${feature.toLowerCase()} in your website.`,
                        style: {
                          color: '#6b7280',
                          lineHeight: '1.6',
                        },
                      },
                    },
                  },
                ],
              })),
            },
          ],
        },
      ],
    };
  }

  private getColorScheme(colorScheme: string) {
    const schemes = {
      blue: { primary: '#3b82f6', secondary: '#1e40af' },
      green: { primary: '#10b981', secondary: '#047857' },
      purple: { primary: '#8b5cf6', secondary: '#7c3aed' },
      orange: { primary: '#f59e0b', secondary: '#d97706' },
      dark: { primary: '#1f2937', secondary: '#111827' },
      minimal: { primary: '#6b7280', secondary: '#374151' },
    };
    return schemes[colorScheme as keyof typeof schemes] || schemes.blue;
  }
}

export default BuilderIOSimpleService;
