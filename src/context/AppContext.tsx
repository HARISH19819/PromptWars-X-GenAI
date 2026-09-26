'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  RoleCategory,
  AssessmentAttempt,
  InterviewAttempt,
  GDFeedback,
  GDSession,
  ResumeATSAnalysis,
} from '@/types';
import { DEFAULT_STARTER_PROFILE } from '@/lib/demoData';
import {
  getStoredUser,
  setStoredUser,
  getStoredProfile,
  saveStoredProfile,
  AuthUser,
} from '@/lib/storage';
import { calculateReadiness, computeNextBestAction } from '@/lib/recommendationEngine';
import { mockParseResume } from '@/lib/ai/aiServices';
import confetti from 'canvas-confetti';

export interface CustomUserData {
  name: string;
  email: string;
  degree?: string;
  branch?: string;
  graduationYear?: string;
  semester?: string;
  college?: string;
  targetRole?: RoleCategory;
  interests?: string[];
  targetCompanies?: string[];
  availableDailyMinutes?: number;
  careerGoals?: string;
  rawResumeText?: string;
}

interface AppContextType {
  user: AuthUser | null;
  profile: StudentProfile;
  isLoading: boolean;
  loginDemo: () => void;
  loginUser: (name: string, email: string) => void;
  createCustomUserProfile: (data: CustomUserData) => void;
  logout: () => void;
  updateTargetRole: (role: RoleCategory) => void;
  completeLearningModule: (moduleId: string) => void;
  submitAssessmentAttempt: (assessmentId: string, answers: { questionId: string; selectedOption: number; isCorrect: boolean }[], score: number, weakAreas: string[], strongAreas: string[]) => void;
  bookGDSession: (sessionId: string) => void;
  cancelGDBooking: (sessionId: string) => void;
  createGDSession: (session: Partial<GDSession>) => void;
  submitGDFeedback: (feedback: GDFeedback) => void;
  recordInterviewAttempt: (attempt: InterviewAttempt) => void;
  updateResumeAnalysis: (analysis: ResumeATSAnalysis) => void;
  runAITransformation: () => void;
  resetProfileData: () => void;
  resetToDemo: () => void;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_STARTER_PROFILE);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from storage or default to standard student candidate
  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      const storedProfile = getStoredProfile(storedUser.uid);
      if (storedProfile) {
        setProfile(storedProfile);
      } else {
        setProfile(DEFAULT_STARTER_PROFILE);
      }
    } else {
      // Standard starter candidate profile
      const defaultUser: AuthUser = {
        uid: 'user_candidate',
        name: 'Student Candidate',
        email: 'student@campus.edu',
        isDemo: false,
      };
      setUser(defaultUser);
      setStoredUser(defaultUser);
      const existing = getStoredProfile('user_candidate');
      if (existing) {
        setProfile(existing);
      } else {
        saveStoredProfile('user_candidate', DEFAULT_STARTER_PROFILE);
        setProfile(DEFAULT_STARTER_PROFILE);
      }
    }
    setIsLoading(false);
  }, []);

  // Sync profile changes to storage
  const persistProfile = (newProfile: StudentProfile) => {
    // Recalculate readiness
    const readiness = calculateReadiness(newProfile);
    const profileWithReadiness = { ...newProfile, readiness };
    // Recalculate next best action
    const nextBestAction = computeNextBestAction(profileWithReadiness);
    const updated = { ...profileWithReadiness, nextBestAction };

    setProfile(updated);
    if (user) {
      saveStoredProfile(user.uid, updated);
    }
  };

  const loginDemo = () => {
    loginUser('Student Candidate', 'student@campus.edu');
  };

  const loginUser = (name: string, email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const userUid = `user_${cleanEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const cleanName = name.trim() || cleanEmail.split('@')[0] || 'Student Candidate';

    const newUser: AuthUser = {
      uid: userUid,
      name: cleanName,
      email: cleanEmail,
      isDemo: false,
    };
    setUser(newUser);
    setStoredUser(newUser);

    const existingProfile = getStoredProfile(userUid);
    if (existingProfile) {
      setProfile(existingProfile);
    } else {
      const userProfile: StudentProfile = {
        ...DEFAULT_STARTER_PROFILE,
        isDemoUser: false,
        personalInfo: {
          ...DEFAULT_STARTER_PROFILE.personalInfo,
          name: cleanName,
          email: cleanEmail,
        },
        resumeAnalysis: {
          ...DEFAULT_STARTER_PROFILE.resumeAnalysis,
          extractedName: cleanName,
          extractedEmail: cleanEmail,
        },
      };
      persistProfile(userProfile);
    }
  };

  const createCustomUserProfile = (data: CustomUserData) => {
    const cleanEmail = data.email.trim().toLowerCase();
    const userUid = `user_${cleanEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const cleanName = data.name.trim() || 'Student Candidate';

    const newUser: AuthUser = {
      uid: userUid,
      name: cleanName,
      email: cleanEmail,
      isDemo: false,
    };
    setUser(newUser);
    setStoredUser(newUser);

    const role = data.targetRole || 'Software Development Engineer';

    // Parse resume dynamically if provided
    const initialAnalysis = (data.rawResumeText && data.rawResumeText.trim().length > 20)
      ? mockParseResume(data.rawResumeText, role)
      : {
          ...DEFAULT_STARTER_PROFILE.resumeAnalysis,
          extractedName: cleanName,
          extractedEmail: cleanEmail,
          targetRole: role,
        };
    initialAnalysis.extractedName = cleanName;
    initialAnalysis.extractedEmail = cleanEmail;
    initialAnalysis.targetRole = role;

    const customProfile: StudentProfile = {
      ...DEFAULT_STARTER_PROFILE,
      isDemoUser: false,
      personalInfo: {
        name: cleanName,
        email: cleanEmail,
        degree: data.degree || 'B.Tech',
        branch: data.branch || 'Computer Science & Engineering',
        graduationYear: data.graduationYear || '2025',
        semester: data.semester || '7th Semester',
        college: data.college || 'Engineering College',
      },
      targetRole: role,
      interests: data.interests || ['Software Engineering', 'Full Stack', 'Cloud & DevOps'],
      targetCompanies: data.targetCompanies && data.targetCompanies.length > 0
        ? data.targetCompanies
        : ['Google', 'Microsoft', 'Amazon', 'Tier-1 Tech'],
      availableDailyMinutes: data.availableDailyMinutes || 90,
      careerGoals: data.careerGoals || `Crack a top tier fresher campus role in ${role}.`,
      rawResumeText: data.rawResumeText || '',
      resumeAnalysis: initialAnalysis,
    };

    persistProfile(customProfile);
  };

  const logout = () => {
    setUser(null);
    setStoredUser(null);
  };


  const updateTargetRole = (role: RoleCategory) => {
    const updated = {
      ...profile,
      targetRole: role,
    };
    persistProfile(updated);
  };

  const completeLearningModule = (moduleId: string) => {
    const updatedModules = profile.learningModules.map(m =>
      m.id === moduleId ? { ...m, completed: true } : m
    );

    const targetModule = profile.learningModules.find(m => m.id === moduleId);
    let updatedSkills = [...profile.skills];

    if (targetModule && targetModule.relatedSkill) {
      updatedSkills = updatedSkills.map(s => {
        if (s.id === targetModule.relatedSkill) {
          const newScore = Math.min(100, s.score + 18);
          return {
            ...s,
            score: newScore,
            level: newScore >= 75 ? 'Strong' : newScore >= 60 ? 'Good' : 'Needs Practice',
            subskills: s.subskills.map((sub, idx) =>
              idx <= 1 ? { ...sub, status: 'mastered' } : sub
            ),
          };
        }
        return s;
      });
    }

    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }

    persistProfile({
      ...profile,
      learningModules: updatedModules,
      skills: updatedSkills,
    });
  };

  const submitAssessmentAttempt = (
    assessmentId: string,
    answers: { questionId: string; selectedOption: number; isCorrect: boolean }[],
    score: number,
    weakAreas: string[],
    strongAreas: string[]
  ) => {
    const attempt: AssessmentAttempt = {
      id: `attempt_${Date.now()}`,
      assessmentId,
      title: profile.assessments.find(a => a.id === assessmentId)?.title || 'Skill Assessment',
      category: profile.assessments.find(a => a.id === assessmentId)?.category || 'Technical',
      date: 'Just now',
      score,
      totalQuestions: answers.length,
      correctAnswersCount: answers.filter(a => a.isCorrect).length,
      weakAreas,
      strongAreas,
      answers,
    };

    const updatedAssessments = profile.assessments.map(a => {
      if (a.id === assessmentId) {
        return {
          ...a,
          attemptsCount: a.attemptsCount + 1,
          highestScore: Math.max(a.highestScore || 0, score),
        };
      }
      return a;
    });

    // Update skill score based on assessment
    let updatedSkills = [...profile.skills];
    if (assessmentId.includes('sql')) {
      updatedSkills = updatedSkills.map(s => {
        if (s.name.toLowerCase().includes('sql')) {
          const newScore = Math.round((s.score + score) / 2);
          return {
            ...s,
            score: newScore,
            level: newScore >= 70 ? 'Strong' : newScore >= 55 ? 'Good' : 'Needs Practice',
            lastAssessed: 'Just now',
          };
        }
        return s;
      });
    }

    if (score >= 70) {
      try {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }

    persistProfile({
      ...profile,
      assessments: updatedAssessments,
      assessmentHistory: [attempt, ...profile.assessmentHistory],
      skills: updatedSkills,
    });
  };

  const bookGDSession = (sessionId: string) => {
    const updatedSessions = profile.gdSessions.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          isBookedByMe: true,
          currentParticipants: s.currentParticipants + 1,
        };
      }
      return s;
    });

    try {
      confetti({ particleCount: 40, spread: 50 });
    } catch {
      // ignore
    }

    persistProfile({
      ...profile,
      gdSessions: updatedSessions,
    });
  };

  const cancelGDBooking = (sessionId: string) => {
    const updatedSessions = profile.gdSessions.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          isBookedByMe: false,
          currentParticipants: Math.max(0, s.currentParticipants - 1),
        };
      }
      return s;
    });

    persistProfile({
      ...profile,
      gdSessions: updatedSessions,
    });
  };

  const createGDSession = (newSessionData: Partial<GDSession>) => {
    const sessionId = `gd_user_${Date.now()}`;
    const generatedMeetLink = newSessionData.meetLink?.trim() || `https://meet.jit.si/Placement360_Live_Room_${sessionId}`;
    const newSession: GDSession = {
      id: sessionId,
      topic: newSessionData.topic || 'Engineering Architecture & AI Campus Discussion',
      category: newSessionData.category || 'AI & Tech',
      context: newSessionData.context || 'Peer-led live group discussion session.',
      rules: newSessionData.rules && newSessionData.rules.length > 0
        ? newSessionData.rules
        : ['Maintain professional decorum', 'Turn-taking & PREP structure'],
      date: newSessionData.date || 'Today, Immediate Live Slot',
      time: newSessionData.time || 'Live Now',
      durationMinutes: newSessionData.durationMinutes || 30,
      maxParticipants: newSessionData.maxParticipants || 8,
      currentParticipants: 1,
      isBookedByMe: true,
      meetLink: generatedMeetLink,
      isRealMeeting: true,
      meetingType: generatedMeetLink.includes('meet.google.com') ? 'google-meet' : 'jitsi-live',
      createdBy: user?.name || 'Peer Aspirant',
      status: 'upcoming',
    };

    persistProfile({
      ...profile,
      gdSessions: [newSession, ...profile.gdSessions],
    });

    try {
      confetti({ particleCount: 60, spread: 60 });
    } catch {
      // ignore
    }
  };

  const submitGDFeedback = (feedback: GDFeedback) => {
    persistProfile({
      ...profile,
      gdHistory: [feedback, ...profile.gdHistory],
      readiness: {
        ...profile.readiness,
        gd: Math.round((profile.readiness.gd + feedback.overallScore) / 2),
      },
    });
  };

  const recordInterviewAttempt = (attempt: InterviewAttempt) => {
    persistProfile({
      ...profile,
      interviewAttempts: [attempt, ...profile.interviewAttempts],
      readiness: {
        ...profile.readiness,
        interview: Math.round((profile.readiness.interview + attempt.overallScore) / 2),
      },
    });
  };

  const updateResumeAnalysis = (analysis: ResumeATSAnalysis) => {
    persistProfile({
      ...profile,
      resumeAnalysis: analysis,
    });
  };

  /**
   * Hackathon "WOW Transformation" feature:
   * Demonstrates the closed-loop intelligence to judges in 1 click!
   */
  const runAITransformation = () => {
    // 1. Mark SQL module as completed
    const updatedModules = profile.learningModules.map(m =>
      m.id === 'module-sql-joins' ? { ...m, completed: true } : m
    );

    // 2. Elevate SQL skill from 43% to 76%
    const updatedSkills = profile.skills.map(s => {
      if (s.name.toLowerCase().includes('sql')) {
        return {
          ...s,
          score: 76,
          level: 'Strong' as const,
          lastAssessed: 'Today (Post-Learning)',
          subskills: [
            { id: 'sql-1', name: 'SELECT, WHERE, ORDER BY', status: 'mastered' as const },
            { id: 'sql-2', name: 'INNER, LEFT, FULL OUTER JOIN', status: 'mastered' as const },
            { id: 'sql-3', name: 'Subqueries & CTEs', status: 'practicing' as const },
            { id: 'sql-4', name: 'Window Functions', status: 'practicing' as const },
          ],
        };
      }
      return s;
    });

    // 3. Mark GD session as booked
    const updatedGDSessions = profile.gdSessions.map(s =>
      s.id === 'gd-session-1' ? { ...s, isBookedByMe: true, currentParticipants: 6 } : s
    );

    // 4. Record new high assessment attempt (80%)
    const newAttempt: AssessmentAttempt = {
      id: `attempt_transformed_${Date.now()}`,
      assessmentId: 'assessment-sql-diagnostic',
      title: 'SQL Relational Diagnostic Test',
      category: 'SQL & Database',
      date: 'Just now (Retake)',
      score: 80,
      totalQuestions: 5,
      correctAnswersCount: 4,
      weakAreas: ['Window Functions'],
      strongAreas: ['SQL JOIN conditions', 'Self-Join syntax', 'WHERE vs HAVING'],
      answers: [
        { questionId: 'q-sql-1', selectedOption: 1, isCorrect: true },
        { questionId: 'q-sql-2', selectedOption: 1, isCorrect: true },
        { questionId: 'q-sql-3', selectedOption: 0, isCorrect: true },
        { questionId: 'q-sql-4', selectedOption: 0, isCorrect: false },
        { questionId: 'q-sql-5', selectedOption: 1, isCorrect: true },
      ],
    };

    // 5. Add new achievement
    const newAchievement = {
      id: `ach_${Date.now()}`,
      title: 'SQL Bottleneck Closed',
      description: 'Mastered SQL JOINs and elevated diagnostic score from 43% to 80%.',
      date: 'Today',
      icon: 'zap',
    };

    // 6. Recalibrate readiness to 74%
    const newProfile: StudentProfile = {
      ...profile,
      learningModules: updatedModules,
      skills: updatedSkills,
      gdSessions: updatedGDSessions,
      assessmentHistory: [newAttempt, ...profile.assessmentHistory],
      achievements: [newAchievement, ...profile.achievements],
      weeklyProgressHistory: [
        ...profile.weeklyProgressHistory,
        { week: 'Post-Prep', readiness: 74, sqlScore: 76, gdScore: 65, interviewScore: 68 },
      ],
      readiness: {
        overall: 74,
        skills: 81,
        assessment: 72,
        interview: 64,
        gd: 62,
        communication: 68,
        resume: 82,
        roleAlignment: 86,
      },
    };

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch {
      // ignore
    }

    persistProfile(newProfile);
  };

  const resetProfileData = () => {
    if (user) {
      const resetProfile: StudentProfile = {
        ...DEFAULT_STARTER_PROFILE,
        isDemoUser: false,
        personalInfo: {
          ...DEFAULT_STARTER_PROFILE.personalInfo,
          name: user.name,
          email: user.email,
        },
        resumeAnalysis: {
          ...DEFAULT_STARTER_PROFILE.resumeAnalysis,
          extractedName: user.name,
          extractedEmail: user.email,
        },
      };
      persistProfile(resetProfile);
    } else {
      setProfile(DEFAULT_STARTER_PROFILE);
    }
  };

  const resetToDemo = resetProfileData;

  return (
    <AppContext.Provider
      value={{
        user,
        profile,
        isLoading,
        loginDemo,
        loginUser,
        createCustomUserProfile,
        logout,
        updateTargetRole,
        completeLearningModule,
        submitAssessmentAttempt,
        bookGDSession,
        cancelGDBooking,
        createGDSession,
        submitGDFeedback,
        recordInterviewAttempt,
        updateResumeAnalysis,
        runAITransformation,
        resetProfileData,
        resetToDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
