import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import useDanjiFavoriteAdd from '@/components/domains/danji/hooks/useDanjiFavoriteAdd';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useVerifyCiPopup from '@/states/hooks/useVerifyCiPopup';

import useRemoveSessionKey from '@/hooks/useRemoveSessionKey';

import Actions from '@/constants/actions';

type Popups = 'notSuggestAfterVerify' | 'suggestAfterVerify' | '';

export default function useRegisterSuccessCta() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const { returnUrl, handleUpdateReturnUrl } = useReturnUrl();

  const { danjiFavoriteAdd } = useDanjiFavoriteAdd();

  const { removeSessionKey } = useRemoveSessionKey();

  const { openVerifyCiPopup, handleVerifyPhone } = useVerifyCiPopup();

  const [popups, setPopups] = useState<Popups>('');

  const openPopup = useCallback((value: Popups) => {
    setPopups(value);
  }, []);

  const closePopup = useCallback(() => {
    setPopups('');
  }, []);

  const handleGoHome = useCallback(() => {
    if (platform === 'pc') {
      router.replace('/');
      handleUpdateReturnUrl('');
      return;
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}`);
      handleUpdateReturnUrl('');
    }
  }, [handleUpdateReturnUrl, platform, router]);

  const handleOnlyLoginCta = useCallback(async () => {
    if (returnUrl) {
      await danjiFavoriteAdd();

      await router.replace(returnUrl);

      handleUpdateReturnUrl('');
      return;
    }

    handleGoHome();
  }, [returnUrl, handleGoHome, router, danjiFavoriteAdd, handleUpdateReturnUrl]);

  const handleLoginCta = useCallback(async () => {
    if (returnUrl) {
      await router.replace(returnUrl);
      handleUpdateReturnUrl('');
      return;
    }

    handleGoHome();
  }, [returnUrl, handleGoHome, router, handleUpdateReturnUrl]);

  const handleDirectVerifyCta = useCallback(async () => {
    openVerifyCiPopup();
    handleVerifyPhone();
  }, [handleVerifyPhone, openVerifyCiPopup]);

  const handleAfterNeedVerifyCta = useCallback(() => {
    if (returnUrl) {
      if (returnUrl.includes(Routes.SuggestForm) && router?.query?.params) {
        openPopup('suggestAfterVerify');
      } else {
        openPopup('notSuggestAfterVerify');
      }
      return;
    }
    handleGoHome();
  }, [returnUrl, handleGoHome, router?.query?.params, openPopup]);

  useEffect(() => () => removeSessionKey(Actions.Danji_Favorite.key), [removeSessionKey]);

  return {
    popups,
    closePopup,
    handleLoginCta,
    handleOnlyLoginCta,
    handleDirectVerifyCta,
    handleAfterNeedVerifyCta,
    handleGoHome,
  };
}
