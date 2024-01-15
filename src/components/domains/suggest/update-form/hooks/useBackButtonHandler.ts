import { useCallback } from 'react';

import { useRouter } from 'next/router';

export default function useBackButtonHandler() {
  const router = useRouter();

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  return { handleClickBack };
}
