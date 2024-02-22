import { memo, useMemo, useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { Loading, MobileContainer } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { SuggestDetail } from '@/components/templates';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { apiService } from '@/services';

import { isMobile } from '@/utils/is';

import { SuggestStatus } from '@/constants/enums';

import Routes from '@/router/routes';

import useAPI_getMyRecommendedList from '@/apis/suggest/getMyRecommendedList';

import useAPI_GetSuggestDetail from '@/apis/suggest/getSuggestDetail';

import suggestView from '@/apis/suggest/suggestView';

import useAPI_GetUserInfo from '@/apis/user/getUserInfo';
import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

export default memo(({ ipAddress }: { ipAddress?: string }) => {
  const router = useRouter();

  const suggestID = useMemo(
    () => (router?.query?.suggestID ? Number(router.query.suggestID) : undefined),
    [router.query.suggestID],
  );

  const { data: userData } = useAPI_GetUserInfo();

  const { data, isLoading, mutate: detailMutate } = useAPI_GetSuggestDetail(suggestID);

  const { data: myRecommendedList, mutate } = useAPI_getMyRecommendedList({ suggestId: suggestID });

  const [needVerifyAddressPopup, setNeedVerifyAddressPopup] = useState(false);

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const disabledCTA = useMemo(() => {
    if (data?.suggest_status === SuggestStatus.Active) return false;

    return true;
  }, [data?.suggest_status]);

  const isExistMySuggested = useMemo(() => !!myRecommendedList?.list?.length, [myRecommendedList?.list?.length]);

  const handleClickBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  }, [router]);

  const handleClickCTA = useCallback(async () => {
    if (!suggestID) return;

    if (inAppInfo.isInAppBrowser) {
      handleOpenAppInstallPopup();
      return;
    }

    if (!userData) {
      openAuthPopup('needVerify');
      handleUpdateReturnUrl();
      return;
    }

    if (!userData.is_verified) {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.VerifyCi}`,
      });
      handleUpdateReturnUrl();
      return;
    }

    if (data?.danji_id) {
      const response = await apiService.danjiSuggestRecommendEligibility({ danji_id: data.danji_id });

      if (response && !response?.is_eligible) {
        setNeedVerifyAddressPopup(true);
        return;
      }

      if (response && response?.is_eligible) {
        if (data?.danji_id) {
          router.push({
            pathname: `/${Routes.EntryMobile}/${Routes.SuggestSelectAddress}`,
            query: {
              origin: router.asPath,
              suggestID: `${suggestID}`,
              ...(data.danji_id ? { danjiID: `${data.danji_id}` } : {}),
            },
          });
        }
      }
    }
  }, [
    inAppInfo.isInAppBrowser,
    data?.danji_id,
    handleOpenAppInstallPopup,
    handleUpdateReturnUrl,
    openAuthPopup,
    router,
    suggestID,
    userData,
  ]);

  const handleActionNeedVerifyAddressPopup = useCallback(() => {
    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
      query: { origin: router.asPath, ...(router?.query?.suggestID ? { suggestID: router?.query?.suggestID } : {}) },
    });
  }, [router]);

  const handleMutate = useCallback(() => {
    mutate();
  }, [mutate]);

  const handleCloseNeedVerifyAddressPopup = useCallback(() => {
    setNeedVerifyAddressPopup(false);
  }, []);

  async function handleSuggestView() {
    if (!data) return;

    await suggestView({
      suggest_id: data?.suggest_id,
      ip_address: ipAddress !== '::1' ? ipAddress ?? '' : '',
      browser: navigator.userAgent,
      device: isMobile(navigator.userAgent) ? 'MOBILE' : 'PC',
    });

    await detailMutate();
  }

  useIsomorphicLayoutEffect(() => {
    handleSuggestView();
  }, [data]);

  return (
    <>
      <MobileContainer>
        {isLoading ? (
          <div tw="py-20">
            <Loading />
          </div>
        ) : data ? (
          <SuggestDetail
            data={data}
            myRecommendedList={myRecommendedList?.list}
            isExistMySuggested={isExistMySuggested}
            disabledCTA={disabledCTA}
            onClickCTA={handleClickCTA}
            onClickBack={handleClickBack}
            onMutate={handleMutate}
          />
        ) : null}

        {needVerifyAddressPopup && (
          <OverlayPresenter>
            <Popup>
              <Popup.ContentGroup tw="[text-align: center]">
                <Popup.SmallTitle>
                  이 단지의 집주인만 매물추천이 가능합니다.
                  <br />
                  우리집 등록하고 집주인 인증하러 가시겠습니까?
                </Popup.SmallTitle>
              </Popup.ContentGroup>
              <Popup.ButtonGroup>
                <Popup.CancelButton onClick={handleCloseNeedVerifyAddressPopup}>닫기</Popup.CancelButton>
                <Popup.ActionButton onClick={handleActionNeedVerifyAddressPopup}>집주인 인증하기</Popup.ActionButton>
              </Popup.ButtonGroup>
            </Popup>
          </OverlayPresenter>
        )}
      </MobileContainer>
    </>
  );
});
