import { NextFetchEvent, NextRequest, NextResponse, userAgent } from 'next/server';

const exemptions = ['m', 'auth', 'callback', 'nice'];

export function middleware(request: NextRequest, _: NextFetchEvent) {
  const { ua } = userAgent(request);

  // Redirect IE user
  if (/MSIE|Trident/.test(ua)) {
    return NextResponse.rewrite(new URL('/html/ie-not-supported.html', request.url));
  }

  if (ua.indexOf('Mobi') > -1) {
    const segments = request.nextUrl.pathname.split('/');
    const firstSegment = segments[1];

    if (!exemptions.includes(firstSegment)) {
      return NextResponse.redirect(`${request.nextUrl.origin}/m`);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
