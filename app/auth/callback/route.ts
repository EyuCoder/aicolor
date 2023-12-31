import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  console.log('code', code);
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  console.log('redirecting to /app');
  return NextResponse.redirect(new URL('/app', req.url));
}
