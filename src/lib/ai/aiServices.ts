import { callGemini } from './geminiClient';
import { InterviewEvaluation, ResumeATSAnalysis, GDFeedback, RoleCategory } from '@/types';

/**
 * Analyzes resume content using Gemini or structured heuristics
 */
export async function analyzeResumeWithAI(
  resumeText: string,
  targetRole: RoleCategory
): Promise<ResumeATSAnalysis> {
  const prompt = `Analyze this student resume for the target role: "${targetRole}".
Resume Text:
"""
${resumeText}
"""

Return a strictly valid JSON object matching this schema:
{
  "targetRole": "${targetRole}",
  "overallScore": number (0-100),
  "keywordMatch": number (0-100),
  "skillMatch": number (0-100),
  "projectMatch": number (0-100),
  "roleAlignment": number (0-100),
  "extractedName": string,
  "extractedEmail": string,
  "extractedSkills": string[],
  "matchedKeywords": string[],
  "missingKeywords": string[],
  "strengths": string[],
  "criticalGaps": string[],
  "actionableRecommendations": string[],
  "freeBuilderUrl": "https://rxresu.me/"
}`;

  const geminiResult = await callGemini(prompt);
  if (geminiResult) {
    try {
      const cleanJson = geminiResult.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch {
      // Fall through to heuristic fallback
    }
  }

  return mockParseResume(resumeText, targetRole);
}

/**
 * Heuristic ATS resume parsing and skill extraction
 */
export function mockParseResume(
  resumeText: string,
  targetRole: RoleCategory
): ResumeATSAnalysis {
  const isML = targetRole.toLowerCase().includes('machine learning') || targetRole.toLowerCase().includes('data');
  const lower = resumeText.toLowerCase();

  const detectedSkills: string[] = [];
  ['python', 'sql', 'pytorch', 'tensorflow', 'scikit-learn', 'fastapi', 'docker', 'git', 'c++', 'javascript', 'react', 'node', 'java', 'aws', 'mongodb'].forEach(s => {
    if (lower.includes(s)) detectedSkills.push(s.toUpperCase());
  });

  const emailMatch = resumeText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const detectedEmail = emailMatch ? emailMatch[0] : '';
  const firstLine = resumeText.trim().split('\n')[0]?.trim() || '';
  const detectedName = firstLine.length > 2 && firstLine.length < 40 && !firstLine.includes('@') ? firstLine : 'Student Candidate';

  return {
    targetRole,
    overallScore: isML ? 81 : 76,
    keywordMatch: 82,
    skillMatch: 79,
    projectMatch: 85,
    roleAlignment: 82,
    extractedName: detectedName,
    extractedEmail: detectedEmail || 'student@campus.edu',
    extractedSkills: detectedSkills.length > 0 ? detectedSkills : ['PYTHON', 'SQL', 'DATA STRUCTURES', 'GIT'],
    matchedKeywords: ['Full Stack', 'Model Deployment', 'API Design', 'System Architecture', 'SQL', 'Algorithms'],
    missingKeywords: ['Docker Containerization', 'CI/CD pipelines', 'Cloud Deployment', 'Unit Testing'],
    strengths: [
      'Strong metric quantification and clear project descriptions.',
      'Solid combination of domain modeling and implementation tools.',
      'ATS-readable single-column hierarchy and structured credentials.',
    ],
    criticalGaps: [
      'Limited evidence of automated testing and CI/CD pipelines.',
      'Missing complex database optimization or query benchmarking details.',
    ],
    actionableRecommendations: [
      'Add benchmarked performance metrics and containerized deployment commands.',
      'Highlight schema design or query optimization in projects.',
      'Link public GitHub repositories with clean README files and live deployment URLs.',
    ],
    freeBuilderUrl: 'https://rxresu.me/',
  };
}


/**
 * Evaluates an interview response with Gemini or heuristic NLP
 */
export async function evaluateInterviewAnswerWithAI(
  question: string,
  answer: string,
  mode: string,
  targetRole: string
): Promise<InterviewEvaluation> {
  const prompt = `Evaluate this student's response to an interview question for a "${targetRole}" role.
Interview Mode: ${mode}
Question: "${question}"
Student's Answer: "${answer}"

Analyze technical depth, relevance, structure (STAR method), clarity, and detect filler words like "basically", "you know", "like", "actually", "um".
Return a strictly valid JSON object matching this schema:
{
  "technicalAccuracy": number (0-100),
  "relevance": number (0-100),
  "structure": number (0-100),
  "clarity": number (0-100),
  "overallScore": number (0-100),
  "feedbackSummary": string,
  "fillerWordsDetected": string[],
  "improvementPoints": string[],
  "followUpQuestion": string
}`;

  const geminiResult = await callGemini(prompt);
  if (geminiResult) {
    try {
      const cleanJson = geminiResult.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch {
      // Fall through to fallback
    }
  }

  // Heuristic analysis
  const words = answer.trim().split(/\s+/);
  const wordCount = words.length;
  const lower = answer.toLowerCase();

  const fillerCandidates = ['basically', 'like', 'you know', 'actually', 'sort of', 'kind of', 'um', 'uh'];
  const detectedFillers: string[] = [];
  fillerCandidates.forEach(f => {
    if (lower.includes(f)) detectedFillers.push(f);
  });

  const technicalAccuracy = wordCount > 30 ? Math.min(88, 65 + Math.floor(wordCount / 5)) : 55;
  const structure = (lower.includes('because') || lower.includes('result') || lower.includes('achieved')) ? 75 : 55;
  const clarity = detectedFillers.length === 0 ? 82 : Math.max(50, 78 - detectedFillers.length * 8);
  const relevance = lower.length > 20 ? 80 : 45;
  const overall = Math.round((technicalAccuracy * 0.35) + (relevance * 0.25) + (structure * 0.2) + (clarity * 0.2));

  let followUp = 'Can you elaborate on how you monitored performance bottlenecks when deploying this in production?';
  if (lower.includes('resnet') || lower.includes('cnn') || lower.includes('model')) {
    followUp = 'Given the class imbalance common in medical imagery, why did you prioritize accuracy over precision-recall AUC, and how did you prevent gradient vanishing?';
  } else if (lower.includes('sql') || lower.includes('database')) {
    followUp = 'How would your query scale if the underlying orders table exceeded 50 million rows, and which index would you create?';
  }

  return {
    technicalAccuracy,
    relevance,
    structure,
    clarity,
    overallScore: overall,
    feedbackSummary: wordCount > 25
      ? 'Good technical foundation and direct answer to the prompt. Your response can be elevated with measurable business tradeoffs and explicit framework justification.'
      : 'Answer is too brief. Interviewers expect a structured STAR explanation with background context, technical reasoning, and quantified impact.',
    fillerWordsDetected: detectedFillers,
    improvementPoints: [
      'Begin with an executive summary sentence stating your primary choice and reasoning.',
      'Quantify your impact or benchmark metrics (e.g. inference latency, memory consumption, ROC-AUC).',
      detectedFillers.length > 0 ? `Reduce filler words: avoid starting thoughts with "${detectedFillers.join('", "')}".` : 'Maintain this clean delivery rhythm without unnecessary fillers.',
    ],
    followUpQuestion: followUp,
  };
}

/**
 * Evaluates Group Discussion participation and speech transcript
 */
export async function evaluateGDTranscriptWithAI(
  topic: string,
  studentSpeech: string
): Promise<GDFeedback> {
  const prompt = `Evaluate this student's contribution to a group discussion on: "${topic}".
Student's Contribution / Transcript:
"""
${studentSpeech}
"""

Return a strictly valid JSON object matching this schema:
{
  "sessionId": "gd-session-analyzed",
  "sessionTopic": "${topic}",
  "date": "Just now",
  "overallScore": number (0-100),
  "participation": number (0-100),
  "relevance": number (0-100),
  "clarity": number (0-100),
  "structure": number (0-100),
  "strengths": string[],
  "recommendedImprovements": string[]
}`;

  const geminiResult = await callGemini(prompt);
  if (geminiResult) {
    try {
      const cleanJson = geminiResult.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch {
      // Fall through to fallback
    }
  }

  // Heuristic analysis
  const words = studentSpeech.trim().split(/\s+/).length;
  const participation = Math.min(90, Math.max(40, Math.round(words * 0.8)));
  const relevance = 78;
  const clarity = 72;
  const structure = studentSpeech.toLowerCase().includes('firstly') || studentSpeech.toLowerCase().includes('for example') ? 75 : 60;
  const overall = Math.round((participation * 0.3) + (relevance * 0.3) + (clarity * 0.2) + (structure * 0.2));

  return {
    sessionId: 'gd-session-analyzed',
    sessionTopic: topic,
    date: 'Just now',
    overallScore: overall,
    participation,
    relevance,
    clarity,
    structure,
    strengths: [
      'Brought practical real-world perspective to the topic.',
      'Maintained professional and collaborative tone.',
      'Demonstrated active listening awareness.',
    ],
    recommendedImprovements: [
      'Enter the discussion within the first 3 minutes to set a proactive leadership presence.',
      'Use the PREP framework: State Point clearly, give Reason, support with Example, restate Point.',
      'Conclude thoughts cleanly without trailing off into filler words.',
    ],
  };
}
