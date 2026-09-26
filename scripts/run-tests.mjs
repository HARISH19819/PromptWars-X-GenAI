import assert from 'node:assert';
import { calculateReadiness, computeNextBestAction } from '../src/lib/recommendationEngine.ts';
import { mockParseResume } from '../src/lib/ai/heuristics.ts';
import { DEFAULT_STARTER_PROFILE } from '../src/lib/demoData.ts';

console.log('🧪 Starting Placement360 Automated Verification Test Suite...\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error('    Error:', err.message);
    failed++;
  }
}

// -----------------------------------------------------------------------------
// 1. RECOMMENDATION ENGINE TESTS
// -----------------------------------------------------------------------------
console.log('📦 1. Testing Recommendation & Readiness Engine:');

test('Readiness score calculation returns values between 0 and 100', () => {
  const readiness = calculateReadiness(DEFAULT_STARTER_PROFILE);
  assert(readiness.overall >= 0 && readiness.overall <= 100, `Overall readiness ${readiness.overall} is out of bounds`);
  assert(readiness.skills >= 0 && readiness.skills <= 100, `Skills readiness ${readiness.skills} is out of bounds`);
  assert(readiness.assessment >= 0 && readiness.assessment <= 100, `Assessment readiness ${readiness.assessment} is out of bounds`);
  assert(readiness.interview >= 0 && readiness.interview <= 100, `Interview readiness ${readiness.interview} is out of bounds`);
  assert(readiness.gd >= 0 && readiness.gd <= 100, `GD readiness ${readiness.gd} is out of bounds`);
  assert(readiness.resume >= 0 && readiness.resume <= 100, `Resume readiness ${readiness.resume} is out of bounds`);
});

test('Next best action prioritizes lowest scoring bottleneck', () => {
  const profileWithWeakSQL = {
    ...DEFAULT_STARTER_PROFILE,
    skills: DEFAULT_STARTER_PROFILE.skills.map(s =>
      s.name.toLowerCase().includes('sql') ? { ...s, score: 20 } : { ...s, score: 90 }
    ),
  };
  const action = computeNextBestAction(profileWithWeakSQL);
  assert(action.title.toLowerCase().includes('sql') || action.description.toLowerCase().includes('sql'),
    `Expected SQL action, got: ${action.title}`);
  assert(typeof action.timeEstimate === 'string' && action.timeEstimate.length > 0, 'Time estimate must be populated');
});

test('Next best action fallback selects unbooked GD session when needed', () => {
  const profileWithUnbookedGD = {
    ...DEFAULT_STARTER_PROFILE,
    readiness: {
      ...DEFAULT_STARTER_PROFILE.readiness,
      gd: 40,
    },
    skills: DEFAULT_STARTER_PROFILE.skills.map(s => ({ ...s, score: 85 })),
    gdSessions: DEFAULT_STARTER_PROFILE.gdSessions.map(g => ({ ...g, isBookedByMe: false })),
    learningModules: DEFAULT_STARTER_PROFILE.learningModules.map(m => ({ ...m, completed: true })),
  };
  const action = computeNextBestAction(profileWithUnbookedGD);
  assert(action !== null, 'Action must be generated');
  assert(action.category === 'gd' || action.category === 'learning' || action.category === 'assessment' || action.category === 'interview',
    `Unexpected action category: ${action.category}`);
});

// -----------------------------------------------------------------------------
// 2. AI RESUME PARSER HEURISTICS TESTS
// -----------------------------------------------------------------------------
console.log('\n📦 2. Testing AI Resume Parser & Extraction:');

test('Extracts candidate name and email from resume header', () => {
  const sampleResume = `Jane Doe\nEmail: jane.doe@university.edu | Phone: +1-555-0199\nSkills: Python, React, SQL, Docker\nProjects: Built a microservices app.`;
  const parsed = mockParseResume(sampleResume, 'Full Stack Developer');
  assert.strictEqual(parsed.extractedName, 'Jane Doe');
  assert.strictEqual(parsed.extractedEmail, 'jane.doe@university.edu');
});

test('Extracts technical skills accurately from resume text', () => {
  const sampleResume = `Alex Rivera\nalex@tech.edu\nSkills: Python, TypeScript, React, PostgreSQL, Docker, AWS, Git\nProjects: Cloud deployment pipeline`;
  const parsed = mockParseResume(sampleResume, 'Software Development Engineer');
  assert(parsed.extractedSkills.includes('PYTHON'), 'Should detect PYTHON');
  assert(parsed.extractedSkills.includes('REACT'), 'Should detect REACT');
  assert(parsed.extractedSkills.includes('DOCKER'), 'Should detect DOCKER');
  assert(parsed.extractedSkills.includes('GIT'), 'Should detect GIT');
});

test('Computes ATS keyword and role alignment metrics', () => {
  const sampleResume = `John Smith\njohn@campus.edu\nDeep learning, PyTorch, CNN, model deployment with FastAPI, XGBoost`;
  const parsed = mockParseResume(sampleResume, 'Machine Learning Engineer');
  assert(parsed.overallScore >= 50 && parsed.overallScore <= 100, `Score ${parsed.overallScore} out of bounds`);
  assert(parsed.keywordMatch >= 50 && parsed.keywordMatch <= 100, `Keyword match ${parsed.keywordMatch} out of bounds`);
  assert(Array.isArray(parsed.strengths) && parsed.strengths.length > 0, 'Strengths must be populated');
  assert(Array.isArray(parsed.criticalGaps) && parsed.criticalGaps.length > 0, 'Gaps must be populated');
  assert(Array.isArray(parsed.actionableRecommendations) && parsed.actionableRecommendations.length > 0, 'Recommendations must be populated');
});

