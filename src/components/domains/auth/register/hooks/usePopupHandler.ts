import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import Popup from '../types/Popups';

export default function usePopupHandler() {
  const router = useRouter();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const [popup, setPopup] = useState<Popup>('');
  const [termsPopupType, setTermsPopupType] = useState<'location' | 'service' | 'privacy' | ''>('');

  const handleChangePopup = useCallback((value: Popup) => {
    setPopup(value);
  }, []);

  const handleChangeTermsPopupType = useCallback((value: 'location' | 'service' | 'privacy' | '') => {
    setTermsPopupType(value);
  }, []);

  const handleOpenTermsPopup = useCallback(
    (value: 'service' | 'privacy' | 'location') => {
      handleChangePopup('terms');
      handleChangeTermsPopupType(value);
    },
    [handleChangeTermsPopupType, handleChangePopup],
  );

  const handleConfirmRegisterQuit = useCallback(() => {
    handleChangePopup('');

    router.back();

    handleUpdateReturnUrl('');
  }, [handleChangePopup, router, handleUpdateReturnUrl]);

  const handleClosePopup = useCallback(() => {
    handleChangePopup('');
  }, [handleChangePopup]);

  return {
    popup,
    termsPopupType,
    handleChangePopup,
    handleOpenTermsPopup,
    handleConfirmRegisterQuit,
    handleClosePopup,
  };
}
