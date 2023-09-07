import useAPI_getMyRecommendedList from '@/apis/suggest/getMyRecommendedList';
import useAPI_GetSuggestDetail from '@/apis/suggest/getSuggestDetail';
import suggestRecommendEligibility from '@/apis/suggest/suggestRecommendEligibility';

import useAPI_GetUserInfo from '@/apis/user/getUserInfo';
import { Loading, MobileContainer } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { SuggestDetail } from '@/components/templates';
import { SuggestStatus } from '@/constants/enums';
import Routes from '@/router/routes';

import { useRouter } from 'next/router';
import { memo, useMemo, useCallback, useState } from 'react';

export default memo(() => {
  const router = useRouter();

  const { data: userData } = useAPI_GetUserInfo();

  const [addressApplyPopup, setAddressApplyPopup] = useState(false);

  const suggestID = useMemo(
    () => (router?.query?.suggestID ? Number(router.query.suggestID) : undefined),
    [router.query.suggestID],
  );

  const { data, isLoading } = useAPI_GetSuggestDetail(suggestID);

  const { data: myRecommendedList, mutate } = useAPI_getMyRecommendedList({ suggestId: suggestID });

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

    if (!userData) {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.Login}`,
        query: {
          redirect: router.asPath,
        },
      });
      return;
    }

    if (!userData.is_verified) {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.VerifyCi}`,
        query: {
          redirect: router.asPath,
        },
      });
      return;
    }

    if (data?.danji_id) {
      const response = await suggestRecommendEligibility({ danji_id: data.danji_id });

      if (response && !response?.is_eligible) {
        setAddressApplyPopup(true);
        return;
      }

      if (response && response?.is_eligible) {
        if (data?.danji_id) {
          router.push(
            `/${Routes.EntryMobile}/${Routes.SuggestListingForm}?danjiID=${data.danji_id}&suggestID=${suggestID}`,
          );
        } else {
          router.push(`/${Routes.EntryMobile}/${Routes.SuggestListingForm}?suggestID=${suggestID}`);
        }
      }
    }
  }, [data?.danji_id, router, suggestID, userData]);

  const handleAddressApplyPopupCTA = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.MyAddress}`);
  }, [router]);

  const handleMutate = useCallback(() => {
    mutate();
  }, [mutate]);

  const closePopup = useCallback(() => {
    setAddressApplyPopup(false);
  }, []);

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
      </MobileContainer>

      {addressApplyPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.SmallTitle>
                매물을 추천하시려면 우리집 등록이 필요합니다.
                <br />
                우리집 등록으로 이동하시겠습니까?
              </Popup.SmallTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setAddressApplyPopup(false)}>닫기</Popup.CancelButton>
              <Popup.ActionButton onClick={handleAddressApplyPopupCTA}>우리집 등록하기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}

      {addressApplyPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.SmallTitle>
                매물을 추천하시려면
                <br />
                해당 단지에 소유자 인증이 필요합니다.
                <br />
                우리집 등록으로 이동하시겠습니까?
              </Popup.SmallTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={closePopup}>닫기</Popup.CancelButton>
              <Popup.ActionButton onClick={handleAddressApplyPopupCTA}>우리집 등록하기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
});
