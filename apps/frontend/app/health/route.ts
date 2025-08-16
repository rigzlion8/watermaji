import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      status: 'OK',
      service: 'Watermaji Frontend',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    },
    { status: 200 }
  );
}
