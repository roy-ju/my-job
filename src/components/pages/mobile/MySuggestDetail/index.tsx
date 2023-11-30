import useAPI_GetMySuggestRecommends from '@/apis/suggest/getMySuggestRecommends';
import { notIntersted } from '@/apis/suggest/notInterested';
import { Loading, MobAuthRequired, MobileContainer } from '@/components/atoms';
import { MySuggestDetail } from '@/components/templates';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { memo, useCallback, useState, useEffect } from 'react';
import { resumeSuggest } from '@/apis/suggest/resumeSuggest';
import { stopSuggest } from '@/apis/suggest/stopSuggest';
import { SuggestStatus, DanjiOrRegionalType } from '@/constants/enums';
import { toast } from 'react-toastify';
import useAPI_GetSuggestDetail from '@/apis/suggest/getSuggestDetail';
import { deleteSuggest } from '@/apis/suggest/deleteSuggest';
import { deleteSuggestRecommend } from '@/apis/suggest/deleteSuggestRecommend';
import { OverlayPresenter, Popup } from '@/components/molecules';

export default memo(() => {
  const router = useRouter();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showInactivePopup, setShowInactivePopup] = useState(false);

  const suggestID = Number(router.query.suggestID) ?? 0;

  const { data, isLoading } = useAPI_GetSuggestDetail(suggestID);
  const {
    data: recommendData,
    count,
    mutate,
    increamentPageNumber,
    suggestStatus,
  } = useAPI_GetMySuggestRecommends(suggestID, undefined, data?.my_suggest);

  const [suggestChecked, setSuggestChecked] = useState(false);

  const handleClickChat = useCallback(
    (id: number) => {
      router.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${id}`);
    },
    [router],
  );

  useEffect(() => {
    setSuggestChecked(suggestStatus === SuggestStatus.Active);
  }, [suggestStatus]);

  const handleClickDanjiDetail = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${data?.danji_id}`);
  }, [data, router]);

  const handleClickSuggestUpdate = useCallback(() => {
    const targetRoute =
      data?.danji_or_regional === DanjiOrRegionalType.Danji
        ? Routes.DanjiRecommendationUpdate
        : Routes.SuggestRegionalFormUpdate;
    router.push(`/${Routes.EntryMobile}/${targetRoute}?suggestID=${data?.suggest_id}`);
  }, [data, router]);

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
      // await acceptRecommend(suggestRecommendId);
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

  const handleDeleteConfirm = useCallback(async () => {
    if (!suggestID) return;
    await deleteSuggest(suggestID);
    setShowDeletePopup(false);
    toast.success('추천 요청을 삭제했습니다.', { toastId: 'success_delete' });
    router.back();
  }, [suggestID, router]);

  const handleDeleteSuggestRecommendItem = useCallback(
    async (suggestRecommendId: number) => {
      await deleteSuggestRecommend(suggestRecommendId);
      mutate();
    },
    [mutate],
  );

  const handleClickBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace(`/${Routes.EntryMobile}/${Routes.SuggestRequestedList}`);
      }
    }
  }, [router]);

  useEffect(() => {
    if (!isLoading && data?.my_suggest === false) {
      setShowInactivePopup(true);
    }
  }, [data?.my_suggest, isLoading]);

  const goHome = () => {
    router.replace('/');
  };

  return (
    <MobAuthRequired>
      <MobileContainer>
        {isLoading ? (
          <div tw="py-20">
            <Loading />
          </div>
        ) : (
          <>
            {data?.my_suggest && (
              <MySuggestDetail
                recommendCount={count}
                recommendData={recommendData}
                suggestData={data}
                suggestChecked={suggestChecked}
                onClickBack={handleClickBack}
                onClickNotInterested={handleNotInterested}
                onClickRecommendAccept={handleRecommendAccept}
                onClickChat={handleClickChat}
                onClickSuggestUpdate={handleClickSuggestUpdate}
                onClickDanjiDetail={handleClickDanjiDetail}
                onNextListingRecommentList={increamentPageNumber}
                onChangeSuggestChecked={handleChangeSuggestChecked}
                onClickDeleteSuggest={handleClickDeleteSuggest}
                onClickDeleteSuggestRecommendItem={handleDeleteSuggestRecommendItem}
              />
            )}

            {showInactivePopup && (
              <OverlayPresenter>
                <Popup>
                  <Popup.ContentGroup tw="py-6">
                    <Popup.SubTitle tw="text-center">
                      현재 로그인 계정으로는
                      <br />
                      접근이 불가능한 페이지입니다.
                    </Popup.SubTitle>
                  </Popup.ContentGroup>
                  <Popup.ButtonGroup>
                    <Popup.ActionButton onClick={goHome}>네고시오 홈으로 돌아가기</Popup.ActionButton>
                  </Popup.ButtonGroup>
                </Popup>
              </OverlayPresenter>
            )}

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
          </>
        )}
      </MobileContainer>
    </MobAuthRequired>
  );
});
