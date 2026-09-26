'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
  Target,
  Sparkles,
  Zap,
  PlayCircle,
  FileCode,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ModuleDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { profile, completeLearningModule } = useApp();

  const module = profile.learningModules.find((m) => m.id === id);

  if (!module) {
    return notFound();
  }

  const handleComplete = () => {
    completeLearningModule(module.id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/learning"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Learning Hub
        </Link>
      </div>

      {/* Module Header Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {module.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1 bg-slate-900/60 px-2.5 py-1 rounded-full border border-white/5">
              <Clock className="w-3.5 h-3.5" /> {module.estimatedTime}
            </span>
            <span className="text-xs text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded-full border border-white/5">
              Difficulty: {module.difficulty}
            </span>
          </div>

          {module.completed ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4" /> Completed &amp; Profile Updated
            </span>
          ) : (
            <button
              onClick={handleComplete}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark as Completed (+{module.scoreBoostEstimate}%)</span>
            </button>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {module.title}
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {module.description}
        </p>

        {/* Diagnostic Rationale Alert */}
        <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-4 text-xs text-slate-300 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-indigo-600/30 text-indigo-300 flex-shrink-0 mt-0.5">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-indigo-300 mb-0.5">Why Placement360 Recommended This:</h4>
            <p className="text-slate-300 leading-relaxed">{module.whyNeeded}</p>
          </div>
        </div>
      </div>

      {/* Curated External Resources & Practice */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          Curated Free Resources &amp; Hands-On Practice
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {module.resources.map((res, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between space-y-4 border border-white/10"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                    {res.provider}
                  </span>
                  <span className="text-slate-400 text-[11px]">{res.duration}</span>
                </div>
                <h3 className="font-bold text-sm text-white leading-snug">
                  {res.title}
                </h3>
              </div>

              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-slate-900 border border-indigo-500/30 text-indigo-300 hover:text-white hover:bg-indigo-600 text-xs font-semibold transition-all"
              >
                <span>Open Resource</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Key Takeaways & Cheat Sheet */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          High-Yield Takeaways (Interview Cheat Sheet)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {module.keyTakeaways.map((point, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-2.5 text-slate-300"
            >
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Step / Action */}
      <div className="glass-panel rounded-2xl p-6 border border-emerald-500/30 bg-emerald-950/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-white text-base">Finished reviewing the concepts?</h4>
          <p className="text-xs text-slate-300 mt-0.5">
            Test whether you&apos;ve closed the gap by taking the adaptive diagnostic assessment.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!module.completed && (
            <button
              onClick={handleComplete}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
            >
              Mark Completed
            </button>
          )}
          <Link
            href="/assessment/assessment-sql-diagnostic"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/20"
          >
            <span>Take Diagnostic Test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
