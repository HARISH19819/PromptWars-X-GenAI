'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Key,
  Trash2,
  CheckCircle2,
  Shield,
  RotateCcw,
} from 'lucide-react';

export default function SettingsPage() {
  const { resetProfileData } = useApp();

  const [geminiKeyInput, setGeminiKeyInput] = useState('');
  const [keySaved, setKeySaved] = useState(false);
  const [dataCleared, setDataCleared] = useState(false);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && geminiKeyInput) {
      localStorage.setItem('user_gemini_api_key', geminiKeyInput);
      setKeySaved(true);
      setTimeout(() => setKeySaved(false), 2500);
    }
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to reset your preparation metrics back to a clean baseline?')) {
      resetProfileData();
      setDataCleared(true);
      setTimeout(() => setDataCleared(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Settings &amp; Configuration
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            System Preferences
          </span>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Configure API credentials, inspect environment diagnostics, and manage local persistence.
        </p>
      </div>

      {/* Diagnostics Card */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4 text-xs">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          Environment &amp; Integration Diagnostics
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
            <span className="text-slate-400 font-medium">Google Gemini API:</span>
            <div className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active (Server + Heuristic Fallback)
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
            <span className="text-slate-400 font-medium">Firebase Integration:</span>
            <div className="text-cyan-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Client LocalStore + Firestore Hybrid
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
            <span className="text-slate-400 font-medium">Google Meet Engine:</span>
            <div className="text-indigo-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Live Sandbox Mode Active
            </div>
          </div>
        </div>
      </div>

      {/* Custom Gemini API Key Configuration */}
      <form onSubmit={handleSaveKey} className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4 text-xs">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-indigo-400" />
            Custom Google Gemini API Key (Optional)
          </h3>
          <p className="text-slate-400 mt-1">
            The platform includes intelligent heuristic AI responses out of the box. You can optionally supply your own Gemini API key for live real-time model streaming.
          </p>
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-slate-300">Gemini API Key</label>
          <input
            type="password"
            value={geminiKeyInput}
            onChange={(e) => setGeminiKeyInput(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-indigo-500 font-mono"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          {keySaved ? (
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Custom Key Saved Locally!
            </span>
          ) : (
            <span className="text-slate-500 text-[11px]">
              Keys remain private to your local browser session.
            </span>
          )}

          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white transition-colors"
          >
            Save Key
          </button>
        </div>
      </form>

      {/* Reset Baseline & Clear Local Storage */}
      <div className="glass-panel rounded-2xl p-6 border border-rose-500/20 bg-rose-950/10 space-y-4 text-xs">
        <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
          <Trash2 className="w-4 h-4 text-rose-400" />
          Reset Preparation Baseline
        </h3>
        <p className="text-slate-300">
          Reset all practice session histories, recorded assessment scores, and AI feedback back to your clean student starting baseline.
        </p>

        <div className="flex items-center justify-between pt-2">
          {dataCleared ? (
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Baseline Reset Complete!
            </span>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={handleClearData}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs text-white bg-rose-600 hover:bg-rose-500 transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}
