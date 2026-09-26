'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { RoleCategory } from '@/types';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Upload,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, createCustomUserProfile } = useApp();

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');

  // Form states
  const [name, setName] = useState(user?.name && user.name !== 'Student Candidate' ? user.name : '');
  const [email, setEmail] = useState(user?.email && user.email !== 'student@campus.edu' ? user.email : '');
  const degree = 'B.Tech';
  const semester = '7th Semester';
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [gradYear, setGradYear] = useState('2025');
  const [college, setCollege] = useState('');

  const [resumeText, setResumeText] = useState('');

  // Sync if user context loads asynchronously
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (user?.name && user.name !== 'Student Candidate' && !name) {
        setName(user.name);
      }
      if (user?.email && user.email !== 'student@campus.edu' && !email) {
        setEmail(user.email);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [user, name, email]);

  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Full Stack Development',
    'AI / Machine Learning',
    'Data Science & Analytics',
  ]);
  const [targetRole, setTargetRole] = useState<RoleCategory>('Software Development Engineer');
  const [targetCompanies, setTargetCompanies] = useState('Google, Microsoft, Amazon, Atlassian');
  const [dailyMinutes, setDailyMinutes] = useState(90);
  const [careerGoals, setCareerGoals] = useState('Crack a top-tier fresher campus role in software development or data engineering.');


  const allInterests = [
    'AI / Machine Learning',
    'Data Science & Analytics',
    'Full Stack Development',
    'Backend Systems',
    'Cloud & DevOps',
    'Cybersecurity',
    'Mobile Development',
    'Blockchain & Web3',
  ];

  const roleOptions: RoleCategory[] = [
    'Machine Learning Engineer',
    'Data Scientist',
    'Full Stack Developer',
    'Backend Developer',
    'Frontend Developer',
    'Data Analyst',
    'Cloud / DevOps Engineer',
    'Cybersecurity Analyst',
    'Software Development Engineer',
  ];

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleFinishOnboarding = async () => {
    setIsProcessing(true);

    const statuses = [
      'Analyzing your resume & academic credentials...',
      'Extracting skills & verifying project depth...',
      'Mapping skill requirements for ' + targetRole + '...',
      'Synthesizing diagnostic gaps & Next Best Action...',
      'Building your personalized Placement Twin...',
    ];

    for (let i = 0; i < statuses.length; i++) {
      setProcessingStatus(statuses[i]);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    createCustomUserProfile({
      name,
      email,
      degree,
      branch,
      graduationYear: gradYear,
      semester,
      college,
      targetRole,
      interests: selectedInterests,
      targetCompanies: targetCompanies.split(',').map((c) => c.trim()),
      availableDailyMinutes: dailyMinutes,
      careerGoals,
      rawResumeText: resumeText,
    });

    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    router.push('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-2">
            <span className="text-indigo-400 font-bold uppercase tracking-wider">
              Step {step} of 6
            </span>
            <span>{Math.round((step / 6) * 100)}% Complete</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Welcome & Overview */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center mx-auto text-indigo-400 mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome to Placement360 AI
              </h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Let&apos;s build your personalized placement journey. We&apos;ll configure your Placement Twin, analyze your skills, and establish your daily preparation trajectory.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-center space-y-1">
                <div className="text-indigo-400 font-bold text-sm">Adaptive Gaps</div>
                <div className="text-xs text-slate-400">Targeted micro-learning</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-center space-y-1">
                <div className="text-cyan-400 font-bold text-sm">Live GD &amp; Meet</div>
                <div className="text-xs text-slate-400">Peer practice sessions</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-center space-y-1">
                <div className="text-emerald-400 font-bold text-sm">Job Intelligence</div>
                <div className="text-xs text-slate-400">Integrated ZyncRole AI</div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm text-white shadow-lg shadow-indigo-600/30 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Resume / Text Upload */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Upload Your Resume</h3>
              <p className="text-xs text-slate-400 mt-1">
                Our Gemini AI engine parses your projects, tech stack, and experience to detect initial placement readiness.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-dashed border-indigo-500/40 bg-indigo-950/20 text-center space-y-2">
                <Upload className="w-6 h-6 text-indigo-400 mx-auto" />
                <div className="text-xs text-slate-300 font-medium">
                  Paste resume text or edit the prefilled sample below
                </div>
                <p className="text-[11px] text-slate-500">
                  Accepts markdown, plain text, or copied PDF sections
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Resume Plain Text / Notes</label>
                <textarea
                  rows={6}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono leading-relaxed"
                  placeholder="Paste your resume content here..."
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm text-white transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Personal Details */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Academic Details</h3>
              <p className="text-xs text-slate-400 mt-1">
                Helps tailor campus eligibility thresholds and company tier criteria.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">College Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@campus.edu"
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Degree &amp; Branch</label>
                <input
                  type="text"
                  value={`${degree} in ${branch}`}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Graduation Year</label>
                <input
                  type="text"
                  value={gradYear}
                  onChange={(e) => setGradYear(e.target.value)}
                  placeholder="2025"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-slate-300">College / University</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. Stanford University / IIT Delhi / Anna University"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm text-white transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Interests & Domains */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Select Your Core Interests</h3>
              <p className="text-xs text-slate-400 mt-1">
                Choose the technical domains you enjoy most.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
              {allInterests.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-sm'
                        : 'bg-slate-900/60 border-white/10 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{interest}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm text-white transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Target Role & Companies */}
        {step === 5 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Target Role &amp; Aspirations</h3>
              <p className="text-xs text-slate-400 mt-1">
                Select your primary campus target role. Your entire preparation roadmap will calibrate against it.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Primary Target Role</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value as RoleCategory)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Dream Companies</label>
                <input
                  type="text"
                  value={targetCompanies}
                  onChange={(e) => setTargetCompanies(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Google, Microsoft, Swiggy, Fractal"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Career Goals</label>
                <input
                  type="text"
                  value={careerGoals}
                  onChange={(e) => setCareerGoals(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(6)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm text-white transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Available Time & Build */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Available Daily Preparation Time</h3>
              <p className="text-xs text-slate-400 mt-1">
                We design realistic, bite-sized tasks. Consistency beats weekend burnout.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: '30 Mins', value: 30 },
                { label: '60 Mins', value: 60 },
                { label: '90 Mins', value: 90 },
                { label: '120+ Mins', value: 120 },
              ].map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setDailyMinutes(t.value)}
                  className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                    dailyMinutes === t.value
                      ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-sm'
                      : 'bg-slate-900/60 border-white/10 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* AI Synthesizer State */}
            {isProcessing ? (
              <div className="p-6 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-center space-y-3">
                <div className="w-10 h-10 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin mx-auto" />
                <h4 className="text-sm font-bold text-white">Synthesizing Your Placement Twin...</h4>
                <p className="text-xs text-indigo-300 font-mono animate-pulse">
                  {processingStatus}
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-indigo-400 font-semibold">
                  <Sparkles className="w-4 h-4" /> Ready to initialize Placement Twin
                </div>
                <p>
                  Target Role: <strong className="text-white">{targetRole}</strong> • Daily Commitment: <strong className="text-white">{dailyMinutes} Mins</strong>
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <button
                disabled={isProcessing}
                onClick={() => setStep(5)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                disabled={isProcessing}
                onClick={handleFinishOnboarding}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 font-bold text-sm text-white shadow-xl shadow-indigo-600/30 transition-all disabled:opacity-50"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Launch Placement Dashboard</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
