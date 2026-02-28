'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bot, MessageSquare, PenTool } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 flex w-full max-w-5xl overflow-hidden border border-gray-100 min-h-[500px]">

                {/* Left Side: Value Prop */}
                <div className="w-1/2 p-12 bg-[#FAFAFA] border-r border-gray-100 hidden md:flex flex-col justify-center">

                    <div className="flex items-center gap-2 mb-10">
                        <div className="bg-[#FF6B35] text-white px-3 py-1.5 rounded-l-full font-bold text-xl tracking-tight leading-none">
                            Linqin
                        </div>
                        <div className="bg-gray-100 p-1.5 rounded-full flex items-center justify-center -ml-5 shadow-sm border border-white">
                            <Bot size={20} className="text-[#FF6B35]" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight mb-10 text-zinc-900">
                        Your <span className="text-[#FF6B35]">AI Agent</span> is waiting.
                    </h1>

                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="bg-orange-50 p-3 rounded-2xl h-fit">
                                <MessageSquare className="text-[#FF6B35]" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-zinc-900 mb-1">Borrowed Reach</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">Your agent comments on influencer posts, putting your name in front of thousands.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-blue-50 p-3 rounded-2xl h-fit">
                                <PenTool className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-zinc-900 mb-1">Auto-Generated Posts</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">Thought leadership posts from real trends and data — on autopilot.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-white relative">
                    <h2 className="text-2xl font-bold text-zinc-900 mb-2">
                        {isLogin ? 'Sign in to your account' : 'Create your account'}
                    </h2>
                    <p className="text-sm text-gray-500 mb-8">
                        {isLogin ? 'Check on your agent and LinkedIn growth.' : 'Get started with your personal AI agent today.'}
                    </p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-semibold rounded-xl">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-zinc-800 mb-2">Email address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-zinc-800">Password</label>
                                {isLogin && <a href="#" className="text-sm text-[#FF6B35] font-semibold hover:underline">Forgot password?</a>}
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
                            />
                        </div>

                        <button disabled={loading} type="submit" className="w-full block text-center bg-zinc-900 text-white font-bold py-4 rounded-xl hover:bg-zinc-800 transition shadow-lg mt-4 disabled:opacity-50">
                            {loading ? 'Processing...' : (isLogin ? 'Sign In →' : 'Sign Up →')}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-8 font-medium relative z-10">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button type="button" onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-[#FF6B35] font-bold hover:underline">
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );
}
