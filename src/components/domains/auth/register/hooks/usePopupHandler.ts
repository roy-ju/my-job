import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

type Popup = 'quit' | 'terms' | '';

export default function usePopupHandler() {
  const router = useRouter();

  const [popup, setPopup] = useState<Popup>('');

  const [termsPopupType, setTermsPopupType] = useState<'location' | 'service' | 'privacy' | ''>('');

  const { returnUrl, handleUpdateReturnUrl } = useReturnUrl();

  const { platform } = useCheckPlatform();

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

      return;
    }

    if (platform === 'pc') {
      router.replace('/');
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}`);
    }

    handleUpdateReturnUrl('');
  }, [handlePopup, platform, returnUrl, router, handleUpdateReturnUrl]);

  const handleCancel = useCallback(() => {
    handlePopup('');
  }, [handlePopup]);

  return { popup, termsPopupType, handleChangeTermsPopup, handlePopup, handleConfirmRegisterQuit, handleCancel };
}
