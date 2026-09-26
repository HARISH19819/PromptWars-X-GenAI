import { NextRequest, NextResponse } from 'next/server';
import { evaluateInterviewAnswerWithAI } from '@/lib/ai/aiServices';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, answer, mode, targetRole } = body;

    if (!question || !answer || typeof question !== 'string' || typeof answer !== 'string') {
      return NextResponse.json(
        { error: 'Question and answer must be valid non-empty strings' },
        { status: 400 }
      );
    }

    if (answer.length > 20000 || question.length > 2000) {
      return NextResponse.json(
        { error: 'Payload exceeds allowable length limit' },
        { status: 413 }
      );
    }

    const evaluation = await evaluateInterviewAnswerWithAI(
      question,
      answer,
      mode || 'technical',
      targetRole || 'Machine Learning Engineer'
    );

    return NextResponse.json({ success: true, data: evaluation });
  } catch (error) {
    console.error('Error in /api/ai/evaluate-interview:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate interview answer' },
      { status: 500 }
    );
  }
}
