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
import { SuggestStatus } from '@/constants/enums';
import { toast } from 'react-toastify';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);

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
    router.replace(Routes.SuggestUpdate, {
      searchParams: {
        suggestID: `${data?.suggest_id}`,
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
        onClickBack={() => router.replace(Routes.SuggestRequestedList)}
        onClickNotInterested={handleNotInterested}
        onClickRecommendAccept={handleRecommendAccept}
        onClickChat={handleClickChat}
        onClickSuggestUpdate={handleClickSuggestUpdate}
        onClickDanjiDetail={handleClickDanjiDetail}
        onClickNewRecommendations={handleNaviagteToRecommendationForm}
        onNextListingRecommentList={increamentPageNumber}
        onChangeSuggestChecked={handleChangeSuggestChecked}
      />
    </Panel>
  );
});
