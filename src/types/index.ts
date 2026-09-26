export type RoleCategory = 
  | 'Machine Learning Engineer'
  | 'Full Stack Developer'
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Data Scientist'
  | 'Data Analyst'
  | 'Cloud / DevOps Engineer'
  | 'Cybersecurity Analyst'
  | 'Software Development Engineer';

export type SkillLevel = 'Strong' | 'Good' | 'Needs Practice' | 'Missing';

export interface SubSkill {
  id: string;
  name: string;
  status: 'mastered' | 'practicing' | 'weak' | 'missing';
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Technical' | 'Soft Skills' | 'Framework' | 'Database' | 'Core CS';
  level: SkillLevel;
  score: number; // 0 - 100
  subskills: SubSkill[];
  lastAssessed?: string;
  marketDemand?: 'High' | 'Very High' | 'Medium';
}

export interface NextBestAction {
  id: string;
  title: string;
  category: 'learning' | 'assessment' | 'interview' | 'gd' | 'resume' | 'job';
  description: string;
  why: string;
  timeEstimate: string; // e.g. "15 minutes"
  priority: 'Critical' | 'High' | 'Medium';
  actionUrl: string;
  actionText: string;
}

export interface LearningResource {
  title: string;
  type: 'video' | 'documentation' | 'interactive' | 'cheatsheet';
  url: string;
  provider: string; // e.g. "YouTube", "Official Docs", "FreeCodeCamp", "PostgreSQL Docs"
  duration: string;
}

export interface LearningModule {
  id: string;
  title: string;
  topic: string;
  category: string;
  description: string;
  whyNeeded: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  prerequisites: string[];
  resources: LearningResource[];
  keyTakeaways: string[];
  completed: boolean;
  scoreBoostEstimate: number; // e.g. +4% to SQL
  relatedSkill: string;
}

export interface AssessmentQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Diagnostic';
  codeSnippet?: string;
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  title: string;
  category: string;
  date: string;
  score: number; // percentage
  totalQuestions: number;
  correctAnswersCount: number;
  weakAreas: string[];
  strongAreas: string[];
  recommendedLearningId?: string;
  answers: {
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
  }[];
}

export interface Assessment {
  id: string;
  title: string;
  category: string;
  roleTarget: RoleCategory;
  description: string;
  estimatedMinutes: number;
  questionsCount: number;
  difficulty: 'Adaptive' | 'Standard';
  questions: AssessmentQuestion[];
  highestScore?: number;
  attemptsCount: number;
}

export interface GDSession {
  id: string;
  topic: string;
  category: 'AI & Tech' | 'Current Affairs' | 'Business & Economy' | 'Ethics & Society';
  context: string;
  rules: string[];
  date: string;
  time: string;
  durationMinutes: number;
  maxParticipants: number;
  currentParticipants: number;
  isBookedByMe: boolean;
  meetLink: string;
  isRealMeeting: boolean;
  meetingType?: 'google-meet' | 'jitsi-live' | 'zoom' | 'in-app';
  createdBy?: string;
  status: 'upcoming' | 'live' | 'completed';
}

export interface GDFeedback {
  sessionId: string;
  sessionTopic: string;
  date: string;
  overallScore: number;
  participation: number; // 0-100
  relevance: number;
  clarity: number;
  structure: number;
  strengths: string[];
  recommendedImprovements: string[];
}

export interface InterviewQuestion {
  id: string;
  text: string;
  category: 'Technical' | 'HR' | 'Behavioral' | 'Project Defense' | 'Architecture';
  hints?: string;
  sampleKeyPoints: string[];
}

export interface InterviewEvaluation {
  technicalAccuracy: number; // 0-100
  relevance: number;
  structure: number;
  clarity: number;
  overallScore: number;
  feedbackSummary: string;
  fillerWordsDetected: string[];
  improvementPoints: string[];
  followUpQuestion?: string;
}

export interface InterviewAttempt {
  id: string;
  mode: 'technical' | 'hr' | 'behavioral' | 'project-defense' | 'role-based';
  targetRole: string;
  date: string;
  overallScore: number;
  questionsCount: number;
  dialogue: {
    question: string;
    studentAnswer: string;
    evaluation: InterviewEvaluation;
  }[];
}

export interface ResumeATSAnalysis {
  targetRole: RoleCategory;
  overallScore: number; // 0-100
  keywordMatch: number;
  skillMatch: number;
  projectMatch: number;
  roleAlignment: number;
  extractedName: string;
  extractedEmail: string;
  extractedSkills: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  criticalGaps: string[];
  actionableRecommendations: string[];
  freeBuilderUrl: string;
}

export interface JobMatchItem {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Fresher Role';
  source: 'LinkedIn' | 'Internshala' | 'Indeed' | 'Naukri' | 'Unstop' | 'Wellfound' | 'Google Careers' | 'Amazon Jobs' | 'Company Career Board';
  matchScore: number; // 0-100
  strongMatches: string[];
  missingSkills: string[];
  experienceRequired: string;
  salaryOrStipend: string;
  postedDate: string;
  whyMatchesExplanation: string;
  originalJobUrl: string;
  marketUrgency: 'High' | 'Trending' | 'Normal';
}

export interface PlacementReadinessBreakdown {
  overall: number; // 0-100
  skills: number;
  assessment: number;
  interview: number;
  gd: number;
  communication: number;
  resume: number;
  roleAlignment: number;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
}

export interface StudentProfile {
  personalInfo: {
    name: string;
    email: string;
    degree: string;
    branch: string;
    graduationYear: string;
    semester: string;
    college: string;
  };
  interests: string[];
  targetRole: RoleCategory;
  secondaryRoles: RoleCategory[];
  targetCompanies: string[];
  availableDailyMinutes: number; // e.g. 90
  careerGoals: string;
  rawResumeText?: string;
  
  readiness: PlacementReadinessBreakdown;
  skills: SkillItem[];
  nextBestAction: NextBestAction;
  
  learningModules: LearningModule[];
  assessments: Assessment[];
  assessmentHistory: AssessmentAttempt[];
  
  gdSessions: GDSession[];
  gdHistory: GDFeedback[];
  
  interviewAttempts: InterviewAttempt[];
  resumeAnalysis: ResumeATSAnalysis;
  jobMatches: JobMatchItem[];
  achievements: AchievementItem[];
  
  weeklyProgressHistory: {
    week: string;
    readiness: number;
    sqlScore: number;
    gdScore: number;
    interviewScore: number;
  }[];
  isDemoUser?: boolean;
}
