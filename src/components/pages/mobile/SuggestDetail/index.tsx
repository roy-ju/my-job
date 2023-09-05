import useAPI_GetSuggestDetail from '@/apis/suggest/getSuggestDetail';
import useAPI_GetUserAddress from '@/apis/user/getUserAddress';
import { Loading, MobAuthRequired, MobileContainer } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { SuggestDetail } from '@/components/templates';
import { SuggestStatus } from '@/constants/enums';
import Routes from '@/router/routes';

import { useRouter } from 'next/router';
import { memo, useMemo, useCallback, useState } from 'react';

export default memo(() => {
  const router = useRouter();

  const [addressApplyPopup, setAddressApplyPopup] = useState(false);

  const [confirmPopup, setConfirmPopup] = useState(false);

  const suggestID = useMemo(
    () => (router?.query?.suggestID ? Number(router.query.suggestID) : undefined),
    [router.query.suggestID],
  );

  const { data: userAddressData } = useAPI_GetUserAddress();

  const { data, isLoading } = useAPI_GetSuggestDetail(suggestID);

  const disabledCTA = useMemo(() => {
    if (data?.suggest_status === SuggestStatus.Active) return false;

    return true;
  }, [data?.suggest_status]);

  const isExistMySuggested = useMemo(() => false, []);

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleClickCTA = useCallback(() => {
    if (!suggestID) return;

    if (!userAddressData?.road_name_address) {
      setAddressApplyPopup(true);
      return;
    }

    setConfirmPopup(true);
  }, [suggestID, userAddressData?.road_name_address]);

  const handleAddressApplyPopupCTA = useCallback(() => {
    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
      query: {
        redirect: router.asPath,
      },
    });
  }, [router]);

  const handleConfirmPopupCTA = useCallback(
    (type: string) => {
      if (type === 'registeredAddress') {
        router.push(`/${Routes.EntryMobile}/${Routes.SuggestListingForm}?suggestID=${suggestID}`);
      } else if (type === 'newAddress') {
        router.push(`/${Routes.EntryMobile}/${Routes.MyAddress}?suggestID=${suggestID}`);
      }
    },
    [router, suggestID],
  );

  return (
    <MobAuthRequired>
      <MobileContainer>
        {isLoading ? (
          <div tw="py-20">
            <Loading />
          </div>
        ) : data ? (
          <SuggestDetail
            data={data}
            isExistMySuggested={isExistMySuggested}
            disabledCTA={disabledCTA}
            onClickCTA={handleClickCTA}
            onClickBack={handleClickBack}
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

      {confirmPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.Title>
                매물 추천
                <br />
                우리집 등록으로 이동하시겠습니까?
              </Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              {/* <Popup.CancelButton onClick={() => handleConfirmPopupCTA()}>닫기</Popup.CancelButton>
              <Popup.ActionButton onClick={handleConfirmPopupCTA()}>우리집 등록하기</Popup.ActionButton> */}
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </MobAuthRequired>
  );
});
