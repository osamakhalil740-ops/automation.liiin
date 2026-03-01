'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Search, MessageSquareText, PenTool, Settings, Sparkles } from 'lucide-react';
import NexoraLogo from '@/components/ui/NexoraLogo';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  systemActive: boolean;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'keywords', label: 'Target Keywords', icon: Search },
  { id: 'comments', label: 'Comment Bank', icon: MessageSquareText },
  { id: 'autoposts', label: 'Auto Posts', icon: Sparkles },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, onTabChange, systemActive }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-sm">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="group">
          <NexoraLogo size="lg" showText={true} className="text-gray-900" />
        </Link>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                isActive
                  ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/10'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
            ME
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">Pro Account</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className={`w-1.5 h-1.5 rounded-full ${systemActive ? 'bg-success-500' : 'bg-gray-400'}`} />
              <p className="text-xs font-medium text-gray-500">
                Agent: {systemActive ? 'Active' : 'Off'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
