import { BUILDER_CONFIG, REGISTERED_COMPONENTS } from '../config/builder-config';

export interface BuilderPageRequest {
  name: string;
  data?: {
    title?: string;
    description?: string;
    components?: any[];
  };
  published?: 'published' | 'draft';
  modelName?: string;
}

export interface BuilderApiResponse {
  id: string;
  name: string;
  data: any;
  published: string;
  modelName: string;
  url?: string;
  editorUrl?: string;
}

class BuilderApiService {
  private baseUrl = BUILDER_CONFIG.BASE_URL;
  private apiKey = BUILDER_CONFIG.API_KEY;

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Builder.io API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  async registerComponents() {
    try {
      const results = [];
      
      for (const component of REGISTERED_COMPONENTS) {
        const result = await this.makeRequest('/components', {
          method: 'POST',
          body: JSON.stringify(component),
        });
        results.push(result);
      }
      
      return results;
    } catch (error) {
      console.error('Error registering components:', error);
      throw error;
    }
  }

  async createPage(pageRequest: BuilderPageRequest): Promise<BuilderApiResponse> {
    try {
      // Default to page model if not specified
      const modelName = pageRequest.modelName || 'page';
      
      const requestBody = {
        name: pageRequest.name,
        data: {
          title: pageRequest.data?.title || pageRequest.name,
          description: pageRequest.data?.description || '',
          blocks: pageRequest.data?.components || [],
          ...pageRequest.data,
        },
        published: pageRequest.published || 'draft',
        modelName,
      };

      const response = await this.makeRequest(`/content/${modelName}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });

      // Add helpful URLs
      const result: BuilderApiResponse = {
        ...response,
        url: `https://builder.io/content/${response.id}`,
        editorUrl: `https://builder.io/content/${response.id}?previewing=true&spaceDomain=builder.io`,
      };

      return result;
    } catch (error) {
      console.error('Error creating page:', error);
      throw error;
    }
  }

  async generateWebsiteWithComponents(siteName: string, components: string[] = []) {
    try {
      // First register components
      await this.registerComponents();

      // Create default blocks for the selected components
      const blocks = components.map((componentName, index) => {
        const component = REGISTERED_COMPONENTS.find(c => c.name === componentName);
        if (!component) return null;

        return {
          '@type': '@builder.io/sdk:Element',
          '@version': 2,
          id: `${componentName.toLowerCase()}-${index}`,
          component: {
            name: componentName,
            options: component.inputs.reduce((acc, input) => {
              if (input.defaultValue !== undefined) {
                acc[input.name] = input.defaultValue;
              }
              return acc;
            }, {} as any),
          },
        };
      }).filter(Boolean);

      // Create the page
      const page = await this.createPage({
        name: siteName,
        data: {
          title: siteName,
          description: `Generated website: ${siteName}`,
          components: blocks,
        },
        published: 'draft',
      });

      return page;
    } catch (error) {
      console.error('Error generating website:', error);
      throw error;
    }
  }

  async getModels() {
    try {
      return await this.makeRequest('/models');
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  }
}

export const builderApiService = new BuilderApiService();
