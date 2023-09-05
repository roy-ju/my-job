import useAPI_GetSuggestDetail from '@/apis/suggest/getSuggestDetail';
import useAPI_GetUserAddress from '@/apis/user/getUserAddress';
import { AuthRequired, Loading, Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { SuggestDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';

import { memo, useCallback, useMemo, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);

  const [addressApplyPopup, setAddressApplyPopup] = useState(false);

  const [confirmPopup, setConfirmPopup] = useState(false);

  const suggestID = useMemo(
    () => (router?.query?.suggestID ? Number(router.query.suggestID) : undefined),
    [router.query.suggestID],
  );

  const { data: userAddressData } = useAPI_GetUserAddress();

  const { data, isLoading } = useAPI_GetSuggestDetail(suggestID);

  const disabledCTA = useMemo(() => false, []);

  const isExistMySuggested = useMemo(() => true, []);

  const handleClickCTA = useCallback(() => {
    if (!suggestID) return;

    if (!userAddressData?.road_name_address) {
      setAddressApplyPopup(true);
      return;
    }

    setConfirmPopup(true);

    // router.replace(Routes.SuggestListingForm, { searchParams: { suggestID: `${suggestID}` } });
  }, [suggestID, userAddressData?.road_name_address]);

  const handleAddressApplyPopupCTA = useCallback(() => {
    router.replace(Routes.MyAddress, {
      persistParams: true,
      searchParams: { redirect: `${router.asPath}`, back: 'true' },
    });
  }, [router]);

  const handleConfirmPopupCTA = useCallback(
    (type: string) => {
      if (type === 'registeredAddress') {
        router.replace(Routes.SuggestListingForm, { searchParams: { suggestID: `${suggestID}` } });
      } else if (type === 'newAddress') {
        router.replace(Routes.MyAddress, {
          persistParams: true,
          searchParams: { redirect: `${router.asPath}`, back: 'true' },
        });
      }
    },
    [router, suggestID],
  );

  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
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
          />
        ) : null}
      </Panel>

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
              <Popup.SmallTitle>
                매물 추천
                <br />
                우리집 등록으로 이동하시겠습니까?
              </Popup.SmallTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              {/* <Popup.CancelButton onClick={() => setAddressApplyPopup(false)}>닫기</Popup.CancelButton>
              <Popup.ActionButton onClick={handleConfirmPopupCTA}>우리집 등록하기</Popup.ActionButton> */}
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </AuthRequired>
  );
});
