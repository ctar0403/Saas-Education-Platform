import { GeneratedContent, GeneratedComponent } from './openai-service';

export interface BuilderBlock {
  '@type': '@builder.io/sdk:Element';
  component?: {
    name: string;
    options: Record<string, any>;
  };
  children?: BuilderBlock[];
  responsiveStyles?: {
    large?: Record<string, any>;
    medium?: Record<string, any>;
    small?: Record<string, any>;
  };
}

export interface BuilderPageData {
  name: string;
  data: {
    title?: string;
    description?: string;
    blocks: BuilderBlock[];
  };
  published?: 'draft' | 'published';
  meta?: Record<string, any>;
  query?: Array<{
    '@type': '@builder.io/core:Query';
    property: string;
    operator: string;
    value: string;
  }>;
}

export interface BuilderPageResponse {
  id: string;
  name: string;
  data: any;
  createdDate: number;
  lastUpdated: number;
  published: string;
  meta: any;
  variations: any;
  testRatio: number;
  screenshot: string;
  createdBy: string;
  lastUpdatedBy: string;
}

export class BuilderAPIService {
  private apiKey: string;
  private spaceId: string;
  private baseUrl = 'https://builder.io/api/v1';

  constructor(apiKey: string, spaceId: string) {
    this.apiKey = apiKey;
    this.spaceId = spaceId;
  }

