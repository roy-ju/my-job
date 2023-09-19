import { acceptRecommend } from '@/apis/suggest/acceptRecommend';
import useAPI_GetSuggestDetail from '@/apis/suggest/getSuggestDetail';
import useAPI_GetMySuggestRecommends from '@/apis/suggest/getMySuggestRecommends';
import { notIntersted } from '@/apis/suggest/notInterested';
import { Loading, Panel } from '@/components/atoms';
import { MySuggestDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback, useEffect, useState } from 'react';
import { resumeSuggest } from '@/apis/suggest/resumeSuggest';
import { stopSuggest } from '@/apis/suggest/stopSuggest';
import { SuggestStatus, DanjiOrRegionalType } from '@/constants/enums';
import { toast } from 'react-toastify';
import { mutate as otherMutate } from 'swr';
import { deleteSuggest } from '@/apis/suggest/deleteSuggest';
import { deleteSuggestRecommend } from '@/apis/suggest/deleteSuggestRecommend';
import { OverlayPresenter, Popup } from '@/components/molecules';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const suggestID = Number(router.query.suggestID) ?? 0;

  const { data, isLoading } = useAPI_GetSuggestDetail(suggestID);
  const {
    data: recommendData,
    count,
    mutate,
    increamentPageNumber,
    suggestStatus,
  } = useAPI_GetMySuggestRecommends(suggestID);

  const [suggestChecked, setSuggestChecked] = useState(false);

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

  const handleClickDanjiDetail = useCallback(() => {
    router.replace(Routes.DanjiDetail, {
      searchParams: {
        danjiID: `${data?.danji_id}`,
      },
    });
  }, [data, router]);

  const handleClickSuggestUpdate = useCallback(() => {
    const targetRoute =
      data?.danji_or_regional === DanjiOrRegionalType.Danji
        ? Routes.DanjiRecommendationUpdate
        : Routes.SuggestRegionalFormUpdate;

    router.replace(targetRoute, {
      searchParams: {
        suggestID: `${data?.suggest_id}`,
        back: router.asPath,
      },
    });
  }, [data, router]);

  useEffect(() => {
    setSuggestChecked(suggestStatus === SuggestStatus.Active);
  }, [suggestStatus]);

  const handleNaviagteToRecommendationForm = useCallback(() => {
    router.replace(Routes.RecommendationForm, {
      searchParams: {
        redirect: `${Routes.SuggestRequestedList}`,
        back: 'true',
      },
    });
  }, [router]);

  const handleNotInterested = useCallback(
    async (suggestRecommendId: number) => {
      await notIntersted(suggestRecommendId);
      await mutate();
      toast.success('추천받은 매물을 삭제했습니다.');
    },
    [mutate],
  );

  const handleRecommendAccept = useCallback(
    async (suggestRecommendId: number) => {
      await acceptRecommend(suggestRecommendId);
      await mutate();
    },
    [mutate],
  );

  const handleStopSuggest = useCallback(async () => {
    if (data?.suggest_id) {
      await stopSuggest(data?.suggest_id);
      mutate();
    }
  }, [mutate, data]);

  const handleResumeSuggest = useCallback(async () => {
    if (data?.suggest_id) {
      await resumeSuggest(data?.suggest_id);
      mutate();
    }
  }, [mutate, data]);

  const handleChangeSuggestChecked = useCallback(
    async (checked: boolean) => {
      if (checked) {
        await handleResumeSuggest();
      } else {
        await handleStopSuggest();
      }
      setSuggestChecked(checked);
    },
    [handleStopSuggest, handleResumeSuggest],
  );

  const handleClickDeleteSuggest = useCallback(() => {
    setShowDeletePopup(true);
  }, []);

  const handleClickBack = useCallback(() => {
    router.replace(Routes.SuggestRequestedList);
  }, [router]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!suggestID) return;
    await deleteSuggest(suggestID);
    setShowDeletePopup(false);
    toast.success('추천 요청을 삭제했습니다.', { toastId: 'success_delete' });
    otherMutate('/my/dashboard/info');
    handleClickBack();
  }, [suggestID, handleClickBack]);

  const handleDeleteSuggestRecommendItem = useCallback(
    async (suggestRecommendId: number) => {
      await deleteSuggestRecommend(suggestRecommendId);
      mutate();
    },
    [mutate],
  );

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
      <MySuggestDetail
        recommendCount={count}
        recommendData={recommendData}
        suggestChecked={suggestChecked}
        suggestData={data}
        onClickBack={handleClickBack}
        onClickNotInterested={handleNotInterested}
        onClickRecommendAccept={handleRecommendAccept}
        onClickChat={handleClickChat}
        onClickSuggestUpdate={handleClickSuggestUpdate}
        onClickDanjiDetail={handleClickDanjiDetail}
        onClickNewRecommendations={handleNaviagteToRecommendationForm}
        onNextListingRecommentList={increamentPageNumber}
        onChangeSuggestChecked={handleChangeSuggestChecked}
        onClickDeleteSuggest={handleClickDeleteSuggest}
        onClickDeleteSuggestRecommendItem={handleDeleteSuggestRecommendItem}
      />
      {showDeletePopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.SubTitle tw="text-center">
                {data?.has_active_chat_room ? (
                  <>
                    요청을 취소 하시겠습니까?
                    <br />
                    추천 내역과 대화중인 채팅방이 삭제됩니다.
                    <br />
                    신규 추천을 그만 받고 싶으시다면
                    <br />
                    요청 중단을 해주세요.
                  </>
                ) : (
                  <>
                    요청을 취소하시겠습니까?
                    <br />
                    요청 사항 및 추천받은 내역이 삭제 됩니다.
                  </>
                )}
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton
                onClick={() => {
                  setShowDeletePopup(false);
                }}
              >
                돌아가기
              </Popup.CancelButton>
              <Popup.ActionButton onClick={handleDeleteConfirm}>요청취소</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </Panel>
  );
});
