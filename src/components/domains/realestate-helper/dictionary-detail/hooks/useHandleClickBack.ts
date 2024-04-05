import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useHandleClickBack() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const handleClickBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (typeof window !== 'undefined') {
        if (platform === 'pc') {
          const depth1 = router?.query?.depth1 ?? '';
          const depth2 = router?.query?.depth2 ?? '';

          if (depth1 && depth2) {
            if (router?.query?.entry === 'subhome') {
              router.replace(`/${Routes.SubHome}`);
            } else {
              router.replace(`/${Routes.SubHome}/${Routes.Dictionary}`);
            }
          } else if (depth1 && !depth2) {
            if (router?.query?.entry === 'subhome') {
              router.replace(`/${Routes.SubHome}`);
            } else {
              router.replace(`/${Routes.Dictionary}`);
            }
          }
        }

        if (platform === 'mobile') {
          if (router?.query?.entry === 'subhome') {
            router.replace(`/${Routes.EntryMobile}/${Routes.SubHome}`);
          } else {
            router.replace(`/${Routes.EntryMobile}/${Routes.Dictionary}`);
          }
        }
      }
    }
  }, [platform, router]);

  return { handleClickBack };
}
