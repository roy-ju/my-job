import { acceptRecommend } from '@/apis/suggest/acceptRecommend';
import useAPI_GetMySuggestDetail from '@/apis/suggest/getMySuggestDetail';
import useAPI_GetMySuggestRecommends from '@/apis/suggest/getMySuggestRecommends';
import { notIntersted } from '@/apis/suggest/notInterested';
import { Loading, Panel } from '@/components/atoms';
import { SuggestDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);
  const suggestID = Number(router.query.suggestID) ?? 0;

  const { data, isLoading } = useAPI_GetMySuggestDetail(suggestID);
  const { data: recommendData, count, mutate } = useAPI_GetMySuggestRecommends(suggestID);

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

  const handleClickNotInterested = useCallback(
    async (id: number) => {
      await notIntersted(id);
      mutate();
    },
    [mutate],
  );

  const handleClickRecommendAccept = useCallback(
    async (id: number) => {
      await acceptRecommend(id);
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
      <SuggestDetail
        recommendCount={count}
        recommendData={recommendData}
        suggestData={data}
        onClickBack={() => router.replace(Routes.SuggestRequestedList)}
        onClickListing={(id) => router.replace(Routes.ListingDetail, { searchParams: { listingID: `${id}` } })}
        onClickNotInterested={handleClickNotInterested}
        onClickRecommendAccept={handleClickRecommendAccept}
        onClickChat={handleClickChat}
      />
    </Panel>
  );
});
