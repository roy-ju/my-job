import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useCtasHandler({ danjiID }: { danjiID: number }) {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const handleClickDanjiDetailButton = useCallback(() => {
    if (platform === 'pc') {
      router.push({
        pathname: `/${Routes.DanjiDetail}`,
        query: {
          danjiID: `${danjiID}`,
        },
      });
    }

    if (platform === 'mobile') {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.DanjiDetail}`,
        query: {
          danjiID: `${danjiID}`,
        },
      });
    }
  }, [platform, router, danjiID]);

  return { handleClickDanjiDetailButton };
}
