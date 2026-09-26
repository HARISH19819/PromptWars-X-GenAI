'use client';

import React from 'react';
import Link from 'next/link';
import { NextBestAction } from '@/types';
import { ArrowRight, Clock, AlertTriangle, Sparkles, Target, Zap } from 'lucide-react';

interface NextBestActionCardProps {
  action: NextBestAction;
}

export const NextBestActionCard: React.FC<NextBestActionCardProps> = ({ action }) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 shadow-xl shadow-indigo-500/10">
      <div className="relative bg-slate-950/95 backdrop-blur-xl rounded-[15px] p-6 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Your Next Best Action
              </span>

              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                action.priority === 'Critical'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                <AlertTriangle className="w-3 h-3" />
                {action.priority} Priority
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                <Clock className="w-3 h-3 text-slate-400" />
                {action.timeEstimate}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-indigo-200 transition-colors">
              {action.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {action.description}
            </p>

            {/* Why This Action Reason Box */}
            <div className="bg-slate-900/90 border border-indigo-500/20 rounded-xl p-3.5 text-xs text-slate-300 flex items-start gap-2.5">
              <div className="p-1 rounded-md bg-indigo-600/30 text-indigo-300 flex-shrink-0 mt-0.5">
                <Target className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-semibold text-indigo-300 block mb-0.5">Adaptive Intelligence Diagnosis:</span>
                <span className="text-slate-300 leading-normal">{action.why}</span>
              </div>
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="flex-shrink-0">
            <Link
              href={action.actionUrl}
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-cyan-500 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>{action.actionText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
