import { acceptRecommend } from '@/apis/suggest/acceptRecommend';
import useAPI_GetMySuggestDetail from '@/apis/suggest/getMySuggestDetail';
import useAPI_GetMySuggestRecommends from '@/apis/suggest/getMySuggestRecommends';
import { notIntersted } from '@/apis/suggest/notInterested';
import { Loading, MobileContainer } from '@/components/atoms';
import { SuggestDetail } from '@/components/templates';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { memo, useCallback, useState, useEffect } from 'react';
import { resumeSuggest } from '@/apis/suggest/resumeSuggest';
import { stopSuggest } from '@/apis/suggest/stopSuggest';
import { SuggestStatus } from '@/constants/enums';
import { toast } from 'react-toastify';

export default memo(() => {
  const router = useRouter();
  const suggestID = Number(router.query.suggestID) ?? 0;

  const { data, isLoading } = useAPI_GetMySuggestDetail(suggestID);
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
      router.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${id}`);
    },
    [router],
  );

  useEffect(() => {
    setSuggestChecked(suggestStatus === SuggestStatus.Active);
  }, [suggestStatus]);

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
        suggestChecked={suggestChecked}
        onClickBack={() => router.back()}
        onClickNotInterested={handleNotInterested}
        onClickRecommendAccept={handleRecommendAccept}
        onClickChat={handleClickChat}
        onNextListingRecommentList={increamentPageNumber}
        onClickNewRecommendations={() => router.push(`/${Routes.EntryMobile}/${Routes.RecommendationForm}`)}
        onChangeSuggestChecked={handleChangeSuggestChecked}
      />
    </MobileContainer>
  );
});
