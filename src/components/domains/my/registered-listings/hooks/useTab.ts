import { useState, useEffect, useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useTab({ pcCallback }: { pcCallback: () => void }) {
  const router = useRouter();

  const [tab, setTab] = useState(Number(router.query.tab));

  const { platform } = useCheckPlatform();

  const handleChangeTab = useCallback(
    (newValue: number) => {
      if (platform === 'pc') {
        setTab(Number(newValue));

        pcCallback();

        const depth1 = router?.query?.depth1;
        const depth2 = router?.query?.depth2;

        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        if (depth1 && depth2) {
          router.push({
            pathname: `/${depth1}/${Routes.MyRegisteredListingList}`,
            query: { ...query, tab: `${newValue}` },
          });
        } else {
          router.push({
            pathname: `/${Routes.MyRegisteredListingList}`,
            query: { ...query, tab: `${newValue}` },
          });
        }
      }

      if (platform === 'mobile') {
        setTab(Number(newValue));
      }
    },
    [platform, pcCallback, router],
  );

  useEffect(() => {
    if (router?.query?.tab) {
      setTab(Number(router.query.tab));
    }
  }, [router?.query?.tab]);

  return { tab, handleChangeTab };
}
