import React from 'react';

import tw from 'twin.macro';

import MyListItem from '@/components/organisms/my/my-list-item';

import { InfiniteScroll } from '@/components/atoms';

import { MyFavoriteListingListUiItem } from '@/components/domains/my/favorite-list/types';

import Nodata from './Nodata';

const Wrapper = tw.div`py-2`;

const Divider = tw.div`border-b border-gray-300 mx-5`;

enum MyRegisteredListingStatus {
  RegisteringListing = 1, // 등록신청
  ActiveListing = 2, // 거래중
  ContractCompleteListing = 3, // 거래성사
  CancelledListing = 4, // 지난거래
}

export interface ListingsRendererProps {
  tab: number;
  isDeleteActive: boolean;
  checkedListingIdList: number[];

  handleClickListingItem: (listingId: number) => () => void;
  handleClickNavigateToListingCreate: () => void;
  handleClickNavigateToListingDetailPassed: (listingId: number) => () => void;
  handleChangeCheckbox: (listingId: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;

  myRegisteringListingData: MyFavoriteListingListUiItem[];
  myRegisteringListingIncrementalPageNumber: () => void;

  myActiveListingData: MyFavoriteListingListUiItem[];
  myActiveListingIncrementalPageNumber: () => void;

  myContractCompleteListingData: MyFavoriteListingListUiItem[];
  myContractCompleteListingIncrementalPageNumber: () => void;

  myCancelledListingData: MyFavoriteListingListUiItem[];
  myCancelledListingIncrementalPageNumber: () => void;
}

export default function RegisteredListingsList({
  tab,
  isDeleteActive,
  checkedListingIdList,

  handleClickListingItem,
  handleClickNavigateToListingCreate,
  handleClickNavigateToListingDetailPassed,
  handleChangeCheckbox,

  myRegisteringListingData,
  myRegisteringListingIncrementalPageNumber,

  myActiveListingData,
  myActiveListingIncrementalPageNumber,

  myContractCompleteListingData,
  myContractCompleteListingIncrementalPageNumber,

  myCancelledListingData,
  myCancelledListingIncrementalPageNumber,
}: ListingsRendererProps) {
  switch (tab) {
    case MyRegisteredListingStatus.RegisteringListing: {
      if (!myRegisteringListingData?.length)
        return <Nodata tabStatus={1} onClick={handleClickNavigateToListingCreate} />;

      return (
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={myRegisteringListingIncrementalPageNumber}>
          <Wrapper>
            {myRegisteringListingData?.map((item, i) => (
              <React.Fragment key={item.listingId}>
                {i > 0 && <Divider />}
                <MyListItem.RegisteringListing
                  isDeleteActive={isDeleteActive}
                  checkedListingIdList={checkedListingIdList}
                  onClickListingItem={handleClickListingItem}
                  onChangeCheckbox={handleChangeCheckbox}
                  {...item}
                />
              </React.Fragment>
            ))}
          </Wrapper>
        </InfiniteScroll>
      );
    }

    case MyRegisteredListingStatus.ActiveListing: {
      if (!myActiveListingData?.length) return <Nodata tabStatus={2} onClick={handleClickNavigateToListingCreate} />;

      return (
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={myActiveListingIncrementalPageNumber}>
          <Wrapper>
            {myActiveListingData?.map((item, i) => (
              <React.Fragment key={item.listingId}>
                {i > 0 && <Divider />}
                <MyListItem.Listing showLikeButton={false} onClickListingItem={handleClickListingItem} {...item} />
              </React.Fragment>
            ))}
          </Wrapper>
        </InfiniteScroll>
      );
    }

    case MyRegisteredListingStatus.ContractCompleteListing: {
      if (!myContractCompleteListingData?.length)
        return <Nodata onClick={handleClickNavigateToListingCreate} tabStatus={3} />;

      return (
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={myContractCompleteListingIncrementalPageNumber}>
          <Wrapper>
            {myContractCompleteListingData?.map((item, i) => (
              <React.Fragment key={item.listingId}>
                {i > 0 && <Divider />}
                <MyListItem.Listing
                  showPopularityInformation={false}
                  showLikeButton={false}
                  onClickListingItem={handleClickListingItem}
                  {...item}
                />
              </React.Fragment>
            ))}
          </Wrapper>
        </InfiniteScroll>
      );
    }

    case MyRegisteredListingStatus.CancelledListing: {
      if (!myCancelledListingData?.length) return <Nodata onClick={handleClickNavigateToListingCreate} tabStatus={4} />;

      return (
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={myCancelledListingIncrementalPageNumber}>
          <Wrapper>
            {myCancelledListingData?.map((item, i) => (
              <React.Fragment key={item.listingId}>
                {i > 0 && <Divider />}
                <MyListItem.Listing
                  showPopularityInformation={false}
                  showLikeButton={false}
                  onClickListingItem={handleClickNavigateToListingDetailPassed}
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
