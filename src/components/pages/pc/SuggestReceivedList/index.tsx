import { acceptRecommend } from '@/apis/suggest/acceptRecommend';
import useAPI_GetMySuggestRecommends from '@/apis/suggest/getMySuggestRecommends';
import useAPI_GetRecommendsCounts from '@/apis/suggest/getMySuggestRecommendsCounts';
import { notIntersted } from '@/apis/suggest/notInterested';
import { Panel } from '@/components/atoms';
import { SuggestReceivedList } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);

  const [tabIndex, setTabIndex] = useState(1);
  const [listStyle, setListStyle] = useState<'none' | 'delete'>('none');

  const { data: countsData, mutate: mutateCounts } = useAPI_GetRecommendsCounts();
  const { data: recommendsData, isLoading, mutate: mutateList } = useAPI_GetMySuggestRecommends(null, tabIndex);

  const handleClickListing = useCallback(
    (id: number) => {
      router.replace(Routes.ListingDetail, {
        searchParams: {
          listingID: `${id}`,
        },
      });
    },
    [router],
  );

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
      mutateList();
      mutateCounts();
    },
    [mutateList, mutateCounts],
  );

  const handleClickAcceptRecommend = useCallback(
    async (id: number) => {
      await acceptRecommend(id);
      mutateList();
      mutateCounts();
    },
    [mutateList, mutateCounts],
  );

  return (
    <Panel width={panelWidth}>
      <SuggestReceivedList
        listStyle={listStyle}
        sentCount={countsData?.sent_count}
        acceptedCount={countsData?.accepted_count}
        notIntersetedCount={countsData?.not_interested_count}
        isLoadingList={isLoading}
        recommendsData={recommendsData}
        tabIndex={tabIndex}
        onChangeTabIndex={setTabIndex}
        onClickChat={handleClickChat}
        onClickListing={handleClickListing}
        onClickNotInterested={handleClickNotInterested}
        onClickRecommendAccept={handleClickAcceptRecommend}
        onChangeListStyle={setListStyle}
      />
    </Panel>
  );
});
