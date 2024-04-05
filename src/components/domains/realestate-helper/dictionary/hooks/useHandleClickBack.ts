import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useHandleClickBack() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const handleClickBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (platform === 'pc') {
        router.replace(router?.query?.entry === 'home' ? `/` : `/${Routes.SubHome}`);
      }

      if (platform === 'mobile') {
        router.replace(
          router?.query?.entry === 'home' ? `/${Routes.EntryMobile}` : `/${Routes.EntryMobile}/${Routes.SubHome}`,
        );
      }
    }
  }, [platform, router]);

  return { handleClickBack };
}
