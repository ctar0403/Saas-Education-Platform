"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Generic About Section Component
export const AboutSection: React.FC<{
  heading?: string;
  description?: string;
  features?: string[];
  image?: string;
  backgroundColor?: string;
}> = ({ 
  heading = "About Us", 
  description = "Learn more about what we do", 
  features = ["Quality", "Innovation", "Results"],
  image = "https://picsum.photos/500/400?random=2",
  backgroundColor = "#ffffff"
}) => {
  return (
    <section className="py-16" style={{ backgroundColor }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{heading}</h2>
            <p className="text-lg text-gray-600 mb-8">{description}</p>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img 
              src={image} 
              alt="About us" 
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Generic Features Grid Component
export const FeaturesGrid: React.FC<{
  heading?: string;
  subtitle?: string;
  items?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  backgroundColor?: string;
}> = ({ 
  heading = "Our Features", 
  subtitle = "What makes us special",
  items = [
    { title: "Feature 1", description: "Amazing feature", icon: "🚀" },
    { title: "Feature 2", description: "Another feature", icon: "⭐" },
    { title: "Feature 3", description: "Great feature", icon: "💎" }
  ],
  backgroundColor = "#f8fafc"
}) => {
  return (
    <section className="py-16" style={{ backgroundColor }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{heading}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Generic Testimonials Component
export const TestimonialsSection: React.FC<{
  heading?: string;
  testimonials?: Array<{
    name: string;
    role: string;
    content: string;
    avatar: string;
  }>;
  backgroundColor?: string;
}> = ({ 
  heading = "What Our Customers Say",
  testimonials = [
    {
      name: "John Doe",
      role: "Customer",
      content: "Amazing service and great results!",
      avatar: "https://picsum.photos/100/100?random=3"
    },
    {
      name: "Jane Smith",
      role: "Client", 
      content: "Professional and reliable.",
      avatar: "https://picsum.photos/100/100?random=4"
    }
  ],
  backgroundColor = "#ffffff"
}) => {
  return (
    <section className="py-16" style={{ backgroundColor }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{heading}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <p className="text-gray-600 italic mb-4">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Generic Contact Form Component
export const ContactForm: React.FC<{
  heading?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  backgroundColor?: string;
}> = ({ 
  heading = "Get In Touch", 
  description = "Contact us for more information",
  email = "contact@example.com",
  phone = "+1 (555) 123-4567",
  address = "123 Main St, City, State 12345",
  backgroundColor = "#f8fafc"
}) => {
  return (
    <section className="py-16" style={{ backgroundColor }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{heading}</h2>
            <p className="text-lg text-gray-600 mb-8">{description}</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📧</span>
                <span className="text-gray-700">{email}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <span className="text-gray-700">{phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <span className="text-gray-700">{address}</span>
              </div>
            </div>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Your message..."
                  />
                </div>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Generic Footer Component
export const GenericFooter: React.FC<{
  companyName?: string;
  description?: string;
  links?: string[];
  socialLinks?: Array<{ name: string; url: string }>;
  backgroundColor?: string;
  textColor?: string;
}> = ({ 
  companyName = "Your Company", 
  description = "Building amazing websites",
  links = ["About", "Services", "Contact", "Privacy"],
  socialLinks = [],
  backgroundColor = "#1f2937",
  textColor = "#ffffff"
}) => {
  return (
    <footer className="py-12" style={{ backgroundColor, color: textColor }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{companyName}</h3>
            <p className="text-gray-300 mb-4">{description}</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
