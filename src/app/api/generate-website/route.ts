import { NextRequest, NextResponse } from 'next/server';
import { OpenAIContentService } from '@/lib/services/openai-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    // Get OpenAI API key from environment
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      console.error('❌ OPENAI_API_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Generate website content using OpenAI
    console.log('📝 Generating website content for prompt:', prompt);
    const openaiService = new OpenAIContentService(openaiApiKey);
    const content = await openaiService.generateWebsiteContent(prompt);

    console.log('✅ Website content generated successfully');
    return NextResponse.json({ content });

  } catch (error) {
    console.error('❌ Error generating website content:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate website content',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'AI Website Generator API endpoint. Use POST to generate content.' },
    { status: 200 }
  );
}
