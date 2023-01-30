import { useRouter as useNextRouter } from 'next/router';
import { useCallback } from 'react';

export default function useRouter() {
  const router = useNextRouter();

  /**
   * 현재 열려있는 패널의 바로 좌측에 새로운 패널을 추가한다.
   * 이미 해당 패널이 열려있으면 쿼리파라미터만 업데이트 한다.
   */
  const push = useCallback(
    (pathname: string, queryParams?: NodeJS.Dict<string | number>) => {
      if (router.asPath.includes(pathname)) {
        router.replace({
          pathname: router.pathname,
          query: {
            ...router.query,
            ...queryParams,
          },
        });

        return;
      }

      const segments = router.asPath
        .split('?')[0]
        .split('/')
        .filter((seg) => seg !== '');

      segments.push(pathname);

      for (let i = 1; i < 6; i += 1) {
        delete router.query[`${i}`];
      }

      const query = {
        ...router.query,
        ...queryParams,
      };

      let path = '/';

      segments.map((value, index) => {
        path += `[${index + 1}]/`;
        query[index + 1] = value;
      });

      router.replace({ pathname: path, query });
    },
    [router],
  );

  /**
   * calledDepth 가 없으면 현재 가장 우측에 열려있는 패널을 닫는다
   * calledDepth 가 있으면 호출된 depth 포함 우측에 열린 모든 패널을 닫는다.
   */
  const pop = useCallback(
    (to?: number) => {
      let segments = router.asPath
        .split('?')[0]
        .split('/')
        .filter((seg) => seg !== '');

      if (to) {
        segments = segments.slice(0, to);
      } else {
        segments.pop();
      }

      for (let i = 1; i < 6; i += 1) {
        delete router.query[`${i}`];
      }

      const query = {
        ...router.query,
      };

      let path = '/';

      segments.map((value, index) => {
        path += `[${index + 1}]/`;
        query[index + 1] = value;
      });

      router.replace({ pathname: path, query });
    },
    [router],
  );

  /**
   * 가장 우측에 열린 패널을 새로운 패널로 대채한다.
   * depth 가 설정되어있으면, 해당 depth 우측에 있는 모든 패널을 닫고
   * 해당 depth 의 패널을 새로운 패널로 대체한다.
   */
  const replace = useCallback(
    (pathname: string, to?: number) => {
      let segments = router.asPath
        .split('?')[0]
        .split('/')
        .filter((seg) => seg !== '');

      if (to) {
        segments = segments.slice(0, to);
      }

      segments[segments.length - 1] = pathname;

      for (let i = 1; i < 6; i += 1) {
        delete router.query[`${i}`];
      }

      const query = {
        ...router.query,
      };

      let path = '/';

      segments.map((value, index) => {
        path += `[${index + 1}]/`;
        query[index + 1] = value;
      });

      router.replace({ pathname: path, query });
    },
    [router],
  );

  return {
    push,
    pop,
    replace,
  };
}
