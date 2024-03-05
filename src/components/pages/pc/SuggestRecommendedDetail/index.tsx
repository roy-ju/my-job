import { memo, useCallback, useRef, useState } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import { toast } from 'react-toastify';

import { Panel } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { SuggestRecommendedDetail as SuggestRecommendedDetailTemplate } from '@/components/templates';

import { useRouter } from '@/hooks/utils';

import Routes from '@/router/routes';

import useAPI_GetMySuggestRecommendedDetail from '@/apis/suggest/getMySuggestRecommendedDetail';

import { completeMySuggestRecommender } from '@/apis/suggest/completeMySuggestRecommender';

import { cancelMySuggestRecommend } from '@/apis/suggest/cancelMySuggestRecommendCancel';

import { deleteMySuggestRecommend } from '@/apis/suggest/deleteMySuggestRecommend';

import replaceFirstOccurrence from '@/utils/replaceFirstOccurrence';

import { apiService } from '@/services';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const nextRouter = useNextRouter();

  const suggestID = Number(router.query.suggestID);

  const { data, mutate } = useAPI_GetMySuggestRecommendedDetail(suggestID);

  const [popup, setPopup] = useState<'cancel' | 'delete' | undefined>(undefined);

  const targetDeleteOrCancelID = useRef<number>(0);

  const handleClickBack = useCallback(() => {
    nextRouter.push(router.query.back as string);
  }, [nextRouter, router]);

  const handleSuggestComplete = useCallback(() => {
    if (typeof data?.suggestor_id === 'number') {
      completeMySuggestRecommender({ suggest_id: suggestID, suggestor_id: data?.suggestor_id });
      toast.success('거래가 성사되었습니다.');
    }
  }, [data?.suggestor_id, suggestID]);

  const handleChatRoomReopen = useCallback(async () => {
    await apiService.chatRoomReopen(data?.chat_room_id);
    mutate();
  }, [data?.chat_room_id, mutate]);

  const handleDanjiClick = useCallback(() => {
    router.replace(Routes.DanjiDetail, {
      searchParams: {
        danjiID: `${data?.danji_id}`,
        back: router.asPath,
      },
    });
  }, [data?.danji_id, router]);

  const handleChatClick = useCallback(() => {
    router.replace(Routes.ChatRoom, {
      searchParams: {
        chatRoomID: `${data?.chat_room_id}`,
        back: router.asPath,
      },
    });
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

    const path = replaceFirstOccurrence(
      nextRouter.asPath,
      Routes.SuggestRecommendedDetail,
      Routes.SuggestRecommendedList,
    );

    nextRouter.replace(path);

    toast.success('추천이 취소되었습니다.');
  }, [nextRouter]);

  const handleDeletePopupConfirm = useCallback(async () => {
    await deleteMySuggestRecommend(targetDeleteOrCancelID.current);

    const path = replaceFirstOccurrence(
      nextRouter.asPath,
      Routes.SuggestRecommendedDetail,
      Routes.SuggestRecommendedList,
    );

    nextRouter.replace(path);

    toast.success('추천이 삭제되었습니다.');
  }, [nextRouter]);

  return (
    <Panel width={panelWidth}>
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
    </Panel>
  );
});
