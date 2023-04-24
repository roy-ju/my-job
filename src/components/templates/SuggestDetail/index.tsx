import { GetMySuggestDetailResponse } from '@/apis/suggest/getMySuggestDetail';
import { NavigationHeader, Tabs } from '@/components/molecules';
import { useState } from 'react';
import { GetMySuggestRecommendsResponse } from '@/apis/suggest/getMySuggestRecommends';
import RequestDetail from './RequestDetail';
import ListingRecommendList from './ListingRecommendList';

interface Props {
  recommendCount?: number;
  suggestData?: GetMySuggestDetailResponse | null;
  recommendData?: GetMySuggestRecommendsResponse['list'];
  onClickBack?: () => void;
  onClickListing?: (id: number) => void;
  onClickChat?: (id: number) => void;
  onClickNotInterested?: (id: number) => void;
  onClickRecommendAccept?: (id: number) => void;
}

export default function SuggestDetail({
  recommendData,
  recommendCount = 0,
  suggestData,
  onClickBack,
  onClickListing,
  onClickChat,
  onClickNotInterested,
  onClickRecommendAccept,
}: Props) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title>{suggestData?.request_target_text}</NavigationHeader.Title>
      </NavigationHeader>
      <Tabs value={tabIndex} onChange={(i) => setTabIndex(i)}>
        <Tabs.Tab value={0}>
          <span tw="text-b2">요청 내용</span>
        </Tabs.Tab>
        <Tabs.Tab value={1}>
          <span tw="text-b2">추천 받은 매물</span>
          <span tw="text-b2 font-bold ml-1.5">{recommendCount}</span>
        </Tabs.Tab>
        <Tabs.Indicator />
      </Tabs>
      <div tw="flex-1 min-h-0 overflow-auto">
        {tabIndex === 0 && <RequestDetail suggestData={suggestData} />}
        {tabIndex === 1 && (
          <ListingRecommendList
            recommendData={recommendData}
            onClickListing={onClickListing}
            onClickChat={onClickChat}
            onClickNotInterested={onClickNotInterested}
            onClickRecommendAccept={onClickRecommendAccept}
          />
        )}
      </div>
    </div>
  );
}
