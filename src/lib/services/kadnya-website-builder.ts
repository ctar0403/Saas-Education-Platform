export interface KadnyaTemplateRequest {
  user_input: string;
  user_id?: string;
  user_preference_model?: string;
  context?: any;
}

export interface KadnyaEnhancePromptRequest {
  user_input: string;
  user_id?: string;
  user_preference_model?: string;
}

export interface KadnyaTemplateResponse {
  success: boolean;
  task_id?: string;
  data?: {
    template: any;
    analysis?: any;
    content?: any;
    metadata?: any;
  };
  error?: string;
  message?: string;
}

export interface KadnyaTaskStatus {
  success: boolean;
  data?: {
    id: string;
    status: 'PENDING' | 'PROGRESS' | 'COMPLETED' | 'FAILED';
    result?: any;
    error?: any;
    progress?: number;
  };
  error?: string;
  message?: string;
}

export interface KadnyaEnhancePromptResponse {
  success: boolean;
  data?: {
    enhanced_prompt: string;
    suggestions?: string[];
    analysis?: any;
  };
  error?: string;
  message?: string;
}

export class KadnyaWebsiteBuilderService {
  private baseUrl = '/api/kadnya';  // Use internal API routes to avoid CORS

  // Fixed values for user_id and user_preference_model as mentioned
  private defaultUserId = 'demo-user-001';
  private defaultUserPreferenceModel = 'default-model-v1';

  /**
   * Enhance user input prompt using Kadnya API
   */
  async enhancePrompt(userInput: string): Promise<KadnyaEnhancePromptResponse> {
    try {
      console.log('🔍 Enhancing prompt with Kadnya API:', userInput);

      const requestData = {
        user_input: userInput
      };

      const response = await fetch(`${this.baseUrl}/enhance-prompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      console.log('✅ Prompt enhanced successfully:', result);
      
      return {
        success: true,
        data: result
      };

    } catch (error) {
      console.error('❌ Error enhancing prompt:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'Failed to enhance prompt'
      };
    }
  }

  /**
   * Check task status by ID
   */
  async checkTaskStatus(taskId: string): Promise<KadnyaTaskStatus> {
    try {
      console.log(`🔍 Checking task status for: ${taskId}`);

      const response = await fetch(`${this.baseUrl}/task/${taskId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log(`✅ Task status checked:`, result);

      return {
        success: true,
        data: result.data || result
      };

    } catch (error) {
      console.error('❌ Error checking task status:', error);

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'Failed to check task status'
      };
    }
  }

  /**
   * Poll task status until completion
   */
  async pollTaskUntilComplete(
    taskId: string,
    onProgress?: (progress: { status: string; progress?: number }) => void
  ): Promise<any> {
    const maxAttempts = 20; // 20 attempts = 10 minutes max
    const pollInterval = 30000; // 30 seconds

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      console.log(`🔄 Polling attempt ${attempt}/${maxAttempts} for task: ${taskId}`);

      const statusResult = await this.checkTaskStatus(taskId);

      if (!statusResult.success) {
        throw new Error(`Failed to check task status: ${statusResult.error}`);
      }

      const taskData = statusResult.data;
      const status = taskData?.status;

      // Update progress if callback provided
      if (onProgress) {
        onProgress({
          status: status || 'UNKNOWN',
          progress: taskData?.progress
        });
      }

      if (status === 'COMPLETED') {
        console.log('✅ Task completed successfully');
        return taskData.result;
      }

      if (status === 'FAILED') {
        throw new Error(`Task failed: ${taskData?.error || 'Unknown error'}`);
      }

      // Wait before next poll (except on last attempt)
      if (attempt < maxAttempts) {
        console.log(`⏳ Task still ${status}, waiting 30 seconds...`);
        await new Promise(resolve => setTimeout(resolve, pollInterval));
      }
    }

    throw new Error('Task polling timeout - maximum attempts reached');
  }

