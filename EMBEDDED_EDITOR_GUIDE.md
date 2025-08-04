# Embedded Visual Editor Guide

This guide explains how to use the embedded visual editor that's been integrated directly into your website, allowing users to build and customize websites without leaving your platform.

## 🎯 Overview

The embedded visual editor provides:
- **AI-Powered Website Generation** - Users can describe their website needs and get AI-generated suggestions
- **Drag & Drop Interface** - Visual page building with component library
- **Real-time Preview** - See changes immediately across different devices
- **Template Integration** - Start from professional templates or build from scratch
- **Builder.io Integration** - Seamless connection with Builder.io's powerful CMS

## 🚀 Getting Started

### 1. Access the Visual Editor

Users can access the visual editor in three ways:

#### From Homepage AI Prompt:
1. Enter a description in the AI prompt box
2. Click "Generate Website with AI"
3. The editor opens with AI suggestions applied

#### Direct Access:
1. Click "Go to Visual Editor Panel" button on homepage
2. Start with a blank canvas or choose components

#### From Templates:
1. Select a template from the homepage
2. Customize it in the visual editor

### 2. Homepage Features

The enhanced homepage includes:

#### AI Prompt Section
- **Large textarea** for describing website requirements
- **AI processing** with loading states
- **Smart suggestions** based on user input
- **Direct integration** to visual editor with context

#### Visual Editor Access
- **Prominent call-to-action** button
- **Feature highlights** (drag & drop, custom code, theming, real-time preview)
- **Preview mockup** showing the editor interface

#### Enhanced Templates
- **Professional designs** for cooking and teaching
- **Dynamic components demo** with interactive elements
- **Hover effects** and smooth transitions
- **Clear categorization** with tags and descriptions

## 🛠️ Visual Editor Interface

### Left Sidebar - Building Tools

#### Components Tab
- **Layout Components**: Section, Container, Grid, Flex
- **Content Components**: Heading, Text, Image, Button
- **Dynamic Content**: Course Card, Product Card, Blog Card, Lists
- **Template Components**: Teaching Header, Cooking Hero, Navigation, Footer

#### Pages Tab
- **Page Management**: Create, edit, and organize multiple pages
- **Navigation Structure**: Set up site hierarchy
- **URL Configuration**: Custom paths and routing

#### Style Tab
- **Theme Selection**: Choose from predefined color schemes
- **Typography**: Select fonts and text styling
- **SEO Settings**: Meta titles and descriptions

#### Builder Tab (New!)
- **Integration Status**: Real-time connection monitoring
- **Component Registry**: See all available Builder.io components
- **Quick Actions**: Access Builder Studio, documentation, demos
- **Setup Guide**: Step-by-step integration instructions

### Center Canvas
- **Device Preview**: Mobile, Tablet, Desktop responsive views
- **Live Editing**: Click to edit text, drag to move elements
- **Visual Guidelines**: Alignment guides and spacing helpers
- **Real-time Updates**: See changes immediately

### Right Sidebar - Properties
- **Element Properties**: Styling, spacing, sizing controls
- **Background Settings**: Colors, gradients, images
- **Layout Controls**: Margin, padding, positioning
- **Quick Actions**: Export code, share preview, custom CSS

### Top Navigation
- **Project Name**: Editable project title
- **Version Control**: Undo/Redo functionality
- **Device Toggle**: Quick switching between screen sizes
- **Preview Mode**: Toggle between edit and preview modes
- **Publish**: Deploy changes to live website

## 🤖 AI-Powered Features

### Smart Website Generation
```
Example prompts:
"Create a portfolio website for a photographer with dark theme and gallery"
"Build a restaurant website with menu, reservations, and contact form"
"Make an e-commerce site for handmade jewelry with product catalog"
```

### AI Suggestions
- **Layout Recommendations**: Based on content type and industry
- **Color Scheme Suggestions**: Matching brand and content
- **Component Recommendations**: Best practices for user goals
- **Content Structure**: Optimal page organization

## 🔧 Technical Implementation

