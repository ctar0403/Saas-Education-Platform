import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_input, context } = body;

    if (!user_input || typeof user_input !== 'string') {
      return NextResponse.json(
        { error: 'user_input is required and must be a string' },
        { status: 400 }
      );
    }

    const requestData = {
      user_input,
      user_id: 'demo-user-001',
      user_preference_model: 'default-model-v1',
      ...(context && { context })
    };

    console.log('🚀 Proxying generate template request to Kadnya API');

    const response = await fetch(
      'https://backend-ai-agent.kadnya-dev.com/services/api/website_builder/generate_template/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestData)
      }
    );

    if (!response.ok) {
      throw new Error(`Kadnya API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Kadnya generate template raw response:', JSON.stringify(result, null, 2));

    // Try to extract task_id from various possible locations
    const possibleTaskIds = [
      result.task_id,
      result.id,
      result.data?.task_id,
      result.data?.id,
      result.taskId,
      result.data?.taskId
    ];

    const task_id = possibleTaskIds.find(id => id != null);
    console.log('🔍 Extracted task_id from API response:', task_id);

    // The API now returns task_id for async processing
    return NextResponse.json({
      success: true,
      task_id: task_id,
      data: result
    });

  } catch (error) {
    console.error('❌ Error in generate template API route:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'Failed to generate template'
      },
      { status: 500 }
    );
  }
}