  async createPage(content: GeneratedContent, urlPath?: string): Promise<BuilderPageResponse> {
    const pageData = this.convertContentToBuilderPage(content, urlPath);
    
    try {
      const response = await fetch(`${this.baseUrl}/write/page`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'X-Space-Id': this.spaceId
        },
        body: JSON.stringify(pageData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Builder.io API error: ${response.status} - ${errorText}`);
      }

      const result: BuilderPageResponse = await response.json();
      console.log('✅ Page created successfully:', result.id);
      
      return result;
    } catch (error) {
      console.error('��� Builder.io API error:', error);
      throw error;
    }
  }

  async updatePage(pageId: string, content: GeneratedContent): Promise<BuilderPageResponse> {
    const pageData = this.convertContentToBuilderPage(content);
    
    try {
      const response = await fetch(`${this.baseUrl}/write/page/${pageId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'X-Space-Id': this.spaceId
        },
        body: JSON.stringify(pageData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Builder.io API error: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('❌ Builder.io update error:', error);
      throw error;
    }
  }

  async publishPage(pageId: string): Promise<BuilderPageResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/write/page/${pageId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'X-Space-Id': this.spaceId
        },
        body: JSON.stringify({
          published: 'published'
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to publish page: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('❌ Builder.io publish error:', error);
      throw error;
    }
  }

  private convertContentToBuilderPage(content: GeneratedContent, urlPath?: string): BuilderPageData {
    // Generate unique URL path if not provided
    const generatedPath = urlPath || `/generated/${content.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;
    
    // Convert components to Builder blocks
    const blocks = content.components
      .sort((a, b) => a.order - b.order)
      .map(component => this.convertComponentToBlock(component));

    const pageData: BuilderPageData = {
      name: content.title,
      data: {
        title: content.title,
        description: content.description,
        blocks: blocks
      },
      published: 'draft',
      meta: {
        description: content.description,
        title: content.title
      },
      query: [
        {
          '@type': '@builder.io/core:Query',
          property: 'urlPath',
          operator: 'is',
          value: generatedPath
        }
      ]
    };

    return pageData;
  }

  private convertComponentToBlock(component: GeneratedComponent): BuilderBlock {
    const baseBlock: BuilderBlock = {
      '@type': '@builder.io/sdk:Element'
    };

    // Map component types to registered Builder.io components
    switch (component.type) {
      case 'navbar':
        return {
          ...baseBlock,
          component: {
            name: 'Navbar',
            options: {
              logoColor: component.props.logoColor || '#2D5530',
              nav1Title: component.props.nav1Title || 'Home',
              nav1Href: component.props.nav1Href || '/',
              nav2Title: component.props.nav2Title || 'About',
              nav2Href: component.props.nav2Href || '/about',
              nav3Title: component.props.nav3Title || 'Classes',
              nav3Href: component.props.nav3Href || '/classes',
              nav4Title: component.props.nav4Title || 'Contact',
              nav4Href: component.props.nav4Href || '/contact',
              nav5Title: component.props.nav5Title || '',
              nav5Href: component.props.nav5Href || '',
              buttonText: component.props.buttonText || 'Book Now',
              buttonColor: component.props.buttonColor || '#FF6B35'
            }
          }
        };

      case 'hero':
        return {
          ...baseBlock,
          component: {
            name: 'Hero Banner',
            options: {
              heading: component.props.heading || component.props.title || 'Welcome',
              subheading: component.props.subheading || component.props.subtitle || 'Discover amazing content',
              buttonText: component.props.buttonText || 'Get Started',
              buttonLink: component.props.buttonLink || '#contact',
              backgroundImageUrl: component.props.backgroundImageUrl || component.props.backgroundImage || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop&crop=center&q=80'
            }
          },
          responsiveStyles: {
            large: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '500px',
              padding: '80px 20px'
            },
            medium: {
              minHeight: '400px',
              padding: '60px 20px'
            },
            small: {
              minHeight: '350px',
              padding: '40px 20px'
            }
          }
        };

      case 'program-info':
        return {
          ...baseBlock,
          component: {
            name: 'Program Info',
            options: {
              title: component.props.title || 'Our Program',
              description: component.props.description || 'Learn amazing cooking skills',
              point1: component.props.point1 || 'Professional techniques',
              point2: component.props.point2 || 'Hands-on practice',
              point3: component.props.point3 || 'Expert guidance',
              point4: component.props.point4 || 'Recipe collection',
              point5: component.props.point5 || 'Certificate of completion',
              buttonText: component.props.buttonText || 'Learn More',
              buttonLink: component.props.buttonLink || '#contact',
              imageUrl: component.props.imageUrl || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop&crop=center&q=80'
            }
          }
        };

      case 'pain-point':
        return {
          ...baseBlock,
          component: {
            name: 'Pain Point',
            options: {
              heading: component.props.heading || 'Common Cooking Challenges',
              subheading: component.props.subheading || 'We understand the struggles you face in the kitchen',
              pain1Title: component.props.pain1Title || 'Lack of Confidence',
              pain1Description: component.props.pain1Description || 'Feeling uncertain about cooking techniques',
              pain1Icon: component.props.pain1Icon || 'frown',
              pain2Title: component.props.pain2Title || 'Time Constraints',
              pain2Description: component.props.pain2Description || 'Struggling to find time for proper cooking',
              pain2Icon: component.props.pain2Icon || 'timer',
              pain3Title: component.props.pain3Title || 'Limited Knowledge',
              pain3Description: component.props.pain3Description || 'Not knowing where to start with cooking',
              pain3Icon: component.props.pain3Icon || 'lightbulb',
              buttonText: component.props.buttonText || 'Get Solutions',
              backgroundColor: component.props.backgroundColor || '#F8F9FA',
              buttonColor: component.props.buttonColor || '#FF6B35'
            }
          }
        };

      case 'assessment':
        return {
          ...baseBlock,
          component: {
            name: 'Assessment',
            options: {
              heading: component.props.heading || 'Take Our Cooking Assessment',
              buttonText: component.props.buttonText || 'Start Assessment',
              backgroundColor: component.props.backgroundColor || '#E8F5E8',
              buttonColor: component.props.buttonColor || '#2D5530'
            }
          }
        };

      case 'help-section':
        return {
          ...baseBlock,
          component: {
            name: 'Help Section',
            options: {
              title: component.props.title || 'How We Can Help',
              description: component.props.description || 'Our expert chefs will guide you through every step',
              points: component.props.points || ['Professional guidance', 'Practical skills', 'Confidence building'],
              buttonText: component.props.buttonText || 'Get Started',
              buttonLink: component.props.buttonLink || '#contact',
              imageUrl: component.props.imageUrl || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop&crop=center&q=80'
            }
          }
        };

      case 'value-stack':
        return {
          ...baseBlock,
          component: {
            name: 'Value Stack',
            options: {
              value1: component.props.value1 || 'Professional Training',
              value2: component.props.value2 || 'Lifetime Access',
              value3: component.props.value3 || 'Certificate',
              backgroundColor: component.props.backgroundColor || '#2D5530'
            }
          }
        };

      case 'worth-it':
        return {
          ...baseBlock,
          component: {
            name: 'Worth It',
            options: {
              heading: component.props.heading || 'Is It Worth Your Investment?',
              description: component.props.description || 'See what our students have achieved',
              highlight: component.props.highlight || 'Transform Your Cooking',
              stat1Value: component.props.stat1Value || '500+',
              stat1Text: component.props.stat1Text || 'Happy Students',
              stat1Bg: component.props.stat1Bg || '#FF6B35',
              stat2SvgDesktop: component.props.stat2SvgDesktop || '',
              stat2SvgMobile: component.props.stat2SvgMobile || '',
              stat3Value: component.props.stat3Value || '95%',
              stat3Text: component.props.stat3Text || 'Success Rate',
              stat3Bg: component.props.stat3Bg || '#2D5530',
              buttonText: component.props.buttonText || 'Join Now',
              buttonColor: component.props.buttonColor || '#FF6B35'
            }
          }
        };

      case 'mission':
        return {
          ...baseBlock,
          component: {
            name: 'Mission Section',
            options: {
              heading: component.props.heading || 'Our Mission',
              subheading: component.props.subheading || 'Empowering home cooks worldwide',
              item1Title: component.props.item1Title || 'Quality Education',
              item1Description: component.props.item1Description || 'Providing top-notch cooking education',
              item1IconUrl: component.props.item1IconUrl || 'https://cdn.builder.io/api/v1/image/assets%2Fe7e4e054f28544f2a05c2ce9a547d52a%2F3cfbb8bd580d43aa8970e119417dacc9',
              item2Title: component.props.item2Title || 'Practical Skills',
              item2Description: component.props.item2Description || 'Teaching real-world cooking techniques',
              item2IconUrl: component.props.item2IconUrl || 'https://cdn.builder.io/api/v1/image/assets%2Fe7e4e054f28544f2a05c2ce9a547d52a%2F3cfbb8bd580d43aa8970e119417dacc9',
              item3Title: component.props.item3Title || 'Community Building',
              item3Description: component.props.item3Description || 'Creating a supportive cooking community',
              item3IconUrl: component.props.item3IconUrl || 'https://cdn.builder.io/api/v1/image/assets%2Fe7e4e054f28544f2a05c2ce9a547d52a%2F3cfbb8bd580d43aa8970e119417dacc9'
            }
          }
        };

      case 'how-it-works':
        return {
          ...baseBlock,
          component: {
            name: 'How It Works Section',
            options: {
              heading: component.props.heading || 'How It Works',
              description: component.props.description || 'Simple steps to master cooking',
              card1Title: component.props.card1Title || 'Step 1: Enroll',
              card1Description: component.props.card1Description || 'Sign up for our cooking program',
              card2Title: component.props.card2Title || 'Step 2: Learn',
              card2Description: component.props.card2Description || 'Follow guided video lessons',
              card3Title: component.props.card3Title || 'Step 3: Practice',
              card3Description: component.props.card3Description || 'Apply skills in your kitchen',
              buttonText: component.props.buttonText || 'Get Started'
            }
          }
        };

      case 'about':
        return {
          ...baseBlock,
          component: {
            name: 'About Section',
            options: {
              heading: component.props.heading || 'About Us',
              description: component.props.description || 'Learn more about what we do',
              features: component.props.features || ['Quality', 'Innovation', 'Results'],
              imageUrl: component.props.image || 'https://picsum.photos/500/400?random=2',
              backgroundColor: '#ffffff'
            }
          },
          responsiveStyles: {
            large: {
              padding: '80px 20px'
            },
            medium: {
              padding: '60px 20px'
            },
            small: {
              padding: '40px 20px'
            }
          }
        };

      case 'features':
        return {
          ...baseBlock,
          component: {
            name: 'Features Grid',
            options: {
              heading: component.props.heading || 'Our Features',
              subtitle: component.props.subtitle || 'What makes us special',
              items: component.props.items || [
                { title: 'Feature 1', description: 'Amazing feature', icon: '🚀' },
                { title: 'Feature 2', description: 'Another feature', icon: '⭐' },
                { title: 'Feature 3', description: 'Great feature', icon: '💎' }
              ],
              backgroundColor: '#f8fafc'
            }
          }
        };

      case 'testimonials':
        return {
          ...baseBlock,
          component: {
            name: 'Testimonials',
            options: {
              heading: component.props.heading || 'What Our Customers Say',
              testimonials: component.props.testimonials || [
                {
                  name: 'John Doe',
                  role: 'Customer',
                  content: 'Amazing service and great results!',
                  avatar: 'https://picsum.photos/100/100?random=3'
                },
                {
                  name: 'Jane Smith',
                  role: 'Client',
                  content: 'Professional and reliable.',
                  avatar: 'https://picsum.photos/100/100?random=4'
                }
              ],
              backgroundColor: '#ffffff'
            }
          }
        };

      case 'contact':
        return {
          ...baseBlock,
          component: {
            name: 'Contact Section',
            options: {
              heading: component.props.heading || 'Get In Touch',
              description: component.props.description || 'Contact us for more information about our cooking classes',
              buttonText: component.props.buttonText || 'Send Message',
              buttonColor: component.props.buttonColor || '#FF6B35',
              emailLabel: component.props.emailLabel || 'Email',
              phoneLabel: component.props.phoneLabel || 'Phone',
              emailValue: component.props.emailValue || component.props.email || 'contact@cookingschool.com',
              phoneValue: component.props.phoneValue || component.props.phone || '+1 (555) 123-4567',
              emailPlaceholder: component.props.emailPlaceholder || 'Enter your email',
              namePlaceholder: component.props.namePlaceholder || 'Your name',
              messagePlaceholder: component.props.messagePlaceholder || 'Your message',
              bgColor: component.props.bgColor || component.props.backgroundColor || '#F8F9FA'
            }
          }
        };

      case 'footer':
        return {
          ...baseBlock,
          component: {
            name: 'Footer',
            options: {
              copyright: component.props.copyright || '© 2024 Cooking School',
              poweredByText: component.props.poweredByText || 'Powered By',
              poweredByBrand: component.props.poweredByBrand || 'Builder.io',
              poweredByColor: component.props.poweredByColor || '#FF6B35',
              instagramUrl: component.props.instagramUrl || '#',
              facebookUrl: component.props.facebookUrl || '#',
              xUrl: component.props.xUrl || '#',
              privacyUrl: component.props.privacyUrl || '/privacy',
              termsUrl: component.props.termsUrl || '/terms',
              bgColor: component.props.bgColor || component.props.backgroundColor || '#2D5530'
            }
          }
        };

      case 'gallery':
        return {
          ...baseBlock,
          component: {
            name: 'Image Gallery',
            options: {
              heading: component.props.heading || 'Gallery',
              images: component.props.images || [
                'https://picsum.photos/400/300?random=5',
                'https://picsum.photos/400/300?random=6',
                'https://picsum.photos/400/300?random=7',
                'https://picsum.photos/400/300?random=8'
              ],
              columns: component.props.columns || 3
            }
          }
        };

      case 'pricing':
        return {
          ...baseBlock,
          component: {
            name: 'Pricing Table',
            options: {
              heading: component.props.heading || 'Pricing Plans',
              plans: component.props.plans || [
                {
                  name: 'Basic',
                  price: '$29',
                  period: '/month',
                  features: ['Feature 1', 'Feature 2', 'Feature 3'],
                  buttonText: 'Get Started'
                },
                {
                  name: 'Pro',
                  price: '$59',
                  period: '/month',
                  features: ['Everything in Basic', 'Feature 4', 'Feature 5'],
                  buttonText: 'Get Started',
                  featured: true
                }
              ]
            }
          }
        };

      default:
        // Generic component fallback
        return {
          ...baseBlock,
          component: {
            name: component.name,
            options: component.props
          }
        };
    }
  }

  // Helper method to generate unique URL paths
  generateUrlPath(title: string): string {
    const cleanTitle = title.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
    
    const timestamp = Date.now().toString().slice(-6);
    return `/generated/${cleanTitle}-${timestamp}`;
  }
}
