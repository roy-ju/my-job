import { NavigationHeader, Tabs } from '@/components/molecules';

import { IBiddingStatus } from '@/components/pages/pc/MyParticipatingListings/useMyParticipatingListings';

import ListingsRenderer from './ListingsRenderer';

export interface MyParticipatingListingsProps {
  tab: number;
  biddingStatus: IBiddingStatus;
  onChangeListingTab: (newValue: number) => void;
  onNavigateToListingDetailHistory: (listingId: number, biddingId: number) => () => void;
  onClickBack?: () => void;
}

export default function MyParticipatingListings({
  tab,
  biddingStatus,
  onChangeListingTab,
  onNavigateToListingDetailHistory,
  onClickBack,
}: MyParticipatingListingsProps) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>가격 제안한 매물</NavigationHeader.Title>
      </NavigationHeader>
      <Tabs value={tab} onChange={onChangeListingTab}>
        <Tabs.Tab value={1}>
          <span tw="text-b2">
            제안중 <span tw="text-gray-1000 font-bold">{biddingStatus.submitted.count}</span>
          </span>
        </Tabs.Tab>
        <Tabs.Tab value={2}>
          <span tw="text-b2">
            협의중 <span tw="text-gray-1000 font-bold">{biddingStatus.accepted.count}</span>
          </span>
        </Tabs.Tab>
        <Tabs.Tab value={3}>
          <span tw="text-b2">
            거래성사 <span tw="text-gray-1000 font-bold">{biddingStatus.preContractCompleted.count}</span>
          </span>
        </Tabs.Tab>
        <Tabs.Tab value={4}>
          <span tw="text-b2">
            지난거래 <span tw="text-gray-1000 font-bold">{biddingStatus.past.count}</span>
          </span>
        </Tabs.Tab>
        <Tabs.Indicator />
      </Tabs>
      <ListingsRenderer
        onNavigateToListingDetailHistory={onNavigateToListingDetailHistory}
        tabStatus={tab}
        biddingStatus={biddingStatus}
      />
    </div>
  );
}