### Frontend Architecture
```
src/
├── app/
│   ├── page.tsx                    # Enhanced homepage
│   └── visual-editor/
│       └── page.tsx                # Embedded editor interface
├── components/
│   ├── BuilderIntegration/         # Builder.io connection helpers
│   ├── dynamic/                    # Dynamic content components
│   └── ui/                         # Reusable UI components
```

### Key Features
- **Next.js 15 Compatibility**: Full support for latest Next.js features
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Performance Optimized**: Lazy loading and efficient component rendering
- **SEO Ready**: Proper meta tags and structured data generation

### Builder.io Integration
- **Custom Components**: All template and dynamic components registered
- **Data Models**: Support for Course, Product, Blog content types
- **Dynamic Routing**: Automatic page generation for content entries
- **Real-time Sync**: Changes reflect immediately across platforms

## 📱 User Experience

### Onboarding Flow
1. **Welcome**: AI prompt introduction with examples
2. **Choice**: AI generation vs. manual building vs. templates
3. **Guidance**: Contextual tips and tutorials
4. **Publishing**: Simple deployment process

### Key Benefits
- **No Login Required**: Users don't need Builder.io accounts
- **Unified Experience**: Everything happens within your website
- **Professional Results**: High-quality output with minimal effort
- **Flexible Workflow**: Support for different user skill levels

## 🎨 Customization Options

### Theming
- **Predefined Themes**: Professional color combinations
- **Custom Colors**: Brand-specific color palettes
- **Typography**: Web font integration and pairing
- **Responsive Design**: Automatic mobile optimization

### Component Library
- **Template Components**: Pre-built sections for specific industries
- **Dynamic Components**: Data-driven content blocks
- **UI Components**: Basic building blocks (buttons, forms, etc.)
- **Custom Components**: Ability to add specialized functionality

## 🚀 Advanced Features

### Data Integration
- **CMS Connection**: Link to Builder.io data models
- **External APIs**: Connect to third-party services
- **Dynamic Content**: Auto-updating content from databases
- **Form Handling**: Contact forms and lead generation

### Publishing Options
- **Instant Deploy**: One-click publishing to live site
- **Preview Links**: Shareable staging URLs
- **Version Control**: Multiple versions and rollback capability
- **Custom Domains**: Connect to user's own domain

## 🔍 Monitoring & Analytics

### Integration Status
- **Real-time Monitoring**: Connection health and API status
- **Component Registry**: Track available components and usage
- **Error Handling**: Graceful fallbacks and error messages
- **Performance Metrics**: Load times and user engagement

### User Feedback
- **Usage Analytics**: Track which features are most popular
- **Error Reporting**: Automatic bug detection and reporting
- **User Journey**: Understand how users build their websites
- **Success Metrics**: Measure completion rates and satisfaction

## 🛡️ Security & Performance

### Data Protection
- **API Key Management**: Secure handling of Builder.io credentials
- **User Data**: Privacy-compliant data handling
- **CORS Configuration**: Proper cross-origin resource sharing
- **Rate Limiting**: Prevent API abuse and ensure stability

### Performance Optimization
- **Code Splitting**: Load only necessary components
- **Image Optimization**: Automatic image compression and sizing
- **Caching Strategy**: Smart caching for improved load times
- **CDN Integration**: Fast global content delivery

## 🚀 Getting Started Checklist

- [ ] Set up Builder.io API key in environment variables
- [ ] Configure data models for Course, Product, Blog
- [ ] Test AI prompt functionality
- [ ] Verify component registration in Builder.io
- [ ] Set up custom domain (optional)
- [ ] Configure analytics and monitoring
- [ ] Train users on the interface
- [ ] Set up support documentation

## 📞 Support

For technical issues or questions:
- Check the [Integration Status](#monitoring--analytics) in the Builder tab
- Review the [Dynamic Content Guide](./DYNAMIC_CONTENT_GUIDE.md)
- Test components at `/dynamic-demo`
- Contact support for advanced configuration needs

## 🔮 Future Enhancements

Planned features:
- **Advanced AI**: More sophisticated website generation
- **Team Collaboration**: Multi-user editing and permissions
- **Version History**: Detailed change tracking and branching
- **White-label Options**: Fully customizable interface branding
- **Advanced Integrations**: E-commerce, CRM, and marketing tools
