'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SkillItem, RoleCategory } from '@/types';
import { CheckCircle2, AlertCircle, XCircle, ChevronDown, ChevronUp, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

interface SkillGapCardProps {
  skills: SkillItem[];
  targetRole: RoleCategory;
}

export const SkillGapCard: React.FC<SkillGapCardProps> = ({ skills, targetRole }) => {
  const [expandedSkillId, setExpandedSkillId] = useState<string | null>('skill-sql');

  const toggleExpand = (id: string) => {
    setExpandedSkillId(expandedSkillId === id ? null : id);
  };

  const getStatusBadge = (level: SkillItem['level']) => {
    switch (level) {
      case 'Strong':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Strong
          </span>
        );
      case 'Good':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <CheckCircle2 className="w-3 h-3" /> Good
          </span>
        );
      case 'Needs Practice':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <AlertCircle className="w-3 h-3" /> Needs Practice
          </span>
        );
      case 'Missing':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <XCircle className="w-3 h-3" /> Missing
          </span>
        );
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white tracking-tight">Skill Gap Intelligence</h2>
            <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
              Role: {targetRole}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time delta between your verified profile and campus requirements
          </p>
        </div>
        <Link
          href="/learning"
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 self-start sm:self-auto"
        >
          View All Learning Modules <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Skills list */}
      <div className="space-y-3">
        {skills.map((skill) => {
          const isExpanded = expandedSkillId === skill.id;
          return (
            <div
              key={skill.id}
              className={`rounded-xl border transition-all ${
                skill.level === 'Needs Practice' || skill.level === 'Missing'
                  ? 'bg-slate-900/60 border-amber-500/30 shadow-sm'
                  : 'bg-slate-900/30 border-white/5 hover:border-white/10'
              }`}
            >
              <div
                onClick={() => toggleExpand(skill.id)}
                className="p-4 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white">{skill.name}</span>
                      {skill.marketDemand === 'Very High' && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          High Demand
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Category: {skill.category} • Assessed: {skill.lastAssessed || 'Recent'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(skill.level)}
                  <span className="text-xs font-bold text-slate-300 w-9 text-right">
                    {skill.score}%
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Subskills Breakdown */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-white/5 space-y-3">
                  <div className="text-[11px] text-slate-400 font-medium">
                    Granular Concept Diagnosis:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {skill.subskills.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-950/70 border border-white/5 text-xs"
                      >
                        <span className="text-slate-300">{sub.name}</span>
                        {sub.status === 'mastered' ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                            <CheckCircle2 className="w-3 h-3" /> Mastered
                          </span>
                        ) : sub.status === 'practicing' ? (
                          <span className="text-blue-400 font-medium flex items-center gap-1 text-[11px]">
                            Practicing
                          </span>
                        ) : sub.status === 'weak' ? (
                          <span className="text-amber-400 font-medium flex items-center gap-1 text-[11px]">
                            <AlertCircle className="w-3 h-3" /> Gap Detected
                          </span>
                        ) : (
                          <span className="text-rose-400 font-medium flex items-center gap-1 text-[11px]">
                            <XCircle className="w-3 h-3" /> Missing
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {(skill.level === 'Needs Practice' || skill.level === 'Missing') && (
                    <div className="pt-2 flex justify-end">
                      <Link
                        href={skill.name.toLowerCase().includes('sql') ? '/learning/module-sql-joins' : '/learning'}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Close This Gap (Recommended)
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
