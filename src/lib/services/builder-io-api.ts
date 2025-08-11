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
        let errorText: string;
        try {
          // Clone for JSON attempt
          const jsonClone = response.clone();
          const errorData = await jsonClone.json();
          errorText = typeof errorData === 'string' ? errorData : JSON.stringify(errorData);
        } catch {
          // If JSON parsing fails, clone again for text
          const textClone = response.clone();
          errorText = await textClone.text();
        }

        console.error(`❌ Builder.io API Error (${response.status}):`, errorText);
        return {
          success: false,
          error: `HTTP ${response.status}: ${errorText}`,
        };
      }

      // Clone for successful response
      const successClone = response.clone();
      const data = await successClone.json();
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
    console.log(`📄 Creating new page:`, request.name);

    const pageData = {
      name: request.name,
      published: request.published || 'draft',
      query: [
        {
          property: 'urlPath',
          operator: 'is',
          value: request.url
        }
      ],
      data: request.data,
      meta: request.meta || {},
    };

    const result = await this.makeRequest<BuilderPage>('/write/page', {
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
    const features = analysis.features || ['Modern Design', 'Responsive Layout', 'User Friendly'];

    return {
      blocks: [
        // Hero Banner Component
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'Hero Banner',
            options: {
              title: content.heroHeading || 'Welcome to Your AI Site',
              subtitle: content.heroSubheading || 'Generated from your prompt',
              image: 'https://source.unsplash.com/random/1200x600'
            }
          }
        },
        // Program Info Component
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'Program Info',
            options: {
              heading: 'What You\'ll Get',
              items: features.map(feature => feature.replace(/&/g, '&amp;'))
            }
          }
        },
        // Footer Component
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'Footer',
            options: {
              text: '© 2025 AI Generated Website'
            }
          }
        }
      ]
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
