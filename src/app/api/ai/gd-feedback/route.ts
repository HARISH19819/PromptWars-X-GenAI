import { NextRequest, NextResponse } from 'next/server';
import { evaluateGDTranscriptWithAI } from '@/lib/ai/aiServices';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, transcript } = body;

    if (!topic || !transcript) {
      return NextResponse.json(
        { error: 'Topic and transcript/speech input are required' },
        { status: 400 }
      );
    }

    const feedback = await evaluateGDTranscriptWithAI(topic, transcript);

    return NextResponse.json({ success: true, data: feedback });
  } catch (error) {
    console.error('Error in /api/ai/gd-feedback:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate group discussion contribution' },
      { status: 500 }
    );
  }
}
