'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { InterviewEvaluation, InterviewAttempt } from '@/types';
import {
  Mic,
  MicOff,
  MessageSquare,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Send,
  HelpCircle,
  Award,
  Zap,
  Edit3,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InterviewArenaPage() {
  const { profile, recordInterviewAttempt } = useApp();

  const [activeMode, setActiveMode] = useState<
    'project-defense' | 'technical' | 'hr' | 'behavioral'
  >('project-defense');

  // Interactive Question State
  const defaultQuestions = {
    'project-defense':
      'Explain your top technical project. What exact problem did it solve, and why did you choose your architecture over a simpler baseline?',
    technical:
      'How does gradient descent update parameters in deep neural networks, and why would you choose the Adam optimizer over SGD with momentum?',
    behavioral:
      'Tell me about a time when you and a teammate had a strong technical disagreement on an engineering project. How did you resolve it?',
    hr:
      'Why are you interested in joining as a fresher engineer, and where do you see your technical trajectory in 3 years?',
  };

  const [currentQuestion, setCurrentQuestion] = useState(defaultQuestions['project-defense']);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(null);

  // Live Speech-to-Text Microphone
  const [isRecording, setIsRecording] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setRecognitionSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setStudentAnswer((prev) => prev ? `${prev} ${currentTranscript}` : currentTranscript);
        };

        recognition.onerror = (event: any) => {
          console.warn('Interview speech recognition error:', event.error);
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
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
        console.error('Failed to start interview recording:', err);
      }
    }
  };

  const handleModeChange = (mode: 'project-defense' | 'technical' | 'hr' | 'behavioral') => {
    setActiveMode(mode);
    setCurrentQuestion(defaultQuestions[mode]);
    setStudentAnswer('');
    setEvaluation(null);
    setIsEditingQuestion(false);
  };

  const handleSubmitAnswer = async () => {
    if (!studentAnswer.trim()) return;
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
    setIsEvaluating(true);

    try {
      const res = await fetch('/api/ai/evaluate-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion,
          answer: studentAnswer,
          mode: activeMode,
          targetRole: profile.targetRole,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        const evalData: InterviewEvaluation = json.data;
        setEvaluation(evalData);

        const newAttempt: InterviewAttempt = {
          id: `interview_${Date.now()}`,
          mode: activeMode,
          targetRole: profile.targetRole,
          date: 'Just now',
          overallScore: evalData.overallScore,
          questionsCount: 1,
          dialogue: [
            {
              question: currentQuestion,
              studentAnswer,
              evaluation: evalData,
            },
          ],
        };

        recordInterviewAttempt(newAttempt);

        if (evalData.overallScore >= 70) {
          try {
            confetti({ particleCount: 70, spread: 60 });
          } catch {
            // ignore
          }
        }
      }
    } catch (err) {
      console.error('Error evaluating interview answer:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleFollowUp = () => {
    if (evaluation?.followUpQuestion) {
      setCurrentQuestion(evaluation.followUpQuestion);
      setStudentAnswer('');
      setEvaluation(null);
    }
  };

  const handleRetry = () => {
    setEvaluation(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Interview Arena &amp; Project Defense
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Interactive Panel Simulation
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Face tough technical panel questioning, defend your projects with live voice, and eliminate filler words.
          </p>
        </div>

        <div className="glass-panel px-4 py-2 rounded-xl border border-white/10 text-xs flex items-center gap-3">
          <Mic className="w-5 h-5 text-amber-400" />
          <div>
            <div className="font-bold text-white">
              Interview Readiness: {profile.readiness.interview}%
            </div>
            <div className="text-[10px] text-slate-400">
              Target Role: {profile.targetRole}
            </div>
          </div>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: 'project-defense', label: 'Project Defense', desc: 'Defend your real project code' },
          { id: 'technical', label: 'Core Technical', desc: 'Algorithms & System Logic' },
          { id: 'behavioral', label: 'Behavioral (STAR)', desc: 'Conflict & Team Scenarios' },
          { id: 'hr', label: 'HR & Cultural Fit', desc: 'Motivation & Career Goals' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleModeChange(tab.id as any)}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              activeMode === tab.id
                ? 'bg-amber-600/25 border-amber-500 shadow-md shadow-amber-600/20'
                : 'bg-slate-900/60 border-white/10 hover:bg-slate-800'
            }`}
          >
            <div className="font-bold text-xs text-white flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${activeMode === tab.id ? 'bg-amber-400' : 'bg-slate-600'}`} />
              {tab.label}
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">{tab.desc}</span>
          </button>
        ))}
      </div>

      {/* Interview Question & Interactive Response Box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
        {/* Interviewer Question Box */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Technical Interviewer Panel
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                Role: {profile.targetRole}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsEditingQuestion(!isEditingQuestion)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditingQuestion ? 'Done Editing' : 'Customize Question'}</span>
            </button>
          </div>

          {isEditingQuestion ? (
            <input
              type="text"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          ) : (
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              &quot;{currentQuestion}&quot;
            </h3>
          )}
        </div>

        {/* Answer Input with Voice Recording */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Your Response:</span>

            {recognitionSupported && (
              <button
                type="button"
                onClick={toggleRecording}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-slate-900 border border-slate-700 text-amber-300 hover:border-amber-400'
                }`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-3 h-3" />
                    <span>Listening... Stop Recording</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3 h-3" />
                    <span>Answer via Microphone</span>
                  </>
                )}
              </button>
            )}
          </div>

          <textarea
            rows={6}
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            placeholder="Type your structured answer here, or click 'Answer via Microphone' to speak naturally. Include technical tradeoffs, quantified metrics, and clear justification..."
            className="w-full p-4 rounded-2xl bg-slate-950 border border-white/10 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400">
              {studentAnswer.trim() ? `${studentAnswer.trim().split(/\s+/).length} words` : '0 words'}
            </span>

            <button
              disabled={isEvaluating || !studentAnswer.trim()}
              onClick={handleSubmitAnswer}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 disabled:opacity-50 transition-all shadow-md shadow-amber-600/30 hover:scale-[1.02]"
            >
              {isEvaluating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Evaluating Technical Depth...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Submit Answer For Panel Evaluation</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Real-time Panel Evaluation Card */}
        {evaluation && (
          <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-5 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
              <div>
                <span className="text-xs font-bold text-amber-300 block">
                  Panel Evaluation &amp; Communication Analysis
                </span>
                <p className="text-[11px] text-slate-300 mt-0.5">{evaluation.feedbackSummary}</p>
              </div>

              <div className="text-right">
                <span className="text-xl font-extrabold text-white">{evaluation.overallScore}%</span>
                <span className="text-[10px] text-slate-400 block uppercase">Overall Score</span>
              </div>
            </div>

            {/* 4 Score Meters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Technical Depth</span>
                <span className="text-base font-extrabold text-white mt-1 block">{evaluation.technicalAccuracy}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Relevance</span>
                <span className="text-base font-extrabold text-white mt-1 block">{evaluation.relevance}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                <span className="text-[10px] text-slate-400 font-bold uppercase">STAR Structure</span>
                <span className="text-base font-extrabold text-white mt-1 block">{evaluation.structure}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Clarity</span>
                <span className="text-base font-extrabold text-white mt-1 block">{evaluation.clarity}%</span>
              </div>
            </div>

            {/* Filler Words Alert */}
            {evaluation.fillerWordsDetected.length > 0 && (
              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>
                  <strong>Filler Words Detected:</strong> You used &quot;{evaluation.fillerWordsDetected.join('", "')}&quot;. Aim to pause deliberately instead of filling space.
                </span>
              </div>
            )}

            {/* Improvement Points */}
            <div className="space-y-1.5 pt-1">
              <span className="font-bold text-amber-300">Targeted Improvements:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {evaluation.improvementPoints.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </div>

            {/* Follow-up question & Action buttons */}
            <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700 hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Try Again (Refine Delivery)
              </button>

              {evaluation.followUpQuestion && (
                <button
                  type="button"
                  onClick={handleFollowUp}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/30"
                >
                  <span>Face Probing Follow-Up</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Historical Interview Dialogue Log */}
      {profile.interviewAttempts.length > 0 && (
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Previous Interview Dialogue Log
          </h3>

          <div className="space-y-3">
            {profile.interviewAttempts.map((attempt) => (
              <div
                key={attempt.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                    Mode: {attempt.mode} • {attempt.targetRole}
                  </span>
                  <span className="font-extrabold text-amber-300">
                    Score: {attempt.overallScore}%
                  </span>
                </div>
                {attempt.dialogue.map((d, dIdx) => (
                  <div key={dIdx} className="space-y-1 pt-1 text-slate-300">
                    <p className="font-medium text-slate-200">
                      <strong>Q:</strong> {d.question}
                    </p>
                    <p className="text-slate-400 pl-4 border-l border-white/10 italic">
                      &quot;{d.studentAnswer}&quot;
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