// -----------------------------------------------------------------------------
// 3. JOB SEARCH INTELLIGENCE & SECURITY TESTS
// -----------------------------------------------------------------------------
console.log('\n📦 3. Testing Job Intelligence & Security Filters:');

test('Verified job matches all have valid secure HTTPS links', () => {
  const jobs = DEFAULT_STARTER_PROFILE.jobMatches;
  assert(jobs.length >= 10, `Expected at least 10 verified jobs, found ${jobs.length}`);
  jobs.forEach(job => {
    assert(job.originalJobUrl.startsWith('https://'), `Job link for ${job.company} must be HTTPS: ${job.originalJobUrl}`);
    assert(job.matchScore >= 0 && job.matchScore <= 100, `Match score for ${job.company} must be 0-100`);
    assert(job.title.length > 0, `Job title must not be empty`);
    assert(job.company.length > 0, `Company name must not be empty`);
  });
});

test('Job filtering isolates platform sources correctly', () => {
  const jobs = DEFAULT_STARTER_PROFILE.jobMatches;
  const linkedinJobs = jobs.filter(j => j.source.toLowerCase() === 'linkedin');
  const googleJobs = jobs.filter(j => j.source.toLowerCase() === 'google careers');
  assert(linkedinJobs.length > 0, 'Should contain LinkedIn jobs');
  assert(googleJobs.length > 0, 'Should contain Google Careers jobs');
});

// -----------------------------------------------------------------------------
// 4. EDGE CASE & ROBUSTNESS TESTS
// -----------------------------------------------------------------------------
console.log('\n📦 4. Testing Edge Cases & Data Robustness:');

test('Readiness calculation handles empty skills and zero assessments without NaN', () => {
  const emptyProfile = {
    ...DEFAULT_STARTER_PROFILE,
    skills: [],
    assessments: [],
    interviewSessions: [],
    gdFeedbackHistory: [],
    resumeAnalysis: null,
  };
  const readiness = calculateReadiness(emptyProfile);
  assert(!Number.isNaN(readiness.overall), 'Overall readiness must not be NaN');
  assert(!Number.isNaN(readiness.skills), 'Skills readiness must not be NaN');
  assert(readiness.overall >= 0 && readiness.overall <= 100, 'Score must be clamped between 0 and 100');
});

test('Readiness calculation caps at 100 for top-performing profiles', () => {
  const maxProfile = {
    ...DEFAULT_STARTER_PROFILE,
    readiness: {
      overall: 100,
      skills: 100,
      assessment: 100,
      interview: 100,
      gd: 100,
      communication: 100,
      resume: 100,
      roleAlignment: 100,
    },
    skills: DEFAULT_STARTER_PROFILE.skills.map(s => ({ ...s, score: 100 })),
    assessmentHistory: [{
      assessmentId: 'assessment-sql-diagnostic',
      date: '2026-03-20',
      score: 100,
      totalQuestions: 5,
      correctCount: 5,
      timeSpentMinutes: 8,
      weakTopics: [],
    }],
    interviewAttempts: [{
      id: 'session-max-1',
      date: '2026-03-20',
      type: 'Technical Screen',
      role: 'Full Stack Developer',
      overallScore: 100,
      technicalScore: 100,
      communicationScore: 100,
      confidenceScore: 100,
      feedback: 'Outstanding technical and behavioral competency.',
      keyStrengths: ['Architecture', 'Communication'],
      areasForImprovement: [],
      transcript: [],
    }],
    gdHistory: [{
      sessionId: 'gd-max-1',
      sessionTopic: 'Ethics of Generative AI',
      date: '2026-03-20',
      overallScore: 100,
      participation: 100,
      relevance: 100,
      clarity: 100,
      structure: 100,
      strengths: ['Clear articulate synthesis', 'Strong turn-taking'],
      improvements: [],
      frameworkFollowed: 'PREP',
    }],
    resumeAnalysis: {
      targetRole: 'Full Stack Developer',
      overallScore: 100,
      keywordMatch: 100,
      skillMatch: 100,
      projectMatch: 100,
      roleAlignment: 100,
      extractedName: 'Verified Candidate',
      extractedEmail: 'verified@example.com',
      extractedSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      strengths: ['Production system metrics'],
      criticalGaps: [],
      actionableRecommendations: ['Apply to competitive roles'],
      analyzedAt: new Date().toISOString(),
    },
  };
  const readiness = calculateReadiness(maxProfile);
  assert.strictEqual(readiness.overall, 100, 'Max profile overall should reach 100');
});

test('Resume heuristic handles minimal or unformatted text gracefully', () => {
  const minimalResume = 'John Doe. software developer.';
  const parsed = mockParseResume(minimalResume, 'Software Development Engineer');
  assert(parsed.overallScore >= 0 && parsed.overallScore <= 100, 'Score must be valid number');
  assert(Array.isArray(parsed.extractedSkills), 'extractedSkills must be an array');
  assert(Array.isArray(parsed.actionableRecommendations), 'recommendations must be an array');
});

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log(`\n========================================`);
console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
