import { useRouter as useNextRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

type NavigationOptions = {
  // url 뒤에 붙는 query e.g. ?name=joel
  searchParams?: Record<string, string | number>;
  // url 에 보이지 않는 query
  state?: Record<string, unknown>;
};

export default function useRouter(depth: number) {
  const router = useNextRouter();

  /**
   * 현재 열려있는 패널의 바로 좌측에 새로운 패널을 추가한다.
   * 이미 해당 패널이 열려있으면 쿼리파라미터만 업데이트 한다.
   * 2 depth 에서 (최대 depth) 에서 푸쉬하는 경우
   * 이전 depth 를 밀어내고 새로운 depth 를 추가한다.
   * 2 depth 가 열려 있는 상태에서 1 depth 가 새로운 depth 푸쉬하려고 할때는
   * 기존에 있는 2 depth 를 그 새로운 depth 로 대체한다.
   */
  const push = useCallback(
    (pathname: string, options?: NavigationOptions) => {
      // 이미 해당 패널이 열려있으면 쿼리파라미터만 업데이트

      if (router.asPath.split('/').filter((item) => item === pathname).length > 0) {
        router.replace({
          pathname: router.pathname,
          query: {
            ...router.query,
            ...options?.searchParams,
          },
        });

        return;
      }

      const segments = router.asPath
        .split('?')[0]
        .split('/')
        .filter((seg) => seg !== '');

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

      const query = {
        // ...router.query,
        ...options?.searchParams,
      };

      let path = '/';

      segments.forEach((value, index) => {
        path += `[depth${index + 1}]/`;
        query[`depth${index + 1}`] = value;
      });

      router.replace({ pathname: path, query });
    },
    [router, depth],
  );

  /**
   * 현재 depth 기준으로 호출된 depth 포함 오른쪽에 열려있는 모든 depth 들을 닫는다.
   */
  const pop = useCallback(
    (options?: NavigationOptions) => {
      let segments = router.asPath
        .split('?')[0]
        .split('/')
        .filter((seg) => seg !== '');

      segments = segments.slice(0, depth - 1);

      for (let i = 1; i < 6; i += 1) {
        delete router.query[`depth${i}`];
      }

      const query = {
        // ...router.query,
        ...options?.searchParams,
      };

      let path = '/';

      segments.forEach((value, index) => {
        path += `[depth${index + 1}]/`;
        query[`depth${index + 1}`] = value;
      });

      router.replace({ pathname: path, query });
    },
    [router, depth],
  );

  /**
   * 가장 오른쪽에 열려 있는 depth 를 닫는다.
   */
  const popLast = useCallback(() => {
    const segments = router.asPath
      .split('?')[0]
      .split('/')
      .filter((seg) => seg !== '');

    segments.pop();

    for (let i = 1; i < 6; i += 1) {
      delete router.query[`depth${i}`];
    }

    const query: Record<string, string> = {
      // ...router.query,
      // ...options?.searchParams,
    };

    let path = '/';

    segments.forEach((value, index) => {
      path += `[depth${index + 1}]/`;
      query[`depth${index + 1}`] = value;
    });

    router.replace({ pathname: path, query });
  }, [router]);

  /**
   * 오른쪽에 열려있는 모든 depth 들을 닫고 현재의 depth 를 새로운 depth 로 대체한다.
   */
  const replace = useCallback(
    (pathname: string, options?: NavigationOptions) => {
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

      for (let i = 1; i < 6; i += 1) {
        delete router.query[`depth${i}`];
      }

      const query = {
        // ...router.query,
        ...options?.searchParams,
      };

      let path = '/';
      let asPath = '/';

      segments.forEach((value, index) => {
        path += `[depth${index + 1}]/`;
        asPath += `${value}/`;
        query[`depth${index + 1}`] = value;
      });

      const param = { pathname: path, query };
      console.log({ pathname: path, query });
      console.log(window.history.state);
      console.log(asPath);
      router.replace(param);
    },
    [router, depth],
  );

  /**
   * 모든 depth 들을 닫는다.
   */
  const popAll = useCallback(() => {
    if (router.pathname === '/') {
      return;
    }

    for (let i = 1; i < 6; i += 1) {
      delete router.query[`depth${i}`];
    }

    // const query = { ...router.query };

    router.replace({ pathname: '/', query: {} });
  }, [router]);

  return useMemo(
    () => ({
      depth: router.query.depth2 ? 2 : router.query.depth1 ? 1 : 0,
      push,
      pop,
      popLast,
      popAll,
      replace,
      query: router.query,
      asPath: router.asPath,
      pathname: router.pathname,
      isReady: router.isReady,
    }),
    [push, pop, popAll, popLast, replace, router.query, router.asPath, router.pathname, router.isReady],
  );
}
