import { NextFetchEvent, NextRequest, NextResponse, userAgent } from 'next/server';

export function middleware(request: NextRequest, _: NextFetchEvent) {
  const { ua } = userAgent(request);

  // Redirect IE user
  if (/MSIE|Trident/.test(ua)) {
    return NextResponse.rewrite(new URL('/html/ie-not-supported.html', request.url));
  }

  // TODO:
  // If user-agent is mobile redirect them to /m/... page.
  // Otherwise, there will be no redirection.

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
