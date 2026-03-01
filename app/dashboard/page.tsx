'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, Search, MessageSquareText, Settings, Activity, Users,
  TrendingUp, AlertCircle, Play, Pause, Plus, Trash2, Bot, PenTool, Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import StatCard from '@/components/dashboard/StatCard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import Chart from '@/components/dashboard/Chart';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input, { TextArea } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import Badge from '@/components/ui/Badge';

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');

  // State
  const [systemActive, setSystemActive] = useState(false);
  const [stats, setStats] = useState({ commentsToday: 0, postsScanned: 0, profileViews: 0 });
  const [logs, setLogs] = useState<any[]>([]);
  const [keywords, setKeywords] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [autoPosts, setAutoPosts] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});

  // Form states
  const [newKeyword, setNewKeyword] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentCat, setNewCommentCat] = useState('General');
  const [newTopic, setNewTopic] = useState('');

  const fetchData = async () => {
    // Fetch Settings
    const setRes = await fetch('/api/settings');

    if (setRes.status === 401) {
      router.push('/login');
      return;
    }

    if (setRes.ok) {
      const data = await setRes.json();
      setSettings(data);
      setSystemActive(data.systemActive);
    }

    // Fetch Stats & Logs for Dashboard
    if (activeTab === 'dashboard') {
      const stRes = await fetch('/api/stats');
      if (stRes.ok) setStats(await stRes.json());
      const lgRes = await fetch('/api/logs');
      if (lgRes.ok) setLogs(await lgRes.json());
    }

    // Fetch Keywords
    if (activeTab === 'keywords') {
      const kwRes = await fetch('/api/keywords');
      if (kwRes.ok) setKeywords(await kwRes.json());
    }

    // Fetch Comments
    if (activeTab === 'comments') {
      const cmRes = await fetch('/api/comments');
      if (cmRes.ok) setComments(await cmRes.json());
    }

    // Fetch AutoPosts
    if (activeTab === 'autoposts') {
      const apRes = await fetch('/api/autoposts');
      if (apRes.ok) setAutoPosts(await apRes.json());
    }
  };

  useEffect(() => {
    // Small delay on first load to ensure cookie is set
    const initialTimeout = setTimeout(fetchData, 100);
    
    // Then poll every 5 seconds
    const interval = setInterval(fetchData, 5000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [activeTab]);

  const toggleSystem = async () => {
    const newState = !systemActive;
    setSystemActive(newState);
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemActive: newState })
    });
  };

  const addKeyword = async () => {
    if (!newKeyword) return;
    await fetch('/api/keywords', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword: newKeyword })
    });
    setNewKeyword('');
    fetchData();
  };

  const deleteKeyword = async (id: string) => {
    await fetch(`/api/keywords/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const addComment = async () => {
    if (!newCommentText) return;
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newCommentText, category: newCommentCat })
    });
    setNewCommentText('');
    setNewCommentCat('General');
    fetchData();
  };

  const deleteComment = async (id: string) => {
    await fetch(`/api/comments/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const generateAutoPost = async () => {
    if (!newTopic) return;
    await fetch('/api/autoposts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: newTopic })
    });
    setNewTopic('');
    fetchData();
  };

  const deleteAutoPost = async (id: string) => {
    await fetch(`/api/autoposts/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const saveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      maxCommentsPerDay: Number(formData.get('maxCommentsPerDay')),
      maxProfileViewsPerDay: Number(formData.get('maxProfileViewsPerDay')),
      minLikes: Number(formData.get('minLikes')),
      minComments: Number(formData.get('minComments')),
      minDelayMins: Number(formData.get('minDelayMins')),
      maxDelayMins: Number(formData.get('maxDelayMins')),
      linkedinSessionCookie: formData.get('linkedinSessionCookie') as string
    };
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    alert('Settings Saved!');
    fetchData();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        // Mock chart data
        const chartData = [
          { name: 'Mon', value: 12 },
          { name: 'Tue', value: 19 },
          { name: 'Wed', value: 15 },
          { name: 'Thu', value: 25 },
          { name: 'Fri', value: 22 },
          { name: 'Sat', value: 18 },
          { name: 'Sun', value: 20 },
        ];

        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Comments Today"
                value={stats.commentsToday}
                maxValue={settings.maxCommentsPerDay || 50}
                icon={<MessageSquareText className="w-5 h-5" />}
                iconColor="primary"
                showProgress
                trend="+12%"
                trendUp
                delay={0}
              />

              <StatCard
                title="Posts Scanned"
                value={stats.postsScanned}
                icon={<Search className="w-5 h-5" />}
                iconColor="secondary"
                delay={0.1}
              />

              <StatCard
                title="Profile Views"
                value={stats.profileViews || 0}
                icon={<Users className="w-5 h-5" />}
                iconColor="accent"
                trend="+8%"
                trendUp
                delay={0.2}
              />

              <div className="md:col-span-1">
                <Card hover>
                  <div className="flex items-center justify-between h-full">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                        System Status
                      </p>
                      <h3 className="text-xl font-extrabold text-gray-900">
                        {systemActive ? 'Autopilot Active' : 'Standby Mode'}
                      </h3>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      {systemActive && (
                        <span className="relative flex h-4 w-4">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-success-500"></span>
                        </span>
                      )}
                      <Button
                        onClick={toggleSystem}
                        variant={systemActive ? 'secondary' : 'primary'}
                        size="sm"
                        leftIcon={systemActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      >
                        {systemActive ? 'Pause' : 'Start'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Chart */}
            <Chart data={chartData} />

            {/* Activity Feed */}
            <ActivityFeed logs={logs} />
          </div>
        );
      case 'keywords':
        return (
          <Card>
            <div className="p-6 md:p-8 border-b border-gray-100">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Search className="w-5 h-5 text-primary-500" />
                    Target Keywords
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Manage the phrases your AI agent scans for on LinkedIn
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={newKeyword}
                    onChange={e => setNewKeyword(e.target.value)}
                    placeholder="E.g. #growthhacking"
                    className="min-w-[200px]"
                  />
                  <Button onClick={addKeyword} leftIcon={<Plus className="w-4 h-4" />}>
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Keyword
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Matches
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {keywords.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                            <Search className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-sm font-semibold text-gray-900 mb-1">
                            No keywords yet
                          </p>
                          <p className="text-sm text-gray-500">
                            Add your first keyword above to start targeting posts
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : keywords.map((kw) => (
                    <tr key={kw.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-900">
                          {kw.keyword}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="neutral" size="sm">
                          {kw.matches || 0} hits
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteKeyword(kw.id)}
                          className="text-gray-400 hover:text-error-600 hover:bg-error-50 p-2 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        );
      case 'comments':
        return (
          <Card>
            <div className="p-6 md:p-8 border-b border-gray-100">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <MessageSquareText className="w-5 h-5 text-primary-500" />
                    Comment Bank
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Pre-written thoughts your agent will deploy on LinkedIn
                  </p>
                </div>

                {/* Add Comment Form */}
                <div className="flex flex-col lg:flex-row items-start lg:items-end gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <Input
                    label="Category"
                    type="text"
                    value={newCommentCat}
                    onChange={e => setNewCommentCat(e.target.value)}
                    placeholder="General"
                    className="lg:w-40"
                  />
                  <TextArea
                    label="Comment Text"
                    value={newCommentText}
                    onChange={e => setNewCommentText(e.target.value)}
                    placeholder="Type a thoughtful comment..."
                    rows={2}
                    className="flex-1 min-w-[250px]"
                    showCharCount
                    maxLength={280}
                  />
                  <Button onClick={addComment} leftIcon={<Plus className="w-4 h-4" />} className="lg:mb-0">
                    Add Comment
                  </Button>
                </div>
              </div>
            </div>

            {/* Comments Grid */}
            <div className="p-6 md:p-8">
              {comments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <MessageSquareText className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    No comments yet
                  </p>
                  <p className="text-sm text-gray-500">
                    Add your first comment template above
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {comments.map((comment) => (
                    <Card key={comment.id} variant="default" hover className="group relative">
                      <div className="flex justify-between items-start mb-3">
                        <Badge variant="primary" size="sm">
                          {comment.category}
                        </Badge>
                        <button
                          onClick={() => deleteComment(comment.id)}
                          className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-error-600 hover:bg-error-50 p-1.5 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        "{comment.text}"
                      </p>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Card>
        );
      case 'cookie-helper':
        // Redirect to dedicated cookie helper page
        if (typeof window !== 'undefined') {
          window.location.href = '/cookie-helper';
        }
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Spinner size="lg" />
              <p className="mt-4 text-gray-600">Redirecting to Cookie Helper...</p>
            </div>
          </div>
        );
      case 'autoposts':
        return (
          <Card>
            <div className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-r from-secondary-50 via-accent-50 to-transparent">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-secondary-600" />
                    AI Auto-Posts
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Generate thought leadership content on autopilot using Gemini
                  </p>
                </div>

                {/* Generate Form */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
                  <Input
                    label="Topic or Idea"
                    type="text"
                    value={newTopic}
                    onChange={e => setNewTopic(e.target.value)}
                    placeholder="E.g. The future of SaaS pricing..."
                    className="flex-1 min-w-[300px]"
                    leftIcon={<PenTool className="w-4 h-4" />}
                  />
                  <Button
                    onClick={generateAutoPost}
                    variant="secondary"
                    leftIcon={<Bot className="w-4 h-4" />}
                  >
                    Generate Post
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Topic
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Content Preview
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {autoPosts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-secondary-100 to-accent-100 flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-secondary-600" />
                          </div>
                          <p className="text-sm font-semibold text-gray-900 mb-1">
                            No posts generated yet
                          </p>
                          <p className="text-sm text-gray-500">
                            Enter a topic above to let AI create your first post
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : autoPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 max-w-[200px]">
                        <span className="text-sm font-semibold text-gray-900 line-clamp-2">
                          {post.topic}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={post.status === 'Published' ? 'success' : 'info'}
                          size="sm"
                        >
                          {post.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 max-w-md">
                        <p className="text-sm text-gray-600 line-clamp-2 italic">
                          "{post.content}"
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteAutoPost(post.id)}
                          className="text-gray-400 hover:text-error-600 hover:bg-error-50 p-2 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        );
      case 'settings':
        return (
          <div className="max-w-4xl mx-auto">
            <Card>
              <div className="p-6 md:p-8 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary-500" />
                  Agent Configuration
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Fine-tune your autopilot's parameters and safety thresholds
                </p>
              </div>
              <form onSubmit={saveSettings} className="p-6 md:p-8 space-y-8">

                {/* LinkedIn Cookie Section */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute right-0 top-0 text-white/5 opacity-50 scale-150 -translate-y-1/4 translate-x-1/4">
                    <Bot size={200} />
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-sm font-extrabold text-white mb-3 flex items-center gap-2">
                      <AlertCircle size={16} className="text-primary-500" />
                      LinkedIn Session Cookie
                    </h4>
                    <input
                      type="password"
                      name="linkedinSessionCookie"
                      defaultValue={settings.linkedinSessionCookie}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-mono text-sm placeholder:text-gray-500"
                      placeholder="AQEDATX..."
                    />
                    <p className="text-xs text-gray-400 mt-2">
                      The <code className="px-1.5 py-0.5 bg-gray-800 rounded text-primary-400">li_at</code> cookie required for authentication
                    </p>
                  </div>
                </div>

                {/* Rate Limits & Engagement Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Rate Limits */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary-500" />
                      Rate Limits
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                          Max Comments / Day
                        </label>
                        <input
                          type="number"
                          name="maxCommentsPerDay"
                          defaultValue={settings.maxCommentsPerDay ?? 50}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                          Max Profile Views / Day
                        </label>
                        <input
                          type="number"
                          name="maxProfileViewsPerDay"
                          defaultValue={settings.maxProfileViewsPerDay ?? 100}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Engagement Thresholds */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                      <Users className="w-4 h-4 text-secondary-500" />
                      Engagement Thresholds
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                          Minimum Likes to Comment
                        </label>
                        <input
                          type="number"
                          name="minLikes"
                          defaultValue={settings.minLikes ?? 10}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                          Minimum Existing Comments
                        </label>
                        <input
                          type="number"
                          name="minComments"
                          defaultValue={settings.minComments ?? 2}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100"></div>

                {/* Human Emulation */}
                <div>
                  <h4 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                    <Bot className="w-4 h-4 text-accent-500" />
                    Human Emulation (Delays)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                        Min Delay (Minutes)
                      </label>
                      <input
                        type="number"
                        name="minDelayMins"
                        defaultValue={settings.minDelayMins ?? 15}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                        Max Delay (Minutes)
                      </label>
                      <input
                        type="number"
                        name="maxDelayMins"
                        defaultValue={settings.maxDelayMins ?? 45}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 flex justify-end border-t border-gray-100">
                  <Button type="submit" variant="primary" size="lg">
                    Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        systemActive={systemActive} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          title={activeTab} 
          sessionConnected={!!settings.linkedinSessionCookie} 
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50 relative">
          {/* Background pattern for depth */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10"></div>

          <div className="max-w-[1400px] mx-auto pb-20">
            {renderContent()}
          </div>
        </main>
      </div>
    </>
  );
}


