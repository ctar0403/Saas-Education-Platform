import { NextRequest, NextResponse } from 'next/server';
import BuilderIOAdminApiService from '@/lib/services/builder-io-admin-api';

const BUILDER_PRIVATE_API_KEY = 'bpk-1646c514b03e4c47a46d70aedae3e345';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, type } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Space name is required and must be a string' },
        { status: 400 }
      );
    }

    console.log('🏗️ Creating Builder.io space via Admin API:', name);

    const builderService = new BuilderIOAdminApiService(BUILDER_PRIVATE_API_KEY);
    const result = await builderService.createSpace({
      name,
      type: type || 'Fusion'
    });

    if (result.success && result.space) {
      console.log('✅ Space created successfully:', result.space.id);
      return NextResponse.json({
        success: true,
        space: result.space
      });
    }

    console.error('❌ Failed to create space:', result.error);
    return NextResponse.json(
      { 
        success: false,
        error: result.error || 'Failed to create space'
      },
      { status: 500 }
    );

  } catch (error) {
    console.error('❌ Error in space creation API route:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('📋 Fetching Builder.io spaces via Admin API');

    const builderService = new BuilderIOAdminApiService(BUILDER_PRIVATE_API_KEY);
    const result = await builderService.getSpaces();

    if (result.success && result.spaces) {
      console.log(`✅ Found ${result.spaces.length} spaces`);
      return NextResponse.json({
        success: true,
        spaces: result.spaces
      });
    }

    console.error('❌ Failed to fetch spaces:', result.error);
    return NextResponse.json(
      { 
        success: false,
        error: result.error || 'Failed to fetch spaces'
      },
      { status: 500 }
    );

  } catch (error) {
    console.error('❌ Error in spaces fetch API route:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}
