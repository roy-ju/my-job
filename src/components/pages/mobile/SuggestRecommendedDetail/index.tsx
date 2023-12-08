import { memo, useCallback, useState, useRef } from 'react';
import { SuggestRecommendedDetail as SuggestRecommendedDetailTemplate } from '@/components/templates';
import Routes from '@/router/routes';
import { useRouter as useNextRouter } from 'next/router';
import { MobileContainer } from '@/components/atoms';
import useAPI_GetMySuggestRecommendedDetail from '@/apis/suggest/getMySuggestRecommendedDetail';
import { toast } from 'react-toastify';
import { cancelMySuggestRecommend } from '@/apis/suggest/cancelMySuggestRecommendCancel';
import { deleteMySuggestRecommend } from '@/apis/suggest/deleteMySuggestRecommend';
import { completeMySuggestRecommender } from '@/apis/suggest/completeMySuggestRecommender';
import reopneChatRoom from '@/apis/chat/reopenChatRoom';
import { OverlayPresenter, Popup } from '@/components/molecules';

export default memo(() => {
  const router = useNextRouter();
  const nextRouter = useNextRouter();
  const suggestID = Number(router.query.suggestID);
  const { data, mutate } = useAPI_GetMySuggestRecommendedDetail(suggestID);
  const [popup, setPopup] = useState<'cancel' | 'delete' | undefined>(undefined);
  const targetDeleteOrCancelID = useRef<number>(0);

  const handleClickBack = useCallback(() => {
    nextRouter.back();
  }, [nextRouter]);

  const handleSuggestComplete = () => {
    if (typeof data?.suggestor_id === 'number') {
      completeMySuggestRecommender({ suggest_id: suggestID, suggestor_id: data?.suggestor_id });
      toast.success('거래가 성사되었습니다.');
    }
  };

  const handleChatRoomReopen = async () => {
    await reopneChatRoom(data?.chat_room_id);
    mutate();
  };

  const handleDanjiClick = () => {
    nextRouter.push(`/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${data?.danji_id}`);
  };

  const handleChatClick = () => {
    nextRouter.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${data?.chat_room_id}`);
  };

  const handleMyRecommendCancel = async (suggestRecommendID: number) => {
    if (data?.suggest_recommends.length === 1) {
      targetDeleteOrCancelID.current = suggestRecommendID;
      setPopup('cancel');
      return;
    }
    await cancelMySuggestRecommend(suggestRecommendID);
    mutate();
  };
  const handleMyRecommendDelete = async (suggestRecommendID: number) => {
    if (data?.suggest_recommends.length === 1) {
      targetDeleteOrCancelID.current = suggestRecommendID;
      setPopup('delete');

      return;
    }
    await deleteMySuggestRecommend(suggestRecommendID);
    mutate();
  };

  const handlePopupClose = () => {
    setPopup(undefined);
    targetDeleteOrCancelID.current = 0;
  };

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
              <Popup.ActionButton
                onClick={async () => {
                  await cancelMySuggestRecommend(targetDeleteOrCancelID.current);
                  nextRouter.replace(`/${Routes.EntryMobile}/${Routes.SuggestRecommendedList}`);
                  toast.success('추천이 취소되었습니다.');
                }}
              >
                추천 취소
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
      {popup === 'delete' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.SubTitle tw="text-center">
                {' '}
                현재 추천하신 매물이 1개 있습니다.
                <br />
                해당 매물을 삭제하시면 요청 카드 전체가 삭제됩니다. <br />
                추천하신 매물을 삭제하시겠습니까?
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={handlePopupClose}>취소</Popup.CancelButton>
              <Popup.ActionButton
                onClick={async () => {
                  await deleteMySuggestRecommend(targetDeleteOrCancelID.current);
                  nextRouter.replace(`/${Routes.EntryMobile}/${Routes.SuggestRecommendedList}`);

                  toast.success('추천이 삭제되었습니다.');
                }}
              >
                삭제
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </MobileContainer>
  );
});
