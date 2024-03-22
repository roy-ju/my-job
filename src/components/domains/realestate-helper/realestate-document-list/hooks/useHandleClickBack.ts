import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useHandleClickBack() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickBack = useCallback(() => {
    if (platform === 'pc') {
      router.replace(`/${Routes.SubHome}`);
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}/${Routes.SubHome}`);
    }
  }, [platform, router]);

  return { handleClickBack };
}
