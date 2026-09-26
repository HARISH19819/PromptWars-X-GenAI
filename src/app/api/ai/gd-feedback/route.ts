import { NextRequest, NextResponse } from 'next/server';
import { evaluateGDTranscriptWithAI } from '@/lib/ai/aiServices';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, transcript } = body;

    if (!topic || !transcript || typeof topic !== 'string' || typeof transcript !== 'string') {
      return NextResponse.json(
        { error: 'Topic and transcript/speech input must be valid non-empty strings' },
        { status: 400 }
      );
    }

    if (transcript.length > 20000 || topic.length > 2000) {
      return NextResponse.json(
        { error: 'Payload exceeds allowable length limit' },
        { status: 413 }
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
