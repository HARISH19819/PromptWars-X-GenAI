'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  User,
  Building,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProfilePage() {
  const { profile, resetProfileData } = useApp();

  const [name, setName] = useState(profile.personalInfo.name);
  const [college, setCollege] = useState(profile.personalInfo.college);
  const [degree, setDegree] = useState(profile.personalInfo.degree);
  const [branch, setBranch] = useState(profile.personalInfo.branch);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    try {
      confetti({ particleCount: 40, spread: 50 });
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Personal Placement Twin
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Student Identity
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Manage your personal credentials, target roles, and preparation preferences.
          </p>
        </div>

        <button
          onClick={resetProfileData}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700 hover:text-white hover:bg-slate-800 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Clean Baseline</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Info Card */}
        <div className="md:col-span-4 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[2px] mx-auto">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-indigo-400" />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">{profile.personalInfo.name}</h2>
              <span className="text-xs text-indigo-400 font-semibold block mt-0.5">
                {profile.targetRole}
              </span>
              <span className="text-xs text-slate-400">{profile.personalInfo.college}</span>
            </div>

            <div className="pt-2 border-t border-white/5 text-xs text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Graduation:</span>
                <span className="font-semibold text-white">{profile.personalInfo.graduationYear}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Readiness:</span>
                <span className="font-bold text-emerald-400">{profile.readiness.overall}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Daily Commitment:</span>
                <span className="font-semibold text-cyan-300">{profile.availableDailyMinutes} Mins</span>
              </div>
            </div>
          </div>

          {/* Quick Target Companies */}
          <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3 text-xs">
            <h3 className="font-bold text-white flex items-center gap-1.5">
              <Building className="w-4 h-4 text-cyan-400" />
              Target Companies:
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {profile.targetCompanies.map((c, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-300 font-medium"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Details Form */}
        <div className="md:col-span-8">
          <form onSubmit={handleSave} className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 space-y-5">
            <h3 className="text-base font-bold text-white tracking-tight pb-3 border-b border-white/5">
              Edit Academic Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">University / College</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Degree</label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Branch</label>
                <input
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-semibold text-slate-300">Placement Career Goals</label>
              <textarea
                rows={3}
                defaultValue={profile.careerGoals}
                className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              {isSaved ? (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Profile Updated Successfully!
                </span>
              ) : (
                <span />
              )}

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white transition-colors shadow-md shadow-indigo-600/30"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
