import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    // Mock authentication - accept any email
    const token = Math.random().toString(36).substring(2);
    
    return NextResponse.json({ 
      success: true, 
      token,
      user: { email }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}