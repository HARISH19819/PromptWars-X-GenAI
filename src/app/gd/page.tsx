'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  MessageSquare,
  PlusCircle,
  Mic,
  MicOff,
  Radio,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';

import {
  GDFeedback,
  ISpeechRecognition,
  WindowWithSpeech,
  SpeechRecognitionEventLike,
} from '@/types';

type GDCategory = 'AI & Tech' | 'Current Affairs' | 'Business & Economy' | 'Ethics & Society';

export default function GDPracticePage() {
  const { profile, bookGDSession, cancelGDBooking, createGDSession, submitGDFeedback } = useApp();

  // Modal State for Creating Custom Real Session
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [newCategory, setNewCategory] = useState<GDCategory>('AI & Tech');
  const [newContext, setNewContext] = useState('');
  const [newDate, setNewDate] = useState('Today, Live Room');
  const [newTime, setNewTime] = useState('Immediate / Live');
  const [customMeetUrl, setCustomMeetUrl] = useState('');

  // Speech Analysis & Live Mic State
  const [transcriptTopic, setTranscriptTopic] = useState(
    'Will Generative AI Eliminate Entry-Level Engineering Roles or Accelerate Them?'
  );
  const [transcriptText, setTranscriptText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState<GDFeedback | null>(null);

  // Live Speech Recognition
  const [isRecording, setIsRecording] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const win = window as WindowWithSpeech;
      const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;
      if (SpeechRecognitionClass) {
        const timer = setTimeout(() => setRecognitionSupported(true), 0);
        const recognition = new SpeechRecognitionClass();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: SpeechRecognitionEventLike) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscriptText((prev) => prev ? `${prev} ${currentTranscript}` : currentTranscript);
        };

        recognition.onerror = (event: SpeechRecognitionEventLike) => {
          console.warn('Speech recognition error:', event.error);
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
      }
    }
  };

  const handleBook = (id: string) => {
    bookGDSession(id);
  };

  const handleCancel = (id: string) => {
    cancelGDBooking(id);
  };

  const handleCreateSessionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    createGDSession({
      topic: newTopic,
      category: newCategory,
      context: newContext || 'Peer-organized real live discussion room on Placement360 AI.',
      date: newDate,
      time: newTime,
      meetLink: customMeetUrl.trim() || undefined,
    });

    setIsModalOpen(false);
    setNewTopic('');
    setNewContext('');
    setCustomMeetUrl('');
  };

  const handleAnalyzeTranscript = async () => {
    if (!transcriptText.trim()) return;
    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/ai/gd-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: transcriptTopic,
          transcript: transcriptText,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        setActiveFeedback(json.data);
        submitGDFeedback(json.data);
        try {
          confetti({ particleCount: 50, spread: 60 });
        } catch {
          // ignore
        }
      }
    } catch (err) {
      console.error('Error analyzing GD transcript:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Live Group Discussion Practice Hub
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              Real Peer Rooms
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Practice live with real peers. Enter instant interactive video rooms or schedule custom group discussions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Host New GD Session</span>
          </button>
        </div>
      </div>

      {/* Real Video Integration Notice Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/30 border border-emerald-500/30 text-xs text-slate-300 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-emerald-300">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white block">
              100% Real Live Meeting Rooms (Jitsi Meet &amp; Google Meet)
            </span>
            <span className="text-slate-400 text-[11px]">
              Every room has real microphone, camera, and screenshare capabilities. Share your room link with peers or classmates to practice together live.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-300 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Live Rooms Active</span>
        </div>
      </div>

      {/* Available Live GD Sessions */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          Active Peer Discussion Sessions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.gdSessions.map((session) => (
            <div
              key={session.id}
              className={`glass-panel glass-panel-hover rounded-2xl p-6 border flex flex-col justify-between space-y-4 transition-all ${
                session.isBookedByMe
                  ? 'border-emerald-500/40 bg-emerald-950/15 shadow-lg shadow-emerald-500/10'
                  : 'border-white/10'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {session.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {session.durationMinutes} mins
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {session.topic}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {session.context}
                </p>

                {/* Session Time & Slot Limit */}
                <div className="bg-slate-900/80 rounded-xl p-3 border border-white/5 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="font-medium text-emerald-300">{session.date}</span>
                    <span className="font-bold text-white">{session.time}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-white/5">
                    <span>Active Participants:</span>
                    <span className="font-bold text-slate-200">
                      {session.currentParticipants} / {session.maxParticipants} slots
                    </span>
                  </div>
                </div>

                {/* Host tag */}
                {session.createdBy && (
                  <div className="text-[10px] text-slate-500">
                    Organized by: <strong className="text-slate-400">{session.createdBy}</strong>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/5 space-y-2">
                {session.isBookedByMe ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> You Are Registered
                      </span>
                      <button
                        onClick={() => handleCancel(session.id)}
                        className="text-[11px] text-rose-400 hover:text-rose-300 underline"
                      >
                        Leave Slot
                      </button>
                    </div>

                    <a
                      href={session.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
                    >
                      <Video className="w-4 h-4" />
                      <span>Enter Live Video Room (Real Peer Meet)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ) : (
                  <button
                    disabled={session.currentParticipants >= session.maxParticipants}
                    onClick={() => handleBook(session.id)}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white transition-colors disabled:opacity-50 shadow-md shadow-indigo-600/20"
                  >
                    {session.currentParticipants >= session.maxParticipants
                      ? 'Room Full'
                      : 'Join / Book Free Slot'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GD Speech & Argument Communication Coach with Real Voice Input */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">
                AI Group Discussion Speech &amp; Delivery Coach
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Speak or type your opening argument. Our Gemini engine evaluates your communication indicators in real-time.
            </p>
          </div>

          {/* Voice Input Button */}
          {recognitionSupported && (
            <button
              type="button"
              onClick={toggleRecording}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                isRecording
                  ? 'bg-rose-600 text-white animate-pulse shadow-rose-600/40'
                  : 'bg-slate-900 border border-slate-700 text-slate-200 hover:border-indigo-500 hover:text-white'
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-3.5 h-3.5" />
                  <span>Recording... Click to Stop</span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Speak via Microphone</span>
                </>
              )}
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Discussion Topic</label>
            <input
              type="text"
              value={transcriptTopic}
              onChange={(e) => setTranscriptTopic(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <label className="font-semibold">Your Spoken Point / Transcript</label>
              {isRecording && (
                <span className="text-rose-400 font-bold text-[11px] animate-pulse">
                  Listening to your microphone...
                </span>
              )}
            </div>
            <textarea
              rows={4}
              value={transcriptText}
              onChange={(e) => setTranscriptText(e.target.value)}
              placeholder="Speak using the microphone button or type your opening point here. Include reasons, practical industry examples, and a clear conclusion..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
            />
          </div>

          <div className="flex justify-end">
            <button
              disabled={isAnalyzing || !transcriptText.trim()}
              onClick={handleAnalyzeTranscript}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-colors shadow-md shadow-indigo-600/30"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing Communication Indicators...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze Speech Indicators</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Real-time Indicator Feedback Card */}
        {activeFeedback && (
          <div className="mt-6 p-6 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="font-bold text-white text-sm">
                Communication Indicators Report
              </span>
              <span className="font-extrabold text-sm px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                Overall: {activeFeedback.overallScore}%
              </span>
            </div>

            {/* 4 Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Participation</span>
                <span className="text-base font-extrabold text-white mt-1 block">{activeFeedback.participation}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Relevance</span>
                <span className="text-base font-extrabold text-white mt-1 block">{activeFeedback.relevance}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Clarity</span>
                <span className="text-base font-extrabold text-white mt-1 block">{activeFeedback.clarity}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Structure (PREP)</span>
                <span className="text-base font-extrabold text-white mt-1 block">{activeFeedback.structure}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <span className="font-bold text-emerald-400">Strengths:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {activeFeedback.strengths.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-amber-400">Actionable Coaching:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {activeFeedback.recommendedImprovements.map((imp, idx) => (
                    <li key={idx}>{imp}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Host New GD Session Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="host-session-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        >
          <div className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h3 id="host-session-title" className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Video className="w-5 h-5 text-indigo-400" aria-hidden="true" />
                Host a Live Peer GD Room
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close host session modal"
                className="p-1 rounded-lg text-slate-400 hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleCreateSessionSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label htmlFor="gd-new-topic" className="font-semibold text-slate-300">Discussion Topic</label>
                <input
                  id="gd-new-topic"
                  type="text"
                  required
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="e.g. Microservices vs Monolithic Architecture in Modern Cloud"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="gd-new-category" className="font-semibold text-slate-300">Category</label>
                <select
                  id="gd-new-category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as GDCategory)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="AI & Tech">AI &amp; Tech</option>
                  <option value="Business & Economy">Business &amp; Economy</option>
                  <option value="Ethics & Society">Ethics &amp; Society</option>
                  <option value="Current Affairs">Current Affairs</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="gd-new-date" className="font-semibold text-slate-300">Date</label>
                  <input
                    id="gd-new-date"
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="gd-new-time" className="font-semibold text-slate-300">Time</label>
                  <input
                    id="gd-new-time"
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="gd-custom-meet-url" className="font-semibold text-slate-300">
                  Custom Video Room URL (Optional)
                </label>
                <input
                  id="gd-custom-meet-url"
                  type="url"
                  value={customMeetUrl}
                  onChange={(e) => setCustomMeetUrl(e.target.value)}
                  placeholder="Leave empty to automatically generate instant Jitsi Meet room"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
                />
                <span className="text-[10px] text-slate-500 block">
                  If left empty, a live, 100% free interactive video room will be generated automatically.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-white shadow-md shadow-indigo-600/30"
                >
                  Create &amp; Launch Live Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
