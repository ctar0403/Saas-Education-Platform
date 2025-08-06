import { NextRequest, NextResponse } from 'next/server';
import BuilderIOAdminApiService from '@/lib/services/builder-io-admin-api';

const BUILDER_PRIVATE_API_KEY = 'bpk-1646c514b03e4c47a46d70aedae3e345';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { spaceId, name, url, data, published, modelId, meta, content, analysis } = body;

    if (!spaceId || typeof spaceId !== 'string') {
      return NextResponse.json(
        { error: 'spaceId is required and must be a string' },
        { status: 400 }
      );
    }

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Page name is required and must be a string' },
        { status: 400 }
      );
    }

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'Page URL is required and must be a string' },
        { status: 400 }
      );
    }

    console.log(`📄 Creating Builder.io page in space ${spaceId} via Admin API:`, name);

    const builderService = new BuilderIOAdminApiService(BUILDER_PRIVATE_API_KEY);
    
    // If content and analysis are provided, create Builder.io content structure
    let pageData = data || {};
    if (content && analysis) {
      console.log('🎨 Creating Builder.io content from generated website data');
      pageData = builderService.createBuilderContentFromGenerated(content, analysis);
    }

    const result = await builderService.createPage(spaceId, {
      name,
      url,
      data: pageData,
      published: published || 'draft',
      modelId: modelId || 'page',
      meta: meta || {}
    });

    if (result.success && result.page) {
      console.log('✅ Page created successfully:', result.page.id);
      
      // Generate editor URL for the created page
      const editorUrl = builderService.generateEditorUrl(spaceId, result.page.id);
      const previewUrl = builderService.generatePreviewUrl(spaceId, url);
      
      return NextResponse.json({
        success: true,
        page: result.page,
        editorUrl,
        previewUrl
      });
    }

    console.error('❌ Failed to create page:', result.error);
    return NextResponse.json(
      { 
        success: false,
        error: result.error || 'Failed to create page'
      },
      { status: 500 }
    );

  } catch (error) {
    console.error('❌ Error in page creation API route:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const spaceId = searchParams.get('spaceId');
    const modelId = searchParams.get('modelId') || 'page';

    if (!spaceId) {
      return NextResponse.json(
        { error: 'spaceId query parameter is required' },
        { status: 400 }
      );
    }

    console.log(`📋 Fetching pages from space ${spaceId}, model ${modelId} via Admin API`);

    const builderService = new BuilderIOAdminApiService(BUILDER_PRIVATE_API_KEY);
    const result = await builderService.getPages(spaceId, modelId);

    if (result.success && result.pages) {
      console.log(`✅ Found ${result.pages.length} pages`);
      return NextResponse.json({
        success: true,
        pages: result.pages
      });
    }

    console.error('❌ Failed to fetch pages:', result.error);
    return NextResponse.json(
      { 
        success: false,
        error: result.error || 'Failed to fetch pages'
      },
      { status: 500 }
    );

  } catch (error) {
    console.error('❌ Error in pages fetch API route:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}
