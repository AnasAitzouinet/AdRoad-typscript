import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/types/supabase'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const pathname = req.nextUrl.pathname;

  const supabase = createMiddlewareClient<Database>({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (pathname == "/auth/account" && !session) {
    const url = new URL(req.url);
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }
  if (pathname == "/auth" && session) {
    const url = new URL(req.url);
    url.pathname = "/auth/account";
    return NextResponse.redirect(url);
  }
  return res
}