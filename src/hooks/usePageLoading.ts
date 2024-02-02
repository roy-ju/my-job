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

    const routeEventError = () => {
      NProgress.done();
    };

    Router.events.on('routeChangeStart', routeEventStart);
    Router.events.on('routeChangeComplete', routeEventEnd);
    Router.events.on('routeChangeError', routeEventError);

    return () => {
      Router.events.off('routeChangeStart', routeEventStart);
      Router.events.off('routeChangeComplete', routeEventEnd);
      Router.events.off('routeChangeError', routeEventError);
    };
  }, []);
}
