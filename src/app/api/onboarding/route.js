import { NextResponse } from 'next/server';

// In-memory storage for demo purposes
let onboardingData = {};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  
  if (email && onboardingData[email]) {
    return NextResponse.json(onboardingData[email]);
  }
  
  return NextResponse.json({});
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, step, data } = body;
    
    if (!onboardingData[email]) {
      onboardingData[email] = {};
    }
    
    onboardingData[email][step] = data;
    onboardingData[email].lastUpdated = new Date().toISOString();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save onboarding data' }, { status: 500 });
  }
}