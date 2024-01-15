/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import getPath from '@/utils/getPath';

import Routes from '@/router/routes';

import useBackButtonHandler from '@/hooks/useBack';

import useAuth from '@/hooks/services/useAuth';

export default function useRouterChange() {
  const { user } = useAuth();

  const { platform } = useCheckPlatform();

  const router = useRouter();

  const { back } = useBackButtonHandler();

  const handleClickHomeButton = useCallback(() => {
    if (platform === 'pc') {
      router.push('/');
    }

    if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}`);
    }
  }, [platform, router]);

  const handleClickViewAllItem = () => {
    if (platform === 'pc') {
      router.replace(`/${Routes.LawQna}`);
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}/${Routes.LawQna}`);
    }
  };

  const handleClickQnaListItem = useCallback(
    (id?: number) => {
      if (typeof id !== 'number') return null;

      if (platform === 'pc') {
        const path = getPath({
          depth1: router?.query?.depth1 as NegocioPath,
          depth2: router?.query?.depth2 as NegocioPath,
          targetPath: Routes.LawQnaDetail as NegocioPath,
        });

        router.push({
          pathname: path,
          query: { qnaID: `${id}`, ...(router?.query?.q ? { q: `${router.query.q}` } : {}) },
        });
      }

      if (platform === 'mobile') {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.LawQnaDetail}`,
          query: { qnaID: `${id}`, ...(router?.query?.q ? { q: `${router.query.q}` } : {}) },
        });
      }
    },
    [platform, router],
  );

  const handleClickWritingButton = () => {
    if (platform === 'pc') {
      const path = getPath({
        depth1: router?.query?.depth1 as NegocioPath,
        depth2: router?.query?.depth2 as NegocioPath,
        targetPath: Routes.LawQnaCreate as NegocioPath,
      });
      // To Do Logic
    }

    if (platform === 'mobile') {
      if (router?.query?.q) {
        router.push(`/${Routes.EntryMobile}/${Routes.LawQnaCreate}?q=${router.query.q as string}`);
      } else {
        router.push(`/${Routes.EntryMobile}/${Routes.LawQnaCreate}`);
      }
    }
  };

  const handleClickSearchButton = useCallback(() => {
    if (platform === 'pc') {
      const path = getPath({
        depth1: router?.query?.depth1 as NegocioPath,
        depth2: router?.query?.depth2 as NegocioPath,
        targetPath: Routes.LawQnaSearch as NegocioPath,
      });

      // To Do Logic
    }

    if (platform === 'mobile') {
      if (router?.query?.q) {
        router.push(`/${Routes.EntryMobile}/${Routes.LawQnaSearch}?q=${router.query.q as string}`);
      } else {
        router.push(`/${Routes.EntryMobile}/${Routes.LawQnaSearch}`);
      }
    }
  }, [platform, router]);

  const handleClickBack = useCallback(() => {
    back();
  }, [back]);

  return {
    handleClickHomeButton,
    handleClickViewAllItem,
    handleClickQnaListItem,
    handleClickBack: platform === 'pc' ? undefined : handleClickBack,
    handleClickSearchButton,
  };
}
