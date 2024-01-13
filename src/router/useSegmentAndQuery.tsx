import { useCallback } from 'react';

import { useRouter } from 'next/router';

import Routes from './routes';

type Path = keyof typeof Routes;

export default function useSegmentAndQuery() {
  const router = useRouter();
  /** customRouter Path Segment */

  const segment = useCallback(({ depth1, depth2 }: { depth1?: Path; depth2?: Path }) => {
    if (depth1 && !depth2) {
      return '/[depth1]';
    }

    if (!depth1 && depth2) {
      return '/[depth1]/[depth2]';
    }

    if (depth1 && depth2) {
      return '/[depth1]/[depth2]';
    }

    return '/';
  }, []);

  const query = useCallback(
    ({ depth1, depth2 }: { depth1?: Path; depth2?: Path }) => {
      if (depth1 && !depth2) {
        return { depth1 };
      }

      if (!depth1 && depth2) {
        return { depth: (router?.query?.depth1 as Path) ?? '', depth2 };
      }

      if (depth1 && depth2) {
        return { depth1, depth2 };
      }

      return {};
    },
    [router?.query?.depth1],
  );

  return { segment, query };
}
