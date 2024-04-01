import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useHandleClickBack() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const renderBackButtonUi = useMemo(() => {
    if (platform === 'pc') return false;

    return true;
  }, [platform]);

  const handleClickBack = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
  }, [router]);

  return { renderBackButtonUi, handleClickBack };
}
