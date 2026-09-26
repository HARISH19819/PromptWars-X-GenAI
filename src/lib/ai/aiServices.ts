import { callGemini } from './geminiClient';
import { mockParseResume, mockEvaluateInterview, mockGDFeedback } from './heuristics';
import type { InterviewEvaluation, ResumeATSAnalysis, GDFeedback, RoleCategory } from '../../types';

export { mockParseResume, mockEvaluateInterview, mockGDFeedback };

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

  return mockEvaluateInterview(answer);
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

  return mockGDFeedback(topic, studentSpeech);
}
