import { useEffect } from 'react';

import Router from 'next/router';

import NProgress from 'nprogress';

export default function usePageLoading() {
  useEffect(() => {
    const routeEventStart = () => {
      NProgress.start();
    };
    const routeEventEnd = () => {
      NProgress.done();
    };

    Router.events.on('routeChangeStart', routeEventStart);
    Router.events.on('routeChangeComplete', routeEventEnd);
    Router.events.on('routeChangeError', routeEventEnd);
    return () => {
      Router.events.off('routeChangeStart', routeEventStart);
      Router.events.off('routeChangeComplete', routeEventEnd);
      Router.events.off('routeChangeError', routeEventEnd);
    };
  }, []);
}
