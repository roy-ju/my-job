/* eslint-disable no-prototype-builtins */
import { useRouter as useNextRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

function removeTrailingSlash(url: string) {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

type NavigationOptions = {
  persistParams?: boolean;
  // url 뒤에 붙는 query e.g. ?name=joel
  searchParams?: Record<string, string>;
  // url 에 보이지 않는 query
  state?: Record<string, string>;
  hash?: Record<string, string>;
};

export default function useRouter(depth = 0) {
  const router = useNextRouter();

  /**
   * 현재 depth 기준으로 호출된 depth 포함 오른쪽에 열려있는 모든 depth 들을 닫는다.
   */
  const pop = useCallback(
    (options?: NavigationOptions, isPushHistoryStack = true) => {
      if (isPushHistoryStack) {
        window.history.pushState({}, '', router.asPath);
      }
      let segments = router.asPath
        .split('?')[0]
        .split('/')
        .filter((seg) => seg !== '');

      segments = segments.slice(0, depth - 1);

      for (let i = 1; i < 6; i += 1) {
        delete router.query[`depth${i}`];
      }
      delete router.query.redirect;

      const query = {
        ...router.query,
        ...options?.searchParams,
      };

      let path = '/';

      segments.forEach((value, index) => {
        path += `[depth${index + 1}]/`;
        query[`depth${index + 1}`] = value;
      });

      return router.replace({ pathname: path, query });
    },
    [router, depth],
  );

  /**
   * 가장 오른쪽에 열려 있는 depth 를 닫는다.
   */

  const popLast = useCallback(
    (isPushHistoryStack = true) => {
      if (isPushHistoryStack) {
        window.history.pushState({}, '', router.asPath);
      }
      const segments = router.asPath
        .split('?')[0]
        .split('/')
        .filter((seg) => seg !== '');

      segments.pop();

      for (let i = 1; i < 6; i += 1) {
        delete router.query[`depth${i}`];
      }

      delete router.query.params;
      delete router.query.redirect;

      const query: Record<string, string> = {
        ...(router.query as Record<string, string>),
        // ...options?.searchParams,
      };

      let path = '/';

      segments.forEach((value, index) => {
        path += `[depth${index + 1}]/`;
        query[`depth${index + 1}`] = value;
      });

      return router.replace({ pathname: path, query });
    },
    [router],
  );

  /**
   * 오른쪽에 열려있는 모든 depth 를 유지한체 현재의 depth 를 새로운 depth 로 대체한다.
   */
  const replaceCurrent = useCallback(
    (pathname: string, options?: NavigationOptions, isPushHistoryStack = true) => {
      if (isPushHistoryStack) {
        window.history.pushState({}, '', router.asPath);
      }
      const segments = router.asPath
        .split('?')[0]
        .split('/')
        .filter((seg) => seg !== '');
      const currentSegmentIndex = depth - 1;

      if (currentSegmentIndex > -1) {
        segments[currentSegmentIndex] = pathname;

        for (let i = 1; i < 6; i += 1) {
          delete router.query[`depth${i}`];
        }
        delete router.query.redirect;

        let query: Record<string, any> = {};

        if (options?.persistParams) {
          options.searchParams = {
            ...(router.query as Record<string, string>),
            ...options.searchParams,
          };
        }

        query = {
          ...query,
          ...options?.state,
          ...options?.searchParams,
        };

        let path = '/';
        let asPath = '/';

        segments.forEach((value, index) => {
          path += `[depth${index + 1}]/`;
          asPath += `${value}/`;
          query[`depth${index + 1}`] = value;
        });

        asPath = removeTrailingSlash(asPath);

        if (options?.searchParams) {
          const searchParams = new URLSearchParams(options.searchParams);
          asPath += `?${searchParams}`;
        }

        return router.replace({ pathname: path, query }, asPath);
      }
    },
    [depth, router],
  );

  /**
   * 오른쪽에 열려있는 모든 depth 들을 닫고 현재의 depth 를 새로운 depth 로 대체한다.
   */
  const replace = useCallback(
    (pathname: string, options?: NavigationOptions, shllow = false, isPushHistoryStack = true) => {
      if (isPushHistoryStack) {
        window.history.pushState({}, '', router.asPath);
      }

      let segments = router.asPath
        .split('?')[0]
        .split('/')
        .filter((seg) => seg !== '');

      segments = segments.slice(0, depth);
      if (segments.length === 0) {
        segments.push(pathname);
      } else {
        segments[segments.length - 1] = pathname;
      }

      if (segments.length === 2 && segments[0] === segments[1]) {
        segments.pop();
      }

      for (let i = 1; i < 6; i += 1) {
        delete router.query[`depth${i}`];
      }
      delete router.query.redirect;

      let query: Record<string, any> = {};

      if (options?.persistParams) {
        options.searchParams = {
          ...(router.query as Record<string, string>),
          ...options.searchParams,
        };
      }

      query = {
        ...query,
        ...options?.state,
        ...options?.searchParams,
      };

      let path = '/';
      let asPath = '/';

      segments.forEach((value, index) => {
        path += `[depth${index + 1}]/`;
        asPath += `${value}/`;
        query[`depth${index + 1}`] = value;
      });

      asPath = removeTrailingSlash(asPath);

      if (options?.searchParams) {
        const searchParams = new URLSearchParams(options.searchParams);
        asPath += `?${searchParams}`;
      }

      return router.replace({ pathname: path, query }, asPath, { shallow: shllow });
    },
    [router, depth],
  );

  /**
   * 모든 depth 들을 닫는다.
   */
  const popAll = useCallback(
    (isPushHistroyStack = false) => {
      window.history.pushState({}, '', router.asPath);
      if (router.pathname === '/') {
        return new Promise<boolean>((resolve) => {
          resolve(false);
        });
      }

      for (let i = 1; i < 6; i += 1) {
        delete router.query[`depth${i}`];
      }

      // const query = { ...router.query };

      if (isPushHistroyStack) {
        return router.push({ pathname: '/', query: {} });
      }

      return router.replace({ pathname: '/', query: {} });
    },
    [router],
  );

  /**
   * 현재 열려있는 패널의 바로 좌측에 새로운 패널을 추가한다.
   * 이미 해당 패널이 열려있으면 쿼리파라미터만 업데이트 한다.
   * 2 depth 에서 (최대 depth) 에서 푸쉬하는 경우
   * 이전 depth 를 밀어내고 새로운 depth 를 추가한다.
   * 2 depth 가 열려 있는 상태에서 1 depth 가 새로운 depth 푸쉬하려고 할때는
   * 기존에 있는 2 depth 를 그 새로운 depth 로 대체한다.
   */
  const push = useCallback(
    (pathname: string, options?: NavigationOptions, isPushHistoryStack = true) => {
      if (isPushHistoryStack) {
        window.history.pushState({}, '', router.asPath);
      }

      const segments = router.asPath
        .split('?')[0]
        .split('/')
        .filter((seg) => seg !== '');

      // // 이미 열려있는 pathname 인지 확인해본다.
      // const segmentIndex = segments.findIndex((seg) => seg === pathname);
      // if (segmentIndex !== -1) {
      //   return replace(pathname, options);
      // }

      // 현재의 룰
      if (segments.length > 1) {
        if (segments.length === depth) {
          segments[0] = segments[1];
          segments[1] = pathname;
        } else {
          segments[1] = pathname;
        }
        segments[1] = pathname;
      } else {
        segments.push(pathname);
      }

      for (let i = 1; i < 6; i += 1) {
        delete router.query[`depth${i}`];
      }

      delete router.query.redirect;

      let query: Record<string, any> = {};

      if (options?.persistParams) {
        options.searchParams = {
          ...(router.query as Record<string, string>),
          ...options.searchParams,
        };
      }

      query = {
        ...query,
        ...options?.state,
        ...options?.searchParams,
      };

      let path = '/';
      let asPath = '/';

      segments.forEach((value, index) => {
        path += `[depth${index + 1}]/`;
        asPath += `${value}/`;
        query[`depth${index + 1}`] = value;
      });

      asPath = removeTrailingSlash(asPath);

      if (options?.searchParams) {
        const searchParams = new URLSearchParams(options.searchParams);
        asPath += `?${searchParams}`;
      }

      return router.replace({ pathname: path, query }, asPath);
    },
    [router, depth],
  );

  return useMemo(
    () => ({
      depth: router.query.depth2 ? 2 : router.query.depth1 ? 1 : 0,
      push,
      pop,
      popLast,
      popAll,
      replace,
      replaceCurrent,
      query: router.query,
      asPath: router.asPath,
      pathname: router.pathname,
      isReady: router.isReady,
    }),
    [push, replaceCurrent, pop, popAll, popLast, replace, router.query, router.asPath, router.pathname, router.isReady],
  );
}
