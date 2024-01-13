import { useCallback } from 'react';

import { useRouter } from 'next/router';

export default function useBackButtonHandler() {
  const router = useRouter();

  const back = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  }, [router]);

  return { back };
}
