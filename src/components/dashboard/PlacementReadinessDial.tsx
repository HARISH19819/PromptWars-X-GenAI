'use client';

import React from 'react';
import { PlacementReadinessBreakdown } from '@/types';
import { Info, Award } from 'lucide-react';

interface PlacementReadinessDialProps {
  readiness: PlacementReadinessBreakdown;
  targetRole: string;
}

export const PlacementReadinessDial: React.FC<PlacementReadinessDialProps> = ({
  readiness,
  targetRole,
}) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (readiness.overall / 100) * circumference;

  const categories = [
    { label: 'Technical Skills', value: readiness.skills, weight: '25%', color: 'bg-indigo-500' },
    { label: 'Assessment Tests', value: readiness.assessment, weight: '15%', color: 'bg-cyan-500' },
    { label: 'Interview Arena', value: readiness.interview, weight: '15%', color: 'bg-purple-500' },
    { label: 'GD & Discourse', value: readiness.gd, weight: '10%', color: 'bg-emerald-500' },
    { label: 'Communication', value: readiness.communication, weight: '10%', color: 'bg-blue-500' },
    { label: 'Resume ATS Match', value: readiness.resume, weight: '10%', color: 'bg-amber-500' },
    { label: 'Role Alignment', value: readiness.roleAlignment, weight: '15%', color: 'bg-rose-500' },
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight">Placement Twin & Readiness</h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Adaptive Metric
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Calibrated for: <span className="text-slate-200 font-medium">{targetRole}</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900/60 px-3 py-1 rounded-full border border-white/5">
          <Info className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
          <span>Preparation readiness index (not an employment guarantee)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-6">
        {/* Circular Gauge */}
        <div className="md:col-span-4 flex flex-col items-center justify-center">
          <div
            className="relative w-36 h-36 flex items-center justify-center"
            role="progressbar"
            aria-valuenow={readiness.overall}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Overall Placement Readiness: ${readiness.overall}%`}
          >
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 128 128" aria-hidden="true">
              {/* Background ring */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="text-slate-800"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress ring */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="text-indigo-500 transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="url(#readinessGradient)"
                fill="transparent"
              />
              <defs>
                <linearGradient id="readinessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {readiness.overall}%
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Readiness
              </span>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              readiness.overall >= 75
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : readiness.overall >= 60
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}>
              <Award className="w-3 h-3" aria-hidden="true" />
              {readiness.overall >= 75 ? 'Tier-1 Interview Ready' : readiness.overall >= 60 ? 'Competitive Fresher' : 'Foundations in Progress'}
            </span>
          </div>
        </div>

        {/* Breakdown Bars */}
        <div className="md:col-span-8 space-y-2.5">
          {categories.map((cat) => (
            <div key={cat.label} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${cat.color}`} aria-hidden="true" />
                  {cat.label}
                  <span className="text-[10px] text-slate-500 font-normal">({cat.weight})</span>
                </span>
                <span className="font-bold text-slate-200">{cat.value}%</span>
              </div>
              <div
                className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden"
                role="progressbar"
                aria-label={`${cat.label} readiness score`}
                aria-valuenow={cat.value}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${cat.color}`}
                  style={{ width: `${cat.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
