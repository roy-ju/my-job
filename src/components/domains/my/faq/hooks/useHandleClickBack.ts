import { useCallback } from 'react';

import { useRouter } from 'next/router';

export default function useHandleClickBack() {
  const router = useRouter();

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    handleClickBack,
  };
}
