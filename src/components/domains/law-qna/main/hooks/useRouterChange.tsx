/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import getPath from '@/utils/getPath';

import Routes from '@/router/routes';

export default function useRouterChange() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const handleClickHome = useCallback(() => {
    router.replace('');
  }, [router]);

  const handleClickBack = useCallback(() => {
    router.push(`/${Routes.EntryMobile}`);
  }, [router]);

  const handleClickQnaListItem = useCallback(
    (id?: number) => {
      if (typeof id !== 'number') return null;

      const path = getPath({
        depth1: router?.query?.depth1 as NegocioPath,
        depth2: router?.query?.depth2 as NegocioPath,
        targetPath: Routes.SuggestForm as NegocioPath,
      });

      router.push({
        pathname: path,
        query: { qnaID: `${id}`, ...(router?.query?.q ? { q: `${router.query.q}` } : {}) },
      });
    },
    [router],
  );

  const handleClickSearchPage = useCallback(() => {
    // if (router?.query?.q) {
    //   router.push(`/${Routes.LawQnaSearch}`, {
    //     searchParams: { q: router.query.q as string },
    //   });
    // } else {
    //   router.push(Routes.LawQnaSearch);
    // }
  }, []);

  return { handleClickHome, handleClickQnaListItem };
}
