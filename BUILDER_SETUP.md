# Builder.io Custom Components Setup

Your custom components are already registered in the code (`src/builder-registry.ts`), but you need to connect your local development server to Builder.io so it can access them.

## Steps to Use Your Custom Components:

### 1. Start Your Development Server
```bash
npm run dev
```
Your server should be running on `http://localhost:3000`

### 2. Configure Builder.io Space Settings

1. Go to your Builder.io space: https://builder.io/content
2. Click on the **Space Settings** (⚙️ icon in the top right)
3. Go to the **"General"** tab
4. Find the **"Custom Code"** section
5. Add your development server URL to **"Allowed Origins"**:
   ```
   http://localhost:3000
   ```

### 3. Register Development URL in Builder.io

1. In your Builder.io space settings
2. Go to **"Environments"** tab  
3. Add a new environment for development:
   - **Name**: `Development`
   - **URL**: `http://localhost:3000`
   - **Preview URL**: `http://localhost:3000/[[...page]]`

### 4. Configure Component Library

1. In Builder.io, go to **"Custom Components"** section
2. Set **"Component Library URL"** to: `http://localhost:3000`
3. Enable **"Load Components from External URL"**

### 5. Verify Component Registration

Your components should now appear in the Builder.io visual editor:

**Available Components:**
- CourseList
- ProductList  
- BlogList
- CourseCard
- ProductCard
- BlogCard
- Plus all the template components (Hero Banner, Navigation, Footer, etc.)

### 6. Create a Test Page

1. In Builder.io, create a new **Page**
2. You should see your custom components in the **Components Panel** on the left
3. Drag and drop components like "CourseList" or "ProductList" onto your page
4. Configure the component properties in the **Settings Panel**

## Troubleshooting

### If components don't appear:
1. Check that `npm run dev` is running on port 3000
2. Verify your API key matches: `ab5b460294654ac49703c8715debb464`
3. Make sure the Builder.io space settings include your localhost URL
4. Try refreshing the Builder.io editor

### If you get CORS errors:
1. Ensure your localhost URL is added to "Allowed Origins" in Builder.io
2. Make sure your development server is accessible from Builder.io

### Component Registration Verification:
You can verify components are loaded by checking the browser console in Builder.io editor for any registration messages.

## Next Steps

Once your components appear in Builder.io:
1. Create pages using your custom components
2. Publish the pages 
3. Access them via your Next.js app at `http://localhost:3000/[page-url]`

Your custom components will automatically render with live data from your application!
