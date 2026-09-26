import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_STARTER_PROFILE } from '@/lib/demoData';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const source = searchParams.get('source') || 'all';

    let jobs = DEFAULT_STARTER_PROFILE.jobMatches;

    if (query) {
      const qLower = query.toLowerCase();
      jobs = jobs.filter(
        j =>
          j.title.toLowerCase().includes(qLower) ||
          j.company.toLowerCase().includes(qLower) ||
          j.strongMatches.some(s => s.toLowerCase().includes(qLower))
      );
    }

    if (source !== 'all') {
      jobs = jobs.filter(j => j.source.toLowerCase() === source.toLowerCase());
    }

    return NextResponse.json({
      success: true,
      total: jobs.length,
      data: jobs,
      meta: {
        module: 'ZyncRole AI Job Intelligence',
        aggregatedSources: ['LinkedIn', 'Internshala', 'Indeed', 'Naukri'],
      },
    });
  } catch (error) {
    console.error('Error in /api/jobs/search:', error);
    return NextResponse.json(
      { error: 'Failed to search job listings' },
      { status: 500 }
    );
  }
}
