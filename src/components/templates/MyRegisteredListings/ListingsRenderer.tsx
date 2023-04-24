import tw, { styled } from 'twin.macro';
import React from 'react';
import { MyListItem } from '@/components/organisms';
import { IMyListingListItem } from '@/components/organisms/MyListItem/Listing';
import { InfiniteScroll } from '@/components/atoms';

const Wrapper = styled.div`
  ${tw`px-5 py-7`}
`;
const Divider = tw.div`border-b border-gray-300 my-5`;

enum MyRegisteredListingStatus {
  RegisteringListing = 1, // 등록신청
  ActiveListing = 2, // 거래중
  ContractCompleteListing = 3, // 거래성사
  CancelledListing = 4, // 지난거래
}

export interface ListingsRendererProps {
  tabStatus: number;
  onClickListingItem: (listingId: number) => () => void;

  myRegisteringListingData: IMyListingListItem[];
  myActiveListingData: IMyListingListItem[];
  myContractCompleteListingData: IMyListingListItem[];
  myCancelledListingData: IMyListingListItem[];

  myRegisteringListingIncrementalPageNumber: () => void;
  myActiveListingIncrementalPageNumber: () => void;
  myContractCompleteListingIncrementalPageNumber: () => void;
  myCancelledListingIncrementalPageNumber: () => void;
}

export default function ListingsRenderer({
  tabStatus,
  onClickListingItem,

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
    case MyRegisteredListingStatus.RegisteringListing:
      return (
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={myRegisteringListingIncrementalPageNumber}>
          <Wrapper>
            {myRegisteringListingData?.map((item, i) => (
              <React.Fragment key={item.listingId}>
                {i > 0 && <Divider />}
                <MyListItem.RegisteringListing onClickListingItem={onClickListingItem} {...item} />
              </React.Fragment>
            ))}
          </Wrapper>
        </InfiniteScroll>
      );
    case MyRegisteredListingStatus.ActiveListing:
      return (
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={myActiveListingIncrementalPageNumber}>
          <Wrapper>
            {myActiveListingData?.map((item, i) => (
              <React.Fragment key={item.listingId}>
                {i > 0 && <Divider />}
                <MyListItem.Listing onClickListingItem={onClickListingItem} {...item} />
              </React.Fragment>
            ))}
          </Wrapper>
        </InfiniteScroll>
      );
    case MyRegisteredListingStatus.ContractCompleteListing:
      return (
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={myContractCompleteListingIncrementalPageNumber}>
          <Wrapper>
            {myContractCompleteListingData?.map((item, i) => (
              <React.Fragment key={item.listingId}>
                {i > 0 && <Divider />}
                <MyListItem.Listing onClickListingItem={onClickListingItem} {...item} />
              </React.Fragment>
            ))}
          </Wrapper>
        </InfiniteScroll>
      );
    case MyRegisteredListingStatus.CancelledListing:
      return (
        <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={myCancelledListingIncrementalPageNumber}>
          <Wrapper>
            {myCancelledListingData?.map((item, i) => (
              <React.Fragment key={item.listingId}>
                {i > 0 && <Divider />}
                <MyListItem.Listing onClickListingItem={onClickListingItem} {...item} />
              </React.Fragment>
            ))}
          </Wrapper>
        </InfiniteScroll>
      );
    default:
      return <Wrapper />;
  }
}
