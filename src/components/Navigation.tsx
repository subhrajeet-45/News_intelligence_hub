/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Compass, 
  TrendingUp, 
  Bookmark, 
  User as UserIcon, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Cpu, 
  LogOut, 
  Search, 
  Home,
  Activity
} from 'lucide-react';
import { User } from '../types';

interface NavigationProps {
  user: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onLogout: () => void;
  onOpenAuth: () => void;
}

export default function Navigation({
  user,
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  onLogout,
  onOpenAuth
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'live-hub', label: '🔵 Live Intel', icon: Activity },
    { id: 'categories', label: 'Categories', icon: Compass },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'dashboard', label: 'Dashboard', icon: UserIcon },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleTabClick('home')}>
            <div className="bg-linear-to-br from-teal-500 to-indigo-600 p-2 rounded-xl text-white shadow-md flex items-center justify-center">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-md sm:text-lg font-serif font-bold text-slate-900 dark:text-white tracking-tight">
                News Intelligence <span className="text-teal-500 dark:text-teal-400 font-sans font-medium hover:underline text-xs bg-teal-500/10 px-1.5 py-0.5 rounded-md ml-1">Hub</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center">
            {navigationItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-teal-500/20 dark:text-teal-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Controls Panel */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-amber-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-transform duration-200 active:scale-95"
              title="Toggle theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Dropdown Profile Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-teal-400 to-indigo-500 text-white flex items-center justify-center font-sans font-semibold text-xs shadow-xs uppercase">
                    {user.name.slice(0, 2)}
                  </div>
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-medium max-w-[100px] truncate pr-1">
                    {user.name}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl py-2 z-50 animate-in fade-in-50 slide-in-from-top-1">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700/50">
                      <p className="text-xs text-slate-400 uppercase font-mono tracking-wider">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate mt-0.5">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-mono">{user.email}</p>
                    </div>
                    
                    <button
                      onClick={() => handleTabClick('dashboard')}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 cursor-pointer"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      <span>My Dashboard</span>
                    </button>
                    
                    <button
                      onClick={() => handleTabClick('bookmarks')}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 cursor-pointer"
                    >
                      <Bookmark className="w-4 h-4 text-slate-400" />
                      <span>My Saved Pins</span>
                    </button>

                    <div className="border-t border-slate-100 dark:border-slate-700/50 my-1" />

                    <button
                      onClick={() => {
                        onLogout();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-teal-500 dark:hover:bg-teal-400 text-white rounded-xl text-xs font-semibold shadow-md cursor-pointer transition-all active:scale-95 duration-150"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 text-slate-500 dark:text-slate-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 py-3 px-4 space-y-2 animate-in fade-in-50 duration-150">
          {navigationItems.map((item) => {
            const IconComp = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-teal-500 dark:text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="border-t border-slate-100 dark:border-slate-800 my-2 pt-2" />

          {user ? (
            <div className="space-y-2">
              <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <p className="text-xs text-slate-400 uppercase font-mono">My Account</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">{user.name}</p>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-rose-600 dark:text-rose-400 font-medium text-sm rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/25"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-slate-900 dark:bg-teal-500 text-white font-semibold text-center rounded-xl text-sm"
            >
              Sign In to Profile
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
