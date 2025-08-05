export interface GeneratedContent {
  websiteType: string;
  title: string;
  description: string;
  colorScheme: string;
  components: GeneratedComponent[];
}

export interface GeneratedComponent {
  type: 'hero' | 'about' | 'features' | 'testimonials' | 'contact' | 'footer' | 'gallery' | 'pricing' | 'navbar' | 'program-info' | 'pain-point' | 'value-stack' | 'assessment' | 'help-section' | 'mission' | 'worth-it' | 'how-it-works';
  name: string;
  props: Record<string, any>;
  order: number;
}

export class OpenAIContentService {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateWebsiteContent(prompt: string): Promise<GeneratedContent> {
    const systemPrompt = `You are a professional web designer specializing in cooking class and educational websites. Convert user prompts into structured website content using Builder.io registered components.

Based on the user's prompt, generate a JSON response with this exact structure:

{
  "websiteType": "cooking|teaching|portfolio|business|blog|ecommerce",
  "title": "Main website title",
  "description": "Brief website description",
  "colorScheme": "blue|green|purple|orange|red|dark",
  "components": [
    {
      "type": "navbar",
      "name": "Navbar",
      "props": {
        "logoColor": "#2D5530",
        "nav1Title": "Home",
        "nav1Href": "/",
        "nav2Title": "About",
        "nav2Href": "/about",
        "nav3Title": "Classes",
        "nav3Href": "/classes",
        "nav4Title": "Contact",
        "nav4Href": "/contact",
        "buttonText": "Book Now",
        "buttonColor": "#FF6B35"
      },
      "order": 1
    },
    {
      "type": "hero",
      "name": "Hero Banner",
      "props": {
        "heading": "Main hero title",
        "subheading": "Hero subtitle/description",
        "buttonText": "Call-to-action text",
        "buttonLink": "#contact",
        "backgroundImageUrl": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop&crop=center&q=80"
      },
      "order": 2
    },
    {
      "type": "program-info",
      "name": "Program Info",
      "props": {
        "title": "Program title",
        "description": "Program description",
        "point1": "Program benefit 1",
        "point2": "Program benefit 2",
        "point3": "Program benefit 3",
        "point4": "Program benefit 4",
        "point5": "Program benefit 5",
        "buttonText": "Learn More",
        "buttonLink": "#contact",
        "imageUrl": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop&crop=center&q=80"
      },
      "order": 3
    },
    {
      "type": "pain-point",
      "name": "Pain Point",
      "props": {
        "heading": "Pain point heading",
        "subheading": "Pain point description",
        "pain1Title": "Problem 1",
        "pain1Description": "Description of problem 1",
        "pain1Icon": "frown",
        "pain2Title": "Problem 2",
        "pain2Description": "Description of problem 2",
        "pain2Icon": "timer",
        "pain3Title": "Problem 3",
        "pain3Description": "Description of problem 3",
        "pain3Icon": "lightbulb",
        "buttonText": "Get Solutions",
        "backgroundColor": "#F8F9FA"
      },
      "order": 4
    },
    {
      "type": "assessment",
      "name": "Assessment",
      "props": {
        "heading": "Assessment heading",
        "buttonText": "Take Assessment",
        "backgroundColor": "#E8F5E8",
        "buttonColor": "#2D5530"
      },
      "order": 5
    },
    {
      "type": "footer",
      "name": "Footer",
      "props": {
        "copyright": "© 2024 Your Cooking School",
        "poweredByText": "Powered By",
        "poweredByBrand": "Builder.io",
        "poweredByColor": "#FF6B35",
        "instagramUrl": "#",
        "facebookUrl": "#",
        "xUrl": "#",
        "privacyUrl": "/privacy",
        "termsUrl": "/terms",
        "bgColor": "#2D5530"
      },
      "order": 6
    }
  ]
}

For cooking websites, include components like:
- navbar (navigation)
- hero (Hero Banner)
- program-info (Program Info)
- pain-point (Pain Point)
- assessment (Assessment)
- help-section (Help Section)
- value-stack (Value Stack)
- worth-it (Worth It)
- mission (Mission Section)
- contact (Contact Section)
- footer (Footer)

For teaching websites, use:
- Header, Navigation, Expert Info, Program Info, How It Works, Testimonials, Free Assessment, Footer

Always include navbar, hero, and footer. Add 3-5 relevant middle components based on the website type.
Use cooking-related imagery from Unsplash for cooking sites.
Make content engaging and relevant to the cooking/teaching industry.`;

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No content generated from OpenAI');
      }

      // Parse the JSON response
      const generatedContent: GeneratedContent = JSON.parse(content);
      
      // Validate the structure
      this.validateGeneratedContent(generatedContent);
      
      return generatedContent;
    } catch (error) {
      console.error('OpenAI generation error:', error);
      
      // Return fallback content if OpenAI fails
      return this.getFallbackContent(prompt);
    }
  }

  private validateGeneratedContent(content: GeneratedContent): void {
    if (!content.websiteType || !content.title || !content.components) {
      throw new Error('Invalid generated content structure');
    }

    if (!Array.isArray(content.components) || content.components.length === 0) {
      throw new Error('No components generated');
    }
  }

  private getFallbackContent(prompt: string): GeneratedContent {
    // Extract website type from prompt
    const websiteType = this.detectWebsiteType(prompt);
    
    return {
      websiteType,
      title: `${websiteType.charAt(0).toUpperCase() + websiteType.slice(1)} Website`,
      description: 'A professionally designed website built with AI',
      colorScheme: 'blue',
      components: [
        {
          type: 'hero',
          name: 'Hero Banner',
          props: {
            title: `Welcome to Our ${websiteType.charAt(0).toUpperCase() + websiteType.slice(1)} Platform`,
            subtitle: 'Discover amazing content and services',
            buttonText: 'Get Started',
            backgroundImage: 'https://picsum.photos/1200/600?random=1',
            backgroundColor: '#1e40af'
          },
          order: 1
        },
        {
          type: 'about',
          name: 'About Section',
          props: {
            heading: 'About Us',
            description: 'We provide exceptional services and content',
            features: ['Professional Quality', 'Expert Team', 'Great Results'],
            image: 'https://picsum.photos/500/400?random=2'
          },
          order: 2
        },
        {
          type: 'contact',
          name: 'Contact Form',
          props: {
            heading: 'Get In Touch',
            description: 'Contact us for more information',
            email: 'contact@example.com',
            phone: '+1 (555) 123-4567'
          },
          order: 3
        },
        {
          type: 'footer',
          name: 'Footer',
          props: {
            companyName: 'Your Company',
            description: 'Building amazing websites',
            links: ['About', 'Services', 'Contact', 'Privacy']
          },
          order: 4
        }
      ]
    };
  }

  private detectWebsiteType(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('cook') || lowerPrompt.includes('recipe') || lowerPrompt.includes('chef')) {
      return 'cooking';
    } else if (lowerPrompt.includes('teach') || lowerPrompt.includes('course') || lowerPrompt.includes('education')) {
      return 'teaching';
    } else if (lowerPrompt.includes('portfolio') || lowerPrompt.includes('photographer') || lowerPrompt.includes('designer')) {
      return 'portfolio';
    } else if (lowerPrompt.includes('shop') || lowerPrompt.includes('store') || lowerPrompt.includes('product')) {
      return 'ecommerce';
    } else if (lowerPrompt.includes('blog') || lowerPrompt.includes('news') || lowerPrompt.includes('article')) {
      return 'blog';
    } else {
      return 'business';
    }
  }
}
