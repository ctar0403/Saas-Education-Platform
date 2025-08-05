import React from 'react';
import AIWebsiteGenerator from '@/components/AIWebsiteGenerator/AIWebsiteGenerator';

export default function AIWebsiteGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <AIWebsiteGenerator />
    </div>
  );
}

export const metadata = {
  title: 'AI Website Generator | Builder.io Integration',
  description: 'Generate professional websites instantly using AI and Builder.io. Create cooking class websites, teaching platforms, and more with just a text prompt.',
};
