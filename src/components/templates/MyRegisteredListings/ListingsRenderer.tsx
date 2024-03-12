import React from 'react';

import tw from 'twin.macro';

import MyListItem from '@/components/organisms/my/my-list-item';

import { InfiniteScroll } from '@/components/atoms';

import { MyFavoriteListingListUiItem } from '@/components/domains/my/favorite-list/types';

import NoDataUI from './NoDataUI';

const Wrapper = tw.div`py-2`;

const Divider = tw.div`border-b border-gray-300 mx-5`;

enum MyRegisteredListingStatus {
  RegisteringListing = 1, // 등록신청
  ActiveListing = 2, // 거래중
  ContractCompleteListing = 3, // 거래성사
  CancelledListing = 4, // 지난거래
}

export interface ListingsRendererProps {
  tabStatus: number;
  isDeleteActive: boolean;
  checkedListingIdList: number[];

  onClickListingItem: (listingId: number) => () => void;
  onClickNavigateToListingCreate: () => void;
  onClickNavigateToListingDetailPassed: (listingId: number) => () => void;
  onChangeCheckbox: (listingId: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;

  myRegisteringListingData: MyFavoriteListingListUiItem[];
  myActiveListingData: MyFavoriteListingListUiItem[];
  myContractCompleteListingData: MyFavoriteListingListUiItem[];
  myCancelledListingData: MyFavoriteListingListUiItem[];

  myRegisteringListingIncrementalPageNumber: () => void;
  myActiveListingIncrementalPageNumber: () => void;
  myContractCompleteListingIncrementalPageNumber: () => void;
  myCancelledListingIncrementalPageNumber: () => void;
}

export default function ListingsRenderer({
  tabStatus,
  isDeleteActive,
  checkedListingIdList,

  onClickListingItem,
  onClickNavigateToListingCreate,
  onClickNavigateToListingDetailPassed,
  onChangeCheckbox,

  myRegisteringListingData,
  myContractCompleteListingData,
  myActiveListingData,
  myCancelledListingData,

  myRegisteringListingIncrementalPageNumber,
  myActiveListingIncrementalPageNumber,
  myContractCompleteListingIncrementalPageNumber,
  myCancelledListingIncrementalPageNumber,
}: ListingsRendererProps) {
  switch (tabStatus) {
    case MyRegisteredListingStatus.RegisteringListing: {
      if (!myRegisteringListingData?.length) return <NoDataUI tabStatus={1} onClick={onClickNavigateToListingCreate} />;

      return (
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={myRegisteringListingIncrementalPageNumber}>
          <Wrapper>
            {myRegisteringListingData?.map((item, i) => (
              <React.Fragment key={item.listingId}>
                {i > 0 && <Divider />}
                <MyListItem.RegisteringListing
                  isDeleteActive={isDeleteActive}
                  checkedListingIdList={checkedListingIdList}
                  onClickListingItem={onClickListingItem}
                  onChangeCheckbox={onChangeCheckbox}
                  {...item}
                />
              </React.Fragment>
            ))}
          </Wrapper>
        </InfiniteScroll>
      );
    }
    case MyRegisteredListingStatus.ActiveListing: {
      if (!myActiveListingData?.length) return <NoDataUI tabStatus={2} onClick={onClickNavigateToListingCreate} />;

      return (
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={myActiveListingIncrementalPageNumber}>
          <Wrapper>
            {myActiveListingData?.map((item, i) => (
              <React.Fragment key={item.listingId}>
                {i > 0 && <Divider />}
                <MyListItem.Listing showLikeButton={false} onClickListingItem={onClickListingItem} {...item} />
              </React.Fragment>
            ))}
          </Wrapper>
        </InfiniteScroll>
      );
    }
    case MyRegisteredListingStatus.ContractCompleteListing: {
      if (!myContractCompleteListingData?.length)
        return <NoDataUI onClick={onClickNavigateToListingCreate} tabStatus={3} />;

      return (
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={myContractCompleteListingIncrementalPageNumber}>
          <Wrapper>
            {myContractCompleteListingData?.map((item, i) => (
              <React.Fragment key={item.listingId}>
                {i > 0 && <Divider />}
                <MyListItem.Listing
                  showPopularityInformation={false}
                  showLikeButton={false}
                  onClickListingItem={onClickListingItem}
                  {...item}
                />
              </React.Fragment>
            ))}
          </Wrapper>
        </InfiniteScroll>
      );
    }
    case MyRegisteredListingStatus.CancelledListing: {
      if (!myCancelledListingData?.length) return <NoDataUI onClick={onClickNavigateToListingCreate} tabStatus={4} />;

      return (
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={myCancelledListingIncrementalPageNumber}>
          <Wrapper>
            {myCancelledListingData?.map((item, i) => (
              <React.Fragment key={item.listingId}>
                {i > 0 && <Divider />}
                <MyListItem.Listing
                  showPopularityInformation={false}
                  showLikeButton={false}
                  onClickListingItem={onClickNavigateToListingDetailPassed}
                  {...item}
                />
              </React.Fragment>
            ))}
          </Wrapper>
        </InfiniteScroll>
      );
    }
    default:
      return <Wrapper />;
  }
}
