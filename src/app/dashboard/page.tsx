'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { PlacementReadinessDial } from '@/components/dashboard/PlacementReadinessDial';
import { NextBestActionCard } from '@/components/dashboard/NextBestActionCard';
import { SkillGapCard } from '@/components/dashboard/SkillGapCard';
import { MarketLoopBanner } from '@/components/dashboard/MarketLoopBanner';
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  Users,
  Mic,
  FileText,
  Briefcase,
  Award,
} from 'lucide-react';

export default function DashboardPage() {
  const { profile } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Good Morning, {profile.personalInfo.name.split(' ')[0]} 👋
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Active Prep Sprint
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Let&apos;s make continuous progress toward your campus placement goals today.
          </p>
        </div>

        {/* Real Quick Action Launchers */}
        <div className="flex items-center gap-3">
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Daily Diagnostic Test</span>
          </Link>

          <Link
            href="/gd"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 hover:bg-emerald-900/60 transition-all"
          >
            <Users className="w-4 h-4" />
            <span>Live GD Rooms</span>
          </Link>
        </div>
      </div>

      {/* Primary Card 1: Your Next Best Action */}
      <NextBestActionCard action={profile.nextBestAction} />

      {/* Primary Card 2: Placement Twin Readiness Dial & Component Meters */}
      <PlacementReadinessDial
        readiness={profile.readiness}
        targetRole={profile.targetRole}
      />

      {/* Market Loop Feedback Banner */}
      <MarketLoopBanner />

      {/* Grid: Skill Gap Engine & Quick Prep Hubs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Skill Gap Breakdown */}
        <div className="lg:col-span-8">
          <SkillGapCard skills={profile.skills} targetRole={profile.targetRole} />
        </div>

        {/* Right Column: Ecosystem Quick Action Cards & Achievements */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Hub Launchers */}
          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Preparation Hubs
            </h3>

            <div className="space-y-2 text-xs">
              <Link
                href="/learning"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-800/60 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span className="font-semibold text-slate-200 group-hover:text-white">Learning Hub</span>
                </div>
                <span className="text-[11px] text-indigo-300 font-mono">
                  {profile.learningModules.filter(m => m.completed).length}/{profile.learningModules.length} Done
                </span>
              </Link>

              <Link
                href="/assessment"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/30 hover:bg-slate-800/60 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-slate-200 group-hover:text-white">Assessments</span>
                </div>
                <span className="text-[11px] text-cyan-300 font-mono">
                  {profile.assessments.length} Tests
                </span>
              </Link>

              <Link
                href="/gd"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-emerald-500/30 hover:bg-slate-800/60 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-slate-200 group-hover:text-white">Live GD Practice</span>
                </div>
                <span className="text-[11px] text-emerald-300 font-mono">
                  {profile.gdSessions.filter(s => s.isBookedByMe).length > 0 ? '1 Booked' : 'Slots Open'}
                </span>
              </Link>

              <Link
                href="/interview"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-amber-500/30 hover:bg-slate-800/60 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Mic className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-slate-200 group-hover:text-white">AI Interview Arena</span>
                </div>
                <span className="text-[11px] text-amber-300 font-mono">
                  Project Defense
                </span>
              </Link>

              <Link
                href="/resume"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-purple-500/30 hover:bg-slate-800/60 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span className="font-semibold text-slate-200 group-hover:text-white">Resume ATS Match</span>
                </div>
                <span className="text-[11px] text-purple-300 font-mono">
                  {profile.resumeAnalysis.overallScore}% ATS
                </span>
              </Link>

              <Link
                href="/jobs"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-500/40 hover:bg-slate-800/60 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-slate-200 group-hover:text-white">ZyncRole AI Jobs</span>
                </div>
                <span className="text-[11px] text-cyan-300 font-mono">
                  {profile.jobMatches.length} Matches
                </span>
              </Link>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Recent Milestones
              </h3>
              <Link href="/progress" className="text-[11px] text-slate-400 hover:text-white">
                View All
              </Link>
            </div>

            <div className="space-y-2.5 text-xs">
              {profile.achievements.slice(0, 3).map((ach) => (
                <div
                  key={ach.id}
                  className="p-3 rounded-xl bg-slate-900/40 border border-white/5 flex items-start gap-2.5"
                >
                  <div className="p-1 rounded-md bg-amber-500/20 text-amber-400 flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-200 leading-snug">{ach.title}</h5>
                    <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
                      {ach.description}
                    </p>
                    <span className="text-[10px] text-slate-500 block mt-1">{ach.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
