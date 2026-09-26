import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || '';

let genAI: GoogleGenerativeAI | null = null;
if (apiKey && apiKey.length > 10) {
  genAI = new GoogleGenerativeAI(apiKey);
}

export function isGeminiAvailable(): boolean {
  return Boolean(genAI);
}

/**
 * Runs a prompt against Gemini Flash with automatic fallback to structured fallback responses.
 */
export async function callGemini(prompt: string, systemInstruction?: string): Promise<string | null> {
  if (!genAI) {
    return null;
  }
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemInstruction || 'You are Placement360 AI, an elite placement mentor and technical evaluator. Always output valid JSON without markdown wrapping when requested.',
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text;
  } catch (error) {
    console.warn('Gemini API call failed or rate limited, falling back to local heuristic engine:', error);
    return null;
  }
}
