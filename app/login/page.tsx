'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { motion } from 'motion/react';
import { Bot, MessageSquare, PenTool, Mail, Lock, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { showToast } from '@/components/ui/Toast';
import NexoraLogo from '@/components/ui/NexoraLogo';

export default function LoginPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/dashboard');
        }
    }, [status, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // Important: include cookies
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            showToast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
            
            // Use window.location to ensure cookies are properly set before navigation
            window.location.href = '/dashboard';
        } catch (err: any) {
            setError(err.message);
            showToast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl"
            >
                <Card variant="elevated" padding="none" className="flex flex-col md:flex-row overflow-hidden">
                    {/* Left Side: Value Prop */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full md:w-1/2 p-12 bg-gradient-to-br from-gray-50 to-white border-r border-gray-100 hidden md:flex flex-col justify-center"
                    >
                        {/* Logo */}
                        <Link href="/" className="inline-block mb-12 group">
                            <NexoraLogo size="lg" showText={true} />
                        </Link>

                        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-gray-900">
                            Your{' '}
                            <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                                AI Agent
                            </span>{' '}
                            is waiting.
                        </h1>
                        <p className="text-gray-600 mb-12 text-lg">
                            Start growing your LinkedIn presence on autopilot in just 2 minutes.
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                                    <MessageSquare className="text-primary-600 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Smart Comment Engine</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Borrow reach from influencers by adding value to their posts
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-secondary-50 flex items-center justify-center flex-shrink-0">
                                    <PenTool className="text-secondary-600 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Auto-Generated Posts</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Thought leadership content based on real trends and your brand
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-accent-50 flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="text-accent-600 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Full Autopilot</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Set it once and let AI handle your LinkedIn engagement 24/7
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Login Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white"
                    >
                        {/* Mobile Logo */}
                        <Link href="/" className="inline-block md:hidden mb-8 group">
                            <NexoraLogo size="md" showText={true} />
                        </Link>

                        <div className="mb-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                                {isLogin ? 'Welcome back' : 'Get started'}
                            </h2>
                            <p className="text-gray-600">
                                {isLogin
                                    ? 'Sign in to check on your agent and LinkedIn growth'
                                    : 'Create your account and start growing today'}
                            </p>
                        </div>

                        {/* Google Sign In - PRIMARY METHOD */}
                        <div className="mb-6">
                            <Button
                                type="button"
                                onClick={async () => {
                                    setGoogleLoading(true);
                                    try {
                                        await signIn('google', { callbackUrl: '/dashboard' });
                                    } catch (error: any) {
                                        showToast.error('Failed to sign in with Google');
                                        setGoogleLoading(false);
                                    }
                                }}
                                variant="outline"
                                size="lg"
                                fullWidth
                                isLoading={googleLoading}
                                className="border-2 border-gray-300 hover:border-primary-500 hover:bg-primary-50 transition-all"
                            >
                                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
                            </Button>
                            
                            <div className="mt-4 text-center">
                                <p className="text-xs text-gray-600 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5">
                                    🔒 <span className="font-bold">Secure Gmail-only authentication</span> - Only Gmail accounts are accepted
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with email</span>
                            </div>
                        </div>

                        {/* Email/Password Form - LEGACY SUPPORT */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Input
                                label="Email Address"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                leftIcon={<Mail className="w-4 h-4" />}
                                error={error && error.toLowerCase().includes('email') ? error : undefined}
                                fullWidth
                            />

                            <div>
                                <Input
                                    label="Password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    leftIcon={<Lock className="w-4 h-4" />}
                                    error={error && error.toLowerCase().includes('password') ? error : undefined}
                                    fullWidth
                                />
                                {isLogin && (
                                    <div className="mt-2 text-right">
                                        <a
                                            href="#"
                                            className="text-sm text-primary-500 font-semibold hover:text-primary-600 transition-colors"
                                        >
                                            Forgot password?
                                        </a>
                                    </div>
                                )}
                            </div>

                            <Button
                                type="submit"
                                variant="secondary"
                                size="lg"
                                fullWidth
                                isLoading={loading}
                            >
                                {isLogin ? 'Sign In' : 'Create Account'}
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-600">
                                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsLogin(!isLogin);
                                        setError('');
                                    }}
                                    className="font-semibold text-primary-500 hover:text-primary-600 transition-colors"
                                >
                                    {isLogin ? 'Sign up' : 'Sign in'}
                                </button>
                            </p>
                        </div>

                        {!isLogin && (
                            <p className="mt-6 text-xs text-center text-gray-500">
                                By creating an account, you agree to our{' '}
                                <a href="#" className="text-primary-500 hover:underline">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-primary-500 hover:underline">
                                    Privacy Policy
                                </a>
                            </p>
                        )}
                    </motion.div>
                </Card>
            </motion.div>
        </div>
    );
}
