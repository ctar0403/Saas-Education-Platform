interface GeneratedWebsite {
  content: any;
  analysis: any;
  prompt: string;
  pageId: string;
}

interface BuilderIntegration {
  success: boolean;
  spaceId?: string;
  pageId?: string;
  editorUrl?: string;
  previewUrl?: string;
  error?: string;
}

export class WebsiteToBuilderService {
  private async ensureSpace(): Promise<{ success: boolean; spaceId?: string; error?: string }> {
    // Use the default space from the simple API
    const defaultSpaceId = 'ab5b460294654ac49703c8715debb464';
    console.log(`✅ Using default Builder.io space: ${defaultSpaceId}`);

    return {
      success: true,
      spaceId: defaultSpaceId
    };
  }

  async createBuilderPageFromWebsite(website: GeneratedWebsite): Promise<BuilderIntegration> {
    try {
      console.log('🚀 Starting Builder.io integration for generated website...');
      console.log('📊 Website data:', {
        pageId: website.pageId,
        hasContent: !!website.content,
        hasAnalysis: !!website.analysis,
        contentKeys: website.content ? Object.keys(website.content) : [],
        analysisKeys: website.analysis ? Object.keys(website.analysis) : []
      });

      // Step 1: Ensure we have a space
      const spaceResult = await this.ensureSpace();
      if (!spaceResult.success || !spaceResult.spaceId) {
        console.error('❌ Failed to ensure space:', spaceResult.error);
        return {
          success: false,
          error: spaceResult.error || 'Failed to get Builder.io space'
        };
      }

      const spaceId = spaceResult.spaceId;

      // Step 2: Create page data
      const pageName = this.generatePageName(website);
      const pageUrl = `/generated/${website.pageId}`;

      console.log(`📄 Creating page "${pageName}" at ${pageUrl}...`);

      // Step 3: Validate data before sending
      if (!website.content || !website.analysis) {
        throw new Error('Missing required website content or analysis data');
      }

      const requestBody = {
        name: pageName,
        url: pageUrl,
        content: website.content,
        analysis: website.analysis,
        published: 'draft',
        modelId: 'page',
        meta: {
          title: website.content.title || pageName,
          description: website.content.description || `AI generated ${website.analysis.websiteType} website`,
          keywords: `AI generated, ${website.analysis.websiteType}, Builder.io, ${website.analysis.features?.join(', ') || ''}`,
        }
      };

      console.log('📤 Sending request to Builder.io API...');

      // Step 4: Create the page in Builder.io using simple API
      let pageResponse: Response;
      try {
        pageResponse = await fetch('/api/builder/simple/pages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
      } catch (fetchError) {
        console.error('❌ Fetch request failed:', fetchError);
        throw new Error(`Network request failed: ${fetchError instanceof Error ? fetchError.message : 'Unknown network error'}`);
      }

      console.log(`📡 API Response status: ${pageResponse.status}`);

      let pageResult;
      try {
        // Read the response text only once
        const responseText = await pageResponse.text();
        console.log('📥 Raw API response:', responseText.substring(0, 500));

        if (!pageResponse.ok) {
          console.error(`❌ API returned error ${pageResponse.status}:`, responseText);
          throw new Error(`API Error ${pageResponse.status}: ${responseText.substring(0, 200)}`);
        }

        try {
          pageResult = JSON.parse(responseText);
        } catch (parseError) {
          console.error('❌ Failed to parse JSON:', parseError);
          throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}`);
        }
      } catch (error) {
        console.error('❌ Error processing page creation response:', error);
        throw error;
      }

      console.log('📋 Parsed API result:', pageResult);

      if (pageResult.success && pageResult.page) {
        console.log(`✅ Builder.io page created successfully: ${pageResult.page.id}`);
        console.log(`🔗 Editor URL: ${pageResult.editorUrl}`);

        return {
          success: true,
          spaceId,
          pageId: pageResult.page.id,
          editorUrl: pageResult.editorUrl,
          previewUrl: pageResult.previewUrl,
        };
      }

      console.error('❌ API returned unsuccessful result:', pageResult);
      return {
        success: false,
        error: pageResult.error || 'Failed to create Builder.io page - API returned unsuccessful result'
      };

    } catch (error) {
      console.error('❌ Error creating Builder.io page from website:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred during page creation'
      };
    }
  }

  private generatePageName(website: GeneratedWebsite): string {
    const websiteType = website.analysis.websiteType || 'website';
    const timestamp = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    // Extract key words from prompt for better naming
    const promptWords = website.prompt
      .toLowerCase()
      .split(' ')
      .filter(word => word.length > 3 && !['create', 'build', 'make', 'website', 'site'].includes(word))
      .slice(0, 2)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    if (promptWords) {
      return `${promptWords} ${websiteType.charAt(0).toUpperCase() + websiteType.slice(1)} - ${timestamp}`;
    }
    
    return `AI Generated ${websiteType.charAt(0).toUpperCase() + websiteType.slice(1)} - ${timestamp}`;
  }

  /**
   * Get or create a space and return its ID for direct Builder.io operations
   */
  async getOrCreateSpaceId(): Promise<{ success: boolean; spaceId?: string; error?: string }> {
    return this.ensureSpace();
  }

  /**
   * Generate a Builder.io editor URL for a specific page
   */
  generateEditorUrl(spaceId: string, pageId: string): string {
    return `https://builder.io/content/${spaceId}/${pageId}`;
  }

  /**
   * Generate a Builder.io preview URL for a page
   */
  generatePreviewUrl(spaceId: string, pageUrl: string): string {
    return `https://${spaceId}.builder.io${pageUrl}`;
  }

  /**
   * Test the Builder.io Admin API connection
   */
  async testConnection(): Promise<{ success: boolean; organization?: any; error?: string }> {
    try {
      console.log('🔍 Testing Builder.io Admin API connection...');
      
      const spacesResponse = await fetch('/api/builder/spaces');
      const spacesResult = await spacesResponse.json();
      
      if (spacesResult.success) {
        console.log('✅ Builder.io Admin API connection successful');
        return {
          success: true,
          organization: {
            spacesCount: spacesResult.spaces?.length || 0,
            spaces: spacesResult.spaces || []
          }
        };
      }

      return {
        success: false,
        error: spacesResult.error || 'Failed to connect to Builder.io Admin API'
      };

    } catch (error) {
      console.error('❌ Error testing Builder.io Admin API connection:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

export default WebsiteToBuilderService;
