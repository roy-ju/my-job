import { useCallback } from 'react';

import { useRouter } from 'next/router';

export default function useHandleClickBack({ step, updateStep }: { step: number; updateStep: (v: number) => void }) {
  const router = useRouter();

  const handleClickBack = useCallback(() => {
    if (step === 1) {
      router.back();
    } else if (step === 2) {
      updateStep(1);
    }
  }, [router, step, updateStep]);

  return { handleClickBack };
}
