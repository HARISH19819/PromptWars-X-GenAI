'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Target,
  Zap,
  BookOpen,
  CheckCircle2,
  Users,
  Mic,
  FileText,
  Briefcase,
  TrendingUp,
  RefreshCw,
  Shield,
  Layers,
  ChevronRight,
  Clock,
  Compass,
} from 'lucide-react';
export default function LandingPage() {

  return (
    <div className="w-full flex flex-col items-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-cyan-500/15 blur-[120px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 text-center relative">
        {/* Hackathon Tag Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-8 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Google Developer Groups Hackathon 2026</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 font-normal">Next-Gen Placement Ecosystem</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
          Stop Guessing.{' '}
          <span className="gradient-text-indigo block sm:inline">
            Start Preparing.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Placement360 AI understands where you stand today, pinpoints your exact preparation gaps, trains you through targeted practice, and connects your progress to real opportunities.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-cyan-500 shadow-xl shadow-indigo-600/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>Start My Placement Journey</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/90 border border-slate-700/80 hover:bg-slate-800 hover:border-indigo-500/50 hover:text-white transition-all shadow-md"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Explore Dashboard</span>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-slate-400 mt-5">
          <span>Already preparing? <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-bold underline">Sign In</Link></span>
          <span>•</span>
          <span>New student? <Link href="/register" className="text-cyan-400 hover:text-cyan-300 font-bold underline">Create Free Account</Link></span>
        </div>

        <p className="text-[11px] text-slate-500 mt-2">
          Self-service student platform • Zero admin friction • Google Gemini AI powered
        </p>
      </section>

      {/* Interactive Core Innovation Feature Preview */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-24">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center">
                <Target className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Continuous Adaptive Intelligence Loop</h3>
                <p className="text-xs text-slate-400">Everything connects to the student&apos;s Placement Twin</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                Dynamic Profile Sync
              </span>
            </div>
          </div>

          {/* Connected Loop Steps Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Step 1 • Diagnose</span>
                <Clock className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <h4 className="text-sm font-bold text-white">Skill Gap Analysis</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluates resume and tests against target role requirements. Detects SQL JOIN bottleneck.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Step 2 • Prescribe</span>
                <Zap className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <h4 className="text-sm font-bold text-white">Next Best Action</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prioritizes single highest impact 15-minute challenge. No overwhelming 50-hour backlogs.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Step 3 • Verify</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <h4 className="text-sm font-bold text-white">Adaptive Assessment</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tests newly acquired knowledge. Score jumps from 43% to 76%. Profile instantly updates.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Step 4 • Connect</span>
                <Briefcase className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <h4 className="text-sm font-bold text-white">ZyncRole AI Matching</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Re-evaluates live postings on LinkedIn & Naukri. Recalculates match % and identifies new opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem We Solve vs The Old Way */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
            Why Students Struggle
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
            The Problem Isn&apos;t Lack of Resources. It&apos;s Fragmentation.
          </h2>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            Students currently jump between YouTube, LeetCode, aptitude PDFs, resume checkers, and job boards. Nothing talks to each other.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Old Way */}
          <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-rose-500/20 bg-rose-950/10 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <h3 className="font-bold text-base text-rose-300">The Fragmented Old Way</h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✗</span>
                <span>Random preparation based on peer anxiety and hearsay without diagnosing actual gaps.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✗</span>
                <span>Overwhelmed by 100-hour video playlists and 500 LeetCode problems with zero roadmap.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✗</span>
                <span>No safe live group discussion practice; freezing up in company GD rounds.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✗</span>
                <span>Generic mock interviews that don&apos;t probe the student&apos;s actual resume projects.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">✗</span>
                <span>Applying to 100 jobs blindly with unexplained match percentages and zero feedback.</span>
              </li>
            </ul>
          </div>

          {/* Placement360 AI Way */}
          <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-emerald-500/20 bg-emerald-950/10 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <h3 className="font-bold text-base text-emerald-300">The Placement360 AI Way</h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Continuous Placement Twin tracking preparation readiness across 7 weighted dimensions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Psychology-first Next Best Action: &quot;What should I do right now for 15 minutes?&quot;</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Live scheduled GD practice sessions with Google Meet links and indicator feedback.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Project Defense Interview arena that rigorously interrogates your actual code &amp; metrics.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Integrated ZyncRole AI job intelligence: explainable match % and job-to-learning loop.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Complete Ecosystem Features Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            All-In-One Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
            Every Dimension of Campus Placement, Solved.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1: Career & Skill Gap */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Career Intelligence &amp; Skill Gaps</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Analyzes your resume against target roles (ML Engineer, Data Scientist, SDE). Deconstructs macro skills into actionable subskill checkpoints.
            </p>
            <Link href="/career" className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 pt-2">
              Explore Career Alignment <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 2: Targeted Learning */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Targeted Learning Hub</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prescribes 15 to 25-minute micro-learning modules based specifically on your diagnostic gaps. Curated official docs and top video tutorials.
            </p>
            <Link href="/learning" className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 pt-2">
              Browse Modules <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 3: Adaptive Assessment */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Adaptive Assessment Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Diagnostic tests that calibrate question difficulty dynamically based on your answers. Immediate weak area diagnosis and profile recalibration.
            </p>
            <Link href="/assessment" className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300 pt-2">
              Take Diagnostic Test <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 4: Live GD Practice Hub */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Live GD Practice Hub</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Book scheduled group discussions with real peers. Powered by Google Meet integration, structured topics, and post-session indicator reports.
            </p>
            <Link href="/gd" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 pt-2">
              Book Live GD Slot <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 5: AI Interview & Project Defense */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Mic className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">AI Project Defense Arena</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Simulates aggressive technical panel questions on your actual resume projects. Evaluates technical depth, STAR structure, and provides dynamic retry.
            </p>
            <Link href="/interview" className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 pt-2">
              Start Project Defense <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 6: ZyncRole AI Job Intelligence */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-white">ZyncRole AI Job Intelligence</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Aggregated fresher and intern roles from LinkedIn, Internshala, Indeed, and Naukri. Calculates explainable match % and detects market demand gaps.
            </p>
            <Link href="/jobs" className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 pt-2">
              Explore Matched Jobs <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-20 text-center">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-indigo-500/30 bg-gradient-to-b from-slate-900 via-slate-950 to-indigo-950/40 relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Know Where You Stand. Know What To Do Next.
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Join thousands of engineering students preparing smarter with Placement360 AI. Initialize your personalized Placement Twin in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/onboarding"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
            >
              Start Placement Onboarding
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-slate-300 hover:text-white bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-colors"
            >
              Explore Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
