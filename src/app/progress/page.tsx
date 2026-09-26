'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  TrendingUp,
  Award,
  Sparkles,
} from 'lucide-react';

export default function ProgressPage() {
  const { profile, runAITransformation } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Progress &amp; Preparation Trajectory
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Longitudinal Growth
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Tracking your skill compounding across assessments, peer GD sessions, and interview defense simulations.
          </p>
        </div>

        <button
          onClick={runAITransformation}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-indigo-300 bg-indigo-950/70 border border-indigo-500/40 hover:bg-indigo-900/60 transition-colors shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Recalibrate Growth Metrics</span>
        </button>
      </div>

      {/* Before vs After Progression Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            Readiness &amp; Skill Mastery Progression
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Baseline State */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Initial Diagnostic Baseline
              </span>
              <span className="text-xl font-extrabold text-slate-300">61% Readiness</span>
            </div>

            <div className="space-y-2 pt-2 text-slate-300">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span>SQL Relational Understanding</span>
                <span className="font-bold text-amber-400">43% (Needs Practice)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span>Group Discussion Indicators</span>
                <span className="font-bold text-amber-400">48% (Delayed Entry)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span>AI Project Defense Interview</span>
                <span className="font-bold text-amber-400">54% (Low Quantification)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span>Next Action Priority</span>
                <span className="font-bold text-indigo-400">SQL JOIN Practice (15 min)</span>
              </div>
            </div>
          </div>

          {/* Current / Transformed State */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Current Post-Practice Trajectory
              </span>
              <span className="text-xl font-extrabold text-emerald-300">
                {profile.readiness.overall}% Readiness
              </span>
            </div>

            <div className="space-y-2 pt-2 text-slate-200">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span>SQL Relational Understanding</span>
                <span className="font-bold text-emerald-400">
                  {profile.skills.find(s => s.name.toLowerCase().includes('sql'))?.score || 43}%
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span>Group Discussion Indicators</span>
                <span className="font-bold text-emerald-400">{profile.readiness.gd}%</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span>AI Project Defense Interview</span>
                <span className="font-bold text-emerald-400">{profile.readiness.interview}%</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span>Next Action Priority</span>
                <span className="font-bold text-cyan-300">{profile.nextBestAction.title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progress History Timeline */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          Weekly Compound Improvement Snapshot
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {profile.weeklyProgressHistory.map((snap, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{snap.week}</span>
                <span className="font-extrabold text-cyan-400 text-sm">{snap.readiness}%</span>
              </div>
              <div className="space-y-1 text-slate-400 text-[11px] pt-1">
                <div className="flex justify-between">
                  <span>SQL:</span>
                  <span className="text-slate-200 font-semibold">{snap.sqlScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span>GD:</span>
                  <span className="text-slate-200 font-semibold">{snap.gdScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Interview:</span>
                  <span className="text-slate-200 font-semibold">{snap.interviewScore}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unlocked Achievements & Badges */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          Placement Milestone Badges
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {profile.achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2 text-xs"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-white">{ach.title}</h4>
                  <span className="text-[10px] text-slate-500">{ach.date}</span>
                </div>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed pt-1">
                {ach.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
