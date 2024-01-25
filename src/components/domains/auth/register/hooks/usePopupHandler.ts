import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

type Popup = 'quit' | 'terms' | '';

export default function usePopupHandler() {
  const router = useRouter();

  const [popup, setPopup] = useState<Popup>('');

  const [termsPopupType, setTermsPopupType] = useState<'location' | 'service' | 'privacy' | ''>('');

  const { resetAuthPopup } = useAuthPopup();

  const { returnUrl } = useReturnUrl();

  const handlePopup = useCallback((value: Popup) => {
    setPopup(value);
  }, []);

  const handleChangeTermsPopup = useCallback((value: 'location' | 'service' | 'privacy' | '') => {
    setTermsPopupType(value);
  }, []);

  const handleConfirmRegisterQuit = useCallback(async () => {
    handlePopup('');

    if (returnUrl) {
      await router.replace(returnUrl);
      resetAuthPopup();
    }
  }, [handlePopup, resetAuthPopup, returnUrl, router]);

  const handleCancel = useCallback(() => {
    handlePopup('');
  }, [handlePopup]);

  return { popup, termsPopupType, handleChangeTermsPopup, handlePopup, handleConfirmRegisterQuit, handleCancel };
}
