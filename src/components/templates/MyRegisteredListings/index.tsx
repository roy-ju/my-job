import { NavigationHeader, Tabs } from '@/components/molecules';
import { IMyListingListItem } from '@/components/organisms/MyListItem/Listing';
import ListingsRenderer from './ListingsRenderer';

export interface MyRegisteredListingsProps {
  tab: number;
  onChangeListingTab: (newValue: number) => void;
  onClickListingItem: (listingId: number) => () => void;

  myRegisteringListingCount: number;
  myRegisteringListingData: IMyListingListItem[];
  myRegisteringListingIncrementalPageNumber: () => void;
  myActiveListingCount: number;
  myActiveListingData: IMyListingListItem[];
  myActiveListingIncrementalPageNumber: () => void;
  myContractCompleteListingCount: number;
  myContractCompleteListingData: IMyListingListItem[];
  myContractCompleteListingIncrementalPageNumber: () => void;
  myCancelledListingCount: number;
  myCancelledListingData: IMyListingListItem[];
  myCancelledListingIncrementalPageNumber: () => void;
}

export default function MyRegisteredListings({
  tab,
  onChangeListingTab,
  onClickListingItem,
  myRegisteringListingCount,
  myRegisteringListingData,
  myRegisteringListingIncrementalPageNumber,
  myActiveListingCount,
  myActiveListingData,
  myActiveListingIncrementalPageNumber,
  myContractCompleteListingCount,
  myContractCompleteListingData,
  myContractCompleteListingIncrementalPageNumber,
  myCancelledListingCount,
  myCancelledListingData,
  myCancelledListingIncrementalPageNumber,
}: MyRegisteredListingsProps) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.Title>등록한 매물</NavigationHeader.Title>
      </NavigationHeader>
      <Tabs value={tab} onChange={onChangeListingTab}>
        <Tabs.Tab value={1}>
          등록신청 <span tw="text-gray-1000 font-bold">{myRegisteringListingCount}</span>
        </Tabs.Tab>
        <Tabs.Tab value={2}>
          거래중 <span tw="text-gray-1000 font-bold">{myActiveListingCount}</span>
        </Tabs.Tab>
        <Tabs.Tab value={3}>
          거래성사 <span tw="text-gray-1000 font-bold">{myContractCompleteListingCount}</span>
        </Tabs.Tab>
        <Tabs.Tab value={4}>
          지난거래 <span tw="text-gray-1000 font-bold">{myCancelledListingCount}</span>
        </Tabs.Tab>
        <Tabs.Indicator />
      </Tabs>
      <ListingsRenderer
        tabStatus={tab}
        onClickListingItem={onClickListingItem}
        myRegisteringListingData={myRegisteringListingData}
        myRegisteringListingIncrementalPageNumber={myRegisteringListingIncrementalPageNumber}
        myActiveListingData={myActiveListingData}
        myActiveListingIncrementalPageNumber={myActiveListingIncrementalPageNumber}
        myContractCompleteListingData={myContractCompleteListingData}
        myContractCompleteListingIncrementalPageNumber={myContractCompleteListingIncrementalPageNumber}
        myCancelledListingData={myCancelledListingData}
        myCancelledListingIncrementalPageNumber={myCancelledListingIncrementalPageNumber}
      />
    </div>
  );
}
