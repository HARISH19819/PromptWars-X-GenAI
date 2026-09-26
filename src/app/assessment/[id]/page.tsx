'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Zap,
  HelpCircle,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AssessmentDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { profile, submitAssessmentAttempt } = useApp();

  const assessment = profile.assessments.find((a) => a.id === id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(600); // 10 minutes default
  const [scoreResult, setScoreResult] = useState<{
    score: number;
    correctCount: number;
    weakAreas: string[];
    strongAreas: string[];
  } | null>(null);

  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  if (!assessment) {
    return notFound();
  }

  const currentQ = assessment.questions[currentIndex];
  const totalQuestions = assessment.questions.length;

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: optionIndex,
    });
  };

  const handleSubmitTest = () => {
    let correct = 0;
    const weakTopics: Set<string> = new Set();
    const strongTopics: Set<string> = new Set();

    const formattedAnswers = assessment.questions.map((q, idx) => {
      const selected = selectedAnswers[idx] ?? -1;
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) {
        correct++;
        strongTopics.add(q.topic);
      } else {
        weakTopics.add(q.topic);
      }
      return {
        questionId: q.id,
        selectedOption: selected,
        isCorrect,
      };
    });

    const finalScore = Math.round((correct / totalQuestions) * 100);
    const weakList = Array.from(weakTopics);
    const strongList = Array.from(strongTopics);

    setScoreResult({
      score: finalScore,
      correctCount: correct,
      weakAreas: weakList,
      strongAreas: strongList,
    });

    setIsSubmitted(true);
    submitAssessmentAttempt(assessment.id, formattedAnswers, finalScore, weakList, strongList);

    if (finalScore >= 70) {
      try {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/assessment"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Exit Assessment
        </Link>

        {!isSubmitted && (
          <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-mono font-bold text-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Time Left: {formatTimer(secondsRemaining)}</span>
          </div>
        )}
      </div>

      {/* Main Container */}
      {!isSubmitted ? (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-indigo-400 uppercase tracking-wider">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Difficulty: {currentQ.difficulty}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-indigo-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3 pt-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Topic: {currentQ.topic}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentIndex] === optIdx;
              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-indigo-600/25 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-slate-900/60 border-white/10 text-slate-300 hover:bg-slate-800/80 hover:border-white/20'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Footer Controls */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>

            {currentIndex < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white transition-colors"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit &amp; View Diagnosis</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center mx-auto text-indigo-400">
              <Award className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Diagnostic Assessment Complete
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                Your Score: {scoreResult?.score}%
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                {scoreResult?.correctCount} of {totalQuestions} questions answered correctly.
              </p>
            </div>

            {/* Profile Update Alert */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 max-w-lg mx-auto flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                Placement Twin updated! Readiness and Next Best Action have recalibrated.
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/30"
              >
                <span>View Updated Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setIsSubmitted(false);
                  setCurrentIndex(0);
                  setSecondsRemaining(600);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-300 bg-slate-900 border border-slate-700 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Test
              </button>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              Question-by-Question Diagnostic Review
            </h3>

            {assessment.questions.map((q, idx) => {
              const userPick = selectedAnswers[idx] ?? -1;
              const isCorrect = userPick === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`glass-panel rounded-2xl p-5 border text-xs space-y-3 ${
                    isCorrect ? 'border-emerald-500/30' : 'border-amber-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-400">Question {idx + 1} • {q.topic}</span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                        isCorrect
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {isCorrect ? 'Correct ✓' : 'Incorrect ✗'}
                    </span>
                  </div>

                  <p className="font-semibold text-white text-sm">{q.question}</p>

                  <div className="space-y-1.5">
                    {q.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                          optIdx === q.correctAnswer
                            ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200 font-semibold'
                            : optIdx === userPick && !isCorrect
                            ? 'bg-rose-950/50 border-rose-500/40 text-rose-300'
                            : 'bg-slate-950/40 border-white/5 text-slate-400'
                        }`}
                      >
                        <span>
                          {String.fromCharCode(65 + optIdx)}. {opt}
                        </span>
                        {optIdx === q.correctAnswer && (
                          <span className="text-[10px] text-emerald-400 font-bold uppercase">
                            Correct Answer
                          </span>
                        )}
                        {optIdx === userPick && !isCorrect && (
                          <span className="text-[10px] text-rose-400 font-bold uppercase">
                            Your Pick
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Explanation */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-white/5 text-slate-300 text-[11px] leading-relaxed">
                    <strong className="text-indigo-300 block mb-0.5">Explanation:</strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
