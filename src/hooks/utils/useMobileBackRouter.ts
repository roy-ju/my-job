import { useCallback } from 'react';

import { useRouter } from 'next/router';

export default function useMobileBackRouter() {
  const router = useRouter();

  const mobilebackHandler = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  }, [router]);

  return { mobilebackHandler };
}
