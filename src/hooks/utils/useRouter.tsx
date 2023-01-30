import { useRouter as useNextRouter } from 'next/router';
import { useCallback } from 'react';

export default function useRouter() {
  const router = useNextRouter();

  const navigate = useCallback<typeof router.replace>(
    (...params) => router.replace(...params),
    [router],
  );

  const hasPathname = useCallback(
    (pathname: string): boolean => router.asPath.includes(pathname),
    [router],
  );

  return {
    ...router,
    navigate,
    hasPathname,
  };
}
