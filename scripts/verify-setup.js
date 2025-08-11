#!/usr/bin/env node

/**
 * Verify Builder.io setup and list registered components
 */

const https = require('https');

const BUILDER_API_KEY = 'ab5b460294654ac49703c8715debb464';

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'builder.io',
      path: path,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${BUILDER_API_KEY}`,
        'Content-Type': 'application/json',
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(body ? JSON.parse(body) : {});
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${body}`));
          }
        } catch (err) {
          resolve({ raw: body, status: res.statusCode });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function verifySetup() {
  console.log('🔍 Verifying Builder.io setup...');
  console.log(`📡 API Key: ${BUILDER_API_KEY}`);
  
  try {
    // Check if we can access the space
    console.log('\n📋 Checking space access...');
    const spaceInfo = await makeRequest('/api/v1/spaces');
    
    if (spaceInfo.results && spaceInfo.results.length > 0) {
      console.log(`✅ Space access confirmed`);
      console.log(`   Space ID: ${spaceInfo.results[0].id}`);
      console.log(`   Space Name: ${spaceInfo.results[0].name}`);
    } else {
      console.log('⚠️  Could not fetch space info');
    }

    // Check models
    console.log('\n📋 Checking available models...');
    const models = await makeRequest('/api/v1/models');
    
    if (models.results) {
      console.log(`✅ Found ${models.results.length} models:`);
      models.results.forEach(model => {
        console.log(`   - ${model.name}`);
      });
    }

  } catch (error) {
    console.error('❌ Setup verification failed:', error.message);
  }

  console.log('\n📖 Setup Instructions:');
  console.log('1. Make sure your dev server is running: npm run dev');
  console.log('2. In Builder.io space settings, add http://localhost:3000 to allowed origins');
  console.log('3. Your components are registered in src/builder-registry.ts');
  console.log('4. Visit https://builder.io/content to create pages with your components');
  console.log('\n🎯 Your components should appear in the Builder.io visual editor!');
}

verifySetup();
