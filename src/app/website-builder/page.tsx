"use client";

import React, { useEffect, useState } from 'react';
import { WebsiteBuilder } from '@/components/WebsiteBuilder/WebsiteBuilder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Settings, 
  Key, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle,
  Info,
  Lock,
  Sparkles
} from 'lucide-react';

interface ApiConfiguration {
  openaiApiKey: string;
  builderApiKey: string;
  builderSpaceId: string;
}

export default function WebsiteBuilderPage() {
  const [isConfigured, setIsConfigured] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState<ApiConfiguration>({
    openaiApiKey: '',
    builderApiKey: '',
    builderSpaceId: ''
  });

  useEffect(() => {
    // Check if configuration is available from environment or localStorage
    const openaiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || localStorage.getItem('openai_api_key') || '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';
    const builderKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY || localStorage.getItem('builder_api_key') || 'ab5b460294654ac49703c8715debb464';
    const builderSpace = process.env.NEXT_PUBLIC_BUILDER_SPACE_ID || localStorage.getItem('builder_space_id') || 'ab5b460294654ac49703c8715debb464';

    if (openaiKey && builderKey && builderSpace) {
      setConfig({
        openaiApiKey: openaiKey,
        builderApiKey: builderKey,
        builderSpaceId: builderSpace
      });
      setIsConfigured(true);
    } else {
      setShowConfig(true);
    }
  }, []);

  const handleConfigSave = () => {
    if (!config.openaiApiKey || !config.builderApiKey || !config.builderSpaceId) {
      alert('Please fill in all required fields');
      return;
    }

    // Save to localStorage for persistence
    localStorage.setItem('openai_api_key', config.openaiApiKey);
    localStorage.setItem('builder_api_key', config.builderApiKey);
    localStorage.setItem('builder_space_id', config.builderSpaceId);

    setIsConfigured(true);
    setShowConfig(false);
  };

  const handleConfigChange = (field: keyof ApiConfiguration, value: string) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetConfig = () => {
    localStorage.removeItem('openai_api_key');
    localStorage.removeItem('builder_api_key');
    localStorage.removeItem('builder_space_id');
    setConfig({
      openaiApiKey: '',
      builderApiKey: '',
      builderSpaceId: ''
    });
    setIsConfigured(false);
    setShowConfig(true);
  };

  if (showConfig || !isConfigured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
        <div className="max-w-2xl mx-auto pt-20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-indigo-100 rounded-full px-4 py-2 mb-4">
              <Settings className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">API Configuration</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Setup Your Website Builder
            </h1>
            <p className="text-lg text-gray-600">
              Configure your API keys to start building AI-powered websites
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-indigo-600" />
                API Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* OpenAI Configuration */}
              <div className="space-y-2">
                <Label htmlFor="openai-key" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  OpenAI API Key
                </Label>
                <Input
                  id="openai-key"
                  type="password"
                  placeholder="sk-proj-..."
                  value={config.openaiApiKey}
                  onChange={(e) => handleConfigChange('openaiApiKey', e.target.value)}
                  className="font-mono"
                />
                <p className="text-sm text-gray-500">
                  Required for AI content generation. Get your key from{' '}
                  <a 
                    href="https://platform.openai.com/api-keys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700 underline inline-flex items-center gap-1"
                  >
                    OpenAI Platform <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>

              {/* Builder.io Configuration */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="builder-key" className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-blue-500" />
                    Builder.io Private API Key
                  </Label>
                  <Input
                    id="builder-key"
                    type="password"
                    placeholder="Private API Key"
                    value={config.builderApiKey}
                    onChange={(e) => handleConfigChange('builderApiKey', e.target.value)}
                    className="font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="builder-space" className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-blue-500" />
                    Builder.io Space ID
                  </Label>
                  <Input
                    id="builder-space"
                    placeholder="Space ID"
                    value={config.builderSpaceId}
                    onChange={(e) => handleConfigChange('builderSpaceId', e.target.value)}
                    className="font-mono"
                  />
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Find your Builder.io keys in your{' '}
                    <a 
                      href="https://builder.io/account/space" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 underline inline-flex items-center gap-1"
                    >
                      Builder.io Account Settings <ExternalLink className="w-3 h-3" />
                    </a>
                  </AlertDescription>
                </Alert>
              </div>

              {/* Security Notice */}
              <Alert className="border-yellow-200 bg-yellow-50">
                <Lock className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-700">
                  <strong>Security Note:</strong> API keys are stored locally in your browser and are not sent to any external servers except the respective APIs (OpenAI and Builder.io).
                </AlertDescription>
              </Alert>

              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  onClick={handleConfigSave}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                  disabled={!config.openaiApiKey || !config.builderApiKey || !config.builderSpaceId}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Save Configuration
                </Button>
                
                {isConfigured && (
                  <Button 
                    variant="outline" 
                    onClick={() => setShowConfig(false)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">OpenAI Setup</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Create an account at OpenAI</li>
                    <li>• Go to API Keys section</li>
                    <li>• Create a new secret key</li>
                    <li>• Copy the key (starts with sk-)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Builder.io Setup</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Log in to Builder.io</li>
                    <li>• Go to Account → Space Settings</li>
                    <li>• Find your Space ID</li>
                    <li>• Generate a Private API Key</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Configuration Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowConfig(true)}
          className="bg-white shadow-lg"
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      {/* Configuration Status */}
      <div className="fixed top-4 left-4 z-50">
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-700">APIs Configured</span>
        </div>
      </div>

      {/* Main Website Builder */}
      <WebsiteBuilder
        openaiApiKey={config.openaiApiKey}
        builderApiKey={config.builderApiKey}
        builderSpaceId={config.builderSpaceId}
      />

      {/* Configuration Modal Overlay */}
      {showConfig && isConfigured && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">API Configuration</h2>
                <button
                  onClick={() => setShowConfig(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>OpenAI API Key</Label>
                  <Input
                    type="password"
                    value={config.openaiApiKey}
                    onChange={(e) => handleConfigChange('openaiApiKey', e.target.value)}
                    className="font-mono"
                  />
                </div>

                <div>
                  <Label>Builder.io API Key</Label>
                  <Input
                    type="password"
                    value={config.builderApiKey}
                    onChange={(e) => handleConfigChange('builderApiKey', e.target.value)}
                    className="font-mono"
                  />
                </div>

                <div>
                  <Label>Builder.io Space ID</Label>
                  <Input
                    value={config.builderSpaceId}
                    onChange={(e) => handleConfigChange('builderSpaceId', e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={resetConfig}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Reset Configuration
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowConfig(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfigSave}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
