import { acceptRecommend } from '@/apis/suggest/acceptRecommend';
import useAPI_GetMySuggestDetail from '@/apis/suggest/getMySuggestDetail';
import useAPI_GetMySuggestRecommends from '@/apis/suggest/getMySuggestRecommends';
import { notIntersted } from '@/apis/suggest/notInterested';
import { Loading, Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { SuggestDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback, useRef, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);
  const suggestID = Number(router.query.suggestID) ?? 0;

  const [popup, setPopup] = useState('none');
  const [isPopupButtonLoading, setIsPopupButtonLoading] = useState(false);

  const popupData = useRef(0);

  const { data, isLoading } = useAPI_GetMySuggestDetail(suggestID);
  const { data: recommendData, count, mutate, increamentPageNumber } = useAPI_GetMySuggestRecommends(suggestID);

  const handleClickChat = useCallback(
    (id: number) => {
      router.replace(Routes.ChatRoom, {
        searchParams: {
          chatRoomID: `${id}`,
        },
      });
    },
    [router],
  );

  const handleNaviagteToSuggestRegionalForm = useCallback(() => {
    router.replace(Routes.SuggestRegionalForm);
  }, [router]);

  const openNotInterestedPopup = useCallback((id: number) => {
    popupData.current = id;
    setPopup('notInterested');
  }, []);

  const openAcceptRecommendPopup = useCallback((id: number) => {
    popupData.current = id;
    setPopup('acceptRecommend');
  }, []);

  const handleNotInterested = useCallback(async () => {
    setIsPopupButtonLoading(true);
    await notIntersted(popupData.current);
    await mutate();
    setIsPopupButtonLoading(false);
    setPopup('none');
  }, [mutate]);

  const handleRecommendAccept = useCallback(async () => {
    setIsPopupButtonLoading(true);
    await acceptRecommend(popupData.current);
    await mutate();
    setIsPopupButtonLoading(false);
    setPopup('none');
  }, [mutate]);

  if (isLoading) {
    return (
      <Panel width={panelWidth}>
        <div tw="py-20">
          <Loading />
        </div>
      </Panel>
    );
  }

  return (
    <Panel width={panelWidth}>
      <SuggestDetail
        recommendCount={count}
        recommendData={recommendData}
        suggestData={data}
        onClickBack={() => router.replace(Routes.SuggestRequestedList)}
        onClickListing={(id) => router.replace(Routes.ListingDetail, { searchParams: { listingID: `${id}` } })}
        onClickNotInterested={openNotInterestedPopup}
        onClickRecommendAccept={openAcceptRecommendPopup}
        onClickChat={handleClickChat}
        onClickNewRecommendations={handleNaviagteToSuggestRegionalForm}
        onNextListingRecommentList={increamentPageNumber}
      />
      {popup === 'notInterested' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.Title tw="text-b2 text-center">
                관심없음으로 표시한 매물은
                <br />
                추천받은 목록에서 삭제됩니다.
              </Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setPopup('none')}>취소</Popup.CancelButton>
              <Popup.ActionButton isLoading={isPopupButtonLoading} onClick={handleNotInterested}>
                확인
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
      {popup === 'acceptRecommend' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.Title tw="text-b2 text-center">
                매물에 대한 추가 협의는 채팅으로 진행할 수 있습니
                <br />
                다. 이를 위한 중개사님과의 채팅방이 개설됩니다.
              </Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setPopup('none')}>취소</Popup.CancelButton>
              <Popup.ActionButton isLoading={isPopupButtonLoading} onClick={handleRecommendAccept}>
                확인
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </Panel>
  );
});