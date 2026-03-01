'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input, { TextArea } from '@/components/ui/Input';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Modal, { ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter } from '@/components/ui/Modal';
import { showToast } from '@/components/ui/Toast';
import Spinner, { DotsSpinner, PulseSpinner } from '@/components/ui/Spinner';
import Skeleton, { SkeletonCard, SkeletonAvatar, SkeletonText, SkeletonTable } from '@/components/ui/Skeleton';
import { CheckCircle, AlertCircle, Mail, Search, Plus, ArrowRight } from 'lucide-react';

export default function ComponentsTestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Component Library Test
          </h1>
          <p className="text-xl text-gray-600">
            Testing all UI components from Phase 1
          </p>
        </div>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>All button variants and sizes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Variants */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Variants</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Sizes</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
              </div>

              {/* With Icons */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">With Icons</h4>
                <div className="flex flex-wrap gap-3">
                  <Button leftIcon={<Plus className="w-4 h-4" />}>Add Item</Button>
                  <Button rightIcon={<ArrowRight className="w-4 h-4" />}>Continue</Button>
                  <Button variant="secondary" leftIcon={<CheckCircle className="w-4 h-4" />}>
                    Confirmed
                  </Button>
                </div>
              </div>

              {/* States */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">States</h4>
                <div className="flex flex-wrap gap-3">
                  <Button isLoading>Loading</Button>
                  <Button disabled>Disabled</Button>
                  <Button fullWidth>Full Width Button</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inputs */}
        <Card>
          <CardHeader>
            <CardTitle>Input Fields</CardTitle>
            <CardDescription>Text inputs, textareas, and states</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 max-w-2xl">
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email..."
                helperText="We'll never share your email"
                fullWidth
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter password..."
                fullWidth
              />

              <Input
                label="Search"
                placeholder="Search..."
                leftIcon={<Search className="w-4 h-4" />}
                fullWidth
              />

              <Input
                label="Email with Icon"
                type="email"
                placeholder="your@email.com"
                rightIcon={<Mail className="w-4 h-4" />}
                fullWidth
              />

              <Input
                label="Error State"
                placeholder="Enter something..."
                error="This field is required"
                fullWidth
              />

              <TextArea
                label="Message"
                placeholder="Type your message here..."
                helperText="Maximum 280 characters"
                rows={4}
                fullWidth
                showCharCount
                maxLength={280}
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="default" hover>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Standard card with hover effect</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                This is the default card variant with hover animations.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm" fullWidth>Action</Button>
            </CardFooter>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>Card with larger shadow</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                This card has an elevated appearance with enhanced shadows.
              </p>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle>Glass Card</CardTitle>
              <CardDescription>Glassmorphism effect</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Beautiful glass effect with backdrop blur.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Status indicators and labels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Variants */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Variants</h4>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="neutral">Neutral</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                </div>
              </div>

              {/* With Dots */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">With Dots</h4>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="success" dot>Active</Badge>
                  <Badge variant="warning" dot>Pending</Badge>
                  <Badge variant="error" dot>Failed</Badge>
                </div>
              </div>

              {/* With Icons */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">With Icons</h4>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="success" icon={<CheckCircle className="w-3 h-3" />}>
                    Completed
                  </Badge>
                  <Badge variant="error" icon={<AlertCircle className="w-3 h-3" />}>
                    Failed
                  </Badge>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Sizes</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge size="sm">Small</Badge>
                  <Badge size="md">Medium</Badge>
                  <Badge size="lg">Large</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modal */}
        <Card>
          <CardHeader>
            <CardTitle>Modal</CardTitle>
            <CardDescription>Dialog with animations</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <ModalHeader>
                <ModalTitle>Modal Title</ModalTitle>
                <ModalDescription>
                  This is a modal dialog with smooth animations
                </ModalDescription>
              </ModalHeader>
              <ModalContent>
                <p className="text-sm text-gray-600">
                  This modal component includes backdrop blur, enter/exit animations, 
                  ESC key support, and click-outside-to-close functionality.
                </p>
                <div className="mt-4 space-y-3">
                  <Input label="Name" placeholder="Enter your name..." fullWidth />
                  <Input label="Email" type="email" placeholder="your@email.com" fullWidth />
                </div>
              </ModalContent>
              <ModalFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>
                  Confirm
                </Button>
              </ModalFooter>
            </Modal>
          </CardContent>
        </Card>

        {/* Toasts */}
        <Card>
          <CardHeader>
            <CardTitle>Toast Notifications</CardTitle>
            <CardDescription>Temporary notification messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => showToast.success('Operation completed successfully!')}>
                Success Toast
              </Button>
              <Button onClick={() => showToast.error('Something went wrong!')}>
                Error Toast
              </Button>
              <Button onClick={() => showToast.warning('Please review your changes')}>
                Warning Toast
              </Button>
              <Button onClick={() => showToast.info('Here is some useful information')}>
                Info Toast
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Spinners */}
        <Card>
          <CardHeader>
            <CardTitle>Loading Spinners</CardTitle>
            <CardDescription>Loading state indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Default Spinner */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Default Spinner</h4>
                <div className="flex items-center gap-4">
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                  <Spinner size="xl" />
                </div>
              </div>

              {/* Dots Spinner */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Dots Spinner</h4>
                <div className="flex items-center gap-4">
                  <DotsSpinner size="sm" />
                  <DotsSpinner size="md" />
                  <DotsSpinner size="lg" />
                </div>
              </div>

              {/* Pulse Spinner */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Pulse Spinner</h4>
                <div className="flex items-center gap-4">
                  <PulseSpinner size="sm" />
                  <PulseSpinner size="md" />
                  <PulseSpinner size="lg" />
                </div>
              </div>

              {/* Colors */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Colors</h4>
                <div className="flex items-center gap-4">
                  <Spinner color="primary" />
                  <Spinner color="gray" />
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <Spinner color="white" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skeletons */}
        <Card>
          <CardHeader>
            <CardTitle>Skeleton Loaders</CardTitle>
            <CardDescription>Loading placeholders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Basic Skeletons */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Basic Skeletons</h4>
                <div className="space-y-3 max-w-md">
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="rectangular" height={100} />
                  <div className="flex items-center gap-3">
                    <Skeleton variant="circular" width={40} height={40} />
                    <div className="flex-1 space-y-2">
                      <Skeleton variant="text" width="70%" />
                      <Skeleton variant="text" width="50%" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pre-built Patterns */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Pre-built Patterns</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <SkeletonCard />
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <SkeletonAvatar size="lg" />
                      <div className="flex-1">
                        <SkeletonText lines={2} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Skeleton */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Table Skeleton</h4>
                <SkeletonTable rows={3} columns={4} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-12">
          <p className="text-sm text-gray-500">
            ✅ Phase 1: Design System Foundation - All Components Complete
          </p>
        </div>
      </div>
    </div>
  );
}
