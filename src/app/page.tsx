"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Wand2, Layout, Code, Palette, Zap, ArrowRight, Building } from "lucide-react";
import KadnyaWebsiteBuilderService from "@/lib/services/kadnya-website-builder";
import WebsiteToBuilderService from "@/lib/services/website-to-builder";
import { safeLocalStorageGet, safeLocalStorageSet, safeLocalStorageRemove } from "@/lib/utils/defensive-helpers";

export default function Home() {
  const router = useRouter();
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'info' | 'warning', message: string} | null>(null);
  const [generationProgress, setGenerationProgress] = useState<{step: string; status: string; progress?: number} | null>(null);
  const [forceDemoMode, setForceDemoMode] = useState(false);
  const [timeoutPatience, setTimeoutPatience] = useState<'patient' | 'normal' | 'quick'>('normal');
  const [backendStatus, setBackendStatus] = useState({
    autoSkipped: false,
    emergencyMode: false,
    failures: 0,
    timeLeft: 0,
    isLoaded: false
  });

  // Check backend status after component mounts to avoid hydration issues
  useEffect(() => {
    const getBackendStatus = () => {
      try {
        // Defensive check for localStorage availability
        if (typeof window === 'undefined' || !window.localStorage) {
          return { autoSkipped: false, emergencyMode: false, failures: 0, timeLeft: 0, isLoaded: true };
        }

        // Check for emergency mode first
        const emergencyMode = safeLocalStorageGet('kadnya_emergency_mode');
        const emergencyTime = safeLocalStorageGet('kadnya_emergency_time');

        if (emergencyMode === 'true' && emergencyTime) {
          const emergencyStart = parseInt(emergencyTime, 10);
          const twoHoursLater = emergencyStart + (2 * 60 * 60 * 1000);
          const timeLeft = Math.ceil((twoHoursLater - Date.now()) / 60000);

          if (timeLeft > 0) {
            return {
              autoSkipped: true,
              emergencyMode: true,
              failures: parseInt(safeLocalStorageGet('kadnya_backend_failures') || '0', 10),
              timeLeft,
              isLoaded: true
            };
          }
        }

        // Check normal failure mode
        const failures = safeLocalStorageGet('kadnya_backend_failures');
        const lastFailure = safeLocalStorageGet('kadnya_last_failure_time');
        if (failures && lastFailure) {
          const failureCount = parseInt(failures, 10);
          const lastFailureTime = parseInt(lastFailure, 10);
          const twoHoursAgo = Date.now() - (2 * 60 * 60 * 1000);

          if (failureCount > 0 && lastFailureTime > twoHoursAgo) {
            return {
              autoSkipped: true,
              emergencyMode: false,
              failures: failureCount,
              timeLeft: Math.ceil((lastFailureTime + 2 * 60 * 60 * 1000 - Date.now()) / 60000),
              isLoaded: true
            };
          }
        }
      } catch {
        // Ignore errors
      }
      return { autoSkipped: false, emergencyMode: false, failures: 0, timeLeft: 0, isLoaded: true };
    };

    setBackendStatus(getBackendStatus());
  }, []);

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);

    try {
      console.log('🚀 Starting Kadnya AI website generation...');

      // Check emergency mode immediately before any backend calls (don't wait for useEffect)
      const isEmergencyMode = (() => {
        try {
          // Direct localStorage access - this is safe in click handlers
          const emergencyMode = safeLocalStorageGet('kadnya_emergency_mode');
          const emergencyTime = safeLocalStorageGet('kadnya_emergency_time');
          if (emergencyMode === 'true' && emergencyTime) {
            const emergencyStart = parseInt(emergencyTime, 10);
            const twoHoursLater = emergencyStart + (2 * 60 * 60 * 1000);
            const timeLeft = Math.ceil((twoHoursLater - Date.now()) / 60000);
            console.log(`🚨 Emergency mode check: ${timeLeft} minutes remaining`);
            return timeLeft > 0;
          }
          return false;
        } catch (e) {
          console.warn('Emergency mode check failed:', e);
          return false;
        }
      })();

      // Also check for recent failures
      const hasRecentFailures = (() => {
        try {
          const failures = safeLocalStorageGet('kadnya_backend_failures');
          const lastFailure = safeLocalStorageGet('kadnya_last_failure_time');
          if (failures && lastFailure) {
            const failureCount = parseInt(failures, 10);
            const lastFailureTime = parseInt(lastFailure, 10);
            const twoHoursAgo = Date.now() - (2 * 60 * 60 * 1000);
            const hasFailures = failureCount > 0 && lastFailureTime > twoHoursAgo;
            console.log(`🔍 Recent failures check: ${failureCount} failures, hasRecentFailures: ${hasFailures}`);
            return hasFailures;
          }
          return false;
        } catch (e) {
          console.warn('Recent failures check failed:', e);
          return false;
        }
      })();

      // Full API mode logic - use backend unless there are specific issues
      const shouldUseDemoMode = forceDemoMode || isEmergencyMode || hasRecentFailures;

      console.log(`🎯 Generation mode decision: forceDemoMode=${forceDemoMode}, isEmergencyMode=${isEmergencyMode}, hasRecentFailures=${hasRecentFailures}, shouldUseDemoMode=${shouldUseDemoMode}`);

      if (shouldUseDemoMode) {
        console.log('⚡ Using immediate demo mode');
        setNotification({
          type: 'info',
          message: forceDemoMode
            ? 'Fast demo mode selected - generating website instantly!'
            : 'Using fast demo mode - backend issues detected'
        });

        // Generate demo content immediately
        const demoContent = {
          title: 'Demo Website',
          description: 'AI-generated demo website',
          heroHeading: 'Your Demo Website is Ready!',
          heroSubheading: 'This is a demo version of your website. All editing features are available!',
          sections: []
        };
        const demoAnalysis = {
          websiteType: 'business',
          industry: 'general',
          targetAudience: 'general',
          features: [],
          colorScheme: 'blue',
          tone: 'professional',
          pages: ['home']
        };

        const demoPageId = `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Create Builder.io page for demo
        console.log('🏗️ Creating Builder.io page for demo website...');
        const builderService = new WebsiteToBuilderService();
        const builderResult = await builderService.createBuilderPageFromWebsite({
          content: demoContent,
          analysis: demoAnalysis,
          prompt: aiPrompt,
          pageId: demoPageId
        });

        if (builderResult.success) {
          console.log('✅ Builder.io page created, navigating to editor:', builderResult.editorUrl);
          setNotification({
            type: 'success',
            message: 'Demo website created in Builder.io! Opening visual editor...'
          });
          // Navigate directly to Builder.io editor
          window.open(builderResult.editorUrl, '_blank');
        } else {
          console.warn('⚠️ Builder.io creation failed, using preview fallback');
          // Fallback to preview page
          const previewParams = new URLSearchParams({
            prompt: aiPrompt,
            analysis: JSON.stringify(demoAnalysis),
            content: JSON.stringify(demoContent),
            source: 'fast-demo'
          });
          const previewUrl = `/preview/${demoPageId}?${previewParams.toString()}`;
          router.push(previewUrl);
        }

        setShowSuccess(true);

        // Clear notifications and progress
        setTimeout(() => {
          setShowSuccess(false);
          setNotification(null);
          setGenerationProgress(null);
        }, 4000);

        setIsGenerating(false);
        return;
      }

      // Full Kadnya API Mode
      console.log('🚀 Using full Kadnya API mode - will enhance prompt and generate website');
      const kadnyaService = new KadnyaWebsiteBuilderService();

      // Configure timeout based on user preference
      const timeoutMinutes = timeoutPatience === 'quick' ? 2 : timeoutPatience === 'patient' ? 10 : 5;
      console.log(`⏱️ Using ${timeoutPatience} patience setting: ${timeoutMinutes} minute timeout`);

      // Use Kadnya API to generate website with enhanced prompt
      const result = await kadnyaService.generateWebsiteWithEnhancedPrompt(
        aiPrompt,
        undefined, // context
        (progress) => {
          // Update progress state
          setGenerationProgress(progress);
          console.log('🔄 Generation progress:', progress);
        },
        forceDemoMode, // skip backend if forced
        timeoutMinutes // user-configurable timeout
      );

      console.log('🎉 Kadnya website generation result:', result);

      // Show appropriate notification based on result
      if (result.success) {
        setShowSuccess(true);
        setNotification({
          type: 'success',
          message: 'Website generated with Kadnya AI and created in Builder.io!'
        });
      } else if (result.content && result.analysis) {
        // Even if failed, if we have content, show it
        const isTimeout = result.error?.includes('timeout') || result.error?.includes('stuck');
        const isBackendIssue = result.error?.includes('PENDING') || result.error?.includes('overloaded');
        const isSkipped = result.backendSkipped || result.error?.includes('skipped');

        setNotification({
          type: 'warning',
          message: forceDemoMode
            ? 'Fast demo mode activated - website generated instantly!'
            : isSkipped
            ? 'Auto-switched to demo mode - Kadnya servers detected as unreliable!'
            : (isTimeout || isBackendIssue)
            ? 'Kadnya AI servers are busy - generated demo website instead!'
            : 'Using demo mode - Kadnya API had issues but website still generated!'
        });
      } else {
        setNotification({
          type: 'info',
          message: 'Website generated in demo mode - all editing features available!'
        });
      }

      // Create Builder.io page and navigate to editor
      if (result.content && result.analysis) {
        console.log('🏗️ Creating Builder.io page for generated website...');
        const builderService = new WebsiteToBuilderService();
        const builderResult = await builderService.createBuilderPageFromWebsite({
          content: result.content,
          analysis: result.analysis,
          prompt: result.enhancedPrompt || aiPrompt,
          pageId: result.pageId
        });

        if (builderResult.success) {
          console.log('✅ Builder.io page created, navigating to editor:', builderResult.editorUrl);
          setNotification({
            type: 'success',
            message: 'Website created in Builder.io! Opening visual editor...'
          });
          // Navigate directly to Builder.io editor
          window.open(builderResult.editorUrl, '_blank');
        } else {
          console.warn('⚠️ Builder.io creation failed, using preview fallback');
          // Fallback to preview page
          const previewParams = new URLSearchParams({
            prompt: result.enhancedPrompt || aiPrompt,
            analysis: JSON.stringify(result.analysis),
            content: JSON.stringify(result.content),
            apiResponse: JSON.stringify(result.template),
            source: result.success ? 'kadnya-api' : 'kadnya-fallback',
            builderError: builderResult.error || 'Builder.io integration failed'
          });
          const previewUrl = `/preview/${result.pageId}?${previewParams.toString()}`;
          router.push(previewUrl);
        }
      } else {
        // Only use this fallback if we have no content at all
        throw new Error(result.error || 'No content generated');
      }

      // Clear notifications and progress
      setTimeout(() => {
        setShowSuccess(false);
        setNotification(null);
        setGenerationProgress(null);
      }, 4000);

    } catch (error) {
      console.error('❌ Kadnya AI Generation Error:', error);

      // Show error notification but still provide fallback
      setNotification({
        type: 'warning',
        message: 'Connection issue - showing demo version'
      });

      // Create fallback demo website
      const fallbackContent = {
        title: 'Demo Website',
        description: 'Generated website demo',
        heroHeading: 'Your Website Is Ready!',
        heroSubheading: 'Check out this demo version of your generated website',
        sections: []
      };
      const fallbackAnalysis = {
        websiteType: 'business',
        industry: 'general',
        targetAudience: 'general',
        features: [],
        colorScheme: 'blue',
        tone: 'professional',
        pages: ['home']
      };

      const fallbackParams = new URLSearchParams({
        prompt: aiPrompt,
        analysis: JSON.stringify(fallbackAnalysis),
        content: JSON.stringify(fallbackContent),
        source: 'fallback'
      });

      // Try to create Builder.io page even for fallback
      const fallbackPageId = `fallback-${Date.now()}`;
      try {
        const builderService = new WebsiteToBuilderService();
        const builderResult = await builderService.createBuilderPageFromWebsite({
          content: fallbackContent,
          analysis: fallbackAnalysis,
          prompt: aiPrompt,
          pageId: fallbackPageId
        });

        if (builderResult.success) {
          console.log('✅ Fallback Builder.io page created:', builderResult.editorUrl);
          window.open(builderResult.editorUrl, '_blank');
          return;
        }
      } catch (builderError) {
        console.warn('⚠️ Fallback Builder.io creation failed:', builderError);
      }

      // Final fallback to preview page
      const fallbackUrl = `/preview/${fallbackPageId}?${fallbackParams.toString()}`;
      console.log('Navigating to fallback preview URL:', fallbackUrl);
      router.push(fallbackUrl);

      // Clear progress on error
      setGenerationProgress(null);
    }

    setIsGenerating(false);
  };

  const handleVisualEditor = () => {
    router.push('/visual-editor');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Backend Status Banner - Only show when there are actual issues */}
      {(backendStatus.isLoaded && backendStatus.autoSkipped) && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-40 px-6 py-3 rounded-lg shadow-lg max-w-2xl ${
          backendStatus.emergencyMode ? 'bg-red-500' : 'bg-orange-500'
        } text-white`}>
          <div className="flex items-center gap-2">
            <span>{backendStatus.emergencyMode ? '🚨' : '⚠️'}</span>
            <span className="text-sm font-medium">
              {backendStatus.emergencyMode
                ? `Emergency Mode: Backend disabled (${backendStatus.timeLeft}min remaining)`
                : `Backend auto-disabled due to failures (${backendStatus.timeLeft}min remaining)`
              }
            </span>
          </div>
        </div>
      )}

      {/* Notification Banner */}
      {notification && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg max-w-md ${
          notification.type === 'success' ? 'bg-green-500 text-white' :
          notification.type === 'info' ? 'bg-blue-500 text-white' :
          'bg-yellow-500 text-black'
        }`}>
          <div className="flex items-center gap-2">
            <span>
              {notification.type === 'success' ? '✅' :
               notification.type === 'info' ? 'ℹ️' : '⚠️'}
            </span>
            <span className="text-sm font-medium">{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="ml-2 text-current opacity-70 hover:opacity-100"
            >
              ×
            </button>
          </div>
        </div>
      )}
      {/* Hero Section with AI Prompt */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">Kadnya AI-Powered Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              Kadnya: AI Website Builder
            </h1>

            <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into beautiful websites instantly with Kadnya's AI-powered platform. Use intelligent design suggestions or start with professional templates.
            </p>

            {/* AI Prompt Input Section */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl">
                    <Wand2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold">AI Website Generator</h3>
                    <p className="text-purple-100 text-sm">Describe your website and watch AI build it</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Textarea
                    placeholder="Describe your website... e.g., 'Create a modern portfolio website for a graphic designer with a dark theme, portfolio gallery, contact form, and blog section'"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    rows={4}
                    className="w-full bg-white/20 border-white/30 text-white placeholder:text-purple-200 rounded-xl text-lg resize-none"
                  />

                  {/* Backend Status & Demo Mode Toggle */}
                  <div className="space-y-2">
                    {backendStatus.isLoaded && backendStatus.autoSkipped && (
                      <div className={`flex items-center justify-between gap-2 p-2 rounded-lg border ${
                        backendStatus.emergencyMode
                          ? 'bg-red-500/20 border-red-400/30'
                          : 'bg-orange-500/20 border-orange-400/30'
                      }`}>
                        <span className={`text-xs ${
                          backendStatus.emergencyMode ? 'text-red-200' : 'text-orange-200'
                        }`}>
                          {backendStatus.emergencyMode ? '🚨' : '⚠️'} Kadnya AI {backendStatus.emergencyMode ? 'EMERGENCY MODE' : 'auto-disabled'} ({backendStatus.failures} failures) - will retry in {backendStatus.timeLeft}min
                        </span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              try {
                                const emergencyMode = safeLocalStorageGet('kadnya_emergency_mode');
                                const emergencyTime = safeLocalStorageGet('kadnya_emergency_time');
                                const failures = safeLocalStorageGet('kadnya_backend_failures');
                                const lastFailure = safeLocalStorageGet('kadnya_last_failure_time');

                                console.log('🔍 Current backend status:');
                                console.log('Emergency mode:', emergencyMode);
                                console.log('Emergency time:', emergencyTime ? new Date(parseInt(emergencyTime)).toLocaleString() : 'none');
                                console.log('Failures:', failures);
                                console.log('Last failure:', lastFailure ? new Date(parseInt(lastFailure)).toLocaleString() : 'none');

                                alert(`Emergency: ${emergencyMode}\nFailures: ${failures}\nLast failure: ${lastFailure ? new Date(parseInt(lastFailure)).toLocaleString() : 'none'}`);
                              } catch (e) {
                                console.error('Debug failed:', e);
                              }
                            }}
                            className="text-xs px-2 py-1 bg-blue-400/30 hover:bg-blue-400/50 text-blue-100 rounded transition-colors"
                          >
                            Debug
                          </button>
                          <button
                            onClick={() => {
                              try {
                                safeLocalStorageRemove('kadnya_backend_failures');
                                safeLocalStorageRemove('kadnya_last_failure_time');
                                safeLocalStorageRemove('kadnya_emergency_mode');
                                safeLocalStorageRemove('kadnya_emergency_time');
                                window.location.reload(); // Refresh to update status
                              } catch {
                                // Ignore errors
                              }
                            }}
                            className={`text-xs px-2 py-1 rounded transition-colors ${
                              backendStatus.emergencyMode
                                ? 'bg-red-400/30 hover:bg-red-400/50 text-red-100'
                                : 'bg-orange-400/30 hover:bg-orange-400/50 text-orange-100'
                            }`}
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg border border-white/20">
                      <input
                        type="checkbox"
                        id="forceDemoMode"
                        checked={forceDemoMode || backendStatus.autoSkipped}
                        onChange={(e) => setForceDemoMode(e.target.checked)}
                        disabled={backendStatus.autoSkipped}
                        className="w-4 h-4 text-yellow-400 bg-white/20 border-white/30 rounded focus:ring-yellow-300 focus:ring-2 disabled:opacity-50"
                      />
                      <div>
                        <label htmlFor="forceDemoMode" className="text-sm text-white/90 cursor-pointer">
                          ⚡ Fast Demo Mode (skip Kadnya API and generate instantly)
                        </label>
                        <div className="text-xs text-white/70 mt-1">
                          {backendStatus.autoSkipped
                            ? 'Demo mode forced due to backend issues - will auto-retry later'
                            : 'Enable to skip API calls for instant results, or uncheck for full Kadnya AI generation'
                          }
                        </div>
                      </div>
                    </div>

                    {/* Timeout Patience Setting - only show when not in demo mode */}
                    {!forceDemoMode && !backendStatus.autoSkipped && (
                      <div className="space-y-2 p-3 bg-white/5 rounded-lg border border-white/10">
                        <label className="text-sm text-white/90 font-medium">⏱️ Generation Patience</label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => setTimeoutPatience('quick')}
                            className={`px-3 py-2 rounded-lg text-xs transition-colors ${
                              timeoutPatience === 'quick'
                                ? 'bg-orange-500 text-white'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                          >
                            🚀 Quick (2 min)
                          </button>
                          <button
                            type="button"
                            onClick={() => setTimeoutPatience('normal')}
                            className={`px-3 py-2 rounded-lg text-xs transition-colors ${
                              timeoutPatience === 'normal'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                          >
                            ⏰ Normal (5 min)
                          </button>
                          <button
                            type="button"
                            onClick={() => setTimeoutPatience('patient')}
                            className={`px-3 py-2 rounded-lg text-xs transition-colors ${
                              timeoutPatience === 'patient'
                                ? 'bg-green-500 text-white'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                          >
                            🧘 Patient (10 min)
                          </button>
                        </div>
                        <div className="text-xs text-white/60">
                          {timeoutPatience === 'quick' && 'Best for testing - faster timeout if backend is slow'}
                          {timeoutPatience === 'normal' && 'Recommended - balanced between speed and reliability'}
                          {timeoutPatience === 'patient' && 'Best for complex sites - waits longer for high-quality results'}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sample Prompts */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setAiPrompt("Create a modern cooking website with recipes, blog, and cooking courses")}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-sm text-white transition-colors"
                    >
                      ��� Cooking Site
                    </button>
                    <button
                      onClick={() => setAiPrompt("Build a professional teaching platform with courses, testimonials, and free assessment")}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-sm text-white transition-colors"
                    >
                      ���� Teaching Platform
                    </button>
                    <button
                      onClick={() => setAiPrompt("Design a portfolio website for a photographer with dark theme and image gallery")}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-sm text-white transition-colors"
                    >
                      📷 Portfolio
                    </button>
                  </div>

                  <Button
                    onClick={handleAiGenerate}
                    disabled={!aiPrompt.trim() || isGenerating}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold py-4 rounded-xl text-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        <div className="text-left">
                          <div className="font-semibold">
                            {generationProgress?.step === 'enhance' && 'Enhancing prompt...'}
                            {generationProgress?.step === 'generate' && 'Starting generation...'}
                            {generationProgress?.step === 'processing' && (
                              generationProgress?.status === 'DELAYED'
                                ? `AI server is busy, please wait... (up to ${timeoutPatience === 'quick' ? '2' : timeoutPatience === 'patient' ? '10' : '5'} min)`
                                : 'AI is working...'
                            )}
                            {generationProgress?.step === 'complete' && 'Finalizing...'}
                            {generationProgress?.step === 'fallback' && (
                              generationProgress?.status === 'SKIPPED'
                                ? 'Using fast demo mode...'
                                : 'Creating demo website...'
                            )}
                            {!generationProgress && (
                              forceDemoMode || backendStatus.autoSkipped
                                ? 'Generating demo website...'
                                : 'Connecting to Kadnya AI...'
                            )}
                          </div>
                          {generationProgress?.status && (
                            <div className="text-xs opacity-75">
                              {generationProgress.status === 'DELAYED' && '⏳ Server processing delay'}
                              {generationProgress.status === 'PENDING' && '⏳ Waiting in queue'}
                              {generationProgress.status === 'PROGRESS' && '🔄 Generating content'}
                              {generationProgress.status === 'COMPLETED' && '✅ Ready'}
                              {generationProgress.status === 'TIMEOUT' && '⚠️ Using demo mode'}
                              {generationProgress.status === 'SKIPPED' && '⚡ Fast mode active'}
                              {!['DELAYED', 'PENDING', 'PROGRESS', 'COMPLETED', 'TIMEOUT', 'SKIPPED'].includes(generationProgress.status || '') &&
                                `Status: ${generationProgress.status}`}
                              {generationProgress.progress && ` (${generationProgress.progress}%)`}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : showSuccess ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        {notification?.message || 'Website Generated! Opening Preview...'}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        {forceDemoMode || backendStatus.autoSkipped
                          ? 'Generate Demo Website (Fast Mode)'
                          : 'Generate Website with Kadnya AI'
                        }
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Editor Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Or Build Visually
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jump straight into our powerful visual editor. Drag, drop, and customize components to create your perfect website.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl">
                  <div className="p-3 bg-blue-500 rounded-xl">
                    <Layout className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Drag & Drop</h4>
                    <p className="text-sm text-gray-600">Visual builder</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl">
                  <div className="p-3 bg-purple-500 rounded-xl">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Custom Code</h4>
                    <p className="text-sm text-gray-600">Full control</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl">
                  <div className="p-3 bg-green-500 rounded-xl">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Theming</h4>
                    <p className="text-sm text-gray-600">Brand colors</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-orange-50 to-red-100 rounded-2xl">
                  <div className="p-3 bg-orange-500 rounded-xl">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Real-time</h4>
                    <p className="text-sm text-gray-600">Live preview</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleVisualEditor}
                  size="lg"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl text-lg transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <Building className="w-6 h-6" />
                    Go to Visual Editor Panel
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-4 rounded-xl text-lg transition-all duration-300 group"
                >
                  <Link href="/ai-website-generator">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-6 h-6" />
                      AI Website Generator
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Layout className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-700">Visual Editor Preview</h4>
                    <p className="text-gray-500 text-sm">Drag & drop interface</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Start with Templates
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our professionally designed templates and customize them to match your vision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Cooking Template */}
            <Link href="/templates/cooking" className="group">
              <Card className="w-full shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl cursor-pointer overflow-hidden bg-white group-hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/mobile_hero_section.png"
                    alt="Cooking Template"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      🍳 Food & Cooking
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Cooking Template
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Master the art of cooking with our beginner-friendly template. Create delightful dishes step by step with professional layouts.
                  </p>
                  <div className="mt-4 flex items-center text-indigo-600 font-medium group-hover:text-purple-600 transition-colors">
                    View Template
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Teaching Template */}
            <Link href="/templates/teaching" className="group">
              <Card className="w-full shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl cursor-pointer overflow-hidden bg-white group-hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/about_hero_section.png"
                    alt="Teaching Template"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      🎓 Education
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Teaching Template
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Empower learners and share knowledge effectively with our professional teaching template designed for educators.
                  </p>
                  <div className="mt-4 flex items-center text-indigo-600 font-medium group-hover:text-purple-600 transition-colors">
                    View Template
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Dynamic Demo Template */}
            <Link href="/dynamic-demo" className="group flex flex-col justify-start items-start gap-0.5">
              <Card className="w-full shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl cursor-pointer overflow-hidden bg-white group-hover:scale-105">
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Layout className="w-16 h-16 mx-auto mb-4 opacity-80" />
                      <h4 className="text-xl font-bold">Dynamic Components</h4>
                      <p className="text-sm opacity-80">Live Demo</p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-2 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ⚡ Interactive
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Dynamic Components
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Explore our dynamic content system with courses, products, and blog components that connect to live data.
                  </p>
                  <div className="mt-4 flex items-center text-indigo-600 font-medium group-hover:text-purple-600 transition-colors">
                    Try Demo
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Join thousands of creators who are building beautiful websites with Kadnya's AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleVisualEditor}
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300"
            >
              Start Building Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-[#5b37f7] hover:bg-white hover:text-indigo-600 font-semibold py-4 px-8 rounded-[55px] text-lg transition-all duration-300 overflow-hidden"
            >
              View Templates
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
