interface BuilderSpace {
  id: string;
  name: string;
  settings?: any;
  created?: string;
  updated?: string;
}

interface BuilderPage {
  id: string;
  name: string;
  url: string;
  data: any;
  published?: 'draft' | 'published' | 'archived';
  modelId?: string;
  spaceId?: string;
  created?: string;
  updated?: string;
}

interface CreateSpaceRequest {
  name: string;
  settings?: {
    domain?: string;
    customDomain?: string;
    allowedDomains?: string[];
  };
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

export class BuilderIOApiService {
  private readonly apiKey: string;
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

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Builder.io API Error (${response.status}):`, errorText);
        return {
          success: false,
          error: `HTTP ${response.status}: ${errorText}`,
        };
      }

      const data = await response.json();
      console.log(`✅ Builder.io API Response:`, data);
      
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
   * Create a new Builder.io space
   */
  async createSpace(request: CreateSpaceRequest): Promise<{ success: boolean; space?: BuilderSpace; error?: string }> {
    console.log('🏗️ Creating new Builder.io space:', request.name);

    const result = await this.makeRequest<BuilderSpace>('/spaces', {
      method: 'POST',
      body: JSON.stringify(request),
    });

    if (result.success && result.data) {
      console.log(`✅ Space created successfully: ${result.data.id}`);
      return {
        success: true,
        space: result.data,
      };
    }

    return {
      success: false,
      error: result.error || 'Failed to create space',
    };
  }

  /**
   * Get all spaces for the account
   */
  async getSpaces(): Promise<{ success: boolean; spaces?: BuilderSpace[]; error?: string }> {
    console.log('📋 Fetching Builder.io spaces');

    const result = await this.makeRequest<{ results: BuilderSpace[] }>('/spaces');

    if (result.success && result.data) {
      return {
        success: true,
        spaces: result.data.results || [],
      };
    }

    return {
      success: false,
      error: result.error || 'Failed to fetch spaces',
    };
  }

  /**
   * Create a new page in a specific space
   */
  async createPage(
    spaceId: string,
    request: CreatePageRequest
  ): Promise<{ success: boolean; page?: BuilderPage; error?: string }> {
    console.log(`📄 Creating new page in space ${spaceId}:`, request.name);

    const pageData = {
      name: request.name,
      url: request.url,
      data: request.data,
      published: request.published || 'draft',
      modelId: request.modelId || 'page',
      meta: request.meta || {},
    };

    const result = await this.makeRequest<BuilderPage>(`/write/${spaceId}`, {
      method: 'POST',
      body: JSON.stringify(pageData),
    });

    if (result.success && result.data) {
      console.log(`✅ Page created successfully: ${result.data.id}`);
      return {
        success: true,
        page: result.data,
      };
    }

    return {
      success: false,
      error: result.error || 'Failed to create page',
    };
  }

  /**
   * Get pages from a specific space
   */
  async getPages(spaceId: string, modelId: string = 'page'): Promise<{ success: boolean; pages?: BuilderPage[]; error?: string }> {
    console.log(`📋 Fetching pages from space ${spaceId}, model ${modelId}`);

    const result = await this.makeRequest<{ results: BuilderPage[] }>(`/content/${spaceId}/${modelId}`);

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
   * Update an existing page
   */
  async updatePage(
    spaceId: string,
    pageId: string,
    updates: Partial<CreatePageRequest>
  ): Promise<{ success: boolean; page?: BuilderPage; error?: string }> {
    console.log(`✏️ Updating page ${pageId} in space ${spaceId}`);

    const result = await this.makeRequest<BuilderPage>(`/write/${spaceId}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: pageId,
        ...updates,
      }),
    });

    if (result.success && result.data) {
      console.log(`✅ Page updated successfully: ${result.data.id}`);
      return {
        success: true,
        page: result.data,
      };
    }

    return {
      success: false,
      error: result.error || 'Failed to update page',
    };
  }

  /**
   * Delete a page
   */
  async deletePage(spaceId: string, pageId: string): Promise<{ success: boolean; error?: string }> {
    console.log(`🗑️ Deleting page ${pageId} from space ${spaceId}`);

    const result = await this.makeRequest(`/write/${spaceId}`, {
      method: 'DELETE',
      body: JSON.stringify({ id: pageId }),
    });

    if (result.success) {
      console.log(`✅ Page deleted successfully: ${pageId}`);
      return { success: true };
    }

    return {
      success: false,
      error: result.error || 'Failed to delete page',
    };
  }

  /**
   * Generate Builder.io visual editor URL for a specific page
   */
  generateEditorUrl(spaceId: string, pageId?: string, model: string = 'page'): string {
    const baseUrl = `https://builder.io/content/${spaceId}`;
    
    if (pageId) {
      return `${baseUrl}/${pageId}`;
    }
    
    return `${baseUrl}?model=${model}`;
  }

  /**
   * Generate Builder.io preview URL for a page
   */
  generatePreviewUrl(spaceId: string, pageUrl: string): string {
    return `https://${spaceId}.builder.io${pageUrl}`;
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
                    maxWidth: '1200px',
                    margin: '0 auto',
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

export default BuilderIOApiService;
