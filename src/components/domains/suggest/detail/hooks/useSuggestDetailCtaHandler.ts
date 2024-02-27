import { useCallback, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { SuggestStatus } from '@/constants/enums';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import Routes from '@/router/routes';

import { apiService } from '@/services';

import useFetchUserInfo from '@/services/auth/useFetchUserInfo';

import { SuggestDetailResponse } from '@/services/suggests/types';

import replaceFirstOccurrence from '@/utils/replaceFirstOccurrence';

export default function useSuggestDetailCtaHandler({ data }: { data: SuggestDetailResponse & ErrorResponse }) {
  const { platform } = useCheckPlatform();

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const router = useRouter();

  const suggestID = useMemo(
    () => (router?.query?.suggestID ? Number(router.query.suggestID) : undefined),
    [router.query.suggestID],
  );

  const [needVerifyAddressPopup, setNeedVerifyAddressPopup] = useState(false);

  const disabledCTA = useMemo(() => {
    if (data?.suggest_status === SuggestStatus.Active) return false;

    return true;
  }, [data?.suggest_status]);

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const { data: userData } = useFetchUserInfo();

  const handleClickCancel = useCallback(() => {
    setNeedVerifyAddressPopup(false);
  }, []);

  const handleClickConfirm = useCallback(async () => {
    if (!suggestID) return;

    if (platform === 'mobile' && inAppInfo.isInAppBrowser) {
      handleOpenAppInstallPopup();
      return;
    }

    if (!userData) {
      openAuthPopup('needVerify');
      handleUpdateReturnUrl();
      return;
    }

    if (!userData.is_verified) {
      if (platform === 'pc') {
        const path = replaceFirstOccurrence(router.asPath, Routes.SuggestDetail, Routes.VerifyCi);
        handleUpdateReturnUrl();

        router.push(path);
        return;
      }

      if (platform === 'mobile') {
        router.push({
          pathname: `/${Routes.EntryMobile}/${Routes.VerifyCi}`,
        });
        handleUpdateReturnUrl();
        return;
      }
    }

    if (data?.danji_id) {
      const res = await apiService.danjiSuggestRecommendEligibility({ danji_id: data.danji_id });

      if (res && !res?.is_eligible) {
        setNeedVerifyAddressPopup(true);
        return;
      }

      if (res && res?.is_eligible) {
        if (platform === 'pc') {
          const depth1 = router?.query?.depth1 ?? '';
          const depth2 = router?.query?.depth2 ?? '';

          const query = router.query;

          delete query.depth1;
          delete query.depth2;

          if (depth1 && depth2) {
            router.push({
              pathname: `/${depth1}/${Routes.SuggestSelectAddress}`,
              query: {
                ...query,
                origin: router.asPath,
                suggestID: `${suggestID}`,
                ...(data.danji_id ? { danjiID: `${data.danji_id}` } : {}),
              },
            });
          } else if (depth1 && !depth2) {
            router.push({
              pathname: `/${Routes.SuggestSelectAddress}`,
              query: {
                ...query,
                origin: router.asPath,
                suggestID: `${suggestID}`,
                ...(data?.danji_id ? { danjiID: `${data.danji_id}` } : {}),
              },
            });
          }
        } else if (platform === 'mobile') {
          router.push({
            pathname: `/${Routes.EntryMobile}/${Routes.SuggestSelectAddress}`,
            query: {
              origin: router.asPath,
              suggestID: `${suggestID}`,
              ...(data?.danji_id ? { danjiID: `${data.danji_id}` } : {}),
            },
          });
        }
      }
    }
  }, [
    data,
    inAppInfo.isInAppBrowser,
    platform,
    router,
    suggestID,
    userData,
    handleOpenAppInstallPopup,
    handleUpdateReturnUrl,
    openAuthPopup,
  ]);

  return { disabledCTA, needVerifyAddressPopup, handleClickCancel, handleClickConfirm };
}
