import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

type UseUserLogoutAndDeregister = {
  logout: () => Promise<void>;
};

export default function useUserLogoutAndDeregister({ logout }: UseUserLogoutAndDeregister) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickLogout = useCallback(async () => {
    if (platform === 'pc') {
      const depth1 = router.query.depth1;

      const query = router.query;

      delete query.depth1;
      delete query.depth2;

      await router.replace({ pathname: `/${depth1}`, query });

      logout();
    }

    if (platform === 'mobile') {
      await router.replace(`/${Routes.EntryMobile}/${Routes.My}`);

      logout();
    }
  }, [logout, platform, router]);

  const handleClickDeregister = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router.query.depth1;

      const query = router.query;

      delete query.depth1;

      delete query.depth2;

      router.push({ pathname: `/${depth1}/${Routes.Deregister}`, query });
    }

    if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.Deregister}`);
    }
  }, [platform, router]);

  return { handleClickLogout, handleClickDeregister };
}
