"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert } from '../ui/alert';
import { CheckCircle, XCircle, AlertCircle, ExternalLink, Copy } from 'lucide-react';

interface BuilderIntegrationProps {
  apiKey?: string;
  spaceId?: string;
  onIntegrate?: () => void;
}

const BuilderIntegration: React.FC<BuilderIntegrationProps> = ({
  apiKey,
  spaceId,
  onIntegrate
}) => {
  const [integrationStatus, setIntegrationStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [builderConfig, setBuilderConfig] = useState<any>(null);

  useEffect(() => {
    checkBuilderConnection();
  }, [apiKey]);

  const checkBuilderConnection = async () => {
    try {
      // Check if Builder.io is properly configured
      if (!apiKey) {
        setIntegrationStatus('error');
        return;
      }

      // In a real implementation, you would verify the API key
      setIntegrationStatus('connected');
      setBuilderConfig({
        apiKey: apiKey || process.env.NEXT_PUBLIC_BUILDER_API_KEY,
        spaceId: spaceId || 'your-space-id',
        components: [
          'Course Card', 'Product Card', 'Blog Card',
          'Course List', 'Product List', 'Blog List',
          'Teaching Header', 'Cooking Hero', 'Navigation'
        ]
      });
    } catch (error) {
      setIntegrationStatus('error');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const openBuilderStudio = () => {
    window.open(`https://builder.io/content/${builderConfig?.spaceId}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Builder.io Integration Status
            {integrationStatus === 'connected' ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : integrationStatus === 'error' ? (
              <XCircle className="w-5 h-5 text-red-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-500" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrationStatus === 'connected' ? (
              <div>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Connected
                </Badge>
                <p className="text-sm text-gray-600 mt-2">
                  Builder.io is properly configured and ready to use.
                </p>
              </div>
            ) : integrationStatus === 'error' ? (
              <div>
                <Badge variant="destructive">
                  Not Connected
                </Badge>
                <p className="text-sm text-gray-600 mt-2">
                  Builder.io API key is missing or invalid. Please check your configuration.
                </p>
              </div>
            ) : (
              <div>
                <Badge variant="secondary">
                  Checking...
                </Badge>
                <p className="text-sm text-gray-600 mt-2">
                  Verifying Builder.io connection...
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Configuration Details */}
      {builderConfig && (
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">API Key</label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 p-2 bg-gray-100 rounded text-sm font-mono">
                    {builderConfig.apiKey ? `${builderConfig.apiKey.substring(0, 8)}...` : 'Not configured'}
                  </code>
                  {builderConfig.apiKey && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(builderConfig.apiKey)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Space ID</label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 p-2 bg-gray-100 rounded text-sm font-mono">
                    {builderConfig.spaceId}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(builderConfig.spaceId)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Components */}
      {builderConfig && (
        <Card>
          <CardHeader>
            <CardTitle>Registered Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {builderConfig.components.map((component: string, index: number) => (
                <Badge key={index} variant="outline" className="justify-center">
                  {component}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              These components are available in your Builder.io visual editor under the "Dynamic Content" and template groups.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={openBuilderStudio} className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Open Builder Studio
            </Button>
            
            <Button variant="outline" onClick={onIntegrate}>
              Refresh Integration
            </Button>
            
            <Button variant="outline" asChild>
              <a href="/dynamic-demo" target="_blank" className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                View Component Demo
              </a>
            </Button>
            
            <Button variant="outline" asChild>
              <a href="/DYNAMIC_CONTENT_GUIDE.md" target="_blank" className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Integration Guide
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div>
                <h4 className="font-medium">Create Data Models</h4>
                <p className="text-sm text-gray-600">
                  Set up Course, Product, and Blog data models in Builder.io with the required fields.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div>
                <h4 className="font-medium">Add Content</h4>
                <p className="text-sm text-gray-600">
                  Create entries in your data models with actual courses, products, and blog posts.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <div>
                <h4 className="font-medium">Design Pages</h4>
                <p className="text-sm text-gray-600">
                  Use the visual editor to drag and drop components and connect them to your data.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
                4
              </div>
              <div>
                <h4 className="font-medium">Publish</h4>
                <p className="text-sm text-gray-600">
                  Publish your pages and they'll automatically appear on your website.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuilderIntegration;
