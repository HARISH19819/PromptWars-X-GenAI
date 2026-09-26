import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Cpu, RefreshCw, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-slate-950/80 mt-16 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">Placement360 AI</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              From Preparation to Placement — Your Entire Journey, Personalized. An adaptive, closed-loop placement ecosystem connecting career intelligence, targeted learning, adaptive assessment, live GD sessions, AI interview defense, ATS resume scoring, and the integrated ZyncRole AI job intelligence engine.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-emerald-400" /> Zero Admin • Self-Service</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-cyan-400" /> Google Gemini API</span>
              <span>•</span>
              <span className="flex items-center gap-1"><RefreshCw className="w-3.5 h-3.5 text-indigo-400" /> Closed-Loop Learning</span>
            </div>
          </div>

          {/* Quick Ecosystem Links */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Preparation Loop</h4>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Personalized Dashboard</Link></li>
              <li><Link href="/learning" className="hover:text-white transition-colors">Targeted Learning Hub</Link></li>
              <li><Link href="/assessment" className="hover:text-white transition-colors">Adaptive Assessments</Link></li>
              <li><Link href="/gd" className="hover:text-white transition-colors">Live GD Practice & Indicator Feedback</Link></li>
              <li><Link href="/interview" className="hover:text-white transition-colors">AI Project Defense Interview</Link></li>
            </ul>
          </div>

          {/* Job Intelligence & Compliance */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Job Intelligence</h4>
            <ul className="space-y-2">
              <li><Link href="/jobs" className="hover:text-white transition-colors">ZyncRole AI Job Feed</Link></li>
              <li><Link href="/resume" className="hover:text-white transition-colors">ATS-Style Resume Center</Link></li>
              <li><Link href="/career" className="hover:text-white transition-colors">Role Alignment Analysis</Link></li>
              <li><Link href="/progress" className="hover:text-white transition-colors">Preparation Readiness History</Link></li>
              <li>
                <a 
                  href="https://rxresu.me/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Free ATS Resume Builder <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© 2026 Placement360 AI. Built for the National Google Developer Groups Hackathon.</p>
          <p className="text-right">
            Placement Readiness is a continuous preparation metric and does not represent an absolute guarantee of employment.
          </p>
        </div>
      </div>
    </footer>
  );
};
