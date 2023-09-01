import { GetMySuggestRecommendsResponse } from '@/apis/suggest/getMySuggestRecommends';
import { NavigationHeader, Tabs } from '@/components/molecules';
import { SuggestReceivedListNoData } from '@/components/organisms';
import { Loading } from '@/components/atoms';
import ListingRecommendList from '../MySuggestDetail/ListingRecommendList';

interface Props {
  listStyle?: 'none' | 'delete';

  acceptedCount?: number;
  notIntersetedCount?: number;
  sentCount?: number;
  recommendsData?: GetMySuggestRecommendsResponse['list'];

  isLoadingList?: boolean;

  tabIndex?: number;

  onChangeTabIndex?: (value: number) => void;
  onChangeListStyle?: (value: 'delete' | 'none') => void;
  onClickDelete?: () => void;
  onClickListing?: (id: number) => void;
  onClickChat?: (id: number) => void;
  onClickNotInterested?: (id: number) => void;
  onClickRecommendAccept?: (id: number) => void;
}

export default function SuggestReceivedList({
  acceptedCount = 0,
  notIntersetedCount = 0,
  sentCount = 0,
  isLoadingList = false,
  recommendsData,
  tabIndex,
  // listStyle,
  onChangeTabIndex,
  // onChangeListStyle,
  // onClickDelete,
  onClickChat,
  onClickNotInterested,
  onClickRecommendAccept,
}: Props) {
  const renderContents = () => {
    if (isLoadingList) {
      return (
        <div tw="py-20">
          <Loading />
        </div>
      );
    }
    if (!recommendsData?.length) {
      return (
        <div tw="py-7">
          <SuggestReceivedListNoData />
        </div>
      );
    }
    return (
      <ListingRecommendList
        recommendData={recommendsData}
        onClickChat={onClickChat}
        onClickNotInterested={onClickNotInterested}
        onClickRecommendAccept={onClickRecommendAccept}
      />
    );
  };

  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.Title>추천받은 매물</NavigationHeader.Title>
      </NavigationHeader>
      <Tabs value={tabIndex} onChange={onChangeTabIndex}>
        <Tabs.Tab value={1}>
          <span tw="text-b2">신규 {sentCount}</span>
        </Tabs.Tab>
        <Tabs.Tab value={2}>
          <span tw="text-b2">협의 중 {acceptedCount}</span>
        </Tabs.Tab>
        <Tabs.Tab value={3}>
          <span tw="text-b2">관심 없음 {notIntersetedCount}</span>
        </Tabs.Tab>
        <Tabs.Indicator />
      </Tabs>
      <div tw="flex flex-col flex-1 min-h-0 overflow-auto">{renderContents()}</div>
    </div>
  );
}
