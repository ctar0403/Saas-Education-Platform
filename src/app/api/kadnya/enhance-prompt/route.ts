import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_input } = body;

    if (!user_input || typeof user_input !== 'string') {
      return NextResponse.json(
        { error: 'user_input is required and must be a string' },
        { status: 400 }
      );
    }

    const requestData = {
      user_input,
      user_id: 'demo-user-001',
      user_preference_model: 'default-model-v1'
    };

    console.log('🔍 Proxying enhance prompt request to Kadnya API');

    const response = await fetch(
      'https://backend-ai-agent.kadnya-dev.com/services/api/website_builder/enhance_prompt/',
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
    console.log('✅ Kadnya enhance prompt response received');

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('❌ Error in enhance prompt API route:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'Failed to enhance prompt'
      },
      { status: 500 }
    );
  }
}
