import { useRouter as useNextRouter } from 'next/router';
import { useCallback } from 'react';

type NavigationOptions = {
  queryParams?: NodeJS.Dict<string | number>;
};

export default function useRouter(depth: number) {
  const router = useNextRouter();

  /**
   * 현재 열려있는 패널의 바로 좌측에 새로운 패널을 추가한다.
   * 이미 해당 패널이 열려있으면 쿼리파라미터만 업데이트 한다.
   * 2 depth 에서 (최대 depth) 에서 푸쉬하는 경우
   * 이전 depth 를 밀어내고 새로운 depth 를 추가한다.
   * 2 depth 가 열려 있는 상태에서 1 depth 가 새로운 depth 푸쉬하려고 할때는
   * 기존에 있느 2 depth 를 그 새로운 depth 로 대체한다.
   */
  const push = useCallback(
    (pathname: string, options?: NavigationOptions) => {
      // 이미 해당 패널이 열려있으면 쿼리파라미터만 업데이트
      if (router.asPath.includes(pathname)) {
        router.replace({
          pathname: router.pathname,
          query: {
            ...router.query,
            ...options?.queryParams,
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
        delete router.query[`${i}`];
      }

      const query = {
        ...router.query,
        ...options?.queryParams,
      };

      let path = '/';

      segments.forEach((value, index) => {
        path += `[${index + 1}]/`;
        query[index + 1] = value;
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
        delete router.query[`${i}`];
      }

      const query = {
        ...router.query,
        ...options?.queryParams,
      };

      let path = '/';

      segments.forEach((value, index) => {
        path += `[${index + 1}]/`;
        query[index + 1] = value;
      });

      router.replace({ pathname: path, query });
    },
    [router, depth],
  );

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
        delete router.query[`${i}`];
      }

      const query = {
        ...router.query,
        ...options?.queryParams,
      };

      let path = '/';

      segments.forEach((value, index) => {
        path += `[${index + 1}]/`;
        query[index + 1] = value;
      });

      router.replace({ pathname: path, query });
    },
    [router, depth],
  );

  /**
   * 모든 depth 들을 닫는다.
   */
  const popAll = useCallback(() => {
    for (let i = 1; i < 6; i += 1) {
      delete router.query[`${i}`];
    }

    const query = {
      ...router.query,
    };

    router.replace({ pathname: '/', query });
  }, [router]);

  /**
   * 쿼리파라미터만 업데이트한다.
   */
  const setQueryParams = useCallback(
    (queryParams: NodeJS.Dict<string | number>) => {
      router.replace(
        {
          pathname: '',
          query: {
            ...queryParams,
          },
        },
        undefined,
        {
          shallow: true,
        },
      );
    },
    [router],
  );

  return {
    push,
    pop,
    popAll,
    replace,
    setQueryParams,
    query: router.query,
    asPath: router.asPath,
    pathname: router.pathname,
    isReady: router.isReady,
  };
}
