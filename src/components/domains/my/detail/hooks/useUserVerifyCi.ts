import { useCallback, useEffect, useState } from 'react';

import useVerifyCiPopup from '@/states/hooks/useVerifyCiPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

export default function useUserVerifyCi() {
  /** this handleUpdateReturnUrl Call flag */
  const [handleUpdateVerifyCalled, setHandleUpdateVerifyCalled] = useState(false);

  const { openVerifyCiPopup, handleVerifyPhone } = useVerifyCiPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const handleUpdateVerify = useCallback(() => {
    handleUpdateReturnUrl();
    setHandleUpdateVerifyCalled(true);
  }, [handleUpdateReturnUrl]);

  useEffect(() => {
    if (handleUpdateVerifyCalled) {
      openVerifyCiPopup();
      handleVerifyPhone();
      setHandleUpdateVerifyCalled(false);
    }
  }, [handleUpdateVerifyCalled, openVerifyCiPopup, handleVerifyPhone]);

  useEffect(
    () => () => {
      setHandleUpdateVerifyCalled(false);
    },
    [],
  );

  return { handleUpdateVerify };
}
