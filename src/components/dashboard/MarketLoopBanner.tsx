'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, RefreshCw } from 'lucide-react';

export const MarketLoopBanner = () => {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 bg-gradient-to-r from-slate-950 via-slate-900/90 to-cyan-950/30">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <RefreshCw className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                ZyncRole AI • Live Job Market Feedback Loop
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
                Market Pulse
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5">
              88% of Fresher ML Engineer Openings in Bengaluru Request Docker & Containerized APIs
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Our continuous market scanner detected Docker as a repeated prerequisite in your matched roles (Fractal, Swiggy, ZS Associates). Your profile currently lacks containerization evidence.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0 self-end md:self-auto">
          <Link
            href="/jobs"
            className="text-xs font-semibold px-3 py-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
          >
            Inspect Matched Jobs
          </Link>
          <Link
            href="/learning/module-docker-basics"
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-md shadow-cyan-600/20"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            Learn Docker (20 Mins)
          </Link>
        </div>
      </div>
    </div>
  );
};
