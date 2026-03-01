'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import Spinner from '@/components/ui/Spinner';

export default function CookieHelperPage() {
  const [cookie, setCookie] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<'success' | 'error' | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const validateCookie = async () => {
    if (!cookie.trim()) {
      setValidationResult('error');
      return;
    }

    setIsValidating(true);
    setValidationResult(null);

    try {
      // Basic validation - check if it looks like a LinkedIn cookie
      const isValid = cookie.length > 50 && !cookie.includes(' ') && cookie.match(/^[A-Za-z0-9\-_=]+$/);
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (isValid) {
        setValidationResult('success');
      } else {
        setValidationResult('error');
      }
    } catch (error) {
      setValidationResult('error');
    } finally {
      setIsValidating(false);
    }
  };

  const saveCookie = async () => {
    if (validationResult !== 'success') return;

    setIsSaving(true);

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkedinSessionCookie: cookie }),
      });

      if (response.ok) {
        alert('✅ LinkedIn cookie saved successfully!');
        setCookie('');
        setValidationResult(null);
      } else {
        alert('❌ Failed to save cookie. Please try again.');
      }
    } catch (error) {
      alert('❌ Error saving cookie. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const steps = [
    {
      number: 1,
      title: 'Open LinkedIn',
      description: 'Go to linkedin.com and make sure you are logged in',
      icon: '🌐',
    },
    {
      number: 2,
      title: 'Open Developer Tools',
      description: 'Press F12 on your keyboard (or right-click → Inspect)',
      icon: '🔧',
      tips: [
        'Windows/Linux: Press F12 or Ctrl+Shift+I',
        'Mac: Press Cmd+Option+I',
        'Or right-click anywhere → "Inspect"',
      ],
    },
    {
      number: 3,
      title: 'Go to Application Tab',
      description: 'Click on the "Application" tab in Developer Tools',
      icon: '📱',
      tips: [
        'If you don\'t see "Application", click the ">>" button',
        'Look for it in the top menu of DevTools',
      ],
    },
    {
      number: 4,
      title: 'Find Cookies',
      description: 'Expand "Cookies" → Click on "https://www.linkedin.com"',
      icon: '🍪',
    },
    {
      number: 5,
      title: 'Copy li_at Cookie',
      description: 'Find the cookie named "li_at" and copy its VALUE',
      icon: '📋',
      tips: [
        'Click on "li_at" in the list',
        'Double-click the Value field to select all',
        'Press Ctrl+C (or Cmd+C on Mac) to copy',
        'The value should be a long string of letters and numbers',
      ],
    },
    {
      number: 6,
      title: 'Paste Below',
      description: 'Paste the cookie value in the input field below',
      icon: '✅',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🍪</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
              LinkedIn Cookie Helper
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Follow these simple steps to get your LinkedIn session cookie
          </p>
        </div>

        {/* Why do we need this? */}
        <Card className="mb-8 bg-blue-500/10 border border-blue-500/30">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h3 className="text-xl font-bold text-blue-400 mb-2">Why do we need your cookie?</h3>
                <p className="text-gray-300 leading-relaxed">
                  The LinkedIn cookie allows our automation to act on your behalf. It's like giving the 
                  automation a temporary "key" to access LinkedIn as you. This is safe and standard practice 
                  for browser automation tools.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <Badge variant="success">✓ Safe</Badge>
                  <Badge variant="success">✓ Encrypted</Badge>
                  <Badge variant="success">✓ Never Shared</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Step-by-Step Guide */}
        <div className="space-y-4 mb-8">
          {steps.map((step) => (
            <Card
              key={step.number}
              className={`transition-all cursor-pointer ${
                currentStep === step.number
                  ? 'bg-primary-500/20 border-primary-500/50 ring-2 ring-primary-500/30'
                  : 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70'
              }`}
              onClick={() => setCurrentStep(step.number)}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold ${
                        currentStep === step.number
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-700 text-gray-400'
                      }`}
                    >
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{step.icon}</span>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-gray-300 text-lg mb-3">{step.description}</p>
                    
                    {step.tips && currentStep === step.number && (
                      <div className="mt-4 bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                        <p className="text-sm font-semibold text-primary-400 mb-2">💡 Tips:</p>
                        <ul className="space-y-1">
                          {step.tips.map((tip, index) => (
                            <li key={index} className="text-sm text-gray-400 flex items-start gap-2">
                              <span className="text-primary-500 mt-0.5">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Cookie Input Section */}
        <Card className="bg-gray-800/80 border-gray-700">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span>📝</span>
              Paste Your Cookie Here
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  LinkedIn Cookie (li_at value)
                </label>
                <Input
                  type="text"
                  placeholder="Paste your li_at cookie value here..."
                  value={cookie}
                  onChange={(e) => {
                    setCookie(e.target.value);
                    setValidationResult(null);
                  }}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-2">
                  The cookie should be a long string like: AQEDATdM8TwFfr0...
                </p>
              </div>

              {/* Validation Result */}
              {validationResult === 'success' && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <span className="text-xl">✅</span>
                    <span className="font-semibold">Cookie looks valid!</span>
                  </div>
                </div>
              )}

              {validationResult === 'error' && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-red-400">
                    <span className="text-xl">❌</span>
                    <span className="font-semibold">Invalid cookie format</span>
                  </div>
                  <p className="text-sm text-red-300 mt-2">
                    Please make sure you copied the entire li_at cookie value
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={validateCookie}
                  disabled={!cookie.trim() || isValidating}
                  variant="secondary"
                  className="flex-1"
                >
                  {isValidating ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      Validating...
                    </>
                  ) : (
                    '🔍 Validate Cookie'
                  )}
                </Button>

                <Button
                  onClick={saveCookie}
                  disabled={validationResult !== 'success' || isSaving}
                  variant="primary"
                  className="flex-1"
                >
                  {isSaving ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      Saving...
                    </>
                  ) : (
                    '💾 Save Cookie'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Security Notice */}
        <Card className="mt-6 bg-yellow-500/10 border border-yellow-500/30">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <h3 className="text-lg font-bold text-yellow-400 mb-2">Security Notice</h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Your cookie is encrypted before being stored in our database</li>
                  <li>• Never share your cookie with anyone else</li>
                  <li>• If you log out of LinkedIn, you'll need to get a new cookie</li>
                  <li>• The cookie expires periodically - update it if automation stops working</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
