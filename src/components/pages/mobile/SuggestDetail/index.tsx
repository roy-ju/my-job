import { acceptRecommend } from '@/apis/suggest/acceptRecommend';
import useAPI_GetMySuggestDetail from '@/apis/suggest/getMySuggestDetail';
import useAPI_GetMySuggestRecommends from '@/apis/suggest/getMySuggestRecommends';
import { notIntersted } from '@/apis/suggest/notInterested';
import { Loading, MobileContainer } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { SuggestDetail } from '@/components/templates';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { memo, useCallback, useRef, useState } from 'react';

export default memo(() => {
  const router = useRouter();
  const suggestID = Number(router.query.suggestID) ?? 0;

  const [popup, setPopup] = useState('none');
  const [isPopupButtonLoading, setIsPopupButtonLoading] = useState(false);

  const popupData = useRef(0);

  const { data, isLoading } = useAPI_GetMySuggestDetail(suggestID);
  const { data: recommendData, count, mutate } = useAPI_GetMySuggestRecommends(suggestID);

  const handleClickChat = useCallback(
    (id: number) => {
      router.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${id}`);
    },
    [router],
  );

  const handleClickListing = useCallback(
    (id: number) => {
      router.push(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${id}`);
    },
    [router],
  );

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
      <MobileContainer>
        <div tw="py-20">
          <Loading />
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <SuggestDetail
        recommendCount={count}
        recommendData={recommendData}
        suggestData={data}
        onClickBack={() => router.back()}
        onClickListing={handleClickListing}
        onClickNotInterested={openNotInterestedPopup}
        onClickRecommendAccept={openAcceptRecommendPopup}
        onClickChat={handleClickChat}
      />
      {popup === 'notInterested' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-10">
              <Popup.Title>
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
            <Popup.ContentGroup tw="py-10">
              <Popup.Title>
                중개사님과의 채팅방이 개설됩니다.
                <br />
                채팅방을 나가시면 네고 협의가 중단되니 유의해 주세요.
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
    </MobileContainer>
  );
});
