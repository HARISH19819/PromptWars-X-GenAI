'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { RoleCategory } from '@/types';
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Info,
  Target,
  TrendingUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CareerPage() {
  const { profile, updateTargetRole } = useApp();

  const roleAlignments: {
    role: RoleCategory;
    alignment: number;
    matchReasons: string[];
    potentialGaps: string[];
    medianPackage: string;
  }[] = [
    {
      role: 'Machine Learning Engineer',
      alignment: 82,
      medianPackage: '₹10 - ₹18 LPA',
      matchReasons: [
        'Strong PyTorch and deep learning computer vision projects.',
        'Hands-on FastAPI inference deployment.',
        'High competitive hackathon participation (Kaggle).',
      ],
      potentialGaps: ['SQL JOIN / window queries', 'Docker containerization'],
    },
    {
      role: 'Data Scientist',
      alignment: 78,
      medianPackage: '₹9 - ₹16 LPA',
      matchReasons: [
        'Customer churn prediction project with XGBoost ROC-AUC 0.89.',
        'Strong statistics and feature engineering background.',
      ],
      potentialGaps: ['A/B experimentation testing', 'Advanced SQL analytics'],
    },
    {
      role: 'Data Analyst',
      alignment: 75,
      medianPackage: '₹6 - ₹11 LPA',
      matchReasons: [
        'Pandas and data wrangling proficiency.',
        'Strong analytical problem-solving foundation.',
      ],
      potentialGaps: ['BI dashboarding (PowerBI / Tableau)', 'Advanced SQL'],
    },
    {
      role: 'Backend Developer',
      alignment: 58,
      medianPackage: '₹8 - ₹15 LPA',
      matchReasons: [
        'FastAPI REST endpoints experience.',
        'Basic PostgreSQL schema interaction.',
      ],
      potentialGaps: ['Database indexing and concurrency', 'Microservices architecture'],
    },
    {
      role: 'Full Stack Developer',
      alignment: 52,
      medianPackage: '₹8 - ₹14 LPA',
      matchReasons: ['Basic frontend React UI integration with ML APIs.'],
      potentialGaps: ['State management (Redux/Zustand)', 'Modern CSS architecture'],
    },
  ];

  const handleSelectRole = (role: RoleCategory) => {
    updateTargetRole(role);
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Career Intelligence &amp; Role Alignment
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Taxonomy Mapping
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Semantic alignment between your profile credentials and industry campus hiring standards.
          </p>
        </div>

        <div className="text-[11px] text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
          <span>Profile alignment percentage (not an employment guarantee)</span>
        </div>
      </div>

      {/* Current Active Target Role Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-indigo-500/30 bg-gradient-to-r from-slate-950 via-indigo-950/20 to-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" /> Active Campus Target
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {profile.targetRole}
          </h2>
          <p className="text-xs text-slate-300">
            All skill gap diagnostics, daily preparation sprints, and Next Best Actions are calibrated to this role.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold text-indigo-300 font-mono">
            {profile.readiness.overall}% Readiness
          </span>
        </div>
      </div>

      {/* Role Alignment Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Alternative Role Synergy &amp; Alignment Matrix
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roleAlignments.map((item) => {
            const isCurrent = profile.targetRole === item.role;
            return (
              <div
                key={item.role}
                className={`glass-panel rounded-2xl p-6 border flex flex-col justify-between space-y-4 transition-all ${
                  isCurrent
                    ? 'border-indigo-500/40 bg-indigo-950/15 shadow-lg shadow-indigo-500/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-white tracking-tight">
                      {item.role}
                    </h4>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-cyan-400">
                        {item.alignment}%
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase">Alignment</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span>Fresher Bracket: <strong className="text-slate-200">{item.medianPackage}</strong></span>
                  </div>

                  {/* Why it matches */}
                  <div className="space-y-1 text-xs">
                    <span className="font-semibold text-emerald-400">Profile Strengths:</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                      {item.matchReasons.map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Potential gaps */}
                  <div className="space-y-1 text-xs">
                    <span className="font-semibold text-amber-400">Identified Gaps:</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                      {item.potentialGaps.map((g, idx) => (
                        <li key={idx}>{g}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  {isCurrent ? (
                    <span className="text-xs font-bold text-indigo-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Active Preparation Goal
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSelectRole(item.role)}
                      className="text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-xl border border-white/10 transition-colors"
                    >
                      Switch Preparation Plan to this Role
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
