import type { StudentProfile, NextBestAction, PlacementReadinessBreakdown } from '../types/index.ts';

/**
 * Calculates student readiness score using configurable hackathon weights:
 * Skills (25%) + Assessment (15%) + Interview (15%) + GD (10%) + Communication (10%) + Resume (10%) + Role Alignment (15%)
 */
export function calculateReadiness(profile: StudentProfile): PlacementReadinessBreakdown {
  const avgSkillScore = profile.skills.length > 0
    ? Math.round(profile.skills.reduce((acc, s) => acc + s.score, 0) / profile.skills.length)
    : 50;

  const assessmentScore = profile.assessmentHistory.length > 0
    ? Math.round(profile.assessmentHistory.reduce((acc, a) => acc + a.score, 0) / profile.assessmentHistory.length)
    : profile.readiness.assessment;

  const interviewScore = profile.interviewAttempts.length > 0
    ? Math.round(profile.interviewAttempts.reduce((acc, i) => acc + i.overallScore, 0) / profile.interviewAttempts.length)
    : profile.readiness.interview;

  const gdScore = profile.gdHistory.length > 0
    ? Math.round(profile.gdHistory.reduce((acc, g) => acc + g.overallScore, 0) / profile.gdHistory.length)
    : profile.readiness.gd;

  const communicationScore = profile.readiness.communication;
  const resumeScore = profile.resumeAnalysis ? profile.resumeAnalysis.overallScore : 70;
  const roleAlignment = profile.resumeAnalysis ? profile.resumeAnalysis.roleAlignment : 75;

  const overall = Math.round(
    avgSkillScore * 0.25 +
    assessmentScore * 0.15 +
    interviewScore * 0.15 +
    gdScore * 0.10 +
    communicationScore * 0.10 +
    resumeScore * 0.10 +
    roleAlignment * 0.15
  );

  return {
    overall: Math.min(100, Math.max(10, overall)),
    skills: avgSkillScore,
    assessment: assessmentScore,
    interview: interviewScore,
    gd: gdScore,
    communication: communicationScore,
    resume: resumeScore,
    roleAlignment,
  };
}

/**
 * Computes the Next Best Action dynamically based on current student weaknesses,
 * recent assessment failures, and job market demand.
 */
export function computeNextBestAction(profile: StudentProfile): NextBestAction {
  // Find weakest skill
  const sortedSkills = [...profile.skills].sort((a, b) => a.score - b.score);
  const weakestSkill = sortedSkills[0];

  // 1. If SQL is weak and below 50, priority is SQL practice
  const sqlSkill = profile.skills.find(s => s.name.toLowerCase().includes('sql'));
  if (sqlSkill && sqlSkill.score < 55) {
    return {
      id: 'nba-sql-joins',
      title: 'SQL JOIN Masterclass & Practice',
      category: 'learning',
      description: 'Close your single biggest technical gap before campus technical screen rounds.',
      why: `Your recent assessment score in SQL is ${sqlSkill.score}%. Target ${profile.targetRole} campus hiring requires at least 70% in multi-table queries.`,
      timeEstimate: '15 minutes',
      priority: 'High',
      actionUrl: '/learning/module-sql-joins',
      actionText: 'Start 15-Min Focused Practice',
    };
  }

  // 2. If student has unattempted assessment on weak skill, recommend assessment
  const sqlAssessment = profile.assessments.find(a => a.id === 'assessment-sql-diagnostic');
  if (sqlSkill && sqlSkill.score >= 55 && sqlAssessment && (sqlAssessment.highestScore || 0) < 70) {
    return {
      id: 'nba-sql-retest',
      title: 'Adaptive SQL Assessment Retake',
      category: 'assessment',
      description: 'Verify your improved query knowledge and update your placement profile.',
      why: 'You have reviewed JOIN concepts. Retesting now validates your improvement and triggers job matching recalibration.',
      timeEstimate: '10 minutes',
      priority: 'High',
      actionUrl: '/assessment/assessment-sql-diagnostic',
      actionText: 'Take 10-Min Assessment',
    };
  }

  // 3. If GD score is below 55 and not booked yet, recommend booking GD session
  const hasBookedGD = profile.gdSessions.some(s => s.isBookedByMe);
  if (profile.readiness.gd < 55 && !hasBookedGD) {
    return {
      id: 'nba-gd-booking',
      title: 'Join Saturday Live GD Practice',
      category: 'gd',
      description: 'Practice the PREP structure and active listening with fellow aspirants.',
      why: 'Your GD indicator score is 48%. Campus recruitment filtering tests entry confidence and turn-taking early in the discussion.',
      timeEstimate: '30 minutes',
      priority: 'High',
      actionUrl: '/gd',
      actionText: 'Book Free GD Session',
    };
  }

  // 4. If interview readiness is lagging or project defense needs polish
  if (profile.readiness.interview < 65) {
    return {
      id: 'nba-interview-project',
      title: 'Simulate AI Project Defense Interview',
      category: 'interview',
      description: 'Face tough follow-up technical scrutiny on your MediScan AI project.',
      why: 'Interviewers will probe your ResNet-50 metric tradeoffs, false negative impact, and deployment architecture.',
      timeEstimate: '15 minutes',
      priority: 'High',
      actionUrl: '/interview/project-defense',
      actionText: 'Start Project Defense',
    };
  }

  // 5. If missing Docker containerization
  const dockerSkill = profile.skills.find(s => s.name.toLowerCase().includes('docker'));
  if (dockerSkill && dockerSkill.score < 50) {
    return {
      id: 'nba-docker-module',
      title: 'Docker Fundamentals for ML Engineers',
      category: 'learning',
      description: 'Package PyTorch APIs into production containers.',
      why: '88% of your matched LinkedIn and Naukri jobs list Docker containerization as an essential requirement.',
      timeEstimate: '20 minutes',
      priority: 'Medium',
      actionUrl: '/learning/module-docker-basics',
      actionText: 'Learn Docker Containers',
    };
  }

  // 6. Default default next best action
  return {
    id: `nba-skill-${weakestSkill?.id || 'general'}`,
    title: `Sharpen ${weakestSkill ? weakestSkill.name : 'Core Skills'}`,
    category: 'learning',
    description: 'Keep your placement readiness momentum advancing toward Tier-1 eligibility.',
    why: 'Continuous micro-practice builds compound confidence across technical and soft skill screens.',
    timeEstimate: '20 minutes',
    priority: 'Medium',
    actionUrl: '/learning',
    actionText: 'Explore Learning Modules',
  };
}
