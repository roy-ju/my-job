import { Tabs } from '@/components/molecules';

import { MyFavoriteListingListUiItem } from '@/components/domains/my/favorite-list/types';

import HeaderRenderer from './HeaderRenderer';

import ListingsRenderer from './ListingsRenderer';

export interface MyRegisteredListingsProps {
  tab: number;
  onChangeListingTab: (newValue: number) => void;
  onClickListingItem: (listingId: number) => () => void;
  onClickNavigateToListingCreate: () => void;
  onClickNavigateToListingDetailPassed: (listingId: number) => () => void;

  isDeleteActive: boolean;
  isPopupActive: boolean;
  checkedListingIdList: number[];
  onChangeCheckbox: (listingId: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteListingList: () => void;
  onActiveDelete: () => void;
  onCancelDelete: () => void;
  onOpenPopup: () => void;
  onClosePopup: () => void;

  myRegisteringListingCount: number;
  myRegisteringListingData: MyFavoriteListingListUiItem[];
  myRegisteringListingIncrementalPageNumber: () => void;
  myActiveListingCount: number;
  myActiveListingData: MyFavoriteListingListUiItem[];
  myActiveListingIncrementalPageNumber: () => void;
  myContractCompleteListingCount: number;
  myContractCompleteListingData: MyFavoriteListingListUiItem[];
  myContractCompleteListingIncrementalPageNumber: () => void;
  myCancelledListingCount: number;
  myCancelledListingData: MyFavoriteListingListUiItem[];
  myCancelledListingIncrementalPageNumber: () => void;

  onClickBack?: () => void;
}

export default function MyRegisteredListings({
  tab,
  onChangeListingTab,
  onClickListingItem,
  onClickNavigateToListingCreate,
  onClickNavigateToListingDetailPassed,

  isDeleteActive,
  isPopupActive,
  checkedListingIdList,
  onChangeCheckbox,
  onDeleteListingList,
  onActiveDelete,
  onCancelDelete,
  onOpenPopup,
  onClosePopup,

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

  onClickBack,
}: MyRegisteredListingsProps) {
  return (
    <div tw="h-full flex flex-col">
      <HeaderRenderer
        onClickBack={onClickBack}
        hasRegisteringListing={!!myRegisteringListingCount}
        tabStatus={tab}
        isDeleteActive={isDeleteActive}
        isPopupActive={isPopupActive}
        onDeleteListingList={onDeleteListingList}
        onActiveDelete={onActiveDelete}
        onCancelDelete={onCancelDelete}
        onOpenPopup={onOpenPopup}
        onClosePopup={onClosePopup}
      />
      <Tabs value={tab} onChange={onChangeListingTab}>
        <Tabs.Tab value={1}>
          <span tw="text-b2">
            등록신청 <span tw="text-gray-1000 font-bold">{myRegisteringListingCount}</span>
          </span>
        </Tabs.Tab>
        <Tabs.Tab value={2}>
          <span tw="text-b2">
            거래중 <span tw="text-gray-1000 font-bold">{myActiveListingCount}</span>
          </span>
        </Tabs.Tab>
        <Tabs.Tab value={3}>
          <span tw="text-b2">
            거래성사 <span tw="text-gray-1000 font-bold">{myContractCompleteListingCount}</span>
          </span>
        </Tabs.Tab>
        <Tabs.Tab value={4}>
          <span tw="text-b2">
            지난거래 <span tw="text-gray-1000 font-bold">{myCancelledListingCount}</span>
          </span>
        </Tabs.Tab>
        <Tabs.Indicator />
      </Tabs>
      <ListingsRenderer
        tabStatus={tab}
        isDeleteActive={isDeleteActive}
        checkedListingIdList={checkedListingIdList}
        onChangeCheckbox={onChangeCheckbox}
        onClickListingItem={onClickListingItem}
        onClickNavigateToListingCreate={onClickNavigateToListingCreate}
        onClickNavigateToListingDetailPassed={onClickNavigateToListingDetailPassed}
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
