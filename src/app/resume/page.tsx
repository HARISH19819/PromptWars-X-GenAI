'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { RoleCategory, ResumeATSAnalysis } from '@/types';
import {
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResumeCenterPage() {
  const { profile, updateResumeAnalysis } = useApp();

  const [selectedRole, setSelectedRole] = useState<RoleCategory>(profile.targetRole);
  const [resumeText, setResumeText] = useState(profile.rawResumeText || '');
  const [isRescoring, setIsRescoring] = useState(false);

  const roleOptions: RoleCategory[] = [
    'Machine Learning Engineer',
    'Data Scientist',
    'Full Stack Developer',
    'Backend Developer',
    'Data Analyst',
    'Software Development Engineer',
  ];

  const handleRescore = async () => {
    setIsRescoring(true);

    try {
      const res = await fetch('/api/ai/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          targetRole: selectedRole,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        const analysis: ResumeATSAnalysis = json.data;
        updateResumeAnalysis(analysis);

        try {
          confetti({ particleCount: 60, spread: 60 });
        } catch {
          // ignore
        }
      }
    } catch (err) {
      console.error('Error rescoring resume:', err);
    } finally {
      setIsRescoring(false);
    }
  };

  const analysis = profile.resumeAnalysis;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Resume Intelligence &amp; ATS-Style Center
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Role Match Engine
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            ATS-style parsing, role alignment benchmarks, and keyword extraction calibrated for campus recruitment.
          </p>
        </div>

        {/* Free Builder CTA */}
        <a
          href={analysis.freeBuilderUrl || 'https://rxresu.me/'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all shadow-sm"
        >
          <span>Build Free ATS Resume (Reactive Resume)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Target Role Selector & Live Re-analysis */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <label htmlFor="benchmark-target-role" className="text-xs font-semibold text-slate-300">
              Benchmark Target Role for ATS Scoring
            </label>
            <div className="flex items-center gap-3">
              <select
                id="benchmark-target-role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as RoleCategory)}
                className="p-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              <button
                disabled={isRescoring}
                onClick={handleRescore}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white transition-colors disabled:opacity-50"
              >
                {isRescoring ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5" />
                )}
                <span>Rescore Resume with Gemini</span>
              </button>
            </div>

            <div className="space-y-1 pt-2">
              <label htmlFor="resume-edit-text" className="text-xs font-semibold text-slate-300">
                Update or Paste Resume Text
              </label>
              <textarea
                id="resume-edit-text"
                rows={3}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste updated resume text here to rescore..."
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-white/5 max-w-sm self-start">
            <span className="font-semibold text-slate-300 block mb-0.5">ATS-Style Disclosure:</span>
            Scored using semantic keyword parsing and role taxonomy. Real recruiter systems may use proprietary screening heuristics.
          </div>
        </div>
      </div>

      {/* Primary ATS Score Breakdown Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
          <div className="space-y-1">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              ATS-Style Compatibility Score
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-white">
                {analysis.overallScore}%
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Strong Initial Match
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Evaluated for: <strong className="text-white">{analysis.targetRole}</strong>
            </p>
          </div>

          {/* 4 Score Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Keyword Match</span>
              <span className="text-base font-extrabold text-white mt-1 block">{analysis.keywordMatch}%</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Skill Alignment</span>
              <span className="text-base font-extrabold text-white mt-1 block">{analysis.skillMatch}%</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Project Depth</span>
              <span className="text-base font-extrabold text-white mt-1 block">{analysis.projectMatch}%</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Role Taxonomy</span>
              <span className="text-base font-extrabold text-white mt-1 block">{analysis.roleAlignment}%</span>
            </div>
          </div>
        </div>

        {/* Strengths & Critical Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Strengths */}
          <div className="space-y-3 p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
            <h3 className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Verified Resume Strengths
            </h3>
            <ul className="space-y-2 text-slate-300">
              {analysis.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span className="leading-relaxed">{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Critical Gaps */}
          <div className="space-y-3 p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30">
            <h3 className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              High-Impact Resume Gaps
            </h3>
            <ul className="space-y-2 text-slate-300">
              {analysis.criticalGaps.map((gap, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">⚠</span>
                  <span className="leading-relaxed">{gap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Keywords Match & Missing Keywords */}
        <div className="space-y-4 pt-2">
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Detected &amp; Matched Keywords:
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysis.matchedKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                >
                  ✓ {kw}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Missing High-Yield Recruiter Keywords:
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysis.missingKeywords.map((mkw, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30"
                >
                  ✗ {mkw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2 text-xs">
          <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Actionable Optimization Checklist:
          </h4>
          <ul className="space-y-1.5 text-slate-300">
            {analysis.actionableRecommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">{idx + 1}.</span>
                <span className="leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
