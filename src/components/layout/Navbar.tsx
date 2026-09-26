'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Compass,
  BookOpen,
  CheckCircle2,
  Users,
  Mic,
  FileText,
  Briefcase,
  TrendingUp,
  Sparkles,
  RotateCcw,
  Zap,
  Menu,
  X,
  Target,
  User,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
  Settings as SettingsIcon,
} from 'lucide-react';

export const Navbar = () => {
  const pathname = usePathname();
  const { profile, user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: Target },
    { name: 'Career', href: '/career', icon: Compass },
    { name: 'Learning', href: '/learning', icon: BookOpen },
    { name: 'Assessment', href: '/assessment', icon: CheckCircle2 },
    { name: 'GD Practice', href: '/gd', icon: Users },
    { name: 'AI Interview', href: '/interview', icon: Mic },
    { name: 'Resume', href: '/resume', icon: FileText },
    { name: 'Jobs', href: '/jobs', icon: Briefcase, badge: 'ZyncRole AI' },
    { name: 'Progress', href: '/progress', icon: TrendingUp },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                  Placement360 <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">AI</span>
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:block tracking-wide -mt-0.5">
                  From Preparation to Placement
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  {link.name}
                  {link.badge && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions & User State */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live GD Rooms Direct Quick Button */}
            <Link
              href="/gd"
              title="Join or host a live peer group discussion"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 hover:bg-emerald-900/60 hover:border-emerald-400 shadow-sm transition-all"
            >
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Live GD Meet</span>
            </Link>

            {/* Readiness Mini Badge */}
            <Link
              href="/dashboard"
              className="hidden sm:flex items-center gap-2 pl-2.5 pr-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/60 hover:border-indigo-500/50 transition-colors"
            >
              <div className="relative flex items-center justify-center">
                <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 animate-ping absolute opacity-75" />
                <span className="relative flex h-2 w-2 rounded-full bg-indigo-400" />
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-slate-400 leading-none">Readiness</span>
                <span className="text-xs font-bold text-white leading-tight">
                  {profile.readiness.overall}%
                </span>
              </div>
            </Link>

            {/* Prominent Login & Register Links or User Menu */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500 text-slate-200 text-xs font-medium transition-all"
                >
                  <div className="w-6 h-6 rounded-lg bg-indigo-600/30 text-indigo-300 flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden md:inline max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-950 border border-white/10 shadow-2xl py-2 z-50 text-xs text-slate-300">
                    <div className="px-4 py-2 border-b border-white/5">
                      <p className="font-bold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-slate-900 hover:text-white transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-indigo-400" />
                      <span>My Placement Twin Profile</span>
                    </Link>

                    <Link
                      href="/settings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-slate-900 hover:text-white transition-colors"
                    >
                      <SettingsIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>Settings &amp; API Keys</span>
                    </Link>

                    <div className="border-t border-white/5 my-1" />

                    <Link
                      href="/login"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-slate-900 hover:text-white transition-colors"
                    >
                      <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Login with Another Account</span>
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-slate-900 hover:text-white transition-colors"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Register New Student</span>
                    </Link>

                    <div className="border-t border-white/5 my-1" />

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-rose-400 hover:bg-rose-950/30 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>

                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </Link>
              </div>
            )}

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-white/10 bg-slate-950/95 px-4 pt-2 pb-4 space-y-1">
          {/* Quick Login / Register Links on Mobile */}
          <div className="flex items-center gap-2 pb-3 mb-2 border-b border-white/10">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white"
            >
              Register
            </Link>
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-slate-400" />
                  {link.name}
                </div>
                {link.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
