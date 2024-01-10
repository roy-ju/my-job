import { NextFetchEvent, NextRequest, NextResponse, userAgent } from 'next/server';

import { detectRobot } from './utils/regex';

import Routes from './router/routes';

const exemptions = ['m', 'auth', 'callback', 'nice'];

export function middleware(request: NextRequest, _: NextFetchEvent) {
  const host = request.headers.get('host');
  const path = request.nextUrl.pathname;

  if (host === 'negocio.co.kr') {
    return NextResponse.redirect(
      `${request.nextUrl.protocol}//www.negocio.co.kr${request.nextUrl.pathname}${request.nextUrl.search}`,
      301,
    );
  }

  if (path === '/recommendationGuide') {
    return NextResponse.redirect(new URL(`${Routes.SuggestGuide}`, request.url), 301);
  }

  if (
    path === '/suggestRegionalForm' ||
    path === '/suggestRegionalSummary' ||
    path === '/danjiRecommendation' ||
    path === '/danjiRecommendationSummary'
  ) {
    return NextResponse.redirect(new URL(`${Routes.SuggestForm}`, request.url), 301);
  }

  const { ua } = userAgent(request);

  if (detectRobot(ua)) {
    return;
  }

  if (/MSIE|Trident/.test(ua)) {
    // Redirect IE user
    return NextResponse.rewrite(new URL('/html/ie-not-supported.html', request.url));
  }

  // Redirect Mobile user

  if (ua.indexOf('Mobi') > -1) {
    const segments = request.nextUrl.pathname.split('/');

    const firstSegment = segments[1];

    if (!exemptions.includes(firstSegment)) {
      const lastSegment = segments[segments.length - 1];

      if (lastSegment) {
        return NextResponse.redirect(`${request.nextUrl.origin}/m/${lastSegment}${request.nextUrl.search}`);
      }

      return NextResponse.redirect(`${request.nextUrl.origin}/m`);
    }
  } else {
    const segments = request.nextUrl.pathname.split('/');

    const firstSegment = segments[1];

    if (firstSegment === 'm') {
      const lastSegment = segments[segments.length - 1];

      if (lastSegment !== 'm') {
        return NextResponse.redirect(`${request.nextUrl.origin}/${lastSegment}${request.nextUrl.search}`);
      }

      return NextResponse.redirect(`${request.nextUrl.origin}`);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
