import { MobileContainer } from '@/components/atoms';
import { SuggestRecommendedList as SuggestRecommendedListTemplate } from '@/components/templates';
import { useRouter } from 'next/router';
import { memo, useState, useRef } from 'react';
import useAPI_GetMySuggestRecommendedList from '@/apis/suggest/getMySuggestRecommendedList';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { toast } from 'react-toastify';
import Routes from '@/router/routes';
import { deleteSuggestRecommend } from '@/apis/suggest/deleteSuggestRecommend';
import { cancelRecommend } from '@/apis/suggest/cancelRecommend';

export default memo(() => {
  const router = useRouter();
  const [showSuggestRecommendCancelPopup, setShowSuggestRecommendCancelPopup] = useState(false);
  const suggestRecommendIdToCancel = useRef<number | undefined>(undefined);
  const { data: suggestRecommendedList, increamentPageNumber, mutate } = useAPI_GetMySuggestRecommendedList();

  const handleClickSuggestRecommendCancel = (suggestRecommendId: number) => {
    setShowSuggestRecommendCancelPopup(true);
    suggestRecommendIdToCancel.current = suggestRecommendId;
  };

  const handleCancelSuggestRecommend = async () => {
    if (!suggestRecommendIdToCancel.current) return;

    setShowSuggestRecommendCancelPopup(false);
    await cancelRecommend(suggestRecommendIdToCancel.current);
    await mutate();
    suggestRecommendIdToCancel.current = undefined;
    toast.success('추천을 취소했습니다.');
  };

  const handleNavigateToChatRoom = (chatRoomId: number) => {
    router.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${chatRoomId}`);
  };

  const handleNavigateToDanjiRecommendation = () => {
    router.push(`/${Routes.EntryMobile}/${Routes.DanjiRecommendation}`);
  };

  const handleDeleteSuggestRecommend = async (suggestRecommendId: number) => {
    await deleteSuggestRecommend(suggestRecommendId);
    await mutate();
    toast('요청을 삭제했습니다.');
  };

  return (
    <MobileContainer>
      <SuggestRecommendedListTemplate
        suggestRecommendedList={suggestRecommendedList}
        onNextListing={increamentPageNumber}
        onNavigateToDanjiRecommendation={handleNavigateToDanjiRecommendation}
        onNavigateToChatRoom={handleNavigateToChatRoom}
        onDeleteSuggestRecommend={handleDeleteSuggestRecommend}
        onClickSuggestRecommendCancel={handleClickSuggestRecommendCancel}
        onClickBack={() => router.back()}
      />
      {showSuggestRecommendCancelPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.SubTitle tw="text-center">추천을 취소하시겠습니까?</Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setShowSuggestRecommendCancelPopup(false)}>닫기</Popup.CancelButton>
              <Popup.ActionButton onClick={handleCancelSuggestRecommend}>추천 취소</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </MobileContainer>
  );
});