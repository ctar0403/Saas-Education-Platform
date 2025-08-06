import { NextRequest, NextResponse } from 'next/server';

const BUILDER_PRIVATE_API_KEY = 'bpk-1646c514b03e4c47a46d70aedae3e345';

export async function GET() {
  try {
    console.log('🔍 Testing Builder.io API connection...');

    // Test 1: Check me endpoint
    console.log('Testing /me endpoint...');
    const meResponse = await fetch('https://builder.io/api/v1/me', {
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Me response status:', meResponse.status);
    const meText = await meResponse.text();
    console.log('Me response text:', meText);

    let meData;
    try {
      meData = JSON.parse(meText);
    } catch (e) {
      console.error('Failed to parse me response as JSON');
    }

    // Test 2: Check content API with specific space
    const testSpaceId = 'ab5b460294654ac49703c8715debb464'; // Using the space ID from your config
    console.log('Testing content API...');
    const contentResponse = await fetch(`https://builder.io/api/v1/content/${testSpaceId}/page`, {
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Content response status:', contentResponse.status);
    const contentText = await contentResponse.text();
    console.log('Content response text:', contentText);

    // Test 3: Try to create a page in the space
    console.log('Testing page creation...');
    const createResponse = await fetch(`https://builder.io/api/v1/write/${testSpaceId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `Test Page ${Date.now()}`,
        data: {
          url: `/test-page-${Date.now()}`,
          title: 'Test Page'
        },
        modelId: 'page'
      }),
    });

    console.log('Create response status:', createResponse.status);
    const createText = await createResponse.text();
    console.log('Create response text:', createText);

    return NextResponse.json({
      success: true,
      tests: {
        me: {
          status: meResponse.status,
          data: meData,
          raw: meText.substring(0, 200)
        },
        content: {
          status: contentResponse.status,
          raw: contentText.substring(0, 200)
        },
        create: {
          status: createResponse.status,
          raw: createText.substring(0, 200)
        }
      }
    });

  } catch (error) {
    console.error('❌ Error testing Builder.io API:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}
