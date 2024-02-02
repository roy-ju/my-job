import { memo, useCallback, useState, useRef } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import { MobileContainer } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { SuggestRecommendedDetail as SuggestRecommendedDetailTemplate } from '@/components/templates';

import Routes from '@/router/routes';

import useAPI_GetMySuggestRecommendedDetail from '@/apis/suggest/getMySuggestRecommendedDetail';

import { cancelMySuggestRecommend } from '@/apis/suggest/cancelMySuggestRecommendCancel';

import { deleteMySuggestRecommend } from '@/apis/suggest/deleteMySuggestRecommend';

import { completeMySuggestRecommender } from '@/apis/suggest/completeMySuggestRecommender';

import reopneChatRoom from '@/apis/chat/reopenChatRoom';

export default memo(() => {
  const router = useRouter();

  const suggestID = Number(router.query.suggestID);

  const { data, mutate } = useAPI_GetMySuggestRecommendedDetail(suggestID);

  const [popup, setPopup] = useState<'cancel' | 'delete' | undefined>(undefined);

  const targetDeleteOrCancelID = useRef<number>(0);

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleSuggestComplete = useCallback(() => {
    if (typeof data?.suggestor_id === 'number') {
      completeMySuggestRecommender({ suggest_id: suggestID, suggestor_id: data?.suggestor_id });
      toast.success('거래가 성사되었습니다.');
    }
  }, [data?.suggestor_id, suggestID]);

  const handleChatRoomReopen = useCallback(async () => {
    await reopneChatRoom(data?.chat_room_id);
    mutate();
  }, [data?.chat_room_id, mutate]);

  const handleDanjiClick = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${data?.danji_id}`);
  }, [data?.danji_id, router]);

  const handleChatClick = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${data?.chat_room_id}`);
  }, [data?.chat_room_id, router]);

  const handleMyRecommendCancel = useCallback(
    async (suggestRecommendID: number) => {
      if (data?.suggest_recommends.length === 1) {
        targetDeleteOrCancelID.current = suggestRecommendID;
        setPopup('cancel');
        return;
      }

      await cancelMySuggestRecommend(suggestRecommendID);
      toast.success('추천이 취소되었습니다.');
      mutate();
    },
    [data?.suggest_recommends.length, mutate],
  );

  const handleMyRecommendDelete = useCallback(
    async (suggestRecommendID: number) => {
      if (data?.suggest_recommends.length === 1) {
        targetDeleteOrCancelID.current = suggestRecommendID;
        setPopup('delete');

        return;
      }
      await deleteMySuggestRecommend(suggestRecommendID);
      toast.success('추천이 삭제되었습니다.');
      mutate();
    },
    [data?.suggest_recommends.length, mutate],
  );

  const handlePopupClose = useCallback(() => {
    setPopup(undefined);
    targetDeleteOrCancelID.current = 0;
  }, []);

  const handleCancelPopupConfirm = useCallback(async () => {
    await cancelMySuggestRecommend(targetDeleteOrCancelID.current);

    router.replace(`/${Routes.EntryMobile}/${Routes.SuggestRecommendedList}`);

    toast.success('추천이 취소되었습니다.');
  }, [router]);

  const handleDeletePopupConfirm = useCallback(async () => {
    await deleteMySuggestRecommend(targetDeleteOrCancelID.current);

    router.replace(`/${Routes.EntryMobile}/${Routes.SuggestRecommendedList}`);

    toast.success('추천이 삭제되었습니다.');
  }, [router]);

  return (
    <MobileContainer>
      <SuggestRecommendedDetailTemplate
        data={data}
        onClickBack={handleClickBack}
        onDanjiClick={handleDanjiClick}
        onChatClick={handleChatClick}
        onChatRoomReopen={handleChatRoomReopen}
        onSuggestComplete={handleSuggestComplete}
        onMyRecommendCancel={handleMyRecommendCancel}
        onMyRecommendDelete={handleMyRecommendDelete}
      />

      {popup === 'cancel' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.SubTitle tw="text-center">
                현재 추천하신 매물이 1개 있습니다.
                <br />
                해당 매물의 추천을 취소하시면 요청 카드 전체가 삭제됩니다. <br />
                매물 추천을 취소하시겠습니까?
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={handlePopupClose}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleCancelPopupConfirm}>추천 취소</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}

      {popup === 'delete' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.SubTitle tw="text-center">
                현재 추천하신 매물이 1개 있습니다.
                <br />
                해당 매물을 삭제하시면 요청 카드 전체가 삭제됩니다. <br />
                추천하신 매물을 삭제하시겠습니까?
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={handlePopupClose}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleDeletePopupConfirm}>삭제</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </MobileContainer>
  );
});
