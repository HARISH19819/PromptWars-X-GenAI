'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Search,
  ExternalLink,
  Zap,
  Building,
  MapPin,
  Clock,
  Sparkles,
  TrendingUp,
  Globe,
  Compass,
} from 'lucide-react';

export default function JobsPage() {
  const { profile } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [liveQuery, setLiveQuery] = useState<string>(profile.targetRole || 'Software Engineer Fresher');
  const [liveLocation, setLiveLocation] = useState<string>('India');

  const filteredJobs = profile.jobMatches.filter((job) => {
    const matchesQuery =
      searchQuery === '' ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.strongMatches.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.source.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSource =
      selectedSource === 'all' || job.source.toLowerCase() === selectedSource.toLowerCase();

    return matchesQuery && matchesSource;
  });

  const sourcesList = [
    'all',
    'Google Careers',
    'Amazon Jobs',
    'LinkedIn',
    'Internshala',
    'Unstop',
    'Naukri',
    'Indeed',
    'Wellfound',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Job Intelligence &amp; Live Opportunities
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
              ZyncRole AI Module
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Real fresher openings &amp; internships across Google, Amazon, LinkedIn, Internshala, Unstop, Indeed &amp; Naukri.
          </p>
        </div>

        <div className="text-xs text-slate-300 bg-slate-900/90 px-4 py-2.5 rounded-xl border border-white/10 flex items-center gap-2">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>{profile.jobMatches.length} Verified Working Opportunities</span>
        </div>
      </div>

      {/* Live Search Across All Portals Tool */}
      <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Universal Live Job Scanner (Search Any Role on Any Platform)
            </h3>
          </div>
          <span className="text-[11px] text-cyan-300 font-mono">Direct Working Search Links</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-7">
            <label htmlFor="universal-job-keyword-input" className="text-[11px] font-semibold text-slate-400 block mb-1">
              Target Keyword / Job Role
            </label>
            <input
              id="universal-job-keyword-input"
              type="text"
              value={liveQuery}
              onChange={(e) => setLiveQuery(e.target.value)}
              placeholder="e.g. Full Stack Developer, Machine Learning, Data Analyst"
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="sm:col-span-5">
            <label htmlFor="universal-job-location-input" className="text-[11px] font-semibold text-slate-400 block mb-1">
              Location
            </label>
            <input
              id="universal-job-location-input"
              type="text"
              value={liveLocation}
              onChange={(e) => setLiveLocation(e.target.value)}
              placeholder="e.g. India, Remote, Bengaluru"
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* 1-Click Launch Buttons to Exact Platforms */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] text-slate-400 font-semibold block">
            Launch Exact Live Search on Official Platforms:
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            <a
              href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(liveQuery)}&location=${encodeURIComponent(liveLocation)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-all font-semibold"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={`https://internshala.com/internships/keywords-${encodeURIComponent(liveQuery)}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-600 hover:text-white transition-all font-semibold"
            >
              <span>Internshala</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={`https://unstop.com/job-portal?searchTerm=${encodeURIComponent(liveQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600 hover:text-white transition-all font-semibold"
            >
              <span>Unstop</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={`https://in.indeed.com/jobs?q=${encodeURIComponent(liveQuery)}&l=${encodeURIComponent(liveLocation)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white transition-all font-semibold"
            >
              <span>Indeed</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={`https://www.google.com/about/careers/applications/jobs/results/?q=${encodeURIComponent(liveQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition-all font-semibold"
            >
              <span>Google Careers</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={`https://www.amazon.jobs/en/search?base_query=${encodeURIComponent(liveQuery)}&loc_query=${encodeURIComponent(liveLocation)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600/20 text-amber-300 border border-amber-500/30 hover:bg-amber-600 hover:text-white transition-all font-semibold"
            >
              <span>Amazon Jobs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Market -> Learning Loop Highlight Banner */}
      <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 flex-shrink-0 mt-0.5">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-white">
              Recruiter Requirement Alert: Docker containerization is required in 88% of target postings
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Companies like Google, Amazon, Fractal, and Swiggy test API deployment during campus screens. Closing this gap elevates your profile match score by +12%.
            </p>
          </div>
        </div>

        <Link
          href="/learning/module-docker-basics"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-cyan-600 hover:bg-cyan-500 transition-colors shadow-md shadow-cyan-600/20 self-start md:self-auto flex-shrink-0"
        >
          <Zap className="w-3.5 h-3.5 fill-white" />
          <span>Learn Docker (20 Mins)</span>
        </Link>
      </div>

      {/* Filter and In-Page Search */}
      <div className="glass-panel rounded-2xl p-4 border border-white/10 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter opportunities by role, company, or skill"
              placeholder="Filter by role, company, or skill..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="text-xs text-slate-400">
            Showing <strong className="text-white">{filteredJobs.length}</strong> matching opportunities
          </div>
        </div>

        {/* Source Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
          {sourcesList.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => setSelectedSource(src)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedSource === src
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {src === 'all' ? 'All Platforms' : src}
            </button>
          ))}
        </div>
      </div>

      {/* Matched Job Cards */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all"
          >
            {/* Job Details */}
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                  {job.source}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {job.location}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {job.experienceRequired}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-bold">{job.salaryOrStipend}</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white hover:text-cyan-300 transition-colors">
                  {job.title}
                </h3>
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mt-0.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  {job.company}
                </span>
              </div>

              {/* Explainable AI Match Reasoning Box */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/20 text-xs text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Why This Matches Your Placement Twin:</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {job.whyMatchesExplanation}
                </p>
              </div>

              {/* Skill Match Tags & Gap Alerts */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {job.strongMatches.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                    >
                      ✓ {s}
                    </span>
                  ))}
                </div>

                {job.missingSkills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {job.missingSkills.map((gap, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30"
                      >
                        ⚠ Gap: {gap}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Score & View Button */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-white/5 flex-shrink-0">
              <div className="text-left lg:text-right">
                <div className="flex items-baseline gap-1 lg:justify-end">
                  <span className="text-3xl font-extrabold text-cyan-400">
                    {job.matchScore}%
                  </span>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Match</span>
                </div>
                <span className="text-[10px] text-slate-500 block">Status: {job.postedDate}</span>
              </div>

              <a
                href={job.originalJobUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Apply for ${job.title} role at ${job.company} on official portal`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 transition-all shadow-md shadow-cyan-600/30 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span>Apply on Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
