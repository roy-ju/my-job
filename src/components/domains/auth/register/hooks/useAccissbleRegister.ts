import { useEffect } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

export default function useAccissbleRegister() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const depth1 = router?.query?.depth1;

  const depth2 = router?.query?.depth2;

  useEffect(() => {
    if (!router.query.email || !router.query.token || !router.query.socialLoginType) {
      if (platform === 'pc') {
        if (depth1 && depth2) {
          const query = router.query;
          router.replace({ pathname: `/${depth1}`, query: { ...query } });
        }
        router.replace('/');
      }

      if (platform === 'mobile') {
        router.replace('/');
      }
    }
  }, [depth1, depth2, platform, router]);
}
