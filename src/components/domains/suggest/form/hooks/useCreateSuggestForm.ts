import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { mutate as otherMutate } from 'swr';

import { toast } from 'react-toastify';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { apiService } from '@/services';

import useFetchMyDashboardInfo from '@/services/my/useFetchMyDashboardInfo';

import { DanjiOrRegionalType } from '@/constants/enums';

import Actions from '@/constants/actions';

import Routes from '@/router/routes';

import isEqualValue from '../../utils/isEqualValue';

import createSubmitParams from '../../utils/createSubmitParams';

import normalizeParams from '../../utils/normalizeParams';

export default function useCreateSuggestForm() {
  const { mutate: dashBoardInfoMutate } = useFetchMyDashboardInfo();

  const { platform } = useCheckPlatform();

  const router = useRouter();

  const createSuggest = useCallback(async () => {
    if (!router?.query?.params) return;

    const queryParams: Record<string, unknown> = JSON.parse(router.query.params as string);

    const normalizedParams = normalizeParams(queryParams);

    const params = createSubmitParams(normalizedParams as any);

    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(Actions.Suggest_Create_Form.key, '1');
    }

    if (isEqualValue(normalizedParams.danjiOrRegion, DanjiOrRegionalType.Danji)) {
      try {
        if (params) {
          delete params?.danjiAddress;
          delete params?.danjiRealestateType;

          params.pyoungs = (params.pyoungs as string[]).join(',');
        }

        await apiService.createSuggestDanji(params);

        await dashBoardInfoMutate();

        if (platform === 'pc') {
          await otherMutate(() => true, undefined);
        }

        if (platform === 'pc') {
          const depth1 = router?.query?.depth1;
          const depth2 = router?.query?.depth2;

          if (depth1 && !depth2) {
            router.replace({
              pathname: `/${Routes.WaitingCreateForm}`,
            });
          } else if (depth1 && depth2) {
            router.replace({
              pathname: `/${depth1}/${Routes.WaitingCreateForm}`,
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
      }
    }

    if (isEqualValue(normalizedParams.danjiOrRegion, DanjiOrRegionalType.Regional)) {
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
              pathname: `/${depth1}/${Routes.WaitingCreateForm}`,
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
      }
    }
  }, [dashBoardInfoMutate, platform, router]);

  return { createSuggest };
}
