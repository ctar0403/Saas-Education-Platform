import { NextRequest, NextResponse } from 'next/server';
import BuilderIOSimpleService from '@/lib/services/builder-io-simple';

const BUILDER_PRIVATE_API_KEY = 'bpk-1646c514b03e4c47a46d70aedae3e345';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, url, data, published, modelId, meta, content, analysis } = body;

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

    console.log(`📄 Creating Builder.io page with simple API:`, name);

    const builderService = new BuilderIOSimpleService(BUILDER_PRIVATE_API_KEY);
    
    // If content and analysis are provided, create Builder.io content structure
    let pageData = data || {};
    if (content && analysis) {
      console.log('🎨 Creating Builder.io content from generated website data');
      pageData = builderService.createBuilderContentFromGenerated(content, analysis);
    }

    const result = await builderService.createPage({
      name,
      url,
      data: pageData,
      published: published || 'draft',
      modelId: modelId || 'page',
      meta: meta || {}
    });

    if (result.success && result.page) {
      console.log('✅ Page created successfully:', result.page.id);
      
      // Generate preview URL
      const previewUrl = builderService.generatePreviewUrl(url);
      
      return NextResponse.json({
        success: true,
        page: result.page,
        spaceId: builderService.getDefaultSpaceId(),
        editorUrl: result.editorUrl,
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
    console.error('❌ Error in simple page creation API route:', error);
    
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
    console.log(`📋 Fetching pages from default Builder.io space`);

    const builderService = new BuilderIOSimpleService(BUILDER_PRIVATE_API_KEY);
    const result = await builderService.getPages();

    if (result.success && result.pages) {
      console.log(`✅ Found ${result.pages.length} pages`);
      return NextResponse.json({
        success: true,
        pages: result.pages,
        spaceId: builderService.getDefaultSpaceId()
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
    console.error('❌ Error in simple pages fetch API route:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}
