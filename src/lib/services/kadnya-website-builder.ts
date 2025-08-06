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

  // Track backend reliability with localStorage persistence
  private getBackendFailures(): number {
    try {
      const stored = this.safeLocalStorageGet('kadnya_backend_failures');
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  }

  private getLastFailureTime(): number {
    try {
      const stored = this.safeLocalStorageGet('kadnya_last_failure_time');
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  }

  private setBackendFailures(count: number) {
    this.safeLocalStorageSet('kadnya_backend_failures', count.toString());
  }

  private setLastFailureTime(time: number) {
    this.safeLocalStorageSet('kadnya_last_failure_time', time.toString());
  }

  // Defensive localStorage helpers
  private safeLocalStorageGet(key: string): string | null {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return null;
      }
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private safeLocalStorageSet(key: string, value: string): boolean {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }

  private safeLocalStorageRemove(key: string): boolean {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  private isBackendReliable(): boolean {
    const now = Date.now();
    const thirtyMinutesAgo = now - (30 * 60 * 1000);
    const lastFailureTime = this.getLastFailureTime();
    const failureCount = this.getBackendFailures();

    // Check for emergency mode (backend appears completely broken)
    try {
      const emergencyMode = this.safeLocalStorageGet('kadnya_emergency_mode');
      const emergencyTime = this.safeLocalStorageGet('kadnya_emergency_time');

      if (emergencyMode === 'true' && emergencyTime) {
        const emergencyStart = parseInt(emergencyTime, 10);
        const twoHoursAgo = now - (2 * 60 * 60 * 1000); // Emergency mode lasts 2 hours (extended due to persistent issues)

        if (emergencyStart > twoHoursAgo) {
          console.error(`🚨 EMERGENCY MODE ACTIVE: Backend disabled for ${Math.ceil((emergencyStart + 2 * 60 * 60 * 1000 - now) / 60000)} more minutes`);
          return false; // Force demo mode
        } else {
          // Clear emergency mode after 2 hours
          this.safeLocalStorageRemove('kadnya_emergency_mode');
          this.safeLocalStorageRemove('kadnya_emergency_time');
          console.log(`✅ Emergency mode expired after 2 hours, backend can be retried`);
        }
      }
    } catch {
      // Ignore localStorage errors
    }

    // Reset failure count if it's been 2 hours since last failure (extended due to persistent backend issues)
    const twoHoursAgo = now - (2 * 60 * 60 * 1000);
    if (lastFailureTime < twoHoursAgo) {
      this.setBackendFailures(0);
      console.log(`✅ Backend failure count reset after 2 hours`);
      return true;
    }

    console.log(`🔍 Backend reliability check: ${failureCount} failures in last 2 hours (last failure: ${new Date(lastFailureTime).toLocaleTimeString()})`);

    // Be extremely conservative - consider backend unreliable if we've had ANY failure in the last 2 hours
    const isReliable = failureCount === 0;

    if (!isReliable) {
      console.warn(`⚠️ Backend marked as UNRELIABLE due to ${failureCount} recent failures`);
    }

    return isReliable;
  }

  private recordBackendFailure() {
    const now = Date.now();
    const currentFailures = this.getBackendFailures();
    const newFailureCount = currentFailures + 1;

    this.setBackendFailures(newFailureCount);
    this.setLastFailureTime(now);

    // Set emergency mode immediately after any failure (be extremely protective)
    if (newFailureCount >= 1) {
      this.safeLocalStorageSet('kadnya_emergency_mode', 'true');
      this.safeLocalStorageSet('kadnya_emergency_time', now.toString());
      console.error(`🚨 EMERGENCY MODE ACTIVATED: ${newFailureCount} failure detected - protecting users from backend issues`);
    }

    console.warn(`⚠️ Backend failure recorded. Total failures: ${newFailureCount} (will auto-skip for 30 minutes)`);
  }

  /**
   * Enhance user input prompt using Kadnya API
   */
  async enhancePrompt(userInput: string): Promise<KadnyaEnhancePromptResponse> {
    try {
      console.log('��� Enhancing prompt with Kadnya API:', userInput);

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
      const requestUrl = `${this.baseUrl}/task/${taskId}`;
      console.log(`📡 Making request to: ${requestUrl}`);

      const response = await fetch(requestUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log(`📡 Response status: ${response.status} ${response.statusText}`);

      // Handle response based on content type and status
      let responseData: any;
      let errorText: string;

      try {
        // Try to parse as JSON first
        responseData = await response.json();
      } catch (jsonError) {
        // If JSON parsing fails, try to get text
        try {
          // Clone the response to avoid "body stream already read" errors
          const clonedResponse = response.clone();
          errorText = await clonedResponse.text();
        } catch (textError) {
          errorText = `Unable to read response body: ${jsonError}`;
        }
      }

      if (!response.ok) {
        const errorMessage = errorText || (responseData ? JSON.stringify(responseData) : 'Unknown error');
        console.error(`❌ HTTP Error Response: ${errorMessage}`);
        throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`);
      }

      console.log(`✅ Task status API response:`, JSON.stringify(responseData, null, 2));

      return {
        success: true,
        data: responseData?.data || responseData
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
    onProgress?: (progress: { status: string; progress?: number }) => void,
    maxDurationMinutes: number = 5
  ): Promise<any> {
    const maxDurationMs = maxDurationMinutes * 60 * 1000; // Configurable timeout
    const initialInterval = 10000; // Start with 10 seconds
    const maxInterval = 30000; // Cap at 30 seconds

    console.log(`🎯 Starting task polling for: ${taskId} (max ${Math.round(maxDurationMs/1000/60)} minutes)`);

    const startTime = Date.now();
    let attempt = 0;
    let currentInterval = initialInterval;
    let consecutivePendingCount = 0;
    let lastStatus = 'UNKNOWN';
    const maxAttempts = Math.ceil(maxDurationMs / initialInterval) * 2; // Safety limit

    while (Date.now() - startTime < maxDurationMs && attempt < maxAttempts) {
      attempt++;
      const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);

      console.log(`🔄 Polling attempt ${attempt}/${maxAttempts} for task: ${taskId} (${elapsedSeconds}s elapsed)`);

      try {
        const statusResult = await this.checkTaskStatus(taskId);

        if (!statusResult.success) {
          console.error(`❌ Failed to check task status on attempt ${attempt}:`, statusResult.error);

          // Don't immediately fail on status check errors - could be temporary network issues
          console.log(`⏳ Network error, retrying in ${Math.round(currentInterval/1000)} seconds...`);
          await new Promise(resolve => setTimeout(resolve, currentInterval));

          // Increase interval slightly on network errors
          currentInterval = Math.min(currentInterval * 1.2, maxInterval);
          continue;
        }

        const taskData = statusResult.data;
        const status = taskData?.status;
        lastStatus = status || 'UNKNOWN';

        console.log(`📈 Task ${taskId} status: "${status}"`, taskData?.progress ? `(${taskData.progress}%)` : '');
        console.log(`📋 Full task data:`, JSON.stringify(taskData, null, 2));

        // Update progress if callback provided
        if (onProgress) {
          onProgress({
            status: status || 'UNKNOWN',
            progress: taskData?.progress
          });
        }

        // Success cases - handle both 'COMPLETED' and 'success' statuses
        if (status === 'COMPLETED' || status === 'success') {
          console.log('✅ Task completed successfully:', taskData);

          // Extract result from various possible locations
          const result = taskData.result || taskData.data || taskData.output || taskData;
          console.log('📦 Extracted result:', result);

          return result;
        }

        // Failure case
        if (status === 'FAILED') {
          console.error('❌ Task failed:', taskData);
          throw new Error(`Task failed: ${taskData?.error || taskData?.message || 'Unknown error'}`);
        }

        // Track consecutive PENDING states
        if (status === 'PENDING') {
          consecutivePendingCount++;

          // Show delay warning after 60 seconds of PENDING (but don't fail yet)
          if (elapsedSeconds > 60 && consecutivePendingCount >= 3) {
            console.warn(`⚠️ Task still in PENDING state after ${elapsedSeconds} seconds - backend may be busy`);

            if (onProgress) {
              onProgress({
                status: 'DELAYED',
                progress: undefined
              });
            }
          }

          // Warning for very slow backends (but don't fail - let it timeout naturally)
          if (elapsedSeconds > 120 && consecutivePendingCount >= 6) {
            console.warn(`🐌 Backend appears slow - task PENDING for ${elapsedSeconds} seconds (continuing to wait...)`);
          }

        } else {
          // Reset counter if we see progress
          consecutivePendingCount = 0;

          // Reset interval on progress to poll more frequently
          currentInterval = initialInterval;
        }

        // Adaptive polling intervals based on status
        if (status === 'PROGRESS' || status === 'PROCESSING' || status === 'processing') {
          console.log(`🎯 Task is actively being processed...`);
          // Use shorter intervals when actively processing
          currentInterval = Math.max(initialInterval, 15000);
        } else if (status === 'PENDING' || status === 'pending') {
          // Use longer intervals for pending tasks to reduce server load
          currentInterval = Math.min(currentInterval * 1.05, maxInterval);
        } else if (status === 'success' || status === 'COMPLETED') {
          // Task is complete, this should have been caught above but just in case
          console.log(`✅ Task completion detected in adaptive polling: ${status}`);
        } else {
          // Unknown status, use moderate interval
          console.warn(`❓ Unknown task status '${status}', using default interval`);
          currentInterval = Math.min(currentInterval * 1.02, maxInterval);
        }

      } catch (error) {
        console.error(`❌ Error during polling attempt ${attempt}:`, error);

        // Don't immediately fail on errors - could be temporary
        console.log(`⏳ Error occurred, retrying in ${Math.round(currentInterval/1000)} seconds...`);
        await new Promise(resolve => setTimeout(resolve, currentInterval));
        continue;
      }

      // Wait before next poll
      const remainingTime = maxDurationMs - (Date.now() - startTime);
      if (remainingTime > currentInterval) {
        console.log(`⏳ Task still ${lastStatus}, waiting ${Math.round(currentInterval/1000)} seconds... (${Math.round(remainingTime/1000)}s remaining)`);
        await new Promise(resolve => setTimeout(resolve, currentInterval));
      }
    }

    // If we get here, we've hit the timeout
    const totalSeconds = Math.round((Date.now() - startTime) / 1000);
    console.error(`⏰ Task polling timeout after ${attempt} attempts (${totalSeconds} seconds)`);

    // Don't automatically trigger emergency mode for natural timeouts - this is expected for slow backends
    throw new Error(`Task timeout: Task did not complete within ${Math.round(maxDurationMs/1000/60)} minutes (last status: ${lastStatus}). Backend may be experiencing high load. Task ID: ${taskId}`);
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
    onProgress?: (progress: { step: string; status: string; progress?: number }) => void,
    skipBackend: boolean = false,
    timeoutMinutes: number = 5
  ): Promise<{
    success: boolean;
    enhancedPrompt?: string;
    template?: any;
    analysis?: any;
    content?: any;
    pageId: string;
    error?: string;
    backendSkipped?: boolean;
  }> {
    try {
      console.log('🎯 Starting enhanced website generation process...');

      // Check if backend is reliable or if explicitly skipping
      const backendReliable = this.isBackendReliable();
      const currentFailures = this.getBackendFailures();
      console.log(`🔍 Backend reliability: ${backendReliable ? 'RELIABLE' : 'UNRELIABLE'}, skipBackend: ${skipBackend}, failures: ${currentFailures}`);

      // Force demo mode if backend has any recent failures (be extremely aggressive)
      const forceDemo = currentFailures >= 1; // Force demo after just 1 failure to protect users

      if (skipBackend || !backendReliable || forceDemo) {
        const reason = skipBackend ? 'explicitly requested' :
                      forceDemo ? `${currentFailures} failures - backend appears broken` :
                      `${currentFailures} recent failures detected`;
        console.log(`⚠��� Skipping backend (${reason}), generating demo content directly...`);
        console.log('⚠️ Skipping unreliable backend, generating demo content directly...');
        if (onProgress) onProgress({ step: 'fallback', status: 'SKIPPED' });

        const pageId = `demo-skip-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        return {
          success: false,
          enhancedPrompt: userInput,
          template: null,
          analysis: this.createFallbackAnalysis(userInput),
          content: this.createFallbackContent(userInput),
          pageId,
          backendSkipped: true,
          error: skipBackend ? 'Backend manually skipped' :
                 forceDemo ? `Backend force-skipped (${this.getBackendFailures()} failures - appears broken)` :
                 `Backend auto-skipped (${this.getBackendFailures()} failures)`
        };
      }

      // Step 1: Enhance the prompt (with shorter timeout)
      if (onProgress) onProgress({ step: 'enhance', status: 'PROGRESS' });

      let enhanceResult;
      try {
        enhanceResult = await Promise.race([
          this.enhancePrompt(userInput),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Enhance prompt timeout')), 15000) // 15 second timeout
          )
        ]) as any;
      } catch (enhanceError) {
        console.warn('⚠️ Prompt enhancement failed, using original:', enhanceError);
        enhanceResult = { success: false };
      }

      let finalPrompt = userInput;
      if (enhanceResult.success && enhanceResult.data?.enhanced_prompt) {
        finalPrompt = enhanceResult.data.enhanced_prompt;
        console.log('📝 Using enhanced prompt:', finalPrompt);
      }

      // Step 2: Start template generation (get task_id) with timeout
      if (onProgress) onProgress({ step: 'generate', status: 'PROGRESS' });

      let templateResult;
      try {
        templateResult = await Promise.race([
          this.generateTemplate(finalPrompt, context),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Template generation timeout')), 10000) // 10 second timeout
          )
        ]) as any;
      } catch (genError) {
        console.error('❌ Template generation request failed:', genError);
        throw new Error(`Template generation API failed: ${genError instanceof Error ? genError.message : 'Unknown error'}`);
      }

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

      try {
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
          },
          timeoutMinutes
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

      } catch (pollError) {
        console.error('❌ Task polling failed:', pollError);

        const errorMessage = pollError instanceof Error ? pollError.message : 'Unknown error';

        // Only record as backend failure for actual backend issues, not natural timeouts
        const isNaturalTimeout = errorMessage.includes('did not complete within') && errorMessage.includes('minutes');
        const isNetworkError = errorMessage.includes('Network') || errorMessage.includes('connection');
        const isBackendDown = errorMessage.includes('Backend service down') || errorMessage.includes('HTTP error');

        if (isBackendDown || isNetworkError) {
          console.warn('⚠️ Recording backend failure due to service/network issues');
          this.recordBackendFailure();
        } else if (isNaturalTimeout) {
          console.log('ℹ️ Natural timeout - backend is slow but responsive. Not recording as failure.');
        } else {
          // Unknown error type - be conservative and record it
          console.warn('⚠️ Recording backend failure due to unknown polling error');
          this.recordBackendFailure();
        }

        // If polling fails, provide fallback content but still mark as partially successful
        if (onProgress) onProgress({ step: 'fallback', status: 'TIMEOUT' });

        const pageId = `kadnya-timeout-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        console.log('🔄 Generating fallback content due to polling issue...');

        return {
          success: false, // Mark as failed due to timeout
          enhancedPrompt: finalPrompt,
          template: null,
          analysis: this.createFallbackAnalysis(finalPrompt),
          content: this.createFallbackContent(finalPrompt),
          pageId,
          error: `Task polling issue: ${errorMessage}`
        };
      }

    } catch (error) {
      console.error('❌ Enhanced website generation failed:', error);

      // Record backend failure
      this.recordBackendFailure();

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
