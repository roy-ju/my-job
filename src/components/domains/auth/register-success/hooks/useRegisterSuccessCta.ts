import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useVerifyCiPopup from '@/states/hooks/useVerifyCiPopup';

import useDanjiFavoriteAdd from '@/components/domains/danji/hooks/useDanjiFavoriteAdd';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useRemoveSessionKey from '@/hooks/useRemoveSessionKey';

import useCreateSuggestForm from '@/components/domains/suggest/form/hooks/useCreateSuggestForm';

import Routes from '@/router/routes';

import Actions from '@/constants/actions';

type Popups = 'afterVerify' | '';

export default function useRegisterSuccessCta() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const { createSuggest } = useCreateSuggestForm();

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
      if (returnUrl?.includes(Routes.SuggestForm) && router?.query?.params) {
        await createSuggest();
        return;
      }

      await danjiFavoriteAdd();

      await router.replace(returnUrl);

      handleUpdateReturnUrl('');
      return;
    }

    handleGoHome();
  }, [returnUrl, handleGoHome, router, danjiFavoriteAdd, handleUpdateReturnUrl, createSuggest]);

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
      openPopup('afterVerify');
      return;
    }
    handleGoHome();
  }, [returnUrl, handleGoHome, openPopup]);

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
