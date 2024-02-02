import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import getPathIfReplaceCurrent from '@/utils/getPathIfReplaceCurrent';

export default function useEtcCtas() {
  const { platform } = useCheckPlatform();

  const { closeAuthPopup } = useAuthPopup();

  const router = useRouter();

  const depth1 = (router?.query?.depth1 as string) ?? '';

  const depth2 = (router?.query?.depth2 as string) ?? '';

  const handleClickForgotPassword = useCallback(() => {
    if (platform === 'pc') {
      const path = getPathIfReplaceCurrent(depth1, depth2, Routes.FindAccount);
      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      router.push({ pathname: path, query: { ...query } });
    }

    if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.FindAccount}`);
    }

    closeAuthPopup();
  }, [depth1, depth2, platform, router, closeAuthPopup]);

  return { handleClickForgotPassword };
}
