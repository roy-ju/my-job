import useAPI_GetMySuggestRecommendedList from '@/apis/suggest/getMySuggestRecommendedList';
import { Panel, Loading } from '@/components/atoms';
import { SuggestRecommendedList as SuggestRecommendedListTemplate } from '@/components/templates';
import { memo, useState, useRef } from 'react';
import { useRouter } from '@/hooks/utils';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { toast } from 'react-toastify';
import Routes from '@/router/routes';
import { deleteSuggestRecommend } from '@/apis/suggest/deleteSuggestRecommend';
import { cancelRecommend } from '@/apis/suggest/cancelRecommend';
import { mutate as otherMutate } from 'swr';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);
  const [showSuggestRecommendCancelPopup, setShowSuggestRecommendCancelPopup] = useState(false);
  const suggestRecommendIdToCancel = useRef<number | undefined>(undefined);
  const {
    data: suggestRecommendedList,
    isLoading,
    increamentPageNumber,
    mutate,
  } = useAPI_GetMySuggestRecommendedList();

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
    otherMutate('/my/dashboard/info');
  };

  const handleNavigateToChatRoom = (chatRoomId: number) => {
    router.replace(Routes.ChatRoom, {
      searchParams: { chatRoomID: `${chatRoomId}`, back: router.asPath },
    });
  };
  const handleNavigateToDanjiRecommendation = () => {
    router.replace(Routes.DanjiRecommendation, {
      searchParams: { back: router.asPath },
    });
  };

  const handleDeleteSuggestRecommend = async (suggestRecommendId: number) => {
    await deleteSuggestRecommend(suggestRecommendId);
    await mutate();
    toast.success('요청을 삭제했습니다.');
    otherMutate('/my/dashboard/info');
  };

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
      <SuggestRecommendedListTemplate
        suggestRecommendedList={suggestRecommendedList}
        onNextListing={increamentPageNumber}
        onNavigateToDanjiRecommendation={handleNavigateToDanjiRecommendation}
        onNavigateToChatRoom={handleNavigateToChatRoom}
        onDeleteSuggestRecommend={handleDeleteSuggestRecommend}
        onClickSuggestRecommendCancel={handleClickSuggestRecommendCancel}
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
    </Panel>
  );
});