  /**
   * Generate website template using Kadnya API
   */
  async generateTemplate(
    userInput: string, 
    context?: any
  ): Promise<KadnyaTemplateResponse> {
    try {
      console.log('🚀 Generating template with Kadnya API:', userInput);

      const requestData = {
        user_input: userInput,
        ...(context && { context })
      };

      const response = await fetch(`${this.baseUrl}/generate-template`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('✅ Template generation API response:', JSON.stringify(result, null, 2));

      // Try different possible paths for task_id in the response
      const possibleTaskIds = [
        result.task_id,
        result.data?.task_id,
        result.id,
        result.data?.id,
        result.taskId,
        result.data?.taskId
      ];

      const task_id = possibleTaskIds.find(id => id != null);

      console.log('🔍 Extracted task_id:', task_id);

      return {
        success: true,
        task_id: task_id,
        data: result
      };

    } catch (error) {
      console.error('❌ Error generating template:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'Failed to generate template'
      };
    }
  }

  /**
   * Generate website template with enhanced prompt (async with polling)
   * This combines enhance_prompt, generate_template, and task polling
   */
  async generateWebsiteWithEnhancedPrompt(
    userInput: string,
    context?: any,
    onProgress?: (progress: { step: string; status: string; progress?: number }) => void
  ): Promise<{
    success: boolean;
    enhancedPrompt?: string;
    template?: any;
    analysis?: any;
    content?: any;
    pageId: string;
    error?: string;
  }> {
    try {
      console.log('🎯 Starting enhanced website generation process...');

      // Step 1: Enhance the prompt
      if (onProgress) onProgress({ step: 'enhance', status: 'PROGRESS' });

      const enhanceResult = await this.enhancePrompt(userInput);

      let finalPrompt = userInput;
      if (enhanceResult.success && enhanceResult.data?.enhanced_prompt) {
        finalPrompt = enhanceResult.data.enhanced_prompt;
        console.log('📝 Using enhanced prompt:', finalPrompt);
      }

      // Step 2: Start template generation (get task_id)
      if (onProgress) onProgress({ step: 'generate', status: 'PROGRESS' });

      const templateResult = await this.generateTemplate(finalPrompt, context);

      console.log('🔍 Template generation result:', JSON.stringify(templateResult, null, 2));

      if (!templateResult.success) {
        console.error('❌ Template generation failed:', templateResult.error || templateResult.message);
        throw new Error(templateResult.error || templateResult.message || 'Template generation API call failed');
      }

      if (!templateResult.task_id) {
        console.error('❌ No task_id received from template generation:', templateResult);
        console.log('⚠️ Attempting to continue with fallback content...');

        // If no task_id, try to use direct response data or fallback
        if (templateResult.data) {
          console.log('📄 Using direct API response data as fallback');
          const pageId = `kadnya-direct-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

          return {
            success: true,
            enhancedPrompt: finalPrompt,
            template: templateResult.data,
            analysis: this.createFallbackAnalysis(finalPrompt),
            content: this.createFallbackContent(finalPrompt),
            pageId
          };
        }

        throw new Error('No task_id received from Kadnya API and no fallback data available');
      }

      // Step 3: Poll task until completion
      if (onProgress) onProgress({ step: 'processing', status: 'PROGRESS' });

      const taskResult = await this.pollTaskUntilComplete(
        templateResult.task_id,
        (taskProgress) => {
          if (onProgress) {
            onProgress({
              step: 'processing',
              status: taskProgress.status,
              progress: taskProgress.progress
            });
          }
        }
      );

      const pageId = `kadnya-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Transform result to our expected format
      const transformedResult = this.transformApiResponse(taskResult, finalPrompt);

      if (onProgress) onProgress({ step: 'complete', status: 'COMPLETED' });

      return {
        success: true,
        enhancedPrompt: finalPrompt,
        template: taskResult,
        analysis: transformedResult.analysis,
        content: transformedResult.content,
        pageId
      };

    } catch (error) {
      console.error('❌ Enhanced website generation failed:', error);

      if (onProgress) onProgress({ step: 'error', status: 'FAILED' });

      // Return working fallback content
      const pageId = `fallback-${Date.now()}`;

      console.log('🔄 Generating fallback website content...');

      return {
        success: false, // Mark as failed but still provide content
        error: error instanceof Error ? error.message : 'Unknown error',
        enhancedPrompt: userInput,
        pageId,
        content: this.createFallbackContent(userInput),
        analysis: this.createFallbackAnalysis(userInput),
        template: null
      };
    }
  }

  /**
   * Create fallback content structure for demo/error cases
   */
  private createFallbackContent(prompt: string) {
    return {
      title: 'Generated Website',
      description: 'AI-generated website based on your requirements',
      heroHeading: 'Welcome to Your New Website',
      heroSubheading: 'Built with AI technology to meet your specific needs',
      sections: [
        {
          type: 'hero',
          content: {
            title: 'Welcome to Your New Website',
            subtitle: 'Built with AI technology to meet your specific needs'
          }
        },
        {
          type: 'features',
          content: {
            title: 'Key Features',
            description: 'Everything you need for a successful online presence'
          }
        },
        {
          type: 'cta',
          content: {
            title: 'Get Started Today',
            description: 'Ready to take your business to the next level?'
          }
        }
      ]
    };
  }

  /**
   * Create fallback analysis structure for demo/error cases
   */
  private createFallbackAnalysis(prompt: string) {
    const promptLower = prompt.toLowerCase();
    
    let websiteType = 'business';
    if (promptLower.includes('teach') || promptLower.includes('course')) {
      websiteType = 'teaching';
    } else if (promptLower.includes('cook') || promptLower.includes('recipe')) {
      websiteType = 'cooking';
    } else if (promptLower.includes('portfolio')) {
      websiteType = 'portfolio';
    } else if (promptLower.includes('shop') || promptLower.includes('store')) {
      websiteType = 'ecommerce';
    }

    return {
      websiteType,
      industry: 'general',
      targetAudience: 'general audience',
      features: ['modern design', 'responsive layout', 'user-friendly'],
      colorScheme: 'blue',
      tone: 'professional',
      pages: ['home', 'about', 'contact']
    };
  }

  /**
   * Transform Kadnya API response to our expected format
   */
  transformApiResponse(apiResponse: any, originalPrompt: string) {
    // Transform the API response to match our preview page expectations
    // This will depend on the actual structure of Kadnya's API response
    
    return {
      content: apiResponse.template?.content || this.createFallbackContent(originalPrompt),
      analysis: apiResponse.analysis || this.createFallbackAnalysis(originalPrompt),
      metadata: apiResponse.metadata || {}
    };
  }
}

export default KadnyaWebsiteBuilderService;
