'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  BookOpen,
  Clock,
  Zap,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Target,
  Sparkles,
} from 'lucide-react';

export default function LearningPage() {
  const { profile } = useApp();

  const completedCount = profile.learningModules.filter((m) => m.completed).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Targeted Learning Hub
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Personalized Curriculum
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Bite-sized, high-yield learning modules derived from your exact diagnostic gaps.
          </p>
        </div>

        {/* Learning progress meter */}
        <div className="glass-panel px-4 py-2.5 rounded-xl border border-white/10 flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <div>
            <div className="text-xs font-bold text-white">
              {completedCount} of {profile.learningModules.length} Modules Completed
            </div>
            <div className="text-[10px] text-slate-400">
              Target Role: {profile.targetRole}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended For You Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            Recommended Based on Your Diagnostics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.learningModules.map((module) => (
            <div
              key={module.id}
              className={`glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between space-y-4 border transition-all ${
                module.completed
                  ? 'border-emerald-500/30 bg-emerald-950/10'
                  : 'border-white/10'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {module.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {module.estimatedTime}
                    </span>
                    {module.completed && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Done
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {module.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {module.description}
                </p>

                {/* Why You Need It Reason Box */}
                <div className="bg-slate-900/80 rounded-xl p-3 border border-indigo-500/20 text-xs text-slate-300 space-y-1">
                  <span className="font-semibold text-indigo-300 flex items-center gap-1">
                    <Target className="w-3 h-3" /> Diagnostic Rationale:
                  </span>
                  <p className="text-[11px] text-slate-400">{module.whyNeeded}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-400">
                  +{module.scoreBoostEstimate}% Potential Skill Boost
                </span>

                <Link
                  href={`/learning/${module.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm"
                >
                  <span>{module.completed ? 'Review Content' : 'Start Learning'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
