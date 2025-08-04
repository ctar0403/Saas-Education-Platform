# Kadnya: AI-Powered Website Builder

Welcome to **Kadnya**, the next-generation AI-powered website builder that seamlessly integrates with Builder.io to provide professional website creation capabilities with intelligent automation.

## 🚀 Features

### AI-Powered Website Generation
- **Natural Language Processing**: Describe your website needs and get intelligent suggestions
- **Smart Component Selection**: AI analyzes your requirements and suggests appropriate templates
- **Content Generation**: Automatically generates relevant content based on your prompt
- **Template Customization**: AI-guided customization of existing templates

### Embedded Visual Editor
- **Real Builder.io Integration**: Direct connection to Builder.io's powerful visual editor
- **No Login Required**: Users can build websites without needing Builder.io accounts
- **Seamless Workflow**: AI prompt → Content generation → Visual editing → Publishing
- **Real-time Collaboration**: Share and collaborate on projects

### Dynamic Content System
- **Course Management**: Complete e-learning platform with courses, lessons, and progress tracking
- **Product Catalog**: E-commerce components with pricing, reviews, and inventory management
- **Blog Engine**: Content management with categories, tags, and author profiles
- **Data Binding**: Seamless integration with Builder.io data models

### Professional Templates
- **Teaching Template**: Comprehensive educational platform layout
- **Cooking Template**: Recipe and cooking instruction focused design
- **Business Template**: Professional service-oriented website structure
- **Custom Components**: Specialized components for specific industries

## 🎯 Getting Started

### 1. Homepage Experience
Visit the homepage to:
- **Describe your website** using the AI prompt interface
- **Browse templates** for inspiration and quick starts
- **Access the visual editor** directly from the interface

### 2. AI Website Generation
```
Example prompt:
"Create a portfolio website for a graphic designer with a dark theme, 
portfolio gallery, contact form, and blog section"
```

The AI will:
1. Analyze your requirements
2. Generate appropriate content
3. Select matching components
4. Create a website structure
5. Open the visual editor with your customized site

### 3. Visual Editor
- **Drag & Drop**: Build pages with intuitive visual interface
- **Component Library**: Access all Kadnya dynamic components
- **Real-time Preview**: See changes instantly across all devices
- **Builder.io Integration**: Full access to Builder.io's features

## 🛠️ Technical Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **CMS**: Builder.io Integration
- **AI**: Custom AI prompt analysis and content generation
- **Dynamic Content**: Custom component system with data binding

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Enhanced homepage with AI
│   ├── visual-editor/              # Embedded Builder.io editor
│   ├── dynamic-demo/               # Component demonstration
│   ├── course/[slug]/              # Dynamic course pages
│   ├── product/[slug]/             # Dynamic product pages
│   ├── blog/[slug]/                # Dynamic blog pages
│   └── templates/                  # Template showcases
├── components/
│   ├── dynamic/                    # Dynamic content components
│   ├── ui/                         # Base UI components
│   └── BuilderIntegration/         # Builder.io helpers
├── lib/
│   ├── ai-website-generator.ts     # AI generation logic
│   └── data-binding.ts             # Data integration utilities
└── builder-registry.ts            # Component registration
```

## 🎨 Component Library

### Individual Components
- **Course Card**: Display course information with enrollment options
- **Product Card**: Product showcase with pricing and purchasing
- **Blog Card**: Article preview with author and reading time
- **Dynamic Product Card**: Enhanced product display for Builder.io

### List Components
- **Course List**: Filterable course catalog with search
- **Product List**: E-commerce product grid with sorting
- **Blog List**: Article listing with category filtering

### Template Components
- **Teaching Components**: Educational platform elements
- **Cooking Components**: Recipe and cooking instruction layouts
- **Navigation**: Responsive navigation bars
- **Footers**: Professional footer designs

## 🔧 Setup & Configuration

### Environment Variables
```env
NEXT_PUBLIC_BUILDER_API_KEY=your_builder_api_key
NEXT_PUBLIC_BUILDER_SPACE_ID=your_space_id (optional)
```

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Builder.io Setup
1. Create a Builder.io account
2. Set up data models for Course, Product, Blog
3. Register components using the provided component registry
4. Configure API keys in environment variables

## 🌟 Key Features

### AI-Powered Generation
- **Smart Analysis**: Understands user intent from natural language
- **Template Matching**: Selects appropriate templates based on requirements
- **Content Creation**: Generates relevant text content automatically
- **Component Suggestions**: Recommends optimal component combinations

### Visual Builder Integration
- **Embedded Editor**: Builder.io editor embedded directly in Kadnya
- **Real-time Sync**: Changes reflect immediately across platforms
- **Component Access**: All Kadnya components available in Builder.io
- **Data Connectivity**: Seamless data model integration

### Dynamic Content
- **Data Binding**: Connect components to live data sources
- **Search & Filtering**: Built-in search and category filtering
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **SEO Optimization**: Automatic meta tag and structured data generation

## 📱 User Experience

### For Content Creators
- **No Technical Knowledge Required**: Build websites using natural language
- **Professional Results**: High-quality output with minimal effort
- **Flexible Workflow**: Choose between AI generation, templates, or manual building

### For Developers
- **Component System**: Extensible component architecture
- **TypeScript Support**: Full type safety and IntelliSense
- **API Integration**: Easy connection to external data sources
- **Custom Components**: Ability to add specialized functionality

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel --prod
```

### Other Platforms
- **Netlify**: Full support with environment variable configuration
- **AWS Amplify**: Compatible with SSR and static generation
- **Traditional Hosting**: Build static version with `npm run build`

## 📊 Performance

- **Core Web Vitals**: Optimized for Google's performance metrics
- **Image Optimization**: Automatic image compression and sizing
- **Code Splitting**: Efficient loading with dynamic imports
- **Caching Strategy**: Smart caching for improved load times

## 🔗 Links

- **Live Demo**: [Dynamic Components Demo](/dynamic-demo)
- **Visual Editor**: [Try the Editor](/visual-editor)
- **Documentation**: [Complete Guide](./EMBEDDED_EDITOR_GUIDE.md)
- **Component Guide**: [Dynamic Content Guide](./DYNAMIC_CONTENT_GUIDE.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For technical support or questions:
- Check the [documentation](./EMBEDDED_EDITOR_GUIDE.md)
- Review the [integration guide](./DYNAMIC_CONTENT_GUIDE.md)
- Test components at [/dynamic-demo](/dynamic-demo)
- Contact the Kadnya team for advanced configuration needs

---

**Kadnya** - Transforming ideas into beautiful websites with AI-powered intelligence.
