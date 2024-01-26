import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useVerifyCiPopup from '@/states/hooks/useVerifyCiPopup';

export default function useVerifyCiCtas() {
  const router = useRouter();

  const { openVerifyCiPopup, handleVerifyPhone } = useVerifyCiPopup();

  const handleClickCancel = useCallback(() => router.back(), [router]);

  const handleClickVerify = useCallback(() => {
    openVerifyCiPopup();
    handleVerifyPhone();
  }, [openVerifyCiPopup, handleVerifyPhone]);

  return { handleClickVerify, handleClickCancel };
}
