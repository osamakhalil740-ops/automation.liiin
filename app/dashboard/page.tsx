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
    let interval = setInterval(fetchData, 5000); // refresh every 5s
    fetchData();
    return () => clearInterval(interval);
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
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm shadow-gray-200/50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-tight">Comments Today</p>
                    <h3 className="text-3xl font-extrabold text-zinc-900 mt-1">{stats.commentsToday} <span className="text-gray-400 text-xl font-medium">/ {settings.maxCommentsPerDay || 50}</span></h3>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-2xl text-[#FF6B35]">
                    <MessageSquareText size={20} />
                  </div>
                </div>
                <div className="mt-4 w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-[#FF6B35] h-2 rounded-full" style={{ width: `${Math.min(100, (stats.commentsToday / (settings.maxCommentsPerDay || 50)) * 100)}%` }}></div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm shadow-gray-200/50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-tight">Posts Scanned</p>
                    <h3 className="text-3xl font-extrabold text-zinc-900 mt-1">{stats.postsScanned}</h3>
                  </div>
                  <div className="p-3 bg-zinc-50 rounded-2xl text-zinc-800">
                    <Search size={20} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm shadow-gray-200/50 md:col-span-2">
                <div className="flex justify-between items-center h-full">
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-tight">System Status</p>
                    <h3 className="text-2xl font-extrabold text-zinc-900 mt-1">
                      {systemActive ? 'Autopilot Active' : 'Standby Mode'}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4">
                    {systemActive && <span className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                    </span>}
                    <button
                      onClick={toggleSystem}
                      className={`flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-md ${systemActive
                        ? 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-zinc-900/20'
                        : 'bg-[#FF6B35] text-white hover:bg-[#e5531d] shadow-orange-500/20'
                        }`}
                    >
                      {systemActive ? (
                        <><Pause size={16} className="mr-2" /> Pause Agent</>
                      ) : (
                        <><Play size={16} className="mr-2" /> Start Agent</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm shadow-gray-200/50">
                <h3 className="text-xl font-bold text-zinc-900 mb-6">Activity Stream</h3>
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4">
                  {logs.length === 0 ? <p className="text-sm text-gray-500 font-medium">Agent is sleeping. Start the system to see activity.</p> : null}
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-start bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <div className={`p-2 rounded-xl mr-4 flex-shrink-0 ${log.status === 'Success' ? 'bg-emerald-100 text-emerald-600' :
                        log.status === 'Failed' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                        {log.action.includes('Commented') ? <MessageSquareText size={16} /> : <Bot size={16} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900">{log.action}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs font-semibold text-gray-500">{new Date(log.time).toLocaleTimeString()}</span>
                          <span className="mx-2 text-gray-300">â€¢</span>
                          <span className={`text-xs font-bold ${log.status === 'Success' ? 'text-emerald-600' :
                            log.status === 'Failed' ? 'text-red-600' : 'text-orange-600'
                            }`}>{log.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'keywords':
        return (
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm shadow-gray-200/50 overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-zinc-900">Target Keywords</h3>
                <p className="text-sm font-medium text-gray-500 mt-1">Manage the phrases your AI agent scans for on LinkedIn.</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={e => setNewKeyword(e.target.value)}
                  placeholder="E.g. #growthhacking"
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
                />
                <button onClick={addKeyword} className="flex items-center px-6 py-3 bg-[#FF6B35] text-white rounded-xl hover:bg-[#e5531d] shadow-md shadow-orange-500/20 transition-all text-sm font-bold">
                  <Plus size={16} className="mr-1" /> Add
                </button>
              </div>
            </div>
            <div className="overflow-x-auto p-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider">Keyword</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider">Matches</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {keywords.length === 0 ? (
                    <tr><td colSpan={3} className="px-6 py-8 text-sm font-medium text-gray-500 text-center">Your agent has no targets. Add a keyword above.</td></tr>
                  ) : keywords.map((kw) => (
                    <tr key={kw.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5 text-sm font-bold text-zinc-900">{kw.keyword}</td>
                      <td className="px-6 py-5">
                        <span className="bg-gray-100 text-gray-600 font-bold px-3 py-1 text-xs rounded-full">{kw.matches || 0} hits</span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button onClick={() => deleteKeyword(kw.id)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'comments':
        return (
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm shadow-gray-200/50 overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-zinc-900">Comment Bank</h3>
                <p className="text-sm font-medium text-gray-500 mt-1">Pre-written thoughts your agent will deploy.</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newCommentCat}
                  onChange={e => setNewCommentCat(e.target.value)}
                  placeholder="Category"
                  className="w-28 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
                />
                <input
                  type="text"
                  value={newCommentText}
                  onChange={e => setNewCommentText(e.target.value)}
                  placeholder="Type a thoughtful comment..."
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium min-w-[300px]"
                />
                <button onClick={addComment} className="flex items-center px-6 py-3 bg-[#FF6B35] text-white rounded-xl hover:bg-[#e5531d] shadow-md shadow-orange-500/20 transition-all text-sm font-bold">
                  <Plus size={16} className="mr-1" /> Add
                </button>
              </div>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {comments.length === 0 ? <p className="text-sm text-gray-500 font-medium">No comments in the bank.</p> : null}
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-orange-200 transition-colors group">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                      {comment.category}
                    </span>
                    <button onClick={() => deleteComment(comment.id)} className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm font-medium text-zinc-700 leading-relaxed">"{comment.text}"</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'autoposts':
        return (
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm shadow-gray-200/50 overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-gradient-to-r from-blue-50 to-transparent">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                  <Sparkles size={20} className="text-blue-500" /> AI Auto-Posts
                </h3>
                <p className="text-sm font-medium text-gray-500 mt-1">Generate thought leadership content on autopilot using Gemini.</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newTopic}
                  onChange={e => setNewTopic(e.target.value)}
                  placeholder="E.g. The future of SaaS pricing..."
                  className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium min-w-[300px]"
                />
                <button onClick={generateAutoPost} className="flex items-center px-6 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 shadow-md shadow-zinc-900/20 transition-all text-sm font-bold">
                  <Bot size={16} className="mr-2 text-blue-400" /> Generate Post
                </button>
              </div>
            </div>
            <div className="overflow-x-auto p-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider">Topic</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider">Generated Content Preview</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {autoPosts.length === 0 ? (
                    <tr><td colSpan={4} className="px-6 py-8 text-sm font-medium text-gray-500 text-center">No posts generated yet. Enter a topic to start.</td></tr>
                  ) : autoPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5 text-sm font-bold text-zinc-900 w-1/5">{post.topic}</td>
                      <td className="px-6 py-5 w-[15%]">
                        <span className={`font-bold px-3 py-1 text-xs rounded-full ${post.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 line-clamp-3 italic">"{post.content}"</td>
                      <td className="px-6 py-5 text-right w-[10%]">
                        <button onClick={() => deleteAutoPost(post.id)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm shadow-gray-200/50 overflow-hidden max-w-4xl mx-auto">
            <div className="p-8 border-b border-gray-100">
              <h3 className="text-xl font-bold text-zinc-900">Agent Configuration</h3>
              <p className="text-sm font-medium text-gray-500 mt-1">Fine-tune your autopilot's parameters and safety thresholds.</p>
            </div>
            <form onSubmit={saveSettings} className="p-8 space-y-8">

              <div className="bg-zinc-900 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 text-white/5 opacity-50 scale-150 -translate-y-1/4 translate-x-1/4">
                  <Bot size={200} />
                </div>
                <h4 className="text-sm font-extrabold text-white mb-3 flex items-center gap-2 relative z-10">
                  <AlertCircle size={16} className="text-[#FF6B35]" /> LinkedIn API Cookie
                </h4>
                <div className="relative z-10">
                  <input
                    type="password"
                    name="linkedinSessionCookie"
                    defaultValue={settings.linkedinSessionCookie}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] font-mono text-sm"
                    placeholder="AQEDATX..."
                  />
                  <p className="text-xs font-medium text-zinc-400 mt-2">The `li_at` cookie required for the headless browser to bypass 2FA securely.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 mb-4 uppercase tracking-tight">Rate Limits</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Max Comments / Day</label>
                      <input type="number" name="maxCommentsPerDay" defaultValue={settings.maxCommentsPerDay ?? 50} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium font-mono" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Max Profile Views / Day</label>
                      <input type="number" name="maxProfileViewsPerDay" defaultValue={settings.maxProfileViewsPerDay ?? 100} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium font-mono" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-zinc-900 mb-4 uppercase tracking-tight">Engagement Thresholds</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Minimum Likes to Comment</label>
                      <input type="number" name="minLikes" defaultValue={settings.minLikes ?? 10} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium font-mono" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Minimum Existing Comments</label>
                      <input type="number" name="minComments" defaultValue={settings.minComments ?? 2} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium font-mono" />
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              <div>
                <h4 className="text-sm font-bold text-zinc-900 mb-4 uppercase tracking-tight">Human Emulation (Delays)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Min Delay (Mins)</label>
                    <input type="number" name="minDelayMins" defaultValue={settings.minDelayMins ?? 15} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Max Delay (Mins)</label>
                    <input type="number" name="maxDelayMins" defaultValue={settings.maxDelayMins ?? 45} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium font-mono" />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button type="submit" className="px-8 py-4 bg-[#FF6B35] text-white rounded-xl hover:bg-[#e5531d] transition-all shadow-md shadow-orange-500/20 text-sm font-bold">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#FAFAFA] font-sans">
      <div className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-900 font-extrabold text-xl tracking-tight transition-transform hover:scale-105">
            <div className="w-8 h-8 bg-[#FF6B35] rounded-xl flex items-center justify-center text-white shadow-sm shadow-orange-500/20">
              <Bot size={20} />
            </div>
            Linqin<span className="text-[#FF6B35]">.ai</span>
          </Link>
        </div>

        <div className="flex-1 py-6 px-4 space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/10' : 'text-gray-500 hover:bg-gray-50 hover:text-zinc-900'}`}>
            <LayoutDashboard size={18} className="mr-3" /> Dashboard
          </button>
          <button onClick={() => setActiveTab('keywords')} className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'keywords' ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/10' : 'text-gray-500 hover:bg-gray-50 hover:text-zinc-900'}`}>
            <Search size={18} className="mr-3" /> Target Queries
          </button>
          <button onClick={() => setActiveTab('comments')} className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'comments' ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/10' : 'text-gray-500 hover:bg-gray-50 hover:text-zinc-900'}`}>
            <MessageSquareText size={18} className="mr-3" /> Comment Bank
          </button>
          <button onClick={() => setActiveTab('autoposts')} className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'autoposts' ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/10' : 'text-gray-500 hover:bg-gray-50 hover:text-zinc-900'}`}>
            <PenTool size={18} className="mr-3" /> Auto Posts
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'settings' ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/10' : 'text-gray-500 hover:bg-gray-50 hover:text-zinc-900'}`}>
            <Settings size={18} className="mr-3" /> Agent Setup
          </button>
        </div>

        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              ME
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">Pro Account</p>
              <p className="text-xs font-medium text-gray-500">Agent Status: {systemActive ? 'On' : 'Off'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-6 flex justify-between items-center z-10 sticky top-0">
          <h1 className="text-2xl font-extrabold text-zinc-900 capitalize tracking-tight">
            {activeTab.replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-bold tracking-tight bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-full">
              <div className={`w-2 h-2 rounded-full ${settings.linkedinSessionCookie ? 'bg-emerald-500' : 'bg-[#FF6B35] animate-pulse'}`}></div>
              <span className="text-zinc-700">{settings.linkedinSessionCookie ? 'Session Connected' : 'Setup Required'}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 relative">
          {/* Background pattern for depth */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10"></div>

          <div className="max-w-[1400px] mx-auto pb-20">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}


