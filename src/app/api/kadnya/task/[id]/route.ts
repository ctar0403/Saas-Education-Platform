import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: taskId } = await params;

    if (!taskId) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      );
    }

    console.log(`🔍 Checking task status for ID: ${taskId}`);

    const response = await fetch(
      `https://backend-ai-agent.kadnya-dev.com/services/tasks/${taskId}/`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Kadnya API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log(`✅ Task status response for ${taskId}:`, result);

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('❌ Error checking task status:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'Failed to check task status'
      },
      { status: 500 }
    );
  }
}
