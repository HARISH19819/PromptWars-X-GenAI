'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  Target,
  Sparkles,
  AlertCircle,
  Award,
  Zap,
} from 'lucide-react';

export default function AssessmentHubPage() {
  const { profile } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Adaptive Assessment Engine
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Calibrated Difficulty
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Validates your conceptual retention and diagnoses precise micro-gaps to calibrate your Placement Twin.
          </p>
        </div>

        <div className="glass-panel px-4 py-2 rounded-xl border border-white/10 text-xs flex items-center gap-3">
          <Award className="w-5 h-5 text-cyan-400" />
          <div>
            <div className="font-bold text-white">
              Assessment Readiness: {profile.readiness.assessment}%
            </div>
            <div className="text-[10px] text-slate-400">
              {profile.assessmentHistory.length} attempts recorded
            </div>
          </div>
        </div>
      </div>

      {/* Available Assessments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.assessments.map((assessment) => (
          <div
            key={assessment.id}
            className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {assessment.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> ~{assessment.estimatedMinutes} mins
                </span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                {assessment.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                {assessment.description}
              </p>

              {/* Status and Previous Attempt Pill */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                {assessment.highestScore !== undefined ? (
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold ${
                    assessment.highestScore >= 70
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Best Score: {assessment.highestScore}%
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                    Not Attempted Yet
                  </span>
                )}

                <span className="text-[11px] text-slate-400">
                  {assessment.questionsCount} Questions • Adaptive Engine
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-indigo-400 font-medium">
                {assessment.attemptsCount > 0 ? `${assessment.attemptsCount} Attempts` : 'Diagnostic Ready'}
              </span>

              <Link
                href={`/assessment/${assessment.id}`}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/30"
              >
                <span>{assessment.attemptsCount > 0 ? 'Retake Test' : 'Start Assessment'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Historical Attempts Log */}
      {profile.assessmentHistory.length > 0 && (
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Previous Assessment Diagnostics &amp; Feedback
          </h2>

          <div className="space-y-3">
            {profile.assessmentHistory.map((attempt) => (
              <div
                key={attempt.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{attempt.title}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{attempt.date}</span>
                  </div>
                  <span className={`font-bold px-2 py-0.5 rounded text-xs self-start sm:self-auto ${
                    attempt.score >= 70
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    Score: {attempt.score}% ({attempt.correctAnswersCount}/{attempt.totalQuestions})
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 pt-1">
                  {attempt.weakAreas.length > 0 && (
                    <div className="flex items-center gap-1 text-amber-400">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Weak Areas: {attempt.weakAreas.join(', ')}</span>
                    </div>
                  )}
                  {attempt.strongAreas.length > 0 && (
                    <div className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Strong Areas: {attempt.strongAreas.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
