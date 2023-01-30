import { useRouter as useNextRouter } from 'next/router';
import { useCallback } from 'react';

export default function useRouter() {
  const router = useNextRouter();

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

  const pop = useCallback(
    (calledDepth?: number) => {
      let segments = router.asPath
        .split('?')[0]
        .split('/')
        .filter((seg) => seg !== '');

      if (calledDepth) {
        segments = segments.slice(0, calledDepth - 1);
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

  const navigate = useCallback<typeof router.replace>(
    (...params) => router.replace(...params),
    [router],
  );

  return {
    push,
    pop,
    navigate,
  };
}
