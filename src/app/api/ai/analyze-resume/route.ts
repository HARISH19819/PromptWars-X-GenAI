import { NextRequest, NextResponse } from 'next/server';
import { analyzeResumeWithAI } from '@/lib/ai/aiServices';
import { RoleCategory } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeText, targetRole } = body;

    if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid or empty resume text provided' },
        { status: 400 }
      );
    }

    if (resumeText.length > 50000) {
      return NextResponse.json(
        { error: 'Resume payload exceeds maximum allowable length of 50,000 characters' },
        { status: 413 }
      );
    }

    const role: RoleCategory = targetRole || 'Machine Learning Engineer';
    const analysis = await analyzeResumeWithAI(resumeText, role);

    return NextResponse.json({ success: true, data: analysis });
  } catch (error) {
    console.error('Error in /api/ai/analyze-resume:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}
