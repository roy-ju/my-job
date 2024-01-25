import { useCallback } from 'react';

import router from 'next/router';

import { mutate as otherMutate } from 'swr';

import { toast } from 'react-toastify';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { apiService } from '@/services';

import useFetchMyDashboardInfo from '@/services/my/useFetchMyDashboardInfo';

import { DanjiOrRegionalType } from '@/constants/enums';

import Routes from '@/router/routes';

import isEqualValue from '../../utils/isEqualValue';

import normalizeParams from '../../utils/normalizeParams';

export default function useCreateSuggestForm() {
  const { mutate: dashBoardInfoMutate } = useFetchMyDashboardInfo();

  const { platform } = useCheckPlatform();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const createSuggest = useCallback(async () => {
    if (!router?.query?.params) return;

    const queryParams: Record<string, unknown> = JSON.parse(router.query.params as string);

    const params: any = normalizeParams(queryParams);

    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('create-suggest-form', '1');
    }

    if (isEqualValue(params.danjiOrRegion, DanjiOrRegionalType.Danji)) {
      try {
        if (params) {
          delete params?.danjiAddress;
          delete params?.danjiRealestateType;

          params.pyoungs = (params.pyoungs as string[]).join(',');
        }

        await apiService.createSuggestDanji(params);

        await dashBoardInfoMutate();

        await otherMutate(() => true, undefined);

        if (platform === 'pc') {
          const depth1 = router?.query?.depth1;
          const depth2 = router?.query?.depth2;

          if (depth1 && !depth2) {
            router.replace({
              pathname: `/${Routes.WaitingCreateForm}`,
            });
          } else if (depth1 && depth2) {
            router.replace({
              pathname: `/${Routes.WaitingCreateForm}`,
              query: {
                ...(router?.query?.danjiID ? { danjiID: `${router.query.danjiID}` } : {}),
                ...(router?.query?.listingID ? { listingID: `${router.query.listingID}` } : {}),
              },
            });
          }
        } else {
          router.replace(`/${Routes.EntryMobile}/${Routes.WaitingCreateForm}`);
        }
      } catch (error) {
        toast.error('등록 중 오류가 발생했습니다.');
      } finally {
        handleUpdateReturnUrl('');
      }
    }

    if (isEqualValue(params.danjiOrRegion, DanjiOrRegionalType.Regional)) {
      try {
        await apiService.createSuggestRegional(params);

        await dashBoardInfoMutate();

        if (platform === 'pc') {
          const depth1 = router?.query?.depth1;
          const depth2 = router?.query?.depth2;

          if (depth1 && !depth2) {
            router.replace({
              pathname: `/${Routes.WaitingCreateForm}`,
            });
          } else if (depth1 && depth2) {
            router.replace({
              pathname: `/${Routes.WaitingCreateForm}`,
              query: {
                ...(router?.query?.danjiID ? { danjiID: `${router.query.danjiID}` } : {}),
                ...(router?.query?.listingID ? { listingID: `${router.query.listingID}` } : {}),
              },
            });
          }
        } else {
          router.replace(`/${Routes.EntryMobile}/${Routes.WaitingCreateForm}`);
        }
      } catch (error) {
        toast.error('등록 중 오류가 발생했습니다.');
      } finally {
        handleUpdateReturnUrl('');
      }
    }
  }, [dashBoardInfoMutate, handleUpdateReturnUrl, platform]);

  return { createSuggest };
}
